// ===== 数学知识图谱与题库 =====
// 12个节点: 必修一核心 + 必修二核心
// 每节点含诊断题(6道)和练习题(4-6道)

App.knowledgeGraph = {};
App.chapterOrder = [
  '高一上·集合与命题',
  '高一上·不等式',
  '高一上·函数',
  '高一上·指数与对数',
  '高一下·三角函数',
  '高一下·数列',
  '高一下·矩阵与行列式',
  '高一下·向量与复数'
];

// ============ 必修一·集合与逻辑 ============

App.knowledgeGraph['math_set_logic'] = {
  id: 'math_set_logic', name: '集合与常用逻辑',
  chapter: '必修一·集合与逻辑', grade: '高一', difficulty: 2,
  prerequisites: [],
  description: '掌握集合的表示法、子集/真子集、交并补运算；理解充分条件、必要条件、充要条件的判断方法',
  position: { x: 100, y: 300 },
  diagnosticQuestions: [
    { stem: '已知集合A={1,2,3}，B={x|x²-3x+2=0}，则A∩B=？', options: ['{1}', '{2}', '{1,2}', '∅'], correct: 2, explanation: 'B={x|(x-1)(x-2)=0}={1,2}，A∩B={1,2,3}∩{1,2}={1,2}。', testsPrerequisite: null },
    { stem: '设集合A={x|-1<x≤3}，B={x|x>1}，则A∪(∁ᴿB)=？', options: ['{x|x≤3}', '{x|-1<x≤1}', '{x|x>-1}', '{x|x≤1或x>3}'], correct: 0, explanation: '∁ᴿB={x|x≤1}，A∪(∁ᴿB)={x|-1<x≤3}∪{x|x≤1}={x|x≤3}。', testsPrerequisite: null },
    { stem: '"x>1"是"x²>1"的什么条件？', options: ['充分不必要', '必要不充分', '充要', '既不充分也不必要'], correct: 0, explanation: 'x>1⇒x²>1(充分)，但x²>1⇒x>1或x<-1，推不出x>1(不必要)。', testsPrerequisite: null },
    { stem: '设全集U=R，A={x||x|<2}，则∁ᵤA=？', options: ['{x|x<-2或x>2}', '{x|x≤-2或x≥2}', '{x|-2<x<2}', '{x|-2≤x≤2}'], correct: 1, explanation: 'A={x|-2<x<2}，补集为{x|x≤-2或x≥2}。注意端点包含与否。', testsPrerequisite: null },
    { stem: '命题"任意x∈R，x²+1≥1"的否定是？', options: ['任意x∈R，x²+1<1', '存在x∈R，x²+1≤1', '存在x∈R，x²+1<1', '任意x∈R，x²+1≤1'], correct: 2, explanation: '全称量词"任意"的否定是"存在"，"≥"的否定是"<"。得"存在x∈R，x²+1<1"。', testsPrerequisite: null },
    { stem: '若A⊆B，B⊆C，则下列关系一定成立的是？', options: ['A⊇C', 'A⊆C', 'A=C', 'A∩C=∅'], correct: 1, explanation: '子集关系具有传递性：A⊆B且B⊆C⇒A⊆C。', testsPrerequisite: null },
    { stem: '设集合 A={x|mx+1=0}，B={x|x²-2x-3=0}。若 A⊆B，则实数 m 的取值集合为？', options: ['{ -1/3, 1 }', '{ 0, -1/3, 1 }', '{ 0, 1/3, -1 }', '{ 1/3, -1 }'], correct: 1, explanation: 'B={3,-1}。当m=0时A=∅⊆B成立(空集是任何集合的子集，学生极易遗漏)。当m≠0时A={-1/m}，需-1/m=3得m=-1/3，或-1/m=-1得m=1。故m∈{0,-1/3,1}。', testsPrerequisite: null },
    { stem: '设集合 P={ (x,y) | x+y=2 }，Q={ y | x+y=2 }，则 P 与 Q 的关系是？', options: ['P=Q', 'P⊆Q', 'Q⊆P', 'P和Q是不同类型的集合，无法比较'], correct: 3, explanation: 'P是点集(代表直线上点的坐标对)，Q是数集(全体实数)。点集与数集元素类型不同，无法比较包含关系或相等关系。这是点集与数集的典型混淆陷阱。', testsPrerequisite: null },
    { stem: '已知集合 A={ 1, a+1, a²+1 }，且 2∈A，则实数 a 的值为？', options: ['1', '-1', '1或-1', '0'], correct: 1, explanation: '若a+1=2则a=1，此时A={1,2,2}含重复元素2，不符合互异性，排除。若a²+1=2则a²=1⇒a=±1。a=1已排除，a=-1代入得A={1,0,2}满足互异性。故a=-1。互异性是检验元素是否重复的关键。', testsPrerequisite: null },
    { stem: '已知集合M={x|x=3k+1,k∈Z}，N={x|x=3k-2,k∈Z}，则M与N的关系是？', options: ['M⊆N', 'N⊆M', 'M=N', 'M∩N=∅'], correct: 2, explanation: 'N={x|x=3k-2,k∈Z}：k=0⇒-2，k=1⇒1，k=2⇒4⋯即N={⋯,-2,1,4,⋯}=3k+1形式。M={⋯,1,4,7,⋯}。故M=N。', testsPrerequisite: null },
    { stem: '命题"若x²=1，则x=1"的否定是？', options: ['若x²≠1，则x≠1', '存在x²=1，使得x≠1', '存在x≠1，使得x²=1', '任意x²=1，x=1'], correct: 1, explanation: '命题的否定只否定结论，但原命题是"若p则q"形式，其否定是"存在p且非q"。"若x²=1则x=1"即"∀x，若x²=1则x=1"，否定为"∃x使得x²=1且x≠1"。注意与"否命题"的区别。', testsPrerequisite: null }
  ],
  practiceQuestions: [
    { stem: '设A={1,2,3}，B={2,3,4}，则A∪B=？', options: ['{2,3}', '{1,2,3,4}', '{1,4}', '{1,2,3}'], correct: 1, explanation: '并集取所有元素：{1,2,3,4}。', difficulty: 2 },
    { stem: 'A={x|x是小于5的自然数}，用列举法表示为？', options: ['{0,1,2,3,4}', '{1,2,3,4}', '{0,1,2,3,4,5}', '{0,1,2,3,4,5}'], correct: 0, explanation: '自然数从0开始，小于5即0,1,2,3,4。', difficulty: 2 },
    { stem: '"a=0"是"ab=0"的什么条件？', options: ['充分不必要', '必要不充分', '充要', '既不充分也不必要'], correct: 0, explanation: 'a=0⇒ab=0(充分)，但ab=0不一定a=0(b可能为0)(不必要)。', difficulty: 2 },
    { stem: '若A={1,3,5}，则A的子集个数为？', options: ['3', '6', '8', '9'], correct: 2, explanation: 'n元集合的子集个数=2ⁿ。3个元素→2³=8个子集。', difficulty: 3 },
    { stem: '命题"若x>2，则x²>4"的逆否命题是？', options: ['若x≤2，则x²≤4', '若x²>4，则x>2', '若x²≤4，则x≤2', '若x²<4，则x<2'], correct: 2, explanation: '逆否命题为"若非q则非p"。"x²>4"的否定是"x²≤4"，"x>2"的否定是"x≤2"。故为"若x²≤4，则x≤2"。注意"A的逆否B"与"B的逆否A"互为逆否，等价。', difficulty: 2 },
    { stem: '"a>b"是"a²>b²"的什么条件？', options: ['充分不必要', '必要不充分', '充要', '既不充分也不必要'], correct: 3, explanation: '取反例：a=1,b=-2满足a>b但a²=1<b²=4，故不充分；a=-3,b=1满足a²>b²但a<b，故不必要。既不充分也不必要。', difficulty: 2 },
    { stem: '命题"所有实数的平方都大于0"的否定是？', options: ['所有实数的平方都小于等于0', '存在一个实数的平方小于等于0', '存在一个实数的平方大于0', '存在一个实数的平方小于0'], correct: 1, explanation: '全称命题"∀x∈R,x²>0"的否定为"∃x∈R,x²≤0"。注意两点：量词"所有"变"存在"，结论"大于0"的否定是"小于等于0"(而非"小于0")。', difficulty: 2 },
    { stem: '集合A={a,b,c}，则满足B⊆A且B恰有两个元素的集合B的个数为？', options: ['2', '3', '4', '6'], correct: 1, explanation: '从3个元素中选2个组成子集，组合数C(3,2)=3。即{a,b}、{a,c}、{b,c}。', difficulty: 2 },
    { stem: '已知p: x²-5x+6=0，q: x=2，则p是q的什么条件？', options: ['充分不必要', '必要不充分', '充要', '既不充分也不必要'], correct: 1, explanation: 'p⇒x=2或x=3，不能推出q(因x可能为3)，故不充分。q⇒x=2则必有x²-5x+6=0，故必要。p是q的必要不充分条件。注意判定方向：p是条件，q是结论。', difficulty: 2 },
    { stem: '已知集合A={x|ax+1=0}，B={x|x²-1=0}，若A⊆B，则a的取值集合为？', options: ['{-1,1}', '{0,-1,1}', '{0,1}', '{1}'], correct: 1, explanation: 'B={-1,1}。当a=0时A=∅⊆B成立——这是空集陷阱，极易遗漏。当a≠0时A={-1/a}，需-1/a=-1⇒a=1或-1/a=1⇒a=-1。故a∈{0,-1,1}。', difficulty: 4 },
    { stem: '命题"若a>b，则ac>bc"的逆命题是？', options: ['若ac>bc，则a>b', '若a≤b，则ac≤bc', '若ac≤bc，则a≤b', '若ac>bc，则a<b'], correct: 0, explanation: '逆命题交换条件和结论："若ac>bc，则a>b"。', difficulty: 2 }
  ]
};

