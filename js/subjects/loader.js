// ===== 学科加载器 =====
// 管理学科切换、数据加载、存储隔离、主题应用

App.Subject = {
  // 当前活跃学科ID
  current: 'physics',

  // 标记化学数据是否已加载
  _chemistryLoaded: false,

  // 学科配置注册表
  registry: {
    physics: {
      id: 'physics', name: '物理', icon: '⚛️', avatar: '物',
      subtitle: '物理探险家', accent: '#6c5ce7', accentLight: 'rgba(108,92,231,0.12)',
      storageKey: 'physics_helper_v1',
      tagline: '必修一·必修二',
      themeColor: '#6c5ce7'
    },
    chemistry: {
      id: 'chemistry', name: '化学', icon: '🧪', avatar: '化',
      subtitle: '化学探索者', accent: '#0984e3', accentLight: 'rgba(9,132,227,0.12)',
      storageKey: 'chemistry_helper_v1',
      tagline: '必修一·必修二',
      themeColor: '#0984e3'
    },
    math: {
      id: 'math', name: '数学', icon: '📐', avatar: '数',
      subtitle: '数学探险家', accent: '#00b894', accentLight: 'rgba(0,184,148,0.12)',
      storageKey: 'math_helper_v1',
      tagline: '必修一·必修二',
      themeColor: '#00b894'
    },
    english: {
      id: 'english', name: '英语', icon: '📖', avatar: '英',
      subtitle: '英语探险家', accent: '#e17055', accentLight: 'rgba(225,112,85,0.12)',
      storageKey: 'english_helper_v1',
      tagline: '高中语法体系',
      themeColor: '#e17055'
    },
    geography: {
      id: 'geography', name: '地理', icon: '🌍', avatar: '地',
      subtitle: '地理探索者', accent: '#2ecc71', accentLight: 'rgba(46,204,113,0.12)',
      storageKey: 'geography_helper_v1',
      tagline: '必修一·自然地理',
      themeColor: '#2ecc71'
    }
  },

  // 切换学科时的数据备份/恢复（多学科双向备份）
  _backups: {},       // { subjectId: { knowledgeGraph, chapterNodes, chapterOrder } }
  _subjectScripts: {}, // { subjectId: boolean } 是否已加载脚本

  // 切换到指定学科
  switchTo: function(subjectId) {
    var cfg = this.registry[subjectId];
    if (!cfg) { App.toast('学科不存在', 'error'); return; }

    // 保存当前学科进度
    App.Storage.save();

    // 保存最后选择的学科
    localStorage.setItem('learning_helper_last_subject', subjectId);

    // ★ 先备份当前学科数据（此时 this.current 仍是旧学科）
    this._backupCurrent(this.current);

    // 设置当前学科为新学科
    this.current = subjectId;
    App.currentSubject = subjectId;
    App.Storage.KEY = cfg.storageKey;

    // 应用主题色
    document.documentElement.style.setProperty('--accent', cfg.accent);
    document.documentElement.style.setProperty('--accent-light', cfg.accentLight);
    document.querySelector('meta[name="theme-color"]').content = cfg.accent;

    // 更新页面标题
    document.title = '高中' + cfg.name + '学习助手';

    // 加载目标学科数据
    if (subjectId === 'physics') {
      // physics data.js 预加载在 App.knowledgeGraph 中，也可能在 backup 中
      this._restoreFromBackup('physics');
      this._finalizeSubjectSwitch();
    } else {
      this._loadSubjectScriptAndContinue(subjectId);
    }
  },

  // 备份当前学科数据
  _backupCurrent: function(subjectId) {
    if (!subjectId || Object.keys(App.knowledgeGraph).length === 0) return;
    // 用知识图谱首个节点验证数据有效
    var ids = Object.keys(App.knowledgeGraph);
    if (ids.length === 0) return;

    this._backups[subjectId] = {
      knowledgeGraph: JSON.parse(JSON.stringify(App.knowledgeGraph)),
      chapterNodes: JSON.parse(JSON.stringify(App.chapterNodes)),
      chapterOrder: App.chapterOrder.slice()
    };
  },

  // 从备份恢复学科数据
  _restoreFromBackup: function(subjectId) {
    var backup = this._backups[subjectId];
    if (backup) {
      App.knowledgeGraph = JSON.parse(JSON.stringify(backup.knowledgeGraph));
      App.chapterNodes = JSON.parse(JSON.stringify(backup.chapterNodes));
      App.chapterOrder = backup.chapterOrder.slice();
      return true;
    }
    return false;
  },

  // 动态加载学科脚本并继续
  _loadSubjectScriptAndContinue: function(subjectId) {
    // 优先从备份恢复
    if (this._restoreFromBackup(subjectId)) {
      this._finalizeSubjectSwitch();
      return;
    }

    // 首次加载：动态注入脚本
    var scriptPath = '';
    if (subjectId === 'chemistry') scriptPath = 'js/subjects/chemistry.js';
    else if (subjectId === 'math') scriptPath = 'js/subjects/math.js';
    else if (subjectId === 'english') scriptPath = 'js/subjects/english.js';
    else if (subjectId === 'geography') scriptPath = 'js/subjects/geography.js';

    if (!scriptPath) {
      App.toast('未知的学科数据路径', 'error');
      return;
    }

    var self = this;
    var script = document.createElement('script');
    script.src = scriptPath;
    script.onload = function() {
      self._subjectScripts[subjectId] = true;
      self._finalizeSubjectSwitch();
    };
    script.onerror = function() {
      App.toast(self.registry[subjectId].name + '数据加载失败', 'error');
    };
    document.head.appendChild(script);
  },

  // 完成学科切换
  _finalizeSubjectSwitch: function() {
    // 根据学科设置章节顺序（fallback 用 data 文件中的值）
    var chapterOrders = {
      physics: ['初中前置', '必修一·运动的描述', '必修一·匀变速直线运动', '必修一·相互作用', '必修一·牛顿运动定律'],
      chemistry: ['必修一·物质及其变化', '必修一·钠与氯', '必修一·铁与金属材料', '必修一·物质结构 周期律', '必修二·非金属元素', '必修二·化学反应与能量', '必修二·有机化合物'],
      math: ['高一上·集合与命题', '高一上·不等式', '高一上·函数', '高一上·指数与对数', '高一下·三角函数', '高一下·数列', '高一下·矩阵与行列式', '高一下·向量与复数'],
      english: ['语法·时态语态', '语法·情态与虚拟', '语法·从句', '语法·非谓语动词', '语法·特殊句式'],
      geography: ['必修一·宇宙中的地球', '必修一·大气', '必修一·水', '必修一·地表形态']
    };
    if (chapterOrders[this.current]) {
      App.chapterOrder = chapterOrders[this.current];
    }

    // 重置进度状态
    this._resetProgress();
    
    // 加载该学科的进度
    App.Storage.load();
    App.Gamification.checkStreak();
    App.Gamification.claimDailyReward();
    
    // 重新渲染
    App.Ui.renderDashboard();
    App.navigate('dashboard');

    var cfg = this.getConfig();
    var nodeCount = Object.keys(App.knowledgeGraph).length;
    console.log('🔄 已切换到 ' + cfg.name + ' | ' + nodeCount + ' 个知识点');
    
    // 数据完整性检查
    if (nodeCount === 0) {
      console.error('❌ 切换后知识点为空！当前学科: ' + this.current);
    } else if (this.current === 'chemistry' && !App.knowledgeGraph['ch2_organic_base']) {
      console.error('❌ 化学知识图谱缺失关键节点');
    } else if (this.current === 'physics' && !App.knowledgeGraph['g1_newton_application']) {
      console.error('❌ 物理知识图谱缺失关键节点——可能误加载了化学数据');
    }
  },

  // 初始化（启动时始终以物理数据为默认）
  init: function() {
    this.current = 'physics';
    App.currentSubject = 'physics';
    var cfg = this.registry['physics'];
    App.Storage.KEY = cfg.storageKey;
    document.querySelector('meta[name="theme-color"]').content = cfg.accent;
    // 不在此处加载化学数据——由 switchTo 负责
  },

  // 获取当前学科配置
  getConfig: function() {
    return this.registry[this.current] || this.registry['physics'];
  },

  // 重置进度状态
  _resetProgress: function() {
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
  }
};
