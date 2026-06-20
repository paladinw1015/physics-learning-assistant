// ===== 知识点图谱与题库 =====
// 17个节点: 5个初中前置 + 12个高中必修一
// 每个节点含诊断题(3-4道)和练习题(6-10道)

window.App = window.App || {};

// ===== 默认初始化（被 localStorage 覆盖）=====
App.userProgress = App.userProgress || {
  xp: 0, level: 1, coins: 0, totalCoinsEarned: 0,
  streak: { current: 0, best: 0, lastDate: null },
  knowledgeProgress: {},
  badges: [],
  rewardShop: { items: [] },
  parentPin: '0000',
  _diagnosisCount: 0, _practiceCount: 0,
  _hasPerfectDiag: false, _hasSpeedAnswer: false,
  _hasSpeedImprove: false, _hasComeback: false,
  _lastDailyClaim: ''
};
App.diagnosisState = App.diagnosisState || { currentNodeId: null, chain: [], currentQuestionIndex: 0, questions: [], answers: [], startTime: 0, questionStartTime: 0, questionTimes: [], totalXpEarned: 0, totalCoinsEarned: 0, perfectSoFar: true, fastAnswers: 0 };
App.practiceState = App.practiceState || { currentNodeId: null, currentQuestionIndex: 0, questions: [], answers: [], startTime: 0, questionStartTime: 0, questionTimes: [], streakCount: 0, totalCorrect: 0, totalXpEarned: 0, totalCoinsEarned: 0, fastAnswers: 0, allCorrectSoFar: true };
App._lastReport = null;
App._lastPracticeResult = null;
App.currentScreen = 'dashboard';

// ===== 知识点图谱与题库 =====
// 17个节点: 5个初中前置 + 12个高中必修一
// 每个节点含诊断题(3-4道)和练习题(6-10道)

App.knowledgeGraph = {};
App.chapterOrder = ['初中前置', '必修一·运动的描述', '必修一·匀变速直线运动', '必修一·相互作用', '必修一·牛顿运动定律'];

// ============ 初中前置知识点 ============

// --- c8_reference_frame: 参照物与机械运动 ---
App.knowledgeGraph['c8_reference_frame'] = {
  id: 'c8_reference_frame',
  name: '参照物与机械运动',
  chapter: '初中前置',
  grade: '八年级',
  difficulty: 2,
  prerequisites: [],
  description: '判断物体是否运动、如何选择参照物、理解运动和静止的相对性',
  position: { x: 300, y: 420 },
  diagnosticQuestions: [
    {
      stem: '坐在行驶的火车上，看到窗外的树木向后运动。此时选择的参照物是？',
      options: ['地面', '火车', '树木', '铁轨'],
      correct: 1,
      explanation: '树木相对于火车向后运动，所以参照物是火车。参照物是假定不动的物体。',
      testsPrerequisite: null
    },
    {
      stem: '"小小竹排江中游，巍巍青山两岸走。"后半句"青山走"选的参照物是？',
      options: ['江岸', '竹排', '江水', '地面'],
      correct: 1,
      explanation: '青山相对于竹排是运动的，所以选竹排为参照物。同一物体选不同参照物，运动状态可能不同。',
      testsPrerequisite: null
    },
    {
      stem: '两辆并排停在路边的汽车，其中一辆缓缓开动。另一辆车上的人觉得自己在后退，这是因为？',
      options: ['他选的参照物是地面', '他选的参照物是开动的车', '他选的参照物是路边的树', '他产生了幻觉'],
      correct: 1,
      explanation: '以开动的车为参照物，静止的车相对于它在后退。这是运动和静止相对性的体现。',
      testsPrerequisite: null
    }
  ],
  practiceQuestions: [
    { stem: '以下哪种情况研究对象可以视为静止的？', options: ['以地面为参照物，飞行中的飞机', '以太阳为参照物，地面上的房子', '以车厢为参照物，坐在座位上的人', '以站台为参照物，启动的火车'], correct: 2, explanation: '以车厢为参照物，坐着的人位置不变，是静止的。', difficulty: 2 },
    { stem: '坐在逆水行驶的船中，人说自己是静止的，选的参照物是？', options: ['河岸', '河水', '船舱', '迎面来的船'], correct: 2, explanation: '以船舱为参照物，人的位置不变。', difficulty: 2 },
    { stem: '关于参照物，以下说法正确的是？', options: ['只能选静止的物体', '只能选地面', '任何物体都可以', '只能选运动的物体'], correct: 2, explanation: '参照物可以任意选择，通常选地面是为了方便。', difficulty: 2 },
    { stem: '空中加油时，加油机和受油机保持相对____。', options: ['静止', '运动', '加速', '无法判断'], correct: 0, explanation: '空中加油时两机要保持相对静止，即速度大小和方向都相同。', difficulty: 3 },
    { stem: '下列现象中属于机械运动的是？', options: ['铁生锈', '植物生长', '流星划过夜空', '水结冰'], correct: 2, explanation: '机械运动是物体位置随时间的变化。流星位置改变是机械运动。', difficulty: 2 },
    { stem: '无风时，看到雨滴竖直下落。有风时，地面上的人看到雨滴斜向下落，这是因为？', options: ['雨滴下落方向变了', '人选的参照物变了', '参照物始终是地面', '这是错觉'], correct: 2, explanation: '有风时雨滴水平方向也有运动，以地面为参照物合速度是斜向下的。', difficulty: 3 }
  ]
};

