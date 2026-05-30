// Fince — Login screen (hi-fi). Brand-green forward, Inter type, iOS frame.
// Reuses the Fince palette feel but leads with the actual brand green from the logo.

const _FONT = '"Inter", -apple-system, "SF Pro Display", system-ui, sans-serif';

// Brand-anchored palettes. Green pulled from the logo (#143E37).
const LOGIN_THEME = {
  light: {
    bg: 'linear-gradient(180deg, #F7F5EF 0%, #EFEDE5 100%)',
    sheet: '#FFFFFF',
    ink: '#14130F', ink2: 'rgba(20,19,15,0.55)', ink3: 'rgba(20,19,15,0.32)',
    field: '#F4F2EC', fieldBorder: 'rgba(20,19,15,0.08)', fieldFocus: '#143E37',
    sep: 'rgba(20,19,15,0.10)',
    accent: '#143E37', accentDeep: '#0E2C27', onAccent: '#F4F2EC',
    socialBg: '#FFFFFF', socialBorder: 'rgba(20,19,15,0.12)', socialInk: '#14130F',
    logoColor: 'green', heroInk: '#14130F',
    btnBg: 'linear-gradient(180deg, #143E37 0%, #0E2C27 100%)', btnInk: '#F4F2EC',
    btnShadow: '0 8px 22px rgba(20,62,55,0.30), inset 0 1px 0 rgba(255,255,255,0.18)',
    card: '0 1px 2px rgba(20,19,15,0.04), 0 18px 40px rgba(20,19,15,0.06)'
  },
  dark: {
    bg: 'linear-gradient(180deg, #0C0E0D 0%, #070908 100%)',
    sheet: '#15171600',
    ink: '#F4F2EC', ink2: 'rgba(244,242,236,0.58)', ink3: 'rgba(244,242,236,0.30)',
    field: 'rgba(244,242,236,0.06)', fieldBorder: 'rgba(244,242,236,0.12)', fieldFocus: '#34D399',
    sep: 'rgba(244,242,236,0.12)',
    accent: '#2FA98A', accentDeep: '#1C5249', onAccent: '#06140F',
    socialBg: 'rgba(244,242,236,0.06)', socialBorder: 'rgba(244,242,236,0.14)', socialInk: '#F4F2EC',
    logoColor: 'cream', heroInk: '#F4F2EC',
    btnBg: '#F4F2EC', btnInk: '#0C1A15',
    btnShadow: '0 10px 26px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.55)',
    card: 'inset 0 0.5px 0 rgba(255,255,255,0.06)'
  },
  forest: {
    bg: 'radial-gradient(120% 90% at 50% -10%, #1C5249 0%, #143E37 42%, #0C2723 100%)',
    sheet: '#FBFAF6',
    ink: '#14130F', ink2: 'rgba(20,19,15,0.55)', ink3: 'rgba(20,19,15,0.32)',
    field: '#F1EFE8', fieldBorder: 'rgba(20,19,15,0.08)', fieldFocus: '#143E37',
    sep: 'rgba(20,19,15,0.10)',
    accent: '#143E37', accentDeep: '#0E2C27', onAccent: '#F4F2EC',
    socialBg: '#FFFFFF', socialBorder: 'rgba(20,19,15,0.12)', socialInk: '#14130F',
    logoColor: 'cream', heroInk: '#F4F2EC',
    btnBg: 'linear-gradient(180deg, #143E37 0%, #0E2C27 100%)', btnInk: '#F4F2EC',
    btnShadow: '0 8px 22px rgba(20,62,55,0.30), inset 0 1px 0 rgba(255,255,255,0.18)',
    card: '0 -2px 30px rgba(0,0,0,0.18)'
  }
};

