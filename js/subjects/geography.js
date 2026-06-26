// ===== 地理知识图谱与题库 =====
// 10个节点: 高中地理必修一核心（自然地理）
// 每节点含诊断题(6道)和练习题(4-6道)

App.knowledgeGraph = {};
App.chapterOrder = [
  '必修一·宇宙中的地球',
  '必修一·大气',
  '必修一·水',
  '必修一·地表形态'
];

// ============ 必修一·宇宙中的地球 ============

App.knowledgeGraph['geo_earth_cosmic'] = {
  id: 'geo_earth_cosmic', name: '地球的宇宙环境',
  chapter: '必修一·宇宙中的地球', grade: '高一', difficulty: 2,
  prerequisites: [],
  description: '了解天体系统的层次、太阳系的组成、地球的普通性与特殊性（存在生命的条件）',
  position: { x: 100, y: 350 },
  diagnosticQuestions: [
    { stem: '下列天体系统中，级别最高的是？', options: ['地月系', '太阳系', '银河系', '总星系'], correct: 3, explanation: '天体系统层次从低到高：地月系→太阳系→银河系→总星系（可观测宇宙）。总星系级别最高。', testsPrerequisite: null },
    { stem: '地球与太阳的距离适中，这主要有利于？', options: ['产生大气层', '形成液态水', '产生磁场', '形成地壳'], correct: 1, explanation: '日地距离适中使地球表面平均温度约15℃，有利于液态水的存在，这是生命存在的关键条件。', testsPrerequisite: null },
    { stem: '太阳系中位于小行星带两侧的行星是？', options: ['地球和火星', '火星和木星', '木星和土星', '金星和地球'], correct: 1, explanation: '小行星带位于火星轨道和木星轨道之间。内侧类地行星，外侧巨行星。', testsPrerequisite: null },
    { stem: '太阳活动的标志是？', options: ['太阳风', '黑子和耀斑', '日冕', '太阳辐射'], correct: 1, explanation: '黑子和耀斑是太阳活动的主要标志。黑子多少反映太阳活动强弱，耀斑是太阳活动最剧烈的表现。', testsPrerequisite: null },
    { stem: '地球自转的周期约为？', options: ['12小时', '24小时', '一个月', '一年'], correct: 1, explanation: '地球自转周期约24小时（一个太阳日）。自转360°为23时56分4秒（恒星日）。', testsPrerequisite: null },
    { stem: '下列关于地球的说法正确的是？', options: ['地球是太阳系中最大的行星', '地球是太阳系中唯一有生命的行星', '地球的公转方向是自东向西', '地球到太阳的距离在一年中是不变的'], correct: 1, explanation: '目前已知地球是太阳系中唯一存在生命的行星。A木星最大；C公转自西向东；D距离随公转变化（近日点/远日点）。', testsPrerequisite: null }
  ],
  practiceQuestions: [
    { stem: '地球的天然卫星是？', options: ['太阳', '月球', '火星', '金星'], correct: 1, explanation: '月球是地球唯一的天然卫星。', difficulty: 2 },
    { stem: '地球绕太阳公转产生什么现象？', options: ['昼夜交替', '四季更替', '潮汐', '地方时'], correct: 1, explanation: '公转产生四季更替和五带的划分。自转产生昼夜交替和地方时。', difficulty: 2 },
    { stem: '太阳辐射属于？', options: ['长波辐射', '短波辐射', '微波辐射', '紫外线'], correct: 1, explanation: '太阳表面温度约6000K，主要辐射短波（可见光为主）。地面辐射是长波辐射。', difficulty: 2 }
  ]
};