// --- 函数概念与表示 ---
App.knowledgeGraph['math_func_concept'] = {
  id: 'math_func_concept', name: '函数概念与表示',
  chapter: '必修一·函数', grade: '高一', difficulty: 3,
  prerequisites: ['math_set_logic'],
  description: '理解函数的三要素(定义域、值域、对应法则)，掌握函数定义域的求法，会求简单函数的值域',
  position: { x: 250, y: 250 },
  diagnosticQuestions: [
    { stem: '函数f(x)=√(x-1)+1/(x-2)的定义域为？', options: ['[1,2)∪(2,+∞)', '(1,2)∪(2,+∞)', '[1,+∞)', '(1,+∞)'], correct: 0, explanation: 'x-1≥0⇒x≥1，x-2≠0⇒x≠2。取交集：[1,2)∪(2,+∞)。', testsPrerequisite: null },
    { stem: '已知f(x+1)=x²+2x+3，则f(x)的解析式为？', options: ['x²+2', 'x²+2x+2', 'x²-2x+3', 'x²+2x+3'], correct: 0, explanation: '令t=x+1⇒x=t-1，f(t)=(t-1)²+2(t-1)+3=t²-2t+1+2t-2+3=t²+2，即f(x)=x²+2。', testsPrerequisite: null },
    { stem: '下列各组函数表示同一函数的是？', options: ['f(x)=x与g(x)=|x|', 'f(x)=1与g(x)=x⁰', 'f(x)=x与g(x)=(√x)²', 'f(x)=|x|与g(x)=√(x²)'], correct: 3, explanation: '√(x²)=|x|，定义域和对应关系都相同。A值域不同；B定义域不同(x⁰要求x≠0)；C定义域不同((√x)²要求x≥0)。', testsPrerequisite: null },
    { stem: '函数f(x)=2x/(x²+1)的值域为？', options: ['[-1,1]', '[-2,2]', '[0,1]', '[-1,0]'], correct: 0, explanation: '令y=2x/(x²+1)⇒yx²-2x+y=0。Δ=4-4y²≥0⇒y²≤1⇒-1≤y≤1。当x=±1时取极值。', testsPrerequisite: null },
    { stem: '设f(x)的定义域为[0,1]，则f(x²)的定义域为？', options: ['[0,1]', '[-1,1]', '[0,√1]', '(-1,1)'], correct: 1, explanation: 'f(x²)中要求x²∈[0,1]⇒0≤x²≤1⇒-1≤x≤1。', testsPrerequisite: null },
    { stem: '已知f(x)=x²-2x+3，x∈[0,3]，则f(x)的最小值为？', options: ['2', '3', '1', '6'], correct: 0, explanation: 'f(x)=(x-1)²+2，对称轴x=1。区间[0,3]上：f(0)=3，f(1)=2，f(3)=6。最小值为2。', testsPrerequisite: null },
    { stem: '函数f(x)=√(4-x²)/lg(x+1)的定义域为？', options: ['(-1,0)∪(0,2]', '(-1,0)∪(0,2]', '(-1,0)∪(0,2)', '[-2,2]'], correct: 1, explanation: '4-x²≥0⇒-2≤x≤2；x+1>0⇒x>-1；lg(x+1)≠0⇒x+1≠1⇒x≠0。取交集得(-1,0)∪(0,2]。注意：对数的真数>0且底数不为1。', testsPrerequisite: null },
    { stem: '函数f(x)=|x+2|/(x+2)的值域为？', options: ['{1,-1}', '(-1,1)', '{0,1}', 'R'], correct: 0, explanation: '定义域x≠-2。当x>-2时f(x)=1；当x<-2时f(x)=-1。值域为{1,-1}。分段函数在分段点处不连续，需注意定义域限制。', testsPrerequisite: null },
    { stem: '已知f(x)是二次函数，且f(0)=3，f(1)=4，f(-1)=6，则f(2)=？', options: ['9', '7', '11', '5'], correct: 0, explanation: '设f(x)=ax²+bx+c。f(0)=c=3。f(1)=a+b+3=4⇒a+b=1。f(-1)=a-b+3=6⇒a-b=3。解得a=2,b=-1。f(x)=2x²-x+3，f(2)=8-2+3=9。', testsPrerequisite: null }
  ],
  practiceQuestions: [
    { stem: '函数y=1/(x²-4)的定义域为？', options: ['x≠±2', '(-∞,-2)∪(2,+∞)', 'R', 'x≠2'], correct: 0, explanation: '分母不为0：x²-4≠0⇒x≠±2。', difficulty: 2 },
    { stem: '若f(2x-1)=4x²-2x+1，则f(1)=？', options: ['3', '1', '5', '0'], correct: 0, explanation: '令2x-1=1⇒x=1，f(1)=4-2+1=3。', difficulty: 2 },
    { stem: '函数的表示方法不包括？', options: ['解析法', '列表法', '图像法', '假设法'], correct: 3, explanation: '函数的三种表示方法：解析法(公式)、列表法、图像法。', difficulty: 2 },
    { stem: '下列不是函数的是？', options: ['y=x', 'y²=x', 'y=|x|', 'y=1/x'], correct: 1, explanation: 'y²=x中一个x对应两个y(±√x)，不符合函数定义(一对一或多对一)。', difficulty: 3 },
    { stem: '若函数f(x)=x²+ax+b满足f(1)=f(3)=0，则f(0)=？', options: ['-3', '3', '0', '-6'], correct: 1, explanation: '由f(1)=f(3)=0得1+a+b=0且9+3a+b=0，解得a=-4,b=3。f(0)=3。也可用零点式：f(x)=(x-1)(x-3)=x²-4x+3，f(0)=3。', difficulty: 3 },
    { stem: '函数f(x)=2x²-4x+1在区间[0,3]上的值域为？', options: ['[-1,7]', '[1,7]', '[-1,3]', '[1,3]'], correct: 0, explanation: 'f(x)=2(x-1)²-1，对称轴x=1∈[0,3]。f(1)=-1(最小值)，f(0)=1，f(3)=18-12+1=7(最大值)。值域为[-1,7]。', difficulty: 3 },
    { stem: '已知f(x+1)=x²-3x+2，则f(x)的表达式为？', options: ['x²-5x+6', 'x²+3x+2', 'x²-3x+1', 'x²+x-2'], correct: 0, explanation: '令t=x+1⇒x=t-1。f(t)=(t-1)²-3(t-1)+2=t²-2t+1-3t+3+2=t²-5t+6。即f(x)=x²-5x+6。', difficulty: 3 },
    { stem: '函数y=|x-1|+|x+2|的最小值为？', options: ['3', '0', '1', '2'], correct: 0, explanation: '数形结合：|x-1|+|x+2|表示x到1和-2的距离之和。当x∈[-2,1]时取最小值，此时距离和=1-(-2)=3。', difficulty: 3 },
    { stem: '已知g(x)=2x+1，f(g(x))=4x²+4x+3，则f(3)=？', options: ['7', '11', '3', '15'], correct: 0, explanation: '令2x+1=3⇒x=1。f(3)=4×1²+4×1+3=4+4+3=11。', difficulty: 3 }
  ]
};

// --- 函数的单调性 ---
App.knowledgeGraph['math_monotonicity'] = {
  id: 'math_monotonicity', name: '函数的单调性',
  chapter: '必修一·函数', grade: '高一', difficulty: 4,
  prerequisites: ['math_func_concept'],
  description: '掌握增减函数的定义、判断函数单调性的方法(定义法/导数法)、复合函数单调性法则',
  position: { x: 320, y: 180 },
  diagnosticQuestions: [
    { stem: '函数f(x)=-x²+4x-3的单调递增区间为？', options: ['(-∞,2]', '[2,+∞)', '(-∞,4]', '[4,+∞)'], correct: 0, explanation: 'f(x)=-(x-2)²+1，开口向下，对称轴x=2。递增区间为(-∞,2]，递减区间为[2,+∞)。', testsPrerequisite: null },
    { stem: '函数f(x)=x+1/x在(1,+∞)上的单调性是？', options: ['单调递增', '单调递减', '先增后减', '先减后增'], correct: 0, explanation: 'f\'(x)=1-1/x²，当x∈(1,+∞)时f\'(x)>0，单调递增。对勾函数在(1,+∞)递增。', testsPrerequisite: null },
    { stem: '若f(x)在R上单调递增，g(x)在R上单调递减，则f(x)-g(x)在R上？', options: ['单调递增', '单调递减', '无法确定', '保持不变'], correct: 0, explanation: '-g(x)单调递增(单调递减取反)，f(x)+(-g(x))两个单调递增函数相加仍单调递增。', testsPrerequisite: null },
    { stem: '已知f(x)是定义在[-2,2]上的增函数，且f(m-1)<f(1-2m)，则m的取值范围是？', options: ['m<2/3', 'm>2/3', '0≤m≤1', '0.5≤m≤1'], correct: 3, explanation: '由单调性得m-1<1-2m⇒3m<2⇒m<2/3。又-2≤m-1≤2且-2≤1-2m≤2，解得m∈[-1,3]∩[-0.5,1.5]=[-0.5,1.5]。取交得m∈[0.5,2/3)。', testsPrerequisite: 'math_func_concept' },
    { stem: '复合函数y=log₂(x²-3x+2)的单调递减区间是？', options: ['(1,1.5)', '(1.5,2)', '(-∞,1)', '(2,+∞)'], correct: 2, explanation: '外函数log₂u递增，递减需内函数u=x²-3x+2递减。u=(x-1.5)²-0.25，在(-∞,1.5)递减。又定义域要求u>0⇒x<1或x>2，取交得(-∞,1)。', testsPrerequisite: null },
    { stem: '函数f(x)=x³-3x的单调递增区间是？', options: ['(-∞,-1]和[1,+∞)', '[-1,1]', '(-∞,+∞)', '(-∞,0]'], correct: 0, explanation: 'f\'(x)=3x²-3=3(x²-1)。f\'(x)>0⇒x<-1或x>1，递增区间为(-∞,-1]和[1,+∞)。递减区间为[-1,1]。', testsPrerequisite: null },
    { stem: '函数f(x)=|x²-4x+3|的单调递减区间为？', options: ['(-∞,1]和[2,3]', '(-∞,2]', '[1,2]和[3,+∞)', '[1,3]'], correct: 0, explanation: 'u=x²-4x+3=(x-1)(x-3)，零点x=1,3，对称轴x=2。u在(-∞,2]递减。绝对值翻折后：(-∞,1]递减(u>0且递减)，[1,2]递增(u<0翻折后递增)，[2,3]递减(u<0翻折后递减)，[3,+∞)递增。注意翻折后单调性在零点处反转。', testsPrerequisite: null },
    { stem: '已知函数f(x)=ax/(x+1)在(-1,+∞)上单调递减，则a的取值范围是？', options: ['a<0', 'a>0', 'a≤-1', 'a≥0'], correct: 0, explanation: 'f(x)=a- a/(x+1)。f\'(x)=a/(x+1)²。在(-1,+∞)递减需f\'(x)<0⇒a<0。注意分离常数法的运用。', testsPrerequisite: 'math_func_concept' },
    { stem: '若函数f(x)=x³+ax²+1的单调递减区间是(-2,0)，则a=？', options: ['-3', '-6', '3', '6'], correct: 0, explanation: 'f\'(x)=3x²+2ax=3x(x+2a/3)。递减区间需f\'(x)<0。由根0和-2a/3得递减区间长度为|2a/3|。题给递减区间(-2,0)，即两根为-2和0⇒-2a/3=-2⇒a=-3。', testsPrerequisite: null }
  ],
  practiceQuestions: [
    { stem: '增函数的定义是？', options: ['x₁<x₂⇒f(x₁)>f(x₂)', 'x₁<x₂⇒f(x₁)<f(x₂)', 'f\'(x)>0', 'f(x)的图像上升'], correct: 1, explanation: '增函数：x₁<x₂⇒f(x₁)<f(x₂)，即自变量增大函数值也增大。', difficulty: 2 },
    { stem: '函数y=1/x在定义域上的单调性为？', options: ['单调递增', '单调递减', '在(-∞,0)和(0,+∞)分别递减', '在(-∞,0)和(0,+∞)分别递增'], correct: 2, explanation: '在两个区间上分别递减，但不能说在整个定义域上递减(因为不连续)。', difficulty: 3 },
    { stem: '已知f(x)=x²+ax+3在[1,+∞)上递增，则a的范围为？', options: ['a≤-2', 'a≥-2', 'a≥2', 'a≤2'], correct: 1, explanation: '对称轴x=-a/2≤1⇒a≥-2。', difficulty: 3 },
    { stem: '函数f(x)=x+4/x的单调递减区间为？', options: ['(0,2)', '(-∞,-2)和(0,2)', '(-2,0)和(0,2)', '[-2,2]'], correct: 1, explanation: 'f\'(x)=1-4/x²。f\'(x)<0⇒x²<4⇒-2<x<2。结合定义域x≠0，得(-∞,-2)和(0,2)不合理。正确：(-2,0)和(0,2)。对勾函数的递减区间为(-2,0)和(0,2)。注意单调区间不能用∪连接。', difficulty: 4 },
    { stem: '若函数f(x)=x²-2(a-1)x+2在(-∞,4]上递减，则a的取值范围是？', options: ['a≤-3', 'a≥-3', 'a≤5', 'a≥5'], correct: 1, explanation: '开口向上，在(-∞,对称轴]递减。对称轴x=a-1≥4⇒a≥5。', difficulty: 3 },
    { stem: '函数f(x)=√(x²-1)的单调递增区间是？', options: ['[1,+∞)', '[0,+∞)', '(-∞,-1]', '(-∞,+∞)'], correct: 0, explanation: '定义域x²-1≥0⇒x≤-1或x≥1。u=x²-1在(-∞,0]递减、[0,+∞)递增。外函数√u递增。复合函数：(-∞,-1]内减外增为减；[1,+∞)内增外增为增。', difficulty: 4 },
    { stem: '已知定义在R上的函数f(x)满足：对任意实数x₁≠x₂都有(f(x₁)-f(x₂))/(x₁-x₂)>0，则f(x)是？', options: ['增函数', '减函数', '常数函数', '无法确定'], correct: 0, explanation: '(f(x₁)-f(x₂))/(x₁-x₂)>0⇒f(x₁)-f(x₂)与x₁-x₂同号。即x₁>x₂时f(x₁)>f(x₂)，这正是增函数的定义。', difficulty: 2 },
    { stem: '函数f(x)=log₂(x²-ax+3)在[2,+∞)上递增，则a的取值范围是？', options: ['a≤4', 'a<7/2', 'a≤7/2', 'a<4'], correct: 1, explanation: '外函数log₂u递增。需内函数u=x²-ax+3在[2,+∞)上递增且u>0恒成立。对称轴x=a/2≤2⇒a≤4。又最小值在x=2处：u(2)=7-2a>0⇒a<7/2。取交集得a<7/2。注意真数必须大于0的隐含条件。', difficulty: 4 }
  ]
};