// ── Field ────────────────────────────────────────────────
const _Field = ({ c, radius, label, value, placeholder, type, focused, trailing, icon }) =>
<div style={{ marginBottom: 14 }}>
    <div style={{
    fontSize: 12.5, fontWeight: 600, color: c.ink2, marginBottom: 7,
    letterSpacing: 0.1, fontFamily: _FONT
  }}>{label}</div>
    <div style={{
    display: 'flex', alignItems: 'center', gap: 10,
    background: c.field, borderRadius: radius,
    border: `1.5px solid ${focused ? c.fieldFocus : c.fieldBorder}`,
    padding: '0 14px', height: 52,
    boxShadow: focused ? `0 0 0 4px ${c.fieldFocus}1f` : 'none',
    transition: 'border-color .15s'
  }}>
      {icon}
      <div style={{
      flex: 1, fontSize: 16, fontFamily: _FONT,
      color: value ? c.ink : c.ink3, fontWeight: value ? 500 : 400,
      whiteSpace: 'nowrap', overflow: 'hidden'
    }}>
        {type === 'password' && value ?
      <span style={{ letterSpacing: 3 }}>{'•'.repeat(value.length)}</span> :
      value || placeholder}
      </div>
      {focused && <div style={{ width: 1.5, height: 22, background: c.fieldFocus, borderRadius: 2, animation: 'fcBlink 1s steps(1) infinite' }} />}
      {trailing}
    </div>
  </div>;


const _mail = (col) =>
<svg width="19" height="19" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="14" rx="3" stroke={col} strokeWidth="1.8" />
    <path d="M4 7l8 6 8-6" stroke={col} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;

const _lock = (col) =>
<svg width="19" height="19" viewBox="0 0 24 24" fill="none">
    <rect x="4" y="10" width="16" height="11" rx="3" stroke={col} strokeWidth="1.8" />
    <path d="M8 10V7a4 4 0 018 0v3" stroke={col} strokeWidth="1.8" strokeLinecap="round" />
  </svg>;

const _eye = (col) =>
<svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" stroke={col} strokeWidth="1.8" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="2.8" stroke={col} strokeWidth="1.8" />
  </svg>;

const _appleGlyph = (col) =>
<svg width="18" height="18" viewBox="0 0 24 24" fill={col}>
    <path d="M17.05 12.7c-.03-2.5 2.04-3.7 2.13-3.76-1.16-1.7-2.97-1.93-3.61-1.96-1.54-.16-3 .9-3.78.9-.78 0-1.98-.88-3.25-.85-1.67.02-3.21.97-4.07 2.47-1.74 3.02-.45 7.49 1.25 9.94.83 1.2 1.82 2.55 3.12 2.5 1.25-.05 1.72-.81 3.23-.81 1.51 0 1.93.81 3.25.78 1.34-.02 2.19-1.22 3.01-2.43.95-1.39 1.34-2.74 1.36-2.81-.03-.01-2.61-1-2.64-3.96zM14.6 4.6c.69-.83 1.15-1.99 1.02-3.15-.99.04-2.19.66-2.9 1.49-.64.73-1.2 1.91-1.05 3.04 1.1.09 2.24-.56 2.93-1.38z" />
  </svg>;

const _googleGlyph = () =>
<svg width="18" height="18" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.5 12.2c0-.7-.06-1.4-.18-2.05H12v3.9h5.9a5.05 5.05 0 01-2.19 3.31v2.74h3.54c2.07-1.9 3.25-4.71 3.25-7.9z" />
    <path fill="#34A853" d="M12 23c2.95 0 5.43-.98 7.24-2.65l-3.54-2.74c-.98.66-2.24 1.05-3.7 1.05-2.85 0-5.26-1.92-6.12-4.5H2.22v2.83A11 11 0 0012 23z" />
    <path fill="#FBBC05" d="M5.88 14.16a6.6 6.6 0 010-4.22V7.11H2.22a11 11 0 000 9.88l3.66-2.83z" />
    <path fill="#EA4335" d="M12 5.44c1.6 0 3.05.55 4.18 1.63l3.14-3.14C17.42 2.16 14.95 1 12 1A11 11 0 002.22 7.11l3.66 2.83C6.74 7.36 9.15 5.44 12 5.44z" />
  </svg>;


const _Social = ({ c, radius, glyph, label }) =>
<div style={{
  flex: 1, height: 50, borderRadius: radius,
  background: c.socialBg, border: `1.5px solid ${c.socialBorder}`,
  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9,
  fontFamily: _FONT, fontSize: 14.5, fontWeight: 600, color: c.socialInk
}}>
    {glyph}{label}
  </div>;