// --- c8_speed_concept: 速度的概念与计算 ---
App.knowledgeGraph['c8_speed_concept'] = {
  id: 'c8_speed_concept',
  name: '速度的概念与计算',
  chapter: '初中前置',
  grade: '八年级',
  difficulty: 3,
  prerequisites: ['c8_reference_frame'],
  description: '理解速度的物理意义、掌握v=s/t公式及其变形、区分匀速和变速运动',
  position: { x: 180, y: 340 },
  diagnosticQuestions: [
    {
      stem: '某同学跑100米用了14秒，他的平均速度最接近？',
      options: ['5 m/s', '7 m/s', '10 m/s', '14 m/s'],
      correct: 1,
      explanation: 'v=s/t=100/14≈7.14m/s。平均速度是总路程除以总时间，不反映某个瞬间的快慢。',
      testsPrerequisite: null
    },
    {
      stem: '关于速度公式v=s/t，下列说法正确的是？',
      options: ['速度与路程成正比', '速度与时间成反比', '速度由路程和时间共同决定', '速度是描述物体运动快慢的物理量，与s和t的比值有关'],
      correct: 3,
      explanation: '速度是表示运动快慢的物理量。对于给定的运动，v=s/t是计算式而非决定式。',
      testsPrerequisite: null
    },
    {
      stem: '汽车在平直公路上行驶，前一半路程速度为40km/h，后一半路程速度为60km/h，全程平均速度约为？',
      options: ['48 km/h', '50 km/h', '52 km/h', '45 km/h'],
      correct: 0,
      explanation: '设总路程为2s。t1=s/40, t2=s/60。平均速度=2s/(t1+t2)=2s/(s/40+s/60)=2/(1/40+1/60)=48km/h。注意：平均速度≠速度的平均值！',
      testsPrerequisite: null
    }
  ],
  practiceQuestions: [
    { stem: '一辆自行车以5m/s的速度匀速行驶，10秒内通过的路程是多少？', options: ['10m', '25m', '50m', '100m'], correct: 2, explanation: 's=vt=5×10=50m。', difficulty: 2 },
    { stem: '某人跑800米用时200秒，平均速度为？', options: ['2 m/s', '4 m/s', '6 m/s', '8 m/s'], correct: 1, explanation: 'v=s/t=800/200=4m/s。', difficulty: 2 },
    { stem: '速度是表示物体____的物理量。', options: ['位置变化', '运动快慢', '路程长短', '时间长短'], correct: 1, explanation: '速度是描述运动快慢的物理量。', difficulty: 2 },
    { stem: '下列速度最大的是？', options: ['5 m/s', '18 km/h', '300 m/min', '0.1 km/s'], correct: 3, explanation: '统一单位：5m/s=18km/h=300m/min；0.1km/s=100m/s，最大。学会单位换算很重要。', difficulty: 2 },
    { stem: '一辆汽车在前半段路程以60km/h行驶，后半段以30km/h行驶，全程平均速度？', options: ['45 km/h', '40 km/h', '50 km/h', '35 km/h'], correct: 1, explanation: '设半程为s，t1=s/60, t2=s/30, v=2s/(s/60+s/30)=2s/(s/20)=40km/h', difficulty: 3 },
    { stem: '做匀速直线运动的物体，关于v=s/t，正确的说法是？', options: ['路程越长速度越大', '时间越短速度越大', '速度大小与路程时间无关', '速度随路程增大而增大'], correct: 2, explanation: '匀速直线运动中速度是恒定的，不随路程或时间改变。公式v=s/t是比值定义。', difficulty: 3 }
  ]
};

// --- c8_force_concept: 力的概念与三要素 ---
App.knowledgeGraph['c8_force_concept'] = {
  id: 'c8_force_concept',
  name: '力的概念与三要素',
  chapter: '初中前置',
  grade: '八年级',
  difficulty: 3,
  prerequisites: [],
  description: '理解力是物体对物体的作用、力的三要素（大小/方向/作用点）、力的作用是相互的、力的示意图',
  position: { x: 420, y: 300 },
  diagnosticQuestions: [
    {
      stem: '关于力的概念，下列说法错误的是？',
      options: ['力不能脱离物体而存在', '一个物体也能产生力', '力是物体对物体的作用', '施力物体同时也是受力物体'],
      correct: 1,
      explanation: '力是物体间的相互作用，一个物体不能产生力。必须有两个物体。力的作用是相互的。',
      testsPrerequisite: null
    },
    {
      stem: '用绳子系着水桶，手提着绳子把水桶从井里提上来。水桶受到的拉力，施力物体是？',
      options: ['手', '绳子', '水桶', '地球'],
      correct: 1,
      explanation: '水桶受到的拉力是绳子施加的。手→绳子→水桶，力需要接触传递（这里弹力通过绳子传递）。',
      testsPrerequisite: null
    },
    {
      stem: '力的作用效果不包括以下哪项？',
      options: ['改变物体的形状', '改变物体的运动状态', '改变物体的质量', '使物体由静止变为运动'],
      correct: 2,
      explanation: '力的作用效果：①改变形状（形变）②改变运动状态（速度大小或方向改变）。力不能改变质量。',
      testsPrerequisite: null
    }
  ],
  practiceQuestions: [
    { stem: '力的三要素是？', options: ['大小、方向、作用点', '大小、速度、方向', '质量、方向、作用点', '大小、方向、速度'], correct: 0, explanation: '力的三要素：大小、方向、作用点。它们共同影响力的作用效果。', difficulty: 2 },
    { stem: '划船时，桨向后划水，船向前进。使船前进的力的施力物体是？', options: ['桨', '人', '水', '船'], correct: 2, explanation: '桨向后推水，水向前推桨，水是施力物体。体现了力的相互性。', difficulty: 2 },
    { stem: '以下现象中，力使物体发生形变的是？', options: ['足球被踢飞', '弹簧被拉长', '汽车刹车停下', '苹果从树上落下'], correct: 1, explanation: '弹簧被拉长是形状改变，属于形变。其他选项是运动状态改变。', difficulty: 2 },
    { stem: '甲乙两队拔河，甲队胜。以下说法正确的是？', options: ['甲队拉乙队的力大于乙队拉甲队的力', '甲队受地面摩擦力大于乙队', '甲队力气大所以拉力大', '乙队没有用力'], correct: 1, explanation: '相互作用力始终大小相等。甲队胜是因为地面给甲队的摩擦力更大。', difficulty: 3 },
    { stem: '一块磁铁吸引铁钉时，磁铁吸引铁钉的力____铁钉吸引磁铁的力。', options: ['大于', '小于', '等于', '无法确定'], correct: 2, explanation: '力的作用是相互的，磁铁吸引铁钉的力等于铁钉吸引磁铁的力。', difficulty: 2 },
    { stem: '画出木块受到地面的支持力，作用点应在？', options: ['木块的几何中心', '地面', '木块与地面的接触面上', '任意位置'], correct: 2, explanation: '支持力（弹力）作用在接触面上。画示意图时通常将作用点移到物体重心上。', difficulty: 3 }
  ]
};

