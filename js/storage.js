// ===== localStorage 读写封装 =====
App.Storage = {

  KEY: 'physics_helper_v1',

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
    // 初始化知识进度（确保所有节点都有条目）
    this._initKnowledgeProgress();
    // 检查连续天数
    App.Gamification.checkStreak();
  },

  // 保存进度
  save: function() {
    try {
      localStorage.setItem(this.KEY, JSON.stringify(App.userProgress));
    } catch(e) {
      console.warn('保存数据失败', e);
      App.toast('数据保存失败，请检查浏览器存储空间', 'error');
    }
  },

  // 重置全部数据
  reset: function() {
    if (confirm('确定要重置所有学习数据吗？此操作不可恢复！')) {
      try { localStorage.removeItem(this.KEY); } catch(e) {}
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
        _lastDailyClaim: '', _bossCleared: [],
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
