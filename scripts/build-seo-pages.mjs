import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const template = readFileSync(resolve(root, 'index.html'), 'utf8');

const pages = [
  {
    slug: 'excel-formula-generator',
    title: 'Excel Formula Generator | Write My Formula',
    description: 'Generate Excel formulas from plain English with table context, range hints, explanations, and copy-ready output.',
    eyebrow: 'Excel formula generator',
    h1: 'Generate an Excel formula from a plain-English task.',
    lede: 'Tell the workbench what the sheet should do, paste headers or sample rows, and get a formula with the checks you need before copying it into Excel.',
    preset: {
      mode: 'write',
      platform: 'excel',
      task: 'Create an Excel formula that returns the matching plan price for each customer.',
      table: 'Customer,Plan,Price\nAcme,Pro,29\nNorthwind,Team,79',
      range: 'A2:C100; result in D2',
      hint: 'XLOOKUP'
    },
    intent: 'Build a formula for a clear Excel task when the sheet layout is already known.',
    bestFor: [
      'Lookup formulas that need the correct lookup and return ranges.',
      'Revenue, status, date, or category logic that is hard to write from memory.',
      'Turning pasted headers and sample rows into a formula that matches the workbook.'
    ],
    steps: [
      'Describe the outcome in normal language.',
      'Paste the headers or a few representative rows.',
      'Add the target cell or range so the formula uses the right references.'
    ],
    copyChecks: [
      'Confirm the lookup column and return column match your workbook.',
      'Use absolute ranges when the formula will be filled down.',
      'Check whether your Excel version supports the suggested function.'
    ]
  },
  {
    slug: 'google-sheets-formula-generator',
    title: 'Google Sheets Formula Generator | Write My Formula',
    description: 'Generate Google Sheets formulas from plain English and pasted sheet context, with Sheets-specific compatibility notes.',
    eyebrow: 'Google Sheets formula generator',
    h1: 'Turn a Google Sheets task into a formula you can paste.',
    lede: 'Describe the result you want, include the headers or sample rows, and get a Sheets formula with assumptions, checks, and a copy button.',
    preset: {
      mode: 'write',
      platform: 'sheets',
      task: 'Extract the domain from each customer email address.',
      table: 'Email,Customer\nalex@northwind.com,Northwind\nsam@acme.co,Acme',
      range: 'A2:A500; result in C2',
      hint: 'REGEXEXTRACT'
    },
    intent: 'Create a Google Sheets formula that fits Sheets functions, ranges, and text handling.',
    bestFor: [
      'Text cleanup, email parsing, and lightweight data preparation in Sheets.',
      'Array-friendly formulas where Google Sheets behavior differs from desktop Excel.',
      'Quick formulas for shared sheets where the assumptions need to be readable.'
    ],
    steps: [
      'Set the spreadsheet toggle to Google Sheets.',
      'Include sample values when the formula needs to parse text or dates.',
      'Use the function hint when you already know the Sheets function you want.'
    ],
    copyChecks: [
      'Check comma and locale separators before pasting.',
      'Confirm whether the output should fill one row or spill across multiple rows.',
      'Review compatibility notes before sharing the sheet with Excel users.'
    ]
  },
  {
    slug: 'excel-formula-help',
    title: 'Excel Formula Help | Write My Formula',
    description: 'Get help writing, explaining, or fixing one Excel formula with plain-English context, range notes, and checks before you paste.',
    eyebrow: 'Excel formula help',
    h1: "Write the Excel formula you're stuck on.",
    lede: 'Describe what the formula should do, paste the one that is broken, or add the headers involved, and get one formula-sized answer with the checks visible before you use it.',
    preset: {
      mode: 'write',
      platform: 'excel',
      task: 'Help me write an Excel formula that flags rows where the due date is past and the status is not Done.',
      table: 'Task,Due Date,Status\nRenew contract,2026-05-18,Open\nSend invoice,2026-05-29,Done',
      range: 'Due dates in B2:B500; status in C2:C500; result in D2',
      hint: 'IF'
    },
    intent: 'Help spreadsheet users who search broadly for Excel formula help move from a vague problem to a specific formula draft, explanation, or repair they can test on one known row.',
    bestFor: [
      'Choosing the right Excel function when you know the spreadsheet result but not the syntax.',
      'Fixing a formula that returns an error, stale value, blank, or wrong result.',
      'Explaining a coworker-written formula before editing a live workbook.'
    ],
    steps: [
      'Choose Write, Explain, or Fix based on the help you need.',
      'Paste headers, sample rows, or the formula itself so the answer can use real references.',
      'Add the expected result for one row when you already know what the formula should return.'
    ],
    copyChecks: [
      'Confirm every range matches your workbook before filling down.',
      'Test the output on one row where you already know the answer.',
      'Check whether your Excel version supports newer functions such as XLOOKUP, FILTER, TEXTSPLIT, or TEXTAFTER.'
    ]
  },
  {
    slug: 'ai-excel-formula-generator',
    title: 'AI Excel Formula Generator | Write My Formula',
    description: 'Use AI to generate Excel formulas from plain English, then review the explanation, range notes, and paste checks before using them.',
    eyebrow: 'AI Excel formula generator',
    h1: 'Use AI to write the Excel formula you mean.',
    lede: 'Describe the spreadsheet job in plain English, add the cells or headers involved, and get an Excel formula with an explanation and checks before you paste it.',
    preset: {
      mode: 'write',
      platform: 'excel',
      task: 'Create an Excel formula that totals paid invoices from May 2026 and ignores open invoices.',
      table: 'Invoice Date,Status,Amount\n2026-05-04,Paid,1200\n2026-05-12,Open,850\n2026-05-18,Paid,640',
      range: 'Dates in A2:A500; status in B2:B500; amount in C2:C500; result in F2',
      hint: 'SUMIFS'
    },
    intent: 'Generate an Excel formula from a plain-English request when the job is formula-shaped: lookup, summary, date, text, IF logic, conditional formatting, or fixing a formula that already exists.',
    bestFor: [
      'Turning a normal-language Excel task into a copy-ready formula draft.',
      'Getting the function choice, ranges, and criteria written out together.',
      'Checking an AI-generated formula against known rows before filling it through a workbook.'
    ],
    steps: [
      'Describe the result you want, not just the function name.',
      'Paste headers, sample rows, or the target cell so the formula can use the right references.',
      'Read the explanation and checks before copying the result into Excel.'
    ],
    copyChecks: [
      'Confirm the ranges match your workbook before filling down.',
      'Test the formula on a row where you already know the expected answer.',
      'Use a broader spreadsheet AI if you need file upload, data chat, charts, dashboards, or workbook-wide analysis.'
    ]
  },
  {
    slug: 'ai-google-sheets-formula-generator',
    title: 'AI Google Sheets Formula Generator | Write My Formula',
    description: 'Use AI to generate Google Sheets formulas from plain English, then review the formula, range notes, and paste checks before using it.',
    eyebrow: 'AI Google Sheets formula generator',
    h1: 'Use AI to write the Google Sheets formula you need.',
    lede: 'Describe what the cell should do, add headers or sample rows, and get a Google Sheets formula with the assumptions and checks visible before you paste it.',
    preset: {
      mode: 'write',
      platform: 'sheets',
      task: 'Create a Google Sheets formula that summarizes April 2026 revenue by region.',
      table: 'Date,Region,Customer,Amount\n2026-04-03,West,Acme,1200\n2026-04-18,East,Northwind,850\n2026-05-02,West,Acme,640',
      range: 'A1:D500; output starts in F1; headers in row 1',
      hint: 'QUERY'
    },
    intent: 'Generate a Google Sheets formula from a plain-English request when the job is one formula, one rule, or one repair rather than a full spreadsheet automation workflow.',
    bestFor: [
      'QUERY, FILTER, ARRAYFORMULA, REGEXEXTRACT, IMPORTRANGE, lookup, and summary formulas in shared Google Sheets.',
      'Turning a request such as unique customers by region or monthly totals into a formula with readable assumptions.',
      'Explaining or fixing a coworker-written Sheets formula before changing a live sheet.'
    ],
    steps: [
      'Describe the exact result the formula should return.',
      'Paste headers, sample rows, or the target range so the formula can use the right columns.',
      'Review the explanation and compatibility notes before copying into Google Sheets.'
    ],
    copyChecks: [
      'Check whether the formula uses comma or semicolon separators for your locale.',
      'Confirm the output can spill into empty cells before using QUERY, FILTER, or ARRAYFORMULA.',
      'Use a broader spreadsheet AI if you need file upload, data chat, charts, dashboards, or workbook-wide analysis.'
    ]
  },
  {
    slug: 'google-sheets-query-formula-generator',
    title: 'Google Sheets QUERY Formula Generator | Write My Formula',
    description: 'Generate Google Sheets QUERY formulas from plain-English filter, select, sort, group, and label requests.',
    eyebrow: 'Google Sheets QUERY formula generator',
    h1: 'Write a Google Sheets QUERY formula without memorizing SQL syntax.',
    lede: 'Describe the rows and columns you want, paste sample headers, and get a QUERY formula with notes for select clauses, where filters, sorting, grouping, and labels.',
    preset: {
      mode: 'write',
      platform: 'sheets',
      task: 'Use QUERY to show open West region deals above 5000, sorted by value descending.',
      table: 'Deal,Region,Status,Value\nRenewal,West,Open,7200\nExpansion,East,Open,4100\nSupport,West,Closed,1800',
      range: 'A1:D500; output starts in F1; headers in row 1',
      hint: 'QUERY'
    },
    intent: 'Build Google Sheets QUERY formulas for report-style views that select, filter, sort, group, or relabel columns from a source table.',
    bestFor: [
      'Turning a raw Google Sheets table into a filtered report view.',
      'Combining select, where, order by, group by, and label clauses in one formula.',
      'Replacing repeated filter menu work with a reusable formula output.'
    ],
    steps: [
      'Paste the source headers and a few rows so the column letters are clear.',
      'Describe which columns should appear in the result and which rows should qualify.',
      'Mention sorting, grouping, totals, or custom column labels if the output is a report.'
    ],
    copyChecks: [
      'QUERY uses Col1-style references when the source range is an array expression.',
      'Text criteria need single quotes inside the query string.',
      'Set the header-row argument correctly so Sheets does not treat a data row as headers.'
    ]
  },
  {
    slug: 'formula-bot-alternative',
    title: 'Formula Bot Alternative for Excel Formulas | Write My Formula',
    description: 'A focused Formula Bot alternative for writing, explaining, and fixing Excel and Google Sheets formulas from plain English.',
    eyebrow: 'Formula Bot alternative',
    h1: 'A focused Formula Bot alternative for formula work.',
    lede: 'Use Write My Formula when you need a quick Excel or Google Sheets formula, explanation, or fix without opening a broader spreadsheet-analysis suite.',
    preset: {
      mode: 'write',
      platform: 'excel',
      task: 'Write a formula that sums paid invoices from the current month and ignores open invoices.',
      table: 'Invoice Date,Status,Amount\n2026-05-04,Paid,1200\n2026-05-12,Open,850\n2026-05-18,Paid,640',
      range: 'Dates in A2:A500; status in B2:B500; amount in C2:C500; result in F2',
      hint: 'SUMIFS'
    },
    intent: 'Help spreadsheet users who are comparing AI Excel formula tools choose a narrow formula workbench for writing, explaining, and fixing formulas.',
    bestFor: [
      'Getting one copy-ready formula with the range, criteria, and fallback spelled out.',
      'Explaining inherited formulas before editing a live workbook.',
      'Fixing syntax, lookup, conditional-formatting, text, date, and summary formulas without uploading a spreadsheet file.'
    ],
    steps: [
      'Choose Write, Explain, or Fix for the formula job in front of you.',
      'Paste the headers, sample rows, or broken formula so the output can use your actual context.',
      'Copy the formula only after checking the range notes and compatibility warning.'
    ],
    copyChecks: [
      'Use a broader spreadsheet AI if you need file upload, charts, dashboards, or whole-table analysis.',
      'Use Write My Formula when the job is a formula you can describe, test, and paste.',
      'Test the output on one known row before filling it through an important workbook.'
    ]
  },
  {
    slug: 'sheetsolver-ai-alternative',
    title: 'SheetSolver AI Alternative for Spreadsheet Formulas | Write My Formula',
    description: 'A focused SheetSolver AI alternative for writing, explaining, and fixing Excel and Google Sheets formulas without a broader spreadsheet automation workspace.',
    eyebrow: 'SheetSolver AI alternative',
    h1: 'A SheetSolver AI alternative built for one job: the formula.',
    lede: 'Use Write My Formula when you want a copy-ready Excel or Google Sheets formula, a readable explanation, or a fix for a broken formula without turning the job into a full spreadsheet automation workflow.',
    preset: {
      mode: 'write',
      platform: 'sheets',
      task: 'Write a formula that extracts the domain from each customer email address and leaves blanks empty.',
      table: 'Email,Customer\nalex@northwind.com,Northwind\nsam@acme.co,Acme\n,Missing',
      range: 'Emails in A2:A500; result in C2',
      hint: 'REGEXEXTRACT'
    },
    intent: 'Help spreadsheet users comparing AI formula tools choose a narrow formula helper when the job is to write, understand, or repair one formula rather than analyze an uploaded workbook.',
    bestFor: [
      'Turning a plain-English formula request into a copy-ready Excel or Google Sheets formula.',
      'Explaining inherited formulas before editing shared workbook logic.',
      'Fixing lookup, text, date, summary, conditional-formatting, and data-validation formulas with the relevant ranges visible.'
    ],
    steps: [
      'Choose Write, Explain, or Fix based on the formula task.',
      'Paste headers, sample rows, the formula, or the rule dialog context.',
      'Review the explanation and copy checks before filling the formula through a report.'
    ],
    copyChecks: [
      'Use a broader spreadsheet AI if you need file upload, data chat, dashboards, charts, or workbook-wide analysis.',
      'Use Write My Formula when the problem can be described as one formula, one rule, or one repair.',
      'Test the formula on a known row before replacing formulas across an important sheet.'
    ]
  },
  {
    slug: 'excel-formula-cheat-sheet',
    title: 'Excel Formula Cheat Sheet | Write My Formula',
    description: 'A practical Excel formula cheat sheet with common lookup, logic, text, date, percentage, and summary formulas plus examples.',
    eyebrow: 'Excel formula cheat sheet',
    h1: 'Excel formula cheat sheet for the formulas people actually use.',
    lede: 'Use this reference to pick the right formula pattern, then describe your exact sheet and let the workbench turn it into a copy-ready formula.',
    preset: {
      mode: 'write',
      platform: 'excel',
      task: 'Choose the right formula for a lookup, summary, text cleanup, date deadline, or percentage calculation and adapt it to my sheet.',
      table: 'Use case,Formula pattern\nLookup customer plan,XLOOKUP or INDEX MATCH\nSum paid invoices,SUMIFS\nExtract email domain,TEXTAFTER or REGEXEXTRACT',
      range: 'Paste your own headers and target cell before generating',
      hint: 'formula cheat sheet'
    },
    intent: 'Help spreadsheet users choose between common Excel formula patterns before generating the exact formula for their workbook.',
    bestFor: [
      'Quickly comparing lookup, logic, text, date, and summary formulas.',
      'Finding the right starting point when you know the spreadsheet job but not the function name.',
      'Moving from a generic example to a formula adapted to real ranges and headers.'
    ],
    steps: [
      'Find the closest formula pattern in the cheat sheet.',
      'Paste your real headers, sample rows, and target cell into the workbench.',
      'Generate the adapted formula and check the notes before filling it down.'
    ],
    copyChecks: [
      'Cheat-sheet examples use generic ranges, so adapt them before pasting into a live workbook.',
      'Lock ranges with dollar signs when a formula will be copied down a column.',
      'Test one known row before replacing formulas across a report.'
    ]
  },
  {
    slug: 'excel-formula-explainer',
    title: 'Excel Formula Explainer | Write My Formula',
    description: 'Paste an Excel formula and get a plain-English explanation of what it does, step by step.',
    eyebrow: 'Excel formula explainer',
    h1: 'Explain an Excel formula before you trust it.',
    lede: 'Paste a formula and get a readable breakdown of the functions, logic, assumptions, and compatibility checks.',
    preset: {
      mode: 'explain',
      platform: 'excel',
      formula: '=IF(A2="","Missing",IF(B2>1000,"Review","OK"))'
    },
    intent: 'Understand an Excel formula before editing, copying, or relying on it.',
    bestFor: [
      'Inherited spreadsheets where the original formula author is unavailable.',
      'Nested IF, lookup, text, and date formulas that are hard to scan quickly.',
      'Checking whether a formula handles blanks, missing matches, or thresholds.'
    ],
    steps: [
      'Paste the exact formula from the workbook.',
      'Switch to Explain mode so the output focuses on logic rather than rewriting.',
      'Read the checks before changing references or filling the formula down.'
    ],
    copyChecks: [
      'Look for assumptions about blank cells and error handling.',
      'Check whether the formula uses relative references that shift when copied.',
      'Confirm the explanation against a few known rows in the sheet.'
    ]
  },
  {
    slug: 'excel-formula-fixer',
    title: 'Fix My Excel Formula | Write My Formula',
    description: 'Paste a broken Excel formula and get a corrected version with checks for errors, text cells, manual calculation, ranges, and fallbacks.',
    eyebrow: 'Fix my Excel formula',
    h1: 'Paste your broken Excel formula. Get it working.',
    lede: 'Paste the formula that is failing, add one line about what it should return, and get a corrected version with a short explanation and checks before you copy it back.',
    preset: {
      mode: 'fix',
      platform: 'excel',
      formula: '=VLOOKUP(A2,Customers!A:C,3,FALSE)'
    },
    intent: 'Help Excel users repair one formula that returns an error, displays as text, stops calculating, matches the wrong row, or behaves differently after a copy or import.',
    bestFor: [
      'VLOOKUP, XLOOKUP, INDEX MATCH, IF, SUMIFS, date, and text formulas that return the wrong value.',
      '#N/A, #VALUE!, #REF!, #NAME?, #DIV/0!, and #NUM! errors you need to narrow down.',
      'Formulas that show as plain text, stay stale, break after fill-down, or need a safer missing-match fallback.'
    ],
    steps: [
      'Paste the broken formula exactly as Excel shows it.',
      'Add one sentence about the result you expected and the result you got.',
      'Include a header row or one sample row if the formula references lookup, date, text, or criteria cells.'
    ],
    copyChecks: [
      'Identify whether the visible error is #N/A, #VALUE!, #REF!, #NAME?, #DIV/0!, #NUM!, blank, stale, or a wrong result.',
      'Check misplaced parentheses, quotes, commas, semicolons, and missing equal signs.',
      'Confirm the source cells are not stored as text when the formula expects numbers or dates.',
      'Check Show Formulas mode and workbook calculation mode before rewriting a working formula.',
      'Confirm relative and absolute references before filling the fixed formula down.',
      'Test the fixed formula on one matching row and one missing-match row before replacing a report column.'
    ]
  },
  {
    slug: 'excel-formula-not-showing-result',
    title: 'Excel Formula Not Showing Result | Write My Formula',
    description: 'Diagnose why an Excel formula is showing text, not updating, or returning the wrong result, then rewrite the formula with safer checks.',
    eyebrow: 'Excel formula not showing result',
    h1: 'Fix an Excel formula that is not showing the result.',
    lede: 'Paste the formula, describe what Excel is showing, and get a clearer version with checks for calculation mode, text-formatted cells, references, and common formula errors.',
    preset: {
      mode: 'fix',
      platform: 'excel',
      formula: '=IF(B2>1000,"Review","OK")'
    },
    intent: 'Help Excel users move from a formula that displays as text, refuses to recalculate, or returns an unexpected value into a formula and checklist they can test on one row before filling down.',
    bestFor: [
      'Formulas that show the formula text in the cell instead of the calculated result.',
      'Workbooks where formulas appear stuck until you force a recalculation.',
      'Formula errors caused by text-formatted numbers, wrong argument types, inconsistent references, or missing fallbacks.'
    ],
    steps: [
      'Paste the exact formula that is not showing the expected result.',
      'Say whether Excel is showing formula text, an error value, an old value, or the wrong answer.',
      'Add the relevant headers or sample row if the formula depends on lookup, date, or conditional logic.'
    ],
    copyChecks: [
      'Confirm calculation options are set the way you expect before replacing formulas across a workbook.',
      'Check whether the source cells are stored as text when the formula expects numbers or dates.',
      'Test the fixed formula on one known row before filling it down.'
    ]
  },
  {
    slug: 'excel-formulas-not-working',
    title: 'Excel Formulas Not Working | Write My Formula',
    description: 'Fix Excel formulas that are not calculating, showing formula text, returning errors, or breaking after imports and copied ranges.',
    eyebrow: 'Excel formulas not working',
    h1: 'Fix Excel formulas that are not working.',
    lede: 'Paste the formula that is failing, describe what Excel is showing, and get a safer formula plus checks for calculation mode, text cells, separators, data types, and formula errors.',
    preset: {
      mode: 'fix',
      platform: 'excel',
      formula: '=SUMIFS(C2:C500,A2:A500,">=5/1/2026",B2:B500,"Paid")'
    },
    intent: 'Help Excel users diagnose formulas that fail after imports, copied ranges, regional settings, workbook calculation changes, or text-number mismatches.',
    bestFor: [
      'Formulas that do not calculate after a paste, import, or workbook setting change.',
      'Cells that show the formula text, stale values, or a pound-sign error instead of the expected result.',
      'SUMIFS, IF, lookup, date, text, and conditional formulas that need a smaller test case before filling down.'
    ],
    steps: [
      'Paste the formula exactly as Excel shows it.',
      'Describe the visible symptom: text formula, old value, error value, blank, or wrong result.',
      'Add the source headers or one sample row when the formula depends on dates, numbers, text, or lookup values.'
    ],
    copyChecks: [
      'Check Show Formulas and workbook calculation mode before rewriting a working formula.',
      'Confirm input cells are stored as the type the formula expects: number, date, or text.',
      'Use the correct list separator for your Excel locale before changing function logic.',
      'Test the fixed formula on one known row before replacing a whole report column.'
    ]
  },
  {
    slug: 'google-sheets-formulas-not-working',
    title: 'Google Sheets Formulas Not Working? | Write My Formula',
    description: 'Fix Google Sheets formulas that show errors, stay as text, stop updating, return wrong results, or break after imports and copied examples.',
    eyebrow: 'Google Sheets formulas not working',
    h1: 'Fix Google Sheets formulas that are not working.',
    lede: 'Paste the Sheets formula that is failing, describe what should happen, and get a focused repair path for parse errors, text-formatted values, invalid references, stale results, locale separators, and common lookup or array failures.',
    preset: {
      mode: 'fix',
      platform: 'sheets',
      formula: '=SUMIF(B:B,"West",D:D)'
    },
    intent: 'Help Google Sheets users repair one formula when the visible symptom is not yet narrowed to a single function: a formula parse error, #ERROR!, #REF!, #VALUE!, #N/A, text in the cell, stale output, or a plausible but wrong result.',
    bestFor: [
      'Formulas copied from Excel, a tutorial, or an AI answer that need Sheets syntax, separators, and function support checked.',
      'Cells that show formula text instead of running, often because formatting or a leading apostrophe changed how Sheets reads the entry.',
      'Imported CSV or app data where numbers, dates, or IDs look correct but are stored as text.',
      'References that broke after a row, column, tab, or source range moved or was deleted.',
      'Lookup, QUERY, FILTER, ARRAYFORMULA, SUMIF, and COUNTIF formulas that return errors, blanks, stale values, or wrong rows.'
    ],
    steps: [
      'Paste the exact formula and the visible symptom, such as formula parse error, #REF!, #VALUE!, #N/A, text in the cell, stale value, blank, or wrong result.',
      'Add one row or small sample where you know the expected answer.',
      'Mention whether the formula came from Excel, a different locale, an import, a copied sheet, or a recent range edit.'
    ],
    copyChecks: [
      'Check whether your sheet expects commas or semicolons between function arguments before changing the formula logic.',
      'Confirm numbers, dates, and lookup IDs are stored as the type the formula expects.',
      'Replace broken references with the intended current ranges before wrapping the formula in IFERROR.',
      'Use IFNA or IFERROR only after deciding whether the error is acceptable to hide.',
      'Test the repaired formula on one known row before filling it through a shared sheet.'
    ]
  },
  {
    slug: 'excel-formula-not-calculating',
    title: 'Excel Formula Not Calculating Fixer | Write My Formula',
    description: 'Fix Excel formulas that do not calculate, do not update automatically, show stale values, or display formula text instead of the result.',
    eyebrow: 'Excel formula not calculating fixer',
    h1: 'Fix an Excel formula that is not calculating.',
    lede: 'Paste the formula that is stuck, stale, or showing as text, describe what should update, and get a focused repair path for calculation settings, text-formatted cells, references, and formula syntax.',
    preset: {
      mode: 'fix',
      platform: 'excel',
      formula: '=IF(B2>1000,"Review","OK")'
    },
    intent: 'Help Excel users repair one formula that is not recalculating, not updating after source-cell changes, displaying as formula text, or returning a stale value after a workbook setting, import, copy, or formula edit.',
    bestFor: [
      'Formulas that only update after pressing F9, saving, or editing the cell again.',
      'Cells that show the formula text instead of the calculated result.',
      'Imported or copied formulas where text formatting, manual calculation, references, or source values may be blocking the expected result.'
    ],
    steps: [
      'Paste the exact formula that is not calculating.',
      'Add what changed before the result got stuck, such as a source cell, workbook setting, imported data, or copied range.',
      'Include one expected result so the repaired formula can be checked against a known row.'
    ],
    copyChecks: [
      'Check whether the workbook is set to manual calculation before rewriting a valid formula.',
      'Turn off Show Formulas when the cell displays the formula instead of the result.',
      'Confirm the formula cell is not formatted as text before re-entering it.',
      'Test one known row before filling the repaired formula through the workbook.'
    ]
  },
  {
    slug: 'excel-showing-formula-instead-of-result',
    title: 'Excel Showing Formula Instead of Result Fixer | Write My Formula',
    description: 'Fix Excel cells that show the formula text instead of the calculated result because of Show Formulas mode, text formatting, leading apostrophes, or re-entry issues.',
    eyebrow: 'Excel showing formula instead of result fixer',
    h1: 'Fix an Excel cell that shows the formula instead of the result.',
    lede: 'Paste the formula Excel is displaying, describe whether one cell or the whole sheet is affected, and get a focused repair path for Show Formulas mode, text-formatted cells, leading characters, and formula re-entry.',
    preset: {
      mode: 'fix',
      platform: 'excel',
      formula: '=SUM(B2:B20)'
    },
    intent: 'Help Excel users repair a formula cell that displays the formula text, such as =SUM(B2:B20), instead of calculating the visible result.',
    bestFor: [
      'One cell showing formula text after a paste, import, or number-format change.',
      'Whole worksheets showing formulas because Show Formulas mode is enabled.',
      'Formulas entered with text formatting, a leading apostrophe, a leading space, or a linked text-formatted source cell.'
    ],
    steps: [
      'Paste the exact formula text Excel is showing in the cell.',
      'Say whether every formula on the sheet is visible or only one cell is affected.',
      'Include the expected result for one row so the repaired formula can be checked after re-entry.'
    ],
    copyChecks: [
      'Turn off Show Formulas if the whole worksheet is displaying formulas instead of results.',
      'Change text-formatted formula cells to General before re-entering the formula.',
      'Remove any leading apostrophe or space before the equals sign.',
      'After changing the format, edit and re-enter the formula so Excel recalculates it.'
    ]
  },
  {
    slug: 'excel-formula-wrong-result',
    title: 'Excel Formula Wrong Result Fixer | Write My Formula',
    description: 'Fix Excel formulas that calculate the wrong value because of references, order of operations, text-number issues, lookup settings, or copied ranges.',
    eyebrow: 'Excel formula wrong result fixer',
    h1: 'Fix an Excel formula that gives the wrong result.',
    lede: 'When Excel runs the formula without an error but the answer is wrong, the problem is usually hiding in the references, calculation order, stored value types, or lookup logic. Paste the formula, add one expected result, and get a focused repair path before you fill it down.',
    preset: {
      mode: 'fix',
      platform: 'excel',
      formula: '=A2+B2*C2'
    },
    intent: 'Help Excel users fix one formula that calculates a believable but incorrect result, especially when the issue is operator precedence, copied references, text-number mismatches, approximate lookup settings, or a source range that no longer matches the report.',
    bestFor: [
      'Totals, margins, commissions, percentages, and score formulas where one row looks obviously wrong.',
      'Formulas copied down a column where relative references drift to the wrong input row or column.',
      'Lookup formulas that return a nearby or old value instead of an error because match settings or ranges are wrong.',
      'Imported sheets where numbers look numeric but Excel is treating some inputs as text.'
    ],
    steps: [
      'Paste the exact formula that returns the wrong result.',
      'Add the result Excel returns and the result you expected for one row.',
      'Include the referenced headers or sample values when the issue may involve copied ranges, text-number storage, lookup settings, or parentheses.'
    ],
    copyChecks: [
      'Check whether parentheses are needed to force Excel to calculate in the intended order.',
      'Confirm every referenced cell or range points at the intended row and column after copying.',
      'Compare stored types when values look the same but some are text and others are numbers or dates.',
      'Use exact-match lookup settings unless approximate matching is intentional and the lookup column is prepared for it.'
    ]
  },
  {
    slug: 'excel-formula-returns-zero-blank',
    title: 'Excel Formula Returns 0 or Blank Fixer | Write My Formula',
    description: 'Fix Excel formulas that return 0, blank, or an empty string because of empty references, lookup return cells, IF logic, IFERROR fallbacks, or hidden zero settings.',
    eyebrow: 'Excel formula returns 0 or blank fixer',
    h1: 'Fix an Excel formula that returns 0 or blank.',
    lede: 'Paste the formula that comes back empty, returns 0, or shows a blank-looking result when you expected a value. Get a focused repair path for empty references, lookup return cells, IF logic, IFERROR fallbacks, and hidden zero settings.',
    preset: {
      mode: 'fix',
      platform: 'excel',
      formula: '=VLOOKUP(A2,$D$2:$E$500,2,FALSE)'
    },
    intent: 'Help Excel users fix one formula that returns 0, blank, or an empty string when the expected result should be a visible number, text value, lookup result, or status label.',
    bestFor: [
      'VLOOKUP, XLOOKUP, or INDEX MATCH formulas that find a row but return 0 because the return cell is empty.',
      'IF, IFS, IFERROR, and IFNA formulas where an empty-string fallback is masking the condition that actually fired.',
      'Reports where zero display settings, blank source cells, or empty-looking formula results make a valid formula look broken.',
      'Imported sheets where cells look blank but contain text, spaces, or formulas that return an empty string.'
    ],
    steps: [
      'Paste the exact formula that returns 0 or blank.',
      'Add what you expected to see and whether the source cell is truly empty, hidden, or filled by another formula.',
      'Include one lookup value or sample row when the formula depends on a return range, blank test, or IFERROR fallback.'
    ],
    copyChecks: [
      'Check whether the formula is correctly finding a row but returning an empty source cell.',
      'Confirm whether a blank-looking result is a true blank, an empty string, a hidden zero, or a formula output.',
      'Review IFERROR, IFNA, and IF branches before treating the formula as broken.',
      'Test the repaired formula on one row where zero is valid and one row where blank should mean missing data.'
    ]
  },
  {
    slug: 'excel-formula-not-copying-down',
    title: 'Excel Formula Not Copying Down Fixer | Write My Formula',
    description: 'Fix Excel formulas that do not copy down, fill down, update each row, or keep the right relative and absolute references.',
    eyebrow: 'Excel formula not copying down fixer',
    h1: 'Fix an Excel formula that is not copying down.',
    lede: 'Paste the formula that will not fill down correctly, describe what happens after you drag or press Ctrl+D, and get a focused repair path for fill handle settings, calculation mode, relative references, absolute references, and copied-range behavior.',
    preset: {
      mode: 'fix',
      platform: 'excel',
      formula: '=XLOOKUP(A2,Products!A:A,Products!C:C,"Not found")'
    },
    intent: 'Help Excel users fix one formula that will not copy, fill, or update correctly down a column, especially when the blocker is hidden fill-handle settings, manual calculation, drifting references, missing dollar signs, table fill behavior, or a formula copied from the wrong starting row.',
    bestFor: [
      'Formulas that copy the first result down the column instead of recalculating for each row.',
      'Lookup, IF, SUMIFS, percentage, and text formulas where references shift incorrectly after dragging.',
      'Cells where the fill handle is missing, Auto Fill Options picked the wrong behavior, or Ctrl+D gives a stale-looking result.',
      'Reports where some references should move row by row while lookup tables, criteria ranges, or constants should stay locked.'
    ],
    steps: [
      'Paste the formula from the first row and say where it should be filled.',
      'Describe the visible symptom: it will not drag, copies the same value, shifts the wrong range, shows a stale result, or stops partway down.',
      'Include one row where the filled formula should change and any ranges that should stay fixed.'
    ],
    copyChecks: [
      'Check whether automatic workbook calculation is enabled before rewriting a formula that copied but did not recalculate.',
      'Confirm which references should stay relative and which should be locked with dollar signs.',
      'Use Ctrl+D or the Fill command when the fill handle is hidden or hard to drag accurately.',
      'Test the repaired formula on the first filled row and one later row before replacing the whole column.'
    ]
  },
  {
    slug: 'excel-sumifs-not-working',
    title: 'Excel SUMIFS Not Working Fixer | Write My Formula',
    description: 'Fix Excel SUMIFS formulas that return 0, #VALUE!, wrong totals, or miss rows because of criteria, range size, date, or argument-order issues.',
    eyebrow: 'Excel SUMIFS fixer',
    h1: 'Fix an Excel SUMIFS formula that is not working.',
    lede: 'Paste the SUMIFS formula that returns 0, #VALUE!, or the wrong total, add what it should count or sum, and get a focused repair path for criteria syntax, range sizes, dates, text values, and argument order.',
    preset: {
      mode: 'fix',
      platform: 'excel',
      formula: '=SUMIFS(D2:D500,A2:A500,"South",C2:C500,"Meat")'
    },
    intent: 'Help Excel users repair one SUMIFS formula where the visible problem is usually criteria syntax, mismatched range sizes, wrong SUMIF versus SUMIFS argument order, date/text criteria, closed external workbook references, or unexpected zero totals.',
    bestFor: [
      'SUMIFS formulas that return 0 even though matching rows appear to exist.',
      '#VALUE! errors caused by mismatched ranges or references to a closed external workbook.',
      'Date, text, wildcard, and comparison criteria where quotes, operators, or cell references are easy to mix up.',
      'Reports where SUMIF and SUMIFS argument order were copied from one formula style into the other.'
    ],
    steps: [
      'Paste the exact SUMIFS formula and the total Excel currently returns.',
      'Add one row that should match the criteria and one row that should not.',
      'Include the headers or range sizes for the sum range and each criteria range.'
    ],
    copyChecks: [
      'Confirm the sum range is the first argument in SUMIFS.',
      'Make every criteria range the same height and width as the sum range.',
      'Wrap text criteria and comparison operators in quotes where Excel expects them.',
      'Check whether dates and numbers are stored as real values rather than text.',
      'Open any source workbook referenced by the formula before trusting a #VALUE! diagnosis.'
    ]
  },
  {
    slug: 'excel-countifs-not-working',
    title: 'Excel COUNTIFS Not Working Fixer | Write My Formula',
    description: 'Fix Excel COUNTIFS formulas that return 0, #VALUE!, or wrong counts because of criteria syntax, range size, dates, text values, or closed workbooks.',
    eyebrow: 'Excel COUNTIFS fixer',
    h1: 'Fix an Excel COUNTIFS formula that is not working.',
    lede: 'Paste the COUNTIFS formula that returns 0, #VALUE!, or the wrong count, add one row that should be counted, and get a focused repair path for criteria syntax, same-size ranges, dates, text values, empty criteria, and closed workbook references.',
    preset: {
      mode: 'fix',
      platform: 'excel',
      formula: '=COUNTIFS(A2:A500,"South",C2:C500,"Open")'
    },
    intent: 'Help Excel users repair one COUNTIFS formula where the visible problem is usually criteria syntax, mismatched criteria ranges, dates stored as text, an empty criteria cell treated as 0, a closed external workbook reference, or an unexpected zero count.',
    bestFor: [
      'COUNTIFS formulas that return 0 even though matching rows appear to exist.',
      '#VALUE! errors caused by criteria ranges with different shapes or formulas pointing into a closed source workbook.',
      'Date, number, text, wildcard, and comparison criteria where quotes, operators, or cell references are easy to mix up.',
      'Reports where a blank criteria cell or imported text-number mismatch changes which rows are counted.'
    ],
    steps: [
      'Paste the exact COUNTIFS formula and the count Excel currently returns.',
      'Add one row that should match the criteria and one row that should not.',
      'Include the headers or range sizes for every criteria range in the formula.'
    ],
    copyChecks: [
      'Make every criteria range the same height and width as the first criteria range.',
      'Wrap text criteria and comparison operators in quotes where Excel expects them.',
      'Check whether dates and numbers are stored as real values rather than text.',
      'Review blank criteria cells because COUNTIFS can treat an empty criteria reference as 0.',
      'Open any source workbook referenced by the formula before trusting a #VALUE! diagnosis.'
    ]
  },
  {
    slug: 'excel-value-error',
    title: 'Excel #VALUE! Error Fixer | Write My Formula',
    description: 'Fix Excel #VALUE! errors caused by text in number cells, hidden spaces, wrong argument types, subtraction syntax, and date or text function issues.',
    eyebrow: 'Excel #VALUE! error fixer',
    h1: 'Fix an Excel #VALUE! error without hiding it.',
    lede: 'Paste the formula that returns #VALUE!, describe what the cell should return, and get a cleaner formula plus checks for text values, hidden spaces, wrong argument types, dates, and function syntax.',
    preset: {
      mode: 'fix',
      platform: 'excel',
      formula: '=A2-B2'
    },
    intent: 'Help Excel users fix one formula returning #VALUE! by finding whether the formula is receiving text, spaces, dates, ranges, or arguments that the function cannot calculate.',
    bestFor: [
      'Subtraction, date math, text functions, IF logic, and lookup formulas that return #VALUE! instead of a result.',
      'Imported sheets where numbers or dates look right but are stored as text.',
      'Formulas where IFERROR would hide the symptom before the underlying formula or source-cell issue is understood.'
    ],
    steps: [
      'Paste the exact formula that returns #VALUE!.',
      'Add one sentence about what the formula should return and which cells feed it.',
      'Include a sample row when the issue may involve imported numbers, hidden spaces, dates, or text cleanup.'
    ],
    copyChecks: [
      'Check whether referenced cells contain text, hidden spaces, or dates stored in a format Excel cannot use.',
      'Confirm each function argument is the type the function expects before wrapping the result in IFERROR.',
      'Use subtraction operators and date functions carefully when cells may contain blanks or text.',
      'Test the repaired formula on one row that currently shows #VALUE! before filling it down.'
    ]
  },
  {
    slug: 'excel-name-error',
    title: 'Excel #NAME? Error Fixer | Write My Formula',
    description: 'Fix Excel #NAME? errors caused by misspelled function names, undefined named ranges, missing quotes, missing range colons, add-ins, and unsupported functions.',
    eyebrow: 'Excel #NAME? error fixer',
    h1: 'Fix an Excel #NAME? error at the formula syntax.',
    lede: 'Paste the formula that returns #NAME?, describe what the cell should calculate, and get a cleaner formula plus checks for function names, named ranges, quoted text, range syntax, add-ins, and Excel version support.',
    preset: {
      mode: 'fix',
      platform: 'excel',
      formula: '=SUMIF(Status,Open,Amount)'
    },
    intent: 'Help Excel users fix one formula returning #NAME? by finding the unrecognized function, defined name, text value, range reference, add-in function, or version-specific function that Excel cannot interpret.',
    bestFor: [
      'Formulas with misspelled functions, pasted function names, or newer functions not available in the current Excel version.',
      'Named ranges, structured references, and workbook names that were changed, deleted, or typed differently.',
      'Criteria formulas where text values are missing double quotes or a range reference is missing a colon.'
    ],
    steps: [
      'Paste the exact formula that returns #NAME?.',
      'Add one sentence about what the formula should return and which workbook names or ranges it depends on.',
      'Mention your Excel version when the formula uses newer functions, add-ins, macros, or custom functions.'
    ],
    copyChecks: [
      'Check every function name, defined name, table name, and named range for spelling differences.',
      'Wrap text criteria in double quotes so Excel does not read the text as an undefined name.',
      'Confirm range references include the needed colon, such as A2:A500 instead of A2A500.',
      'Verify required add-ins, macros, custom functions, or newer Excel functions are available before replacing the formula.',
      'Fix the syntax issue directly before deciding whether an IFERROR fallback is appropriate.'
    ]
  },
  {
    slug: 'excel-div0-error',
    title: 'Excel #DIV/0! Error Fixer | Write My Formula',
    description: 'Fix Excel #DIV/0! errors caused by zero denominators, blank cells, ratio formulas, averages, and IFERROR fallbacks that hide other issues.',
    eyebrow: 'Excel #DIV/0! error fixer',
    h1: 'Fix the #DIV/0! error in your Excel formula.',
    lede: 'Paste the formula that divides by zero or a blank cell, describe what the result should mean, and get a safer formula path with checks for denominators, blanks, ratios, averages, and IFERROR tradeoffs.',
    preset: {
      mode: 'fix',
      platform: 'excel',
      formula: '=B2/C2'
    },
    intent: 'Help Excel users fix one formula returning #DIV/0! by checking whether the denominator is zero, blank, derived from another formula, or being hidden by a broad error handler.',
    bestFor: [
      'Margin, conversion-rate, average, quota, and ratio formulas that return #DIV/0! when the divisor is blank or zero.',
      'Reports where blank input rows should stay blank instead of showing a red error.',
      'Formulas where IFERROR may be acceptable, but only after the denominator and source cells are understood.'
    ],
    steps: [
      'Paste the exact formula that returns #DIV/0!.',
      'Describe what should happen when the denominator is zero, blank, or waiting for input.',
      'Include one sample row when the denominator comes from another formula, lookup, count, or imported value.'
    ],
    copyChecks: [
      'Check whether the divisor cell is zero, blank, text, or a formula returning an empty-looking value.',
      'Decide whether a zero denominator should return blank, zero, #N/A, or a message such as Input needed.',
      'Use IF to test the denominator directly when you only want to handle division-by-zero cases.',
      'Use IFERROR carefully because it can also hide #VALUE!, #REF!, #NAME?, or other formula problems.'
    ]
  },
  {
    slug: 'excel-spill-error',
    title: 'Excel #SPILL! Error Fixer | Write My Formula',
    description: 'Fix Excel #SPILL! formula errors caused by blocked spill ranges, dynamic arrays, Excel tables, merged cells, worksheet edges, and volatile array sizes.',
    eyebrow: 'Excel #SPILL! error fixer',
    h1: 'Fix an Excel #SPILL! error without reading a forum thread.',
    lede: '#SPILL! means your formula tried to return more than one cell of results and Excel could not place those results in the grid. Paste the formula, describe the spill range, and get a revised formula path with the checks to make before you use it.',
    preset: {
      mode: 'fix',
      platform: 'excel',
      formula: '=FILTER(A2:C500,B2:B500="Open")'
    },
    intent: 'Help Excel users repair one formula that wants to spill multiple results but is blocked by occupied cells, merged cells, table behavior, worksheet edges, volatile array size, or an oversized reference.',
    bestFor: [
      'FILTER, SORT, UNIQUE, SEQUENCE, or XLOOKUP formulas that return #SPILL! instead of an array result.',
      'Dynamic array formulas blocked by values already sitting in the intended spill range.',
      'Formulas entered inside Excel tables where spilled array formulas are not supported.',
      'Whole-column references or volatile array formulas that try to return more cells than Excel can place.'
    ],
    steps: [
      'Paste the exact formula that returns #SPILL!, or describe what it was supposed to return.',
      'Mention the cell where the formula lives and what cells the result should fill.',
      'Add anything visible in the spill range, including merged cells, table columns, existing values, or whole-column references.'
    ],
    copyChecks: [
      'Clear or move values from the intended spill range before changing the formula.',
      'Move spilled array formulas outside Excel tables when the result needs to fill multiple cells.',
      'Use bounded ranges instead of entire-column references when the formula should return a smaller result set.',
      'Check volatile functions such as RANDARRAY, RANDBETWEEN, or SEQUENCE inputs when the spill size keeps changing.'
    ]
  },
  {
    slug: 'excel-calc-error',
    title: 'Excel #CALC! Error Fixer | Write My Formula',
    description: 'Fix Excel #CALC! errors caused by empty FILTER results, nested arrays, range references inside arrays, and unsupported array calculations.',
    eyebrow: 'Excel #CALC! error fixer',
    h1: 'Fix an Excel #CALC! error at the array formula.',
    lede: '#CALC! often means Excel cannot finish an array-style calculation. Paste the formula, describe the result you expected, and get a repair path for empty FILTER results, nested arrays, range references, and unsupported calculation cases.',
    preset: {
      mode: 'fix',
      platform: 'excel',
      formula: '=FILTER(A2:C500,B2:B500="West")'
    },
    intent: 'Help Excel users fix one formula returning #CALC! by checking whether an array formula returns no rows, tries to nest arrays, includes a range where Excel expects values, or uses a calculation pattern Excel cannot complete in the current environment.',
    bestFor: [
      'FILTER formulas that return #CALC! when no rows match the criteria and no if_empty value is supplied.',
      'Dynamic array formulas that combine FILTER, SORT, UNIQUE, HSTACK, VSTACK, MAP, BYROW, or LAMBDA and fail with an array calculation error.',
      'Formulas where an array constant or nested array includes a range reference Excel cannot calculate.',
      'Excel for the web custom-function cases where the referenced range size may be too large.'
    ],
    steps: [
      'Paste the exact formula that returns #CALC!.',
      'Say whether the formula should return rows, a single value, a blank, or a message when nothing matches.',
      'Include the relevant headers or sample rows when the formula uses FILTER criteria, array constants, or custom functions.'
    ],
    copyChecks: [
      'Add an if_empty argument to FILTER when no matching rows is an acceptable result.',
      'Check whether the formula is trying to place one array inside another array.',
      'Replace range references inside array constants with a calculation pattern Excel can evaluate.',
      'Reduce custom-function referenced ranges in Excel for the web when the formula touches too many cells.',
      'Test the repaired formula on one no-match case and one expected-match case before filling it through a report.'
    ]
  },
  {
    slug: 'excel-filter-function-not-working',
    title: 'Excel FILTER Function Not Working | Write My Formula',
    description: 'Fix Excel FILTER formulas that return #CALC!, #SPILL!, #REF!, blank results, wrong rows, or unsupported-function errors.',
    eyebrow: 'Excel FILTER function repair',
    h1: 'Fix an Excel FILTER formula that is not returning the rows you expected.',
    lede: 'Paste the FILTER formula that is failing, describe the rows it should return, and get a focused repair path for empty results, include-array logic, spill behavior, workbook links, and Excel version support.',
    preset: {
      mode: 'fix',
      platform: 'excel',
      formula: '=FILTER(A2:D500,(B2:B500="West")*(C2:C500="Open"))'
    },
    intent: 'Help Excel users repair one FILTER formula where the visible problem is usually a missing if_empty fallback, an include argument that returns all FALSE, mismatched array sizes, blocked spill output, unsupported Excel version behavior, or a linked workbook that is not available.',
    bestFor: [
      'FILTER formulas that return #CALC! because no rows match and the formula has no if_empty result.',
      'FILTER formulas that return every row, no rows, or the wrong rows because the include test is shaped or combined incorrectly.',
      'FILTER results blocked by #SPILL!, merged cells, occupied spill ranges, or formulas entered inside an Excel table.',
      'FILTER formulas that show #NAME?, _xlfn, or #REF! after opening the workbook in a different Excel version or with the source workbook closed.'
    ],
    steps: [
      'Paste the exact FILTER formula that is not working.',
      'Say what should happen when no rows match: blank, a message, #N/A, or another fallback.',
      'Include the source headers and one row that should match so the include logic can be checked.'
    ],
    copyChecks: [
      'Add the optional if_empty argument when no matching rows is a normal case.',
      'Confirm the include range has the same height or width as the array being filtered.',
      'Use multiplication for AND logic and addition for OR logic only when each condition returns the intended TRUE/FALSE array.',
      'Clear the spill range or move the formula outside an Excel table before changing valid FILTER logic.',
      'Check Excel version support and keep linked source workbooks open when the FILTER formula depends on another file.'
    ]
  },
  {
    slug: 'excel-num-error',
    title: 'Excel #NUM! Error Fixer | Write My Formula',
    description: 'Fix Excel #NUM! errors caused by invalid numeric values, formatted constants, non-converging IRR or RATE functions, and numbers outside Excel limits.',
    eyebrow: 'Excel #NUM! error fixer',
    h1: 'Fix an Excel #NUM! error by checking the number Excel cannot use.',
    lede: '#NUM! means the formula handed Excel a numeric value it could not calculate with. Paste the formula, describe what the result should be, and get a repair path for formatted constants, iterative functions, invalid math inputs, and numbers outside Excel limits.',
    preset: {
      mode: 'fix',
      platform: 'excel',
      formula: '=IRR(B2:B12)'
    },
    intent: 'Help Excel users fix one formula returning #NUM! by identifying whether the failure comes from invalid numeric arguments, formatted constants, iterative functions that cannot find a result, invalid math domains, or results too large or small for Excel.',
    bestFor: [
      'IRR, RATE, NPER, and other formulas that iterate and return #NUM! when Excel cannot find a result.',
      'Formulas with constants typed as formatted numbers, such as dollar signs or comma separators inside the formula.',
      'Math formulas where a negative, zero, or extreme value makes the numeric result invalid for the function.'
    ],
    steps: [
      'Paste the exact formula that returns #NUM!.',
      'Describe the result you expected and whether the formula uses IRR, RATE, SQRT, LOG, POWER, or a very large calculation.',
      'Include one sample input row or cash-flow range when the issue depends on signs, guesses, formatted numbers, or result size.'
    ],
    copyChecks: [
      'Remove currency symbols and thousands separators from constants typed directly inside formulas.',
      'Check whether iterative functions such as IRR or RATE have inputs that can actually converge to a result.',
      'Confirm the formula is not asking for invalid math, such as a square root of a negative number or a log of zero.',
      'Restructure calculations that produce numbers outside Excel limits instead of only wrapping them in IFERROR.'
    ]
  },
  {
    slug: 'excel-circular-reference',
    title: 'Excel Circular Reference Fixer | Write My Formula',
    description: 'Fix Excel circular reference warnings by rewriting the formula logic or checking whether iterative calculation is intentional.',
    eyebrow: 'Excel circular reference fixer',
    h1: 'Fix an Excel circular reference warning.',
    lede: 'Paste the formula that points back at itself, describe what the cell should calculate, and get a safer formula path with checks for self-references, helper cells, and intentional iteration.',
    preset: {
      mode: 'fix',
      platform: 'excel',
      formula: '=SUM(D2:D10)'
    },
    intent: 'Help Excel users repair formulas that refer to their own result directly or through another cell, without hiding a real circular-reference problem behind workbook-wide iteration settings.',
    bestFor: [
      'Cells that trigger Excel circular reference warnings after a formula edit, copy, or row insertion.',
      'Totals, running balances, commission formulas, and model inputs where the formula accidentally includes its own result cell.',
      'Cases where you need to decide whether to rewrite the formula, move it to a helper cell, or deliberately use iterative calculation.'
    ],
    steps: [
      'Paste the exact formula and say which cell contains it.',
      'Describe the intended result without using the circular output cell as an input.',
      'Mention whether the circular reference is accidental or part of a deliberate iterative model.'
    ],
    copyChecks: [
      'Check whether the formula range includes the same cell that contains the formula.',
      'Use Formula Error Checking and trace arrows to confirm which cells depend on each other before changing workbook settings.',
      'Turn on iterative calculation only when the circular calculation is intentional and you understand the recalculation limits.',
      'Test the revised formula in one row before copying it across a model.'
    ]
  },
  {
    slug: 'excel-data-validation-formula',
    title: 'Excel Data Validation Formula Helper | Write My Formula',
    description: 'Write Excel data validation custom formulas for IDs, duplicates, required fields, dates, and allowed-entry rules.',
    eyebrow: 'Excel data validation formula helper',
    h1: 'Write the Excel data validation formula for your rule.',
    lede: 'Describe what Excel should allow in the cell, include the first cell in the validation range, and get a custom TRUE/FALSE formula with copy checks before you apply it.',
    preset: {
      mode: 'write',
      platform: 'excel',
      task: 'Create an Excel data validation custom formula that allows each customer ID only once and requires the ID- prefix.',
      table: 'Customer ID,Customer\nID-0001234,Acme\nID-0001234,Northwind\n1234,Contoso',
      range: 'Apply data validation to A2:A500; first entry cell is A2',
      hint: 'Data Validation Custom'
    },
    intent: 'Help Excel users turn entry rules into custom data-validation formulas that return TRUE for allowed values and FALSE for values Excel should reject.',
    bestFor: [
      'Blocking duplicate IDs, missing required fields, malformed emails, invalid dates, or wrong prefixes at the point of entry.',
      'Writing the formula for Data > Data Validation > Allow: Custom when the normal Whole number, Date, Text Length, or List options are not enough.',
      'Fixing locked and relative references before applying a validation rule to a full input range.'
    ],
    steps: [
      'Describe the allowed entry in plain language.',
      'Include the first cell in the applied validation range because Excel evaluates the custom formula from that cell.',
      'Paste a few valid and invalid sample values so the formula can be tested before the rule is copied down.'
    ],
    copyChecks: [
      'Custom data-validation formulas should return TRUE for allowed entries and FALSE for entries Excel should reject.',
      'Use dollar signs only where the reference must stay fixed as the validation rule is applied down the range.',
      'Decide whether blanks should be accepted before adding ISBLANK or LEN checks.',
      'Test one valid value and one invalid value in Excel after applying the rule.'
    ]
  },
  {
    slug: 'excel-data-validation-formula-not-working',
    title: 'Excel Data Validation Formula Not Working? | Write My Formula',
    description: 'Fix Excel data validation custom formulas that accept invalid values, reject valid entries, break after copying, or fail in the rule dialog.',
    eyebrow: 'Excel data validation formula repair',
    h1: 'Fix an Excel data validation formula that is not working.',
    lede: 'Paste the custom validation formula, add the applied range and first cell, and get a focused repair path for TRUE/FALSE logic, relative references, named ranges, blanks, and rule-dialog behavior.',
    preset: {
      mode: 'fix',
      platform: 'excel',
      task: 'Fix this data validation rule so customer IDs must start with ID- and cannot repeat.',
      table: 'Customer ID,Customer\nID-0001234,Acme\nID-0001234,Northwind\n1234,Contoso',
      range: 'Apply data validation to A2:A500; first cell is A2',
      hint: 'Data Validation Custom',
      formula: '=AND(LEFT($A$2,3)="ID-",COUNTIF(A:A,A2)=1)'
    },
    intent: 'Repair one Excel Data Validation custom formula where the rule does not behave the way the worksheet formula test suggests it should.',
    bestFor: [
      'Custom validation formulas that work in a worksheet cell but fail inside Data Validation.',
      'Rules that accept invalid entries, reject valid entries, or shift references incorrectly after being applied down a range.',
      'Validation sources that break because of named ranges, table names, dynamic arrays, blank handling, or a formula that does not return TRUE/FALSE.'
    ],
    steps: [
      'Paste the current validation formula or source formula.',
      'Include the exact applied range and the first cell Excel evaluates.',
      'Add one value that should pass and one value that should be rejected.'
    ],
    copyChecks: [
      'Custom validation formulas should return TRUE for accepted entries and FALSE for rejected entries.',
      'Write the formula as if it starts in the first cell of the applied validation range.',
      'Lock only the ranges that should stay fixed while the current-cell reference moves down.',
      'Decide whether Ignore Blank should allow empty cells before adding LEN, ISBLANK, or required-field checks.',
      'Test the rule by typing a new invalid value; data validation may not flag every existing value automatically.'
    ]
  },
  {
    slug: 'excel-ref-error',
    title: 'Excel #REF! Error Fixer | Write My Formula',
    description: 'Fix Excel #REF! errors caused by deleted rows, removed columns, moved cells, invalid references, and broken lookup ranges.',
    eyebrow: 'Excel #REF! error fixer',
    h1: 'Fix #REF! in your Excel formula, one formula at a time.',
    lede: 'Paste the formula that now shows #REF!, describe what changed in the sheet, and get a repaired formula path for one broken reference with checks for deleted rows, moved cells, copied formulas, lookup ranges, and external references.',
    preset: {
      mode: 'fix',
      platform: 'excel',
      formula: '=SUM(B2,#REF!,D2)'
    },
    intent: 'Help Excel users repair formulas that point to a cell, row, column, range, lookup argument, or external reference Excel can no longer resolve.',
    bestFor: [
      'Formulas that broke after deleting a referenced row, column, sheet, or source range.',
      'Copied or filled formulas where relative references shifted into an invalid location.',
      'Lookup, INDEX, OFFSET, INDIRECT, or cross-workbook formulas that need their references rebuilt.'
    ],
    steps: [
      'Paste the exact formula that contains #REF!.',
      'Add what changed before the error appeared, such as a deleted column, moved sheet, pasted data, or copied formula.',
      'Include the intended source cells or headers so the missing reference can be replaced with the current range.'
    ],
    copyChecks: [
      'Replace #REF! with the intended current cell or range instead of hiding it first.',
      'Lock ranges with dollar signs when the repaired formula will be filled down or across.',
      'Check lookup table ranges and column numbers after deleted or inserted columns.',
      'Confirm any external workbook or sheet reference still exists before trusting the repaired formula.'
    ]
  },
  {
    slug: 'google-sheets-formula-parse-error',
    title: 'Google Sheets Formula Parse Error Fixer | Write My Formula',
    description: 'Fix Google Sheets formula parse errors caused by missing quotes, mismatched parentheses, wrong separators, malformed QUERY strings, and range issues.',
    eyebrow: 'Google Sheets formula parse error fixer',
    h1: 'Fix a Google Sheets formula parse error.',
    lede: 'Paste the formula Sheets cannot parse, describe the message you see, and get a cleaner formula with checks for quotes, parentheses, separators, ranges, and QUERY syntax.',
    preset: {
      mode: 'fix',
      platform: 'sheets',
      formula: '=QUERY(A1:D500,"select A, B where C = Open",1)'
    },
    intent: 'Help Google Sheets users repair formulas that fail before they can calculate because Sheets cannot understand the syntax, separators, quotes, ranges, or query string.',
    bestFor: [
      'Formula parse errors from missing quotes, extra commas, unmatched parentheses, or wrong locale separators.',
      'QUERY, FILTER, ARRAYFORMULA, REGEXEXTRACT, IF, and lookup formulas that worked in one example but break when adapted.',
      'Sheets formulas copied from Excel, forums, or an AI tool that need syntax cleanup before testing.'
    ],
    steps: [
      'Paste the exact formula that shows the parse error.',
      'Add the visible error text or the part of the formula you recently changed.',
      'Include the relevant headers or sample row when the formula uses QUERY, FILTER, lookup, or text parsing.'
    ],
    copyChecks: [
      'Check whether your Sheets locale expects commas or semicolons between arguments.',
      'Confirm every opening parenthesis, quote, and array brace has a matching close.',
      'For QUERY formulas, put text criteria in single quotes inside the query string.',
      'Test the repaired formula on a copy or one known row before filling it through a shared sheet.'
    ]
  },
  {
    slug: 'google-sheets-filter-not-working',
    title: 'Google Sheets FILTER Not Working? | Write My Formula',
    description: 'Fix Google Sheets FILTER formulas with #N/A, mismatched range sizes, wrong rows, no matches, or row-versus-column condition issues.',
    eyebrow: 'Google Sheets FILTER repair',
    h1: 'Fix a Google Sheets FILTER formula that is not returning the rows you expected.',
    lede: 'If FILTER shows #N/A, says FILTER has mismatched range sizes, returns blank output, or pulls the wrong rows, paste the formula and add the source headers. Get a focused repair path for same-size ranges, condition logic, no-match handling, and row-versus-column filter shapes.',
    preset: {
      mode: 'fix',
      platform: 'sheets',
      formula: '=FILTER(A2:D,B2:B="Paid",C2:C="West")'
    },
    intent: 'Help Google Sheets users repair one FILTER formula where the visible problem is usually a condition range that is not the same length as the filtered range, a no-match #N/A result, offset criteria, mixed row and column conditions, or Boolean logic that returns the wrong rows.',
    bestFor: [
      'FILTER formulas that return #N/A because no row or column satisfies the provided conditions.',
      'FILTER formulas that show FILTER has mismatched range sizes because the data range and condition range start or end on different rows.',
      'Reports that return the wrong rows because the condition column is offset from the range being filtered.',
      'Formulas that try to filter rows and columns in the same FILTER call instead of nesting two FILTER formulas.'
    ],
    steps: [
      'Paste the exact FILTER formula and the visible error text.',
      'Include the source headers and one row that should appear in the result.',
      'Say whether the formula should return a blank, message, or #N/A when no rows match.'
    ],
    copyChecks: [
      'Make every condition argument the same length as the range being filtered.',
      'Use row conditions for row filtering and column conditions for column filtering; do not mix both in one FILTER call.',
      'Check whether #N/A means no rows matched before treating it as a syntax problem.',
      'Align open-ended ranges consistently, such as A2:D with B2:B and C2:C.',
      'Test the repaired formula on one matching row and one no-match case before replacing a shared report formula.'
    ]
  },
  {
    slug: 'google-sheets-query-not-working',
    title: 'Google Sheets QUERY Not Working? | Write My Formula',
    description: 'Fix Google Sheets QUERY formulas with parse errors, NO_COLUMN messages, wrong Col references, header problems, or missing rows.',
    eyebrow: 'Google Sheets QUERY repair',
    h1: 'Fix a broken Google Sheets QUERY formula.',
    lede: 'If QUERY shows "Unable to parse query string for Function QUERY parameter 2", PARSE_ERROR, or a NO_COLUMN / Col reference message, paste the formula and add the source headers. Get a focused repair path for quoted criteria, column notation, header rows, and mixed data types.',
    preset: {
      mode: 'fix',
      platform: 'sheets',
      formula: '=QUERY(A1:D500,"select Col1, Col3 where Col2 = Open",1)'
    },
    intent: 'Help Google Sheets users repair one QUERY formula where the visible problem is usually a malformed query string, text criteria without quotes, A/B versus Col notation confusion, a guessed header row, a missing source column, or mixed data types that turn some values into nulls.',
    bestFor: [
      'QUERY formulas that show Unable to parse query string, PARSE_ERROR, or NO_COLUMN errors.',
      'Reports that return no rows or the wrong rows after changing select, where, group by, order by, label, or pivot clauses.',
      'Formulas that combine ranges, arrays, or IMPORTRANGE data and need Col1-style references instead of A/B column letters.',
      'Source columns where dates, numbers, or IDs are mixed with text and QUERY treats minority types as null values.'
    ],
    steps: [
      'Paste the exact QUERY formula and the visible error text.',
      'Include the source range headers and say whether the data argument is a plain range, array literal, FILTER result, or IMPORTRANGE.',
      'Add one row that should appear in the result so the where clause and column references can be checked.'
    ],
    copyChecks: [
      'Keep the query text inside double quotes or place it in a cell reference.',
      'Put text criteria in single quotes inside the query string.',
      'Use A, B, C notation for plain ranges and Col1, Col2, Col3 notation for array-style inputs.',
      'Set the header-row argument deliberately when Sheets guesses the wrong number of headers.',
      'Check mixed-type columns when QUERY returns blanks or misses rows that appear to match.'
    ]
  },
  {
    slug: 'google-sheets-arrayformula-not-working',
    title: 'Google Sheets ARRAYFORMULA Not Working? | Write My Formula',
    description: 'Fix Google Sheets ARRAYFORMULA errors where results do not expand, overwrite cells, repeat the wrong value, or only fill one row.',
    eyebrow: 'Google Sheets ARRAYFORMULA repair',
    h1: 'Fix a Google Sheets ARRAYFORMULA that is not expanding correctly.',
    lede: 'If Sheets says the array result was not expanded, fills only the top cell, or repeats one value down the column, paste the ARRAYFORMULA and add the output column. Get a focused repair path for blocked spill ranges, row-by-row logic, blank-row handling, and range shapes.',
    preset: {
      mode: 'fix',
      platform: 'sheets',
      formula: '=ARRAYFORMULA(IF(A2:A="","",B2:B*C2:C))'
    },
    intent: 'Help Google Sheets users repair one ARRAYFORMULA where the visible problem is usually a blocked output range, a formula that was written for one row instead of a range, mismatched range sizes, blank rows, or logic that repeats the same value down the column.',
    bestFor: [
      'ARRAYFORMULA results that show #REF! because the array result cannot expand into cells that already contain values.',
      'Formulas that only fill the top cell because one part of the formula still references a single cell instead of a range.',
      'ARRAYFORMULA logic that repeats one value, returns every row blank, or keeps calculating through empty rows.',
      'Imported, form-response, and shared-sheet columns where one formula should fill new rows automatically.'
    ],
    steps: [
      'Paste the exact ARRAYFORMULA and the visible error message if Sheets shows one.',
      'Say where the formula sits and which cells it is expected to fill.',
      'Include one row that should return a result and one blank or excluded row so the row-by-row logic can be checked.'
    ],
    copyChecks: [
      'Clear or move values that block the spill range before changing a valid array formula.',
      'Use matching open-ended ranges, such as A2:A and B2:B, when the formula should evaluate each row.',
      'Wrap row logic in IF checks so blank source rows do not create unwanted zeros or repeated output.',
      'Check whether nested functions need range-aware alternatives before putting them inside ARRAYFORMULA.',
      'Test the repaired formula in a copied column before replacing a shared sheet formula.'
    ]
  },
  {
    slug: 'google-sheets-importrange-not-working',
    title: 'Google Sheets IMPORTRANGE Not Working? | Write My Formula',
    description: 'Fix Google Sheets IMPORTRANGE formulas with #REF!, Allow access prompts, permission issues, result-size limits, slow refreshes, or volatile-function errors.',
    eyebrow: 'Google Sheets IMPORTRANGE repair',
    h1: 'Fix a Google Sheets IMPORTRANGE formula that is not working.',
    lede: 'If IMPORTRANGE shows #REF!, asks for Allow access, says the result is too large, loads slowly, or breaks after a source-sheet change, paste the formula and add the source range. Get a focused repair path for URL syntax, range strings, permissions, import size, refresh behavior, and safer source ranges.',
    preset: {
      mode: 'fix',
      platform: 'sheets',
      formula: '=IMPORTRANGE("https://docs.google.com/spreadsheets/d/source-id/edit","Orders!A:Z")'
    },
    intent: 'Help Google Sheets users repair one IMPORTRANGE formula where the visible problem may be a missing Allow access grant, a source-file permission issue, a malformed range string, an oversized import, a slow refresh, or a volatile source formula that Sheets will not import.',
    bestFor: [
      'IMPORTRANGE formulas that show #REF!, You need to connect these sheets, or a source access message.',
      'Imports that return Result too large, stay slow, or refresh unreliably because the pulled range is too broad.',
      'Formulas that combine IMPORTRANGE with QUERY, FILTER, VLOOKUP, or ARRAYFORMULA and need the import range narrowed before the rest of the formula can work.',
      'Source sheets that include volatile NOW, RAND, or RANDBETWEEN logic that can block import functions.'
    ],
    steps: [
      'Paste the exact IMPORTRANGE formula and the visible error text.',
      'Say whether you own the source spreadsheet and whether Allow access has already been clicked.',
      'Include the sheet tab name, intended columns, and whether the import is feeding QUERY, FILTER, or a lookup.'
    ],
    copyChecks: [
      'Put the source spreadsheet URL and range string in quotes, or reference cells that contain those exact values.',
      'Click Allow access from the destination sheet before rewriting a formula that is only waiting for permission.',
      'Confirm your Google account can open the source spreadsheet when you do not own it.',
      'Import only the rows and columns needed instead of whole-sheet ranges when the result is too large or slow.',
      'Check whether the source range depends on NOW, RAND, or RANDBETWEEN before trusting a refresh diagnosis.'
    ]
  },
  {
    slug: 'google-sheets-vlookup-not-working',
    title: 'Google Sheets VLOOKUP Not Working? | Write My Formula',
    description: 'Fix Google Sheets VLOOKUP formulas with #N/A, wrong matches, approximate-match issues, lookup-range mistakes, or return-column problems.',
    eyebrow: 'Google Sheets VLOOKUP repair',
    h1: 'Fix a Google Sheets VLOOKUP formula that is not returning the right value.',
    lede: 'If VLOOKUP returns #N/A, pulls a plausible but wrong row, or breaks after you copy the formula down, paste the formula and add the lookup table headers. Get a focused repair path for exact match, sorted ranges, first-column lookup rules, return-column indexes, and text-number mismatches.',
    preset: {
      mode: 'fix',
      platform: 'sheets',
      formula: '=VLOOKUP(E2,A2:D500,4,TRUE)'
    },
    intent: 'Help Google Sheets users repair one VLOOKUP formula where the visible problem is usually a missing exact match, an omitted is_sorted argument, an unsorted approximate-match range, a lookup table that does not start with the key column, a wrong return index, or stored text and numbers that look equal but do not match.',
    bestFor: [
      'VLOOKUP formulas that return #N/A even though the lookup value appears in the sheet.',
      'VLOOKUP formulas that return the wrong row because is_sorted is TRUE or omitted while the first lookup column is not sorted.',
      'Lookup ranges where the search key is not in the first column of the selected range.',
      'Copied formulas where the return-column index, locked range, or stored value type changed.'
    ],
    steps: [
      'Paste the exact VLOOKUP formula and the visible error text or wrong result.',
      'Include one lookup value that should match and the first few columns of the lookup table.',
      'Say whether the lookup should be exact or approximate, especially when the fourth argument is missing.'
    ],
    copyChecks: [
      'Use FALSE or 0 for exact match unless approximate matching is intentional.',
      'Sort the first column of the lookup range in ascending order before using TRUE approximate match.',
      'Confirm the selected range starts with the column VLOOKUP should search.',
      'Count the return index from the first column of the selected range, not from the sheet as a whole.',
      'Check whether lookup IDs, dates, or numbers are stored as matching text or numeric values before adding a fallback.'
    ]
  },
  {
    slug: 'google-sheets-xlookup-not-working',
    title: 'Google Sheets XLOOKUP Not Working? | Write My Formula',
    description: 'Fix Google Sheets XLOOKUP formulas with #N/A, wrong rows, blank fallbacks, range-size mismatches, or search-mode issues.',
    eyebrow: 'Google Sheets XLOOKUP repair',
    h1: 'Fix a Google Sheets XLOOKUP formula that is not matching correctly.',
    lede: 'If XLOOKUP returns #N/A, pulls the wrong row, shows a blank fallback, or changes behavior after a range edit, paste the formula and add the lookup table headers. Get a focused repair path for XLOOKUP(search_key, lookup_range, result_range, missing_value, match_mode, search_mode), including duplicates and stored text-number mismatches.',
    preset: {
      mode: 'fix',
      platform: 'sheets',
      formula: '=XLOOKUP(E2,A2:A500,D2:D500,"Not found",0,1)'
    },
    intent: 'Help Google Sheets users repair one XLOOKUP formula where the visible problem is usually a missing exact match, mismatched lookup and result ranges, a blank or misleading missing_value fallback, duplicate keys, an unintended search direction, binary search on unsorted data, or stored text and numbers that look equal but do not match.',
    bestFor: [
      'XLOOKUP formulas that return #N/A even though the lookup value appears in the sheet.',
      'XLOOKUP formulas that return the wrong row because duplicate keys need a deliberate first-to-last or last-to-first search mode.',
      'Blank-looking results where missing_value hides a true missing match or the matched result cell is empty.',
      'Lookup and result ranges that do not cover the same rows or use binary search without a correctly sorted lookup range.'
    ],
    steps: [
      'Paste the exact XLOOKUP formula and the visible error text or wrong result.',
      'Include one lookup value that should match and the lookup/result columns it should connect.',
      'Say whether the formula should use exact match, wildcard match, next greater, next lesser, first match, or last match.'
    ],
    copyChecks: [
      'Confirm lookup_range is one row or one column and result_range lines up with the same row or column positions.',
      'Use match_mode 0 for exact match unless next greater, next lesser, or wildcard behavior is intentional.',
      'Use search_mode -1 only when the last matching duplicate should win.',
      'Sort the lookup range before using binary search_mode 2 or -2.',
      'Check whether lookup IDs, dates, or numbers are stored as matching text or numeric values before adding a fallback.'
    ]
  },
  {
    slug: 'conditional-formatting-formula-not-working',
    title: 'Conditional Formatting Formula Not Working? | Write My Formula',
    description: 'Fix Excel and Google Sheets conditional formatting formulas that highlight nothing, highlight everything, shift references, or lose to another rule.',
    eyebrow: 'Conditional formatting formula not working',
    h1: 'Fix a conditional formatting formula that is not firing.',
    lede: 'Paste the rule you tried, add the apply-to range, and get a corrected TRUE/FALSE formula with the anchors, first-row references, and rule-order checks spelled out.',
    preset: {
      mode: 'fix',
      platform: 'excel',
      task: 'Fix this conditional formatting rule so overdue open tasks are highlighted across the whole row.',
      table: 'Task,Due Date,Status\nRenew contract,2026-05-10,Open\nSend invoice,2026-05-25,Done',
      range: 'Apply to A2:C100; due dates in B; status in C; first row is 2',
      hint: 'conditional formatting formula not working',
      formula: '=B2<TODAY() AND C2<>"Done"'
    },
    intent: 'Repair a custom conditional formatting formula that is not applying correctly in Excel or Google Sheets because the formula, references, selected range, or rule order does not match how the formatting engine evaluates the range.',
    bestFor: [
      'A rule that highlights nothing, highlights everything, or shifts down the range the wrong way.',
      'A formula that works in a normal cell but fails inside the conditional formatting rule dialog.',
      'A rule that stopped behaving after rows were added, ranges changed, or another rule was placed above it.'
    ],
    steps: [
      'Paste the current rule or describe the highlight you wanted.',
      'Include the exact apply-to range and the first row or cell in that range.',
      'Copy the corrected formula into the rule dialog, then check rule order if another format covers the same cells.'
    ],
    copyChecks: [
      'The rule formula should return TRUE or FALSE, or 1 or 0.',
      'Write the formula for the first cell or row in the apply-to range.',
      'Lock only the columns or rows that should stay fixed as the rule walks the range.',
      'In Google Sheets, use INDIRECT when a custom formula must reference another sheet.'
    ]
  },
  {
    slug: 'excel-vlookup-not-working',
    title: 'Excel VLOOKUP Not Working Fixer | Write My Formula',
    description: 'Fix Excel VLOOKUP formulas that return #N/A, #VALUE!, wrong matches, wrong columns, or blank-looking results.',
    eyebrow: 'Excel VLOOKUP repair',
    h1: 'Fix an Excel VLOOKUP formula that is not working.',
    lede: 'Paste the VLOOKUP formula that is failing, describe what should match, and get a focused repair path for exact-match mode, lookup-column position, text-number mismatches, column indexes, and safer fallbacks.',
    preset: {
      mode: 'fix',
      platform: 'excel',
      formula: '=VLOOKUP(E2,$B$2:$D$500,3,TRUE)'
    },
    intent: 'Help Excel users repair one VLOOKUP formula where the visible problem may be #N/A, #VALUE!, an unexpected approximate match, a lookup table that starts on the wrong column, or a return-column number that no longer matches the selected range.',
    bestFor: [
      'VLOOKUP formulas that return #N/A even though the lookup value appears in the sheet.',
      'VLOOKUP formulas that return a plausible but wrong row because the fourth argument is omitted or set to TRUE.',
      'Lookup tables where the searched value is not in the first column of the selected table range.',
      'Copied or edited VLOOKUP formulas where the column index, locked ranges, or stored value types changed.'
    ],
    steps: [
      'Paste the exact VLOOKUP formula that is not working.',
      'Include one lookup value that should match and the first few columns of the lookup table.',
      'Say whether the failure is #N/A, #VALUE!, a wrong returned value, a blank result, or a formula that breaks after filling down.'
    ],
    copyChecks: [
      'Use FALSE or 0 for exact match unless approximate matching is intentional.',
      'Confirm the table range starts with the column being searched.',
      'Count the return column from the first column of the selected table range.',
      'Check whether the lookup value and first lookup column store matching numbers, text, dates, and trimmed values.',
      'Add IFERROR or another fallback only after deciding that a missing match should be hidden.'
    ]
  },
  {
    slug: 'vlookup-na-error',
    title: 'VLOOKUP #N/A Error Fixer | Write My Formula',
    description: 'Fix VLOOKUP #N/A errors caused by exact-match settings, text-number mismatches, lookup ranges, and missing fallbacks.',
    eyebrow: 'VLOOKUP #N/A error fixer',
    h1: 'Fix a VLOOKUP #N/A error without guessing.',
    lede: 'Paste the VLOOKUP that is returning #N/A and get a corrected version with checks for exact match, text-number mismatches, lookup ranges, and safer fallbacks.',
    preset: {
      mode: 'fix',
      platform: 'excel',
      formula: '=VLOOKUP(E2,$A$2:$C$500,2,TRUE)'
    },
    intent: 'Help Excel users fix a VLOOKUP that returns #N/A or the wrong result even when the lookup value appears to exist in the table.',
    bestFor: [
      'VLOOKUP formulas where the value looks present but Excel still returns #N/A.',
      'Lookup tables with numbers stored as text, trailing spaces, or imported values that do not match cleanly.',
      'Older workbooks where VLOOKUP is still required but the formula needs exact-match and fallback checks.'
    ],
    steps: [
      'Paste the VLOOKUP formula that is returning #N/A.',
      'Add a short note about whether the match exists, looks duplicated, or comes from imported data.',
      'Include the lookup column, return column, and whether the workbook can use XLOOKUP instead.'
    ],
    copyChecks: [
      'Use FALSE or 0 for exact match unless approximate matching is intentional.',
      'Confirm the lookup value and first lookup column use the same stored type.',
      'Check that the table range starts with the column being searched.',
      'Use a readable fallback only after confirming whether a missing match is acceptable.'
    ]
  },
  {
    slug: 'xlookup-na-error',
    title: 'XLOOKUP #N/A Error Fixer | Write My Formula',
    description: 'Fix XLOOKUP #N/A errors caused by missing matches, text-number mismatches, lookup-array issues, and fallback arguments.',
    eyebrow: 'XLOOKUP #N/A error fixer',
    h1: 'Fix an XLOOKUP #N/A error before you hide it.',
    lede: 'Paste the XLOOKUP that is returning #N/A, describe what should match, and get a corrected formula path with checks for lookup arrays, match mode, text-number mismatches, and the if_not_found fallback.',
    preset: {
      mode: 'fix',
      platform: 'excel',
      formula: '=XLOOKUP(E2,$A$2:$A$500,$B$2:$B$500)'
    },
    intent: 'Help Excel users fix one XLOOKUP formula returning #N/A by checking whether the lookup value is truly missing, stored differently, pointed at the wrong array, or being masked too early with a fallback.',
    bestFor: [
      'XLOOKUP formulas where the value appears to exist but Excel still returns #N/A.',
      'Imports where IDs, SKUs, dates, or account numbers may be stored as text in one range and numbers in another.',
      'Modern lookup formulas that need a clear if_not_found value without hiding real data-quality problems.'
    ],
    steps: [
      'Paste the exact XLOOKUP formula that returns #N/A.',
      'Include one lookup value that should match and the first few values from the lookup array.',
      'Say whether a missing match should stay #N/A, return blank, or show a readable message.'
    ],
    copyChecks: [
      'Confirm the lookup array and return array cover the same rows.',
      'Check whether the lookup value and lookup array use the same stored type.',
      'Use the if_not_found argument only after deciding that a missing match is acceptable.',
      'Review match_mode and search_mode when approximate matching or reverse search is intentional.'
    ]
  },
  {
    slug: 'excel-xlookup-not-working',
    title: 'Excel XLOOKUP Not Working Fixer | Write My Formula',
    description: 'Fix Excel XLOOKUP formulas that return #N/A, wrong rows, blank fallbacks, or unreliable results because of lookup arrays, match modes, search modes, stored types, or version support.',
    eyebrow: 'Excel XLOOKUP repair',
    h1: 'Fix an Excel XLOOKUP formula that is not working.',
    lede: 'Paste the XLOOKUP formula that is failing, describe what should match, and get a focused repair path for lookup arrays, return arrays, match mode, search mode, stored value types, and version support.',
    preset: {
      mode: 'fix',
      platform: 'excel',
      formula: '=XLOOKUP(E2,$A$2:$A$500,$C$2:$C$450,"",0,-1)'
    },
    intent: 'Help Excel users repair one XLOOKUP formula where the visible problem may be #N/A, a wrong returned row, a blank-looking fallback, mismatched lookup and return arrays, an unintended match or search mode, or an unsupported Excel version.',
    bestFor: [
      'XLOOKUP formulas that return #N/A even though the lookup value appears in the source data.',
      'XLOOKUP formulas that return the wrong row because match_mode, search_mode, duplicates, or sort assumptions changed the match.',
      'Lookup and return arrays that do not cover the same rows after a range edit, paste, filter, or copy-down change.',
      'Imported IDs, SKUs, dates, or account numbers where stored text, numbers, spaces, or apostrophes do not match cleanly.',
      'Workbooks shared with older Excel versions where XLOOKUP support needs to be checked before replacing a formula.'
    ],
    steps: [
      'Paste the exact XLOOKUP formula that is not working.',
      'Include one lookup value that should match and a few values from the lookup and return arrays.',
      'Say whether the formula returns #N/A, a blank result, the wrong row, the first duplicate, the last duplicate, or a version error.'
    ],
    copyChecks: [
      'Confirm lookup_array and return_array start and end on the same rows.',
      'Check whether the lookup value and lookup array use the same stored type and trimmed text.',
      'Review match_mode before using approximate or wildcard matching.',
      'Use binary search modes only when the lookup array is sorted as required.',
      'Add if_not_found only after deciding whether a missing match should be hidden, blank, or visible.'
    ]
  },
  {
    slug: 'excel-index-match-not-working',
    title: 'Excel INDEX MATCH Not Working Fixer | Write My Formula',
    description: 'Fix Excel INDEX MATCH formulas that return #N/A, #REF!, wrong rows, wrong columns, or unreliable results.',
    eyebrow: 'Excel INDEX MATCH repair',
    h1: 'Fix an Excel INDEX MATCH formula that is not working.',
    lede: 'Paste the INDEX MATCH formula that is failing, describe what should match, and get a focused repair path for exact-match mode, lookup-array shape, row and column offsets, stored value types, and safer fallbacks.',
    preset: {
      mode: 'fix',
      platform: 'excel',
      formula: '=INDEX($C$2:$C$500,MATCH(E2,$A$2:$A$500,1))'
    },
    intent: 'Help Excel users repair one INDEX MATCH formula where the visible problem may be #N/A, #REF!, a wrong returned row, a row or column offset mistake, omitted approximate-match behavior, or imported values that look equal but are stored differently.',
    bestFor: [
      'INDEX MATCH formulas that return #N/A even though the lookup value appears in the source data.',
      'INDEX MATCH formulas that return the wrong row because MATCH omitted the exact-match argument or the lookup array is sorted differently than the match type expects.',
      'Two-way lookups where the row MATCH and column MATCH point at ranges with different shapes, offsets, or header positions.',
      'Older workbooks where INDEX MATCH is still required but the formula needs clearer range alignment and fallback checks.'
    ],
    steps: [
      'Paste the exact INDEX MATCH formula that is not working.',
      'Include one lookup value that should match and the lookup range plus return range it depends on.',
      'Say whether the failure is #N/A, #REF!, a wrong returned value, a blank result, or a formula that breaks after filling down.'
    ],
    copyChecks: [
      'Use 0 in MATCH for exact match unless approximate matching is intentional.',
      'Confirm the lookup array and return array cover the same row positions for one-way lookups.',
      'For two-way lookups, check that the row MATCH feeds the row_num argument and the column MATCH feeds the column_num argument.',
      'Check whether lookup values and source values are stored as matching numbers, text, dates, and trimmed values.',
      'Use IFERROR or IFNA only after confirming the formula is otherwise returning the intended row and column.'
    ]
  },
  {
    slug: 'vlookup-formula-generator',
    title: 'VLOOKUP Formula Generator | Write My Formula',
    description: 'Build VLOOKUP formulas from a plain-English lookup task and pasted table context.',
    eyebrow: 'VLOOKUP formula generator',
    h1: 'Build a VLOOKUP formula from the lookup you need.',
    lede: 'Use this when you need a legacy Excel-compatible lookup formula and want the range, return column, and fallback spelled out.',
    preset: {
      mode: 'write',
      platform: 'excel',
      task: 'Use VLOOKUP to find each SKU and return the product category.',
      table: 'SKU,Category,Price\nA-100,Hardware,14.99\nB-240,Office,8.50',
      range: 'A2:C500; lookup value in E2',
      hint: 'VLOOKUP'
    },
    intent: 'Generate a legacy-compatible lookup formula when VLOOKUP is the required function.',
    bestFor: [
      'Workbooks that must stay compatible with older Excel versions.',
      'Simple left-to-right table lookups with a known return column.',
      'Teams that already standardize on VLOOKUP in shared files.'
    ],
    steps: [
      'Put the lookup value and table range in the request.',
      'Paste the first row of the lookup table so the return column is clear.',
      'Ask for exact match unless you intentionally need approximate matching.'
    ],
    copyChecks: [
      'VLOOKUP searches the first column of the selected table range.',
      'The return column number changes if columns are inserted or removed.',
      'Use absolute references before filling the formula down.'
    ]
  },
  {
    slug: 'xlookup-formula-generator',
    title: 'XLOOKUP Formula Generator | Write My Formula',
    description: 'Generate XLOOKUP formulas with exact-match lookup logic, readable fallbacks, and copy-ready output.',
    eyebrow: 'XLOOKUP formula generator',
    h1: 'Write an XLOOKUP formula with the right lookup and return ranges.',
    lede: 'Describe the lookup, paste your table headers, and get a modern Excel or Google Sheets formula with a readable fallback.',
    preset: {
      mode: 'write',
      platform: 'excel',
      task: 'Find the customer email from the customer ID.',
      table: 'Customer ID,Customer,Email\nC001,Acme,ops@acme.co\nC002,Northwind,team@northwind.com',
      range: 'A2:C500; lookup ID in E2',
      hint: 'XLOOKUP'
    },
    intent: 'Create a modern exact-match lookup with separate lookup and return ranges.',
    bestFor: [
      'Replacing brittle VLOOKUP formulas in modern Excel or Google Sheets.',
      'Returning values from columns to the left or right of the lookup key.',
      'Adding clear not-found messages instead of raw lookup errors.'
    ],
    steps: [
      'Describe the lookup key and the value that should come back.',
      'Paste the columns involved, even if they are not next to each other.',
      'Include the cell that contains the lookup value.'
    ],
    copyChecks: [
      'Confirm the lookup range and return range have the same height.',
      'Keep the not-found fallback meaningful for downstream reports.',
      'Use modern Excel or Google Sheets before choosing XLOOKUP.'
    ]
  },
  {
    slug: 'index-match-formula-generator',
    title: 'INDEX MATCH Formula Generator | Write My Formula',
    description: 'Generate INDEX MATCH formulas for Excel and Google Sheets, including left lookups, two-way lookups, and older workbook compatibility.',
    eyebrow: 'INDEX MATCH formula generator',
    h1: 'Build an INDEX MATCH formula for the lookup you need.',
    lede: 'Describe the lookup, paste the involved columns or headers, and get an INDEX MATCH formula with notes for exact matches, left lookups, two-way lookups, and fill-down references.',
    preset: {
      mode: 'write',
      platform: 'excel',
      task: 'Use INDEX MATCH to find the product category from the SKU, even if the category column is to the left of the SKU column.',
      table: 'Category,Product,SKU,Price\nHardware,Keyboard,KB-100,49\nOffice,Notebook,NB-240,8',
      range: 'Categories in A2:A500; SKUs in C2:C500; lookup SKU in F2',
      hint: 'INDEX MATCH'
    },
    intent: 'Create flexible lookup formulas with INDEX and MATCH when VLOOKUP is too brittle or XLOOKUP is not available.',
    bestFor: [
      'Left lookups where the return column sits before the lookup column.',
      'Older Excel workbooks where XLOOKUP is not available.',
      'Two-way lookups that match both a row label and a column header.'
    ],
    steps: [
      'Describe the lookup value and the result that should come back.',
      'Paste the lookup range and return range, even when they are not adjacent.',
      'Mention whether the lookup is one-way, two-way, exact match, or approximate match.'
    ],
    copyChecks: [
      'The MATCH lookup range should line up with the INDEX return range.',
      'Use `0` in MATCH for exact matches unless approximate matching is intentional.',
      'Lock lookup and return ranges before filling the formula down.'
    ]
  },
  {
    slug: 'if-formula-generator',
    title: 'IF Formula Generator for Excel and Sheets | Write My Formula',
    description: 'Generate IF formulas for Excel or Google Sheets from plain-English rules and sample data.',
    eyebrow: 'IF formula generator',
    h1: 'Turn a plain-English rule into an IF formula.',
    lede: 'Write the rule in normal language, include the columns involved, and get a formula with notes for blanks, thresholds, and nested logic.',
    preset: {
      mode: 'write',
      platform: 'excel',
      task: 'If the revenue is above 1000 mark Review, otherwise mark OK. If the customer name is blank, return Missing.',
      table: 'Customer,Revenue\nAcme,1200\nNorthwind,800',
      range: 'A2:B500; result in C2',
      hint: 'IF'
    },
    intent: 'Translate a business rule into IF logic that can be pasted into Excel or Sheets.',
    bestFor: [
      'Status labels, thresholds, pass/fail checks, and simple routing logic.',
      'Rules that need a blank-cell branch before the main condition.',
      'Nested IF formulas where each outcome needs to stay readable.'
    ],
    steps: [
      'Write the rule with the exact output labels you want.',
      'Mention what should happen when the input cell is blank.',
      'Paste sample rows that cover both true and false outcomes.'
    ],
    copyChecks: [
      'Check text labels for exact spelling and capitalization.',
      'Test boundary values such as exactly 1000 when using greater-than logic.',
      'Consider IFS or SWITCH when the rule has many branches.'
    ]
  },
  {
    slug: 'excel-if-formula-multiple-conditions',
    title: 'Excel IF Formula with Multiple Conditions | Write My Formula',
    description: 'Write, explain, or fix Excel IF formulas with multiple conditions, including nested IF, AND, OR, IFS, blank checks, and edge-row tests.',
    eyebrow: 'Excel IF formula with multiple conditions',
    h1: 'Write an Excel IF formula with multiple conditions.',
    lede: 'Describe the rule, paste the columns involved, and get an IF formula with the branch order, AND/OR logic, and edge-row checks visible before you fill it down.',
    preset: {
      mode: 'write',
      platform: 'excel',
      task: 'Flag an invoice as Review if it is over 5000 and either past due or from a new customer. Otherwise mark it OK.',
      table: 'Invoice,Amount,Status,Customer Type\nINV-1001,6400,Past Due,Existing\nINV-1002,3200,Open,New\nINV-1003,7800,Open,New',
      range: 'Amount in B2:B500; status in C2:C500; customer type in D2:D500; result in E2',
      hint: 'IF AND OR'
    },
    intent: 'Build Excel IF logic when one output depends on several conditions, branch order matters, and the formula needs to stay readable enough to test before filling down.',
    bestFor: [
      'Nested IF, IFS, IF with AND, and IF with OR formulas that are hard to assemble by hand.',
      'Status, approval, risk, invoice, commission, and routing rules with several possible outcomes.',
      'Fixing conditional logic that works for one row but fails on blanks, thresholds, or edge cases.'
    ],
    steps: [
      'Write the business rule in the order Excel should evaluate it.',
      'Paste headers and sample rows that include true, false, blank, and edge cases.',
      'Say whether every condition must be true or whether any one condition should be enough.'
    ],
    copyChecks: [
      'Read the branch order back before filling the formula down.',
      'Test one row that should return the positive result and one row that should not.',
      'Use IFS or SWITCH when the formula has many ordered outcomes instead of one true/false branch.'
    ]
  },
  {
    slug: 'excel-if-formula-not-working',
    title: 'Excel IF Formula Not Working Fixer | Write My Formula',
    description: 'Fix Excel IF, nested IF, IFS, AND, and OR formulas that return the wrong label, FALSE, 0, blank, #VALUE!, or a syntax error.',
    eyebrow: 'Excel IF formula repair',
    h1: 'Fix an Excel IF formula that is not working.',
    lede: 'Paste the IF formula you are fighting, type what it should return, and get a focused repair path for wrong branches, missing quotes, AND/OR logic, parentheses, list separators, and IFS alternatives.',
    preset: {
      mode: 'fix',
      platform: 'excel',
      formula: '=IF(AND(B2>=60,C2>=80%),"Pass","Fail"))'
    },
    intent: 'Help Excel users repair one IF, nested IF, IFS, or IF-with-AND-or-OR formula that returns the wrong answer, shows FALSE or 0, fails syntax checks, or evaluates every row the same way.',
    bestFor: [
      'IF formulas that return FALSE, 0, blank, or the wrong label instead of the expected text.',
      'Nested IF and IFS formulas where branch order, missing default results, or copied conditions send rows to the wrong outcome.',
      'IF with AND or OR logic that throws #VALUE!, always evaluates TRUE, always evaluates FALSE, or handles blanks incorrectly.',
      'Formulas copied from examples where separators, quotes, comparison operators, or parentheses do not match the workbook.'
    ],
    steps: [
      'Paste the exact IF formula that is not working.',
      'Add what the formula should return and one row where Excel currently gets it wrong.',
      'Include any thresholds, text labels, blank-cell behavior, or AND/OR rules the formula is supposed to follow.'
    ],
    copyChecks: [
      'Confirm every text result such as Pass, Yes, Review, or Fail is wrapped in quotes.',
      'Count opening and closing parentheses before changing working logic.',
      'Check whether your Excel locale expects commas or semicolons between IF arguments.',
      'Test boundary values such as exactly 60 when the formula uses greater-than or greater-than-or-equal logic.',
      'Use IFS, SWITCH, or a lookup table when a long nested IF is really an ordered decision list.'
    ]
  },
  {
    slug: 'countifs-formula-generator',
    title: 'COUNTIFS Formula Generator | Write My Formula',
    description: 'Generate COUNTIFS formulas for Excel and Google Sheets from multiple criteria written in plain English.',
    eyebrow: 'COUNTIFS formula generator',
    h1: 'Count rows that match multiple criteria.',
    lede: 'Describe the conditions, paste your headers, and get a COUNTIFS formula with clear criteria ranges and checks.',
    preset: {
      mode: 'write',
      platform: 'excel',
      task: 'Count how many customers are Active and have revenue above 1000.',
      table: 'Customer,Status,Revenue\nAcme,Active,1200\nNorthwind,Paused,800',
      range: 'A2:C500; result in F2',
      hint: 'COUNTIFS'
    },
    intent: 'Count rows that match two or more conditions without assembling criteria pairs by hand.',
    bestFor: [
      'Counting active customers, paid invoices, late tasks, or rows above a threshold.',
      'Combining text, date, and number criteria in one count.',
      'Replacing manual filters with a repeatable count formula.'
    ],
    steps: [
      'Name each condition in plain English.',
      'Paste the columns that contain the criteria values.',
      'Mention whether date windows should be fixed or relative to today.'
    ],
    copyChecks: [
      'Every COUNTIFS criteria range must be the same size.',
      'Text criteria need quotes in the final formula.',
      'Number and date comparisons usually need operators such as greater than or less than.'
    ]
  },
  {
    slug: 'sumifs-formula-generator',
    title: 'SUMIFS Formula Generator | Write My Formula',
    description: 'Generate SUMIFS formulas for Excel and Google Sheets from plain-English criteria and pasted table context.',
    eyebrow: 'SUMIFS formula generator',
    h1: 'Sum matching rows without building SUMIFS by hand.',
    lede: 'Tell the workbench what to total and which rows should count, then copy a SUMIFS formula with the criteria spelled out.',
    preset: {
      mode: 'write',
      platform: 'excel',
      task: 'Sum paid invoice amounts where the invoice date is in the current month.',
      table: 'Invoice Date,Status,Amount\n2026-05-04,Paid,1200\n2026-05-12,Open,850',
      range: 'A2:C500; result in F2',
      hint: 'SUMIFS'
    },
    intent: 'Total the values from rows that match your status, date, or category rules.',
    bestFor: [
      'Invoice totals, revenue rollups, expense summaries, and monthly reporting.',
      'Summing one numeric column while filtering by several other columns.',
      'Turning a repeated filter-and-total workflow into a single formula.'
    ],
    steps: [
      'Describe what should be summed and which rows should count.',
      'Paste the sum column plus every criteria column.',
      'Include whether the date range is this month, a fixed month, or a custom window.'
    ],
    copyChecks: [
      'The SUMIFS sum range and criteria ranges must be the same size.',
      'Date criteria should be tested with known rows from the period.',
      'Confirm amounts are stored as numbers, not text.'
    ]
  },
  {
    slug: 'percentage-formula-generator',
    title: 'Percentage Formula Generator for Excel and Sheets | Write My Formula',
    description: 'Generate percentage formulas for Excel and Google Sheets, including percent of total, percent change, discounts, markup, and completion rates.',
    eyebrow: 'Percentage formula generator',
    h1: 'Create percentage formulas without mixing up the math.',
    lede: 'Describe the percentage calculation, paste the cells involved, and get a formula with notes for percent formatting, absolute references, and edge cases.',
    preset: {
      mode: 'write',
      platform: 'excel',
      task: 'Calculate each product category as a percentage of total revenue.',
      table: 'Category,Revenue\nHardware,12500\nSoftware,34200\nServices,18900',
      range: 'B2:B4; total in B5; result in C2',
      hint: 'percentage of total'
    },
    intent: 'Build percentage formulas for totals, changes, discounts, markup, tax, tips, or completion rates without having to remember whether the formula should divide, subtract, or multiply.',
    bestFor: [
      'Percent of total, percent change, and completion-rate formulas.',
      'Discount, markup, tax, tip, and commission calculations.',
      'Reports where formulas need stable total references before filling down.'
    ],
    steps: [
      'Describe the percentage you need in plain English.',
      'Paste the part, total, old value, new value, or rate cells involved.',
      'Mention whether the result should be a decimal or formatted as a percentage.'
    ],
    copyChecks: [
      'Format decimal results as percentages instead of multiplying twice.',
      'Lock total cells with dollar signs before filling formulas down.',
      'Test blank totals and zero totals before using the formula in a report.'
    ]
  },
  {
    slug: 'date-formula-generator',
    title: 'Date Formula Generator for Excel and Sheets | Write My Formula',
    description: 'Generate date formulas for Excel and Google Sheets, including due dates, month-end dates, workdays, date differences, and overdue checks.',
    eyebrow: 'Date formula generator',
    h1: 'Date formulas that do not return 45678.',
    lede: 'Type what you are trying to figure out, such as business days between two dates or rows more than 30 days overdue. Get a formula plus a short note on the input format it expects.',
    preset: {
      mode: 'write',
      platform: 'excel',
      task: 'Calculate the due date 10 business days after each start date, excluding the company holidays listed in column F.',
      table: 'Task,Start Date\nOnboarding,2026-05-04\nRenewal,2026-05-12\n\nHoliday\n2026-05-25',
      range: 'Start dates in B2:B100; holidays in F2:F20; result in C2',
      hint: 'WORKDAY'
    },
    intent: 'Build date formulas for deadlines, workday counts, month-end reporting, renewal dates, age calculations, and overdue status checks.',
    bestFor: [
      'Due dates, renewal dates, and follow-up dates based on a start date.',
      'Business-day calculations that need weekends or holidays excluded.',
      'Reports that compare dates to today, month end, or a fixed cutoff.'
    ],
    steps: [
      'Describe the date result you need in plain English.',
      'Paste the start date, end date, holiday, or cutoff columns involved.',
      'Mention whether weekends, holidays, or month-end behavior should change the answer.'
    ],
    copyChecks: [
      'Confirm that source cells are stored as dates, not text.',
      'Format serial-number results as dates before sharing the sheet.',
      'Test the formula around weekends, holidays, and month boundaries.'
    ]
  },
  {
    slug: 'filter-formula-generator',
    title: 'FILTER Formula Generator for Excel and Sheets | Write My Formula',
    description: 'Generate FILTER formulas for Excel and Google Sheets, including multi-condition row filters, status lists, and no-match fallbacks.',
    eyebrow: 'FILTER formula generator',
    h1: 'Return the rows that match your conditions.',
    lede: 'Describe the rows you want to pull out of a table, include the columns involved, and get a FILTER formula with notes on spill ranges and empty-result handling.',
    preset: {
      mode: 'write',
      platform: 'excel',
      task: 'Return all open deals from the West region with value above 5000, and show No matching rows if nothing qualifies.',
      table: 'Deal,Region,Status,Value\nRenewal,West,Open,7200\nExpansion,East,Open,4100\nSupport,West,Closed,1800',
      range: 'A2:D500; output starts in F2',
      hint: 'FILTER'
    },
    intent: 'Build dynamic array filters that return matching rows from a table instead of only counting or summing them.',
    bestFor: [
      'Pulling open deals, overdue tasks, customer lists, or rows for one region into a live view.',
      'Combining several status, date, text, or number conditions in one spilled result.',
      'Adding an empty-result fallback so reports do not show raw #CALC or #N/A errors.'
    ],
    steps: [
      'Describe which rows should be returned and which columns hold the conditions.',
      'Paste the source table headers and sample rows.',
      'Mention where the spilled output should start and what to show when no rows match.'
    ],
    copyChecks: [
      'Confirm the output area has room for the spilled rows and columns.',
      'Make each include condition the same height as the filtered table.',
      'Use a no-match fallback before putting the formula into a shared report.'
    ]
  },
  {
    slug: 'text-formula-generator',
    title: 'Text Formula Generator for Excel and Sheets | Write My Formula',
    description: 'Generate text formulas for Excel and Google Sheets, including split, extract, join, trim, clean, and text replacement formulas.',
    eyebrow: 'Text formula generator',
    h1: 'Clean and extract text without hand-building string formulas.',
    lede: 'Describe the text cleanup job, paste sample values, and get a formula for splitting names, extracting domains, joining fields, removing extra spaces, or replacing text.',
    preset: {
      mode: 'write',
      platform: 'sheets',
      task: 'Extract the domain from each customer email address and return it in a new column.',
      table: 'Email,Customer\nalex@northwind.com,Northwind\nsam@acme.co,Acme\nlee@example.org,Example',
      range: 'Emails in A2:A500; result in C2',
      hint: 'REGEXEXTRACT'
    },
    intent: 'Build formulas that transform messy imported text into useful fields without manual copy, split, or find-and-replace work.',
    bestFor: [
      'Extracting domains, codes, IDs, names, or text before and after delimiters.',
      'Joining first name, last name, address, or label fields with separators.',
      'Cleaning imported text with extra spaces, inconsistent case, or replaceable fragments.'
    ],
    steps: [
      'Paste a few real sample values so the delimiter or pattern is visible.',
      'Describe whether you need text before, after, between, or joined from other cells.',
      'Mention whether the formula must work in Excel, Google Sheets, or both.'
    ],
    copyChecks: [
      'Test samples with missing delimiters, extra spaces, and blank cells.',
      'Check whether the formula spills into neighboring cells before filling down.',
      'Confirm modern Excel text functions such as TEXTSPLIT or TEXTAFTER are available in your version.'
    ]
  },
  {
    slug: 'data-validation-formula-generator',
    title: 'Data Validation Formula Generator for Excel and Sheets | Write My Formula',
    description: 'Generate custom data validation formulas for Excel and Google Sheets, including email checks, unique values, required fields, and allowed entry rules.',
    eyebrow: 'Data validation formula generator',
    h1: 'Write the custom formula for a data validation rule.',
    lede: 'Describe the entries that should be allowed, paste the columns involved, and get a TRUE/FALSE formula for Excel or Google Sheets data validation.',
    preset: {
      mode: 'write',
      platform: 'excel',
      task: 'Only allow customer IDs that start with ID- and are at least 10 characters long.',
      table: 'Customer ID,Customer\nID-0001234,Acme\n1234,Northwind',
      range: 'Apply data validation to C2:C500; first entry cell is C2',
      hint: 'data validation custom formula'
    },
    intent: 'Build custom data validation formulas that return TRUE for entries users are allowed to type and FALSE for entries that should be rejected.',
    bestFor: [
      'Restricting IDs, emails, dates, required fields, and duplicate entries at the point of entry.',
      'Turning spreadsheet rules into validation formulas instead of after-the-fact cleanup.',
      'Fixing absolute and relative references before applying a rule to a whole input range.'
    ],
    steps: [
      'Describe what makes an entry valid or invalid.',
      'Paste the input column and any helper columns the rule depends on.',
      'Include the first cell in the applied validation range so relative references start correctly.'
    ],
    copyChecks: [
      'Data validation custom formulas should return TRUE for allowed entries.',
      'Write the formula as if it is evaluated from the first cell in the applied range.',
      'Check whether your rule should reject blanks or let users leave the cell empty.'
    ]
  },
  {
    slug: 'pivot-table-calculated-field-formula-generator',
    title: 'Pivot Table Calculated Field Formula Generator | Write My Formula',
    description: 'Generate PivotTable calculated field formulas for Excel and Google Sheets, including margin, average price, variance, and ratio formulas.',
    eyebrow: 'Pivot table calculated field formula generator',
    h1: 'Write a calculated field formula for a pivot table.',
    lede: 'Describe the pivot-table metric you need, paste the source field names, and get a formula that uses field names instead of normal cell references.',
    preset: {
      mode: 'write',
      platform: 'excel',
      task: 'Create a pivot table calculated field for gross margin from revenue and cost.',
      table: 'Region,Product,Revenue,Cost\nWest,Hardware,12000,7800\nEast,Software,18000,6300',
      range: 'Pivot source fields: Revenue and Cost; calculated field name: Gross Margin',
      hint: 'pivot table calculated field'
    },
    intent: 'Build formulas for PivotTable calculated fields where the formula should reference source field names such as Revenue, Cost, Quantity, or Units rather than worksheet cells.',
    bestFor: [
      'Profit, margin, average price, variance, and ratio metrics inside a pivot table.',
      'Excel or Google Sheets pivot tables where the calculated value belongs in the Values area.',
      'Avoiding invalid cell references when the pivot table layout changes.'
    ],
    steps: [
      'List the exact source field names from the pivot table.',
      'Describe the calculated metric and the name you want for the new field.',
      'Mention whether the result is a currency, percentage, count, or ratio.'
    ],
    copyChecks: [
      'Use pivot field names, not A1-style cell references.',
      'Confirm the referenced fields are available in the pivot source data.',
      'Use a helper column in the source table when the calculation needs row-level logic before aggregation.'
    ]
  },
  {
    slug: 'conditional-formatting-formula-generator',
    title: 'Conditional Formatting Formula Generator for Excel and Sheets | Write My Formula',
    description: 'Write conditional formatting formulas for Excel and Google Sheets that return TRUE for the right rows: overdue dates, duplicates, status checks, and whole-row highlights.',
    eyebrow: 'Conditional formatting formula generator',
    h1: 'Write the formula the conditional formatting rule dialog is asking for.',
    lede: 'Tell the workbench which cells should light up, paste a couple of sample rows, and get a TRUE/FALSE formula with the anchors set for your applied range.',
    preset: {
      mode: 'write',
      platform: 'excel',
      task: 'Highlight the entire row when the task is overdue and the status is not Done.',
      table: 'Task,Due Date,Status\nRenew contract,2026-05-10,Open\nSend invoice,2026-05-25,Done',
      range: 'Apply to A2:C100; due dates in B; status in C',
      hint: 'conditional formatting'
    },
    intent: 'Write a custom conditional formatting formula that returns TRUE for the cells or rows that should be highlighted, with the right anchors for your applied range.',
    bestFor: [
      'Highlighting overdue tasks, missing values, duplicates, or whole rows by status.',
      'Rules that depend on another cell in the same row.',
      'Getting the dollar signs right before applying a rule across a range.'
    ],
    steps: [
      'Describe the cells or rows that should be formatted.',
      'Paste the headers and one or two sample rows.',
      'Include the exact applied range, like A2:C100.'
    ],
    copyChecks: [
      'The formula should return TRUE or FALSE so the formatting rule knows when to fire.',
      'Lock columns with dollar signs when the rule should follow row by row, such as $B2.',
      'For Google Sheets, use same-sheet references directly and INDIRECT when the rule must reference another sheet.',
      'Open the rule on the first cell of your applied range and confirm the highlight lands where you expect before extending it.'
    ]
  },
  {
    slug: 'google-sheets-conditional-format-custom-formula',
    title: 'Google Sheets Conditional Format Custom Formula Generator | Write My Formula',
    description: 'Write Google Sheets conditional formatting custom formulas for whole-row highlights, duplicate checks, status rules, overdue dates, and cross-sheet references.',
    eyebrow: 'Google Sheets conditional format custom formula',
    h1: 'Stop guessing at the Google Sheets custom formula.',
    lede: 'Describe what should light up, add the apply-to range, and get the exact TRUE/FALSE expression to paste into Custom formula is, with the dollar signs set for how Sheets walks the range.',
    preset: {
      mode: 'write',
      platform: 'sheets',
      task: 'Highlight the entire row when column C says Yes.',
      table: 'Task,Owner,Ready\nRenew contract,Alex,Yes\nSend invoice,Sam,No',
      range: 'Apply to A1:Z1000; status is in C; first row is 1',
      hint: 'Google Sheets custom formula is conditional formatting'
    },
    intent: 'Create a Google Sheets custom formula rule that returns TRUE for the cells or rows that should receive formatting, with relative and absolute references written for the selected range.',
    bestFor: [
      'Whole-row highlights based on a status, date, checkbox, or owner column.',
      'Duplicate, overdue, missing-field, and threshold rules that built-in presets cannot express.',
      'Comparing a cell to a value on another sheet where direct references do not work.',
      'Fixing dollar signs before applying one rule across many rows or columns.'
    ],
    steps: [
      'Describe the highlight condition in normal language.',
      'Paste the headers and a couple of rows so the rule can use the right columns.',
      'Include the exact apply-to range and the first row in that range.'
    ],
    copyChecks: [
      'Use Custom formula is in the Google Sheets conditional formatting sidebar.',
      'Write the formula for the first cell or row in the apply-to range.',
      'Use dollar signs to lock the columns or rows that should not shift.',
      'Use INDIRECT when a Google Sheets conditional-format rule must reference another sheet.'
    ]
  }
];