// --- c8_friction_basic: 摩擦力基础 ---
App.knowledgeGraph['c8_friction_basic'] = {
  id: 'c8_friction_basic',
  name: '摩擦力基础',
  chapter: '初中前置',
  grade: '八年级',
  difficulty: 4,
  prerequisites: ['c8_force_concept'],
  description: '理解摩擦力的产生条件、方向判断、影响滑动摩擦力大小的因素',
  position: { x: 540, y: 360 },
  diagnosticQuestions: [
    {
      stem: '关于摩擦力，以下说法正确的是？',
      options: ['摩擦力总是阻碍物体运动', '摩擦力方向总是与运动方向相反', '摩擦力方向与相对运动方向相反', '静止的物体不受摩擦力'],
      correct: 2,
      explanation: '摩擦力方向与相对运动（趋势）方向相反，不一定与运动方向相反。例如人走路时摩擦力是动力，与人前进方向相同。',
      testsPrerequisite: null
    },
    {
      stem: '用手握住瓶子，瓶子静止。增大握力时，瓶子受到的摩擦力会？',
      options: ['增大', '减小', '不变', '先增大后减小'],
      correct: 2,
      explanation: '瓶子静止，竖直方向受力平衡，摩擦力=重力。增大握力只增大最大静摩擦力，不改变实际摩擦力。',
      testsPrerequisite: null
    },
    {
      stem: '探究"滑动摩擦力与压力关系"的实验中，需要控制不变的变量是？',
      options: ['压力大小', '接触面粗糙程度', '拉力大小', '物体运动速度'],
      correct: 1,
      explanation: '控制变量法：研究摩擦力与压力的关系时，保持接触面粗糙程度不变，只改变压力。',
      testsPrerequisite: null
    }
  ],
  practiceQuestions: [
    { stem: '人走路时，鞋底与地面之间的摩擦力方向是？', options: ['与人前进方向相反', '与人前进方向相同', '垂直于地面', '没有摩擦力'], correct: 1, explanation: '走路时脚向后蹬地，地面给脚向前的摩擦力，摩擦力是前进的动力。', difficulty: 2 },
    { stem: '以下减小摩擦力的方法是？', options: ['轮胎上的花纹', '体操运动员手上涂镁粉', '给轴承加润滑油', '鞋底刻出凹凸条纹'], correct: 2, explanation: '润滑油在接触面间形成油膜，减小了接触面粗糙程度，减小摩擦。', difficulty: 2 },
    { stem: '滑动摩擦力大小与下列哪个因素无关？', options: ['压力大小', '接触面粗糙程度', '接触面积大小', '材料性质'], correct: 2, explanation: '滑动摩擦力与接触面积大小无关（初中阶段）。只与压力和粗糙程度有关。', difficulty: 3 },
    { stem: '重100N的木箱放在水平地面上，用20N的水平力推，木箱静止。木箱受到的摩擦力大小为？', options: ['0 N', '20 N', '100 N', '120 N'], correct: 1, explanation: '静止→二力平衡→摩擦力=推力=20N。静摩擦力会根据外力自动调整。', difficulty: 3 },
    { stem: '推箱子推不动，是因为？', options: ['推力小于摩擦力', '推力等于摩擦力', '推力小于重力', '摩擦力太大无法克服'], correct: 1, explanation: '推不动说明静止，二力平衡，推力=静摩擦力。推力不够大，摩擦力还能"匹配"。', difficulty: 2 }
  ]
};

// --- c9_newton_first_intro: 牛顿第一定律（惯性）初步 ---
App.knowledgeGraph['c9_newton_first_intro'] = {
  id: 'c9_newton_first_intro',
  name: '牛顿第一定律初步',
  chapter: '初中前置',
  grade: '九年级',
  difficulty: 3,
  prerequisites: ['c8_force_concept'],
  description: '理解牛顿第一定律（惯性定律）的内容、理解惯性是物体的固有属性',
  position: { x: 500, y: 240 },
  diagnosticQuestions: [
    {
      stem: '关于惯性，以下说法正确的是？',
      options: ['只有运动的物体才有惯性', '速度越大惯性越大', '惯性是物体保持原来运动状态的性质', '静止的物体没有惯性'],
      correct: 2,
      explanation: '一切物体在任何情况下都有惯性。惯性大小只与质量有关，与速度无关。',
      testsPrerequisite: null
    },
    {
      stem: '汽车急刹车时，乘客身体会向前倾。这是因为？',
      options: ['乘客受到向前的力', '乘客的脚受到摩擦力', '乘客上身由于惯性保持原来的运动状态', '汽车给了乘客向前的力'],
      correct: 2,
      explanation: '刹车时脚随车减速，上身由于惯性仍保持原来向前的速度，所以向前倾。',
      testsPrerequisite: null
    },
    {
      stem: '关于牛顿第一定律，正确的理解是？',
      options: ['可以通过实验直接验证', '是在实验基础上推理得出的', '只适用于静止物体', '与惯性无关'],
      correct: 1,
      explanation: '牛顿第一定律（惯性定律）不能直接用实验验证（因为无法创造完全不受力的环境），是在实验+推理基础上得出的。',
      testsPrerequisite: null
    }
  ],
  practiceQuestions: [
    { stem: '运动员跑到终点后不能立即停下，是因为？', options: ['受到惯性的作用', '运动员具有惯性', '受到向前的力', '跑道太滑'], correct: 1, explanation: '运动员具有惯性，要保持原来向前运动的状态。注意：不能说"受到惯性"。', difficulty: 2 },
    { stem: '关于惯性的大小，正确的是？', options: ['速度越大惯性越大', '质量越大惯性越大', '受力越大惯性越大', '加速度越大惯性越大'], correct: 1, explanation: '惯性大小只取决于质量。质量是惯性大小的量度。', difficulty: 3 },
    { stem: '以下利用惯性的例子是？', options: ['系安全带', '跳远前助跑', '汽车减速慢行', '保持车距'], correct: 1, explanation: '助跑使人在起跳前获得较大的速度，起跳后由于惯性向前运动更远。', difficulty: 2 },
    { stem: '地球自转，人跳起来后落在原地，说明？', options: ['人没有惯性', '人具有惯性', '重力在起作用', '地球转得慢'], correct: 1, explanation: '人跳起时与地球表面有相同的水平速度，由于惯性，水平方向保持原来速度，所以落回原地。', difficulty: 3 }
  ]
};

// ============ 高中必修一知识点 ============

// --- g1_particle_reference: 质点·参考系 ---
App.knowledgeGraph['g1_particle_reference'] = {
  id: 'g1_particle_reference',
  name: '质点·参考系',
  chapter: '必修一·运动的描述',
  grade: '高一',
  difficulty: 3,
  prerequisites: ['c8_reference_frame'],
  description: '理解质点模型（理想化模型）、掌握物体可视为质点的条件、深化参考系概念、理解坐标系',
  position: { x: 320, y: 260 },
  diagnosticQuestions: [
    {
      stem: '下列哪种情况可以把物体看作质点？',
      options: ['研究地球自转', '研究火车过桥的时间（火车长度与桥长相当）', '研究地球绕太阳公转的轨道', '研究乒乓球运动员的发球旋转'],
      correct: 2,
      explanation: '地球直径远小于公转轨道半径，形状大小可忽略。可视为质点的条件：物体的大小和形状对所研究问题影响可忽略。',
      testsPrerequisite: null
    },
    {
      stem: '两辆汽车在平直公路上并排行驶。以甲车为参考系，乙车是____的。',
      options: ['一定运动', '一定静止', '可能静止', '无法判断'],
      correct: 2,
      explanation: '两车并排行驶，如果速度相同则相对静止；速度不同则相对运动。需要看速度。这考察了参考系的核心思想。',
      testsPrerequisite: 'c8_reference_frame'
    },
    {
      stem: '关于参考系，下列说法正确的是？',
      options: ['参考系必须选地面', '参考系必须选静止的物体', '参考系的选择是任意的，但选择不同观察结果可能不同', '参考系只能选一个'],
      correct: 2,
      explanation: '参考系可以任意选择（高中阶段选惯性系即可），不同的参考系下运动描述可能不同。',
      testsPrerequisite: 'c8_reference_frame'
    }
  ],
  practiceQuestions: [
    { stem: '质点是一种？', options: ['实际存在的物体', '理想化物理模型', '很小的物体', '密度均匀的物体'], correct: 1, explanation: '质点是理想化模型，是物理学中常用的科学方法。类似还有刚体、点电荷等。', difficulty: 2 },
    { stem: '研究下列运动时，物体能看成质点的是？', options: ['研究跳水运动员的翻腾动作', '研究马拉松运动员的跑步时间', '研究乒乓球旋转', '研究体操运动员的空中姿态'], correct: 1, explanation: '马拉松路程远大于人体大小，形状可不计。关键看"研究什么问题"。', difficulty: 2 },
    { stem: '高铁上看到窗外景物快速后退，选的参照物是？', options: ['地面', '铁轨', '高铁', '路边树木'], correct: 2, explanation: '以高铁为参照物，窗外景物相对高铁向后运动。', difficulty: 2 },
    { stem: '以下说法正确的是？', options: ['体积小的物体一定能看成质点', '体积大的物体一定不能看成质点', '质点没有质量', '能否看成质点取决于研究问题'], correct: 3, explanation: '能否看成质点不取决于体积大小，而取决于体积和形状对研究问题的影响是否可以忽略。', difficulty: 3 }
  ]
};