// --- 函数的奇偶性 ---
App.knowledgeGraph['math_parity'] = {
  id: 'math_parity', name: '函数的奇偶性',
  chapter: '必修一·函数', grade: '高一', difficulty: 3,
  prerequisites: ['math_func_concept'],
  description: '理解奇函数、偶函数的定义与判定、图像对称性、利用奇偶性求解析式',
  position: { x: 380, y: 150 },
  diagnosticQuestions: [
    { stem: '函数f(x)=x³-sinx的奇偶性是？', options: ['奇函数', '偶函数', '既是奇函数又是偶函数', '既不是奇函数也不是偶函数'], correct: 0, explanation: 'f(-x)=(-x)³-sin(-x)=-x³+sinx=-(x³-sinx)=-f(x)，奇函数。', testsPrerequisite: null },
    { stem: '已知f(x)是定义在R上的奇函数，当x>0时f(x)=x²-2x，则f(-1)=？', options: ['-1', '1', '3', '-3'], correct: 1, explanation: 'f(1)=1²-2=-1。奇函数：f(-1)=-f(1)=1。', testsPrerequisite: null },
    { stem: '函数f(x)=x²/|x|+1的奇偶性是？', options: ['奇函数', '偶函数', '非奇非偶', '既是奇函数又是偶函数'], correct: 1, explanation: '定义域x≠0关于原点对称。f(-x)=(-x)²/|-x|+1=x²/|x|+1=f(x)，偶函数。', testsPrerequisite: null },
    { stem: '偶函数f(x)在[0,+∞)上递增，则f(-2)与f(1)的大小关系是？', options: ['f(-2)<f(1)', 'f(-2)>f(1)', 'f(-2)=f(1)', '无法比较'], correct: 1, explanation: '偶函数f(-2)=f(2)，又f(x)在[0,+∞)上递增，2>1⇒f(2)>f(1)。', testsPrerequisite: null },
    { stem: '若f(x)是R上的偶函数，且在(-∞,0]上递增，则不等式f(x)<f(1)的解集为？', options: ['(-1,1)', '(-∞,-1)∪(1,+∞)', '(-∞,-1)', '(-1,+∞)'], correct: 1, explanation: '偶函数在[0,+∞)递减(与(-∞,0]递增对称)。f(x)<f(1)⇒|x|>1⇒x<-1或x>1。', testsPrerequisite: null },
    { stem: '若f(x)+g(x)是奇函数，f(x)-g(x)是偶函数，且f(1)=2，g(1)=1，则f(-1)+g(-1)=？', options: ['-3', '3', '-1', '1'], correct: 0, explanation: '由条件得f+g为奇⇒f(-1)+g(-1)=-[f(1)+g(1)]=-3。', testsPrerequisite: null },
    { stem: '函数f(x)=√(x²-1)+√(1-x²)的奇偶性是？', options: ['既是奇函数又是偶函数', '奇函数', '偶函数', '非奇非偶'], correct: 2, explanation: '定义域：x²-1≥0⇒|x|≥1，1-x²≥0⇒|x|≤1。取交集得x=±1。定义域关于原点对称。f(1)=0，f(-1)=0，f(-x)=f(x)=0，为偶函数。注意定义域只有两个孤立点，但对称性需检验。', testsPrerequisite: null },
    { stem: '已知奇函数f(x)在(0,+∞)上递增，且f(2)=0，则不等式f(x)<0的解集为？', options: ['(-2,0)∪(0,2)', '(-∞,-2)∪(0,2)', '(-2,0)∪(2,+∞)', '(-∞,-2)∪(2,+∞)'], correct: 1, explanation: '奇函数f(x)在(0,+∞)上递增且f(2)=0，则x∈(0,2)时f(x)<0。由奇函数对称性，x∈(-∞,-2)时f(x)<0。解集为(-∞,-2)∪(0,2)。数形结合最直观。', testsPrerequisite: null }
  ],
  practiceQuestions: [
    { stem: '偶函数的图像关于什么对称？', options: ['原点', 'x轴', 'y轴', '直线y=x'], correct: 2, explanation: '偶函数图像关于y轴对称，奇函数关于原点对称。', difficulty: 2 },
    { stem: '函数f(x)=|x+1|-|x-1|的奇偶性？', options: ['奇函数', '偶函数', '非奇非偶', '无法确定'], correct: 0, explanation: 'f(-x)=|-x+1|-|-x-1|=|x-1|-|x+1|=-f(x)，奇函数。', difficulty: 3 },
    { stem: '若f(x)为R上的奇函数，则f(0)=？', options: ['0', '1', '不存在', '无法确定'], correct: 0, explanation: '奇函数定义：f(-x)=-f(x)，令x=0⇒f(0)=-f(0)⇒2f(0)=0⇒f(0)=0。', difficulty: 2 },
    { stem: '已知f(x)=x⁵+ax³+bx-8，且f(-2)=10，则f(2)=？', options: ['-10', '-26', '10', '26'], correct: 1, explanation: '设g(x)=f(x)+8=x⁵+ax³+bx为奇函数。则g(-2)=f(-2)+8=18。g(2)=f(2)+8=-g(-2)=-18。故f(2)=-18-8=-26。利用奇函数构造简化求解。', difficulty: 4 },
    { stem: '奇函数f(x)在区间[0,1]上递增，且最大值为5，则f(x)在[-1,0]上的最小值为？', options: ['-5', '5', '0', '无法确定'], correct: 0, explanation: '奇函数在对称区间上单调性相同。f在[0,1]上递增⇒f在[-1,0]上也递增。f(1)=5为最大值，则f(-1)=-5为最小值。', difficulty: 3 },
    { stem: '函数f(x)=x²+|x-a|+1的奇偶性？', options: ['a=0时为偶函数，否则非奇非偶', '总是偶函数', '总是奇函数', 'a=0时为奇函数'], correct: 0, explanation: 'f(-x)=x²+|-x-a|+1=x²+|x+a|+1。当a=0时f(-x)=x²+|x|+1=f(x)为偶函数。当a≠0时f(-x)≠f(x)且f(-x)≠-f(x)，非奇非偶。注意参数会影响奇偶性判定。', difficulty: 4 },
    { stem: '若f(x)=ax³+bx+1，且f(1)=5，则f(-1)=？', options: ['-3', '-5', '3', '5'], correct: 0, explanation: 'f(x)-1=ax³+bx为奇函数。f(1)-1=4⇒f(-1)-1=-4⇒f(-1)=-3。', difficulty: 3 }
  ]
};

