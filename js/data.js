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
    },
    {
      stem: '以下关于参照物的说法，错误的是？',
      options: ['参照物可以任意选择', '参照物必须是静止不动的物体', '选不同的参照物，物体运动状态可能不同', '通常选地面或地面上不动的物体为参照物'],
      correct: 1,
      explanation: '参照物可以选静止的也可以选运动的，任何物体都可以选作参照物，不是必须选静止的。',
      testsPrerequisite: null
    },
    {
      stem: '一艘船在河中顺流而下，船上的人看到岸上的树在向上游运动。此时人选的是____为参照物。',
      options: ['河岸', '河水', '船', '树'],
      correct: 2,
      explanation: '以船为参照物，岸上的树相对于船向上游方向运动。选不同参照物，同一物体的运动描述不同。',
      testsPrerequisite: null
    },
    {
      stem: '下列哪种现象最能说明"运动和静止是相对的"？',
      options: ['太阳从东边升起西边落下', '高铁上看到并排慢行的列车似乎在"后退"', '苹果从树上掉下来是竖直向下的', '水往低处流'],
      correct: 1,
      explanation: '你乘高铁超越旁边同向慢车时，从你的车厢看那列车似乎在后退，但它也在前进——这就是相对运动。',
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
    },
    {
      stem: '一辆汽车前半段时间以 30km/h 行驶，后半段时间以 50km/h 行驶。全程平均速度约为？',
      options: ['35 km/h', '40 km/h', '45 km/h', '48 km/h'],
      correct: 1,
      explanation: '设每段时间为 t。总路程=30t+50t=80t，总时间=2t，v=80t/2t=40km/h。时间相等时，平均速度=速度的算术平均。',
      testsPrerequisite: null
    },
    {
      stem: '关于匀速直线运动，下列说法正确的是？',
      options: ['速度大小不变就是匀速运动', '速度方向不变就是匀速运动', '速度大小和方向都不变的运动是匀速直线运动', '相等时间内路程相等的运动一定是匀速运动'],
      correct: 2,
      explanation: '匀速直线运动要求速度的大小和方向都不变。仅路程相等不能说明是匀速，可能是变速但巧合总路程相等。',
      testsPrerequisite: null
    },
    {
      stem: '甲的速度是 5m/s，乙的速度是 18km/h，谁更快？',
      options: ['甲更快', '乙更快', '一样快', '无法比较'],
      correct: 2,
      explanation: '乙：18km/h=18×1000/3600=5m/s。两者速度相同。比较速度前必须先统一单位。',
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
    },
    {
      stem: '力的三要素中，影响力的作用效果的因素不包括？',
      options: ['力的大小', '力的方向', '力的作用点', '力的单位'],
      correct: 3,
      explanation: '力的三要素是大小、方向和作用点，它们共同决定力的作用效果。力的单位（牛顿）不影响作用效果。',
      testsPrerequisite: null
    },
    {
      stem: '关于力的相互性，以下例子中正确的是？',
      options: ['人推墙时只有人用了力', '鸡蛋碰石头，石头对鸡蛋的力更大', '游泳时人向后划水，水向前推人', '提水桶时只有手对桶有拉力'],
      correct: 2,
      explanation: '游泳时人向后推水，水给人向前的推力——这是力的相互性的典型应用。作用力与反作用力同时存在且大小相等。',
      testsPrerequisite: null
    },
    {
      stem: '下列力的作用效果中，属于"改变物体运动状态"的是？',
      options: ['用力拉弹簧使其变长', '用手捏易拉罐使其变扁', '踢足球使静止的球飞出去', '揉面团使其变形'],
      correct: 2,
      explanation: '足球从静止到飞出，速度从零变为有，运动状态改变。前两个选项是形变（改变形状），不是运动状态改变。',
      testsPrerequisite: null
    },
    {
      stem: '一个物体受到两个力：F₁=3N 向东，F₂=4N 向南，这两个力的合力大小为？',
      options: ['7N', '5N', '1N', '12N'],
      correct: 1,
      explanation: '两力垂直时合力=√(3²+4²)=5N（勾股定理）。初中常考此类垂直力合成。',
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
    },
    {
      stem: '自行车刹车时，闸皮与车圈之间的摩擦属于？',
      options: ['静摩擦', '滑动摩擦', '滚动摩擦', '没有摩擦'],
      correct: 1,
      explanation: '刹车时闸皮与转动的车圈之间发生相对滑动，是滑动摩擦。摩擦使动能转化为热能，车轮减速。',
      testsPrerequisite: null
    },
    {
      stem: '下列做法中，属于增大有益摩擦的是？',
      options: ['在机器轴承中加润滑油', '在结冰路面上撒沙子', '气垫船底部喷出高压空气', '给门轴滴油'],
      correct: 1,
      explanation: '结冰路面撒沙子增加了接触面粗糙程度，增大轮胎与地面的摩擦力，防止打滑。其他选项都是减小摩擦。',
      testsPrerequisite: null
    },
    {
      stem: '用 15N 的水平推力推重 50N 的木箱，木箱匀速直线运动。木箱受到的滑动摩擦力大小为？',
      options: ['50N', '15N', '35N', '65N'],
      correct: 1,
      explanation: '匀速直线运动→二力平衡→水平方向摩擦力=推力=15N。摩擦力与重力无直接关系（水平面上 N=G）。',
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
    },
    {
      stem: '公交车上常设有安全把手。当公交车突然启动时，站着的乘客会向____倾倒。',
      options: ['前方', '后方', '左侧', '右侧'],
      correct: 1,
      explanation: '车突然启动向前，乘客的脚随车向前，但上身由于惯性要保持原来静止状态，所以向后倾倒。',
      testsPrerequisite: null
    },
    {
      stem: '以下做法中，属于防止惯性带来危害的是？',
      options: ['跳远前要先助跑', '锤头松了在地面上撞击几下', '汽车前排座椅安装安全带', '拍打衣服除去灰尘'],
      correct: 2,
      explanation: '安全带防止急刹车时人因惯性向前冲撞。其他三个是"利用"惯性的例子。',
      testsPrerequisite: null
    },
    {
      stem: '宇航员在太空中（失重状态），用同样的力推一个大铁球和一个小乒乓球，哪个更容易推动？',
      options: ['大铁球更容易', '乒乓球更容易', '一样容易', '都无法推动'],
      correct: 1,
      explanation: '质量越大的物体惯性越大，改变其运动状态越困难。太空失重但质量（惯性）不变，乒乓球质量小，惯性小，更容易被推动加速。',
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
    },
    {
      stem: '研究以下问题时，能将研究对象视为质点的是？',
      options: ['研究乒乓球选手的发球旋转角度', '研究跳水运动员空中翻腾的圈数', '研究马拉松运动员从起点到终点的运动时间', '研究体操运动员鞍马上的腿部姿态'],
      correct: 2,
      explanation: '马拉松全程远大于运动员大小，形状和大小对总时间影响可忽略。质点的核心判断标准：形状大小对研究问题的影响是否可以忽略。',
      testsPrerequisite: null
    },
    {
      stem: '关于坐标系，下列说法正确的是？',
      options: ['描述直线运动只需要一维坐标系', '坐标系和参考系是同一个概念', '坐标系一定要以地面为原点', '坐标系不能用来描述位置变化'],
      correct: 0,
      explanation: '直线运动用一个坐标轴（数轴）即可确定位置。参考系确定运动描述的基础，坐标系是实现参考系的数学工具。',
      testsPrerequisite: null
    },
    {
      stem: '同一物体，相对于不同参考系运动状态可能完全不同——这说明了什么？',
      options: ['物体的运动是绝对的', '运动的描述依赖于参考系的选择', '参考系必须是地面', '所有的参考系都能给出相同的运动描述'],
      correct: 1,
      explanation: '运动描述的相对性：选不同的参考系，同一物体的运动状态（静止/运动、速度快慢/方向）可能不同。',
      testsPrerequisite: null
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
    },
    {
      stem: '以下各组物理量中，全部是矢量的是？',
      options: ['位移、速度、加速度', '时间、位移、速度', '路程、时间、质量', '位移、路程、速率'],
      correct: 0,
      explanation: '位移、速度、加速度都有大小和方向，是矢量。时间、质量、路程、速率只有大小，是标量。',
      testsPrerequisite: null
    },
    {
      stem: '某同学绕标准田径场（一圈 400m）跑步，从起点出发跑了两圈半。他的位移大小约为？',
      options: ['1000m', '400m', '127m', '0m'],
      correct: 2,
      explanation: '两圈半跑了 400×2.5=1000m 路程。但终点在半圈位置，距起点直线距离≈直径=400/π≈127m。位移=起点到终点的直线距离。',
      testsPrerequisite: null
    },
    {
      stem: '"第 3 秒初"和"第 3 秒末"这两个时刻之间隔了多久？',
      options: ['0 秒', '1 秒', '2 秒', '3 秒'],
      correct: 1,
      explanation: '"第3秒初"即 t=2s 时刻，"第3秒末"即 t=3s 时刻，相隔 1 秒。注意区分时刻（时间点）和时间间隔（时间段）。',
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
    },
    {
      stem: '某物体做匀减速运动，加速度为 -3m/s²。这表示？',
      options: ['物体的速度一定为负', '物体的速度每秒减少 3m/s', '物体的位移每秒减少 3m', '物体一定在向后运动'],
      correct: 1,
      explanation: '加速度为-3m/s²，即 Δv/Δt=-3，速度每秒减少 3m/s。加速度的正负取决于正方向的选取，与速度方向无关。',
      testsPrerequisite: null
    },
    {
      stem: '关于平均速度和瞬时速度，下列说法正确的是？',
      options: ['平均速度就是速度的平均值', '瞬时速度是 Δt→0 时平均速度的极限', '匀速运动中瞬时速度不断变化', '平均速度的大小就是平均速率'],
      correct: 1,
      explanation: '瞬时速度是时间趋近于零时平均速度的极限值。平均速度=位移/时间≠速度的平均值。平均速率=路程/时间≥平均速度的大小。',
      testsPrerequisite: null
    },
    {
      stem: '甲的速度从 0 均匀增加到 20m/s 用了 10s，乙的速度从 0 均匀增加到 10m/s 用了 2s。谁的加速度大？',
      options: ['甲大', '乙大', '一样大', '无法比较'],
      correct: 1,
      explanation: '甲：a=20/10=2m/s²；乙：a=10/2=5m/s²。乙的加速度更大——加速度反映速度变化的快慢，不是最终速度的大小。',
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
    },
    {
      stem: '做匀变速直线运动的物体，经过 A、B 两点的速度分别为 v_A 和 v_B。则经过 AB 中点时的速度为？',
      options: ['(v_A+v_B)/2', '√[(v_A²+v_B²)/2]', '(v_A+v_B)', '√(v_A×v_B)'],
      correct: 1,
      explanation: '中间位置速度 v_x/2=√[(v_A²+v_B²)/2]。它大于中间时刻速度(v_A+v_B)/2（v_A≠v_B时）。',
      testsPrerequisite: null
    },
    {
      stem: '一辆汽车从静止开始以 2m/s² 匀加速行驶，第 4 秒内的位移为？',
      options: ['7m', '8m', '16m', '32m'],
      correct: 0,
      explanation: '前4秒位移=x₄=½×2×16=16m；前3秒位移=x₃=½×2×9=9m。第4秒内=x₄-x₃=16-9=7m。注意"n秒内"和"第n秒内"的区别。',
      testsPrerequisite: null
    },
    {
      stem: '做匀减速直线运动的物体，通过 16m 的距离后速度减为原来的一半，再运动多远停下？',
      options: ['16/3 m', '8 m', '4 m', '16 m'],
      correct: 0,
      explanation: '设初速 v，一半处速度 v/2。v²-(v/2)²=2a×16→3v²/4=32a。停下：v²=2aX→X/(16)=? 由 v²-(v/2)²=2a×16 和 v²=2aX 联立得 X/(16)=4/3→后续距离=64/3-16=16/3 m。',
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
    },
    {
      stem: '自由落体运动中，第 1 秒内、第 2 秒内、第 3 秒内的位移之比为？',
      options: ['1:2:3', '1:3:5', '1:4:9', '1:1:1'],
      correct: 1,
      explanation: '初速为零的匀加速运动，等时间间隔内位移之比为 1:3:5:7...（奇数比）。自由落体是初速为零、a=g 的匀加速运动。',
      testsPrerequisite: null
    },
    {
      stem: '关于自由落体加速度 g，下列说法正确的是？',
      options: ['质量大的物体 g 大', '体积小的物体 g 大', '同一地点所有物体自由落体的 g 都相同', 'g 随下落速度增大而增大'],
      correct: 2,
      explanation: '同一地点所有物体自由落体的 g 相同（≈9.8m/s²），与质量、体积、形状无关。区别在于空气阻力是否可忽略。',
      testsPrerequisite: null
    },
    {
      stem: '从高处每隔 1 秒释放一个小球，连续释放 3 个。在第三个球刚释放时，第一个球和第二个球之间的距离为？(g=10m/s²)',
      options: ['5m', '10m', '15m', '20m'],
      correct: 2,
      explanation: '第三个球刚释放时：第一个球已下落 2s→h₁=½×10×4=20m；第二个球已下落 1s→h₂=5m。距离=20-5=15m。',
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
    },
    {
      stem: '一根弹簧受到 4N 拉力时伸长 2cm。如果受到 6N 拉力，伸长量为？(弹性限度内)',
      options: ['2cm', '3cm', '4cm', '5cm'],
      correct: 1,
      explanation: 'F=kx，k=F₁/x₁=4/0.02=200N/m。x₂=F₂/k=6/200=0.03m=3cm。弹性限度内，伸长量与拉力成正比。',
      testsPrerequisite: null
    },
    {
      stem: '关于弹力的方向，以下说法正确的是？',
      options: ['支持力方向一定竖直向上', '绳子拉力方向一定沿绳子指向绳子伸长的方向', '绳子拉力方向一定沿绳子且指向绳子收缩的方向', '弹力方向一定与接触面平行'],
      correct: 2,
      explanation: '绳拉力沿绳且指向绳子收缩的方向。支持力方向垂直于接触面指向被支持的物体，不一定竖直向上。',
      testsPrerequisite: null
    },
    {
      stem: '关于重力和弹力的区别，下列说法错误的是？',
      options: ['重力是地球对物体的吸引力', '弹力是接触力，需要接触才产生', '重力方向总是垂直于水平面向下', '弹力的大小一定等于物体的重力'],
      correct: 3,
      explanation: '弹力大小不一定等于重力。如斜面上物体受到的支持力 N=mgcosθ<mg。弹力大小取决于形变程度和受力平衡。',
      testsPrerequisite: null
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
    },
    {
      stem: '关于静摩擦力和滑动摩擦力的关系，正确的是？',
      options: ['静摩擦力一定小于滑动摩擦力', '最大静摩擦力一般略大于滑动摩擦力', '滑动摩擦力一定大于静摩擦力', '两者大小总是相等'],
      correct: 1,
      explanation: '实验表明：最大静摩擦力一般略大于滑动摩擦力。这就是"推动瞬间最费力，推动后省力一些"的原因。',
      testsPrerequisite: null
    },
    {
      stem: '物体在斜面上匀速下滑，已知斜面倾角为 θ，动摩擦因数为 μ。下列关系正确的是？',
      options: ['μ=sinθ', 'μ=cosθ', 'μ=tanθ', 'μ=1/tanθ'],
      correct: 2,
      explanation: '匀速下滑→合力为零→mgsinθ=μmgcosθ→μ=tanθ。这个结论只对匀速下滑成立。',
      testsPrerequisite: null
    },
    {
      stem: '用水平力 F 将物体压在竖直墙上，物体静止。如果减小 F，物体将？',
      options: ['一定下滑', '一定静止', '若减小后最大静摩擦力仍≥重力则静止，否则下滑', '物体将上升'],
      correct: 2,
      explanation: '竖直方向：静摩擦力=重力（不变）。但最大静摩擦力随 F 减小而减小。当最大静摩擦力<重力时物体下滑。关键：实际静摩擦力≠最大静摩擦力。',
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
    },
    {
      stem: '两个力 F₁ 和 F₂ 的合力为 F。以下哪种说法是错误的？',
      options: ['|F₁-F₂|≤F≤F₁+F₂', 'F 一定大于 F₁', 'F 可能小于其中一个分力', '两力夹角120°且大小相等时，F=F₁=F₂'],
      correct: 1,
      explanation: '合力可能小于分力。例：两力反向时合力=两力之差。合力的范围是|F₁-F₂|到 F₁+F₂ 之间，F 可能小于 F₁。',
      testsPrerequisite: null
    },
    {
      stem: '在光滑斜面上放一重为 G 的物体（斜面倾角 θ）。物体对斜面的压力大小为？',
      options: ['G', 'Gcosθ', 'Gsinθ', 'Gtanθ'],
      correct: 1,
      explanation: '重力分解：垂直斜面分量=Gcosθ，即物体对斜面的正压力（相互作用力）。沿斜面分量=Gsinθ，是使物体下滑的力。',
      testsPrerequisite: null
    },
    {
      stem: '正交分解法的核心优势是什么？',
      options: ['能分解更多力', '计算更复杂但更精确', '将矢量运算转化为代数运算，方便列平衡方程', '只适用于两个力的合成'],
      correct: 2,
      explanation: '正交分解将复杂的矢量合成转化为沿坐标轴方向的代数运算。把所有力分解到 x、y 轴，分别列合力为零（或 F=ma）的方程求解。',
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

// --- g1_torque_balance: 力矩平衡 ---
App.knowledgeGraph['g1_torque_balance'] = {
  id: 'g1_torque_balance',
  name: '力矩与力矩平衡',
  chapter: '必修一·相互作用',
  grade: '高一',
  difficulty: 4,
  prerequisites: ['g1_force_synthesis', 'g1_gravity_elasticity'],
  description: '理解力矩的概念(M=F·L)、力臂的确定、力矩平衡条件(ΣM=0)及其在杠杆/滑轮/天平中的应用',
  position: { x: 480, y: 200 },
  diagnosticQuestions: [
    { stem: '力矩的计算公式为？', options: ['M=F·s', 'M=F·L（力×力臂）', 'M=F/a', 'M=F·v'], correct: 1, explanation: '力矩M=F·L，其中L是支点到力作用线的垂直距离（力臂）。单位：N·m。力矩是使物体转动的物理量。', testsPrerequisite: null },
    { stem: '杠杆平衡条件为？', options: ['F₁+F₂=0', 'F₁·L₁=F₂·L₂', 'F₁/L₁=F₂/L₂', 'F₁=F₂'], correct: 1, explanation: '杠杆平衡条件（力矩平衡）：顺时针力矩=逆时针力矩，即F₁·L₁=F₂·L₂。这是力矩平衡的最简单应用。', testsPrerequisite: null },
    { stem: '一个均匀杆重20N，长2m，在距一端0.5m处有支点。在较短端加多少力可使杆水平平衡？', options: ['30N', '60N', '10N', '20N'], correct: 0, explanation: '以支点为中心，重心在杆中点（距支点0.5m，在长端一侧）。重力力矩=20×0.5=10N·m(逆时针)。较短端距支点0.5m，需F×0.5=10⇒F=20N。重力使长端下沉。', testsPrerequisite: null },
    { stem: '力矩平衡条件用公式表示为？', options: ['ΣF=0', 'ΣM=0（合力矩为零）', 'ΣM>0', 'ΣF=ma'], correct: 1, explanation: '物体转动平衡条件：ΣM=0，即所有力对任一支点的力矩代数和为零（规定逆时针为正或顺时针为正）。', testsPrerequisite: null },
    { stem: '关于力臂的说法，正确的是？', options: ['力臂是支点到力的作用点的距离', '力臂是支点到力作用线的垂直距离', '力臂等于杆长', '力臂与力的大小成正比'], correct: 1, explanation: '力臂是从支点(转轴)到力作用线的垂直距离，不是到作用点的连线距离。画力臂时需作垂线。', testsPrerequisite: null },
    { stem: '一个2m长的轻质杠杆，支点在一端。在距支点0.5m处挂50N重物。在另一端至少用多大的力才能抬起？', options: ['12.5N', '25N', '50N', '100N'], correct: 0, explanation: '以支点为轴：重力力矩=50×0.5=25N·m(顺时针)。另一端力臂=2m，需F×2=25⇒F=12.5N。省力杠杆。', testsPrerequisite: null }
  ],
  practiceQuestions: [
    { stem: '力矩的单位是？', options: ['N', 'N·m', 'N/m', 'J'], correct: 1, explanation: '力矩M=F·L，单位N·m。与功的单位(J)量纲相同但物理意义不同，一般不用J表示力矩。', difficulty: 2 },
    { stem: '省力杠杆的特点是？', options: ['动力臂<阻力臂', '动力臂>阻力臂', '动力臂=阻力臂', '与力臂无关'], correct: 1, explanation: '省力杠杆：动力臂>阻力臂→动力<阻力。如撬棍(支点在中间一端)。费力杠杆(如镊子)动力臂<阻力臂。', difficulty: 2 },
    { stem: '当力通过支点时，力矩为？', options: ['最大', '最小为零', '无法确定', '等于力的大小'], correct: 1, explanation: '力通过支点时力臂为0→M=F×0=0。该力对物体的转动没有影响。', difficulty: 2 },
    { stem: '天平是利用什么原理？', options: ['牛顿第二定律', '力矩平衡（等臂杠杆）', '动量守恒', '能量守恒'], correct: 1, explanation: '天平是等臂杠杆：两侧力臂相等→平衡时两侧重力相等→质量相等。', difficulty: 2 }
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
    },
    {
      stem: '关于惯性和牛顿第一定律，下列说法正确的是？',
      options: ['物体受力就会改变运动状态', '物体不受力时一定静止', '物体运动状态改变时一定受到了力', '只要物体运动，它一定受到了力的作用'],
      correct: 2,
      explanation: '牛顿第一定律：不受力→静止或匀速直线运动。其逆否命题：运动状态改变→一定受到了力。力是改变运动状态的原因。',
      testsPrerequisite: null
    },
    {
      stem: '以下现象中与惯性无关的是？',
      options: ['抖落衣服上的灰尘', '子弹离开枪口后继续向前运动', '苹果因重力而下落', '汽车急转弯时乘客向外侧倾斜'],
      correct: 2,
      explanation: '苹果下落因为重力（受力产生加速度），不是惯性。其他三个都体现了惯性的作用——物体保持原来运动状态的性质。',
      testsPrerequisite: null
    },
    {
      stem: '封闭车厢内悬挂的小球，当车辆向左转弯时，小球会向哪个方向摆动？',
      options: ['向左', '向右', '不摆动', '向前'],
      correct: 1,
      explanation: '车向左转，小球由于惯性要保持原来的运动方向（向前），相对于车厢向右摆动。与"车急刹人前倾"原理相同。',
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
    },
    {
      stem: '马拉着车在水平路面上加速前进。马对车的拉力____车对马的拉力。',
      options: ['大于', '等于', '小于', '无法确定'],
      correct: 1,
      explanation: '相互作用力总是大小相等！车能加速不是因为马对车的力大于车对马的力，而是因为马对车的力大于地面给车的摩擦力。分清"力的大小"和"合力效果"。',
      testsPrerequisite: null
    },
    {
      stem: '以下物体受到的力中，哪一对是平衡力？',
      options: ['放在斜面上的物体，重力和斜面对物体的支持力', '悬挂在天花板上的灯，灯的重力和绳子对灯的拉力', '人站在地面上，人对地面的压力和地面对人的支持力', '锤子敲钉子，锤对钉的力和钉对锤的力'],
      correct: 1,
      explanation: '灯静止→二力平衡：重力和绳拉力都作用在灯上，等大反向共线。A 错（两力不共线），C 和 D 是相互作用力（作用在不同物体上）。',
      testsPrerequisite: null
    },
    {
      stem: '关于作用力与反作用力和平衡力的区别，下列说法正确的是？',
      options: ['它们都等大反向，所以效果相同', '平衡力可以抵消（作用在同一物体上），相互作用力不能抵消（作用在不同物体上）', '相互作用力也可以相互抵消', '两者没有区别'],
      correct: 1,
      explanation: '平衡力作用在同一物体上，合力为零可抵消。相互作用力作用在不同物体上，分别产生各自的加速度，不能抵消。这是最核心的区别。',
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
    },
    {
      stem: '质量为 m 的物体在光滑水平面上，受到水平力 F 作用，加速度为 a。如果力变为 2F、质量变为 2m，加速度为？',
      options: ['a/2', 'a', '2a', '4a'],
      correct: 1,
      explanation: 'a\'=F\'/m\'=2F/(2m)=F/m=a。加速度不变！F 和 m 同比例增大，a 不变——a 由 F 和 m 的比值决定。',
      testsPrerequisite: null
    },
    {
      stem: '一个物体在多个力作用下做匀速直线运动。如果突然撤去其中一个力（其他力保持不变），物体将？',
      options: ['立即停止', '继续匀速直线运动', '做匀变速运动', '速度逐渐减小至零'],
      correct: 2,
      explanation: '撤去一个力后原来的平衡被打破，合力=被撤去的那个力的大小（方向相反）。有恒定合力→有恒定加速度→匀变速运动。',
      testsPrerequisite: null
    },
    {
      stem: '升降机内放置一个体重计，人站在上面。升降机以加速度 a 匀减速上升，体重计的读数____人的真实体重。',
      options: ['大于', '等于', '小于', '无法判断'],
      correct: 2,
      explanation: '匀减速上升→加速度向下→合力向下→mg-N=ma→N=mg-ma<mg→失重。推导关键：加速度方向决定超重/失重，加速度向下则失重。',
      testsPrerequisite: null
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
    },
    {
      stem: '在光滑水平面上，两个用轻绳连接的木块 A(m) 和 B(2m)，用水平力 F 拉 B。轻绳中的拉力大小为？',
      options: ['F', 'F/3', '2F/3', 'F/2'],
      correct: 1,
      explanation: '整体法求加速度：a=F/(m+2m)=F/(3m)。隔离 A 求绳拉力（内力）：T=ma=F/3。求内力用隔离法。',
      testsPrerequisite: null
    },
    {
      stem: '物体以一定的初速度冲上粗糙斜面，达到最高点后下滑。上滑时的加速度____下滑时的加速度（比较大小）。',
      options: ['大于', '等于', '小于', '无法比较'],
      correct: 0,
      explanation: '上滑：摩擦力沿斜面向下，合力=mgsinθ+f→a₁=gsinθ+μgcosθ。下滑：摩擦力沿斜面向上，合力=mgsinθ-f→a₂=gsinθ-μgcosθ。a₁>a₂。',
      testsPrerequisite: null
    },
    {
      stem: '关于超重和失重，下列说法正确的是？',
      options: ['超重就是物体变重了', '失重就是物体失去了重力', '超重和失重是视重（支持力或拉力）的变化，重力本身不变', '只有在电梯中才会出现超重和失重'],
      correct: 2,
      explanation: '超重和失重是视重（N 或 T）与重力的比较，物体的重力 mg 始终不变。任何有加速度的系统都可能出现超重或失重。',
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
  '必修一·相互作用': ['g1_gravity_elasticity', 'g1_friction', 'g1_force_synthesis', 'g1_torque_balance'],
  '必修一·牛顿运动定律': ['g1_newton_first', 'g1_newton_second', 'g1_newton_third', 'g1_newton_application']
};

console.log('📚 知识图谱加载完成: ' + Object.keys(App.knowledgeGraph).length + ' 个物理知识点');

// ===== 物理学科数据重载函数（学科切换时调用）=====
App._loadPhysicsData = function() {
  // 数据已在 data.js 加载时完成填充，此函数只需确认
  // 如果 knowledgeGraph 不是物理数据，重新执行 data.js 的初始化逻辑
  if (!App.knowledgeGraph['g1_newton_application']) {
    // 物理数据未被加载，需要重新初始化
    // 由于 data.js 在脚本加载时运行过，数据已经存在
    // 这里做一次完整性检查
    console.warn('物理知识图谱不完整，请刷新页面');
  }
};