// --- g1_time_displacement: 时间·位移 ---
App.knowledgeGraph['g1_time_displacement'] = {
  id: 'g1_time_displacement',
  name: '时间·位移',
  chapter: '必修一·运动的描述',
  grade: '高一',
  difficulty: 3,
  prerequisites: ['c8_speed_concept'],
  description: '区分时刻与时间间隔、区分位移与路程、理解矢量和标量的区别、掌握位移-时间图像',
  position: { x: 200, y: 200 },
  diagnosticQuestions: [
    {
      stem: '关于位移和路程，以下说法正确的是？',
      options: ['位移大小一定等于路程', '位移是矢量，路程是标量', '路程总是大于位移', '位移方向就是运动方向'],
      correct: 1,
      explanation: '位移是矢量（有大小有方向），路程是标量（只有大小）。单向直线运动中位移大小=路程。',
      testsPrerequisite: null
    },
    {
      stem: '一个物体从A点出发，向东走3m到B，再向北走4m到C。物体的位移大小为？',
      options: ['7m', '5m', '1m', '12m'],
      correct: 1,
      explanation: '位移是起点到终点的有向线段：√(3²+4²)=5m，方向东偏北53°。路程=3+4=7m。位移≠路程。',
      testsPrerequisite: null
    },
    {
      stem: '以下属于矢量的是？',
      options: ['时间', '质量', '位移', '路程'],
      correct: 2,
      explanation: '矢量有大小和方向（位移、速度、力等）；标量只有大小（时间、质量、路程等）。',
      testsPrerequisite: null
    }
  ],
  practiceQuestions: [
    { stem: '"3秒内"指的是？', options: ['时刻', '时间间隔', '第3秒', '3秒末'], correct: 1, explanation: '"3秒内"指从0到3秒末这一段时间间隔。时刻是一个点，时间间隔是一段。', difficulty: 2 },
    { stem: '运动员绕400m跑道跑一圈，位移大小为？', options: ['400m', '200m', '0m', '100m'], correct: 2, explanation: '位移=起点到终点的直线距离。跑一圈回到起点，位移为0，但路程为400m。', difficulty: 2 },
    { stem: '在s-t图中，图线的斜率表示？', options: ['加速度', '位移', '速度', '路程'], correct: 2, explanation: 's-t图（位移-时间图像）中，斜率=Δs/Δt=速度。斜率越大速度越大。', difficulty: 3 },
    { stem: '下列说法错误的是？', options: ['位移是矢量', '温度是标量', '速度是标量', '力是矢量'], correct: 2, explanation: '速度有大小和方向，是矢量。速度的大小叫速率，速率是标量。', difficulty: 2 }
  ]
};

// --- g1_velocity_accel: 速度·加速度 ---
App.knowledgeGraph['g1_velocity_accel'] = {
  id: 'g1_velocity_accel',
  name: '速度·加速度',
  chapter: '必修一·运动的描述',
  grade: '高一',
  difficulty: 4,
  prerequisites: ['g1_time_displacement'],
  description: '区分平均速度与瞬时速度、理解加速度的物理意义、v-t图像分析、加速度与速度的关系',
  position: { x: 140, y: 120 },
  diagnosticQuestions: [
    {
      stem: '关于加速度，正确的理解是？',
      options: ['加速度越大，速度越大', '加速度是描述速度变化快慢的物理量', '加速度为正，速度一定增大', '加速度为零，物体一定静止'],
      correct: 1,
      explanation: '加速度=Δv/Δt，描述速度变化的快慢。加速度大不代表速度大（如刚起步时）。加速度与速度同向→加速，反向→减速。',
      testsPrerequisite: null
    },
    {
      stem: '物体做匀加速直线运动，初速度2m/s，加速度1m/s²，5秒末的速度为？',
      options: ['5 m/s', '7 m/s', '10 m/s', '3 m/s'],
      correct: 1,
      explanation: 'v=v₀+at=2+1×5=7m/s。这是匀变速运动的基本公式。',
      testsPrerequisite: null
    },
    {
      stem: '某物体速度从10m/s均匀减小到2m/s，用时4秒。加速度为？',
      options: ['2 m/s²', '-2 m/s²', '3 m/s²', '-3 m/s²'],
      correct: 1,
      explanation: 'a=Δv/Δt=(2-10)/4=-2m/s²。负号表示加速度方向与初速度方向相反（减速）。',
      testsPrerequisite: null
    }
  ],
  practiceQuestions: [
    { stem: '加速度为零的运动是？', options: ['匀速直线运动', '匀加速直线运动', '自由落体', '圆周运动'], correct: 0, explanation: '加速度为零→速度不变→匀速直线运动（或静止）。', difficulty: 2 },
    { stem: '关于速度与加速度的关系，正确的是？', options: ['速度大加速度一定大', '加速度大速度变化一定快', '速度为零加速度一定为零', '加速度减小速度一定减小'], correct: 1, explanation: '加速度就是描述速度变化快慢的，加速度大→速度变化快。速度大小与加速度大小无必然联系。', difficulty: 3 },
    { stem: 'v-t图像中，图线与时间轴围成的面积表示？', options: ['速度', '加速度', '位移', '路程'], correct: 2, explanation: 'v-t图中面积=速度×时间=位移（有正负）。这是v-t图最重要的应用之一。', difficulty: 3 },
    { stem: '物体做加速运动的条件是？', options: ['加速度为正', '速度为正', '加速度与速度同向', '速度在增大'], correct: 2, explanation: '加速度与速度同向→加速（无论正负）；反向→减速。关键看方向关系，不看正负号。', difficulty: 3 },
    { stem: '一物体以5m/s的速度运动，加速度为-2m/s²，2秒后速度为？', options: ['1 m/s', '9 m/s', '3 m/s', '-1 m/s'], correct: 0, explanation: 'v=v₀+at=5+(-2)×2=1m/s。负加速度表示减速（与速度反向）。', difficulty: 2 }
  ]
};