// --- 地球的圈层结构 ---
App.knowledgeGraph['geo_earth_layers'] = {
  id: 'geo_earth_layers', name: '地球的圈层结构',
  chapter: '必修一·宇宙中的地球', grade: '高一', difficulty: 3,
  prerequisites: ['geo_earth_cosmic'],
  description: '理解地球的内部圈层（地壳/地幔/地核）和外部圈层（大气圈/水圈/生物圈/岩石圈）',
  position: { x: 200, y: 320 },
  diagnosticQuestions: [
    { stem: '地球内部圈层中，厚度最大的是？', options: ['地壳', '地幔', '地核', '岩石圈'], correct: 1, explanation: '地幔厚度约2900km（莫霍面至古登堡面），是地球内部厚度最大的圈层。地核半径约3400km但分为内外核。', testsPrerequisite: null },
    { stem: '莫霍面是哪个两个圈层的分界面？', options: ['地壳和地幔', '地幔和地核', '岩石圈和软流层', '内核和外核'], correct: 0, explanation: '莫霍面是地壳与地幔的分界面，深度在大陆约33km，海洋约6-8km。古登堡面是地幔与地核的分界面。', testsPrerequisite: null },
    { stem: '岩石圈的范围包括？', options: ['地壳', '地壳和上地幔顶部', '整个地幔', '地壳和整个地幔'], correct: 1, explanation: '岩石圈包括地壳和上地幔顶部（即软流层以上的刚性部分）。软流层是岩浆的发源地。', testsPrerequisite: null },
    { stem: '大气圈中对流层的主要特点是？', options: ['气温随高度升高而升高', '气温随高度增加而递减', '空气以水平运动为主', '天气晴朗'], correct: 1, explanation: '对流层气温随高度递减（每上升100m约降0.6℃），空气对流运动显著，天气现象复杂多变。', testsPrerequisite: null },
    { stem: '生物圈的范围包括？', options: ['大气圈的底部、水圈的全部和岩石圈的上部', '仅水圈', '仅岩石圈表层', '整个大气圈'], correct: 0, explanation: '生物圈是地球上所有生物及其生存环境的总称，包括大气圈底部、水圈全部和岩石圈上部。', testsPrerequisite: null },
    { stem: '地球内部温度随深度增加而？', options: ['降低', '升高', '先升后降', '基本不变'], correct: 1, explanation: '地球内部温度随深度增加而升高，这就是地热增温率（地温梯度）。地核温度可达4000-6000℃。', testsPrerequisite: null }
  ],
  practiceQuestions: [
    { stem: '地球的外部圈层不包括？', options: ['大气圈', '水圈', '生物圈', '地核'], correct: 3, explanation: '地核是内部圈层。外部圈层包括大气圈、水圈、生物圈。', difficulty: 2 },
    { stem: '下列属于地球内部圈层的是？', options: ['大气圈', '水圈', '地幔', '生物圈'], correct: 2, explanation: '地幔是内部圈层。地球内部由地壳、地幔、地核组成。', difficulty: 2 },
    { stem: '对无线电通信有影响的大气层是？', options: ['对流层', '平流层', '电离层（高层大气）', '中间层'], correct: 2, explanation: '电离层能反射无线电波，对远距离无线电通信至关重要。位于高层大气中（80-500km以上）。', difficulty: 3 }
  ]
};

// ============ 必修一·大气 ============

