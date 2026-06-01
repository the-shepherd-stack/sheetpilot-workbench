import { explainFormulaSteps, fixFormula, generateFormula, validateFormula } from '../app/formula-engine.js';

const OPENAI_RESPONSES_URL = 'https://api.openai.com/v1/responses';
const DEFAULT_MODEL = 'gpt-4.1-mini';
const MAX_FIELD_LENGTH = 4000;
const MAX_TOTAL_INPUT_LENGTH = 9000;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 30;
const rateLimitBuckets = new Map();

const schema = {
  type: 'object',
  additionalProperties: false,
  required: ['formula', 'explanation', 'steps', 'checks', 'compatibility', 'functionsUsed', 'confidence'],
  properties: {
    formula: { type: 'string' },
    explanation: { type: 'string' },
    steps: {
      type: 'array',
      items: { type: 'string' }
    },
    checks: {
      type: 'array',
      items: { type: 'string' }
    },
    compatibility: { type: 'string' },
    functionsUsed: {
      type: 'array',
      items: { type: 'string' }
    },
    confidence: {
      type: 'number',
      minimum: 0,
      maximum: 1
    }
  }
};

const functionCatalog = [
  'XLOOKUP: find an exact lookup value and return a matching value from another range.',
  'VLOOKUP: older lookup across a table, useful for legacy Excel compatibility.',
  'INDEX/MATCH: flexible lookup pattern when lookup and return columns are separated.',
  'SUMIFS: sum values that match one or more conditions.',
  'COUNTIFS: count rows that match one or more conditions.',
  'AVERAGEIFS: average values that match one or more conditions.',
  'IF/IFS: return different values based on one or more logical conditions.',
  'IFERROR: provide a readable fallback when a formula errors.',
  'FILTER: return rows matching conditions in Sheets or modern Excel.',
  'UNIQUE: return distinct values.',
  'TEXTJOIN: combine text values.',
  'TEXTAFTER/REGEXEXTRACT: extract parts of text such as email domains.',
  'LEFT/RIGHT/MID/FIND/SEARCH: extract or locate text by position.',
  'EOMONTH/TODAY/DATE: date windows such as this month or next month.'
];

function json(response, status, body) {
  response.statusCode = status;
  response.setHeader('Content-Type', 'application/json');
  response.end(JSON.stringify(body));
}

function logFormulaEvent(event, details = {}) {
  console.log(JSON.stringify({
    type: 'wmf_formula',
    event,
    mode: details.mode || '',
    platform: details.platform || '',
    source: details.source || '',
    inputLength: details.inputLength || 0,
    hasTable: Boolean(details.hasTable),
    hasHint: Boolean(details.hasHint),
    hasFormula: Boolean(details.hasFormula),
    status: details.status || '',
    receivedAt: new Date().toISOString()
  }));
}

function fallbackResult(body) {
  if (body.mode === 'fix') {
    return fixFormula(String(body.formula || ''));
  }

  if (body.mode === 'explain') {
    const formula = String(body.formula || '').trim();
    const normalized = formula.startsWith('=') ? formula : `=${formula}`;
    return {
      formula: normalized,
      explanation: 'Explains the pasted formula in plain English.',
      compatibility: 'Explanation mode is syntax-only and works for Excel or Google Sheets formulas.',
      steps: explainFormulaSteps(normalized),
      checks: validateFormula(normalized)
    };
  }

  return generateFormula({
    task: String(body.task || ''),
    platform: body.platform === 'sheets' ? 'sheets' : 'excel',
    rawTable: String(body.table || ''),
    range: String(body.range || ''),
    hint: String(body.hint || '')
  });
}

