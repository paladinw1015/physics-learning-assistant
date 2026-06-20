// ===== 游戏化系统: XP/等级/徽章/连续天数/金币/速度奖励 =====
App.Gamification = {

  XP: {
    DIAGNOSIS_CORRECT: 15,
    PRACTICE_CORRECT: 10,
    STREAK_BONUS: 5,
    SPEED_FAST: 6,          // 单题<6秒
    SPEED_ULTRA: 10,        // 单题<3秒
    SPEED_IMPROVE_BASE: 15, // 速度进步基础奖励
    KNOWLEDGE_MASTERED: 80,
    DAILY_VISIT: 20,
    PERFECT_DIAGNOSIS: 50,
    PERFECT_PRACTICE: 40
  },

  COINS: {
    DIAGNOSIS_CORRECT: 2,
    PRACTICE_CORRECT: 1,
    KNOWLEDGE_MASTERED: 15,
    DAILY_VISIT: 5
  },

  XP_PER_LEVEL: [0, 200, 500, 1000, 1800, 3000, 5000, 8000, 12000, 18000, 25000],

  LEVEL_TITLES: [
    '物理小白', '力学学徒', '运动观察者', '力的掌控者', '运动分析师',
    '力学达人', '牛顿追随者', '物理解题家', '物理高手', '物理大师', '物理传说'
  ],

  BADGES: [
    { id: 'first_diagnosis', name: '初次诊断', icon: '🔍', desc: '完成第一次知识诊断', condition: 'diagnosisCount >= 1' },
    { id: 'first_practice', name: '初次练习', icon: '✏️', desc: '完成第一次练习', condition: 'practiceCount >= 1' },
    { id: 'first_mastery', name: '首个掌握', icon: '⭐', desc: '第一个知识点达到已掌握', condition: 'masteredCount >= 1' },
    { id: 'streak_3', name: '连续三天', icon: '🔥', desc: '连续学习3天', condition: 'streakBest >= 3' },
    { id: 'streak_7', name: '周不懈', icon: '💪', desc: '连续学习7天', condition: 'streakBest >= 7' },
    { id: 'perfect_diag', name: '完美诊断', icon: '💯', desc: '一次诊断全部答对', condition: 'hasPerfectDiag' },
    { id: 'speed_demon', name: '快如闪电', icon: '⚡', desc: '单题5秒内答对', condition: 'hasSpeedAnswer' },
    { id: 'speed_improver', name: '提速达人', icon: '🚀', desc: '同知识点答题速度提升20%以上', condition: 'hasSpeedImprove' },
    { id: 'master_3', name: '小有所成', icon: '🌟', desc: '掌握3个知识点', condition: 'masteredCount >= 3' },
    { id: 'master_5', name: '知识猎手', icon: '🎯', desc: '掌握5个知识点', condition: 'masteredCount >= 5' },
    { id: 'master_10', name: '力学之星', icon: '🏆', desc: '掌握10个知识点', condition: 'masteredCount >= 10' },
    { id: 'coin_100', name: '小有积蓄', icon: '🪙', desc: '累计获得100金币', condition: 'totalCoinsEarned >= 100' },
    { id: 'level_5', name: '晋升之路', icon: '📈', desc: '达到等级5', condition: 'level >= 5' },
    { id: 'all_mastered', name: '物理必修一全通', icon: '👑', desc: '全部17个知识点掌握', condition: 'masteredCount >= 17' },
    { id: 'comeback', name: '卷土重来', icon: '🔄', desc: '薄弱知识点重新诊断后掌握', condition: 'hasComeback' },
    { id: 'boss_ch1', name: '运动描述之龙', icon: '🌀', desc: '击败第1章Boss', condition: '!!boss1_cleared' },
    { id: 'boss_ch2', name: '变速魔王', icon: '🚀', desc: '击败第2章Boss', condition: '!!boss2_cleared' },
    { id: 'boss_ch3', name: '力学武士', icon: '⚔️', desc: '击败第3章Boss', condition: '!!boss3_cleared' },
    { id: 'boss_ch4', name: '牛顿之果', icon: '🍎', desc: '击败第4章终极Boss', condition: '!!boss4_cleared' }
  ],

  checkStreak: function() {
    var today = new Date().toISOString().split('T')[0];
    var streak = App.userProgress.streak;
    if (!streak.lastDate) {
      streak.current = 1; streak.best = 1; streak.lastDate = today; return;
    }
    if (streak.lastDate === today) return;
    var lastDate = new Date(streak.lastDate);
    var todayDate = new Date(today);
    var diffDays = Math.round((todayDate - lastDate) / 86400000);
    if (diffDays === 1) { streak.current += 1; }
    else if (diffDays > 1) { streak.current = 1; }
    streak.lastDate = today;
    if (streak.current > streak.best) streak.best = streak.current;
  },

  claimDailyReward: function() {
    var today = new Date().toISOString().split('T')[0];
    if (App.userProgress._lastDailyClaim === today) return;
    App.userProgress._lastDailyClaim = today;
    this.addXp(this.XP.DAILY_VISIT);
    this.addCoins(this.COINS.DAILY_VISIT);
  },

  addXp: function(amount) {
    var oldLevel = this.getLevel();
    App.userProgress.xp += amount;
    var newLevel = this.getLevel();
    if (newLevel > oldLevel) {
      App.toast('🎉 升级！' + this.LEVEL_TITLES[Math.min(newLevel - 1, 10)], 'success');
    }
    this._checkBadges();
    App.Storage.save();
  },

  addCoins: function(amount) {
    App.userProgress.coins += amount;
    App.userProgress.totalCoinsEarned = (App.userProgress.totalCoinsEarned || 0) + amount;
    this._checkBadges();
    App.Storage.save();
  },

  getLevel: function() {
    var xp = App.userProgress.xp;
    var lvl = 1;
    for (var i = 1; i < this.XP_PER_LEVEL.length; i++) {
      if (xp >= this.XP_PER_LEVEL[i]) lvl = i + 1;
    }
    return lvl;
  },

  getXpInfo: function() {
    var lvl = this.getLevel();
    var curMin = this.XP_PER_LEVEL[lvl - 1] || 0;
    var nextMin = this.XP_PER_LEVEL[lvl] || (curMin + 1000);
    return {
      level: lvl, title: this.LEVEL_TITLES[Math.min(lvl - 1, 10)],
      current: App.userProgress.xp - curMin, total: nextMin - curMin,
      pct: Math.round((App.userProgress.xp - curMin) / (nextMin - curMin) * 100)
    };
  },

  getStats: function() {
    var kp = App.userProgress.knowledgeProgress;
    var mastered = 0, inProgress = 0, weak = 0, locked = 0;
    var ids = Object.keys(kp);
    for (var i = 0; i < ids.length; i++) {
      var s = kp[ids[i]].status;
      if (s === 'mastered') mastered++;
      else if (s === 'progress') inProgress++;
      else if (s === 'weak') weak++;
      else locked++;
    }
    return { mastered: mastered, progress: inProgress, weak: weak, locked: locked, total: ids.length };
  },

  _checkBadges: function() {
    var badges = App.userProgress.badges;
    var stats = this.getStats();
    var s = App.userProgress.streak;
    var c = {
      diagnosisCount: App.userProgress._diagnosisCount || 0,
      practiceCount: App.userProgress._practiceCount || 0,
      masteredCount: stats.mastered,
      streakBest: s.best || 0,
      hasPerfectDiag: !!App.userProgress._hasPerfectDiag,
      hasSpeedAnswer: !!App.userProgress._hasSpeedAnswer,
      hasSpeedImprove: !!App.userProgress._hasSpeedImprove,
      totalCoinsEarned: App.userProgress.totalCoinsEarned || 0,
      level: this.getLevel(),
      hasComeback: !!App.userProgress._hasComeback,
      boss1_cleared: (App.userProgress._bossCleared || []).indexOf('boss_ch1') >= 0,
      boss2_cleared: (App.userProgress._bossCleared || []).indexOf('boss_ch2') >= 0,
      boss3_cleared: (App.userProgress._bossCleared || []).indexOf('boss_ch3') >= 0,
      boss4_cleared: (App.userProgress._bossCleared || []).indexOf('boss_ch4') >= 0
    };
    for (var i = 0; i < this.BADGES.length; i++) {
      var b = this.BADGES[i];
      if (badges.indexOf(b.id) < 0 && this._eval(b.condition, c)) {
        badges.push(b.id);
        App.toast('🏅 获得徽章: ' + b.name + '!', 'success');
      }
    }
  },

  _eval: function(cond, vars) {
    var m = cond.match(/^(\w+)\s*(>=|<=|>)\s*([\d.]+)$/);
    if (m) {
      var v = vars[m[1]] || 0;
      var t = parseFloat(m[3]);
      if (m[2] === '>=') return v >= t;
      if (m[2] === '>') return v > t;
      if (m[2] === '<=') return v <= t;
    }
    m = cond.match(/^!!(\w+)$/);
    if (m) return !!vars[m[1]];
    return false;
  },

  markKnowledgeStatus: function(nodeId, score) {
    var kp = App.userProgress.knowledgeProgress;
    if (!kp[nodeId]) kp[nodeId] = { status: 'unlocked', score: 0, attempts: 0, _times: [] };
    kp[nodeId].attempts = (kp[nodeId].attempts || 0) + 1;
    kp[nodeId].score = score;
    var prev = kp[nodeId].status;
    if (score >= 80) kp[nodeId].status = 'mastered';
    else if (score >= 50) kp[nodeId].status = 'progress';
    else kp[nodeId].status = 'weak';
    if (prev === 'weak' && kp[nodeId].status === 'mastered') {
      App.userProgress._hasComeback = true;
    }
    this._unlockDependents(nodeId);
    this._checkBadges();
  },

  _unlockDependents: function(masteredId) {
    var allIds = Object.keys(App.knowledgeGraph);
    var kp = App.userProgress.knowledgeProgress;
    for (var i = 0; i < allIds.length; i++) {
      var id = allIds[i];
      var node = App.knowledgeGraph[id];
      if (!node.prerequisites || node.prerequisites.length === 0) continue;
      if (kp[id] && kp[id].status !== 'locked') continue;
      var allOk = true;
      for (var j = 0; j < node.prerequisites.length; j++) {
        var preq = kp[node.prerequisites[j]];
        if (!preq || preq.status !== 'mastered') { allOk = false; break; }
      }
      if (allOk) {
        if (!kp[id]) kp[id] = { status: 'unlocked', score: 0, attempts: 0, _times: [] };
        else kp[id].status = 'unlocked';
      }
    }
  }
};
