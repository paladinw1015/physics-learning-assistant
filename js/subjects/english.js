// ===== 英语知识图谱与题库 =====
// 12个节点：高中英语核心语法点
// 每节点含诊断题(6道)和练习题(4-6道)

App.knowledgeGraph = {};
App.chapterOrder = [
  '语法·时态语态',
  '语法·情态与虚拟',
  '语法·从句',
  '语法·非谓语动词',
  '语法·特殊句式'
];

// ============ 语法·时态语态 ============

App.knowledgeGraph['en_tense_simple_cont'] = {
  id: 'en_tense_simple_cont', name: '一般时与进行时',
  chapter: '语法·时态语态', grade: '高一', difficulty: 3,
  prerequisites: [],
  description: '掌握一般现在时、一般过去时、一般将来时、现在进行时、过去进行时的用法与区别',
  position: { x: 150, y: 320 },
  diagnosticQuestions: [
    { stem: 'The earth _____ around the sun.', options: ['moves', 'moved', 'is moving', 'has moved'], correct: 0, explanation: '客观真理用一般现在时。"地球绕太阳转"是客观事实，用第三人称单数moves。', testsPrerequisite: null },
    { stem: '—Where is Tom? —He _____ basketball on the playground.', options: ['plays', 'played', 'is playing', 'has played'], correct: 2, explanation: '问"Tom在哪里"，答"他正在打篮球"。表示此时此刻正在进行的动作，用现在进行时。', testsPrerequisite: null },
    { stem: 'I _____ my homework when you called me last night.', options: ['do', 'was doing', 'did', 'have done'], correct: 1, explanation: '"当你昨晚打电话时我正在做作业"。过去某个时刻正在进行的动作用过去进行时was doing。', testsPrerequisite: null },
    { stem: 'We _____ a meeting tomorrow afternoon.', options: ['have', 'will have', 'had', 'are having'], correct: 3, explanation: '用现在进行时表示按计划将要发生的事。have在此不是"有"而是"召开"的意思，可用进行时。', testsPrerequisite: null },
    { stem: 'He _____ to school every day last year.', options: ['walks', 'walked', 'is walking', 'was walking'], correct: 1, explanation: '"last year"是过去时间，且"every day"表示反复发生的习惯性动作，用一般过去时walked。', testsPrerequisite: null },
    { stem: 'The train _____ at 8 o\'clock every morning.', options: ['leave', 'leaves', 'is leaving', 'left'], correct: 1, explanation: '时刻表规定的动作用一般现在时表将来（即使有时间表含义）。主语The train为第三人称单数，加s。', testsPrerequisite: null },
    { stem: 'Shh! Your father _____. Don\'t wake him up.', options: ['sleeps', 'slept', 'is sleeping', 'has slept'], correct: 2, explanation: '"Shh!"暗示现在正在进行的动作，用现在进行时is sleeping。"嘘！你爸爸在睡觉。"', testsPrerequisite: null },
    { stem: 'When we arrived, she _____ the piano in the living room.', options: ['played', 'was playing', 'has played', 'would play'], correct: 1, explanation: 'arrived是过去的时间点，此时她正在弹钢琴——过去某个时刻正在进行的动作用过去进行时was playing。', testsPrerequisite: null }
  ],
  practiceQuestions: [
    { stem: 'Look! The children _____ in the river.', options: ['swim', 'swam', 'are swimming', 'have swum'], correct: 2, explanation: '"Look!"提示动作正在进行，用现在进行时。', difficulty: 2 },
    { stem: '—Have you ever been to Beijing? —Yes, I _____ there last year.', options: ['go', 'went', 'have gone', 'was going'], correct: 1, explanation: '"last year"是明确的过去时间状语，用一般过去时。', difficulty: 2 },
    { stem: 'While I _____ TV, the phone rang.', options: ['watch', 'was watching', 'watched', 'am watching'], correct: 1, explanation: 'while引导的时间状语从句常用进行时，表示背景动作。', difficulty: 3 },
    { stem: 'The sun _____ in the east.', options: ['rise', 'rises', 'is rising', 'rose'], correct: 1, explanation: '自然规律/客观真理用一般现在时。太阳从东方升起。', difficulty: 1 },
    { stem: 'I _____ to school by bus every day.', options: ['go', 'goes', 'am going', 'went'], correct: 0, explanation: 'every day提示习惯性动作用一般现在时。主语I用动词原形go。', difficulty: 1 },
    { stem: 'Listen! Someone _____ for help in the distance.', options: ['cries', 'cried', 'is crying', 'has cried'], correct: 2, explanation: '"Listen!"提示此刻正在发生的动作，用现在进行时。', difficulty: 2 },
    { stem: 'He usually _____ coffee in the morning, but today he _____ tea.', options: ['drinks...drinks', 'is drinking...is drinking', 'drinks...is drinking', 'drank...drank'], correct: 2, explanation: '前半句是习惯(usually)，用一般现在时drinks；后半句是今天反常的情况，用现在进行时is drinking。', difficulty: 4 },
    { stem: 'We _____ Germany next summer for a family trip.', options: ['visit', 'visited', 'are visiting', 'have visited'], correct: 2, explanation: '用现在进行时表示按计划即将发生的动作。我们已经计划好了暑假去德国。', difficulty: 3 },
    { stem: 'At that time last night, I _____ a movie with my family.', options: ['watch', 'watched', 'was watching', 'have watched'], correct: 2, explanation: '"At that time last night"提示昨晚那个时刻正在进行的动作用过去进行时was watching。', difficulty: 2 },
    { stem: 'She always _____ the bus. It\'s really annoying.', options: ['misses', 'always missed', 'is always missing', 'will miss'], correct: 2, explanation: 'always+现在进行时表示带有感情色彩的反复发生的行为（抱怨）。"她总是赶不上公交，真烦人。"', difficulty: 3 }
  ]
};