// --- 大气的受热过程 ---
App.knowledgeGraph['geo_atmosphere_heat'] = {
  id: 'geo_atmosphere_heat', name: '大气的受热过程',
  chapter: '必修一·大气', grade: '高一', difficulty: 4,
  prerequisites: ['geo_earth_layers'],
  description: '掌握太阳辐射、地面辐射、大气逆辐射的关系，理解温室效应原理和大气保温作用',
  position: { x: 350, y: 300 },
  diagnosticQuestions: [
    { stem: '近地面大气的直接热源是？', options: ['太阳辐射', '地面辐射', '大气逆辐射', '月球辐射'], correct: 1, explanation: '太阳短波辐射大部分穿透大气到达地面，地面吸收后升温并发射长波辐射（地面辐射），大气中的CO₂和水汽强烈吸收地面长波辐射而增温。所以近地面大气的直接热源是地面辐射。', testsPrerequisite: null },
    { stem: '大气逆辐射的作用是？', options: ['使地面降温', '对地面起保温作用', '增强太阳辐射', '产生降水'], correct: 1, explanation: '大气吸收地面辐射后升温，并向四面八方辐射能量。其中向下（向地面）的部分叫大气逆辐射，它将部分热量返还给地面，起保温作用。', testsPrerequisite: null },
    { stem: '阴天的夜晚比晴天的夜晚气温高的原因是？', options: ['云层反射了太阳辐射', '云层增强了大气逆辐射', '云层减弱了地面辐射', '云层增加了太阳辐射'], correct: 1, explanation: '阴天云层厚，大气逆辐射强，保温效果好→夜晚降温慢→气温较高。晴天云少，大气逆辐射弱→夜晚降温快。', testsPrerequisite: null },
    { stem: '下列气体中温室效应最强的是？', options: ['氮气(N₂)', '氧气(O₂)', '二氧化碳(CO₂)', '氩气(Ar)'], correct: 2, explanation: 'CO₂能强烈吸收地面长波辐射，是主要的温室气体。其他温室气体还有甲烷(CH₄)、水汽(H₂O)等。N₂和O₂基本不吸收长波辐射。', testsPrerequisite: null },
    { stem: '"早穿皮袄午穿纱"反映的地理现象是？', options: ['气温日较差大', '气温年较差大', '降水充沛', '风力强劲'], correct: 0, explanation: '我国西北内陆干旱地区（如新疆），空气干燥且晴朗天多，白天太阳辐射强温度高，夜晚大气逆辐射弱降温快，气温日较差大。', testsPrerequisite: null },
    { stem: '大气对太阳辐射的削弱作用不包括？', options: ['吸收', '反射', '散射', '折射'], correct: 3, explanation: '大气对太阳辐射的削弱方式有三种：吸收（如O₃吸收紫外线）、反射（云层反射）、散射（空气分子选择性散射蓝紫光→天空呈蓝色）。折射只是改变方向不削弱能量。', testsPrerequisite: null }
  ],
  practiceQuestions: [
    { stem: '大气逆辐射主要发生在什么波段？', options: ['可见光', '紫外线', '红外线（长波）', 'X射线'], correct: 2, explanation: '大气辐射和大气逆辐射都是长波辐射（红外线波段）。太阳辐射主要是短波辐射。', difficulty: 2 },
    { stem: '温室气体增多会导致？', options: ['全球变冷', '全球变暖', '海平面下降', '无影响'], correct: 1, explanation: '温室气体增多→大气逆辐射增强→地面保温作用增强→全球变暖→冰川融化→海平面上升。', difficulty: 2 },
    { stem: '天气晴朗时天空呈蓝色是因为？', options: ['大气吸收蓝光', '大气反射蓝光', '大气散射蓝光', '太阳本身是蓝色的'], correct: 2, explanation: '大气分子对波长较短的蓝紫光散射作用强，所以晴朗天空呈蓝色。日出日落时阳光斜射路径长，蓝光被散射殆尽只剩红橙光。', difficulty: 3 }
  ]
};

// --- 热力环流与风 ---
App.knowledgeGraph['geo_thermal_wind'] = {
  id: 'geo_thermal_wind', name: '热力环流与风',
  chapter: '必修一·大气', grade: '高一', difficulty: 4,
  prerequisites: ['geo_atmosphere_heat'],
  description: '理解热力环流的形成原理、海陆风/山谷风/城市热岛效应、近地面风向的判断',
  position: { x: 430, y: 260 },
  diagnosticQuestions: [
    { stem: '热力环流形成的根本原因是？', options: ['地势高低不同', '太阳辐射的纬度差异→地面冷热不均', '海拔高度不同', '大气成分不同'], correct: 1, explanation: '太阳辐射在地球表面的分布不均导致各地受热不同→地面冷热不均→空气垂直运动→同一水平面气压差→水平气压梯度力→空气水平运动（风）→热力环流。', testsPrerequisite: null },
    { stem: '白天吹海风还是陆风？', options: ['海风（从海洋吹向陆地）', '陆风（从陆地吹向海洋）', '无风', '无法确定'], correct: 0, explanation: '白天陆地增温快→近地面空气受热上升→形成低压；海洋增温慢→相对高压。近地面风从海洋(高压)吹向陆地(低压)，即海风。', testsPrerequisite: null },
    { stem: '城市热岛效应是指？', options: ['城市气温低于郊区', '城市气温高于郊区', '城市降水少于郊区', '城市风速大于郊区'], correct: 1, explanation: '城市建筑物密集、人口多、工业集中→人为热排放多→城市气温高于郊区（热岛效应）。形成城市风：近地面风从郊区吹向城市。', testsPrerequisite: null },
    { stem: '近地面风向与等压线的关系是？', options: ['平行', '垂直', '斜交（有一定夹角）', '无规律'], correct: 2, explanation: '近地面风受水平气压梯度力+地转偏向力+摩擦力共同作用，风向与等压线斜交。高空（无摩擦力）风向与等压线平行。', testsPrerequisite: null },
    { stem: '北半球近地面，背风而立，高压在？', options: ['左前方', '右后方', '正前方', '正后方'], correct: 1, explanation: '北半球地转偏向力向右。风从高压吹向低压，受地转偏向力右偏。背风而立→风从后背来→高压在右后方。口诀："背风而立，高压在右（北半球）"。', testsPrerequisite: null },
    { stem: '下列哪个不属于局地热力环流？', options: ['海陆风', '山谷风', '城市风', '台风'], correct: 3, explanation: '台风是热带气旋，属于天气系统（大气环流尺度），不是小尺度的局地热力环流。海陆风、山谷风、城市风都是局地热力环流。', testsPrerequisite: null }
  ],
  practiceQuestions: [
    { stem: '形成风的直接原因是？', options: ['地球自转', '水平气压梯度力', '地转偏向力', '摩擦力'], correct: 1, explanation: '水平气压梯度力是形成风的直接原因和原动力。地转偏向力只改变风向不改变风速。', difficulty: 2 },
    { stem: '夜晚山谷吹什么风？', options: ['谷风（从山谷吹向山坡）', '山风（从山坡吹向山谷）', '无风', '旋风'], correct: 1, explanation: '夜晚山坡降温快→冷空气下沉→沿山坡吹向山谷（山风）。白天山坡升温快→空气沿山坡上升→谷风。', difficulty: 3 },
    { stem: '等压线越密集，表示？', options: ['气压梯度越小', '气压梯度越大，风速越大', '越接近低压中心', '越接近高压中心'], correct: 1, explanation: '等压线密集→单位距离气压差大→水平气压梯度力大→风速大。', difficulty: 2 }
  ]
};

