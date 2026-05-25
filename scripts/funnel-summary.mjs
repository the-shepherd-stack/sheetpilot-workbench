#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const sinceArg = process.argv.find((arg) => arg.startsWith('--since='));
const since = sinceArg ? sinceArg.split('=')[1] : '24h';
const scriptDir = fileURLToPath(new URL('.', import.meta.url));

function rootEnv() {
  const envPath = resolve(scriptDir, '../../..', '.env');
  const loaded = {};

  try {
    const env = readFileSync(envPath, 'utf8');
    for (const line of env.split('\n')) {
      const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
      if (!match) continue;
      loaded[match[1]] = match[2].replace(/^['"]|['"]$/g, '');
    }
  } catch {
    // Stripe CLI may still be authenticated globally; absence of .env is non-fatal.
  }

  return loaded;
}

const loadedEnv = rootEnv();

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    ...options
  });

  if (result.error) return `ERROR: ${result.error.message}`;
  if (result.status && !result.stdout) return `ERROR: ${String(result.stderr || '').trim()}`;

  return options.includeStderr
    ? `${result.stdout || ''}\n${result.stderr || ''}`
    : result.stdout || '';
}

function parseVercelMessages(output) {
  return output
    .split('\n')
    .filter((line) => line.trim().startsWith('{'))
    .map((line) => {
      try {
        const row = JSON.parse(line);
        return JSON.parse(row.message);
      } catch {
        return null;
      }
    })
    .filter(Boolean);
}

function countBy(items, getKey) {
  return items.reduce((counts, item) => {
    const key = getKey(item) || 'unknown';
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {});
}

function vercelLogs(type) {
  const output = run('vercel', [
    'logs',
    '--environment',
    'production',
    '--since',
    since,
    '--json',
    '--limit',
    '200',
    '--no-follow'
  ], { includeStderr: true });

  return parseVercelMessages(output).filter((message) => message.type === type);
}

function stripeSessions() {
  const stripeEnv = { ...loadedEnv, ...process.env };
  const paymentLink = stripeEnv.WMF_STRIPE_PAYMENT_LINK_ID || 'plink_1TYxXe4BEFFaauKW2rQXmkfD';
  const output = run('stripe', [
    'checkout',
    'sessions',
    'list',
    '--live',
    '--payment-link',
    paymentLink,
    '--limit',
    '20'
  ], {
    env: stripeEnv
  });

  if (!output || output.startsWith('ERROR:')) return [];

  try {
    return JSON.parse(output).data || [];
  } catch {
    return [];
  }
}

const analytics = vercelLogs('wmf_analytics');
const formula = vercelLogs('wmf_formula');
const waitlist = vercelLogs('wmf_waitlist');
const sessions = stripeSessions();

const sessionIds = new Set(analytics.map((event) => event.sessionId).filter(Boolean));
const checkoutClicks = analytics.filter((event) => event.event === 'checkout_click');
const paidSuccesses = analytics.filter((event) => event.event === 'paid_success_page_view');

const summary = {
  window: since,
  sessions: sessionIds.size,
  analyticsEvents: countBy(analytics, (event) => event.event),
  pageViewsByPath: countBy(analytics.filter((event) => event.event === 'page_view'), (event) => event.path),
  checkoutClicksByPlacement: countBy(checkoutClicks, (event) => event.properties?.placement),
  formulaEvents: countBy(formula, (event) => event.event),
  formulaSources: countBy(formula.filter((event) => event.source), (event) => event.source),
  waitlistEvents: countBy(waitlist, (event) => event.event),
  stripe: {
    totalRecentSessions: sessions.length,
    paid: sessions.filter((session) => session.payment_status === 'paid').length,
    unpaidOpen: sessions.filter((session) => session.status === 'open' && session.payment_status !== 'paid').length,
    latest: sessions.slice(0, 5).map((session) => ({
      id: session.id,
      status: session.status,
      payment_status: session.payment_status,
      amount_total: session.amount_total,
      created: new Date(session.created * 1000).toISOString()
    }))
  },
  paidSuccessPageViews: paidSuccesses.length
};

console.log(JSON.stringify(summary, null, 2));
