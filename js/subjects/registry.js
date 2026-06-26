// ===== 学科注册表 =====
// 定义所有可用学科及其元数据
// 添加新学科时只需在此注册 + 创建对应数据文件

App.SubjectRegistry = {
  subjects: {
    physics: {
      id: 'physics',
      name: '物理',
      icon: '⚛️',
      avatar: '物',
      subtitle: '物理探险家',
      tagline: '高一物理必修一·必修二',
      accent: '#6c5ce7',
      accentLight: 'rgba(108,92,231,0.12)',
      dataFile: 'js/subjects/physics.js',
      storageKey: 'physics_helper_v1',
      chapters: ['初中前置', '必修一·运动的描述', '必修一·匀变速直线运动', '必修一·相互作用', '必修一·牛顿运动定律'],
      bossIcon: '🌀'
    },
    chemistry: {
      id: 'chemistry',
      name: '化学',
      icon: '🧪',
      avatar: '化',
      subtitle: '化学探索者',
      tagline: '高一化学必修一·必修二',
      accent: '#0984e3',
      accentLight: 'rgba(9,132,227,0.12)',
      dataFile: 'js/subjects/chemistry.js',
      storageKey: 'chemistry_helper_v1',
      chapters: ['必修一·物质及其变化', '必修一·钠与氯', '必修一·铁与金属材料', '必修一·物质结构 周期律', '必修二·非金属元素', '必修二·化学反应与能量', '必修二·有机化合物'],
      bossIcon: '⚗️'
    },
    // 未来扩展其他学科：
    // math: {
    //   id: 'math', name: '数学', icon: '📐', avatar: '数',
    //   subtitle: '数学探险家', tagline: '高一数学必修一',
    //   accent: '#00b894', accentLight: 'rgba(0,184,148,0.12)',
    //   dataFile: 'js/subjects/math.js',
    //   storageKey: 'math_helper_v1'
    // },
    // biology: {
    //   id: 'biology', name: '生物', icon: '🧬', avatar: '生',
    //   subtitle: '生物探索者', tagline: '高一生物必修一',
    //   accent: '#e17055', accentLight: 'rgba(225,112,85,0.12)',
    //   dataFile: 'js/subjects/biology.js',
    //   storageKey: 'biology_helper_v1'
    // },
  },

  // 获取所有可用学科列表
  list: function() {
    return Object.keys(this.subjects).map(function(k) {
      return this.subjects[k];
    }, this);
  },

  // 获取学科配置
  get: function(subjectId) {
    return this.subjects[subjectId] || null;
  },

  // 加载指定学科数据
  load: function(subjectId) {
    var subject = this.get(subjectId);
    if (!subject) {
      console.error('未知学科: ' + subjectId);
      return false;
    }
    App.currentSubject = subject;

    // 应用学科主题色
    document.documentElement.style.setProperty('--accent', subject.accent);
    document.documentElement.style.setProperty('--accent-light', subject.accentLight);

    // 动态加载学科数据脚本
    var script = document.createElement('script');
    script.src = subject.dataFile;
    script.onload = function() {
      // 学科数据加载完成后，初始化应用
      App._initAfterSubjectLoad();
    };
    script.onerror = function() {
      console.error('无法加载学科数据: ' + subject.dataFile);
      App.toast('学科数据加载失败', 'error');
    };
    document.head.appendChild(script);
    return true;
  },

  // 切换学科（需要重新加载数据）
  switchTo: function(subjectId) {
    var subject = this.get(subjectId);
    if (!subject) return;

    // 保存当前数据
    if (App.currentSubject) {
      App.Storage.save();
    }

    // 重置应用状态
    App.currentSubject = subject;
    App.knowledgeGraph = {};
    App.chapterOrder = subject.chapters.slice();
    App.chapterNodes = {};
    App.userProgress = App._getDefaultProgress();
    App.diagnosisState = null;
    App.practiceState = null;
    App.bossState = null;
    App.examState = null;
    App._lastReport = null;
    App._lastPracticeResult = null;
    App._lastBossResult = null;
    App._lastExamResult = null;

    // 应用主题色
    document.documentElement.style.setProperty('--accent', subject.accent);
    document.documentElement.style.setProperty('--accent-light', subject.accentLight);

    // 更新页面标题
    document.title = '高中' + subject.name + '学习助手';
    document.querySelector('meta[name="theme-color"]').content = subject.accent;

    // 加载新学科数据
    var script = document.createElement('script');
    script.src = subject.dataFile;
    script.onload = function() {
      App.Storage.load();
      App.Gamification.checkStreak();
      App.Gamification.claimDailyReward();
      App.Ui.renderDashboard();
      if (App.currentScreen === 'dashboard') {
        App.Ui.renderDashboard();
      }
      console.log('🔄 已切换到' + subject.name + '学科');
    };
    document.head.appendChild(script);
  }
};

// ===== 加载器：自动检测URL参数或使用默认学科 =====
App._autoLoadSubject = function() {
  var params = new URLSearchParams(window.location.search);
  var subjectId = params.get('subject') || 'physics';
  return App.SubjectRegistry.load(subjectId);
};
