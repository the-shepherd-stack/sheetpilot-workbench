const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RESEND_CONTACTS_URL = 'https://api.resend.com/contacts';

function json(response, status, body) {
  response.statusCode = status;
  response.setHeader('Content-Type', 'application/json');
  response.end(JSON.stringify(body));
}

function logWaitlistEvent(event, details = {}) {
  console.log(JSON.stringify({
    type: 'wmf_waitlist',
    event,
    source: String(details.source || '').slice(0, 80),
    planIntent: String(details.planIntent || '').slice(0, 80),
    status: details.status || '',
    receivedAt: new Date().toISOString()
  }));
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    json(response, 405, { error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    logWaitlistEvent('missing_config', { status: 503 });
    json(response, 503, { error: 'Resend API key is not configured' });
    return;
  }

  const body = typeof request.body === 'string' ? JSON.parse(request.body || '{}') : request.body || {};
  const email = String(body.email || '').trim().toLowerCase();

  if (!EMAIL_PATTERN.test(email)) {
    logWaitlistEvent('invalid_email', { source: body.source, planIntent: body.planIntent, status: 400 });
    json(response, 400, { error: 'Valid email is required' });
    return;
  }

  const payload = {
    email,
    unsubscribed: false,
    properties: {
      source: body.source || 'workbench',
      plan_intent: body.planIntent || 'free_account',
      product: 'write-my-formula',
      monthly_email_opt_in: 'true',
      signup_at: new Date().toISOString()
    }
  };

  const headers = {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
    'User-Agent': 'write-my-formula/0.1'
  };

  const upstream = await fetch(RESEND_CONTACTS_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload)
  });

  if (upstream.status === 409) {
    const update = await fetch(`${RESEND_CONTACTS_URL}/${encodeURIComponent(email)}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(payload)
    });

    if (update.ok) {
      logWaitlistEvent('updated', { source: body.source, planIntent: body.planIntent, status: 202 });
      json(response, 202, { ok: true });
      return;
    }
  }

  if (!upstream.ok) {
    logWaitlistEvent('rejected', { source: body.source, planIntent: body.planIntent, status: 502 });
    json(response, 502, { error: 'Resend rejected the signup request' });
    return;
  }

  logWaitlistEvent('created', { source: body.source, planIntent: body.planIntent, status: 202 });
  json(response, 202, { ok: true });
}
