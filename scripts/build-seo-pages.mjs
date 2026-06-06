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
    ],
    extraDetailCards: [
      {
        title: 'Template starting points',
        html: "Need a workbook structure before you write formulas? Someka's <a href=\"https://www.someka.net/product-category/google-sheets-templates/\">Google Sheets templates</a> cover planning, finance, reporting, and operations layouts you can adapt before adding custom formulas."
      }
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
    title: 'Formula Bot Alternative for One Formula Problem | Write My Formula',
    description: 'A focused Formula Bot alternative for writing, explaining, or fixing one Excel or Google Sheets formula without opening a broader upload, chart, dashboard, connector, SQL, VBA, or Apps Script workflow.',
    eyebrow: 'Formula Bot alternative',
    h1: 'A Formula Bot alternative for one formula problem.',
    lede: 'Use Write My Formula when the job is one Excel or Google Sheets formula, explanation, or repair. Use Formula Bot or another broader spreadsheet AI suite when you need file upload, workbook analysis, charts, dashboards, connectors, SQL, VBA, Apps Script, PDF conversion, or data-chat workflows.',
    preset: {
      mode: 'write',
      platform: 'excel',
      task: 'Write a formula that sums paid invoices from the current month and ignores open invoices.',
      table: 'Invoice Date,Status,Amount\n2026-05-04,Paid,1200\n2026-05-12,Open,850\n2026-05-18,Paid,640',
      range: 'Dates in A2:A500; status in B2:B500; amount in C2:C500; result in F2',
      hint: 'SUMIFS'
    },
    intent: 'Help spreadsheet users comparing Formula Bot-style AI spreadsheet suites choose a narrow formula workbench when the immediate problem is one Excel or Google Sheets formula, one explanation, or one repair.',
    bestFor: [
      'Writing or fixing one Excel or Google Sheets formula with the relevant ranges visible.',
      'Explaining inherited formula logic before editing a shared workbook.',
      'Trying a focused formula helper when you do not need upload-based analysis, charts, dashboards, connectors, SQL, VBA, Apps Script, regex, or PDF-to-Excel tools.'
    ],
    steps: [
      'Choose Write, Explain, or Fix for the formula-sized task.',
      'Paste the headers, sample rows, formula, or expected result so the answer has context.',
      'Review the range notes and paste checks before using the formula in the workbook.'
    ],
    copyChecks: [
      'Use Formula Bot or another broader spreadsheet AI suite if you need file upload, data chat, charts, dashboards, connectors, PDF conversion, SQL, VBA, Apps Script, or workbook-wide analysis.',
      'Use Write My Formula when the work can be inspected as one formula, one rule, or one repair.',
      'Test the output on one known row before filling it through an important workbook.'
    ]
  },
  {
    slug: 'ai-formula-generator-alternative',
    title: 'AI Formula Generator Alternative for One Formula Problem | Write My Formula',
    description: 'A focused AI Formula Generator alternative for writing, explaining, or fixing one Excel or Google Sheets formula without opening a broader SQL, file-context, bulk, VBA, or Apps Script workflow.',
    eyebrow: 'AI Formula Generator alternative',
    h1: 'An AI Formula Generator alternative for one formula problem.',
    lede: 'Use Write My Formula when the job is one Excel or Google Sheets formula, explanation, or repair, and you do not need SQL generation, file-context work, bulk generation, VBA, Apps Script, or a broader formula platform.',
    preset: {
      mode: 'write',
      platform: 'excel',
      task: 'Write a formula that totals paid invoices for Product A in June 2026.',
      table: 'Product,Invoice Date,Status,Amount\nProduct A,2026-06-04,Paid,1200\nProduct B,2026-06-09,Paid,850\nProduct A,2026-06-15,Open,640',
      range: 'Product in A2:A500; invoice date in B2:B500; status in C2:C500; amount in D2:D500; result in G2',
      hint: 'SUMIFS'
    },
    intent: 'Help spreadsheet users comparing AI Formula Generator-style tools choose a narrow formula workbench when the immediate problem is one Excel or Google Sheets formula, one explanation, or one repair.',
    bestFor: [
      'Writing or fixing one Excel or Google Sheets formula with the relevant ranges visible.',
      'Explaining inherited formula logic before changing a shared report.',
      'Trying a focused formula helper when you do not need SQL, CSV or Excel file context, bulk generation, VBA, or Apps Script.'
    ],
    steps: [
      'Choose Write, Explain, or Fix for the formula-sized task.',
      'Paste the headers, sample rows, formula, or expected result so the answer has context.',
      'Review the range notes and paste checks before using the formula in the workbook.'
    ],
    copyChecks: [
      'Use AI Formula Generator or another broader formula platform when you need SQL queries, CSV or Excel file context, bulk generation, VBA, Apps Script, templates, or conversational refinement.',
      'Use Write My Formula when the work can be inspected as one formula, one rule, or one repair.',
      'Test the output on one known row before filling it through an important workbook.'
    ]
  },
  {
    slug: 'expresssheet-alternative',
    title: 'ExpressSheet Alternative for One Formula Problem | Write My Formula',
    description: 'A focused ExpressSheet alternative for writing, explaining, or fixing one Excel or Google Sheets formula before choosing a broader spreadsheet analyst workflow.',
    eyebrow: 'ExpressSheet alternative',
    h1: 'An ExpressSheet alternative for one formula problem.',
    lede: 'ExpressSheet is built as an AI spreadsheet analyst for formula generation, uploaded Excel or CSV analysis, natural-language data chat, insights, charts, PDF export, and broader team workflows. Use Write My Formula when the job is narrower: one Excel or Google Sheets formula, explanation, or repair in a browser tab.',
    preset: {
      mode: 'fix',
      platform: 'excel',
      formula: '=INDEX($D$2:$D$500,MATCH(1,($A$2:$A$500=G2)*($B$2:$B$500="Paid"),0))'
    },
    intent: 'Help spreadsheet users comparing ExpressSheet-style AI spreadsheet analyst tools choose a narrow formula workbench when the immediate problem is one formula, one explanation, or one repair.',
    bestFor: [
      'Writing one Excel or Google Sheets formula from a plain-English task.',
      'Explaining inherited formula logic before editing a shared workbook.',
      'Repairing one lookup, summary, IF, text, date, conditional-formatting, or data-validation formula.',
      'Trying a focused formula helper before choosing an uploaded-file analysis or spreadsheet-chat platform.'
    ],
    steps: [
      'Choose Write, Explain, or Fix for the formula-sized job.',
      'Paste the formula, headers, sample rows, or expected result so the answer has context.',
      'Review the formula read-through and paste checks before using it in the sheet.'
    ],
    copyChecks: [
      'Use ExpressSheet or another broader spreadsheet analyst if you need Excel or CSV upload, data chat, trends, anomalies, data-quality checks, recommendations, charts, PDF export, enhanced spreadsheet downloads, batch processing, API access, file sharing, collaboration, SSO, or team controls.',
      'Use Write My Formula when the work can be inspected as one formula, one rule, or one repair.',
      'ExpressSheet details verified June 5, 2026; test the output on one known row before filling it through an important workbook.'
    ],
    extraDetailCards: [
      {
        title: 'Where ExpressSheet fits',
        html: 'ExpressSheet currently presents itself as an AI-powered spreadsheet analyst. Its public page describes plain-English Excel formula generation, Excel or CSV upload for analysis, natural-language conversations with spreadsheet data, insights, trends, anomalies, data-quality checks, actionable recommendations, chart and graph requests, PDF export, enhanced spreadsheet downloads, and sharing. Its pricing section lists a Free plan with 10 credits per day, Pro at $11.99/month with 500 credits per day, PDF export, advanced charts, batch processing, and priority support, plus custom Enterprise options with API access, collaboration, SSO, and advanced security.'
      }
    ]
  },
  {
    slug: 'sheetsolver-ai-alternative',
    title: 'SheetSolver AI Alternative for One Formula Problem | Write My Formula',
    description: 'A focused SheetSolver AI alternative for writing, explaining, or fixing one Excel or Google Sheets formula before choosing a broader upload, sheet-generation, PDF extraction, or export workflow.',
    eyebrow: 'SheetSolver AI alternative',
    h1: 'A SheetSolver AI alternative for one formula problem.',
    lede: 'Use Write My Formula when the job is one Excel or Google Sheets formula, explanation, or repair. Use SheetSolver AI or a similar broader spreadsheet workspace when you want optional sheet or screenshot upload, prompt-to-sheet generation, PDF or invoice extraction, exports, or a higher-volume formula workflow.',
    preset: {
      mode: 'write',
      platform: 'sheets',
      task: 'Write a formula that extracts the domain from each customer email address and leaves blanks empty.',
      table: 'Email,Customer\nalex@northwind.com,Northwind\nsam@acme.co,Acme\n,Missing',
      range: 'Emails in A2:A500; result in C2',
      hint: 'REGEXEXTRACT'
    },
    intent: 'Help spreadsheet users comparing SheetSolver AI-style spreadsheet tools choose a narrow formula workbench when the immediate job is one Excel or Google Sheets formula, one explanation, or one repair.',
    bestFor: [
      'Writing one Excel or Google Sheets formula from a plain-English request and pasted context.',
      'Explaining inherited formulas before editing shared workbook logic.',
      'Fixing lookup, text, date, summary, conditional-formatting, and data-validation formulas when the relevant ranges are visible.'
    ],
    steps: [
      'Choose Write, Explain, or Fix based on the formula task.',
      'Paste headers, sample rows, the formula, or the rule dialog context.',
      'Review the explanation and copy checks before filling the formula through a report.'
    ],
    copyChecks: [
      'Use SheetSolver AI or another broader spreadsheet workspace if you need optional file or screenshot upload, prompt-to-sheet generation, PDF or invoice extraction, Excel or Sheets export, data chat, dashboards, charts, or workbook-wide analysis.',
      'Use Write My Formula when the problem can be described as one formula, one rule, or one repair.',
      'Test the formula on a known row before replacing formulas across an important sheet.'
    ]
  },
  {
    slug: 'sheetgpt-alternative',
    title: 'SheetGPT Alternative for One Formula Problem | Write My Formula',
    description: 'A focused SheetGPT alternative for writing, explaining, or fixing one Excel or Google Sheets formula without opening a broader file, chat, OCR, chart, analysis, or script workflow.',
    eyebrow: 'SheetGPT alternative',
    h1: 'A SheetGPT alternative for one formula problem.',
    lede: 'Use Write My Formula when the job is one Excel or Google Sheets formula, explanation, or repair. Use a broader SheetGPT-style workspace when you need file upload, spreadsheet chat, image-to-table conversion, charts, analysis, scripts, or saved formula history.',
    preset: {
      mode: 'write',
      platform: 'excel',
      task: 'Write a formula that returns the latest paid invoice amount for each customer.',
      table: 'Customer,Invoice Date,Status,Amount\nAcme,2026-05-04,Paid,1200\nAcme,2026-06-01,Open,850\nNorthwind,2026-06-03,Paid,640',
      range: 'Customer in A2:A500; invoice date in B2:B500; status in C2:C500; amount in D2:D500; lookup customer in F2',
      hint: 'XLOOKUP'
    },
    intent: 'Help spreadsheet users comparing SheetGPT-style AI spreadsheet assistants choose a narrow formula workbench when the immediate problem is one formula, one explanation, or one repair.',
    bestFor: [
      'Writing one Excel or Google Sheets formula from plain English.',
      'Explaining an inherited formula before editing a shared workbook.',
      'Fixing one broken formula with the relevant ranges, expected result, and paste checks visible.'
    ],
    steps: [
      'Choose Write, Explain, or Fix for the formula-sized task.',
      'Paste the formula, headers, sample rows, or expected result so the answer has context.',
      'Review the range notes and paste checks before using the formula in the workbook.'
    ],
    copyChecks: [
      'Use SheetGPT or another broader spreadsheet AI workspace if you need Excel or CSV file context, data chat, OCR from an image, charts, written analysis, scripts, or formula history across sessions.',
      'Use Write My Formula when the work can be inspected as one formula, one rule, or one repair.',
      'Test the output on one known row before filling it through an important workbook.'
    ]
  },
  {
    slug: 'sheetxai-alternative',
    title: 'SheetXAI Alternative for One Formula Problem | Write My Formula',
    description: 'A focused SheetXAI alternative for writing, explaining, or fixing one Excel or Google Sheets formula without opening a broader in-sheet chat, extraction, app-connection, analysis, or automation workflow.',
    eyebrow: 'SheetXAI alternative',
    h1: 'A SheetXAI alternative for one formula problem.',
    lede: 'Use Write My Formula when the job is one Excel or Google Sheets formula, explanation, or repair. Use SheetXAI or a similar in-spreadsheet AI workspace when you want sidebar chat, PDF or image extraction, app connections, analysis, content generation, or automation inside Excel or Google Sheets.',
    preset: {
      mode: 'write',
      platform: 'sheets',
      task: 'Write a formula that flags paid West-region invoices from the current month.',
      table: 'Region,Status,Invoice Date,Amount\nWest,Paid,2026-06-04,1200\nEast,Paid,2026-06-09,850\nWest,Open,2026-06-15,640',
      range: 'Region in A2:A500; status in B2:B500; invoice date in C2:C500; result in E2',
      hint: 'IF'
    },
    intent: 'Help spreadsheet users comparing SheetXAI-style spreadsheet AI workspaces choose a narrow formula workbench when the immediate problem is one Excel or Google Sheets formula, one explanation, or one repair.',
    bestFor: [
      'Writing or fixing one Excel or Google Sheets formula with the relevant ranges visible.',
      'Explaining inherited formula logic before editing a shared report.',
      'Trying a focused formula helper when you do not need in-sheet chat, document extraction, connected apps, analysis, content generation, or workflow automation.'
    ],
    steps: [
      'Choose Write, Explain, or Fix for the formula-sized task.',
      'Paste the formula, headers, sample rows, or expected result so the answer has context.',
      'Review the range notes and paste checks before using the formula in the workbook.'
    ],
    copyChecks: [
      'Use SheetXAI or another in-spreadsheet AI workspace if you need sidebar chat, PDF or image extraction, thousands of app connections, bulk data movement, analysis, content generation, or workflow automation inside Excel or Google Sheets.',
      'Use Write My Formula when the work can be inspected as one formula, one rule, or one repair.',
      'Test the output on one known row before filling it through an important workbook.'
    ]
  },
  {
    slug: 'formulaberry-alternative',
    title: 'FormulaBerry Alternative for One Formula Problem | Write My Formula',
    description: 'A focused FormulaBerry alternative for writing, explaining, or fixing one Excel or Google Sheets formula before choosing a broader spreadsheet bot or monthly formula plan.',
    eyebrow: 'FormulaBerry alternative',
    h1: 'A FormulaBerry alternative for one formula problem.',
    lede: 'Use Write My Formula when the job is one Excel or Google Sheets formula, explanation, or repair. Use FormulaBerry or a similar spreadsheet bot when you want multilingual explanation settings, finance-focused formula workflows, small-business guidance, or a monthly plan for repeated formula work.',
    preset: {
      mode: 'write',
      platform: 'excel',
      task: 'Write a formula that totals order amounts for the customer ID in A2.',
      table: 'Customer ID,Order Date,Status,Amount\nC-104,2026-06-01,Paid,420\nC-219,2026-06-02,Paid,180\nC-104,2026-06-03,Open,95',
      range: 'Customer IDs in A2:A500; amounts in D2:D500; lookup customer in G2',
      hint: 'SUMIF'
    },
    intent: 'Help spreadsheet users comparing FormulaBerry-style Excel and Google Sheets bots choose a narrow formula workbench when the immediate problem is one formula, one explanation, or one repair.',
    bestFor: [
      'Writing or fixing one Excel or Google Sheets formula with the relevant ranges visible.',
      'Explaining inherited formula logic before editing a shared report.',
      'Trying a focused formula helper when you do not need multilingual explanation settings, small-business spreadsheet guidance, finance-specific workflows, or a monthly unlimited-credit plan.'
    ],
    steps: [
      'Choose Write, Explain, or Fix for the formula-sized task.',
      'Paste the task, formula, headers, range, or one sample row so the answer has context.',
      'Review the formula read-through and paste checks before using it in the sheet.'
    ],
    copyChecks: [
      'Use FormulaBerry or another broader spreadsheet bot if you want multilingual explanations, finance-specific workflows, small-business spreadsheet guidance, all-device access, or a monthly unlimited-credit plan.',
      'Use Write My Formula when the work can be inspected as one formula, one rule, or one repair.',
      'Test the output on one known row before filling it through an important workbook.'
    ]
  },
  {
    slug: 'formuladesk-alternative',
    title: 'FormulaDesk Alternative for One Formula Problem | Write My Formula',
    description: 'A focused FormulaDesk alternative for writing, explaining, or fixing one Excel or Google Sheets formula before choosing installed Excel add-ins for workbook inspection.',
    eyebrow: 'FormulaDesk alternative',
    h1: 'A FormulaDesk alternative for one formula problem.',
    lede: 'Use Write My Formula when the job is one Excel or Google Sheets formula, explanation, or repair in a browser. Use FormulaDesk or a similar Excel add-in suite when the workbook itself needs installed formula inspection, precedent tracing, formula editing tools, workbook issue checks, equation display, or navigation help inside Excel desktop.',
    preset: {
      mode: 'fix',
      platform: 'excel',
      formula: '=IF(B2="Paid",IF(MONTH(C2)=8,"August paid","Other month"),"Open")'
    },
    intent: 'Help spreadsheet users comparing FormulaDesk-style Excel add-ins choose a narrow formula workbench when the immediate problem is one formula, one explanation, or one repair.',
    bestFor: [
      'Writing or fixing one Excel or Google Sheets formula without installing an Excel add-in first.',
      'Explaining inherited formula logic before editing a shared report.',
      'Trying a focused formula helper when you do not need installed Excel formula tracing, workbook detective tools, equation plotting, LAMBDA creation, or sheet-navigation add-ins.'
    ],
    steps: [
      'Choose Write, Explain, or Fix for the formula-sized task.',
      'Paste the formula, headers, sample rows, or expected result so the answer has context.',
      'Review the range notes and paste checks before using the formula in the workbook.'
    ],
    copyChecks: [
      'Use FormulaDesk or another Excel add-in suite if you need to step through a long formula inside Excel, trace precedents, inspect workbook issues, format formulas in an editor, create LAMBDA functions, plot formulas, document calculations, or navigate a large workbook.',
      'Use Write My Formula when the work can be inspected as one formula, one rule, or one repair.',
      'FormulaDesk details verified June 5, 2026; test the output on one known row before filling it through an important workbook.'
    ]
  },
  {
    slug: 'promptloop-alternative',
    title: 'PromptLoop Alternative for One Formula Problem | Write My Formula',
    description: 'A focused PromptLoop alternative for writing, explaining, or fixing one Excel or Google Sheets formula before choosing broader AI spreadsheet enrichment, scraping, or automation workflows.',
    eyebrow: 'PromptLoop alternative',
    h1: 'A PromptLoop alternative for one formula problem.',
    lede: 'These tools sound similar, but the jobs are different. Use Write My Formula when you need one Excel or Google Sheets formula, explanation, or repair in a browser tab. Use PromptLoop or a similar AI spreadsheet platform when you need in-sheet functions, data enrichment, web research, file processing, or AI tasks that run across many rows.',
    preset: {
      mode: 'fix',
      platform: 'sheets',
      formula: '=VLOOKUP(F2,A2:D500,4,FALSE)'
    },
    intent: 'Help spreadsheet users comparing PromptLoop-style AI spreadsheet automation choose a narrow formula workbench when the immediate problem is one formula, one explanation, or one repair.',
    bestFor: [
      'Writing or fixing one Excel or Google Sheets formula without installing an add-on first.',
      'Explaining inherited formula logic before changing a shared sheet.',
      'Trying a focused formula helper when you do not need AI functions running across hundreds of rows, GTM enrichment, scraping, research workflows, or scheduled dataset tasks.'
    ],
    steps: [
      'Choose Write, Explain, or Fix for the formula-sized task.',
      'Paste the formula, headers, sample rows, or expected result so the answer has context.',
      'Review the formula read-through and paste checks before using it in the sheet.'
    ],
    copyChecks: [
      'Use PromptLoop or another AI spreadsheet automation platform if you need in-sheet AI functions, custom tasks, web browsing, list scraping, dynamic data extraction, research pages, file processing, or CRM and GTM enrichment.',
      'Use Write My Formula when the work can be inspected as one formula, one rule, or one repair.',
      'PromptLoop details verified June 5, 2026; test the output on one known row before filling it through an important workbook.'
    ]
  },
  {
    slug: 'coefficient-alternative',
    title: 'Coefficient Alternative for One Formula Problem | Write My Formula',
    description: 'A focused Coefficient alternative for writing, explaining, or fixing one Excel or Google Sheets formula before choosing connected-data, refresh, alert, export, or in-sheet AI workflows.',
    eyebrow: 'Coefficient alternative',
    h1: 'A Coefficient alternative for one formula problem.',
    lede: 'Coefficient is built for live data in spreadsheets, GPT Copilot inside Google Sheets, refresh schedules, alerts, exports, chart and pivot builders, and connected business systems. Use Write My Formula when the job is narrower: one Excel or Google Sheets formula, explanation, or repair in a browser tab.',
    preset: {
      mode: 'fix',
      platform: 'sheets',
      formula: '=IFERROR(INDEX($D:$D,MATCH(1,($A:$A=A2)*($B:$B=B2),0)),"")'
    },
    intent: 'Help spreadsheet users comparing Coefficient-style connected spreadsheet platforms choose a narrow formula workbench when the immediate problem is one formula, one explanation, or one repair.',
    bestFor: [
      'Writing one Excel or Google Sheets formula from a plain-English description.',
      'Explaining a coworker-written formula before editing a shared sheet.',
      'Repairing a formula that returns an error, a blank, or the wrong number.',
      'Trying a focused formula helper without installing a spreadsheet extension first.'
    ],
    steps: [
      'Choose Write, Explain, or Fix for the formula-sized job.',
      'Paste the formula, headers, sample rows, or expected result so the answer has context.',
      'Review the formula read-through and paste checks before using it in the sheet.'
    ],
    copyChecks: [
      'Use Coefficient or another connected spreadsheet platform if you need live data from Salesforce, HubSpot, Stripe, Shopify, MySQL, Snowflake, Google Analytics, Looker, Tableau, or similar systems.',
      'Use Coefficient-style tools if you need scheduled refreshes, exports back to business systems, row-change alerts, shared team connections, SQL builders, chart builders, or pivot builders.',
      'Use Coefficient GPT Copilot if you want AI functions inside Google Sheets for cleaning, formatting, querying, enriching, analyzing, or running GPT work across sheet data.',
      'Coefficient details verified June 5, 2026; test the output on one known row before filling it through an important workbook.'
    ],
    extraDetailCards: [
      {
        title: 'Where Coefficient fits',
        html: 'Coefficient runs as a spreadsheet extension for teams that want connected data in sheets. Its current pricing page lists a Free tier with 3 data sources, 5,000-row imports, 50 import refreshes per month, manual refresh, 30 alerts per month, on-sheet AI functions, and 10K lifetime OpenAI API calls; Starter is listed at $49/month with daily auto-refresh, exports, data snapshots, SQL, chart, and pivot builders; Pro is listed at $99/user/month with higher limits, hourly refresh, dynamic recipients, and shared team connections.'
      }
    ]
  },
  {
    slug: 'excelgpt-alternative',
    title: 'ExcelGPT Alternative for One Formula Problem | Write My Formula',
    description: 'A focused ExcelGPT alternative for writing, explaining, or fixing one Excel or Google Sheets formula before choosing a broader upload, analysis, chart, automation, SQL, regex, or script workflow.',
    eyebrow: 'ExcelGPT alternative',
    h1: 'An ExcelGPT alternative for one formula problem.',
    lede: 'ExcelGPT is built as a broader Excel assistant for formula generation, uploaded-file analysis, charts, automation, file conversion, connected sources, SQL, regex, and script workflows. Use Write My Formula when the job is narrower: one Excel or Google Sheets formula, explanation, or repair in a browser tab.',
    preset: {
      mode: 'fix',
      platform: 'excel',
      formula: '=SUMIFS($D$2:$D$500,$A$2:$A$500,"West",$B$2:$B$500,"Paid",$C$2:$C$500,">=6/1/2026")'
    },
    intent: 'Help spreadsheet users comparing ExcelGPT-style AI Excel assistants choose a narrow formula workbench when the immediate problem is one formula, one explanation, or one repair.',
    bestFor: [
      'Writing one Excel or Google Sheets formula from a plain-English task.',
      'Explaining inherited formula logic before editing a shared workbook.',
      'Repairing a formula that returns an error, a blank, or the wrong result.',
      'Trying a focused formula helper before choosing an uploaded-file or automation suite.'
    ],
    steps: [
      'Choose Write, Explain, or Fix for the formula-sized job.',
      'Paste the formula, headers, sample rows, or expected result so the answer has context.',
      'Review the formula read-through and paste checks before using it in the sheet.'
    ],
    copyChecks: [
      'Use ExcelGPT or another broader Excel assistant if you need uploaded-file analysis, data cleaning, charts, dashboards, automation, file conversion, connected data sources, SQL, regex, VBA, scripts, or workbook-wide insights.',
      'Use Write My Formula when the work can be inspected as one formula, one rule, or one repair.',
      'ExcelGPT details verified June 5, 2026; test the output on one known row before filling it through an important workbook.'
    ],
    extraDetailCards: [
      {
        title: 'Where ExcelGPT fits',
        html: 'ExcelGPT currently presents itself as an AI Excel assistant and Formula Generator &amp; Automation Suite for Excel users. Its public page describes formula generation, uploaded-file analysis, chart building, automation, auto Excel processing, file conversion, multi data source workflows, AI insights, Power Query or VBA-style help, SQL, regex, and script automation; its pricing section lists Free, Pro at $19.90/month, and Lifetime at $299 one-time.'
      }
    ]
  },
  {
    slug: 'rows-alternative',
    title: 'Rows Alternative for One Formula Problem | Write My Formula',
    description: 'A focused Rows alternative for writing, explaining, or fixing one Excel or Google Sheets formula before choosing a full AI spreadsheet platform.',
    eyebrow: 'Rows alternative',
    h1: 'You probably do not need another spreadsheet app. You need one formula.',
    lede: 'Write My Formula writes, explains, and repairs one Excel or Google Sheets formula in your browser. Paste the result back into the sheet you already use.',
    preset: {
      mode: 'write',
      platform: 'sheets',
      task: 'Write a formula that adds a margin column from revenue and cost.',
      table: 'Customer,Revenue,Cost\nAcme,1200,740\nNorthwind,850,610\nContoso,640,280',
      range: 'Revenue in B2:B500; cost in C2:C500; result in D2',
      hint: 'IF'
    },
    intent: 'Help spreadsheet users comparing Rows-style AI spreadsheet platforms choose a narrow formula workbench when the immediate problem is one Excel or Google Sheets formula, one explanation, or one repair.',
    bestFor: [
      'Writing one formula at a time from plain English with range notes before you paste.',
      'Explaining inherited Excel or Google Sheets logic before changing a shared report.',
      'Trying a focused formula helper when you do not need a new AI spreadsheet platform, live imports, cross-table analysis, Python, or workbook-wide table transformations.'
    ],
    steps: [
      'Choose Write, Explain, or Fix for the formula-sized task.',
      'Paste the headers, sample rows, formula, or expected result so the answer has context.',
      'Review the cell references, explanation, and paste checks before using the formula in the workbook.'
    ],
    copyChecks: [
      'Use Rows or another full AI spreadsheet platform if you want imported data, AI Analyst-style table work, cross-table actions, Python, or broader data analysis.',
      'Use Write My Formula when the job can be inspected as one formula, one rule, or one repair.',
      'Check the cell references, sheet names, and regional separators before filling the result through an important workbook.',
      'Test the output on a few known rows before relying on it for money, dates, or decisions.'
    ],
    extraDetailCards: [
      {
        title: 'Where Rows fits',
        html: 'Rows is a full AI spreadsheet platform. Its current docs describe AI Analyst as a spreadsheet copilot for data analysis, adding columns, table transformations, cross-table references, and checkpoints; Rows also presents AI formula columns, built-in Python for analysis, and imports from tools such as Google Analytics, Facebook Ads, HubSpot, Salesforce, BigQuery, and PostgreSQL. Use Rows when the job is the spreadsheet. Use Write My Formula when the job is one formula.'
      }
    ]
  },
  {
    slug: 'gptexcel-alternative',
    title: 'GPTExcel Alternative for Excel Formulas | Write My Formula',
    description: 'A focused GPTExcel alternative for writing, explaining, and fixing Excel and Google Sheets formulas from plain English.',
    eyebrow: 'GPTExcel alternative',
    h1: 'A GPTExcel alternative for focused formula work.',
    lede: 'Use Write My Formula when the job is one Excel or Google Sheets formula, explanation, or repair, and you want the ranges, assumptions, and paste checks visible before copying.',
    preset: {
      mode: 'fix',
      platform: 'excel',
      formula: '=SUMIFS(C2:C500,A2:A500,">=6/1/2026",A2:A500,"<=6/30/2026",B2:B500,"Paid")'
    },
    intent: 'Help spreadsheet users comparing AI Excel tools choose a narrower formula workbench when they need to write, understand, or repair one formula instead of opening a broader data-analysis workspace.',
    bestFor: [
      'Fixing one Excel or Google Sheets formula with the relevant ranges and expected result visible.',
      'Explaining inherited spreadsheet logic before changing a shared report.',
      'Writing lookup, summary, IF, text, date, conditional-formatting, and validation formulas from plain English.'
    ],
    steps: [
      'Choose Write, Explain, or Fix for the exact formula job.',
      'Paste the broken formula, headers, sample rows, or expected result so the answer has context.',
      'Review the range notes and compatibility checks before copying the formula into the workbook.'
    ],
    copyChecks: [
      'Use a broader spreadsheet AI if you need file upload, dashboards, charts, data chat, or workbook-wide analysis.',
      'Use Write My Formula when the work can be inspected as one formula, one rule, or one repair.',
      'Test the formula on one known row before replacing formulas across an important workbook.'
    ]
  },
  {
    slug: 'excelbot-alternative',
    title: 'ExcelBot Alternative for Excel Formulas | Write My Formula',
    description: 'A focused ExcelBot alternative for writing, explaining, and fixing Excel and Google Sheets formulas without a VBA or data-analysis workspace.',
    eyebrow: 'ExcelBot alternative',
    h1: 'An ExcelBot alternative for focused formula work.',
    lede: 'Use Write My Formula when the job is one Excel or Google Sheets formula, explanation, or repair, and you want range notes and paste checks before copying it into a sheet.',
    preset: {
      mode: 'fix',
      platform: 'excel',
      formula: '=XLOOKUP(E2,$A$2:$A$500,$C$2:$C$500,"",0,-1)'
    },
    intent: 'Help spreadsheet users comparing AI Excel tools choose a narrow formula workbench when they need to write, understand, or repair one formula rather than generate VBA, upload data, or ask broad analysis questions.',
    bestFor: [
      'Fixing one lookup, summary, IF, text, date, conditional-formatting, or validation formula.',
      'Explaining inherited Excel or Google Sheets formulas before editing shared workbook logic.',
      'Writing a formula from plain English with the relevant headers, sample rows, and ranges visible.'
    ],
    steps: [
      'Choose Write, Explain, or Fix for the formula-sized task.',
      'Paste the broken formula, headers, sample rows, or expected result so the answer has context.',
      'Review the range notes and compatibility checks before copying the formula into the workbook.'
    ],
    copyChecks: [
      'Use a broader spreadsheet AI if you need VBA generation, uploaded-data analysis, dashboards, charts, or workbook-wide work.',
      'Use Write My Formula when the work can be inspected as one formula, one rule, or one repair.',
      'Test the formula on one known row before replacing formulas across an important workbook.'
    ]
  },
  {
    slug: 'ajelix-alternative',
    title: 'Ajelix Alternative for One Formula Problem | Write My Formula',
    description: 'A focused Ajelix alternative for writing, explaining, or fixing one Excel or Google Sheets formula without setting up a broader AI workspace.',
    eyebrow: 'Ajelix alternative',
    h1: 'An Ajelix alternative for one formula problem.',
    lede: 'Use Write My Formula when the job is one Excel or Google Sheets formula, explanation, or repair, and you do not need a broader agentic workspace, add-in suite, dashboard, or file-analysis flow.',
    preset: {
      mode: 'write',
      platform: 'excel',
      task: 'Average column D for West region rows where the date in column C is on or after January 1, 2025.',
      table: 'Region,Status,Date,Amount\nWest,Closed,2025-01-14,1200\nEast,Closed,2025-02-02,850\nWest,Open,2024-12-20,640',
      range: 'Region in B:B; date in C:C; amount in D:D; result in G2',
      hint: 'AVERAGEIFS'
    },
    intent: 'Help spreadsheet users comparing Ajelix-style AI spreadsheet platforms choose a narrow formula workbench when the immediate problem is one formula, one explanation, or one repair.',
    bestFor: [
      'Writing, fixing, or explaining one Excel or Google Sheets formula today.',
      'Trying a focused formula helper before choosing a broader workspace, add-in, or data analyst.',
      'Formula-bar work such as lookups, summaries, IF logic, text cleanup, dates, conditional formatting, and validation rules.'
    ],
    steps: [
      'Choose Write, Explain, or Fix for the formula-sized task.',
      'Paste the headers, sample rows, broken formula, or expected result so the answer has context.',
      'Review the formula read-through and paste checks before copying it into the sheet.'
    ],
    copyChecks: [
      'Use Ajelix or another broader spreadsheet AI if you need file upload, workspace assets, dashboards, charts, VBA, Apps Script, or Google Workspace add-ons.',
      'Use Write My Formula when the work can be inspected as one formula, one rule, or one repair.',
      'Test the output on one known row before filling it through an important workbook.'
    ]
  },
  {
    slug: 'sheetai-alternative',
    title: 'SheetAI Alternative for One Formula Problem | Write My Formula',
    description: 'A focused SheetAI alternative for writing, explaining, or fixing one Excel or Google Sheets formula without opening a broader spreadsheet AI workflow.',
    eyebrow: 'SheetAI alternative',
    h1: 'A SheetAI alternative for one formula problem.',
    lede: 'Use Write My Formula when the job is one Excel or Google Sheets formula, explanation, or repair, and you do not need spreadsheet generation, cleaning, data analysis, visualization, or automation tools.',
    preset: {
      mode: 'fix',
      platform: 'sheets',
      formula: '=FILTER(A2:D500,D2:D500="Paid",C2:C500>=DATE(2026,5,1))'
    },
    intent: 'Help spreadsheet users comparing SheetAI-style spreadsheet AI platforms choose a narrow formula workbench when the immediate problem is one formula, one explanation, or one repair.',
    bestFor: [
      'Fixing or writing one Excel or Google Sheets formula with the relevant ranges visible.',
      'Explaining inherited formula logic before changing a shared report.',
      'Trying a focused formula helper before choosing a broader spreadsheet AI platform.'
    ],
    steps: [
      'Choose Write, Explain, or Fix for the formula-sized task.',
      'Paste the formula, headers, sample rows, or expected result so the answer has context.',
      'Review the formula explanation and paste checks before using it in the sheet.'
    ],
    copyChecks: [
      'Use SheetAI or another broader spreadsheet AI when you need a spreadsheet generator, cleaner, data analyzer, CSV converter, visualization, or workflow automation.',
      'Use Write My Formula when the work can be inspected as one formula, one rule, or one repair.',
      'Test the output on one known row before filling it through an important sheet.'
    ]
  },
  {
    slug: 'numerous-ai-alternative',
    title: 'Numerous.ai Alternative for One Formula Problem | Write My Formula',
    description: 'A focused Numerous.ai alternative for writing, explaining, or fixing one Excel or Google Sheets formula without installing an in-spreadsheet AI automation add-in.',
    eyebrow: 'Numerous.ai alternative',
    h1: 'A Numerous.ai alternative for one formula problem.',
    lede: 'Use Write My Formula when the job is one Excel or Google Sheets formula, explanation, or repair, and you do not need in-cell AI functions, bulk text generation, categorization, or spreadsheet automation.',
    preset: {
      mode: 'explain',
      platform: 'excel',
      formula: '=SUMIFS($D$2:$D$500,$B$2:$B$500,"West",$C$2:$C$500,">="&DATE(2026,1,1))'
    },
    intent: 'Help spreadsheet users comparing Numerous.ai-style in-spreadsheet AI add-ins choose a narrow formula workbench when the immediate problem is one formula, one explanation, or one repair.',
    bestFor: [
      'Explaining one inherited formula before changing a shared report.',
      'Writing or fixing one Excel or Google Sheets formula with visible ranges and paste checks.',
      'Trying a focused formula helper before installing a broader in-spreadsheet AI automation add-in.'
    ],
    steps: [
      'Choose Write, Explain, or Fix for the formula-sized task.',
      'Paste the formula, headers, sample rows, or expected result so the answer has context.',
      'Review the formula explanation and copy checks before using it in the workbook.'
    ],
    copyChecks: [
      'Use Numerous.ai or another in-spreadsheet AI add-in when you need AI functions in cells, bulk content generation, categorization, formatting, or repetitive task automation.',
      'Use Write My Formula when the work can be inspected as one formula, one rule, or one repair.',
      'Test the output on one known row before filling it through an important workbook.'
    ]
  },
  {
    slug: 'formulr-alternative',
    title: 'Formulr Alternative for One Formula Problem | Write My Formula',
    description: 'A focused Formulr alternative for writing, explaining, or fixing one Excel or Google Sheets formula with range notes and paste checks.',
    eyebrow: 'Formulr alternative',
    h1: 'A Formulr alternative for one formula problem.',
    lede: 'Use Write My Formula when you want to try a focused Excel or Google Sheets formula workbench before choosing a broader formula subscription or browser extension.',
    preset: {
      mode: 'fix',
      platform: 'excel',
      formula: '=COUNTIFS($B$2:$B$500,"Complete",$C$2:$C$500,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1))'
    },
    intent: 'Help spreadsheet users comparing Formulr-style AI formula tools choose a narrow formula workbench when the immediate problem is one formula, one explanation, or one repair.',
    bestFor: [
      'Trying two formula-sized requests before creating an account.',
      'Fixing or explaining one Excel or Google Sheets formula with the touched ranges visible.',
      'Writing lookup, summary, IF, text, date, conditional-formatting, and validation formulas from plain English.'
    ],
    steps: [
      'Choose Write, Explain, or Fix for the formula-sized task.',
      'Paste the formula, headers, sample rows, or expected result so the answer has context.',
      'Review the range notes and paste checks before copying the formula into the sheet.'
    ],
    copyChecks: [
      'Use Formulr or another formula subscription if you want monthly generation, explanation, and debugging quotas across a dedicated formula app or extension.',
      'Use Write My Formula when the job can be inspected as one formula, one rule, or one repair.',
      'Test the output on one known row before filling it through an important workbook.'
    ]
  },
  {
    slug: 'formulawiz-alternative',
    title: 'FormulaWiz Alternative for One Formula Problem | Write My Formula',
    description: 'A focused FormulaWiz alternative for writing, explaining, or fixing one Excel or Google Sheets formula without choosing a multi-platform formula subscription.',
    eyebrow: 'FormulaWiz alternative',
    h1: 'A FormulaWiz alternative for one formula problem.',
    lede: 'Use Write My Formula when the job is one Excel or Google Sheets formula, explanation, or repair, and you do not need Airtable formula conversion or simultaneous multi-platform formula output.',
    preset: {
      mode: 'write',
      platform: 'sheets',
      task: 'Write a formula that counts paid onboarding tasks for West region customers this month.',
      table: 'Region,Status,Task Date\nWest,Paid,2026-06-03\nEast,Paid,2026-06-04\nWest,Open,2026-06-05',
      range: 'Region in A2:A500; status in B2:B500; task date in C2:C500; result in F2',
      hint: 'COUNTIFS'
    },
    intent: 'Help spreadsheet users comparing FormulaWiz-style formula tools choose a narrow formula workbench when the immediate problem is one Excel or Google Sheets formula, one explanation, or one repair.',
    bestFor: [
      'Writing or fixing one Excel or Google Sheets formula with the relevant ranges visible.',
      'Explaining inherited formula logic before editing a shared report.',
      'Trying a focused formula helper when you do not need Airtable formula variants or simultaneous output across spreadsheet platforms.'
    ],
    steps: [
      'Choose Write, Explain, or Fix for the formula-sized task.',
      'Paste the formula, headers, sample rows, or expected result so the answer has context.',
      'Review the range notes and paste checks before using the formula in the sheet.'
    ],
    copyChecks: [
      'Use FormulaWiz or another multi-platform formula tool if you need Airtable formulas alongside Excel and Google Sheets variants.',
      'Use Write My Formula when the work can be inspected as one formula, one rule, or one repair.',
      'Test the output on one known row before filling it through an important workbook.'
    ]
  },
  {
    slug: 'formularizer-alternative',
    title: 'Formularizer Alternative for One Formula at a Time | Write My Formula',
    description: 'A focused Formularizer alternative for writing, explaining, or fixing one Excel or Google Sheets formula without opening SQL, regex, VBA, or Apps Script assistant workflows.',
    eyebrow: 'Formularizer alternative',
    h1: 'A Formularizer alternative for one formula at a time.',
    lede: 'Use Write My Formula when the job is one Excel or Google Sheets formula, explanation, or repair, and you do not need a larger assistant suite for SQL, regex, VBA, or Google Apps Script.',
    preset: {
      mode: 'write',
      platform: 'sheets',
      task: 'Write a formula that flags duplicate invoice IDs only after the first occurrence.',
      table: 'Invoice ID,Customer,Amount\nINV-1001,Acme,1200\nINV-1002,Northwind,850\nINV-1001,Acme,1200',
      range: 'Invoice IDs in A2:A500; result in D2',
      hint: 'COUNTIF'
    },
    intent: 'Help spreadsheet users comparing Formularizer-style assistant suites choose a narrow formula workbench when the immediate problem is one Excel or Google Sheets formula, one explanation, or one repair.',
    bestFor: [
      'Writing or fixing one Excel or Google Sheets formula with the relevant ranges visible.',
      'Explaining inherited formula logic before editing a shared report.',
      'Trying a focused formula helper when you do not need SQL, regex, VBA, Apps Script, or a broader credit-based assistant suite.'
    ],
    steps: [
      'Choose Write, Explain, or Fix for the formula-sized task.',
      'Paste the formula, headers, sample rows, or expected result so the answer has context.',
      'Review the range notes and paste checks before using the formula in the workbook.'
    ],
    copyChecks: [
      'Use Formularizer or another assistant suite if you need SQL queries, regex patterns, Excel VBA scripts, Google Apps Script, or a broader credit-based workspace.',
      'Use Write My Formula when the work can be inspected as one formula, one rule, or one repair.',
      'Test the output on one known row before filling it through an important workbook.'
    ]
  },
  {
    slug: 'formulapilot-alternative',
    title: 'FormulaPilot Alternative for One Formula Problem | Write My Formula',
    description: 'A focused FormulaPilot alternative for writing, explaining, or fixing one Excel or Google Sheets formula before choosing a free generator, checker, reference, and formula-library hub.',
    eyebrow: 'FormulaPilot alternative',
    h1: 'A FormulaPilot alternative for the formula you are stuck on right now.',
    lede: 'Use Write My Formula when the job is one Excel or Google Sheets formula, explanation, or repair, and you want to try the answer in this tab before deciding whether you need a larger formula library, checker, or reference hub.',
    preset: {
      mode: 'fix',
      platform: 'sheets',
      formula: '=VLOOKUP(A2,Customers!A:D,4,FALSE)'
    },
    intent: 'Help spreadsheet users comparing FormulaPilot-style formula generators choose a narrow formula workbench when the immediate problem is one formula, one explanation, or one repair.',
    bestFor: [
      'Fixing one lookup, summary, IF, text, date, conditional-formatting, or validation formula with the relevant ranges visible.',
      'Trying two formula-sized requests before deciding whether to keep using a formula tool.',
      'Explaining inherited Excel or Google Sheets formulas before editing a shared report.'
    ],
    steps: [
      'Choose Write, Explain, or Fix for the formula-sized task.',
      'Paste the formula, headers, sample rows, or expected result so the answer has context.',
      'Review the formula read-through and paste checks before copying it into the sheet.'
    ],
    copyChecks: [
      'Use FormulaPilot or another formula hub if you want a free no-signup generator, formula checker, Google Sheets generator, function references, error references, learning pages, and browsable category libraries.',
      'Use Write My Formula when the work can be inspected as one formula, one rule, or one repair.',
      'FormulaPilot details verified June 6, 2026; test the output on one known row before filling it through an important workbook.'
    ],
    extraDetailCards: [
      {
        title: 'Where FormulaPilot fits',
        html: 'FormulaPilot currently presents a free no-signup AI Excel and Google Sheets formula generator, a formula checker, a Google Sheets generator, function references, an error reference, learning pages, and a formula library organized by categories such as Date & Time, Math & Statistics, Financial, Array Formulas, Data Cleaning, Text Manipulation, Conditional Logic, and Lookup & Reference. Use that kind of hub when you want to browse and learn around the formula. Use Write My Formula when the immediate task is one formula you can paste, read, and test.'
      }
    ]
  },
  {
    slug: 'formulagenius-alternative',
    title: 'FormulaGenius Alternative for One Formula Problem | Write My Formula',
    description: 'A focused FormulaGenius alternative for writing, explaining, or fixing one Excel or Google Sheets formula with two guest tries before signup.',
    eyebrow: 'FormulaGenius alternative',
    h1: 'A FormulaGenius alternative for one formula problem.',
    lede: 'Use Write My Formula when you came here with one Excel or Google Sheets formula to write, explain, or fix, and you want two guest tries with range notes and paste checks before choosing a longer-term formula tool.',
    preset: {
      mode: 'fix',
      platform: 'excel',
      formula: '=SUMIFS($D$2:$D$500,$B$2:$B$500,"West",$C$2:$C$500,">=6/1/2026")'
    },
    intent: 'Help spreadsheet users comparing FormulaGenius-style AI formula generators choose a narrow formula workbench when the immediate problem is one Excel or Google Sheets formula, one explanation, or one repair.',
    bestFor: [
      'Trying two formula-sized requests before creating an account or choosing a monthly formula tool.',
      'Fixing, writing, or explaining one Excel or Google Sheets formula with the touched ranges visible.',
      'Lookup, summary, IF, text, date, conditional-formatting, and data-cleaning formulas where paste checks matter.'
    ],
    steps: [
      'Choose Write, Explain, or Fix for the formula-sized task.',
      'Paste the broken formula, headers, sample rows, or expected result so the answer has context.',
      'Review the range notes and paste checks before using the formula in the sheet.'
    ],
    copyChecks: [
      'Use FormulaGenius or another formula library if you want a broader formula-example catalog, history, favorites, a Chrome extension, or unlimited formula volume.',
      'Use Write My Formula when the work can be inspected as one formula, one rule, or one repair.',
      'Test the output on one known row before filling it through an important workbook.'
    ]
  },
  {
    slug: 'formulaza-alternative',
    title: 'FormulaZa Alternative for One Formula Problem | Write My Formula',
    description: 'A focused FormulaZa alternative for writing, explaining, or fixing one Excel or Google Sheets formula without choosing a broader learning, history, translator, or chat workflow.',
    eyebrow: 'FormulaZa alternative',
    h1: 'A FormulaZa alternative for one formula problem.',
    lede: 'Use Write My Formula when the job is one Excel or Google Sheets formula, explanation, or repair, and you do not need a formula library, daily quiz, saved history, Excel-to-Sheets translator, AI chat, or a broader learning resource.',
    preset: {
      mode: 'write',
      platform: 'sheets',
      task: 'Write a formula that extracts the email domain and leaves blank rows blank.',
      table: 'Email,Status\nmara@example.com,Active\n,Pending\nsam@northwind.co,Active',
      range: 'Email in A2:A500; result in C2',
      hint: 'REGEXEXTRACT'
    },
    intent: 'Help spreadsheet users comparing FormulaZa-style formula tools choose a narrow formula workbench when the immediate problem is one Excel or Google Sheets formula, one explanation, or one repair.',
    bestFor: [
      'Writing or fixing one Excel or Google Sheets formula with the relevant ranges visible.',
      'Explaining inherited formula logic before editing a shared report.',
      'Trying a focused formula helper when you do not need multi-language learning resources, saved formula history, an Excel-to-Sheets translator, or chat.'
    ],
    steps: [
      'Choose Write, Explain, or Fix for the formula-sized task.',
      'Paste the formula, headers, sample rows, or expected result so the answer has context.',
      'Review the range notes and paste checks before using the formula in the workbook.'
    ],
    copyChecks: [
      'Use FormulaZa or another broader learning tool if you want 50 free formulas per day, formula history, a formula library, daily quiz, translator, chat, or course/resource browsing.',
      'Use Write My Formula when the work can be inspected as one formula, one rule, or one repair.',
      'Test the output on one known row before filling it through an important workbook.'
    ]
  },
  {
    slug: 'excelly-ai-alternative',
    title: 'Excelly-AI Alternative for One Formula Problem | Write My Formula',
    description: 'A focused Excelly-AI alternative for writing, explaining, or fixing one Excel or Google Sheets formula without opening a team, upload, VBA, or conversion workflow.',
    eyebrow: 'Excelly-AI alternative',
    h1: 'An Excelly-AI alternative for one formula problem.',
    lede: 'Use Write My Formula when the job is one Excel or Google Sheets formula, explanation, or repair, and you do not need spreadsheet upload, Slack team workflows, VBA generation, or formula conversion between platforms.',
    preset: {
      mode: 'write',
      platform: 'excel',
      task: 'Write a formula that returns the latest paid invoice amount for the customer in E2.',
      table: 'Customer,Invoice Date,Status,Amount\nAcme,2026-05-04,Paid,1200\nAcme,2026-06-01,Open,850\nNorthwind,2026-06-03,Paid,640',
      range: 'Customer in A2:A500; invoice date in B2:B500; status in C2:C500; amount in D2:D500; lookup customer in E2',
      hint: 'XLOOKUP'
    },
    intent: 'Help spreadsheet users comparing Excelly-AI-style formula tools choose a narrow formula workbench when the immediate problem is one Excel or Google Sheets formula, one explanation, or one repair.',
    bestFor: [
      'Writing or fixing one Excel or Google Sheets formula with the relevant ranges visible.',
      'Explaining inherited formula logic before editing a shared report.',
      'Trying a focused formula helper when you do not need uploaded workbook context, Slack access, VBA, or cross-platform formula conversion.'
    ],
    steps: [
      'Choose Write, Explain, or Fix for the formula-sized task.',
      'Paste the headers, sample rows, formula, or expected result so the answer has context.',
      'Review the range notes and paste checks before using the formula in the workbook.'
    ],
    copyChecks: [
      'Use Excelly-AI or another broader spreadsheet formula tool when you need .xlsx upload, Slack or team workflows, VBA generation, or formula conversion between Excel and Google Sheets.',
      'Use Write My Formula when the work can be inspected as one formula, one rule, or one repair.',
      'Test the output on one known row before filling it through an important workbook.'
    ]
  },
  {
    slug: 'sheeter-alternative',
    title: 'Sheeter Alternative for One Formula Problem | Write My Formula',
    description: 'A focused Sheeter alternative for writing, explaining, or fixing one Excel or Google Sheets formula without opening an add-on or lifetime-plan workflow.',
    eyebrow: 'Sheeter alternative',
    h1: 'A Sheeter alternative for one formula problem.',
    lede: 'Use Write My Formula when the job is one Excel or Google Sheets formula, explanation, or repair, and you do not need an add-on, saved formula workspace, or lifetime formula-generator plan.',
    preset: {
      mode: 'fix',
      platform: 'excel',
      formula: '=FILTER(Sheet2!A:A,ISNUMBER(SEARCH("garden",Sheet2!A:A)))'
    },
    intent: 'Help spreadsheet users comparing Sheeter-style formula generators choose a narrow formula workbench when the immediate problem is one Excel or Google Sheets formula, one explanation, or one repair.',
    bestFor: [
      'Writing or fixing one Excel or Google Sheets formula with the relevant ranges visible.',
      'Explaining inherited formula logic before editing a shared report.',
      'Trying a focused formula helper when you do not need an add-on, saved formula library, or long-term formula-generator plan.'
    ],
    steps: [
      'Choose Write, Explain, or Fix for the formula-sized task.',
      'Paste the formula, headers, sample rows, or expected result so the answer has context.',
      'Review the range notes and paste checks before using the formula in the workbook.'
    ],
    copyChecks: [
      'Use Sheeter or another formula generator if you want an add-on, saved formulas, or a lifetime-plan workflow around repeated generation.',
      'Use Write My Formula when the work can be inspected as one formula, one rule, or one repair.',
      'Test the output on one known row before filling it through an important workbook.'
    ]
  },
  {
    slug: 'sheetsmart-alternative',
    title: 'SheetSmart Alternative for One Formula Problem | Write My Formula',
    description: 'A focused SheetSmart alternative for writing, explaining, or fixing one Excel or Google Sheets formula from a browser tab instead of a Google Sheets extension workflow.',
    eyebrow: 'SheetSmart alternative',
    h1: 'SheetSmart lives in Google Sheets. Write My Formula lives in your browser.',
    lede: 'Use Write My Formula when the job is one Excel or Google Sheets formula, explanation, or repair, and you want a browser-based workbench instead of a Chrome extension that works inside Google Sheets.',
    preset: {
      mode: 'write',
      platform: 'sheets',
      task: 'Write a formula that totals January sales in column B where the month label in column A is January.',
      table: 'Month,Sales\nJanuary,1200\nFebruary,850\nJanuary,640',
      range: 'Month in A2:A500; sales in B2:B500; result in E2',
      hint: 'SUMIF'
    },
    intent: 'Help spreadsheet users comparing SheetSmart-style Google Sheets formula assistants choose a narrow formula workbench when the immediate problem is one formula, one explanation, or one repair.',
    bestFor: [
      'Writing or fixing one formula from a browser tab when you are not working only inside Google Sheets.',
      'Explaining inherited Excel or Google Sheets formulas before editing a shared report.',
      'Trying a focused formula helper when you do not need an installed Sheets extension, direct formula insertion, header/context reading, formula history, or favorites.'
    ],
    steps: [
      'Choose Write, Explain, or Fix for the formula-sized task.',
      'Paste the headers, sample rows, formula, or expected result so the answer has context.',
      'Review the range notes and paste checks, then copy the formula into the workbook yourself.'
    ],
    copyChecks: [
      'Use SheetSmart or another Google Sheets extension if you want formula help inside the sheet, column-header context reading, direct insertion, history, favorites, or a higher-volume Sheets-only workflow.',
      'Use Write My Formula when the work can be inspected as one formula, one rule, or one repair in a browser tab.',
      'Test the output on one known row before filling it through an important workbook.'
    ]
  },
  {
    slug: 'smart-excel-alternative',
    title: 'Smart Excel Alternative for One Formula Problem | Write My Formula',
    description: 'A focused Smart Excel alternative for writing, explaining, or fixing one Excel or Google Sheets formula from a browser tab before choosing a login-based formula bot with daily credits.',
    eyebrow: 'Smart Excel alternative',
    h1: 'Looking at Smart Excel? If you just need one formula right now, try this first.',
    lede: 'Smart Excel is an AI formula generator behind a login and a daily credit count. Write My Formula is a browser workbench for one formula at a time: describe what you need, get a formula and a plain-English explanation, then paste it into your sheet yourself. No account for the first two tries.',
    preset: {
      mode: 'write',
      platform: 'excel',
      task: 'Write a formula that totals paid invoices from June 2026 for the West region.',
      table: 'Invoice Date,Region,Status,Amount\n2026-06-04,West,Paid,1200\n2026-06-09,East,Paid,850\n2026-06-15,West,Open,640',
      range: 'Dates in A2:A500; region in B2:B500; status in C2:C500; amount in D2:D500; result in G2',
      hint: 'SUMIFS'
    },
    intent: 'Help spreadsheet users comparing Smart Excel-style formula bots choose a narrow formula workbench when the immediate problem is one Excel or Google Sheets formula, one explanation, or one repair.',
    bestFor: [
      'Writing or fixing one formula when you want the formula, explanation, and paste checks visible before using it.',
      'Trying two formula requests from a browser tab before creating an account.',
      'Explaining inherited Excel or Google Sheets formula logic before editing a shared report.'
    ],
    steps: [
      'Describe the formula result you need, such as total paid West invoices from June.',
      'Paste the relevant headers, sample rows, target range, or broken formula.',
      'Review the explanation and checks, then copy the formula into Excel or Google Sheets yourself.'
    ],
    copyChecks: [
      'Use Smart Excel or another daily-credit formula bot if you want a login-based Excel formula workflow, language selection, daily credits, or one-time credit packs.',
      'Use Write My Formula when the work can be inspected as one formula, one rule, or one repair in a browser tab.',
      'Smart Excel details verified June 6, 2026; test the output on one known row before filling it through an important workbook.'
    ],
    extraDetailCards: [
      {
        title: 'Where Smart Excel fits',
        html: 'Smart Excel currently presents itself as an AI Excel formula bot. Its public page asks users to describe the Excel formula they want, includes language selection, and shows output available after logging in. Its upgrade section lists a Free plan with 10 free credits per day and optional credit purchases, Premium at $4.99/month with up to 500 credits per day and early access, and a $0.99 one-time pack with 100 credits valid for 7 days.'
      }
    ]
  },
  {
    slug: 'sourcetable-alternative',
    title: 'Sourcetable Alternative for One Formula Problem | Write My Formula',
    description: 'A focused Sourcetable alternative for writing, explaining, or fixing one Excel or Google Sheets formula before choosing a broader AI spreadsheet, upload, SQL, Python, connector, chart, or data-analysis workspace.',
    eyebrow: 'Sourcetable alternative',
    h1: 'A Sourcetable alternative for one formula problem.',
    lede: 'Use Write My Formula when the job is one Excel or Google Sheets formula, explanation, or repair in the sheet you already use. Use Sourcetable or another AI spreadsheet workspace when you need uploads, data chat, pivots, charts, SQL, Python, connectors, or workbook-level analysis.',
    preset: {
      mode: 'fix',
      platform: 'excel',
      formula: '=IFERROR(XLOOKUP(F2,$A$2:$A$500,$D$2:$D$500),"")'
    },
    intent: 'Help spreadsheet users comparing Sourcetable-style AI spreadsheet platforms choose a narrow formula workbench when the immediate problem is one formula, one explanation, or one repair.',
    bestFor: [
      'Writing or fixing one Excel or Google Sheets formula with the touched ranges visible.',
      'Explaining inherited formula logic before editing a shared report.',
      'Trying a focused formula helper when you do not need file upload, data chat, pivots, charts, SQL, Python, connectors, or workbook-level analysis.'
    ],
    steps: [
      'Choose Write, Explain, or Fix for the formula-sized task.',
      'Paste the formula, headers, sample rows, or expected result so the answer has context.',
      'Review the range notes and paste checks before using the formula in the workbook.'
    ],
    copyChecks: [
      'Use Sourcetable or another AI spreadsheet workspace if you need to upload files, chat with data, generate charts, clean data, use SQL or Python, connect databases or apps, or analyze a workbook across tabs.',
      'Use Write My Formula when the work can be inspected as one formula, one rule, or one repair.',
      'Sourcetable details verified June 5, 2026; test the output on one known row before filling it through an important workbook.'
    ],
    extraDetailCards: [
      {
        title: 'Where Sourcetable fits',
        html: 'Sourcetable currently presents itself as an AI spreadsheet for data analysis. Its pricing page lists a free Regular plan with limited daily credits and AI spreadsheet assistant features, smart formulas, pivots, charts, visualizations, magic autofill, AI research, template generation, data cleaning, and transforms. Pro is listed at $29/user/month with premium AI, Python and data science tools, SQL editor and query builder, and up to 3 data connectors; Max is listed at $100/user/month with advanced agent capabilities and unlimited data connectors subject to guardrails. Its FAQ describes spreadsheet upload and chat, support for .xls, .xlsx, .csv, .tsv, PDF, JSON, and database data, multiple-tab analysis, visualizations, Python, SQL, and A1 formula-style references.'
      }
    ]
  },
  {
    slug: 'arcwise-alternative',
    title: 'Arcwise Alternative for One Formula Problem | Write My Formula',
    description: 'A focused Arcwise alternative for writing, explaining, or fixing one Excel or Google Sheets formula before choosing an in-Sheets AI analyst, connected-data, PDF-ingestion, ARCQUERY, or GPT-function workflow.',
    eyebrow: 'Arcwise alternative',
    h1: 'An Arcwise alternative for one formula problem.',
    lede: 'Arcwise and AI Copilot for Sheets are built for AI analysis and reporting inside Google Sheets. Use Write My Formula when the job is smaller: one Excel or Google Sheets formula, explanation, or repair in a browser tab, with the range notes and paste checks visible before you copy anything back into the sheet.',
    preset: {
      mode: 'fix',
      platform: 'sheets',
      formula: '=ARRAYFORMULA(IF(A2:A="","",VLOOKUP(A2:A,Prices!A:B,2,FALSE)))'
    },
    intent: 'Help spreadsheet users comparing Arcwise-style AI spreadsheet assistants choose a narrow formula workbench when the immediate problem is one formula, one explanation, or one repair rather than an in-Sheets AI analyst or connected-data workflow.',
    bestFor: [
      'Writing or fixing one Excel or Google Sheets formula without installing a Chrome extension first.',
      'Explaining inherited formula logic before editing a shared report.',
      'Trying a focused formula helper when you do not need connected data, PDF table extraction, pivots, graphs, reports, ARCQUERY, or AI functions inside sheet cells.'
    ],
    steps: [
      'Choose Write, Explain, or Fix for the formula-sized task.',
      'Paste the formula, headers, sample rows, expected result, or target range.',
      'Review the explanation and checks, then copy the formula into Excel or Google Sheets yourself.'
    ],
    copyChecks: [
      'Use Arcwise or another in-Sheets AI analyst when you want connected data, large-data formulas, pivots, graphs, auto-generated insights, PDF ingestion, ARCQUERY, GPT formulas, or AI functions that live inside Google Sheets.',
      'Use Write My Formula when the work can be inspected as one formula, one rule, or one repair in a browser tab.',
      'Arcwise details verified June 6, 2026; test the output on one known row before filling it through an important workbook.'
    ],
    extraDetailCards: [
      {
        title: 'Where Arcwise fits',
        html: 'Arcwise currently describes itself as an AI-first data analysis and reporting platform deeply integrated with Google Sheets. Its docs describe connecting data from data warehouses and other tools, working with large data, using AI Analyst in Sheets, formulas that can execute on full connected datasets in the database, manual refresh behavior for Arcwise formula cells, GPT formulas that require the Chrome extension and sheet permissions, and ARCQUERY for inline SQL. The Chrome Web Store listing for AI Copilot for Sheets by Arcwise shows 10,000 users, a 4.5 rating across 23 ratings, version 2.3.1 updated September 14, 2024, and features such as pivots, graphs, auto-generated insights, PDF table extraction, and AI.TRANSFORM, AI.CLASSIFY, and AI.EXTRACT functions.'
      }
    ]
  },
  {
    slug: 'bricks-ai-spreadsheet-alternative',
    title: 'Bricks AI Spreadsheet Alternative for One Formula Problem | Write My Formula',
    description: 'A focused Bricks AI spreadsheet alternative for writing, explaining, or fixing one Excel or Google Sheets formula before choosing a full AI spreadsheet, dashboard, chart, report, upload, or collaboration workspace.',
    eyebrow: 'Bricks AI spreadsheet alternative',
    h1: 'A Bricks alternative for one formula problem.',
    lede: 'Bricks is built for AI spreadsheet work across data, dashboards, charts, reports, and collaboration. Use Write My Formula when the job is smaller: one Excel or Google Sheets formula, explanation, or repair in a browser tab, with range notes and paste checks visible before you copy anything back into the sheet.',
    preset: {
      mode: 'fix',
      platform: 'excel',
      formula: '=SUMIFS(D2:D500,B2:B500,"West",C2:C500,"Paid")'
    },
    intent: 'Help spreadsheet users comparing Bricks-style AI spreadsheet workspaces choose a narrow formula workbench when the immediate problem is one formula, one explanation, or one repair rather than a whole-sheet AI workspace.',
    bestFor: [
      'Writing or fixing one Excel or Google Sheets formula without importing a file first.',
      'Explaining inherited formula logic before editing a shared workbook.',
      'Trying a focused formula helper when you do not need dashboards, charts, report generation, data cleaning, upload, templates, slides, or real-time collaboration.'
    ],
    steps: [
      'Choose Write, Explain, or Fix for the formula-sized task.',
      'Paste the formula, headers, sample rows, expected result, or target range.',
      'Review the explanation and checks, then copy the formula into Excel or Google Sheets yourself.'
    ],
    copyChecks: [
      'Use Bricks or another AI spreadsheet workspace when you want file import, data cleaning, row analysis, dashboards, charts, reports, slides, templates, real-time collaboration, or AI changes inside a spreadsheet grid.',
      'Use Write My Formula when the work can be inspected as one formula, one rule, or one repair in a browser tab.',
      'Bricks details verified June 6, 2026; test the output on one known row before filling it through an important workbook.'
    ],
    extraDetailCards: [
      {
        title: 'Where Bricks fits',
        html: 'Bricks currently presents itself as an AI spreadsheet and AI data analyst for organizing data, creating dashboards, reports, charts, and presentations, and collaborating in one workspace. Its public AI spreadsheet page describes analyzing data, performing calculations, formatting and cleaning data, automating lookups, creating charts and dashboards, importing Excel or CSV files, exporting data, using traditional formulas and functions, templates, mobile/web access, and real-time collaboration. Its docs describe AI Chat for Grid and Board work, including row analysis, data cleaning, formatting, formulas, conditional formatting, sorting, filtering, duplicate removal, structured-data reports, and Excel-style formula generation from natural-language prompts.'
      }
    ]
  },
  {
    slug: 'excelformula-pro-alternative',
    title: 'ExcelFormula Pro Alternative for One Formula Problem | Write My Formula',
    description: 'A focused ExcelFormula Pro alternative for writing, explaining, or fixing one Excel or Google Sheets formula before choosing an account-based formula generator with history and a monthly plan.',
    eyebrow: 'ExcelFormula Pro alternative',
    h1: 'An ExcelFormula Pro alternative for one formula at a time.',
    lede: 'ExcelFormula Pro and Write My Formula both sit in the AI spreadsheet-formula category. Use Write My Formula when the job is one Excel or Google Sheets formula, explanation, or repair from a browser tab. Use ExcelFormula Pro or another account-based formula generator when you want formula history, LibreOffice Calc support, a recurring plan, or a higher-volume formula workflow.',
    preset: {
      mode: 'write',
      platform: 'excel',
      task: 'Write a formula that totals paid invoices for the West region in July 2026.',
      table: 'Invoice Date,Region,Status,Amount\n2026-07-04,West,Paid,1200\n2026-07-09,East,Paid,850\n2026-07-15,West,Open,640',
      range: 'Dates in A2:A500; region in B2:B500; status in C2:C500; amount in D2:D500; result in G2',
      hint: 'SUMIFS'
    },
    intent: 'Help spreadsheet users comparing ExcelFormula Pro-style AI formula generators choose a narrow formula workbench when the immediate problem is one Excel or Google Sheets formula, one explanation, or one repair.',
    bestFor: [
      'Writing or fixing one formula with the relevant rows, columns, ranges, and expected result visible.',
      'Trying two formula requests from a browser tab before adding email access or upgrading.',
      'Explaining inherited Excel or Google Sheets formula logic before editing a shared report.'
    ],
    steps: [
      'Choose Write, Explain, or Fix for the formula-sized task.',
      'Paste the headers, sample rows, target range, broken formula, or expected result.',
      'Review the explanation and checks, then copy the formula into Excel or Google Sheets yourself.'
    ],
    copyChecks: [
      'Use ExcelFormula Pro or another account-based generator if you want LibreOffice Calc support, formula history, priority support, no ads, yearly billing, or a higher-volume monthly formula plan.',
      'Use Write My Formula when the work can be inspected as one formula, one rule, or one repair in a browser tab.',
      'ExcelFormula Pro details verified June 6, 2026; test the output on one known row before filling it through an important workbook.'
    ],
    extraDetailCards: [
      {
        title: 'Where ExcelFormula Pro fits',
        html: 'ExcelFormula Pro currently presents itself as an AI-powered formula generator for Excel, LibreOffice Calc, and Google Sheets. Its public homepage highlights detailed explanations, copy-to-clipboard usage, mobile-friendly access, 10K+ formulas generated, 2 free trial formulas, and a $15/month Pro plan. Its pricing page lists a Free plan with 2 free formulas total, Basic AI model, copy to clipboard, formula history, and priority support; Pro Monthly at $15/month with unlimited formulas, an advanced AI model, full formula history, priority support, and no ads; and Pro Yearly at $79/year.'
      }
    ]
  },
  {
    slug: 'excelformula-co-alternative',
    title: 'ExcelFormula.co Alternative for One Formula Problem | Write My Formula',
    description: 'A focused ExcelFormula.co alternative for writing, explaining, or fixing one Excel or Google Sheets formula before choosing a daily-cap Excel formula generator with saved-history features.',
    eyebrow: 'ExcelFormula.co alternative',
    h1: 'An ExcelFormula.co alternative for one formula session.',
    lede: 'ExcelFormula.co is an AI-powered Excel formula generator with a free daily formula allowance and a $5/month Pro plan. Use Write My Formula when the job is one Excel or Google Sheets formula, explanation, or repair from a browser tab, especially when you want two no-account tries before choosing email access or founding access.',
    preset: {
      mode: 'write',
      platform: 'excel',
      task: 'Write a formula that labels invoices paid in August 2026 for Product A.',
      table: 'Invoice Date,Product,Status,Amount\n2026-08-04,Product A,Paid,1200\n2026-08-09,Product B,Paid,850\n2026-08-15,Product A,Open,640',
      range: 'Dates in A2:A500; product in B2:B500; status in C2:C500; result in E2',
      hint: 'IF'
    },
    intent: 'Help spreadsheet users comparing ExcelFormula.co-style AI formula generators choose a narrow formula workbench when the immediate problem is one Excel or Google Sheets formula, one explanation, or one repair.',
    bestFor: [
      'Working through a cluster of formula questions in one sitting rather than spreading every request across a daily free allowance.',
      'Writing or fixing one formula with the relevant columns, sample rows, and expected result visible.',
      'Trying two formula requests from a browser tab before adding email access or upgrading.',
      'Explaining inherited Excel or Google Sheets formula logic before editing a shared report.',
      'Choosing a defined founding-access monthly run limit when a project needs more than a few formula attempts.'
    ],
    steps: [
      'Choose Write, Explain, or Fix for the formula-sized task.',
      'Paste the headers, sample rows, target range, broken formula, or expected result.',
      'Review the explanation and checks, then copy the formula into Excel or Google Sheets yourself.'
    ],
    copyChecks: [
      'Use ExcelFormula.co or another Excel formula generator if you want 5 free formulas per day, formula history, priority support, saved favorites, or a $5/month unlimited-formula plan.',
      'Use Write My Formula when the work can be inspected as one formula, one rule, or one repair in a browser tab.',
      'ExcelFormula.co details verified June 6, 2026; test the output on one known row before filling it through an important workbook.'
    ],
    extraDetailCards: [
      {
        title: 'Where ExcelFormula.co fits',
        html: 'ExcelFormula.co currently presents itself as an AI-powered Excel formula generator. Its public page says users can describe an Excel problem in plain English, get a generated formula with an explanation, and use popular formula patterns such as VLOOKUP, SUMIF, INDEX MATCH, IF, COUNTIF, and XLOOKUP. Its pricing section lists a Free plan with 5 formulas per day, formula explanations, and no signup required, plus a Pro plan at $5/month with unlimited formulas, formula history, priority support, and saved favorite formulas. Its FAQ says it supports modern Excel versions including Excel 2016, 2019, 2021, Excel 365, and Google Sheets.'
      }
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
    slug: 'excel-formula-parse-error',
    title: 'Fix "There is a Problem With This Formula" | Write My Formula',
    description: 'Paste the formula Excel rejected and describe what it should calculate. Get a repair path for separators, quotes, parentheses, and equal signs.',
    eyebrow: 'Excel formula parse error',
    h1: 'Excel says "There is a problem with this formula." Paste it here.',
    lede: 'Excel can reject a formula before it ever calculates when a separator, quote, parenthesis, or equal sign is wrong. Paste the formula and tell us in one line what it should calculate. You get a written repair path for the syntax Excel cannot read.',
    preset: {
      mode: 'fix',
      platform: 'excel',
      formula: '=IF(A2="Open",SUM(B2:D2),"")'
    },
    intent: 'Help Excel users repair one formula that Excel refuses to enter because the syntax cannot be parsed, often after copying a formula from a tutorial, another locale, an AI answer, or another workbook.',
    bestFor: [
      'Formulas that trigger Excel\'s "There is a problem with this formula" or "We found a problem with this formula" message before a cell result appears.',
      'Comma versus semicolon separators that do not match your Excel locale.',
      'Copied formulas where curly quotes, smart apostrophes, or pasted line breaks make valid-looking logic fail.',
      'Nested IF, SUMIFS, XLOOKUP, FILTER, LET, or LAMBDA formulas where one missing parenthesis, quote, or argument separator blocks entry.',
      'Cells where Excel treats the entry as text or asks whether you are trying to type a formula because the equal sign, apostrophe, or cell format is wrong.'
    ],
    steps: [
      'Paste the exact formula Excel rejected, including the punctuation.',
      'Say whether the formula was copied from a website, another Excel locale, Google Sheets, or an AI answer.',
      'Add one sentence about the result you expected so the repair can preserve the intended logic.'
    ],
    copyChecks: [
      'Check whether your Excel locale expects commas or semicolons between function arguments.',
      'Replace curly quotes and copied smart apostrophes with plain straight quotes before changing the formula logic.',
      'Count opening and closing parentheses around nested IF, SUMIFS, FILTER, LET, and LAMBDA sections.',
      'Start the formula with an equal sign unless you intentionally want Excel to store it as text.',
      'Test the repaired formula in one blank cell before replacing a formula in a live report.'
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
    slug: 'google-sheets-ref-error',
    title: 'Fix #REF! Errors in Google Sheets | Write My Formula',
    description: 'Fix Google Sheets #REF! errors from deleted tabs, invalid ranges, moved references, IMPORTRANGE access, blocked arrays, or broken INDIRECT strings.',
    eyebrow: 'Google Sheets #REF! error',
    h1: 'Fix a #REF! error in Google Sheets.',
    lede: 'Paste the broken formula, describe what the sheet was supposed to return, and get a focused repair path for invalid references, deleted tabs or ranges, moved lookup ranges, IMPORTRANGE references, blocked array output, and INDIRECT strings that no longer point anywhere valid.',
    preset: {
      mode: 'fix',
      platform: 'sheets',
      formula: '=SUM(Archive!B2:B500)'
    },
    intent: 'Help Google Sheets users repair one formula returning #REF! after a referenced row, column, tab, source range, spill area, imported range, or text-built reference stops being valid.',
    bestFor: [
      'Formulas that broke after someone deleted or renamed a tab, row, column, or source range.',
      'Lookup, summary, and cross-sheet formulas where the reference path no longer points at the intended data.',
      'IMPORTRANGE formulas where the source range, permission prompt, or source access needs to be separated from the formula shape.',
      'ARRAYFORMULA, FILTER, or QUERY outputs that show #REF! because the result cannot expand into occupied cells.',
      'INDIRECT formulas where a text-built sheet or range name no longer resolves to a valid reference.'
    ],
    steps: [
      'Paste the exact formula that returns #REF!, including any missing-reference tokens Sheets shows.',
      'Describe the intended source sheet, range, lookup table, import, or output area.',
      'Mention what changed recently, such as a deleted tab, moved column, renamed sheet, new import, or blocked spill range.'
    ],
    copyChecks: [
      'Replace the broken reference with the current sheet, range, or tab before wrapping the formula in IFERROR.',
      'Confirm whether IMPORTRANGE is waiting for access, pointing at a missing source range, or importing more data than the formula needs.',
      'Clear the intended spill area before rewriting an array formula that is blocked by existing cells.',
      'Check that INDIRECT text creates a real A1-style reference after sheet names, spaces, and quotes are handled.',
      'Test the repaired formula on one small range before filling it through a shared sheet.'
    ]
  },
  {
    slug: 'google-sheets-value-error',
    title: 'Google Sheets #VALUE! Error Fixer | Write My Formula',
    description: 'Fix Google Sheets #VALUE! errors caused by text where numbers are expected, unparseable VALUE inputs, date text, array ranges, and wrong argument types.',
    eyebrow: 'Google Sheets #VALUE! error fixer',
    h1: 'Fix a Google Sheets #VALUE! error without hiding the bad input.',
    lede: 'Paste the formula returning #VALUE!, describe what the cell should calculate, and get a focused repair path for text-stored numbers, date text, VALUE conversion, range shapes, and wrong argument types.',
    preset: {
      mode: 'fix',
      platform: 'sheets',
      formula: '=ARRAYFORMULA(VALUE(REGEXREPLACE(B2:B,"[$,]",""))*C2:C)'
    },
    intent: 'Help Google Sheets users repair one formula returning #VALUE! when the formula receives text, date text, a range shape, or another value type it cannot use in the calculation.',
    bestFor: [
      'Imported amounts, percentages, or dates that look right in the grid but are stored as text.',
      'VALUE formulas that say the parameter cannot be parsed as a number.',
      'ARRAYFORMULA, math, lookup, date, or text formulas that fail after source data changes type.'
    ],
    steps: [
      'Paste the exact formula returning #VALUE!.',
      'Add one source value that should calculate and one source value that currently breaks.',
      'Describe whether the source data came from a CSV, form response, import, pasted report, or another formula.'
    ],
    copyChecks: [
      'Convert only the cells that should be numeric or date values instead of wrapping the whole formula in IFERROR first.',
      'Remove currency symbols, commas, extra spaces, and labels before VALUE tries to parse imported numbers.',
      'Check whether dates are real date values or text strings before comparing or subtracting them.',
      'Test the repaired formula on one known row before filling it through a shared sheet.'
    ]
  },
  {
    slug: 'google-sheets-na-error',
    title: 'Google Sheets #N/A Error Fixer | Write My Formula',
    description: 'Fix Google Sheets #N/A errors from missing lookup matches, no-match FILTER results, text-number mismatches, hidden spaces, and fallback mistakes.',
    eyebrow: 'Google Sheets #N/A error fixer',
    h1: 'Fix a Google Sheets #N/A error before you hide it.',
    lede: 'Paste the formula returning #N/A, add what should have matched, and get a focused repair path for lookup keys, FILTER no-match cases, stored text versus numbers, hidden spaces, range choices, and IFNA fallbacks.',
    preset: {
      mode: 'fix',
      platform: 'sheets',
      formula: '=IFNA(VLOOKUP(E2,A2:D500,4,FALSE),"Not found")'
    },
    intent: 'Help Google Sheets users repair one formula returning #N/A when a lookup, FILTER, MATCH, XLOOKUP, VLOOKUP, or imported value does not match the source data the way the sheet author expects.',
    bestFor: [
      'Lookup formulas that return #N/A even though the value appears to exist in the source table.',
      'FILTER formulas that show no matches when at least one row should pass the conditions.',
      'Imported IDs, dates, or numbers that look equal but are stored as different types.',
      'Cells with hidden spaces, inconsistent capitalization, or copied values that prevent an exact match.',
      'IFNA or IFERROR fallbacks that may be hiding a real missing-match problem too early.'
    ],
    steps: [
      'Paste the exact formula returning #N/A.',
      'Add one lookup value, filter condition, or row that should match.',
      'Include the relevant source headers and say whether a true missing match should stay #N/A, return blank, or show a message.'
    ],
    copyChecks: [
      'Confirm the lookup or filter source range includes the row or column you expect to match.',
      'Check whether the source value and lookup value are both text, both numbers, or both real dates.',
      'Clean hidden spaces with TRIM only after confirming spaces are not meaningful in the source data.',
      'Use IFNA for expected missing matches instead of wrapping every formula problem in IFERROR.',
      'Test one known match and one true missing value before filling the repaired formula through a shared sheet.'
    ]
  },
  {
    slug: 'google-sheets-div0-error',
    title: 'Google Sheets #DIV/0! Error Fixer | Write My Formula',
    description: 'Fix Google Sheets #DIV/0! errors caused by zero or blank denominators, ratio formulas, averages, percentages, and broad IFERROR fallbacks.',
    eyebrow: 'Google Sheets #DIV/0! error fixer',
    h1: 'Fix #DIV/0! in Google Sheets without hiding the wrong error.',
    lede: 'Paste the formula that is dividing by zero or a blank cell, describe what the result should mean, and get a focused repair path for denominators, ratios, averages, percentages, and IFERROR fallbacks that should not cover every possible error.',
    preset: {
      mode: 'fix',
      platform: 'sheets',
      formula: '=B2/C2'
    },
    intent: 'Help Google Sheets users repair one formula returning #DIV/0! by checking whether the divisor is zero, blank, calculated from another formula, or being hidden too broadly with IFERROR.',
    bestFor: [
      'Ratio, percentage, rate, and margin formulas that divide by a blank or zero denominator.',
      'AVERAGE, weighted-average, and report formulas that show #DIV/0! before enough source data exists.',
      'Formulas where IFERROR may be useful, but only after the denominator and other referenced errors are understood.',
      'Shared sheets where a blank result, 0, #N/A, or an input-needed message needs to be chosen deliberately.'
    ],
    steps: [
      'Paste the exact formula returning #DIV/0!.',
      'Describe what should happen when the denominator is zero, blank, or waiting for future data.',
      'Include one source row where the division should work and one row where the denominator is missing or zero.'
    ],
    copyChecks: [
      'Check whether the divisor is a true zero, a blank cell, text, or another formula returning an empty-looking value.',
      'Decide whether a zero denominator should return blank, 0, #N/A, or a clear message before adding a fallback.',
      'Use IF to test the denominator directly when only division-by-zero should be handled.',
      'Use IFERROR carefully because it can also hide #VALUE!, #REF!, #N/A, parse errors, or other formula problems.',
      'Test the repaired formula on one valid denominator and one zero or blank denominator before filling it through a shared sheet.'
    ]
  },
  {
    slug: 'google-sheets-num-error',
    title: 'Google Sheets #NUM! Error Fixer | Write My Formula',
    description: 'Fix Google Sheets #NUM! errors caused by invalid numeric inputs, impossible math, oversized results, XIRR or RATE failures, and out-of-range row choices.',
    eyebrow: 'Google Sheets #NUM! error fixer',
    h1: 'Fix a Google Sheets #NUM! error by checking the number Sheets cannot use.',
    lede: '#NUM! usually means the formula is asking Google Sheets to calculate with a number it cannot accept: an impossible math input, a result that is too large, a financial function that cannot settle on a rate, or an index number outside the available rows. Paste the formula and one input that triggers the error to get a focused repair path.',
    preset: {
      mode: 'fix',
      platform: 'sheets',
      formula: '=XIRR(B2:B12,A2:A12)'
    },
    intent: 'Help Google Sheets users repair one formula returning #NUM! by identifying whether the failure comes from invalid numeric inputs, a non-converging financial function, a number outside supported limits, or an out-of-range position argument.',
    bestFor: [
      'XIRR, IRR, RATE, or similar formulas that return #NUM! because the inputs cannot produce a valid result.',
      'Math formulas where a negative, zero, or extreme value is invalid for the function being used.',
      'INDEX, random-pick, or row-number formulas where the requested position is outside the source range.',
      'Imported numbers or dates that look usable but leave the numeric formula with bad inputs.'
    ],
    steps: [
      'Paste the exact Google Sheets formula returning #NUM!.',
      'Include one source value, date, row number, or cash-flow range that triggers the error.',
      'Say what result should be acceptable when the number is impossible, missing, or outside the source range.'
    ],
    copyChecks: [
      'Check whether a financial function has the required signs, dates, and inputs before hiding the error.',
      'Keep row, INDEX, RANDBETWEEN, and random-pick positions inside the size of the source range.',
      'Confirm negative, zero, or very large values are valid for the specific function being used.',
      'Convert imported dates and numbers before deciding the formula itself is broken.',
      'Use IFERROR only after choosing what a true invalid-number case should return.'
    ]
  },
  {
    slug: 'google-sheets-name-error',
    title: 'Google Sheets #NAME? Error Fixer | Write My Formula',
    description: 'Fix Google Sheets #NAME? and Unknown range name errors caused by misspelled functions, deleted named ranges, named functions, quoted text, or locale issues.',
    eyebrow: 'Google Sheets #NAME? error fixer',
    h1: 'Fix a Google Sheets #NAME? error at the name Sheets cannot read.',
    lede: 'When Google Sheets shows #NAME? or says Unknown range name, it usually cannot recognize a function name, named range, named function, unquoted text value, or copied reference. Paste the formula and the name Sheets is complaining about to get a focused repair path before you change a shared sheet.',
    preset: {
      mode: 'fix',
      platform: 'sheets',
      formula: '=SUM(My Range)'
    },
    intent: 'Help Google Sheets users repair one formula returning #NAME? or Unknown range name by finding the function, named range, named function, text label, or localized syntax that Sheets cannot interpret.',
    bestFor: [
      'Formulas with misspelled function names such as VLOKUP, SUMIFs, or an Excel-only function name that Sheets does not recognize.',
      'Named ranges that were deleted, renamed, scoped unexpectedly, or typed with spaces, hyphens, or A1-style names Sheets cannot use.',
      'Named functions that conflict with built-in function names, TRUE/FALSE, A1-style names, or placeholders that were pasted into a formula as real arguments.',
      'Copied formulas where a named range or named function did not come along with the destination spreadsheet.',
      'Formulas copied from another locale where the visible function name or separator style does not match the current Google Sheets file.'
    ],
    steps: [
      'Paste the exact formula returning #NAME? or the Unknown range name message.',
      'Add the named range, named function, or function name that Sheets highlights or mentions in the tooltip.',
      'Mention whether the formula was copied from Excel, another Google Sheet, a template, a different language, or a file where named ranges were edited.'
    ],
    copyChecks: [
      'Check every function name and named range for spelling differences before adding IFERROR.',
      'Use underscores instead of spaces or hyphens when a named range should be referenced directly in a formula.',
      'Confirm the named range still exists under Data, Named ranges, and that it points at the intended cells.',
      'Check named function names against built-in functions, TRUE, FALSE, and A1 or R1C1-style names.',
      'Wrap literal text criteria in quotes so Sheets does not read the text as an unknown range name.',
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
    slug: 'excel-date-formula-not-working',
    title: 'Excel Date Formula Not Working? | Write My Formula',
    description: 'Fix Excel date formulas with DATEVALUE #VALUE! errors, text dates, locale mismatches, serial numbers, DATEDIF issues, or date criteria failures.',
    eyebrow: 'Excel date formula repair',
    h1: 'Your Excel date formula is not working. Here is how to fix it.',
    lede: 'Most broken date formulas come down to one thing: Excel is not reading your dates as dates. The cell looks like 3/14/2025, but the formula sees text, shows a serial number like 45730, or reads the day and month in the wrong order. That is why DATEVALUE returns #VALUE!, why DATEDIF can return an error, and why SUMIFS, COUNTIFS, FILTER, and TODAY comparisons can quietly return the wrong answer. Paste the formula and one date value it is reading to get a focused repair path for that formula.',
    preset: {
      mode: 'fix',
      platform: 'excel',
      formula: '=DATEVALUE(A2)'
    },
    intent: 'Help Excel users repair one date formula where the visible problem is usually DATEVALUE failing on text, regional date-order ambiguity, serial-number display, DATEDIF or TODAY logic, hidden time values, or date criteria comparing text instead of real Excel dates.',
    bestFor: [
      'DATEVALUE formulas returning #VALUE! because the date text does not match the system date settings.',
      'Imported dates that look like dates but sort, filter, or calculate like text.',
      'Day/month order problems where 03/04 is read differently from the source report.',
      'DATEDIF, TODAY, SUMIFS, COUNTIFS, or FILTER formulas that miss rows, return negative-looking results, or calculate the wrong date interval.',
      'Cells showing date serial numbers where a formatted date should appear.'
    ],
    steps: [
      'Paste the exact formula and the date value or sample row it is reading.',
      'Add the visible error, wrong result, serial number, or row that should have matched.',
      'Say whether the dates came from a CSV, export, pasted report, form response, another workbook, or a typed value.'
    ],
    copyChecks: [
      'Check whether the source value is a real Excel date serial or text that only looks like a date.',
      'Confirm the system or workbook date order before deciding whether 03/04 means March 4 or April 3.',
      'Use DATE to build criteria boundaries when a report needs month, year, or between-date logic.',
      'Format converted serial numbers as dates before assuming the formula is still broken.',
      'Test date criteria against one known matching row before filling the formula through a report.'
    ]
  },
  {
    slug: 'excel-table-formula-not-working',
    title: 'Excel Table Formula Not Working? | Write My Formula',
    description: 'Fix Excel table formulas with broken structured references, calculated columns that do not fill, @ row references, or wrong table-column ranges.',
    eyebrow: 'Excel table formula repair',
    h1: 'Fix an Excel table formula that is not working.',
    lede: 'Excel tables use structured references, calculated columns, and @ row references that behave differently from normal A1 ranges. Paste the table formula that is misbehaving, describe the column it lives in, and get a focused repair path for table names, column headers, row context, copied formulas, and fill-down behavior.',
    preset: {
      mode: 'fix',
      platform: 'excel',
      formula: '=XLOOKUP([@SKU],Products[SKU],Products[Price],"Not found")'
    },
    intent: 'Help Excel users repair one table formula where the visible problem is usually a calculated column that stopped filling, a structured reference that points at the wrong table column, an @ this-row reference used outside its row context, or a formula copied in a way that changes column specifiers unexpectedly.',
    bestFor: [
      'Excel table formulas that do not fill into new rows or do not update the whole calculated column.',
      'Structured references with table names, column headers, special characters, or renamed columns that no longer match the workbook.',
      'Formulas where @ should read the current row but the copied formula returns the wrong row or a single value.',
      'Lookup, SUMIFS, COUNTIFS, IF, and calculated-column formulas that need table references checked before switching back to A1 ranges.'
    ],
    steps: [
      'Paste the exact formula from the Excel table column.',
      'Add the table name, relevant column headers, and whether the formula is inside the table or outside it.',
      'Describe what happens now: it does not fill, fills only some rows, uses plain cell references, returns the wrong row, or breaks after a column rename.'
    ],
    copyChecks: [
      'Confirm the source range is an actual Excel table, not a normal range formatted to look like one.',
      'Check whether the formula belongs inside the table, where unqualified structured references and @ row references are valid.',
      'Use the exact table and column names after any header rename, including brackets for headers with special characters.',
      'Check whether Excel calculated-column behavior is turned on before rewriting a valid formula that simply stopped filling.',
      'Test the repaired formula in one table row and then confirm the calculated column uses the same formula in the rest of the column.'
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
    slug: 'excel-sumproduct-not-working',
    title: 'Excel SUMPRODUCT Not Working Fixer | Write My Formula',
    description: 'Fix Excel SUMPRODUCT formulas that return #VALUE!, 0, or wrong totals because of array sizes, text numbers, hidden spaces, errors, or full-column references.',
    eyebrow: 'Excel SUMPRODUCT fixer',
    h1: 'Fix an Excel SUMPRODUCT formula that is not working.',
    lede: 'Paste the SUMPRODUCT formula that returns #VALUE!, 0, or the wrong total, add what the formula should multiply and sum, and get a focused repair path for same-size arrays, imported text numbers, hidden spaces, errors inside arrays, and range references that do not line up.',
    preset: {
      mode: 'fix',
      platform: 'excel',
      formula: '=SUMPRODUCT((A2:A500="South")*(B2:B500="Open")*D2:D500)'
    },
    intent: 'Help Excel users repair one SUMPRODUCT formula where the visible problem is usually a #VALUE! error from mismatched array sizes, a zero result from criteria that never evaluate TRUE, text stored as numbers, hidden spaces, errors inside source ranges, or full-column references mixed with shorter arrays.',
    bestFor: [
      'SUMPRODUCT formulas that return #VALUE! after a range was copied, filtered, renamed, or changed to a table/named range.',
      'Weighted totals, conditional sums, and multi-criteria formulas that return 0 even though matching rows seem to exist.',
      'Imported data where amounts, dates, IDs, or criteria values look right but are stored as text or include hidden spaces.',
      'Older workbooks where SUMPRODUCT is used instead of newer FILTER, SUMIFS, or dynamic-array formulas.'
    ],
    steps: [
      'Paste the exact SUMPRODUCT formula and the value Excel currently returns.',
      'Add one row that should be included and one row that should be excluded.',
      'Include the size of each referenced range, especially if one reference is a full column or named range.'
    ],
    copyChecks: [
      'Make every array argument the same height and width before checking anything else.',
      'Check whether imported numbers, dates, or IDs are stored as text.',
      'Look for hidden spaces in criteria values when the formula returns 0.',
      'Decide whether errors inside the source ranges should be fixed, excluded, or handled deliberately.',
      'Avoid mixing full-column references with shorter arrays unless every array reference is written the same way.'
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
    slug: 'excel-textjoin-not-working',
    title: 'Excel TEXTJOIN Not Working Fixer | Write My Formula',
    description: 'Fix Excel TEXTJOIN formulas with #VALUE!, #NAME?, extra delimiters, blank joins, IF or FILTER array issues, line breaks, or version support problems.',
    eyebrow: 'Excel TEXTJOIN fixer',
    h1: 'Fix an Excel TEXTJOIN formula that is not working.',
    lede: 'Paste the TEXTJOIN formula that returns #VALUE!, #NAME?, extra separators, blank output, or a broken IF/FILTER join. Get a focused repair path for quoted delimiters, TRUE/FALSE empty handling, text ranges, line breaks, array criteria, version support, and Excel cell-length limits.',
    preset: {
      mode: 'fix',
      platform: 'excel',
      formula: '=TEXTJOIN(", ",TRUE,IF($A$2:$A$500=E2,$B$2:$B$500,""))'
    },
    intent: 'Help Excel users repair one TEXTJOIN formula where the visible problem is usually an unquoted delimiter, wrong ignore_empty setting, array criteria that need a compatible formula pattern, #NAME? from unsupported Excel versions, extra delimiters, hidden blanks, line-break formatting, or #VALUE! from Excel text-length limits.',
    bestFor: [
      'TEXTJOIN formulas that return #VALUE!, #NAME?, blank output, or separators with missing values between them.',
      'TEXTJOIN with IF or FILTER criteria where the formula should join only matching rows.',
      'Line-break joins using CHAR(10) where wrap-text, delimiter, or empty-cell behavior needs to be checked.',
      'Long joined text where Excel cell limits may be the real failure rather than the delimiter syntax.'
    ],
    steps: [
      'Paste the exact TEXTJOIN formula and the visible error or unwanted output.',
      'Add one source row that should be included and one row that should be ignored.',
      'Mention your Excel version if the error is #NAME? or the formula uses FILTER.'
    ],
    copyChecks: [
      'Put the delimiter in quotes, or point it at a cell that contains the delimiter text.',
      'Set ignore_empty deliberately to TRUE or FALSE instead of guessing from the output.',
      'Check whether the joined result is too long for one Excel cell before rewriting a formula that otherwise looks valid.',
      'Use CHAR(10) for line breaks and turn on Wrap Text before treating the formula as broken.',
      'Test any IF or FILTER criteria on a short range before filling it through a large report.'
    ]
  },
  {
    slug: 'excel-textbefore-textafter-not-working',
    title: 'Excel TEXTBEFORE / TEXTAFTER Not Working Fixer | Write My Formula',
    description: 'Fix Excel TEXTBEFORE and TEXTAFTER formulas with #N/A delimiter errors, #VALUE! instance issues, case matching, fallback arguments, or version support problems.',
    eyebrow: 'Excel TEXTBEFORE and TEXTAFTER fixer',
    h1: 'Fix a TEXTBEFORE or TEXTAFTER formula that is not extracting the right text.',
    lede: 'Paste the TEXTBEFORE or TEXTAFTER formula that returns #N/A, #VALUE!, #NAME?, the wrong piece of text, or a blank-looking fallback. Get a focused repair path for delimiters, instance numbers, case matching, match_end, if_not_found, and Excel version support.',
    preset: {
      mode: 'fix',
      platform: 'excel',
      formula: '=TEXTAFTER(A2,"@")'
    },
    intent: 'Help Excel users repair one TEXTBEFORE or TEXTAFTER formula where the visible problem is usually a delimiter that is not actually present, an instance number pointing at the wrong occurrence, case-sensitive matching, a fallback argument that hides the issue, or a workbook opened in an Excel version without the newer text functions.',
    bestFor: [
      'TEXTBEFORE formulas that return #N/A because the delimiter is missing, differently cased, or not the occurrence the formula is searching for.',
      'TEXTAFTER formulas that extract the wrong segment because instance_num, match_mode, or match_end is not set deliberately.',
      '#VALUE! errors caused by invalid instance numbers or formulas asking for an occurrence Excel cannot use.',
      '#NAME? or _xlfn behavior when the workbook is opened in an Excel version that does not support TEXTBEFORE or TEXTAFTER.',
      'Imported text where email domains, file names, IDs, or labels need a safer delimiter fallback.'
    ],
    steps: [
      'Paste the exact TEXTBEFORE or TEXTAFTER formula and one source text value.',
      'Say which part of the text should be returned and what Excel returns now.',
      'Mention whether the delimiter might be missing, repeated, differently cased, or coming from a copied export.'
    ],
    copyChecks: [
      'Match the delimiter exactly, including spaces, punctuation, line breaks, and case-sensitive text.',
      'Set instance_num deliberately when the delimiter appears more than once.',
      'Use match_mode only when case-insensitive matching is intended.',
      'Use if_not_found after checking whether a missing delimiter is normal or a data problem.',
      'Check Excel version support when the formula appears as #NAME? or _xlfn.TEXTAFTER.'
    ]
  },
  {
    slug: 'excel-textsplit-not-working',
    title: 'Excel TEXTSPLIT Not Working Fixer | Write My Formula',
    description: 'Fix Excel TEXTSPLIT formulas with #SPILL!, #N/A padding, wrong delimiters, row-versus-column split issues, or version support problems.',
    eyebrow: 'Excel TEXTSPLIT fixer',
    h1: 'Fix an Excel TEXTSPLIT formula that is not splitting text correctly.',
    lede: 'Paste the TEXTSPLIT formula that returns #SPILL!, fills extra #N/A cells, splits in the wrong direction, or leaves the text unchanged. Get a focused repair path for column delimiters, row delimiters, missing spaces, case matching, empty values, pad_with behavior, spill ranges, and Excel version support.',
    preset: {
      mode: 'fix',
      platform: 'excel',
      formula: '=TEXTSPLIT(A2,", ")'
    },
    intent: 'Help Excel users repair one TEXTSPLIT formula where the visible problem is usually an exact delimiter mismatch, row-versus-column delimiter placement, blocked dynamic-array output, uneven split rows that need pad_with, empty tokens, case-sensitive matching, or a workbook opened in an Excel version without TEXTSPLIT support.',
    bestFor: [
      'TEXTSPLIT formulas that do not split because the delimiter in the source text is not the delimiter in the formula.',
      'Formulas that spill across columns when the result should go down rows, or down rows when it should go across columns.',
      '#SPILL! errors caused by occupied cells, merged cells, or formulas entered inside Excel tables.',
      '#N/A padding in uneven row-and-column splits where a blank, 0, or another pad_with value would be clearer.',
      '#NAME? or _xlfn behavior when the workbook is opened in an Excel version that does not support TEXTSPLIT.'
    ],
    steps: [
      'Paste the exact TEXTSPLIT formula and one source text value it should split.',
      'Say whether the result should spill across columns, down rows, or into a two-dimensional grid.',
      'Include the visible error text or unwanted output, such as #SPILL!, #N/A padding, unchanged text, or missing items.'
    ],
    copyChecks: [
      'Match the delimiter exactly, including spaces after commas, line breaks, tabs, and semicolons.',
      'Use the column delimiter argument for results across columns and the row delimiter argument for results down rows.',
      'Clear the spill range or move the formula outside an Excel table before changing valid TEXTSPLIT logic.',
      'Set pad_with deliberately when uneven row-and-column splits should not show #N/A.',
      'Check Excel version support when TEXTSPLIT appears as #NAME? or _xlfn.TEXTSPLIT.'
    ]
  },
  {
    slug: 'excel-indirect-not-working',
    title: 'Excel INDIRECT Not Working Fixer | Write My Formula',
    description: 'Fix Excel INDIRECT formulas returning #REF!, wrong cells, broken dynamic sheet names, dependent dropdown issues, named-range failures, or browser workbook limits.',
    eyebrow: 'Excel INDIRECT fixer',
    h1: 'Fix an Excel INDIRECT formula that is not working.',
    lede: 'Paste the INDIRECT formula that returns #REF!, points at the wrong cell, or breaks when a sheet name, named range, dropdown, or external workbook reference changes. Get a focused repair path for reference text, quotes, tab names, workbook state, named ranges, and Excel web limits.',
    preset: {
      mode: 'fix',
      platform: 'excel',
      formula: '=INDIRECT(A1&"!B2")'
    },
    intent: 'Help Excel users repair one INDIRECT formula where the visible problem is usually invalid reference text, unquoted sheet names, renamed tabs, closed source workbooks, named-range scope, data-validation dependent dropdowns, or Excel for the web limitations.',
    bestFor: [
      'INDIRECT formulas returning #REF! even though the referenced sheet or range looks close.',
      'Dynamic sheet-name formulas where spaces, apostrophes, deleted tabs, or renamed tabs break the reference text.',
      'Dependent dropdowns and named-range formulas that work on one sheet but fail after copying, renaming, or changing scope.',
      'External workbook references that behave differently in Excel desktop, SharePoint, OneDrive, or Excel for the web.'
    ],
    steps: [
      'Paste the exact INDIRECT formula and the current error or wrong result.',
      'Add the text value that INDIRECT is trying to turn into a reference, such as the tab name, named range, or address in the source cell.',
      'Mention whether the formula points to another workbook, a browser-hosted file, a data-validation rule, or a named range.'
    ],
    copyChecks: [
      'Confirm the text inside INDIRECT evaluates to a valid A1 or R1C1 reference.',
      'Wrap sheet names in apostrophes when tab names contain spaces, punctuation, or apostrophes.',
      'Open any external source workbook before treating an INDIRECT #REF! as a syntax-only problem.',
      'Check whether the name is scoped to one sheet or to the whole workbook.',
      'Avoid relying on external INDIRECT references in Excel for the web when the desktop workbook behavior cannot be reproduced there.'
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
    slug: 'excel-null-error',
    title: 'Excel #NULL! Error Fixer | Write My Formula',
    description: 'Fix Excel #NULL! errors caused by accidental range intersections, missing commas, missing colons, and non-overlapping cell ranges.',
    eyebrow: 'Excel #NULL! error fixer',
    h1: 'Fix an Excel #NULL! error in one formula.',
    lede: 'Paste the formula that returns #NULL!, describe what the ranges were supposed to do, and get a repair path for accidental intersection spaces, missing commas, missing colons, and ranges that do not overlap.',
    preset: {
      mode: 'fix',
      platform: 'excel',
      formula: '=SUM(A2:A10 C2:C10)'
    },
    intent: 'Help Excel users repair one formula returning #NULL! by checking whether a space is being read as the intersection operator, whether a comma or colon is missing, or whether two ranges are being intersected even though they do not overlap.',
    bestFor: [
      'SUM, COUNT, lookup, and named-range formulas where two references appear side by side and Excel returns #NULL!.',
      'Copied formulas where a separator was changed into a space or a range colon was removed.',
      'Intersection formulas that should work only when the two referenced ranges actually overlap.'
    ],
    steps: [
      'Paste the exact formula that returns #NULL!.',
      'Say whether the formula should combine ranges, sum one continuous range, or use the overlapping cells between two ranges.',
      'Include the referenced cells or named ranges when the formula uses spaces, commas, colons, or structured references.'
    ],
    copyChecks: [
      'Replace an accidental space between ranges with a comma when the function needs separate arguments.',
      'Replace a mistaken space with a colon when the formula should use one continuous range.',
      'Keep the intersection space only when you truly want the cells shared by two overlapping ranges.',
      'Confirm the two ranges overlap before treating #NULL! as a normal intersection result.',
      'Fix the range operator directly before wrapping the formula in IFERROR.'
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
    slug: 'excel-offset-not-working',
    title: 'Excel OFFSET Function Not Working | Write My Formula',
    description: 'Fix Excel OFFSET formulas with #REF!, #VALUE!, wrong ranges, dynamic named range problems, text references, or volatile recalculation issues.',
    eyebrow: 'Excel OFFSET function repair',
    h1: 'Fix an Excel OFFSET formula that points at the wrong range.',
    lede: 'OFFSET breaks when the reference, row shift, column shift, height, or width points Excel somewhere invalid. Paste the formula, describe the range it should return, and get a focused repair path for #REF!, #VALUE!, dynamic named ranges, and wrong-size ranges.',
    preset: {
      mode: 'fix',
      platform: 'excel',
      formula: '=SUM(OFFSET(A1,1,0,COUNTA(A:A)-1,1))'
    },
    intent: 'Help Excel users repair one OFFSET formula where the visible problem is usually an invalid starting reference, rows or columns that move outside the worksheet, height or width arguments that are not positive numbers, omitted size arguments, text passed where Excel needs a reference, or volatile recalculation slowing a workbook.',
    bestFor: [
      'OFFSET formulas returning #REF! because the row or column shift lands outside the worksheet.',
      'OFFSET formulas returning #VALUE! because the reference is not a valid adjacent cell or range.',
      'Dynamic named ranges that do not expand as expected because height, width, COUNTA, or header-row logic is off.',
      'OFFSET formulas returning the wrong cells because rows, cols, height, or width are off by one.',
      'Models where OFFSET volatility is causing recalculation confusion and an INDEX-style rewrite may be clearer.'
    ],
    steps: [
      'Paste the exact OFFSET formula that is not working.',
      'Say what range or value the formula should return and what it returns now.',
      'Include the starting cell, any named range definition, and one sample row when height or width is calculated from COUNTA, MATCH, or another formula.'
    ],
    copyChecks: [
      'Check whether the row or column offset moves above row 1, left of column A, or past the worksheet edge.',
      'Confirm the reference argument is a real cell or adjacent range, not text that needs a different reference strategy.',
      'Make height and width positive numbers and decide whether omitted size arguments should inherit the starting reference size.',
      'Test COUNTA, MATCH, or other helper calculations separately when they control OFFSET height or width.',
      'Consider replacing volatile OFFSET with INDEX when the formula is stable but recalculation is making the workbook hard to trust.'
    ]
  },
  {
    slug: 'excel-unique-not-working',
    title: 'Excel UNIQUE Not Working? Fix Duplicates, #SPILL, by_col, exactly_once | Write My Formula',
    description: 'Fix Excel UNIQUE formulas that keep apparent duplicates, return unexpected rows, show #SPILL!, or confuse by_col and exactly_once settings.',
    eyebrow: 'Excel UNIQUE repair',
    h1: 'Fix an Excel UNIQUE formula that returns duplicates or the wrong rows.',
    lede: 'UNIQUE looks broken for a few common reasons. Two cells that look identical can differ by a trailing space, a non-printing character, or a number stored as text. A multi-column range treats each row as unique if any one cell differs. The exactly_once argument returns only values that appear once in the source, not one copy of each repeated value. And #SPILL! means the output range is blocked.',
    preset: {
      mode: 'fix',
      platform: 'excel',
      formula: '=UNIQUE(A2:C500)'
    },
    intent: 'Help Excel users repair one UNIQUE formula where the visible problem is usually hidden spaces or non-printing characters, text-versus-number storage, multi-column row uniqueness, exactly_once behavior, by_col direction, blocked spill output, or version support.',
    bestFor: [
      'UNIQUE formulas that still show apparent duplicates because the source values are not truly identical.',
      'Multi-column UNIQUE formulas that return unique row combinations instead of one distinct field.',
      'Lists where exactly_once removes repeated values entirely instead of returning one copy of each value.',
      'UNIQUE formulas that return #SPILL! because the result cannot expand into nearby cells.',
      'Files opened in older Excel versions where dynamic array functions may not behave as expected.'
    ],
    steps: [
      'Paste the exact UNIQUE formula and say whether you expected unique cells, unique rows, or values that appear exactly once.',
      'Include two or three source rows that look duplicated but remain in the output.',
      'Say whether the result should spill down rows or across columns.'
    ],
    copyChecks: [
      'Clean hidden leading, trailing, and non-printing characters before deciding UNIQUE is wrong.',
      'Check whether numbers or dates are stored as text even though they look formatted correctly.',
      'Use a one-column range when you want a distinct list from one field; multi-column ranges deduplicate whole rows.',
      'Use exactly_once only when repeated values should disappear entirely.',
      'Clear the spill range or move the formula outside an Excel table before changing valid UNIQUE logic.',
      'Confirm your Excel version supports dynamic array functions before relying on UNIQUE in a shared file.'
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
    slug: 'google-sheets-formula-not-updating',
    title: 'Google Sheets Formula Not Updating? | Write My Formula',
    description: 'Fix Google Sheets formulas that keep stale values, do not recalculate after edits, or need recalculation-setting and formula checks.',
    eyebrow: 'Google Sheets formula not updating',
    h1: 'Fix a Google Sheets formula that is not updating.',
    lede: 'If a Sheets formula keeps an old result after the source cells change, first check whether it is a recalculation setting or a broken formula. Paste the stuck formula, describe what changed, and get a focused repair path for stale values, volatile functions, text-stored inputs, range drift, and copied formulas.',
    preset: {
      mode: 'fix',
      platform: 'sheets',
      formula: '=SUMIFS(D2:D500,B2:B500,"Paid",A2:A500,TODAY())'
    },
    intent: 'Help Google Sheets users diagnose one formula that appears stuck, stale, or slow to recalculate after source cells, imports, form responses, or referenced ranges change.',
    bestFor: [
      'SUMIF, SUMIFS, lookup, ARRAYFORMULA, INDEX/MATCH, or dashboard formulas that keep showing an old value.',
      'Formulas that update only after reloading the sheet, editing the cell, or changing a referenced value again.',
      'Sheets where recalculation settings, volatile functions such as TODAY, NOW, RAND, or RANDBETWEEN, and formula logic need to be separated.',
      'Copied formulas or imported data where references shifted, ranges stopped including new rows, or numbers and dates are stored as text.'
    ],
    steps: [
      'Paste the exact formula that is not updating and the value it currently shows.',
      'Describe the source cell, row, import, or form response that changed.',
      'Add the value you expected so the repair can distinguish a stale result from a formula that is calculating the wrong input.'
    ],
    copyChecks: [
      'Check File, Settings, Calculation before rewriting a formula that depends on volatile functions.',
      'Confirm the formula range still includes the new row, import, or source tab.',
      'Check whether source numbers or dates are stored as text after a paste, import, or form response.',
      'Avoid hiding a stale result with IFERROR before the source range and recalculation behavior are understood.',
      'Test the repaired formula on one known changed row before filling it through a shared sheet.'
    ]
  },
  {
    slug: 'google-sheets-date-formula-not-working',
    title: 'Google Sheets Date Formula Not Working? | Write My Formula',
    description: 'Fix Google Sheets date formulas with DATEVALUE parse errors, text dates, locale mismatches, serial numbers, QUERY date literals, or date criteria issues.',
    eyebrow: 'Google Sheets date formula repair',
    h1: 'Fix a Google Sheets date formula that is not working.',
    lede: 'Date formulas break when imported dates are really text, a locale reads the day and month differently, DATEVALUE says the value cannot be parsed to date/time, QUERY needs a date literal, or a serial number displays where a date should appear. Paste the formula and the date value it is choking on to get a focused repair path for parsing, formatting, comparisons, and criteria.',
    preset: {
      mode: 'fix',
      platform: 'sheets',
      formula: '=DATEVALUE(A2)'
    },
    intent: 'Help Google Sheets users repair one date formula where the visible problem is usually DATEVALUE not parsing text, date criteria returning zero rows, serial numbers appearing instead of formatted dates, locale ambiguity, or QUERY/FILTER/SUMIFS/COUNTIFS comparing text dates incorrectly.',
    bestFor: [
      'DATEVALUE formulas that return VALUE parameter cannot be parsed to date/time or fail on imported date text.',
      'Date strings with extra words, time zones, slashes, dots, or day/month order that does not match the spreadsheet locale.',
      'QUERY formulas where date criteria need yyyy-mm-dd date literals instead of normal-looking cell text.',
      'SUMIFS, COUNTIFS, FILTER, or SORT formulas that miss rows because dates are stored as text or include hidden time values.',
      'Cells showing serial numbers instead of dates because the value converted but the number format did not.'
    ],
    steps: [
      'Paste the exact formula and the date value or sample row it is reading.',
      'Add the visible error text, wrong result, or serial number that appears.',
      'Say whether the source date came from a paste, import, form response, export, or QUERY/FILTER criteria.'
    ],
    copyChecks: [
      'Check whether the source date is a real date value or text that only looks like a date.',
      'Confirm the spreadsheet locale before deciding whether 03/04 means March 4 or April 3.',
      'For QUERY date filters, use a date literal in yyyy-mm-dd form inside the query string.',
      'Format converted serial numbers as dates before assuming the formula is still wrong.',
      'Test date criteria against one known row before filling the formula through a report.'
    ]
  },
  {
    slug: 'google-sheets-if-formula-not-working',
    title: 'Google Sheets IF Formula Not Working? | Write My Formula',
    description: 'Fix Google Sheets IF formulas that return FALSE, blank, the wrong label, parse errors, or confusing nested IF results.',
    eyebrow: 'Google Sheets IF formula repair',
    h1: 'Fix a Google Sheets IF formula that is returning the wrong result.',
    lede: 'IF formulas often fail quietly: FALSE appears where a label should be, a blank hides a missing false branch, quoted text breaks the syntax, or nested conditions run in the wrong order. Paste the formula and one expected row to get a focused repair path for logical tests, true/false branches, AND/OR conditions, empty strings, and locale separators.',
    preset: {
      mode: 'fix',
      platform: 'sheets',
      formula: '=IF(AND(B2="Paid",C2>0),"Ready","Review")'
    },
    intent: 'Help Google Sheets users repair one IF, nested IF, IFS, AND, or OR formula where the visible problem is usually FALSE, blank output, a wrong label, a parse error, or branch logic that handles the wrong case first.',
    bestFor: [
      'IF formulas that return FALSE because the false branch is missing or the condition is not matching.',
      'Nested IF or IFS formulas where branch order makes a broad rule catch rows before a more specific rule.',
      'AND and OR conditions where every comparison needs to be checked against one known row.',
      'Blank-looking cells, empty strings, quoted text outputs, and comma-versus-semicolon separator issues in shared Google Sheets.'
    ],
    steps: [
      'Paste the exact IF formula and the result Google Sheets currently returns.',
      'Add one row that should return the true result and one row that should return the false result.',
      'Say whether blank output should mean no match, waiting for data, or an actual empty string.'
    ],
    copyChecks: [
      'Put value_if_true and value_if_false in the intended order before rewriting the condition.',
      'Add a deliberate false branch instead of letting Google Sheets return a blank by default.',
      'Wrap text results in quotes and check whether your Sheets locale expects commas or semicolons.',
      'For AND and OR tests, verify each comparison separately on one known row.',
      'Use IFERROR only after the IF logic is correct, so real parse, reference, or value problems stay visible while you repair the formula.'
    ]
  },
  {
    slug: 'google-sheets-circular-dependency',
    title: 'Google Sheets Circular Dependency Fixer | Write My Formula',
    description: 'Fix Google Sheets circular dependency errors caused by self-referencing cells, self-including ranges, indirect loops, and risky iterative-calculation settings.',
    eyebrow: 'Google Sheets circular dependency fixer',
    h1: 'Fix a Google Sheets circular dependency without hiding the loop.',
    lede: 'Paste the formula that triggers "Circular dependency detected," add the cell it lives in, and get a corrected formula to try with checks for self-references, self-including ranges, indirect loops, and iterative calculation.',
    preset: {
      mode: 'fix',
      platform: 'sheets',
      formula: '=SUM(D2:D20)'
    },
    intent: 'Help Google Sheets users repair one formula that points back to its own result cell directly, through a range that includes the formula cell, or through another formula chain.',
    bestFor: [
      'SUM, FILTER, ARRAYFORMULA, lookup, or running-total formulas that trigger "Circular dependency detected."',
      'Ranges that accidentally include the cell where the formula result is supposed to appear.',
      'Indirect loops where one helper cell depends on another cell that eventually points back at the original formula.',
      'Deciding whether iterative calculation is appropriate or just hiding an accidental reference loop.'
    ],
    steps: [
      'Paste the exact formula and name the cell where it lives.',
      'Describe the cells or range the formula should read without including its own result.',
      'Mention whether iterative calculation was already enabled or suggested by the error message.'
    ],
    copyChecks: [
      'Remove the formula cell from any range it is summing, filtering, or otherwise calculating.',
      'Trace helper cells that feed each other until you find the reference that points back to the formula result.',
      'Use iterative calculation only when the circular model is intentional and you understand the max-iteration setting.',
      'Test the repaired formula in one cell before filling it through a shared sheet.'
    ]
  },
  {
    slug: 'google-sheets-sumifs-not-working',
    title: 'Google Sheets SUMIFS Not Working? | Write My Formula',
    description: 'Fix Google Sheets SUMIFS formulas that return 0, #VALUE!, wrong totals, or miss rows because of range sizes, criteria, dates, text values, or argument order.',
    eyebrow: 'Google Sheets SUMIFS repair',
    h1: 'Fix a Google Sheets SUMIFS formula that is not adding up.',
    lede: 'SUMIFS can fail quietly: 0 when matching rows exist, #VALUE! from mismatched ranges, or a total that looks close enough to be dangerous. Paste the formula, add what it should sum, and get a focused repair path for range sizes, criteria order, dates, stored text, hidden spaces, and separators.',
    preset: {
      mode: 'fix',
      platform: 'sheets',
      formula: '=SUMIFS(D2:D500,B2:B501,"Acme",A2:A500,">="&DATE(2026,3,1),A2:A500,"<"&DATE(2026,4,1))'
    },
    intent: 'Help Google Sheets users repair one SUMIFS formula where the visible problem is usually a zero total, a #VALUE! range mismatch, a wrong date or text criterion, SUMIF-versus-SUMIFS argument order, hidden spaces, or imported values stored as text.',
    bestFor: [
      'SUMIFS formulas that return 0 even though matching rows appear to exist.',
      '#VALUE! or range-size errors where the sum range and criteria ranges do not cover the same rows.',
      'Date, text, wildcard, and comparison criteria where quotes, operators, separators, or cell references are easy to mix up.',
      'Imported reports where amounts, dates, or criteria values look right but are stored as text or include hidden spaces.'
    ],
    steps: [
      'Paste the exact SUMIFS formula and the total Google Sheets currently returns.',
      'Add one row that should match the criteria and one row that should not.',
      'Include the headers or range sizes for the sum range and each criteria range.'
    ],
    copyChecks: [
      'Confirm Google Sheets SUMIFS starts with the sum range, then each criteria range and criterion pair.',
      'Make every criteria range the same height and width as the sum range.',
      'Join comparison operators to cell references or date functions, such as ">="&DATE(2026,3,1).',
      'Check whether dates, amounts, or IDs are stored as text even though they look formatted correctly.',
      'Trim hidden spaces from imported criteria values before trusting a zero result.',
      'Check whether your Sheets locale expects commas or semicolons before treating the formula as broken.'
    ]
  },
  {
    slug: 'google-sheets-countifs-not-working',
    title: 'Google Sheets COUNTIFS Not Working? | Write My Formula',
    description: 'Fix Google Sheets COUNTIFS formulas that return 0, #VALUE!, wrong counts, or miss rows because of range sizes, dates, stored text, hidden spaces, or separators.',
    eyebrow: 'Google Sheets COUNTIFS repair',
    h1: 'Fix a Google Sheets COUNTIFS formula that is counting wrong.',
    lede: 'COUNTIFS can look right and still return 0, #VALUE!, or a count that misses rows. Paste the formula, add one row that should count, and get a focused repair path for criteria ranges, date criteria, stored text, hidden spaces, blank criteria, and locale separators.',
    preset: {
      mode: 'fix',
      platform: 'sheets',
      formula: '=COUNTIFS(B2:B500,"Paid",A2:A501,">="&DATE(2026,3,1),A2:A500,"<"&DATE(2026,4,1))'
    },
    intent: 'Help Google Sheets users repair one COUNTIFS formula where the visible problem is usually a zero count, a #VALUE! range mismatch, a wrong date or text criterion, hidden spaces, an empty criteria reference, or imported values stored as text.',
    bestFor: [
      'COUNTIFS formulas that return 0 even though matching rows appear to exist.',
      '#VALUE! or range-size failures where one criteria range covers a different row span.',
      'Date, text, wildcard, and comparison criteria where quotes, operators, separators, or cell references are easy to mix up.',
      'Imported reports where IDs, dates, or status values look right but include hidden spaces or are stored as text.'
    ],
    steps: [
      'Paste the exact COUNTIFS formula and the count Google Sheets currently returns.',
      'Add one row that should match every criterion and one row that should not.',
      'Include the headers or row spans for each criteria range.'
    ],
    copyChecks: [
      'Make every additional criteria range the same height and width as the first criteria range.',
      'Join comparison operators to cell references or date functions, such as ">="&DATE(2026,3,1).',
      'Check whether dates, IDs, or status values are stored as text even though they look formatted correctly.',
      'Trim hidden spaces before deciding a matching row is missing.',
      'Check whether your Sheets locale expects commas or semicolons before pasting the repaired formula.'
    ]
  },
  {
    slug: 'google-sheets-sort-not-working',
    title: 'Google Sheets SORT Not Working? | Write My Formula',
    description: 'Fix Google Sheets SORT formulas that return the wrong order, sort headers as data, separate rows, or misread dates and numbers stored as text.',
    eyebrow: 'Google Sheets SORT repair',
    h1: 'Fix a Google Sheets SORT formula that is not sorting correctly.',
    lede: 'SORT mistakes can look like bad data: headers move into the results, rows separate from their records, dates sort like text, or the wrong column controls the order. Paste the formula and source headers to get a focused repair path for ranges, sort_column positions, header rows, stored types, and multi-column sorting.',
    preset: {
      mode: 'fix',
      platform: 'sheets',
      formula: '=SORT(A1:D500,3,TRUE)'
    },
    intent: 'Help Google Sheets users repair one SORT formula where the visible problem is usually a header row included as data, a selected range that does not include every row field, a sort_column index counted from the wrong range, dates or numbers stored as text, or a second sort key applied in the wrong order.',
    bestFor: [
      'SORT formulas that return a plausible order but put the header row in the middle of the result.',
      'Tables where names, dates, or notes detach from the row they belong to after a sort range is narrowed too far.',
      'Date and number sorts that behave alphabetically because imported values are stored as text.',
      'Multi-column SORT formulas where the first and second sort keys need to be checked against the selected range.'
    ],
    steps: [
      'Paste the exact SORT formula and say which column should control the order.',
      'Include the source headers and one row that currently lands in the wrong position.',
      'Say whether the source includes a header row and whether dates, amounts, or IDs came from an import.'
    ],
    copyChecks: [
      'Exclude the header row from the sorted range or add it separately above the sorted output.',
      'Count sort_column from the first column of the selected range, not from column A of the file.',
      'Keep every row field inside the range so related cells move together.',
      'Check whether dates and numbers are stored as real values rather than text before trusting the order.',
      'Put the primary sort key first, then add secondary sort_column and is_ascending pairs only when needed.'
    ]
  },
  {
    slug: 'google-sheets-unique-not-working',
    title: 'Google Sheets UNIQUE Not Working? | Write My Formula',
    description: 'Fix Google Sheets UNIQUE formulas that keep duplicates, remove the wrong rows, return unexpected columns, or confuse by_column and exactly_once settings.',
    eyebrow: 'Google Sheets UNIQUE repair',
    h1: 'Fix a Google Sheets UNIQUE formula that is not removing duplicates correctly.',
    lede: 'UNIQUE can look broken when duplicates differ by hidden spaces, stored types, or formatting, or when a multi-column range makes each row unique. Paste the formula and source examples to get a focused repair path for row uniqueness, by_column, exactly_once, cleanup steps, and output range blockers.',
    preset: {
      mode: 'fix',
      platform: 'sheets',
      formula: '=UNIQUE(A2:C500)'
    },
    intent: 'Help Google Sheets users repair one UNIQUE formula where the visible problem is usually hidden spaces or formatting differences, multi-column row uniqueness, a misunderstood exactly_once setting, by-column mode, or a blocked output area.',
    bestFor: [
      'UNIQUE formulas that still show apparent duplicates because values include hidden spaces, non-printing characters, or inconsistent number/date formatting.',
      'Multi-column UNIQUE formulas where Google Sheets returns unique rows instead of deduplicating one selected column.',
      'Reports where exactly_once is returning only values that appear once, not one copy of each repeated value.',
      'UNIQUE formulas combined with FILTER or SORT where the cleanup, filter, dedupe, and ordering steps need to happen in the right order.',
      'Output ranges where a dynamic UNIQUE result cannot expand cleanly because cells below or beside the formula are occupied.'
    ],
    steps: [
      'Paste the exact UNIQUE formula and say whether you expect unique cells, unique rows, or values that appear exactly once.',
      'Include two values or rows that look duplicated but both remain in the result.',
      'Mention whether the source data came from an import, form response, pasted CSV, FILTER result, or SORT formula.'
    ],
    copyChecks: [
      'Check whether the duplicate-looking values contain trailing spaces, non-printing characters, or inconsistent capitalization before changing the formula.',
      'Format numeric values consistently when numbers, dates, or imported IDs appear to duplicate but do not collapse.',
      'Use a single-column range when you want a unique list from one field; multi-column ranges return unique row combinations.',
      'Use exactly_once only when repeated values should disappear entirely instead of leaving one representative value.',
      'Clear the spill area before rewriting a valid UNIQUE formula that cannot expand into neighboring cells.',
      'Test the repaired formula on a small sample before replacing a shared report formula.'
    ]
  },
  {
    slug: 'google-sheets-match-not-working',
    title: 'Google Sheets MATCH Not Working? | Write My Formula',
    description: 'Fix Google Sheets MATCH formulas with #N/A, wrong positions, omitted search_type defaults, one-dimensional range issues, or sorted-range assumptions.',
    eyebrow: 'Google Sheets MATCH repair',
    h1: 'Fix a Google Sheets MATCH formula that is returning the wrong position.',
    lede: 'MATCH returns a relative position, not the value itself, so a small setting mistake can break the next INDEX, lookup, or validation formula. Paste the MATCH formula and one value that should match to get a focused repair path for search_type, sorted ranges, one-dimensional ranges, and stored value types.',
    preset: {
      mode: 'fix',
      platform: 'sheets',
      formula: '=MATCH(E2,A2:A500,1)'
    },
    intent: 'Help Google Sheets users repair one MATCH formula where the visible problem is usually #N/A, an unexpected position, an omitted search_type argument, approximate matching on an unsorted range, a two-dimensional lookup range, or values that look equal but are stored differently.',
    bestFor: [
      'MATCH formulas that return #N/A even though the lookup value appears to exist.',
      'MATCH formulas that return a plausible but wrong position because search_type was omitted or set to 1 on an unsorted range.',
      'INDEX MATCH formulas where the returned row or column number is wrong before INDEX ever reads the result range.',
      'Formulas that search across more than one row and column even though Google Sheets MATCH expects a one-dimensional range.',
      'Imported IDs, dates, names, or SKU values with hidden spaces, apostrophes, or text-number mismatches.'
    ],
    steps: [
      'Paste the exact MATCH formula and the #N/A or wrong position it returns.',
      'Include one lookup value that should match and a few values from the searched row or column.',
      'Say whether the result should be exact match, next smaller in ascending order, or next larger in descending order.'
    ],
    copyChecks: [
      'Use search_type 0 for exact match when the range is not deliberately sorted for approximate matching.',
      'Remember that omitted search_type behaves like 1 and assumes ascending order.',
      'Use -1 only when the searched range is sorted descending.',
      'Keep the searched range one-dimensional: one row or one column, not a block with both height and width.',
      'Check whether lookup values and source values are stored as matching text, numbers, dates, and trimmed values.',
      'Test MATCH by itself before feeding the position into INDEX or another formula.'
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
    slug: 'google-sheets-importxml-not-working',
    title: 'Google Sheets IMPORTXML Not Working? | Write My Formula',
    description: 'Fix Google Sheets IMPORTXML formulas with #N/A, Imported content is empty, Could not fetch URL, XPath mistakes, oversized results, or blocked page content.',
    eyebrow: 'Google Sheets IMPORTXML repair',
    h1: 'Fix a Google Sheets IMPORTXML formula that is returning #N/A or empty content.',
    lede: 'IMPORTXML breaks when the URL string is wrong, the XPath points at the wrong node, the page content is not visible to Sheets, or the query pulls back too much. Paste the formula and the value you wanted to extract to get a focused repair path for URL quoting, XPath shape, page limits, and safer fallbacks.',
    preset: {
      mode: 'fix',
      platform: 'sheets',
      formula: '=IMPORTXML("https://example.com/products","//span[@class=\'price\']")'
    },
    intent: 'Help Google Sheets users repair one IMPORTXML formula where the visible problem is usually #N/A, Imported content is empty, Could not fetch URL, an XPath copied from DevTools, JavaScript-rendered page content, or a query that returns too much data.',
    bestFor: [
      'IMPORTXML formulas that return #N/A, Imported content is empty, or Could not fetch URL instead of the expected page value.',
      'URLs or XPath queries where missing quotes, missing protocol, cell references, or locale separators may be breaking the formula before the page is read.',
      'Copied full XPaths that stop working after the page layout changes or point at a wrapper node instead of the text or attribute you need.',
      'Imports that fail because the page hides the data from Google Sheets, blocks fetches, changes markup, or returns more content than the XPath should pull.'
    ],
    steps: [
      'Paste the exact IMPORTXML formula and the visible Google Sheets error text.',
      'Describe the value you expected, such as a price, title, href, table cell, or list of names.',
      'Include the page URL and any nearby HTML class, id, tag, or attribute you used to build the XPath.'
    ],
    copyChecks: [
      'Make sure the URL includes http or https and is quoted, or points to a cell that contains the full URL.',
      'Quote the XPath query and use an XPath that targets the actual text or attribute rather than a brittle full page path.',
      'Check whether the data exists in the page source without JavaScript before treating the XPath as the only problem.',
      'Reduce the XPath result when Google Sheets says the resource contents exceeded the maximum size.',
      'Use IFERROR only after URL, XPath, page visibility, and result-size limits have been checked.'
    ]
  },
  {
    slug: 'google-sheets-regexextract-not-working',
    title: 'Google Sheets REGEXEXTRACT Not Working? | Write My Formula',
    description: 'Fix Google Sheets REGEXEXTRACT formulas with #N/A no-match errors, invalid regex patterns, text-input issues, greedy matches, and RE2 syntax limits.',
    eyebrow: 'Google Sheets REGEXEXTRACT repair',
    h1: 'Fix a Google Sheets REGEXEXTRACT formula that is not matching.',
    lede: 'REGEXEXTRACT fails when the pattern is too strict, a special character is not escaped, the input is not text, or the regex syntax works somewhere else but not in Google Sheets. Paste the formula and one sample cell to get a focused repair path for no-match errors, capture groups, greedy matches, and RE2 limits.',
    preset: {
      mode: 'fix',
      platform: 'sheets',
      formula: '=REGEXEXTRACT(A2,"Order #(\\d+)")'
    },
    intent: 'Help Google Sheets users repair one REGEXEXTRACT formula where the visible problem is usually #N/A because the pattern does not match, a number used where text is expected, a copied regex that uses syntax Sheets does not support, or a capture group that returns more or less than expected.',
    bestFor: [
      'REGEXEXTRACT formulas that return #N/A or say the regular expression does not match the input text.',
      'Patterns copied from regex testers, JavaScript, or Python that use lookbehind, lookaround, backreferences, or other syntax Google Sheets regex formulas cannot run.',
      'Extracting order IDs, invoice numbers, domains, names, prices, or text after a label from imported cells.',
      'Capture groups that spill into multiple columns, return only part of the match, or miss optional spacing and punctuation.',
      'Text and number inputs where REGEXEXTRACT needs TEXT before matching or VALUE after extracting a numeric result.'
    ],
    steps: [
      'Paste the exact REGEXEXTRACT formula and the sample cell text it is reading.',
      'Add the exact substring you expected the formula to return.',
      'Mention whether the pattern came from another regex tool, Apps Script, Excel, Python, or a web example.'
    ],
    copyChecks: [
      'Confirm the input is text before matching; use TEXT when the source value is a number or date.',
      'Escape literal dots, brackets, parentheses, slashes, plus signs, and question marks when they should be matched as characters.',
      'Use capture groups deliberately because REGEXEXTRACT returns captured groups instead of the whole match when groups are present.',
      'Make optional spaces and punctuation explicit when imported text varies from row to row.',
      'Avoid unsupported RE2 syntax such as lookbehind, lookaround, and backreferences in Google Sheets formulas.',
      'Use VALUE only after extraction when the result should behave as a number in later formulas.'
    ]
  },
  {
    slug: 'google-sheets-conditional-formatting-not-working',
    title: 'Google Sheets Conditional Formatting Custom Formula Not Working? | Write My Formula',
    description: 'Fix Google Sheets conditional formatting custom formulas that highlight nothing, highlight the wrong rows, lose to another rule, or break across sheets.',
    eyebrow: 'Google Sheets conditional formatting repair',
    h1: 'Fix a Google Sheets conditional formatting custom formula that is not working.',
    lede: 'A custom formula can work in a normal cell and still fail in conditional formatting. The apply-to range may not match the first-row reference, the dollar signs may lock the wrong row or column, the rule may not return TRUE/FALSE, or another rule may be winning. Paste the rule and the range it applies to to get a focused repair path for Google Sheets custom formula rules.',
    preset: {
      mode: 'fix',
      platform: 'sheets',
      task: 'Fix this Google Sheets conditional formatting custom formula so open overdue tasks highlight the whole row.',
      table: 'Task,Due Date,Status\nRenew contract,2026-05-10,Open\nSend invoice,2026-05-25,Done',
      range: 'Apply to A2:C100; due dates in B; status in C; first row is 2',
      hint: 'Google Sheets conditional formatting custom formula',
      formula: '=AND(B2<TODAY(),C2<>"Done")'
    },
    intent: 'Help Google Sheets users repair one conditional-formatting custom formula where the visible problem is usually nothing highlighting, the wrong row lighting up, a copied rule using stale references, a cross-sheet reference that needs INDIRECT, or a rule-order conflict.',
    bestFor: [
      'Custom formula rules that highlight nothing even though the formula works in a worksheet cell.',
      'Whole-row highlights where $A2, A$2, $A$2, or A2 anchoring changes which cells are checked.',
      'Rules that shift one row or one column away from the intended match because the formula was not written for the top-left cell of the apply-to range.',
      'Conditional-formatting formulas that need TRUE/FALSE output, same-sheet references, INDIRECT for another sheet, or rule-order checks.'
    ],
    steps: [
      'Paste the exact custom formula from the conditional-formatting sidebar.',
      'Add the apply-to range and the first cell or first row in that range.',
      'Describe what should highlight and which cells currently highlight, if any.'
    ],
    copyChecks: [
      'Write the formula as if it is being evaluated from the top-left cell of the apply-to range.',
      'Lock only the column or row that should stay fixed as Google Sheets evaluates each cell.',
      'Make sure the custom formula returns TRUE or FALSE for the cell or row being formatted.',
      'Check whether a rule above this one is already setting the format for the same cells.',
      'Use INDIRECT when a custom formula needs to reference another sheet.'
    ]
  },
  {
    slug: 'google-sheets-data-validation-formula-not-working',
    title: 'Google Sheets Data Validation Formula Not Working? | Write My Formula',
    description: 'Fix Google Sheets data validation custom formulas that warn instead of rejecting, reject valid entries, or shift references after copying.',
    eyebrow: 'Google Sheets data validation repair',
    h1: 'Fix a Google Sheets data validation custom formula that is not working.',
    lede: 'A custom formula rule can look right in a normal cell but behave differently in Google Sheets data validation. Paste the rule, applied range, and one allowed or rejected value to get a focused repair path for TRUE/FALSE logic, reject input settings, dropdown criteria, and relative references.',
    preset: {
      mode: 'fix',
      platform: 'sheets',
      task: 'Fix this Google Sheets data validation rule so each task owner is required when the task status is Open.',
      table: 'Task,Status,Owner\nRenew contract,Open,\nSend invoice,Done,Sam',
      range: 'Apply data validation to C2:C100; status is in B; first row is 2',
      hint: 'Google Sheets data validation custom formula',
      formula: '=OR($B2<>"Open",LEN(C2)>0)'
    },
    intent: 'Help Google Sheets users repair one data-validation custom formula where the visible problem is usually Show warning versus Reject input, wrong first-row references, a formula that does not return TRUE/FALSE, copied-rule drift, or confusion between dropdown-from-range and custom formula criteria.',
    bestFor: [
      'Data validation rules that only show a warning when the sheet owner expected invalid entries to be blocked.',
      'Custom formulas that reject valid entries, accept invalid entries, or shift one row after being applied to a range.',
      'Rules that work in a worksheet cell but fail in the data validation panel because the current-cell reference or locked range is wrong.',
      'Dropdown and validation setups where the rule needs to be separated into list criteria, reject-input behavior, and a TRUE/FALSE custom formula.'
    ],
    steps: [
      'Paste the exact custom formula from the data-validation rule.',
      'Add the applied range, the first cell in that range, and whether invalid data is set to Show warning or Reject input.',
      'Include one value that should pass and one value that should be rejected.'
    ],
    copyChecks: [
      'Set invalid data to Reject input when the rule should block entries instead of only marking them.',
      'Write the formula as if Google Sheets evaluates it from the first cell in the applied range.',
      'Keep the current input cell relative and lock only helper ranges, columns, or rows that should stay fixed.',
      'Make sure the custom formula returns TRUE for allowed entries and FALSE for rejected entries.',
      'Use dropdown-from-range criteria for menu choices and custom formulas for validation tests; they solve different problems.'
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
    slug: 'excel-match-not-working',
    title: 'Excel MATCH Not Working Fixer | Write My Formula',
    description: 'Fix Excel MATCH formulas returning #N/A, wrong positions, or unreliable results because of match_type, sorting, text-number mismatches, or hidden spaces.',
    eyebrow: 'Excel MATCH repair',
    h1: 'Fix an Excel MATCH formula that is not working.',
    lede: 'If MATCH returns #N/A or gives the wrong position, the problem is often the match_type, the sort order of the lookup array, or values that look equal but are stored differently. Paste the formula and one value that should match to get a focused repair path before the result feeds INDEX or another lookup formula.',
    preset: {
      mode: 'fix',
      platform: 'excel',
      formula: '=MATCH(E2,$A$2:$A$500,1)'
    },
    intent: 'Help Excel users repair one MATCH formula where the visible problem may be #N/A, an unexpected position number, omitted approximate-match behavior, sorted-versus-unsorted lookup arrays, or imported values that look equal but do not match cleanly.',
    bestFor: [
      'MATCH formulas that return #N/A even though the lookup value appears in the source range.',
      'MATCH formulas that return a plausible but wrong position because match_type was omitted or set to 1 or -1 without the required sort order.',
      'INDEX MATCH formulas where the INDEX part is fine but the MATCH row or column position is wrong.',
      'Imported IDs, SKUs, dates, names, or account numbers with hidden spaces, apostrophes, text-number mismatches, or inconsistent source values.'
    ],
    steps: [
      'Paste the exact MATCH formula and the #N/A or wrong position it returns.',
      'Include one lookup value that should match and a few values from the lookup array.',
      'Say whether the formula should use exact match, next smaller, or next larger behavior.'
    ],
    copyChecks: [
      'Use 0 for exact match unless approximate matching is intentional.',
      'Remember that omitted match_type behaves like 1, so the lookup array must be sorted ascending for that mode.',
      'Use -1 only when the lookup array is sorted descending.',
      'Check whether the lookup value and lookup array store the same text, number, or date type.',
      'Test MATCH by itself before feeding the position into INDEX or another formula.'
    ]
  },
  {
    slug: 'excel-xmatch-not-working',
    title: 'Excel XMATCH Not Working Fixer | Write My Formula',
    description: 'Fix Excel XMATCH formulas returning #N/A, #VALUE!, wrong positions, or unreliable results because of match_mode, search_mode, wildcards, sorted data, stored types, or version support.',
    eyebrow: 'Excel XMATCH repair',
    h1: 'Fix an Excel XMATCH formula returning #N/A, #VALUE!, or the wrong position.',
    lede: 'XMATCH defaults to exact match, but it can still fail when match_mode, search_mode, wildcard mode, binary search sorting, or stored value types do not match the data. Paste the formula that is not working and get a focused repair path before the position feeds INDEX, CHOOSE, or another lookup formula.',
    preset: {
      mode: 'fix',
      platform: 'excel',
      formula: '=XMATCH(E2,$A$2:$A$500,0,2)'
    },
    intent: 'Help Excel users repair one XMATCH formula where the visible problem may be #N/A, #VALUE!, a wrong relative position, first-versus-last duplicate behavior, wildcard confusion, binary search on unsorted data, or an unsupported Excel version.',
    bestFor: [
      'XMATCH formulas that return #N/A even though the lookup value appears in the source range.',
      'XMATCH formulas that return a plausible but wrong position because search_mode uses binary search on data that is not sorted as required.',
      '#VALUE! errors caused by an invalid match_mode or search_mode argument.',
      'Wildcard lookups where the formula needs match_mode 2 before * and ? behave as wildcards.',
      'INDEX XMATCH formulas where the returned position must be tested before it feeds the return range.'
    ],
    steps: [
      'Paste the exact XMATCH formula and the #N/A, #VALUE!, or wrong position it returns.',
      'Include one lookup value that should match and a few values from the lookup array.',
      'Say whether the formula should find the first match, the last match, a wildcard match, the next smaller item, or the next larger item.'
    ],
    copyChecks: [
      'Use match_mode 0 for exact match unless approximate or wildcard matching is intentional.',
      'Use match_mode 2 when * or ? should be treated as wildcard characters.',
      'Use only valid match_mode and search_mode values before treating #VALUE! as a data problem.',
      'Use search_mode -1 when you need the last matching item instead of the first.',
      'Use binary search modes only when the lookup array is sorted ascending for 2 or descending for -2.',
      'Check whether the lookup value and lookup array store the same text, number, or date type.',
      'Check Excel version support when XMATCH appears as #NAME? or _xlfn.XMATCH.'
    ]
  },
  {
    slug: 'excel-sort-not-working',
    title: 'Excel SORT Not Working Fixer | Write My Formula',
    description: 'Fix Excel SORT formulas with #SPILL!, wrong sort columns, header-row mistakes, row separation, text-stored dates or numbers, and version support issues.',
    eyebrow: 'Excel SORT repair',
    h1: 'Fix an Excel SORT formula that is not sorting correctly.',
    lede: 'SORT can fail in ways that look like bad data: #SPILL! because the output range is blocked, a header row pulled into the result, the wrong sort_index, rows that no longer stay together, or dates and numbers sorting like text. Paste the formula and the expected order to get a focused repair path before you replace it in the workbook.',
    preset: {
      mode: 'fix',
      platform: 'excel',
      formula: '=SORT(A1:D500,3,-1)'
    },
    intent: 'Help Excel users repair one SORT formula where the visible problem may be #SPILL!, a wrong column or row sort, a header included as data, a narrowed source range that separates row fields, imported values stored as text, or an Excel version that does not support dynamic arrays.',
    bestFor: [
      'SORT formulas that return #SPILL! because the dynamic-array output range is blocked or the formula is placed where it cannot spill.',
      'SORT formulas that use a sheet column number instead of the relative sort_index inside the selected array.',
      'Tables where the header row gets sorted into the result or related row fields separate because the source range is too narrow.',
      'Date, number, score, or ID columns that sort alphabetically because imported values are stored as text.',
      'Workbooks where SORT appears as #NAME? or _xlfn.SORT because the Excel version does not support the function.'
    ],
    steps: [
      'Paste the exact SORT formula and the #SPILL!, #NAME?, wrong order, or separated-row result it returns.',
      'Say which column or row should control the order and whether it should be ascending or descending.',
      'Include the source headers and one row that currently lands in the wrong place.'
    ],
    copyChecks: [
      'Clear or move anything blocking the intended spill range before changing a valid dynamic-array formula.',
      'Count sort_index from the first column or row inside the array argument, not from the worksheet edge.',
      'Exclude the header row from the sorted array or place headers separately above the spilled result.',
      'Keep every field that belongs to a record inside the array so SORT moves whole rows together.',
      'Check whether dates, scores, prices, and IDs are stored as real values rather than text.',
      'Use sort_order -1 deliberately for descending order; omitted sort_order defaults to ascending.',
      'Check Excel version support when SORT appears as #NAME? or _xlfn.SORT.'
    ]
  },
  {
    slug: 'excel-vstack-hstack-not-working',
    title: 'Excel VSTACK or HSTACK Not Working? Fix #N/A, #SPILL, #NAME | Write My Formula',
    description: 'Fix Excel VSTACK and HSTACK formulas with #N/A padding, #SPILL! blockers, #NAME? version issues, mismatched array sizes, and wrong stack direction.',
    eyebrow: 'Excel VSTACK and HSTACK repair',
    h1: 'Fix an Excel VSTACK or HSTACK formula that will not combine arrays cleanly.',
    lede: 'VSTACK and HSTACK can look broken when arrays have different widths or heights, the result spills into occupied cells, the function is not available in the Excel version opening the file, or the stack direction does not match the report layout. Paste the formula and a small sample of the ranges you are trying to combine.',
    preset: {
      mode: 'fix',
      platform: 'excel',
      formula: '=VSTACK(A2:C20,F2:H20)'
    },
    intent: 'Help Excel users repair one VSTACK or HSTACK formula where the visible problem is usually #N/A padding from uneven arrays, #SPILL! from blocked output cells or tables, #NAME? from unsupported Excel versions, or rows and columns being appended in the wrong direction.',
    bestFor: [
      'VSTACK formulas that add #N/A cells because one source range has fewer columns than another.',
      'HSTACK formulas that add #N/A cells because one source range has fewer rows than another.',
      'Stacked dynamic-array results that return #SPILL! because the output area is occupied, merged, or inside an Excel table.',
      'Files where VSTACK or HSTACK returns #NAME? after the workbook opens in an older Excel version.',
      'Reports where the formula stacks the arrays vertically when the user needed a horizontal append, or the reverse.'
    ],
    steps: [
      'Paste the exact VSTACK or HSTACK formula that is not working.',
      'Include the dimensions or sample rows for each source array you are combining.',
      'Say whether blanks, #N/A padding, or a readable fallback should appear when one array is shorter than another.'
    ],
    copyChecks: [
      'Decide whether the arrays should be appended by rows with VSTACK or by columns with HSTACK before changing the formula.',
      'Check whether every source range has the same width for VSTACK or the same height for HSTACK.',
      'Use IFERROR or IFNA for expected padding only after confirming the #N/A cells are from uneven array sizes.',
      'Clear the spill range or move the formula outside an Excel table before rewriting valid stack logic.',
      'Confirm the workbook will be opened in an Excel version that supports VSTACK and HSTACK.'
    ]
  },
  {
    slug: 'excel-choosecols-chooserows-not-working',
    title: 'Excel CHOOSECOLS or CHOOSEROWS Not Working Fixer | Write My Formula',
    description: 'Fix Excel CHOOSECOLS and CHOOSEROWS formulas with #VALUE!, #NAME?, #SPILL!, wrong selected columns or rows, and broken nested arrays.',
    eyebrow: 'Excel CHOOSECOLS and CHOOSEROWS repair',
    h1: 'Fix an Excel CHOOSECOLS or CHOOSEROWS formula that is not working.',
    lede: 'CHOOSECOLS and CHOOSEROWS can break when a position is 0 or outside the selected array, the workbook opens in an unsupported Excel version, the spill range is blocked, a table column name is used where a number belongs, or the FILTER, INDEX, or SORT feeding the formula already returns an error. Paste the formula exactly as it appears in the cell.',
    preset: {
      mode: 'fix',
      platform: 'excel',
      formula: '=CHOOSECOLS(FILTER(A2:F500,C2:C500="Open"),1,3,6)'
    },
    intent: 'Help Excel users repair one CHOOSECOLS or CHOOSEROWS formula where the visible problem is usually #VALUE! from zero or out-of-range positions, #NAME? from unsupported Excel versions, #SPILL! from blocked output cells, wrong rows or columns from relative position counting, or an upstream dynamic-array error.',
    bestFor: [
      'CHOOSECOLS formulas that return #VALUE! because a requested column number is 0 or larger than the array width.',
      'CHOOSEROWS formulas that return #VALUE! because a requested row number is 0 or larger than the array height.',
      'Dynamic-array formulas that show #NAME? after a file opens outside Microsoft 365, Excel for the web, or Excel 2024.',
      'Reports where the selected columns or rows are wrong because the position was counted from the sheet edge instead of the array argument.',
      'Nested FILTER, INDEX, SORT, TAKE, or DROP formulas where CHOOSECOLS or CHOOSEROWS is only exposing an upstream error.'
    ],
    steps: [
      'Paste the exact CHOOSECOLS or CHOOSEROWS formula and the error or wrong output it returns.',
      'Include the source array width or height after any FILTER, SORT, TAKE, DROP, or INDEX step.',
      'Say which columns or rows should appear in the result and whether negative positions should count from the end.'
    ],
    copyChecks: [
      'Use numeric positions such as 1, 3, or -1; table column names and structured references do not replace col_num or row_num arguments.',
      'Check whether any requested position is 0 or outside the array returned by the first argument.',
      'Count positions from the array argument, not from the worksheet column letters or row numbers.',
      'Clear the intended spill range before rewriting a formula that is otherwise valid.',
      'Check the nested FILTER, INDEX, SORT, TAKE, or DROP result before treating CHOOSECOLS or CHOOSEROWS as the root cause.',
      'Confirm the workbook is being opened in Microsoft 365, Excel for the web, or Excel 2024 when the function appears as #NAME? or _xlfn.'
    ]
  },
  {
    slug: 'excel-take-drop-not-working',
    title: 'Excel TAKE or DROP Not Working Fixer | Write My Formula',
    description: 'Fix Excel TAKE and DROP formulas with #CALC!, #NUM!, #NAME?, #SPILL!, wrong rows or columns, and broken nested dynamic arrays.',
    eyebrow: 'Excel TAKE and DROP repair',
    h1: 'Fix an Excel TAKE or DROP formula that is not returning the right slice.',
    lede: 'TAKE and DROP can break when a row or column count is 0, the requested slice removes everything, the workbook opens in an unsupported Excel version, the spill range is blocked, or a positive or negative count is pulling from the wrong side of the array. Paste the formula and a small sample of the array you are slicing.',
    preset: {
      mode: 'fix',
      platform: 'excel',
      formula: '=TAKE(SORT(A2:D500,4,-1),10)'
    },
    intent: 'Help Excel users repair one TAKE or DROP formula where the visible problem is usually #CALC! from an empty array, #NUM! from an oversized array, #NAME? from unsupported Excel versions, #SPILL! from blocked output cells, wrong direction from positive or negative counts, or an upstream dynamic-array error.',
    bestFor: [
      'TAKE formulas that return the wrong top, bottom, left, or right part of a report after SORT, FILTER, or VSTACK.',
      'DROP formulas that remove the wrong rows or columns because positive and negative counts were counted from the wrong side.',
      '#CALC! errors when rows or columns are 0, or when the formula drops every row or column from the array.',
      '#NUM! errors when the requested array is too large for Excel to calculate.',
      'Files where TAKE or DROP appears as #NAME? or _xlfn after opening outside Microsoft 365, Excel for the web, or Excel 2024.'
    ],
    steps: [
      'Paste the exact TAKE or DROP formula and the error or wrong output it returns.',
      'Include the source array shape after any FILTER, SORT, VSTACK, HSTACK, CHOOSECOLS, or CHOOSEROWS step.',
      'Say whether the formula should keep or remove rows, columns, or both, and whether the count should work from the start or the end.'
    ],
    copyChecks: [
      'Use positive counts to work from the start of the array and negative counts to work from the end.',
      'Check whether any rows or columns argument is 0 before treating #CALC! as a data problem.',
      'Confirm DROP is not removing every row or column from the array.',
      'Clear the intended spill range before rewriting a TAKE or DROP formula that is otherwise valid.',
      'Check the nested FILTER, SORT, VSTACK, HSTACK, CHOOSECOLS, or CHOOSEROWS result before treating TAKE or DROP as the root cause.',
      'Confirm the workbook is being opened in Microsoft 365, Excel for the web, or Excel 2024 when the function appears as #NAME? or _xlfn.'
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
    slug: 'excel-pivot-table-calculated-field-not-working',
    title: 'Excel Pivot Table Calculated Field Not Working? | Write My Formula',
    description: 'Fix Excel PivotTable calculated fields that return wrong totals, reject cell references, break on field names, or need a source helper column.',
    eyebrow: 'Excel PivotTable calculated field repair',
    h1: 'Fix an Excel PivotTable calculated field that is not working.',
    lede: 'PivotTable formulas do not behave like normal worksheet formulas. Paste the calculated field formula, list the source field names, and get a repair path for wrong totals, invalid cell references, field-name syntax, OLAP limits, and helper-column cases.',
    preset: {
      mode: 'fix',
      platform: 'excel',
      task: 'Fix this PivotTable calculated field so gross margin works from the pivot source fields.',
      table: 'Region,Product,Revenue,Cost\nWest,Hardware,12000,7800\nEast,Software,18000,6300',
      range: 'Pivot source fields: Revenue and Cost; calculated field name: Gross Margin',
      hint: 'PivotTable calculated field',
      formula: "=('Revenue'-'Cost')/'Revenue'"
    },
    intent: 'Help Excel users repair one PivotTable calculated field when the formula is rejected, returns a surprising total, uses worksheet-style references, points at the wrong source field, or should be moved into a source-table helper column before the pivot aggregates it.',
    bestFor: [
      'Calculated fields that need source field names instead of A1-style cell references.',
      'Margin, revenue, variance, average price, or ratio formulas where the row values look plausible but subtotals or grand totals are surprising.',
      'Pivot formulas that break because a field name has spaces, symbols, numbers, or the wrong calculated-field versus calculated-item shape.',
      'Cases where the calculation must happen per source row before the PivotTable summarizes it.'
    ],
    steps: [
      'Paste the exact calculated field formula Excel rejected or calculated incorrectly.',
      'List the PivotTable source field names exactly as they appear in the field list.',
      'Add one source row and one PivotTable total that shows the mismatch.',
      'Mention whether the PivotTable is based on a normal worksheet range, Data Model, Power Pivot, or OLAP source.'
    ],
    copyChecks: [
      'Use PivotTable field names rather than worksheet cell references or defined names.',
      'Check whether the formula is a calculated field or a calculated item before rewriting it.',
      'Remember that calculated fields operate on summarized field totals, not on each individual source row.',
      'Move row-level multiplication, division, or IF logic into a helper column when the total needs to be summed after each row is calculated.',
      'Do not try to add a normal calculated field to an OLAP PivotTable; use the appropriate measure workflow instead.'
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
      'A focused formula request flow for Excel and Google Sheets instead of a broad data-analysis suite.',
      'Write, Explain, and Fix modes with optional table context, range hints, formula notes, and paste checks.',
      'A low-friction path to try the tool: 2 guest tries, free email access at 3 runs per week, or $9 founding access for 500 runs per month in this browser.'
    ],
    useWhen: 'Use this page when you are comparing Formula Bot-style AI spreadsheet suites but the immediate job is still small: write one formula, repair one broken formula, explain one inherited formula, or create one custom rule for conditional formatting or data validation.',
    notWhen: 'Use Formula Bot or a similar broader spreadsheet AI suite when you need Excel, CSV, or PDF file upload, workbook analysis, data chat, charts, dashboards, connectors, SQL, VBA, Apps Script, regex, or automated reporting. Write My Formula is intentionally narrower so the formula and checks stay easy to inspect.',
    example: {
      setup: 'For invoices with dates in A, status in B, and amounts in C, you can ask for a formula that totals paid invoices from the current month and ignores open rows.',
      formula: '=SUMIFS(C2:C500,B2:B500,"Paid",A2:A500,">="&DATE(2026,5,1),A2:A500,"<"&DATE(2026,6,1))',
      read: 'The formula totals only rows marked Paid where the invoice date falls inside May 2026. The checks tell you to confirm date cells are real dates and that each SUMIFS range has the same height.'
    }
  },
  'ai-formula-generator-alternative': {
    gives: [
      'A focused formula request flow for Excel and Google Sheets formulas instead of a broad formula, SQL, automation, and file-context toolkit.',
      'Write, Explain, and Fix modes with formula notes, optional table context, range hints, and paste checks.',
      'A low-friction path to try the tool: 2 guest tries, free email access at 3 runs per week, or $9 founding access for 500 runs per month in this browser.'
    ],
    useWhen: 'Use this page when you are comparing AI Formula Generator-style tools but the immediate job is still small: write one formula, repair one broken formula, explain one inherited formula, or create one custom rule for conditional formatting or data validation.',
    notWhen: 'Use AI Formula Generator or a similar broader formula platform when you need SQL queries, CSV or Excel file context, formula templates, bulk generation, VBA, Apps Script, or a conversational formula workflow. Write My Formula is intentionally narrower so the formula and checks stay easy to inspect.',
    example: {
      setup: 'A report needs June 2026 paid invoice totals for Product A, but the criteria should be readable before the formula is filled through the workbook.',
      formula: '=SUMIFS(D2:D500,A2:A500,"Product A",C2:C500,"Paid",B2:B500,">="&DATE(2026,6,1),B2:B500,"<"&DATE(2026,7,1))',
      read: 'The formula totals Amount values only when Product is Product A, Status is Paid, and Invoice Date falls inside June 2026. The checks tell you to confirm each SUMIFS range covers the same rows and the date column contains real dates.'
    }
  },
  'sheetsolver-ai-alternative': {
    gives: [
      'A focused formula request flow for Excel and Google Sheets instead of a broad spreadsheet automation workspace.',
      'Write, Explain, and Fix modes with optional table context, range hints, formula notes, and copy checks.',
      'A low-friction path to try the tool: 2 guest tries, free email access at 3 runs per week, or $9 founding access for 500 runs per month in this browser.'
    ],
    useWhen: 'Use this page when you are comparing SheetSolver AI-style spreadsheet tools but the job in front of you is still formula-shaped: write one formula, explain one inherited formula, fix one broken formula, or create one custom rule for conditional formatting or data validation.',
    notWhen: 'Use SheetSolver AI or another broader spreadsheet workspace when you need optional sheet or screenshot upload, prompt-to-sheet generation, PDF or invoice extraction, Excel or Google Sheets export, data chat, dashboards, charts, or workbook-wide analysis. Write My Formula is intentionally narrower so the formula, explanation, and paste checks stay visible.',
    example: {
      setup: 'For email addresses in column A, a Google Sheets formula can extract the domain while leaving blank rows empty.',
      formula: '=IF(A2="","",REGEXEXTRACT(A2,"@(.+)$"))',
      read: 'The formula checks for a blank first, then extracts the text after @ from nonblank email addresses. The checks tell you to test missing @ symbols and blank rows before filling down.'
    }
  },
  'expresssheet-alternative': {
    gives: [
      'A focused formula request flow for Excel and Google Sheets instead of a broad spreadsheet analyst workflow.',
      'Write, Explain, and Fix modes with formula notes, optional table context, range hints, and paste checks.',
      'A low-friction path to try the tool: 2 guest tries, free email access at 3 runs per week, or $9 founding access for 500 runs per month in this browser.'
    ],
    useWhen: 'Use this page when you are comparing ExpressSheet-style AI spreadsheet analyst tools but the immediate job is still small: write one formula, repair one broken formula, explain one inherited formula, or create one custom rule for conditional formatting or data validation.',
    notWhen: 'Use ExpressSheet or a similar broader spreadsheet analyst when you need Excel or CSV upload, data chat, trends, anomalies, recommendations, charts, PDF export, enhanced spreadsheet downloads, batch processing, API access, collaboration, SSO, or team controls. Write My Formula is intentionally narrower so the formula and checks stay easy to inspect.',
    example: {
      setup: 'A report needs the matching paid invoice amount for the customer in G2, but the inherited INDEX/MATCH formula is returning a blank or the wrong row.',
      formula: '=INDEX($D$2:$D$500,MATCH(1,($A$2:$A$500=G2)*($B$2:$B$500="Paid"),0))',
      read: 'The formula looks for the first row where Customer matches G2 and Status is Paid, then returns the Amount from D. The checks tell you to confirm whether the source data has duplicate paid invoices, hidden spaces, or text-number mismatches before filling down.'
    }
  },
  'sheetgpt-alternative': {
    gives: [
      'A focused formula request flow for Excel and Google Sheets instead of a broad spreadsheet assistant workspace.',
      'Write, Explain, and Fix modes with formula notes, optional table context, range hints, and paste checks.',
      'A low-friction path to try the tool: 2 guest tries, free email access at 3 runs per week, or $9 founding access for 500 runs per month in this browser.'
    ],
    useWhen: 'Use this page when you are comparing SheetGPT-style spreadsheet AI assistants but the immediate job is still small: write one formula, repair one broken formula, explain one inherited formula, or create one custom rule for conditional formatting or data validation.',
    notWhen: 'Use SheetGPT or a similar broader spreadsheet AI workspace when you need Excel or CSV file upload, data-level chat, image-to-table conversion, charts, written spreadsheet analysis, scripts, or formula history across sessions. Write My Formula is intentionally narrower so the formula and checks stay easy to inspect.',
    example: {
      setup: 'A customer report needs the latest paid invoice amount for the customer named in F2, while ignoring open invoice rows.',
      formula: '=XLOOKUP(1,(A2:A500=F2)*(C2:C500="Paid"),D2:D500,"Not found",0,-1)',
      read: 'The formula looks for rows where Customer matches F2 and Status is Paid, returns the Amount from D, and searches from the bottom so the newest matching paid invoice is returned when the data is sorted oldest to newest.'
    }
  },
  'sheetxai-alternative': {
    gives: [
      'A focused formula request flow for Excel and Google Sheets instead of a broader in-spreadsheet AI automation workspace.',
      'Write, Explain, and Fix modes with formula notes, optional table context, range hints, and paste checks.',
      'A low-friction path to try the tool: 2 guest tries, free email access at 3 runs per week, or $9 founding access for 500 runs per month in this browser.'
    ],
    useWhen: 'Use this page when you are comparing SheetXAI-style spreadsheet AI tools but the immediate job is still small: write one formula, repair one broken formula, explain one inherited formula, or create one custom rule for conditional formatting or data validation.',
    notWhen: 'Use SheetXAI or a similar in-spreadsheet AI workspace when you need sidebar chat inside Excel or Google Sheets, PDF or image extraction, connected business apps, bulk data movement, analysis, content generation, or workflow automation. Write My Formula is intentionally narrower so the formula and checks stay easy to inspect.',
    example: {
      setup: 'A Google Sheets report needs to flag paid West-region invoices from the current month before the formula is filled down.',
      formula: '=IF(AND(A2="West",B2="Paid",C2>=DATE(2026,6,1),C2<DATE(2026,7,1)),"Review","")',
      read: 'The formula checks Region, Status, and the June 2026 date window before returning Review. The checks tell you to confirm the date column contains real dates and that the relative row references should move when the formula is filled down.'
    }
  },
  'formulaberry-alternative': {
    gives: [
      'A focused formula request flow for Excel and Google Sheets instead of a broader spreadsheet bot.',
      'Write, Explain, and Fix modes with formula notes, optional table context, range hints, and paste checks.',
      'A low-friction path to try the tool: 2 guest tries, free email access at 3 runs per week, or $9 founding access for 500 runs per month in this browser.'
    ],
    useWhen: 'Use this page when you are comparing FormulaBerry-style spreadsheet bots but the immediate job is still small: write one formula, repair one broken formula, explain one inherited formula, or create one custom rule for conditional formatting or data validation.',
    notWhen: 'Use FormulaBerry or another broader spreadsheet bot when you want multilingual explanation settings, finance-specific formula workflows, small-business spreadsheet guidance, all-device access, or a monthly unlimited-credit plan. Write My Formula is intentionally narrower so the formula and checks stay easy to inspect.',
    example: {
      setup: 'A customer sheet needs the total order amount for the customer ID entered in G2, while the source table stores Customer ID in A and Amount in D.',
      formula: '=SUMIF(A2:A500,G2,D2:D500)',
      read: 'The formula adds every value in Amount where the matching Customer ID equals G2. The checks tell you to confirm the customer IDs are stored the same way in both places before filling the formula through the report.'
    }
  },
  'formuladesk-alternative': {
    gives: [
      'A focused formula request flow for Excel and Google Sheets instead of an installed Excel add-in suite.',
      'Write, Explain, and Fix modes with formula notes, optional table context, range hints, and paste checks.',
      'A low-friction path to try the tool: 2 guest tries, free email access at 3 runs per week, or $9 founding access for 500 runs per month in this browser.'
    ],
    useWhen: 'Use this page when you are comparing FormulaDesk-style Excel add-ins but the immediate job is still small: write one formula, explain one inherited formula, repair one broken formula, or create one custom rule for conditional formatting or data validation.',
    notWhen: 'Use FormulaDesk or a similar Excel add-in suite when you need installed workbook inspection, step-by-step formula tracing inside Excel, precedent drilldown, workbook issue checks, formula formatting/editing, LAMBDA creation, equation display, formula plotting, Word documentation, or large-workbook navigation. Write My Formula is intentionally narrower so the formula and checks stay easy to inspect.',
    example: {
      setup: 'A status formula should mark paid August rows, but the inherited nested IF is returning the wrong label for some dates.',
      formula: '=IF(B2="Paid",IF(AND(C2>=DATE(2026,8,1),C2<DATE(2026,9,1)),"August paid","Other month"),"Open")',
      read: 'The formula first checks whether the row is Paid, then checks whether the date falls inside August 2026 before returning the label. The checks tell you to confirm C contains real dates and that the formula should move row by row when filled down.'
    }
  },
  'promptloop-alternative': {
    gives: [
      'A focused formula request flow for Excel and Google Sheets instead of a broader AI spreadsheet automation platform.',
      'Write, Explain, and Fix modes with formula notes, optional table context, range hints, and paste checks.',
      'A low-friction path to try the tool: 2 guest tries, free email access at 3 runs per week, or $9 founding access for 500 runs per month in this browser.'
    ],
    useWhen: 'Use this page when you are comparing PromptLoop-style spreadsheet AI but the immediate job is still small: write one formula, repair one broken formula, explain one inherited formula, or create one custom rule for conditional formatting or data validation.',
    notWhen: 'Use PromptLoop or another AI spreadsheet automation platform when you need in-sheet AI functions, AI tasks across many rows, GTM or sales enrichment, web browsing, list scraping, dynamic data extraction, research pages, file processing, scheduled tasks, or CRM-connected data work. Write My Formula is intentionally narrower so the formula and checks stay easy to inspect.',
    example: {
      setup: 'A Google Sheets report should return the latest paid invoice amount for the customer in F2, but the current VLOOKUP always returns the first matching row.',
      formula: '=XLOOKUP(1,(A2:A500=F2)*(C2:C500="Paid"),D2:D500,"Not found",0,-1)',
      read: 'The formula finds rows where Customer matches F2 and Status is Paid, returns the Amount from D, and searches from the bottom so the latest matching paid row is returned when the data is sorted oldest to newest.'
    }
  },
  'coefficient-alternative': {
    gives: [
      'A focused formula request flow for Excel and Google Sheets instead of a connected-data spreadsheet platform.',
      'Write, Explain, and Fix modes with formula notes, optional table context, range hints, and paste checks.',
      'A low-friction path to try the tool: 2 guest tries, free email access at 3 runs per week, or $9 founding access for 500 runs per month in this browser.'
    ],
    useWhen: 'Use this page when you are comparing Coefficient-style spreadsheet AI and connected-data tools but the immediate job is still small: write one formula, repair one broken formula, explain one inherited formula, or create one custom rule for conditional formatting or data validation.',
    notWhen: 'Use Coefficient or a similar connected spreadsheet platform when you need live data imports, scheduled refreshes, exports, alerts, shared team connections, SQL builders, chart builders, pivot builders, or GPT functions that live inside Google Sheets. Write My Formula is intentionally narrower so the formula and checks stay easy to inspect.',
    example: {
      setup: 'A Google Sheets report is returning blanks from an inherited INDEX/MATCH formula, and you need to understand the two-condition match before replacing it.',
      formula: '=IFERROR(INDEX($D:$D,MATCH(1,($A:$A=A2)*($B:$B=B2),0)),"")',
      read: 'The formula looks for the first row where both A and B match the current row, then returns the matching value from D. The checks tell you to confirm whether a blank means no match, an empty returned cell, or a mismatch caused by stored text, spaces, or full-column array behavior.'
    }
  },
  'excelgpt-alternative': {
    gives: [
      'A focused formula request flow for Excel and Google Sheets instead of a broad Excel assistant suite.',
      'Write, Explain, and Fix modes with formula notes, optional table context, range hints, and paste checks.',
      'A low-friction path to try the tool: 2 guest tries, free email access at 3 runs per week, or $9 founding access for 500 runs per month in this browser.'
    ],
    useWhen: 'Use this page when you are comparing ExcelGPT-style AI Excel assistants but the immediate job is still small: write one formula, repair one broken formula, explain one inherited formula, or create one custom rule for conditional formatting or data validation.',
    notWhen: 'Use ExcelGPT or a similar broader Excel assistant when you need uploaded-file analysis, data cleaning, charts, dashboards, automation, file conversion, connected data sources, SQL, regex, VBA, scripts, or workbook-wide insights. Write My Formula is intentionally narrower so the formula and checks stay easy to inspect.',
    example: {
      setup: 'A revenue report needs paid West-region totals from June 2026, but the inherited SUMIFS uses a loose text date and should be checked before filling down.',
      formula: '=SUMIFS($D$2:$D$500,$A$2:$A$500,"West",$B$2:$B$500,"Paid",$C$2:$C$500,">="&DATE(2026,6,1))',
      read: 'The formula totals Amount values only when Region is West, Status is Paid, and the Date is on or after June 1, 2026. The checks tell you to confirm every SUMIFS range covers the same rows and the date column contains real dates.'
    }
  },
  'rows-alternative': {
    gives: [
      'A focused formula request flow for Excel and Google Sheets instead of a full AI spreadsheet platform.',
      'Write, Explain, and Fix modes with formula notes, optional table context, range hints, and paste checks.',
      'A low-friction path to try the tool: 2 guest tries, free email access at 3 runs per week, or $9 founding access for 500 runs per month in this browser.'
    ],
    useWhen: 'Use this page when you are comparing Rows-style AI spreadsheet tools but the immediate job is still small: write one formula, repair one broken formula, explain one inherited formula, or create one custom rule for conditional formatting or data validation.',
    notWhen: 'Use Rows or another full AI spreadsheet platform when you need imported data, AI Analyst-style table work, cross-table actions, Python, formula columns, checkpoints, or broader data analysis. Write My Formula is intentionally narrower so the formula and checks stay easy to inspect.',
    example: {
      setup: 'A report needs a margin formula in D that uses Revenue in B and Cost in C, while avoiding a divide-by-zero error when revenue is blank or zero.',
      formula: '=IF(B2=0,"",(B2-C2)/B2)',
      read: 'The formula returns a blank when Revenue is zero, then calculates margin as Revenue minus Cost divided by Revenue. The checks tell you to confirm whether blanks should stay blank or become 0 before filling the formula through the report.'
    }
  },
  'excelformula-pro-alternative': {
    gives: [
      'A focused formula request flow for Excel and Google Sheets instead of an account-based formula generator.',
      'Write, Explain, and Fix modes with formula notes, optional table context, range hints, and paste checks.',
      'A low-friction path to try the tool: 2 guest tries, free email access at 3 runs per week, or $9 founding access for 500 runs per month in this browser.'
    ],
    useWhen: 'Use this page when you are comparing ExcelFormula Pro-style AI formula generators but the immediate job is still small: write one formula, repair one broken formula, explain one inherited formula, or create one custom rule for conditional formatting or data validation.',
    notWhen: 'Use ExcelFormula Pro or a similar account-based formula generator when you want LibreOffice Calc support, formula history, priority support, no ads, yearly billing, or a higher-volume monthly formula plan. Write My Formula is intentionally narrower so the formula and checks stay easy to inspect.',
    example: {
      setup: 'A report needs paid West-region invoice totals from July 2026, but the criteria should be readable before the formula is filled through the workbook.',
      formula: '=SUMIFS($D$2:$D$500,$B$2:$B$500,"West",$C$2:$C$500,"Paid",$A$2:$A$500,">="&DATE(2026,7,1),$A$2:$A$500,"<"&DATE(2026,8,1))',
      read: 'The formula totals Amount values only when Region is West, Status is Paid, and Invoice Date falls inside July 2026. The checks tell you to confirm every SUMIFS range covers the same rows and the date column contains real dates.'
    }
  },
  'excelformula-co-alternative': {
    gives: [
      'A focused formula request flow for Excel and Google Sheets instead of a daily-cap formula generator.',
      'Write, Explain, and Fix modes with formula notes, optional table context, range hints, and paste checks.',
      'A low-friction path to try the tool: 2 guest tries, free email access at 3 runs per week, or $9 founding access for 500 runs per month in this browser.'
    ],
    useWhen: 'Use this page when you are comparing ExcelFormula.co-style AI formula generators but the immediate job is still small: write one formula, repair one broken formula, explain one inherited formula, or create one custom rule for conditional formatting or data validation.',
    notWhen: 'Use ExcelFormula.co or a similar Excel formula generator when you want a 5-formulas-per-day free allowance, formula history, priority support, saved favorite formulas, or a low monthly unlimited-formula plan. Write My Formula is intentionally narrower so the formula and checks stay easy to inspect.',
    example: {
      setup: 'A report needs a label for paid Product A invoices from August 2026, but the conditions should be readable before the formula is filled down.',
      formula: '=IF(AND(B2="Product A",C2="Paid",A2>=DATE(2026,8,1),A2<DATE(2026,9,1)),"August paid Product A","Other")',
      read: 'The formula returns the label only when Product, Status, and Invoice Date all match the requested conditions. The checks tell you to confirm that the date column contains real Excel dates and that the fallback label is acceptable before filling it through the report.'
    }
  },
  'gptexcel-alternative': {
    gives: [
      'A focused formula request flow for Excel and Google Sheets instead of a broad AI spreadsheet suite.',
      'Write, Explain, and Fix modes with formula notes, table context, range hints, and copy checks.',
      'A low-friction path to try the tool: 2 guest tries, free email access at 3 runs per week, or $9 founding access for 500 runs per month in this browser.'
    ],
    useWhen: 'Use this page when you are comparing AI Excel tools and the immediate job is still formula-shaped: fix a SUMIFS date criterion, explain a nested IF, write an XLOOKUP, repair a text formula, or build a custom rule.',
    notWhen: 'Do not use Write My Formula as a replacement for tools that upload whole files, chat with tables, create charts, build dashboards, or automate a full workbook. It is intentionally narrower so the formula and checks stay easy to inspect.',
    example: {
      setup: 'A revenue sheet needs June 2026 paid invoice totals, but the existing SUMIFS uses loose text dates that can fail by locale.',
      formula: '=SUMIFS(C2:C500,B2:B500,"Paid",A2:A500,">="&DATE(2026,6,1),A2:A500,"<"&DATE(2026,7,1))',
      read: 'The formula totals amounts only for rows marked Paid with invoice dates in June 2026. The checks tell you to confirm the date column contains real Excel dates and that all SUMIFS ranges have the same height.'
    }
  },
  'excelbot-alternative': {
    gives: [
      'A focused formula request flow for Excel and Google Sheets instead of a VBA, macro, or uploaded-data workspace.',
      'Write, Explain, and Fix modes with formula notes, optional table context, range hints, and copy checks.',
      'A low-friction path to try the tool: 2 guest tries, free email access at 3 runs per week, or $9 founding access for 500 runs per month in this browser.'
    ],
    useWhen: 'Use this page when you are comparing AI Excel tools and the immediate job is still formula-shaped: repair an XLOOKUP, explain an inherited IF, write a SUMIFS, build a custom rule, or adapt one formula to the ranges in your sheet.',
    notWhen: 'Do not use Write My Formula as a replacement for tools that generate VBA, analyze uploaded data files, create dashboards, build charts, or automate a full workbook. It is intentionally narrower so the formula and checks stay easy to inspect.',
    example: {
      setup: 'A product lookup should return the latest matching price, but the existing XLOOKUP points at mismatched ranges and hides missing matches with a blank.',
      formula: '=XLOOKUP(E2,$A$2:$A$500,$C$2:$C$500,"Not found",0,-1)',
      read: 'The formula searches the product IDs in A, returns the price from C, uses exact match, and searches from the bottom when duplicate IDs exist. The checks tell you to confirm the lookup and return ranges cover the same rows before filling down.'
    }
  },
  'ajelix-alternative': {
    gives: [
      'A focused formula request flow for Excel and Google Sheets instead of a broader agentic spreadsheet workspace.',
      'Write, Explain, and Fix modes with formula notes, optional table context, range hints, and copy checks.',
      'A low-friction path to try the tool: 2 guest tries, free email access at 3 runs per week, or $9 founding access for 500 runs per month in this browser.'
    ],
    useWhen: 'Use this page when you are comparing Ajelix-style AI spreadsheet platforms but the immediate job is still small: write one formula, repair one broken formula, explain one inherited formula, or create one rule for conditional formatting or data validation.',
    notWhen: 'Do not use Write My Formula as a replacement for Ajelix when you need file upload, workspace assets, dashboards, charts, VBA, Apps Script, PowerPoint, Google Workspace add-ons, or a team-wide AI platform. It is intentionally narrower so the formula and checks stay easy to inspect.',
    example: {
      setup: 'A report needs the average Amount for West-region rows dated on or after January 1, 2025.',
      formula: '=AVERAGEIFS(D:D,B:B,"West",C:C,">="&DATE(2025,1,1))',
      read: 'The formula averages Amount values in column D only where Region in column B is West and the date in column C is on or after January 1, 2025. The DATE wrapper keeps the cutoff date readable as an Excel date instead of loose text.'
    }
  },
  'sheetai-alternative': {
    gives: [
      'A focused formula request flow for Excel and Google Sheets instead of a broader spreadsheet AI platform.',
      'Write, Explain, and Fix modes with formula notes, optional table context, range hints, and copy checks.',
      'A low-friction path to try the tool: 2 guest tries, free email access at 3 runs per week, or $9 founding access for 500 runs per month in this browser.'
    ],
    useWhen: 'Use this page when you are comparing SheetAI-style spreadsheet AI tools but the immediate job is still small: write one formula, repair one broken formula, explain one inherited formula, or create one custom rule for conditional formatting or data validation.',
    notWhen: 'Do not use Write My Formula as a replacement for SheetAI when you need spreadsheet generation, cleaning, data analysis, CSV conversion, visualization, automation, or a broader workflow platform. It is intentionally narrower so the formula and checks stay easy to inspect.',
    example: {
      setup: 'A Google Sheets report needs paid rows from May 2026 onward, but the existing FILTER formula mixes date and status logic in a way that is hard to review.',
      formula: '=FILTER(A2:D500,D2:D500="Paid",C2:C500>=DATE(2026,5,1))',
      read: 'The formula returns rows from A through D only when Status in column D is Paid and the date in column C is on or after May 1, 2026. The checks tell you to confirm those columns match the real sheet and that the output area is empty before FILTER spills.'
    }
  },
  'numerous-ai-alternative': {
    gives: [
      'A focused formula request flow for Excel and Google Sheets instead of an in-spreadsheet AI automation add-in.',
      'Write, Explain, and Fix modes with formula notes, optional table context, range hints, and copy checks.',
      'A low-friction path to try the tool: 2 guest tries, free email access at 3 runs per week, or $9 founding access for 500 runs per month in this browser.'
    ],
    useWhen: 'Use this page when you are comparing Numerous.ai-style spreadsheet AI add-ins but the immediate job is still small: write one formula, repair one broken formula, explain one inherited formula, or create one custom rule for conditional formatting or data validation.',
    notWhen: 'Do not use Write My Formula as a replacement for Numerous.ai when you need AI functions inside spreadsheet cells, bulk writing, categorization, formatting, example-based inference, or repetitive task automation. It is intentionally narrower so the formula and checks stay easy to inspect.',
    example: {
      setup: 'A regional revenue formula totals Amount values for West-region rows dated on or after January 1, 2026, but the team wants to understand it before editing the report.',
      formula: '=SUMIFS($D$2:$D$500,$B$2:$B$500,"West",$C$2:$C$500,">="&DATE(2026,1,1))',
      read: 'The formula totals Amount values in D only when Region in B is West and the date in C is on or after January 1, 2026. The checks tell you to confirm the date column contains real dates and that every SUMIFS range covers the same rows.'
    }
  },
  'formulr-alternative': {
    gives: [
      'Two guest tries before you decide whether to create an account.',
      'Write, Explain, and Fix modes with formula notes, optional table context, range hints, and paste checks.',
      'A clear upgrade path: 2 guest tries, free email access at 3 runs per week, or $9 founding access for 500 runs per month in this browser.'
    ],
    useWhen: 'Use this page when you are comparing Formulr-style AI formula tools but the immediate job is still small: write one formula, repair one broken formula, explain one inherited formula, or create one custom rule for conditional formatting or data validation.',
    notWhen: 'Do not use Write My Formula as a replacement for Formulr when you want monthly generate, explain, and debug quotas in a dedicated formula app or browser extension. It is intentionally narrower so the formula and checks stay easy to inspect.',
    example: {
      setup: 'A task tracker needs to count completed rows from the current month, but the existing COUNTIFS formula is easy to misread because the date criteria are embedded inside the function.',
      formula: '=COUNTIFS($B$2:$B$500,"Complete",$C$2:$C$500,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1))',
      read: 'The formula counts rows where Status in B is Complete and Date in C is on or after the first day of the current month. The checks tell you to confirm those columns match the real sheet and that the date column contains real dates.'
    }
  },
  'formulawiz-alternative': {
    gives: [
      'A focused formula request flow for Excel and Google Sheets instead of a simultaneous Excel, Sheets, and Airtable formula converter.',
      'Write, Explain, and Fix modes with formula notes, optional table context, range hints, and paste checks.',
      'A low-friction path to try the tool: 2 guest tries, free email access at 3 runs per week, or $9 founding access for 500 runs per month in this browser.'
    ],
    useWhen: 'Use this page when you are comparing FormulaWiz-style formula generators but the immediate job is still small: write one formula, repair one broken formula, explain one inherited formula, or create one custom rule for conditional formatting or data validation.',
    notWhen: 'Do not use Write My Formula as a replacement for FormulaWiz when you need Airtable formulas, simultaneous cross-platform variants, or a monthly formula subscription across several spreadsheet dialects. It is intentionally narrower so the formula and checks stay easy to inspect.',
    example: {
      setup: 'A task tracker needs to count paid West-region onboarding tasks from the current month, but the team wants the criteria ranges spelled out before filling the formula down.',
      formula: '=COUNTIFS(A2:A500,"West",B2:B500,"Paid",C2:C500,">="&DATE(2026,6,1),C2:C500,"<"&DATE(2026,7,1))',
      read: 'The formula counts rows where Region is West, Status is Paid, and Task Date falls inside June 2026. The checks tell you to confirm each criteria range covers the same rows and that the date column contains real dates.'
    }
  },
  'formularizer-alternative': {
    gives: [
      'A focused formula request flow for Excel and Google Sheets instead of a four-assistant formula, SQL, regex, and script workspace.',
      'Write, Explain, and Fix modes with formula notes, optional table context, range hints, and paste checks.',
      'A low-friction path to try the tool: 2 guest tries, free email access at 3 runs per week, or $9 founding access for 500 runs per month in this browser.'
    ],
    useWhen: 'Use this page when you are comparing Formularizer-style assistant suites but the immediate job is still small: write one formula, repair one broken formula, explain one inherited formula, or create one custom rule for conditional formatting or data validation.',
    notWhen: 'Use Formularizer or a similar suite when you need SQL query generation, regex generation, Excel VBA scripts, Google Apps Script, sample-data credit workflows, or one account across several assistant types. Write My Formula is intentionally narrower so the formula and checks stay easy to inspect.',
    example: {
      setup: 'An invoice tracker needs to flag duplicate invoice IDs only after the first occurrence, so the first row stays clean and later repeats are marked.',
      formula: '=IF(COUNTIF($A$2:A2,A2)>1,"Duplicate","")',
      read: 'The formula counts each invoice ID from the first data row through the current row. The first time an ID appears, the count is 1 and the result stays blank. Later repeats return Duplicate.'
    },
    extraDetailCards: [
      {
        title: 'Where Formularizer fits',
        html: 'Formularizer currently presents separate assistants for formulas, SQL queries, regex, and scripts. Its formula assistant covers Excel and Google Sheets generation and explanation, and its script assistant covers Excel VBA and Google Apps Script. Use that kind of suite when your work spans formulas plus code, queries, or patterns. Use Write My Formula when the job is one formula-sized answer you can read and test.'
      }
    ]
  },
  'formulapilot-alternative': {
    gives: [
      'Two guest tries for one real formula problem before you decide whether to keep going.',
      'Write, Explain, and Fix modes with formula notes, optional table context, range hints, and paste checks.',
      'A clear path after the guest tries: free email access at 3 runs per week or $9 founding access for 500 formula runs per month in this browser.'
    ],
    useWhen: 'Use this page when you are comparing FormulaPilot-style formula generators but the immediate job is still small: write one formula, repair one broken formula, explain one inherited formula, or create one custom rule for conditional formatting or data validation.',
    notWhen: 'Use FormulaPilot or a similar formula hub when you want a free no-signup generator, a formula checker, a Google Sheets generator, function references, error references, learning pages, or browsable formula libraries. Write My Formula is intentionally narrower so the formula and checks stay easy to inspect.',
    example: {
      setup: 'A Google Sheets lookup across a Customers tab returns #N/A for IDs that appear to exist, and the team wants to understand the lookup before copying a replacement through the sheet.',
      formula: '=VLOOKUP(A2,Customers!A:D,4,FALSE)',
      read: 'The formula looks for the value in A2 in the first column of Customers!A:D, then returns the fourth column from the matching row. The checks tell you to confirm the lookup ID is in the first column, compare text numbers and hidden spaces, and decide whether a readable fallback should replace raw #N/A.'
    }
  },
  'formulagenius-alternative': {
    gives: [
      'Two guest tries for one Excel or Google Sheets formula problem before you decide whether to sign up.',
      'Write, Explain, and Fix modes with formula notes, optional table context, range hints, and paste checks.',
      'A clear upgrade path: 2 guest tries, free email access at 3 runs per week, or $9 founding access for 500 runs per month in this browser.'
    ],
    useWhen: 'Use this page when you are comparing FormulaGenius-style AI formula generators but the immediate job is still small: write one formula, repair one broken formula, explain one inherited formula, or create one custom rule for conditional formatting or data validation.',
    notWhen: 'Choose FormulaGenius or a similar broader formula tool when you want a formula-example catalog, formula history and favorites, a Chrome extension, priority support, or unlimited formula volume. Write My Formula is intentionally narrower so the formula and checks stay easy to inspect.',
    example: {
      setup: 'A regional revenue formula totals Amount values for West-region rows dated on or after June 1, 2026, but the date criterion is loose text and may behave differently by locale.',
      formula: '=SUMIFS($D$2:$D$500,$B$2:$B$500,"West",$C$2:$C$500,">="&DATE(2026,6,1))',
      read: 'The formula totals Amount values in D only when Region in B is West and the date in C is on or after June 1, 2026. The DATE wrapper keeps the cutoff date readable as a real Excel date, and the checks tell you to confirm every SUMIFS range covers the same rows.'
    }
  },
  'formulaza-alternative': {
    gives: [
      'A focused formula request flow for Excel and Google Sheets instead of a broader formula-learning and history workspace.',
      'Write, Explain, and Fix modes with formula notes, optional table context, range hints, and paste checks.',
      'A low-friction path to try the tool: 2 guest tries, free email access at 3 runs per week, or $9 founding access for 500 runs per month in this browser.'
    ],
    useWhen: 'Use this page when you are comparing FormulaZa-style formula tools but the immediate job is still small: write one formula, repair one broken formula, explain one inherited formula, or create one custom rule for conditional formatting or data validation.',
    notWhen: 'Use FormulaZa or a similar broader formula resource when you want 50 free formulas per day, 16-language support, formula history, a formula library, a daily quiz, an Excel-to-Sheets translator, AI Excel chat, saved formulas, or course/resource browsing. Write My Formula is intentionally narrower so the formula and checks stay easy to inspect.',
    example: {
      setup: 'A Google Sheets report needs to extract the domain from each email address while leaving blank rows blank.',
      formula: '=IF(A2="","",REGEXEXTRACT(A2,"@(.+)$"))',
      read: 'The formula checks for a blank email first, then extracts the text after @ from nonblank email addresses. The checks tell you to test blank rows and malformed email values before filling down.'
    }
  },
  'excelly-ai-alternative': {
    gives: [
      'A focused formula request flow for Excel and Google Sheets instead of a broader upload, Slack, VBA, or conversion workflow.',
      'Write, Explain, and Fix modes with formula notes, optional table context, range hints, and paste checks.',
      'A low-friction path to try the tool: 2 guest tries, free email access at 3 runs per week, or $9 founding access for 500 runs per month in this browser.'
    ],
    useWhen: 'Use this page when you are comparing Excelly-AI-style formula tools but the immediate job is still small: write one formula, repair one broken formula, explain one inherited formula, or create one custom rule for conditional formatting or data validation.',
    notWhen: 'Use Excelly-AI or a similar broader formula tool when you need .xlsx upload, Slack team workflows, VBA generation, or conversion between Excel and Google Sheets formula syntax. Write My Formula is intentionally narrower so the formula and checks stay easy to inspect.',
    example: {
      setup: 'A customer report needs the latest paid invoice amount for the customer named in E2, while ignoring open invoice rows.',
      formula: '=XLOOKUP(1,(A2:A500=E2)*(C2:C500="Paid"),D2:D500,"Not found",0,-1)',
      read: 'The formula looks for rows where Customer matches E2 and Status is Paid, returns the Amount from D, and searches from the bottom so the newest matching paid invoice is returned when the data is sorted oldest to newest.'
    }
  },
  'sheeter-alternative': {
    gives: [
      'A focused formula request flow for Excel and Google Sheets instead of an add-on or saved formula workspace.',
      'Write, Explain, and Fix modes with formula notes, optional table context, range hints, and paste checks.',
      'A low-friction path to try the tool: 2 guest tries, free email access at 3 runs per week, or $9 founding access for 500 runs per month in this browser.'
    ],
    useWhen: 'Use this page when you are comparing Sheeter-style formula generators but the immediate job is still small: write one formula, repair one broken formula, explain one inherited formula, or create one custom rule for conditional formatting or data validation.',
    notWhen: 'Use Sheeter or a similar formula generator when you want an add-on, a saved formula workspace, top-query examples, or a lifetime-plan path for repeated formula generation. Write My Formula is intentionally narrower so the formula and checks stay easy to inspect.',
    example: {
      setup: 'A team needs to return rows from Sheet2 where column A contains the word garden, but the current FILTER formula should be checked before it is copied into a shared workbook.',
      formula: '=FILTER(Sheet2!A:A,ISNUMBER(SEARCH("garden",Sheet2!A:A)),"No matches")',
      read: 'The formula searches Sheet2 column A for the word garden and returns matching cells. The fallback keeps the output readable when there are no matches, and the checks tell you to confirm the output range has room to spill.'
    }
  },
  'sheetsmart-alternative': {
    gives: [
      'A browser-based formula request flow for Excel and Google Sheets instead of a Google Sheets extension workflow.',
      'Write, Explain, and Fix modes with formula notes, optional table context, range hints, and paste checks.',
      'A low-friction path to try the tool: 2 guest tries, free email access at 3 runs per week, or $9 founding access for 500 runs per month in this browser.'
    ],
    useWhen: 'Use this page when you are comparing SheetSmart-style Google Sheets formula assistants but the immediate job is still small: write one formula, repair one broken formula, explain one inherited formula, or create one custom rule outside an installed extension flow.',
    notWhen: 'Use SheetSmart or a similar Google Sheets extension when you want formula help inside the sheet, automatic column-header or cell-context reading, direct formula insertion, formula history, favorites, or heavy Sheets-only usage. Write My Formula is intentionally narrower so the formula and checks stay easy to inspect.',
    example: {
      setup: 'A Google Sheets report needs to total January sales from rows where the Month label is January.',
      formula: '=SUMIF(A2:A500,"January",B2:B500)',
      read: 'The formula checks Month values in A and totals the matching Sales values in B. The checks tell you to confirm the month labels are stored consistently and that the sum range covers the same rows as the criteria range.'
    }
  },
  'smart-excel-alternative': {
    gives: [
      'A focused formula request flow for Excel and Google Sheets instead of a login-based daily-credit formula bot.',
      'Write, Explain, and Fix modes with formula notes, optional table context, range hints, and paste checks.',
      'A low-friction path to try the tool: 2 guest tries, free email access at 3 runs per week, or $9 founding access for 500 runs per month in this browser.'
    ],
    useWhen: 'Use this page when you are comparing Smart Excel-style formula bots but the immediate job is still small: write one formula, repair one broken formula, explain one inherited formula, or create one custom rule from a browser tab.',
    notWhen: 'Use Smart Excel or a similar formula bot when you want a login-based Excel formula generator, language selection, daily free credits, optional credit purchases, or a one-time credit pack. Write My Formula is intentionally narrower so the formula and checks stay easy to inspect.',
    example: {
      setup: 'An invoice report needs the total paid West-region amount from June 2026 before the formula is filled through a shared workbook.',
      formula: '=SUMIFS(D2:D500,B2:B500,"West",C2:C500,"Paid",A2:A500,">="&DATE(2026,6,1),A2:A500,"<"&DATE(2026,7,1))',
      read: 'The formula totals Amount values only when Region is West, Status is Paid, and Invoice Date falls inside June 2026. The checks tell you to confirm every criteria range covers the same rows and that the date column contains real dates.'
    }
  },
  'sourcetable-alternative': {
    gives: [
      'A focused formula request flow for Excel and Google Sheets instead of a full AI spreadsheet workspace.',
      'Write, Explain, and Fix modes with formula notes, optional table context, range hints, and paste checks.',
      'A low-friction path to try the tool: 2 guest tries, free email access at 3 runs per week, or $9 founding access for 500 runs per month in this browser.'
    ],
    useWhen: 'Use this page when you are comparing Sourcetable-style AI spreadsheet platforms but the immediate job is still small: write one formula, repair one broken formula, explain one inherited formula, or create one custom rule while staying in the workbook you already use.',
    notWhen: 'Use Sourcetable or another AI spreadsheet workspace when you need file upload, spreadsheet chat, AI analysis, pivots, charts, visualizations, data cleaning, AI research, SQL, Python, database or app connectors, or analysis across workbook tabs. Write My Formula is intentionally narrower so the formula and checks stay easy to inspect.',
    example: {
      setup: 'A lookup formula should return the amount for the customer in F2, but the inherited formula hides missing matches with a blank and makes it hard to tell what is being searched.',
      formula: '=IFNA(XLOOKUP(F2,$A$2:$A$500,$D$2:$D$500,"Not found",0),"Not found")',
      read: 'The formula searches Customer values in A, returns Amount from D, and gives a readable fallback when no exact match exists. The checks tell you to confirm the lookup and return ranges cover the same rows before filling it through the report.'
    }
  },
  'arcwise-alternative': {
    gives: [
      'A focused formula request flow for Excel and Google Sheets instead of an in-Sheets AI analyst workflow.',
      'Write, Explain, and Fix modes with formula notes, optional table context, range hints, and paste checks.',
      'A low-friction path to try the tool: 2 guest tries, free email access at 3 runs per week, or $9 founding access for 500 runs per month in this browser.'
    ],
    useWhen: 'Use this page when you are comparing Arcwise-style spreadsheet AI but the immediate job is still small: write one formula, repair one broken formula, explain one inherited formula, or create one custom rule from a browser tab.',
    notWhen: 'Use Arcwise or another in-Sheets AI analyst when you need AI analysis inside Google Sheets, connected warehouse data, large-data formulas, pivots, graphs, reports, PDF table extraction, ARCQUERY, GPT formulas, or custom AI functions in sheet cells. Write My Formula is intentionally narrower so the formula and checks stay easy to inspect.',
    example: {
      setup: 'A Google Sheets report needs prices filled from a lookup table, but the inherited ARRAYFORMULA is returning #N/A for blanks and missing products.',
      formula: '=ARRAYFORMULA(IF(A2:A="","",IFNA(VLOOKUP(A2:A,Prices!A:B,2,FALSE),"Not found")))',
      read: 'The formula leaves blank product rows blank, looks up nonblank products in the Prices table, and returns a readable fallback when no exact match exists. The checks tell you to confirm the lookup range covers the product and price columns before filling it through the report.'
    }
  },
  'bricks-ai-spreadsheet-alternative': {
    gives: [
      'A focused formula request flow for Excel and Google Sheets instead of a full AI spreadsheet workspace.',
      'Write, Explain, and Fix modes with formula notes, optional table context, range hints, and paste checks.',
      'A low-friction path to try the tool: 2 guest tries, free email access at 3 runs per week, or $9 founding access for 500 runs per month in this browser.'
    ],
    useWhen: 'Use this page when you are comparing Bricks-style AI spreadsheet workspaces but the immediate job is still small: write one formula, repair one broken formula, explain one inherited formula, or create one custom rule from a browser tab.',
    notWhen: 'Use Bricks or another AI spreadsheet workspace when you need file import, data cleaning, row analysis, dashboards, charts, reports, slides, templates, real-time collaboration, or AI changes inside a spreadsheet grid. Write My Formula is intentionally narrower so the formula and checks stay easy to inspect.',
    example: {
      setup: 'A regional invoice report needs the total paid West amount before the formula is filled through a shared workbook.',
      formula: '=SUMIFS(D2:D500,B2:B500,"West",C2:C500,"Paid")',
      read: 'The formula totals Amount values only when Region is West and Status is Paid. The checks tell you to confirm every SUMIFS range covers the same rows before filling it through the report.'
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
  'excel-formula-parse-error': {
    gives: [
      'A focused repair pass for one formula Excel refuses to accept.',
      'Checks for argument separators, quote marks, missing equal signs, parentheses, copied line breaks, and locale-specific syntax.',
      'A revised formula path you can test in a blank cell before replacing a report formula.'
    ],
    useWhen: 'Use this page when Excel says there is a problem with the formula before it calculates anything. It is strongest when you can paste the exact rejected formula and say whether it came from another locale, Google Sheets, a tutorial, or an AI answer.',
    notWhen: 'Do not use it as a full-file review. A parse message usually means Excel cannot read one formula entry, so repair the syntax first and then test the result separately for #VALUE!, #N/A, #REF!, or wrong-answer issues.',
    example: {
      setup: 'A copied IF formula can be rejected when the formula uses the wrong list separator for the Excel locale or includes smart quotes copied from a formatted page.',
      formula: '=IF(A2="Open",SUM(B2:D2),"")',
      read: 'The formula starts with an equal sign, uses straight quotes around the text value, and separates arguments with commas. If your Excel expects semicolons, change the separators before changing the IF logic.'
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
  'excel-date-formula-not-working': {
    gives: [
      'A focused repair pass for one Excel date formula.',
      'Checks for DATEVALUE parsing, regional date order, imported text dates, hidden time values, DATEDIF/TODAY logic, and date number formatting.',
      'A revised date formula or criteria pattern you can test against one known row before changing a report.'
    ],
    useWhen: 'Use this page when DATEVALUE returns #VALUE!, a date displays as a serial number, date criteria return zero rows, DATEDIF or TODAY logic gives the wrong interval, or imported dates behave like text. It is strongest when you can paste the formula and one date value that should work.',
    notWhen: 'Do not use it as a whole-workbook cleanup pass. Write My Formula can help repair one formula or criteria pattern, but source exports, regional settings, and final number formatting still need to be checked in Excel.',
    example: {
      setup: 'A report exports order dates as text, and the May total returns 0 because Excel is not comparing real date values.',
      formula: '=SUMIFS(C2:C500,A2:A500,">="&DATE(2026,5,1),A2:A500,"<"&DATE(2026,6,1))',
      read: 'The formula builds May 2026 date boundaries with DATE so Excel compares real date serials. If A contains text dates, convert or parse that column before relying on the criteria result.'
    }
  },
  'excel-table-formula-not-working': {
    gives: [
      'A focused fix pass for one Excel table formula using structured references.',
      'Checks for table names, column headers, @ row references, calculated-column fill behavior, and copied structured references.',
      'A revised formula path you can test in one table row before replacing the calculated column.'
    ],
    useWhen: 'Use this page when an Excel table formula does not fill down, stops using structured references, returns the wrong row, or breaks after a table or column rename. It is strongest when you can paste the exact formula plus the table name and headers it should reference.',
    notWhen: 'Do not assume a normal range behaves like an Excel table. Structured references, @ row context, and calculated columns only make sense when the source is an actual table and the formula is written for the right table location.',
    example: {
      setup: 'A table named Orders has a SKU column, and a separate Products table stores the price for each SKU.',
      formula: '=XLOOKUP([@SKU],Products[SKU],Products[Price],"Not found")',
      read: 'The [@SKU] reference reads the SKU from the current Orders row, while Products[SKU] and Products[Price] point at the full lookup and return columns in the Products table. Test the formula in one Orders row before applying it through the calculated column.'
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
  'excel-sumproduct-not-working': {
    gives: [
      'A focused fix pass for one SUMPRODUCT formula returning #VALUE!, 0, or a wrong total.',
      'Checks for same-size array arguments, text-stored numbers, hidden spaces, source-range errors, and full-column reference mismatches.',
      'A revised SUMPRODUCT path you can compare against one known included row before changing a report.'
    ],
    useWhen: 'Use this page when SUMPRODUCT is close enough to inspect but returns #VALUE!, 0, or a total that does not match known rows. It is strongest when you can paste the exact formula, the current result, and the ranges each array is supposed to cover.',
    notWhen: 'Do not hide SUMPRODUCT errors with IFERROR before checking array sizes and source values. A single mismatched range, text value, hidden space, or upstream error can change the whole result, so isolate the source before replacing the formula.',
    example: {
      setup: 'A report should total open South-region deal values, but SUMPRODUCT returns 0 or #VALUE! after the source data was imported.',
      formula: '=SUMPRODUCT((A2:A500="South")*(B2:B500="Open")*D2:D500)',
      read: 'The formula creates two TRUE/FALSE criteria arrays, multiplies them by the values in D, and sums the matching rows. Check that A2:A500, B2:B500, and D2:D500 are the same size and that D contains real numbers.'
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
  'excel-null-error': {
    gives: [
      'A focused fix pass for one formula returning #NULL!.',
      'Checks for accidental intersection spaces, missing commas, missing colons, named ranges, and non-overlapping references.',
      'A revised formula path you can test before hiding the range-operator problem with an error fallback.'
    ],
    useWhen: 'Use this page when Excel returns #NULL! because two references are separated by a space, a comma or colon was missed, or an intended intersection uses ranges that do not overlap. It is strongest when you can paste the exact formula and describe whether the ranges should combine, continue, or intersect.',
    notWhen: 'Do not hide #NULL! with IFERROR before checking the range operator. The formula may need a comma, a colon, or a real overlapping intersection, and a fallback can conceal a simple reference typo.',
    example: {
      setup: 'A summary formula should add two separate ranges, but a pasted space between the references makes Excel look for cells shared by both ranges.',
      formula: '=SUM(A2:A10,C2:C10)',
      read: 'The comma tells SUM to use two separate ranges. If the intended formula was one continuous block, use a colon instead; if the intended formula was an intersection, confirm the two ranges actually overlap.'
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
  'excel-offset-not-working': {
    gives: [
      'A focused repair pass for one OFFSET formula returning an error or the wrong range.',
      'Checks for invalid references, worksheet-edge offsets, height and width arguments, named-range size logic, and volatile recalculation tradeoffs.',
      'A revised OFFSET direction, or a clearer INDEX-style alternative when OFFSET is the source of the confusion.'
    ],
    useWhen: 'Use this page when an Excel OFFSET formula returns #REF!, #VALUE!, points at the wrong cells, or behaves differently inside a dynamic named range. It is strongest when you can paste the formula and describe the range Excel should return.',
    notWhen: 'Do not use this as a whole-model rebuild or a review of every formula in the file. OFFSET problems are easiest to repair one formula or one named-range definition at a time, especially when helper functions such as COUNTA or MATCH control the returned size.',
    example: {
      setup: 'An OFFSET formula can return #REF! when a negative row argument pushes the reference above the first worksheet row.',
      formula: '=OFFSET(A1,-2,0,1,1)',
      read: 'The row shift asks Excel to move two rows above A1, which is outside the sheet. A repair path starts by anchoring the formula to a valid starting cell or changing the row-offset logic before the result is used in SUM, COUNTA, or a named range.'
    }
  },
  'excel-unique-not-working': {
    gives: [
      'A focused repair pass for one Excel UNIQUE formula.',
      'Checks for hidden characters, stored value types, multi-column row uniqueness, exactly_once behavior, by_col direction, blocked output cells, and version support.',
      'A revised UNIQUE path you can test on a small sample before replacing a report formula.'
    ],
    useWhen: 'Use this page when Excel UNIQUE keeps apparent duplicates, removes more rows than expected, returns unique row combinations instead of one distinct field, spills in the wrong direction, or returns #SPILL!. It is strongest when you can paste the exact formula and two source rows that should deduplicate.',
    notWhen: 'Do not use it as a workbook cleanup audit. UNIQUE compares the values and ranges it receives; source cleanup, version support, blocked output cells, and downstream report logic may still need separate checks in Excel.',
    example: {
      setup: 'A customer list in A2:A500 has repeated emails, but some imported entries include trailing spaces. UNIQUE appears to keep duplicates because the underlying text differs.',
      formula: '=UNIQUE(TRIM(A2:A500))',
      read: 'The formula trims leading and trailing spaces before returning the distinct email list. Test the result on a small copied range first, especially if capitalization, non-printing characters, or stored number formats matter.'
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
  'google-sheets-formula-not-updating': {
    gives: [
      'A focused repair pass for one Google Sheets formula that appears stuck on an old result.',
      'Checks for recalculation settings, volatile functions, shifted ranges, imported text values, and copied-reference problems.',
      'A revised formula path you can test against one known changed row before editing a shared report.'
    ],
    useWhen: 'Use this page when a Google Sheets formula does not update after source data changes, updates only after a reload or manual edit, or gives a stale dashboard value after an import or form response. It is strongest when you can paste the exact formula, the changed source value, and the result you expected.',
    notWhen: 'Do not use it as proof that every stale value in the file is fixed. Spreadsheet-wide calculation settings and large-sheet performance can affect many formulas; this repair starts with the one formula and context you type into the form.',
    example: {
      setup: 'A dashboard should total paid rows for today, but the total stays the same after new rows are added.',
      formula: '=SUMIFS(D2:D500,B2:B500,"Paid",A2:A500,TODAY())',
      read: 'The formula checks a fixed source range, the Paid status, and today\'s date. If new rows land below row 500, the range must expand; if TODAY is involved, the sheet calculation setting also matters.'
    }
  },
  'google-sheets-date-formula-not-working': {
    gives: [
      'A focused repair pass for one Google Sheets date formula.',
      'Checks for DATEVALUE parsing, locale order, imported text dates, hidden time values, QUERY date literals, and date number formatting.',
      'A revised date formula or criteria pattern you can test against one known row before using it in a report.'
    ],
    useWhen: 'Use this page when DATEVALUE says it cannot parse a date, a formula returns a serial number instead of a displayed date, date criteria return zero rows, or QUERY, FILTER, SUMIFS, COUNTIFS, or SORT behave as if dates are text. It is strongest when you can paste the formula and one date value that should work.',
    notWhen: 'Do not treat it as a full data-cleaning audit. Write My Formula can help repair one formula or criteria pattern, but source exports, spreadsheet locale settings, and final date formatting still need to be checked in Google Sheets.',
    example: {
      setup: 'An export puts date text in A2, but DATEVALUE cannot parse the mixed string until the usable date portion is extracted first.',
      formula: '=DATEVALUE(REGEXEXTRACT(A2,"\\d{4}-\\d{2}-\\d{2}"))',
      read: 'The formula extracts a yyyy-mm-dd date string before DATEVALUE converts it. After conversion, the result may still need to be formatted as a date instead of a plain serial number.'
    }
  },
  'google-sheets-if-formula-not-working': {
    gives: [
      'A focused repair pass for one Google Sheets IF formula.',
      'Checks for logical tests, true/false branch order, missing false outputs, AND/OR conditions, quoted text, blank-looking values, and locale separators.',
      'A revised IF path you can test against one true row and one false row before changing a shared sheet.'
    ],
    useWhen: 'Use this page when Google Sheets IF returns FALSE, blank, the wrong label, a parse error, or a nested-IF result you cannot trust. It is strongest when you can paste the formula plus one row that should pass the condition and one row that should fail it.',
    notWhen: 'Do not use it as a full decision-table rebuild or file review. IF repair starts with one formula and the row examples you type into the form; larger rule systems, protected ranges, and imported data cleanup may still need separate checks.',
    example: {
      setup: 'A fulfillment sheet should mark paid orders with a positive quantity as Ready, but the formula was returning FALSE for rows that need review.',
      formula: '=IF(AND(B2="Paid",C2>0),"Ready","Review")',
      read: 'The formula tests both conditions with AND, returns Ready only when status and quantity both pass, and provides an explicit Review result when either condition fails instead of leaving the false branch implicit.'
    }
  },
  'google-sheets-circular-dependency': {
    gives: [
      'A focused repair pass for one Google Sheets formula with a circular dependency.',
      'Checks for direct self-references, self-including ranges, helper-cell loops, and iterative-calculation settings.',
      'A revised formula direction you can test before changing a shared sheet or enabling iteration.'
    ],
    useWhen: 'Use this page when Google Sheets shows "Circular dependency detected," returns #REF! with a circular-reference warning, or suggests iterative calculation after a formula edit. It is strongest when you can paste the formula, name the formula cell, and describe the intended source range.',
    notWhen: 'Do not turn on iterative calculation just to silence the warning. Iteration can be valid for deliberate models, but accidental circular dependencies should usually be fixed by moving the formula, narrowing the range, or splitting the logic into helper cells.',
    example: {
      setup: 'A total formula lives in D2, but it accidentally totals D2:D20, so the result cell is inside the range being summed.',
      formula: '=SUM(D3:D20)',
      read: 'The repaired formula starts below D2, which keeps the total cell out of its own source range. If D2 should summarize rows below it, the range should begin at the first data row, not the formula cell.'
    }
  },
  'google-sheets-sumifs-not-working': {
    gives: [
      'A focused repair pass for one Google Sheets SUMIFS formula.',
      'Checks for range-size mismatches, criteria order, date criteria, hidden spaces, text-stored numbers, and locale separators.',
      'A revised SUMIFS path you can test against one known matching row before changing a shared report.'
    ],
    useWhen: 'Use this page when Google Sheets SUMIFS returns 0, #VALUE!, an obviously wrong total, or a plausible total you cannot trust. It is strongest when you can paste the formula, the source headers, and one row that should be included in the sum.',
    notWhen: 'Do not use it as full-file inspection. The repair starts with one formula and the surrounding context you type into the form; protected ranges, imported data cleanup, and larger report logic may still need separate checks.',
    example: {
      setup: 'A revenue sheet should sum March 2026 revenue for Acme, but one criteria range is one row longer than the sum range.',
      formula: '=SUMIFS(D2:D500,B2:B500,"Acme",A2:A500,">="&DATE(2026,3,1),A2:A500,"<"&DATE(2026,4,1))',
      read: 'The repaired formula keeps the sum range and both criteria ranges aligned from row 2 through row 500. It also builds the date criteria with DATE so Sheets compares against real date values instead of a loose text string.'
    }
  },
  'google-sheets-countifs-not-working': {
    gives: [
      'A focused repair pass for one Google Sheets COUNTIFS formula.',
      'Checks for criteria-range mismatches, date criteria, hidden spaces, text-stored values, empty criteria references, and locale separators.',
      'A revised COUNTIFS path you can test against one matching row and one non-matching row before changing a shared report.'
    ],
    useWhen: 'Use this page when Google Sheets COUNTIFS returns 0, #VALUE!, a wrong count, or a count you cannot reconcile with visible rows. It is strongest when you can paste the formula, the source headers, and one row that should match every criterion.',
    notWhen: 'Do not use it as full-sheet inspection. COUNTIFS repair starts with one formula and the surrounding context you type into the form; imported data cleanup, protected ranges, and larger report logic may still need separate checks.',
    example: {
      setup: 'A subscription sheet should count paid rows in March 2026, but one date criteria range was copied one row longer than the status range.',
      formula: '=COUNTIFS(B2:B500,"Paid",A2:A500,">="&DATE(2026,3,1),A2:A500,"<"&DATE(2026,4,1))',
      read: 'The repaired formula keeps the status and date ranges aligned from row 2 through row 500. It also builds the date criteria with DATE so Sheets compares against real date values instead of a loose text string.'
    }
  },
  'google-sheets-num-error': {
    gives: [
      'A focused repair pass for one Google Sheets formula returning #NUM!.',
      'Checks for invalid numeric inputs, non-converging financial functions, impossible math, out-of-range positions, and oversized results.',
      'A revised formula direction you can test before hiding the numeric problem with a broad fallback.'
    ],
    useWhen: 'Use this page when Google Sheets returns #NUM! because a formula asks for a number Sheets cannot calculate with, a financial function such as XIRR or RATE cannot find a result, or an INDEX/random selection points outside the source range. It is strongest when you can paste the formula and include the input values that trigger the error.',
    notWhen: 'Do not use IFERROR as the first fix if the numeric problem changes the meaning of the result. A clean fallback can hide a failed financial calculation, invalid date or amount, or source-range size problem that should be checked directly.',
    example: {
      setup: 'An XIRR formula can return #NUM! when the cash-flow dates and values do not give Sheets enough valid inputs to settle on a result.',
      formula: '=XIRR(B2:B12,A2:A12)',
      read: 'The formula uses the cash-flow values in B and the matching dates in A. The checks tell you to confirm the values include the signs and dates needed for a meaningful rate before relying on a fallback.'
    }
  },
  'google-sheets-sort-not-working': {
    gives: [
      'A focused repair pass for one Google Sheets SORT formula.',
      'Checks for selected range boundaries, header-row handling, sort_column position, stored dates or numbers, and secondary sort keys.',
      'A revised SORT path you can test against one known row before replacing a shared report formula.'
    ],
    useWhen: 'Use this page when Google Sheets SORT returns the wrong order, moves headers into the sorted output, separates row values that should stay together, or sorts dates and numbers alphabetically. It is strongest when you can paste the formula, the source headers, and one row that is visibly out of order.',
    notWhen: 'Do not use it as proof that every related formula in the sheet survived a menu sort. SORT repair starts with one formula and source range; formulas outside the sorted output, protected ranges, and typed side columns may still need separate checks.',
    example: {
      setup: 'A task table has headers in row 1 and due dates in column C. The result should sort the data rows by due date without moving the header into the output.',
      formula: '=SORT(A2:D500,C2:C500,TRUE)',
      read: 'The formula excludes the header row by starting at A2:D500 and sorts those same rows by the due-date values in C2:C500. If the due dates are stored as text, the source values need cleanup before the order can be trusted.'
    }
  },
  'google-sheets-unique-not-working': {
    gives: [
      'A focused repair pass for one Google Sheets UNIQUE formula.',
      'Checks for hidden spaces, stored value types, multi-column row uniqueness, by_column mode, exactly_once behavior, and blocked output cells.',
      'A revised UNIQUE path you can test on a small sample before changing a shared report.'
    ],
    useWhen: 'Use this page when UNIQUE keeps apparent duplicates, removes more rows than expected, returns unique row combinations instead of one unique field, or behaves differently after it is wrapped around FILTER or SORT. It is strongest when you can paste the exact formula and two source values or rows that should deduplicate.',
    notWhen: 'Do not assume every visible duplicate is identical. UNIQUE compares the underlying values in the selected range, so hidden spaces, non-printing characters, stored text versus numbers, capitalization choices, and extra columns can all make rows distinct.',
    example: {
      setup: 'A form export has customer emails in A2:A, but some entries include trailing spaces. UNIQUE appears to keep duplicates because the underlying text is different.',
      formula: '=UNIQUE(ARRAYFORMULA(TRIM(A2:A)))',
      read: 'The formula trims hidden leading and trailing spaces before deduplicating the email list. If capitalization matters in the source workflow, normalize case only after deciding how the list should treat those entries.'
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
  'google-sheets-ref-error': {
    gives: [
      'A focused repair pass for one Google Sheets formula returning #REF!.',
      'Checks for deleted tabs, invalid ranges, moved references, IMPORTRANGE access or range issues, blocked array output, and broken INDIRECT strings.',
      'A rebuilt reference path you can test on one small range before changing a shared sheet.'
    ],
    useWhen: 'Use this page when Google Sheets returns #REF! because a formula points at a tab, row, column, import, spill area, or text-built reference that is no longer valid. It is strongest when you can paste the exact formula and describe what changed before the error appeared.',
    notWhen: 'Do not hide #REF! with IFERROR before replacing the missing reference. The error usually means Sheets cannot use part of the formula path, so the first job is to identify the intended current source range or output area.',
    example: {
      setup: 'A summary formula used to total values from an Archive tab, but the tab was renamed to Closed Orders.',
      formula: '=SUM(\'Closed Orders\'!B2:B500)',
      read: 'The repaired formula points at the current tab name and quotes it because the sheet name contains a space. After replacing the broken reference, test the range on a small slice before copying the formula elsewhere.'
    }
  },
  'google-sheets-value-error': {
    gives: [
      'A focused repair pass for one Google Sheets formula returning #VALUE!.',
      'Checks for imported text numbers, date text, VALUE parsing, hidden spaces, range shapes, and wrong argument types.',
      'A revised formula path you can test on one known row before changing a shared report.'
    ],
    useWhen: 'Use this page when Google Sheets shows #VALUE!, says a VALUE parameter cannot be parsed, or fails because a formula expected a number/date/logical value but received text or a mismatched range. It is strongest when you can paste the exact formula and one source value that should work.',
    notWhen: 'Do not make #VALUE! disappear with a broad IFERROR before checking the input type. The error often points to imported text, symbols, hidden spaces, date text, or a range mismatch that should be fixed before the formula is trusted.',
    example: {
      setup: 'A report imports amounts such as $1,240.50 as text in column B, and column C contains quantities. The formula should multiply the cleaned amount by the quantity.',
      formula: '=IFERROR(VALUE(REGEXREPLACE(B2,"[$,]",""))*C2,"Check imported amount")',
      read: 'The formula removes currency symbols and commas from B2, converts the remaining text to a number, and multiplies by C2. The fallback is limited to the conversion path so the row can be reviewed instead of silently trusted.'
    }
  },
  'google-sheets-na-error': {
    gives: [
      'A focused repair pass for one Google Sheets formula returning #N/A.',
      'Checks for lookup keys, no-match FILTER results, range selection, hidden spaces, stored value types, and fallback placement.',
      'A revised formula path you can test on one known match and one true missing value before changing a shared report.'
    ],
    useWhen: 'Use this page when Google Sheets returns #N/A, says it did not find a value, or shows no matches even though a lookup value or FILTER condition appears to match the source data. It is strongest when you can paste the formula, the source headers, and one value or row that should match.',
    notWhen: 'Do not hide every #N/A with IFERROR before checking the source data. A missing match may be correct, while a surprising #N/A often points to the wrong range, stored text versus numbers, hidden spaces, or a fallback placed before the formula is understood.',
    example: {
      setup: 'A product table in A2:D500 has SKU in the first column and status in the fourth column. E2 contains a SKU from an imported order file that should match the product table.',
      formula: '=IFNA(VLOOKUP(TRIM(E2),$A$2:$D$500,4,FALSE),"Not found")',
      read: 'The formula trims hidden spaces from the imported lookup value, searches the first column of the product table with exact match, and returns the status from column 4. The IFNA fallback appears only after the range and source values have been checked.'
    }
  },
  'google-sheets-div0-error': {
    gives: [
      'A focused repair pass for one Google Sheets formula returning #DIV/0!.',
      'Checks for zero or blank denominators, calculated divisor cells, ratio logic, averages, and fallback placement.',
      'A revised formula path you can test against one valid denominator and one zero or blank denominator before changing a shared report.'
    ],
    useWhen: 'Use this page when Google Sheets returns #DIV/0!, says a function parameter cannot divide by zero, or shows divide-by-zero errors in ratios, percentages, averages, margins, or score formulas. It is strongest when you can paste the exact formula and one row where the denominator should be valid.',
    notWhen: 'Do not wrap the whole formula in IFERROR before checking the denominator. IFERROR can be right for a finished report, but it can also hide unrelated reference, value, lookup, or parse problems that should stay visible while you repair the formula.',
    example: {
      setup: 'A report calculates conversion rate from signups in B and visits in C. Rows with no visits yet should stay blank, but rows with visits should calculate normally.',
      formula: '=IF(C2=0,,B2/C2)',
      read: 'The formula checks the denominator directly, returns a blank only when visits are zero, and performs the division when the denominator is available. Other formula errors remain visible instead of being hidden by a broad IFERROR wrapper.'
    }
  },
  'google-sheets-name-error': {
    gives: [
      'A focused repair pass for one Google Sheets formula returning #NAME? or Unknown range name.',
      'Checks for misspelled functions, deleted named ranges, named-function conflicts, unquoted text, copied-sheet references, and locale differences.',
      'A revised formula path you can test on one known row before changing a shared sheet.'
    ],
    useWhen: 'Use this page when Google Sheets cannot read a name in your formula: a function name, a named range, a named function, text that should have been quoted, or a reference copied from another file. It is strongest when you can paste the exact formula and the name Sheets highlights.',
    notWhen: 'Do not hide #NAME? with IFERROR before fixing the name Sheets cannot resolve. The error usually means the formula text itself points at something Sheets does not recognize, so the repair should start with the function, named range, named function, or quoted text.',
    example: {
      setup: 'A formula tries to sum a named range typed as My Range. Google Sheets reads the space as separate formula text, so it reports Unknown range name instead of summing the intended values.',
      formula: '=SUM(My_Range)',
      read: 'The repaired formula uses a named range with an underscore so Sheets can read it as one name. If the range was deleted or renamed, confirm it under Data, Named ranges before filling the formula elsewhere.'
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
  'google-sheets-importxml-not-working': {
    gives: [
      'A focused repair pass for one Google Sheets IMPORTXML formula.',
      'Checks for URL quoting, protocol, XPath syntax, page visibility to Sheets, result-size limits, and safer fallback handling.',
      'A revised XPath or import strategy you can test against one expected page value before filling a report.'
    ],
    useWhen: 'Use this page when IMPORTXML returns #N/A, Imported content is empty, Could not fetch URL, a maximum-size message, or the wrong page value. It is strongest when you can paste the exact formula, the target URL, the visible error, and the specific text or attribute the formula should return.',
    notWhen: 'Do not treat IMPORTXML as a full web-scraping system. If the page content is rendered only after JavaScript runs, blocked from Google fetches, behind a login, or no longer present in the page source, a formula rewrite may not be enough.',
    example: {
      setup: 'A product page has price text in a span with class price. A shorter attribute-based XPath is usually easier to maintain than a full copied browser path.',
      formula: '=IMPORTXML("https://example.com/products/widget","//span[contains(@class,\'price\')]/text()")',
      read: 'The formula gives Sheets a quoted URL and a quoted XPath that targets price text directly. If the page does not expose that text in the HTML Sheets can fetch, the page source or data source has to be checked before adding IFERROR.'
    }
  },
  'google-sheets-regexextract-not-working': {
    gives: [
      'A focused repair pass for one Google Sheets REGEXEXTRACT formula.',
      'Checks for no-match #N/A results, text-only input, capture groups, escaped characters, greedy patterns, and RE2 syntax limits.',
      'A revised pattern path you can test against one matching cell and one non-matching cell before filling it through imported data.'
    ],
    useWhen: 'Use this page when REGEXEXTRACT returns #N/A, says the pattern does not match the text, extracts too much text, spills unexpected capture groups, or fails after a regex was copied from another tool. It is strongest when you can paste the exact formula, one sample input cell, and the exact substring you wanted back.',
    notWhen: 'Do not use it as proof that a whole import or scraping workflow is correct. REGEXEXTRACT can repair one text pattern, but source data changes, locale formatting, Apps Script behavior, and downstream numeric calculations may still need separate checks.',
    example: {
      setup: 'Column A contains imported order labels such as Order #A-1048 - paid. The formula should extract only the order code after the label.',
      formula: '=REGEXEXTRACT(TO_TEXT(A2),"Order #([A-Z]-\\d+)")',
      read: 'The formula converts the input to text before matching, looks for the literal label, and captures only the order code. If some rows omit the space or use a different prefix, the pattern should be loosened before wrapping the result in IFERROR.'
    }
  },
  'google-sheets-conditional-formatting-not-working': {
    gives: [
      'A corrected Google Sheets custom formula to try in the conditional-formatting sidebar.',
      'A plain-English read of the apply-to range, top-left cell, dollar-sign anchors, and TRUE/FALSE condition.',
      'Checks for rule order, copied formatting rules, and cross-sheet references that need INDIRECT.'
    ],
    useWhen: 'Use this when a Google Sheets conditional-formatting custom formula highlights nothing, highlights the wrong rows, works in a normal cell but not in the rule, or changes behavior after copying formatting from another range.',
    notWhen: 'Do not use this as a broad spreadsheet formatting audit. It is for one custom formula rule and the range that rule applies to.',
    example: {
      setup: 'The apply-to range is A2:C100. Due dates are in column B, status is in column C, and the whole row should highlight when the due date is before today and status is not Done.',
      formula: '=AND($B2<TODAY(),$C2<>"Done")',
      read: 'The dollar signs lock columns B and C so every formatted cell in the row checks the same due date and status. The row number stays relative, so row 3 checks B3 and C3.'
    }
  },
  'google-sheets-data-validation-formula-not-working': {
    gives: [
      'A focused repair pass for one Google Sheets data-validation custom formula.',
      'Checks for Show warning versus Reject input, TRUE/FALSE output, first-cell references, locked ranges, and copied-rule behavior.',
      'A revised validation formula path you can test with one allowed entry and one rejected entry before applying it broadly.'
    ],
    useWhen: 'Use this page when a Google Sheets data validation custom formula accepts entries it should block, rejects entries it should allow, only shows warning triangles, or changes behavior after the rule is copied to another range. It is strongest when you can paste the formula, applied range, first cell, and one pass/fail example.',
    notWhen: 'Do not use it as a broad data-quality audit. Data validation controls future entry behavior for the rule you set; existing values, pasted data, protected ranges, and Apps Script workflows may still need separate checks.',
    example: {
      setup: 'The validation rule is applied to C2:C100. Owner is required only when Status in column B is Open.',
      formula: '=OR($B2<>"Open",LEN(C2)>0)',
      read: 'The formula returns TRUE when the row is not Open or when the current Owner cell is filled. Column B stays locked because the status check always reads the same row in B, while C2 stays relative so each validated cell checks itself.'
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
  'google-sheets-match-not-working': {
    gives: [
      'A focused repair pass for one Google Sheets MATCH formula.',
      'Checks for search_type, exact-match mode, sorted approximate-match ranges, one-dimensional lookup ranges, and stored value mismatches.',
      'A revised MATCH path you can test by itself before it feeds INDEX or another lookup formula.'
    ],
    useWhen: 'Use this page when Google Sheets MATCH returns #N/A, gives a wrong position, changes after a sort, or feeds a bad row or column number into INDEX MATCH. It is strongest when you can paste the formula, the searched row or column, and one value that should match.',
    notWhen: 'Do not hide MATCH with IFERROR before checking search_type, sort order, range shape, and source values. A #N/A result may be the correct signal that the lookup value is missing, stored differently, or being searched in a two-dimensional range.',
    example: {
      setup: 'A product list has SKUs in A2:A500, and E2 contains the SKU you need to locate before an INDEX formula returns the price.',
      formula: '=IFNA(MATCH(TRIM(E2),$A$2:$A$500,0),"Not found")',
      read: 'The formula trims the lookup value, searches one SKU column with exact match, and returns the relative position. Test this MATCH result before using it as the row number inside INDEX.'
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
  'excel-textjoin-not-working': {
    gives: [
      'A focused repair pass for one TEXTJOIN formula returning #VALUE!, #NAME?, blank output, or unwanted delimiters.',
      'Checks for delimiter quoting, TRUE/FALSE empty handling, text ranges, IF or FILTER criteria, line-break delimiters, version support, and Excel cell-length limits.',
      'A revised TEXTJOIN path you can test on a short source range before changing a larger report.'
    ],
    useWhen: 'Use this page when TEXTJOIN is close but not reliable: it joins the wrong cells, leaves extra separators, returns blank output, shows #VALUE!, or fails inside an IF or FILTER condition. Paste the formula and a small sample of the rows that should be included.',
    notWhen: 'Do not hide TEXTJOIN errors with IFERROR before checking the delimiter, ignore_empty argument, source ranges, and final text length. A #VALUE! result can mean the joined string is too long for one Excel cell.',
    example: {
      setup: 'A report has customer IDs in A and notes in B. E2 contains one customer ID, and the formula should join only that customer\'s notes with comma separators.',
      formula: '=TEXTJOIN(", ",TRUE,FILTER($B$2:$B$500,$A$2:$A$500=E2))',
      read: 'The formula filters notes to the matching customer ID, joins only the visible matches, and ignores empty values. Test the FILTER result separately if the joined output is blank or returns an error.'
    }
  },
  'excel-textbefore-textafter-not-working': {
    gives: [
      'A focused repair pass for one TEXTBEFORE or TEXTAFTER formula.',
      'Checks for delimiter presence, exact spaces and punctuation, instance_num, match_mode, match_end, if_not_found, and version support.',
      'A revised text-extraction path you can test on one source value before filling it through an imported list.'
    ],
    useWhen: 'Use this page when TEXTBEFORE or TEXTAFTER returns #N/A, #VALUE!, #NAME?, the wrong segment, or a fallback that looks blank. It is strongest when you can paste the formula and one source text value that should extract correctly.',
    notWhen: 'Do not hide every delimiter miss with IFERROR before checking the source text. A missing delimiter may be a real data-quality signal, and a wrong segment often means the occurrence number, case matching, or end-matching behavior needs to be deliberate.',
    example: {
      setup: 'A list has email addresses in A2:A500, and the formula should extract the domain after the @ symbol while leaving rows without @ easy to review.',
      formula: '=TEXTAFTER(A2,"@",1,0,0,"Missing @")',
      read: 'The formula looks after the first @ symbol, uses case-sensitive matching by default, does not treat the end of the text as a delimiter, and returns Missing @ only after the delimiter check fails.'
    }
  },
  'excel-textsplit-not-working': {
    gives: [
      'A focused repair pass for one TEXTSPLIT formula.',
      'Checks for exact delimiters, row-versus-column split direction, empty tokens, case matching, #N/A padding, blocked spill ranges, and version support.',
      'A revised TEXTSPLIT direction you can test on one source text value before filling it through an import or report.'
    ],
    useWhen: 'Use this page when TEXTSPLIT leaves the text unchanged, splits on the wrong character, returns #SPILL!, fills extra cells with #N/A, or behaves differently after a workbook is opened in another Excel version. It is strongest when you can paste the formula and one text value that should split.',
    notWhen: 'Do not treat every TEXTSPLIT problem as a formula-writing problem. The formula may be valid while the output range is blocked, the source text uses a different delimiter, or the current Excel version cannot run TEXTSPLIT.',
    example: {
      setup: 'A cell contains comma-space separated tags, but the formula uses only a comma delimiter and leaves leading spaces in the split values.',
      formula: '=TRIM(TEXTSPLIT(A2,", "))',
      read: 'The formula splits on the exact comma-space delimiter and trims each returned value. If the source sometimes uses semicolons, line breaks, or inconsistent spaces, handle those delimiter cases deliberately before filling the formula down.'
    }
  },
  'excel-indirect-not-working': {
    gives: [
      'A focused repair pass for one INDIRECT formula returning #REF!, a wrong cell, or a broken dropdown reference.',
      'Checks for valid reference text, tab-name quoting, named-range scope, closed source workbooks, and Excel for the web limitations.',
      'A revised INDIRECT path you can test against the resolved reference before changing a shared workbook or data-validation rule.'
    ],
    useWhen: 'Use this page when INDIRECT is close but brittle: it returns #REF!, points at the wrong tab or cell, fails inside a dependent dropdown, or behaves differently after a workbook, sheet name, named range, or browser-hosted file changes. Paste the formula and the text value it is trying to turn into a reference.',
    notWhen: 'Do not use it for a whole-workbook reference audit or as proof every linked workbook is healthy. INDIRECT depends on the exact text it receives, source workbook state, and Excel environment, so test the repaired formula on one known reference first.',
    example: {
      setup: 'A summary sheet stores a tab name in A1, and the formula should pull B2 from that tab. The tab is named Q1 Sales, so the sheet name needs apostrophe wrapping inside the reference text.',
      formula: '=INDIRECT("\'"&A1&"\'!B2")',
      read: 'The formula builds a reference like \'Q1 Sales\'!B2 before INDIRECT evaluates it. Without the apostrophes, sheet names with spaces can turn into invalid reference text and return #REF!.'
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
  'excel-match-not-working': {
    gives: [
      'A focused repair pass for one MATCH formula returning #N/A, a wrong position, or a result that breaks INDEX MATCH.',
      'Checks for exact-match mode, omitted match_type defaults, sorted lookup arrays, hidden spaces, and stored text-number mismatches.',
      'A revised MATCH path you can test by itself before it feeds INDEX, CHOOSE, or another lookup formula.'
    ],
    useWhen: 'Use this page when MATCH is close but not trustworthy: it returns #N/A, returns the wrong position, changes after a sort, or feeds a bad row or column number into INDEX MATCH. Paste the formula and one value that should match.',
    notWhen: 'Do not hide MATCH with IFERROR before checking match_type, sort order, and source values. A #N/A result may be the correct signal that the lookup value is missing or stored differently from the source range.',
    example: {
      setup: 'A product list has SKUs in A2:A500, and E2 contains the SKU you need to locate before an INDEX formula returns the price.',
      formula: '=IFNA(MATCH(TRIM(E2),$A$2:$A$500,0),"Not found")',
      read: 'The formula trims the lookup value, searches the SKU range with exact match, and returns the relative position only after the source range has been checked for matching stored values.'
    }
  },
  'excel-xmatch-not-working': {
    gives: [
      'A focused repair pass for one XMATCH formula returning #N/A, #VALUE!, a wrong position, or a result that breaks INDEX XMATCH.',
      'Checks for match_mode, search_mode, wildcard mode, binary-search sort order, duplicate search direction, stored types, and Excel version support.',
      'A revised XMATCH path you can test by itself before it feeds INDEX, CHOOSE, or another lookup formula.'
    ],
    useWhen: 'Use this page when XMATCH is close but not trustworthy: it returns #N/A, returns #VALUE!, finds the first duplicate when you needed the last, treats wildcards as literal text, or returns the wrong position after a search_mode change. Paste the formula and one value that should match.',
    notWhen: 'Do not hide XMATCH with IFERROR before checking match_mode, search_mode, sorted-data requirements, and source values. A #N/A or wrong position may be the correct signal that the lookup value, range, sort order, or stored data type changed.',
    example: {
      setup: 'A product table has SKUs in A2:A500 and prices in C2:C500. E2 contains the SKU to locate before INDEX returns the price.',
      formula: '=INDEX($C$2:$C$500,XMATCH(TRIM(E2),$A$2:$A$500,0,1))',
      read: 'XMATCH searches the SKU range with exact match, returns the relative row position, and INDEX uses that position to return the price. If the newest duplicate should win, change the search direction deliberately instead of leaving the default first-to-last search.'
    }
  },
  'excel-sort-not-working': {
    gives: [
      'A focused repair pass for one SORT formula returning #SPILL!, #NAME?, the wrong order, or separated row fields.',
      'Checks for blocked spill ranges, sort_index counted from the selected array, sort_order, by_col, header rows, source-range width, stored text values, and Excel version support.',
      'A revised SORT path you can test on one small range before replacing a report formula.'
    ],
    useWhen: 'Use this page when SORT is close but not trustworthy: it spills into blocked cells, sorts by the wrong column, pulls the header into the results, sorts dates or numbers alphabetically, or rearranges only part of each record. Paste the formula and a small sample of the range it should sort.',
    notWhen: 'Do not hide SORT errors with IFERROR before checking the output range, selected array, sort_index, and stored value types. A #SPILL! result can mean the formula is valid but the destination cells are not available.',
    example: {
      setup: 'A report has headers in row 1 and data in A2:D500. The output should sort whole rows by the third column, newest or highest first, without moving the header row into the result.',
      formula: '=SORT(A2:D500,3,-1)',
      read: 'The formula sorts the data rows only, counts the third column relative to A:D, and uses -1 for descending order. If the result returns #SPILL!, check the cells below the formula before changing the sort logic.'
    }
  },
  'excel-vstack-hstack-not-working': {
    gives: [
      'A focused repair pass for one VSTACK or HSTACK formula returning #N/A, #SPILL!, #NAME?, or the wrong combined layout.',
      'Checks for uneven array widths or heights, expected padding, blocked spill ranges, table placement, stack direction, and Excel version support.',
      'A revised stack formula direction you can test on a small sample before replacing a report formula.'
    ],
    useWhen: 'Use this page when VSTACK or HSTACK is close but not trustworthy: the formula pads the combined result with #N/A, spills into blocked cells, is not recognized in the workbook, or combines rows and columns in the wrong direction. It is strongest when you can paste the formula and the source range sizes.',
    notWhen: 'Do not treat every #N/A in a stacked array as a lookup failure. With VSTACK and HSTACK, #N/A can be expected padding when one array is narrower or shorter than the largest array being combined.',
    example: {
      setup: 'A workbook combines two department extracts. One extract has three columns and another has only two, so VSTACK pads the missing third column with #N/A.',
      formula: '=IFNA(VSTACK(A2:C20,F2:H20),"")',
      read: 'The formula stacks both extracts vertically and turns expected padding into blanks. Before using the fallback, check whether the missing column should be mapped, added, or left blank.'
    }
  },
  'excel-choosecols-chooserows-not-working': {
    gives: [
      'A focused repair pass for one CHOOSECOLS or CHOOSEROWS formula returning #VALUE!, #NAME?, #SPILL!, or the wrong selected rows or columns.',
      'Checks for zero and out-of-range positions, array-relative counting, blocked spill output, supported Excel versions, and nested dynamic-array errors.',
      'A revised selection formula you can test on a small source array before replacing a report formula.'
    ],
    useWhen: 'Use this page when CHOOSECOLS or CHOOSEROWS is close but not reliable: it returns #VALUE!, is not recognized, spills into blocked cells, chooses the wrong rows or columns, or fails after wrapping FILTER, INDEX, SORT, TAKE, or DROP. It is strongest when you can paste the full nested formula and the source array shape.',
    notWhen: 'Do not use table column names, sheet letters, or absolute row numbers where CHOOSECOLS and CHOOSEROWS expect numeric positions inside the returned array. First confirm the array produced by the first argument, then count from that array.',
    example: {
      setup: 'A filtered report should return only the customer, status, and amount columns from a six-column source after keeping open rows.',
      formula: '=CHOOSECOLS(FILTER(A2:F500,C2:C500="Open"),1,3,6)',
      read: 'FILTER creates the reduced source array first. CHOOSECOLS then returns columns 1, 3, and 6 relative to that filtered array. If column 6 no longer exists after the nested step, Excel returns #VALUE!.'
    }
  },
  'excel-take-drop-not-working': {
    gives: [
      'A focused repair pass for one TAKE or DROP formula returning #CALC!, #NUM!, #NAME?, #SPILL!, or the wrong slice of a dynamic array.',
      'Checks for zero counts, empty arrays, oversized array requests, positive and negative direction, blocked spill output, supported Excel versions, and nested dynamic-array errors.',
      'A revised TAKE or DROP path you can test on a small source array before replacing a report formula.'
    ],
    useWhen: 'Use this page when TAKE or DROP is close but not reliable: it returns #CALC!, is not recognized, spills into blocked cells, keeps the wrong rows or columns, drops too much, or fails after wrapping FILTER, SORT, VSTACK, HSTACK, CHOOSECOLS, or CHOOSEROWS. It is strongest when you can paste the full nested formula and the source array shape.',
    notWhen: 'Do not hide TAKE or DROP with IFERROR before checking the rows and columns arguments. A 0 count or a DROP formula that removes every row or column can produce an empty array that needs a formula decision, not just a fallback.',
    example: {
      setup: 'A report should show the top 10 open deals after sorting by value descending from a four-column source table.',
      formula: '=TAKE(SORT(FILTER(A2:D500,C2:C500="Open"),4,-1),10)',
      read: 'FILTER keeps open rows first, SORT orders that filtered array by the fourth column, and TAKE returns the first 10 rows from the sorted result. If the filter returns no rows or the output range is blocked, the TAKE step is not the first place to fix.'
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
  'excel-pivot-table-calculated-field-not-working': {
    gives: [
      'A focused repair pass for one PivotTable calculated field.',
      'A plain-English check of whether the formula belongs in the pivot or in the source table.',
      'Checks for field-name syntax, wrong totals, invalid cell references, calculated item confusion, and OLAP limits.'
    ],
    useWhen: 'Use this page when an Excel PivotTable calculated field is rejected, returns a surprising subtotal or grand total, uses normal worksheet references, or needs to be rebuilt from the exact source field names.',
    notWhen: 'Do not use a calculated field when the calculation must happen row by row before aggregation. Put that logic in the source data first, refresh the PivotTable, and then summarize the helper field.',
    example: {
      setup: 'For a PivotTable source with Revenue and Cost fields, gross margin can be a calculated field when the metric is acceptable at the summarized-field level.',
      formula: "=('Revenue'-'Cost')/'Revenue'",
      read: 'The formula uses the PivotTable field names, not cells like B2 or C2. Check the grand total carefully because PivotTable calculated fields work from summed fields rather than each original row.'
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
  const extraDetailCards = (page.extraDetailCards ?? []).map((card) => `<article class="detail-card">
              <h3>${escapeHtml(card.title)}</h3>
              <p>${card.html}</p>
            </article>`).join('\n            ');
  const renderedExtraDetailCards = extraDetailCards ? `\n            ${extraDetailCards}` : '';

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
            </article>${renderedExtraDetailCards}
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
