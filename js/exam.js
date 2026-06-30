// ===== 综合考试模式: 20选择 + 3计算 / 30分钟 / 暂停续考 =====
App.Exam = {

  TOTAL_MC: 20,
  TOTAL_CALC: 3,
  TIME_LIMIT: 30 * 60, // 30分钟(秒) — 调试时可临时改为30秒
  MC_POINTS: 4,        // 每题4分
  CALC_POINTS: 10,     // 每题10分(计算题)
  MAX_SCORE: 20 * 4 + 3 * 10, // = 110(超过100按100记)
  PASS_SCORE: 60,

  // 启动考试
  start: function() {
    if (App.examState && App.examState._paused) {
      this._resume();
      return;
    }

    // 从全题库选题（20道选择 + 3道计算，确保不重复）
    var mcQuestions = this._pickMC();
    var calcQuestions = this._pickCalc(mcQuestions);

    if (mcQuestions.length < 10) { App.toast('题库不足，请先补充题目', 'error'); return; }

    App.FocusTracker.start();
    App.examState = {
      mcQuestions: mcQuestions,
      calcQuestions: calcQuestions,
      phase: 'mc',       // 'mc' | 'calc' | 'done'
      currentMCIndex: 0,
      mcAnswers: [],
      calcAnswers: [],
      questionStartTime: 0,
      remainingTime: this.TIME_LIMIT,
      startTime: Date.now(),
      pausedAt: null,
      _answered: false
    };

    App.examState.questionStartTime = Date.now();
    this._saveExam();
    App.navigate('exam');
    this._renderMC();
  },

  // 恢复暂停的考试
  _resume: function() {
    if (!App.examState || !App.examState._paused) return;
    App.examState._paused = false;
    App.examState.pausedAt = null;
    // 只在当前题未答时重置答题锁（防止暂停恢复后重复作答）
    var es = App.examState;
    if (es.phase === 'mc' && es.mcAnswers.length <= es.currentMCIndex) {
      es._answered = false;
    } else if (es.phase === 'calc' && es.calcAnswers.length <= (es.currentCalcIndex || 0)) {
      es._answered = false;
    }
    App.examState.startTime = Date.now() - (this.TIME_LIMIT - App.examState.remainingTime) * 1000;
    App.navigate('exam');
    if (App.examState.phase === 'mc') this._renderMC();
    else if (App.examState.phase === 'calc') this._renderCalc();
    this._startTimer();
  },

  // 选题：选择（从全题库打乱随机取20道）
  _pickMC: function() {
    var all = [];
    var ids = Object.keys(App.knowledgeGraph);
    for (var i = 0; i < ids.length; i++) {
      var node = App.knowledgeGraph[ids[i]];
      var qs = (node.diagnosticQuestions || []).concat(node.practiceQuestions || []);
      if (node._importedPractice) qs = qs.concat(node._importedPractice);
      if (node._importedDiagnostic) qs = qs.concat(node._importedDiagnostic);
      for (var j = 0; j < qs.length; j++) {
        if (qs[j].options && qs[j].options.length === 4) {
          qs[j]._sourceNode = ids[i];
          all.push(qs[j]);
        }
      }
    }
    // 随机取20道
    for (var i = all.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = all[i]; all[i] = all[j]; all[j] = tmp;
    }
    return all.slice(0, this.TOTAL_MC);
  },

  // 选题：计算题（从高难度习题中取，排除已入选MC的题）
  _pickCalc: function(mcQuestions) {
    var all = [];
    var ids = Object.keys(App.knowledgeGraph);
    for (var i = 0; i < ids.length; i++) {
      var node = App.knowledgeGraph[ids[i]];
      var qs = (node.practiceQuestions || []).slice();
      if (node._importedPractice) qs = qs.concat(node._importedPractice);
      for (var j = 0; j < qs.length; j++) {
        if ((qs[j].difficulty || 1) >= 3 && qs[j].options && qs[j].options.length === 4) {
          // 排除已在MC中的题目
          if (mcQuestions.indexOf(qs[j]) < 0) {
            qs[j]._sourceNode = ids[i];
            all.push(qs[j]);
          }
        }
      }
    }
    for (var i = all.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = all[i]; all[i] = all[j]; all[j] = tmp;
    }
    // 只取3道，显示为选项题（方便自动判分）
    return all.slice(0, this.TOTAL_CALC);
  },

  // ===== MC 阶段 =====
  _renderMC: function() {
    var es = App.examState;
    if (!es || es.currentMCIndex >= es.mcQuestions.length) { this._startCalcPhase(); return; }

    es.phase = 'mc';
    es._answered = false;
    var q = es.mcQuestions[es.currentMCIndex];
    var cur = es.currentMCIndex + 1;
    var totalMC = es.mcQuestions.length;
    document.getElementById('exam-phase-text').textContent = '选择题 ' + cur + '/' + totalMC;
    document.getElementById('exam-progress-bar').style.width = (es.currentMCIndex / (totalMC + es.calcQuestions.length) * 100) + '%';
    document.getElementById('exam-stem').textContent = q.stem;

    var labels = ['A', 'B', 'C', 'D'];
    var html = '';
    for (var i = 0; i < q.options.length; i++) {
      html += '<button class="option-btn" onclick="App.Exam.answerMC(' + i + ')">' +
        '<span class="letter-badge">' + labels[i] + '</span>' + q.options[i] + '</button>';
    }
    document.getElementById('exam-options').innerHTML = html;
    document.getElementById('exam-answer-input').style.display = 'none';

    es.questionStartTime = Date.now();
    this._startTimer();

    // 渲染题号网格
    var total = es.mcQuestions.length + es.calcQuestions.length;
    var ansArr = [];
    for (var i = 0; i < es.mcAnswers.length; i++) {
      ansArr[i] = es.mcAnswers[i].correct;
    }
    for (var i = 0; i < es.calcAnswers.length; i++) {
      ansArr[es.mcQuestions.length + i] = es.calcAnswers[i].correct;
    }
    App.Ui.renderPalette('exam-palette', total, es.currentMCIndex, ansArr);
  },

  answerMC: function(choiceIndex) {
    var es = App.examState;
    if (!es || es._answered) return;
    es._answered = true;

    var q = es.mcQuestions[es.currentMCIndex];
    var isCorrect = (choiceIndex === q.correct);
    es.mcAnswers.push({ choice: choiceIndex, correct: isCorrect });

    // 记录/移除错题
    var sourceNode = q._sourceNode;
    if (sourceNode) {
      var kp = App.userProgress.knowledgeProgress[sourceNode];
      if (kp) {
        if (isCorrect) {
          // 答对了，从错题本移除
          if (kp._wrongQuestions) {
            for (var w = 0; w < kp._wrongQuestions.length; w++) {
              if (kp._wrongQuestions[w].stem === q.stem) {
                kp._wrongQuestions.splice(w, 1);
                break;
              }
            }
          }
        } else {
          // 答错了，记录错题
          if (!kp._wrongQuestions) kp._wrongQuestions = [];
          var existing = null;
          for (var w = 0; w < kp._wrongQuestions.length; w++) {
            if (kp._wrongQuestions[w].stem === q.stem) {
              existing = kp._wrongQuestions[w];
              break;
            }
          }
          if (existing) {
            existing.timesWrong++;
            existing.userChoice = choiceIndex;
            existing.timestamp = Date.now();
          } else {
            kp._wrongQuestions.push({
              stem: q.stem,
              options: q.options.slice(),
              correct: q.correct,
              userChoice: choiceIndex,
              explanation: q.explanation || '',
              timestamp: Date.now(),
              timesWrong: 1
            });
          }
          if (kp._wrongQuestions.length > 50) {
            kp._wrongQuestions = kp._wrongQuestions.slice(-50);
          }
        }
      }
    }

    // 按钮反馈
    var btns = document.querySelectorAll('#exam-options .option-btn');
    for (var i = 0; i < btns.length; i++) {
      btns[i].style.pointerEvents = 'none';
      if (i === q.correct) btns[i].classList.add('correct');
      if (i === choiceIndex && !isCorrect) btns[i].classList.add('wrong');
    }

    // 显示解析
    var expEl = document.getElementById('exam-explanation');
    if (expEl && q.explanation) {
      expEl.innerHTML = '<div class="explain-box">' + (isCorrect ? '✅ ' : '❌ ') + q.explanation + '</div>';
    }

    // 更新题号网格
    var total = es.mcQuestions.length + es.calcQuestions.length;
    var ansArr = [];
    for (var i = 0; i < es.mcAnswers.length; i++) {
      ansArr[i] = es.mcAnswers[i].correct;
    }
    App.Ui.renderPalette('exam-palette', total, es.currentMCIndex, ansArr);

    var self = this;
    setTimeout(function() {
      es.currentMCIndex++;
      es._answered = false;
      if (es.currentMCIndex >= es.mcQuestions.length) {
        self._startCalcPhase();
      } else {
        self._renderMC();
      }
    }, 800);
  },

  // ===== 计算题阶段 =====
  _startCalcPhase: function() {
    var es = App.examState;
    es.phase = 'calc';
    es.currentCalcIndex = 0;
    if (es.calcQuestions.length === 0) { this._submit(); return; }
    this._renderCalc();
  },

  _renderCalc: function() {
    var es = App.examState;
    if (!es || es.currentCalcIndex >= es.calcQuestions.length) { this._submit(); return; }

    es._answered = false;
    var q = es.calcQuestions[es.currentCalcIndex];
    var cur = es.currentCalcIndex + 1;
    var totalMC = es.mcQuestions.length, totalCalc = es.calcQuestions.length;
    document.getElementById('exam-phase-text').textContent = '计算题 ' + cur + '/' + totalCalc + ' (每题10分)';
    document.getElementById('exam-progress-bar').style.width = ((totalMC + es.currentCalcIndex) / (totalMC + totalCalc) * 100) + '%';

    // 计算题也显示为4选项（方便自动判分）
    document.getElementById('exam-stem').textContent = q.stem;
    var labels = ['A', 'B', 'C', 'D'];
    var html = '';
    for (var i = 0; i < q.options.length; i++) {
      html += '<button class="option-btn" onclick="App.Exam.answerCalc(' + i + ')">' +
        '<span class="letter-badge">' + labels[i] + '</span>' + q.options[i] + '</button>';
    }
    document.getElementById('exam-options').innerHTML = html;
    document.getElementById('exam-answer-input').style.display = 'none';

    es.questionStartTime = Date.now();
    this._startTimer();

    // 渲染题号网格
    var total = es.mcQuestions.length + es.calcQuestions.length;
    var ansArr = [];
    for (var i = 0; i < es.mcAnswers.length; i++) {
      ansArr[i] = es.mcAnswers[i].correct;
    }
    for (var i = 0; i < es.calcAnswers.length; i++) {
      ansArr[es.mcQuestions.length + i] = es.calcAnswers[i].correct;
    }
    var currentIdx = es.mcQuestions.length + (es.currentCalcIndex || 0);
    App.Ui.renderPalette('exam-palette', total, currentIdx, ansArr);
  },

  answerCalc: function(choiceIndex) {
    var es = App.examState;
    if (!es || es._answered) return;
    es._answered = true;

    var q = es.calcQuestions[es.currentCalcIndex];
    var isCorrect = (choiceIndex === q.correct);
    es.calcAnswers.push({ choice: choiceIndex, correct: isCorrect });

    // 记录/移除错题
    var sourceNode = q._sourceNode;
    if (sourceNode) {
      var kp = App.userProgress.knowledgeProgress[sourceNode];
      if (kp) {
        if (isCorrect) {
          if (kp._wrongQuestions) {
            for (var w = 0; w < kp._wrongQuestions.length; w++) {
              if (kp._wrongQuestions[w].stem === q.stem) {
                kp._wrongQuestions.splice(w, 1);
                break;
              }
            }
          }
        } else {
          if (!kp._wrongQuestions) kp._wrongQuestions = [];
          var existing = null;
          for (var w = 0; w < kp._wrongQuestions.length; w++) {
            if (kp._wrongQuestions[w].stem === q.stem) {
              existing = kp._wrongQuestions[w];
              break;
            }
          }
          if (existing) {
            existing.timesWrong++;
            existing.userChoice = choiceIndex;
            existing.timestamp = Date.now();
          } else {
            kp._wrongQuestions.push({
              stem: q.stem,
              options: q.options.slice(),
              correct: q.correct,
              userChoice: choiceIndex,
              explanation: q.explanation || '',
              timestamp: Date.now(),
              timesWrong: 1
            });
          }
          if (kp._wrongQuestions.length > 50) {
            kp._wrongQuestions = kp._wrongQuestions.slice(-50);
          }
        }
      }
    }

    var btns = document.querySelectorAll('#exam-options .option-btn');
    for (var i = 0; i < btns.length; i++) {
      btns[i].style.pointerEvents = 'none';
      if (i === q.correct) btns[i].classList.add('correct');
      if (i === choiceIndex && !isCorrect) btns[i].classList.add('wrong');
    }

    var expEl = document.getElementById('exam-explanation');
    if (expEl && q.explanation) {
      expEl.innerHTML = '<div class="explain-box">' + (isCorrect ? '✅ ' : '❌ ') + q.explanation + '</div>';
    }

    // 更新题号网格
    var total = es.mcQuestions.length + es.calcQuestions.length;
    var ansArr = [];
    for (var i = 0; i < es.mcAnswers.length; i++) {
      ansArr[i] = es.mcAnswers[i].correct;
    }
    for (var i = 0; i < es.calcAnswers.length; i++) {
      ansArr[es.mcQuestions.length + i] = es.calcAnswers[i].correct;
    }
    var currentIdx = es.mcQuestions.length + (es.currentCalcIndex || 0);
    App.Ui.renderPalette('exam-palette', total, currentIdx, ansArr);

    var self = this;
    setTimeout(function() {
      es.currentCalcIndex++;
      es._answered = false;
      if (es.currentCalcIndex >= es.calcQuestions.length) {
        self._submit();
      } else {
        self._renderCalc();
      }
    }, 1200);
  },

  // ===== 计时器 + 暂停续考 =====
  _startTimer: function() {
    var self = this;
    clearInterval(this._examTimer);
    this._examTimer = setInterval(function() {
      var es = App.examState;
      if (!es || es._paused) return;
      es.remainingTime = Math.max(0, Math.floor(self.TIME_LIMIT - (Date.now() - es.startTime) / 1000));
      var el = document.getElementById('exam-timer');
      if (el) {
        var m = Math.floor(es.remainingTime / 60);
        var s = es.remainingTime % 60;
        el.textContent = (es.remainingTime < 300 ? '⏰ ' : '⏱ ') + m + ':' + (s < 10 ? '0' : '') + s;
        if (es.remainingTime < 300) el.style.color = 'var(--red)';
      }
      if (es.remainingTime <= 0) {
        clearInterval(self._examTimer);
        self._submit();
      }
    }, 1000);

    // 页面隐藏时暂停（先移除再添加，防重复）
    document.removeEventListener('visibilitychange', this._onVisibility);
    document.addEventListener('visibilitychange', this._onVisibility);
  },

  _onVisibility: function() {
    var es = App.examState;
    if (!es || es.phase === 'done') return;
    if (document.hidden) {
      // 暂停
      es._paused = true;
      es.pausedAt = Date.now();
      es.remainingTime = Math.max(0, Math.floor(App.Exam.TIME_LIMIT - (es.pausedAt - es.startTime) / 1000));
      clearInterval(App.Exam._examTimer);
      App.Exam._saveExam();
    } else {
      // 恢复
      App.Exam._resume();
    }
  },

  // ===== 保存/恢复考试状态 =====
  _saveExam: function() {
    try {
      var es = App.examState;
      if (!es) return;
      var save = {
        mcQuestions: es.mcQuestions, calcQuestions: es.calcQuestions,
        phase: es.phase, currentMCIndex: es.currentMCIndex,
        currentCalcIndex: es.currentCalcIndex || 0,
        mcAnswers: es.mcAnswers, calcAnswers: es.calcAnswers,
        remainingTime: es.remainingTime, _paused: true,
        pausedAt: Date.now()
      };
      localStorage.setItem('physics_exam_state', JSON.stringify(save));
    } catch(e) {}
  },

  checkSavedExam: function() {
    try {
      var raw = localStorage.getItem('physics_exam_state');
      if (!raw) return false;
      var saved = JSON.parse(raw);
      if (saved.phase === 'done') return false;
      App.examState = saved;
      return true;
    } catch(e) { return false; }
  },

  clearSavedExam: function() {
    try { localStorage.removeItem('physics_exam_state'); } catch(e) {}
  },

  // ===== 交卷 =====
  _submit: function() {
    clearInterval(this._examTimer);
    document.removeEventListener('visibilitychange', this._onVisibility);
    var es = App.examState;
    if (!es || es.phase === 'done') return;

    es.phase = 'done';
    this.clearSavedExam();

    // 计算分数
    var mcCorrect = es.mcAnswers.filter(function(a) { return a.correct; }).length;
    var calcCorrect = es.calcAnswers.filter(function(a) { return a.correct; }).length;
    var mcScore = mcCorrect * this.MC_POINTS;
    var calcScore = calcCorrect * this.CALC_POINTS;
    var rawScore = mcScore + calcScore;
    var finalScore = Math.min(rawScore, 100);

    // 用时
    var usedTime = Math.floor(this.TIME_LIMIT - es.remainingTime);

    // 奖励倍数
    var multiplier = 1.0;
    var bonusLabel = '';
    if (finalScore >= 100) { multiplier = 2.0; bonusLabel = '满分 ×2.0'; }
    else if (finalScore >= 90) { multiplier = 1.5; bonusLabel = '优秀 ×1.5'; }
    else if (finalScore >= 80) { multiplier = 1.2; bonusLabel = '良好 ×1.2'; }

    // 基础XP = 正确题数 × 15（考试每题价值更高）
    var baseXp = (mcCorrect + calcCorrect) * 15;
    var bonusXp = Math.round(baseXp * (multiplier - 1));
    var totalXp = baseXp + bonusXp;
    var totalCoins = Math.round((mcCorrect + calcCorrect) * 3 * multiplier);

    App.Gamification.addXp(totalXp);
    App.Gamification.addCoins(totalCoins);
    App.Gamification._checkBadges();
    App.Storage.save();

    var focus = App.FocusTracker.stop();

    App._lastExamResult = {
      mcCorrect: mcCorrect, mcTotal: es.mcQuestions.length,
      calcCorrect: calcCorrect, calcTotal: es.calcQuestions.length,
      rawScore: rawScore, finalScore: finalScore,
      usedTime: usedTime, multiplier: multiplier, bonusLabel: bonusLabel,
      xpEarned: totalXp, coinsEarned: totalCoins,
      mcAnswers: es.mcAnswers.slice(),
      calcAnswers: es.calcAnswers.slice(),
      mcQuestions: es.mcQuestions.slice(),
      calcQuestions: es.calcQuestions.slice(),
      focusReport: focus
    };

    App.navigate('exam-result');
  },

  // 退出考试（保存状态）
  exit: function() {
    if (!App.examState || App.examState.phase === 'done') {
      this.clearSavedExam();
      App.examState = null;
      App.navigate('dashboard');
      return;
    }
    if (confirm('确定退出考试吗？进度将被保存，下次可继续。')) {
      var es = App.examState;
      es._paused = true;
      es.pausedAt = Date.now();
      es.remainingTime = Math.max(0, Math.floor(this.TIME_LIMIT - (es.pausedAt - es.startTime) / 1000));
      clearInterval(this._examTimer);
      document.removeEventListener('visibilitychange', this._onVisibility);
      this._saveExam();
      App.toast('考试进度已保存', 'info');
      App.navigate('dashboard');
    }
  }
};
