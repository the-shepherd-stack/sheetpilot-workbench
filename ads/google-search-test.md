# Write My Formula Google Ads Search campaign spec

Status: live campaign spec plus setup record. On 2026-05-24, Travis directed broadening because the enabled campaign was inventory/query-limited (`16` impressions, `0` clicks, `$0.00` spend). The import-ready broadening packet is in `workspace/sheetpilot-workbench/ads/google-search-broadening-2026-05-24.md`.

This is the campaign I would actually test. It is deliberately narrow and maps paid clicks to the SEO pages already built, instead of sending generic traffic to the homepage.

## Why this structure

Google Ads will keep trying to broaden targeting and complain about "Ad strength." Ignore that pressure for this test. We are not trying to maximize impressions; we are trying to buy a small number of high-intent clicks where the landing page exactly matches the query.

Use a **standard Search campaign only**. Do not use Performance Max, Demand Gen, Display, Search partners, broad match, auto-created assets, or auto-applied recommendations.

## Hard limits

- Campaign name: `WMF - Formula Specific Search - $15 Test`
- Total budget cap: `$15`
- Daily budget: `$5/day`
- Runtime: stop after `$15` spend or `30` clicks, whichever comes first
- Locations: United States only
- Language: English
- Networks: Google Search only
- Search partners: off
- Display Network: off
- Bidding: clicks, with a max CPC bid limit if the UI allows it
- Max CPC: `$1.25`
- Final URL suffix: leave blank; put UTM parameters directly in each final URL below

If Google forces an automated bidding choice, use `Maximize clicks` only if a max CPC limit can be set. If it will not allow a bid cap, do not launch.

## Tracking before launch

Confirm these work before enabling the campaign:

```bash
cd workspace/sheetpilot-workbench
npm run analytics:summary -- --since=24h
```

Confirm the live checkout redirect path:

- Stripe Payment Link: `https://buy.stripe.com/5kQ5kw94pfXy3ziajM4F208`
- Stripe redirect destination: `https://writemyformula.com/thanks`
- `/thanks` logs `paid_success_page_view`
- `/thanks` "Open workbench" logs `paid_continue_click`

Primary success signal for this `$15` test is not Google Ads' conversion column. Use our first-party summary:

- Useful session: `page_view` plus `formula_submit`
- Strong session: `formula_success` plus `copy_click`
- Buying intent: `checkout_click`
- Paid completion: Stripe paid session plus `paid_success_page_view`

## Campaign settings checklist

In Google Ads, create:

1. New campaign
2. Objective: `Website traffic` or `Create a campaign without a goal's guidance`
3. Campaign type: `Search`
4. Website: `https://writemyformula.com`
5. Bidding: `Clicks`
6. Set maximum CPC bid limit: `$1.25`
7. Budget: `$5/day`
8. Networks:
   - Search Network: on
   - Include Google Search partners: off
   - Display Network: off
9. Locations: United States
10. Languages: English
11. Automatically created assets: off
12. Broad match campaign setting: off
13. Auto-apply recommendations: off

UI callouts to watch for:

- If Google suggests Performance Max, choose Search instead.
- If Google suggests broad match, decline.
- If Google says "limited by budget," ignore it during this test.
- If Google says "poor ad strength" because keywords are repeated in headlines, ignore unless the ad is disapproved.
- If Google suggests raising budget, decline.

## Campaign-level negative keywords

Add these as negative broad match unless noted. Google negative broad means all negative terms must be present somewhere in the search, so include singular/plural variants where needed.

```text
template
templates
download
free download
pdf
course
courses
class
classes
training
tutorial
tutorials
lesson
lessons
job
jobs
salary
interview
certification
certificate
reddit
youtube
vba
macro
macros
python
sql
power bi
power query
excel file
spreadsheet template
invoice template
budget template
calendar template
timesheet template
```

Add these as negative phrase match:

```text
"free excel template"
"excel formula list"
"excel formula cheat sheet pdf"
"excel formulas pdf"
"download excel"
"excel course"
"excel training"
"excel jobs"
```

Rationale: we are not buying tutorial, template, job, or PDF traffic. We only want someone actively trying to create/fix a formula.

## Ad groups

Create exactly these ad groups. Use only exact and phrase match. Do not add broad match.

### AG01 - SUMIFS

Landing page:

`https://writemyformula.com/sumifs-formula-generator/?utm_source=google_ads&utm_campaign=formula_specific_test&utm_content=sumifs`

Keywords:

```text
[sumifs formula generator]
"sumifs formula generator"
[excel sumifs formula generator]
"excel sumifs formula generator"
[sumifs generator]
"sumifs generator"
[create sumifs formula]
"create sumifs formula"
```

Responsive search ad:

Headlines:

