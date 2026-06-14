// Vercel serverless function: POST /api/waitlist
// Single-step waitlist signup. Stores the row in Supabase, then sends:
//   1) a confirmation email to the signup user
//   2) a notification email to WAITLIST_NOTIFY_TO
// Emails go through Gmail SMTP authenticated as GMAIL_USER, From: waitlist@fince.my (Workspace alias).

const { createClient } = require('@supabase/supabase-js');
const nodemailer = require('nodemailer');

const FROM_ADDR = 'waitlist@fince.my';
const REPLY_TO = 'gchinsiong@fince.my';

let _transport;
function getTransport() {
  if (_transport) return _transport;
  _transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
  return _transport;
}

let _supabase;
function getSupabase() {
  if (_supabase) return _supabase;
  _supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { persistSession: false } }
  );
  return _supabase;
}

const escapeHtml = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

function userConfirmationHtml() {
  return [
    '<!doctype html><html><body style="font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Roboto,Helvetica,Arial,sans-serif;background:#F4F2EC;margin:0;padding:32px;color:#14130F;">',
    '  <div style="max-width:520px;margin:0 auto;background:#fff;border-radius:16px;padding:32px;box-shadow:0 1px 2px rgba(20,19,15,0.04),0 10px 30px rgba(20,19,15,0.05);">',
    '    <div style="font-size:12px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;color:#0F8A53;">You\'re on the list</div>',
    '    <h1 style="font-size:24px;font-weight:800;letter-spacing:-0.8px;margin:8px 0 16px;color:#0F3329;">Thanks for joining the Fince waitlist.</h1>',
    '    <p style="font-size:16px;line-height:1.55;color:#3a3a36;margin:0 0 16px;">We\'re building Fince &mdash; AI bookkeeping for Malaysian freelancers. Snap a receipt and your books are done: every ringgit lands under the right LHDN-mapped category, tax-ready all year round. You\'ll hear from us first when early access opens.</p>',
    '    <p style="font-size:16px;line-height:1.55;color:#3a3a36;margin:0 0 24px;">What makes bookkeeping painful for you right now? Just hit reply &mdash; we read every note.</p>',
    '    <div style="color:#999;font-size:12px;border-top:1px solid #eee;padding-top:16px;">',
    '      &mdash; Gene, Fince',
    '    </div>',
    '  </div>',
    '</body></html>'
  ].join('\n');
}

function notificationHtml(email, nowStr) {
  const safeEmail = escapeHtml(email);
  return [
    '<!doctype html><html><body style="font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Roboto,Helvetica,Arial,sans-serif;background:#F4F2EC;margin:0;padding:32px;color:#14130F;">',
    '  <div style="max-width:520px;margin:0 auto;background:#fff;border-radius:16px;padding:32px;box-shadow:0 1px 2px rgba(20,19,15,0.04),0 10px 30px rgba(20,19,15,0.05);">',
    '    <div style="font-size:12px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;color:#0F8A53;">New waitlist signup</div>',
    '    <h1 style="font-size:24px;font-weight:800;letter-spacing:-0.8px;margin:8px 0 24px;color:#0F3329;">Someone joined the Fince waitlist.</h1>',
    '    <div style="background:#F4F2EC;border-radius:12px;padding:16px 20px;margin-bottom:20px;">',
    '      <div style="font-size:12px;color:#666;font-weight:600;text-transform:uppercase;letter-spacing:0.6px;margin-bottom:4px;">Email</div>',
    '      <div style="font-size:18px;font-weight:600;"><a href="mailto:' + safeEmail + '" style="color:#16463A;text-decoration:none;">' + safeEmail + '</a></div>',
    '    </div>',
    '    <div style="color:#999;font-size:12px;border-top:1px solid #eee;padding-top:16px;">',
    '      Submitted via fince.my &middot; ' + escapeHtml(nowStr),
    '    </div>',
    '  </div>',
    '</body></html>'
  ].join('\n');
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = req.body || {};
    const email = String(body.email || '').trim().toLowerCase();
    const honey = String(body._honey || '');

    // Honeypot: bots fill hidden fields. Pretend success and drop.
    if (honey) return res.status(200).json({ ok: true });

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
      return res.status(400).json({ error: 'Invalid email' });
    }

    const required = [
      'SUPABASE_URL',
      'SUPABASE_SERVICE_ROLE_KEY',
      'GMAIL_USER',
      'GMAIL_APP_PASSWORD',
      'WAITLIST_NOTIFY_TO',
    ];
    for (const k of required) {
      if (!process.env[k]) {
        console.error('Missing env var:', k);
        return res.status(500).json({ error: 'Server misconfigured' });
      }
    }

    const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || null;

    // Insert. Unique violation (already on list) is a no-op success — don't resend.
    const supabase = getSupabase();
    const { error: insertError } = await supabase
      .from('waitlist')
      .insert({ email, source: 'landing', ip });

    if (insertError) {
      if (insertError.code === '23505') {
        return res.status(200).json({ ok: true, alreadyOnList: true });
      }
      console.error('Supabase insert error:', insertError);
      return res.status(500).json({ error: 'Could not save signup' });
    }

    // Send both emails in parallel. Failures are logged but don't fail the request —
    // the signup is already saved; we'd rather lose an email than the signup.
    const transport = getTransport();
    const nowStr = new Date().toISOString().replace('T', ' ').replace(/\..+/, ' UTC');

    const sendResults = await Promise.allSettled([
      transport.sendMail({
        from: 'Fince <' + FROM_ADDR + '>',
        to: email,
        replyTo: REPLY_TO,
        subject: "You're on the Fince waitlist",
        html: userConfirmationHtml(),
      }),
      transport.sendMail({
        from: 'Fince Waitlist <' + FROM_ADDR + '>',
        to: process.env.WAITLIST_NOTIFY_TO,
        replyTo: email,
        subject: 'New Fince waitlist signup: ' + email,
        html: notificationHtml(email, nowStr),
      }),
    ]);

    sendResults.forEach((r, i) => {
      if (r.status === 'rejected') {
        console.error('Email send failed (' + (i === 0 ? 'user confirmation' : 'self notification') + '):', r.reason);
      }
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Waitlist handler error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};
