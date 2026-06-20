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

// Shared email shell. paragraphs is an array of HTML-safe paragraph strings.
function emailShell(eyebrow, heading, paragraphs) {
  const body = paragraphs
    .map((p, i) => '    <p style="font-size:16px;line-height:1.55;color:#3a3a36;margin:0 0 ' + (i === paragraphs.length - 1 ? '24' : '16') + 'px;">' + p + '</p>')
    .join('\n');
  return [
    '<!doctype html><html><body style="font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Roboto,Helvetica,Arial,sans-serif;background:#F4F2EC;margin:0;padding:32px;color:#14130F;">',
    '  <div style="max-width:520px;margin:0 auto;background:#fff;border-radius:16px;padding:32px;box-shadow:0 1px 2px rgba(20,19,15,0.04),0 10px 30px rgba(20,19,15,0.05);">',
    '    <div style="font-size:12px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;color:#0F8A53;">' + eyebrow + '</div>',
    '    <h1 style="font-size:24px;font-weight:800;letter-spacing:-0.8px;margin:8px 0 16px;color:#0F3329;">' + heading + '</h1>',
    body,
    '    <div style="color:#999;font-size:12px;border-top:1px solid #eee;padding-top:16px;">',
    '      &mdash; Gene, Fince',
    '    </div>',
    '  </div>',
    '</body></html>'
  ].join('\n');
}

function userConfirmationWaitlistHtml() {
  return emailShell('You\'re on the list', 'You\'re on the Fince launch list.', [
    'We\'re building Fince &mdash; AI bookkeeping for freelancers and solo founders in Malaysia. Snap a receipt and your books are done: every ringgit lands under the right LHDN-mapped category, tax-ready all year round.',
    'We\'ll email you the moment Fince is live on the App Store. Want it sooner? Just reply and ask about the TestFlight beta &mdash; we\'re inviting 100 founding testers.',
  ]);
}

function userConfirmationBetaHtml() {
  return emailShell('Founding beta &middot; TestFlight', 'Thanks for applying to test Fince.', [
    'You\'ve applied for one of <strong>100 founding beta seats</strong>. We\'re reviewing applications and sending TestFlight invites in batches &mdash; if it\'s a fit, you\'ll get an invite by email to install Fince on your iPhone.',
    'While you wait: what\'s the most painful part of bookkeeping for you right now? Just hit reply &mdash; it shapes what we build.',
  ]);
}

function notificationHtml(email, nowStr, meta) {
  const safeEmail = escapeHtml(email);
  const isBeta = meta && meta.tier === 'beta';
  const rows = [
    '    <div style="background:#F4F2EC;border-radius:12px;padding:16px 20px;margin-bottom:20px;">',
    '      <div style="font-size:12px;color:#666;font-weight:600;text-transform:uppercase;letter-spacing:0.6px;margin-bottom:4px;">Email</div>',
    '      <div style="font-size:18px;font-weight:600;"><a href="mailto:' + safeEmail + '" style="color:#16463A;text-decoration:none;">' + safeEmail + '</a></div>',
  ];
  if (isBeta) {
    rows.push('      <div style="font-size:12px;color:#666;font-weight:600;text-transform:uppercase;letter-spacing:0.6px;margin:14px 0 4px;">Work</div>');
    rows.push('      <div style="font-size:15px;color:#14130F;">' + escapeHtml(meta.work || '—') + '</div>');
    rows.push('      <div style="font-size:12px;color:#666;font-weight:600;text-transform:uppercase;letter-spacing:0.6px;margin:14px 0 4px;">Has iPhone</div>');
    rows.push('      <div style="font-size:15px;color:#14130F;">' + (meta.iphone ? 'Yes' : 'Not confirmed') + '</div>');
  }
  rows.push('    </div>');
  const label = isBeta ? 'New beta application' : 'New waitlist signup';
  const heading = isBeta ? 'Someone applied to beta-test Fince.' : 'Someone joined the Fince waitlist.';
  const dupNote = meta && meta.alreadyOnList ? ' &middot; already in list' : '';
  return [
    '<!doctype html><html><body style="font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Roboto,Helvetica,Arial,sans-serif;background:#F4F2EC;margin:0;padding:32px;color:#14130F;">',
    '  <div style="max-width:520px;margin:0 auto;background:#fff;border-radius:16px;padding:32px;box-shadow:0 1px 2px rgba(20,19,15,0.04),0 10px 30px rgba(20,19,15,0.05);">',
    '    <div style="font-size:12px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;color:#0F8A53;">' + label + '</div>',
    '    <h1 style="font-size:24px;font-weight:800;letter-spacing:-0.8px;margin:8px 0 24px;color:#0F3329;">' + heading + '</h1>',
    rows.join('\n'),
    '    <div style="color:#999;font-size:12px;border-top:1px solid #eee;padding-top:16px;">',
    '      Submitted via fince.my &middot; ' + escapeHtml(nowStr) + dupNote,
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
    const tier = body.tier === 'beta' ? 'beta' : 'waitlist';
    const work = String(body.work || '').trim().slice(0, 200);
    const iphone = body.iphone === true || body.iphone === 'true';
    const meta = { tier, work, iphone };

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
    const transport = getTransport();
    const nowStr = new Date().toISOString().replace('T', ' ').replace(/\..+/, ' UTC');

    // The signup origin/tier rides on `source` ('beta' | 'waitlist') — no schema change needed.
    const supabase = getSupabase();
    const { error: insertError } = await supabase
      .from('waitlist')
      .insert({ email, source: tier, ip });

    // Notify the team. For beta we always want to see the application (with the
    // qualifying answers), even if the email was already on the list — so we send
    // the notification on a duplicate too. Confirmation to the user is skipped on dup.
    function notifyTeam(extraMeta) {
      return transport.sendMail({
        from: 'Fince ' + (tier === 'beta' ? 'Beta' : 'Waitlist') + ' <' + FROM_ADDR + '>',
        to: process.env.WAITLIST_NOTIFY_TO,
        replyTo: email,
        subject: (tier === 'beta' ? 'New beta application: ' : 'New waitlist signup: ') + email,
        html: notificationHtml(email, nowStr, Object.assign({}, meta, extraMeta)),
      });
    }

    if (insertError) {
      if (insertError.code === '23505') {
        // Already on the list. Beta: still surface the application to the team.
        if (tier === 'beta') {
          try { await notifyTeam({ alreadyOnList: true }); }
          catch (e) { console.error('Beta dup notification failed:', e); }
        }
        return res.status(200).json({ ok: true, alreadyOnList: true });
      }
      console.error('Supabase insert error:', insertError);
      return res.status(500).json({ error: 'Could not save signup' });
    }

    // Send confirmation (tier-specific) + team notification in parallel. Failures are
    // logged but don't fail the request — the signup is already saved.
    const confirmation = tier === 'beta' ? userConfirmationBetaHtml() : userConfirmationWaitlistHtml();
    const confirmSubject = tier === 'beta' ? 'Your Fince founding-beta application' : "You're on the Fince launch list";

    const sendResults = await Promise.allSettled([
      transport.sendMail({
        from: 'Fince <' + FROM_ADDR + '>',
        to: email,
        replyTo: REPLY_TO,
        subject: confirmSubject,
        html: confirmation,
      }),
      notifyTeam(),
    ]);

    sendResults.forEach((r, i) => {
      if (r.status === 'rejected') {
        console.error('Email send failed (' + (i === 0 ? 'user confirmation' : 'team notification') + '):', r.reason);
      }
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Waitlist handler error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};