// --- 气压带与风带 ---
App.knowledgeGraph['geo_pressure_belts'] = {
  id: 'geo_pressure_belts', name: '气压带与风带',
  chapter: '必修一·大气', grade: '高一', difficulty: 5,
  prerequisites: ['geo_thermal_wind'],
  description: '掌握全球七个气压带和六个风带的分布及成因、气压带风带的季节移动规律',
  position: { x: 500, y: 200 },
  diagnosticQuestions: [
    { stem: '赤道地区属于什么气压带？', options: ['赤道高气压带', '赤道低气压带', '副热带高气压带', '副极地低气压带'], correct: 1, explanation: '赤道地区终年高温→空气受热膨胀上升→近地面形成低气压，即赤道低气压带（热力成因）。上升气流多对流雨。', testsPrerequisite: null },
    { stem: '副热带高气压带的成因是？', options: ['热力原因（受热上升）', '动力原因（气流堆积下沉）', '地形原因', '海陆分布原因'], correct: 1, explanation: '赤道上升气流在高空向两极输送，受地转偏向力在副热带（约30°）堆积→下沉→形成副热带高气压带（动力成因）。热力成因的气压带只有赤道低气压带和极地高气压带。', testsPrerequisite: null },
    { stem: '我国东部季风区夏季盛行什么风？', options: ['西北风', '东南风', '东北风', '西南风'], correct: 1, explanation: '夏季亚欧大陆升温→形成亚洲低压（印度低压）→北太平洋为高压→风从海洋吹向陆地，受地转偏向力右偏→东亚夏季风为东南风。', testsPrerequisite: null },
    { stem: '气压带风带随太阳直射点如何移动？', options: ['不移动', '夏季北移5-10°，冬季南移5-10°', '仅冬季移动', '仅夏季移动'], correct: 1, explanation: '气压带风带随太阳直射点的季节移动而移动：北半球夏季整体北移5-10°，冬季南移5-10°。这导致地中海气候区冬湿夏干。', testsPrerequisite: null },
    { stem: '南半球的西风带风向是？', options: ['西北风', '西南风', '东北风', '东南风'], correct: 0, explanation: '南半球副热带高压气流向副极地低压流动，受地转偏向力左偏→形成西北风（盛行西风）。南半球的西风带是西北风。', testsPrerequisite: null },
    { stem: '赤道无风带是指？', options: ['副热带高压带', '赤道低压带（赤道辐合带）', '极地高压带', '西风带'], correct: 1, explanation: '赤道低气压带空气以垂直上升为主，水平运动微弱，风力小，故称赤道无风带（Doldrums）。位于赤道附近（南北纬5°之间）。', testsPrerequisite: null }
  ],
  practiceQuestions: [
    { stem: '全球共几个气压带？', options: ['4个', '6个', '7个', '8个'], correct: 2, explanation: '7个气压带：南北对称各3个+赤道1个=赤道低压带+南北副热带高压带(2)+南北副极地低压带(2)+南北极地高压带(2)。', difficulty: 2 },
    { stem: '信风带的风向在北半球是？', options: ['东南风', '东北风', '西北风', '西南风'], correct: 1, explanation: '副热带高压带的气流向赤道低压流动，北半球受地转偏向力右偏→东北信风。南半球为东南信风。', difficulty: 2 },
    { stem: '地中海气候受什么交替控制？', options: ['赤道低压和信风', '副热带高压和西风', '副极地低压和极地高压', '季风'], correct: 1, explanation: '地中海气候：夏季受副热带高压控制(炎热干燥)，冬季受西风带控制(温和多雨)。', difficulty: 3 }
  ]
};