// --- 指数函数 ---
App.knowledgeGraph['math_exponential'] = {
  id: 'math_exponential', name: '指数函数',
  chapter: '必修一·基本初等函数', grade: '高一', difficulty: 3,
  prerequisites: ['math_func_concept'],
  description: '掌握指数运算规则、指数函数的图像与性质、简单的指数方程与不等式',
  position: { x: 500, y: 200 },
  diagnosticQuestions: [
    { stem: '化简 (a^(2/3)·b^(-1))^(-1/2)·a^(1/2)·b^(1/3) (a>0,b>0)的结果是？', options: ['a^(1/6)·b^(5/6)', 'a^(1/6)/b^(1/6)', 'a·b', 'a^(5/6)·b^(1/6)'], correct: 0, explanation: '(a^(2/3))^(-1/2)=a^(-1/3)，(b^(-1))^(-1/2)=b^(1/2)。乘以a^(1/2)b^(1/3)=a^(-1/3+1/2)·b^(1/2+1/3)=a^(1/6)·b^(5/6)。', testsPrerequisite: null },
    { stem: '函数y=2^x的值域为？', options: ['[0,+∞)', '(0,+∞)', '(-∞,+∞)', '[1,+∞)'], correct: 1, explanation: '指数函数a^x(a>0,a≠1)的值域为(0,+∞)。2^x>0恒成立但从不超过0。', testsPrerequisite: null },
    { stem: '不等式 3^(2x-1) > 27 的解集为？', options: ['x>1', 'x>2', 'x<1', 'x<-1'], correct: 1, explanation: '27=3³，原不等式⇔3^(2x-1)>3³⇔2x-1>3⇔2x>4⇔x>2。', testsPrerequisite: null },
    { stem: '函数f(x)=a^(x-1)+1(a>0,a≠1)恒过定点？', options: ['(0,1)', '(1,2)', '(1,1)', '(0,2)'], correct: 1, explanation: '令x-1=0⇒x=1，则f(1)=a⁰+1=1+1=2。过定点(1,2)。', testsPrerequisite: null },
    { stem: '已知a=0.8^0.7，b=0.8^0.9，c=1.2^0.8，则a,b,c的大小关系为？', options: ['a>b>c', 'c>a>b', 'b>a>c', 'c>b>a'], correct: 1, explanation: '0.8^x递减⇒0.8^0.7>0.8^0.9即a>b。1.2^0.8>1>0.8^0.7⇒c>a。故c>a>b。', testsPrerequisite: null },
    { stem: '方程2^x+2^(-x)=5/2的解为？', options: ['x=±1', 'x=1', 'x=-1', 'x=0'], correct: 0, explanation: '令t=2^x，则t+1/t=5/2⇒2t²-5t+2=0⇒t=2或t=1/2。2^x=2⇒x=1；2^x=1/2⇒x=-1。', testsPrerequisite: null },
    { stem: '已知函数y=a^(x+2)-2(a>0,a≠1)恒过定点P，则P的坐标为？', options: ['(-2,-1)', '(-2,1)', '(0,-1)', '(-2,-2)'], correct: 0, explanation: '令x+2=0⇒x=-2，则y=a⁰-2=1-2=-1。过定点(-2,-1)。指数函数恒过定点问题：令指数为0。', testsPrerequisite: null },
    { stem: '若函数f(x)=a^x(a>0,a≠1)在[1,2]上的最大值比最小值大a/2，则a的值为？', options: ['1/2或3/2', '1/2', '3/2', '2'], correct: 0, explanation: '当a>1时f(x)递增，最大a²最小a，a²-a=a/2⇒2a²-3a=0⇒a=3/2(舍0)。当0<a<1时f(x)递减，最大a最小a²，a-a²=a/2⇒2a-2a²=a⇒a²=a/2⇒a=1/2。故a=1/2或3/2。注意底数分类讨论。', testsPrerequisite: null },
    { stem: '已知a=2^0.3，b=0.3^2，c=log₂0.3，则a,b,c的大小关系为？', options: ['a>b>c', 'b>a>c', 'a>c>b', 'c>a>b'], correct: 0, explanation: 'a=2^0.3>2⁰=1；b=0.3²=0.09；c=log₂0.3<log₂1=0。故a>1>0.09>c⇒a>b>c。', testsPrerequisite: null }
  ],
  practiceQuestions: [
    { stem: '4^(1/2)的计算结果是？', options: ['2', '16', '8', '1/2'], correct: 0, explanation: '4^(1/2)=√4=2。', difficulty: 2 },
    { stem: '函数y=3^(-x)的图像与y=3^x的图像关于？', options: ['x轴对称', 'y轴对称', '原点对称', 'y=x对称'], correct: 1, explanation: 'y=3^(-x)的图像与y=3^x的图像关于y轴对称。', difficulty: 2 },
    { stem: '若a^(2/3)=4，则a=？', options: ['8', '4', '16', '2'], correct: 0, explanation: 'a^(2/3)=4⇒a=4^(3/2)=(√4)³=2³=8。', difficulty: 3 },
    { stem: '方程4^x-3·2^x+2=0的解为？', options: ['x=0或x=1', 'x=1或x=2', 'x=0', 'x=1'], correct: 0, explanation: '令t=2^x>0，则4^x=t²。t²-3t+2=0⇒(t-1)(t-2)=0⇒t=1或t=2。2^x=1⇒x=0；2^x=2⇒x=1。注意换元后t>0的隐含条件，排除负数根。', difficulty: 4 },
    { stem: '函数y=a^(-x)(a>1)的单调性是？', options: ['在R上递减', '在R上递增', '在(-∞,0)递减(0,+∞)递增', '与a有关无法确定'], correct: 0, explanation: 'y=a^(-x)=(1/a)^x。a>1⇒0<1/a<1，故y为指数衰减函数，在R上递减。也可用复合函数：y=a^u，u=-x递减，外增内减为减。', difficulty: 3 },
    { stem: '若指数函数f(x)=(a²-1)^x在R上递减，则a的取值范围是？', options: ['-√2<a<-1或1<a<√2', '-√2<a<√2', 'a<-1或a>1', '-1<a<1'], correct: 0, explanation: '递减需0<a²-1<1⇒1<a²<2⇒|a|>1且|a|<√2。即a∈(-√2,-1)∪(1,√2)。', difficulty: 4 },
    { stem: '已知函数f(x)=3^(x²-2x)的单调递增区间是？', options: ['[1,+∞)', '(-∞,1]', '[0,+∞)', '(-∞,0]'], correct: 0, explanation: '外层3^u递增，需内层u=x²-2x递增。u=(x-1)²-1，在[1,+∞)上递增。复合函数：外增内增为增。', difficulty: 3 }
  ]
};

// --- 对数函数 ---
App.knowledgeGraph['math_logarithm'] = {
  id: 'math_logarithm', name: '对数函数',
  chapter: '必修一·基本初等函数', grade: '高一', difficulty: 4,
  prerequisites: ['math_exponential'],
  description: '掌握对数的定义与运算性质、对数函数的图像与性质、底数对图像的影响',
  position: { x: 580, y: 160 },
  diagnosticQuestions: [
    { stem: 'log₂8 + log₃(1/9) - lg100 = ?', options: ['-1', '0', '1', '-2'], correct: 0, explanation: 'log₂8=3，log₃(1/9)=log₃3^(-2)=-2，lg100=2。3+(-2)-2=-1。', testsPrerequisite: null },
    { stem: '已知logₓ8=3/2，则x=？', options: ['2', '4', '8', '16'], correct: 1, explanation: 'logₓ8=3/2⇒x^(3/2)=8⇒x=8^(2/3)=(³√8)²=2²=4。', testsPrerequisite: null },
    { stem: '函数y=log₂(x-1)的定义域为？', options: ['(1,+∞)', '[1,+∞)', '(0,+∞)', '(-∞,1)'], correct: 0, explanation: '真数大于0：x-1>0⇒x>1。', testsPrerequisite: null },
    { stem: '设a=log₀.₅3，b=log₂3，c=log₃2，则它们的大小关系为？', options: ['a<b<c', 'a<c<b', 'b<c<a', 'c<a<b'], correct: 1, explanation: 'a=log₀.₅3<0(底<1真>1为负)；b=log₂3>1(2<3)；c=log₃2∈(0,1)。故a<c<b。', testsPrerequisite: null },
    { stem: 'log₂3·log₃4·log₄5·log₅8 = ?', options: ['1', '2', '3', '4'], correct: 2, explanation: '换底：=(lg3/lg2)·(lg4/lg3)·(lg5/lg4)·(lg8/lg5)=lg8/lg2=log₂8=3。', testsPrerequisite: null },
    { stem: '函数y=lg(x²-2x-3)的单调递减区间为？', options: ['(-∞,1)', '(1,+∞)', '(-∞,-1)', '(3,+∞)'], correct: 2, explanation: '外函数lgu递增，需内函数u=x²-2x-3递减。u在(-∞,1)递减。又定义域u>0⇒(x-3)(x+1)>0⇒x<-1或x>3。取交得(-∞,-1)。', testsPrerequisite: null },
    { stem: '已知loga(1/2)<1，则a的取值范围是？', options: ['0<a<1/2或a>1', 'a>1/2', 'a>1', '0<a<1/2'], correct: 0, explanation: '当a>1时loga(1/2)<0<1恒成立，故a>1。当0<a<1时，loga(1/2)<1⇔1/2>a¹⇔0<a<1/2。综合得0<a<1/2或a>1。注意底数分类讨论。', testsPrerequisite: null },
    { stem: '设a=log₀.₂0.3，b=log₂0.3，c=0.3^0.2，则a,b,c的大小关系为？', options: ['c>a>b', 'a>c>b', 'b>a>c', 'c>b>a'], correct: 0, explanation: 'a=lg0.3/lg0.2≈0.75∈(0,1)；b=log₂0.3<log₂1=0；c=0.3^0.2∈(0,1)。比较a与c：c=0.3^0.2≈0.786>0.748≈a。故c>a>0>b即c>a>b。', testsPrerequisite: null }
  ],
  practiceQuestions: [
    { stem: 'log₂1的值为？', options: ['0', '1', '2', '不存在'], correct: 0, explanation: '任何底数的log(1)=0，因为a⁰=1。', difficulty: 2 },
    { stem: 'lg10000 = ?', options: ['2', '3', '4', '5'], correct: 2, explanation: 'lg10000=lg(10⁴)=4。lg即log₁₀。', difficulty: 2 },
    { stem: '换底公式：logₐb = ?', options: ['lgab', 'lgb/lga', 'lga/lgb', 'lg(b-a)'], correct: 1, explanation: '换底公式：logₐb=lgb/lga=lnb/lna。', difficulty: 2 },
    { stem: '若log₂[log₃(log₄x)]=0，则x=？', options: ['4', '16', '64', '256'], correct: 2, explanation: 'log₂[log₃(log₄x)]=0⇒log₃(log₄x)=1⇒log₄x=3⇒x=4³=64。', difficulty: 4 },
    { stem: '(lg2)²+lg20·lg5 = ?', options: ['1', '2', '0', 'lg50'], correct: 0, explanation: '(lg2)²+lg(2×10)·lg5=(lg2)²+(1+lg2)·lg5=(lg2)²+lg5+lg2·lg5=lg2(lg2+lg5)+lg5=lg2·lg10+lg5=lg2+lg5=lg10=1。', difficulty: 4 },
    { stem: '已知函数f(x)=lg(x²-2ax+3)的值域为R，则a的取值范围是？', options: ['a≥√3或a≤-√3', '-√3≤a≤√3', 'a>√3或a<-√3', '一切实数'], correct: 0, explanation: '值域为R需真数可以取遍所有正数，即u=x²-2ax+3的最小值≤0。Δ=4a²-12≥0⇒a²≥3⇒a≥√3或a≤-√3。注意区分定义域为R与值域为R的条件差异。', difficulty: 4 },
    { stem: '函数y=log½(x²-2x)的单调递增区间为？', options: ['(2,+∞)', '(-∞,0)', '(1,+∞)', '(-∞,1)'], correct: 1, explanation: '外函数log½u(底0<1/2<1)递减。递增需内函数u=x²-2x递减。u在(-∞,1)递减。定义域u>0⇒x<0或x>2。取交得(-∞,0)。', difficulty: 4 },
    { stem: '若logₐ2<logₐ3，则a的取值范围是？', options: ['a>1', '0<a<1', 'a>0', '无法确定'], correct: 0, explanation: 'logₐ2<logₐ3，真数2<3而函数值递增，说明对数函数为增函数，底数a>1。', difficulty: 2 },
    { stem: '化简log₃7·log₇9 = ?', options: ['2', '1', '3', 'log₃9'], correct: 0, explanation: '换底：log₃7·log₇9=(lg7/lg3)·(lg9/lg7)=lg9/lg3=log₃9=2。', difficulty: 3 }
  ]
};