const pageEnhancements = {
  'excel-formula-generator': {
    gives: [
      'A draft Excel formula built from your task, table context, and target cell.',
      'A plain-English read of what the formula is trying to do.',
      'Checks for range references, modern-function support, and fill-down behavior.'
    ],
    useWhen: 'Use this page when you know the spreadsheet result you want, but not the exact Excel syntax. It works best when you can provide column names, sample rows, and the cell where the formula should start.',
    notWhen: 'Do not treat the output as final until you test it against a few known rows in your workbook. If the workbook uses unusual merged cells, hidden helper columns, or regional separators, check those details before pasting broadly.',
    example: {
      setup: 'For a customer table with Plan in column B and Price in column C, a lookup formula can return the matching monthly price for the plan in B2.',
      formula: '=XLOOKUP(B2,$B$2:$B$100,$C$2:$C$100,"Not found")',
      read: 'The formula searches the plan column for the value in B2, returns the matching price, and shows Not found when there is no match.'
    }
  },
  'google-sheets-formula-generator': {
    gives: [
      'A draft Google Sheets formula using Sheets-friendly functions where they fit.',
      'A visible explanation of ranges, text parsing, or spill behavior.',
      'Compatibility notes for formulas that may behave differently in Excel.'
    ],
    useWhen: 'Use this page for shared Google Sheets where text parsing, filters, and lightweight cleanup formulas need to be understandable by the rest of the team.',
    notWhen: 'Do not assume the same formula will paste into every locale or into desktop Excel without edits. Separators, array behavior, and newer functions can differ by account and app.',
    example: {
      setup: 'For email addresses in column A, a Sheets formula can extract the domain after the @ symbol.',
      formula: '=REGEXEXTRACT(A2,"@(.+)$")',
      read: 'The formula reads A2, finds the text after @, and returns the domain portion for review before filling down.'
    }
  },
  'excel-formula-help': {
    gives: [
      'A formula draft, explanation, or fix matched to the Excel problem you describe.',
      'A plain-English read of the function choice, references, assumptions, and fallback behavior.',
      'Checks for version support, range alignment, fill-down behavior, and known-row testing.'
    ],
    useWhen: 'Use this page when the problem is still broad: you need help with an Excel formula, but you may not know whether the answer is IF, SUMIFS, XLOOKUP, FILTER, text cleanup, dates, conditional formatting, or a repair to a formula you already have.',
    notWhen: 'Do not use it as a workbook audit, dashboard workflow, file-upload analyzer, or substitute for testing. Write My Formula stays focused on one formula, one rule, or one repair that you can inspect before using.',
    example: {
      setup: 'For tasks with due dates in B and status in C, an Excel helper formula can flag open overdue rows while leaving completed rows alone.',
      formula: '=IF(AND(B2<TODAY(),C2<>"Done"),"Overdue","OK")',
      read: 'The formula checks whether the due date is before today and the status is not Done. Both conditions must be true before the row is marked Overdue.'
    }
  },
  'ai-excel-formula-generator': {
    gives: [
      'An Excel formula draft generated from a plain-English request and the context you provide.',
      'A readable explanation of the function choice, ranges, criteria, and fallback behavior.',
      'Paste checks for references, fill-down behavior, date handling, and modern Excel compatibility.'
    ],
    useWhen: 'Use this page when you want AI help writing an Excel formula but still need the formula, assumptions, and paste checks visible. It is strongest for formula-sized jobs like SUMIFS, XLOOKUP, IF, FILTER, text cleanup, dates, and conditional-formatting rules.',
    notWhen: 'Do not use Write My Formula as a replacement for tools that upload whole workbooks, chat with data files, build dashboards, generate charts, or automate a full spreadsheet workflow. It is intentionally narrower so you can inspect one formula before using it.',
    example: {
      setup: 'For invoices with dates in A, status in B, and amounts in C, an AI-generated formula can total paid invoices from May 2026 while ignoring open invoices.',
      formula: '=SUMIFS(C2:C500,B2:B500,"Paid",A2:A500,">="&DATE(2026,5,1),A2:A500,"<"&DATE(2026,6,1))',
      read: 'The formula totals only rows marked Paid where the invoice date is on or after May 1, 2026 and before June 1, 2026. The checks tell you to confirm real date values and equal-height SUMIFS ranges.'
    }
  },
  'ai-google-sheets-formula-generator': {
    gives: [
      'A Google Sheets formula draft generated from your plain-English request and pasted context.',
      'A plain-English read of the function choice, columns, criteria, and expected spill behavior.',
      'Paste checks for separators, header rows, output ranges, and Sheets-specific functions.'
    ],
    useWhen: 'Use this page when you want AI help writing a Google Sheets formula and still need to see the formula, assumptions, and paste checks before using it. It is strongest for formula-sized jobs like QUERY, FILTER, ARRAYFORMULA, REGEXEXTRACT, IMPORTRANGE, lookups, summaries, and custom rules.',
    notWhen: 'Do not use Write My Formula as a replacement for tools that upload whole workbooks, chat with data files, build dashboards, generate charts, or automate a full spreadsheet workflow. It is intentionally narrower so you can inspect one formula before using it.',
    example: {
      setup: 'For a table with Date in A, Region in B, Customer in C, and Amount in D, a Google Sheets QUERY formula can summarize April 2026 revenue by region.',
      formula: '=QUERY(A1:D500,"select B, sum(D) where A >= date \'2026-04-01\' and A < date \'2026-05-01\' group by B label sum(D) \'April revenue\'",1)',
      read: 'The formula reads the source table, keeps April 2026 rows, groups them by region, and sums Amount. The checks tell you to confirm the Date column contains real dates and that the output area is empty before the formula spills.'
    }
  },
  'google-sheets-query-formula-generator': {
    gives: [
      'A draft QUERY formula matched to the columns, filters, sort order, and labels you describe.',
      'A plain-English read of the select, where, order by, group by, or label clauses.',
      'Checks for header rows, quoted text criteria, and whether column letters or Col1-style references fit the source range.'
    ],
    useWhen: 'Use this page when Google Sheets needs a report-like output from a source table, such as open deals by region, late tasks by owner, grouped totals by month, or selected columns sorted by a metric.',
    notWhen: 'Do not use QUERY just to return a few matching rows when FILTER is simpler and easier for the team to edit. QUERY is strongest when the output needs SQL-like select, where, order by, group by, or label clauses.',
    example: {
      setup: 'For deals in A1:D500 with headers in row 1, a QUERY formula can show only open West-region deals above 5000 and sort the highest value first.',
      formula: '=QUERY(A1:D500,"select A, B, C, D where B = \'West\' and C = \'Open\' and D > 5000 order by D desc",1)',
      read: 'The formula reads the source table, keeps the requested columns, filters to West open deals over 5000, sorts by value descending, and treats the first row as headers.'
    }
  },
  'formula-bot-alternative': {
    gives: [
      'A focused formula request flow for Excel and Google Sheets rather than a full spreadsheet-analysis workspace.',
      'Write, Explain, and Fix modes with table context, range hints, formula notes, and a copy button.',
      'A clear upgrade path: 2 guest tries, free email access at 3 runs per week, or $9 founding access for 500 runs per month in this browser.'
    ],
    useWhen: 'Use this page when you are comparing AI Excel formula tools and the immediate job is still formula-shaped: write a SUMIFS, fix a lookup, explain nested IF logic, build a conditional-formatting rule, or adapt a formula to the ranges in your sheet.',
    notWhen: 'Do not use Write My Formula as a replacement for tools that upload whole workbooks, analyze data files, generate dashboards, or build charts. It is intentionally narrower: describe the formula job, paste the relevant context, and test the output before filling it down.',
    example: {
      setup: 'For invoices with dates in A, status in B, and amounts in C, you can ask for a formula that totals paid invoices from the current month and ignores open rows.',
      formula: '=SUMIFS(C2:C500,B2:B500,"Paid",A2:A500,">="&DATE(2026,5,1),A2:A500,"<"&DATE(2026,6,1))',
      read: 'The formula totals only rows marked Paid where the invoice date falls inside May 2026. The checks tell you to confirm date cells are real dates and that each SUMIFS range has the same height.'
    }
  },
  'sheetsolver-ai-alternative': {
    gives: [
      'A focused formula request flow for Excel and Google Sheets instead of a broad spreadsheet automation suite.',
      'Write, Explain, and Fix modes with optional table context, range hints, formula notes, and copy checks.',
      'A low-friction path to try the tool: 2 guest tries, free email access at 3 runs per week, or $9 founding access for 500 runs per month in this browser.'
    ],
    useWhen: 'Use this page when you are comparing AI spreadsheet formula generators and the job in front of you is still formula-shaped: write one formula, explain one inherited formula, fix one broken formula, or create a custom rule for conditional formatting or data validation.',
    notWhen: 'Do not use Write My Formula as a replacement for tools that upload whole workbooks, chat with data files, build dashboards, generate charts, or automate full spreadsheet workflows. It is intentionally narrower so the formula, explanation, and paste checks stay visible.',
    example: {
      setup: 'For email addresses in column A, a Google Sheets formula can extract the domain while leaving blank rows empty.',
      formula: '=IF(A2="","",REGEXEXTRACT(A2,"@(.+)$"))',
      read: 'The formula checks for a blank first, then extracts the text after @ from nonblank email addresses. The checks tell you to test missing @ symbols and blank rows before filling down.'
    }
  },
  'excel-formula-cheat-sheet': {
    gives: [
      'A compact reference for common Excel formula jobs and the function patterns that fit them.',
      'Worked examples for lookup, summary, text cleanup, date, percentage, and validation formulas.',
      'A path from generic cheat-sheet syntax into a formula generated for your exact columns.'
    ],
    useWhen: 'Use this page when you are not sure whether the job needs XLOOKUP, INDEX MATCH, SUMIFS, COUNTIFS, IF, FILTER, TEXTAFTER, WORKDAY, or another common formula. Start with the pattern, then generate the version that fits your actual sheet.',
    notWhen: 'Do not paste a cheat-sheet formula blindly into an important workbook. Generic examples rarely match your exact ranges, locked references, locale separators, or blank-cell behavior.',
    example: {
      setup: 'For invoice dates in A, status in B, and amounts in C, a common cheat-sheet pattern is SUMIFS for paid invoices in a date window.',
      formula: '=SUMIFS(C2:C500,B2:B500,"Paid",A2:A500,">="&DATE(2026,5,1),A2:A500,"<"&DATE(2026,6,1))',
      read: 'The formula totals amounts only when the row is marked Paid and the invoice date falls inside May 2026.'
    }
  },
  'excel-formula-explainer': {
    gives: [
      'A plain-English breakdown of the pasted formula.',
      'A step-by-step read of the branching logic or function chain.',
      'Notes about assumptions, blanks, and compatibility before you edit it.'
    ],
    useWhen: 'Use this page when a workbook already contains a formula and you need to understand it before changing references, copying it to another sheet, or explaining it to someone else.',
    notWhen: 'Do not rely on an explanation alone for financial or operational decisions. Pair it with a few rows where you already know the expected answer.',
    example: {
      setup: 'A nested IF can label blank customer rows separately from rows that need review.',
      formula: '=IF(A2="","Missing",IF(B2>1000,"Review","OK"))',
      read: 'The formula first checks whether A2 is blank, then checks whether revenue in B2 is above 1000, and returns one of three text labels.'
    }
  },
  'excel-formula-fixer': {
    gives: [
      'A corrected formula draft for the one formula that is failing.',
      'A short explanation of likely syntax, range, data-type, calculation, or fallback problems.',
      'Checks that help you test the fix against known rows before replacing a report formula.'
    ],
    useWhen: 'Use this page when you would search for fix my Excel formula: a formula returns an error, displays as text, stops recalculating, breaks after being filled down, or needs a clearer fallback for missing matches. It is strongest when you can paste the exact formula and one expected result.',
    notWhen: 'Do not use it as a full-file review or proof every formula in a workbook is safe. Fix one formula first, test one known row, then compare the result against the original data before filling it through a report.',
    example: {
      setup: 'A VLOOKUP can return #N/A even when the value appears to exist if the lookup cell contains hidden spaces from an import.',
      formula: '=IFERROR(VLOOKUP(TRIM(A2),Customers!$A:$C,3,FALSE),"Not found")',
      read: 'The formula trims the lookup value before searching the customer table, uses exact match, returns column 3, and shows Not found only after the lookup has been checked.'
    }
  },
  'excel-formula-not-showing-result': {
    gives: [
      'A focused fix pass for formulas that display as text, return stale values, or produce unexpected results.',
      'A checklist for calculation settings, text-formatted inputs, argument types, and inconsistent references.',
      'A revised formula path you can test on one known row before replacing a report column.'
    ],
    useWhen: 'Use this page when Excel is not showing the result you expected: the cell shows the formula itself, the value does not update, or the result looks wrong after a copy, import, or workbook setting change. Paste the formula and describe the visible symptom.',
    notWhen: 'Do not overwrite a whole workbook just because one suggested fix looks plausible. Excel calculation settings can affect open workbooks, and imported text values can make a correct-looking formula behave incorrectly.',
    example: {
      setup: 'A status formula may look right but fail when the revenue values are imported as text or when the workbook is set to manual calculation.',
      formula: '=IF(VALUE(B2)>1000,"Review","OK")',
      read: 'The formula converts B2 to a number before testing the threshold. Use it only after checking that B2 should always contain a numeric value.'
    }
  },
  'excel-formulas-not-working': {
    gives: [
      'A focused repair flow for formulas that are not calculating, not updating, or not parsing.',
      'Checks for Show Formulas mode, manual calculation, text-formatted cells, separators, data types, and error values.',
      'A revised formula path you can test on one known row before changing the rest of the workbook.'
    ],
    useWhen: 'Use this page when Excel formulas stop working after an import, copy, regional setting change, calculation setting change, or formula edit. It is strongest when you can paste the exact formula and say whether Excel is showing text, a stale value, an error, or a wrong answer.',
    notWhen: 'Do not use it as a full workbook audit or proof that every formula in a file is safe. Start with one failing formula, check the visible symptom, and test the suggested fix on a known row before replacing a report column.',
    example: {
      setup: 'A SUMIFS formula can look correct but fail when dates are imported as text or when the workbook uses a different list separator.',
      formula: '=SUMIFS(C2:C500,B2:B500,"Paid",A2:A500,">="&DATE(2026,5,1),A2:A500,"<"&DATE(2026,6,1))',
      read: 'The formula totals paid rows in May 2026 using date boundaries built with DATE. The checks tell you to confirm real date values, matching range sizes, and the separator your Excel locale expects.'
    }
  },
  'excel-formula-not-calculating': {
    gives: [
      'A focused fix pass for one Excel formula that is stuck, stale, or showing as text.',
      'Checks for manual calculation mode, Show Formulas, text-formatted cells, source references, and formula syntax.',
      'A repaired formula path you can test on one known row before changing a report column.'
    ],
    useWhen: 'Use this page when an Excel formula does not calculate automatically, returns an old value after source cells change, only updates after a manual recalculation, or displays the formula text instead of the result. It is strongest when you can paste the formula and name one expected result.',
    notWhen: 'Do not assume the formula itself is wrong before checking workbook calculation mode, Show Formulas, and cell formatting. Those settings can make a correct formula look broken, and changing the formula first can hide the real cause.',
    example: {
      setup: 'A review flag can look stuck when Excel is in manual calculation mode or when the referenced revenue cell was imported as text.',
      formula: '=IF(VALUE(B2)>1000,"Review","OK")',
      read: 'The formula converts B2 to a number before testing the threshold. Use it only after checking that B2 should contain a numeric value and that workbook calculation settings are not the actual blocker.'
    }
  },
  'excel-showing-formula-instead-of-result': {
    gives: [
      'A focused repair pass for an Excel cell that displays formula text instead of a calculated value.',
      'Checks for Show Formulas mode, text-formatted cells, linked text-formatted cells, leading apostrophes, leading spaces, and re-entry steps.',
      'A cleaner formula path you can re-enter and test on one known row before changing more cells.'
    ],
    useWhen: 'Use this page when Excel shows the formula itself in the worksheet cell instead of the calculated result. It is strongest when you can say whether the whole sheet is showing formulas or only one pasted/imported formula cell is affected.',
    notWhen: 'Do not rewrite a valid formula before checking display mode and cell format. Show Formulas mode and Text number format can make a good formula look broken, and the fix may be to change the setting or re-enter the cell rather than change the function.',
    example: {
      setup: 'A total cell shows =SUM(B2:B20) in the grid instead of the total after the cell was formatted as Text.',
      formula: '=SUM(B2:B20)',
      read: 'Change the cell format to General, edit the formula, and press Enter so Excel treats it as a formula again. If every formula on the sheet is visible, turn off Show Formulas before changing the formula text.'
    }
  },
  'excel-formula-wrong-result': {
    gives: [
      'A focused fix pass for one Excel formula that calculates but returns the wrong answer.',
      'Checks for operator precedence, parentheses, copied references, stored value types, and lookup match settings.',
      'A revised formula path you can compare against one expected result before changing a report column.'
    ],
    useWhen: 'Use this page when Excel is not showing an error, but the result is clearly wrong for at least one row. It is strongest when you can paste the exact formula, the result Excel returns, and the result you expected.',
    notWhen: 'Do not use it as proof that an entire workbook is correct. A wrong result can come from source data, references, or formula logic, so test the repaired formula on a known row before filling it through a live report.',
    example: {
      setup: 'A total can look wrong when Excel follows normal operator precedence and multiplies before it adds.',
      formula: '=(A2+B2)*C2',
      read: 'The parentheses force Excel to add A2 and B2 first, then multiply the subtotal by C2. Without the parentheses, Excel evaluates the multiplication first, which can produce a different result while still returning a normal-looking number.'
    }
  },
  'excel-formula-returns-zero-blank': {
    gives: [
      'A focused fix pass for one formula returning 0, blank, or an empty string.',
      'Checks for empty source cells, lookup return ranges, IF/IFERROR branches, hidden zero display, and blank-looking formula outputs.',
      'A revised formula path you can test before filling it through a report column.'
    ],
    useWhen: 'Use this page when Excel returns 0, blank, or an empty-looking result and you expected a visible value. It is strongest when you can paste the formula, the value you expected, and one row or lookup value that produces the problem.',
    notWhen: 'Do not assume 0 and blank mean the same thing. A real zero, a hidden zero, a true blank, and an empty string can behave differently in downstream formulas, so test the fix on known rows before replacing a report column.',
    example: {
      setup: 'A VLOOKUP finds the SKU in the table, but the return cell in the price column is empty, so the formula shows 0 instead of a price.',
      formula: '=IF(VLOOKUP(A2,$D$2:$E$500,2,FALSE)=0,"No price on file",VLOOKUP(A2,$D$2:$E$500,2,FALSE))',
      read: 'The formula checks whether the lookup result is zero before showing a label. Use this only after confirming whether zero is ever a valid price in the return column; otherwise a blank source cell and a real zero will be treated the same.'
    }
  },
  'excel-formula-not-copying-down': {
    gives: [
      'A focused fix pass for one formula that will not copy, fill, or update correctly down a column.',
      'Checks for fill handle visibility, Ctrl+D behavior, automatic calculation, relative references, absolute references, and locked lookup ranges.',
      'A revised formula path you can test on the first filled row and a later row before changing the whole column.'
    ],
    useWhen: 'Use this page when dragging the fill handle, using Fill Down, or pressing Ctrl+D does not produce the row-by-row formula you expected. It is strongest when you can paste the first-row formula, the formula or result after filling, and the ranges that should stay fixed.',
    notWhen: 'Do not assume every copied formula should change the same way. Some references need to move with each row, while lookup tables, criteria ranges, and constants often need dollar signs so they stay anchored.',
    example: {
      setup: 'A product lookup can work in the first row but break after filling down if the lookup table range moves with each copied formula.',
      formula: '=XLOOKUP(A2,Products!$A$2:$A$500,Products!$C$2:$C$500,"Not found")',
      read: 'The lookup value A2 stays relative so it changes to A3, A4, and later rows. The product lookup and return ranges stay locked so the filled formulas keep searching the same table.'
    }
  },
  'excel-sumifs-not-working': {
    gives: [
      'A focused fix pass for one SUMIFS formula returning 0, #VALUE!, or a wrong total.',
      'Checks for SUMIFS argument order, quoted criteria, matching range sizes, text/date storage, and external workbook references.',
      'A revised SUMIFS path you can compare against one known matching row before changing a report.'
    ],
    useWhen: 'Use this page when a SUMIFS formula looks close but returns 0, #VALUE!, or the wrong total. It is strongest when you can paste the formula, the current result, and one row that should match every criterion.',
    notWhen: 'Do not use it as proof that all totals in the workbook are correct. SUMIFS depends on range alignment, criteria syntax, stored value types, and source workbook state, so test the fix against known rows before replacing a live report formula.',
    example: {
      setup: 'A sales total can return 0 when text criteria are not quoted correctly, date criteria are stored as text, or the criteria ranges do not line up with the sales amount range.',
      formula: '=SUMIFS(D2:D500,A2:A500,"South",C2:C500,"Meat",B2:B500,">="&DATE(2026,5,1),B2:B500,"<"&DATE(2026,6,1))',
      read: 'The formula sums sales amounts in D only for South rows, Meat rows, and dates in May 2026. Check that every criteria range has the same row span as D2:D500 and that dates in column B are real Excel dates.'
    }
  },
  'excel-countifs-not-working': {
    gives: [
      'A focused fix pass for one COUNTIFS formula returning 0, #VALUE!, or a wrong count.',
      'Checks for criteria syntax, same-size criteria ranges, date and text storage, blank criteria cells, and closed workbook references.',
      'A revised COUNTIFS path you can test against one matching row and one non-matching row before changing a report.'
    ],
    useWhen: 'Use this page when COUNTIFS returns 0 even though matching rows seem present, returns #VALUE!, or counts the wrong rows after an import, criteria edit, copied range, date filter, or workbook-link change. Paste the formula and include at least one row that should count.',
    notWhen: 'Do not hide a COUNTIFS problem with IFERROR before checking the criteria ranges and source values. A zero count may be correct, and a #VALUE! may point to a range-shape or closed-workbook issue that should be fixed directly.',
    example: {
      setup: 'A support dashboard should count open South-region tickets created in May 2026, but the formula returns 0 after the criteria were copied from another sheet.',
      formula: '=COUNTIFS(A2:A500,"South",C2:C500,"Open",B2:B500,">="&DATE(2026,5,1),B2:B500,"<"&DATE(2026,6,1))',
      read: 'Each criteria range has the same row span, text criteria are quoted, and date boundaries use DATE so Excel compares real date values instead of pasted text.'
    }
  },
  'excel-value-error': {
    gives: [
      'A focused fix pass for one formula returning #VALUE!.',
      'Checks for text stored in number/date cells, hidden spaces, wrong argument types, subtraction syntax, and function-specific inputs.',
      'A revised formula path you can test before using IFERROR or filling the formula through a report.'
    ],
    useWhen: 'Use this page when Excel returns #VALUE! and the formula looks structurally close but one referenced cell, argument, date, text value, or operator is stopping the calculation. It is strongest when you can paste the formula and one row of source values.',
    notWhen: 'Do not use IFERROR as the first fix if the underlying value problem matters. Hiding #VALUE! can make a report look clean while the formula is still reading the wrong type of input.',
    example: {
      setup: 'A subtraction formula can return #VALUE! when imported cells contain numbers stored as text or hidden spaces.',
      formula: '=VALUE(TRIM(A2))-VALUE(TRIM(B2))',
      read: 'The formula trims each referenced cell, converts the cleaned text to numbers, then subtracts them. Use it only after confirming those cells should contain numeric values.'
    }
  },
  'excel-name-error': {
    gives: [
      'A focused fix pass for one formula returning #NAME?.',
      'Checks for misspelled functions, undefined names, unquoted text, malformed ranges, add-ins, and Excel version support.',
      'A revised formula path you can test before masking the syntax problem with an error fallback.'
    ],
    useWhen: 'Use this page when Excel returns #NAME? because it cannot recognize a function name, workbook name, named range, text value, range reference, add-in function, macro, or newer Excel function. It is strongest when you can paste the exact formula and name the expected result.',
    notWhen: 'Do not hide #NAME? with IFERROR before fixing the syntax. Excel is telling you it cannot understand part of the formula, and a fallback can conceal a misspelled function, missing range colon, undefined name, or unsupported function.',
    example: {
      setup: 'A SUMIF formula can return #NAME? when the text criterion is not wrapped in quotes, because Excel reads Open as a workbook name instead of text.',
      formula: '=SUMIF(Status,"Open",Amount)',
      read: 'The formula treats Open as text criteria, then totals the Amount range for rows where Status equals Open. The checks tell you to confirm Status and Amount are defined names or replace them with real cell ranges.'
    }
  },
  'excel-div0-error': {
    gives: [
      'A focused fix pass for one formula returning #DIV/0!.',
      'Checks for zero or blank denominators, hidden text values, derived divisor cells, and ratio formulas waiting for input.',
      'A safer formula path that explains whether IF, IFERROR, blank output, zero output, or #N/A is the right fallback.'
    ],
    useWhen: 'Use this page when Excel returns #DIV/0! because a formula divides by zero, a blank cell, or a denominator that is produced by another formula. It is strongest when you can paste the formula and say what should appear when the divisor is not available yet.',
    notWhen: 'Do not wrap the formula in IFERROR as the first move if other errors would matter. IFERROR can clean up a report, but it also hides non-division problems that may need a different fix.',
    example: {
      setup: 'A margin formula can return #DIV/0! when revenue is blank or zero while a row is still being filled in.',
      formula: '=IF(C2=0,"",(B2-C2)/C2)',
      read: 'The formula checks the denominator before dividing. If C2 is zero, it returns blank; otherwise it calculates the margin. Choose blank, 0, #N/A, or a message based on how the report should treat missing input.'
    }
  },
  'excel-spill-error': {
    gives: [
      'A focused fix pass for one formula returning #SPILL!.',
      'Checks for blocked spill ranges, merged cells, Excel tables, oversized references, worksheet-edge problems, and volatile array sizes.',
      'A revised formula direction you can test after clearing the cells or layout issue that blocked the spill.'
    ],
    useWhen: 'Use this page when Excel returns #SPILL! because a dynamic array formula wants to return multiple cells but cannot place them in the grid. It is strongest when you can paste the formula, name the formula cell, and describe the intended spill range.',
    notWhen: 'Do not treat #SPILL! as only a syntax error. The formula may be valid, but the surrounding cells, table layout, merged cells, or reference size may prevent Excel from placing the result.',
    example: {
      setup: 'A FILTER formula can return #SPILL! when it should return open rows, but another value is already sitting where the filtered results need to appear.',
      formula: '=FILTER(A2:C500,B2:B500="Open","No open rows")',
      read: 'The formula filters rows where Status equals Open and includes a no-match fallback. Before replacing the formula, clear the intended spill range and confirm the result starts outside an Excel table.'
    }
  },
  'excel-calc-error': {
    gives: [
      'A focused fix pass for one formula returning #CALC!.',
      'Checks for empty FILTER results, nested arrays, array constants with ranges, custom-function range size, and unsupported array calculation cases.',
      'A revised formula direction you can test on a no-match row and a known-match row before replacing a report formula.'
    ],
    useWhen: 'Use this page when Excel returns #CALC! from a dynamic array, FILTER, LAMBDA-style helper, or custom function. It is strongest when you can paste the exact formula and explain what should appear when the filter or array has no result.',
    notWhen: 'Do not hide #CALC! with a broad IFERROR before checking the array shape. The error often points to a missing no-results fallback, a nested-array pattern Excel cannot evaluate, or an environment limit that should be handled directly.',
    example: {
      setup: 'A FILTER formula can return #CALC! when no rows match the criteria and the formula does not say what to return for an empty result.',
      formula: '=FILTER(A2:C500,B2:B500="West","No matching rows")',
      read: 'The formula filters rows where column B equals West and returns a readable fallback when no rows match. Test both a matching case and a no-match case before using it in a report.'
    }
  },
  'excel-filter-function-not-working': {
    gives: [
      'A focused repair pass for one FILTER formula that returns an error, blank output, all rows, no rows, or the wrong rows.',
      'Checks for if_empty fallback behavior, include-array dimensions, AND/OR criteria logic, spill blockers, version support, and external workbook references.',
      'A revised FILTER direction you can test on one matching row and one no-match case before using it in a report.'
    ],
    useWhen: 'Use this page when an Excel FILTER formula does not return the expected rows, returns #CALC!, #SPILL!, #REF!, #NAME?, or shows _xlfn after the file is opened somewhere else. It is strongest when you can paste the exact formula and one row that should match.',
    notWhen: 'Do not treat every FILTER problem as a syntax problem. The formula may be valid while the output range is blocked, the no-match case is undefined, the include array is the wrong shape, or the Excel version cannot run dynamic array functions.',
    example: {
      setup: 'A FILTER formula can return #CALC! when no rows match unless the optional fallback tells Excel what to return.',
      formula: '=FILTER(A2:D500,(B2:B500="West")*(C2:C500="Open"),"No matching rows")',
      read: 'The formula filters rows where Region is West and Status is Open, using multiplication for AND logic. The final argument returns a message when no rows match instead of leaving Excel with an empty array.'
    }
  },
  'excel-num-error': {
    gives: [
      'A focused fix pass for one formula returning #NUM!.',
      'Checks for formatted constants, invalid numeric arguments, iterative-function convergence, impossible math inputs, and results outside Excel limits.',
      'A revised formula direction you can test before hiding the numeric problem with a broad error fallback.'
    ],
    useWhen: 'Use this page when Excel returns #NUM! because the formula contains a number Excel cannot use, an iterative function such as IRR or RATE cannot find a result, or the calculation produces a value outside Excel limits. It is strongest when you can paste the formula and include the input values that drive the numeric result.',
    notWhen: 'Do not use IFERROR as the first fix if the numeric problem affects the meaning of the result. A clean-looking fallback can hide a failed financial calculation, invalid input, or result-size problem that should be checked directly.',
    example: {
      setup: 'An IRR formula can return #NUM! when the cash-flow pattern does not let Excel settle on a result within its iteration settings.',
      formula: '=IRR(B2:B12,0.1)',
      read: 'The formula supplies a starting guess for IRR, but the checks still tell you to confirm the cash flows contain the sign pattern needed for a meaningful rate before using the result.'
    }
  },
  'excel-circular-reference': {
    gives: [
      'A focused repair path for formulas that trigger Excel circular-reference warnings.',
      'Checks for self-including ranges, indirect dependency loops, helper-cell options, and intentional iteration.',
      'A revised formula direction you can test before changing workbook calculation settings.'
    ],
    useWhen: 'Use this page when Excel says a formula refers to its own cell directly or indirectly, or when a copied formula starts warning about circular references. It is strongest when you can paste the formula, name the cell it lives in, and describe the result you intended.',
    notWhen: 'Do not turn on iterative calculation just to silence a warning. Iteration can be valid for deliberate circular models, but an accidental circular reference should usually be rewritten, moved, or split into helper cells first.',
    example: {
      setup: 'A total formula in D10 can become circular if it sums D2:D10, because the formula cell is inside the range it is totaling.',
      formula: '=SUM(D2:D9)',
      read: 'The revised formula totals the rows above D10 without including the result cell itself. If the range should grow, use a table total row or a range that stops before the formula cell.'
    }
  },
  'excel-ref-error': {
    gives: [
      'A focused fix pass for one formula returning #REF!.',
      'Checks for deleted rows or columns, moved cells, shifted copy/fill references, lookup ranges, and external workbook references.',
      'A rebuilt reference path you can test before filling the repaired formula through a report.'
    ],
    useWhen: 'Use this page when Excel returns #REF! because a formula points to a cell, row, column, sheet, lookup argument, or workbook link that is no longer valid. It is strongest when you can paste the broken formula and describe the edit that happened before the error appeared.',
    notWhen: 'Do not hide #REF! with IFERROR before replacing the missing reference. The error usually means Excel has lost part of the formula path, so the first job is to identify the intended current cell or range.',
    example: {
      setup: 'A total formula can return #REF! after a referenced column is deleted and Excel replaces that missing cell reference with the error token.',
      formula: '=SUM(B2:D2)',
      read: 'The repaired formula should point at the current cells that belong in the total. After replacing the missing reference, lock or check the range if the formula will be copied across other rows.'
    }
  },
  'excel-data-validation-formula': {
    gives: [
      'A custom validation formula for the entry rule you describe.',
      'A plain-English read of why the formula returns TRUE for accepted entries.',
      'Checks for first-cell references, fixed ranges, blanks, duplicate handling, and valid/invalid test entries.'
    ],
    useWhen: 'Use this page when Excel Data Validation is set to Allow: Custom and you need a formula for allowed entries, such as a required ID prefix, unique values, valid email-style text, a date window, or a required field. It is strongest when you know the first cell in the range where the rule will be applied.',
    notWhen: 'Do not use a validation formula as a whole-workbook audit. Data validation helps block future entries; it does not prove every existing row is clean, and users can still paste or import data in ways that need a separate review.',
    example: {
      setup: 'For customer IDs in A2:A500, a validation rule can require the ID- prefix and reject duplicates in the applied range.',
      formula: '=AND(LEFT(A2,3)="ID-",COUNTIF($A$2:$A$500,A2)=1)',
      read: 'The formula returns TRUE only when A2 starts with ID- and the same value appears once in the validation range. A2 stays relative so Excel can evaluate each row, while the COUNTIF range stays fixed.'
    }
  },
  'excel-data-validation-formula-not-working': {
    gives: [
      'A focused repair pass for one Excel Data Validation custom formula.',
      'Checks for TRUE/FALSE output, first-cell references, fixed ranges, blank handling, named ranges, and copied-rule behavior.',
      'A revised validation formula path you can test with one allowed entry and one rejected entry before applying it broadly.'
    ],
    useWhen: 'Use this page when an Excel Data Validation formula accepts entries it should block, rejects entries it should allow, throws a source or name error, or behaves differently in the validation dialog than it does in a normal cell. It is strongest when you can paste the formula, the applied range, and one pass/fail example.',
    notWhen: 'Do not use data validation as proof that all existing workbook rows are clean. Validation is mainly an entry rule; changed references, pasted values, imports, and existing cells may need a separate check.',
    example: {
      setup: 'A customer ID rule is applied to A2:A500. Each ID should start with ID- and appear only once in that applied range.',
      formula: '=AND(LEFT(A2,3)="ID-",COUNTIF($A$2:$A$500,A2)=1)',
      read: 'The formula returns TRUE only when the current entry starts with ID- and appears once in the fixed validation range. A2 stays relative so the rule can evaluate each row; the COUNTIF range stays locked.'
    }
  },
  'google-sheets-formula-parse-error': {
    gives: [
      'A focused fix pass for Google Sheets formulas that fail at the parsing stage.',
      'Checks for missing quotes, mismatched parentheses, wrong separators, malformed QUERY text, and range shape problems.',
      'A revised formula path you can test on one row or copied sheet before changing a shared report.'
    ],
    useWhen: 'Use this page when Google Sheets shows a formula parse error, #ERROR!, or a syntax-style failure before the formula can return a real result. It is strongest when you can paste the exact formula and name whether the issue appeared after copying from Excel, changing locale separators, editing a QUERY string, or adding nested functions.',
    notWhen: 'Do not treat a parse-error fix as proof that the formula returns the right business result. A syntactically valid formula can still point at the wrong range, filter the wrong column, or hide a real missing match.',
    example: {
      setup: 'A QUERY formula can parse incorrectly when text criteria inside the query string are not quoted.',
      formula: '=QUERY(A1:D500,"select A, B where C = \'Open\'",1)',
      read: 'The formula keeps the query text inside double quotes, then wraps the Open criterion in single quotes so Google Sheets can parse the condition as text.'
    }
  },
  'google-sheets-formulas-not-working': {
    gives: [
      'A focused repair pass for one Google Sheets formula that is failing or returning the wrong result.',
      'Checks for parse errors, invalid references, text-formatted values, locale separators, stale outputs, and missing matches.',
      'A revised formula direction you can test on one known row before changing a shared sheet.'
    ],
    useWhen: 'Use this page when a Google Sheets formula shows #ERROR!, #REF!, #VALUE!, #N/A, stays as text, stops updating, returns blank, or calculates a wrong value and you have not narrowed the problem to one function yet. It is strongest when you can paste the exact formula plus one expected result.',
    notWhen: 'Do not use it as a full sheet cleanup or file-inspection workflow. The repair starts with one formula and the surrounding context you type into the form; permissions, protected ranges, imports, and larger data-model issues may still need separate checks.',
    example: {
      setup: 'A SUMIF formula should total West-region amounts, but column D came from a CSV import and the amounts are stored as text.',
      formula: '=SUMPRODUCT((B:B="West")*IFERROR(VALUE(D:D),0))',
      read: 'The formula checks the same West criterion while coercing imported text amounts into numbers. IFERROR is limited to the conversion step so non-numeric imported cells do not break the sum.'
    }
  },
  'google-sheets-filter-not-working': {
    gives: [
      'A focused repair pass for one Google Sheets FILTER formula.',
      'Checks for same-length condition ranges, no-match #N/A results, offset criteria, row-versus-column condition shape, and Boolean condition logic.',
      'A revised FILTER path you can test against one row that should match and one case where nothing should match.'
    ],
    useWhen: 'Use this page when FILTER returns #N/A, says FILTER has mismatched range sizes, returns no rows, returns the wrong rows, or breaks after you add another condition. It is strongest when you can paste the formula, the source headers, and one row that should appear in the result.',
    notWhen: 'Do not use it as a full spreadsheet cleanup or data-model rebuild. FILTER repair starts with one formula; protected ranges, imported data, merged cells, and multi-step reports may still need separate review.',
    example: {
      setup: 'A source table in A2:D should return paid West orders. The original formula mixed an open-ended data range with a capped condition range.',
      formula: '=FILTER(A2:D,B2:B="Paid",C2:C="West")',
      read: 'The formula keeps each condition range aligned with the filtered range. If no row is both Paid and West, Sheets can still return #N/A because no values satisfy the conditions.'
    }
  },
  'google-sheets-query-not-working': {
    gives: [
      'A focused repair pass for one Google Sheets QUERY formula.',
      'Checks for query-string syntax, quoted text criteria, selected columns, header rows, Col notation, and mixed data types.',
      'A revised QUERY path you can test against one row that should appear in the output.'
    ],
    useWhen: 'Use this page when Google Sheets QUERY returns "Unable to parse query string for Function QUERY parameter 2", PARSE_ERROR, a NO_COLUMN message, blank output, wrong rows, wrong columns, or a query that worked before but broke after the source range changed. It is strongest when you can paste the formula, the source headers, and one expected matching row.',
    notWhen: 'Do not use a repaired QUERY as proof that a whole report is correct. A syntactically valid query can still filter the wrong rows, guess headers incorrectly, or ignore values from mixed-type columns.',
    example: {
      setup: 'A source table in A1:D500 has headers Deal, Status, Region, and Value. The report should return open West deals over 5000.',
      formula: '=QUERY(A1:D500,"select A, D where B = \'Open\' and C = \'West\' and D > 5000",1)',
      read: 'The formula keeps the query string quoted, wraps text criteria in single quotes, uses source-range column letters, and sets one header row so the report filters the intended rows.'
    }
  },
  'google-sheets-arrayformula-not-working': {
    gives: [
      'A focused repair pass for one Google Sheets ARRAYFORMULA.',
      'Checks for blocked spill cells, open-ended range shapes, blank-row handling, and functions that are not row-aware inside an array formula.',
      'A revised formula path you can test in one output column before replacing a shared sheet formula.'
    ],
    useWhen: 'Use this page when ARRAYFORMULA returns #REF!, says the array result was not expanded, only fills one row, repeats one value down a column, or keeps producing output for blank rows. It is strongest when you can paste the exact formula, the cell where it sits, and the output range it should fill.',
    notWhen: 'Do not use it as a full sheet cleanup or permission audit. ARRAYFORMULA repair starts with one formula and one output area; protected ranges, hidden helper columns, and imported data flows may still need separate review.',
    example: {
      setup: 'Column A has order IDs, B has quantity, and C has unit price. D2 should fill totals for each row but stay blank when the source row is blank.',
      formula: '=ARRAYFORMULA(IF(A2:A="","",B2:B*C2:C))',
      read: 'The formula evaluates rows 2 and below as ranges, leaves blank source rows blank, and lets the result spill down column D as long as the output cells are clear.'
    }
  },
  'google-sheets-importrange-not-working': {
    gives: [
      'A focused repair pass for one Google Sheets IMPORTRANGE formula.',
      'Checks for source URL syntax, quoted range strings, Allow access status, source permissions, import size, refresh behavior, and volatile source formulas.',
      'A revised import path you can test with a smaller source range before rebuilding a shared report.'
    ],
    useWhen: 'Use this page when IMPORTRANGE returns #REF!, asks you to connect sheets, says you do not have source access, returns Result too large, refreshes slowly, or fails after the source tab or source formula changed. It is strongest when you can paste the exact formula, the source tab/range, and the visible error text.',
    notWhen: 'Do not use it as a permission audit or full data-pipeline review. Write My Formula can help repair the formula shape and range strategy, but Google account access, source ownership, share limits, and source-file availability still have to be verified in Google Sheets.',
    example: {
      setup: 'A destination sheet needs only open orders from columns A through E of a source spreadsheet. The original formula imported every column first, then filtered later.',
      formula: '=QUERY(IMPORTRANGE("https://docs.google.com/spreadsheets/d/source-id/edit","Orders!A:E"),"select Col1, Col3, Col5 where Col4 = \'Open\'",1)',
      read: 'The formula narrows the import to the needed columns, then runs QUERY against the imported array with Col-style references. Permission still has to be granted once from the destination sheet before the formula can return data.'
    }
  },
  'google-sheets-vlookup-not-working': {
    gives: [
      'A focused repair pass for one Google Sheets VLOOKUP formula.',
      'Checks for exact-match mode, sorted approximate-match ranges, first-column lookup behavior, return-column indexes, and stored text-number mismatches.',
      'A revised VLOOKUP path you can test against one known matching row and one missing-match case.'
    ],
    useWhen: 'Use this page when Google Sheets VLOOKUP returns #N/A, says it did not find a value, returns a wrong row, returns the wrong column, or starts failing after the formula is copied. It is strongest when you can paste the formula, the lookup table headers, and one value that should match.',
    notWhen: 'Do not hide a lookup problem with IFERROR before checking the range, match mode, and stored value types. A #N/A result may be a real missing match, while an omitted fourth argument can make VLOOKUP use approximate matching when you expected exact match.',
    example: {
      setup: 'A product table in A2:D500 has SKU in the first column and status in the fourth column. The formula should return the status for the SKU in E2.',
      formula: '=IFNA(VLOOKUP(E2,$A$2:$D$500,4,FALSE),"Not found")',
      read: 'The formula searches for E2 in the first column of A2:D500, returns the fourth column from the same row, and uses exact match. The fallback appears only after the lookup range, return index, and source values have been checked.'
    }
  },
  'google-sheets-xlookup-not-working': {
    gives: [
      'A focused repair pass for one Google Sheets XLOOKUP formula.',
      'Checks for lookup_range and result_range alignment, missing_value fallbacks, match_mode, search_mode, duplicates, and stored text-number mismatches.',
      'A revised XLOOKUP path you can test against one known matching row and one missing-match case.'
    ],
    useWhen: 'Use this page when Google Sheets XLOOKUP returns #N/A, returns the wrong duplicate match, shows a blank or misleading fallback, breaks after a range edit, or depends on match_mode and search_mode choices you are not sure about. It is strongest when you can paste the formula, the lookup table headers, and one value that should match.',
    notWhen: 'Do not hide a lookup problem with missing_value or IFERROR before checking the lookup range, result range, match mode, search mode, and stored value types. A #N/A result may be a real missing match, and a wrong duplicate result may mean the search direction needs to be deliberate.',
    example: {
      setup: 'A product table has SKU in A2:A500 and status in D2:D500. The formula should return the status for the SKU in E2, using exact match and a readable fallback only when the SKU is not found.',
      formula: '=XLOOKUP(E2,$A$2:$A$500,$D$2:$D$500,"Not found",0,1)',
      read: 'The formula searches for E2 in the SKU column, returns status from the same row in D, uses exact match, and searches from first entry to last. The fallback appears only after the lookup and result ranges have been checked.'
    }
  },
  'conditional-formatting-formula-not-working': {
    gives: [
      'A corrected conditional-formatting formula for the rule you are trying to apply.',
      'A plain-English read of the TRUE/FALSE logic, first-row reference, and locked columns or rows.',
      'Checks for apply-to range, formula errors, cross-sheet references, and rule precedence.'
    ],
    useWhen: 'Use this page when a custom conditional formatting formula highlights the wrong cells, does not fire, applies to every row, shifts references incorrectly, or behaves differently in the rule dialog than it does in a normal worksheet cell.',
    notWhen: 'Do not use it as a full-file review or as proof that every formatting rule is correct. Start with one rule, verify the apply-to range, and test the corrected formula on a small section before applying it broadly.',
    example: {
      setup: 'The apply-to range is A2:C100. Due dates are in column B and status is in column C. Highlight each row when the due date is before today and the status is not Done.',
      formula: '=AND($B2<TODAY(),$C2<>"Done")',
      read: 'The formula returns TRUE only when both checks pass. Columns B and C stay locked while the row number moves from row 2 downward, so each row checks its own due date and status.'
    }
  },
  'excel-vlookup-not-working': {
    gives: [
      'A focused repair pass for one VLOOKUP formula returning #N/A, #VALUE!, a wrong value, or a blank-looking result.',
      'Checks for exact-match mode, first-column lookup behavior, return-column numbers, text-number mismatches, and locked table ranges.',
      'A revised VLOOKUP path you can test on one known matching row and one missing-match row before changing a report.'
    ],
    useWhen: 'Use this page when VLOOKUP is close but not trustworthy: it returns #N/A, chooses the wrong match, returns the wrong column, fails after columns move, or breaks after imported IDs are stored as text. Paste the formula and one row that should match.',
    notWhen: 'Do not hide a VLOOKUP problem with IFERROR before checking the lookup range and match mode. A missing result may be real, and an omitted fourth argument can make VLOOKUP use approximate matching when you expected an exact match.',
    example: {
      setup: 'A product table has SKUs in A, category in B, and price in C. A VLOOKUP can return the category for the SKU in E2 when the lookup range starts with the SKU column and exact match is explicit.',
      formula: '=IFERROR(VLOOKUP(E2,$A$2:$C$500,2,FALSE),"Not found")',
      read: 'The formula searches for E2 in the first column of A2:C500, returns the second column from the same row, and uses exact match. The fallback appears only after the range, column number, and source values have been checked.'
    }
  },
  'vlookup-na-error': {
    gives: [
      'A focused fix pass for VLOOKUP formulas returning #N/A or incorrect matches.',
      'Checks for exact-match mode, text-number mismatches, lookup column position, and range shape.',
      'A safer formula path you can test on one known matching row and one missing-match row.'
    ],
    useWhen: 'Use this page when VLOOKUP returns #N/A even though the value appears to exist, or when a lookup works on some rows but fails after an import, copy, or range change. Paste the formula and describe what should match.',
    notWhen: 'Do not hide every #N/A with IFERROR before checking the source data. A missing match may be real, and VLOOKUP can also fail when the lookup column is not the first column in the selected table range.',
    example: {
      setup: 'For a SKU in E2 and a product table in A2:C500, a VLOOKUP should usually use exact match and a clear not-found fallback.',
      formula: '=IFERROR(VLOOKUP(E2,$A$2:$C$500,2,FALSE),"Not found")',
      read: 'The formula searches for E2 in the first column of the table range, returns the second column, and uses exact match. The fallback hides the raw #N/A only after the range and source values have been checked.'
    }
  },
  'xlookup-na-error': {
    gives: [
      'A focused fix pass for one XLOOKUP formula returning #N/A.',
      'Checks for missing matches, text-number mismatches, lookup-array shape, match mode, and fallback wording.',
      'A revised formula path you can test on one known matching row and one intentionally missing row.'
    ],
    useWhen: 'Use this page when XLOOKUP returns #N/A even though the value appears to exist, or when a lookup formula started failing after imported data, changed ranges, or copied formulas. It is strongest when you can paste the formula and one lookup value that should match.',
    notWhen: 'Do not use a fallback argument just to make the error disappear. #N/A may be the correct signal for a missing record, a mismatched stored type, or a lookup array pointed at the wrong rows.',
    example: {
      setup: 'For a SKU in E2 and product SKUs in A2:A500, XLOOKUP can return a category from B2:B500 while showing a readable message only when the SKU is not found.',
      formula: '=XLOOKUP(E2,$A$2:$A$500,$B$2:$B$500,"Not found",0)',
      read: 'The formula searches for E2 in the SKU column, returns the category from the same row, and uses exact match. The fallback is added after checking that a missing SKU should display Not found.'
    }
  },
  'excel-xlookup-not-working': {
    gives: [
      'A focused repair pass for one XLOOKUP formula returning #N/A, a blank fallback, a wrong row, or an unreliable result.',
      'Checks for lookup-array and return-array alignment, stored value types, duplicate/search behavior, match mode, and version support.',
      'A revised XLOOKUP path you can test on one known matching row and one missing-match row before changing the workbook.'
    ],
    useWhen: 'Use this page when XLOOKUP is close but not trustworthy: it returns #N/A, returns the wrong row, hides the issue with a blank fallback, changes behavior after copying, or depends on match/search mode choices you are not sure about. Paste the formula and one row that should match.',
    notWhen: 'Do not make the error disappear with a blank if_not_found value before checking the lookup array, return array, match mode, and source values. A missing or wrong result may be the correct signal that the data or range changed.',
    example: {
      setup: 'A product table has SKUs in A and prices in C. XLOOKUP can return the price for the SKU in E2 when the lookup and return arrays cover the same rows and exact match is explicit.',
      formula: '=XLOOKUP(E2,$A$2:$A$500,$C$2:$C$500,"Not found",0)',
      read: 'The formula searches for E2 in the SKU column, returns the price from the same row, uses exact match, and shows Not found only after the ranges and source values have been checked.'
    }
  },
  'excel-index-match-not-working': {
    gives: [
      'A focused repair pass for one INDEX MATCH formula returning #N/A, #REF!, a wrong row, or an unreliable value.',
      'Checks for MATCH exact-match mode, lookup-array and return-array alignment, row and column offsets, stored value types, and fallback wording.',
      'A revised INDEX MATCH path you can test on one known matching row and one missing-match row before changing the workbook.'
    ],
    useWhen: 'Use this page when INDEX MATCH is close but not trustworthy: it returns #N/A, returns the wrong row or column, breaks after columns move, fails in a two-way lookup, or depends on match_type choices you are not sure about. Paste the formula and one row that should match.',
    notWhen: 'Do not make the error disappear with IFERROR before checking the MATCH result and INDEX range. A missing or wrong result may be the correct signal that the lookup value, range shape, row offset, column offset, or stored data type changed.',
    example: {
      setup: 'A product table has SKUs in A and prices in C. INDEX MATCH can return the price for the SKU in E2 when MATCH uses exact match and the return range covers the same rows as the lookup range.',
      formula: '=IFNA(INDEX($C$2:$C$500,MATCH(E2,$A$2:$A$500,0)),"Not found")',
      read: 'MATCH searches for E2 in the SKU column and returns the row position. INDEX returns the price from the same relative row in C2:C500. The fallback appears only after the ranges, exact-match mode, and source values have been checked.'
    }
  },
  'vlookup-formula-generator': {
    gives: [
      'A draft VLOOKUP with lookup value, table array, return column, and exact match filled in.',
      'A note on why the lookup column must be first in the selected table.',
      'A quick read on when XLOOKUP may be the better choice.'
    ],
    useWhen: 'Use this page when you need a legacy-compatible lookup and the value you are searching for is in the first column of the table range.',
    notWhen: 'Do not use VLOOKUP when the return column may move often or the lookup column is not first. In those cases, XLOOKUP is usually easier to maintain.',
    example: {
      setup: 'For a SKU in E2 and a table from A2:C500, VLOOKUP can return the category from the second column.',
      formula: '=VLOOKUP(E2,$A$2:$C$500,2,FALSE)',
      read: 'The formula searches for E2 in the first column of the table range and returns the value from the second column using exact match.'
    }
  },
  'xlookup-formula-generator': {
    gives: [
      'A draft XLOOKUP with separate lookup and return ranges.',
      'A readable fallback for missing matches.',
      'Checks that the lookup range and return range line up.'
    ],
    useWhen: 'Use this page when the workbook supports XLOOKUP and you want a lookup that is easier to read than VLOOKUP, especially when returning values from either side of the key.',
    notWhen: 'Do not choose XLOOKUP for workbooks that must open cleanly in older Excel versions. Use VLOOKUP or INDEX/MATCH when compatibility is the main constraint.',
    example: {
      setup: 'For a customer ID in E2, XLOOKUP can search IDs in column A and return emails from column C.',
      formula: '=XLOOKUP(E2,$A$2:$A$500,$C$2:$C$500,"Not found")',
      read: 'The formula searches the ID list, returns the matching email, and uses Not found instead of a raw lookup error.'
    }
  },
  'index-match-formula-generator': {
    gives: [
      'A draft INDEX MATCH formula using the lookup and return ranges you provide.',
      'A plain-English read of how MATCH finds the row or column and INDEX returns the value.',
      'Checks for exact-match mode, left-lookup structure, two-way lookup structure, and locked references.'
    ],
    useWhen: 'Use this page when a workbook needs a lookup that is more flexible than VLOOKUP, especially left lookups, two-way lookups, or files that need to stay compatible with Excel versions that do not support XLOOKUP.',
    notWhen: 'Do not use INDEX MATCH only because it sounds advanced. If the team already has modern Excel and a simple one-way lookup, XLOOKUP may be easier for others to read and maintain.',
    example: {
      setup: 'For SKUs in C2:C500 and categories in A2:A500, INDEX MATCH can return a category even though the return column is to the left of the lookup column.',
      formula: '=INDEX($A$2:$A$500,MATCH(F2,$C$2:$C$500,0))',
      read: 'MATCH finds the row position of the SKU in F2 inside the SKU range, and INDEX returns the value from the category range at that same position.'
    }
  },
  'if-formula-generator': {
    gives: [
      'A draft IF formula for the rule and output labels you provide.',
      'A breakdown of true, false, and blank-cell branches.',
      'Checks for boundary values and nested-logic readability.'
    ],
    useWhen: 'Use this page for status labels, thresholds, and simple branching rules where the formula should return one text value or another.',
    notWhen: 'Do not force a long decision tree into deeply nested IF statements if the rule has many branches. IFS, SWITCH, or a lookup table may be easier to audit.',
    example: {
      setup: 'For customer names in A and revenue in B, an IF formula can flag high-revenue rows while handling blanks.',
      formula: '=IF(A2="","Missing",IF(B2>1000,"Review","OK"))',
      read: 'The formula returns Missing for blank customer names, Review for revenue above 1000, and OK for the remaining rows.'
    }
  },
  'excel-if-formula-multiple-conditions': {
    gives: [
      'A draft Excel IF formula using nested IF, IFS, AND, OR, or NOT when those functions fit the rule.',
      'A plain-English read of which condition is tested first and what each branch returns.',
      'Checks for blanks, thresholds, mixed AND/OR logic, and rows where more than one condition could be true.'
    ],
    useWhen: 'Use this page when a spreadsheet rule has more than one condition, such as reviewing high-value invoices that are late or from new customers, or approving only rows that meet every required field. It works best when you can provide the relevant columns and at least one row for each expected result.',
    notWhen: 'Do not keep adding nested IF branches if the rule is really a lookup table, scoring table, or long ordered list. In those cases, IFS, SWITCH, XLOOKUP, or a helper table can be easier to maintain.',
    example: {
      setup: 'For invoice rows with amount in B, payment status in C, and customer type in D, flag a row as Review when the amount is over 5000 and either the invoice is past due or the customer is new.',
      formula: '=IF(AND(B2>5000,OR(C2="Past Due",D2="New")),"Review","OK")',
      read: 'The formula first checks whether the amount is above 5000, then requires either Past Due status or New customer type. Only rows that pass both parts return Review.'
    }
  },
  'excel-if-formula-not-working': {
    gives: [
      'A corrected IF-style formula matched to the exact condition, labels, and sample row you provide.',
      'A plain-English read of which test runs first and why Excel is returning the wrong branch.',
      'Checks for missing quotes, extra parentheses, separator mismatches, blank handling, and long nested logic.'
    ],
    useWhen: 'Use this page when an IF, nested IF, IFS, or IF with AND/OR formula is close but not reliable. It is especially useful when the formula returns FALSE, 0, blank, #VALUE!, or a plausible label on the wrong rows.',
    notWhen: 'Do not keep patching nested IF formulas when the rule has many ordered outcomes or a table of thresholds. IFS, SWITCH, XLOOKUP, or a helper table can be easier to review and safer to fill down.',
    example: {
      setup: 'A teacher wants Pass when the score in B2 is at least 60 and attendance in C2 is at least 80%, and Fail otherwise.',
      formula: '=IF(AND(B2>=60,C2>=80%),"Pass","Fail")',
      read: 'The repaired formula keeps the two required conditions inside AND, returns Pass only when both are true, returns Fail otherwise, and removes the extra closing parenthesis that made the original formula invalid.'
    }
  },
  'countifs-formula-generator': {
    gives: [
      'A draft COUNTIFS formula with one criteria range per condition.',
      'A visible read of how text, number, and date criteria are paired.',
      'Checks that all criteria ranges use matching row spans.'
    ],
    useWhen: 'Use this page when you need to count rows matching several conditions, such as status plus revenue threshold or date window plus owner.',
    notWhen: 'Do not use COUNTIFS when you need to return the matching rows themselves. Use FILTER or a pivot table when the row details matter more than the count.',
    example: {
      setup: 'For Status in column B and Revenue in column C, COUNTIFS can count active customers above a threshold.',
      formula: '=COUNTIFS(B2:B500,"Active",C2:C500,">1000")',
      read: 'The formula counts rows where status is Active and revenue is greater than 1000, with each condition tied to its own range.'
    }
  },
  'sumifs-formula-generator': {
    gives: [
      'A draft SUMIFS formula with the sum range and criteria ranges in the right order.',
      'A plain-English read of which rows are included in the total.',
      'Checks for date criteria, amount formatting, and equal-size ranges.'
    ],
    useWhen: 'Use this page when you need a repeatable total for rows that match status, date, category, customer, or region criteria.',
    notWhen: 'Do not use SUMIFS when the amount column contains text-formatted numbers or mixed currencies without cleanup. Fix the source data first, then total it.',
    example: {
      setup: 'For invoice dates in A, status in B, and amounts in C, SUMIFS can total paid invoices in May 2026.',
      formula: '=SUMIFS(C2:C500,B2:B500,"Paid",A2:A500,">=2026-05-01",A2:A500,"<2026-06-01")',
      read: 'The formula sums amounts only when the row is marked Paid and the invoice date falls inside the May date window.'
    }
  },
  'percentage-formula-generator': {
    gives: [
      'A draft percentage formula for the exact calculation you describe.',
      'A plain-English read of the numerator, denominator, rate, or comparison values.',
      'Checks for percent formatting, locked references, blanks, and divide-by-zero cases.'
    ],
    useWhen: 'Use this page when a spreadsheet needs percent of total, percent change, discount, markup, tax, tip, or completion-rate math and you want the references spelled out before filling formulas down.',
    notWhen: 'Do not paste a percentage formula across a live report until you confirm the cell format. Excel and Google Sheets store percentages as decimals, so multiplying by 100 and applying percent format can double-count the conversion.',
    example: {
      setup: 'For revenue in B2 and the total revenue in B5, a percentage-of-total formula can show each category share.',
      formula: '=IFERROR(B2/$B$5,0)',
      read: 'The formula divides the category revenue by the locked total cell and returns 0 instead of an error if the total is blank or zero.'
    }
  },
  'date-formula-generator': {
    gives: [
      'A draft date formula matched to the deadline or date comparison you describe.',
      'A plain-English read of which cells are dates, offsets, holidays, or cutoff values.',
      'Checks for date formatting, text dates, weekends, holidays, and month boundaries.'
    ],
    useWhen: 'Use this page when spreadsheet work depends on dates that should update automatically, such as due dates, billing cycles, workday counts, aging reports, or overdue flags. Tell the tool whether you are in Excel or Google Sheets because date parsing and some function behavior can differ.',
    notWhen: 'Do not paste date formulas broadly until you confirm the source cells are real date values. Excel and Google Sheets can display dates while still storing imported values as text, which changes formula behavior.',
    example: {
      setup: 'For a start date in A2 and a company holiday list in F2:F20, a workday formula can calculate a due date 10 business days later.',
      formula: '=WORKDAY(A2,10,$F$2:$F$20)',
      read: 'The formula starts from A2, moves forward 10 workdays, skips normal weekends, and also skips any holiday dates in the locked holiday range.'
    }
  },
  'filter-formula-generator': {
    gives: [
      'A draft FILTER formula using the source range and condition columns you provide.',
      'A plain-English read of the include logic for one or more criteria.',
      'Checks for spill space, equal-height ranges, and empty-result fallbacks.'
    ],
    useWhen: 'Use this page when you need a live subset of rows from a larger table, such as open deals by region, late tasks by owner, or orders above a threshold. FILTER is a better fit than COUNTIFS or SUMIFS when the matching row details should remain visible.',
    notWhen: 'Do not use FILTER as a drop-in replacement for the spreadsheet filter menu if the result should not spill into nearby cells. The formula returns an array, so blocked output cells can stop it from displaying correctly.',
    example: {
      setup: 'For deals in A2:D500, a FILTER formula can return only West-region deals that are still open and above 5000.',
      formula: '=FILTER(A2:D500,(B2:B500="West")*(C2:C500="Open")*(D2:D500>5000),"No matching rows")',
      read: 'The formula returns matching rows from A through D, keeps only rows where the region, status, and value tests are all true, and shows a fallback when no rows match.'
    }
  },
  'text-formula-generator': {
    gives: [
      'A draft text formula matched to the sample values you paste.',
      'A plain-English read of which delimiter, pattern, or cells the formula uses.',
      'Checks for blanks, missing delimiters, spill behavior, and Excel versus Sheets function support.'
    ],
    useWhen: 'Use this page when imported spreadsheet text needs to be split, cleaned, joined, extracted, or normalized. It is especially useful for email domains, product codes, first and last names, address fragments, labels, and copied CRM exports.',
    notWhen: 'Do not rely on one perfect-looking sample. Text formulas can break when later rows contain missing delimiters, double spaces, punctuation differences, or values that look like numbers but are stored as text.',
    example: {
      setup: 'For email addresses in A2:A500, a Google Sheets formula can extract the domain after the @ symbol.',
      formula: '=REGEXEXTRACT(A2,"@(.+)$")',
      read: 'The formula reads the email address in A2, captures the text after @, and returns the domain so the formula can be filled down.'
    }
  },
  'data-validation-formula-generator': {
    gives: [
      'A draft custom validation formula matched to the entry rule you describe.',
      'A plain-English read of why the rule returns TRUE for accepted values.',
      'Checks for blanks, duplicate handling, pattern tests, and first-cell references.'
    ],
    useWhen: 'Use this page when spreadsheet users should be stopped from entering invalid values, such as duplicate IDs, malformed emails, dates outside a window, or required fields left blank. Include the first cell of the validation range because custom formulas are evaluated relative to that starting cell.',
    notWhen: 'Do not use a validation formula when you only need to highlight existing bad data. Conditional formatting is better for visual review, while data validation is better for blocking future entries.',
    example: {
      setup: 'For customer IDs entered in C2:C500, a data validation rule can require the ID- prefix and a minimum length.',
      formula: '=AND(LEFT(C2,3)="ID-",LEN(C2)>9)',
      read: 'The formula returns TRUE only when the entry in C2 starts with ID- and has more than 9 characters, so the same relative rule can be applied down the validation range.'
    }
  },
  'pivot-table-calculated-field-formula-generator': {
    gives: [
      'A draft calculated-field formula using the field names you provide.',
      'A plain-English read of whether the metric is a difference, ratio, margin, or average.',
      'Checks for field-name references, aggregation limits, and helper-column cases.'
    ],
    useWhen: 'Use this page when the metric should live inside a PivotTable or Google Sheets pivot table as a calculated field, such as profit, gross margin, average order value, or cost variance. Pivot formulas are different from normal worksheet formulas because they usually reference source field names rather than individual cells.',
    notWhen: 'Do not force every row-level rule into a pivot calculated field. If the calculation must happen before the pivot aggregates the data, add a helper column to the source table first and then summarize that field in the pivot.',
    example: {
      setup: 'For a pivot source with Revenue and Cost fields, a calculated field can show gross margin as a percentage.',
      formula: "=('Revenue'-'Cost')/'Revenue'",
      read: 'The formula subtracts Cost from Revenue, divides by Revenue, and can be formatted as a percentage in the pivot table values area.'
    }
  },
  'conditional-formatting-formula-generator': {
    gives: [
      'A custom formula for the conditional formatting rule you described.',
      'A plain-English read of which references stay locked and which move row by row.',
      'Notes on the applied range, TRUE/FALSE output, and how the rule behaves across Excel and Google Sheets.'
    ],
    useWhen: 'Use this when a color scale or built-in preset will not do the job because the highlight depends on another column, a date comparison, or business logic. Include the applied range because conditional formatting evaluates the formula from the first cell of that range and shifts references from there.',
    notWhen: 'Do not paste the result into a worksheet cell as a normal formula. A conditional formatting formula lives inside the rule dialog, and the anchors are written for the first cell of the applied range.',
    example: {
      setup: 'Tasks are in A2:C100, due dates are in column B, and status is in column C. Highlight the whole row when the due date is before today and the status is not Done.',
      formula: '=AND($B2<TODAY(),$C2<>"Done")',
      read: 'The dollar signs lock columns B and C so every row checks its own due date and status. The row number stays relative, so the rule moves from row 2 to row 3, row 4, and beyond.'
    }
  },
  'google-sheets-conditional-format-custom-formula': {
    gives: [
      'A Google Sheets custom formula for the conditional-formatting sidebar.',
      'A plain-English read of which columns stay locked and which row references move.',
      'Checks for apply-to range, TRUE/FALSE output, dollar signs, and cross-sheet INDIRECT cases.'
    ],
    useWhen: 'Use this page when Google Sheets built-in conditional-formatting presets are not specific enough, such as highlighting a whole row from one status column, flagging overdue tasks, spotting duplicates, or checking a value against another sheet.',
    notWhen: 'Do not paste the custom formula into a normal worksheet cell and expect formatting to happen. The formula belongs in Format cells if, Custom formula is, and it should be written from the first row or cell in the apply-to range.',
    example: {
      setup: 'The apply-to range is A1:Z1000, and column C contains Yes or No. Highlight the entire row when column C says Yes.',
      formula: '=$C1="Yes"',
      read: 'The dollar sign locks column C while the row number changes as Sheets evaluates each row in the apply-to range. The formula returns TRUE only for rows that should be highlighted.'
    }
  }
};

