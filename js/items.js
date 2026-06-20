// ===== 道具系统 =====
App.Items = {

  // 道具定义
  DEFINITIONS: {
    calculator: { name: '计算器', icon: '🧮', desc: '展开当前题目的计算过程和公式', boss: 'boss_ch1', maxUses: 3 },
    hourglass:  { name: '延时沙漏', icon: '⏳', desc: '当前题目额外+15秒答题时间', boss: 'boss_ch2', maxUses: 2 },
    elimination:{ name: '排除法', icon: '🎯', desc: '去掉两个错误选项', boss: 'boss_ch3', maxUses: 2 },
    hint:       { name: '知识提示', icon: '💡', desc: '显示本题所考察的知识点', boss: 'boss_ch4', maxUses: 3 }
  },

  // 获取物品数量
  count: function(itemId) {
    return (App.userProgress.inventory && App.userProgress.inventory[itemId]) || 0;
  },

  // 添加物品
  add: function(itemId, amount) {
    if (!App.userProgress.inventory) App.userProgress.inventory = {};
    var def = this.DEFINITIONS[itemId];
    if (!def) return;
    var current = App.userProgress.inventory[itemId] || 0;
    App.userProgress.inventory[itemId] = Math.min(current + (amount || 1), def.maxUses);
    App.Storage.save();
  },

  // 使用物品
  use: function(itemId) {
    var count = this.count(itemId);
    if (count <= 0) { App.toast('道具已用完', 'error'); return false; }

    // 根据当前屏幕判断上下文
    var state = null, q = null;
    if (App.currentScreen === 'diagnosis' && App.diagnosisState) { state = App.diagnosisState; q = state.questions[state.currentQuestionIndex]; }
    else if (App.currentScreen === 'practice' && App.practiceState) { state = App.practiceState; q = state.questions[state.currentQuestionIndex]; }
    else if (App.currentScreen === 'boss-challenge' && App.bossState) { state = App.bossState; q = state.questions[state.currentIndex]; }

    if (!q) { App.toast('当前没有题目', 'error'); return false; }

    var used = false;
    switch (itemId) {
      case 'calculator':
        // 查找计算公式
        var node = this._findNodeForQuestion(q);
        var formula = this._getFormulas(node ? node.id : null);
        App.toast('🧮 ' + (formula || 'v=s/t, F=ma, 注意单位换算'), 'info');
        used = true;
        break;
      case 'hourglass':
        // +15秒 - 通过调整questionStartTime实现
        if (state.questionStartTime) {
          state.questionStartTime -= 15000;
          App.toast('⏳ +15秒！', 'success');
          used = true;
        }
        break;
      case 'elimination':
        // 去掉两个错误选项
        used = this._eliminateWrong(q);
        break;
      case 'hint':
        var node = this._findNodeForQuestion(q);
        App.toast('💡 考察知识点: ' + (node ? node.name : '未知'), 'info');
        used = true;
        break;
    }

    if (used) {
      App.userProgress.inventory[itemId]--;
      App.Storage.save();
      // 刷新道具栏
      App.Ui.renderItemBar();
    }
    return used;
  },

  // 找到题目所属知识点
  _findNodeForQuestion: function(q) {
    if (q._sourceNode) return App.knowledgeGraph[q._sourceNode];
    // 遍历搜索
    var ids = Object.keys(App.knowledgeGraph);
    for (var i = 0; i < ids.length; i++) {
      var node = App.knowledgeGraph[ids[i]];
      var all = (node.practiceQuestions || []).concat(node.diagnosticQuestions || []);
      if (node._importedPractice) all = all.concat(node._importedPractice);
      if (node._importedDiagnostic) all = all.concat(node._importedDiagnostic);
      if (all.indexOf(q) >= 0) return node;
    }
    return null;
  },

  // 获取公式
  _getFormulas: function(nodeId) {
    var formulas = {
      c8_speed_concept: 'v = s/t（平均速度 = 路程/时间）',
      g1_velocity_accel: 'a = Δv/Δt, v = v₀ + at',
      g1_time_displacement: '位移是矢量（有方向），路程是标量 | s-t图斜率=速度',
      g1_linear_motion: 'x = v₀t + ½at² | v² - v₀² = 2ax | v = v₀ + at',
      g1_free_fall: 'h = ½gt², v = gt（初速为0，a=g≈9.8或10m/s²）',
      g1_gravity_elasticity: 'F = kx（胡克定律：弹力=劲度系数×形变量）',
      g1_friction: 'f = μN（滑动摩擦力=动摩擦因数×正压力）注意N不一定等于mg！',
      g1_force_synthesis: '平行四边形定则 | 正交分解：F_x=Fcosθ, F_y=Fsinθ',
      g1_newton_second: 'F_合 = ma | 超重: N=mg+ma | 失重: N=mg-ma',
      g1_newton_application: '整体法求加速度，隔离法求内力'
    };
    return formulas[nodeId] || '先分析已知量和未知量，选择合适的运动学或力学公式';
  },

  // 排除两个错误选项
  _eliminateWrong: function(q) {
    var btns = document.querySelectorAll('.option-btn');
    if (btns.length < 4) return false;
    var wrongIndices = [];
    for (var i = 0; i < q.options.length; i++) {
      if (i !== q.correct) wrongIndices.push(i);
    }
    // 随机选2个错误选项隐藏
    var toHide = wrongIndices.slice(0, 2);
    for (var i = 0; i < toHide.length; i++) {
      var btn = btns[toHide[i]];
      if (btn) { btn.style.opacity = '0.2'; btn.style.pointerEvents = 'none'; }
    }
    App.toast('🎯 已排除2个错误选项', 'success');
    return true;
  },

  // 渲染道具栏（嵌入各答题屏幕）
  renderBar: function(containerId) {
    var container = document.getElementById(containerId);
    if (!container) return;
    var ids = Object.keys(this.DEFINITIONS);
    var hasAny = false;
    var html = '<div class="item-bar">';
    for (var i = 0; i < ids.length; i++) {
      var def = this.DEFINITIONS[ids[i]];
      var cnt = this.count(ids[i]);
      if (cnt > 0) hasAny = true;
      html += '<button class="item-btn' + (cnt > 0 ? ' has-item' : ' no-item') + '" ' +
        'onclick="App.Items.use(\'' + ids[i] + '\')" ' +
        'title="' + def.name + ': ' + def.desc + ' (剩' + cnt + '次)"' +
        (cnt === 0 ? ' disabled' : '') + '>' +
        def.icon + ' ' + def.name + (cnt > 0 ? ' ×' + cnt : '') + '</button>';
    }
    html += '</div>';
    container.innerHTML = hasAny ? html : '';
  }
};

// Item button styles are in index.html (Neumorphism .item-btn, .has-item, .no-item)
