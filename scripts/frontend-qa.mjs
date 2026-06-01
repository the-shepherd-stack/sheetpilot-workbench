import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { chromium } from 'playwright';

const baseUrl = process.env.WMF_QA_BASE_URL || 'https://writemyformula.com/';
const outputDir = resolve('output/playwright/frontend-qa');

const cases = [
  {
    name: 'Excel XLOOKUP writes exact customer lookup with fallback',
    mode: 'write',
    platform: 'excel',
    task: 'Look up the customer ID in A2 and return the matching Plan from the Customers table.',
    table: 'Customer ID,Plan,Price\nC-100,Pro,29\nC-200,Team,79',
    range: 'A2:C100; result in D2',
    hint: 'XLOOKUP exact match with not-found fallback',
    expect: {
      formula: [/XLOOKUP/i, /A2/i, /not\s*found/i],
      explanation: [/look/i, /plan/i],
      checks: [/customer|plan|range|column/i]
    }
  },
  {
    name: 'Excel SUMIFS writes paid invoice current-month total',
    mode: 'write',
    platform: 'excel',
    task: 'Sum invoice amounts where Status is Paid and Invoice Date is in the current month.',
    table: 'Invoice Date,Status,Amount\n2026-06-01,Paid,1200\n2026-06-03,Open,850',
    range: 'A2:C500',
    hint: 'SUMIFS',
    expect: {
      formula: [/SUMIFS/i, /Paid/i, /EOMONTH|TODAY|DATE/i],
      explanation: [/sum|adds/i, /paid/i, /month/i],
      checks: [/date|status|amount|numeric/i]
    }
  },
  {
    name: 'Excel COUNTIFS writes active high-revenue count',
    mode: 'write',
    platform: 'excel',
    task: 'Count customers where Status is Active and Revenue is greater than 1000.',
    table: 'Customer,Status,Revenue\nAcme,Active,1200\nNorthwind,Paused,800',
    range: 'A2:C500',
    hint: 'COUNTIFS',
    expect: {
      formula: [/COUNTIFS/i, /Active/i, />\s*1000|">1000"/i],
      explanation: [/count/i, /active/i, /1000/i],
      checks: [/status|revenue|range|numeric/i]
    }
  },
  {
    name: 'Google Sheets FILTER writes multi-condition row filter',
    mode: 'write',
    platform: 'sheets',
    task: 'Return only rows where Status is Active and Revenue is greater than 1000.',
    table: 'Customer,Status,Revenue\nAcme,Active,1200\nNorthwind,Paused,800',
    range: 'A2:C500',
    hint: 'FILTER',
    expect: {
      formula: [/FILTER/i, /Active/i, />\s*1000|1000/i],
      explanation: [/return|filter/i, /active/i, /revenue/i],
      checks: [/status|revenue|range|row/i]
    }
  },
  {
    name: 'Google Sheets REGEXEXTRACT writes email domain extraction',
    mode: 'write',
    platform: 'sheets',
    task: 'Extract the domain from each email address.',
    table: 'Email,Name\nalex@example.com,Alex\nsam@acme.co,Sam',
    range: 'A2:A500; result in C2',
    hint: 'REGEXEXTRACT',
    expect: {
      formula: [/REGEXEXTRACT|SPLIT|MID|RIGHT/i, /@|domain|\.\+/i],
      explanation: [/domain/i, /email/i],
      compatibility: [/Google Sheets|Sheets/i]
    }
  },
  {
    name: 'Excel conditional formatting writes overdue open-row rule',
    mode: 'write',
    platform: 'excel',
    task: 'Write a conditional formatting custom formula for apply range A2:D100 that highlights a row when Due Date in column C is before today and Status in column D is not Done.',
    table: 'Task,Owner,Due Date,Status\nRenew contract,Mara,2026-05-15,Open',
    range: 'Apply to A2:D100',
    hint: 'Use AND with locked columns',
    expect: {
      formula: [/AND/i, /\$?C2/i, /TODAY/i, /\$?D2/i, /Done/i],
      explanation: [/highlight|format|row/i, /due/i, /status/i],
      checks: [/apply|range|row|column|\$/i]
    }
  },
  {
    name: 'Excel data validation writes unique ID rule',
    mode: 'write',
    platform: 'excel',
    task: 'Write a custom data validation formula for cell A2 that allows an invoice ID only when it is not blank and does not already appear in A2:A100.',
    table: 'Invoice ID,Customer,Amount\nINV-100,Acme,1200',
    range: 'Validate A2:A100',
    hint: 'COUNTIF',
    expect: {
      formula: [/COUNTIF/i, /A2/i, /=\s*1|<\s*2/i],
      explanation: [/duplicate|unique|blank|not blank/i],
      checks: [/validation|range|copy|apply/i]
    }
  },
  {
    name: 'Excel INDEX MATCH writes left lookup instead of VLOOKUP',
    mode: 'write',
    platform: 'excel',
    task: 'Look up the SKU in E2 and return the Product Name from column A, where SKU is in column C.',
    table: 'Product Name,Category,SKU,Price\nWidget,Tools,W-100,19',
    range: 'A2:D500; lookup value in E2',
    hint: 'INDEX MATCH left lookup',
    expect: {
      formula: [/INDEX/i, /MATCH/i, /E2/i],
      explanation: [/lookup|find/i, /product/i, /SKU/i],
      checks: [/SKU|product|range|column/i]
    }
  },
  {
    name: 'Excel WORKDAY writes business-day due date',
    mode: 'write',
    platform: 'excel',
    task: 'Calculate a due date 5 business days after the start date in A2.',
    table: 'Start Date,Due Date\n2026-06-01,',
    range: 'Result in B2',
    hint: 'WORKDAY',
    expect: {
      formula: [/WORKDAY/i, /A2/i, /5/],
      explanation: [/business|workday/i, /5/i],
      compatibility: [/Excel|Google Sheets|Sheets/i]
    }
  },
  {
    name: 'Excel percent change writes safe growth formula',
    mode: 'write',
    platform: 'excel',
    task: 'Calculate percent change from Old Value in B2 to New Value in C2 and avoid divide-by-zero errors.',
    table: 'Month,Old Value,New Value\nJune,100,125',
    range: 'Result in D2',
    hint: 'IFERROR',
    expect: {
      formula: [/B2/i, /C2/i, /\//, /IFERROR|IF/i],
      explanation: [/percent|change|growth/i, /old|new/i],
      checks: [/zero|blank|format|percentage|numeric/i]
    }
  },
  {
    name: 'Excel VLOOKUP fix adds exact-match argument',
    mode: 'fix',
    platform: 'excel',
    formula: '=VLOOKUP(A2,Customers!A:C,3)',
    expect: {
      formula: [/VLOOKUP/i, /FALSE|0/i],
      explanation: [/exact|approximate|match/i],
      checks: [/lookup|range|column|first/i]
    }
  },
  {
    name: 'Excel XLOOKUP fix adds readable missing-match fallback',
    mode: 'fix',
    platform: 'excel',
    formula: '=XLOOKUP(A2,Customers!A:A,Customers!C:C)',
    expect: {
      formula: [/XLOOKUP/i, /Not\s*found|IFERROR|if_not_found/i],
      explanation: [/missing|not found|fallback|error/i],
      checks: [/lookup|range|match|return/i]
    }
  },
  {
    name: 'Google Sheets FILTER fix repairs mismatched condition range size',
    mode: 'fix',
    platform: 'sheets',
    formula: '=FILTER(A2:C100,B2:B50="Active")',
    expect: {
      formula: [/FILTER/i, /A2:C100/i, /B2:B100|B2:B/i],
      explanation: [/mismatch|same size|range|condition/i],
      checks: [/range|row|size|condition/i]
    }
  },
  {
    name: 'Excel SUMIFS fix aligns mismatched criteria range',
    mode: 'fix',
    platform: 'excel',
    formula: '=SUMIFS(C2:C100,B2:B50,"Paid")',
    expect: {
      formula: [/SUMIFS/i, /C2:C100/i, /B2:B100|B2:B/i],
      explanation: [/same size|mismatch|range|criteria/i],
      checks: [/sum_range|criteria|range|size/i]
    }
  },
  {
    name: 'Explain nested IF describes each branch',
    mode: 'explain',
    platform: 'excel',
    formula: '=IF(A2="","Missing",IF(B2>1000,"Review","OK"))',
    expect: {
      formula: [/IF/i, /Missing/i, /Review/i, /OK/i],
      explanation: [/empty|blank/i, /1000/i, /Review/i, /OK/i],
      checks: [/A2|B2|type|row|numeric/i]
    }
  },
  {
    name: 'Explain SUMIFS describes paid current-month criteria',
    mode: 'explain',
    platform: 'excel',
    formula: '=SUMIFS(C2:C500,B2:B500,"Paid",A2:A500,">="&EOMONTH(TODAY(),-1)+1,A2:A500,"<="&EOMONTH(TODAY(),0))',
    expect: {
      formula: [/SUMIFS/i, /Paid/i, /EOMONTH/i],
      explanation: [/sum|adds/i, /paid/i, /current month|month/i],
      checks: [/date|amount|status|numeric/i]
    }
  }
];

function textMatches(text, patterns = []) {
  return patterns.every((pattern) => pattern.test(text));
}

function mismatch(label, text, patterns = []) {
  return patterns
    .filter((pattern) => !pattern.test(text))
    .map((pattern) => `${label} missing ${pattern}`);
}

async function setMode(page, mode) {
  await page.locator(`button[data-mode="${mode}"]`).click();
}

async function setPlatform(page, platform) {
  await page.locator(`button[data-platform="${platform}"]`).click();
}

async function setField(page, selector, value) {
  await page.locator(selector).evaluate((element, nextValue) => {
    element.value = nextValue;
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
  }, value);
}

async function fillCase(page, testCase) {
  await setMode(page, testCase.mode);
  await setPlatform(page, testCase.platform);
  await setField(page, '#task', testCase.task || '');
  await setField(page, '#table', testCase.table || '');
  await setField(page, '#range', testCase.range || '');
  await setField(page, '#hint', testCase.hint || '');
  await setField(page, '#formula', testCase.formula || '');
}

async function runCase(page, testCase) {
  await fillCase(page, testCase);

  const responsePromise = page.waitForResponse(
    (response) => response.url().includes('/api/formula') && response.request().method() === 'POST',
    { timeout: 60_000 }
  );
  await page.locator('#run').click();
  const response = await responsePromise;
  let apiJson = null;
  try {
    apiJson = await response.json();
  } catch {
    apiJson = null;
  }

  await page.waitForFunction(() => !document.querySelector('#run')?.disabled, null, { timeout: 60_000 });
  const formula = (await page.locator('#output-formula').textContent())?.trim() || '';
  const explanation = (await page.locator('#output-steps').innerText())?.trim() || '';
  const checks = (await page.locator('#output-checks').innerText())?.trim() || '';
  const compatibility = (await page.locator('#compatibility-note').textContent())?.trim() || '';

  const failures = [
    ...mismatch('formula', formula, testCase.expect.formula),
    ...mismatch('explanation', explanation, testCase.expect.explanation),
    ...mismatch('checks', checks, testCase.expect.checks),
    ...mismatch('compatibility', compatibility, testCase.expect.compatibility)
  ];

  const visibleMatchesApi = !apiJson?.formula || formula === apiJson.formula;
  if (!visibleMatchesApi) {
    failures.push('visible formula did not match /api/formula response');
  }

  return {
    name: testCase.name,
    mode: testCase.mode,
    platform: testCase.platform,
    status: response.status(),
    passed: response.ok() && failures.length === 0,
    failures,
    formula,
    explanation,
    checks,
    compatibility,
    apiSource: apiJson?.source || '',
    apiWarning: apiJson?.warning || ''
  };
}

await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1200 }
});
await context.addInitScript(() => {
  localStorage.setItem('write-my-formula-pro', '1');
  localStorage.setItem('write-my-formula-anonymous-trial-usage', '0');
});