// --- g1_linear_motion: 匀变速直线运动规律 ---
App.knowledgeGraph['g1_linear_motion'] = {
  id: 'g1_linear_motion',
  name: '匀变速直线运动规律',
  chapter: '必修一·匀变速直线运动',
  grade: '高一',
  difficulty: 5,
  prerequisites: ['g1_velocity_accel'],
  description: '掌握匀变速直线运动三大公式、理解v-t图像的物理意义、推导位移公式和速度-位移公式',
  position: { x: 80, y: 40 },
  diagnosticQuestions: [
    {
      stem: '物体做初速度为0的匀加速直线运动，加速度为2m/s²，3秒内的位移为？',
      options: ['6m', '9m', '12m', '18m'],
      correct: 1,
      explanation: 'x=v₀t+½at²=0+½×2×9=9m。注意"3秒内"指t=3s。',
      testsPrerequisite: null
    },
    {
      stem: '汽车以20m/s的速度行驶，急刹车后以5m/s²的加速度减速。刹车距离为？',
      options: ['20m', '30m', '40m', '80m'],
      correct: 2,
      explanation: '末速度v=0，v²-v₀²=2ax → 0-400=2×(-5)x → x=40m。使用v²-v₀²=2ax公式最方便。',
      testsPrerequisite: null
    },
    {
      stem: '做匀变速直线运动的物体，中间时刻的速度____中间位置的速度（单向运动）。',
      options: ['大于', '等于', '小于', '无法确定'],
      correct: 2,
      explanation: '匀变速运动中，中间时刻速度v_t/2=(v₀+v)/2，中间位置速度v_x/2=√[(v₀²+v²)/2]。可证明v_x/2 > v_t/2（v₀≠v时）。',
      testsPrerequisite: null
    }
  ],
  practiceQuestions: [
    { stem: '匀变速直线运动中，速度公式为？', options: ['v=v₀+at', 'v=s/t', 'v=at²', 'v=v₀+½at²'], correct: 0, explanation: 'v=v₀+at是匀变速运动的速度公式。', difficulty: 2 },
    { stem: '从静止开始匀加速，第1秒、第2秒、第3秒内的位移之比为？', options: ['1:2:3', '1:3:5', '1:4:9', '1:1:1'], correct: 1, explanation: '初速为0的匀加速：x₁:x₂:x₃=1:3:5（等时间间隔内位移比）。', difficulty: 3 },
    { stem: '物体以5m/s初速度、2m/s²加速度运动，第3秒末的速度为？', options: ['8 m/s', '11 m/s', '13 m/s', '6 m/s'], correct: 1, explanation: 'v=v₀+at=5+2×3=11m/s。', difficulty: 2 },
    { stem: 'v-t图像中，斜率表示？', options: ['速度', '位移', '加速度', '时间'], correct: 2, explanation: 'v-t图像中，斜率=Δv/Δt=加速度。面积=位移。这是高考必考内容。', difficulty: 2 },
    { stem: '物体做匀减速运动直至停下，最后1秒内位移为2m，加速度大小为？', options: ['1 m/s²', '2 m/s²', '4 m/s²', '8 m/s²'], correct: 2, explanation: '逆向看作初速为0的匀加速：x=½at²→2=½a×1→a=4m/s²。逆向思维是常用技巧。', difficulty: 4 }
  ]
};

// --- g1_free_fall: 自由落体运动 ---
App.knowledgeGraph['g1_free_fall'] = {
  id: 'g1_free_fall',
  name: '自由落体运动',
  chapter: '必修一·匀变速直线运动',
  grade: '高一',
  difficulty: 4,
  prerequisites: ['g1_linear_motion'],
  description: '理解自由落体的条件（只受重力、初速为0）、掌握重力加速度g≈9.8m/s²、自由落体的公式',
  position: { x: 160, y: 50 },
  diagnosticQuestions: [
    {
      stem: '关于自由落体运动，下列说法正确的是？',
      options: ['重的物体下落得快', '自由落体是初速为零、加速度为g的匀加速运动', '物体下落就是自由落体', '自由落体加速度与物体质量有关'],
      correct: 1,
      explanation: '自由落体条件：①只受重力（或空气阻力可忽略）②初速度为零。g对所有物体相同（同一地点）。',
      testsPrerequisite: null
    },
    {
      stem: '一个物体从20m高处自由落下（g取10m/s²），落地需要多长时间？',
      options: ['1s', '2s', '3s', '4s'],
      correct: 1,
      explanation: 'h=½gt²→20=½×10×t²→t=2s。自由落体用匀加速公式，a=g, v₀=0。',
      testsPrerequisite: null
    },
    {
      stem: '铁球和羽毛在真空中同时从同一高度释放，谁会先落地？',
      options: ['铁球', '羽毛', '同时落地', '无法确定'],
      correct: 2,
      explanation: '真空中没有空气阻力，所有物体自由落体加速度都是g。伽利略的经典结论。',
      testsPrerequisite: null
    }
  ],
  practiceQuestions: [
    { stem: '自由落体第1秒内下落距离约为？(g取10m/s²)', options: ['5m', '10m', '15m', '20m'], correct: 0, explanation: 'h=½gt²=½×10×1=5m。', difficulty: 2 },
    { stem: '从塔顶释放一个小球，1s后释放另一个。两球距离会？', options: ['保持不变', '越来越大', '越来越小', '先大后小'], correct: 1, explanation: '两球都做自由落体，先释放的速度始终更大，距离越来越大。', difficulty: 3 },
    { stem: '物体自由落下，第3秒内下落的高度为？(g=10)', options: ['25m', '45m', '20m', '30m'], correct: 0, explanation: '前3秒下落45m，前2秒下落20m，第3秒内=45-20=25m。或：½g(3²-2²)=25m。', difficulty: 3 },
    { stem: '自由落体运动中，以下哪组物理量是恒定的？', options: ['速度和位移', '加速度和重力', '位移和时间', '速度和时间'], correct: 1, explanation: '自由落体的加速度恒为g（大小方向都不变），是匀变速运动。速度越来越快。', difficulty: 2 }
  ]
};