// --- 完成时 ---
App.knowledgeGraph['en_tense_perfect'] = {
  id: 'en_tense_perfect', name: '完成时与完成进行时',
  chapter: '语法·时态语态', grade: '高一', difficulty: 4,
  prerequisites: ['en_tense_simple_cont'],
  description: '掌握现在完成时、过去完成时、现在完成进行时的用法及与一般过去时的区别',
  position: { x: 230, y: 280 },
  diagnosticQuestions: [
    { stem: 'I _____ in this city since I was born.', options: ['live', 'lived', 'have lived', 'was living'], correct: 2, explanation: '"since I was born"表示从过去持续到现在的动作，用现在完成时。', testsPrerequisite: null },
    { stem: 'By the time he arrived, the meeting _____.', options: ['finished', 'has finished', 'had finished', 'was finishing'], correct: 2, explanation: '"By the time he arrived"中的arrived是过去，会议结束发生在arrived之前，即"过去的过去"，用过去完成时。', testsPrerequisite: null },
    { stem: 'I _____ my key. I can\'t find it anywhere.', options: ['lost', 'have lost', 'had lost', 'was losing'], correct: 1, explanation: '强调过去动作对现在的影响（现在找不到），用现在完成时。', testsPrerequisite: null },
    { stem: 'He _____ English for 10 years and he still speaks with an accent.', options: ['learns', 'learned', 'has been learning', 'had learned'], correct: 2, explanation: '"for 10 years"表示持续，且强调"还在继续"，用现在完成进行时has been learning。', testsPrerequisite: null },
    { stem: 'She said she _____ the film twice.', options: ['saw', 'has seen', 'had seen', 'was seeing'], correct: 2, explanation: '主句said是过去时，从句中"看过"发生在said之前，用过去完成时had seen（时态呼应）。', testsPrerequisite: null },
    { stem: 'This is the best film I _____.', options: ['see', 'saw', 'have ever seen', 'had ever seen'], correct: 2, explanation: '"This is..."用现在时，从句用现在完成时表示迄今为止的经历。最高级"This is the best...I have ever..."是固定句型。', testsPrerequisite: null },
    { stem: 'It is the third time that I _____ this museum.', options: ['visit', 'visited', 'have visited', 'had visited'], correct: 2, explanation: '"It is the first/second/third time that..."句型中，从句用现在完成时。这是我第三次来博物馆。', testsPrerequisite: null },
    { stem: 'He _____ in this city for ten years before he moved to Shanghai last year.', options: ['lived', 'has lived', 'had lived', 'was living'], correct: 2, explanation: '"moved"是过去时间点，"住在这座城市"发生在moved之前，属"过去的过去"，用过去完成时had lived。解题陷阱：没有by the time等标志词，需通过动作先后逻辑判断。', testsPrerequisite: null }
  ],
  practiceQuestions: [
    { stem: '现在完成时的结构是？', options: ['have/has + 过去分词', 'had + 过去分词', 'will + do', 'be + doing'], correct: 0, explanation: '现在完成时=have/has+过去分词(done)；过去完成时=had+过去分词。', difficulty: 2 },
    { stem: 'I _____ never _____ to the Great Wall before.', options: ['have...been', 'had...been', 'was...going', 'did...go'], correct: 0, explanation: '用现在完成时表示"曾经"的经历。"never...before"常用于现在完成时。', difficulty: 2 },
    { stem: '过去完成时表示什么？', options: ['过去的动作', '过去的过去的动作', '将来的动作', '正在进行的动作'], correct: 1, explanation: '过去完成时表示"过去的过去"，即过去某个时间点之前已完成的动作。', difficulty: 2 },
    { stem: 'By the end of last year, she _____ in this company for ten years.', options: ['works', 'has worked', 'had worked', 'will work'], correct: 2, explanation: '"By the end of last year"是过去时间点，"工作10年"发生在那之前，用过去完成时had worked。', difficulty: 3 },
    { stem: 'I _____ Jack for over ten years, since we were in primary school.', options: ['know', 'knew', 'have known', 'had known'], correct: 2, explanation: '"since we were in primary school"表示从过去持续到现在的动作，用现在完成时have known。', difficulty: 2 },
    { stem: 'She _____ her homework before her mother came back from work.', options: ['finishes', 'finished', 'has finished', 'had finished'], correct: 3, explanation: '"came back"是过去时间，"完成作业"在此之前，属"过去的过去"，用过去完成时had finished。', difficulty: 3 },
    { stem: 'I _____ this movie three times this month.', options: ['saw', 'have seen', 'had seen', 'see'], correct: 1, explanation: '"this month"这个月还没结束，用现在完成时表示到目前做了某事。', difficulty: 2 },
    { stem: 'She _____ too hard lately, so she looks exhausted.', options: ['worked', 'has been working', 'was working', 'had worked'], correct: 1, explanation: '"lately"提示从过去持续到现在且仍有影响，用现在完成进行时has been working。解题陷阱：lately/recently等词提示用完成时态。', difficulty: 4 }
  ]
};

// --- 被动语态 ---
App.knowledgeGraph['en_passive'] = {
  id: 'en_passive', name: '被动语态',
  chapter: '语法·时态语态', grade: '高一', difficulty: 3,
  prerequisites: ['en_tense_simple_cont'],
  description: '掌握各种时态的被动语态结构(be+过去分词)、主动表被动的特殊情况',
  position: { x: 310, y: 340 },
  diagnosticQuestions: [
    { stem: 'The bridge _____ in 2010.', options: ['builds', 'built', 'was built', 'has built'], correct: 2, explanation: '"in 2010"是过去时间，桥是"被建造"，用一般过去时的被动语态was built。', testsPrerequisite: null },
    { stem: 'English _____ widely _____ all over the world.', options: ['is...spoken', 'was...spoken', 'is...speaking', 'has...spoken'], correct: 0, explanation: '"英语被广泛使用"是客观事实，用一般现在时的被动语态is spoken。', testsPrerequisite: null },
    { stem: 'The work _____ by the end of this month.', options: ['will finish', 'will be finished', 'is finishing', 'has finished'], correct: 1, explanation: '工作"被完成"，by+将来时间用将来时的被动语态will be finished。', testsPrerequisite: null },
    { stem: 'This kind of cloth _____ easily.', options: ['washes', 'is washed', 'has washed', 'is washing'], correct: 0, explanation: 'wash/sell/write等词作不及物动词表示主语的内在属性时，用主动表被动。This cloth washes easily。(这种布好洗)', testsPrerequisite: null },
    { stem: 'The new plan _____ at the meeting now.', options: ['discusses', 'is discussing', 'is being discussed', 'has discussed'], correct: 2, explanation: '"now"表示正在被讨论，用现在进行时的被动：is being discussed。', testsPrerequisite: null },
    { stem: 'Great changes _____ in my hometown in the past few years.', options: ['took place', 'have taken place', 'have been taken place', 'were taken place'], correct: 1, explanation: 'take place是不及物动词短语，无被动语态。"in the past few years"用现在完成时。', testsPrerequisite: null },
    { stem: 'The patient _____ on by the doctor this morning.', options: ['operated', 'was operated', 'has operated', 'is operated'], correct: 1, explanation: '"this morning"是过去时间，病人是被动接受手术，用一般过去时的被动语态was operated on。解题陷阱：不及物动词+介词的结构在被动语态中介词不能丢。', testsPrerequisite: null },
    { stem: 'Attention must _____ to this problem immediately.', options: ['pay', 'be paid', 'paying', 'have paid'], correct: 1, explanation: '含情态动词的被动语态：情态动词+be+过去分词。pay attention to中attention作主语，用be paid。', testsPrerequisite: null }
  ],
  practiceQuestions: [
    { stem: '被动语态的基本结构是？', options: ['be + 过去分词', 'have + 过去分词', 'be + 现在分词', 'do + 过去分词'], correct: 0, explanation: '被动语态=be(各种时态)+过去分词(done)。不同时态体现在be的变化上。', difficulty: 2 },
    { stem: 'These books _____ to the library on time.', options: ['must return', 'must be returned', 'must returned', 'must be return'], correct: 1, explanation: '含情态动词的被动：情态动词+be+过去分词。must be returned。', difficulty: 2 },
    { stem: '下列哪个句子是被动语态？', options: ['He is reading a book.', 'The book is read by many people.', 'He has read the book.', 'He will read the book.'], correct: 1, explanation: 'B：书被许多人读"，read是过去分词，is read是被动语态。', difficulty: 2 },
    { stem: 'The new bridge _____ next year to ease traffic congestion.', options: ['builds', 'will build', 'will be built', 'is building'], correct: 2, explanation: '"next year"是将来时间，"桥被建造"，将来时被动语态will be built。', difficulty: 2 },
    { stem: 'Tea _____ in many parts of China, especially in Fujian and Zhejiang.', options: ['grows', 'is grown', 'is growing', 'has grown'], correct: 1, explanation: '茶叶是被种植，用一般现在时的被动语态is grown。客观事实。', difficulty: 2 },
    { stem: 'When I got there, the problem already _____ by my colleague.', options: ['solved', 'was solved', 'had been solved', 'has been solved'], correct: 2, explanation: '"got"是过去时间，"被解决"发生在之前，用过去完成时的被动had been solved。时态与语态交织。', difficulty: 4 },
    { stem: 'This kind of material _____ soft and smooth.', options: ['feels', 'is felt', 'is feeling', 'has felt'], correct: 0, explanation: '感观动词(feel/look/smell/taste)用主动表被动。This material feels soft。物作主语，用主动语态表特征。', difficulty: 3 }
  ]
};