// --- 函数的零点 ---
App.knowledgeGraph['math_func_zero'] = {
  id: 'math_func_zero', name: '函数的零点',
  chapter: '必修一·函数的应用', grade: '高一', difficulty: 4,
  prerequisites: ['math_monotonicity', 'math_parity'],
  description: '理解函数零点的概念、零点存在定理、二分法求近似零点、函数模型的应用',
  position: { x: 460, y: 100 },
  diagnosticQuestions: [
    { stem: '函数f(x)=x³-2x-5的零点所在的一个区间是？', options: ['(0,1)', '(1,2)', '(2,3)', '(3,4)'], correct: 2, explanation: 'f(2)=8-4-5=-1<0，f(3)=27-6-5=16>0。f(2)·f(3)<0，由零点定理知(2,3)内必有零点。', testsPrerequisite: null },
    { stem: '已知函数f(x)=x²+mx+1有两个正零点，则m的取值范围是？', options: ['m<-2', 'm>2', '-2<m<2', 'm<-2或m>2'], correct: 0, explanation: 'Δ=m²-4>0⇒m<-2或m>2；两根之积=1>0(同号)；两根之和=-m>0⇒m<0。取交得m<-2。', testsPrerequisite: 'math_exponential' },
    { stem: '方程lgx+x=3的近似解可用什么方法求解？', options: ['二分法', '配方法', '公式法', '因式分解法'], correct: 0, explanation: '方程lgx+x-3=0，不能用代数方法精确求解。用二分法结合零点定理迭代逼近。', testsPrerequisite: null },
    { stem: '若函数f(x)=|x²-4|-k有三个不同的零点，则k的值为？', options: ['0', '4', '3', '2'], correct: 1, explanation: '图像法：y=|x²-4|是y=x²-4在x轴下方部分翻折上去。图像最低点在x=±2处y=0，在x=0处y=4。与y=k有三个交点⇔k=4。', testsPrerequisite: null },
    { stem: '已知f(x)=e^x-ax有两个零点，则a的取值范围是？', options: ['a<0', 'a>e', 'a>0', 'a<e'], correct: 1, explanation: '令g(x)=e^x/x，x>0。f(x)=0⇔e^x=ax⇔e^x/x=a。g(x)在(0,1)递减，(1,+∞)递增，最小值为g(1)=e。当a>e时有2个零点。', testsPrerequisite: null },
    { stem: '用二分法求f(x)=x³-2的零点，初始区间为[1,2]，经过两次二分后所得区间为？', options: ['[1,1.5]', '[1.25,1.5]', '[1,1.25]', '[1.5,2]'], correct: 1, explanation: 'f(1)=-1<0，f(2)=6>0。中点1.5：f(1.5)=3.375-2=1.375>0，取[1,1.5]。中点1.25：f(1.25)=1.953-2=-0.047<0，取[1.25,1.5]。', testsPrerequisite: null },
    { stem: '函数f(x)=x³-3x+1的零点个数为？', options: ['1', '2', '3', '0'], correct: 2, explanation: 'f\'(x)=3x²-3=3(x²-1)，极值点x=±1。f(-1)=-1+3+1=3>0，f(1)=1-3+1=-1<0。三次函数有3个零点(三个单调区间各穿越一次)。也可利用零点定理结合图像判断。', testsPrerequisite: 'math_monotonicity' },
    { stem: '若方程x³-3x²+2=k有三个不同的实根，则k的取值范围是？', options: ['(-2,2)', '(-∞,2)', '(0,2)', '(-2,0)'], correct: 0, explanation: '设f(x)=x³-3x²+2。f\'(x)=3x²-6x=3x(x-2)，极值点x=0(极大值f(0)=2)和x=2(极小值f(2)=8-12+2=-2)。三次函数有三个不同实根需k介于极大值与极小值之间，即-2<k<2。', testsPrerequisite: null }
  ],
  practiceQuestions: [
    { stem: '函数y=f(x)的零点是指？', options: ['f(0)', 'f(x)=0的解', 'f\'(x)=0的解', '图像与y轴的交点'], correct: 1, explanation: '函数的零点即方程f(x)=0的实数解，也是图像与x轴交点的横坐标。', difficulty: 2 },
    { stem: '零点存在定理的条件是？', options: ['f(a)·f(b)>0', 'f(a)·f(b)<0且f(x)在[a,b]连续', 'f\'(x)存在', 'f(a)+f(b)<0'], correct: 1, explanation: '零点存在定理：连续函数在区间两端异号，则区间内至少有一个零点。', difficulty: 2 },
    { stem: '若函数f(x)=2x³-6x²+7在区间(0,2)内的零点个数为？', options: ['0', '1', '2', '3'], correct: 1, explanation: 'f(0)=7>0，f(2)=16-24+7=-1<0。f\'(x)=6x²-12x=6x(x-2)<0在(0,2)成立，单调递减。恰好1个零点。', difficulty: 3 },
    { stem: '函数f(x)=lgx-3/x的零点所在区间为？', options: ['(1,2)', '(2,3)', '(3,4)', '(4,5)'], correct: 2, explanation: 'f(3)=lg3-1≈0.477-1=-0.523<0，f(4)=lg4-0.75≈0.602-0.75=-0.148<0，f(5)=lg5-0.6≈0.699-0.6=0.099>0。f(4)·f(5)<0，零点在(4,5)。实际上f(4)<0，f(5)>0，由零点定理得零点∈(4,5)。', difficulty: 3 },
    { stem: '若函数f(x)=ax²-2x+1只有一个零点，则a=？', options: ['0或1', '1', '0', '1或-1'], correct: 0, explanation: '当a=0时f(x)=-2x+1，零点x=1/2(一个零点)。当a≠0时二次函数，Δ=4-4a=0⇒a=1。故a=0或1。注意二次项系数为0时一次函数的情形。', difficulty: 3 },
    { stem: '已知函数f(x)=|x²-2x|-k有四个不同的零点，则k的取值范围是？', options: ['(0,1)', '(0,2)', '(1,+∞)', '(0,+∞)'], correct: 0, explanation: 'y=|x²-2x|的图像是y=x(x-2)在x轴下方翻折。顶点处y=1。有四个不同交点⇔0<k<1。数形结合：k=0时与轴交于3点，k=1时与翻折顶点相切交于2点。', difficulty: 4 },
    { stem: '用二分法求函数f(x)=x³-3的零点，若初始区间取[1,2]，则第二次二分后零点所在区间为？', options: ['[1.25,1.5]', '[1,1.25]', '[1.5,2]', '[1.25,1.75]'], correct: 0, explanation: 'f(1)=-2<0，f(2)=5>0。第一次：中点1.5，f(1.5)=3.375-3=0.375>0，取[1,1.5]。第二次：中点1.25，f(1.25)=1.953-3=-1.047<0，取[1.25,1.5]。', difficulty: 3 }
  ]
};

// --- 三角函数基础 ---
App.knowledgeGraph['math_trig_basics'] = {
  id: 'math_trig_basics', name: '三角函数基础',
  chapter: '必修二·三角函数', grade: '高一', difficulty: 4,
  prerequisites: ['math_func_concept'],
  description: '掌握任意角与弧度制、三角函数的定义、同角三角函数基本关系、诱导公式',
  position: { x: 250, y: 100 },
  diagnosticQuestions: [
    { stem: 'sin300°的值为？', options: ['-√3/2', '√3/2', '-1/2', '1/2'], correct: 0, explanation: '300°=360°-60°，在第四象限。sin300°=-sin60°=-√3/2。', testsPrerequisite: null },
    { stem: '已知sinα=3/5，且α是第二象限角，则tanα=？', options: ['3/4', '-3/4', '4/3', '-4/3'], correct: 1, explanation: 'cos²α=1-9/25=16/25，第二象限cosα<0⇒cosα=-4/5。tanα=sinα/cosα=(3/5)/(-4/5)=-3/4。', testsPrerequisite: null },
    { stem: 'cos765°的值为？', options: ['√2/2', '1/2', '√3/2', '-√2/2'], correct: 0, explanation: '765°=720°+45°，cos765°=cos45°=√2/2。', testsPrerequisite: null },
    { stem: 'sin(π-α)+cos(π/2+α)的值为？', options: ['0', '2sinα', '2cosα', 'sinα-cosα'], correct: 0, explanation: 'sin(π-α)=sinα(二象限正弦正)，cos(π/2+α)=-sinα。和为0。', testsPrerequisite: null },
    { stem: '已知tanα=2，则(sinα+cosα)/(sinα-cosα)=？', options: ['3', '-3', '1', '-1'], correct: 0, explanation: '分子分母同除以cosα：=(tanα+1)/(tanα-1)=(2+1)/(2-1)=3。', testsPrerequisite: null },
    { stem: '函数y=2sin(2x+π/3)的最小正周期为？', options: ['π', '2π', 'π/2', 'π/3'], correct: 0, explanation: 'y=Asin(ωx+φ)的周期T=2π/|ω|。此处ω=2，T=2π/2=π。', testsPrerequisite: null },
    { stem: '若扇形圆心角为2弧度，半径为3，则扇形面积为？', options: ['9', '6', '3', '18'], correct: 0, explanation: '扇形面积公式S=(1/2)αr²=(1/2)×2×3²=9。注意弧度制下的面积公式与角度制不同。', testsPrerequisite: null },
    { stem: '已知tanα=2，则sin²α+sinαcosα的值为？', options: ['6/5', '5/6', '1', '2/3'], correct: 0, explanation: 'sin²α+sinαcosα=(sin²α+sinαcosα)/(sin²α+cos²α)=(tan²α+tanα)/(tan²α+1)=(4+2)/(4+1)=6/5。齐次化处理：分子分母同除以cos²α。', testsPrerequisite: null }
  ],
  practiceQuestions: [
    { stem: '弧度制中，180°等于多少弧度？', options: ['π/2', 'π', '2π', 'π/3'], correct: 1, explanation: '180°=π弧度。360°=2π弧度。', difficulty: 2 },
    { stem: 'sin²α+cos²α = ?', options: ['1', '0', 'sin2α', 'cos2α'], correct: 0, explanation: '同角三角函数基本关系：sin²α+cos²α=1。', difficulty: 2 },
    { stem: '诱导公式sin(π+α)=？', options: ['sinα', '-sinα', 'cosα', '-cosα'], correct: 1, explanation: 'sin(π+α)=-sinα。加π相当于旋转180°，正弦取反。', difficulty: 2 },
    { stem: '若3π/2<θ<2π，则点(sinθ,cosθ)在第几象限？', options: ['一', '二', '三', '四'], correct: 3, explanation: 'θ在第四象限：sinθ<0，cosθ>0。点(sinθ,cosθ)在第四象限(x>0,y<0)。', difficulty: 3 },
    { stem: '已知sinα=1/3，且α是第二象限角，则cosα=？', options: ['-2√2/3', '2√2/3', '-√8/3', '±2√2/3'], correct: 0, explanation: 'cos²α=1-1/9=8/9，cosα=±2√2/3。第二象限cosα<0，取负值得-2√2/3。注意开平方后根据象限定号。', difficulty: 3 },
    { stem: 'sin75°的值为？', options: ['(√6+√2)/4', '(√6-√2)/4', '(√3+1)/2', '(√3-1)/2'], correct: 0, explanation: 'sin75°=sin(45°+30°)=sin45°cos30°+cos45°sin30°=(√2/2)(√3/2)+(√2/2)(1/2)=(√6+√2)/4。', difficulty: 3 },
    { stem: '函数y=3sin(2x+π/6)的对称轴方程为？', options: ['x=π/6+kπ/2', 'x=π/6+kπ', 'x=π/12+kπ/2', 'x=π/12+kπ'], correct: 0, explanation: '令2x+π/6=π/2+kπ⇒2x=π/3+kπ⇒x=π/6+kπ/2。注意正弦的对称轴在函数取极值处。', difficulty: 4 },
    { stem: '化简cos(π/4-α)·cosα-sin(π/4-α)·sinα的结果为？', options: ['√2/2', '1/2', '√3/2', 'cos(π/4-2α)'], correct: 0, explanation: '逆用两角和余弦公式：cosAcosB-sinAsinB=cos(A+B)。此处A=π/4-α，B=α。原式=cos(π/4-α+α)=cos(π/4)=√2/2。', difficulty: 3 },
    { stem: '已知tanα=1/3，tan(α+β)=2，则tanβ=？', options: ['1', '5/7', '7/5', '1/2'], correct: 0, explanation: 'tan(α+β)=(tanα+tanβ)/(1-tanα·tanβ)=2⇒(1/3+tanβ)/(1-tanβ/3)=2⇒1/3+tanβ=2-2tanβ/3⇒5tanβ/3=5/3⇒tanβ=1。', difficulty: 4 }
  ]
};

