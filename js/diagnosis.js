// ===== 诊断引擎: 前置溯源 + 计时器 + 速度追踪 =====
App.Diagnosis = {

  // 启动诊断
  start: function(nodeId) {
    var node = App.knowledgeGraph[nodeId];
    if (!node) { App.toast('知识点数据未找到', 'error'); return; }

    var kp = App.userProgress.knowledgeProgress[nodeId];
    if (kp && kp.status === 'locked') {
      App.toast('该知识点尚未解锁，请先掌握前置知识', 'error');
      return;
    }

    // 诊断题随机打乱 + 导入真题
    var diagQuestions = node.diagnosticQuestions.slice().concat(node._importedDiagnostic || []);
    for (var i = diagQuestions.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = diagQuestions[i]; diagQuestions[i] = diagQuestions[j]; diagQuestions[j] = tmp;
    }

    App.diagnosisState = {
      currentNodeId: nodeId,
      rootNodeId: nodeId,
      chain: [],
      currentQuestionIndex: 0,
      questions: diagQuestions,
      answers: [],
      startTime: Date.now(),
      questionStartTime: 0,
      questionTimes: [],
      totalXpEarned: 0,
      totalCoinsEarned: 0,
      perfectSoFar: true,
      fastAnswers: 0
    };

    // 记录第一个问题的开始时间
    App.diagnosisState.questionStartTime = Date.now();
    App.userProgress._diagnosisCount = (App.userProgress._diagnosisCount || 0) + 1;

    App.navigate('diagnosis');
    this._renderQuestion();
  },

  // 渲染当前题目
  _renderQuestion: function() {
    var ds = App.diagnosisState;
    var q = ds.questions[ds.currentQuestionIndex];
    if (!q) { this._finishNode(); return; }

    // 重置回答状态，允许新题目正常作答
    ds._answered = false;

    // 标题
    var node = App.knowledgeGraph[ds.currentNodeId];
    document.getElementById('diag-title').textContent = '诊断: ' + node.name;

    // 进度条
    var total = ds.questions.length;
    var cur = ds.currentQuestionIndex + 1;
    document.getElementById('diag-progress-bar').style.width = ((cur - 1) / total * 100) + '%';
    document.getElementById('diag-progress-text').textContent = '第 ' + cur + ' / ' + total + ' 题';
    document.getElementById('diag-score-text').textContent = '';

    // 题目
    document.getElementById('diag-stem').textContent = q.stem;

    // 选项
    var labels = ['A', 'B', 'C', 'D'];
    var optionsHtml = '';
    for (var i = 0; i < q.options.length; i++) {
      optionsHtml += '<button class="option-btn" onclick="App.Diagnosis.answer(' + i + ')">' +
        '<span class="letter-badge">' + labels[i] + '</span>' +
        q.options[i] + '</button>';
    }
    document.getElementById('diag-options').innerHTML = optionsHtml;

    // 重置计时器
    ds.questionStartTime = Date.now();
    this._startTimer();
    App.Items.renderBar('diag-item-bar');
  },

  // 计时器更新
  _startTimer: function() {
    var self = this;
    clearInterval(this._timerInterval);
    this._timerInterval = setInterval(function() {
      var elapsed = Math.floor((Date.now() - App.diagnosisState.questionStartTime) / 1000);
      document.getElementById('diag-timer').textContent = '⏱ ' + elapsed + 's';
    }, 1000);
  },

  // 回答
  answer: function(choiceIndex) {
    var ds = App.diagnosisState;
    if (!ds || ds._answered) return; // 防双击
    ds._answered = true;
    var q = ds.questions[ds.currentQuestionIndex];
    if (!q) return;
    var elapsed = (Date.now() - ds.questionStartTime) / 1000;
    ds.questionTimes.push(elapsed);

    clearInterval(this._timerInterval);

    var isCorrect = (choiceIndex === q.correct);
    ds.answers.push({ choice: choiceIndex, correct: isCorrect, time: elapsed });

    // 禁用按钮
    var btns = document.querySelectorAll('#diag-options .option-btn');
    for (var i = 0; i < btns.length; i++) {
      btns[i].style.pointerEvents = 'none';
      if (i === q.correct) btns[i].classList.add('correct');
      if (i === choiceIndex && !isCorrect) btns[i].classList.add('wrong');
    }
    // 显示解析
    var expEl = document.getElementById('diag-explanation');
    if (expEl && q.explanation) {
      expEl.innerHTML = '<div class="explain-box">' +
        (isCorrect ? '✅ ' : '❌ ') + '<strong>解析</strong>&nbsp; ' + q.explanation + '</div>';
    }

    if (isCorrect) {
      App.Gamification.addXp(App.Gamification.XP.DIAGNOSIS_CORRECT);
      App.Gamification.addCoins(App.Gamification.COINS.DIAGNOSIS_CORRECT);
      ds.totalXpEarned += App.Gamification.XP.DIAGNOSIS_CORRECT;
      ds.totalCoinsEarned += App.Gamification.COINS.DIAGNOSIS_CORRECT;

      // 速度检测: < 8秒算快速
      if (elapsed < 8) {
        ds.fastAnswers++;
        if (elapsed < 5 && !App.userProgress._hasSpeedAnswer) {
          App.userProgress._hasSpeedAnswer = true;
        }
      }
    } else {
      ds.perfectSoFar = false;
    }

    // 延迟后下一题
    var self = this;
    setTimeout(function() {
      ds.currentQuestionIndex++;
      if (ds.currentQuestionIndex >= ds.questions.length) {
        self._finishNode();
      } else {
        ds.questionStartTime = Date.now();
        self._renderQuestion();
      }
    }, isCorrect ? 600 : 1500);  // 答对快进，答错多留一会看解析
  },

  // 当前节点诊断完成
  _finishNode: function() {
    clearInterval(this._timerInterval);
    var ds = App.diagnosisState;
    if (!ds || ds.answers.length === 0) return;
    var correctCount = ds.answers.filter(function(a) { return a.correct; }).length;
    var total = ds.answers.length;
    var score = total > 0 ? Math.round(correctCount / total * 100) : 0;
    var avgTime = ds.questionTimes.length > 0 ? ds.questionTimes.reduce(function(a, b) { return a + b; }, 0) / ds.questionTimes.length : 0;

    // 更新知识状态
    App.Gamification.markKnowledgeStatus(ds.currentNodeId, score);

    // 完美诊断奖励
    if (ds.perfectSoFar && total >= 3) {
      App.Gamification.addXp(App.Gamification.XP.PERFECT_DIAGNOSIS);
      App.Gamification.addCoins(10);
      ds.totalXpEarned += App.Gamification.XP.PERFECT_DIAGNOSIS;
      App.userProgress._hasPerfectDiag = true;
    }

    // 速度奖励
    if (ds.fastAnswers >= 2) {
      var speedBonus = ds.fastAnswers * 5;
      App.Gamification.addXp(speedBonus);
      ds.totalXpEarned += speedBonus;
      App.toast('⚡ 速度奖励 +' + speedBonus + 'XP', 'success');
    }

    // 记录到链路
    ds.chain.push({
      nodeId: ds.currentNodeId,
      passed: score >= 80,
      score: score,
      avgTime: avgTime,
      totalTime: (Date.now() - ds.startTime) / 1000,
      correctCount: correctCount,
      total: total
    });

    // 判断是否需要追溯前置
    if (score < 80) {
      this._tracePrerequisites();
    } else {
      // 所有前置都已检查，生成报告
      this._generateReport();
    }
  },

  // 追溯前置知识点
  _tracePrerequisites: function() {
    var ds = App.diagnosisState;
    var nodeId = ds.currentNodeId;
    var node = App.knowledgeGraph[nodeId];

    if (node.prerequisites && node.prerequisites.length > 0) {
      // 找第一个未诊断的前置
      for (var i = 0; i < node.prerequisites.length; i++) {
        var preqId = node.prerequisites[i];
        var alreadyInChain = ds.chain.some(function(c) { return c.nodeId === preqId; });
        if (!alreadyInChain) {
          // 解锁此前置（如果之前被锁）
          var kp = App.userProgress.knowledgeProgress[preqId];
          if (kp && kp.status === 'locked') {
            kp.status = 'unlocked';
          }
          // 开始诊断前置
          var preqNode = App.knowledgeGraph[preqId];
          ds.currentNodeId = preqId;
          ds.currentQuestionIndex = 0;
          var preqQuestions = preqNode.diagnosticQuestions.slice().concat(preqNode._importedDiagnostic || []);
          for (var k = preqQuestions.length - 1; k > 0; k--) {
            var l = Math.floor(Math.random() * (k + 1));
            var tmp2 = preqQuestions[k]; preqQuestions[k] = preqQuestions[l]; preqQuestions[l] = tmp2;
          }
          ds.questions = preqQuestions;
          ds.answers = [];
          ds.questionTimes = [];
          ds.perfectSoFar = true;
          ds.fastAnswers = 0;
          ds.questionStartTime = Date.now();
          App.toast('追溯至前置知识: ' + preqNode.name + ' (来自初中)', 'info');
          this._renderQuestion();
          return;
        }
      }
    }
    // 没有更多前置可追溯
    this._generateReport();
  },

  // 生成诊断报告
  _generateReport: function() {
    var ds = App.diagnosisState;
    var totalXpEarned = ds.totalXpEarned;
    var totalCoinsEarned = ds.totalCoinsEarned;

    // 存储报告数据
    App._lastReport = {
      chain: ds.chain.slice(),
      rootNodeId: ds.rootNodeId,
      totalTime: (Date.now() - ds.startTime) / 1000,
      xpEarned: totalXpEarned,
      coinsEarned: totalCoinsEarned
    };

    App.Storage.save();
    App.navigate('report');
  },

  // 计算知识点的历史平均答题时间
  getNodeAvgTime: function(nodeId) {
    var progress = App.userProgress.knowledgeProgress[nodeId];
    if (!progress || !progress._times) return null;
    var times = progress._times;
    if (times.length === 0) return null;
    return times.reduce(function(a, b) { return a + b; }, 0) / times.length;
  },

  // 记录答题时间（公开方法，供 Practice 等模块调用）
  recordTimes: function(nodeId, times) {
    var progress = App.userProgress.knowledgeProgress[nodeId];
    if (!progress._times) progress._times = [];
    for (var i = 0; i < times.length; i++) {
      progress._times.push(times[i]);
    }
    // 只保留最近50次记录
    if (progress._times.length > 50) {
      progress._times = progress._times.slice(-50);
    }
  },

  // 中止诊断（清理状态）
  _abort: function() {
    clearInterval(this._timerInterval);
    App.diagnosisState = null;
    App.navigate('starmap');
  }
};
