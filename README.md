# Write My Formula

Static app for spreadsheet formula generation, explanation, and fixing.

## Commands

- `npm test`: run static content and formula helper tests.
- `python3 -m http.server 4173`: serve locally for browser checks.

## Deployment

Production deploys are connected through Vercel from `the-shepherd-stack/sheetpilot-workbench` on the `main` branch.

## Upgrade Path

The upgrade link is configured through `app/config.js`.

## Email Capture

Free account signups post to `api/waitlist.js`, which creates or updates a Resend Contact. Configure `RESEND_API_KEY` in Vercel before deploying the signup flow to production.

Analytics events post to `api/track.js` and are written to Vercel runtime logs. See `ANALYTICS.md` for the event taxonomy and log queries.

## Search Submission

IndexNow key file: `8e6a0b9c4d2f41a7b5c3e8d9f0a1b2c6.txt`.

## Public Pages

- `https://writemyformula.com/ai-excel-formula-generator/`
- `https://writemyformula.com/ai-google-sheets-formula-generator/`
- `https://writemyformula.com/gptexcel-alternative/`
- `https://writemyformula.com/ajelix-alternative/`
- `https://writemyformula.com/excel-if-formula-multiple-conditions/`
- `https://writemyformula.com/excel-formulas-not-working/`
- `https://writemyformula.com/vlookup-na-error/`

## Outreach Ledger

