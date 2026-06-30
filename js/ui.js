// ===== UI渲染: 全部8屏渲染函数 =====
App.Ui = {

  // ---- 首页仪表盘 ----
  renderDashboard: function() {
    var cfg = App.Subject.getConfig();
    var xpInfo = App.Gamification.getXpInfo();
    var stats = App.Gamification.getStats();
    document.getElementById('dash-level').textContent = 'Lv.' + xpInfo.level + ' ' + xpInfo.title;
    document.getElementById('dash-xp-bar').style.width = xpInfo.pct + '%';
    document.getElementById('dash-xp-text').textContent = xpInfo.current + ' / ' + xpInfo.total + ' XP';
    document.getElementById('dash-coins').textContent = '🪙 ' + App.userProgress.coins;
    document.getElementById('dash-streak').textContent = '🔥 ' + (App.userProgress.streak.current || 0);
    document.getElementById('dash-badges').textContent = '🏅 ' + (App.userProgress.badges.length || 0) + '/' + App.Gamification.BADGES.length;

    // 更新学科相关显示
    var avatarEl = document.querySelector('#screen-dashboard .avatar');
    if (avatarEl) avatarEl.textContent = cfg.avatar;
    var subtitleEl = document.querySelector('#screen-dashboard .dash-subtitle');
    if (subtitleEl) subtitleEl.textContent = cfg.subtitle;
    var titleEl = document.querySelector('#screen-dashboard .top-bar-title');
    if (titleEl) titleEl.textContent = cfg.name + '助手';

    // 知识点网格
    var html = '';
    var kp = App.userProgress.knowledgeProgress;
    var ids = Object.keys(App.knowledgeGraph);
    // 按章节排序
    var orderedIds = [];
    for (var ci = 0; ci < App.chapterOrder.length; ci++) {
      var chIds = App.chapterNodes[App.chapterOrder[ci]] || [];
      for (var j = 0; j < chIds.length; j++) {
        if (ids.indexOf(chIds[j]) >= 0) orderedIds.push(chIds[j]);
      }
    }
    // 取前6个显示
    var showIds = orderedIds.slice(0, 6);
    for (var i = 0; i < showIds.length; i++) {
      var id = showIds[i];
      var node = App.knowledgeGraph[id];
      var status = (kp[id] && kp[id].status) || 'locked';
      var statusClass = status === 'mastered' ? 'mastered' : status === 'weak' ? 'weak' : status === 'progress' ? 'progress' : 'locked';
      var statusText = status === 'mastered' ? '已掌握' : status === 'weak' ? '薄弱' : status === 'progress' ? '进行中' : '未解锁';
      html += '<div class="kp-mini-card" onclick="App.Diagnosis.start(\'' + id + '\')" title="' + node.chapter + '">' +
        '<span class="kp-status ' + statusClass + '"></span>' +
        '<span>' + node.name + '</span>' +
        '<span style="float:right;font-size:0.65rem;color:var(--text-muted)">' + statusText + '</span></div>';
    }
    document.getElementById('dash-knowledge-grid').innerHTML = html || '<div class="empty-state"><p>加载中...</p></div>';
  },

  // ---- 知识星图 (Canvas) ----
  renderStarMap: function() {
    var canvas = document.getElementById('star-map');
    var wrap = document.getElementById('star-map-wrap');
    var w = wrap.clientWidth;
    var h = Math.max(w, 400);
    canvas.width = w * (window.devicePixelRatio || 1);
    canvas.height = h * (window.devicePixelRatio || 1);
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    var ctx = canvas.getContext('2d');
    ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);

    // 背景
    ctx.fillStyle = '#0a0e27';
    ctx.fillRect(0, 0, w, h);

    // 计算布局中心
    var cx = w / 2, cy = h / 2;
    var nodeRadius = 28;
    var kp = App.userProgress.knowledgeProgress;

    // 使用预先定义的节点坐标进行缩放映射
    var allNodes = App.knowledgeGraph;
    var nodeIds = Object.keys(allNodes);

    // 空数据兜底
    if (nodeIds.length === 0) {
      ctx.fillStyle = '#888';
      ctx.font = '16px ' + getComputedStyle(document.body).fontFamily;
      ctx.textAlign = 'center';
      ctx.fillText('知识图谱数据为空，请刷新页面', cx, cy);
      console.warn('⚠️ 星图渲染失败：App.knowledgeGraph 为空（当前学科: ' + (App.currentSubject || 'unknown') + '）');
      return;
    }

    // 映射坐标系统到canvas
    var minX = 60, maxX = 720, minY = 20, maxY = 440;
    var scaleX = (w - 80) / (maxX - minX);
    var scaleY = (h - 60) / (maxY - minY);
    var offsetX = 30;
    var offsetY = 20;

    // ★ 星图标题（当前学科标识）
    var cfg = App.Subject.getConfig();
    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    ctx.font = '11px ' + getComputedStyle(document.body).fontFamily;
    ctx.textAlign = 'right';
    ctx.fillText(cfg.name + '知识星图 · ' + nodeIds.length + '节点', w - 20, 18);

    var nodePositions = {};
    for (var i = 0; i < nodeIds.length; i++) {
      var id = nodeIds[i];
      var pos = allNodes[id].position || { x: cx, y: cy };
      nodePositions[id] = {
        x: (pos.x - minX) * scaleX + offsetX,
        y: (pos.y - minY) * scaleY + offsetY
      };
    }

    // 绘制连线（前置依赖）
    ctx.strokeStyle = 'rgba(255,255,255,0.12)';
    ctx.lineWidth = 1.5;
    for (var i = 0; i < nodeIds.length; i++) {
      var id = nodeIds[i];
      var node = allNodes[id];
      if (node.prerequisites) {
        for (var j = 0; j < node.prerequisites.length; j++) {
          var preqId = node.prerequisites[j];
          if (nodePositions[preqId]) {
            ctx.beginPath();
            ctx.moveTo(nodePositions[preqId].x, nodePositions[preqId].y);
            ctx.lineTo(nodePositions[id].x, nodePositions[id].y);
            // 箭头
            var dx = nodePositions[id].x - nodePositions[preqId].x;
            var dy = nodePositions[id].y - nodePositions[preqId].y;
            var len = Math.sqrt(dx * dx + dy * dy);
            var midX = nodePositions[id].x - dx / len * nodeRadius * 1.3;
            var midY = nodePositions[id].y - dy / len * nodeRadius * 1.3;
            ctx.lineTo(midX, midY);
            ctx.stroke();
          }
        }
      }
    }

    // 绘制节点
    for (var i = 0; i < nodeIds.length; i++) {
      var id = nodeIds[i];
      var pos = nodePositions[id];
      var node = allNodes[id];
      var status = (kp[id] && kp[id].status) || 'locked';
      var color, glowColor;
      if (status === 'mastered') { color = '#4ade80'; glowColor = 'rgba(74,222,128,0.4)'; }
      else if (status === 'weak') { color = '#ff6b6b'; glowColor = 'rgba(255,107,107,0.4)'; }
      else if (status === 'progress') { color = '#fbbf24'; glowColor = 'rgba(251,191,36,0.4)'; }
      else { color = '#555'; glowColor = 'rgba(100,100,100,0.2)'; }

      // 光晕
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, nodeRadius + 4, 0, Math.PI * 2);
      ctx.fillStyle = glowColor;
      ctx.fill();

      // 节点
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, nodeRadius, 0, Math.PI * 2);
      ctx.fillStyle = status === 'locked' ? '#2a2a4a' : 'rgba(20,24,50,0.95)';
      ctx.fill();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.stroke();

      // 文字
      ctx.fillStyle = status === 'locked' ? '#666' : '#e8e8f0';
      ctx.font = '10px ' + getComputedStyle(document.body).fontFamily;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      var lines = node.name.length > 4 ? [node.name.slice(0, 4), node.name.slice(4)] : [node.name];
      for (var li = 0; li < lines.length; li++) {
        ctx.fillText(lines[li], pos.x, pos.y - (lines.length - 1) * 6 + li * 12);
      }
    }

    // 点击事件
    var self = this;
    canvas.onclick = function(e) {
      var rect = canvas.getBoundingClientRect();
      var mx = e.clientX - rect.left;
      var my = e.clientY - rect.top;
      for (var i = 0; i < nodeIds.length; i++) {
        var pos = nodePositions[nodeIds[i]];
        var dist = Math.sqrt((mx - pos.x) * (mx - pos.x) + (my - pos.y) * (my - pos.y));
        if (dist < nodeRadius + 4) {
          App.Diagnosis.start(nodeIds[i]);
          return;
        }
      }
    };

    // hover效果
    canvas.onmousemove = function(e) {
      var rect = canvas.getBoundingClientRect();
      var mx = e.clientX - rect.left;
      var my = e.clientY - rect.top;
      var found = false;
      for (var i = 0; i < nodeIds.length; i++) {
        var pos = nodePositions[nodeIds[i]];
        if (Math.sqrt((mx - pos.x) * (mx - pos.x) + (my - pos.y) * (my - pos.y)) < nodeRadius + 4) {
          canvas.style.cursor = 'pointer';
          found = true; break;
        }
      }
      if (!found) canvas.style.cursor = 'default';
    };
  },

  // ---- 诊断报告 ----
  renderReport: function() {
    var r = App._lastReport;
    if (!r) { document.getElementById('report-summary').textContent = '暂无报告'; return; }

    var rootNode = App.knowledgeGraph[r.rootNodeId];
    document.getElementById('report-summary').textContent = rootNode ? rootNode.name + ' 诊断结果' : '诊断结果';
    document.getElementById('report-detail').textContent =
      '总耗时 ' + Math.round(r.totalTime) + '秒 | +' + r.xpEarned + 'XP +' + r.coinsEarned + '💰';

    // 薄弱链路
    var chainHtml = '';
    for (var i = 0; i < r.chain.length; i++) {
      var c = r.chain[i];
      var node = App.knowledgeGraph[c.nodeId];
      var icon = c.passed ? '✅' : '❌';
      var cls = c.passed ? 'pass' : 'fail';
      chainHtml += '<div class="chain-node ' + cls + '">' +
        '<span>' + icon + '</span>' +
        '<span style="flex:1"><strong>' + (node ? node.name : c.nodeId) + '</strong> (' + (node ? node.chapter : '未知') + ')</span>' +
        '<span style="font-family:var(--font-mono);font-size:0.8rem">' + c.score + '% | ' + c.correctCount + '/' + c.total + '题</span>' +
        '<span style="font-size:0.7rem;color:var(--text-muted)">均' + c.avgTime.toFixed(1) + 's</span>' +
        '</div>';
      if (i < r.chain.length - 1) {
        chainHtml += '<div class="chain-arrow">⬇ 追溯前置</div>';
      }
    }
    document.getElementById('report-chain').innerHTML = chainHtml;

    // 推荐：找最浅层未通过的知识点
    var weakId = null;
    for (var i = r.chain.length - 1; i >= 0; i--) {
      if (!r.chain[i].passed) { weakId = r.chain[i].nodeId; }
    }
    if (weakId) {
      var weakNode = App.knowledgeGraph[weakId];
      document.getElementById('report-recommendation').innerHTML =
        '<div class="card" style="border-color:var(--coral)">' +
        '<p style="font-weight:600;margin-bottom:6px">🎯 建议优先修复：<span style="color:var(--coral)">' + (weakNode ? weakNode.name : '') + '</span></p>' +
        '<p style="font-size:0.8rem;color:var(--text-secondary)">' + (weakNode ? weakNode.description : '') + '</p></div>';
      document.getElementById('report-start-practice').style.display = 'block';
      document.getElementById('report-start-practice').onclick = function() { App.Practice.start(weakId); };
    } else {
      document.getElementById('report-recommendation').innerHTML =
        '<div class="card" style="border-color:var(--green)"><p style="font-weight:600">🎉 全部通过！基础扎实。</p></div>';
      document.getElementById('report-start-practice').style.display = 'none';
    }

    // emoji
    var allPassed = r.chain.every(function(c) { return c.passed; });
    document.getElementById('report-emoji').textContent = allPassed ? '🎉' : (r.chain.length > 1 ? '🔍' : '📝');

    // 分心报告
    if (r.focusReport) {
      document.getElementById('report-focus').innerHTML = this._renderFocusHtml(r.focusReport);
    }
  },

  // ---- 练习结果 ----
  renderPracticeResult: function() {
    var pr = App._lastPracticeResult;
    if (!pr) { App.navigate('dashboard'); return; }

    document.getElementById('report-summary').textContent = '练习完成: ' + pr.nodeName;
    document.getElementById('report-emoji').textContent = pr.score >= 80 ? '🎉' : (pr.score >= 60 ? '👍' : '💪');
    document.getElementById('report-detail').textContent =
      '得分 ' + pr.score + '% | ' + pr.correctCount + '/' + pr.total + ' | 总时' + Math.round(pr.totalTime) + 's | +' + pr.xpEarned + 'XP';

    // 时间详情
    var timeHtml = '<div class="section-title">⏱ 每道题用时</div><div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:12px">';
    for (var i = 0; i < pr.questionTimes.length; i++) {
      var t = pr.questionTimes[i];
      var ans = pr.answers[i];
      var tColor = t < 5 ? 'var(--green)' : t < 10 ? 'var(--amber)' : 'var(--text-muted)';
      var bg = ans.correct ? 'rgba(74,222,128,0.1)' : 'rgba(255,107,107,0.1)';
      var chipClass = t < 5 ? 'fast' : t < 10 ? 'mid' : 'slow';
      timeHtml += '<span class="time-chip ' + chipClass + '">' +
        (i + 1) + '. ' + t.toFixed(1) + 's' + (ans.correct ? ' ✓' : ' ✗') + '</span>';
    }
    timeHtml += '</div>';

    // 均时对比
    timeHtml += '<div style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:8px">' +
      '本次均时: <strong style="color:var(--cyan)">' + pr.avgTime.toFixed(1) + 's</strong>';
    if (pr.historyAvg) {
      timeHtml += ' | 历史均时: ' + pr.historyAvg.toFixed(1) + 's';
      if (pr.speedImproved) {
        timeHtml += ' | <span style="color:var(--green)">提速 ' + pr.improvementPct + '% 🚀</span>';
      }
    }
    timeHtml += '</div>';
    document.getElementById('report-chain').innerHTML = timeHtml;

    document.getElementById('report-recommendation').innerHTML =
      pr.score < 80
        ? '<button class="btn-primary" onclick="App.Practice.start(\'' + pr.nodeId + '\')">🔄 再练一次</button>'
        : '<button class="btn-primary" onclick="App.Diagnosis.start(\'' + pr.nodeId + '\')">✅ 重新诊断</button>';
    document.getElementById('report-start-practice').style.display = 'none';

    // 分心报告
    if (pr.focusReport) {
      document.getElementById('report-focus').innerHTML = this._renderFocusHtml(pr.focusReport);
    }
  },

  // ---- 徽章墙 ----
  renderBadges: function() {
    var earned = App.userProgress.badges;
    var all = App.Gamification.BADGES;
    document.getElementById('badge-count-text').textContent = earned.length + '/' + all.length + ' 已获得';
    var html = '';
    for (var i = 0; i < all.length; i++) {
      var b = all[i];
      var isEarned = earned.indexOf(b.id) >= 0;
      html += '<div class="badge-item' + (isEarned ? ' earned' : ' locked') + '">' +
        '<span class="badge-icon">' + b.icon + '</span>' +
        '<span class="badge-name">' + b.name + '</span>' +
        '<span style="font-size:0.65rem;color:var(--text-muted)">' + b.desc + '</span></div>';
    }
    document.getElementById('badge-grid').innerHTML = html;
  },

  // ---- 奖励商店 ----
  renderShop: function() {
    document.getElementById('shop-balance').textContent = '🪙 ' + App.userProgress.coins;
    var items = App.Rewards.getItems();
    var availableItems = items.filter(function(it) { return it.status === 'available'; });
    var pendingItems = items.filter(function(it) { return it.status === 'pending'; });
    var approvedItems = items.filter(function(it) { return it.status === 'approved'; });

    if (items.length === 0) {
      document.getElementById('shop-empty').style.display = 'block';
      document.getElementById('shop-items').innerHTML = '';
      return;
    }
    document.getElementById('shop-empty').style.display = 'none';

    var html = '';
    if (availableItems.length > 0) {
      html += '<div class="section-title">可兑换</div>';
      for (var i = 0; i < availableItems.length; i++) {
        var it = availableItems[i];
        var canAfford = App.userProgress.coins >= it.cost;
        html += '<div class="shop-item">' +
          '<span class="item-name">' + it.name + '</span>' +
          '<span class="item-cost">🪙' + it.cost + '</span>' +
          '<button class="btn-sm btn-buy" ' + (canAfford ? '' : 'disabled') +
          ' onclick="App.Rewards.purchaseItem(' + it.id + ')">' + (canAfford ? '兑换' : '不足') + '</button></div>';
      }
    }
    if (pendingItems.length > 0) {
      html += '<div class="section-title">等待审批</div>';
      for (var i = 0; i < pendingItems.length; i++) {
        html += '<div class="shop-item"><span class="item-name">' + pendingItems[i].name +
          '</span><span class="btn-sm btn-pending">等待中</span></div>';
      }
    }
    if (approvedItems.length > 0) {
      html += '<div class="section-title">已批准</div>';
      for (var i = 0; i < approvedItems.length; i++) {
        html += '<div class="shop-item"><span class="item-name">' + approvedItems[i].name +
          '</span><span style="color:var(--green);font-size:0.8rem">✅ 已批准</span></div>';
      }
    }
    document.getElementById('shop-items').innerHTML = html;
  },

  // ---- 家长中心面板 ----
  renderParentPanel: function() {
    // 奖励列表
    var items = App.Rewards.getItems();
    var listHtml = '';
    if (items.length === 0) listHtml = '<p style="color:var(--text-muted);font-size:0.85rem">暂无奖励物品</p>';
    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      listHtml += '<div class="shop-item"><span class="item-name">' + it.name + '</span>' +
        '<span class="item-cost">🪙' + it.cost + '</span>' +
        '<span style="font-size:0.7rem;color:var(--text-muted);margin-right:8px">' + it.status + '</span>' +
        '<button class="btn-sm btn-danger" onclick="App.Rewards.removeItem(' + it.id + ')">删</button></div>';
    }
    document.getElementById('parent-reward-list').innerHTML = listHtml;

    // 审批列表
    var pendingItems = items.filter(function(it) { return it.status === 'pending'; });
    var approvalHtml = '';
    if (pendingItems.length === 0) approvalHtml = '<p style="color:var(--text-muted);font-size:0.85rem">暂无待审批请求</p>';
    for (var i = 0; i < pendingItems.length; i++) {
      var it = pendingItems[i];
      approvalHtml += '<div class="shop-item"><span class="item-name">' + it.name + ' (' + it.cost + '💰)</span>' +
        '<button class="btn-sm btn-buy" style="margin-right:4px" onclick="App.Rewards.approveItem(' + it.id + ', true)">批准</button>' +
        '<button class="btn-sm btn-danger" onclick="App.Rewards.approveItem(' + it.id + ', false)">拒绝</button></div>';
    }
    document.getElementById('parent-approval-list').innerHTML = approvalHtml;

    // 学习数据
    var stats = App.Gamification.getStats();
    var xpInfo = App.Gamification.getXpInfo();
    var dataHtml = '<div class="parent-data-row"><span>等级</span><span>Lv.' + xpInfo.level + ' ' + xpInfo.title + '</span></div>' +
      '<div class="parent-data-row"><span>总XP</span><span>' + App.userProgress.xp + '</span></div>' +
      '<div class="parent-data-row"><span>金币</span><span>' + App.userProgress.coins + '</span></div>' +
      '<div class="parent-data-row"><span>连续天数</span><span>' + (App.userProgress.streak.current || 0) + ' (最佳' + (App.userProgress.streak.best || 0) + ')</span></div>' +
      '<div class="parent-data-row"><span>已掌握</span><span style="color:var(--green)">' + stats.mastered + '/' + stats.total + '</span></div>' +
      '<div class="parent-data-row"><span>进行中</span><span style="color:var(--amber)">' + stats.progress + '</span></div>' +
      '<div class="parent-data-row"><span>薄弱</span><span style="color:var(--coral)">' + stats.weak + '</span></div>' +
      '<div class="parent-data-row"><span>徽章</span><span>' + App.userProgress.badges.length + '/' + App.Gamification.BADGES.length + '</span></div>' +
      '<div class="parent-data-row"><span>诊断次数</span><span>' + (App.userProgress._diagnosisCount || 0) + '</span></div>' +
      '<div class="parent-data-row"><span>练习次数</span><span>' + (App.userProgress._practiceCount || 0) + '</span></div>';
    document.getElementById('parent-data-view').innerHTML = dataHtml;
  },

  // ---- Boss选择页 ----
  renderBossSelect: function() {
    var html = '';
    for (var i = 0; i < App.Boss.BOSSES.length; i++) {
      var boss = App.Boss.BOSSES[i];
      var st = App.Boss.getStatus(boss);
      var cardStyle = 'border-color:' + (st.cleared ? 'var(--gold)' : st.unlocked ? boss.color : 'var(--border-subtle)') + ';';
      var statusBadge = st.cleared ? '<span style="color:var(--gold)">👑 已通关</span>' :
        st.unlocked ? '<span style="color:' + boss.color + '">⚔️ 可挑战</span>' :
        '<span style="color:var(--text-muted)">🔒 需掌握' + boss.unlockCount + '个知识点 (' + st.mastered + '/' + st.total + ')</span>';
      html += '<div class="card" style="margin-bottom:12px;' + cardStyle + '">' +
        '<div style="display:flex;align-items:center;gap:12px">' +
        '<span style="font-size:2.5rem">' + boss.icon + '</span>' +
        '<div style="flex:1">' +
        '<div style="font-weight:700;font-size:1rem">' + boss.name + '</div>' +
        '<div style="font-size:0.75rem;color:var(--text-muted)">' + boss.chapter + ' | ' + boss.desc + '</div>' +
        '<div style="margin-top:6px">' + statusBadge + '</div>' +
        '</div>' +
        (st.unlocked ?
          '<button class="btn-primary" style="width:auto;padding:10px 20px" onclick="App.Boss.start(\'' + boss.id + '\')">挑战</button>' :
          '<button class="btn-secondary" style="width:auto;padding:10px 20px" disabled>锁定</button>') +
        '</div></div>';
    }
    document.getElementById('boss-list').innerHTML = html;
  },

  // ---- Boss结果页 ----
  renderBossResult: function() {
    var r = App._lastBossResult;
    if (!r) { App.navigate('boss-select'); return; }

    var card = document.getElementById('boss-result-card');
    var emoji = r.cleared ? '🏆' : (r.score >= 50 ? '💪' : '😞');
    var title = r.cleared ? 'Boss 击败！' : '挑战失败';
    card.innerHTML = '<div style="font-size:4rem">' + r.boss.icon + '</div>' +
      '<div style="font-size:1.5rem;font-weight:700;margin:8px 0">' + emoji + ' ' + title + '</div>' +
      '<div style="font-size:1rem">' + r.boss.name + '</div>' +
      '<div style="font-size:2rem;font-weight:700;color:var(--cyan);margin:8px 0">' + r.score + '%</div>' +
      '<div style="font-size:0.85rem;color:var(--text-secondary)">' +
      r.correct + '/' + r.total + ' 正确 | 均时' + r.avgTime.toFixed(1) + 's | 总时' + Math.round(r.totalTime) + 's</div>' +
      '<div style="font-size:0.9rem;color:var(--gold);margin-top:8px">+💎' + r.xpEarned + 'XP +🪙' + r.coinsEarned + '金币</div>' +
      (r.cleared ? '<div style="font-size:0.85rem;color:var(--green);margin-top:4px">🎁 道具已解锁!</div>' : '');

    // 时间详情
    var timeHtml = '<div class="time-chips">';
    for (var i = 0; i < r.questionTimes.length; i++) {
      var t = r.questionTimes[i];
      var a = r.answers[i];
      var chipClass = t < 5 ? 'fast' : t < 10 ? 'mid' : 'slow';
      timeHtml += '<span class="time-chip ' + chipClass + '">' +
        (i+1) + '. ' + t.toFixed(1) + 's' + (a.correct ? ' ✓' : ' ✗') + '</span>';
    }
    timeHtml += '</div>';
    document.getElementById('boss-time-detail').innerHTML = timeHtml;

    document.getElementById('boss-retry-btn').onclick = function() { App.Boss.start(r.boss.id); };

    // 分心报告
    if (r.focusReport) {
      document.getElementById('boss-focus').innerHTML = this._renderFocusHtml(r.focusReport);
    }
  },

  // ---- 考试结果 ----
  renderExamResult: function() {
    var r = App._lastExamResult;
    if (!r) { App.navigate('dashboard'); return; }
    var card = document.getElementById('exam-result-card');
    var emoji = r.finalScore >= 90 ? '🏆' : r.finalScore >= 80 ? '🎉' : r.finalScore >= 60 ? '👍' : '💪';
    card.innerHTML =
      '<div style="font-size:3rem">' + emoji + '</div>' +
      '<div style="font-size:2.5rem;font-weight:800;margin:8px 0;font-family:var(--font-mono)">' + r.finalScore + '<span style="font-size:1rem">/100分</span></div>' +
      '<div style="font-size:0.9rem;color:var(--accent);font-weight:700">' + r.bonusLabel + '</div>' +
      '<div style="font-size:0.85rem;color:var(--text-secondary);margin-top:8px">' +
      '选择 ' + r.mcCorrect + '/' + r.mcTotal + ' | 计算 ' + r.calcCorrect + '/' + r.calcTotal + '</div>' +
      '<div style="font-size:0.8rem;color:var(--text-tertiary)">用时 ' + Math.floor(r.usedTime/60) + '分' + (r.usedTime%60) + '秒</div>' +
      '<div style="font-size:0.9rem;color:var(--orange);margin-top:8px;font-weight:700">+💎' + r.xpEarned + 'XP +🪙' + r.coinsEarned + '金币</div>';

    // 选择详情
    var mcHtml = '<div class="time-chips">';
    for (var i = 0; i < r.mcAnswers.length; i++) {
      var a = r.mcAnswers[i];
      mcHtml += '<span class="time-chip ' + (a.correct ? 'fast' : 'slow') + '">' + (i+1) + '. ' + (a.correct ? '✓' : '✗') + '</span>';
    }
    mcHtml += '</div>';
    document.getElementById('exam-mc-detail').innerHTML = mcHtml;

    // 计算详情
    var calcHtml = '<div class="time-chips">';
    for (var i = 0; i < r.calcAnswers.length; i++) {
      var a = r.calcAnswers[i];
      calcHtml += '<span class="time-chip ' + (a.correct ? 'fast' : 'slow') + '">计算' + (i+1) + '. ' + (a.correct ? '✓' : '✗') + '</span>';
    }
    calcHtml += '</div>';
    document.getElementById('exam-calc-detail').innerHTML = calcHtml;

    // 分心报告
    if (r.focusReport) {
      document.getElementById('exam-focus').innerHTML = this._renderFocusHtml(r.focusReport);
    }
  },

  // ---- 道具栏渲染（答题屏共用）----
  renderItemBar: function(containerId) {
    var container = document.getElementById(containerId);
    if (!container) return;
    var ids = Object.keys(App.Items.DEFINITIONS);
    var hasAny = false;
    var html = '<div style="display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin-top:4px">';
    for (var i = 0; i < ids.length; i++) {
      var def = App.Items.DEFINITIONS[ids[i]];
      var cnt = App.Items.count(ids[i]);
      if (cnt > 0) hasAny = true;
      html += '<button class="item-btn' + (cnt > 0 ? ' has-item' : ' no-item') + '" ' +
        'onclick="App.Items.use(\'' + ids[i] + '\')" ' +
        'title="' + def.name + ': ' + def.desc + ' (剩' + cnt + '次)"' +
        (cnt === 0 ? ' disabled' : '') + '>' +
        def.icon + ' ' + def.name + (cnt > 0 ? ' ×' + cnt : '') + '</button>';
    }
    html += '</div>';
    container.innerHTML = hasAny || ids.some(function(id){return App.Items.count(id)>0}) ? html : '';
  },

  // ---- 分心报告渲染 ----
  _renderFocusHtml: function(focusReport) {
    if (!focusReport) return '';
    if (focusReport.count === 0) {
      return '<div style="text-align:center;margin:12px 0;font-size:13px;color:var(--green)">✅ 全程专注</div>';
    }
    var min = Math.floor(focusReport.totalTime / 60);
    var sec = focusReport.totalTime % 60;
    var html = '<div style="text-align:center;margin:12px 0;font-size:13px;color:var(--orange)">';
    html += '📱 切屏 ' + focusReport.count + ' 次，离开 ' + min + '分' + sec + '秒';
    html += '</div>';
    return html;
  },

  // ---- 渲染题号网格 ----
  renderPalette: function(containerId, total, currentIndex, answers) {
    var container = document.getElementById(containerId);
    if (!container) return;
    var html = '';
    for (var i = 0; i < total; i++) {
      var cls = 'palette-dot';
      if (i === currentIndex) cls += ' current';
      if (answers && answers[i] !== undefined) {
        cls += answers[i] ? ' answered-correct' : ' answered-wrong';
      }
      html += '<div class="' + cls + '">' + (i + 1) + '</div>';
    }
    container.innerHTML = html;
  },

  // ---- 错题本列表 ----
  renderWrongBook: function() {
    var totalWrong = 0;
    var nodeGroups = [];
    var ids = Object.keys(App.knowledgeGraph);
    for (var i = 0; i < ids.length; i++) {
      var kp = App.userProgress.knowledgeProgress[ids[i]];
      if (kp && kp._wrongQuestions && kp._wrongQuestions.length > 0) {
        var node = App.knowledgeGraph[ids[i]];
        totalWrong += kp._wrongQuestions.length;
        nodeGroups.push({
          id: ids[i],
          name: node.name,
          chapter: node.chapter,
          count: kp._wrongQuestions.length
        });
      }
    }

    document.getElementById('wrongbook-count').textContent = totalWrong > 0 ? '共' + totalWrong + '道错题' : '';

    if (nodeGroups.length === 0) {
      document.getElementById('wrongbook-list').innerHTML =
        '<div class="empty-state" style="margin-top:60px"><span class="empty-icon">🎉</span><p>暂无错题，继续保持！</p></div>';
      return;
    }

    var html = '';
    for (var i = 0; i < nodeGroups.length; i++) {
      var g = nodeGroups[i];
      html += '<div class="card" style="cursor:pointer" onclick="App.Ui.renderWrongBookReview(\'' + g.id + '\')">' +
        '<div style="display:flex;align-items:center;justify-content:space-between">' +
        '<div><div style="font-weight:700;font-size:1rem">' + g.name + '</div>' +
        '<div style="font-size:0.75rem;color:var(--text-secondary)">' + g.chapter + '</div></div>' +
        '<div style="text-align:right"><div style="font-size:1.5rem;font-weight:800;color:var(--coral)">' + g.count + '</div>' +
        '<div style="font-size:0.7rem;color:var(--text-secondary)">道错题</div></div></div></div>';
    }
    document.getElementById('wrongbook-list').innerHTML = html;
  },

  // ---- 错题回顾（指定知识点）----
  renderWrongBookReview: function(nodeId) {
    var kp = App.userProgress.knowledgeProgress[nodeId];
    if (!kp || !kp._wrongQuestions || kp._wrongQuestions.length === 0) {
      App.toast('该知识点暂无错题', 'info');
      App.Ui.renderWrongBook();
      return;
    }

    // 深拷贝错题列表作为回顾题库
    var questions = [];
    for (var i = 0; i < kp._wrongQuestions.length; i++) {
      var wq = kp._wrongQuestions[i];
      questions.push({
        stem: wq.stem,
        options: wq.options.slice(),
        correct: wq.correct,
        explanation: wq.explanation || '',
        _storedIndex: i
      });
    }

    var node = App.knowledgeGraph[nodeId];
    document.getElementById('wrongbook-review-title').textContent = node ? node.name + ' 错题回顾' : '错题回顾';

    App.wrongbookState = {
      nodeId: nodeId,
      questions: questions,
      currentQuestionIndex: 0,
      answers: [],
      _answered: false
    };

    App.navigate('wrongbook-review');
    this._renderWrongbookQuestion();
  },

  _renderWrongbookQuestion: function() {
    var ws = App.wrongbookState;
    if (!ws) return;
    var q = ws.questions[ws.currentQuestionIndex];
    if (!q) { this._finishWrongbookReview(); return; }

    ws._answered = false;

    var total = ws.questions.length;
    var cur = ws.currentQuestionIndex + 1;
    document.getElementById('wrongbook-progress-bar').style.width = ((cur - 1) / total * 100) + '%';
    document.getElementById('wrongbook-progress-text').textContent = '第 ' + cur + ' / ' + total + ' 题';
    document.getElementById('wrongbook-score-text').textContent = '';

    document.getElementById('wrongbook-stem').textContent = q.stem;

    var labels = ['A', 'B', 'C', 'D'];
    var html = '';
    for (var i = 0; i < q.options.length; i++) {
      html += '<button class="option-btn" onclick="App.Ui.wrongbookAnswer(' + i + ')">' +
        '<span class="letter-badge">' + labels[i] + '</span>' + q.options[i] + '</button>';
    }
    document.getElementById('wrongbook-options').innerHTML = html;
    document.getElementById('wrongbook-explanation').innerHTML = '';

    // 渲染题号网格
    var ansArr = [];
    for (var i = 0; i < ws.answers.length; i++) {
      ansArr[i] = ws.answers[i].correct;
    }
    App.Ui.renderPalette('wrongbook-palette', ws.questions.length, ws.currentQuestionIndex, ansArr);
  },

  wrongbookAnswer: function(choiceIndex) {
    var ws = App.wrongbookState;
    if (!ws || ws._answered) return;
    ws._answered = true;
    var q = ws.questions[ws.currentQuestionIndex];
    if (!q) return;

    var isCorrect = (choiceIndex === q.correct);
    ws.answers.push({ choice: choiceIndex, correct: isCorrect });

    // 按钮反馈
    var btns = document.querySelectorAll('#wrongbook-options .option-btn');
    for (var i = 0; i < btns.length; i++) {
      btns[i].style.pointerEvents = 'none';
      if (i === q.correct) btns[i].classList.add('correct');
      if (i === choiceIndex && !isCorrect) btns[i].classList.add('wrong');
    }

    // 显示解析
    var expEl = document.getElementById('wrongbook-explanation');
    if (expEl && q.explanation) {
      expEl.innerHTML = '<div class="explain-box">' +
        (isCorrect ? '✅ ' : '❌ ') + '<strong>解析</strong>&nbsp; ' + q.explanation + '</div>';
    }

    // 更新题号网格
    var ansArr = [];
    for (var i = 0; i < ws.answers.length; i++) {
      ansArr[i] = ws.answers[i].correct;
    }
    App.Ui.renderPalette('wrongbook-palette', ws.questions.length, ws.currentQuestionIndex, ansArr);

    // 从错题本移除（如果答对）或更新（如果答错）
    var kp = App.userProgress.knowledgeProgress[ws.nodeId];
    if (kp && kp._wrongQuestions) {
      if (isCorrect) {
        for (var w = 0; w < kp._wrongQuestions.length; w++) {
          if (kp._wrongQuestions[w].stem === q.stem) {
            kp._wrongQuestions.splice(w, 1);
            App.Storage.save();
            break;
          }
        }
      } else {
        for (var w = 0; w < kp._wrongQuestions.length; w++) {
          if (kp._wrongQuestions[w].stem === q.stem) {
            kp._wrongQuestions[w].timesWrong++;
            kp._wrongQuestions[w].userChoice = choiceIndex;
            kp._wrongQuestions[w].timestamp = Date.now();
            App.Storage.save();
            break;
          }
        }
      }
    }

    var self = this;
    setTimeout(function() {
      ws.currentQuestionIndex++;
      if (ws.currentQuestionIndex >= ws.questions.length) {
        self._finishWrongbookReview();
      } else {
        self._renderWrongbookQuestion();
      }
    }, isCorrect ? 500 : 1200);
  },

  _finishWrongbookReview: function() {
    App.wrongbookState = null;
    App.toast('错题回顾完成！', 'success');
    App.navigate('wrongbook');
  }
};