// --- g1_gravity_elasticity: 重力与弹力 ---
App.knowledgeGraph['g1_gravity_elasticity'] = {
  id: 'g1_gravity_elasticity',
  name: '重力与弹力',
  chapter: '必修一·相互作用',
  grade: '高一',
  difficulty: 4,
  prerequisites: ['c8_force_concept'],
  description: '理解重力的产生与方向、掌握胡克定律F=kx、弹力的产生条件与方向判断、弹簧的串联与并联',
  position: { x: 440, y: 180 },
  diagnosticQuestions: [
    {
      stem: '关于弹力，下列说法正确的是？',
      options: ['两物体接触就一定产生弹力', '弹力方向总是垂直于接触面', '弹力就是弹簧的力', '木头不会产生弹力'],
      correct: 1,
      explanation: '弹力方向垂直于接触面（点面接触）或沿绳方向（绳的拉力）。产生弹力还需要发生弹性形变。',
      testsPrerequisite: null
    },
    {
      stem: '一根弹簧原长10cm，挂2N重物时长12cm。弹簧的劲度系数为？',
      options: ['50 N/m', '100 N/m', '200 N/m', '500 N/m'],
      correct: 1,
      explanation: 'F=kx→2=k×0.02→k=100N/m。注意x是形变量（伸长量/压缩量），不是总长。',
      testsPrerequisite: null
    },
    {
      stem: '重力的施力物体是？',
      options: ['物体本身', '支撑面', '地球', '绳子'],
      correct: 2,
      explanation: '重力是地球对物体的吸引力。任何物体都受重力（地球上），方向竖直向下。',
      testsPrerequisite: 'c8_force_concept'
    }
  ],
  practiceQuestions: [
    { stem: '胡克定律的表达式是？', options: ['F=ma', 'F=kx', 'F=μN', 'F=GmM/r²'], correct: 1, explanation: 'F=kx，k是劲度系数，x是形变量。胡克定律成立条件：弹性限度内。', difficulty: 2 },
    { stem: '放在桌面上的书，受到的支持力施力物体是？', options: ['书', '桌面', '地球', '手'], correct: 1, explanation: '支持力是桌面给书的弹力，桌面是施力物体。支持力属于弹力。', difficulty: 2 },
    { stem: '一弹簧挂1N重物伸长2cm，挂3N重物伸长多少？', options: ['2cm', '4cm', '6cm', '8cm'], correct: 2, explanation: 'F=kx，k=F₁/x₁=1/0.02=50N/m。x₂=F₂/k=3/50=0.06m=6cm。', difficulty: 2 },
    { stem: '弹力产生的条件包括？', options: ['只需要接触', '接触+弹性形变', '只需要形变', '接触+运动'], correct: 1, explanation: '弹力产生条件：①两物体接触 ②发生弹性形变。缺一不可。', difficulty: 2 },
    { stem: '绳子的拉力方向总是？', options: ['竖直向上', '垂直于接触面', '沿绳子且指向绳子收缩的方向', '沿绳子且指向绳子伸长的方向'], correct: 2, explanation: '绳子拉力沿绳，指向绳子收缩方向（即绳子想恢复原长的方向）。', difficulty: 3 }
  ]
};

// --- g1_friction: 摩擦力 ---
App.knowledgeGraph['g1_friction'] = {
  id: 'g1_friction',
  name: '摩擦力',
  chapter: '必修一·相互作用',
  grade: '高一',
  difficulty: 5,
  prerequisites: ['c8_friction_basic', 'g1_gravity_elasticity'],
  description: '区分静摩擦力与滑动摩擦力、掌握f=μN公式、摩擦力的方向判断、最大静摩擦力',
  position: { x: 560, y: 280 },
  diagnosticQuestions: [
    {
      stem: '滑动摩擦力的大小公式为？',
      options: ['f=μmg', 'f=μN', 'f=kx', 'f=ma'],
      correct: 1,
      explanation: 'f=μN，μ是动摩擦因数，N是正压力（垂直于接触面的压力）。注意N不一定等于mg！',
      testsPrerequisite: null
    },
    {
      stem: '物体放在斜面上静止，受到的摩擦力方向是？',
      options: ['沿斜面向上', '沿斜面向下', '竖直向上', '没有摩擦力'],
      correct: 0,
      explanation: '物体有沿斜面下滑的趋势，摩擦力沿斜面向上阻止这种趋势。静摩擦力方向与相对运动趋势方向相反。',
      testsPrerequisite: 'c8_friction_basic'
    },
    {
      stem: '水平面上重100N的木箱，μ=0.3。用20N水平力推，木箱静止。摩擦力为？',
      options: ['30N', '20N', '100N', '0N'],
      correct: 1,
      explanation: '最大静摩擦力≈30N，20N<30N，木箱静止→静摩擦力=推力=20N。不要看到μ就用f=μN！',
      testsPrerequisite: null
    }
  ],
  practiceQuestions: [
    { stem: '关于静摩擦力，正确的是？', options: ['静摩擦力大小固定', '静摩擦力方向一定与运动方向相反', '静摩擦力大小随外力变化', '静摩擦力一定小于滑动摩擦力'], correct: 2, explanation: '静摩擦力从0到最大静摩擦力之间随外力自动调整。', difficulty: 2 },
    { stem: '自行车后轮受到的摩擦力方向是？', options: ['向后', '向前', '向上', '无摩擦力'], correct: 1, explanation: '后轮是驱动轮，主动向后转→地面给后轮向前的摩擦力，推动车前进。', difficulty: 3 },
    { stem: '重50N物体，μ=0.4，用15N水平力拉。滑动摩擦力大小为？', options: ['15N', '20N', '50N', '10N'], correct: 1, explanation: '物体运动→滑动摩擦力f=μN=0.4×50=20N。注意N等于重力（水平面）。', difficulty: 2 },
    { stem: '增大正压力可以增大？', options: ['静摩擦力', '最大静摩擦力和滑动摩擦力', '只增大静摩擦力', '只增大滑动摩擦力'], correct: 1, explanation: '正压力增大，最大静摩擦力和滑动摩擦力都增大。物体质量影响N，从而影响f。', difficulty: 2 },
    { stem: '用力F推靠在墙上的物体，物体静止。如果增大F，摩擦力会？', options: ['增大', '减小', '不变', '变为零'], correct: 2, explanation: '竖直方向：摩擦力=重力（平衡）。F增大只增大墙对物体的弹力（正压力），不改变摩擦力。', difficulty: 4 }
  ]
};

// --- g1_force_synthesis: 力的合成与分解 ---
App.knowledgeGraph['g1_force_synthesis'] = {
  id: 'g1_force_synthesis',
  name: '力的合成与分解',
  chapter: '必修一·相互作用',
  grade: '高一',
  difficulty: 5,
  prerequisites: ['c8_force_concept', 'g1_gravity_elasticity'],
  description: '掌握平行四边形定则、正交分解法、合力与分力的关系、共点力平衡',
  position: { x: 500, y: 110 },
  diagnosticQuestions: [
    {
      stem: '两个力F₁=3N和F₂=4N，方向互相垂直，合力大小为？',
      options: ['7N', '5N', '1N', '12N'],
      correct: 1,
      explanation: '垂直时合力=√(F₁²+F₂²)=√(9+16)=5N。两力垂直时用勾股定理。',
      testsPrerequisite: null
    },
    {
      stem: '两个力的合力大小，可能的是？(F₁=6N, F₂=8N)',
      options: ['1N', '3N', '15N', '20N'],
      correct: 1,
      explanation: '合力范围：|F₁-F₂|≤F≤F₁+F₂，即2N≤F≤14N。3N在这个范围内。',
      testsPrerequisite: null
    },
    {
      stem: '将一个力分解为两个分力，以下说法正确的是？',
      options: ['分解结果是唯一的', '按实际作用效果分解', '只能正交分解', '分解后合力会变小'],
      correct: 1,
      explanation: '力的分解通常按实际作用效果来分解（如斜面上重力分解为下滑力和正压力）。也可正交分解。',
      testsPrerequisite: null
    }
  ],
  practiceQuestions: [
    { stem: '力的合成遵循的定则是？', options: ['牛顿定律', '平行四边形定则', '欧姆定律', '胡克定律'], correct: 1, explanation: '力是矢量，合成遵循平行四边形定则（或三角形定则）。', difficulty: 2 },
    { stem: 'F₁=5N，F₂=5N，夹角为120°，合力大小为？', options: ['0N', '5N', '10N', '7N'], correct: 1, explanation: '两等大力夹角120°时合力=分力=5N（正三角形）。', difficulty: 3 },
    { stem: '关于合力与分力，正确的是？', options: ['合力一定大于分力', '合力可能小于分力', '合力方向一定在两个分力方向之间', '合力就是分力的算术和'], correct: 1, explanation: '合力可能小于分力（如两力反向时合力=差）。合力范围：|F₁-F₂|到|F₁+F₂|。', difficulty: 2 },
    { stem: '斜面上物体重力分解，沿斜面向下的分力大小为？', options: ['mgcosθ', 'mgsinθ', 'mg', 'mgtanθ'], correct: 1, explanation: '重力沿斜面分量=mgsinθ，垂直于斜面分量=mgcosθ。正交分解时注意角度关系。', difficulty: 3 },
    { stem: '三个共点力F₁=2N, F₂=3N, F₃=4N，合力可能为？', options: ['10N', '0N', '12N', '15N'], correct: 1, explanation: '三力平衡条件：最大力≤其余两力之和（4≤2+3=5，满足），合力可以为0。', difficulty: 3 }
  ]
};