- 2026-06-08: ExcelPal corrected sender email bounced with Gmail DSN `19ea42d18a270ffd` / `550 No Such User Here` for `hi@excelpal.com`, so the ExcelPal thread is not a live pending prospect. Sent one recovery first-touch to ExcelHelp at `consulting@excelhelp.com` from `Mara Ellis <mara@theshepherdstack.com>`; delegated Gmail id/thread `19ea508829f4c5ed`. Live research validated ExcelHelp as an Excel consulting/training company with custom Excel solutions, automation, AI integration, workforce training, on-demand support, and a public `consulting@excelhelp.com` address from its promo PDF/search surface. Wait until `2026-06-11 02:20 UTC` before another consulting/support-service prospect unless ExcelHelp, GetSpreadsheet, Easy Excel Answers, SpreadsheetClass, Excelerate Solutions, Excel Spreadsheet Service, or another active consulting/support-service prospect replies.
- 2026-06-07: ExcelPal first-touch/corrective sender email sent to `hi@excelpal.com`. Live research validated ExcelPal as a training/resource prospect with public contact `hi@excelpal.com`, Excel templates, course, articles, and free Excel tips/newsletter. A Gmail connector send first returned id/thread `19ea42bb098debe2` but used default sender `Travis Buerky <tbuerky@gmail.com>` rather than Mara; corrected immediately with one delegated no-attachment email from `Mara Ellis <mara@theshepherdstack.com>`, Gmail id/thread `19ea42d0843676cb`. Do not use the Gmail connector for Mara outbound. Wait until `2026-06-10 22:37 UTC` before another training/resource prospect unless ExcelPal, Excel University, TrumpExcel, Excel Campus, ProfessionalsExcel, Learn Excel Now, or another active training/resource prospect replies.
- 2026-06-07: Excel Spreadsheet Service replied negatively in Gmail id `19e947516b7424cd`: Write My Formula felt like "looking for a needle in a haystack," Paul rarely needs formula help personally, and he expects users who need constant formula help to seek human help. Sent one short no-pitch thank-you reply from `Mara Ellis <mara@theshepherdstack.com>` to `pdeaton@excelspreadsheetservice.com`; delegated Gmail id `19ea2e37cc52cd05`. The 2026-06-04 consulting/support wait has cleared, but prioritize product learning from this signal before another generic consultant gut-check.
- 2026-06-07: Sheetemplate first-touch sent to `support@sheetemplate.com` from `Mara Ellis <mara@theshepherdstack.com>`; delegated Gmail message id/thread id `19ea12b3a3d89419`. Live research validated Sheetemplate as a Google Sheets and Excel template vendor for small business owners with editable templates and a public support route for file/technical issues. Wait until `2026-06-10 08:17 UTC` before another marketplace/app-template prospect unless Sheetemplate, Indzara, Someka, XLworks, Vertex42, ExcelSheetsPro, or another active marketplace/app-template prospect replies.
- 2026-06-04: Excel Spreadsheet Service first-touch sent to `PDeaton@ExcelSpreadsheetService.com` from `Mara Ellis <mara@theshepherdstack.com>`; delegated Gmail message id/thread id `19e936fefd097472`. Live research validated Excel Spreadsheet Service as an Excel consulting/support-service prospect with public email, free consultation, large/small project positioning, and formula-corruption repair fit. Wait until `2026-06-07 16:20 UTC` before another consulting/support-service prospect unless GetSpreadsheet, Easy Excel Answers, SpreadsheetClass, Excelerate Solutions, or Excel Spreadsheet Service replies.
- 2026-06-03: Vertex42 first-touch sent to `nex2us@vertex42.com` from `Mara Ellis <mara@theshepherdstack.com>`; delegated Gmail message id/thread id `19e8cffc0e9e699b`. Live research validated Vertex42 as a long-running Excel/Google Sheets template publisher with template-customization fit.
- 2026-06-03: ExcelSheetsPro first-touch sent to `Info@ExcelSheetsPro.com` from `Mara Ellis <mara@theshepherdstack.com>`; delegated Gmail message id/thread id `19e8c91ae53f65bf`. Live research validated its Excel/Google Sheets template bundle, 5,000+ template claim, business/finance/project/HR/payroll/sales/inventory/CRM categories, editable-template positioning, and public support email.
- 2026-06-03: Indzara first-touch sent to `support@indzara.com` from `Mara Ellis <mara@theshepherdstack.com>`; delegated Gmail message id/thread id `19e8c244b220a144`. Live research validated Indzara as an Excel/Google Sheets/Power BI template vendor with 150+ templates, 1.5M+ downloads, 13,000+ premium customers, support/tutorials, and feedback email `support@indzara.com`. Wait until `2026-06-06 06:20 UTC` before another marketplace/app-template prospect unless Indzara, Someka, XLworks, or another active marketplace/app-template prospect replies.
- 2026-06-03: Someka replied with requested reciprocal link target. Added durable Someka Google Sheets templates link generation on `https://writemyformula.com/ai-google-sheets-formula-generator/`, deployed to production via Vercel deployment `dpl_ALzAZYYZCiSmf1buy6KNChQpNLGK`, and verified the live page contains the link. Reply was already sent in thread `19e643b23e96f337`.
- 2026-06-02: Ablebits recontact sent to `support@ablebits.com` from `Mara Ellis <mara@theshepherdstack.com>`; delegated Gmail message id/thread id `19e87d9509aba184`. Correction: project state shows Ablebits had already been contacted on 2026-05-23 in older thread `19e567ef5f67bb60`, so do not contact Ablebits again unless they reply. Wait until `2026-06-05 10:19 UTC` before another spreadsheet add-in vendor prospect unless FormulaDesk, FormulaBoost, RefTreeAnalyser, Ablebits, or another active add-in-vendor prospect replies.
- 2026-06-02: Excel University first-touch sent to `support@excelu.com` from `Mara Ellis <mara@theshepherdstack.com>`; delegated Gmail message id/thread id `19e876d433106f01`; wait until `2026-06-05 08:22 UTC` before another Write My Formula training/resource prospect unless Excel University or another active training/resource prospect replies.
- 2026-06-01: Excelerate Solutions first-touch sent to `ELISHA@EXCELERATESOLUTIONS.NET`; Gmail message id/thread id `19e83fcc753db84f`; wait until `2026-06-04 16:20 UTC` before another Excel consulting/support-service prospect unless GetSpreadsheet, Easy Excel Answers, SpreadsheetClass, or Excelerate Solutions replies.
- 2026-06-01: TrumpExcel first-touch sent to `sumitbansal@trumpexcel.com`; Gmail message id/thread id `19e82b34a5e9f830`; wait until `2026-06-04 10:24 UTC` before another training/resource prospect unless Learn Excel Now, Excel Campus, ProfessionalsExcel, or TrumpExcel replies.
- 2026-05-30: RefTreeAnalyser first-touch sent to `info@jkp-ads.com`; Gmail message id/thread id `19e7af9505e85905`; wait until `2026-06-02 22:20 UTC` before another spreadsheet add-in vendor prospect unless Ablebits, FormulaDesk, FormulaBoost, or RefTreeAnalyser replies.
- 2026-05-29: SpreadsheetClass first-touch sent to `corey.spreadsheetclass@gmail.com`; Gmail message id/thread id `19e7489a7f6fa8dd`; wait until `2026-06-01 16:20 UTC` before another Excel consulting/support-service prospect unless GetSpreadsheet, Easy Excel Answers, or SpreadsheetClass replies.
- 2026-05-29: ProfessionalsExcel first-touch sent to `ask@davidringstrom.com`; Gmail message id/thread id `19e733fa8bda27d7`; wait until `2026-06-01 10:20 UTC` before another training/resource prospect unless Learn Excel Now, Excel Campus, or ProfessionalsExcel replies.
- 2026-05-27: FormulaBoost replied no to the neutral-link ask; Gmail message id `19e6b20edd5c20d2`; do not re-contact FormulaBoost unless they ask for more information or Write My Formula has materially stronger proof.
- 2026-05-27: FormulaDesk first-touch sent to `support@formuladesk.com`; Gmail message id/thread id `19e6b86788944dd4`; wait until `2026-05-30 22:20 UTC` before another spreadsheet add-in vendor prospect unless Ablebits or FormulaDesk replies.
- 2026-05-26: FormulaBoost first-touch sent to `support@formulaboost.com`; Gmail message id/thread id `19e65f224f9ce9a0`; wait until `2026-05-29 20:19 UTC` before another spreadsheet add-in vendor prospect unless Ablebits or FormulaBoost replies.
- 2026-05-26: Easy Excel Answers first-touch sent to `easyexcelanswers@gmail.com`; Gmail message id/thread id `19e65165bb2121e1`; wait until `2026-05-29 16:20 UTC` before another Excel consulting/support-service prospect unless GetSpreadsheet or Easy Excel Answers replies.
- 2026-05-26: Excel Campus first-touch sent to `jon@excelcampus.com`; Gmail message id/thread id `19e63caa70f1ea7e`; wait until `2026-05-29 10:18 UTC` before another training/resource prospect unless Learn Excel Now or Excel Campus replies.
- 2026-05-26: Someka first-touch sent to `contact@someka.net`; Gmail message id/thread id `19e643b23e96f337`; wait until `2026-05-29 12:20 UTC` before another marketplace/app-template prospect unless XLworks or Someka replies.
- 2026-05-26: Someka replied positively about a link exchange; follow-up sent in thread `19e643b23e96f337` with Gmail id `19e650f5d90d4d83`. Wait for their requested URL/anchor and placement page before adding any reciprocal link.
