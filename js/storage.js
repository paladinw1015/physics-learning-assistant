// ===== localStorage 读写封装 =====
App.Storage = {

  KEY: 'physics_helper_v1',  // 会被 Subject.init() / Subject.switchTo() 动态修改
  SHARED_KEY: 'learning_helper_shared_v1',  // 跨学科共享数据（金币/XP/徽章/PIN等）

  // 跨学科共享的字段列表
  _sharedFields: ['xp', 'coins', 'totalCoinsEarned', 'streak', 'badges', 'parentPin', '_lastDailyClaim', '_pinChangedOnce'],

  // 加载进度，返回默认值如果不存在
  load: function() {
    try {
      var raw = localStorage.getItem(this.KEY);
      if (raw) {
        var data = JSON.parse(raw);
        // 深合并到默认userProgress
        this._merge(App.userProgress, data);
      }
    } catch(e) {
      console.warn('加载数据失败，使用默认值', e);
    }
    // 从共享存储恢复跨学科数据
    this._loadShared();
    // 初始化知识进度（确保所有节点都有条目）
    this._initKnowledgeProgress();
    // 检查连续天数
    App.Gamification.checkStreak();
  },

  // 保存进度
  save: function() {
    try {
      localStorage.setItem(this.KEY, JSON.stringify(App.userProgress));
      // 同时保存共享数据（金币/XP/徽章等跨学科共享）
      this._saveShared();
    } catch(e) {
      console.warn('保存数据失败', e);
      App.toast('数据保存失败，请检查浏览器存储空间', 'error');
    }
  },

  // 从共享存储加载跨学科数据
  _loadShared: function() {
    try {
      var raw = localStorage.getItem(this.SHARED_KEY);
      if (!raw) return;
      var shared = JSON.parse(raw);
      for (var i = 0; i < this._sharedFields.length; i++) {
        var field = this._sharedFields[i];
        if (shared[field] !== undefined) {
          // 数值类型取最大值，数组/对象类型合并
          if (field === 'xp' || field === 'coins' || field === 'totalCoinsEarned') {
            App.userProgress[field] = Math.max(App.userProgress[field] || 0, shared[field] || 0);
          } else if (field === 'streak') {
            // 合并streak：best取最大值，current/lastDate由checkStreak管理
            var sharedStreak = shared.streak || {};
            App.userProgress.streak.best = Math.max(App.userProgress.streak.best || 0, sharedStreak.best || 0);
          } else if (field === 'badges') {
            // 合并去重
            var merged = (App.userProgress.badges || []).slice();
            var sharedBadges = shared.badges || [];
            for (var j = 0; j < sharedBadges.length; j++) {
              if (merged.indexOf(sharedBadges[j]) < 0) merged.push(sharedBadges[j]);
            }
            App.userProgress.badges = merged;
          } else {
            App.userProgress[field] = shared[field];
          }
        }
      }
    } catch(e) {
      console.warn('加载共享数据失败', e);
    }
  },

  // 保存跨学科共享数据
  _saveShared: function() {
    try {
      var shared = {};
      for (var i = 0; i < this._sharedFields.length; i++) {
        var field = this._sharedFields[i];
        if (App.userProgress[field] !== undefined) {
          shared[field] = App.userProgress[field];
        }
      }
      // 合并已有共享数据（取最大值/合并数组）
      var existing = {};
      try {
        var raw = localStorage.getItem(this.SHARED_KEY);
        if (raw) existing = JSON.parse(raw);
      } catch(e) {}
      if (existing.xp !== undefined) shared.xp = Math.max(shared.xp || 0, existing.xp || 0);
      if (existing.coins !== undefined) shared.coins = Math.max(shared.coins || 0, existing.coins || 0);
      if (existing.totalCoinsEarned !== undefined) shared.totalCoinsEarned = Math.max(shared.totalCoinsEarned || 0, existing.totalCoinsEarned || 0);
      if (existing.badges) {
        var merged = (shared.badges || []).slice();
        for (var j = 0; j < existing.badges.length; j++) {
          if (merged.indexOf(existing.badges[j]) < 0) merged.push(existing.badges[j]);
        }
        shared.badges = merged;
      }
      // streak.best 取最大值（跨学科保留最长连续记录）
      if (existing.streak && existing.streak.best !== undefined) {
        shared.streak = shared.streak || {};
        shared.streak.best = Math.max(shared.streak.best || 0, existing.streak.best || 0);
      }
      // parentPin: 保留非默认值，当前学科有非默认值时优先
      if (shared.parentPin === '0000' && existing.parentPin && existing.parentPin !== '0000') {
        shared.parentPin = existing.parentPin;
      }
      localStorage.setItem(this.SHARED_KEY, JSON.stringify(shared));
    } catch(e) {
      console.warn('保存共享数据失败', e);
    }
  },

  // 重置全部数据
  reset: function() {
    if (confirm('确定要重置所有学习数据吗？此操作不可恢复！')) {
      try { localStorage.removeItem(this.KEY); } catch(e) {}
      // 同时清理考试保存状态和共享数据
      try { localStorage.removeItem('physics_exam_state'); } catch(e) {}
      try { localStorage.removeItem(this.SHARED_KEY); } catch(e) {}
      App.examState = null;
      // 重置为默认（包含所有内部标志位）
      App.userProgress = {
        xp: 0, level: 1, coins: 0, totalCoinsEarned: 0,
        streak: { current: 0, best: 0, lastDate: null },
        knowledgeProgress: {},
        badges: [],
        rewardShop: { items: [] },
        parentPin: '0000',
        _diagnosisCount: 0, _practiceCount: 0,
        _hasPerfectDiag: false, _hasSpeedAnswer: false,
        _hasSpeedImprove: false, _hasComeback: false,
        _lastDailyClaim: '', _pinChangedOnce: false, _bossCleared: [],
        inventory: {}
      };
      this._initKnowledgeProgress();
      this.save();
      App.toast('数据已重置', 'info');
      App.navigate('dashboard');
    }
  },

  // 深合并
  _merge: function(target, source) {
    for (var key in source) {
      if (source.hasOwnProperty(key)) {
        if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
          if (!target[key]) target[key] = {};
          this._merge(target[key], source[key]);
        } else {
          target[key] = source[key];
        }
      }
    }
  },

  // 初始化知识进度
  _initKnowledgeProgress: function() {
    var kp = App.userProgress.knowledgeProgress;
    var ids = Object.keys(App.knowledgeGraph);
    for (var i = 0; i < ids.length; i++) {
      if (!kp[ids[i]]) {
        // 判断是否可解锁（无前置或前置已掌握）
        var node = App.knowledgeGraph[ids[i]];
        var allLocked = true;
        if (!node.prerequisites || node.prerequisites.length === 0) {
          allLocked = false;
        }
        kp[ids[i]] = {
          status: allLocked ? 'locked' : 'unlocked',
          score: 0,
          attempts: 0,
          practiceCompleted: 0,
          practiceTotal: 0
        };
      }
    }
  }
};
