import { ANONYMOUS_TRIAL_LIMIT, CHECKOUT_URL, FREE_ACCOUNT_WEEKLY_LIMIT, PRO_MONTHLY_LIMIT } from './config.js';
import { explainFormulaSteps, fixFormula, generateFormula, validateFormula } from './formula-engine.js';

const examples = {
  lookup: {
    mode: 'write',
    platform: 'excel',
    task: "Look up each customer's plan and return the matching monthly price.",
    table: 'Customer,Plan,Price\nAcme,Pro,29\nNorthwind,Team,79',
    range: 'A2:C100; result in D2',
    hint: 'XLOOKUP'
  },
  sumifs: {
    mode: 'write',
    platform: 'excel',
    task: 'Sum paid invoice amounts where the invoice date is in the current month.',
    table: 'Invoice Date,Status,Amount\n2026-05-04,Paid,1200\n2026-05-12,Open,850',
    range: 'A2:C500; result in F2',
    hint: 'SUMIFS'
  },
  domain: {
    mode: 'write',
    platform: 'sheets',
    task: 'Extract the domain from each customer email address.',
    table: 'Email,Customer\nalex@northwind.com,Northwind\nsam@acme.co,Acme',
    range: 'A2:A500; result in C2',
    hint: 'REGEXEXTRACT'
  },
  'explain-if': {
    mode: 'explain',
    platform: 'excel',
    formula: '=IF(A2="","Missing",IF(B2>1000,"Review","OK"))'
  },
  'fix-na': {
    mode: 'fix',
    platform: 'excel',
    formula: '=XLOOKUP(A2,Customers!A:A,Customers!C:C)'
  }
};

const state = {
  mode: 'write',
  platform: 'excel'
};

const pagePreset = window.WMF_PAGE_PRESET || null;
const params = new URLSearchParams(location.search);

const els = {
  form: document.querySelector('#tool-form'),
  modeButtons: document.querySelectorAll('[data-mode]'),
  platformButtons: document.querySelectorAll('[data-platform]'),
  exampleButtons: document.querySelectorAll('[data-example]'),
  task: document.querySelector('#task'),
  table: document.querySelector('#table'),
  range: document.querySelector('#range'),
  hint: document.querySelector('#hint'),
  formula: document.querySelector('#formula'),
  formulaLabel: document.querySelector('#formula-label'),
  run: document.querySelector('#run'),
  outputFormula: document.querySelector('#output-formula'),
  outputSteps: document.querySelector('#output-steps'),
  outputChecks: document.querySelector('#output-checks'),
  compatibilityNote: document.querySelector('#compatibility-note'),
  sheetPreview: document.querySelector('.sheet-preview'),
  usage: document.querySelector('#usage'),
  paywall: document.querySelector('#paywall'),
  paywallTitle: document.querySelector('#paywall-title'),
  paywallBody: document.querySelector('#paywall-body'),
  signupForm: document.querySelector('#signup-form'),
  signupEmail: document.querySelector('#signup-email'),
  signupNote: document.querySelector('#signup-note'),
  checkoutLinks: document.querySelectorAll('[data-checkout]'),
  copy: document.querySelector('#copy'),
  copyUpgrade: document.querySelector('#copy-upgrade')
};

const usageKey = 'write-my-formula-anonymous-trial-usage';
const sessionKey = 'write-my-formula-session-id';

function getSessionId() {
  let sessionId = sessionStorage.getItem(sessionKey);
  if (!sessionId) {
    sessionId = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    sessionStorage.setItem(sessionKey, sessionId);
  }
  return sessionId;
}

function pageName() {
  const path = location.pathname.replace(/^\/|\/$/g, '');
  return path || 'home';
}

function referrerHost() {
  if (!document.referrer) return '';
  try {
    return new URL(document.referrer).hostname;
  } catch {
    return '';
  }
}

function trackEvent(event, properties = {}) {
  if (navigator.doNotTrack === '1') return;

  const payload = {
    event,
    path: location.pathname,
    page: pageName(),
    sessionId: getSessionId(),
    referrerHost: referrerHost(),
    properties
  };

  const body = JSON.stringify(payload);

  if (navigator.sendBeacon) {
    const blob = new Blob([body], { type: 'application/json' });
    navigator.sendBeacon('/api/track', blob);
    return;
  }

  fetch('/api/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    keepalive: true
  }).catch(() => {});
}

function getUsage() {
  return Number(localStorage.getItem(usageKey) || '0');
}

function setUsage(value) {
  localStorage.setItem(usageKey, String(value));
  renderUsage();
}

function isPro() {
  return localStorage.getItem('write-my-formula-pro') === '1' || params.get('paid') === '1';
}

function renderUsage() {
  const used = getUsage();
  const triesLeft = Math.max(ANONYMOUS_TRIAL_LIMIT - used, 0);
  els.usage.textContent = isPro()
    ? `Founding access: up to ${PRO_MONTHLY_LIMIT} runs/month`
    : `${triesLeft} free ${triesLeft === 1 ? 'try' : 'tries'} left on this browser`;
}