// ============ 语法·情态与虚拟 ============

// --- 情态动词 ---
App.knowledgeGraph['en_modal'] = {
  id: 'en_modal', name: '情态动词',
  chapter: '语法·情态与虚拟', grade: '高一', difficulty: 4,
  prerequisites: ['en_tense_simple_cont'],
  description: '掌握can/could、may/might、must/have to、should/ought to等情态动词的用法与区别',
  position: { x: 450, y: 300 },
  diagnosticQuestions: [
    { stem: '—Must I finish the work today? —No, you _____.', options: ['mustn\'t', 'needn\'t', 'can\'t', 'shouldn\'t'], correct: 1, explanation: 'must提问的否定回答用needn\'t(不必)或don\'t have to。mustn\'t意为"禁止"，不是"不必"。', testsPrerequisite: null },
    { stem: 'You _____ be tired after such a long walk. Let\'s take a rest.', options: ['can', 'must', 'should', 'may'], correct: 1, explanation: '"走了这么远你一定是累了"——must表示非常有把握的肯定推测。', testsPrerequisite: null },
    { stem: 'It\'s raining outside. You _____ take an umbrella.', options: ['need', 'may', 'had better', 'must'], correct: 2, explanation: 'had better(=最好)表示建议。外面下雨了，你最好带把伞。', testsPrerequisite: null },
    { stem: 'He _____ speak three languages when he was only ten.', options: ['can', 'could', 'must', 'may'], correct: 1, explanation: '"when he was ten"提示过去，can的过去式是could。他十岁时就能说三种语言。', testsPrerequisite: null },
    { stem: '—Who is knocking at the door? —It _____ be Tom. He has gone to Beijing.', options: ['must', 'can\'t', 'may', 'should'], correct: 1, explanation: 'can\'t表示否定推测"不可能"。Tom去北京了，所以不可能是他在敲门。', testsPrerequisite: null },
    { stem: 'You _____ smoke in the hospital. It\'s not allowed.', options: ['needn\'t', 'mustn\'t', 'may not', 'can\'t'], correct: 1, explanation: 'mustn\'t表示"禁止，不允许"。你不能在医院吸烟。', testsPrerequisite: null },
    { stem: 'He _____ be at home. I saw him leave the house an hour ago.', options: ['must', 'may', 'can\'t', 'should'], correct: 2, explanation: '"我一个小时前看到他出门了"→他不可能在家。can\'t表示否定推测"不可能"。解题陷阱：must表示肯定推测，此处语境为否定。', testsPrerequisite: null },
    { stem: 'You _____ hand in your homework today, but it\'s better if you do.', options: ['mustn\'t', 'don\'t have to', 'can\'t', 'shouldn\'t'], correct: 1, explanation: 'don\'t have to=不必。不是禁止(mustn\'t)而是"没有必要"今天交。情态动词have to的否定表示"不必"。', testsPrerequisite: null }
  ],
  practiceQuestions: [
    { stem: '情态动词后面的动词用什么形式？', options: ['动词原形', 'to do', 'doing', '过去分词'], correct: 0, explanation: '情态动词(can/must/may等)+动词原形。ought to除外(ought to do)。', difficulty: 2 },
    { stem: 'can\'t在推测用法中表示？', options: ['可能', '一定', '不可能', '应该'], correct: 2, explanation: 'can\'t/couldn\'t表示否定推测"不可能"。must表示肯定推测"一定"。', difficulty: 2 },
    { stem: '"You should see a doctor."中should表达？', options: ['命令', '建议', '推测', '能力'], correct: 1, explanation: 'should常用于表达"建议、劝告"。你应该去看医生。', difficulty: 2 },
    { stem: 'need作情态动词时疑问句的回答：Need I go? No, you _____.', options: ['needn\'t', 'mustn\'t', 'can\'t', 'need'], correct: 0, explanation: 'need作情态动词的否定回答用needn\'t。', difficulty: 3 },
    { stem: 'You _____ be very tired after the long journey. Let me help you with the luggage.', options: ['can', 'must', 'may', 'could'], correct: 1, explanation: '"长途旅行后你一定很累"——must表示有把握的肯定推测，根据事实做出的逻辑推断。', difficulty: 3 },
    { stem: 'I wonder who took my umbrella. It _____ be Tom. He left his at home.', options: ['must', 'could', 'should', 'might'], correct: 0, explanation: '"他把自己的伞忘在家里了"→推测是他拿的。must表示有充分依据的肯定是推测。解题陷阱：could/might也可表推测但语气弱，此处有依据应用must。', difficulty: 3 },
    { stem: 'The teacher told us that we _____ finish the reading over the weekend.', options: ['could', 'must', 'should', 'might'], correct: 0, explanation: '间接引语中，that从句中can变为could，表示"能够"。老师告诉我们周末可以完成阅读。时态呼应。', difficulty: 3 },
    { stem: 'He _____ be very rich. He always travels first class and stays in five-star hotels.', options: ['can', 'must', 'should', 'need'], correct: 1, explanation: '从"头等舱/住五星酒店"推断他一定很富有。must表示推测"一定"。', difficulty: 2 }
  ]
};

