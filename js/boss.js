// ===== Boss挑战系统 =====
App.Boss = {

  // Boss定义
  BOSSES: [
    { id: 'boss_ch1', name: '运动描述之龙', icon: '🌀', chapter: '必修一·运动的描述',
      desc: '质点、位移、速度、加速度——运动学基础的综合考验',
      nodeIds: ['g1_particle_reference', 'g1_time_displacement', 'g1_velocity_accel'],
      unlockCount: 2, color: '#00f0ff', xpMultiplier: 2, coinMultiplier: 2 },
    { id: 'boss_ch2', name: '变速魔王', icon: '🚀', chapter: '必修一·匀变速直线运动',
      desc: '匀变速公式、自由落体、v-t图像——计算能力的终极测试',
      nodeIds: ['g1_linear_motion', 'g1_free_fall'],
      unlockCount: 2, color: '#fbbf24', xpMultiplier: 2.5, coinMultiplier: 2.5 },
    { id: 'boss_ch3', name: '力学武士', icon: '⚔️', chapter: '必修一·相互作用',
      desc: '重力弹力摩擦力、力的合成与分解——受力分析大考',
      nodeIds: ['g1_gravity_elasticity', 'g1_friction', 'g1_force_synthesis'],
      unlockCount: 2, color: '#ff6b6b', xpMultiplier: 3, coinMultiplier: 3 },
    { id: 'boss_ch4', name: '牛顿之果', icon: '🍎', chapter: '必修一·牛顿运动定律',
      desc: '三大定律+连接体+超重失重——力与运动的终极Boss',
      nodeIds: ['g1_newton_first', 'g1_newton_second', 'g1_newton_third', 'g1_newton_application'],
      unlockCount: 3, color: '#ffd700', xpMultiplier: 3.5, coinMultiplier: 3.5 }
  ],

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
      answers: bs.answers.slice()
    };

    App.bossState = null;
    App.navigate('boss-result');
  }
};
