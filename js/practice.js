// ===== 练习系统: 计时 + 速度对比 + 进步奖励 =====
App.Practice = {

  // 启动练习
  start: function(nodeId) {
    var node = App.knowledgeGraph[nodeId];
    if (!node) { App.toast('知识点数据未找到', 'error'); return; }

    var kp = App.userProgress.knowledgeProgress[nodeId];
    if (kp && kp.status === 'locked') {
      App.toast('该知识点尚未解锁', 'error');
      return;
    }

    App.FocusTracker.start();
    App.practiceState = {
      currentNodeId: nodeId,
      currentQuestionIndex: 0,
      questions: this._pickQuestions(node, nodeId),
      answers: [],
      startTime: Date.now(),
      questionStartTime: 0,
      questionTimes: [],
      streakCount: 0,
      totalCorrect: 0,
      totalXpEarned: 0,
      totalCoinsEarned: 0,
      fastAnswers: 0,
      allCorrectSoFar: true,
      maxStreak: 0,
      _currentDifficulty: 2
    };

    App.practiceState.questionStartTime = Date.now();
    App.userProgress._practiceCount = (App.userProgress._practiceCount || 0) + 1;
    App.navigate('practice');
    this._renderQuestion();
  },

  // 从题库中选题：错误优先 + 静态题库 + 模板补齐
  _pickQuestions: function(node, nodeId) {
    var kp = App.userProgress.knowledgeProgress[nodeId];
    var wrongQuestions = kp && kp._wrongQuestions ? kp._wrongQuestions : [];

    // Step 1: 从错题本取题（最多 5 道）
    var fromWrong = [];
    for (var w = 0; w < wrongQuestions.length && fromWrong.length < 5; w++) {
      var wq = wrongQuestions[w];
      fromWrong.push({
        stem: wq.stem,
        options: wq.options,
        correct: wq.correct,
        explanation: wq.explanation || '',
        difficulty: 3
      });
    }

    // Step 2: 从静态题库取题（最多 8 道，排除错题本已有的）
    var all = node.practiceQuestions ? node.practiceQuestions.slice() : [];
    if (node._importedPractice) {
      all = all.concat(node._importedPractice);
    }
    // 排除已经在错题中的题
    var wrongStems = {};
    for (var w = 0; w < wrongQuestions.length; w++) {
      wrongStems[wrongQuestions[w].stem] = true;
    }
    var filtered = [];
    for (var i = 0; i < all.length; i++) {
      if (!wrongStems[all[i].stem]) {
        filtered.push(all[i]);
      }
    }
    // 打乱
    for (var i = filtered.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = filtered[i]; filtered[i] = filtered[j]; filtered[j] = tmp;
    }
    var fromPool = filtered.slice(0, Math.min(8, filtered.length));

    // Step 3: 合并错题 + 静态题
    var picked = fromWrong.concat(fromPool);

    // Step 4: 如果还不够 10 道，用模板补齐
    if (picked.length < 10 && App.QuestionTemplates) {
      var needed = 10 - picked.length;
      picked = picked.concat(App.QuestionTemplates.generate(nodeId, needed));
    }

    return picked;
  },

  // 渲染题目
  _renderQuestion: function() {
    var ps = App.practiceState;
    var q = ps.questions[ps.currentQuestionIndex];
    if (!q) { this._finishPractice(); return; }

    // 重置回答状态，允许新题目正常作答
    ps._answered = false;

    var node = App.knowledgeGraph[ps.currentNodeId];
    document.getElementById('practice-title').textContent = '练习: ' + node.name;

    var total = ps.questions.length;
    var cur = ps.currentQuestionIndex + 1;
    document.getElementById('practice-progress-bar').style.width = ((cur - 1) / total * 100) + '%';
    document.getElementById('practice-progress-text').textContent = '第 ' + cur + ' / ' + total + ' 题';
    document.getElementById('practice-score-text').textContent = '✅ ' + ps.totalCorrect + ' | ⚡连续' + ps.streakCount;

    document.getElementById('practice-stem').textContent = q.stem;
    document.getElementById('practice-streak-count').textContent = '';

    var labels = ['A', 'B', 'C', 'D'];
    var html = '';
    for (var i = 0; i < q.options.length; i++) {
      html += '<button class="option-btn" onclick="App.Practice.answer(' + i + ')">' +
        '<span class="letter-badge">' + labels[i] + '</span>' + q.options[i] + '</button>';
    }
    document.getElementById('practice-options').innerHTML = html;

    ps.questionStartTime = Date.now();
    this._startTimer();
    App.Items.renderBar('practice-item-bar');

    // 渲染题号网格
    var ansArr = [];
    for (var i = 0; i < ps.answers.length; i++) {
      ansArr[i] = ps.answers[i].correct;
    }
    App.Ui.renderPalette('practice-palette', ps.questions.length, ps.currentQuestionIndex, ansArr);
  },

  // 计时器
  _startTimer: function() {
    var self = this;
    clearInterval(this._timerInterval);
    // 练习屏幕没有独立计时器显示，复用top-bar时间（如果有的话简化为不显示）
    // 实际计时通过 questionStartTime 记录
  },

  // 回答
  answer: function(choiceIndex) {
    var ps = App.practiceState;
    if (!ps || ps._answered) return; // 防双击
    ps._answered = true;
    var q = ps.questions[ps.currentQuestionIndex];
    if (!q) return;
    var elapsed = (Date.now() - ps.questionStartTime) / 1000;
    ps.questionTimes.push(elapsed);

    var isCorrect = (choiceIndex === q.correct);
    ps.answers.push({ choice: choiceIndex, correct: isCorrect, time: elapsed });

    // 难度自适应追踪
    if (ps._consecutiveCorrect === undefined) ps._consecutiveCorrect = 0;
    if (ps._consecutiveWrong === undefined) ps._consecutiveWrong = 0;
    if (isCorrect) {
      ps._consecutiveCorrect++;
      ps._consecutiveWrong = 0;
    } else {
      ps._consecutiveWrong++;
      ps._consecutiveCorrect = 0;
    }
    ps._currentDifficulty = ps._currentDifficulty || 2;
    // 连续 3 道答对 → 提高难度
    if (ps._consecutiveCorrect >= 3 && ps._currentDifficulty < 5) {
      ps._currentDifficulty++;
      ps._consecutiveCorrect = 0;
    }
    // 连续 2 道答错 → 降低难度
    if (ps._consecutiveWrong >= 2 && ps._currentDifficulty > 1) {
      ps._currentDifficulty--;
      ps._consecutiveWrong = 0;
    }

    if (isCorrect) {
      ps.totalCorrect++;
      ps.streakCount++;
      if (ps.streakCount > ps.maxStreak) ps.maxStreak = ps.streakCount;

      // 基础奖励
      App.Gamification.addXp(App.Gamification.XP.PRACTICE_CORRECT);
      App.Gamification.addCoins(App.Gamification.COINS.PRACTICE_CORRECT);
      ps.totalXpEarned += App.Gamification.XP.PRACTICE_CORRECT;
      ps.totalCoinsEarned += App.Gamification.COINS.PRACTICE_CORRECT;

      // 连续回答加成
      if (ps.streakCount >= 3) {
        var streakBonus = Math.min(ps.streakCount, 10) * App.Gamification.XP.STREAK_BONUS;
        App.Gamification.addXp(streakBonus);
        ps.totalXpEarned += streakBonus;
        document.getElementById('practice-streak-count').textContent = '🔥 ' + ps.streakCount + '连对！+' + streakBonus + 'XP';
      }

      // 速度检测
      if (elapsed < 6) {
        ps.fastAnswers++;
        var speedBonus = (elapsed < 3) ? 8 : 4;
        App.Gamification.addXp(speedBonus);
        ps.totalXpEarned += speedBonus;
      }

      // 如果此题在错题本中且答对了，移除它
      var kpCorrect = App.userProgress.knowledgeProgress[ps.currentNodeId];
      if (kpCorrect && kpCorrect._wrongQuestions) {
        for (var w = 0; w < kpCorrect._wrongQuestions.length; w++) {
          if (kpCorrect._wrongQuestions[w].stem === q.stem) {
            kpCorrect._wrongQuestions.splice(w, 1);
            break;
          }
        }
      }
    } else {
      ps.streakCount = 0;
      ps.allCorrectSoFar = false;
      document.getElementById('practice-streak-count').textContent = '';

      // 记录错题
      var kpWrong = App.userProgress.knowledgeProgress[ps.currentNodeId];
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

    // 按钮反馈
    var btns = document.querySelectorAll('#practice-options .option-btn');
    for (var i = 0; i < btns.length; i++) {
      btns[i].style.pointerEvents = 'none';
      if (i === q.correct) btns[i].classList.add('correct');
      if (i === choiceIndex && !isCorrect) btns[i].classList.add('wrong');
    }
    // 显示解析
    var expEl = document.getElementById('practice-explanation');
    if (expEl && q.explanation) {
      expEl.innerHTML = '<div class="explain-box">' +
        (isCorrect ? '✅ ' : '❌ ') + '<strong>解析</strong>&nbsp; ' + q.explanation + '</div>';
    }

    // 进度条即时更新
    document.getElementById('practice-progress-bar').style.width = (ps.currentQuestionIndex / ps.questions.length * 100) + '%';
    document.getElementById('practice-score-text').textContent = '✅ ' + ps.totalCorrect + ' | ⚡连续' + ps.streakCount;

    // 立即更新题号网格
    var ansArr = [];
    for (var i = 0; i < ps.answers.length; i++) {
      ansArr[i] = ps.answers[i].correct;
    }
    App.Ui.renderPalette('practice-palette', ps.questions.length, ps.currentQuestionIndex, ansArr);

    var self = this;
    setTimeout(function() {
      ps.currentQuestionIndex++;
      if (ps.currentQuestionIndex >= ps.questions.length) {
        self._finishPractice();
      } else {
        ps.questionStartTime = Date.now();
        self._renderQuestion();
      }
    }, isCorrect ? 500 : 1200);
  },

  // 练习完成
  _finishPractice: function() {
    var ps = App.practiceState;
    var nodeId = ps.currentNodeId;
    var node = App.knowledgeGraph[nodeId];
    var total = ps.answers.length;
    if (total === 0) return;
    var correctCount = ps.totalCorrect;
    var score = Math.round(correctCount / total * 100);
    var avgTime = ps.questionTimes.length > 0 ? ps.questionTimes.reduce(function(a, b) { return a + b; }, 0) / total : 0;
    var totalTime = (Date.now() - ps.startTime) / 1000;

    // 记录答题时间到知识进度
    App.Diagnosis.recordTimes(nodeId, ps.questionTimes);

    // 更新知识进度
    var kp = App.userProgress.knowledgeProgress[nodeId];
    kp.practiceCompleted = (kp.practiceCompleted || 0) + 1;
    kp.practiceTotal = (kp.practiceTotal || 0) + total;

    if (score >= 80) {
      App.Gamification.markKnowledgeStatus(nodeId, score);
    }

    // 全部正确奖励
    if (ps.allCorrectSoFar && total >= 5) {
      App.Gamification.addXp(App.Gamification.XP.PERFECT_PRACTICE);
      App.Gamification.addCoins(8);
      ps.totalXpEarned += App.Gamification.XP.PERFECT_PRACTICE;
      ps.totalCoinsEarned += 8;
    }

    // 速度进步奖励: 对比该知识点历史平均时间
    var historyAvg = App.Diagnosis.getNodeAvgTime(nodeId);
    var speedImproved = false;
    var improvementPct = 0;
    if (historyAvg && historyAvg > 0) {
      improvementPct = Math.round((historyAvg - avgTime) / historyAvg * 100);
      if (improvementPct > 15) {
        speedImproved = true;
        var improveBonus = Math.min(Math.round(improvementPct / 5) * 5, 30);
        App.Gamification.addXp(improveBonus);
        ps.totalXpEarned += improveBonus;
      }
    }

    // 知识掌握奖励
    if (score >= 80 && kp.status === 'mastered') {
      App.Gamification.addXp(App.Gamification.XP.KNOWLEDGE_MASTERED);
      App.Gamification.addCoins(App.Gamification.COINS.KNOWLEDGE_MASTERED);
      ps.totalXpEarned += App.Gamification.XP.KNOWLEDGE_MASTERED;
      ps.totalCoinsEarned += App.Gamification.COINS.KNOWLEDGE_MASTERED;
    }

    // 存储练习结果
    var focus = App.FocusTracker.stop();
    App._lastPracticeResult = {
      nodeId: nodeId,
      nodeName: node.name,
      score: score,
      correctCount: correctCount,
      total: total,
      avgTime: avgTime,
      totalTime: totalTime,
      historyAvg: historyAvg,
      speedImproved: speedImproved,
      improvementPct: improvementPct,
      streakBest: ps.maxStreak || ps.streakCount,
      xpEarned: ps.totalXpEarned,
      coinsEarned: ps.totalCoinsEarned,
      questionTimes: ps.questionTimes.slice(),
      answers: ps.answers.slice(),
      focusReport: focus
    };

    App.Storage.save();
    App.navigate('practice-result');
  },

  // 中止练习
  _abort: function() {
    App.practiceState = null;
    App.navigate('dashboard');
  }
};