// --- 虚拟语气 ---
App.knowledgeGraph['en_subjunctive'] = {
  id: 'en_subjunctive', name: '虚拟语气',
  chapter: '语法·情态与虚拟', grade: '高一', difficulty: 5,
  prerequisites: ['en_tense_perfect'],
  description: '掌握if引导的虚拟条件句（与现在/过去/将来事实相反）的动词形式、wish/as if等虚拟用法',
  position: { x: 530, y: 260 },
  diagnosticQuestions: [
    { stem: 'If I _____ you, I would accept the offer.', options: ['am', 'was', 'were', 'will be'], correct: 2, explanation: '与现在事实相反的虚拟：if从句用过去式(be动词用were)，主句用would+动词原形。', testsPrerequisite: null },
    { stem: 'If he had studied harder, he _____ the exam.', options: ['passed', 'would pass', 'would have passed', 'will pass'], correct: 2, explanation: '与过去事实相反的虚拟：if从句had done，主句would have done。"如果他当时更努力，他本来能通过考试的"（事实上没通过）。', testsPrerequisite: null },
    { stem: 'I wish I _____ a bird.', options: ['am', 'was', 'were', 'will be'], correct: 2, explanation: 'wish后的宾语从句用虚拟语气。与现在事实相反（我希望我是一只鸟→事实不是），用过去式（be用were）。', testsPrerequisite: null },
    { stem: 'If it _____ tomorrow, we would stay at home.', options: ['rains', 'rained', 'should rain', 'will rain'], correct: 2, explanation: '与将来事实相反的虚拟：if+should/were to+动词原形，主句would+动词原形。表示"万一明天..."。', testsPrerequisite: null },
    { stem: 'He talks as if he _____ everything.', options: ['knows', 'knew', 'will know', 'has known'], correct: 1, explanation: 'as if(=好像)从句中用虚拟语气。与现在事实相反用过去式。"他说得好像他什么都知道似的"（事实不知道）。', testsPrerequisite: null },
    { stem: 'It\'s time that we _____ to work.', options: ['go', 'went', 'will go', 'have gone'], correct: 1, explanation: 'It\'s (high) time that...句型中，从句用虚拟语气（过去式）。"是我们该工作的时候了。"', testsPrerequisite: null },
    { stem: 'If it were not for the map, we _____ lost in the forest.', options: ['will get', 'would get', 'would have got', 'got'], correct: 1, explanation: '与现在事实相反的虚拟条件句。if从句用were(不是was)，主句用would+动词原形。"要不是有地图，我们就会迷路。"（事实是没迷路）解题陷阱：be动词用were而非was，无论主语是什么人称。', testsPrerequisite: null },
    { stem: 'The doctor suggested that my father _____ smoking immediately.', options: ['stop', 'stops', 'stopped', 'had stopped'], correct: 0, explanation: 'suggest(建议)后that从句用(should)+动词原形。suggest doing是另一用法，此处suggest后接宾语从句用虚拟。', testsPrerequisite: null }
  ],
  practiceQuestions: [
    { stem: '在虚拟语气中，与现在事实相反的if从句用什么时态？', options: ['现在时', '过去式', '过去完成时', '将来时'], correct: 1, explanation: '与现在事实相反：if从句用过去式(be用were)。', difficulty: 2 },
    { stem: 'If I had known earlier, I _____ you.', options: ['will tell', 'would tell', 'would have told', 'tell'], correct: 2, explanation: 'had known提示与过去事实相反，主句用would have done。', difficulty: 3 },
    { stem: 'suggest/recommend/insist等动词后的that从句中，谓语动词用？', options: ['动词原形', '过去式', '现在时', '将来时'], correct: 0, explanation: '表示建议/要求/命令的动词后that从句用(should)+动词原形。', difficulty: 3 },
    { stem: 'If I _____ you, I would apologize to her right away.', options: ['am', 'was', 'were', 'be'], correct: 2, explanation: '与现在事实相反的虚拟，if从句be动词一律用were，无论主语人称。"如果我是你的话"（事实我不是你）。', difficulty: 3 },
    { stem: 'I wish I _____ the concert last night. Everyone said it was amazing.', options: ['attended', 'had attended', 'would attend', 'could attend'], correct: 1, explanation: 'wish后的宾语从句中，对过去的事情表示愿望，用had+过去分词。"真希望我昨晚去了音乐会"（事实没去）。', difficulty: 4 },
    { stem: 'She insisted that the meeting _____ postponed until next week.', options: ['was', 'be', 'had been', 'would be'], correct: 1, explanation: 'insist(坚持要求)后that从句用(should)+动词原形。解题陷阱：insist表"坚持说"时不用虚拟，此处表"坚持要求"用虚拟。', difficulty: 4 },
    { stem: '_____ for your help, I wouldn\'t have finished the task on time.', options: ['If it is not', 'If it was not', 'Were it not', 'Had it not been'], correct: 3, explanation: '与过去事实相反：Had it not been for = If it had not been for。表示"要不是..."。虚拟条件句省略if时助动词提前。', difficulty: 5 },
    { stem: 'My order is that everyone _____ on time for the meeting tomorrow.', options: ['is', 'will be', 'be', 'has been'], correct: 2, explanation: 'order/suggestion/advice等名词后的表语/同位语从句用(should)+动词原形。我的命令是每个人都要准时参会。', difficulty: 4 }
  ]
};

// ============ 语法·从句 ============

// --- 名词性从句 ---
App.knowledgeGraph['en_noun_clause'] = {
  id: 'en_noun_clause', name: '名词性从句',
  chapter: '语法·从句', grade: '高一', difficulty: 4,
  prerequisites: ['en_tense_perfect'],
  description: '掌握主语从句、宾语从句、表语从句、同位语从句的引导词选择及语序规则',
  position: { x: 150, y: 200 },
  diagnosticQuestions: [
    { stem: '_____ he said at the meeting surprised everyone.', options: ['That', 'What', 'Which', 'This'], correct: 1, explanation: '主语从句中said缺宾语→用what("他所说的")。that在名词性从句中不充当成分。', testsPrerequisite: null },
    { stem: 'I don\'t know _____ he will come or not.', options: ['if', 'whether', 'that', 'what'], correct: 1, explanation: '与or not连用时只能用whether，不能用if。whether...or not。', testsPrerequisite: null },
    { stem: 'The reason _____ he was late was _____ he missed the bus.', options: ['why...that', 'that...because', 'why...because', 'that...that'], correct: 0, explanation: 'The reason why...is that...（...的理由是...）。reason不和because搭配。', testsPrerequisite: null },
    { stem: '_____ is known to all, the earth is round.', options: ['That', 'Which', 'As', 'What'], correct: 2, explanation: 'As is known to all=众所周知。As引导非限制性定语从句，指代整个主句内容。', testsPrerequisite: null },
    { stem: 'The news _____ our team won the game is exciting.', options: ['that', 'which', 'what', 'whether'], correct: 0, explanation: '同位语从句解释news的内容，用that引导（在从句中不充当成分）。', testsPrerequisite: null },
    { stem: 'I have no idea _____ she left without saying goodbye.', options: ['that', 'what', 'why', 'which'], correct: 2, explanation: 'idea后跟同位语从句，需要用连接副词why表示原因。"为什么她不辞而别"。', testsPrerequisite: null },
    { stem: '_____ we need is more time to prepare for the exam.', options: ['That', 'What', 'Which', 'Whether'], correct: 1, explanation: '主语从句中need缺宾语→用what（我们"需要的东西"是更多时间）。that在从句中不充当成分，此处不能选that。解题陷阱：考查what与that的根本区别。', testsPrerequisite: null },
    { stem: 'The question is _____ we should start the project now or later.', options: ['if', 'whether', 'that', 'what'], correct: 1, explanation: '表语从句中"是否"的含义用whether。与or not/ or later连用时只能用whether不能用if。', testsPrerequisite: null }
  ],
  practiceQuestions: [
    { stem: '在名词性从句中，语序必须是？', options: ['倒装语序', '陈述语序', '疑问语序', '任意语序'], correct: 1, explanation: '所有名词性从句都必须用陈述语序（主语+谓语），不能用疑问语序。', difficulty: 2 },
    { stem: 'that在名词性从句中的作用是？', options: ['充当主语/宾语等成分', '只起连接作用，不充当成分', '表示疑问', '修饰名词'], correct: 1, explanation: 'that在名词性从句中仅起连接作用，不充当任何句子成分。', difficulty: 2 },
    { stem: 'whether和if在引导宾语从句时的区别是？', options: ['完全相同', 'whether可用在介词后,if不可', 'if更正式', 'whether只能引导主语从句'], correct: 1, explanation: 'whether可在介词后、不定式前、句首主语从句中使用；if不可用于这些位置。', difficulty: 3 },
    { stem: '_____ he can pass the exam depends on how hard he works.', options: ['If', 'Whether', 'That', 'What'], correct: 1, explanation: '句首主语从句不能用if，只能用whether。"他是否能通过考试取决于他有多努力。"', difficulty: 3 },
    { stem: 'It is obvious _____ he is lying.', options: ['what', 'which', 'that', 'whether'], correct: 2, explanation: 'It作形式主语，that引导真正的主语从句。that在从句中不作成分。"很明显他在撒谎。"', difficulty: 2 },
    { stem: 'This is _____ I disagree with you on this point.', options: ['why', 'what', 'that', 'which'], correct: 0, explanation: '表语从句why表示原因。"这就是为什么我在这一点上不同意你的原因。"从句中不缺主/宾语，需要用连接副词why。', difficulty: 3 },
    { stem: 'I\'m not sure _____ he will arrive on time or not.', options: ['that', 'if', 'whether', 'what'], correct: 2, explanation: '与or not连用时只能用whether，不能用if。sure后接宾语从句。', difficulty: 2 },
    { stem: '_____ is surprising is that he finished the work in just one day.', options: ['It', 'That', 'What', 'Which'], correct: 2, explanation: '主语从句，surprising后缺主语（令人吃惊的事）→用what。What is surprising = 令人吃惊的事情。解题陷阱：it is surprising that...是另一句型，此处结构不同。', difficulty: 3 }
  ]
};

