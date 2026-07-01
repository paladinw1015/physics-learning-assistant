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
      var subjects = ['physics', 'chemistry', 'math', 'english', 'geography'];
      for (var i = 0; i < subjects.length; i++) {
        try { localStorage.removeItem('exam_state_' + subjects[i]); } catch(e) {}
      }
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
        _lastDailyClaim: '', _pinChangedOnce: false, _bossCleared: [], _examCoefficient: {}, _examHistory: {},
        inventory: {}
      };
      this._initKnowledgeProgress();
      this.save();
      App.toast('数据已重置', 'info');
      App.navigate('dashboard');
    }
  },

  // ==== 导入导出 ====

  // 导出数据为 JSON
  exportData: function() {
    try {
      var data = JSON.parse(JSON.stringify(App.userProgress));
      var pin = data.parentPin || '0000';
      var locked = {};
      if (data.parentPin) { locked.parentPin = this._xorEncrypt(data.parentPin, pin); }
      if (data.rewardShop) { locked.rewardShop = this._xorEncrypt(JSON.stringify(data.rewardShop), pin); }
      if (data.inventory) { locked.inventory = this._xorEncrypt(JSON.stringify(data.inventory), pin); }
      data._locked = locked;
      var json = JSON.stringify(data, null, 2);
      var blob = new Blob([json], { type: 'application/json' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      var subj = App.currentSubject || 'physics';
      var date = new Date().toISOString().split('T')[0];
      a.href = url; a.download = 'learning_progress_' + subj + '_' + date + '.json';
      a.click();
      URL.revokeObjectURL(url);
      App.toast('数据已导出', 'success');
    } catch(e) {
      App.toast('导出失败', 'error');
    }
  },

  // 从文件导入
  importData: function(file) {
    var self = this;
    var reader = new FileReader();
    reader.onload = function(e) {
      try {
        var imported = JSON.parse(e.target.result);
        var locked = imported._locked || {};
        delete imported._locked;
        if (locked.parentPin) {
          var pin = prompt('请输入家长 PIN：');
          if (pin) {
            var dec = self._xorEncrypt(locked.parentPin, pin);
            if (dec === pin) {
              imported.parentPin = pin;
              try { imported.rewardShop = JSON.parse(self._xorEncrypt(locked.rewardShop, pin)); } catch(ex) {}
              try { imported.inventory = JSON.parse(self._xorEncrypt(locked.inventory, pin)); } catch(ex) {}
              App.toast('学习数据 + 家长设置已恢复', 'success');
            } else {
              App.toast('PIN 错误，家长设置未恢复', 'info');
              imported.parentPin = App.userProgress.parentPin || '0000';
            }
          } else {
            App.toast('仅导入学习数据', 'info');
            imported.parentPin = App.userProgress.parentPin || '0000';
          }
        }
        self._smartMerge(imported);
        self.save();
        App.navigate('dashboard');
      } catch(ex) {
        App.toast('导入失败，文件格式错误', 'error');
      }
    };
    reader.readAsText(file);
  },

  // 智能合并
  _smartMerge: function(imported) {
    var cur = App.userProgress;
    if (imported.xp && imported.xp > cur.xp) cur.xp = imported.xp;
    if (imported.coins && imported.coins > cur.coins) cur.coins = imported.coins;
    if (imported.totalCoinsEarned && imported.totalCoinsEarned > cur.totalCoinsEarned) cur.totalCoinsEarned = imported.totalCoinsEarned;
    if (imported.level && imported.level > cur.level) cur.level = imported.level;
    if (imported.streak && imported.streak.best > (cur.streak.best || 0)) cur.streak.best = imported.streak.best;
    if (imported.badges && imported.badges.length) {
      for (var i = 0; i < imported.badges.length; i++) {
        if (cur.badges.indexOf(imported.badges[i]) < 0) cur.badges.push(imported.badges[i]);
      }
    }
    if (imported.knowledgeProgress) {
      this._merge(cur.knowledgeProgress, imported.knowledgeProgress);
    }
    if (imported._examCoefficient) {
      cur._examCoefficient = cur._examCoefficient || {};
      for (var k in imported._examCoefficient) {
        cur._examCoefficient[k] = imported._examCoefficient[k] || cur._examCoefficient[k];
      }
    }
    if (imported._examHistory) {
      cur._examHistory = cur._examHistory || {};
      for (var k in imported._examHistory) {
        cur._examHistory[k] = imported._examHistory[k] || cur._examHistory[k];
      }
    }
    if (imported._bossCleared) {
      cur._bossCleared = cur._bossCleared || [];
      for (var i = 0; i < imported._bossCleared.length; i++) {
        if (cur._bossCleared.indexOf(imported._bossCleared[i]) < 0) cur._bossCleared.push(imported._bossCleared[i]);
      }
    }
    if (imported.parentPin && imported.parentPin !== '0000') cur.parentPin = imported.parentPin;
    if (imported.inventory) {
      cur.inventory = cur.inventory || {};
      for (var k in imported.inventory) {
        cur.inventory[k] = Math.max(cur.inventory[k] || 0, imported.inventory[k] || 0);
      }
    }
  },

  // XOR 加密: text ^ key → base64
  _xorEncrypt: function(text, key) {
    var buf = [];
    for (var i = 0; i < text.length; i++) {
      buf.push(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    var bin = '';
    for (var j = 0; j < buf.length; j++) bin += String.fromCharCode(buf[j]);
    return btoa(bin);
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
          practiceTotal: 0,
          _wrongQuestions: []
        };
      }
    }
  }
};