// --- 常见的天气系统 ---
App.knowledgeGraph['geo_weather_systems'] = {
  id: 'geo_weather_systems', name: '常见的天气系统',
  chapter: '必修一·大气', grade: '高一', difficulty: 4,
  prerequisites: ['geo_pressure_belts'],
  description: '掌握冷锋、暖锋、准静止锋的天气变化特点、气旋与反气旋的判断',
  position: { x: 580, y: 160 },
  diagnosticQuestions: [
    { stem: '冷锋过境后，天气变化为？', options: ['气温升高、气压降低', '气温降低、气压升高', '气温不变', '气温升高、气压升高'], correct: 1, explanation: '冷锋是冷气团主动向暖气团移动。过境后冷气团控制→气温下降、气压升高、天气转晴。过境时常有大风、雨雪、降温。', testsPrerequisite: null },
    { stem: '形成我国北方春季沙尘暴的天气系统是？', options: ['暖锋', '冷锋', '准静止锋', '反气旋'], correct: 1, explanation: '春季冷锋过境带来大风，加上北方地表干燥、植被少→大风扬起沙尘→沙尘暴。', testsPrerequisite: null },
    { stem: '北半球气旋的水平气流方向是？', options: ['顺时针辐合', '逆时针辐合', '顺时针辐散', '逆时针辐散'], correct: 1, explanation: '气旋（低压中心）：气流向中心辐合，北半球受地转偏向力右偏→逆时针旋转。反气旋（高压中心）：辐散，北半球顺时针。', testsPrerequisite: null },
    { stem: '江淮地区的"梅雨"是由什么天气系统造成的？', options: ['冷锋', '暖锋', '准静止锋', '台风'], correct: 2, explanation: '江淮准静止锋（又称梅雨锋）在6-7月停留于江淮地区→冷暖气团势均力敌→长期阴雨连绵→"梅雨"。', testsPrerequisite: null },
    { stem: '台风中心（台风眼）的天气特点为？', options: ['狂风暴雨', '风平浪静、天气晴朗', '沙尘天气', '大雾弥漫'], correct: 1, explanation: '台风眼（台风中心）气压极低，但气流下沉，风力微弱，天气相对晴朗平静。台风眼壁区（眼墙）才是狂风暴雨最猛烈的区域。', testsPrerequisite: null },
    { stem: '下列哪个属于反气旋控制下的天气？', options: ['台风雨', '伏旱（高温干燥）', '梅雨', '寒潮'], correct: 1, explanation: '反气旋（高压）中心气流下沉→天气晴朗干燥。我国长江流域7-8月的伏旱就是受副热带高压（反气旋）控制。', testsPrerequisite: null }
  ],
  practiceQuestions: [
    { stem: '暖锋过境时的降水特点？', options: ['狂风暴雨', '连续性降水', '无降水', '冰雹'], correct: 1, explanation: '暖锋移动慢，暖气团沿冷气团爬升→形成大范围的连续性降水（细雨绵绵），降水多发生在锋前。', difficulty: 2 },
    { stem: '气旋中心的气压是？', options: ['高压', '低压', '正常气压', '无法确定'], correct: 1, explanation: '气旋即低压中心，气流向中心辐合上升。台风（热带气旋）是一种强烈发展的气旋。', difficulty: 2 },
    { stem: '冷锋与暖锋的区别主要看？', options: ['移动速度', '哪个气团主动移动', '降水强度', '发生季节'], correct: 1, explanation: '冷锋是冷气团推动锋面向暖气团移动；暖锋是暖气团推动锋面向冷气团移动。符号：冷锋三角、暖锋半圆。', difficulty: 2 }
  ]
};

