import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const checkoutUrl = 'https://buy.stripe.com/5kQ5kw94pfXy3ziajM4F208';

function read(relativePath) {
  return readFileSync(resolve(root, relativePath), 'utf8');
}

test('core static files exist', () => {
  for (const path of ['index.html', 'styles.css', 'app/app.js', 'app/formula-engine.js', 'api/formula.js', 'api/waitlist.js', 'api/track.js', 'privacy/index.html', 'thanks/index.html', 'scripts/funnel-summary.mjs', 'sitemap.xml', 'robots.txt', 'vercel.json']) {
    assert.equal(existsSync(resolve(root, path)), true, `${path} should exist`);
  }
});

test('homepage presents the tool and revenue path', () => {
  const page = read('index.html');

  assert.match(page, /Write My Formula/);
  assert.match(page, /Write formulas without wrestling with syntax/);
  assert.match(page, /Formula request/);
  assert.match(page, /Look up price by customer/);
  assert.match(page, /Function hint/);
  assert.match(page, /Formula bar/);
  assert.match(page, /Formula preview/);
  assert.match(page, /Compatibility/);
  assert.match(page, /Use it past the guest limit/);
  assert.match(page, /500 formula runs per month in this browser for \$9/);
  assert.match(page, /Stripe redirects you back and unlocks access immediately/);
  assert.match(page, /id="copy-upgrade"/);
  assert.match(page, /Copied\. Need more formulas this month/);
  assert.match(page, /500 runs per month in this browser for \$9/);
  assert.match(page, /\/percentage-formula-generator\//);
  assert.match(page, /Build percent of total, percent change, discount, markup, tax, tip, and completion-rate formulas/);
  assert.match(page, /\/ai-excel-formula-generator\//);
  assert.match(page, /Generate an Excel formula from plain English with range notes/);
  assert.match(page, /\/excel-formula-help\//);
  assert.match(page, /Get help writing, explaining, or fixing one Excel formula with range notes/);
  assert.match(page, /\/ai-google-sheets-formula-generator\//);
  assert.match(page, /Turn a plain-English Sheets task into a formula with assumptions/);
  assert.match(page, /\/excel-formula-cheat-sheet\//);
  assert.match(page, /Scan common lookup, logic, text, date, and summary formulas with examples/);
  assert.match(page, /\/excel-formula-not-showing-result\//);
  assert.match(page, /Diagnose formulas that show text, stay stale, return errors, or calculate the wrong value/);
  assert.match(page, /\/excel-formulas-not-working\//);
  assert.match(page, /Fix formulas that stop calculating after imports, copied ranges, locale settings, or text-number mismatches/);
  assert.match(page, /\/excel-value-error\//);
  assert.match(page, /Repair formulas blocked by text values, hidden spaces, wrong argument types, dates, or subtraction syntax/);
  assert.match(page, /\/excel-name-error\//);
  assert.match(page, /Fix formulas with misspelled functions, undefined names, missing quotes, or unsupported functions/);
  assert.match(page, /\/excel-div0-error\//);
  assert.match(page, /Fix formulas blocked by zero or blank denominators, ratio logic, averages, and IFERROR tradeoffs/);
  assert.match(page, /\/excel-circular-reference\//);
  assert.match(page, /Fix formulas that point back at their own result cell or need deliberate iterative-calculation checks/);
  assert.match(page, /\/excel-ref-error\//);
  assert.match(page, /Repair formulas broken by deleted rows, moved cells, invalid references, or shifted lookup ranges/);
  assert.match(page, /\/google-sheets-formula-parse-error\//);
  assert.match(page, /Repair Sheets formulas with missing quotes, mismatched parentheses, wrong separators, or malformed QUERY syntax/);
  assert.match(page, /\/vlookup-na-error\//);
  assert.match(page, /Fix lookup formulas that return #N\/A because of exact-match settings/);
  assert.match(page, /\/excel-if-formula-multiple-conditions\//);
  assert.match(page, /Write nested IF, AND, OR, and IFS logic with branch-order and edge-row checks/);
  assert.match(page, /\/date-formula-generator\//);
  assert.match(page, /Create due dates, workday counts, month-end dates, date differences, and overdue checks/);
  assert.match(page, /\/filter-formula-generator\//);
  assert.match(page, /Return matching rows for status, region, date, text, and threshold conditions/);
  assert.match(page, /\/text-formula-generator\//);
  assert.match(page, /Split, extract, join, trim, clean, and replace text from messy imported cells/);
  assert.match(page, /\/data-validation-formula-generator\//);
  assert.match(page, /Block bad IDs, duplicate values, missing fields, and invalid entries/);
  assert.match(page, /\/excel-data-validation-formula\//);
  assert.match(page, /Write custom validation rules for IDs, duplicates, required fields, dates, and allowed entries/);
  assert.match(page, /\/google-sheets-query-formula-generator\//);
  assert.match(page, /Build QUERY formulas for filtering, selecting, sorting, grouping, and labeling Sheets data/);
  assert.match(page, /\/pivot-table-calculated-field-formula-generator\//);
  assert.match(page, /Create margin, average price, variance, and ratio formulas/);
  assert.match(page, /\/conditional-formatting-formula-generator\//);
  assert.match(page, /Write Excel and Google Sheets custom formulas for row highlights/);
  assert.match(page, /\/google-sheets-conditional-format-custom-formula\//);
  assert.match(page, /Set up Google Sheets custom formula rules with the right apply-to range/);
  assert.match(page, /\/formula-bot-alternative\//);
  assert.match(page, /Use a focused formula workbench when you need a formula, explanation, or fix/);
  assert.match(page, /\/sheetsolver-ai-alternative\//);
  assert.match(page, /Compare a narrow formula helper for writing, explaining, and fixing formulas/);
  assert.match(page, /\/index-match-formula-generator\//);
  assert.match(page, /Build flexible lookup formulas for left lookups, two-way lookups, and older Excel files/);
  assert.match(page, /data-checkout/);
  assert.doesNotMatch(page, /data-checkout href="#"/);
  assert.match(page, new RegExp(`data-checkout href="${checkoutUrl}"`));
  assert.match(page, /Founding access/);
  assert.match(page, /Upgrade \$9/);
  assert.match(page, /Keep writing formulas today/);
  assert.match(page, /Founding access is \$9 for 500 runs per month in this browser/);
  assert.match(page, /class="paywall-offer"/);
  assert.match(page, /https:\/\/writemyformula\.com\//);
  assert.match(page, /2 guest tries/);
  assert.match(page, /3 runs per week/);
  assert.match(page, /Email for free account access/);
  assert.match(page, /monthly product email/);
  assert.match(page, /<script type="module" src="\/app\/app\.js"><\/script>/);
});

test('thanks page tracks paid completion and unlocks founding access', () => {
  const page = read('thanks/index.html');

  assert.match(page, /Upgrade received/);
  assert.match(page, /500 formula runs per month/);
  assert.match(page, /localStorage\.setItem\('write-my-formula-pro', '1'\)/);
  assert.match(page, /paid_success_page_view/);
  assert.match(page, /paid_continue_click/);
  assert.match(page, /navigator\.sendBeacon/);
  assert.match(page, /id="continue-workbench"/);
  assert.match(page, /href="\/\?paid=1"/);
});

test('config exposes checkout and account usage limits', () => {
  const config = read('app/config.js');

  assert.match(config, /CHECKOUT_URL/);
  assert.match(config, /ANONYMOUS_TRIAL_LIMIT = 2/);
  assert.match(config, /FREE_ACCOUNT_WEEKLY_LIMIT = 3/);
  assert.match(config, /PRO_MONTHLY_LIMIT = 500/);
});

test('privacy page discloses browser-local behavior and Stripe payments', () => {
  const page = read('privacy/index.html');

  assert.match(page, /sends formula requests, pasted formula text, and optional pasted sheet samples/);
  assert.match(page, /Write My Formula does not store credit card numbers/);
  assert.match(page, /Stripe handles payment information/);
  assert.match(page, /First-party analytics record page views and product events/);
  assert.match(page, /do not intentionally store pasted spreadsheet text, generated formulas, or email addresses/);
  assert.match(page, /monthly product updates/);
});

test('waitlist endpoint is wired for Resend contact capture', () => {
  const api = read('api/waitlist.js');

  assert.match(api, /RESEND_API_KEY/);
  assert.match(api, /https:\/\/api\.resend\.com\/contacts/);
  assert.match(api, /monthly_email_opt_in/);
  assert.match(api, /write-my-formula/);
  assert.match(api, /wmf_waitlist/);
});

test('first-party analytics endpoint and client funnel events are wired', () => {
  const api = read('api/track.js');
  const app = read('app/app.js');

  assert.match(api, /wmf_analytics/);
  assert.match(api, /page_view/);
  assert.match(api, /paid_success_page_view/);
  assert.match(api, /paid_continue_click/);
  assert.match(api, /formula_submit/);
  assert.match(api, /checkout_click/);
  assert.match(api, /signup_success/);
  assert.match(app, /trackEvent/);
  assert.match(app, /navigator\.sendBeacon/);
  assert.match(app, /page_view/);
  assert.match(app, /mode_select/);
  assert.match(app, /platform_select/);
  assert.match(app, /example_click/);
  assert.match(app, /formula_submit/);
  assert.match(app, /interaction: 'initial'/);
  assert.match(app, /interaction: 'example'/);
  assert.match(app, /formula_success/);
  assert.match(app, /formula_fallback/);
  assert.match(app, /paywall_view/);
  assert.match(app, /copy_click/);
  assert.match(app, /checkout_click/);
  assert.match(app, /signup_submit/);
});

test('analytics summary script is wired', () => {
  const packageJson = read('package.json');
  const script = read('scripts/funnel-summary.mjs');

  assert.match(packageJson, /analytics:summary/);
  assert.match(script, /wmf_analytics/);
  assert.match(script, /wmf_formula/);
  assert.match(script, /wmf_waitlist/);
  assert.match(script, /checkoutClicksByPlacement/);
  assert.match(script, /paid_success_page_view/);
  assert.match(script, /payment_status/);
});

test('formula endpoint is wired for OpenAI structured output with fallback', () => {
  const api = read('api/formula.js');
  const app = read('app/app.js');

  assert.match(api, /OPENAI_API_KEY/);
  assert.match(api, /https:\/\/api\.openai\.com\/v1\/responses/);
  assert.match(api, /json_schema/);
  assert.match(api, /fallbackResult/);
  assert.match(api, /RATE_LIMIT_MAX = 30/);
  assert.match(api, /X-RateLimit-Remaining/);
  assert.match(api, /wmf_formula/);
  assert.match(app, /fetch\('\/api\/formula'/);
});

test('seo landing pages target high-intent formula searches', () => {
  const slugs = [
    'excel-formula-generator',
    'google-sheets-formula-generator',
    'excel-formula-help',
    'ai-excel-formula-generator',
    'ai-google-sheets-formula-generator',
    'formula-bot-alternative',
    'sheetsolver-ai-alternative',
    'excel-formula-cheat-sheet',
    'excel-formula-explainer',
    'excel-formula-fixer',
    'excel-formula-not-showing-result',
    'excel-formulas-not-working',
    'excel-value-error',
    'excel-name-error',
    'excel-div0-error',
    'excel-circular-reference',
    'excel-ref-error',
    'google-sheets-formula-parse-error',
    'vlookup-na-error',
    'excel-if-formula-multiple-conditions',
    'vlookup-formula-generator',
    'xlookup-formula-generator',
    'index-match-formula-generator',
    'if-formula-generator',
    'countifs-formula-generator',
    'sumifs-formula-generator',
    'percentage-formula-generator',
    'date-formula-generator',
    'filter-formula-generator',
    'text-formula-generator',
    'data-validation-formula-generator',
    'excel-data-validation-formula',
    'google-sheets-query-formula-generator',
    'pivot-table-calculated-field-formula-generator',
    'conditional-formatting-formula-generator',
    'google-sheets-conditional-format-custom-formula'
  ];
  const sitemap = read('sitemap.xml');

  for (const slug of slugs) {
    const pagePath = `${slug}/index.html`;
    assert.equal(existsSync(resolve(root, pagePath)), true, `${pagePath} should exist`);

    const page = read(pagePath);
    assert.match(page, new RegExp(`https://writemyformula\\.com/${slug}/`));
    assert.match(page, /window\.WMF_PAGE_PRESET/);
    assert.match(page, /application\/ld\+json/);
    assert.match(page, /"@type":"SoftwareApplication"/);
    assert.match(page, /"@type":"BreadcrumbList"/);
    assert.match(page, /class="section seo-detail"/);
    assert.match(page, /What this page gives you/);
    assert.match(page, /When to use it/);
    assert.match(page, /Worked example/);
    assert.match(page, /<pre><code>/);
    assert.match(page, /Check before you paste/);
    assert.match(page, /Formula request/);
    assert.match(page, /Use it past the guest limit/);
    assert.match(page, /Copied\. Need more formulas this month/);
    assert.match(page, /Upgrade \$9/);
    assert.match(page, /Keep writing formulas today/);
    assert.match(page, /Founding access is \$9 for 500 runs per month in this browser/);
    assert.match(page, /Stripe redirects you back and unlocks access immediately/);
    assert.match(page, /data-checkout/);
    assert.doesNotMatch(page, /data-checkout href="#"/);
    assert.match(page, new RegExp(`data-checkout href="${checkoutUrl}"`));
    assert.match(sitemap, new RegExp(`https://writemyformula\\.com/${slug}/`));
  }
});

test('excel formula help page targets broad help intent without overclaiming', () => {
  const page = read('excel-formula-help/index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /Excel Formula Help/);
  assert.match(page, /Write the Excel formula you're stuck on/);
  assert.match(page, /formula draft, explanation, or fix/);
  assert.match(page, /IF, SUMIFS, XLOOKUP, FILTER/);
  assert.match(page, /version support, range alignment, fill-down behavior/);
  assert.match(page, /=IF\(AND\(B2&lt;TODAY\(\),C2&lt;&gt;&quot;Done&quot;\),&quot;Overdue&quot;,&quot;OK&quot;\)/);
  assert.match(page, /Formula request/);
  assert.match(page, /Upgrade \$9/);
  assert.doesNotMatch(page, /guarantee|guaranteed|always accurate|perfect formula|official Microsoft|official Google|affiliated|file upload|dashboard builder/i);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/excel-formula-help\//);
});

test('excel formulas not working page targets repair intent without overclaiming', () => {
  const page = read('excel-formulas-not-working/index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /Excel Formulas Not Working/);
  assert.match(page, /Fix Excel formulas that are not working/);
  assert.match(page, /calculation mode, text cells, separators, data types, and formula errors/);
  assert.match(page, /Show Formulas mode, manual calculation, text-formatted cells, separators, data types, and error values/);
  assert.match(page, /=SUMIFS\(C2:C500,B2:B500,&quot;Paid&quot;,A2:A500,&quot;&gt;=&quot;&amp;DATE\(2026,5,1\),A2:A500,&quot;&lt;&quot;&amp;DATE\(2026,6,1\)\)/);
  assert.match(page, /Use it past the guest limit/);
  assert.match(page, new RegExp(`data-checkout href="${checkoutUrl}"`));
  assert.match(sitemap, /https:\/\/writemyformula\.com\/excel-formulas-not-working\//);
  assert.doesNotMatch(page, /upload/i);
  assert.doesNotMatch(page, /guarantee/i);
  assert.doesNotMatch(page, /Microsoft partner/i);
});

test('excel value error page targets VALUE repair intent without overclaiming', () => {
  const page = read('excel-value-error/index.html');
  const homepage = read('index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /Excel #VALUE! Error Fixer/);
  assert.match(page, /Fix an Excel #VALUE! error without hiding it/);
  assert.match(page, /text values, hidden spaces, wrong argument types, dates, and function syntax/);
  assert.match(page, /Hiding #VALUE! can make a report look clean while the formula is still reading the wrong type of input/);
  assert.match(page, /=VALUE\(TRIM\(A2\)\)-VALUE\(TRIM\(B2\)\)/);
  assert.match(page, /Use it past the guest limit/);
  assert.match(page, new RegExp(`data-checkout href="${checkoutUrl}"`));
  assert.match(homepage, /href="\/excel-value-error\/">Excel #VALUE! error/);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/excel-value-error\//);
  assert.doesNotMatch(page, /upload|workbook audit|guarantee|guaranteed|always fixes|official Microsoft|Microsoft partner|affiliated|PDF|same-day|human reviewer/i);
});

test('excel name error page targets NAME repair intent without overclaiming', () => {
  const page = read('excel-name-error/index.html');
  const homepage = read('index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /Excel #NAME\? Error Fixer/);
  assert.match(page, /Fix an Excel #NAME\? error at the formula syntax/);
  assert.match(page, /function names, named ranges, quoted text, range syntax, add-ins, and Excel version support/);
  assert.match(page, /Do not hide #NAME\? with IFERROR before fixing the syntax/);
  assert.match(page, /=SUMIF\(Status,&quot;Open&quot;,Amount\)/);
  assert.match(page, /Wrap text criteria in double quotes/);
  assert.match(page, /Confirm range references include the needed colon/);
  assert.match(page, /Use it past the guest limit/);
  assert.match(page, new RegExp(`data-checkout href="${checkoutUrl}"`));
  assert.match(homepage, /href="\/excel-name-error\/">Excel #NAME\? error/);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/excel-name-error\//);
  assert.doesNotMatch(page, /upload|workbook audit|guarantee|guaranteed|always fixes|official Microsoft|Microsoft partner|affiliated|PDF|same-day|human reviewer|pay before answer/i);
});

test('excel formula fixer page targets fix-my-formula intent without overclaiming', () => {
  const page = read('excel-formula-fixer/index.html');
  const homepage = read('index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /Fix My Excel Formula/);
  assert.match(page, /Paste your broken Excel formula\. Get it working/);
  assert.match(page, /fix my Excel formula/);
  assert.match(page, /#N\/A, #VALUE!, #REF!, #NAME\?, #DIV\/0!, #NUM!, blank, stale, or a wrong result/);
  assert.match(page, /Show Formulas mode and workbook calculation mode/);
  assert.match(page, /=IFERROR\(VLOOKUP\(TRIM\(A2\),Customers!\$A:\$C,3,FALSE\),&quot;Not found&quot;\)/);
  assert.match(page, /Use it past the guest limit/);
  assert.match(page, new RegExp(`data-checkout href="${checkoutUrl}"`));
  assert.match(homepage, /href="\/excel-formula-fixer\/">Fix my Excel formula/);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/excel-formula-fixer\//);
  assert.doesNotMatch(page, /upload|workbook audit|guarantee|guaranteed|always fixes|official Microsoft|Microsoft partner|affiliated|PDF|same-day/i);
});

test('excel DIV0 error page targets division-by-zero repair intent without overclaiming', () => {
  const page = read('excel-div0-error/index.html');
  const homepage = read('index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /Excel #DIV\/0! Error Fixer/);
  assert.match(page, /Fix the #DIV\/0! error in your Excel formula/);
  assert.match(page, /zero denominators, blank cells, ratio formulas, averages, and IFERROR fallbacks/);
  assert.match(page, /Use IF to test the denominator directly/);
  assert.match(page, /IFERROR carefully because it can also hide #VALUE!, #REF!, #NAME\?/);
  assert.match(page, /=IF\(C2=0,&quot;&quot;,\(B2-C2\)\/C2\)/);
  assert.match(page, /Use it past the guest limit/);
  assert.match(page, new RegExp(`data-checkout href="${checkoutUrl}"`));
  assert.match(homepage, /href="\/excel-div0-error\/">Excel #DIV\/0! error/);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/excel-div0-error\//);
  assert.doesNotMatch(page, /upload|workbook audit|guarantee|guaranteed|always fixes|official Microsoft|Microsoft partner|affiliated|PDF|same-day|human reviewer|data never leaves/i);
});

test('google sheets formula parse error page targets Sheets repair intent without overclaiming', () => {
  const page = read('google-sheets-formula-parse-error/index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /Google Sheets Formula Parse Error Fixer/);
  assert.match(page, /Fix a Google Sheets formula parse error/);
  assert.match(page, /missing quotes, mismatched parentheses, wrong separators, malformed QUERY strings, and range issues/);
  assert.match(page, /Google Sheets shows a formula parse error, #ERROR!, or a syntax-style failure/);
  assert.match(page, /=QUERY\(A1:D500,&quot;select A, B where C = 'Open'&quot;,1\)/);
  assert.match(page, /commas or semicolons/);
  assert.match(page, /text criteria in single quotes/);
  assert.match(page, /Formula request/);
  assert.match(page, /Upgrade \$9/);
  assert.match(page, new RegExp(`data-checkout href="${checkoutUrl}"`));
  assert.match(sitemap, /https:\/\/writemyformula\.com\/google-sheets-formula-parse-error\//);
  assert.doesNotMatch(page, /upload|workbook audit|guarantee|guaranteed|always fixes|official Google|Google partner|affiliated/i);
});

test('excel circular reference page targets circular-reference repair intent without overclaiming', () => {
  const page = read('excel-circular-reference/index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /Excel Circular Reference Fixer/);
  assert.match(page, /Fix an Excel circular reference warning/);
  assert.match(page, /formula that points back at itself/);
  assert.match(page, /self-references, helper cells, and intentional iteration/);
  assert.match(page, /Excel says a formula refers to its own cell directly or indirectly/);
  assert.match(page, /=SUM\(D2:D9\)/);
  assert.match(page, /Turn on iterative calculation only when the circular calculation is intentional/);
  assert.match(page, /Formula request/);
  assert.match(page, /Upgrade \$9/);
  assert.match(page, new RegExp(`data-checkout href="${checkoutUrl}"`));
  assert.match(sitemap, /https:\/\/writemyformula\.com\/excel-circular-reference\//);
  assert.doesNotMatch(page, /upload|workbook audit|trace the reference chain|guarantee|guaranteed|always fixes|official Microsoft|Microsoft-certified|affiliated/i);
});

test('excel REF error page targets broken-reference repair intent without overclaiming', () => {
  const page = read('excel-ref-error/index.html');
  const homepage = read('index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /Excel #REF! Error Fixer/);
  assert.match(page, /Fix #REF! in your Excel formula, one formula at a time/);
  assert.match(page, /deleted rows, moved cells, copied formulas, lookup ranges, and external references/);
  assert.match(page, /Excel can no longer resolve/);
  assert.match(page, /=SUM\(B2:D2\)/);
  assert.match(page, /Replace #REF! with the intended current cell or range/);
  assert.match(page, /Check lookup table ranges and column numbers/);
  assert.match(page, /Use it past the guest limit/);
  assert.match(page, new RegExp(`data-checkout href="${checkoutUrl}"`));
  assert.match(homepage, /href="\/excel-ref-error\/">Excel #REF! error/);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/excel-ref-error\//);
  assert.doesNotMatch(page, /upload|workbook audit|guarantee|guaranteed|always fixes|official Microsoft|Microsoft partner|affiliated|PDF|same-day|human reviewer|pay before answer/i);
});

test('AI Excel formula generator page targets plain-English AI formula intent without overclaiming', () => {
  const page = read('ai-excel-formula-generator/index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /AI Excel Formula Generator/);
  assert.match(page, /Use AI to write the Excel formula you mean/);
  assert.match(page, /plain English/);
  assert.match(page, /range notes/);
  assert.match(page, /file upload, data chat, charts, dashboards, or workbook-wide analysis/);
  assert.match(page, /=SUMIFS\(C2:C500,B2:B500,&quot;Paid&quot;,A2:A500,&quot;&gt;=&quot;&amp;DATE\(2026,5,1\),A2:A500,&quot;&lt;&quot;&amp;DATE\(2026,6,1\)\)/);
  assert.doesNotMatch(page, /guarantee|guaranteed|always accurate|perfect formula|official|affiliated/i);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/ai-excel-formula-generator\//);
});

test('AI Google Sheets formula generator page targets Sheets AI formula intent without overclaiming', () => {
  const page = read('ai-google-sheets-formula-generator/index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /AI Google Sheets Formula Generator/);
  assert.match(page, /Use AI to write the Google Sheets formula you need/);
  assert.match(page, /QUERY, FILTER, ARRAYFORMULA, REGEXEXTRACT, IMPORTRANGE/);
  assert.match(page, /plain-English request/);
  assert.match(page, /file upload, data chat, charts, dashboards, or workbook-wide analysis/);
  assert.match(page, /spill into empty cells/);
  assert.match(page, /April revenue/);
  assert.match(page, /=QUERY\(A1:D500,/);
  assert.doesNotMatch(page, /guarantee|guaranteed|always accurate|official Google|affiliated/i);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/ai-google-sheets-formula-generator\//);
});

test('formula bot alternative page targets comparison intent without overclaiming', () => {
  const page = read('formula-bot-alternative/index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /Formula Bot Alternative for Excel Formulas/);
  assert.match(page, /A focused Formula Bot alternative for formula work/);
  assert.match(page, /broader spreadsheet-analysis suite/);
  assert.match(page, /2 guest tries/);
  assert.match(page, /\$9 founding access for 500 runs per month/);
  assert.match(page, /file upload, charts, dashboards, or whole-table analysis/);
  assert.match(page, /=SUMIFS\(C2:C500,B2:B500,&quot;Paid&quot;,A2:A500,&quot;&gt;=&quot;&amp;DATE\(2026,5,1\),A2:A500,&quot;&lt;&quot;&amp;DATE\(2026,6,1\)\)/);
  assert.doesNotMatch(page, /spreadsheet-analysis workspace.*charts.*dashboards.*upload whole workbooks/s);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/formula-bot-alternative\//);
});

test('SheetSolver AI alternative page targets comparison intent without overclaiming', () => {
  const page = read('sheetsolver-ai-alternative/index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /SheetSolver AI Alternative for Spreadsheet Formulas/);
  assert.match(page, /A SheetSolver AI alternative built for one job: the formula/);
  assert.match(page, /broader spreadsheet automation workspace/);
  assert.match(page, /2 guest tries/);
  assert.match(page, /\$9 founding access for 500 runs per month/);
  assert.match(page, /file upload, data chat, dashboards, charts, or workbook-wide analysis/);
  assert.match(page, /=IF\(A2=&quot;&quot;,&quot;&quot;,REGEXEXTRACT\(A2,&quot;@\(\.\+\)\$&quot;\)\)/);
  assert.doesNotMatch(page, /guarantee|guaranteed|official SheetSolver|affiliated/i);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/sheetsolver-ai-alternative\//);
});

test('percentage formula page targets percent calculation intent', () => {
  const page = read('percentage-formula-generator/index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /Percentage Formula Generator for Excel and Sheets/);
  assert.match(page, /percent of total/);
  assert.match(page, /percent change/);
  assert.match(page, /=IFERROR\(B2\/\$B\$5,0\)/);
  assert.match(page, /percentage of total/);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/percentage-formula-generator\//);
});

test('excel formula cheat sheet page targets formula reference intent', () => {
  const page = read('excel-formula-cheat-sheet/index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /Excel Formula Cheat Sheet/);
  assert.match(page, /Excel formula cheat sheet for the formulas people actually use/);
  assert.match(page, /lookup, logic, text, date, and summary formulas/);
  assert.match(page, /=SUMIFS\(C2:C500,B2:B500,&quot;Paid&quot;,A2:A500,&quot;&gt;=&quot;&amp;DATE\(2026,5,1\),A2:A500,&quot;&lt;&quot;&amp;DATE\(2026,6,1\)\)/);
  assert.match(page, /formula cheat sheet/);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/excel-formula-cheat-sheet\//);
});

test('excel formula not showing result page targets live fix intent', () => {
  const page = read('excel-formula-not-showing-result/index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /Excel Formula Not Showing Result/);
  assert.match(page, /Fix an Excel formula that is not showing the result/);
  assert.match(page, /calculation mode/);
  assert.match(page, /text-formatted cells/);
  assert.match(page, /=IF\(VALUE\(B2\)&gt;1000,&quot;Review&quot;,&quot;OK&quot;\)/);
  assert.match(page, /Formula request/);
  assert.match(page, /Upgrade \$9/);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/excel-formula-not-showing-result\//);
});

test('VLOOKUP NA error page targets lookup repair intent without overclaiming', () => {
  const page = read('vlookup-na-error/index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /VLOOKUP #N\/A Error Fixer/);
  assert.match(page, /Fix a VLOOKUP #N\/A error without guessing/);
  assert.match(page, /exact-match settings/);
  assert.match(page, /text-number mismatches/);
  assert.match(page, /table range starts with the column being searched/);
  assert.match(page, /=IFERROR\(VLOOKUP\(E2,\$A\$2:\$C\$500,2,FALSE\),&quot;Not found&quot;\)/);
  assert.match(page, /Formula request/);
  assert.match(page, /Upgrade \$9/);
  assert.doesNotMatch(page, /guarantee|guaranteed|always fixes|official Microsoft|official Google|affiliated/i);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/vlookup-na-error\//);
});

test('excel IF formula multiple conditions page targets conditional logic intent', () => {
  const page = read('excel-if-formula-multiple-conditions/index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /Excel IF Formula with Multiple Conditions/);
  assert.match(page, /Write an Excel IF formula with multiple conditions/);
  assert.match(page, /nested IF, IFS, AND, OR/);
  assert.match(page, /branch order/);
  assert.match(page, /edge-row checks/);
  assert.match(page, /=IF\(AND\(B2&gt;5000,OR\(C2=&quot;Past Due&quot;,D2=&quot;New&quot;\)\),&quot;Review&quot;,&quot;OK&quot;\)/);
  assert.match(page, /Use IFS or SWITCH/);
  assert.doesNotMatch(page, /guarantee|guaranteed|always accurate|official Microsoft|affiliated/i);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/excel-if-formula-multiple-conditions\//);
});

test('date formula page targets deadline and workday intent', () => {
  const page = read('date-formula-generator/index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /Date Formula Generator for Excel and Sheets/);
  assert.match(page, /due dates/);
  assert.match(page, /workday counts/);
  assert.match(page, /=WORKDAY\(A2,10,\$F\$2:\$F\$20\)/);
  assert.match(page, /WORKDAY/);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/date-formula-generator\//);
});

test('filter formula page targets dynamic row-filter intent', () => {
  const page = read('filter-formula-generator/index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /FILTER Formula Generator for Excel and Sheets/);
  assert.match(page, /Return the rows that match your conditions/);
  assert.match(page, /spill ranges/);
  assert.match(page, /=FILTER\(A2:D500,\(B2:B500=&quot;West&quot;\)\*\(C2:C500=&quot;Open&quot;\)\*\(D2:D500&gt;5000\),&quot;No matching rows&quot;\)/);
  assert.match(page, /FILTER/);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/filter-formula-generator\//);
});

test('text formula page targets cleanup and extraction intent', () => {
  const page = read('text-formula-generator/index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /Text Formula Generator for Excel and Sheets/);
  assert.match(page, /Clean and extract text without hand-building string formulas/);
  assert.match(page, /split, cleaned, joined, extracted, or normalized/);
  assert.match(page, /=REGEXEXTRACT\(A2,&quot;@\(\.\+\)\$&quot;\)/);
  assert.match(page, /REGEXEXTRACT/);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/text-formula-generator\//);
});

test('conditional formatting formula page targets custom highlight rules', () => {
  const page = read('conditional-formatting-formula-generator/index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /Conditional Formatting Formula Generator for Excel and Sheets/);
  assert.match(page, /Write the formula the conditional formatting rule dialog is asking for/);
  assert.match(page, /Highlight the entire row/);
  assert.match(page, /TRUE\/FALSE formula/);
  assert.match(page, /applied range/);
  assert.match(page, /For Google Sheets, use same-sheet references directly and INDIRECT/);
  assert.match(page, /=AND\(\$B2&lt;TODAY\(\),\$C2&lt;&gt;&quot;Done&quot;\)/);
  assert.match(page, /The dollar signs lock columns B and C/);
  assert.match(page, /row number stays relative/);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/conditional-formatting-formula-generator\//);
});

test('google sheets conditional format custom formula page targets exact Sheets rule intent', () => {
  const page = read('google-sheets-conditional-format-custom-formula/index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /Google Sheets Conditional Format Custom Formula Generator/);
  assert.match(page, /Stop guessing at the Google Sheets custom formula/);
  assert.match(page, /Custom formula is/);
  assert.match(page, /apply-to range/);
  assert.match(page, /TRUE\/FALSE expression/);
  assert.match(page, /Use INDIRECT when a Google Sheets conditional-format rule must reference another sheet/);
  assert.match(page, /=\$C1=&quot;Yes&quot;/);
  assert.match(page, /The dollar sign locks column C while the row number changes/);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/google-sheets-conditional-format-custom-formula\//);
});

test('data validation formula page targets custom entry rules', () => {
  const page = read('data-validation-formula-generator/index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /Data Validation Formula Generator for Excel and Sheets/);
  assert.match(page, /Write the custom formula for a data validation rule/);
  assert.match(page, /TRUE for entries users are allowed to type/);
  assert.match(page, /=AND\(LEFT\(C2,3\)=&quot;ID-&quot;,LEN\(C2\)&gt;9\)/);
  assert.match(page, /data validation/);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/data-validation-formula-generator\//);
});

test('excel data validation formula page targets custom validation intent without overclaiming', () => {
  const page = read('excel-data-validation-formula/index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /Excel Data Validation Formula Helper/);
  assert.match(page, /Write the Excel data validation formula for your rule/);
  assert.match(page, /Allow: Custom/);
  assert.match(page, /TRUE for allowed values and FALSE/);
  assert.match(page, /first cell in the range where the rule will be applied/);
  assert.match(page, /=AND\(LEFT\(A2,3\)=&quot;ID-&quot;,COUNTIF\(\$A\$2:\$A\$500,A2\)=1\)/);
  assert.match(page, /Use dollar signs only where the reference must stay fixed/);
  assert.match(page, /Formula request/);
  assert.match(page, /Upgrade \$9/);
  assert.match(page, new RegExp(`data-checkout href="${checkoutUrl}"`));
  assert.match(sitemap, /https:\/\/writemyformula\.com\/excel-data-validation-formula\//);
  assert.doesNotMatch(page, /upload|guarantee|guaranteed|always fixes|official Microsoft|Microsoft-certified|affiliated/i);
});

test('google sheets query formula page targets report query intent', () => {
  const page = read('google-sheets-query-formula-generator/index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /Google Sheets QUERY Formula Generator/);
  assert.match(page, /Write a Google Sheets QUERY formula without memorizing SQL syntax/);
  assert.match(page, /select, where, order by, group by, or label clauses/);
  assert.match(page, /=QUERY\(A1:D500,&quot;select A, B, C, D where B = 'West' and C = 'Open' and D &gt; 5000 order by D desc&quot;,1\)/);
  assert.match(page, /Google Sheets QUERY/);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/google-sheets-query-formula-generator\//);
});

test('index match formula page targets flexible lookup intent', () => {
  const page = read('index-match-formula-generator/index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /INDEX MATCH Formula Generator/);
  assert.match(page, /Build an INDEX MATCH formula for the lookup you need/);
  assert.match(page, /left lookups/);
  assert.match(page, /two-way lookups/);
  assert.match(page, /=INDEX\(\$A\$2:\$A\$500,MATCH\(F2,\$C\$2:\$C\$500,0\)\)/);
  assert.match(page, /INDEX MATCH/);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/index-match-formula-generator\//);
});

test('pivot table calculated field page targets pivot formulas', () => {
  const page = read('pivot-table-calculated-field-formula-generator/index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /Pivot Table Calculated Field Formula Generator/);
  assert.match(page, /Write a calculated field formula for a pivot table/);
  assert.match(page, /field names instead of normal cell references/);
  assert.match(page, /=\('Revenue'-'Cost'\)\/'Revenue'/);
  assert.match(page, /pivot table calculated field/);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/pivot-table-calculated-field-formula-generator\//);
});