for (const page of pages) {
  Object.assign(page, pageEnhancements[page.slug]);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function replaceOnce(source, from, to) {
  if (!source.includes(from)) {
    throw new Error(`Template marker not found: ${from}`);
  }
  return source.replace(from, () => to);
}

function renderList(items) {
  return items.map((item) => `<li>${escapeHtml(item)}</li>`).join('\n              ');
}

function detailSection(page) {
  return `<section class="section seo-detail" aria-labelledby="${page.slug}-detail-title">
          <div class="section-copy">
            <p class="eyebrow">Use case</p>
            <h2 id="${page.slug}-detail-title">${escapeHtml(page.eyebrow)} for spreadsheet work.</h2>
            <p>${escapeHtml(page.intent)}</p>
          </div>
          <div class="detail-grid">
            <article class="detail-card">
              <h3>What this page gives you</h3>
              <ul>
                ${renderList(page.gives)}
              </ul>
            </article>
            <article class="detail-card">
              <h3>When to use it</h3>
              <p>${escapeHtml(page.useWhen)}</p>
              <p>${escapeHtml(page.notWhen)}</p>
            </article>
            <article class="detail-card">
              <h3>Worked example</h3>
              <p>${escapeHtml(page.example.setup)}</p>
              <pre><code>${escapeHtml(page.example.formula)}</code></pre>
              <p>${escapeHtml(page.example.read)}</p>
            </article>
          </div>
          <div class="paste-check">
            <h3>Check before you paste</h3>
            <ul>
              ${renderList(page.copyChecks)}
            </ul>
          </div>
        </section>`;
}

function schemaScript(page, canonical) {
  const graph = [
    {
      '@type': 'WebPage',
      '@id': `${canonical}#webpage`,
      url: canonical,
      name: page.title.replace(' | Write My Formula', ''),
      description: page.description,
      isPartOf: {
        '@type': 'WebSite',
        '@id': 'https://writemyformula.com/#website',
        name: 'Write My Formula',
        url: 'https://writemyformula.com/'
      },
      primaryImageOfPage: 'https://writemyformula.com/favicon.svg',
      mainEntity: {
        '@id': `${canonical}#app`
      }
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${canonical}#app`,
      name: 'Write My Formula',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      url: canonical,
      description: page.description,
      featureList: [
        page.eyebrow,
        'Plain-English spreadsheet formula requests',
        'Formula explanation and copy checks',
        ...page.gives
      ],
      offers: {
        '@type': 'Offer',
        price: '9.00',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: canonical
      }
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${canonical}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Write My Formula',
          item: 'https://writemyformula.com/'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: page.eyebrow,
          item: canonical
        }
      ]
    }
  ];

  return `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replaceAll('<', '\\u003c')}</script>`;
}