// ============ 必修一·水 ============

// --- 水循环 ---
App.knowledgeGraph['geo_water_cycle'] = {
  id: 'geo_water_cycle', name: '水循环',
  chapter: '必修一·水', grade: '高一', difficulty: 3,
  prerequisites: ['geo_atmosphere_heat'],
  description: '理解海陆间循环、陆地内循环、海上内循环的过程与环节、水循环的地理意义',
  position: { x: 320, y: 140 },
  diagnosticQuestions: [
    { stem: '水循环中，联系海陆之间最重要的环节是？', options: ['蒸发', '水汽输送', '降水', '地表径流'], correct: 1, explanation: '水汽输送将海洋蒸发的水汽输送到陆地上空，是海陆间循环的关键环节，实现了海洋水与陆地水的交换。', testsPrerequisite: null },
    { stem: '下列人类活动影响水循环环节正确的是？', options: ['修建水库影响水汽输送', '植树造林增加地表径流', '铺设水泥路面增加下渗', '跨流域调水改变地表径流的空间分布'], correct: 3, explanation: '跨流域调水（如南水北调）改变地表径流的空间分配。A水库影响径流；B植树造林增加下渗减少径流；C水泥路面减少下渗增加径流。', testsPrerequisite: null },
    { stem: '水循环的能量来源是？', options: ['地球内能', '太阳能和重力能', '风能', '潮汐能'], correct: 1, explanation: '水循环的能量主要来自太阳辐射（驱动蒸发）和重力（驱动降水下落、径流）。太阳辐射是根本动力。', testsPrerequisite: null },
    { stem: '塔里木河参与的水循环类型主要是？', options: ['海陆间循环', '陆地内循环', '海上内循环', '全球循环'], correct: 1, explanation: '塔里木河是内流河→河水最终不流入海洋→主要参与陆地内循环（蒸发→降水→径流→蒸发，循环在陆地内部完成）。', testsPrerequisite: null },
    { stem: '城市内涝频发的主要人为原因是？', options: ['降水增多', '地面硬化面积扩大→下渗减少', '气温升高', '风速增大'], correct: 1, explanation: '城市化→大面积地面硬化（水泥/沥青）→雨水下渗减少→地表径流增加→排水系统压力增大→城市内涝。', testsPrerequisite: null },
    { stem: '"黄河之水天上来，奔流到海不复回"描述的水循环环节不包括？', options: ['降水', '地表径流', '水汽输送和蒸发', '下渗'], correct: 3, explanation: '"天上来"→降水；"奔流"→地表径流；"到海"→汇入海洋。整个海陆间循环还需水汽输送和蒸发完成闭环。下渗在此句未体现。', testsPrerequisite: null }
  ],
  practiceQuestions: [
    { stem: '水循环的三种类型是？', options: ['海陆间循环、陆地内循环、海上内循环', '大循环、小循环、微循环', '地表循环、地下循环、空中循环', '淡水循环、咸水循环'], correct: 0, explanation: '按发生范围分为：海陆间循环（最重要）、陆地内循环、海上内循环。', difficulty: 2 },
    { stem: '地表径流的最终归宿不可能是？', options: ['海洋', '内陆湖泊', '沙漠', '外太空'], correct: 3, explanation: '地表径流最终汇入海洋、内陆湖或消失在沙漠中（下渗蒸发）。水循环发生在大气圈-水圈-岩石圈-生物圈内。', difficulty: 2 },
    { stem: '增加城市雨水下渗的措施不包括？', options: ['铺设透水砖', '建设雨水花园', '扩大水泥路面', '增加绿地面积'], correct: 2, explanation: '扩大水泥路面会减少下渗、增加径流。透水砖/雨水花园/绿地都能增加下渗。', difficulty: 2 }
  ]
};