// --- 定语从句 ---
App.knowledgeGraph['en_relative_clause'] = {
  id: 'en_relative_clause', name: '定语从句',
  chapter: '语法·从句', grade: '高一', difficulty: 5,
  prerequisites: ['en_noun_clause'],
  description: '掌握关系代词(who/whom/which/that/whose)和关系副词(when/where/why)的选择、限制性与非限制性定语从句的区别',
  position: { x: 230, y: 160 },
  diagnosticQuestions: [
    { stem: 'This is the man _____ helped me yesterday.', options: ['which', 'who', 'whose', 'whom'], correct: 1, explanation: '先行词the man是人，关系词在从句中做主语→用who(或that)。', testsPrerequisite: null },
    { stem: 'The house _____ roof is red belongs to my uncle.', options: ['which', 'that', 'whose', 'who'], correct: 2, explanation: '先行词house，关系词在从句中修饰roof（表示所属）→用whose。', testsPrerequisite: null },
    { stem: 'This is the factory _____ I visited last year.', options: ['where', 'which', 'when', 'in which'], correct: 1, explanation: 'visit是及物动词，从句缺宾语→用关系代词which/that。where在从句中做状语。', testsPrerequisite: null },
    { stem: 'This is the factory _____ my father works.', options: ['which', 'that', 'where', 'whose'], correct: 2, explanation: '从句中work是不及物动词，不缺宾语，缺地点状语→用关系副词where。', testsPrerequisite: null },
    { stem: 'I will never forget the days _____ we spent together.', options: ['when', 'that', 'where', 'on which'], correct: 1, explanation: 'spend是及物动词，从句缺宾语→用关系代词that/which。when在从句中做时间状语。', testsPrerequisite: null },
    { stem: '_____ is mentioned above, the plan has been changed.', options: ['Which', 'As', 'That', 'What'], correct: 1, explanation: 'As is mentioned above=如上所述。As引导非限制性定语从句，放句首。', testsPrerequisite: null },
    { stem: 'I can still remember the reason _____ he gave for being late.', options: ['why', 'that', 'when', 'where'], correct: 1, explanation: '先行词the reason，但从句中gave缺少宾语→用关系代词that/which。解题陷阱：考生易误选why，但从句缺宾语应选关系代词而非关系副词。', testsPrerequisite: null },
    { stem: 'This is the house _____ Lu Xun once lived.', options: ['which', 'that', 'where', 'in that'], correct: 2, explanation: '从句中lived是不及物动词，不缺宾语缺地点状语→用关系副词where。= in which Lu Xun once lived。', testsPrerequisite: null }
  ],
  practiceQuestions: [
    { stem: '当先行词是物时，限制性定语从句用哪些关系代词？', options: ['who, whom', 'which, that', 'where, when', 'whose'], correct: 1, explanation: '先行词是物时用which/that作关系代词。', difficulty: 2 },
    { stem: '非限制性定语从句的标志是？', options: ['不用逗号', '用逗号与主句隔开', '用句号', '用分号'], correct: 1, explanation: '非限制性定语从句前有逗号。注意非限制性从句不能用that引导。', difficulty: 2 },
    { stem: 'where在定语从句中代替？', options: ['主语', '宾语', '地点状语', '定语'], correct: 2, explanation: '关系副词where代替in/at+which，在从句中做地点状语。', difficulty: 2 },
    { stem: '关系代词that不能用于？', options: ['限制性定语从句', '非限制性定语从句', '先行词人物混合', '最高级后'], correct: 1, explanation: 'that不能用于非限制性定语从句（有逗号的定语从句）。', difficulty: 3 },
    { stem: 'The girl _____ I sat next to on the plane was really friendly.', options: ['who', 'whom', 'which', 'whose'], correct: 1, explanation: '关系词在从句中作sat next to的宾语，指人用whom或who（口语）。书面正式语中作宾语用whom。', difficulty: 3 },
    { stem: 'I will never forget the days _____ we worked together in the countryside.', options: ['which', 'that', 'when', 'on that'], correct: 2, explanation: '从句worked不缺主/宾语，缺时间状语→用关系副词when。= on which we worked together。', difficulty: 3 },
    { stem: 'She has three children, all of _____ are studying abroad.', options: ['who', 'whom', 'which', 'that'], correct: 1, explanation: '"介词+关系代词"结构中指人用whom。all of whom是"非限制性定语从句"中介词提前的用法。解题陷阱：介词后不用who/that，指人用whom。', difficulty: 4 },
    { stem: 'The professor, _____ lecture I attended last week, is an expert in this field.', options: ['who', 'whom', 'whose', 'which'], correct: 2, explanation: '关系词在从句中修饰lecture（讲座的）→用whose。= I attended whose lecture = I attended the lecture of the professor。whose表所属关系。', difficulty: 4 }
  ]
};

// --- 状语从句 ---
App.knowledgeGraph['en_adverbial_clause'] = {
  id: 'en_adverbial_clause', name: '状语从句',
  chapter: '语法·从句', grade: '高一', difficulty: 4,
  prerequisites: ['en_tense_simple_cont'],
  description: '掌握时间/条件/原因/让步/目的/结果/比较状语从句的连接词及主从句时态呼应',
  position: { x: 350, y: 140 },
  diagnosticQuestions: [
    { stem: 'I\'ll tell him the news _____ he comes back.', options: ['until', 'as soon as', 'while', 'since'], correct: 1, explanation: 'as soon as(=一...就...)引导时间状语从句。主将从现：主句用将来时，从句用一般现在时。', testsPrerequisite: null },
    { stem: '_____ it rains tomorrow, we won\'t go to the park.', options: ['Because', 'Though', 'If', 'Unless'], correct: 2, explanation: 'if引导条件状语从句=如果。如果明天下雨，我们就不去公园。', testsPrerequisite: null },
    { stem: 'He didn\'t go to bed _____ his mother came back.', options: ['after', 'until', 'since', 'when'], correct: 1, explanation: 'not...until...(=直到...才...)。他没睡觉直到妈妈回来。"直到妈妈回来他才睡觉。"', testsPrerequisite: null },
    { stem: '_____ he is young, he knows a lot.', options: ['Because', 'Since', 'Although', 'If'], correct: 2, explanation: 'although/though引导让步状语从句=虽然。虽然他很年轻，但知道很多。', testsPrerequisite: null },
    { stem: 'He was _____ tired _____ he couldn\'t walk any further.', options: ['such...that', 'so...that', 'too...to', 'enough...to'], correct: 1, explanation: 'so+adj/adv+that...=如此...以至于...。注意so修饰形容词/副词，such修饰名词。', testsPrerequisite: null },
    { stem: 'I have lived here _____ I was born.', options: ['since', 'for', 'when', 'because'], correct: 0, explanation: 'since引导时间状语从句=自从，从句用一般过去时，主句用完成时。', testsPrerequisite: null },
    { stem: 'You won\'t pass the exam _____ you work hard.', options: ['if', 'unless', 'because', 'although'], correct: 1, explanation: 'unless=if not=除非。除非你努力学习，否则考试不会通过。解题陷阱：unless含条件否定含义，考生易误选if。', testsPrerequisite: null },
    { stem: '_____ she is very young, she has a good understanding of the world.', options: ['Because', 'Although', 'Since', 'As'], correct: 1, explanation: 'although/though引导让步状语从句=虽然。虽然她很小，但很懂世事。"young"与"good understanding"之间是转折关系。', testsPrerequisite: null }
  ],
  practiceQuestions: [
    { stem: '在时间/条件状语从句中，用一般现在时代替？', options: ['一般过去时', '一般将来时', '现在完成时', '过去完成时'], correct: 1, explanation: '主将从现：时间/条件状语从句中用一般现在时代替一般将来时。', difficulty: 2 },
    { stem: 'because和so能同时使用吗？', options: ['能', '不能', '只有口语中能', '只有书面语中能'], correct: 1, explanation: 'because和so不能在同一句中使用。中文"因为...所以...",英文只能用其中一个。', difficulty: 2 },
    { stem: 'such...that和so...that的区别是？', options: ['完全相同', 'such+名词,so+形容词/副词', 'so+名词,such+形容词', '没有区别'], correct: 1, explanation: 'so+形容词/副词+that；such+(a/an)+形容词+名词+that。', difficulty: 3 },
    { stem: '_____ he was very tired, he kept working on the project late into the night.', options: ['Because', 'Although', 'If', 'Unless'], correct: 1, explanation: '"非常累"与"继续工作"是转折关系，用although/though引导让步状语从句。', difficulty: 2 },
    { stem: 'Take your umbrella _____ it rains.', options: ['because', 'so', 'in case', 'while'], correct: 2, explanation: 'in case=以防/万一。带上伞以防下雨。表示目的/预防。解题陷阱：in case不是"在...情况下"而是"以防"。', difficulty: 3 },
    { stem: 'I\'ll wait here _____ you finish your work.', options: ['until', 'because', 'although', 'unless'], correct: 0, explanation: 'until/till引导时间状语从句=直到。我会等到你完成工作。"主将从现"原则。', difficulty: 2 },
    { stem: '_____ the teacher entered the classroom, all the students stood up.', options: ['While', 'When', 'Since', 'Until'], correct: 1, explanation: 'when=当...的时候，表示一个时间点。while后常用进行时或表示持续动作，此处entered是瞬间动作用when。', difficulty: 3 },
    { stem: 'We arrived at the station _____ the train had already left.', options: ['when', 'after', 'while', 'since'], correct: 1, explanation: 'after引导时间状语从句，表示"在火车已经离开之后我们到站"。主句与从句的动作先后不同。', difficulty: 2 }
  ]
};

