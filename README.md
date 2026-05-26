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
- `https://writemyformula.com/excel-if-formula-multiple-conditions/`
- `https://writemyformula.com/excel-formulas-not-working/`
- `https://writemyformula.com/vlookup-na-error/`

## Outreach Ledger

- 2026-05-26: Excel Campus first-touch sent to `jon@excelcampus.com`; Gmail message id/thread id `19e63caa70f1ea7e`; wait until `2026-05-29 10:18 UTC` before another training/resource prospect unless Learn Excel Now or Excel Campus replies.
- 2026-05-26: Someka first-touch sent to `contact@someka.net`; Gmail message id/thread id `19e643b23e96f337`; wait until `2026-05-29 12:20 UTC` before another marketplace/app-template prospect unless XLworks or Someka replies.
