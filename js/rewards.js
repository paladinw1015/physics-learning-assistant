// ===== 奖励商店 + 家长中心 =====
App.Rewards = {

  getItems: function() {
    return App.userProgress.rewardShop.items || [];
  },

  addItem: function(name, cost) {
    if (!name || !cost || cost < 1) { App.toast('请填写名称和金币', 'error'); return false; }
    var items = App.userProgress.rewardShop.items || [];
    var maxId = 0;
    for (var i = 0; i < items.length; i++) { if (items[i].id > maxId) maxId = items[i].id; }
    items.push({ id: maxId + 1, name: name, cost: parseInt(cost), status: 'available', pendingSince: null });
    App.userProgress.rewardShop.items = items;
    App.Storage.save();
    if (App.currentScreen === 'parent') App.Ui.renderParentPanel();
    return true;
  },

  removeItem: function(itemId) {
    var items = App.userProgress.rewardShop.items || [];
    App.userProgress.rewardShop.items = items.filter(function(it) {
      return it.id !== itemId || it.status === 'pending';
    });
    App.Storage.save();
    if (App.currentScreen === 'parent') App.Ui.renderParentPanel();
  },

  purchaseItem: function(itemId) {
    var items = App.userProgress.rewardShop.items || [], item = null;
    for (var i = 0; i < items.length; i++) { if (items[i].id === itemId) { item = items[i]; break; } }
    if (!item || item.status !== 'available') { App.toast('不可兑换', 'error'); return; }
    if (App.userProgress.coins < item.cost) {
      App.toast('金币不足！还需 ' + (item.cost - App.userProgress.coins) + ' 💰', 'error'); return;
    }
    if (!confirm('确定用 ' + item.cost + ' 金币兑换「' + item.name + '」？')) return;
    App.userProgress.coins -= item.cost;
    item.status = 'pending';
    item.pendingSince = new Date().toISOString();
    App.Storage.save();
    App.toast('已提交兑换请求，等待家长审批', 'success');
    if (App.currentScreen === 'shop') App.Ui.renderShop();
  },

  approveItem: function(itemId, approved) {
    var items = App.userProgress.rewardShop.items || [], item = null;
    for (var i = 0; i < items.length; i++) { if (items[i].id === itemId) { item = items[i]; break; } }
    if (!item || item.status !== 'pending') { App.toast('没有待审批的请求', 'error'); return; }
    if (approved) { item.status = 'approved'; App.toast('已批准「' + item.name + '」', 'success'); }
    else { App.userProgress.coins += item.cost; item.status = 'available'; item.pendingSince = null; App.toast('已拒绝，金币已返还', 'info'); }
    App.Storage.save();
    if (App.currentScreen === 'parent') App.Ui.renderParentPanel();
  },

  verifyPin: function(inputPin) {
    if (inputPin === (App.userProgress.parentPin || '0000')) {
      document.getElementById('parent-auth').style.display = 'none';
      document.getElementById('parent-panel').style.display = 'block';
      document.getElementById('pin-error').textContent = '';
      var dots = document.querySelectorAll('.pin-dot');
      for (var i = 0; i < dots.length; i++) dots[i].value = '';
      App.Ui.renderParentPanel();
    } else {
      document.getElementById('pin-error').textContent = '密码错误';
      var dots = document.querySelectorAll('.pin-dot');
      for (var i = 0; i < dots.length; i++) dots[i].value = '';
      dots[0].focus();
    }
  },

  changePin: function(newPin) {
    if (!/^\d{4}$/.test(newPin)) { App.toast('密码需4位数字', 'error'); return; }
    App.userProgress.parentPin = newPin;
    App.Storage.save();
    App.toast('密码已修改', 'success');
  }
};
