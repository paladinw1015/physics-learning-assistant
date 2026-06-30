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
    App.FocusTracker.start();
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

    // 渲染题号网格
    var ansArr = [];
    for (var i = 0; i < ds.answers.length; i++) {
      ansArr[i] = ds.answers[i].correct;
    }
    App.Ui.renderPalette('diag-palette', ds.questions.length, ds.currentQuestionIndex, ansArr);
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

    // 难度自适应追踪（诊断模式仅追踪不调整）
    if (ds._consecutiveCorrect === undefined) ds._consecutiveCorrect = 0;
    if (ds._consecutiveWrong === undefined) ds._consecutiveWrong = 0;
    if (isCorrect) {
      ds._consecutiveCorrect++;
      ds._consecutiveWrong = 0;
    } else {
      ds._consecutiveWrong++;
      ds._consecutiveCorrect = 0;
    }

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

      // 如果此题在错题本中且答对了，移除它
      var kpCorrect = App.userProgress.knowledgeProgress[ds.currentNodeId];
      if (kpCorrect && kpCorrect._wrongQuestions) {
        for (var w = 0; w < kpCorrect._wrongQuestions.length; w++) {
          if (kpCorrect._wrongQuestions[w].stem === q.stem) {
            kpCorrect._wrongQuestions.splice(w, 1);
            break;
          }
        }
      }
    } else {
      ds.perfectSoFar = false;

      // 记录错题
      var kpWrong = App.userProgress.knowledgeProgress[ds.currentNodeId];
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

    // 立即更新题号网格
    var ansArr = [];
    for (var i = 0; i < ds.answers.length; i++) {
      ansArr[i] = ds.answers[i].correct;
    }
    App.Ui.renderPalette('diag-palette', ds.questions.length, ds.currentQuestionIndex, ansArr);

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
      // 检查是否需要返回之前失败的知识点重试
      if (this._returnToFailedParent()) {
        return;
      }
      // 所有节点都已通过，生成报告
      this._generateReport();
    }
  },

  // 追溯前置后返回失败节点重试
  _returnToFailedParent: function() {
    var ds = App.diagnosisState;
    // 从chain中找最后一个失败且可重试的节点
    for (var i = ds.chain.length - 2; i >= 0; i--) {
      var entry = ds.chain[i];
      if (!entry.passed) {
        // 检查该节点是否在后续chain中已被重试通过
        var alreadyRetried = false;
        for (var m = i + 1; m < ds.chain.length; m++) {
          if (ds.chain[m].nodeId === entry.nodeId && ds.chain[m].passed) {
            alreadyRetried = true; break;
          }
        }
        if (alreadyRetried) continue;

        var failedNode = App.knowledgeGraph[entry.nodeId];
        if (!failedNode || !failedNode.prerequisites) continue;
        // 检查失败节点的所有前置是否都已通过(在chain中)
        var allPrereqsPassed = true;
        for (var j = 0; j < failedNode.prerequisites.length; j++) {
          var found = false;
          for (var k = 0; k < ds.chain.length; k++) {
            if (ds.chain[k].nodeId === failedNode.prerequisites[j] && ds.chain[k].passed) {
              found = true; break;
            }
          }
          if (!found) { allPrereqsPassed = false; break; }
        }
        if (allPrereqsPassed) {
          // 返回失败节点重试
          ds.currentNodeId = entry.nodeId;
          ds.currentQuestionIndex = 0;
          var questions = failedNode.diagnosticQuestions.slice().concat(failedNode._importedDiagnostic || []);
          for (var q = questions.length - 1; q > 0; q--) {
            var r = Math.floor(Math.random() * (q + 1));
            var tmp = questions[q]; questions[q] = questions[r]; questions[r] = tmp;
          }
          ds.questions = questions;
          ds.answers = [];
          ds.questionTimes = [];
          ds.perfectSoFar = true;
          ds.fastAnswers = 0;
          ds.questionStartTime = Date.now();
          App.toast('前置已掌握，重新挑战: ' + failedNode.name, 'info');
          this._renderQuestion();
          return true;
        }
        // 还有前置未通过，继续向前找更早的失败节点
        continue;
      }
    }
    return false;
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
    // 没有更多前置可追溯 - 检查是否有失败节点需要返回
    if (this._returnToFailedParent()) return;
    this._generateReport();
  },

  // 生成诊断报告
  _generateReport: function() {
    var ds = App.diagnosisState;
    var totalXpEarned = ds.totalXpEarned;
    var totalCoinsEarned = ds.totalCoinsEarned;
    var focus = App.FocusTracker.stop();

    // 存储报告数据
    App._lastReport = {
      chain: ds.chain.slice(),
      rootNodeId: ds.rootNodeId,
      totalTime: (Date.now() - ds.startTime) / 1000,
      xpEarned: totalXpEarned,
      coinsEarned: totalCoinsEarned,
      focusReport: focus
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