// --- 平面向量 ---
App.knowledgeGraph['math_vector'] = {
  id: 'math_vector', name: '平面向量',
  chapter: '必修二·向量与复数', grade: '高一', difficulty: 4,
  prerequisites: ['math_trig_basics'],
  description: '掌握向量的加减法、数乘运算、数量积公式、向量平行与垂直的判定、坐标运算',
  position: { x: 400, y: 60 },
  diagnosticQuestions: [
    { stem: '已知向量a=(1,2)，b=(3,-1)，则|2a-b|=？', options: ['√26', '5', '√34', '√10'], correct: 2, explanation: '2a-b=(2-3,4-(-1))=(-1,5)。|2a-b|=√(1+25)=√26。', testsPrerequisite: null },
    { stem: '已知a·b=-6，|a|=3，|b|=4，则a与b的夹角为？', options: ['120°', '60°', '150°', '30°'], correct: 0, explanation: 'cosθ=(a·b)/(|a||b|)=(-6)/(12)=-1/2。θ=120°。', testsPrerequisite: null },
    { stem: '已知a=(2,1)，b=(x,-2)，若a∥b，则x=？', options: ['-4', '-1', '4', '1'], correct: 0, explanation: 'a∥b⇔交叉相乘相等：2×(-2)=1×x⇒x=-4。', testsPrerequisite: null },
    { stem: '若a⊥b，a=(1,2)，b=(k,3-k)，则k=？', options: ['6', '-6', '3', '-3'], correct: 0, explanation: 'a⊥b⇔a·b=0⇒1·k+2(3-k)=k+6-2k=6-k=0⇒k=6。', testsPrerequisite: null },
    { stem: '在△ABC中，若AB=(2,3)，AC=(1,k)，且∠A=60°，则k=？', options: ['2','4','3','1'], correct: 0, explanation: 'cos60°=AB·AC/(|AB||AC|)。AB·AC=2+3k。|AB|=√13，|AC|=√(1+k²)。代入1/2=(2+3k)/(√13·√(1+k²))。解得k=2。', testsPrerequisite: null },
    { stem: '已知|a|=2，|b|=3，|a+b|=4，则|a-b|=？', options: ['√6', '√10', '4', '2'], correct: 1, explanation: '|a+b|²=a²+b²+2a·b=4+9+2a·b=16⇒2a·b=3。|a-b|²=a²+b²-2a·b=13-3=10⇒|a-b|=√10。', testsPrerequisite: null },
    { stem: '已知向量a=(1,2)，b=(-2,1)，则a与b的夹角为？', options: ['90°', '60°', '45°', '120°'], correct: 0, explanation: 'a·b=1×(-2)+2×1=-2+2=0⇔a⊥b，夹角90°。', testsPrerequisite: null },
    { stem: '已知|a|=1，|b|=2，a与b夹角为60°，则|2a-b|=？', options: ['2', '√6', '√2', '4'], correct: 0, explanation: '|2a-b|²=4|a|²+|b|²-4a·b=4×1+4-4×1×2×cos60°=8-4=4⇒|2a-b|=2。', testsPrerequisite: null }
  ],
  practiceQuestions: [
    { stem: '向量a=(x₁,y₁)，b=(x₂,y₂)，则a·b=？', options: ['x₁x₂+y₁y₂', 'x₁y₂+x₂y₁', 'x₁y₂-x₂y₁', 'x₁x₂-y₁y₂'], correct: 0, explanation: '数量积坐标公式：a·b=x₁x₂+y₁y₂。', difficulty: 2 },
    { stem: '向量平行的充要条件是？', options: ['a·b=0', 'a=kb(k∈R)', '|a|=|b|', 'a+b=0'], correct: 1, explanation: 'b≠0时，a∥b⇔存在实数k使a=kb。', difficulty: 2 },
    { stem: '|a+b|≤|a|+|b|，等号成立时a与b的关系是？', options: ['垂直', '同向', '反向', '任意'], correct: 1, explanation: '三角不等式|a+b|≤|a|+|b|，等号成立⇔a与b同向。', difficulty: 2 },
    { stem: '已知向量a=(1,2)，b=(2,1)，则向量a+b与a-b的数量积为？', options: ['0', '1', '3', '-2'], correct: 0, explanation: 'a+b=(3,3)，a-b=(-1,1)。(a+b)·(a-b)=3×(-1)+3×1=-3+3=0。', difficulty: 3 },
    { stem: '已知|a|=4，|b|=5，|a+b|=√21，则|a-b|=？', options: ['√61', '√41', '√85', '√29'], correct: 0, explanation: '|a+b|²=|a|²+|b|²+2a·b=16+25+2a·b=21⇒2a·b=-20。|a-b|²=|a|²+|b|²-2a·b=16+25+20=61⇒|a-b|=√61。', difficulty: 4 },
    { stem: '已知△ABC顶点A(1,2)，B(3,4)，C(5,0)，则AB·AC=？', options: ['4', '8', '6', '2'], correct: 0, explanation: 'AB=(2,2)，AC=(4,-2)。AB·AC=2×4+2×(-2)=8-4=4。', difficulty: 3 },
    { stem: '若向量a与b满足|a|=√2，|b|=2，(a-b)⊥a，则a与b的夹角为？', options: ['45°', '135°', '60°', '120°'], correct: 0, explanation: '(a-b)·a=0⇒|a|²-a·b=0⇒a·b=|a|²=2。cosθ=a·b/(|a||b|)=2/(√2×2)=1/√2⇒θ=45°。', difficulty: 4 },
    { stem: '已知a=(1,2)，b=(2,1)，c=(1,k)，若(a+b)∥c，则k=？', options: ['2', '3', '1', '4'], correct: 2, explanation: 'a+b=(3,3)。(a+b)∥c⇔3×k=3×1⇒k=1。', difficulty: 3 }
  ]
};

// --- 复数 ---
App.knowledgeGraph['math_complex'] = {
  id: 'math_complex', name: '复数',
  chapter: '必修二·向量与复数', grade: '高一', difficulty: 3,
  prerequisites: ['math_set_logic'],
  description: '理解复数的概念与表示、复数代数形式的四则运算、复数的几何意义',
  position: { x: 500, y: 40 },
  diagnosticQuestions: [
    { stem: '(1+i)/(1-i) = ?', options: ['i', '-i', '1', '-1'], correct: 0, explanation: '(1+i)/(1-i)=(1+i)²/((1-i)(1+i))=(1+2i+i²)/2=(2i)/2=i。', testsPrerequisite: null },
    { stem: '复数z满足(z+1)i=2-i，则z的模|z|=？', options: ['√10', '5', '√13', '√5'], correct: 2, explanation: 'z+1=(2-i)/i=(2-i)(-i)=-2i+i²=-2i-1=-1-2i。z=-2-2i。|z|=√(4+4)=√8=2√2。', testsPrerequisite: null },
    { stem: '复数z=1+i在复平面内对应的点位于？', options: ['第一象限', '第二象限', '第三象限', '第四象限'], correct: 0, explanation: '实部a=1>0，虚部b=1>0，对应点(1,1)在第一象限。', testsPrerequisite: null },
    { stem: '已知z₁=2+i，z₂=3-4i，则z₁·z₂=？', options: ['10-5i', '2-11i', '10+5i', '6-4i'], correct: 0, explanation: '(2+i)(3-4i)=6-8i+3i-4i²=6-5i+4=10-5i。', testsPrerequisite: null },
    { stem: '复数i+i²+i³+...+i²⁰²⁴ = ?', options: ['0', '1', '-1', 'i'], correct: 0, explanation: 'i的幂周期4。每4项和为i-1-i+1=0。2024÷4=506组，和为0。', testsPrerequisite: null },
    { stem: '已知z-2z̄=1+3i（z̄为z的共轭复数），则z=？', options: ['-1-i', '-1+i', '1-i', '1+i'], correct: 0, explanation: '设z=a+bi，则z-2(a-bi)=a+bi-2a+2bi=-a+3bi=1+3i。得-a=1⇒a=-1，3b=3⇒b=1。z=-1+i。', testsPrerequisite: null },
    { stem: '复数z满足|z|=1，则复数z-1的模的最大值为？', options: ['2', '1', '0', '3'], correct: 0, explanation: '|z|=1对应复平面单位圆。z-1的模表示单位圆上的点到点(1,0)的距离，最大距离为直径2(当z=-1时)。几何意义：圆上点到定点距离的最值。', testsPrerequisite: null },
    { stem: '若复数z满足|z+1|=|z-1|，则z在复平面内对应的点轨迹为？', options: ['直线', '圆', '双曲线', '椭圆'], correct: 0, explanation: '设z=x+yi，|x+yi+1|²=|x+yi-1|²⇒(x+1)²+y²=(x-1)²+y²⇒x²+2x+1=x²-2x+1⇒4x=0⇒x=0，即y轴(直线)。', testsPrerequisite: null },
    { stem: '若复数z=cosθ+isinθ(θ∈R)，则|z+1|的最大值为？', options: ['2', '1', '√2', '0'], correct: 0, explanation: 'z=cosθ+isinθ，z+1=1+cosθ+isinθ，|z+1|=√((1+cosθ)²+sin²θ)=√(2+2cosθ)。当cosθ=1时|z+1|=√4=2，取最大值。也可利用几何意义：单位圆上的点到(-1,0)的最大距离为直径2。', testsPrerequisite: null }
  ],
  practiceQuestions: [
    { stem: 'i² = ?', options: ['1', '-1', 'i', '-i'], correct: 1, explanation: 'i是虚数单位，满足i²=-1。', difficulty: 2 },
    { stem: '复数z=a+bi的共轭复数是？', options: ['a-bi', '-a+bi', '-a-bi', 'a+bi'], correct: 0, explanation: '共轭复数实部不变，虚部变号：z̄=a-bi。', difficulty: 2 },
    { stem: '复数z对应的向量OZ的模|z|等于？', options: ['√(a²+b²)', 'a²+b²', '|a|+|b|', '√(a²-b²)'], correct: 0, explanation: '|z|=√(a²+b²)，表示复数对应点到原点的距离。', difficulty: 2 },
    { stem: '方程x²+4=0在复数范围内的解为？', options: ['x=±2i', 'x=2i', 'x=-2i', 'x=±2'], correct: 0, explanation: 'x²=-4⇒x=±√(-4)=±2i。引入虚数单位后，负数也可以开平方。', difficulty: 2 },
    { stem: '若复数z=(m²-3m+2)+(m²-1)i为纯虚数，则实数m的值为？', options: ['2', '1', '1或2', '0'], correct: 0, explanation: '纯虚数需实部为0且虚部不为0。m²-3m+2=0⇒(m-1)(m-2)=0⇒m=1或m=2。m=1时虚部m²-1=0(不符合纯虚数要求)；m=2时虚部=4-1=3≠0。故m=2。注意纯虚数排除虚部为0的情况。', difficulty: 4 },
    { stem: '复数z=(3+4i)/(1-2i)的虚部为？', options: ['2', '11/5', '1', '-1'], correct: 0, explanation: '分母实数化：(3+4i)(1+2i)/((1-2i)(1+2i))=(3+6i+4i+8i²)/5=(3+10i-8)/5=(-5+10i)/5=-1+2i。虚部为2。', difficulty: 4 },
    { stem: '已知z=1+2i，则z³=？', options: ['-11-2i', '-11+2i', '11-2i', '11+2i'], correct: 0, explanation: 'z²=(1+2i)²=1+4i+4i²=1+4i-4=-3+4i。z³=z²·z=(-3+4i)(1+2i)=-3-6i+4i+8i²=-3-2i-8=-11-2i。', difficulty: 4 },
    { stem: '在复平面内，复数z=(1+i)/(1-i)对应的点位于？', options: ['实轴上', '虚轴上', '第一象限', '第四象限'], correct: 1, explanation: '(1+i)/(1-i)=(1+i)²/2=2i/2=i。对应点(0,1)在虚轴上。', difficulty: 3 }
  ]
};