function pageHtml(page) {
  const canonical = `https://writemyformula.com/${page.slug}/`;
  let html = template;

  html = replaceOnce(html, '<title>Write My Formula | Excel and Google Sheets Formula Helper</title>', `<title>${escapeHtml(page.title)}</title>`);
  html = replaceOnce(html, '<meta name="description" content="Write Excel and Google Sheets formulas from plain English, explain pasted formulas, and fix common spreadsheet syntax problems.">', `<meta name="description" content="${escapeHtml(page.description)}">`);
  html = replaceOnce(html, '<link rel="canonical" href="https://writemyformula.com/">', `<link rel="canonical" href="${canonical}">`);
  html = replaceOnce(html, '<meta property="og:title" content="Write My Formula">', `<meta property="og:title" content="${escapeHtml(page.title.replace(' | Write My Formula', ''))}">`);
  html = replaceOnce(html, '<meta property="og:description" content="A focused spreadsheet workbench for formula generation, explanation, and fixing.">', `<meta property="og:description" content="${escapeHtml(page.description)}">`);
  html = replaceOnce(html, '<meta property="og:url" content="https://writemyformula.com/">', `<meta property="og:url" content="${canonical}">`);
  html = replaceOnce(html, '<p class="eyebrow">Excel and Google Sheets formula helper</p>', `<p class="eyebrow">${escapeHtml(page.eyebrow)}</p>`);
  html = replaceOnce(html, '<h1 id="hero-title">Write formulas without wrestling with syntax.</h1>', `<h1 id="hero-title">${escapeHtml(page.h1)}</h1>`);
  html = replaceOnce(html, '<p class="lede">Describe the spreadsheet job, add the cells you are working with, and get a clean formula with notes you can actually use.</p>', `<p class="lede">${escapeHtml(page.lede)}</p>`);
  html = replaceOnce(html, '<section class="section pricing" id="pricing" aria-labelledby="pricing-title">', `${detailSection(page)}\n\n        <section class="section pricing" id="pricing" aria-labelledby="pricing-title">`);
  html = replaceOnce(html, '<link rel="stylesheet" href="/styles.css">', `<link rel="stylesheet" href="/styles.css">\n    ${schemaScript(page, canonical)}`);
  html = replaceOnce(html, '<script type="module" src="/app/app.js"></script>', `<script>window.WMF_PAGE_PRESET = ${JSON.stringify(page.preset)};</script>\n    <script type="module" src="/app/app.js"></script>`);

  return html;
}

for (const page of pages) {
  const dir = resolve(root, page.slug);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
  writeFileSync(resolve(dir, 'index.html'), pageHtml(page));
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://writemyformula.com/</loc>
  </url>
${pages.map((page) => `  <url>
    <loc>https://writemyformula.com/${page.slug}/</loc>
  </url>`).join('\n')}
  <url>
    <loc>https://writemyformula.com/privacy</loc>
  </url>
</urlset>
`;

writeFileSync(resolve(root, 'sitemap.xml'), sitemap);
