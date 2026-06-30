// ===== 题库质量校验脚本 =====
// 用法: node js/validateQuestions.js
// 模拟浏览器环境，加载 data.js / imported_questions.js / boost_questions.js
// 遍历 App.knowledgeGraph 中所有题目，逐项检查质量

const fs = require('node:fs');
const path = require('node:path');

// === 1. 模拟浏览器环境 ===
global.window = global;
global.App = {};

// === 2. 读取并 eval 数据文件 ===
const JS_DIR = path.resolve(__dirname);

function loadFile(filename) {
  const code = fs.readFileSync(path.join(JS_DIR, filename), 'utf-8');
  const patched = code
    .replace(/window\.App\s*=\s*window\.App\s*\|\|\s*\{\};?/g, '')
    .replace(/window\.App/g, 'App');
  eval(patched);
}

loadFile('data.js');
loadFile('imported_questions.js');
loadFile('boost_questions.js');

// === 3. 辅助函数：统计原始 data.js 中的 practice 题数 ===
function countDataJsPractices() {
  // 手动计算 data.js 中每个知识点的 practiceQuestions 条目数
  // 因为 boost_questions.js 会 push 到 practiceQuestions 中，无法在运行时区分
  const dataFile = fs.readFileSync(path.join(JS_DIR, 'data.js'), 'utf-8');
  // 提取每个 practiceQuestions 数组的内容
  // 使用循环逐个匹配，因为非贪婪匹配在嵌套 [] 时不可靠
  const matches = dataFile.match(/\{[^}]*stem\s*:[^}]*\}/g);
  if (!matches) return 0;
  // 只计数在 practiceQuestions 上下文中的 stem
  const sections = dataFile.split(/practiceQuestions\s*:\s*\[/);
  let count = 0;
  for (let i = 1; i < sections.length; i++) {
    // 取到下一个闭合的 ];
    const endIdx = sections[i].indexOf('];');
    const arrContent = endIdx > 0 ? sections[i].substring(0, endIdx) : sections[i];
    const stems = arrContent.match(/\{[\s\S]*?stem\s*:/g);
    if (stems) count += stems.length;
  }
  return count;
}

const dataJsPracticeCount = countDataJsPractices();

// === 4. 统计 boost 题数 ===
function countBoostQuestions() {
  const boostFile = fs.readFileSync(path.join(JS_DIR, 'boost_questions.js'), 'utf-8');
  const stems = boostFile.match(/\{[\s\S]*?stem\s*:/g);
  return stems ? stems.length : 0;
}

const boostCount = countBoostQuestions();

// === 5. 校验核心 ===
const results = [];
let countDiagnostic = 0;
let countPractice = 0;
let countImported = 0;

const nodeIds = Object.keys(App.knowledgeGraph);

for (const nodeId of nodeIds) {
  const node = App.knowledgeGraph[nodeId];

  // 原始诊断题
  const diag = node.diagnosticQuestions || [];
  for (let i = 0; i < diag.length; i++) {
    countDiagnostic++;
    validateQuestion(nodeId, 'diagnosticQuestions', i, diag[i], true, 'data.js');
  }

  // 原始练习题（含 boost 追加的部分）
  const prac = node.practiceQuestions || [];
  for (let i = 0; i < prac.length; i++) {
    countPractice++;
    // data.js 中的原始练习题用 'data.js'，超出部分的用 'boost_questions.js'
    const srcTag = i < dataJsPracticeCount ? 'data.js' : 'boost_questions.js';
    validateQuestion(nodeId, 'practiceQuestions', i, prac[i], false, srcTag);
  }

  // 导入诊断题
  const impDiag = node._importedDiagnostic || [];
  for (let i = 0; i < impDiag.length; i++) {
    countImported++;
    validateQuestion(nodeId, '_importedDiagnostic', i, impDiag[i], true, 'imported_questions.js');
  }

  // 导入练习题
  const impPrac = node._importedPractice || [];
  for (let i = 0; i < impPrac.length; i++) {
    countImported++;
    validateQuestion(nodeId, '_importedPractice', i, impPrac[i], false, 'imported_questions.js');
  }
}

function validateQuestion(nodeId, type, index, q, isDiagnostic, tag) {
  let failCount = 0;

  // 检查项 1: stem 非空且长度 >= 5
  if (!q.stem || typeof q.stem !== 'string' || q.stem.trim().length < 5) {
    failCount++;
    results.push({ nodeId, type, index, tag,
      message: `stem 为空或长度不足 (当前长度: ${String(q.stem).length})` });
  }

  // 检查项 2: options 长度 >= 2
  if (!Array.isArray(q.options) || q.options.length < 2) {
    failCount++;
    results.push({ nodeId, type, index, tag,
      message: `options 长度=${q.options?.length}，至少需要 2 个选项` });
  }

  // 检查项 3: options 中无重复（字符串完全相同）
  if (Array.isArray(q.options) && q.options.length >= 2) {
    const seen = {};
    for (let j = 0; j < q.options.length; j++) {
      const opt = q.options[j];
      if (seen[opt] !== undefined) {
        failCount++;
        results.push({ nodeId, type, index, tag,
          message: `options[${seen[opt]}]="${opt}" 和 options[${j}]="${opt}" 重复` });
      }
      seen[opt] = j;
    }
  }

  // 检查项 4: correct 索引在 options 范围内
  if (Array.isArray(q.options)) {
    if (typeof q.correct !== 'number' || q.correct < 0 || q.correct >= q.options.length) {
      failCount++;
      results.push({ nodeId, type, index, tag,
        message: `correct=${q.correct} 超出 options 范围 [0, ${q.options.length - 1}]` });
    }
  }

  // 检查项 5: explanation 非空且长度 >= 5
  if (!q.explanation || typeof q.explanation !== 'string' || q.explanation.trim().length < 5) {
    failCount++;
    results.push({ nodeId, type, index, tag,
      message: `explanation 为空或长度不足 (当前长度: ${String(q.explanation).length})` });
  }

  // 检查项 6: 诊断题必须有 testsPrerequisite 字段
  if (isDiagnostic) {
    if (q.testsPrerequisite === undefined) {
      failCount++;
      results.push({ nodeId, type, index, tag,
        message: `diagnosticQuestions 缺少 testsPrerequisite 字段` });
    } else if (q.testsPrerequisite !== null && !App.knowledgeGraph[q.testsPrerequisite]) {
      failCount++;
      results.push({ nodeId, type, index, tag,
        message: `testsPrerequisite="${q.testsPrerequisite}" 指向不存在的知识点` });
    }
  }

  // 检查项 7: 练习题必须有 difficulty 字段 (1-5)
  if (!isDiagnostic) {
    if (q.difficulty === undefined || q.difficulty === null) {
      failCount++;
      results.push({ nodeId, type, index, tag,
        message: `practiceQuestions 缺少 difficulty 字段` });
    } else if (typeof q.difficulty !== 'number' || q.difficulty < 1 || q.difficulty > 5) {
      failCount++;
      results.push({ nodeId, type, index, tag,
        message: `difficulty=${q.difficulty} 不在范围 [1, 5] 内` });
    }
  }

  // 检查项 8: stem 中无 "$" 或未闭合的 LaTeX 标记
  if (q.stem && typeof q.stem === 'string') {
    const stem = q.stem;

    // 8a: 未闭合的 $$
    const dd = stem.match(/\$\$/g);
    if (dd && dd.length % 2 !== 0) {
      failCount++;
      results.push({ nodeId, type, index, tag,
        message: `stem 中包含未闭合的 $$ LaTeX 标记` });
    }

    // 8b: 未闭合的 $（单美元符号，不成对）
    const sd = stem.match(/(?<!\$)\$(?!\$)/g);
    if (sd && sd.length % 2 !== 0) {
      failCount++;
      results.push({ nodeId, type, index, tag,
        message: `stem 中包含未闭合的 $ LaTeX 标记` });
    }

    // 8c: 未闭合的 \(...\)
    const lp = (stem.match(/\\\(/g) || []).length;
    const rp = (stem.match(/\\\)/g) || []).length;
    if (lp !== rp) {
      failCount++;
      results.push({ nodeId, type, index, tag,
        message: `stem 中包含未闭合的 \\(...\\) LaTeX 标记` });
    }

    // 8d: 未闭合的 \[...\]
    const lb = (stem.match(/\\\[/g) || []).length;
    const rb = (stem.match(/\\\]/g) || []).length;
    if (lb !== rb) {
      failCount++;
      results.push({ nodeId, type, index, tag,
        message: `stem 中包含未闭合的 \\[...\\] LaTeX 标记` });
    }
  }

  if (failCount === 0) {
    results.push({ nodeId, type, index, tag, message: null });
  }
}

// === 6. 输出结果 ===

let passCount = 0;
let failCount = 0;
const failEntries = [];

for (const r of results) {
  if (r.message === null) {
    passCount++;
  } else {
    failCount++;
    failEntries.push(r);
    console.log(`[FAIL] ${r.tag}:${r.nodeId} ${r.type}[${r.index}]: ${r.message}`);
  }
}

const totalQuestions = passCount + failCount;
const passRate = totalQuestions > 0 ? ((passCount / totalQuestions) * 100).toFixed(1) : '0.0';

console.log('');
console.log('=== 校验报告 ===');
console.log(`诊断题总数: ${countDiagnostic}`);
console.log(`练习题总数: ${countPractice}`);
console.log(`导入题总数: ${countImported}`);
console.log(`补充题总数: ${boostCount}`);
console.log(`问题题数: ${failCount}`);
console.log(`PASS: ${passCount} / FAIL: ${failCount}`);

console.log('');
if (failEntries.length > 0) {
  console.log('=== FAIL 详细列表 ===');
  let prevId = '';
  for (const r of failEntries) {
    const label = `${r.nodeId} ${r.type}[${r.index}]`;
    if (label !== prevId) {
      console.log(`  ${r.tag}  ${label}`);
      prevId = label;
    }
    console.log(`    ${r.message}`);
  }
}
console.log('');
console.log(`总题数: ${totalQuestions} | 问题数: ${failCount} | 通过率: ${passRate}%`);