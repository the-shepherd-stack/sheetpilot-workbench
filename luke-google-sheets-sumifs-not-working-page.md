Here's Luke's full return:

---

## Diagnosis

> The risk on a page like this is the default SEO playbook: a 1,200-word "Ultimate Guide to SUMIFS Errors" that buries the tool under a tutorial the reader did not ask for — they already know SUMIFS is broken, they want the next move in under five seconds.

---

## Revised copy (ready to paste)

**Title tag:** SUMIFS Not Working? Paste the Formula, Get a Fix — Write My Formula

**H1:** Your SUMIFS is broken. Paste it.

**Lede:** SUMIFS fails quietly. It returns 0, throws #VALUE!, or hands you a total that is almost right and therefore worse than wrong. Paste the formula and say what it was supposed to do — you get back a corrected formula and a plain explanation of what went sideways.

**Intent line:** Write My Formula reads one Google Sheets formula plus your description of the intent, and returns a corrected formula with an explanation.

**Best for:**
- A SUMIFS that returns 0, #VALUE!, or a total you know is wrong
- A formula you have already rewritten twice and still cannot trust

**Steps:**
1. Paste your broken SUMIFS into the box.
2. In one line, say what it should do. Example: "Sum column D where column B is 'Acme' and column A is in March 2026."
3. Press Fix. You get a corrected formula and an explanation of what was wrong.

**Copy checks (what the tool looks for):**
- Range sizes that do not match across `sum_range` and each `criteria_range`
- Dates or numbers stored as text, so criteria never match
- Comma vs semicolon separators that break in your locale
- Hidden leading or trailing spaces in criteria values
- Argument order — Google expects `SUMIFS(sum_range, criteria_range1, criterion1, ...)`, not the SUMIF order
- Blank rows inside a criteria range that drag the result to 0

**What it gives you:**
- A corrected formula you can paste straight into the cell
- A short explanation of the specific failure — range mismatch, text-stored dates, separator, spacing, order
- A second variant when the fix depends on whether your dates are real dates or text

**Use it when:** You have the formula and a one-line description of what it should return. You want a fix in the next minute, not a tutorial.

**Do not use it when:** You need someone to look at your workbook (the tool never sees your sheet). You need a guarantee the result is right for your data — always sanity-check against a known row.

**Example:**

You paste:
```
=SUMIFS(D2:D500, B2:B501, "Acme", A2:A500, ">="&DATE(2026,3,1), A2:A500, "<="&DATE(2026,3,31))
```
You write: "Sum March 2026 revenue for Acme."

You get back:
```
=SUMIFS(D2:D500, B2:B500, "Acme", A2:A500, ">="&DATE(2026,3,1), A2:A500, "<="&DATE(2026,3,31))
```
*What was wrong: `B2:B501` is 500 rows but the other ranges are 499. Fixed by trimming to `B2:B500`. If column A dates are stored as text, the comparison will still fail — convert with `DATEVALUE` or reformat the column.*

**Founding access line:** Founding access is $9/month for 500 runs in this browser. No account, no upload, no waiting on a human. Keep pasting until the sheet adds up.

**CTA button:** Fix my SUMIFS

---

## What changed and why

- **Led with the reader's state, not the product name** — "Your SUMIFS is broken. Paste it." matches the sentence already in their head.
- **Killed the tutorial impulse** — no "What is SUMIFS?" section; a guide-shaped page loses to a tool-shaped page mid-frustration.
- **Made the promise falsifiable** — "corrected formula and plain explanation" is checkable in thirty seconds.
- **Used real failure modes as the trust signal** — listing six specific things the tool checks is more persuasive than any adjective; a reader recognizes their own bug and stops shopping.
- **Concrete worked example with a real bug** (off-by-one range size, the most common silent killer) — one worked example beats a paragraph of capability claims.
- **All product constraints respected** — no upload, no human, no PDF, no "instant," no privacy claim, no correctness guarantee; the "Do not use it when" block explicitly disclaims both, which paradoxically raises trust.

---

## Evidence gaps before publishing

1. **"500 runs in this browser"** — confirm metering is per-browser (localStorage/cookie), not per-account; the copy promises browser-scoped, which the build must honor.
2. **Guest try volume** — copy says "guest tries" plural without a number; if guests get exactly one try, the flow copy needs to reflect that.
3. **Date-range example output** — verify the live tool produces a `DATEVALUE` follow-up suggestion when dates are text-stored; if not, trim that sentence from the example.
4. **Locale separator claim** — confirmed in Sheets behavior, but make sure the tool actually detects and rewrites for locale, or drop that bullet from Copy checks.
5. **"No account" in the founding-access line** — confirm $9/month truly requires no login before shipping, or rewrite to "one-step checkout, no workbook upload."