// --- g1_newton_first: 牛顿第一定律 ---
App.knowledgeGraph['g1_newton_first'] = {
  id: 'g1_newton_first',
  name: '牛顿第一定律',
  chapter: '必修一·牛顿运动定律',
  grade: '高一',
  difficulty: 4,
  prerequisites: ['c9_newton_first_intro', 'g1_force_synthesis'],
  description: '深化惯性概念、理解力是改变运动状态的原因（不是维持运动的原因）、理想实验方法',
  position: { x: 580, y: 140 },
  diagnosticQuestions: [
    {
      stem: '关于牛顿第一定律的理解，错误的是？',
      options: ['力是维持物体运动的原因', '力是改变物体运动状态的原因', '物体不受力时保持静止或匀速直线运动', '惯性是一切物体的固有属性'],
      correct: 0,
      explanation: '力是改变运动状态的原因（产生加速度），不是维持运动的原因。亚里士多德的错误：力维持运动。伽利略+牛顿纠正了这一错误。',
      testsPrerequisite: 'c9_newton_first_intro'
    },
    {
      stem: '月球上同一物体的惯性相比地球上？',
      options: ['变大', '变小', '不变', '变为零'],
      correct: 2,
      explanation: '惯性只与质量有关，质量不变惯性不变。重力变化不影响惯性。',
      testsPrerequisite: 'c9_newton_first_intro'
    },
    {
      stem: '在匀速行驶的火车车厢内，竖直向上跳起的人会落在？',
      options: ['起跳点后方', '起跳点前方', '起跳点', '无法确定'],
      correct: 2,
      explanation: '人跳起时与火车有相同的水平速度，由于惯性，水平方向保持这个速度，所以落回起跳点。',
      testsPrerequisite: null
    }
  ],
  practiceQuestions: [
    { stem: '关于惯性，下列说法正确的是？', options: ['物体受力时惯性会改变', '物体运动时惯性比静止时大', '惯性只与质量有关', '物体在太空中没有惯性'], correct: 2, explanation: '惯性是物体的固有属性，只取决于质量。与受力、运动状态、位置都无关。', difficulty: 2 },
    { stem: '伽利略的理想斜面实验说明了？', options: ['力是维持运动的原因', '如果没有摩擦，物体将保持匀速直线运动', '重物下落更快', '物体不受力就会静止'], correct: 1, explanation: '伽利略通过理想实验推理：没有摩擦时，运动不需要力来维持。这是牛顿第一定律的基础。', difficulty: 3 },
    { stem: '在太空中（无重力），推动一个大石块比推动小石子？', options: ['更省力', '更费力', '一样省力', '无法推动'], correct: 1, explanation: '质量大→惯性大→改变其运动状态需要更大的力。无重力但有惯性！', difficulty: 3 },
    { stem: '汽车的安全气囊是为了减小什么造成的伤害？', options: ['惯性', '因惯性造成的撞击力', '速度', '质量'], correct: 1, explanation: '气囊延长了碰撞时间，减小了因惯性前冲造成的冲击力。不是减小惯性本身。', difficulty: 2 }
  ]
};

// --- g1_newton_third: 牛顿第三定律 ---
App.knowledgeGraph['g1_newton_third'] = {
  id: 'g1_newton_third',
  name: '牛顿第三定律',
  chapter: '必修一·牛顿运动定律',
  grade: '高一',
  difficulty: 4,
  prerequisites: ['c8_force_concept'],
  description: '理解作用力与反作用力、区分平衡力与相互作用力、掌握牛顿第三定律的应用',
  position: { x: 620, y: 200 },
  diagnosticQuestions: [
    {
      stem: '一本书放在桌面上静止。书对桌面的压力和桌面对书的支持力是？',
      options: ['平衡力', '相互作用力（作用力与反作用力）', '同一个力', '没有关系'],
      correct: 1,
      explanation: '书对桌面↓ + 桌面对书↑ = 相互作用力（不同物体，大小相等方向相反）。书的重力+支持力=平衡力（同一物体）。',
      testsPrerequisite: null
    },
    {
      stem: '大人和小孩掰手腕，小孩输了。两人施加的力谁大？',
      options: ['大人施加的力大', '小孩施加的力大', '一样大', '无法比较'],
      correct: 2,
      explanation: '相互作用力始终大小相等！小孩输是因为小孩手臂能承受的最大力小于大人施加的力。',
      testsPrerequisite: null
    },
    {
      stem: '以下哪对是平衡力？',
      options: ['人拉绳子和绳子拉人', '地球吸引月球和月球吸引地球', '物体放在桌面上，重力和支持力', '锤子敲钉子和钉子敲锤子'],
      correct: 2,
      explanation: '重力和支持力作用在同一物体上，等大反向共线→平衡力。其他选项都是相互作用力（作用在不同物体上）。',
      testsPrerequisite: null
    }
  ],
  practiceQuestions: [
    { stem: '划船时桨向后推水，水向前推桨。这两个力是？', options: ['平衡力', '相互作用力', '重力', '弹力'], correct: 1, explanation: '桨推水和桨被水推，作用在不同物体上→相互作用力。', difficulty: 2 },
    { stem: '相互作用力的特点是？', options: ['大小不等', '方向相同', '等大反向共线，作用在不同物体上', '作用在同一物体上'], correct: 2, explanation: '相互作用力"同生共灭同性质"，等大反向共线，但作用在不同物体上。', difficulty: 2 },
    { stem: '鸡蛋碰石头，鸡蛋破了。石头对鸡蛋的力____鸡蛋对石头的力。', options: ['大于', '小于', '等于', '无法确定'], correct: 2, explanation: '相互作用力始终等大。鸡蛋破是因为鸡蛋壳的抗压能力比石头弱。', difficulty: 2 },
    { stem: '以下关于平衡力和相互作用力的区分，正确的是？', options: ['都可以抵消', '平衡力作用在同一物体上', '相互作用力作用在同一物体上', '它们是一样的'], correct: 1, explanation: '关键区别：平衡力→同一物体；相互作用力→不同物体。平衡力合力为零，相互作用力不能抵消。', difficulty: 3 }
  ]
};