function selectMode(mode) {
  const previousMode = state.mode;
  state.mode = mode;
  els.modeButtons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.mode === mode)));
  document.body.dataset.mode = mode;
  els.run.textContent = mode === 'write' ? 'Write the formula' : mode === 'explain' ? 'Explain this formula' : 'Fix this formula';
  if (els.formulaLabel) {
    els.formulaLabel.textContent = mode === 'fix' ? "Paste the formula that isn't working" : 'Paste the formula';
  }
  if (previousMode !== mode) trackEvent('mode_select', { mode });
}

function selectPlatform(platform) {
  const previousPlatform = state.platform;
  state.platform = platform;
  els.platformButtons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.platform === platform)));
  if (previousPlatform !== platform) trackEvent('platform_select', { platform });
}

function showPaywall(reason = 'trial_limit') {
  els.paywallTitle.textContent = 'Keep writing formulas today';
  els.paywallBody.textContent = `Guest mode includes ${ANONYMOUS_TRIAL_LIMIT} tries. Founding access is $9 for ${PRO_MONTHLY_LIMIT} runs per month in this browser.`;
  els.paywall.hidden = false;
  trackEvent('paywall_view', { reason, used: getUsage(), mode: state.mode, platform: state.platform });
  els.paywall.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function populateExample(key) {
  const example = examples[key];
  if (!example) return;

  trackEvent('example_click', { example: key, mode: example.mode, platform: example.platform });
  applyPreset(example);
  runTool({ consumeUsage: false, interaction: 'example' });
}

function applyPreset(example) {
  selectMode(example.mode);
  selectPlatform(example.platform);
  els.task.value = example.task || '';
  els.table.value = example.table || '';
  els.range.value = example.range || '';
  els.hint.value = example.hint || '';
  els.formula.value = example.formula || '';
}

async function runTool({ consumeUsage = true, interaction = 'manual' } = {}) {
  const shouldTrackRun = interaction !== 'initial';

  if (consumeUsage && !isPro() && getUsage() >= ANONYMOUS_TRIAL_LIMIT) {
    trackEvent('formula_blocked', { reason: 'trial_limit', mode: state.mode, platform: state.platform, used: getUsage() });
    showPaywall('trial_limit');
    return;
  }

  const task = els.task.value.trim();
  const formula = els.formula.value.trim();

  if (state.mode === 'write' && !task) {
    trackEvent('formula_blocked', { reason: 'missing_task', mode: state.mode, platform: state.platform });
    els.task.focus();
    return;
  }

  if (state.mode !== 'write' && !formula) {
    trackEvent('formula_blocked', { reason: 'missing_formula', mode: state.mode, platform: state.platform });
    els.formula.focus();
    return;
  }

  if (shouldTrackRun) {
    trackEvent('formula_submit', {
      mode: state.mode,
      platform: state.platform,
      interaction,
      isPro: isPro(),
      usedBefore: getUsage(),
      hasTable: Boolean(els.table.value.trim()),
      hasRange: Boolean(els.range.value.trim()),
      hasHint: Boolean(els.hint.value.trim()),
      pagePreset: Boolean(pagePreset)
    });
  }

  if (consumeUsage && !isPro()) {
    setUsage(getUsage() + 1);
  }

  els.run.disabled = true;
  const originalRunText = els.run.textContent;
  els.run.textContent = state.mode === 'write' ? 'Writing...' : state.mode === 'explain' ? 'Explaining...' : 'Fixing...';

  const result = await buildResult({ task, formula });
  renderResult(result);
  if (shouldTrackRun) {
    trackEvent(result.source === 'fallback' ? 'formula_fallback' : 'formula_success', {
      mode: state.mode,
      platform: state.platform,
      interaction,
      source: result.source || 'local',
      functionCount: Array.isArray(result.functionsUsed) ? result.functionsUsed.length : 0,
      checkCount: Array.isArray(result.checks) ? result.checks.length : 0
    });
  }
  els.run.textContent = originalRunText;
  els.run.disabled = false;
}

async function buildResult({ task, formula }) {
  const fallback = buildLocalResult({ task, formula });

  try {
    const response = await fetch('/api/formula', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mode: state.mode,
        platform: state.platform,
        task,
        table: els.table.value,
        range: els.range.value,
        hint: els.hint.value,
        formula
      })
    });

    if (!response.ok) return fallback;
    return await response.json();
  } catch {
    return fallback;
  }
}

function buildLocalResult({ task, formula }) {
  if (state.mode === 'write') {
    return generateFormula({
      task,
      platform: state.platform,
      rawTable: els.table.value,
      range: els.range.value,
      hint: els.hint.value
    });
  }

  if (state.mode === 'fix') {
    return fixFormula(formula);
  }

  const normalized = formula.startsWith('=') ? formula : `=${formula}`;
  return {
    formula: normalized,
    explanation: 'Explains the pasted formula in plain English.',
    compatibility: 'Explanation mode is syntax-only and works for Excel or Google Sheets formulas.',
    steps: explainFormulaSteps(normalized),
    checks: validateFormula(normalized)
  };
}

