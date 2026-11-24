/**
 * Worker for Roberta Mari's site.
 * - Every page is a static file in dist/, served through the ASSETS binding.
 * - POST /api/contatto receives the contact form and forwards it by email
 *   through Cloudflare Email Routing (send_email binding "EMAIL").
 */
import { EmailMessage } from 'cloudflare:email';
// Shared with the form, so both sides accept the same addresses; it is also the Reply-To guard.
import { EMAIL_RE } from '../src/lib/email';

interface Env {
  ASSETS: Fetcher;
  EMAIL?: SendEmail;
  MAIL_FROM?: string;
  MAIL_TO?: string;
  TURNSTILE_SECRET?: string;
}

type ErrorCode = 'request' | 'fields' | 'privacy' | 'verification' | 'not_configured' | 'send';

// Messages are shown to the visitor as they are, so they stay in Italian.
type Result = { ok: true } | { ok: false; error: ErrorCode; message: string };

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.replace(/\/$/, '') === '/api/contatto') {
      if (request.method !== 'POST') {
        return new Response('Method not allowed', { status: 405, headers: { Allow: 'POST' } });
      }
      return handleContact(request, env);
    }
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;

async function handleContact(request: Request, env: Env): Promise<Response> {
  const wantsJson = (request.headers.get('accept') ?? '').includes('application/json');
  const result = await processForm(request, env);
  if (wantsJson) {
    const status = result.ok
      ? 200
      : result.error === 'not_configured'
        ? 503
        : result.error === 'send'
          ? 502
          : 400;
    return Response.json(result, { status });
  }
  // Without JavaScript the form posts natively: answer with a page instead of JSON.
  const target = result.ok ? '/grazie/' : '/invio-non-riuscito/';
  return Response.redirect(new URL(target, request.url).toString(), 303);
}

async function processForm(request: Request, env: Env): Promise<Result> {
  let data: FormData;
  try {
    data = await request.formData();
  } catch {
    return { ok: false, error: 'request', message: 'Richiesta non valida.' };
  }

  const field = (name: string, max = 500) => String(data.get(name) ?? '').trim().slice(0, max);
  // Single-line fields: a direct POST could otherwise fake extra lines in the email body.
  const line = (name: string, max: number) => field(name, max).replace(/\s+/g, ' ');

  // Honeypot: a bot that fills it gets a fake success, so it learns nothing.
  if (field('website')) return { ok: true };

  const name = line('name', 120);
  const email = field('email', 200);
  const message = field('message', 5000);

  if (!name || !EMAIL_RE.test(email) || !message) {
    return { ok: false, error: 'fields', message: 'Controlla nome, email e messaggio.' };
  }
  if (field('privacy') !== 'yes') {
    return { ok: false, error: 'privacy', message: 'Serve il consenso al trattamento dei dati.' };
  }

  if (env.TURNSTILE_SECRET) {
    const valid = await verifyTurnstile(
      field('cf-turnstile-response', 2048),
      env.TURNSTILE_SECRET,
      request.headers.get('CF-Connecting-IP'),
    );
    if (!valid) {
      return { ok: false, error: 'verification', message: 'Verifica anti-spam non riuscita. Riprova.' };
    }
  }

  if (!env.EMAIL || !env.MAIL_FROM || !env.MAIL_TO) {
    return {
      ok: false,
      error: 'not_configured',
      message: "L'invio dal sito non è ancora attivo. Scrivimi direttamente via email.",
    };
  }

  const rows = [
    ['Nome', name],
    ['Email', email],
    ['Scuola o ente', line('organization', 200)],
    ['Interessata/o a', line('interest', 120)],
  ].filter(([, value]) => value);

  const body = [
    'Nuova richiesta dal sito',
    '',
    ...rows.map(([key, value]) => `${key}: ${value}`),
    '',
    'Messaggio:',
    message,
    '',
    '—',
    'Per rispondere basta premere "Rispondi".',
  ].join('\r\n');

  // The name and subject reach a header only base64-encoded; the address goes in raw, safe because EMAIL_RE rejects CR/LF and angle brackets.
  const domain = env.MAIL_FROM.split('@')[1] ?? 'localhost';
  const headers = [
    `From: =?UTF-8?B?${base64('Sito Roberta Mari')}?= <${env.MAIL_FROM}>`,
    `To: <${env.MAIL_TO}>`,
    `Reply-To: =?UTF-8?B?${base64(name)}?= <${email}>`,
    `Subject: =?UTF-8?B?${base64(`Richiesta dal sito – ${name}`)}?=`,
    `Date: ${new Date().toUTCString()}`,
    `Message-ID: <${crypto.randomUUID()}@${domain}>`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
  ];
  const raw = `${headers.join('\r\n')}\r\n\r\n${wrap76(base64(body))}`;

  try {
    await env.EMAIL.send(new EmailMessage(env.MAIL_FROM, env.MAIL_TO, raw));
    return { ok: true };
  } catch (e) {
    console.error('Email sending failed', e);
    return { ok: false, error: 'send', message: 'Invio non riuscito. Riprova o scrivimi via email.' };
  }
}

async function verifyTurnstile(token: string, secret: string, ip: string | null): Promise<boolean> {
  if (!token) return false;
  const body = new FormData();
  body.append('secret', secret);
  body.append('response', token);
  if (ip) body.append('remoteip', ip);
  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body });
    const json = (await response.json()) as { success?: boolean };
    return json.success === true;
  } catch {
    return false;
  }
}

function base64(text: string): string {
  let binary = '';
  for (const byte of new TextEncoder().encode(text)) binary += String.fromCharCode(byte);
  return btoa(binary);
}

// Base64 bodies must be wrapped at 76 characters per line (RFC 2045).
function wrap76(text: string): string {
  return text.match(/.{1,76}/g)?.join('\r\n') ?? '';
}