// ── Main login ───────────────────────────────────────────
const FinceLogin = ({ theme = 'light', radius = 14, focus = 'email' }) => {
  const c = LOGIN_THEME[theme];
  const forest = theme === 'forest';

  const form =
  <>
      <_Field c={c} radius={radius} label="Email" value="hello@fince.app" type="email"
    focused={focus === 'email'} icon={_mail(c.ink3)} />
      <_Field c={c} radius={radius} label="Password" value="captainsledger" type="password"
    focused={focus === 'password'} icon={_lock(c.ink3)} trailing={_eye(c.ink3)} />

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: -4, marginBottom: 18 }}>
        <span style={{ fontFamily: _FONT, fontSize: 13.5, fontWeight: 600, color: c.accent }}>Forgot password?</span>
      </div>

      {/* primary */}
      <div style={{
        height: 54, borderRadius: radius,
        background: c.btnBg,
        color: c.btnInk, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        fontFamily: _FONT, fontSize: 16.5, fontWeight: 700, letterSpacing: 0.1,
        boxShadow: c.btnShadow
      }}>
        Sign in
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M5 12h13M13 6l6 6-6 6" stroke={c.btnInk} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Face ID */}
      <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      marginTop: 14, color: c.ink2, fontFamily: _FONT, fontSize: 13.5, fontWeight: 600
    }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M3 8V5a2 2 0 012-2h3M16 3h3a2 2 0 012 2v3M21 16v3a2 2 0 01-2 2h-3M8 21H5a2 2 0 01-2-2v-3" stroke={c.accent} strokeWidth="1.8" strokeLinecap="round" />
          <path d="M9 10v1M15 10v1M12 9v4l-1 1M9.5 15.5c1.5 1 3.5 1 5 0" stroke={c.accent} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Use Face ID
      </div>

      {/* divider */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0 16px' }}>
        <div style={{ flex: 1, height: 1, background: c.sep }} />
        <span style={{ fontFamily: _FONT, fontSize: 12, fontWeight: 600, color: c.ink3, letterSpacing: 0.4 }}>OR CONTINUE WITH</span>
        <div style={{ flex: 1, height: 1, background: c.sep }} />
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        <_Social c={c} radius={radius} glyph={_appleGlyph(c.socialInk)} label="Apple" />
        <_Social c={c} radius={radius} glyph={_googleGlyph()} label="Google" />
      </div>
    </>;


  // ── FOREST layout: green hero + cream sheet ──
  if (forest) {
    return (
      <div style={{ background: c.bg, height: '100%', fontFamily: _FONT, display: 'flex', flexDirection: 'column' }}>
        <div style={{
          flex: '0 0 auto', padding: '40px 30px 30px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'
        }}>
          <img src={`brand/logo-mark-cream.png`} style={{ height: 64, marginBottom: 18, filter: 'drop-shadow(0 6px 18px rgba(0,0,0,0.25))' }} />
          <div style={{ fontSize: 27, fontWeight: 700, letterSpacing: -0.6, color: c.heroInk }}>Welcome back</div>
          <div style={{ fontSize: 14.5, color: 'rgba(244,242,236,0.7)', marginTop: 6, maxWidth: 250, lineHeight: 1.45 }}>
            Your ledgers, projects and receipts — all in one calm place.
          </div>
        </div>
        <div style={{
          flex: 1, background: c.sheet, borderRadius: '28px 28px 0 0',
          padding: '28px 26px 26px', boxShadow: c.card, overflow: 'auto'
        }}>
          {form}
          <_Footer c={c} />
        </div>
      </div>);

  }

  // ── CENTERED layout (light / dark) ──
  return (
    <div style={{
      background: c.bg, height: '100%', fontFamily: _FONT,
      padding: '44px 28px 24px', boxSizing: 'border-box',
      display: 'flex', flexDirection: 'column', overflow: 'auto'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 30 }}>
        <img src={`brand/logo-mark-${c.logoColor}.png`} style={{ height: 56, marginBottom: 22 }} />
        <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.6, color: c.ink }}>Welcome back</div>
        <div style={{ fontSize: 14.5, color: c.ink2, marginTop: 6 }}>Sign in to continue to Fince</div>
      </div>
      {form}
      <_Footer c={c} />
    </div>);

};

const _Footer = ({ c }) =>
<div style={{
  textAlign: 'center', marginTop: 22, paddingTop: 4,
  fontFamily: _FONT, fontSize: 14, color: c.ink2
}}>
    New to Fince? <span style={{ color: c.accent, fontWeight: 700 }}>Create account</span>
  </div>;


window.FinceLogin = FinceLogin;