// ===== Boss挑战系统 =====
App.Boss = {

  // Boss定义 - 各学科独立配置
  BOSSES_POOL: {
    physics: [
      { id: 'boss_ch1', name: '运动描述之龙', icon: '🌀', chapter: '必修一·运动的描述',
        desc: '质点、位移、速度、加速度——运动学基础的综合考验',
        nodeIds: ['g1_particle_reference', 'g1_time_displacement', 'g1_velocity_accel'],
        unlockCount: 2, color: '#00f0ff', xpMultiplier: 2, coinMultiplier: 2 },
      { id: 'boss_ch2', name: '变速魔王', icon: '🚀', chapter: '必修一·匀变速直线运动',
        desc: '匀变速公式、自由落体、v-t图像——计算能力的终极测试',
        nodeIds: ['g1_linear_motion', 'g1_free_fall'],
        unlockCount: 2, color: '#fbbf24', xpMultiplier: 2.5, coinMultiplier: 2.5 },
      { id: 'boss_ch3', name: '力学武士', icon: '⚔️', chapter: '必修一·相互作用',
        desc: '重力弹力摩擦力、力的合成与分解、力矩平衡——受力分析大考',
        nodeIds: ['g1_gravity_elasticity', 'g1_friction', 'g1_force_synthesis', 'g1_torque_balance'],
        unlockCount: 3, color: '#ff6b6b', xpMultiplier: 3, coinMultiplier: 3 },
      { id: 'boss_ch4', name: '牛顿之果', icon: '🍎', chapter: '必修一·牛顿运动定律',
        desc: '三大定律+连接体+超重失重——力与运动的终极Boss',
        nodeIds: ['g1_newton_first', 'g1_newton_second', 'g1_newton_third', 'g1_newton_application'],
        unlockCount: 3, color: '#ffd700', xpMultiplier: 3.5, coinMultiplier: 3.5 }
    ],
    chemistry: [
      { id: 'boss_ch1', name: '物质分类大师', icon: '🧪', chapter: '必修一·物质及其变化',
        desc: '物质分类、离子反应、氧化还原——基本概念的综合考验',
        nodeIds: ['ch1_matter_classify', 'ch1_ion_reaction', 'ch1_redox'],
        unlockCount: 2, color: '#00b894', xpMultiplier: 2, coinMultiplier: 2 },
      { id: 'boss_ch2', name: '元素掌控者', icon: '⚗️', chapter: '必修一·钠与氯',
        desc: '钠、氯及其化合物、物质的量——元素化学的基石',
        nodeIds: ['ch1_sodium', 'ch1_chlorine', 'ch1_mole'],
        unlockCount: 2, color: '#fdcb6e', xpMultiplier: 2.5, coinMultiplier: 2.5 },
      { id: 'boss_ch3', name: '周期律大师', icon: '📊', chapter: '必修一·物质结构 周期律',
        desc: '原子结构、元素周期律、化学键——微观世界的法则',
        nodeIds: ['ch1_atom_structure', 'ch1_periodic_law', 'ch1_chemical_bond'],
        unlockCount: 2, color: '#e17055', xpMultiplier: 3, coinMultiplier: 3 },
      { id: 'boss_ch4', name: '化学全能王', icon: '👨‍🔬', chapter: '必修二·综合',
        desc: '非金属元素+化学反应能量+有机物——高一化学终极挑战',
        nodeIds: ['ch2_sulfur', 'ch2_nitrogen', 'ch2_reaction_energy', 'ch2_organic_base'],
        unlockCount: 3, color: '#6c5ce7', xpMultiplier: 3.5, coinMultiplier: 3.5 }
    ],
    math: [
      { id: 'boss_ch1', name: '函数征服者', icon: '📐', chapter: '高一上·函数与指数对数',
        desc: '集合、不等式、函数单调性奇偶性——代数基础的综合考验',
        nodeIds: ['math_set_logic', 'math_inequality', 'math_func_concept', 'math_monotonicity', 'math_parity'],
        unlockCount: 3, color: '#00b894', xpMultiplier: 2, coinMultiplier: 2 },
      { id: 'boss_ch2', name: '初等函数专家', icon: '📈', chapter: '高一上·指数对数与零点',
        desc: '指数函数、对数函数、函数零点——计算与图像分析能力',
        nodeIds: ['math_exponential', 'math_logarithm', 'math_func_zero'],
        unlockCount: 2, color: '#fdcb6e', xpMultiplier: 2.5, coinMultiplier: 2.5 },
      { id: 'boss_ch3', name: '数列与矩阵大师', icon: '📏', chapter: '高一下·数列矩阵与向量',
        desc: '三角函数、数列、矩阵、向量、复数——数形结合大考',
        nodeIds: ['math_trig_basics', 'math_sequence', 'math_matrix', 'math_vector', 'math_complex'],
        unlockCount: 3, color: '#e17055', xpMultiplier: 3, coinMultiplier: 3 }
    ],
    english: [
      { id: 'boss_ch1', name: '时态与语态大师', icon: '⏰', chapter: '语法·时态语态',
        desc: '8种时态+被动语态——时间表达的综合掌握',
        nodeIds: ['en_tense_simple_cont', 'en_tense_perfect', 'en_passive'],
        unlockCount: 2, color: '#e17055', xpMultiplier: 2, coinMultiplier: 2 },
      { id: 'boss_ch2', name: '从句体系精通', icon: '📝', chapter: '语法·从句',
        desc: '名词性从句+定语从句+状语从句——复合句的综合考验',
        nodeIds: ['en_noun_clause', 'en_relative_clause', 'en_adverbial_clause'],
        unlockCount: 2, color: '#6c5ce7', xpMultiplier: 2.5, coinMultiplier: 2.5 },
      { id: 'boss_ch3', name: '语法全能大师', icon: '📖', chapter: '语法·综合',
        desc: '情态虚拟+非谓语+主谓一致+倒装——高中语法终极Boss',
        nodeIds: ['en_modal', 'en_subjunctive', 'en_nonfinite_infinitive', 'en_nonfinite_participle', 'en_sv_agreement', 'en_inversion'],
        unlockCount: 4, color: '#00b894', xpMultiplier: 3.5, coinMultiplier: 3.5 }
    ],
    geography: [
      { id: 'boss_ch1', name: '大气征服者', icon: '🌤️', chapter: '必修一·大气',
        desc: '大气受热、热力环流、气压带风带、天气系统——气象学的综合考验',
        nodeIds: ['geo_atmosphere_heat', 'geo_thermal_wind', 'geo_pressure_belts', 'geo_weather_systems'],
        unlockCount: 3, color: '#2ecc71', xpMultiplier: 2, coinMultiplier: 2 },
      { id: 'boss_ch2', name: '地球系统专家', icon: '🌍', chapter: '必修一·水与地表形态',
        desc: '水循环、海水运动、塑造地表形态——自然地理综合大考',
        nodeIds: ['geo_water_cycle', 'geo_ocean', 'geo_landform'],
        unlockCount: 2, color: '#3498db', xpMultiplier: 2.5, coinMultiplier: 2.5 }
    ]
  },

  get BOSSES() {
    var subj = (App.currentSubject || 'physics');
    return this.BOSSES_POOL[subj] || this.BOSSES_POOL['physics'];
  },

  // 获取指定Boss的状态
  getStatus: function(boss) {
    var kp = App.userProgress.knowledgeProgress;
    var mastered = 0, total = boss.nodeIds.length;
    for (var i = 0; i < boss.nodeIds.length; i++) {
      if (kp[boss.nodeIds[i]] && kp[boss.nodeIds[i]].status === 'mastered') mastered++;
    }
    var unlocked = mastered >= boss.unlockCount;
    var cleared = App.userProgress._bossCleared && App.userProgress._bossCleared.indexOf(boss.id) >= 0;
    return { unlocked: unlocked, cleared: !!cleared, mastered: mastered, total: total };
  },

  // 启动Boss挑战
  start: function(bossId) {
    var boss = null;
    for (var i = 0; i < this.BOSSES.length; i++) {
      if (this.BOSSES[i].id === bossId) { boss = this.BOSSES[i]; break; }
    }
    if (!boss) { App.toast('Boss不存在', 'error'); return; }

    var status = this.getStatus(boss);
    if (!status.unlocked) {
      App.toast('🔒 需掌握' + boss.unlockCount + '个知识点才能挑战', 'error');
      return;
    }

    // 从章节所有知识点中选题（优先高难度）
    var allQuestions = [];
    for (var i = 0; i < boss.nodeIds.length; i++) {
      var node = App.knowledgeGraph[boss.nodeIds[i]];
      if (!node) continue;
      var qs = (node.practiceQuestions || []).slice();
      if (node._importedPractice) qs = qs.concat(node._importedPractice);
      if (node._importedDiagnostic) qs = qs.concat(node._importedDiagnostic);
      // 标记来源
      for (var j = 0; j < qs.length; j++) {
        qs[j]._sourceNode = boss.nodeIds[i];
      }
      allQuestions = allQuestions.concat(qs);
    }

    if (allQuestions.length < 5) {
      App.toast('题库不足，请先完成更多练习', 'error');
      return;
    }

    // 按难度排序（高难度优先），取前12道再随机选10道
    allQuestions.sort(function(a, b) { return (b.difficulty || 2) - (a.difficulty || 2); });
    var pool = allQuestions.slice(0, Math.min(14, allQuestions.length));
    // 随机打乱
    for (var i = pool.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = pool[i]; pool[i] = pool[j]; pool[j] = tmp;
    }
    var selected = pool.slice(0, Math.min(10, pool.length));

    App.FocusTracker.start();
    App.bossState = {
      boss: boss,
      questions: selected,
      currentIndex: 0,
      answers: [],
      questionTimes: [],
      startTime: Date.now(),
      questionStartTime: Date.now(),
      totalCorrect: 0,
      xpEarned: 0,
      coinsEarned: 0
    };

    App.navigate('boss-challenge');
    this._renderQuestion();
  },

  // 渲染题目
  _renderQuestion: function() {
    var bs = App.bossState;
    if (!bs || bs.currentIndex >= bs.questions.length) { this._finish(); return; }

    // 重置回答状态，允许新题目正常作答
    bs._answered = false;

    var q = bs.questions[bs.currentIndex];
    document.getElementById('boss-title').textContent = '⚔️ ' + bs.boss.name;
    document.getElementById('boss-timer').textContent = '⏱ 0s';

    var cur = bs.currentIndex + 1, total = bs.questions.length;
    document.getElementById('boss-progress-bar').style.width = ((cur - 1) / total * 100) + '%';
    document.getElementById('boss-progress-text').textContent = '第 ' + cur + ' / ' + total + ' 题';
    document.getElementById('boss-score-display').textContent = '✅ ' + bs.totalCorrect + ' | 难度⭐' + (q.difficulty || '?');

    document.getElementById('boss-stem').textContent = q.stem;

    var labels = ['A', 'B', 'C', 'D'];
    var html = '';
    for (var i = 0; i < q.options.length; i++) {
      html += '<button class="option-btn" onclick="App.Boss.answer(' + i + ')">' +
        '<span class="letter-badge">' + labels[i] + '</span>' + q.options[i] + '</button>';
    }
    document.getElementById('boss-options').innerHTML = html;

    bs.questionStartTime = Date.now();
    this._startTimer();
    App.Items.renderBar('boss-item-bar');

    // 渲染题号网格
    var ansArr = [];
    for (var i = 0; i < bs.answers.length; i++) {
      ansArr[i] = bs.answers[i].correct;
    }
    App.Ui.renderPalette('boss-palette', bs.questions.length, bs.currentIndex, ansArr);
  },

  _startTimer: function() {
    var self = this;
    clearInterval(this._bossTimer);
    this._bossTimer = setInterval(function() {
      if (!App.bossState) return;
      var elapsed = Math.floor((Date.now() - App.bossState.questionStartTime) / 1000);
      var el = document.getElementById('boss-timer');
      if (el) el.textContent = '⏱ ' + elapsed + 's';
    }, 1000);
  },

  _abort: function() {
    clearInterval(this._bossTimer);
    App.bossState = null;
    App.navigate('boss-select');
  },

  // 答题
  answer: function(choiceIndex) {
    var bs = App.bossState;
    if (!bs || bs._answered) return; // 防双击
    bs._answered = true;
    var q = bs.questions[bs.currentIndex];
    var elapsed = (Date.now() - bs.questionStartTime) / 1000;
    bs.questionTimes.push(elapsed);

    var isCorrect = (choiceIndex === q.correct);
    bs.answers.push({ choice: choiceIndex, correct: isCorrect, time: elapsed });

    if (isCorrect) {
      bs.totalCorrect++;
      // Boss奖励 = 基础×难度系数×Boss倍率
      var baseXp = App.Gamification.XP.PRACTICE_CORRECT * bs.boss.xpMultiplier;
      var baseCoin = App.Gamification.COINS.PRACTICE_CORRECT * bs.boss.coinMultiplier;
      App.Gamification.addXp(Math.round(baseXp));
      App.Gamification.addCoins(Math.round(baseCoin));
      bs.xpEarned += Math.round(baseXp);
      bs.coinsEarned += Math.round(baseCoin);
      // 速度加成
      if (elapsed < 5) {
        var speedBonus = Math.round(8 * bs.boss.xpMultiplier);
        App.Gamification.addXp(speedBonus);
        bs.xpEarned += speedBonus;
      }

      // 如果此题在错题本中且答对了，移除它
      var sourceNode = q._sourceNode;
      if (sourceNode) {
        var kpCorrect = App.userProgress.knowledgeProgress[sourceNode];
        if (kpCorrect && kpCorrect._wrongQuestions) {
          for (var w = 0; w < kpCorrect._wrongQuestions.length; w++) {
            if (kpCorrect._wrongQuestions[w].stem === q.stem) {
              kpCorrect._wrongQuestions.splice(w, 1);
              break;
            }
          }
        }
      }
    } else {
      // 记录错题
      var sourceNodeWrong = q._sourceNode;
      if (sourceNodeWrong) {
        var kpWrong = App.userProgress.knowledgeProgress[sourceNodeWrong];
        if (kpWrong) {
          if (!kpWrong._wrongQuestions) kpWrong._wrongQuestions = [];
          var existing = null;
          for (var w = 0; w < kpWrong._wrongQuestions.length; w++) {
            if (kpWrong._wrongQuestions[w].stem === q.stem) {
              existing = kpWrong._wrongQuestions[w];
              break;
            }
          }
          if (existing) {
            existing.timesWrong++;
            existing.userChoice = choiceIndex;
            existing.timestamp = Date.now();
          } else {
            kpWrong._wrongQuestions.push({
              stem: q.stem,
              options: q.options.slice(),
              correct: q.correct,
              userChoice: choiceIndex,
              explanation: q.explanation || '',
              timestamp: Date.now(),
              timesWrong: 1
            });
          }
          if (kpWrong._wrongQuestions.length > 50) {
            kpWrong._wrongQuestions = kpWrong._wrongQuestions.slice(-50);
          }
        }
      }
    }

    // 按钮反馈
    var btns = document.querySelectorAll('#boss-options .option-btn');
    for (var i = 0; i < btns.length; i++) {
      btns[i].style.pointerEvents = 'none';
      if (i === q.correct) btns[i].classList.add('correct');
      if (i === choiceIndex && !isCorrect) btns[i].classList.add('wrong');
    }
    // 显示讲解
    var expEl = document.getElementById('boss-explanation');
    if (expEl && q.explanation) {
      expEl.innerHTML = '<div class="explain-box">' +
        (isCorrect ? '✅ ' : '❌ ') + '<strong>解析</strong>&nbsp; ' + q.explanation + '</div>';
    }

    document.getElementById('boss-progress-bar').style.width = (bs.currentIndex / bs.questions.length * 100) + '%';
    document.getElementById('boss-score-display').textContent = '✅ ' + bs.totalCorrect;

    // 立即更新题号网格
    var ansArr = [];
    for (var i = 0; i < bs.answers.length; i++) {
      ansArr[i] = bs.answers[i].correct;
    }
    App.Ui.renderPalette('boss-palette', bs.questions.length, bs.currentIndex, ansArr);

    var self = this;
    setTimeout(function() {
      bs.currentIndex++;
      if (bs.currentIndex >= bs.questions.length) {
        self._finish();
      } else {
        bs.questionStartTime = Date.now();
        self._renderQuestion();
      }
    }, isCorrect ? 500 : 1200);
  },

  // 完成
  _finish: function() {
    clearInterval(this._bossTimer);
    var bs = App.bossState;
    if (!bs) return;

    var total = bs.questions.length;
    var correct = bs.totalCorrect;
    var score = Math.round(correct / total * 100);
    var avgTime = bs.questionTimes.reduce(function(a, b) { return a + b; }, 0) / total;
    var totalTime = (Date.now() - bs.startTime) / 1000;

    // Boss通关奖励
    var cleared = score >= 70;
    if (cleared) {
      // 通关大奖
      var clearXp = Math.round(App.Gamification.XP.KNOWLEDGE_MASTERED * 2 * bs.boss.xpMultiplier);
      var clearCoin = Math.round(App.Gamification.COINS.KNOWLEDGE_MASTERED * 2 * bs.boss.coinMultiplier);
      App.Gamification.addXp(clearXp);
      App.Gamification.addCoins(clearCoin);
      bs.xpEarned += clearXp;
      bs.coinsEarned += clearCoin;

      // 记录通关 + 解锁道具
      if (!App.userProgress._bossCleared) App.userProgress._bossCleared = [];
      var isFirstClear = App.userProgress._bossCleared.indexOf(bs.boss.id) < 0;
      if (isFirstClear) {
        App.userProgress._bossCleared.push(bs.boss.id);
        // 首次通关解锁对应道具
        var itemMap = { boss_ch1: 'calculator', boss_ch2: 'hourglass', boss_ch3: 'elimination', boss_ch4: 'hint' };
        var itemId = itemMap[bs.boss.id];
        if (itemId) {
          App.Items.add(itemId, App.Items.DEFINITIONS[itemId].maxUses);
          App.toast('🎁 解锁道具: ' + App.Items.DEFINITIONS[itemId].icon + ' ' + App.Items.DEFINITIONS[itemId].name, 'success');
        }
      }
    }

    // 全对额外
    if (score === 100) {
      var perfectXp = Math.round(100 * bs.boss.xpMultiplier);
      App.Gamification.addXp(perfectXp);
      bs.xpEarned += perfectXp;
    }

    // 速度奖励
    if (avgTime < 6) {
      var fastXp = Math.round(50 * bs.boss.xpMultiplier);
      App.Gamification.addXp(fastXp);
      bs.xpEarned += fastXp;
      App.userProgress._hasSpeedImprove = true;
    }

    App.Gamification._checkBadges();
    App.Storage.save();

    // 存储结果
    var focus = App.FocusTracker.stop();
    App._lastBossResult = {
      boss: bs.boss,
      score: score,
      cleared: cleared,
      correct: correct,
      total: total,
      avgTime: avgTime,
      totalTime: totalTime,
      xpEarned: bs.xpEarned,
      coinsEarned: bs.coinsEarned,
      questionTimes: bs.questionTimes.slice(),
      answers: bs.answers.slice(),
      focusReport: focus
    };

    App.bossState = null;
    App.navigate('boss-result');
  }
};