function normalizeAiResult(result) {
  return {
    formula: ensureFormula(result.formula),
    explanation: String(result.explanation || ''),
    steps: Array.isArray(result.steps) ? result.steps.map(String).slice(0, 6) : [],
    checks: Array.isArray(result.checks) ? result.checks.map(String).slice(0, 6) : [],
    compatibility: String(result.compatibility || 'Check platform-specific function support before filling down.'),
    functionsUsed: Array.isArray(result.functionsUsed) ? result.functionsUsed.map(String).slice(0, 8) : [],
    confidence: typeof result.confidence === 'number' ? Math.max(0, Math.min(1, result.confidence)) : 0.6
  };
}

function enforceFixModeSafety(body, result, localFallback) {
  const originalFormula = String(body.formula || '');
  const resultText = `${result.formula || ''} ${result.explanation || ''} ${(result.steps || []).join(' ')} ${(result.checks || []).join(' ')}`;

  if (
    body.mode === 'fix'
    && /XLOOKUP|VLOOKUP|MATCH/i.test(originalFormula)
    && !/IFERROR|IFNA|not\s+found|no\s+match|if_not_found/i.test(resultText)
  ) {
    return {
      ...localFallback,
      source: result.source || 'openai',
      warning: 'Applied lookup fallback safety repair.'
    };
  }

  return result;
}

function ensureFormula(value) {
  const formula = String(value || '').trim();
  if (!formula) return '=';
  return formula.startsWith('=') ? formula : `=${formula}`;
}

function extractResponseText(payload) {
  if (typeof payload.output_text === 'string') return payload.output_text;

  for (const item of payload.output || []) {
    for (const content of item.content || []) {
      if (typeof content.text === 'string') return content.text;
    }
  }

  return '';
}

function userPayload(body) {
  return {
    mode: body.mode || 'write',
    platform: body.platform === 'sheets' ? 'google_sheets' : 'excel',
    task: body.task || '',
    table: body.table || '',
    range: body.range || '',
    hint: body.hint || '',
    formula: body.formula || ''
  };
}

function compactBody(body) {
  return {
    mode: clampText(body.mode || 'write', 20),
    platform: body.platform === 'sheets' ? 'sheets' : 'excel',
    task: clampText(body.task || '', MAX_FIELD_LENGTH),
    table: clampText(body.table || '', MAX_FIELD_LENGTH),
    range: clampText(body.range || '', 500),
    hint: clampText(body.hint || '', 500),
    formula: clampText(body.formula || '', MAX_FIELD_LENGTH)
  };
}

function clampText(value, maxLength) {
  return String(value || '').slice(0, maxLength);
}

function inputLength(body) {
  return ['task', 'table', 'range', 'hint', 'formula']
    .map((key) => String(body[key] || '').length)
    .reduce((sum, value) => sum + value, 0);
}

function clientKey(request) {
  const forwarded = String(request.headers?.['x-forwarded-for'] || request.headers?.['X-Forwarded-For'] || '');
  const ip = forwarded.split(',')[0].trim()
    || request.headers?.['x-real-ip']
    || request.socket?.remoteAddress
    || 'unknown';
  return String(ip).slice(0, 120);
}

