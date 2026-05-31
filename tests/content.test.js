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
  assert.match(page, /\/google-sheets-ref-error\//);
  assert.match(page, /Fix formulas broken by deleted tabs, invalid ranges, moved references, blocked array output, or IMPORTRANGE source issues/);
  assert.match(page, /\/google-sheets-value-error\//);
  assert.match(page, /Fix formulas blocked by imported text numbers, unparseable VALUE inputs, date text, range shapes, or wrong argument types/);
  assert.match(page, /\/google-sheets-na-error\//);
  assert.match(page, /Fix formulas with missing lookup matches, no-match FILTER results, text-number mismatches, hidden spaces, or fallback mistakes/);
  assert.match(page, /\/google-sheets-div0-error\//);
  assert.match(page, /Fix formulas blocked by zero or blank denominators, ratio logic, averages, percentages, and IFERROR tradeoffs/);
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
  assert.match(page, /\/excel-date-formula-not-working\//);
  assert.match(page, /Fix Excel date formulas with DATEVALUE #VALUE!, text dates, locale mismatches, serial numbers, DATEDIF, or criteria issues/);
  assert.match(page, /\/excel-table-formula-not-working\//);
  assert.match(page, /Fix structured references, calculated columns, @ row references, and table formulas that stop filling correctly/);
  assert.match(page, /\/excel-sumifs-not-working\//);
  assert.match(page, /Fix SUMIFS formulas that return 0, #VALUE!, or wrong totals because of criteria, ranges, dates, or argument order/);
  assert.match(page, /\/excel-countifs-not-working\//);
  assert.match(page, /Fix COUNTIFS formulas that return 0, #VALUE!, or wrong counts because of criteria, range sizes, dates, or closed workbooks/);
  assert.match(page, /\/excel-textjoin-not-working\//);
  assert.match(page, /Fix TEXTJOIN formulas with #VALUE!, #NAME\?, extra delimiters, blank joins, IF or FILTER array issues, line breaks, or version support problems/);
  assert.match(page, /\/excel-indirect-not-working\//);
  assert.match(page, /Fix INDIRECT formulas with #REF!, dynamic sheet names, dependent dropdowns, named ranges, or external workbook limits/);
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
  assert.match(page, /\/google-sheets-date-formula-not-working\//);
  assert.match(page, /Fix DATEVALUE parse errors, text dates, locale mismatches, serial numbers, QUERY date literals, or date criteria issues/);
  assert.match(page, /\/google-sheets-if-formula-not-working\//);
  assert.match(page, /Fix IF formulas that return FALSE, blank, the wrong label, parse errors, or confusing nested IF results/);
  assert.match(page, /\/google-sheets-circular-dependency\//);
  assert.match(page, /Fix circular dependency errors caused by self-referencing cells, self-including ranges, helper-cell loops, or iterative-calculation settings/);
  assert.match(page, /\/google-sheets-sumifs-not-working\//);
  assert.match(page, /Fix SUMIFS formulas that return 0, #VALUE!, or wrong totals because of range sizes, criteria, dates, text values, or argument order/);
  assert.match(page, /\/google-sheets-countifs-not-working\//);
  assert.match(page, /Fix COUNTIFS formulas that return 0, #VALUE!, wrong counts, or miss rows because of range sizes, dates, stored text, hidden spaces, or separators/);
  assert.match(page, /\/google-sheets-sort-not-working\//);
  assert.match(page, /Fix SORT formulas that return the wrong order, sort headers as data, separate rows, or misread dates and numbers stored as text/);
  assert.match(page, /\/google-sheets-filter-not-working\//);
  assert.match(page, /Fix FILTER formulas with #N\/A, mismatched range sizes, wrong rows, no matches, or row-versus-column condition issues/);
  assert.match(page, /\/google-sheets-query-not-working\//);
  assert.match(page, /Fix QUERY formulas with parse errors, NO_COLUMN messages, wrong Col references, header problems, or missing rows/);
  assert.match(page, /\/google-sheets-importrange-not-working\//);
  assert.match(page, /Fix IMPORTRANGE formulas with #REF!, Allow access prompts, oversized imports, slow refreshes, or source permission issues/);
  assert.match(page, /\/google-sheets-importxml-not-working\//);
  assert.match(page, /Fix IMPORTXML formulas with #N\/A, Imported content is empty, Could not fetch URL, XPath mistakes, oversized results, or blocked page content/);
  assert.match(page, /\/google-sheets-regexextract-not-working\//);
  assert.match(page, /Fix REGEXEXTRACT formulas with #N\/A no-match errors, invalid regex patterns, text-input issues, greedy matches, and RE2 syntax limits/);
  assert.match(page, /\/google-sheets-conditional-formatting-not-working\//);
  assert.match(page, /Fix conditional formatting custom formulas that highlight nothing, highlight the wrong rows, lose to another rule, or break across sheets/);
  assert.match(page, /\/google-sheets-data-validation-formula-not-working\//);
  assert.match(page, /Fix Google Sheets data validation custom formulas that warn instead of rejecting, reject valid entries, or shift references after copying/);
  assert.match(page, /\/google-sheets-vlookup-not-working\//);
  assert.match(page, /Fix VLOOKUP formulas with #N\/A, wrong matches, approximate-match issues, lookup-range mistakes, or return-column problems/);
  assert.match(page, /\/google-sheets-xlookup-not-working\//);
  assert.match(page, /Fix XLOOKUP formulas with #N\/A, wrong rows, blank fallbacks, range-size mismatches, or search-mode issues/);
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
    'excel-date-formula-not-working',
    'excel-sumifs-not-working',
    'excel-countifs-not-working',
    'excel-textjoin-not-working',
    'excel-indirect-not-working',
    'excel-value-error',
    'excel-name-error',
    'excel-div0-error',
    'excel-spill-error',
    'excel-calc-error',
    'excel-num-error',
    'excel-circular-reference',
    'excel-ref-error',
    'google-sheets-formulas-not-working',
    'google-sheets-ref-error',
    'google-sheets-value-error',
    'google-sheets-na-error',
    'google-sheets-div0-error',
    'google-sheets-name-error',
    'google-sheets-formula-parse-error',
    'google-sheets-formula-not-updating',
    'google-sheets-date-formula-not-working',
    'google-sheets-if-formula-not-working',
    'google-sheets-circular-dependency',
    'google-sheets-sumifs-not-working',
    'google-sheets-countifs-not-working',
    'google-sheets-sort-not-working',
    'google-sheets-filter-not-working',
    'google-sheets-query-not-working',
    'google-sheets-arrayformula-not-working',
    'google-sheets-importrange-not-working',
    'google-sheets-importxml-not-working',
    'google-sheets-conditional-formatting-not-working',
    'google-sheets-data-validation-formula-not-working',
    'google-sheets-vlookup-not-working',
    'google-sheets-xlookup-not-working',
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

test('google sheets formulas not working page targets broad Sheets repair intent without overclaiming', () => {
  const page = read('google-sheets-formulas-not-working/index.html');
  const homepage = read('index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /Google Sheets Formulas Not Working/);
  assert.match(page, /Fix Google Sheets formulas that are not working/);
  assert.match(page, /parse errors, text-formatted values, invalid references, stale results, locale separators/);
  assert.match(page, /#ERROR!, #REF!, #VALUE!, #N\/A/);
  assert.match(page, /commas or semicolons/);
  assert.match(page, /numbers, dates, and lookup IDs are stored as the type/);
  assert.match(page, /=SUMPRODUCT\(\(B:B=&quot;West&quot;\)\*IFERROR\(VALUE\(D:D\),0\)\)/);
  assert.match(page, /Formula request/);
  assert.match(page, /Use it past the guest limit/);
  assert.match(page, new RegExp(`data-checkout href="${checkoutUrl}"`));
  assert.match(homepage, /href="\/google-sheets-formulas-not-working\/">Google Sheets formulas not working/);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/google-sheets-formulas-not-working\//);
  assert.doesNotMatch(page, /upload|workbook audit|diagnoses your workbook|guarantee|guaranteed|always fixes|official Google|Google partner|affiliated|PDF|same-day|human reviewer|data never leaves|instant|in seconds|pay before answer/i);
});

test('google sheets NAME error page targets unknown-name repair intent without overclaiming', () => {
  const page = read('google-sheets-name-error/index.html');
  const homepage = read('index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /Google Sheets #NAME\? Error Fixer/);
  assert.match(page, /Fix a Google Sheets #NAME\? error at the name Sheets cannot read/);
  assert.match(page, /#NAME\? or says Unknown range name/);
  assert.match(page, /function name, named range, named function, unquoted text value, or copied reference/);
  assert.match(page, /Use underscores instead of spaces or hyphens/);
  assert.match(page, /Data, Named ranges/);
  assert.match(page, /=SUM\(My_Range\)/);
  assert.match(page, /Use it past the guest limit/);
  assert.match(page, new RegExp(`data-checkout href="${checkoutUrl}"`));
  assert.match(homepage, /href="\/google-sheets-name-error\/">Google Sheets #NAME\? error/);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/google-sheets-name-error\//);
  assert.doesNotMatch(page, /upload|workbook audit|diagnoses your workbook|finds every|guarantee|guaranteed|always fixes|official Google|Google partner|affiliated|PDF|same-day|human reviewer|data never leaves|private|\blocal\b|secure by default|instant|in seconds|one click|automatic|pay before answer/i);
});

test('google sheets REF error page targets broken-reference repair intent without overclaiming', () => {
  const page = read('google-sheets-ref-error/index.html');
  const homepage = read('index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /Fix #REF! Errors in Google Sheets/);
  assert.match(page, /Fix a #REF! error in Google Sheets/);
  assert.match(page, /invalid references, deleted tabs or ranges, moved lookup ranges/);
  assert.match(page, /IMPORTRANGE references, blocked array output, and INDIRECT strings/);
  assert.match(page, /deleted or renamed a tab, row, column, or source range|deleted tabs, invalid ranges, moved references/);
  assert.match(page, /Clear the intended spill area before rewriting an array formula/);
  assert.match(page, /=SUM\('Closed Orders'!B2:B500\)/);
  assert.match(page, /Use it past the guest limit/);
  assert.match(page, new RegExp(`data-checkout href="${checkoutUrl}"`));
  assert.match(homepage, /href="\/google-sheets-ref-error\/">Google Sheets #REF! error/);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/google-sheets-ref-error\//);
  assert.doesNotMatch(page, /upload|workbook audit|diagnoses your workbook|finds every|guarantee|guaranteed|always fixes|official Google|Google partner|affiliated|PDF|same-day|human reviewer|data never leaves|private|\blocal\b|secure by default|instant|in seconds|one click|automatic|pay before answer/i);
});

test('google sheets VALUE error page targets text-number repair intent without overclaiming', () => {
  const page = read('google-sheets-value-error/index.html');
  const homepage = read('index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /Google Sheets #VALUE! Error Fixer/);
  assert.match(page, /Fix a Google Sheets #VALUE! error without hiding the bad input/);
  assert.match(page, /text-stored numbers, date text, VALUE conversion, range shapes, and wrong argument types/);
  assert.match(page, /VALUE parameter cannot be parsed/);
  assert.match(page, /Remove currency symbols, commas, extra spaces, and labels before VALUE tries to parse imported numbers/);
  assert.match(page, /=IFERROR\(VALUE\(REGEXREPLACE\(B2,&quot;\[\$,\]&quot;,&quot;&quot;\)\)\*C2,&quot;Check imported amount&quot;\)/);
  assert.match(page, /Use it past the guest limit/);
  assert.match(page, new RegExp(`data-checkout href="${checkoutUrl}"`));
  assert.match(homepage, /href="\/google-sheets-value-error\/">Google Sheets #VALUE! error/);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/google-sheets-value-error\//);
  assert.doesNotMatch(page, /upload|workbook audit|diagnoses your workbook|finds every|guarantee|guaranteed|always fixes|official Google|Google partner|affiliated|PDF|same-day|human reviewer|data never leaves|private|\blocal\b|secure by default|instant|in seconds|one click|automatic|pay before answer/i);
});

test('google sheets NA error page targets missing-match repair intent without overclaiming', () => {
  const page = read('google-sheets-na-error/index.html');
  const homepage = read('index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /Google Sheets #N\/A Error Fixer/);
  assert.match(page, /Fix a Google Sheets #N\/A error before you hide it/);
  assert.match(page, /lookup keys, FILTER no-match cases, stored text versus numbers, hidden spaces/);
  assert.match(page, /Google Sheets returns #N\/A, says it did not find a value, or shows no matches/);
  assert.match(page, /Use IFNA for expected missing matches instead of wrapping every formula problem in IFERROR/);
  assert.match(page, /=IFNA\(VLOOKUP\(TRIM\(E2\),\$A\$2:\$D\$500,4,FALSE\),&quot;Not found&quot;\)/);
  assert.match(page, /Use it past the guest limit/);
  assert.match(page, new RegExp(`data-checkout href="${checkoutUrl}"`));
  assert.match(homepage, /href="\/google-sheets-na-error\/">Google Sheets #N\/A error/);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/google-sheets-na-error\//);
  assert.doesNotMatch(page, /upload|workbook audit|diagnoses your workbook|finds every|guarantee|guaranteed|always fixes|official Google|Google partner|affiliated|PDF|same-day|human reviewer|data never leaves|private|\blocal\b|secure by default|instant|in seconds|one click|automatic|pay before answer/i);
});

test('google sheets DIV0 error page targets divide-by-zero repair intent without overclaiming', () => {
  const page = read('google-sheets-div0-error/index.html');
  const homepage = read('index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /Google Sheets #DIV\/0! Error Fixer/);
  assert.match(page, /Fix #DIV\/0! in Google Sheets without hiding the wrong error/);
  assert.match(page, /zero or blank denominators, ratio formulas, averages, percentages/);
  assert.match(page, /Use IF to test the denominator directly when only division-by-zero should be handled/);
  assert.match(page, /Use IFERROR carefully because it can also hide #VALUE!, #REF!, #N\/A, parse errors/);
  assert.match(page, /=IF\(C2=0,,B2\/C2\)/);
  assert.match(page, /Other formula errors remain visible instead of being hidden by a broad IFERROR wrapper/);
  assert.match(page, /Use it past the guest limit/);
  assert.match(page, new RegExp(`data-checkout href="${checkoutUrl}"`));
  assert.match(homepage, /href="\/google-sheets-div0-error\/">Google Sheets #DIV\/0! error/);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/google-sheets-div0-error\//);
  assert.doesNotMatch(page, /upload|workbook audit|diagnoses your workbook|finds every|guarantee|guaranteed|always fixes|official Google|Google partner|affiliated|PDF|same-day|human reviewer|data never leaves|private|\blocal\b|secure by default|instant|in seconds|one click|automatic|pay before answer/i);
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

test('excel date formula not working page targets date repair intent without overclaiming', () => {
  const page = read('excel-date-formula-not-working/index.html');
  const homepage = read('index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /Excel Date Formula Not Working/);
  assert.match(page, /Your Excel date formula is not working/);
  assert.match(page, /DATEVALUE returns #VALUE!/);
  assert.match(page, /shows a serial number/);
  assert.match(page, /DATEDIF can return an error/);
  assert.match(page, /SUMIFS, COUNTIFS, FILTER, and TODAY comparisons can quietly return the wrong answer/);
  assert.match(page, /Check whether the source value is a real Excel date serial or text/);
  assert.match(page, /Use DATE to build criteria boundaries/);
  assert.match(page, /=SUMIFS\(C2:C500,A2:A500,&quot;&gt;=&quot;&amp;DATE\(2026,5,1\),A2:A500,&quot;&lt;&quot;&amp;DATE\(2026,6,1\)\)/);
  assert.match(page, /Use it past the guest limit/);
  assert.match(page, new RegExp(`data-checkout href="${checkoutUrl}"`));
  assert.match(homepage, /href="\/excel-date-formula-not-working\/">Excel date formula not working/);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/excel-date-formula-not-working\//);
  assert.doesNotMatch(page, /upload|workbook audit|diagnoses your workbook|guarantee|guaranteed|always fixes|official Microsoft|Microsoft partner|affiliated|PDF|same-day|human reviewer|data never leaves|instant|in seconds|one-click|automatically fixes|whole spreadsheet|pay before answer/i);
});

test('excel table formula not working page targets structured-reference repair intent without overclaiming', () => {
  const page = read('excel-table-formula-not-working/index.html');
  const homepage = read('index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /Excel Table Formula Not Working/);
  assert.match(page, /Fix an Excel table formula that is not working/);
  assert.match(page, /structured references, calculated columns, and @ row references/);
  assert.match(page, /table names, column headers, row context, copied formulas, and fill-down behavior/);
  assert.match(page, /=XLOOKUP\(\[@SKU\],Products\[SKU\],Products\[Price\],&quot;Not found&quot;\)/);
  assert.match(page, /Confirm the source range is an actual Excel table/);
  assert.match(page, /Check whether Excel calculated-column behavior is turned on/);
  assert.match(page, /Use it past the guest limit/);
  assert.match(page, new RegExp(`data-checkout href="${checkoutUrl}"`));
  assert.match(homepage, /href="\/excel-table-formula-not-working\/">Excel table formula not working/);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/excel-table-formula-not-working\//);
  assert.doesNotMatch(page, /upload|workbook audit|diagnoses your workbook|guarantee|guaranteed|always fixes|official Microsoft|Microsoft partner|affiliated|Microsoft-certified|Google-approved|PDF|same-day|human reviewer|data never leaves|instant|in seconds|one-click|automatically fixes|whole spreadsheet/i);
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

test('excel TEXTJOIN not working page targets text-join repair intent without overclaiming', () => {
  const page = read('excel-textjoin-not-working/index.html');
  const homepage = read('index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /Excel TEXTJOIN Not Working Fixer/);
  assert.match(page, /Fix an Excel TEXTJOIN formula that is not working/);
  assert.match(page, /returns #VALUE!, #NAME\?, extra separators, blank output, or a broken IF\/FILTER join/);
  assert.match(page, /quoted delimiters, TRUE\/FALSE empty handling, text ranges, line breaks, array criteria, version support, and Excel cell-length limits/);
  assert.match(page, /=TEXTJOIN\(&quot;, &quot;,TRUE,FILTER\(\$B\$2:\$B\$500,\$A\$2:\$A\$500=E2\)\)/);
  assert.match(page, /Put the delimiter in quotes/);
  assert.match(page, /Check whether the joined result is too long for one Excel cell/);
  assert.match(page, /Use CHAR\(10\) for line breaks and turn on Wrap Text/);
  assert.match(page, /Use it past the guest limit/);
  assert.match(page, new RegExp(`data-checkout href="${checkoutUrl}"`));
  assert.match(homepage, /href="\/excel-textjoin-not-working\/">Excel TEXTJOIN not working/);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/excel-textjoin-not-working\//);
  assert.doesNotMatch(page, /upload|workbook audit|diagnoses your workbook|guarantee|guaranteed|always fixes|official Microsoft|Microsoft partner|affiliated|PDF|same-day|human reviewer|data never leaves|instant|in seconds|one-click|automatically fixes|pay before answer|whole spreadsheet/i);
});

test('excel INDIRECT not working page targets dynamic reference repair intent without overclaiming', () => {
  const page = read('excel-indirect-not-working/index.html');
  const homepage = read('index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /Excel INDIRECT Not Working Fixer/);
  assert.match(page, /Fix an Excel INDIRECT formula that is not working/);
  assert.match(page, /returns #REF!, points at the wrong cell, or breaks when a sheet name, named range, dropdown, or external workbook reference changes/);
  assert.match(page, /reference text, quotes, tab names, workbook state, named ranges, and Excel web limits/);
  assert.match(page, /=INDIRECT\(&quot;'&quot;&amp;A1&amp;&quot;'!B2&quot;\)/);
  assert.match(page, /Confirm the text inside INDIRECT evaluates to a valid A1 or R1C1 reference/);
  assert.match(page, /Open any external source workbook before treating an INDIRECT #REF! as a syntax-only problem/);
  assert.match(page, /Avoid relying on external INDIRECT references in Excel for the web/);
  assert.match(page, /Use it past the guest limit/);
  assert.match(page, new RegExp(`data-checkout href="${checkoutUrl}"`));
  assert.match(homepage, /href="\/excel-indirect-not-working\/">Excel INDIRECT not working/);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/excel-indirect-not-working\//);
  assert.doesNotMatch(page, /upload|workbook audit|diagnoses your workbook|guarantee|guaranteed|always fixes|official Microsoft|Microsoft partner|affiliated|PDF|same-day|human reviewer|data never leaves|instant|in seconds|one-click|automatically fixes|pay before answer|whole spreadsheet/i);
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

test('google sheets formula not updating page targets stale result repair intent without overclaiming', () => {
  const page = read('google-sheets-formula-not-updating/index.html');
  const homepage = read('index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /Google Sheets Formula Not Updating/);
  assert.match(page, /Fix a Google Sheets formula that is not updating/);
  assert.match(page, /first check whether it is a recalculation setting or a broken formula/);
  assert.match(page, /stale values, volatile functions, text-stored inputs, range drift, and copied formulas/);
  assert.match(page, /volatile functions/);
  assert.match(page, /Check File, Settings, Calculation/);
  assert.match(page, /=SUMIFS\(D2:D500,B2:B500,&quot;Paid&quot;,A2:A500,TODAY\(\)\)/);
  assert.match(page, /If new rows land below row 500, the range must expand/);
  assert.match(page, /Use it past the guest limit/);
  assert.match(page, new RegExp(`data-checkout href="${checkoutUrl}"`));
  assert.match(homepage, /href="\/google-sheets-formula-not-updating\/">Google Sheets formula not updating/);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/google-sheets-formula-not-updating\//);
  assert.doesNotMatch(page, /upload|workbook audit|diagnoses your workbook|guarantee|guaranteed|always fixes|official Google|Google partner|affiliated|PDF|same-day|human reviewer|data never leaves|instant|in seconds|one click|automatic repair|pay before answer|full sheet/i);
});

test('google sheets date formula not working page targets date parsing repair intent without overclaiming', () => {
  const page = read('google-sheets-date-formula-not-working/index.html');
  const homepage = read('index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /Google Sheets Date Formula Not Working/);
  assert.match(page, /Fix a Google Sheets date formula that is not working/);
  assert.match(page, /DATEVALUE says the value cannot be parsed to date\/time/);
  assert.match(page, /QUERY needs a date literal/);
  assert.match(page, /serial number displays where a date should appear/);
  assert.match(page, /value cannot be parsed to date\/time/);
  assert.match(page, /Confirm the spreadsheet locale/);
  assert.match(page, /yyyy-mm-dd/);
  assert.match(page, /=DATEVALUE\(REGEXEXTRACT\(A2,&quot;\\d\{4\}-\\d\{2\}-\\d\{2\}&quot;\)\)/);
  assert.match(page, /formatted as a date instead of a plain serial number/);
  assert.match(page, /Use it past the guest limit/);
  assert.match(page, new RegExp(`data-checkout href="${checkoutUrl}"`));
  assert.match(homepage, /href="\/google-sheets-date-formula-not-working\/">Google Sheets date formula not working/);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/google-sheets-date-formula-not-working\//);
  assert.doesNotMatch(page, /upload|workbook audit|diagnoses your workbook|fixes every|guarantee|guaranteed|always fixes|official Google|Google partner|affiliated|PDF|same-day|human reviewer|data never leaves|instant|in seconds|one click|automatic|pay before answer|whole sheet|full sheet/i);
});

test('google sheets IF formula not working page targets branch repair intent without overclaiming', () => {
  const page = read('google-sheets-if-formula-not-working/index.html');
  const homepage = read('index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /Google Sheets IF Formula Not Working/);
  assert.match(page, /Fix a Google Sheets IF formula that is returning the wrong result/);
  assert.match(page, /FALSE appears where a label should be/);
  assert.match(page, /logical tests, true\/false branches, AND\/OR conditions, empty strings, and locale separators/);
  assert.match(page, /value_if_true and value_if_false/);
  assert.match(page, /Add a deliberate false branch/);
  assert.match(page, /=IF\(AND\(B2=&quot;Paid&quot;,C2&gt;0\),&quot;Ready&quot;,&quot;Review&quot;\)/);
  assert.match(page, /provides an explicit Review result/);
  assert.match(page, /Use it past the guest limit/);
  assert.match(page, new RegExp(`data-checkout href="${checkoutUrl}"`));
  assert.match(homepage, /href="\/google-sheets-if-formula-not-working\/">Google Sheets IF formula not working/);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/google-sheets-if-formula-not-working\//);
  assert.doesNotMatch(page, /upload|workbook audit|diagnoses your workbook|guarantee|guaranteed|always fixes|official Google|Google partner|affiliated|PDF|same-day|human reviewer|data never leaves|instant|in seconds|one click|automatic|pay before answer|whole sheet|full sheet/i);
});

test('google sheets circular dependency page targets loop repair intent without overclaiming', () => {
  const page = read('google-sheets-circular-dependency/index.html');
  const homepage = read('index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /Google Sheets Circular Dependency Fixer/);
  assert.match(page, /Fix a Google Sheets circular dependency without hiding the loop/);
  assert.match(page, /Circular dependency detected/);
  assert.match(page, /self-references, self-including ranges, indirect loops, and iterative calculation/);
  assert.match(page, /direct self-references, self-including ranges, helper-cell loops, and iterative-calculation settings/);
  assert.match(page, /=SUM\(D3:D20\)/);
  assert.match(page, /The repaired formula starts below D2/);
  assert.match(page, /Use iterative calculation only when the circular model is intentional/);
  assert.match(page, /Formula request/);
  assert.match(page, /Upgrade \$9/);
  assert.match(page, new RegExp(`data-checkout href="${checkoutUrl}"`));
  assert.match(homepage, /href="\/google-sheets-circular-dependency\/">Google Sheets circular dependency/);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/google-sheets-circular-dependency\//);
  assert.doesNotMatch(page, /upload|workbook audit|diagnoses your workbook|guarantee|guaranteed|always fixes|official Google|Google partner|affiliated|PDF|same-day|human reviewer|data never leaves|private|\blocal\b|secure by default|instant|in seconds|one click|automatic|pay before answer/i);
});

test('google sheets SUMIFS not working page targets criteria repair intent without overclaiming', () => {
  const page = read('google-sheets-sumifs-not-working/index.html');
  const homepage = read('index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /Google Sheets SUMIFS Not Working/);
  assert.match(page, /Fix a Google Sheets SUMIFS formula that is not adding up/);
  assert.match(page, /0 when matching rows exist, #VALUE! from mismatched ranges/);
  assert.match(page, /range sizes, criteria order, dates, stored text, hidden spaces, and separators/);
  assert.match(page, /SUMIFS starts with the sum range/);
  assert.match(page, /=SUMIFS\(D2:D500,B2:B500,&quot;Acme&quot;,A2:A500,&quot;&gt;=&quot;&amp;DATE\(2026,3,1\),A2:A500,&quot;&lt;&quot;&amp;DATE\(2026,4,1\)\)/);
  assert.match(page, /DATE so Sheets compares against real date values/);
  assert.match(page, /Check whether your Sheets locale expects commas or semicolons/);
  assert.match(page, /Use it past the guest limit/);
  assert.match(page, new RegExp(`data-checkout href="${checkoutUrl}"`));
  assert.match(homepage, /href="\/google-sheets-sumifs-not-working\/">Google Sheets SUMIFS not working/);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/google-sheets-sumifs-not-working\//);
  assert.doesNotMatch(page, /upload|workbook audit|diagnoses your workbook|guarantee|guaranteed|always fixes|official Google|Google partner|affiliated|PDF|same-day|human reviewer|data never leaves|instant|in seconds|one click|automatic|pay before answer|straight into the cell|next minute/i);
});

test('google sheets COUNTIFS not working page targets count repair intent without overclaiming', () => {
  const page = read('google-sheets-countifs-not-working/index.html');
  const homepage = read('index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /Google Sheets COUNTIFS Not Working/);
  assert.match(page, /Fix a Google Sheets COUNTIFS formula that is counting wrong/);
  assert.match(page, /return 0, #VALUE!, or a count that misses rows/);
  assert.match(page, /criteria ranges, date criteria, stored text, hidden spaces, blank criteria, and locale separators/);
  assert.match(page, /additional criteria range the same height and width as the first criteria range/);
  assert.match(page, /=COUNTIFS\(B2:B500,&quot;Paid&quot;,A2:A500,&quot;&gt;=&quot;&amp;DATE\(2026,3,1\),A2:A500,&quot;&lt;&quot;&amp;DATE\(2026,4,1\)\)/);
  assert.match(page, /DATE so Sheets compares against real date values/);
  assert.match(page, /Trim hidden spaces before deciding a matching row is missing/);
  assert.match(page, /Use it past the guest limit/);
  assert.match(page, new RegExp(`data-checkout href="${checkoutUrl}"`));
  assert.match(homepage, /href="\/google-sheets-countifs-not-working\/">Google Sheets COUNTIFS not working/);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/google-sheets-countifs-not-working\//);
  assert.doesNotMatch(page, /upload|workbook audit|diagnoses your workbook|guarantee|guaranteed|always fixes|official Google|Google partner|affiliated|PDF|same-day|human reviewer|data never leaves|instant|in seconds|one click|automatic|pay before answer|whole sheet|full sheet/i);
});

test('google sheets SORT not working page targets sort repair intent without overclaiming', () => {
  const page = read('google-sheets-sort-not-working/index.html');
  const homepage = read('index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /Google Sheets SORT Not Working/);
  assert.match(page, /Fix a Google Sheets SORT formula that is not sorting correctly/);
  assert.match(page, /headers move into the results, rows separate from their records/);
  assert.match(page, /ranges, sort_column positions, header rows, stored types, and multi-column sorting/);
  assert.match(page, /Count sort_column from the first column of the selected range/);
  assert.match(page, /=SORT\(A2:D500,C2:C500,TRUE\)/);
  assert.match(page, /If the due dates are stored as text/);
  assert.match(page, /Use it past the guest limit/);
  assert.match(page, new RegExp(`data-checkout href="${checkoutUrl}"`));
  assert.match(homepage, /href="\/google-sheets-sort-not-working\/">Google Sheets SORT not working/);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/google-sheets-sort-not-working\//);
  assert.doesNotMatch(page, /upload|workbook audit|diagnoses your workbook|guarantee|guaranteed|always fixes|official Google|Google partner|affiliated|PDF|same-day|human reviewer|data never leaves|instant|in seconds|one click|automatic|pay before answer|whole sheet|full sheet/i);
});

test('google sheets FILTER not working page targets filter repair intent without overclaiming', () => {
  const page = read('google-sheets-filter-not-working/index.html');
  const homepage = read('index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /Google Sheets FILTER Not Working/);
  assert.match(page, /Fix a Google Sheets FILTER formula that is not returning the rows you expected/);
  assert.match(page, /FILTER has mismatched range sizes/);
  assert.match(page, /same-size ranges, condition logic, no-match handling, and row-versus-column filter shapes/);
  assert.match(page, /condition arguments? the same length|condition ranges/i);
  assert.match(page, /=FILTER\(A2:D,B2:B=&quot;Paid&quot;,C2:C=&quot;West&quot;\)/);
  assert.match(page, /Use row conditions for row filtering and column conditions for column filtering/);
  assert.match(page, /Check whether #N\/A means no rows matched/);
  assert.match(page, /Use it past the guest limit/);
  assert.match(page, new RegExp(`data-checkout href="${checkoutUrl}"`));
  assert.match(homepage, /href="\/google-sheets-filter-not-working\/">Google Sheets FILTER not working/);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/google-sheets-filter-not-working\//);
  assert.doesNotMatch(page, /upload|workbook audit|diagnoses your workbook|guarantee|guaranteed|always fixes|official Google|Google partner|affiliated|PDF|same-day|human reviewer|data never leaves|instant|in seconds|pay before answer/i);
});

test('google sheets ARRAYFORMULA not working page targets spill and range repair intent without overclaiming', () => {
  const page = read('google-sheets-arrayformula-not-working/index.html');
  const homepage = read('index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /Google Sheets ARRAYFORMULA Not Working/);
  assert.match(page, /Fix a Google Sheets ARRAYFORMULA that is not expanding correctly/);
  assert.match(page, /blocked spill ranges, row-by-row logic, blank-row handling, and range shapes/);
  assert.match(page, /array result was not expanded/);
  assert.match(page, /repeats one value down a column/);
  assert.match(page, /=ARRAYFORMULA\(IF\(A2:A=&quot;&quot;,&quot;&quot;,B2:B\*C2:C\)\)/);
  assert.match(page, /Clear or move values that block the spill range/);
  assert.match(page, /Use matching open-ended ranges, such as A2:A and B2:B/);
  assert.match(page, /functions that are not row-aware inside an array formula/);
  assert.match(page, /Use it past the guest limit/);
  assert.match(page, new RegExp(`data-checkout href="${checkoutUrl}"`));
  assert.match(homepage, /href="\/google-sheets-arrayformula-not-working\/">Google Sheets ARRAYFORMULA not working/);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/google-sheets-arrayformula-not-working\//);
  assert.doesNotMatch(page, /upload|workbook audit|diagnoses your workbook|guarantee|guaranteed|always fixes|official Google|Google partner|affiliated|PDF|same-day|human reviewer|data never leaves|instant|in seconds|pay before answer/i);
});

test('google sheets IMPORTRANGE not working page targets import repair intent without overclaiming', () => {
  const page = read('google-sheets-importrange-not-working/index.html');
  const homepage = read('index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /Google Sheets IMPORTRANGE Not Working/);
  assert.match(page, /Fix a Google Sheets IMPORTRANGE formula that is not working/);
  assert.match(page, /#REF!, asks for Allow access, says the result is too large/);
  assert.match(page, /URL syntax, range strings, permissions, import size, refresh behavior/);
  assert.match(page, /source permissions, import size, refresh behavior, and volatile source formulas/);
  assert.match(page, /=QUERY\(IMPORTRANGE\(&quot;https:\/\/docs\.google\.com\/spreadsheets\/d\/source-id\/edit&quot;,&quot;Orders!A:E&quot;\),&quot;select Col1, Col3, Col5 where Col4 = 'Open'&quot;,1\)/);
  assert.match(page, /Click Allow access from the destination sheet/);
  assert.match(page, /Import only the rows and columns needed/);
  assert.match(page, /NOW, RAND, or RANDBETWEEN/);
  assert.match(page, /Use it past the guest limit/);
  assert.match(page, new RegExp(`data-checkout href="${checkoutUrl}"`));
  assert.match(homepage, /href="\/google-sheets-importrange-not-working\/">Google Sheets IMPORTRANGE not working/);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/google-sheets-importrange-not-working\//);
  assert.doesNotMatch(page, /upload|workbook audit|diagnoses your workbook|guarantee|guaranteed|always fixes|official Google|Google partner|affiliated|PDF|same-day|human reviewer|data never leaves|instant|in seconds|pay before answer/i);
});

test('google sheets IMPORTXML not working page targets XPath repair intent without overclaiming', () => {
  const page = read('google-sheets-importxml-not-working/index.html');
  const homepage = read('index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /Google Sheets IMPORTXML Not Working/);
  assert.match(page, /Fix a Google Sheets IMPORTXML formula that is returning #N\/A or empty content/);
  assert.match(page, /Imported content is empty, Could not fetch URL/);
  assert.match(page, /URL quoting, protocol, XPath syntax, page visibility to Sheets, result-size limits/);
  assert.match(page, /JavaScript-rendered page content/);
  assert.match(page, /=IMPORTXML\(&quot;https:\/\/example\.com\/products\/widget&quot;,&quot;\/\/span\[contains\(@class,'price'\)\]\/text\(\)&quot;\)/);
  assert.match(page, /Make sure the URL includes http or https and is quoted/);
  assert.match(page, /Check whether the data exists in the page source without JavaScript/);
  assert.match(page, /resource contents exceeded the maximum size/);
  assert.match(page, /Use it past the guest limit/);
  assert.match(page, new RegExp(`data-checkout href="${checkoutUrl}"`));
  assert.match(homepage, /href="\/google-sheets-importxml-not-working\/">Google Sheets IMPORTXML not working/);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/google-sheets-importxml-not-working\//);
  assert.doesNotMatch(page, /upload|workbook audit|diagnoses your workbook|guarantee|guaranteed|always fixes|working one back|official Google|Google partner|affiliated|PDF|same-day|human reviewer|data never leaves|instant|in seconds|one click|automatic|pay before answer|detects JS|cancel any time/i);
});

test('google sheets REGEXEXTRACT not working page targets regex repair intent without overclaiming', () => {
  const page = read('google-sheets-regexextract-not-working/index.html');
  const homepage = read('index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /Google Sheets REGEXEXTRACT Not Working/);
  assert.match(page, /Fix a Google Sheets REGEXEXTRACT formula that is not matching/);
  assert.match(page, /#N\/A because the pattern does not match/);
  assert.match(page, /text-only input, capture groups, escaped characters, greedy patterns, and RE2 syntax limits/);
  assert.match(page, /lookbehind, lookaround, and backreferences/);
  assert.match(page, /=REGEXEXTRACT\(TO_TEXT\(A2\),&quot;Order #\(\[A-Z\]-\\d\+\)&quot;\)/);
  assert.match(page, /Avoid unsupported RE2 syntax such as lookbehind, lookaround, and backreferences/);
  assert.match(page, /Use VALUE only after extraction/);
  assert.match(page, /Use it past the guest limit/);
  assert.match(page, new RegExp(`data-checkout href="${checkoutUrl}"`));
  assert.match(homepage, /href="\/google-sheets-regexextract-not-working\/">Google Sheets REGEXEXTRACT not working/);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/google-sheets-regexextract-not-working\//);
  assert.doesNotMatch(page, /upload|workbook audit|diagnoses your workbook|whole-sheet|full-sheet|guarantee|guaranteed|always fixes|fixes every|official Google|Google partner|affiliated|PDF|same-day|human reviewer|data never leaves|instant|in seconds|one click|automatic|pay before answer|we know what you meant|trained on millions/i);
});

test('google sheets conditional formatting page targets custom formula repair intent without overclaiming', () => {
  const page = read('google-sheets-conditional-formatting-not-working/index.html');
  const homepage = read('index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /Google Sheets Conditional Formatting Custom Formula Not Working/);
  assert.match(page, /Fix a Google Sheets conditional formatting custom formula that is not working/);
  assert.match(page, /custom formula can work in a normal cell and still fail in conditional formatting/);
  assert.match(page, /apply-to range/);
  assert.match(page, /top-left cell/);
  assert.match(page, /dollar-sign anchors/);
  assert.match(page, /TRUE\/FALSE/);
  assert.match(page, /INDIRECT/);
  assert.match(page, /=AND\(\$B2&lt;TODAY\(\),\$C2&lt;&gt;&quot;Done&quot;\)/);
  assert.match(page, /Check whether a rule above this one is already setting the format/);
  assert.match(page, /Use it past the guest limit/);
  assert.match(page, new RegExp(`data-checkout href="${checkoutUrl}"`));
  assert.match(homepage, /href="\/google-sheets-conditional-formatting-not-working\/">Google Sheets conditional formatting not working/);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/google-sheets-conditional-formatting-not-working\//);
  assert.doesNotMatch(page, /upload|workbook audit|diagnoses your workbook|full sheet design|guarantee|guaranteed|always fixes|fixes every|official Google|Google partner|affiliated|PDF|same-day|human reviewer|data never leaves|instant|in seconds|one click|automatic|pay before answer/i);
});

test('google sheets data validation formula page targets rule repair intent without overclaiming', () => {
  const page = read('google-sheets-data-validation-formula-not-working/index.html');
  const homepage = read('index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /Google Sheets Data Validation Formula Not Working/);
  assert.match(page, /Fix a Google Sheets data validation custom formula that is not working/);
  assert.match(page, /Show warning versus Reject input/);
  assert.match(page, /TRUE\/FALSE output/);
  assert.match(page, /first-cell references/);
  assert.match(page, /dropdown-from-range/);
  assert.match(page, /=OR\(\$B2&lt;&gt;&quot;Open&quot;,LEN\(C2\)&gt;0\)/);
  assert.match(page, /Set invalid data to Reject input/);
  assert.match(page, /custom formula returns TRUE for allowed entries and FALSE for rejected entries/);
  assert.match(page, /Use it past the guest limit/);
  assert.match(page, new RegExp(`data-checkout href="${checkoutUrl}"`));
  assert.match(homepage, /href="\/google-sheets-data-validation-formula-not-working\/">Google Sheets data validation formula not working/);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/google-sheets-data-validation-formula-not-working\//);
  assert.doesNotMatch(page, /upload|workbook audit|diagnoses your workbook|full-sheet|guarantee|guaranteed|always fixes|fixes every|official Google|Google partner|affiliated|PDF|same-day|human reviewer|data never leaves|instant|in seconds|one click|automatic|pay before answer|partnership/i);
});

test('google sheets VLOOKUP not working page targets lookup repair intent without overclaiming', () => {
  const page = read('google-sheets-vlookup-not-working/index.html');
  const homepage = read('index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /Google Sheets VLOOKUP Not Working/);
  assert.match(page, /Fix a Google Sheets VLOOKUP formula that is not returning the right value/);
  assert.match(page, /#N\/A, pulls a plausible but wrong row/);
  assert.match(page, /exact match, sorted ranges, first-column lookup rules, return-column indexes/);
  assert.match(page, /omitted is_sorted argument|is_sorted is TRUE/);
  assert.match(page, /=IFNA\(VLOOKUP\(E2,\$A\$2:\$D\$500,4,FALSE\),&quot;Not found&quot;\)/);
  assert.match(page, /Sort the first column of the lookup range in ascending order before using TRUE approximate match/);
  assert.match(page, /Count the return index from the first column of the selected range/);
  assert.match(page, /Use it past the guest limit/);
  assert.match(page, new RegExp(`data-checkout href="${checkoutUrl}"`));
  assert.match(homepage, /href="\/google-sheets-vlookup-not-working\/">Google Sheets VLOOKUP not working/);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/google-sheets-vlookup-not-working\//);
  assert.doesNotMatch(page, /upload|workbook audit|diagnoses your workbook|guarantee|guaranteed|always fixes|official Google|Google partner|affiliated|PDF|same-day|human reviewer|data never leaves|instant|in seconds|pay before answer/i);
});

test('google sheets XLOOKUP not working page targets lookup repair intent without overclaiming', () => {
  const page = read('google-sheets-xlookup-not-working/index.html');
  const homepage = read('index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /Google Sheets XLOOKUP Not Working/);
  assert.match(page, /Fix a Google Sheets XLOOKUP formula that is not matching correctly/);
  assert.match(page, /#N\/A, pulls the wrong row, shows a blank fallback/);
  assert.match(page, /XLOOKUP\(search_key, lookup_range, result_range, missing_value, match_mode, search_mode\)/);
  assert.match(page, /XLOOKUP\(search_key, lookup_range, result_range|lookup_range and result_range alignment|match_mode, search_mode/);
  assert.match(page, /=XLOOKUP\(E2,\$A\$2:\$A\$500,\$D\$2:\$D\$500,&quot;Not found&quot;,0,1\)/);
  assert.match(page, /Use search_mode -1 only when the last matching duplicate should win/);
  assert.match(page, /Sort the lookup range before using binary search_mode 2 or -2/);
  assert.match(page, /Use it past the guest limit/);
  assert.match(page, new RegExp(`data-checkout href="${checkoutUrl}"`));
  assert.match(homepage, /href="\/google-sheets-xlookup-not-working\/">Google Sheets XLOOKUP not working/);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/google-sheets-xlookup-not-working\//);
  assert.doesNotMatch(page, /upload|workbook audit|diagnoses your workbook|guarantee|guaranteed|always fixes|official Google|Google partner|affiliated|PDF|same-day|human reviewer|data never leaves|instant|in seconds|pay before answer|working version/i);
});

test('google sheets QUERY not working page targets query repair intent without overclaiming', () => {
  const page = read('google-sheets-query-not-working/index.html');
  const homepage = read('index.html');
  const sitemap = read('sitemap.xml');

  assert.match(page, /Google Sheets QUERY Not Working/);
  assert.match(page, /Fix a broken Google Sheets QUERY formula/);
  assert.match(page, /Unable to parse query string for Function QUERY parameter 2/);
  assert.match(page, /PARSE_ERROR, or a NO_COLUMN \/ Col reference message/);
  assert.match(page, /array-style inputs/);
  assert.match(page, /mixed data types that turn some values into nulls/);
  assert.match(page, /=QUERY\(A1:D500,&quot;select A, D where B = 'Open' and C = 'West' and D &gt; 5000&quot;,1\)/);
  assert.match(page, /Keep the query text inside double quotes/);
  assert.match(page, /Set the header-row argument deliberately/);
  assert.match(page, /Use it past the guest limit/);
  assert.match(page, new RegExp(`data-checkout href="${checkoutUrl}"`));
  assert.match(homepage, /href="\/google-sheets-query-not-working\/">Google Sheets QUERY not working/);
  assert.match(sitemap, /https:\/\/writemyformula\.com\/google-sheets-query-not-working\//);
  assert.doesNotMatch(page, /upload|workbook audit|diagnoses your workbook|guarantee|guaranteed|always fixes|official Google|Google partner|affiliated|PDF|same-day|human reviewer|data never leaves|instant|in seconds|pay before answer/i);
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