// ============ 语法·非谓语动词 ============

// --- 不定式与动名词 ---
App.knowledgeGraph['en_nonfinite_infinitive'] = {
  id: 'en_nonfinite_infinitive', name: '不定式与动名词',
  chapter: '语法·非谓语动词', grade: '高一', difficulty: 5,
  prerequisites: ['en_noun_clause'],
  description: '掌握不定式的时态与语态、不定式作主语/宾语/宾补/状语的用法、动名词作主语/宾语、只接不定式/动名词的动词',
  position: { x: 500, y: 180 },
  diagnosticQuestions: [
    { stem: 'I decided _____ a new car.', options: ['buy', 'to buy', 'buying', 'bought'], correct: 1, explanation: 'decide后接不定式：decide to do sth。固定搭配。', testsPrerequisite: null },
    { stem: 'He enjoys _____ basketball after school.', options: ['play', 'to play', 'playing', 'played'], correct: 2, explanation: 'enjoy后接动名词：enjoy doing sth。类似动词有finish, mind, suggest, avoid, practice等。', testsPrerequisite: null },
    { stem: '_____ is important for our health.', options: ['Exercise', 'To exercise', 'Exercising', 'Both B and C'], correct: 3, explanation: '不定式(To exercise)和动名词(Exercising)都可以作主语，表泛指意义。', testsPrerequisite: null },
    { stem: 'He pretended _____ when the teacher came in.', options: ['read', 'to be reading', 'reading', 'to read'], correct: 1, explanation: 'pretend后接不定式。因老师进来时正在假装读书→用不定式的进行式to be reading。', testsPrerequisite: null },
    { stem: 'I remember _____ the door before I left.', options: ['lock', 'to lock', 'locking', 'locked'], correct: 2, explanation: 'remember doing=记得做过某事(已做)；remember to do=记得要去做某事(未做)。这里是"记得锁过门"。', testsPrerequisite: null },
    { stem: 'The teacher told the students _____ in class.', options: ['not talk', 'not to talk', 'don\'t talk', 'not talking'], correct: 1, explanation: 'tell sb (not) to do sth：不定式的否定在to前加not。', testsPrerequisite: null },
    { stem: 'I noticed him _____ the building and get into a car.', options: ['leave', 'to leave', 'leaving', 'left'], correct: 0, explanation: '感官动词notice+宾语+省to不定式(leave)表示看到动作全过程。"我注意到他离开大楼上了车。"如果用leaving则表示看到正在发生的动作。解题陷阱：省to不定式与现在分词的细微差别。', testsPrerequisite: null },
    { stem: 'She can\'t help _____ when she sees that funny video.', options: ['laugh', 'to laugh', 'laughing', 'laughed'], correct: 2, explanation: 'can\'t help doing=忍不住做某事。can\'t help laughing=忍不住笑。固定搭配。', testsPrerequisite: null }
  ],
  practiceQuestions: [
    { stem: '下列哪个动词后接动名词？', options: ['want', 'decide', 'enjoy', 'hope'], correct: 2, explanation: 'enjoy后接doing。want/decide/hope后接to do。', difficulty: 2 },
    { stem: 'stop to do和stop doing的区别是？', options: ['完全相同', 'stop to do停下来去做另一件事;stop doing停止正在做的事', 'to do表示停止;doing表示去做', '无区别'], correct: 1, difficulty: 3 },
    { stem: 'It is no use _____ over spilt milk.', options: ['cry', 'to cry', 'crying', 'cried'], correct: 2, explanation: 'It is no use/good doing sth.(做某事没用)。动名词作真正主语。', difficulty: 3 },
    { stem: 'He promised _____ his homework on time, but he forgot.', options: ['finish', 'to finish', 'finishing', 'finished'], correct: 1, explanation: 'promise后接不定式：promise to do sth。承诺要做某事（未发生）。', difficulty: 2 },
    { stem: 'I regret _____ you that your application has been rejected.', options: ['tell', 'to tell', 'telling', 'told'], correct: 1, explanation: 'regret to do(遗憾要去做某事/通知某事)vs regret doing(后悔做过某事)。这里是"遗憾地通知"。解题陷阱：regret两种用法意义不同。', difficulty: 3 },
    { stem: 'The boss made the workers _____ ten hours a day.', options: ['work', 'to work', 'working', 'worked'], correct: 0, explanation: '使役动词make+宾语+省to不定式。make sb do sth(让某人做某事)。变为被动时to要还原：be made to do。', difficulty: 3 },
    { stem: '_____ English well takes years of practice.', options: ['Speak', 'Speaking', 'Spoke', 'Having spoken'], correct: 1, explanation: '动名词Speaking作主语，表泛指。"说好英语需要多年练习。"动名词作主语强调整体概念。', difficulty: 2 },
    { stem: 'She devoted herself _____ homeless children.', options: ['help', 'to help', 'to helping', 'helping'], correct: 2, explanation: 'devote oneself to (介词)+doing。to在此是介词不是不定式符号。解题陷阱：动词短语中的to可能是介词而非不定式符号，如look forward to, be used to等。', difficulty: 4 }
  ]
};