// --- g1_newton_second: 牛顿第二定律 ---
App.knowledgeGraph['g1_newton_second'] = {
  id: 'g1_newton_second',
  name: '牛顿第二定律',
  chapter: '必修一·牛顿运动定律',
  grade: '高一',
  difficulty: 5,
  prerequisites: ['g1_force_synthesis', 'g1_linear_motion', 'g1_newton_first'],
  description: '掌握F=ma、理解加速度与力和质量的关系、受力分析+运动分析的结合、超重与失重',
  position: { x: 660, y: 100 },
  diagnosticQuestions: [
    {
      stem: '质量为2kg的物体，受到10N的合力，加速度为？',
      options: ['2 m/s²', '5 m/s²', '10 m/s²', '20 m/s²'],
      correct: 1,
      explanation: 'a=F/m=10/2=5m/s²。F=ma是牛顿第二定律的核心公式，F是合力。',
      testsPrerequisite: null
    },
    {
      stem: '电梯加速上升时，人对地板的压力____人的重力。',
      options: ['大于', '等于', '小于', '为零'],
      correct: 0,
      explanation: '加速上升→加速度向上→合力向上→N-mg=ma→N=mg+ma>mg。这就是超重现象。',
      testsPrerequisite: null
    },
    {
      stem: '用20N的水平力推一个放在粗糙水平面上的物体，物体以2m/s²加速运动。已知物体质量4kg，摩擦力为？',
      options: ['8N', '12N', '20N', '28N'],
      correct: 1,
      explanation: 'F-f=ma→20-f=4×2→f=12N。牛顿第二定律中的F是合力。先受力分析，再列方程。',
      testsPrerequisite: 'g1_force_synthesis'
    }
  ],
  practiceQuestions: [
    { stem: '牛顿第二定律说明：加速度与合力成____，与质量成____。', options: ['正比/正比', '正比/反比', '反比/正比', '反比/反比'], correct: 1, explanation: 'a=F/m，a与F成正比，a与m成反比。', difficulty: 2 },
    { stem: '物体在光滑水平面上受到10N恒力，加速度为2m/s²。物体的质量是？', options: ['2kg', '5kg', '10kg', '20kg'], correct: 1, explanation: 'm=F/a=10/2=5kg。', difficulty: 2 },
    { stem: '电梯中放一个体重秤，电梯匀加速上升，秤的读数会？', options: ['小于真实体重', '等于真实体重', '大于真实体重', '为零'], correct: 2, explanation: '超重：N=mg+ma>mg。秤的读数（支持力）>真实重力。', difficulty: 3 },
    { stem: '两个物体用绳子连接，在光滑水平面上用F拉第一个物体。两物体间绳子的拉力？', options: ['等于F', '大于F', '小于F', '等于0'], correct: 2, explanation: '整体法：a=F/(m₁+m₂)。隔离法：对第二个物体T=m₂a=m₂F/(m₁+m₂)<F。', difficulty: 4 },
    { stem: '正在下降的电梯，如果加速度向下，人处于？', options: ['超重', '失重', '正常', '无法判断'], correct: 1, explanation: '加速度向下→合力向下→mg-N=ma→N=mg-ma<mg→失重。', difficulty: 3 }
  ]
};

// --- g1_newton_application: 牛顿定律应用 ---
App.knowledgeGraph['g1_newton_application'] = {
  id: 'g1_newton_application',
  name: '牛顿定律综合应用',
  chapter: '必修一·牛顿运动定律',
  grade: '高一',
  difficulty: 5,
  prerequisites: ['g1_newton_second', 'g1_newton_third', 'g1_friction'],
  description: '连接体问题、传送带问题、临界问题、超重失重综合应用',
  position: { x: 700, y: 40 },
  diagnosticQuestions: [
    {
      stem: '两个物体A和B叠放在光滑水平面上，用水平力F拉A（A在B上方）。两物体一起加速，则A对B的摩擦力方向是？',
      options: ['与F同向', '与F反向', '没有摩擦力', '竖直方向'],
      correct: 0,
      explanation: '整体加速，B需要向前加速的力。A给B的摩擦力向前（与F同向），这是B加速的原因。',
      testsPrerequisite: null
    },
    {
      stem: '物体放在水平传送带上，传送带匀速运动。物体受摩擦力吗？',
      options: ['受滑动摩擦力', '受静摩擦力', '不受摩擦力', '看速度大小'],
      correct: 2,
      explanation: '物体与传送带共速后，无相对运动趋势→不受摩擦力。匀速运动不需要力来维持。',
      testsPrerequisite: 'g1_friction'
    },
    {
      stem: '升降机以加速度a上升时，其中单摆的周期会？',
      options: ['变大', '变小', '不变', '无法判断'],
      correct: 1,
      explanation: '加速上升→超重→等效重力g\'=g+a→T=2π√(L/g\')→T变小。加速度向上等效重力增大。',
      testsPrerequisite: null
    }
  ],
  practiceQuestions: [
    { stem: '两个物体通过滑轮用绳子连接，一个在桌面上一个悬挂。系统加速度取决于？', options: ['悬挂物体的重量', '两个物体的总质量', '悬挂物体的重力与总质量之比', '桌面摩擦力'], correct: 2, explanation: 'a=mg/(m+M)（光滑桌面）。牛顿第二定律+整体法解决连接体。', difficulty: 4 },
    { stem: '质量为m的人站在升降机里的秤上，升降机以g/2加速下降。秤的读数为？', options: ['mg', 'mg/2', '3mg/2', '0'], correct: 1, explanation: 'mg-N=ma=mg/2→N=mg/2。高度失重（加速度=g/2向下）。', difficulty: 3 },
    { stem: '关于整体法和隔离法，正确的选择是？', options: ['永远用隔离法', '求内力用隔离法，求外力用整体法', '永远用整体法', '随便选'], correct: 1, explanation: '整体法求共同加速度和系统外力；隔离法求系统内各物体间的相互作用力。', difficulty: 3 }
  ]
};

// ===== 章节-知识点映射 =====
App.chapterNodes = {
  '初中前置': ['c8_reference_frame', 'c8_speed_concept', 'c8_force_concept', 'c8_friction_basic', 'c9_newton_first_intro'],
  '必修一·运动的描述': ['g1_particle_reference', 'g1_time_displacement', 'g1_velocity_accel'],
  '必修一·匀变速直线运动': ['g1_linear_motion', 'g1_free_fall'],
  '必修一·相互作用': ['g1_gravity_elasticity', 'g1_friction', 'g1_force_synthesis'],
  '必修一·牛顿运动定律': ['g1_newton_first', 'g1_newton_second', 'g1_newton_third', 'g1_newton_application']
};

console.log('📚 知识图谱加载完成: ' + Object.keys(App.knowledgeGraph).length + ' 个知识点');