function rateLimit(request) {
  const now = Date.now();
  const key = clientKey(request);
  const bucket = rateLimitBuckets.get(key);

  for (const [bucketKey, value] of rateLimitBuckets) {
    if (now - value.startedAt > RATE_LIMIT_WINDOW_MS) {
      rateLimitBuckets.delete(bucketKey);
    }
  }

  if (!bucket || now - bucket.startedAt > RATE_LIMIT_WINDOW_MS) {
    rateLimitBuckets.set(key, { count: 1, startedAt: now });
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1 };
  }

  if (bucket.count >= RATE_LIMIT_MAX) {
    return { allowed: false, remaining: 0, resetSeconds: Math.ceil((bucket.startedAt + RATE_LIMIT_WINDOW_MS - now) / 1000) };
  }

  bucket.count += 1;
  return { allowed: true, remaining: RATE_LIMIT_MAX - bucket.count };
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    json(response, 405, { error: 'Method not allowed' });
    return;
  }

  const rawBody = typeof request.body === 'string' ? JSON.parse(request.body || '{}') : request.body || {};
  const body = compactBody(rawBody);

  const limit = rateLimit(request);
  response.setHeader('X-RateLimit-Limit', String(RATE_LIMIT_MAX));
  response.setHeader('X-RateLimit-Remaining', String(limit.remaining));

  if (!limit.allowed) {
    response.setHeader('Retry-After', String(limit.resetSeconds || 3600));
    logFormulaEvent('rate_limited', { mode: body.mode, platform: body.platform, inputLength: inputLength(rawBody), status: 429 });
    json(response, 429, { error: 'Too many formula requests. Try again later or upgrade for higher limits.' });
    return;
  }

  if (inputLength(rawBody) > MAX_TOTAL_INPUT_LENGTH) {
    logFormulaEvent('too_large', { mode: body.mode, platform: body.platform, inputLength: inputLength(rawBody), status: 413 });
    json(response, 413, { error: 'Formula request is too large. Paste a smaller sample of your sheet.' });
    return;
  }
  const localFallback = fallbackResult(body);
  const apiKey = process.env.OPENAI_API_KEY;
  const eventDetails = {
    mode: body.mode,
    platform: body.platform,
    inputLength: inputLength(rawBody),
    hasTable: Boolean(body.table),
    hasHint: Boolean(body.hint),
    hasFormula: Boolean(body.formula)
  };

  if (!apiKey) {
    logFormulaEvent('completed', { ...eventDetails, source: 'fallback', status: 200 });
    json(response, 200, { ...localFallback, source: 'fallback', warning: 'OpenAI is not configured.' });
    return;
  }

  try {
    const upstream = await fetch(OPENAI_RESPONSES_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: process.env.OPENAI_FORMULA_MODEL || DEFAULT_MODEL,
        instructions: [
          'You generate spreadsheet formulas for Excel and Google Sheets.',
          'Return only the requested JSON schema.',
          'Use the user-provided table headers and range when available.',
          'Prefer formulas that can be pasted into row 2 and filled down.',
          'For counting rows matching multiple criteria, prefer COUNTIFS.',
          'For summing rows matching multiple criteria, prefer SUMIFS.',
          'For lookup requests, prefer XLOOKUP unless the user asks for VLOOKUP.',
          'In fix mode, repair the pasted formula; do not simply explain it unchanged when an obvious missing-match, range-size, exact-match, syntax, or fallback issue is present.',
          'When fixing lookup formulas, add a readable missing-match fallback with IFERROR, IFNA, or the lookup function fallback argument unless the user asks not to.',
          'Use the user-provided header names and business labels in explanations and checks, not only cell letters.',
          'Never invent unavailable columns. If context is insufficient, make a conservative formula and include a check.',
          `Relevant function catalog: ${functionCatalog.join(' | ')}`
        ].join('\n'),
        input: [
          {
            role: 'user',
            content: [
              {
                type: 'input_text',
                text: JSON.stringify(userPayload(body))
              }
            ]
          }
        ],
        temperature: 0.1,
        max_output_tokens: 900,
        text: {
          format: {
            type: 'json_schema',
            name: 'formula_result',
            strict: true,
            schema
          }
        }
      })
    });

    if (!upstream.ok) {
      logFormulaEvent('completed', { ...eventDetails, source: 'fallback', status: 200 });
      json(response, 200, { ...localFallback, source: 'fallback', warning: 'OpenAI request failed.' });
      return;
    }

    const payload = await upstream.json();
    const text = extractResponseText(payload);
    const parsed = JSON.parse(text);
    const normalized = normalizeAiResult(parsed);
    const safeResult = enforceFixModeSafety(body, normalized, localFallback);
    logFormulaEvent('completed', { ...eventDetails, source: 'openai', status: 200 });
    json(response, 200, { ...safeResult, source: 'openai' });
  } catch {
    logFormulaEvent('completed', { ...eventDetails, source: 'fallback', status: 200 });
    json(response, 200, { ...localFallback, source: 'fallback', warning: 'OpenAI response could not be used.' });
  }
}