// --- 不等式 ---
App.knowledgeGraph['math_inequality'] = {
  id: 'math_inequality', name: '不等式',
  chapter: '高一上·不等式', grade: '高一', difficulty: 3,
  prerequisites: ['math_set_logic'],
  description: '掌握一元二次不等式的解法、分式不等式与绝对值不等式的转化、基本不等式及其应用',
  position: { x: 220, y: 300 },
  diagnosticQuestions: [
    { stem: '不等式 x²-3x+2≤0 的解集为？', options: ['[1,2]', '(1,2)', '(-∞,1]∪[2,+∞)', '(-∞,1)∪(2,+∞)'], correct: 0, explanation: 'x²-3x+2=(x-1)(x-2)≤0⇒1≤x≤2，解集为[1,2]。开口向上的抛物线在x轴下方的区间。', testsPrerequisite: null },
    { stem: '不等式 (x-1)/(x+2)>0 的解集为？', options: ['(-2,1)', '(-∞,-2)∪(1,+∞)', '(1,+∞)', '(-∞,-2)'], correct: 1, explanation: '分式不等式转化为(x-1)(x+2)>0（分母≠0⇒x≠-2）。两根-2和1，取两边：(-∞,-2)∪(1,+∞)。', testsPrerequisite: null },
    { stem: '不等式 |2x-1|<3 的解集为？', options: ['(-1,2)', '(1,2)', '(-2,1)', '(-∞,2)'], correct: 0, explanation: '|2x-1|<3⇔-3<2x-1<3⇔-2<2x<4⇔-1<x<2。解集为(-1,2)。', testsPrerequisite: null },
    { stem: '已知x>0，则x+4/x的最小值为？', options: ['2', '4', '3', '5'], correct: 1, explanation: '由基本不等式：x+4/x≥2√(x·4/x)=2√4=4。当且仅当x=4/x即x=2时取"="。', testsPrerequisite: null },
    { stem: '不等式 2^(2x-1) ≤ 8 的解集为？', options: ['x≤1', 'x≤2', 'x≥1', 'x≥2'], correct: 1, explanation: '8=2³，原不等式⇔2^(2x-1)≤2³⇔2x-1≤3⇔2x≤4⇔x≤2。利用指数函数单调性。', testsPrerequisite: null },
    { stem: '已知a>0,b>0，且a+b=1，则1/a+1/b的最小值为？', options: ['2', '4', '3', '5'], correct: 1, explanation: '1/a+1/b=(a+b)/ab=1/ab。由a+b≥2√(ab)⇒1≥2√(ab)⇒ab≤1/4⇒1/ab≥4。当a=b=1/2取等。', testsPrerequisite: null },
    { stem: '已知x>0，y>0，且x+2y=1，则xy的最大值为？', options: ['1/8', '1/4', '1/2', '1'], correct: 0, explanation: '由基本不等式：1=x+2y≥2√(2xy)⇒√(2xy)≤1/2⇒2xy≤1/4⇒xy≤1/8。当x=2y=1/2即x=1/2,y=1/4时取等。', testsPrerequisite: null },
    { stem: '不等式x²-ax+4<0的解集非空，则a的取值范围是？', options: ['a<-4或a>4', '-4<a<4', 'a≤-4或a≥4', '一切实数'], correct: 0, explanation: '解集非空即不等式有解，与二次函数开口向上且x轴以下部分存在等价。需Δ=(-a)²-16>0⇒a²>16⇒a<-4或a>4。注意等于0时恰好一个根，不等式无解(等于0不成立)。', testsPrerequisite: null }
  ],
  practiceQuestions: [
    { stem: '不等式x²-4>0的解集为？', options: ['(-2,2)', '(-∞,-2)∪(2,+∞)', 'x>2', 'x<-2'], correct: 1, explanation: 'x²>4⇒|x|>2⇒x<-2或x>2。', difficulty: 2 },
    { stem: '基本不等式：a>0,b>0时，a+b≥？', options: ['√(ab)', '2√(ab)', '(a+b)/2', 'ab'], correct: 1, explanation: 'a+b≥2√(ab)，当且仅当a=b时取"="。这是均值不等式的基础。', difficulty: 2 },
    { stem: '不等式|x-2|≥1的解集为？', options: ['[1,3]', '(-∞,1]∪[3,+∞)', '(1,3)', '(-∞,3]'], correct: 1, explanation: '|x-2|≥1⇔x-2≤-1或x-2≥1⇔x≤1或x≥3。', difficulty: 2 },
    { stem: '若x+1/x的最小值为2，则x的取值范围是？', options: ['x>0', 'x<0', 'x≠0', '任意实数'], correct: 0, explanation: '当x>0时，由基本不等式x+1/x≥2。x<0时x+1/x≤-2。', difficulty: 3 },
    { stem: '分式不等式(2x-1)/(x+3)≤0的解集为？', options: ['(-3,1/2]', '(-∞,-3)∪[1/2,+∞)', '[-3,1/2]', '(-3,1/2)'], correct: 0, explanation: '等价于(2x-1)(x+3)≤0且x≠-3。两根-3和1/2，取中间(-3,1/2]。注意分母x+3≠0⇒x≠-3。', difficulty: 3 },
    { stem: '已知a>0，则a+16/(a+2)的最小值为？', options: ['10', '8', '6', '12'], correct: 0, explanation: 'a+16/(a+2)=(a+2)+16/(a+2)-2≥2√((a+2)·16/(a+2))-2=2×4-2=6。注意配凑法：在分子加2再减2以构造"定积"。', difficulty: 4 },
    { stem: '不等式|x+1|+|x-2|≤5的解集为？', options: ['[-2,3]', '[-1,2]', '(-∞,-2]∪[3,+∞)', '[-3,2]'], correct: 0, explanation: '|x+1|+|x-2|表示数轴上x到-1和2的距离之和。x∈[-1,2]时和为3。两端需|x+1|+|x-2|=5⇒x=-2或x=3。解集为[-2,3]。', difficulty: 4 },
    { stem: '不等式x²-(a+1)x+a≤0的解集为空集，则a的取值范围是？', options: ['无解，不可能为空集', 'a<1', 'a>1', 'a=1'], correct: 0, explanation: 'x²-(a+1)x+a=(x-1)(x-a)≤0。当a>1时解集为[1,a]非空；当a<1时解集为[a,1]非空；当a=1时解集为{1}非空。二次项系数为正的二次不等式解集不可能为空集(因抛物线开口向上，总有x轴以下部分)。', difficulty: 4 },
    { stem: '若不等式mx²+mx-2<0对一切实数x恒成立，则m的取值范围是？', options: ['-8<m≤0', 'm<0', 'm>-8', '-8<m<0'], correct: 0, explanation: '当m=0时-2<0恒成立。当m≠0时需m<0且Δ=m²+8m<0⇒-8<m<0。综合得-8<m≤0。注意m=0是一次函数退化的特殊情况。', difficulty: 4 }
  ]
};

