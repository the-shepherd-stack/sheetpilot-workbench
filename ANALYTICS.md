# Write My Formula analytics

Write My Formula uses first-party analytics events written to Vercel runtime logs. No external analytics account is required.

## Where to look

Recent production logs:

```bash
cd workspace/sheetpilot-workbench
vercel logs --environment production --since 24h --json --no-follow
```

Filter for client analytics:

```bash
vercel logs --environment production --since 24h --query wmf_analytics --json --no-follow
```

Filter for formula API runs:

```bash
vercel logs --environment production --since 24h --query wmf_formula --json --no-follow
```

Filter for waitlist submissions:

```bash
vercel logs --environment production --since 24h --query wmf_waitlist --json --no-follow
```

One-command funnel summary:

```bash
npm run analytics:summary -- --since=24h
```

## Client events

- `page_view`: page loaded; includes page path, page slug, UTM source/campaign, and whether the page has an SEO preset.
- `paid_return`: user arrived with `?paid=1`.
- `paid_success_page_view`: Stripe redirected a buyer to `/thanks`.
- `paid_continue_click`: buyer clicked from `/thanks` back to the workbench.
- `mode_select`: Write, Explain, or Fix selected.
- `platform_select`: Excel or Google Sheets selected.
- `example_click`: example prompt selected.
- `formula_submit`: user submitted a formula request.
- `formula_success`: formula request completed with the API or local result.
- `formula_fallback`: formula request completed with fallback output.
- `formula_blocked`: user hit a validation or trial-limit block.
- `paywall_view`: usage wall shown.
- `copy_click`: formula copied.
- `copy_upgrade_view`: after-copy upgrade prompt shown.
- `checkout_click`: upgrade link clicked; includes placement such as `nav`, `run_row`, `paywall`, `copy_upgrade`, `result_upgrade`, or `pricing`.
- `signup_submit`: free account email form submitted.
- `signup_success`: email saved by the waitlist endpoint.
- `signup_error`: email save failed.

## Server events

Formula endpoint logs `wmf_formula` events for:

- `completed`: formula API returned a result; includes `source` as `openai` or `fallback`.
- `rate_limited`: request blocked by hourly IP rate limit.
- `too_large`: request exceeded the input-size limit.

Waitlist endpoint logs `wmf_waitlist` events for:

- `created`: new contact created.
- `updated`: existing contact updated.
- `invalid_email`: email validation failed.
- `missing_config`: Resend key missing.
- `rejected`: Resend rejected the request.

## Privacy notes

Analytics events intentionally avoid pasted spreadsheet text, generated formulas, and email addresses. Formula API logs include metadata such as mode, platform, input length, and whether table/hint/formula fields were present.