// --- 海水的运动 ---
App.knowledgeGraph['geo_ocean'] = {
  id: 'geo_ocean', name: '海水的性质与运动',
  chapter: '必修一·水', grade: '高一', difficulty: 3,
  prerequisites: ['geo_water_cycle'],
  description: '掌握海水温度/盐度的分布规律、波浪/潮汐/洋流的成因、洋流对地理环境的影响',
  position: { x: 420, y: 100 },
  diagnosticQuestions: [
    { stem: '世界大洋表层盐度最高的海区是？', options: ['赤道附近', '副热带海区', '高纬度海区', '极地海区'], correct: 1, explanation: '副热带海区（南北纬20°-30°）蒸发量远大于降水量→盐度最高。赤道附近降水量大→盐度稍低。极地融冰稀释→盐度最低。', testsPrerequisite: null },
    { stem: '洋流形成的根本原因是？', options: ['地球自转', '大气运动（风）', '海水密度差异', '月球引力'], correct: 1, explanation: '大气运动（风）是形成洋流的主要动力。风海流（如西风漂流）是大洋表层最主要的洋流类型。', testsPrerequisite: null },
    { stem: '暖流对沿岸气候的影响是？', options: ['降温减湿', '增温增湿', '无影响', '增温减湿'], correct: 1, explanation: '暖流从低纬流向高纬→水温高于周围海水→空气升温增湿→沿岸气候温和湿润。如北大西洋暖流使西欧温暖。', testsPrerequisite: null },
    { stem: '寒暖流交汇处容易形成？', options: ['沙漠', '大渔场', '台风', '火山'], correct: 1, explanation: '寒暖流交汇→海水扰动→营养盐上泛→浮游生物繁盛→鱼类饵料丰富→形成大渔场。如北海道渔场（日本暖流+千岛寒流）、纽芬兰渔场。', testsPrerequisite: null },
    { stem: '潮汐现象的主要成因是？', options: ['风力', '月球和太阳的引力', '地球自转', '海水密度变化'], correct: 1, explanation: '潮汐主要由月球引力（占主要）和太阳引力引起。天文大潮发生在朔望（日月地一线引力叠加）。', testsPrerequisite: null },
    { stem: '秘鲁寒流属于什么类型的洋流？', options: ['风海流', '密度流', '补偿流', '暖流'], correct: 2, explanation: '秘鲁寒流是上升补偿流。离岸风（东南信风）将表层海水吹离海岸→深层冷水上涌补充→形成寒流。上升流带来丰富营养盐→形成秘鲁渔场。', testsPrerequisite: null }
  ],
  practiceQuestions: [
    { stem: '影响海水盐度的最主要因素是？', options: ['蒸发量与降水量之差', '洋流', '潮汐', '海水温度'], correct: 0, explanation: '蒸发量与降水量之差是决定表层海水盐度的最主要因素。此外河流淡水注入、海冰形成也影响盐度。', difficulty: 2 },
    { stem: '世界著名渔场多分布在？', options: ['大洋中央', '寒暖流交汇处或上升流海域', '赤道无风带', '深海区'], correct: 1, explanation: '寒暖流交汇和上升流区营养盐丰富→浮游生物多→鱼类聚集→形成渔场。', difficulty: 2 },
    { stem: '北印度洋海区冬季洋流流向？', options: ['顺时针', '逆时针', '自西向东', '自南向北'], correct: 1, explanation: '北印度洋季风洋流：冬季吹东北季风→海水向西流→逆时针环流；夏季吹西南季风→顺时针环流。', difficulty: 3 }
  ]
};

// ============ 必修一·地表形态 ============

