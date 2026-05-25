const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function normalizeHeaders(rawTable) {
  const rows = rawTable
    .trim()
    .split(/\r?\n/)
    .map((line) => line.split(/\t|,/).map((cell) => cell.trim()))
    .filter((row) => row.some(Boolean));

  const headers = rows[0] || [];
  return headers.map((header, index) => ({
    label: header || `Column ${index + 1}`,
    letter: columnLetter(index + 1)
  }));
}

export function columnLetter(index) {
  let value = index;
  let result = '';

  while (value > 0) {
    const mod = (value - 1) % 26;
    result = LETTERS[mod] + result;
    value = Math.floor((value - mod) / 26);
  }

  return result || 'A';
}

export function explainFormula(formula) {
  const clean = formula.trim();
  if (!clean) {
    return 'Paste a formula first.';
  }

  return explainFormulaSteps(clean).join(' ');
}

export function explainFormulaSteps(formula) {
  const clean = formula.trim();
  if (!clean) {
    return ['Paste a formula first.'];
  }

  const name = clean.match(/^=?([A-Z.]+)\s*\(/i)?.[1]?.toUpperCase();
  const known = {
    SUM: 'Adds every numeric value in the selected range.',
    SUMIF: 'Adds values that match one condition.',
    SUMIFS: 'Adds values that match multiple conditions.',
    AVERAGE: 'Returns the arithmetic mean for the selected range.',
    XLOOKUP: 'Finds a lookup value and returns the matching value from another range.',
    VLOOKUP: 'Finds a value in the first column of a table and returns a value from another column.',
    IF: 'Checks a condition and returns one result when true and another when false.',
    IFS: 'Checks multiple conditions in order and returns the first matching result.',
    IFERROR: 'Returns a fallback result when the wrapped formula produces an error.',
    COUNTIF: 'Counts cells in a range that match one condition.',
    COUNTIFS: 'Counts rows that match multiple conditions.',
    FILTER: 'Returns rows that match one or more conditions.',
    UNIQUE: 'Returns distinct values from a range.',
    TEXTJOIN: 'Combines values into one text string with a separator.',
    TEXTAFTER: 'Returns the text that appears after a delimiter.',
    REGEXEXTRACT: 'Extracts matching text with a regular expression.'
  };

  const ranges = [...clean.matchAll(/\b\$?[A-Z]{1,3}\$?\d+:\$?[A-Z]{1,3}\$?\d+\b/g)].map((match) => match[0]);
  const steps = [known[name] || 'Uses spreadsheet functions and cell references to calculate or transform values.'];

  if (ranges.length) {
    steps.push(`It reads from ${dedupe(ranges).join(', ')}.`);
  }

  if (/IFERROR/i.test(clean)) {
    steps.push('The IFERROR wrapper keeps the sheet readable when the lookup or calculation fails.');
  }

  return steps;
}

export function validateFormula(formula) {
  const issues = [];
  const open = (formula.match(/\(/g) || []).length;
  const close = (formula.match(/\)/g) || []).length;
  const quoteCount = (formula.match(/"/g) || []).length;

  if (!formula.trim().startsWith('=')) {
    issues.push('Add "=" at the start before pasting into Excel or Google Sheets.');
  }

  if (open !== close) {
    issues.push(`Parentheses are unbalanced: ${open} opening and ${close} closing.`);
  }

  if (quoteCount % 2 !== 0) {
    issues.push('A text string is missing a closing quote.');
  }

  if (/,,/.test(formula)) {
    issues.push('There is an empty argument between two commas.');
  }

  if (/=[A-Z.]+\([^)]*$/.test(formula.trim())) {
    issues.push('The function appears unfinished.');
  }

  if (/#N\/A/i.test(formula) && !/IFERROR/i.test(formula)) {
    issues.push('Wrap the lookup in IFERROR to handle #N/A results cleanly.');
  }

  return issues;
}

export function fixFormula(formula) {
  const clean = formula.trim();
  const normalized = clean.startsWith('=') ? clean : `=${clean}`;
  const checks = validateFormula(normalized);

  if (/XLOOKUP|VLOOKUP|MATCH/i.test(normalized) && !/IFERROR/i.test(normalized)) {
    const inner = normalized.slice(1);
    const fixed = `=IFERROR(${inner},"Not found")`;
    return {
      formula: fixed,
      explanation: 'Wraps the lookup in IFERROR so missing matches show a readable fallback instead of an error.',
      compatibility: 'IFERROR works in Excel and Google Sheets.',
      steps: [
        'Keeps the original lookup logic.',
        'Adds IFERROR around the lookup.',
        'Returns "Not found" when the lookup cannot find a match.'
      ],
      checks: validateFormula(fixed)
    };
  }

  return {
    formula: normalized,
    explanation: checks.length ? 'Review the listed syntax issues before pasting this formula.' : 'No basic syntax issues were found.',
    compatibility: 'Basic syntax checks apply to Excel and Google Sheets.',
    steps: checks.length
      ? checks
      : ['Keeps the formula unchanged.', 'Checks the equals sign, parentheses, quotes, and empty arguments.', 'Test the result on a copy of your sheet.'],
    checks
  };
}

export function generateFormula({ task, platform = 'excel', rawTable = '', range = '', hint = '' }) {
  const text = `${task} ${hint}`.toLowerCase();
  const headers = normalizeHeaders(rawTable);
  const rows = rawTable.trim() ? Math.max(rawTable.trim().split(/\r?\n/).length, 2) : 100;
  const endRow = Math.max(rows, 100);
  const context = {
    platform,
    headers,
    endRow,
    range: range.trim(),
    hint: hint.trim(),
    first: headers[0]?.letter || 'A',
    second: headers[1]?.letter || 'B',
    third: headers[2]?.letter || 'C'
  };

  if (/domain|email|extract|textafter|regexextract/.test(text)) {
    const emailColumn = findHeader(headers, ['email'])?.letter || context.first;
    const formula = platform === 'sheets'
      ? `=REGEXEXTRACT(${emailColumn}2,"@(.+)$")`
      : `=TEXTAFTER(${emailColumn}2,"@")`;

    return result({
      formula,
      explanation: `Extracts the domain from the email address in ${emailColumn}2.`,
      compatibility: platform === 'sheets'
        ? 'Uses REGEXEXTRACT, which is native to Google Sheets.'
        : 'Uses TEXTAFTER, available in Microsoft 365 and recent Excel.',
      steps: [
        `Reads the email address in ${emailColumn}2.`,
        'Finds the text after the @ symbol.',
        'Returns the domain so it can be filled down the column.'
      ]
    });
  }

  if (/\b(sumifs?|total|add|paid|invoice)\b/.test(text) && /\b(paid|status|invoice|this month|date)\b/.test(text)) {
    const amount = findHeader(headers, ['amount', 'total', 'price', 'revenue'])?.letter || context.third;
    const status = findHeader(headers, ['status', 'paid'])?.letter || context.second;
    const date = findHeader(headers, ['date', 'month', 'invoice date'])?.letter || context.first;

    return result({
      formula: `=SUMIFS(${amount}2:${amount}${endRow},${status}2:${status}${endRow},"Paid",${date}2:${date}${endRow},">="&EOMONTH(TODAY(),-1)+1,${date}2:${date}${endRow},"<="&EOMONTH(TODAY(),0))`,
      explanation: `Adds values in column ${amount} where status is Paid and the date is in the current month.`,
      compatibility: 'SUMIFS and EOMONTH work in Excel and Google Sheets.',
      steps: [
        `Adds the invoice amounts in ${amount}2:${amount}${endRow}.`,
        `Keeps only rows where ${status} is Paid.`,
        `Limits the total to dates from the first through last day of this month.`
      ]
    });
  }

  if (/countifs|countif|count|how many/.test(text)) {
    const status = findHeader(headers, ['status', 'state'])?.letter || context.second;
    const amount = findHeader(headers, ['revenue', 'amount', 'total', 'price'])?.letter || context.third;

    return result({
      formula: `=COUNTIFS(${status}2:${status}${endRow},"Active",${amount}2:${amount}${endRow},">1000")`,
      explanation: `Counts rows where column ${status} is Active and column ${amount} is greater than 1000.`,
      compatibility: 'COUNTIFS works in Excel and Google Sheets.',
      steps: [
        `Checks each row in ${status}2:${status}${endRow} for the Active status.`,
        `Checks each matching row in ${amount}2:${amount}${endRow} for values above 1000.`,
        'Returns the number of rows that meet both criteria.'
      ]
    });
  }

  if (/vlookup/.test(text)) {
    return result({
      formula: `=VLOOKUP(${context.first}2,${context.first}2:${context.third}${endRow},2,FALSE)`,
      explanation: `Searches for ${context.first}2 in the first column of the table and returns the second column from the same row.`,
      compatibility: 'VLOOKUP works in Excel and Google Sheets, including older files.',
      steps: [
        `Looks for ${context.first}2 in the first column of ${context.first}2:${context.third}${endRow}.`,
        'Returns the second column from the matching row.',
        'Uses FALSE so the match must be exact.'
      ]
    });
  }

  if (/xlookup|lookup|look up|find matching|match|price|customer/.test(text)) {
    const lookupColumn = findHeader(headers, ['customer', 'id', 'plan', 'sku'])?.letter || context.first;
    const returnColumn = findHeader(headers, ['price', 'amount', 'plan', 'email'])?.letter || context.second;
    const lookupCell = `${lookupColumn}2`;

    return result({
      formula: `=XLOOKUP(${lookupCell},$${lookupColumn}$2:$${lookupColumn}$${endRow},$${returnColumn}$2:$${returnColumn}$${endRow},"Not found")`,
      explanation: `Looks up ${lookupCell} and returns the matching value from column ${returnColumn}.`,
      compatibility: 'XLOOKUP works in Google Sheets and modern Excel. Use VLOOKUP for older Excel files.',
      steps: [
        `Reads the lookup value in ${lookupCell}.`,
        `Searches ${lookupColumn}2:${lookupColumn}${endRow} for that value.`,
        `Returns the matching value from ${returnColumn}2:${returnColumn}${endRow}, or "Not found".`
      ]
    });
  }

  if (/if |if\b|ifs|when|true|false|greater|less|above|below/.test(text)) {
    return result({
      formula: `=IF(${context.second}2>0,"Yes","No")`,
      explanation: `Checks whether ${context.second}2 is greater than zero and returns Yes or No.`,
      compatibility: 'IF works in Excel and Google Sheets.',
      steps: [
        `Tests whether ${context.second}2 is greater than zero.`,
        'Returns "Yes" when the test is true.',
        'Returns "No" when the test is false.'
      ]
    });
  }

  if (/average|mean/.test(text)) {
    return result({
      formula: `=AVERAGE(${context.second}2:${context.second}${endRow})`,
      explanation: `Averages numeric values in column ${context.second}.`,
      compatibility: 'AVERAGE works in Excel and Google Sheets.',
      steps: [
        `Reads numeric values in ${context.second}2:${context.second}${endRow}.`,
        'Ignores blank cells.',
        'Returns the arithmetic mean.'
      ]
    });
  }

  if (/percent|percentage|change|growth/.test(text)) {
    return result({
      formula: `=IFERROR((${context.third}2-${context.second}2)/${context.second}2,0)`,
      explanation: `Calculates percentage change from ${context.second}2 to ${context.third}2 and returns 0 if the old value is missing or zero.`,
      compatibility: 'IFERROR and percentage calculations work in Excel and Google Sheets.',
      steps: [
        `Subtracts the old value in ${context.second}2 from the new value in ${context.third}2.`,
        `Divides by ${context.second}2 to get the rate of change.`,
        'Returns 0 instead of an error when the old value is blank or zero.'
      ]
    });
  }

  if (/combine|join|concatenate|merge text|textjoin/.test(text)) {
    return result({
      formula: `=TEXTJOIN(" ",TRUE,${context.first}2:${context.third}2)`,
      explanation: `Combines the row values from ${context.first}2 through ${context.third}2 with spaces, skipping blanks.`,
      compatibility: 'TEXTJOIN works in Google Sheets and modern Excel.',
      steps: [
        `Reads row values from ${context.first}2:${context.third}2.`,
        'Skips blank cells.',
        'Joins the remaining text with spaces.'
      ]
    });
  }

  if (/filter|only rows|where/.test(text)) {
    return result({
      formula: `=FILTER(${context.first}2:${context.third}${endRow},${context.second}2:${context.second}${endRow}<>"")`,
      explanation: `Returns rows where column ${context.second} is not blank.`,
      compatibility: platform === 'excel' ? 'FILTER requires Microsoft 365 or recent Excel.' : 'FILTER works well in Google Sheets.',
      steps: [
        `Returns rows from ${context.first}2:${context.third}${endRow}.`,
        `Keeps rows where ${context.second} is not blank.`,
        'Use another condition when you need a specific status or threshold.'
      ]
    });
  }

  return result({
    formula: `=IFERROR(${context.second}2,"")`,
    explanation: `Starts with a safe wrapper around ${context.second}2 so spreadsheet errors return a blank instead of breaking the sheet.`,
    compatibility: 'IFERROR works in Excel and Google Sheets.',
    steps: [
      `Reads ${context.second}2.`,
      'Returns the value when it is valid.',
      'Returns a blank if the referenced cell produces an error.'
    ]
  });
}

function findHeader(headers, needles) {
  for (const needle of needles) {
    const match = headers.find((header) => header.label.toLowerCase().includes(needle));
    if (match) return match;
  }

  return undefined;
}

function dedupe(values) {
  return [...new Set(values)];
}

function result(value) {
  return {
    ...value,
    checks: validateFormula(value.formula)
  };
}
