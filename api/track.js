const ALLOWED_EVENTS = new Set([
  'page_view',
  'paid_return',
  'paid_success_page_view',
  'paid_continue_click',
  'mode_select',
  'platform_select',
  'example_click',
  'formula_submit',
  'formula_success',
  'formula_fallback',
  'formula_blocked',
  'paywall_view',
  'copy_click',
  'copy_upgrade_view',
  'checkout_click',
  'signup_submit',
  'signup_success',
  'signup_error'
]);

function json(response, status, body) {
  response.statusCode = status;
  response.setHeader('Content-Type', 'application/json');
  response.end(JSON.stringify(body));
}

function cleanString(value, maxLength = 120) {
  return String(value || '').replace(/[\r\n\t]/g, ' ').slice(0, maxLength);
}

function cleanProperties(properties) {
  const cleaned = {};
  const source = properties && typeof properties === 'object' ? properties : {};

  for (const [key, value] of Object.entries(source).slice(0, 24)) {
    const safeKey = cleanString(key, 48).replace(/[^a-zA-Z0-9_:-]/g, '_');
    if (!safeKey) continue;

    if (typeof value === 'boolean' || typeof value === 'number') {
      cleaned[safeKey] = value;
    } else {
      cleaned[safeKey] = cleanString(value, 160);
    }
  }

  return cleaned;
}

function clientIp(request) {
  const forwarded = String(request.headers?.['x-forwarded-for'] || request.headers?.['X-Forwarded-For'] || '');
  return forwarded.split(',')[0].trim()
    || request.headers?.['x-real-ip']
    || request.socket?.remoteAddress
    || 'unknown';
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    json(response, 405, { error: 'Method not allowed' });
    return;
  }

  try {
    const rawBody = typeof request.body === 'string' ? JSON.parse(request.body || '{}') : request.body || {};
    const event = cleanString(rawBody.event, 64);

    if (!ALLOWED_EVENTS.has(event)) {
      json(response, 400, { error: 'Unknown analytics event' });
      return;
    }

    const entry = {
      type: 'wmf_analytics',
      event,
      path: cleanString(rawBody.path, 160),
      page: cleanString(rawBody.page, 120),
      sessionId: cleanString(rawBody.sessionId, 80),
      referrerHost: cleanString(rawBody.referrerHost, 120),
      userAgent: cleanString(request.headers?.['user-agent'], 180),
      ipPrefix: cleanString(clientIp(request), 80).split('.').slice(0, 3).join('.'),
      properties: cleanProperties(rawBody.properties),
      receivedAt: new Date().toISOString()
    };

    console.log(JSON.stringify(entry));
    json(response, 202, { ok: true });
  } catch (error) {
    console.error(JSON.stringify({
      type: 'wmf_analytics_error',
      message: error instanceof Error ? error.message : 'unknown_error',
      receivedAt: new Date().toISOString()
    }));
    json(response, 400, { error: 'Invalid analytics payload' });
  }
}
