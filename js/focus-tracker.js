// ===== 焦点追踪器：检测切屏/息屏/窗口失焦 =====
App.FocusTracker = {
  _count: 0,
  _totalTime: 0,
  _lastBlur: null,
  _started: false,

  // 开始追踪
  start: function() {
    this._count = 0;
    this._totalTime = 0;
    this._lastBlur = null;
    this._started = true;
    var self = this;
    document.addEventListener('visibilitychange', this._onChange = function() {
      if (document.hidden) {
        self._lastBlur = Date.now();
        self._count++;
      } else {
        if (self._lastBlur) {
          self._totalTime += Math.round((Date.now() - self._lastBlur) / 1000);
          self._lastBlur = null;
        }
      }
    });
    window.addEventListener('blur', this._onBlur = function() {
      if (!self._lastBlur) {
        self._lastBlur = Date.now();
        self._count++;
      }
    });
    window.addEventListener('focus', this._onFocus = function() {
      if (self._lastBlur) {
        self._totalTime += Math.round((Date.now() - self._lastBlur) / 1000);
        self._lastBlur = null;
      }
    });
  },

  // 停止追踪并返回报告
  stop: function() {
    this._started = false;
    // 如果当前处于失焦状态，补计时间
    if (this._lastBlur) {
      this._totalTime += Math.round((Date.now() - this._lastBlur) / 1000);
      this._lastBlur = null;
    }
    // 移除事件
    if (this._onChange) document.removeEventListener('visibilitychange', this._onChange);
    if (this._onBlur) window.removeEventListener('blur', this._onBlur);
    if (this._onFocus) window.removeEventListener('focus', this._onFocus);
    return {
      count: this._count,
      totalTime: this._totalTime
    };
  }
};