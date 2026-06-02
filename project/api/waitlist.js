// Vercel serverless function: POST /api/waitlist
// Receives a waitlist signup, sends a notification email via Resend.
// Requires env var RESEND_API_KEY (set in Vercel project settings).

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = req.body || {};
    const email = String(body.email || '').trim();
    const honey = String(body._honey || '');

    // Honeypot: bots fill hidden fields. Pretend success and drop the request.
    if (honey) return res.status(200).json({ ok: true });

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email' });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY not configured');
      return res.status(500).json({ error: 'Server misconfigured' });
    }

    const escape = (s) =>
      s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const safeEmail = escape(email);
    const now = new Date().toISOString().replace('T', ' ').replace(/\..+/, ' UTC');

    const html = [
      '<!doctype html><html><body style="font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Roboto,Helvetica,Arial,sans-serif;background:#F4F2EC;margin:0;padding:32px;color:#14130F;">',
      '  <div style="max-width:520px;margin:0 auto;background:#fff;border-radius:16px;padding:32px;box-shadow:0 1px 2px rgba(20,19,15,0.04),0 10px 30px rgba(20,19,15,0.05);">',
      '    <div style="font-size:12px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;color:#0F8A53;">New waitlist signup</div>',
      '    <h1 style="font-size:24px;font-weight:800;letter-spacing:-0.8px;margin:8px 0 24px;color:#0F3329;">Someone joined the Fince waitlist.</h1>',
      '    <div style="background:#F4F2EC;border-radius:12px;padding:16px 20px;margin-bottom:20px;">',
      '      <div style="font-size:12px;color:#666;font-weight:600;text-transform:uppercase;letter-spacing:0.6px;margin-bottom:4px;">Email</div>',
      '      <div style="font-size:18px;font-weight:600;"><a href="mailto:' + safeEmail + '" style="color:#16463A;text-decoration:none;">' + safeEmail + '</a></div>',
      '    </div>',
      '    <div style="color:#999;font-size:12px;border-top:1px solid #eee;padding-top:16px;">',
      '      Submitted via fince.my · ' + now,
      '    </div>',
      '  </div>',
      '</body></html>'
    ].join('\n');

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Fince Waitlist <onboarding@resend.dev>',
        to: ['gchinsiong@fince.my'],
        reply_to: email,
        subject: 'New Fince waitlist signup: ' + email,
        html: html
      })
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text();
      console.error('Resend API error:', resendRes.status, errText);
      return res.status(502).json({ error: 'Email send failed' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Waitlist handler error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};