const page = await context.newPage();
const consoleMessages = [];
page.on('console', (message) => {
  if (['error', 'warning'].includes(message.type())) {
    consoleMessages.push({ type: message.type(), text: message.text() });
  }
});

const results = [];
try {
  await page.goto(baseUrl, { waitUntil: 'networkidle', timeout: 60_000 });
  await page.screenshot({ path: resolve(outputDir, 'start.png'), fullPage: true });

  for (const testCase of cases) {
    const result = await runCase(page, testCase);
    results.push(result);
    console.log(`${result.passed ? 'PASS' : 'FAIL'} ${result.name}`);
    if (!result.passed) {
      console.log(`  ${result.failures.join('; ')}`);
      console.log(`  formula: ${result.formula}`);
    }
  }

  await page.screenshot({ path: resolve(outputDir, 'finish.png'), fullPage: true });
} finally {
  await browser.close();
}

const summary = {
  baseUrl,
  runAt: new Date().toISOString(),
  total: results.length,
  passed: results.filter((result) => result.passed).length,
  failed: results.filter((result) => !result.passed).length,
  consoleMessages,
  results
};

await writeFile(resolve(outputDir, 'frontend-qa-results.json'), `${JSON.stringify(summary, null, 2)}\n`);

console.log(JSON.stringify({
  total: summary.total,
  passed: summary.passed,
  failed: summary.failed,
  report: resolve(outputDir, 'frontend-qa-results.json')
}, null, 2));

if (summary.failed > 0 || consoleMessages.some((message) => message.type === 'error')) {
  process.exitCode = 1;
}