// --- 分词 ---
App.knowledgeGraph['en_nonfinite_participle'] = {
  id: 'en_nonfinite_participle', name: '分词（现在/过去分词）',
  chapter: '语法·非谓语动词', grade: '高一', difficulty: 5,
  prerequisites: ['en_nonfinite_infinitive'],
  description: '掌握现在分词（主动/进行）与过去分词（被动/完成）作定语/状语/宾补的用法、独立主格结构',
  position: { x: 580, y: 140 },
  diagnosticQuestions: [
    { stem: 'The _____ flowers need watering.', options: ['fading', 'faded', 'fading', 'fade'], correct: 0, explanation: '现在分词作定语表示"正在凋谢的花"。现在分词表主动/进行。', testsPrerequisite: null },
    { stem: '_____ from the top of the mountain, the city looks beautiful.', options: ['Seeing', 'Seen', 'To see', 'Having seen'], correct: 1, explanation: '"从山顶看"→城市是"被看"→过去分词Seen表被动。Seen from...=When it is seen from...', testsPrerequisite: null },
    { stem: 'He came into the room, _____ by his students.', options: ['follow', 'following', 'followed', 'to follow'], correct: 2, explanation: '"被学生跟着"→过去分词表被动。followed是过去分词作伴随状语。', testsPrerequisite: null },
    { stem: '_____ the homework, he went out to play.', options: ['Finished', 'Having finished', 'Finishing', 'Being finished'], correct: 1, explanation: '完成作业先于出去玩→用分词的完成式Having finished。强调先后顺序。"完成作业后，他出去玩。"', testsPrerequisite: null },
    { stem: 'I heard her _____ in the next room.', options: ['sing', 'sang', 'sung', 'to sing'], correct: 0, explanation: '感官动词hear+宾语+宾补(省to不定式/现在分词)。hear sb sing听到全过程；hear sb singing听到正在唱。', testsPrerequisite: null },
    { stem: 'The problem _____ yesterday is very important.', options: ['discussing', 'discussed', 'to discuss', 'being discussed'], correct: 1, explanation: '"昨天讨论的问题"→问题是被讨论→过去分词discussed作定语。', testsPrerequisite: null },
    { stem: '_____ his homework, he forgot to eat dinner.', options: ['Absorbed in', 'Absorbing in', 'To absorb in', 'Being absorbed'], correct: 0, explanation: 'be absorbed in=专心于。Absorbed in...是过去分词短语作原因状语=Because he was absorbed in...。解题陷阱：过去分词短语的被动含义容易被忽略。', testsPrerequisite: null },
    { stem: 'The man stood there, _____ his hands in his pockets.', options: ['put', 'putting', 'puts', 'was putting'], correct: 1, explanation: '现在分词作伴随状语，表示站着的同时伴随口袋插手的动作。', testsPrerequisite: null }
  ],
  practiceQuestions: [
    { stem: '现在分词作定语表示？', options: ['被动/完成', '主动/进行', '目的', '结果'], correct: 1, explanation: '现在分词(doing)表主动/进行。如the sleeping baby(正在睡觉的婴儿)。', difficulty: 2 },
    { stem: '过去分词作定语表示？', options: ['主动/进行', '被动/完成', '将来', '进行'], correct: 1, explanation: '过去分词(done)表被动/完成。如the broken window(被打破的窗户)。', difficulty: 2 },
    { stem: 'with+宾语+宾补结构中，宾补可以是？', options: ['只有形容词', '只有副词', '分词/不定式/形容词/副词/介词短语', '只有现在分词'], correct: 2, explanation: 'with复合结构中宾补形式多样：with the door open(形),with him standing(现分)等。', difficulty: 3 },
    { stem: 'There is a little girl _____ on the bench in the park.', options: ['sits', 'sat', 'sitting', 'having sat'], correct: 2, explanation: '现在分词sitting作后置定语=who is sitting。公园长椅上坐着一个小女孩。', difficulty: 2 },
    { stem: '_____ by the beautiful scenery, he decided to stay another day.', options: ['Attract', 'Attracting', 'Attracted', 'To attract'], correct: 2, explanation: '他被美景吸引→过去分词Attracted表被动。"被美景吸引，他决定多待一天。"过去分词短语作原因状语。', difficulty: 3 },
    { stem: '_____ from the hill, the school looks like a garden.', options: ['Seeing', 'Seen', 'To see', 'Having seen'], correct: 1, explanation: '学校"被看见"→过去分词Seen。"从山上看，学校像一个花园。"Seen from = When it is seen from。', difficulty: 3 },
    { stem: 'The teacher walked into the classroom, _____ a pile of books.', options: ['carrying', 'carried', 'was carrying', 'to carry'], correct: 0, explanation: '现在分词carrying作伴随状语，表示walked in的同时抱着书。', difficulty: 2 },
    { stem: '_____ the letter, she burst into tears.', options: ['Reading', 'To read', 'Having read', 'Read'], correct: 2, explanation: '先读完信然后哭了→分词的完成式Having read强调先后顺序。"读完了那封信，她大哭起来。"', difficulty: 4 }
  ]
};

// ============ 语法·特殊句式 ============

// --- 主谓一致 ---
App.knowledgeGraph['en_sv_agreement'] = {
  id: 'en_sv_agreement', name: '主谓一致',
  chapter: '语法·特殊句式', grade: '高一', difficulty: 3,
  prerequisites: ['en_tense_simple_cont'],
  description: '掌握语法一致、意义一致、就近一致三大原则，处理集合名词/不定代词/并列主语等特殊情况',
  position: { x: 650, y: 80 },
  diagnosticQuestions: [
    { stem: 'The teacher with his students _____ going to the museum.', options: ['are', 'is', 'were', 'have been'], correct: 1, explanation: '主语The teacher是单数，with his students是伴随状语不影响主谓一致→用is。', testsPrerequisite: null },
    { stem: 'Neither he nor I _____ interested in the film.', options: ['are', 'is', 'am', 'be'], correct: 2, explanation: 'neither...nor...用就近原则：离动词最近的主语是I→用am。', testsPrerequisite: null },
    { stem: 'The police _____ searching for the lost child.', options: ['is', 'are', 'was', 'has been'], correct: 1, explanation: 'police是集合名词，通常视为复数→用are。类似词：people, cattle。', testsPrerequisite: null },
    { stem: 'Every boy and every girl _____ to attend the meeting.', options: ['want', 'wants', 'are wanting', 'have wanted'], correct: 1, explanation: '"every+单数名词+and+every+单数名词"做主语，谓语用单数。', testsPrerequisite: null },
    { stem: 'Two thirds of the water in this area _____ polluted.', options: ['are', 'is', 'have been', 'were'], correct: 1, explanation: '分数+不可数名词做主语→谓语用单数。水是不可数名词→is polluted。', testsPrerequisite: null },
    { stem: 'The number of students in our school _____ increasing.', options: ['are', 'is', 'were', 'have been'], correct: 1, explanation: 'The number of...(单数) vs A number of...(复数)。the number做主语用单数。', testsPrerequisite: null },
    { stem: 'Either you or the headmaster _____ to sign the document.', options: ['are', 'is', 'has', 'have'], correct: 1, explanation: 'either...or...用就近原则，谓语与the headmaster(单数)一致→用is。解题陷阱：考生易误用are（就近是you）或have（现在完成时），但签文件是一般性事实用is。', testsPrerequisite: null },
    { stem: 'More than one student _____ visited the museum.', options: ['have', 'has', 'are', 'were'], correct: 1, explanation: '"more than one+单数名词"在意义上是复数但语法上用单数谓语。解题陷阱：more than one逻辑上≥2但语法上要求单数。', testsPrerequisite: null }
  ],
  practiceQuestions: [
    { stem: '由either...or...连接的主语，谓语用？', options: ['就近原则', '就远原则', '一律复数', '一律单数'], correct: 0, explanation: 'either...or.../neither...nor.../not only...but also...等连词用就近原则。', difficulty: 2 },
    { stem: 'news, maths, physics等学科名词作主语时，谓语用？', options: ['复数', '单数', '取决于含义', '无规则'], correct: 1, explanation: '以s结尾的学科名词(news/maths/physics等)作主语时谓语用单数。', difficulty: 2 },
    { stem: 'family/team/class等集体名词作主语时？', options: ['一律单数', '一律复数', '强调整体用单数，强调成员用复数', '无规则'], correct: 2, explanation: '集体名词：整体概念用单数，成员个体用复数。The family is large./The family are early risers.', difficulty: 3 },
    { stem: 'The teacher, together with all of her students, _____ going on a field trip tomorrow.', options: ['are', 'is', 'were', 'have been'], correct: 1, explanation: '主语The teacher是单数，together with...是插入语不影响谓语。就前原则→用is。', difficulty: 3 },
    { stem: 'A large amount of money _____ spent on the project every year.', options: ['are', 'is', 'were', 'have been'], correct: 1, explanation: '"a large amount of + 不可数名词"作主语，谓语用单数。money为不可数名词→is spent。', difficulty: 3 },
    { stem: 'Not only the students but also their teacher _____ fond of playing basketball.', options: ['are', 'is', 'were', 'have been'], correct: 1, explanation: 'not only...but also...用就近原则。离动词近的是their teacher(单数)→用is。', difficulty: 3 },
    { stem: 'The pair of glasses _____ on the desk, but where are my keys?', options: ['are', 'is', 'were', 'have been'], correct: 1, explanation: '"a pair of + 复数名词"作主语，谓语用单数。a pair of glasses(一副眼镜)作整体→is。解题陷阱：glasses是复数形式但pair of才是主语中心词。', difficulty: 3 },
    { stem: 'Every means _____ tried, but none of them works.', options: ['have been', 'has been', 'are', 'were'], correct: 1, explanation: 'means(方式/方法)单复数同形。与every搭配用单数→has been tried。"每种方法都试过了。"', difficulty: 4 }
  ]
};