```text
SUMIFS Formula Generator
Build SUMIFS Fast
Excel SUMIFS Help
Write SUMIFS From Text
Create SUMIFS Formula
SUMIFS For Real Sheets
Fix SUMIFS Criteria
No Syntax Wrestling
Paste Your Sheet Context
Copy A Clean Formula
Try 2 Formulas Free
$9 Founding Access
Excel And Sheets
Formula Help Now
Write My Formula
```

Descriptions:

```text
Describe the SUMIFS job and get a formula with criteria notes before pasting.
Built for messy spreadsheet work: dates, statuses, customers, regions, and amount columns.
Try 2 formulas free. Upgrade only if you need more formula runs this month.
Stripe redirects you back and unlocks 500 formula runs in this browser.
```

Display path:

```text
sumifs
generator
```

### AG02 - COUNTIFS

Landing page:

`https://writemyformula.com/countifs-formula-generator/?utm_source=google_ads&utm_campaign=formula_specific_test&utm_content=countifs`

Keywords:

```text
[countifs formula generator]
"countifs formula generator"
[excel countifs formula generator]
"excel countifs formula generator"
[countifs generator]
"countifs generator"
[create countifs formula]
"create countifs formula"
```

Responsive search ad:

Headlines:

```text
COUNTIFS Formula Help
COUNTIFS Generator
Build COUNTIFS Fast
Count Rows By Criteria
Excel COUNTIFS Help
Write COUNTIFS From Text
Fix COUNTIFS Criteria
No Syntax Wrestling
Paste Your Sheet Context
Copy A Clean Formula
Try 2 Formulas Free
$9 Founding Access
Excel And Sheets
Formula Help Now
Write My Formula
```

Descriptions:

```text
Turn plain English criteria into a COUNTIFS formula for Excel or Google Sheets.
Use it for statuses, dates, regions, categories, missing fields, and multi-rule counts.
Try 2 formulas free. Upgrade only if you need more formula runs this month.
Stripe redirects you back and unlocks 500 formula runs in this browser.
```

Display path:

```text
countifs
generator
```

### AG03 - XLOOKUP

Landing page:

`https://writemyformula.com/xlookup-formula-generator/?utm_source=google_ads&utm_campaign=formula_specific_test&utm_content=xlookup`

Keywords:

```text
[xlookup formula generator]
"xlookup formula generator"
[excel xlookup formula generator]
"excel xlookup formula generator"
[xlookup generator]
"xlookup generator"
[create xlookup formula]
"create xlookup formula"
[xlookup not found formula]
"xlookup not found formula"
```

Responsive search ad:

Headlines:

```text
XLOOKUP Formula Help
XLOOKUP Generator
Build XLOOKUP Fast
Write XLOOKUP From Text
Fix XLOOKUP Errors
Excel XLOOKUP Help
Lookup Formula Builder
No Syntax Wrestling
Paste Your Sheet Context
Copy A Clean Formula
Try 2 Formulas Free
$9 Founding Access
Excel And Sheets
Formula Help Now
Write My Formula
```

Descriptions:

```text
Describe the lookup, lookup column, return column, and fallback. Get an XLOOKUP formula.
Useful for customer plans, prices, IDs, statuses, and missing-match fallback text.
Try 2 formulas free. Upgrade only if you need more formula runs this month.
Stripe redirects you back and unlocks 500 formula runs in this browser.
```

Display path:

```text
xlookup
generator
```

### AG04 - INDEX MATCH

Landing page:

`https://writemyformula.com/index-match-formula-generator/?utm_source=google_ads&utm_campaign=formula_specific_test&utm_content=index_match`

Keywords:

```text
[index match formula generator]
"index match formula generator"
[excel index match generator]
"excel index match generator"
[index match generator]
"index match generator"
[create index match formula]
"create index match formula"
```

Responsive search ad:

Headlines:

```text
INDEX MATCH Generator
INDEX MATCH Help
Build INDEX MATCH
Excel Lookup Formula
Left Lookup Formula
Two Way Lookup Help
Write Formula From Text
No Syntax Wrestling
Paste Your Sheet Context
Copy A Clean Formula
Try 2 Formulas Free
$9 Founding Access
Excel And Sheets
Formula Help Now
Write My Formula
```

Descriptions:

```text
Build INDEX MATCH formulas for left lookups, two-way lookups, and older Excel files.
Describe the lookup job and sheet context. Get a formula plus checks before pasting.
Try 2 formulas free. Upgrade only if you need more formula runs this month.
Stripe redirects you back and unlocks 500 formula runs in this browser.
```

Display path:

```text
index-match
generator
```

### AG05 - Google Sheets QUERY

Landing page:

`https://writemyformula.com/google-sheets-query-formula-generator/?utm_source=google_ads&utm_campaign=formula_specific_test&utm_content=sheets_query`

Keywords:

```text
[google sheets query formula generator]
"google sheets query formula generator"
[sheets query formula generator]
"sheets query formula generator"
[google sheets query generator]
"google sheets query generator"
[create query formula sheets]
"create query formula sheets"
```

Responsive search ad:

Headlines:

```text
Sheets QUERY Generator
Google Sheets QUERY
Build QUERY Formula
QUERY Formula Help
Select Where Order By
Group Data In Sheets
Write QUERY From Text
No Syntax Wrestling
Paste Your Sheet Context
Copy A Clean Formula
Try 2 Formulas Free
$9 Founding Access
Google Sheets Help
Formula Help Now
Write My Formula
```

Descriptions:

```text
Create Google Sheets QUERY formulas for select, where, order by, group by, and labels.
Describe the report you need. Get QUERY syntax with notes to check before pasting.
Try 2 formulas free. Upgrade only if you need more formula runs this month.
Stripe redirects you back and unlocks 500 formula runs in this browser.
```

Display path:

```text
sheets-query
generator
```

### AG06 - Conditional Formatting

Landing page:

`https://writemyformula.com/conditional-formatting-formula-generator/?utm_source=google_ads&utm_campaign=formula_specific_test&utm_content=conditional_formatting`

Keywords:

```text
[conditional formatting formula generator]
"conditional formatting formula generator"
[excel conditional formatting formula generator]
"excel conditional formatting formula generator"
[conditional formatting custom formula]
"conditional formatting custom formula"
[formula for conditional formatting]
"formula for conditional formatting"
```

Responsive search ad:

Headlines:

```text
Conditional Formula Help
Highlight Rows By Rule
Formatting Formula Help
Build Highlight Formula
Custom Rule Formula
Excel Formatting Help
Sheets Formatting Help
No Syntax Wrestling
Paste Your Sheet Context
Copy A Clean Formula
Try 2 Formulas Free
$9 Founding Access
Excel And Sheets
Formula Help Now
Write My Formula
```

Descriptions:

```text
Create TRUE/FALSE formulas for conditional formatting in Excel or Google Sheets.
Use it for overdue rows, missing values, duplicates, statuses, and threshold rules.
Try 2 formulas free. Upgrade only if you need more formula runs this month.
Stripe redirects you back and unlocks 500 formula runs in this browser.
```

Display path:

```text
formatting
formula
```

### AG07 - Data Validation

Landing page:

`https://writemyformula.com/data-validation-formula-generator/?utm_source=google_ads&utm_campaign=formula_specific_test&utm_content=data_validation`

Keywords:

```text
[data validation formula generator]
"data validation formula generator"
[excel data validation formula]
"excel data validation formula"
[custom data validation formula]
"custom data validation formula"
[data validation custom formula]
"data validation custom formula"
```

Responsive search ad:

Headlines:

```text
Data Validation Formula
Validation Formula Help
Custom Rule Formula
Block Bad Entries
Excel Validation Help
Sheets Validation Help
Build TRUE FALSE Rule
No Syntax Wrestling
Paste Your Sheet Context
Copy A Clean Formula
Try 2 Formulas Free
$9 Founding Access
Excel And Sheets
Formula Help Now
Write My Formula
```

Descriptions:

```text
Build custom TRUE/FALSE validation formulas for Excel or Google Sheets entry rules.
Use it to block duplicates, missing fields, invalid IDs, bad dates, and wrong statuses.
Try 2 formulas free. Upgrade only if you need more formula runs this month.
Stripe redirects you back and unlocks 500 formula runs in this browser.
```

Display path:

```text
validation
formula
```

### AG08 - Formula Fixer

Landing page:

`https://writemyformula.com/excel-formula-fixer/?utm_source=google_ads&utm_campaign=formula_specific_test&utm_content=formula_fixer`

Keywords:

```text
[excel formula fixer]
"excel formula fixer"
[fix excel formula]
"fix excel formula"
[fix my excel formula]
"fix my excel formula"
[excel formula error fixer]
"excel formula error fixer"
[fix google sheets formula]
"fix google sheets formula"
```

Responsive search ad:

Headlines:

```text
Fix Excel Formula
Formula Error Help
Fix My Formula
Excel Formula Fixer
Sheets Formula Fixer
Find Formula Mistakes
Readable Formula Fix
No Syntax Wrestling
Paste Your Formula
Copy A Clean Formula
Try 2 Formulas Free
$9 Founding Access
Excel And Sheets
Formula Help Now
Write My Formula
```

Descriptions:

```text
Paste a broken formula and get a readable fix with notes on likely syntax issues.
Useful for lookup errors, missing fallbacks, parentheses, criteria, and bad references.
Try 2 formulas free. Upgrade only if you need more formula runs this month.
Stripe redirects you back and unlocks 500 formula runs in this browser.
```

Display path:

