// ===== 补充中等难度题（高一月考水平）=====
// 为12个高中知识点补充2-4道计算/应用题
(function() {
  var boost = {
    // 质点·参考系 - 增加坐标系定量题
    g1_particle_reference: [
      { stem: '一个小球从坐标原点出发，先向东运动5m，再向北运动5m，最后向西运动3m。以向东为x轴正方向、向北为y轴正方向建立坐标系，小球最终位置的坐标为？', options: ['(5,5)', '(2,5)', '(5,2)', '(8,5)'], correct: 1, explanation: '东(+x)=5m，北(+y)=5m，西(-x)=3m。x=5-3=2, y=5。位置(2,5)。', difficulty: 3 },
      { stem: '以下情况中，研究对象可以被看作质点的是？', options: ['研究体操运动员在空中的翻转动作', '研究地球绕太阳公转一周所用的时间', '研究一列火车通过南京长江大桥所用的时间（火车长度300m，桥长1577m）', '研究乒乓球弧圈球的旋转'], correct: 1, explanation: '地球直径远小于公转轨道，形状可忽略。火车长度与桥长可比，不能忽略。', difficulty: 2 }
    ],
    // 时间·位移 - 增加矢量运算
    g1_time_displacement: [
      { stem: '物体从A点出发沿半径为R的圆周顺时针运动3/4圈到达B点，位移大小为？', options: ['2πR', '√2R', '2R', 'πR/2'], correct: 1, explanation: '圆心角270°，弦长为√(R²+R²)=√2R。位移是起点到终点的直线距离。', difficulty: 3 },
      { stem: '某质点沿直线运动，s-t图像为一条倾斜直线，该质点做的是？', options: ['匀速直线运动', '匀加速直线运动', '变加速运动', '静止'], correct: 0, explanation: 's-t图为直线→斜率恒定→速度恒定→匀速直线运动。', difficulty: 2 }
    ],
    // 速度·加速度 - 核心难点
    g1_velocity_accel: [
      { stem: '一辆汽车以20m/s的速度匀速行驶，发现前方障碍后紧急刹车，加速度大小为5m/s²。从刹车到停止的位移为？', options: ['20m', '30m', '40m', '80m'], correct: 2, explanation: 'v²=v₀²+2ax→0=400+2×(-5)x→x=40m。注意：8s才停下，但公式中用v²关系最简。', difficulty: 3 },
      { stem: '一个物体做匀变速直线运动，第3s内位移为5m，第5s内位移为3m。物体的加速度为？', options: ['1 m/s²', '-1 m/s²', '2 m/s²', '-2 m/s²'], correct: 1, explanation: 'Δx=aT²→(3-5)=a×2²→a=-1m/s²。相邻相等时间间隔位移差=at²。', difficulty: 4 },
      { stem: '以下关于加速度的说法中正确的是？', options: ['加速度增大，速度一定增大', '速度变化量越大，加速度越大', '加速度方向保持不变，速度方向也一定不变', '加速度大小与速度大小无关'], correct: 3, explanation: '加速度由合力决定，与速度大小无关。如刹车时速度很大但加速度为负。', difficulty: 2 }
    ],
    // 匀变速直线运动 - 多过程问题
    g1_linear_motion: [
      { stem: '一辆汽车由静止开始以2m/s²的加速度匀加速行驶10s，然后以10s末的速度匀速行驶20s，接着以-4m/s²的加速度刹车直到停下。汽车行驶的总位移为？', options: ['500m', '600m', '700m', '800m'], correct: 1, explanation: '加速段x₁=½×2×100=100m, v₁=20m/s。匀速段x₂=20×20=400m。刹车段x₃=v₁²/(2×4)=400/8=50m。总=100+400+50+50(还需t=v₁/4=5s)=600m。', difficulty: 4 },
      { stem: '做匀加速运动的列车出站时，车头经过某点O时速度为1m/s，车尾经过O时速度为7m/s，列车中点经过O时的速度为？', options: ['4 m/s', '5 m/s', '√(1+49)/2=5 m/s', '√(1²+7²)/√2=√25=5 m/s'], correct: 3, explanation: '匀变速运动中点速度v_mid=√[(v₁²+v₂²)/2]=√(50/2)=5m/s。', difficulty: 4 },
      { stem: '物体做初速度为零的匀加速直线运动，第1s内、第2s内、第3s内的位移之比为？', options: ['1:2:3', '1:3:5', '1:4:9', '1:1:1'], correct: 1, explanation: '初速为0的匀加速，连续相等时间间隔位移比=1:3:5:7...', difficulty: 2 }
    ],
    // 自由落体 - 多体问题
    g1_free_fall: [
      { stem: '从某一高度相隔1s先后释放两个相同的小球，不计空气阻力。在空中运动过程中，两球之间的距离会？', options: ['保持不变', '不断增大', '不断减小', '先增大后减小'], correct: 1, explanation: '两球均做自由落体。先释放的始终速度更大，距离Δh=½g(t+1)²-½gt²=½g(2t+1)，随时间增大。', difficulty: 3 },
      { stem: '从离地500m的高空自由落下一个小球(g=10m/s²)。落到地面的时间约为？', options: ['5s', '10s', '15s', '20s'], correct: 1, explanation: 'h=½gt²→500=5t²→t=10s。', difficulty: 2 }
    ],
    // 重力与弹力 - 弹簧类问题
    g1_gravity_elasticity: [
      { stem: '一根轻质弹簧，在100N的拉力作用下长度为0.55m，在300N的拉力作用下长度为0.65m。弹簧的原长为？', options: ['0.40m', '0.45m', '0.50m', '0.35m'], correct: 2, explanation: 'F=kΔL。设原长L₀，k(0.55-L₀)=100, k(0.65-L₀)=300。两式相除：3(0.55-L₀)=0.65-L₀→L₀=0.50m。', difficulty: 4 },
      { stem: '关于物体重心的说法中，正确的是？', options: ['重心一定在物体上', '形状规则的物体重心在几何中心', '重心是物体各部分所受重力的等效作用点', '物体升高时重心在物体上的位置会升高'], correct: 2, explanation: '重心是等效作用点，不一定在物体上（如圆环重心在圆心）。', difficulty: 2 }
    ],
    // 摩擦力 - 斜面问题
    g1_friction: [
      { stem: '一个物体放在倾角为30°的斜面上恰好匀速下滑，物体与斜面间的动摩擦因数为？', options: ['0.5', '√3/3≈0.577', '√3/2≈0.866', '1.0'], correct: 1, explanation: '匀速→mgsinθ=μmgcosθ→μ=tanθ=tan30°=√3/3≈0.577。匀速是平衡条件。', difficulty: 4 },
      { stem: '用水平力F将物体压在竖直墙上静止。增大F，物体受到的摩擦力将？', options: ['增大', '减小', '不变', '先增大后不变'], correct: 2, explanation: '竖直方向二力平衡：摩擦力=重力。F只增大正压力，不改变摩擦力。', difficulty: 3 }
    ],
    // 力的合成与分解 - 角度计算
    g1_force_synthesis: [
      { stem: '两个共点力F₁=3N、F₂=4N，夹角为60°，合力大小为？', options: ['5N', '6N', '√37≈6.08N', '7N'], correct: 2, explanation: '余弦定理：F=√(F₁²+F₂²+2F₁F₂cos60°)=√(9+16+12)=√37≈6.08N。', difficulty: 3 },
      { stem: '用两根轻绳将一盏灯悬挂在天花板下，两绳与竖直方向夹角均为30°，灯重10N。每根绳的拉力大小为？', options: ['5N', '5.77N', '10N', '11.5N'], correct: 1, explanation: '2Tcos30°=mg→T=10/(2×0.866)=5.77N。竖直方向平衡。', difficulty: 3 },
      { stem: '将一个8N的力分解为两个分力，其中一个分力为5N，另一个分力不可能是？', options: ['3N', '5N', '10N', '14N'], correct: 3, explanation: '分力范围：|8-5|≤F≤8+5→3N≤F≤13N。14N超出范围。', difficulty: 2 }
    ],
    // 牛顿第一定律 - 概念深化
    g1_newton_first: [
      { stem: '在匀速行驶的火车车厢内的光滑桌面上放一个小球。火车突然加速时，相对于地面小球将？', options: ['向前运动', '向后运动', '保持原来的匀速运动', '随火车一起加速'], correct: 2, explanation: '桌面光滑无摩擦，小球在水平方向不受力，由于惯性保持原来的匀速运动状态。', difficulty: 3 },
      { stem: '关于惯性的理解，正确的是？', options: ['物体只有静止或匀速运动时才有惯性', '物体的惯性与其速度有关，速度大惯性大', '惯性是物体抵抗运动状态变化的本领，只与质量有关', '失重状态下物体没有惯性'], correct: 2, explanation: '惯性只取决于质量，与运动状态、所处位置无关。', difficulty: 2 }
    ],
    // 牛顿第三定律 - 区分平衡力
    g1_newton_third: [
      { stem: '人站在体重计上，关于人受到的重力和体重计对人的支持力，以下说法正确的是？', options: ['它们是作用力与反作用力', '它们是一对平衡力', '重力大于支持力', '支持力大于重力'], correct: 1, explanation: '重力和支持力都作用在人身上，等大反向→平衡力。作用力/反作用力作用在不同物体上。', difficulty: 3 }
    ],
    // 牛顿第二定律 - F=ma应用
    g1_newton_second: [
      { stem: '质量为2kg的物体静止在光滑水平面上，受到一个方向不变、大小随时间变化的水平力F=4+2t(N)的作用。t=3s时物体的加速度为？', options: ['2 m/s²', '3 m/s²', '5 m/s²', '10 m/s²'], correct: 2, explanation: 't=3s时F=4+2×3=10N。a=F/m=10/2=5m/s²。', difficulty: 3 },
      { stem: '一个质量为m的人站在升降机中的体重计上，升降机以g/3的加速度匀加速上升，体重计的示数为？', options: ['mg', '2mg/3', '4mg/3', 'mg/3'], correct: 2, explanation: 'N-mg=ma→N=mg+mg/3=4mg/3。加速上升→超重。', difficulty: 3 }
    ],
    // 牛顿定律应用 - 连接体
    g1_newton_application: [
      { stem: '两个物体A(2kg)和B(3kg)用轻绳连接，放在光滑水平面上。用10N的水平力拉A，绳上的拉力为？', options: ['4N', '6N', '10N', '5N'], correct: 1, explanation: '整体加速度a=10/(2+3)=2m/s²。隔离B：T=m_B·a=3×2=6N。绳上拉力小于外力。', difficulty: 4 },
      { stem: '如图所示，物体A放在物体B上，B放在光滑水平面上。已知m_A=2kg, m_B=3kg，A、B间动摩擦因数μ=0.3。用水平力F拉B，要使A、B不发生相对滑动，F的最大值为？(g=10m/s²)', options: ['6N', '15N', '10N', '25N'], correct: 1, explanation: 'A的最大加速度a_max=μg=3m/s²。整体F_max=(m_A+m_B)a_max=5×3=15N。', difficulty: 5 }
    ]
  };

  // 注入知识点
  var ids = Object.keys(boost);
  var total = 0;
  for (var i = 0; i < ids.length; i++) {
    var node = App.knowledgeGraph[ids[i]];
    if (!node) continue;
    // 加入练习题库
    var qs = boost[ids[i]];
    for (var j = 0; j < qs.length; j++) {
      node.practiceQuestions.push(qs[j]);
    }
    total += qs.length;
  }
  console.log('📈 补充中等难度题: ' + total + ' 道 (覆盖' + ids.length + '个知识点)');
})();