// --- 数列 ---
App.knowledgeGraph['math_sequence'] = {
  id: 'math_sequence', name: '数列',
  chapter: '高一下·数列', grade: '高一', difficulty: 4,
  prerequisites: ['math_func_concept'],
  description: '掌握等差/等比数列的通项公式与前n项和、数列极限的初步概念、数学归纳法',
  position: { x: 320, y: 40 },
  diagnosticQuestions: [
    { stem: '等差数列{an}中，a₁=3，公差d=2，则a₁₀=？', options: ['21', '23', '19', '25'], correct: 0, explanation: 'an=a₁+(n-1)d=3+(10-1)×2=3+18=21。', testsPrerequisite: null },
    { stem: '等比数列{an}中，a₁=2，公比q=3，则前4项和S₄=？', options: ['80', '54', '26', '40'], correct: 0, explanation: 'Sₙ=a₁(1-qⁿ)/(1-q)=2×(1-81)/(1-3)=2×(-80)/(-2)=80。', testsPrerequisite: null },
    { stem: '等差数列前n项和公式Sₙ=n(a₁+an)/2中，若a₁=2，S₁₀=110，则公差d=？', options: ['1', '2', '3', '0.5'], correct: 1, explanation: 'S₁₀=10(2+a₁₀)/2=110⇒5(2+2+9d)=110⇒4+9d=22⇒9d=18⇒d=2。', testsPrerequisite: null },
    { stem: '用数学归纳法证明1+2+...+n=n(n+1)/2时，第二步的归纳假设是？', options: ['设n=1成立', '设n=k时公式成立', '设n=k+1时公式成立', '直接代入n+1'], correct: 1, explanation: '数学归纳法第二步：假设n=k时命题成立，证明n=k+1时命题也成立。这是归纳递推的关键。', testsPrerequisite: null },
    { stem: '已知{an}满足an+1=2an+1，a₁=1，则a₃=？', options: ['3', '7', '5', '15'], correct: 1, explanation: 'a₁=1⇒a₂=2×1+1=3⇒a₃=2×3+1=7。这是一阶线性递推数列。', testsPrerequisite: null },
    { stem: '等比数列{an}中，a₂·a₈=16，则a₅=？', options: ['±4', '4', '2', '±2'], correct: 0, explanation: 'a₂·a₈=a₁q·a₁q⁷=a₁²q⁸=(a₁q⁴)²=a₅²=16⇒a₅=±4。等比中项的灵活运用。', testsPrerequisite: null },
    { stem: '已知等差数列{an}的前n项和为Sₙ，若S₁₂=36，则a₄+a₉=？', options: ['6', '3', '12', '9'], correct: 0, explanation: '等差数列中a₄+a₉=a₁+a₁₂。S₁₂=12(a₁+a₁₂)/2=6(a₁+a₁₂)=36⇒a₁+a₁₂=6⇒a₄+a₉=6。利用等差数列的对称性(下标之和相等)。', testsPrerequisite: null },
    { stem: '已知数列{an}的前n项和Sₙ=n²-2n，则a₅=？', options: ['7', '15', '9', '5'], correct: 0, explanation: 'a₅=S₅-S₄=(25-10)-(16-8)=15-8=7。利用通项与和的关系：an=Sₙ-Sₙ₋₁(n≥2)。', testsPrerequisite: null }
  ],
  practiceQuestions: [
    { stem: '等差数列的公差d等于？', options: ['an-aₙ₋₁（常数）', 'an+aₙ₋₁', 'an/an-1', 'an×an-1'], correct: 0, explanation: '等差数列定义：从第二项起，每一项减前一项为常数d，即an-aₙ₋₁=d。', difficulty: 2 },
    { stem: '等比数列中a₃=12，a₆=96，则公比q=？', options: ['2', '3', '4', '8'], correct: 0, explanation: 'a₆/a₃=q³=96/12=8⇒q³=8⇒q=2。', difficulty: 2 },
    { stem: '数列极限lim(n→∞) (1+1/n)² = ?', options: ['1', '2', 'e', '∞'], correct: 0, explanation: 'lim (1+1/n)² = (lim (1+1/n))² = 1² = 1。', difficulty: 3 },
    { stem: '设等差数列{an}前n项和为Sₙ，若S₃=6，S₆=24，则a₇+a₈+a₉=？', options: ['18', '30', '24', '12'], correct: 0, explanation: 'S₉-S₆=a₇+a₈+a₉。Sₙ是n的二次函数，可用待定系数法。Sₙ=An²+Bn。S₃=9A+3B=6，S₆=36A+6B=24。解得A=2/3,B=0。S₉=81×2/3=54。a₇+a₈+a₉=S₉-S₆=54-24=30。', difficulty: 4 },
    { stem: '在等差数列{an}中，a₃+a₄+a₅=12，则S₇=？', options: ['28', '21', '14', '35'], correct: 0, explanation: 'a₃+a₄+a₅=3a₄=12⇒a₄=4。S₇=7(a₁+a₇)/2=7×2a₄/2=7×a₄=7×4=28。利用等差中项：a₁+a₇=2a₄。', difficulty: 3 },
    { stem: '已知等比数列{an}中，a₁=2，S₃=14，则公比q=？', options: ['2或-3', '2', '-3', '3或-2'], correct: 0, explanation: 'S₃=a₁(1+q+q²)=2(1+q+q²)=14⇒1+q+q²=7⇒q²+q-6=0⇒(q+3)(q-2)=0⇒q=2或q=-3。注意等比数列公比可以为负数。', difficulty: 3 },
    { stem: '数列{an}满足a₁=2，an+1=an+2n，则a₅=？', options: ['22', '20', '18', '24'], correct: 0, explanation: '累加法：a₅=a₁+(a₂-a₁)+(a₃-a₂)+(a₄-a₃)+(a₅-a₄)=2+(2×1)+(2×2)+(2×3)+(2×4)=2+2+4+6+8=22。', difficulty: 3 },
    { stem: '极限lim(n→∞) (2n²-3)/(3n²+n+1)的值为？', options: ['2/3', '0', '∞', '1'], correct: 0, explanation: '分子分母同除以n²：lim (2-3/n²)/(3+1/n+1/n²)=2/3。', difficulty: 3 },
    { stem: '等比数列{an}中，a₁=3，a₃=12，则数列的公比q=？', options: ['±2', '2', '-2', '4'], correct: 0, explanation: 'a₃=a₁q²⇒12=3q²⇒q²=4⇒q=±2。注意等比数列有两种可能(递增或摆动)。', difficulty: 2 }
  ]
};

// --- 矩阵与行列式初步 ---
App.knowledgeGraph['math_matrix'] = {
  id: 'math_matrix', name: '矩阵与行列式',
  chapter: '高一下·矩阵与行列式', grade: '高一', difficulty: 4,
  prerequisites: ['math_func_concept'],
  description: '掌握二阶/三阶行列式的计算、矩阵的加减与数乘运算、矩阵乘法、用行列式解二元/三元线性方程组（Cramer法则）',
  position: { x: 420, y: 40 },
  diagnosticQuestions: [
    { stem: '计算行列式 |2 3; 1 4| 的值。', options: ['5', '11', '8', '-5'], correct: 0, explanation: '二阶行列式：|a b; c d|=ad-bc。|2,3;1,4|=2×4-3×1=8-3=5。', testsPrerequisite: null },
    { stem: '矩阵 A=[1 2; 3 4]，B=[5 6; 7 8]，则A+B=？', options: ['[6 8; 10 12]', '[5 12; 21 32]', '[6 7; 9 12]', '无法相加'], correct: 0, explanation: '同型矩阵相加=对应元素相加。A+B=[1+5,2+6;3+7,4+8]=[6,8;10,12]。', testsPrerequisite: null },
    { stem: '矩阵乘法[1 2; 3 4]×[5; 6]=？', options: ['[17; 39]', '[23; 39]', '[5 12; 15 24]', '无法相乘'], correct: 0, explanation: '[1,2;3,4]×[5;6]=[1×5+2×6;3×5+4×6]=[5+12;15+24]=[17;39]。2×2乘2×1得2×1。', testsPrerequisite: null },
    { stem: '用Cramer法则解方程组{2x+y=5; x-y=1}，则x=？', options: ['2', '1', '3', '-1'], correct: 0, explanation: 'D=|2,1;1,-1|=-2-1=-3。Dₓ=|5,1;1,-1|=-5-1=-6。x=Dₓ/D=(-6)/(-3)=2。', testsPrerequisite: null },
    { stem: '已知矩阵A=[1 2; k 3]的行列式为-1，则k=？', options: ['2', '-2', '1', '-1'], correct: 0, explanation: 'det(A)=1×3-2×k=3-2k=-1⇒2k=4⇒k=2。', testsPrerequisite: null },
    { stem: '下列哪个运算一定可以进行？', options: ['A+B（A、B不同型）', 'A·B', '当A的列数=B的行数时A·B有意义', '矩阵除法'], correct: 2, explanation: '矩阵乘法条件：左矩阵列数=右矩阵行数。矩阵没有除法运算，只有逆矩阵（方阵）。', testsPrerequisite: null },
    { stem: '已知D=|a b; c d|=5，则|3a 3b; c d|=？', options: ['15', '5', '30', '10'], correct: 0, explanation: '行列式中某行所有元素乘以k，行列式值乘以k。|3a 3b; c d|=3×|a b; c d|=3×5=15。', testsPrerequisite: null },
    { stem: '矩阵A为3×2矩阵，B为2×4矩阵，则AB为几阶矩阵？', options: ['3×4', '2×2', '3×2', '2×4'], correct: 0, explanation: 'A(m×n)×B(n×p)=AB(m×p)。3×2乘2×4得3×4矩阵。', testsPrerequisite: null }
  ],
  practiceQuestions: [
    { stem: '三阶行列式可以用什么方法展开？', options: ['对角线法则（Sarrus法则）', '直接拼接', '矩阵求逆', '无法计算'], correct: 0, explanation: '三阶行列式用Sarrus法则（对角线法则）计算，也可按某一行/列展开。', difficulty: 2 },
    { stem: '单位矩阵I₂=？', options: ['[1 1; 1 1]', '[1 0; 0 1]', '[0 1; 1 0]', '[0 0; 0 0]'], correct: 1, explanation: '二阶单位矩阵I₂主对角线为1其余为0：[1,0;0,1]。A·I=I·A=A。', difficulty: 2 },
    { stem: 'Cramer法则解方程组的条件是？', options: ['系数行列式D≠0', 'D=0', '任何情况', '方程数≠未知数'], correct: 0, explanation: 'Cramer法则要求系数行列式D≠0（系数矩阵可逆），此时方程组有唯一解。', difficulty: 3 },
    { stem: '计算行列式 |1 -1 2; 0 3 1; 2 1 -1| 的值为？', options: ['-18', '18', '-6', '6'], correct: 0, explanation: 'Sarrus法则：主对角线积和(1×3×(-1)+(-1)×1×2+2×0×1)=(-3-2+0)=-5，副对角线积和(2×3×2+(-1)×0×(-1)+1×1×1)=(12+0+1)=13。行列式=(-5)-13=-18。', difficulty: 4 },
    { stem: '矩阵A=[1 2; 0 1]，B=[1 0; 2 1]，则(A+B)(A-B)=？', options: ['与A²-B²不等', 'A²-B²', '零矩阵', '单位矩阵'], correct: 0, explanation: '(A+B)(A-B)=A²-AB+BA-B²。矩阵乘法不满足交换律(AB≠BA一般情况)，故(A+B)(A-B)≠A²-B²。', difficulty: 4 },
    { stem: '若矩阵A=[1 2; 3 k]不可逆，则k=？', options: ['6', '3', '2', '0'], correct: 0, explanation: '矩阵可逆⇔行列式≠0。det(A)=1×k-2×3=k-6=0⇒k=6。不可逆即行列式为0。', difficulty: 3 },
    { stem: '用Cramer法则解方程组{2x-y=7; x+3y=0}，则y=？', options: ['1', '-1', '2', '-2'], correct: 1, explanation: 'D=|2 -1; 1 3|=6-(-1)=7。D_y=|2 7; 1 0|=0-7=-7。y=D_y/D=-7/7=-1。', difficulty: 4 },
    { stem: '矩阵乘法[A B; C D]×[x; y]的结果为？', options: ['[Ax+By; Cx+Dy]', '[Ax+Cy; Bx+Dy]', '[A+x; B+y]', '无法运算'], correct: 0, explanation: '2×2矩阵乘以2×1向量：第一行乘第一列得Ax+By；第二行乘第一列得Cx+Dy。', difficulty: 2 },
    { stem: '已知3阶行列式D的某行元素全为2，对应的代数余子式之和为5，则D=？', options: ['10', '6', '5', '2'], correct: 0, explanation: '按该行展开：D=2×A₁+2×A₂+2×A₃=2×(A₁+A₂+A₃)=2×5=10。其中A₁,A₂,A₃为代数余子式。', difficulty: 4 }
  ]
};

// ===== 章节-知识点映射 =====
App.chapterNodes = {
  '高一上·集合与命题': ['math_set_logic'],
  '高一上·不等式': ['math_inequality'],
  '高一上·函数': ['math_func_concept', 'math_monotonicity', 'math_parity'],
  '高一上·指数与对数': ['math_exponential', 'math_logarithm', 'math_func_zero'],
  '高一下·三角函数': ['math_trig_basics'],
  '高一下·数列': ['math_sequence'],
  '高一下·矩阵与行列式': ['math_matrix'],
  '高一下·向量与复数': ['math_vector', 'math_complex']
};

console.log('📐 数学知识图谱加载完成: ' + Object.keys(App.knowledgeGraph).length + ' 个知识点');