```text
formula
fixer
```

## Sitelink assets

Add these at the campaign level. If the interface allows ad-group-specific sitelinks, use the same set but prioritize the current ad group's matching page first.

### Sitelink 1

Text:

```text
XLOOKUP Generator
```

URL:

```text
https://writemyformula.com/xlookup-formula-generator/?utm_source=google_ads&utm_campaign=formula_specific_test&utm_content=sitelink_xlookup
```

Description line 1:

```text
Build lookup formulas
```

Description line 2:

```text
Excel and Sheets help
```

### Sitelink 2

Text:

```text
SUMIFS Generator
```

URL:

```text
https://writemyformula.com/sumifs-formula-generator/?utm_source=google_ads&utm_campaign=formula_specific_test&utm_content=sitelink_sumifs
```

Description line 1:

```text
Create criteria formulas
```

Description line 2:

```text
Use pasted sheet context
```

### Sitelink 3

Text:

```text
Formula Fixer
```

URL:

```text
https://writemyformula.com/excel-formula-fixer/?utm_source=google_ads&utm_campaign=formula_specific_test&utm_content=sitelink_fixer
```

Description line 1:

```text
Paste a broken formula
```

Description line 2:

```text
Get a readable fix
```

### Sitelink 4

Text:

```text
Sheets QUERY Help
```

URL:

```text
https://writemyformula.com/google-sheets-query-formula-generator/?utm_source=google_ads&utm_campaign=formula_specific_test&utm_content=sitelink_query
```

Description line 1:

```text
Build QUERY formulas
```

Description line 2:

```text
Select, where, group
```

## Callout assets

Add these at campaign level:

```text
Try 2 formulas free
500 runs for $9
Excel and Sheets
No syntax wrestling
Immediate browser unlock
Paste sheet context
Copy clean formulas
Built for real sheets
```

## Structured snippet asset

Header:

```text
Types
```

Values:

```text
SUMIFS
COUNTIFS
XLOOKUP
INDEX MATCH
QUERY
Conditional Formatting
Data Validation
Formula Fixing
```

If `Types` is not available in the UI, skip structured snippets. Do not choose a misleading header just to satisfy Google.

## URL options and naming

Use these names exactly:

- Campaign: `WMF - Formula Specific Search - $15 Test`
- Ad groups:
  - `AG01 - SUMIFS`
  - `AG02 - COUNTIFS`
  - `AG03 - XLOOKUP`
  - `AG04 - INDEX MATCH`
  - `AG05 - Sheets QUERY`
  - `AG06 - Conditional Formatting`
  - `AG07 - Data Validation`
  - `AG08 - Formula Fixer`

Do not set a campaign-level final URL suffix. The landing URLs above already include UTM parameters. Avoid double-tagging.

## Launch QA

Before enabling:

- Every ad group has one responsive search ad.
- Every ad group has only exact and phrase keywords.
- No broad keywords are present.
- Search partners are off.
- Display Network is off.
- Auto-created assets are off.
- Auto-apply recommendations are off.
- Budget is `$5/day`.
- Bid cap is `$1.25`.
- Location is United States only.
- Language is English.
- Every final URL returns HTTP 200.
- Every final URL contains `utm_source=google_ads`.
- Negative keyword list is applied at campaign level.

## Daily review rules

Run this once per day while the test is active:

```bash
cd workspace/sheetpilot-workbench
npm run analytics:summary -- --since=24h
```

Also check Google Ads search terms daily. Add negatives immediately for:

- Templates
- Downloads
- Courses or learning-only searches
- Jobs or interview searches
- PDF/cheat-sheet-only searches
- VBA, macro, Python, SQL, Power BI, or Power Query searches
- Anything that clearly does not want a formula generator

## Stop rules

Stop immediately if:

- Spend reaches `$15`
- Clicks reach `30`
- Any ad group spends more than `$5` with zero `formula_submit`
- Search terms are mostly template/tutorial/job traffic
- Google forces broad match or removes the CPC cap

Continue only if at least one of these occurs before the cap:

- A real `checkout_click`
- A real `signup_success`
- Multiple non-smoke sessions with `formula_submit` and `formula_success`
- A paid Stripe session

## What not to do

- Do not run Performance Max.
- Do not run Display.
- Do not run Search partners.
- Do not use broad match.
- Do not add generic `excel formula` keywords.
- Do not send all traffic to the homepage.
- Do not raise the budget to satisfy Google recommendations.
- Do not optimize for Google "Ad strength" if doing so makes the targeting broader.
- Do not add competitor or brand keywords.

## Source notes

This setup follows current Google guidance that responsive search ads use up to 15 headlines and 4 descriptions, with 30-character headline and 90-character description limits. It also follows Google's own negative-keyword guidance: high-quality search targeting is partly choosing what not to target.
