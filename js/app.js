// ===== 主入口: 初始化 + 页面路由 + 事件绑定 =====
(function() {

  // --- 学科初始化 ---
  App.Subject.init();

  // --- Screen Navigation ---
  App.navigate = function(screenId) {
    document.querySelectorAll('.screen').forEach(function(s) { s.classList.remove('active'); });
    var target = document.getElementById('screen-' + screenId);
    if (target) target.classList.add('active');
    App.currentScreen = screenId;

    // Bottom nav - don't highlight for non-tab screens
    var tabScreens = ['dashboard', 'starmap', 'badges', 'boss-select', 'shop', 'parent', 'wrongbook'];
    document.querySelectorAll('#bottom-nav .nav-item').forEach(function(btn) {
      btn.classList.toggle('active', btn.getAttribute('data-screen') === screenId && tabScreens.indexOf(screenId) >= 0);
    });

    // Trigger render
    if (screenId === 'dashboard') App.Ui.renderDashboard();
    if (screenId === 'starmap') {
      App.Ui.renderStarMap();
      setTimeout(function() { App.Ui.renderStarMap(); }, 100);
    }
    if (screenId === 'badges') App.Ui.renderBadges();
    if (screenId === 'shop') App.Ui.renderShop();
    if (screenId === 'report') {
      if (App._lastReport && !App._lastPracticeResult) App.Ui.renderReport();
      else if (App._lastPracticeResult) App.Ui.renderPracticeResult();
    }
    if (screenId === 'parent') {
      document.getElementById('parent-auth').style.display = 'block';
      document.getElementById('parent-panel').style.display = 'none';
      var dots = document.querySelectorAll('.pin-dot');
      for (var i = 0; i < dots.length; i++) dots[i].value = '';
      document.getElementById('pin-error').textContent = '';
      if (dots[0]) dots[0].focus();
    }
    if (screenId === 'practice-result') {
      document.getElementById('screen-report').classList.add('active');
      App.Ui.renderPracticeResult();
    }
    if (screenId === 'boss-select') App.Ui.renderBossSelect();
    if (screenId === 'boss-result') App.Ui.renderBossResult();
    if (screenId === 'exam-result') App.Ui.renderExamResult();
    if (screenId === 'wrongbook') App.Ui.renderWrongBook();
  };

  // --- Toast ---
  App.toast = function(msg, type) {
    type = type || 'info';
    var container = document.getElementById('toast-container');
    var el = document.createElement('div');
    el.className = 'toast ' + type;
    el.textContent = msg;
    container.appendChild(el);
    setTimeout(function() { el.remove(); }, 2200);
  };

  // --- Save/Load delegates ---
  App.save = function() { App.Storage.save(); };
  App.load = function() { App.Storage.load(); };

  // --- Parent actions ---
  App.verifyPin = function() {
    var dots = document.querySelectorAll('.pin-dot');
    var pin = '';
    for (var i = 0; i < dots.length; i++) pin += dots[i].value;
    if (pin.length < 4) { document.getElementById('pin-error').textContent = '请输入4位密码'; return; }
    App.Rewards.verifyPin(pin);
  };

  App.addReward = function() {
    var name = document.getElementById('reward-name-input').value.trim();
    var cost = parseInt(document.getElementById('reward-cost-input').value) || 0;
    if (App.Rewards.addItem(name, cost)) {
      document.getElementById('reward-name-input').value = '';
      document.getElementById('reward-cost-input').value = '100';
    }
  };

  App.resetProgress = function() { App.Storage.reset(); };

  // --- Pin auto-focus ---
  document.querySelectorAll('.pin-dot').forEach(function(input, idx, inputs) {
    input.addEventListener('input', function() {
      this.value = this.value.replace(/[^0-9]/g, '');
      if (this.value && idx < inputs.length - 1) inputs[idx + 1].focus();
    });
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Backspace' && !this.value && idx > 0) inputs[idx - 1].focus();
    });
    input.addEventListener('keyup', function(e) {
      if (e.key === 'Enter') App.verifyPin();
    });
  });

  // --- Bottom Nav ---
  document.querySelectorAll('#bottom-nav .nav-item').forEach(function(btn) {
    btn.addEventListener('click', function() {
      App.navigate(this.getAttribute('data-screen'));
    });
  });

  // --- Practice result screen routing ---
  var origNavigate = App.navigate;
  App.navigate = function(screenId) {
    if (screenId === 'practice-result') {
      document.querySelectorAll('.screen').forEach(function(s) { s.classList.remove('active'); });
      var reportScreen = document.getElementById('screen-report');
      if (reportScreen) reportScreen.classList.add('active');
      App.currentScreen = 'report';
      document.querySelectorAll('#bottom-nav .nav-item').forEach(function(btn) {
        btn.classList.toggle('active', false);
      });
      App.Ui.renderPracticeResult();
      return;
    }
    origNavigate(screenId);
  };

  // --- Init ---
  // 始终先用物理数据初始化（data.js 已加载）
  App.Storage.load();
  App.Gamification.checkStreak();
  App.Gamification.claimDailyReward();

  // 判断是否首次使用
  var lastSubject = localStorage.getItem('learning_helper_last_subject');
  if (!lastSubject) {
    // 首次使用 - 显示学科选择器
    App.navigate('subject-select');
  } else if (lastSubject !== 'physics') {
    // 上次使用了非物理学科 - 加载并切换
    App.Subject.switchTo(lastSubject);
  } else {
    // 上次使用物理，数据已就绪，直接显示仪表盘
    App.Ui.renderDashboard();
  }

  console.log('🚀 高中学习助手 v2.0 已就绪 | 当前学科: ' + (App.Subject.getConfig().name));
  console.log('   ' + Object.keys(App.knowledgeGraph).length + ' 个知识点 | ' +
    App.Gamification.BADGES.length + ' 个徽章 | ' +
    App.Gamification.LEVEL_TITLES.length + ' 个等级');
})();

// ===== Particle Background =====
(function() {
  var canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var particles = [];
  var MAX = 80;

  function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  window.addEventListener('resize', resize);
  resize();

  for (var i = 0; i < MAX; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.2
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,' + p.opacity + ')';
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  draw();
})();