function renderResult(result) {
  els.outputFormula.textContent = result.formula;
  els.compatibilityNote.textContent = result.compatibility || 'Check platform-specific function support before filling down.';
  renderList(els.outputSteps, result.steps?.length ? result.steps : [result.explanation], 'ol');
  renderChecks(result);
  renderSheetPreview(result);
}

function renderList(target, items) {
  target.innerHTML = '';
  items.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    target.append(li);
  });
}

function renderChecks(result) {
  els.outputChecks.innerHTML = '';
  const checks = result.checks?.length
    ? result.checks.map((check) => ({ title: 'Review', detail: check, status: 'warning' }))
    : [{ title: 'Syntax', detail: 'No basic syntax issues found.', status: 'ok' }];

  checks.push({ title: 'Compatibility', detail: result.compatibility || 'Confirm function support in your spreadsheet app.', status: 'note' });

  checks.forEach((check) => {
    const li = document.createElement('li');
    const strong = document.createElement('strong');
    const span = document.createElement('span');

    li.dataset.status = check.status;
    strong.textContent = check.title;
    span.textContent = check.detail;
    li.append(strong, span);
    els.outputChecks.append(li);
  });
}

function renderSheetPreview(result) {
  const lines = els.table.value.trim().split(/\r?\n/).filter(Boolean);
  const headers = (lines[0] || 'Column A,Column B,Column C').split(',').map((value) => value.trim()).slice(0, 3);
  const row = (lines[1] || 'Sample,Value,Result').split(',').map((value) => value.trim()).slice(0, 3);
  const formula = result.formula.length > 18 ? `${result.formula.slice(0, 18)}...` : result.formula;

  els.sheetPreview.innerHTML = '';
  [...headers, 'Formula', ...row, formula].forEach((value, index) => {
    const cell = document.createElement('div');
    cell.textContent = value;
    if (index === 3) cell.className = 'active-cell';
    els.sheetPreview.append(cell);
  });
}

els.modeButtons.forEach((button) => button.addEventListener('click', () => selectMode(button.dataset.mode)));
els.platformButtons.forEach((button) => button.addEventListener('click', () => selectPlatform(button.dataset.platform)));
els.exampleButtons.forEach((button) => button.addEventListener('click', () => populateExample(button.dataset.example)));
els.form.addEventListener('submit', (event) => {
  event.preventDefault();
  runTool();
});

els.signupForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const email = els.signupEmail.value.trim();
  if (!email) return;

  trackEvent('signup_submit', { source: 'usage_wall' });
  els.signupNote.textContent = 'Saving...';

  try {
    const response = await fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        source: 'usage_wall',
        planIntent: 'free_account'
      })
    });

    if (!response.ok) throw new Error('Signup failed');

    els.signupNote.textContent = `Saved. Free accounts will get ${FREE_ACCOUNT_WEEKLY_LIMIT} runs per week when account access opens.`;
    els.signupForm.querySelector('button').disabled = true;
    trackEvent('signup_success', { source: 'usage_wall' });
  } catch {
    els.signupNote.textContent = 'Email capture is not connected yet. Upgrade is still available with Stripe.';
    trackEvent('signup_error', { source: 'usage_wall' });
  }
});

els.copy.addEventListener('click', async () => {
  await navigator.clipboard.writeText(els.outputFormula.textContent);
  els.copy.textContent = 'Copied';
  trackEvent('copy_click', { mode: state.mode, platform: state.platform });
  if (els.copyUpgrade) {
    const wasHidden = els.copyUpgrade.hidden;
    els.copyUpgrade.hidden = false;
    if (wasHidden) trackEvent('copy_upgrade_view', { mode: state.mode, platform: state.platform });
  }
  setTimeout(() => { els.copy.textContent = 'Copy'; }, 1200);
});

els.checkoutLinks.forEach((link) => {
  link.href = CHECKOUT_URL;
  link.addEventListener('click', () => {
    const placement = link.closest('.topbar') ? 'nav'
      : link.closest('.run-row') ? 'run_row'
        : link.closest('.paywall') ? 'paywall'
          : link.closest('.copy-upgrade') ? 'copy_upgrade'
            : link.closest('.result-upgrade') ? 'result_upgrade'
              : link.closest('.pricing') ? 'pricing'
                : 'unknown';
    trackEvent('checkout_click', { placement, text: link.textContent.trim(), used: getUsage() });
  });
});

trackEvent('page_view', {
  pagePreset: Boolean(pagePreset),
  paidReturn: params.get('paid') === '1',
  utmSource: params.get('utm_source') || '',
  utmCampaign: params.get('utm_campaign') || ''
});

if (params.get('paid') === '1') {
  localStorage.setItem('write-my-formula-pro', '1');
  trackEvent('paid_return', { source: 'query_param' });
}

selectMode('write');
selectPlatform('excel');
if (pagePreset) applyPreset(pagePreset);
renderUsage();
runTool({ consumeUsage: false, interaction: 'initial' });
