// ===== 模板变量化生成系统 =====
// 每个模板包含变量占位符，运行时随机填充生成具体题目
// 挂在 App.QuestionTemplates 下

window.App = window.App || {};

App.QuestionTemplates = {
  // ---- 内部辅助函数 ----
  _randInt: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  _roundTo: function(val, decimals) {
    var factor = Math.pow(10, decimals);
    return Math.round(val * factor) / factor;
  },

  _shuffle: function(arr) {
    var result = arr.slice();
    for (var i = result.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = result[i];
      result[i] = result[j];
      result[j] = tmp;
    }
    return result;
  },

  // 生成 3 个与 correct 不同的错误选项（数值型），确保彼此不重复
  _makeWrongs: function(correct, deltas, precision) {
    precision = precision || 1;
    var wrongs = [];
    var seen = {};
    seen[String(correct)] = true;
    for (var i = 0; i < deltas.length; i++) {
      var w = this._roundTo(correct + deltas[i], precision);
      var key = String(w);
      if (!seen[key]) {
        wrongs.push(w);
        seen[key] = true;
      }
    }
    // 如果生成的错误选项不足 3 个，补充
    var fallbackIdx = 0;
    var fallbacks = [];
    for (var fi = 1; fi <= 10; fi++) {
      fallbacks.push(correct + fi * 0.5 * (correct > 0 ? 1 : 1));
      fallbacks.push(correct - fi * 0.5 * (correct > 0 ? 1 : 1));
    }
    while (wrongs.length < 3) {
      var fb = this._roundTo(fallbacks[fallbackIdx], precision);
      fallbackIdx++;
      var key = String(fb);
      if (!seen[key]) {
        wrongs.push(fb);
        seen[key] = true;
      }
    }
    return wrongs;
  },

  // ================================================================
  // 1. g1_velocity_accel — 速度与加速度
  // ================================================================
  g1_velocity_accel: {
    name: '速度与加速度',
    templates: [
      {
        id: 'g1_vel_acc_01',
        gen: function() {
          var v0 = App.QuestionTemplates._randInt(2, 10);
          var v = v0 + App.QuestionTemplates._randInt(8, 24);
          var t = App.QuestionTemplates._randInt(3, 8);
          var a = App.QuestionTemplates._roundTo((v - v0) / t, 1);
          var wrongs = App.QuestionTemplates._makeWrongs(a, [-0.5, 0.5, -1, 1, -1.5, 1.5, -2, 2], 1);
          var opts = [String(a) + ' m/s^2'].concat(
            [String(wrongs[0]) + ' m/s^2', String(wrongs[1]) + ' m/s^2', String(wrongs[2]) + ' m/s^2']
          );
          var shuffled = App.QuestionTemplates._shuffle(opts);
          return {
            stem: '一辆汽车从初速度 ' + v0 + ' m/s 开始加速，经过 ' + t + ' 秒后速度达到 ' + v + ' m/s，求汽车的加速度大小。',
            options: shuffled,
            correct: shuffled.indexOf(String(a) + ' m/s^2'),
            explanation: '加速度 a = (v - v0) / t = (' + v + ' - ' + v0 + ') / ' + t + ' = ' + a + ' m/s^2。加速度是速度变化率，方向与速度变化方向相同。',
            difficulty: 2
          };
        }
      },
      {
        id: 'g1_vel_acc_02',
        gen: function() {
          var v0 = App.QuestionTemplates._randInt(0, 6);
          var a = App.QuestionTemplates._roundTo((App.QuestionTemplates._randInt(12, 40)) / 10, 1);
          var t = App.QuestionTemplates._randInt(3, 10);
          var v = App.QuestionTemplates._roundTo(v0 + a * t, 1);
          var wrongs = App.QuestionTemplates._makeWrongs(v, [-a, a, -2, 2, -3, 3], 1);
          var opts = [String(v) + ' m/s'].concat(
            [String(wrongs[0]) + ' m/s', String(wrongs[1]) + ' m/s', String(wrongs[2]) + ' m/s']
          );
          var shuffled = App.QuestionTemplates._shuffle(opts);
          return {
            stem: '一辆汽车以初速度 ' + v0 + ' m/s 做匀加速直线运动，加速度大小为 ' + a + ' m/s^2，经过 ' + t + ' 秒后，汽车的速度变为多少？',
            options: shuffled,
            correct: shuffled.indexOf(String(v) + ' m/s'),
            explanation: 'v = v0 + at = ' + v0 + ' + ' + a + ' × ' + t + ' = ' + v0 + ' + ' + App.QuestionTemplates._roundTo(a * t, 1) + ' = ' + v + ' m/s。匀加速直线运动中速度随时间均匀增大。',
            difficulty: 2
          };
        }
      },
      {
        id: 'g1_vel_acc_03',
        gen: function() {
          var v1 = App.QuestionTemplates._randInt(20, 50);
          var v2 = v1 + App.QuestionTemplates._randInt(10, 30);
          var vAvg = (v1 + v2) / 2;
          var wrongs = App.QuestionTemplates._makeWrongs(vAvg, [-5, 5, -10, 10, -15], 1);
          var opts = [String(vAvg) + ' km/h'].concat(
            [String(wrongs[0]) + ' km/h', String(wrongs[1]) + ' km/h', String(wrongs[2]) + ' km/h']
          );
          var shuffled = App.QuestionTemplates._shuffle(opts);
          return {
            stem: '一辆汽车前半段时间以 ' + v1 + ' km/h 的速度行驶，后半段时间以 ' + v2 + ' km/h 的速度行驶，则汽车全程的平均速度是多少？',
            options: shuffled,
            correct: shuffled.indexOf(String(vAvg) + ' km/h'),
            explanation: '设每段运动时间为 t，总路程 s = ' + v1 + 't + ' + v2 + 't = ' + (v1 + v2) + 't，总时间为 2t，平均速度 v = (' + v1 + 't + ' + v2 + 't) / (2t) = (' + v1 + ' + ' + v2 + ') / 2 = ' + vAvg + ' km/h。时间相等时平均速度等于速度的算术平均值。',
            difficulty: 3
          };
        }
      },
      {
        id: 'g1_vel_acc_04',
        gen: function() {
          var mps = App.QuestionTemplates._randInt(5, 25);
          var kmph = App.QuestionTemplates._roundTo(mps * 3.6, 1);
          var a = App.QuestionTemplates._randInt(2, 8);
          var b = a + App.QuestionTemplates._randInt(1, 5);
          // 确保 4 个值互不相同
          while (a === mps || b === mps || a === b) {
            a = App.QuestionTemplates._randInt(2, 8);
            b = a + App.QuestionTemplates._randInt(1, 5);
          }
          var labels = [
            String(mps) + ' m/s',
            String(kmph) + ' km/h',
            String(a) + ' m/s',
            String(b) + ' m/s'
          ];
          // 统一换算为 km/h 找最大值
          var valKmh = [mps * 3.6, kmph, a * 3.6, b * 3.6];
          var maxIdx = 0;
          for (var vi = 1; vi < valKmh.length; vi++) {
            if (valKmh[vi] > valKmh[maxIdx]) maxIdx = vi;
          }
          var correctLabel = labels[maxIdx];
          var shuffled = App.QuestionTemplates._shuffle(labels);
          return {
            stem: '下列速度中最大的是哪个？',
            options: shuffled,
            correct: shuffled.indexOf(correctLabel),
            explanation: '统一换算为 km/h：' + String(mps) + ' m/s = ' + String(mps * 3.6) + ' km/h；' + String(kmph) + ' km/h 不变；' + String(a) + ' m/s = ' + String(a * 3.6) + ' km/h；' + String(b) + ' m/s = ' + String(b * 3.6) + ' km/h。因此最大值为 ' + correctLabel + '。比较速度前必须统一单位。',
            difficulty: 2
          };
        }
      }
    ]
  },

  // ================================================================
  // 2. g1_linear_motion — 匀变速直线运动
  // ================================================================
  g1_linear_motion: {
    name: '匀变速直线运动',
    templates: [
      {
        id: 'g1_lin_mot_01',
        gen: function() {
          var v0 = App.QuestionTemplates._randInt(0, 8);
          var a = App.QuestionTemplates._roundTo((App.QuestionTemplates._randInt(10, 30)) / 10, 1);
          var t = App.QuestionTemplates._randInt(2, 6);
          var s = App.QuestionTemplates._roundTo(v0 * t + 0.5 * a * t * t, 1);
          var wrongs = App.QuestionTemplates._makeWrongs(s, [-v0 * t, v0 * t, -5, 5, -10, 10, -15], 1);
          var shuffled = App.QuestionTemplates._shuffle([
            String(s) + ' m',
            String(wrongs[0]) + ' m',
            String(wrongs[1]) + ' m',
            String(wrongs[2]) + ' m'
          ]);
          return {
            stem: '一物体做匀加速直线运动，初速度为 ' + v0 + ' m/s，加速度为 ' + a + ' m/s^2，求前 ' + t + ' 秒内的位移。',
            options: shuffled,
            correct: shuffled.indexOf(String(s) + ' m'),
            explanation: 's = v0·t + ½at² = ' + v0 + ' × ' + t + ' + 0.5 × ' + a + ' × ' + t + '² = ' + (v0 * t) + ' + ' + App.QuestionTemplates._roundTo(0.5 * a * t * t, 1) + ' = ' + s + ' m。这是匀变速直线运动的基本位移公式。',
            difficulty: 3
          };
        }
      },
      {
        id: 'g1_lin_mot_02',
        gen: function() {
          var v0 = App.QuestionTemplates._randInt(4, 15);
          var a = App.QuestionTemplates._roundTo((App.QuestionTemplates._randInt(10, 25)) / 10, 1);
          var s = App.QuestionTemplates._randInt(20, 80);
          var v2 = v0 * v0 + 2 * a * s;
          var v = App.QuestionTemplates._roundTo(Math.sqrt(v2), 1);
          var wrongs = App.QuestionTemplates._makeWrongs(v, [-3, 3, -5, 5, -8, 8], 1);
          var shuffled = App.QuestionTemplates._shuffle([
            String(v) + ' m/s',
            String(wrongs[0]) + ' m/s',
            String(wrongs[1]) + ' m/s',
            String(wrongs[2]) + ' m/s'
          ]);
          return {
            stem: '一物体从初速度 ' + v0 + ' m/s 开始做匀加速直线运动，加速度大小为 ' + a + ' m/s^2，经过 ' + s + ' m 的位移后，物体的末速度是多少？',
            options: shuffled,
            correct: shuffled.indexOf(String(v) + ' m/s'),
            explanation: 'v² = v0² + 2as = ' + v0 + '² + 2 × ' + a + ' × ' + s + ' = ' + (v0 * v0) + ' + ' + (2 * a * s) + ' = ' + App.QuestionTemplates._roundTo(v2, 1) + '，v = √' + App.QuestionTemplates._roundTo(v2, 1) + ' = ' + v + ' m/s。当不知道时间时，使用该公式较为方便。',
            difficulty: 3
          };
        }
      },
      {
        id: 'g1_lin_mot_03',
        gen: function() {
          var v0 = App.QuestionTemplates._randInt(10, 25);
          var a = App.QuestionTemplates._roundTo((App.QuestionTemplates._randInt(30, 60)) / 10, 1);
          var s = App.QuestionTemplates._roundTo(v0 * v0 / (2 * a), 1);
          var wrongs = App.QuestionTemplates._makeWrongs(s, [-5, 5, -10, 10, -20], 1);
          var shuffled = App.QuestionTemplates._shuffle([
            String(s) + ' m',
            String(wrongs[0]) + ' m',
            String(wrongs[1]) + ' m',
            String(wrongs[2]) + ' m'
          ]);
          return {
            stem: '一辆汽车以 ' + v0 + ' m/s 的速度行驶，司机发现前方有危险后立即刹车，刹车加速度大小为 ' + a + ' m/s^2。求汽车从开始刹车到停止的刹车距离。',
            options: shuffled,
            correct: shuffled.indexOf(String(s) + ' m'),
            explanation: 'v = 0，由 v² - v0² = 2as 得 s = v0² / (2a) = ' + v0 + '² / (2 × ' + a + ') = ' + (v0 * v0) + ' / ' + (2 * a) + ' = ' + s + ' m。注意刹车问题中末速度为 0。',
            difficulty: 3
          };
        }
      },
      {
        id: 'g1_lin_mot_04',
        gen: function() {
          var vSlow = App.QuestionTemplates._randInt(8, 14);
          var vFast = vSlow + App.QuestionTemplates._randInt(5, 15);
          var d = App.QuestionTemplates._randInt(15, 40);
          var tRel = App.QuestionTemplates._roundTo(d / (vFast - vSlow), 1);
          var wrongs = App.QuestionTemplates._makeWrongs(tRel, [-1, 0.5, 1, -0.5, 2], 1);
          var shuffled = App.QuestionTemplates._shuffle([
            String(tRel) + ' s',
            String(wrongs[0]) + ' s',
            String(wrongs[1]) + ' s',
            String(wrongs[2]) + ' s'
          ]);
          return {
            stem: '快车以 ' + vFast + ' m/s 匀速行驶，慢车以 ' + vSlow + ' m/s 匀速行驶，两车同向行驶，快车在慢车后方 ' + d + ' m 处。经过多长时间快车能追上慢车？',
            options: shuffled,
            correct: shuffled.indexOf(String(tRel) + ' s'),
            explanation: '相对速度 v_rel = ' + vFast + ' - ' + vSlow + ' = ' + (vFast - vSlow) + ' m/s，追赶时间 t = d / v_rel = ' + d + ' / ' + (vFast - vSlow) + ' = ' + tRel + ' s。追及问题的关键是相对速度。',
            difficulty: 4
          };
        }
      }
    ]
  },

  // ================================================================
  // 3. g1_free_fall — 自由落体
  // ================================================================
  g1_free_fall: {
    name: '自由落体',
    templates: [
      {
        id: 'g1_fall_01',
        gen: function() {
          var t = App.QuestionTemplates._randInt(2, 6);
          var h = 5 * t * t;
          var wrongs = App.QuestionTemplates._makeWrongs(h, [-5 * t, 5 * t, -15, 15, -25], 1);
          var shuffled = App.QuestionTemplates._shuffle([
            String(h) + ' m',
            String(wrongs[0]) + ' m',
            String(wrongs[1]) + ' m',
            String(wrongs[2]) + ' m'
          ]);
          return {
            stem: '一物体从静止开始自由下落（取 g = 10 m/s^2），经过 ' + t + ' 秒后落地，求物体下落的高度。',
            options: shuffled,
            correct: shuffled.indexOf(String(h) + ' m'),
            explanation: '自由落体初速度为 0，h = ½gt² = 0.5 × 10 × ' + t + '² = 5 × ' + (t * t) + ' = ' + h + ' m。自由落体是初速度为 0、加速度为 g 的匀加速直线运动。',
            difficulty: 2
          };
        }
      },
      {
        id: 'g1_fall_02',
        gen: function() {
          var t = App.QuestionTemplates._randInt(2, 5);
          var h = 5 * t * t;
          var v = 10 * t;
          var wrongs = App.QuestionTemplates._makeWrongs(v, [-5, 5, -10, 10, -15], 1);
          var shuffled = App.QuestionTemplates._shuffle([
            String(v) + ' m/s',
            String(wrongs[0]) + ' m/s',
            String(wrongs[1]) + ' m/s',
            String(wrongs[2]) + ' m/s'
          ]);
          return {
            stem: '一物体从 ' + h + ' m 高处自由下落（取 g = 10 m/s^2），求物体落地时的速度大小。',
            options: shuffled,
            correct: shuffled.indexOf(String(v) + ' m/s'),
            explanation: '方法一：v = gt = 10 × ' + t + ' = ' + v + ' m/s。方法二：v² = 2gh = 2 × 10 × ' + h + ' = ' + (2 * 10 * h) + '，v = ' + v + ' m/s。两个公式可相互验证。',
            difficulty: 2
          };
        }
      },
      {
        id: 'g1_fall_03',
        gen: function() {
          var h = App.QuestionTemplates._randInt(20, 180);
          var t = App.QuestionTemplates._roundTo(Math.sqrt(2 * h / 10), 1);
          var wrongs = App.QuestionTemplates._makeWrongs(t, [-0.5, 0.5, -1, 1, -2], 1);
          var shuffled = App.QuestionTemplates._shuffle([
            String(t) + ' s',
            String(wrongs[0]) + ' s',
            String(wrongs[1]) + ' s',
            String(wrongs[2]) + ' s'
          ]);
          return {
            stem: '一石子从 ' + h + ' m 高的楼顶自由下落（取 g = 10 m/s^2），忽略空气阻力，求石子落地所需时间。',
            options: shuffled,
            correct: shuffled.indexOf(String(t) + ' s'),
            explanation: '由 h = ½gt² 得 t = √(2h/g) = √(2 × ' + h + ' / 10) = √(' + (2 * h / 10) + ') = ' + t + ' s。注意高度越大，下落时间越长，但不成正比。',
            difficulty: 2
          };
        }
      },
      {
        id: 'g1_fall_04',
        gen: function() {
          var v0 = App.QuestionTemplates._randInt(3, 8);
          var t = App.QuestionTemplates._randInt(2, 4);
          var v = v0 + 10 * t;
          var h = App.QuestionTemplates._roundTo(v0 * t + 5 * t * t, 1);
          var wrongs = App.QuestionTemplates._makeWrongs(v, [-5, 5, -10, 10, -3], 1);
          var shuffled = App.QuestionTemplates._shuffle([
            String(v) + ' m/s',
            String(wrongs[0]) + ' m/s',
            String(wrongs[1]) + ' m/s',
            String(wrongs[2]) + ' m/s'
          ]);
          return {
            stem: '一物体以初速度 ' + v0 + ' m/s 竖直向下抛出（取 g = 10 m/s^2），' + t + ' 秒后物体的速度大小是多少？',
            options: shuffled,
            correct: shuffled.indexOf(String(v) + ' m/s'),
            explanation: 'v = v0 + gt = ' + v0 + ' + 10 × ' + t + ' = ' + v0 + ' + ' + (10 * t) + ' = ' + v + ' m/s。竖直下抛是初速度不为 0 的匀加速直线运动，加速度仍为 g。',
            difficulty: 3
          };
        }
      }
    ]
  },

  // ================================================================
  // 4. g1_gravity_elasticity — 重力与弹力（胡克定律）
  // ================================================================
  g1_gravity_elasticity: {
    name: '重力与弹力（胡克定律）',
    templates: [
      {
        id: 'g1_grav_elas_01',
        gen: function() {
          var F = App.QuestionTemplates._randInt(5, 25);
          var x = App.QuestionTemplates._roundTo((App.QuestionTemplates._randInt(20, 100)) / 1000, 3);
          var k = App.QuestionTemplates._roundTo(F / x, 1);
          var wrongK = App.QuestionTemplates._makeWrongs(k, [-50, 50, -100, 100, -200], 1);
          var shuffled = App.QuestionTemplates._shuffle([
            String(k) + ' N/m',
            String(wrongK[0]) + ' N/m',
            String(wrongK[1]) + ' N/m',
            String(wrongK[2]) + ' N/m'
          ]);
          return {
            stem: '一根弹簧受到 ' + F + ' N 的拉力后伸长了 ' + (x * 1000) + ' mm，求弹簧的劲度系数 k。',
            options: shuffled,
            correct: shuffled.indexOf(String(k) + ' N/m'),
            explanation: '由胡克定律 F = kx，得 k = F/x = ' + F + ' / ' + x + ' = ' + k + ' N/m。注意单位换算：' + (x * 1000) + ' mm = ' + x + ' m。劲度系数反映弹簧的"软硬"程度。',
            difficulty: 2
          };
        }
      },
      {
        id: 'g1_grav_elas_02',
        gen: function() {
          var k = App.QuestionTemplates._randInt(100, 500);
          var F = App.QuestionTemplates._randInt(10, 50);
          var x = App.QuestionTemplates._roundTo(F / k, 3);
          var xCm = App.QuestionTemplates._roundTo(x * 100, 1);
          var wrongs = App.QuestionTemplates._makeWrongs(xCm, [-1, 1, -2, 2, -3], 1);
          var shuffled = App.QuestionTemplates._shuffle([
            String(xCm) + ' cm',
            String(wrongs[0]) + ' cm',
            String(wrongs[1]) + ' cm',
            String(wrongs[2]) + ' cm'
          ]);
          return {
            stem: '一根劲度系数为 ' + k + ' N/m 的弹簧，受到 ' + F + ' N 的拉力，求弹簧的伸长量。',
            options: shuffled,
            correct: shuffled.indexOf(String(xCm) + ' cm'),
            explanation: '由 F = kx 得 x = F/k = ' + F + ' / ' + k + ' = ' + x + ' m = ' + xCm + ' cm。胡克定律中弹簧的伸长量与拉力成正比。',
            difficulty: 2
          };
        }
      },
      {
        id: 'g1_grav_elas_03',
        gen: function() {
          var m = App.QuestionTemplates._randInt(3, 20);
          var gVals = [1.6, 3.7, 9.8, 24.8];
          var gNames = ['月球', '火星', '地球', '木星'];
          var gIdx = App.QuestionTemplates._randInt(0, 3);
          var g = gVals[gIdx];
          var G = App.QuestionTemplates._roundTo(m * g, 1);
          var wrongs = App.QuestionTemplates._makeWrongs(G, [-5, 5, -10, 10, -20, 20], 1);
          var shuffled = App.QuestionTemplates._shuffle([
            String(G) + ' N',
            String(wrongs[0]) + ' N',
            String(wrongs[1]) + ' N',
            String(wrongs[2]) + ' N'
          ]);
          return {
            stem: '一个质量为 ' + m + ' kg 的物体在' + gNames[gIdx] + '上（g = ' + g + ' N/kg），求物体受到的重力大小。',
            options: shuffled,
            correct: shuffled.indexOf(String(G) + ' N'),
            explanation: 'G = mg = ' + m + ' × ' + g + ' = ' + G + ' N。同一物体在不同星球上重力不同，但质量不变。g 越大，重力越大。',
            difficulty: 1
          };
        }
      },
      {
        id: 'g1_grav_elas_04',
        gen: function() {
          var k = App.QuestionTemplates._randInt(80, 300);
          var x = App.QuestionTemplates._roundTo((App.QuestionTemplates._randInt(30, 100)) / 100, 2);
          var F = App.QuestionTemplates._roundTo(k * x, 1);
          var wrongs = App.QuestionTemplates._makeWrongs(F, [-5, 5, -10, 10, -2, 2], 1);
          var shuffled = App.QuestionTemplates._shuffle([
            String(F) + ' N',
            String(wrongs[0]) + ' N',
            String(wrongs[1]) + ' N',
            String(wrongs[2]) + ' N'
          ]);
          return {
            stem: '一根弹簧原长为 20 cm，劲度系数为 ' + k + ' N/m，挂上重物后弹簧长度变为 ' + (20 + x * 100) + ' cm，求重物受到的重力大小。',
            options: shuffled,
            correct: shuffled.indexOf(String(F) + ' N'),
            explanation: '伸长量 x = ' + (x * 100) + ' cm - 20 cm = ' + (x * 100) + ' cm = ' + x + ' m。由胡克定律 F = kx = ' + k + ' × ' + x + ' = ' + F + ' N。弹簧弹力等于物体重力时物体处于平衡状态。',
            difficulty: 2
          };
        }
      }
    ]
  },

  // ================================================================
  // 5. g1_friction — 摩擦力
  // ================================================================
  g1_friction: {
    name: '摩擦力',
    templates: [
      {
        id: 'g1_fric_01',
        gen: function() {
          var m = App.QuestionTemplates._randInt(5, 30);
          var mu = App.QuestionTemplates._roundTo((App.QuestionTemplates._randInt(10, 50)) / 100, 2);
          var g = 10;
          var f = App.QuestionTemplates._roundTo(mu * m * g, 1);
          var wrongs = App.QuestionTemplates._makeWrongs(f, [-mu * g, mu * g, -10, 10, -20, 20], 1);
          var shuffled = App.QuestionTemplates._shuffle([
            String(f) + ' N',
            String(wrongs[0]) + ' N',
            String(wrongs[1]) + ' N',
            String(wrongs[2]) + ' N'
          ]);
          return {
            stem: '一个质量为 ' + m + ' kg 的物体放在水平地面上，物体与地面的动摩擦因数为 ' + mu + '。（取 g = 10 N/kg）求物体受到的滑动摩擦力大小。',
            options: shuffled,
            correct: shuffled.indexOf(String(f) + ' N'),
            explanation: '压力 N = mg = ' + m + ' × 10 = ' + (m * g) + ' N。滑动摩擦力 f = μN = ' + mu + ' × ' + (m * g) + ' = ' + f + ' N。滑动摩擦力与压力成正比，与接触面积无关。',
            difficulty: 2
          };
        }
      },
      {
        id: 'g1_fric_02',
        gen: function() {
          var m = App.QuestionTemplates._randInt(5, 25);
          var f = App.QuestionTemplates._randInt(10, 50);
          var g = 10;
          var mu = App.QuestionTemplates._roundTo(f / (m * g), 2);
          var wrongs = App.QuestionTemplates._makeWrongs(mu, [-0.05, 0.05, -0.1, 0.1, -0.15], 2);
          var shuffled = App.QuestionTemplates._shuffle([
            String(mu),
            String(wrongs[0]),
            String(wrongs[1]),
            String(wrongs[2])
          ]);
          return {
            stem: '一个质量为 ' + m + ' kg 的物体在水平地面上做匀速直线运动，受到的滑动摩擦力为 ' + f + ' N。（取 g = 10 N/kg）求物体与地面之间的动摩擦因数。',
            options: shuffled,
            correct: shuffled.indexOf(String(mu)),
            explanation: '物体匀速运动，拉力等于摩擦力。N = mg = ' + m + ' × 10 = ' + (m * g) + ' N。由 f = μN 得 μ = f/N = ' + f + ' / ' + (m * g) + ' = ' + mu + '。动摩擦因数只与接触面材料有关。',
            difficulty: 3
          };
        }
      },
      {
        id: 'g1_fric_03',
        gen: function() {
          var m = App.QuestionTemplates._randInt(5, 20);
          var mu = App.QuestionTemplates._roundTo((App.QuestionTemplates._randInt(10, 30)) / 100, 2);
          var a = App.QuestionTemplates._roundTo((App.QuestionTemplates._randInt(5, 25)) / 10, 1);
          var g = 10;
          var f = mu * m * g;
          var F = App.QuestionTemplates._roundTo(m * a + f, 1);
          var wrongs = App.QuestionTemplates._makeWrongs(F, [-5, 5, -10, 10, -f, f], 1);
          var shuffled = App.QuestionTemplates._shuffle([
            String(F) + ' N',
            String(wrongs[0]) + ' N',
            String(wrongs[1]) + ' N',
            String(wrongs[2]) + ' N'
          ]);
          return {
            stem: '一个质量为 ' + m + ' kg 的物体放在水平地面上，动摩擦因数为 ' + mu + '。若要使物体以 ' + a + ' m/s^2 的加速度前进，求水平拉力 F 的大小。（取 g = 10 N/kg）',
            options: shuffled,
            correct: shuffled.indexOf(String(F) + ' N'),
            explanation: '摩擦力 f = μmg = ' + mu + ' × ' + m + ' × 10 = ' + App.QuestionTemplates._roundTo(f, 1) + ' N。由牛顿第二定律 F - f = ma，得 F = ma + f = ' + m + ' × ' + a + ' + ' + App.QuestionTemplates._roundTo(f, 1) + ' = ' + F + ' N。拉力要同时克服摩擦力和提供加速度。',
            difficulty: 4
          };
        }
      },
      {
        id: 'g1_fric_04',
        gen: function() {
          var m = App.QuestionTemplates._randInt(5, 20);
          var ang = App.QuestionTemplates._pick([30, 37, 45, 53, 60]);
          var rad = ang * Math.PI / 180;
          var g = 10;
          var N = m * g * Math.cos(rad);
          var f = App.QuestionTemplates._roundTo(0.3 * N, 1);
          var NStr = String(App.QuestionTemplates._roundTo(N, 1));
          var wrongs = App.QuestionTemplates._makeWrongs(f, [-2, 2, -5, 5, -8], 1);
          var shuffled = App.QuestionTemplates._shuffle([
            String(f) + ' N',
            String(wrongs[0]) + ' N',
            String(wrongs[1]) + ' N',
            String(wrongs[2]) + ' N'
          ]);
          return {
            stem: '一个质量为 ' + m + ' kg 的物体放在倾角为 ' + ang + '° 的斜面上，物体与斜面的动摩擦因数为 0.3。求物体受到的滑动摩擦力大小。（取 g = 10 N/kg，sin' + ang + '°≈' + App.QuestionTemplates._roundTo(Math.sin(rad), 2) + '，cos' + ang + '°≈' + App.QuestionTemplates._roundTo(Math.cos(rad), 2) + '）',
            options: shuffled,
            correct: shuffled.indexOf(String(f) + ' N'),
            explanation: '斜面上压力 N = mg·cosθ = ' + m + ' × 10 × ' + App.QuestionTemplates._roundTo(Math.cos(rad), 2) + ' = ' + NStr + ' N。f = μN = 0.3 × ' + NStr + ' = ' + f + ' N。斜面倾角越大，压力越小，摩擦力越小。',
            difficulty: 4
          };
        }
      }
    ]
  },

  // ================================================================
  // 6. g1_force_synthesis — 力的合成与分解
  // ================================================================
  g1_force_synthesis: {
    name: '力的合成与分解',
    templates: [
      {
        id: 'g1_force_syn_01',
        gen: function() {
          var F1 = App.QuestionTemplates._randInt(3, 12);
          var F2 = App.QuestionTemplates._randInt(4, 16);
          var Fmag = App.QuestionTemplates._roundTo(Math.sqrt(F1 * F1 + F2 * F2), 1);
          var wrongs = App.QuestionTemplates._makeWrongs(Fmag, [-1, 1, -2, 2, -3, 3, -4], 1);
          var shuffled = App.QuestionTemplates._shuffle([
            String(Fmag) + ' N',
            String(wrongs[0]) + ' N',
            String(wrongs[1]) + ' N',
            String(wrongs[2]) + ' N'
          ]);
          return {
            stem: '一物体受到两个互相垂直的力作用，F₁ = ' + F1 + ' N（水平向东），F₂ = ' + F2 + ' N（水平向北）。求这两个力的合力大小。',
            options: shuffled,
            correct: shuffled.indexOf(String(Fmag) + ' N'),
            explanation: '两个力垂直，合力大小 F = √(F₁² + F₂²) = √(' + F1 + '² + ' + F2 + '²) = √(' + (F1 * F1) + ' + ' + (F2 * F2) + ') = √' + (F1 * F1 + F2 * F2) + ' = ' + Fmag + ' N。方向由 tanθ = F₂/F₁ 确定。',
            difficulty: 3
          };
        }
      },
      {
        id: 'g1_force_syn_02',
        gen: function() {
          var F1 = App.QuestionTemplates._randInt(4, 12);
          var F2 = App.QuestionTemplates._randInt(6, 18);
          var Fsum = F1 + F2;
          var Fdiff = Math.abs(F1 - F2);
          var wrongs = App.QuestionTemplates._makeWrongs(Fsum, [-2, 2, -5, 5, -8, 8], 1);
          var shuffled = App.QuestionTemplates._shuffle([
            String(Fsum) + ' N',
            String(Fdiff) + ' N',
            String(wrongs[0]) + ' N',
            String(wrongs[1]) + ' N'
          ]);
          return {
            stem: '两个力 F₁ = ' + F1 + ' N、F₂ = ' + F2 + ' N，当它们方向相同时，合力大小为多少？',
            options: shuffled,
            correct: shuffled.indexOf(String(Fsum) + ' N'),
            explanation: '方向相同时，合力等于两力之和：F = F₁ + F₂ = ' + F1 + ' + ' + F2 + ' = ' + Fsum + ' N。方向相反时合力为两者之差：' + Fdiff + ' N。合力的范围在 |F₁ - F₂| 与 F₁ + F₂ 之间。',
            difficulty: 1
          };
        }
      },
      {
        id: 'g1_force_syn_03',
        gen: function() {
          var F1 = App.QuestionTemplates._randInt(5, 15);
          var F2 = F1 + App.QuestionTemplates._randInt(1, 6);
          var theta = App.QuestionTemplates._pick([30, 45, 60, 120, 150]);
          var rad = theta * Math.PI / 180;
          var Fmag = App.QuestionTemplates._roundTo(Math.sqrt(F1 * F1 + F2 * F2 + 2 * F1 * F2 * Math.cos(rad)), 1);
          var wrongs = App.QuestionTemplates._makeWrongs(Fmag, [-2, 2, -4, 4, -6, 6], 1);
          var shuffled = App.QuestionTemplates._shuffle([
            String(Fmag) + ' N',
            String(wrongs[0]) + ' N',
            String(wrongs[1]) + ' N',
            String(wrongs[2]) + ' N'
          ]);
          return {
            stem: '两个力夹角为 ' + theta + '°，F₁ = ' + F1 + ' N，F₂ = ' + F2 + ' N，求合力大小。（cos' + theta + '° ≈ ' + App.QuestionTemplates._roundTo(Math.cos(rad), 2) + '）',
            options: shuffled,
            correct: shuffled.indexOf(String(Fmag) + ' N'),
            explanation: '由平行四边形定则，F = √(F₁² + F₂² + 2F₁F₂cosθ) = √(' + F1 + '² + ' + F2 + '² + 2 × ' + F1 + ' × ' + F2 + ' × ' + App.QuestionTemplates._roundTo(Math.cos(rad), 2) + ') = ' + Fmag + ' N。夹角越小合力越大。',
            difficulty: 4
          };
        }
      },
      {
        id: 'g1_force_syn_04',
        gen: function() {
          var G = App.QuestionTemplates._randInt(40, 100);
          var ang = App.QuestionTemplates._pick([30, 37, 45, 53, 60]);
          var rad = ang * Math.PI / 180;
          var sinA = App.QuestionTemplates._roundTo(Math.sin(rad), 2);
          var cosA = App.QuestionTemplates._roundTo(Math.cos(rad), 2);
          var Fdown = App.QuestionTemplates._roundTo(G * sinA, 1);
          var Fperp = App.QuestionTemplates._roundTo(G * cosA, 1);
          var wrongs = App.QuestionTemplates._makeWrongs(Fdown, [-5, 5, -10, 10, -15, 15], 1);
          var shuffled = App.QuestionTemplates._shuffle([
            String(Fdown) + ' N',
            String(wrongs[0]) + ' N',
            String(wrongs[1]) + ' N',
            String(wrongs[2]) + ' N'
          ]);
          return {
            stem: '一个重 ' + G + ' N 的物体放在倾角为 ' + ang + '° 的斜面上，求重力沿斜面方向的分力大小。（sin' + ang + '° ≈ ' + sinA + '，cos' + ang + '° ≈ ' + cosA + '）',
            options: shuffled,
            correct: shuffled.indexOf(String(Fdown) + ' N'),
            explanation: '重力沿斜面方向的分力 G∥ = G·sinθ = ' + G + ' × ' + sinA + ' = ' + Fdown + ' N。垂直斜面方向的分力 G⊥ = G·cosθ = ' + G + ' × ' + cosA + ' = ' + Fperp + ' N。斜面倾角越大，下滑分力越大。',
            difficulty: 3
          };
        }
      }
    ]
  },

  // ================================================================
  // 7. g1_newton_first — 牛顿第一定律（惯性）
  // ================================================================
  g1_newton_first: {
    name: '牛顿第一定律（惯性）',
    templates: [
      {
        id: 'g1_newton_1_01',
        gen: function() {
          var v = App.QuestionTemplates._randInt(10, 30);
          var wrongs = ['向前倾倒', '向后倾倒', '向左倾倒', '向右倾倒', '保持不动', '向上跳起'];
          var correctStr = '向前倾倒';
          var pool = ['向前倾倒', '向后倾倒', '保持不动', '向上跳起'];
          var shuffled = App.QuestionTemplates._shuffle(pool);
          return {
            stem: '一辆公交车以 ' + v + ' m/s 的速度匀速行驶，突然司机刹车使车减速。站在车内的乘客会怎样？',
            options: shuffled,
            correct: shuffled.indexOf('向前倾倒'),
            explanation: '刹车时，车减速但乘客的上半身由于惯性保持原来的运动状态继续向前，所以会向前倾倒。惯性是物体保持原来运动状态的性质。',
            difficulty: 2
          };
        }
      },
      {
        id: 'g1_newton_1_02',
        gen: function() {
          var v = App.QuestionTemplates._randInt(15, 30);
          var wrongs = ['逐渐停下来', '继续做匀速直线运动', '加速运动', '立即静止', '做圆周运动'];
          var correctStr = '继续做匀速直线运动';
          var pool = ['逐渐停下来', '继续做匀速直线运动', '加速运动', '立即静止'];
          var shuffled = App.QuestionTemplates._shuffle(pool);
          return {
            stem: '一个物体在光滑水平面上以 ' + v + ' m/s 的速度做匀速直线运动。若所有外力突然消失，物体将如何运动？',
            options: shuffled,
            correct: shuffled.indexOf('继续做匀速直线运动'),
            explanation: '根据牛顿第一定律，一切物体在不受外力作用时，总保持静止或匀速直线运动状态。外力消失后，物体将保持消失瞬间的速度做匀速直线运动。',
            difficulty: 2
          };
        }
      },
      {
        id: 'g1_newton_1_03',
        gen: function() {
          var v = App.QuestionTemplates._randInt(30, 80);
          var pool = ['由于惯性保持原来的运动状态向前飞出', '立即竖直下落', '向上运动后静止', '向后倒飞'];
          var shuffled = App.QuestionTemplates._shuffle(pool);
          return {
            stem: '一辆以 ' + v + ' km/h 速度行驶的汽车突然急刹车，站在车上的一个人如果没有扶稳，将会发生什么？',
            options: shuffled,
            correct: shuffled.indexOf('由于惯性保持原来的运动状态向前飞出'),
            explanation: '刹车时，人的脚随车减速，但上身由于惯性仍保持原来 ' + v + ' km/h 的速度向前运动，所以人会向前冲出。系安全带可以防止此类伤害。',
            difficulty: 1
          };
        }
      }
    ]
  },

  // ================================================================
  // 8. g1_newton_second — 牛顿第二定律（F = ma）
  // ================================================================
  g1_newton_second: {
    name: '牛顿第二定律（F = ma）',
    templates: [
      {
        id: 'g1_newton_2_01',
        gen: function() {
          var m = App.QuestionTemplates._randInt(2, 20);
          var a = App.QuestionTemplates._roundTo((App.QuestionTemplates._randInt(10, 50)) / 10, 1);
          var F = App.QuestionTemplates._roundTo(m * a, 1);
          var wrongs = App.QuestionTemplates._makeWrongs(F, [-m, m, -5, 5, -10, 10], 1);
          var shuffled = App.QuestionTemplates._shuffle([
            String(F) + ' N',
            String(wrongs[0]) + ' N',
            String(wrongs[1]) + ' N',
            String(wrongs[2]) + ' N'
          ]);
          return {
            stem: '一个质量为 ' + m + ' kg 的物体在水平面上运动，受到一个恒定的合外力作用，产生了 ' + a + ' m/s^2 的加速度。求物体受到的合外力大小。',
            options: shuffled,
            correct: shuffled.indexOf(String(F) + ' N'),
            explanation: '由牛顿第二定律 F = ma = ' + m + ' × ' + a + ' = ' + F + ' N。合外力的方向与加速度方向相同。这是经典力学的核心公式。',
            difficulty: 2
          };
        }
      },
      {
        id: 'g1_newton_2_02',
        gen: function() {
          var m = App.QuestionTemplates._randInt(2, 15);
          var F = App.QuestionTemplates._randInt(10, 50);
          var a = App.QuestionTemplates._roundTo(F / m, 1);
          var wrongs = App.QuestionTemplates._makeWrongs(a, [-1, 1, -2, 2, -0.5, 0.5], 1);
          var shuffled = App.QuestionTemplates._shuffle([
            String(a) + ' m/s^2',
            String(wrongs[0]) + ' m/s^2',
            String(wrongs[1]) + ' m/s^2',
            String(wrongs[2]) + ' m/s^2'
          ]);
          return {
            stem: '一个质量为 ' + m + ' kg 的物体受到大小为 ' + F + ' N 的合外力作用，求物体的加速度大小。',
            options: shuffled,
            correct: shuffled.indexOf(String(a) + ' m/s^2'),
            explanation: '由 F = ma 得 a = F/m = ' + F + ' / ' + m + ' = ' + a + ' m/s^2。质量越大，相同力产生的加速度越小，体现了质量是惯性大小的量度。',
            difficulty: 2
          };
        }
      },
      {
        id: 'g1_newton_2_03',
        gen: function() {
          var m = App.QuestionTemplates._randInt(5, 25);
          var mu = App.QuestionTemplates._roundTo((App.QuestionTemplates._randInt(10, 30)) / 100, 2);
          var Fapp = App.QuestionTemplates._randInt(20, 80);
          var g = 10;
          var f = mu * m * g;
          var Fnet = Fapp - f;
          var a = App.QuestionTemplates._roundTo(Fnet / m, 1);
          var wrongs = App.QuestionTemplates._makeWrongs(a, [-0.5, 0.5, -1, 1, -2], 1);
          var shuffled = App.QuestionTemplates._shuffle([
            String(a) + ' m/s^2',
            String(wrongs[0]) + ' m/s^2',
            String(wrongs[1]) + ' m/s^2',
            String(wrongs[2]) + ' m/s^2'
          ]);
          return {
            stem: '一个质量为 ' + m + ' kg 的物体在水平面上受到水平拉力 F = ' + Fapp + ' N 的作用，物体与地面的动摩擦因数为 ' + mu + '。（取 g = 10 N/kg）求物体的加速度大小。',
            options: shuffled,
            correct: shuffled.indexOf(String(a) + ' m/s^2'),
            explanation: '摩擦力 f = μmg = ' + mu + ' × ' + m + ' × 10 = ' + App.QuestionTemplates._roundTo(f, 1) + ' N。合外力 F合 = F - f = ' + Fapp + ' - ' + App.QuestionTemplates._roundTo(f, 1) + ' = ' + App.QuestionTemplates._roundTo(Fnet, 1) + ' N。由 F合 = ma 得 a = F合/m = ' + App.QuestionTemplates._roundTo(Fnet, 1) + ' / ' + m + ' = ' + a + ' m/s^2。',
            difficulty: 4
          };
        }
      },
      {
        id: 'g1_newton_2_04',
        gen: function() {
          var m1 = App.QuestionTemplates._randInt(2, 6);
          var m2 = m1 + App.QuestionTemplates._randInt(1, 4);
          var g = 10;
          var a = App.QuestionTemplates._roundTo((m2 - m1) * g / (m1 + m2), 1);
          var T = App.QuestionTemplates._roundTo(2 * m1 * m2 * g / (m1 + m2), 1);
          var wrongs = App.QuestionTemplates._makeWrongs(a, [-1, 1, -2, 2, -0.5], 1);
          var shuffled = App.QuestionTemplates._shuffle([
            String(a) + ' m/s^2',
            String(wrongs[0]) + ' m/s^2',
            String(wrongs[1]) + ' m/s^2',
            String(wrongs[2]) + ' m/s^2'
          ]);
          return {
            stem: '如图所示，两个物体质量分别为 m₁ = ' + m1 + ' kg 和 m₂ = ' + m2 + ' kg，用轻绳跨过光滑定滑轮连接（m₂ > m₁）。求 m₂ 下落的加速度大小。（取 g = 10 m/s^2）',
            options: shuffled,
            correct: shuffled.indexOf(String(a) + ' m/s^2'),
            explanation: '对 m₁：T - m₁g = m₁a；对 m₂：m₂g - T = m₂a。两式相加得 (m₂ - m₁)g = (m₁ + m₂)a，解得 a = (m₂ - m₁)g / (m₁ + m₂) = (' + m2 + ' - ' + m1 + ') × 10 / (' + m1 + ' + ' + m2 + ') = ' + (m2 - m1) * 10 + ' / ' + (m1 + m2) + ' = ' + a + ' m/s^2。',
            difficulty: 5
          };
        }
      }
    ]
  },

  // ================================================================
  // 9. c8_speed_concept — 初中速度概念
  // ================================================================
  c8_speed_concept: {
    name: '速度的概念与计算',
    templates: [
      {
        id: 'c8_speed_01',
        gen: function() {
          var s = App.QuestionTemplates._randInt(50, 400);
          var t = App.QuestionTemplates._randInt(5, 30);
          var v = App.QuestionTemplates._roundTo(s / t, 1);
          var wrongs = App.QuestionTemplates._makeWrongs(v, [-0.5, 0.5, -1, 1, -2, 2], 1);
          var shuffled = App.QuestionTemplates._shuffle([
            String(v) + ' m/s',
            String(wrongs[0]) + ' m/s',
            String(wrongs[1]) + ' m/s',
            String(wrongs[2]) + ' m/s'
          ]);
          return {
            stem: '某同学在体育课上跑了 ' + s + ' 米，用时 ' + t + ' 秒，求他的平均速度。',
            options: shuffled,
            correct: shuffled.indexOf(String(v) + ' m/s'),
            explanation: '由速度公式 v = s/t = ' + s + ' / ' + t + ' = ' + v + ' m/s。平均速度是总路程除以总时间，不反映某个瞬间的快慢。',
            difficulty: 1
          };
        }
      },
      {
        id: 'c8_speed_02',
        gen: function() {
          var v = App.QuestionTemplates._randInt(2, 15);
          var t = App.QuestionTemplates._randInt(10, 60);
          var s = v * t;
          var wrongs = App.QuestionTemplates._makeWrongs(s, [-v, v, -5, 5, -10, 10], 1);
          var shuffled = App.QuestionTemplates._shuffle([
            String(s) + ' m',
            String(wrongs[0]) + ' m',
            String(wrongs[1]) + ' m',
            String(wrongs[2]) + ' m'
          ]);
          return {
            stem: '一辆自行车以 ' + v + ' m/s 的速度匀速行驶，' + t + ' 秒内通过的路程是多少？',
            options: shuffled,
            correct: shuffled.indexOf(String(s) + ' m'),
            explanation: 's = vt = ' + v + ' × ' + t + ' = ' + s + ' m。匀速直线运动中速度不变，路程与时间成正比。',
            difficulty: 1
          };
        }
      },
      {
        id: 'c8_speed_03',
        gen: function() {
          var v1 = App.QuestionTemplates._randInt(30, 60);
          var v2 = v1 + App.QuestionTemplates._randInt(5, 25);
          var vAvg = App.QuestionTemplates._roundTo(2 / (1 / v1 + 1 / v2), 1);
          var wrongs = App.QuestionTemplates._makeWrongs(vAvg, [-5, 5, -2, 2, -10, 10], 1);
          var shuffled = App.QuestionTemplates._shuffle([
            String(vAvg) + ' km/h',
            String(wrongs[0]) + ' km/h',
            String(wrongs[1]) + ' km/h',
            String(wrongs[2]) + ' km/h'
          ]);
          return {
            stem: '一辆汽车前一半路程以 ' + v1 + ' km/h 行驶，后一半路程以 ' + v2 + ' km/h 行驶，求全程的平均速度。',
            options: shuffled,
            correct: shuffled.indexOf(String(vAvg) + ' km/h'),
            explanation: '设总路程为 2s。t₁ = s/' + v1 + '，t₂ = s/' + v2 + '。平均速度 = 2s / (t₁ + t₂) = 2s / (s/' + v1 + ' + s/' + v2 + ') = 2 / (1/' + v1 + ' + 1/' + v2 + ') = ' + vAvg + ' km/h。注意：平均速度不是速度的平均值！',
            difficulty: 3
          };
        }
      },
      {
        id: 'c8_speed_04',
        gen: function() {
          var val = App.QuestionTemplates._randInt(4, 16);
          var mps = val;
          var kmph = val * 3.6;
          var a = App.QuestionTemplates._roundTo(mps + App.QuestionTemplates._randInt(1, 5), 1);
          var b = App.QuestionTemplates._roundTo(kmph - App.QuestionTemplates._randInt(5, 20), 1);
          var vals = [String(mps) + ' m/s', String(kmph) + ' km/h', String(a) + ' m/s', String(b) + ' km/h'];
          // Build explanation
          var mpsConvert = mps + ' m/s = ' + mps + ' × 3.6 = ' + kmph + ' km/h';
          var aConvert = a + ' m/s = ' + a + ' × 3.6 = ' + App.QuestionTemplates._roundTo(a * 3.6, 1) + ' km/h';
          var bConvert = b + ' km/h = ' + b + ' / 3.6 = ' + App.QuestionTemplates._roundTo(b / 3.6, 1) + ' m/s';
          // Find max in km/h
          var maxVal = Math.max(kmph, mpsConvert ? kmph : 0, a * 3.6, b);
          var correctLabel = '';
          var correctIdx = 0;
          if (maxVal === kmph) correctLabel = String(kmph) + ' km/h';
          else if (maxVal === a * 3.6) correctLabel = String(a) + ' m/s';
          else correctLabel = String(b) + ' km/h';

          var shuffled = App.QuestionTemplates._shuffle(vals);
          return {
            stem: '下列速度中最大的是哪个？',
            options: shuffled,
            correct: shuffled.indexOf(correctLabel),
            explanation: '统一换算为 km/h：' + mpsConvert + '；' + aConvert + '；' + bConvert + '。比较可知最大值为 ' + correctLabel + '。比较速度前必须先统一单位。',
            difficulty: 2
          };
        }
      }
    ]
  },

  // ================================================================
  // 10. g1_time_displacement — 时间与位移
  // ================================================================
  g1_time_displacement: {
    name: '时间与位移',
    templates: [
      {
        id: 'g1_time_disp_01',
        gen: function() {
          var d1 = App.QuestionTemplates._randInt(3, 10);
          var d2 = App.QuestionTemplates._randInt(4, 12);
          var dist = d1 + d2;
          var disp = App.QuestionTemplates._roundTo(Math.sqrt(d1 * d1 + d2 * d2), 1);
          var wrongs = App.QuestionTemplates._makeWrongs(disp, [-1, 1, -2, 2, -3, 3], 1);
          var shuffled = App.QuestionTemplates._shuffle([
            String(disp) + ' m',
            String(dist) + ' m',
            String(wrongs[0]) + ' m',
            String(wrongs[1]) + ' m'
          ]);
          return {
            stem: '某人先向东走了 ' + d1 + ' m，再向北走了 ' + d2 + ' m，求此人的位移大小。',
            options: shuffled,
            correct: shuffled.indexOf(String(disp) + ' m'),
            explanation: '位移是从起点指向终点的有向线段。由勾股定理，位移大小 = √(' + d1 + '² + ' + d2 + '²) = √(' + (d1 * d1) + ' + ' + (d2 * d2) + ') = √' + (d1 * d1 + d2 * d2) + ' = ' + disp + ' m。路程 = ' + dist + ' m。位移 ≤ 路程。',
            difficulty: 2
          };
        }
      },
      {
        id: 'g1_time_disp_02',
        gen: function() {
          var d1 = App.QuestionTemplates._randInt(20, 60);
          var d2 = App.QuestionTemplates._randInt(5, d1 - 2);
          var disp = d1 - d2;
          var dist = d1 + d2;
          var wrongs = App.QuestionTemplates._makeWrongs(disp, [-2, 2, -5, 5, -10], 1);
          var shuffled = App.QuestionTemplates._shuffle([
            String(disp) + ' m',
            String(dist) + ' m',
            String(wrongs[0]) + ' m',
            String(wrongs[1]) + ' m'
          ]);
          return {
            stem: '某人从 A 点出发向东走了 ' + d1 + ' m 到达 B 点，然后向西走了 ' + d2 + ' m 到达 C 点。求此人从 A 到 C 的位移大小。',
            options: shuffled,
            correct: shuffled.indexOf(String(disp) + ' m'),
            explanation: '位移为起点 A 到终点 C 的直线距离。A→B 向东 ' + d1 + ' m，B→C 向西 ' + d2 + ' m，所以位移 = ' + d1 + ' - ' + d2 + ' = ' + disp + ' m（向东）。路程 = ' + d1 + ' + ' + d2 + ' = ' + dist + ' m。位移是矢量，路程是标量。',
            difficulty: 2
          };
        }
      },
      {
        id: 'g1_time_disp_03',
        gen: function() {
          var d = App.QuestionTemplates._randInt(20, 100);
          var t = App.QuestionTemplates._randInt(4, 20);
          var v = App.QuestionTemplates._roundTo(d / t, 1);
          var wrongs = App.QuestionTemplates._makeWrongs(v, [-0.5, 0.5, -1, 1, -2, 2], 1);
          var shuffled = App.QuestionTemplates._shuffle([
            String(v) + ' m/s',
            String(wrongs[0]) + ' m/s',
            String(wrongs[1]) + ' m/s',
            String(wrongs[2]) + ' m/s'
          ]);
          return {
            stem: '一物体从 A 点运动到 B 点，位移大小为 ' + d + ' m，所用时间为 ' + t + ' s，求物体的平均速度大小。',
            options: shuffled,
            correct: shuffled.indexOf(String(v) + ' m/s'),
            explanation: '平均速度 = 位移 / 时间 = ' + d + ' / ' + t + ' = ' + v + ' m/s。注意平均速度用位移计算，平均速率用路程计算。',
            difficulty: 2
          };
        }
      },
      {
        id: 'g1_time_disp_04',
        gen: function() {
          var r = App.QuestionTemplates._randInt(5, 20);
          var dist = App.QuestionTemplates._roundTo(3.14 * r, 1);
          var disp = 2 * r;
          var dispWrongs = App.QuestionTemplates._makeWrongs(disp, [-1, 1, -2, 2, -3], 1);
          var shuffled = App.QuestionTemplates._shuffle([
            String(disp) + ' m',
            String(dist) + ' m',
            String(dispWrongs[0]) + ' m',
            String(dispWrongs[1]) + ' m'
          ]);
          return {
            stem: '一个物体沿着半径为 ' + r + ' m 的圆形轨道运动了半圈，求物体的位移大小。（取 π ≈ 3.14）',
            options: shuffled,
            correct: shuffled.indexOf(String(disp) + ' m'),
            explanation: '沿圆形轨道运动半圈，起点到终点的直线距离为直径。位移 = 2r = 2 × ' + r + ' = ' + disp + ' m。路程为半圆周长 πr = 3.14 × ' + r + ' = ' + dist + ' m。位移远小于路程。',
            difficulty: 3
          };
        }
      }
    ]
  },

  // ---- 辅助：随机选择数组元素 ----
  _pick: function(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
};

// ================================================================
// generate 静态方法：从指定知识点随机生成 count 道题目
// ================================================================
App.QuestionTemplates.generate = function(nodeId, count) {
  if (!this[nodeId]) return [];
  var pool = this[nodeId].templates;
  var result = [];
  var used = {};
  var attempts = 0;
  while (result.length < count && Object.keys(used).length < pool.length && attempts < 100) {
    var idx = Math.floor(Math.random() * pool.length);
    if (!used[idx]) {
      used[idx] = true;
      result.push(pool[idx].gen());
    }
    attempts++;
  }
  return result;
};