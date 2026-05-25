# Write My Formula

Static app for spreadsheet formula generation, explanation, and fixing.

## Commands

- `npm test`: run static content and formula helper tests.
- `python3 -m http.server 4173`: serve locally for browser checks.

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
- `https://writemyformula.com/vlookup-na-error/`
