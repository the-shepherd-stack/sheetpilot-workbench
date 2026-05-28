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
  assert.match(page, /\/excel-formula-not-calculating\//);
  assert.match(page, /Fix formulas that stay stale, show formula text, or only update after manual recalculation/);
  assert.match(page, /\/excel-showing-formula-instead-of-result\//);
  assert.match(page, /Fix cells that display the formula text because of Show Formulas mode, text formatting, or a leading apostrophe/);
  assert.match(page, /\/excel-formula-wrong-result\//);
  assert.match(page, /Fix formulas that calculate the wrong value because of references, parentheses, stored types, or lookup settings/);
  assert.match(page, /\/excel-formula-returns-zero-blank\//);
  assert.match(page, /Fix formulas that return 0, blank, or an empty string because of lookup return cells, IF logic, or hidden zero settings/);
  assert.match(page, /\/excel-formula-not-copying-down\//);
  assert.match(page, /Fix formulas that will not fill down, copy the first result, or shift the wrong references after dragging/);
  assert.match(page, /\/excel-sumifs-not-working\//);
  assert.match(page, /Fix SUMIFS formulas that return 0, #VALUE!, or wrong totals because of criteria, ranges, dates, or argument order/);
  assert.match(page, /\/excel-countifs-not-working\//);
  assert.match(page, /Fix COUNTIFS formulas that return 0, #VALUE!, or wrong counts because of criteria, range sizes, dates, or closed workbooks/);
  assert.match(page, /\/excel-value-error\//);
  assert.match(page, /Repair formulas blocked by text values, hidden spaces, wrong argument types, dates, or subtraction syntax/);
  assert.match(page, /\/excel-name-error\//);
  assert.match(page, /Fix formulas with misspelled functions, undefined names, missing quotes, or unsupported functions/);
  assert.match(page, /\/excel-div0-error\//);
  assert.match(page, /Fix formulas blocked by zero or blank denominators, ratio logic, averages, and IFERROR tradeoffs/);
  assert.match(page, /\/excel-spill-error\//);
  assert.match(page, /Fix dynamic array formulas blocked by spill ranges, tables, merged cells, whole-column references, or changing array sizes/);
  assert.match(page, /\/excel-calc-error\//);
  assert.match(page, /Fix dynamic array and FILTER formulas blocked by empty results, nested arrays, range references, or unsupported calculations/);
  assert.match(page, /\/excel-num-error\//);
  assert.match(page, /Fix formulas blocked by invalid numeric values, formatted constants, non-converging IRR or RATE inputs, or numbers outside Excel limits/);
  assert.match(page, /\/excel-circular-reference\//);
  assert.match(page, /Fix formulas that point back at their own result cell or need deliberate iterative-calculation checks/);
  assert.match(page, /\/excel-ref-error\//);
  assert.match(page, /Repair formulas broken by deleted rows, moved cells, invalid references, or shifted lookup ranges/);
  assert.match(page, /\/google-sheets-formula-parse-error\//);
  assert.match(page, /Repair Sheets formulas with missing quotes, mismatched parentheses, wrong separators, or malformed QUERY syntax/);
  assert.match(page, /\/conditional-formatting-formula-not-working\//);
  assert.match(page, /Fix Excel and Google Sheets rules that highlight nothing, highlight everything, shift references, or lose to another rule/);
  assert.match(page, /\/excel-vlookup-not-working\//);
  assert.match(page, /Fix VLOOKUP formulas that return #N\/A, #VALUE!, wrong values, or broken column results/);
  assert.match(page, /\/vlookup-na-error\//);
  assert.match(page, /Fix lookup formulas that return #N\/A because of exact-match settings/);
  assert.match(page, /\/xlookup-na-error\//);
  assert.match(page, /Fix XLOOKUP formulas with missing matches, mismatched stored types/);
  assert.match(page, /\/excel-xlookup-not-working\//);
  assert.match(page, /Fix XLOOKUP formulas that return #N\/A, wrong rows, blank fallbacks, or unreliable results/);
  assert.match(page, /\/excel-index-match-not-working\//);
  assert.match(page, /Fix INDEX MATCH formulas that return #N\/A, #REF!, wrong rows, wrong columns, or unreliable results/);
  assert.match(page, /\/excel-if-formula-multiple-conditions\//);
  assert.match(page, /Write nested IF, AND, OR, and IFS logic with branch-order and edge-row checks/);
  assert.match(page, /\/excel-if-formula-not-working\//);
  assert.match(page, /Fix IF, nested IF, IFS, AND, and OR formulas that return the wrong label, FALSE, 0, blank, or #VALUE!/);
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
  assert.match(page, /\/excel-data-validation-formula-not-working\//);
  assert.match(page, /Fix data validation formulas that accept invalid values, reject valid entries, or break after copying/);
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
    'excel-formula-not-calculating',
    'excel-showing-formula-instead-of-result',
    'excel-formula-wrong-result',
    'excel-formula-returns-zero-blank',
    'excel-formula-not-copying-down',
    'excel-sumifs-not-working',
    'excel-countifs-not-working',
    'excel-value-error',
    'excel-name-error',
    'excel-div0-error',
    'excel-spill-error',
    'excel-calc-error',
    'excel-num-error',
    'excel-circular-reference',
    'excel-ref-error',
    'google-sheets-formula-parse-error',
    'conditional-formatting-formula-not-working',
    'excel-vlookup-not-working',
    'vlookup-na-error',
    'xlookup-na-error',
    'excel-xlookup-not-working',
    'excel-index-match-not-working',
    'excel-if-formula-multiple-conditions',
    'excel-if-formula-not-working',
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
    'excel-data-validation-formula-not-working',
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

test('excel formula not calculating page targets recalculation repair intent without overclaiming', () => {
  const page = read('excel-formula-not-calculating/index.html');
  const homepage = read('index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /Excel Formula Not Calculating Fixer/);
  assert.match(page, /Fix an Excel formula that is not calculating/);
  assert.match(page, /stuck, stale, or showing as text/);
  assert.match(page, /manual calculation mode, Show Formulas, text-formatted cells/);
  assert.match(page, /=IF\(VALUE\(B2\)&gt;1000,&quot;Review&quot;,&quot;OK&quot;\)/);
  assert.match(page, /Turn off Show Formulas when the cell displays the formula instead of the result/);
  assert.match(page, /Use it past the guest limit/);
  assert.match(page, new RegExp(`data-checkout href="${checkoutUrl}"`));
  assert.match(homepage, /href="\/excel-formula-not-calculating\/">Excel formula not calculating/);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/excel-formula-not-calculating\//);
  assert.doesNotMatch(page, /upload|workbook audit|diagnoses your workbook|guarantee|guaranteed|always fixes|official Microsoft|Microsoft partner|affiliated|PDF|same-day|human reviewer|faster than Microsoft|trained on Microsoft/i);
});

test('excel showing formula instead of result page targets displayed-formula repair intent without overclaiming', () => {
  const page = read('excel-showing-formula-instead-of-result/index.html');
  const homepage = read('index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /Excel Showing Formula Instead of Result Fixer/);
  assert.match(page, /Fix an Excel cell that shows the formula instead of the result/);
  assert.match(page, /formula text instead of a calculated value/);
  assert.match(page, /Show Formulas mode, text-formatted cells, linked text-formatted cells, leading apostrophes/);
  assert.match(page, /=SUM\(B2:B20\)/);
  assert.match(page, /Turn off Show Formulas if the whole worksheet is displaying formulas instead of results/);
  assert.match(page, /Change text-formatted formula cells to General before re-entering the formula/);
  assert.match(page, /Remove any leading apostrophe or space before the equals sign/);
  assert.match(page, /Use it past the guest limit/);
  assert.match(page, new RegExp(`data-checkout href="${checkoutUrl}"`));
  assert.match(homepage, /href="\/excel-showing-formula-instead-of-result\/">Excel showing formula instead of result/);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/excel-showing-formula-instead-of-result\//);
  assert.doesNotMatch(page, /upload|workbook audit|diagnoses your workbook|guarantee|guaranteed|always fixes|official Microsoft|Microsoft partner|affiliated|PDF|same-day|human reviewer|data never leaves|instant|in seconds|pay before answer/i);
});

test('excel formula wrong result page targets incorrect-result repair intent without overclaiming', () => {
  const page = read('excel-formula-wrong-result/index.html');
  const homepage = read('index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /Excel Formula Wrong Result Fixer/);
  assert.match(page, /Fix an Excel formula that gives the wrong result/);
  assert.match(page, /runs the formula without an error but the answer is wrong/);
  assert.match(page, /references, calculation order, stored value types, or lookup logic/);
  assert.match(page, /=A2\+B2\*C2/);
  assert.match(page, /Check whether parentheses are needed/);
  assert.match(page, /Use exact-match lookup settings unless approximate matching is intentional/);
  assert.match(page, /Use it past the guest limit/);
  assert.match(page, new RegExp(`data-checkout href="${checkoutUrl}"`));
  assert.match(homepage, /href="\/excel-formula-wrong-result\/">Excel formula wrong result/);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/excel-formula-wrong-result\//);
  assert.doesNotMatch(page, /upload|workbook audit|diagnoses your workbook|guarantee|guaranteed|always fixes|official Microsoft|Microsoft partner|affiliated|PDF|same-day|human reviewer|data never leaves|instant|in seconds/i);
});

test('excel formula returns zero blank page targets empty-output repair intent without overclaiming', () => {
  const page = read('excel-formula-returns-zero-blank/index.html');
  const homepage = read('index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /Excel Formula Returns 0 or Blank Fixer/);
  assert.match(page, /Fix an Excel formula that returns 0 or blank/);
  assert.match(page, /comes back empty, returns 0, or shows a blank-looking result/);
  assert.match(page, /empty references, lookup return cells, IF logic, IFERROR fallbacks, and hidden zero settings/);
  assert.match(page, /=IF\(VLOOKUP\(A2,\$D\$2:\$E\$500,2,FALSE\)=0,&quot;No price on file&quot;,VLOOKUP\(A2,\$D\$2:\$E\$500,2,FALSE\)\)/);
  assert.match(page, /A real zero, a hidden zero, a true blank, and an empty string can behave differently/);
  assert.match(page, /Use it past the guest limit/);
  assert.match(page, new RegExp(`data-checkout href="${checkoutUrl}"`));
  assert.match(homepage, /href="\/excel-formula-returns-zero-blank\/">Formula returns 0 or blank/);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/excel-formula-returns-zero-blank\//);
  assert.doesNotMatch(page, /upload|workbook audit|diagnoses your workbook|guarantee|guaranteed|always fixes|official Microsoft|Microsoft partner|affiliated|PDF|same-day|human reviewer|data never leaves|instant|in seconds/i);
});

test('excel formula not copying down page targets fill-down repair intent without overclaiming', () => {
  const page = read('excel-formula-not-copying-down/index.html');
  const homepage = read('index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /Excel Formula Not Copying Down Fixer/);
  assert.match(page, /Fix an Excel formula that is not copying down/);
  assert.match(page, /will not fill down correctly/);
  assert.match(page, /fill handle settings, calculation mode, relative references, absolute references/);
  assert.match(page, /=XLOOKUP\(A2,Products!\$A\$2:\$A\$500,Products!\$C\$2:\$C\$500,&quot;Not found&quot;\)/);
  assert.match(page, /The lookup value A2 stays relative/);
  assert.match(page, /Check whether automatic workbook calculation is enabled/);
  assert.match(page, /Confirm which references should stay relative and which should be locked with dollar signs/);
  assert.match(page, /Use it past the guest limit/);
  assert.match(page, new RegExp(`data-checkout href="${checkoutUrl}"`));
  assert.match(homepage, /href="\/excel-formula-not-copying-down\/">Excel formula not copying down/);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/excel-formula-not-copying-down\//);
  assert.doesNotMatch(page, /upload|workbook audit|diagnoses your workbook|guarantee|guaranteed|always fixes|official Microsoft|Microsoft partner|affiliated|PDF|same-day|human reviewer|data never leaves|instant|in seconds/i);
});

test('excel SUMIFS not working page targets criteria repair intent without overclaiming', () => {
  const page = read('excel-sumifs-not-working/index.html');
  const homepage = read('index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /Excel SUMIFS Not Working Fixer/);
  assert.match(page, /Fix an Excel SUMIFS formula that is not working/);
  assert.match(page, /returns 0, #VALUE!, or the wrong total/);
  assert.match(page, /criteria syntax, range sizes, dates, text values, and argument order/);
  assert.match(page, /=SUMIFS\(D2:D500,A2:A500,&quot;South&quot;,C2:C500,&quot;Meat&quot;,B2:B500,&quot;&gt;=&quot;&amp;DATE\(2026,5,1\),B2:B500,&quot;&lt;&quot;&amp;DATE\(2026,6,1\)\)/);
  assert.match(page, /Confirm the sum range is the first argument in SUMIFS/);
  assert.match(page, /Make every criteria range the same height and width as the sum range/);
  assert.match(page, /Open any source workbook referenced by the formula before trusting a #VALUE! diagnosis/);
  assert.match(page, /Use it past the guest limit/);
  assert.match(page, new RegExp(`data-checkout href="${checkoutUrl}"`));
  assert.match(homepage, /href="\/excel-sumifs-not-working\/">Excel SUMIFS not working/);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/excel-sumifs-not-working\//);
  assert.doesNotMatch(page, /upload|workbook audit|diagnoses your workbook|guarantee|guaranteed|always fixes|official Microsoft|Microsoft partner|affiliated|PDF|same-day|human reviewer|data never leaves|instant|in seconds|pay before answer/i);
});

test('excel COUNTIFS not working page targets count criteria repair intent without overclaiming', () => {
  const page = read('excel-countifs-not-working/index.html');
  const homepage = read('index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /Excel COUNTIFS Not Working Fixer/);
  assert.match(page, /Fix an Excel COUNTIFS formula that is not working/);
  assert.match(page, /returns 0, #VALUE!, or the wrong count/);
  assert.match(page, /criteria syntax, same-size ranges, dates, text values, empty criteria, and closed workbook references/);
  assert.match(page, /=COUNTIFS\(A2:A500,&quot;South&quot;,C2:C500,&quot;Open&quot;,B2:B500,&quot;&gt;=&quot;&amp;DATE\(2026,5,1\),B2:B500,&quot;&lt;&quot;&amp;DATE\(2026,6,1\)\)/);
  assert.match(page, /Make every criteria range the same height and width as the first criteria range/);
  assert.match(page, /Review blank criteria cells because COUNTIFS can treat an empty criteria reference as 0/);
  assert.match(page, /Open any source workbook referenced by the formula before trusting a #VALUE! diagnosis/);
  assert.match(page, /Use it past the guest limit/);
  assert.match(page, new RegExp(`data-checkout href="${checkoutUrl}"`));
  assert.match(homepage, /href="\/excel-countifs-not-working\/">Excel COUNTIFS not working/);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/excel-countifs-not-working\//);
  assert.doesNotMatch(page, /upload|workbook audit|diagnoses your workbook|guarantee|guaranteed|always fixes|official Microsoft|Microsoft partner|affiliated|PDF|same-day|human reviewer|data never leaves|instant|in seconds|pay before answer/i);
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

test('excel SPILL error page targets dynamic-array repair intent without overclaiming', () => {
  const page = read('excel-spill-error/index.html');
  const homepage = read('index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /Excel #SPILL! Error Fixer/);
  assert.match(page, /Fix an Excel #SPILL! error without reading a forum thread/);
  assert.match(page, /formula tried to return more than one cell of results/);
  assert.match(page, /blocked by occupied cells, merged cells, table behavior, worksheet edges, volatile array size, or an oversized reference/);
  assert.match(page, /blocked spill ranges, merged cells, Excel tables, oversized references/);
  assert.match(page, /FILTER formula can return #SPILL!/);
  assert.match(page, /Move spilled array formulas outside Excel tables/);
  assert.match(page, /=FILTER\(A2:C500,B2:B500=&quot;Open&quot;,&quot;No open rows&quot;\)/);
  assert.match(page, /Use it past the guest limit/);
  assert.match(page, new RegExp(`data-checkout href="${checkoutUrl}"`));
  assert.match(homepage, /href="\/excel-spill-error\/">Excel #SPILL! error/);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/excel-spill-error\//);
  assert.doesNotMatch(page, /upload|workbook audit|guarantee|guaranteed|always fixes|official Microsoft|Microsoft partner|affiliated|PDF|same-day|human reviewer|data never leaves|working one/i);
});

test('excel CALC error page targets array-calculation repair intent without overclaiming', () => {
  const page = read('excel-calc-error/index.html');
  const homepage = read('index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /Excel #CALC! Error Fixer/);
  assert.match(page, /Fix an Excel #CALC! error at the array formula/);
  assert.match(page, /empty FILTER results, nested arrays, range references, and unsupported calculation cases/);
  assert.match(page, /A FILTER formula can return #CALC! when no rows match/);
  assert.match(page, /Add an if_empty argument to FILTER/);
  assert.match(page, /custom-function referenced ranges in Excel for the web/);
  assert.match(page, /=FILTER\(A2:C500,B2:B500=&quot;West&quot;,&quot;No matching rows&quot;\)/);
  assert.match(page, /Use it past the guest limit/);
  assert.match(page, new RegExp(`data-checkout href="${checkoutUrl}"`));
  assert.match(homepage, /href="\/excel-calc-error\/">Excel #CALC! error/);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/excel-calc-error\//);
  assert.doesNotMatch(page, /upload|workbook audit|guarantee|guaranteed|always fixes|official Microsoft|Microsoft partner|affiliated|PDF|same-day|human reviewer|data never leaves|instant|in seconds|pay before answer/i);
});

test('excel FILTER function not working page targets FILTER repair intent without overclaiming', () => {
  const page = read('excel-filter-function-not-working/index.html');
  const homepage = read('index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /Excel FILTER Function Not Working/);
  assert.match(page, /Fix an Excel FILTER formula that is not returning the rows you expected/);
  assert.match(page, /empty results, include-array logic, spill behavior, workbook links, and Excel version support/);
  assert.match(page, /missing if_empty fallback/);
  assert.match(page, /Confirm the include range has the same height or width as the array being filtered/);
  assert.match(page, /multiplication for AND logic and addition for OR logic/);
  assert.match(page, /Check Excel version support and keep linked source workbooks open/);
  assert.match(page, /=FILTER\(A2:D500,\(B2:B500=&quot;West&quot;\)\*\(C2:C500=&quot;Open&quot;\),&quot;No matching rows&quot;\)/);
  assert.match(page, /Use it past the guest limit/);
  assert.match(page, new RegExp(`data-checkout href="${checkoutUrl}"`));
  assert.match(homepage, /href="\/excel-filter-function-not-working\/">Excel FILTER function not working/);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/excel-filter-function-not-working\//);
  assert.doesNotMatch(page, /upload|workbook audit|guarantee|guaranteed|always fixes|official Microsoft|Microsoft partner|affiliated|PDF|same-day|human reviewer|data never leaves|instant|in seconds|pay before answer/i);
});

test('excel NUM error page targets invalid-number repair intent without overclaiming', () => {
  const page = read('excel-num-error/index.html');
  const homepage = read('index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /Excel #NUM! Error Fixer/);
  assert.match(page, /Fix an Excel #NUM! error by checking the number Excel cannot use/);
  assert.match(page, /formatted constants, non-converging IRR or RATE functions, and numbers outside Excel limits/);
  assert.match(page, /iterative functions such as IRR or RATE/);
  assert.match(page, /Remove currency symbols and thousands separators/);
  assert.match(page, /square root of a negative number or a log of zero/);
  assert.match(page, /=IRR\(B2:B12,0\.1\)/);
  assert.match(page, /Use it past the guest limit/);
  assert.match(page, new RegExp(`data-checkout href="${checkoutUrl}"`));
  assert.match(homepage, /href="\/excel-num-error\/">Excel #NUM! error/);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/excel-num-error\//);
  assert.doesNotMatch(page, /upload|workbook audit|guarantee|guaranteed|always fixes|official Microsoft|Microsoft partner|affiliated|PDF|same-day|human reviewer|data never leaves|pay before answer/i);
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

test('conditional formatting formula not working page targets rule repair intent without overclaiming', () => {
  const page = read('conditional-formatting-formula-not-working/index.html');
  const homepage = read('index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /Conditional Formatting Formula Not Working/);
  assert.match(page, /Fix a conditional formatting formula that is not firing/);
  assert.match(page, /corrected TRUE\/FALSE formula with the anchors, first-row references, and rule-order checks/);
  assert.match(page, /highlight nothing, highlight everything, shift references, or lose to another rule/);
  assert.match(page, /rule dialog than it does in a normal worksheet cell/);
  assert.match(page, /=AND\(\$B2&lt;TODAY\(\),\$C2&lt;&gt;&quot;Done&quot;\)/);
  assert.match(page, /The rule formula should return TRUE or FALSE, or 1 or 0/);
  assert.match(page, /Write the formula for the first cell or row in the apply-to range/);
  assert.match(page, /use INDIRECT when a custom formula must reference another sheet/);
  assert.match(page, /Use it past the guest limit/);
  assert.match(page, new RegExp(`data-checkout href="${checkoutUrl}"`));
  assert.match(homepage, /href="\/conditional-formatting-formula-not-working\/">Conditional formatting formula not working/);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/conditional-formatting-formula-not-working\//);
  assert.doesNotMatch(page, /upload|workbook audit|diagnoses your workbook|guarantee|guaranteed|always fixes|official Microsoft|official Google|Microsoft partner|Google partner|affiliated|PDF|same-day|human reviewer|data never leaves|instant|in seconds|pay before answer/i);
});

test('excel VLOOKUP not working page targets broader lookup repair intent without overclaiming', () => {
  const page = read('excel-vlookup-not-working/index.html');
  const homepage = read('index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /Excel VLOOKUP Not Working Fixer/);
  assert.match(page, /Fix an Excel VLOOKUP formula that is not working/);
  assert.match(page, /exact-match mode, lookup-column position, text-number mismatches, column indexes, and safer fallbacks/);
  assert.match(page, /omitted fourth argument can make VLOOKUP use approximate matching/);
  assert.match(page, /Confirm the table range starts with the column being searched/);
  assert.match(page, /Count the return column from the first column of the selected table range/);
  assert.match(page, /=IFERROR\(VLOOKUP\(E2,\$A\$2:\$C\$500,2,FALSE\),&quot;Not found&quot;\)/);
  assert.match(page, /Use it past the guest limit/);
  assert.match(page, new RegExp(`data-checkout href="${checkoutUrl}"`));
  assert.match(homepage, /href="\/excel-vlookup-not-working\/">Excel VLOOKUP not working/);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/excel-vlookup-not-working\//);
  assert.doesNotMatch(page, /upload|workbook audit|diagnoses your workbook|guarantee|guaranteed|always fixes|official Microsoft|Microsoft partner|affiliated|PDF|same-day|human reviewer|data never leaves|instant|in seconds|pay before answer/i);
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

test('XLOOKUP NA error page targets modern lookup repair intent without overclaiming', () => {
  const page = read('xlookup-na-error/index.html');
  const homepage = read('index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /XLOOKUP #N\/A Error Fixer/);
  assert.match(page, /Fix an XLOOKUP #N\/A error before you hide it/);
  assert.match(page, /lookup arrays/);
  assert.match(page, /text-number mismatches/);
  assert.match(page, /lookup array and return array cover the same rows/);
  assert.match(page, /=XLOOKUP\(E2,\$A\$2:\$A\$500,\$B\$2:\$B\$500,&quot;Not found&quot;,0\)/);
  assert.match(page, /Formula request/);
  assert.match(page, /Upgrade \$9/);
  assert.doesNotMatch(page, /guarantee|guaranteed|always fixes|official Microsoft|official Google|affiliated|human reviewer|upload/i);
  assert.match(homepage, /href="\/xlookup-na-error\/">XLOOKUP #N\/A error/);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/xlookup-na-error\//);
});

test('excel XLOOKUP not working page targets broader modern lookup repair intent without overclaiming', () => {
  const page = read('excel-xlookup-not-working/index.html');
  const homepage = read('index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /Excel XLOOKUP Not Working Fixer/);
  assert.match(page, /Fix an Excel XLOOKUP formula that is not working/);
  assert.match(page, /lookup arrays, return arrays, match mode, search mode, stored value types, and version support/);
  assert.match(page, /lookup_array and return_array start and end on the same rows/);
  assert.match(page, /Use binary search modes only when the lookup array is sorted as required/);
  assert.match(page, /blank if_not_found value/);
  assert.match(page, /=XLOOKUP\(E2,\$A\$2:\$A\$500,\$C\$2:\$C\$500,&quot;Not found&quot;,0\)/);
  assert.match(page, /Formula request/);
  assert.match(page, /Upgrade \$9/);
  assert.match(page, new RegExp(`data-checkout href="${checkoutUrl}"`));
  assert.match(homepage, /href="\/excel-xlookup-not-working\/">Excel XLOOKUP not working/);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/excel-xlookup-not-working\//);
  assert.doesNotMatch(page, /upload|workbook audit|diagnoses your workbook|guarantee|guaranteed|always fixes|official Microsoft|Microsoft partner|affiliated|PDF|same-day|human reviewer|data never leaves|instant|in seconds|pay before answer/i);
});

test('excel INDEX MATCH not working page targets lookup repair intent without overclaiming', () => {
  const page = read('excel-index-match-not-working/index.html');
  const homepage = read('index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /Excel INDEX MATCH Not Working Fixer/);
  assert.match(page, /Fix an Excel INDEX MATCH formula that is not working/);
  assert.match(page, /exact-match mode, lookup-array shape, row and column offsets, stored value types, and safer fallbacks/);
  assert.match(page, /Use 0 in MATCH for exact match unless approximate matching is intentional/);
  assert.match(page, /lookup array and return array cover the same row positions/);
  assert.match(page, /row MATCH feeds the row_num argument and the column MATCH feeds the column_num argument/);
  assert.match(page, /=IFNA\(INDEX\(\$C\$2:\$C\$500,MATCH\(E2,\$A\$2:\$A\$500,0\)\),&quot;Not found&quot;\)/);
  assert.match(page, /Formula request/);
  assert.match(page, /Upgrade \$9/);
  assert.match(page, new RegExp(`data-checkout href="${checkoutUrl}"`));
  assert.match(homepage, /href="\/excel-index-match-not-working\/">Excel INDEX MATCH not working/);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/excel-index-match-not-working\//);
  assert.doesNotMatch(page, /upload|workbook audit|diagnoses your workbook|guarantee|guaranteed|always fixes|official Microsoft|Microsoft partner|affiliated|PDF|same-day|human reviewer|data never leaves|instant|in seconds|pay before answer/i);
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

test('excel IF formula not working page targets IF repair intent without overclaiming', () => {
  const page = read('excel-if-formula-not-working/index.html');
  const homepage = read('index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /Excel IF Formula Not Working Fixer/);
  assert.match(page, /Fix an Excel IF formula that is not working/);
  assert.match(page, /wrong branches, missing quotes, AND\/OR logic, parentheses, list separators, and IFS alternatives/);
  assert.match(page, /returns FALSE, 0, blank, #VALUE!, or a plausible label on the wrong rows/);
  assert.match(page, /=IF\(AND\(B2&gt;=60,C2&gt;=80%\),&quot;Pass&quot;,&quot;Fail&quot;\)/);
  assert.match(page, /removes the extra closing parenthesis/);
  assert.match(page, /Check whether your Excel locale expects commas or semicolons between IF arguments/);
  assert.match(page, /Use IFS, SWITCH, or a lookup table when a long nested IF is really an ordered decision list/);
  assert.match(page, /Formula request/);
  assert.match(page, /Upgrade \$9/);
  assert.match(page, new RegExp(`data-checkout href="${checkoutUrl}"`));
  assert.match(homepage, /href="\/excel-if-formula-not-working\/">Excel IF formula not working/);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/excel-if-formula-not-working\//);
  assert.doesNotMatch(page, /upload|workbook audit|diagnoses your workbook|guarantee|guaranteed|always fixes|official Microsoft|Microsoft partner|affiliated|PDF|same-day|human reviewer|data never leaves|instant|in seconds|pay before answer/i);
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

test('excel data validation formula not working page targets validation repair intent without overclaiming', () => {
  const page = read('excel-data-validation-formula-not-working/index.html');
  const homepage = read('index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /Excel Data Validation Formula Not Working/);
  assert.match(page, /Fix an Excel data validation formula that is not working/);
  assert.match(page, /TRUE\/FALSE logic, relative references, named ranges, blanks, and rule-dialog behavior/);
  assert.match(page, /accepts entries it should block, rejects entries it should allow, throws a source or name error/);
  assert.match(page, /=AND\(LEFT\(A2,3\)=&quot;ID-&quot;,COUNTIF\(\$A\$2:\$A\$500,A2\)=1\)/);
  assert.match(page, /Write the formula as if it starts in the first cell of the applied validation range/);
  assert.match(page, /Decide whether Ignore Blank should allow empty cells/);
  assert.match(page, /data validation may not flag every existing value automatically/);
  assert.match(page, /Formula request/);
  assert.match(page, /Upgrade \$9/);
  assert.match(page, new RegExp(`data-checkout href="${checkoutUrl}"`));
  assert.match(homepage, /href="\/excel-data-validation-formula-not-working\/">Excel data validation formula not working/);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/excel-data-validation-formula-not-working\//);
  assert.doesNotMatch(page, /upload|workbook audit|diagnoses your workbook|guarantee|guaranteed|always fixes|official Microsoft|Microsoft partner|affiliated|PDF|same-day|human reviewer|data never leaves|instant|in seconds|pay before answer/i);
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