// --- 塑造地表形态的力量 ---
App.knowledgeGraph['geo_landform'] = {
  id: 'geo_landform', name: '塑造地表形态',
  chapter: '必修一·地表形态', grade: '高一', difficulty: 4,
  prerequisites: ['geo_earth_layers'],
  description: '理解内力作用（地壳运动/岩浆活动/变质作用）和外力作用（风化/侵蚀/搬运/堆积）对地表形态的影响',
  position: { x: 520, y: 60 },
  diagnosticQuestions: [
    { stem: '喜马拉雅山脉的成因是？', options: ['火山喷发', '板块碰撞挤压', '流水侵蚀', '风力堆积'], correct: 1, explanation: '喜马拉雅山脉是印度板块与亚欧板块碰撞挤压→地壳褶皱隆起→形成高大褶皱山脉。目前仍在缓慢抬升中。', testsPrerequisite: null },
    { stem: '黄土高原千沟万壑的地表形态主要由什么作用形成？', options: ['内力作用', '流水侵蚀', '风力堆积', '冰川作用'], correct: 1, explanation: '黄土高原土质疏松，植被稀少，夏季暴雨→流水侵蚀作用强烈→形成千沟万壑的地表形态。', testsPrerequisite: null },
    { stem: '下列地貌中属于外力作用形成的是？', options: ['东非大裂谷', '雅丹地貌（风蚀地貌）', '富士山', '喜马拉雅山'], correct: 1, explanation: '雅丹地貌由风力侵蚀形成，属于外力作用。东非大裂谷是板块张裂（内力），富士山是火山喷发（内力），喜马拉雅是板块碰撞（内力）。', testsPrerequisite: null },
    { stem: '河流在入海口形成三角洲属于什么作用？', options: ['侵蚀作用', '搬运作用', '堆积（沉积）作用', '风化作用'], correct: 2, explanation: '河流到达入海口→流速骤降→泥沙大量沉积→形成三角洲（堆积地貌）。长江三角洲、珠江三角洲都是流水堆积地貌。', testsPrerequisite: null },
    { stem: '喀斯特地貌的成因是？', options: ['风力侵蚀', '流水化学溶蚀', '冰川侵蚀', '海浪侵蚀'], correct: 1, explanation: '喀斯特地貌是石灰岩（CaCO₃）在流水长期化学溶蚀作用下形成的地貌，包括溶洞、石林、峰林等。我国桂林最为典型。', testsPrerequisite: null },
    { stem: '造成"U形谷"的主要地质作用是？', options: ['河流侵蚀', '冰川侵蚀', '风力侵蚀', '海浪侵蚀'], correct: 1, explanation: '冰川在移动过程中对谷底和谷壁进行刨蚀→将原来的"V形谷"拓宽加深形成"U形谷"。这是冰川侵蚀的典型地貌。', testsPrerequisite: null }
  ],
  practiceQuestions: [
    { stem: '内力作用的能量主要来自？', options: ['太阳辐射', '地球内部（放射性元素衰变）', '潮汐能', '风能'], correct: 1, explanation: '内力作用的能量来自地球内部，主要是放射性元素衰变产生的热能。外力作用的能量主要来自太阳辐射。', difficulty: 2 },
    { stem: '风蚀蘑菇是由什么作用形成的？', options: ['流水侵蚀', '风力侵蚀', '冰川侵蚀', '海浪侵蚀'], correct: 1, explanation: '风蚀蘑菇是风力侵蚀地貌。风携带的砂粒磨蚀岩石下部→下部被侵蚀更快→形成上大下小的蘑菇状形态。', difficulty: 2 },
    { stem: '"V形谷"是典型的什么地貌？', options: ['冰川侵蚀', '河流下切侵蚀', '风力侵蚀', '海浪侵蚀'], correct: 1, explanation: '河流上游落差大，流速快，下切侵蚀强烈→形成深窄的V形谷。中下游侧蚀加强→河谷逐渐变宽。', difficulty: 2 },
    { stem: '下列属于堆积地貌的是？', options: ['喀斯特溶洞', '冲积扇', '风蚀蘑菇', 'V形谷'], correct: 1, explanation: '冲积扇是河流出山口→流速骤降→泥沙堆积→形成扇形堆积体。溶洞是溶蚀、蘑菇是风蚀、V形谷是侵蚀。', difficulty: 3 }
  ]
};

// ===== 章节-知识点映射 =====
App.chapterNodes = {
  '必修一·宇宙中的地球': ['geo_earth_cosmic', 'geo_earth_layers'],
  '必修一·大气': ['geo_atmosphere_heat', 'geo_thermal_wind', 'geo_pressure_belts', 'geo_weather_systems'],
  '必修一·水': ['geo_water_cycle', 'geo_ocean'],
  '必修一·地表形态': ['geo_landform']
};

console.log('🌍 地理知识图谱加载完成: ' + Object.keys(App.knowledgeGraph).length + ' 个知识点');