// --- 倒装与强调 ---
App.knowledgeGraph['en_inversion'] = {
  id: 'en_inversion', name: '倒装与强调句',
  chapter: '语法·特殊句式', grade: '高一', difficulty: 4,
  prerequisites: ['en_adverbial_clause'],
  description: '掌握全部倒装(here/there/方位副词)、部分倒装(否定词/only/so...that)、强调句(It is...that...)的结构',
  position: { x: 700, y: 40 },
  diagnosticQuestions: [
    { stem: 'Only then _____ the importance of English.', options: ['I realized', 'did I realize', 'I did realize', 'realized I'], correct: 1, explanation: '"Only+状语"位于句首引起部分倒装→助动词提前did I realize。', testsPrerequisite: null },
    { stem: 'Not until he came back _____ the truth.', options: ['I knew', 'did I know', 'I did know', 'knew I'], correct: 1, explanation: 'Not until位于句首，主句用部分倒装。正常：I didn\'t know the truth until he came back。倒装：Not until...did I know...', testsPrerequisite: null },
    { stem: '—I like English. —_____.', options: ['So I do', 'So do I', 'Neither do I', 'I do so'], correct: 1, explanation: 'So+助动词+主语=...也是。So do I(=我也喜欢)。So+主语+助动词(=确实如此)是确认上文。', testsPrerequisite: null },
    { stem: 'It was in the park _____ we first met.', options: ['where', 'that', 'which', 'when'], correct: 1, explanation: '强调句型：It is/was+被强调部分+that+其余部分。强调in the park。', testsPrerequisite: null },
    { stem: '_____ come to our help!', options: ['May you', 'If you may', 'If may you', 'May your'], correct: 0, explanation: 'May+主语+动词原形表示祝愿的倒装。May you come to our help!(愿你来帮我们！)', testsPrerequisite: null },
    { stem: 'Hardly _____ the airport when the plane took off.', options: ['I had reached', 'had I reached', 'did I reach', 'I reached'], correct: 1, explanation: 'Hardly...when...(=刚...就...)。Hardly位于句首时主句用部分倒装（过去完成时助动词had提前）。', testsPrerequisite: null },
    { stem: 'Under no circumstances _____ use your phone during the exam.', options: ['you should', 'should you', 'you may', 'you can'], correct: 1, explanation: 'Under no circumstances(在任何情况下都不)位于句首引起部分倒装→should you。否定意义的介词短语放句首需倒装。', testsPrerequisite: null },
    { stem: 'It was not until midnight _____ he finished his work.', options: ['when', 'that', 'which', 'then'], correct: 1, explanation: 'It was not until...that...是强调句型，强调时间状语"直到午夜"。不是定语从句，不能用when。解题陷阱：until中考生易误用when，但强调句必须用that。', testsPrerequisite: null }
  ],
  practiceQuestions: [
    { stem: '部分倒装是指什么提前？', options: ['主语提前', '助动词/情态动词/be动词提前', '宾语提前', '状语提前'], correct: 1, explanation: '部分倒装将助动词/情态动词/be动词放到主语之前。', difficulty: 2 },
    { stem: '哪些否定词位于句首引起倒装？', options: ['not, never', 'never, hardly, seldom, not until, no sooner', 'always, usually', 'sometimes, often'], correct: 1, explanation: '否定词/半否定词位于句首：never, seldom, hardly, scarcely, not until, no sooner等。', difficulty: 2 },
    { stem: '强调句It is/was...that...去掉框架后，句子应？', options: ['不完整', '语法完整', '意思改变', '需要加词'], correct: 1, explanation: '去掉It is/was和that后，剩余部分应能构成一个语法完整的句子。这是判断强调句的方法。', difficulty: 3 },
    { stem: 'Never before _____ such a beautiful sunset.', options: ['I have seen', 'have I seen', 'I saw', 'did I see'], correct: 1, explanation: 'Never位于句首引起部分倒装→have I seen。否定副词never放句首时助动词提前。', difficulty: 3 },
    { stem: 'Not only _____ the exam, but he also got the highest score.', options: ['he passed', 'did he pass', 'he did pass', 'passed he'], correct: 1, explanation: '"Not only + 分句"位于句首时，该分句用部分倒装→did he pass。解题陷阱：注意not only倒装的是所在的句子，but also后的句子不倒装。', difficulty: 3 },
    { stem: '_____, I would not go outside in such bad weather.', options: ['Were I you', 'I were you', 'Was I you', 'I was you'], correct: 0, explanation: 'If I were you的虚拟条件句省略if时倒装为Were I you。"如果我是你，这种坏天气不会出门。"', difficulty: 4 },
    { stem: 'It _____ Tom and Jerry _____ broke the window.', options: ['was...who', 'were...that', 'was...whom', 'is...which'], correct: 0, explanation: '强调句It was...who/that...强调人。被强调部分是Tom and Jerry(复数)但强调句的be动词统一用was/who来搭配。也可用that。', difficulty: 3 },
    { stem: 'So tired _____ that she fell asleep immediately.', options: ['she was', 'was she', 'she did', 'did she'], correct: 1, explanation: 'So+adj位于句首引起部分倒装→was she。"她那么累以至于立刻睡着了。"', difficulty: 4 }
  ]
};

// ===== 章节-知识点映射 =====
App.chapterNodes = {
  '语法·时态语态': ['en_tense_simple_cont', 'en_tense_perfect', 'en_passive'],
  '语法·情态与虚拟': ['en_modal', 'en_subjunctive'],
  '语法·从句': ['en_noun_clause', 'en_relative_clause', 'en_adverbial_clause'],
  '语法·非谓语动词': ['en_nonfinite_infinitive', 'en_nonfinite_participle'],
  '语法·特殊句式': ['en_sv_agreement', 'en_inversion']
};

console.log('📖 英语知识图谱加载完成: ' + Object.keys(App.knowledgeGraph).length + ' 个知识点');
