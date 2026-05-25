# Write My Formula Google Ads broadening packet - 2026-05-24

## Context

Owner directive received 2026-05-24: broaden campaign `WMF - Formula Specific Search - $15 Test` (`23861003751`) in Google Ads account `534-805-0350`.

Observed account state from the owner-provided read:

- Date range visible in Google Ads: `2026-04-25` through `2026-05-23`.
- Campaign enabled, Search network, United States, `$10/day`, Maximize clicks, bid strategy learning.
- Totals: `16` impressions, `0` clicks, `$0.00` spend, `0` conversions.
- Impression movement: `9` to `16`; still no clicks or spend.
- Many exact/phrase formula-generator keywords are marked `Not eligible: Low search volume`.
- Current impression concentration is in pain/problem terms:
  - `fix my excel formula` phrase: `8` impressions.
  - `formula for conditional formatting` phrase: `5` impressions.
  - `conditional formatting custom formula` phrase: `1` impression.
  - `excel data validation formula` exact/phrase: `1` each.

## Operator decision

Do not change budget, CPC cap, bidding strategy, location, networks, or conversion setup in this pass.

The first broadening move should add tightly grouped phrase and broad keywords around the live pain terms, while preserving the existing search-only, bounded-spend structure. This follows Google's current guidance that low-search-volume keywords can be addressed by using less specific terms or broader match types, and that broad match reaches related searches beyond phrase/exact.

## Files to apply

- `workspace/sheetpilot-workbench/ads/google-ads-editor-keywords-2026-05-24.csv`
- `workspace/sheetpilot-workbench/ads/google-ads-editor-rsa-2026-05-24.csv`
- `workspace/sheetpilot-workbench/ads/google-ads-editor-negative-keywords-2026-05-24.csv`

These are built for manual Google Ads Editor import or manual UI entry. This repo does not contain a Google Ads API client or account automation path, so no live Google Ads change was applied from the box.

## Add these keyword groups

### Existing ad group: AG08 - Formula Fixer

Final URL:

`https://writemyformula.com/excel-formula-fixer/?utm_source=google_ads&utm_campaign=formula_specific_test&utm_content=formula_fixer_broadened`

Add phrase and broad variants for:

- fix my excel formula
- fix excel formula
- excel formula not working
- formula not working in excel
- excel formula error
- excel formula not calculating
- excel formula not showing result
- fix google sheets formula
- google sheets formula not working
- spreadsheet formula help

Rationale: this is the only currently live cluster with visible impression volume. It should get most of the broadened coverage.

### Existing ad group: AG06 - Conditional Formatting

Final URL:

`https://writemyformula.com/conditional-formatting-formula-generator/?utm_source=google_ads&utm_campaign=formula_specific_test&utm_content=conditional_formatting_broadened`

Add phrase and broad variants for:

- formula for conditional formatting
- conditional formatting formula
- custom formula conditional formatting
- excel conditional formatting formula
- google sheets conditional formatting formula
- google sheets custom formula conditional formatting

Rationale: owner-provided search-term evidence shows this cluster is already eligible to serve.

### Existing ad group: AG07 - Data Validation

Final URL:

`https://writemyformula.com/data-validation-formula-generator/?utm_source=google_ads&utm_campaign=formula_specific_test&utm_content=data_validation_broadened`

Add phrase and broad variants for:

- excel data validation formula
- data validation formula
- custom data validation formula
- google sheets data validation formula
- data validation custom formula

Rationale: this term has already produced exact/phrase impressions and the landing page is live.

### New ad group: AG09 - Excel Formula Help

Final URL:

`https://writemyformula.com/excel-formula-generator/?utm_source=google_ads&utm_campaign=formula_specific_test&utm_content=excel_formula_help`

Add phrase and broad variants for:

- excel formula help
- help with excel formula
- write excel formula
- create excel formula
- excel formula generator
- excel formula from text

Rationale: catches help-intent users when their pain is not a named function yet.

### New ad group: AG10 - Google Sheets Formula Help

Final URL:

`https://writemyformula.com/google-sheets-formula-generator/?utm_source=google_ads&utm_campaign=formula_specific_test&utm_content=sheets_formula_help`

Add phrase and broad variants for:

- google sheets formula help
- help with google sheets formula
- fix google sheets formula
- write google sheets formula
- google sheets formula generator
- google sheets formula from text

Rationale: separates Sheets help from Excel help so search terms and funnel events stay interpretable.

## Negatives to add with the broadened test

The existing negative list already blocks templates, downloads, courses, jobs, PDFs, VBA/macros, Python, SQL, Power BI, and Power Query. Add the new negatives in `google-ads-editor-negative-keywords-2026-05-24.csv` to control broad-match drift:

- homework
- answer key
- examples
- practice
- quiz
- test
- certification
- interview
- how to learn
- beginner tutorial
- free template
- salary

## Manual QA before applying

- Confirm Search campaign only.
- Confirm Search partners off.
- Confirm Display Network off.
- Confirm broad match campaign setting is not forcing every keyword broad-only.
- Confirm budget remains unchanged from current live owner state.
- Confirm Maximize clicks bid cap remains unchanged from current live owner state.
- Confirm new ad groups have one responsive search ad each.
- Confirm final URLs return HTTP 200.
- Confirm every final URL includes `utm_source=google_ads`.

## Review rule after applying

Check Google Ads search terms and first-party funnel within 24 hours.

Run:

```bash
cd workspace/sheetpilot-workbench
npm run analytics:summary -- --since=24h
```

Decision rule:

- Keep running if broadening creates relevant impressions and at least one real `formula_submit`, `signup_success`, `checkout_click`, or paid Stripe session.
- Add negatives immediately if broad match starts pulling template, tutorial, course, homework, job, PDF, or programming-language traffic.
- Stop or roll back the broad keywords if spend occurs without relevant search terms or first-party formula events.
- Do not raise budget or loosen bid cap until there is search-term evidence worth buying more of.

## Live checks from this run

At `2026-05-24 06:18 UTC`, these pages returned HTTP `200`:

- `https://writemyformula.com/excel-formula-fixer/`
- `https://writemyformula.com/excel-formula-generator/`
- `https://writemyformula.com/google-sheets-formula-generator/`
- `https://writemyformula.com/conditional-formatting-formula-generator/`
- `https://writemyformula.com/data-validation-formula-generator/`
- `https://writemyformula.com/excel-formula-not-showing-result/`
- `https://writemyformula.com/google-sheets-conditional-format-custom-formula/`

First-party 24h summary at the same run still showed `0` sessions, `0` analytics events, `0` formula events, `0` waitlist events, `0` paid-success views, and `0` paid Stripe sessions. Recent live Stripe sessions remain unpaid/expired.

## Sources

- Google Ads Help, keyword matching options: `https://support.google.com/google-ads/answer/7478529`
- Google Ads Help, low search volume keyword status: `https://support.google.com/google-ads/answer/2616014`
- Google Ads API keyword match type enum: `https://developers.google.com/google-ads/api/reference/rpc/v22/KeywordMatchTypeEnum.KeywordMatchType`
