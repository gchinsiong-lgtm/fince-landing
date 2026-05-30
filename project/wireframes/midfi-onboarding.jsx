// MID-FI ONBOARDING — aligned to the rest of the mid-fi system
// Uses the same SF type stack + iOS palette (surface/tint/sep) as midfi-screens.jsx.

const _SFo = '-apple-system, "SF Pro Display", "SF Pro Text", "Inter", system-ui, sans-serif';
const _COLo = {
  light: {
    bg: '#F2F2F7', surface: '#FFFFFF', surface2: '#F8F8FB',
    text: '#000', text2: 'rgba(60,60,67,0.6)', text3: 'rgba(60,60,67,0.3)',
    sep: 'rgba(60,60,67,0.12)', tint: '#007AFF',
    pos: '#00A35C', neg: '#E0451F'
  },
  dark: {
    bg: '#000', surface: '#1C1C1E', surface2: '#2C2C2E',
    text: '#fff', text2: 'rgba(235,235,245,0.6)', text3: 'rgba(235,235,245,0.3)',
    sep: 'rgba(84,84,88,0.65)', tint: '#0A84FF',
    pos: '#30D158', neg: '#FF6B3D'
  }
};

// ─────────────────────────────────────────────────────
// SCREEN 1 — Identity Step
// ─────────────────────────────────────────────────────
const MidFi_Onboard_Identity = ({ dark = false, _initial = 'solo' }) => {
  const c = _COLo[dark ? 'dark' : 'light'];
  const [type, setType] = React.useState(_initial); // 'solo' | 'studio'

  const Card = ({ id, label, sub, icon }) => {
    const active = type === id;
    return (
      <div onClick={() => setType(id)} style={{
        flex: 1, padding: 16, borderRadius: 20, cursor: 'pointer',
        background: c.surface,
        color: c.text,
        border: active ? `2px solid ${c.tint}` : `0.5px solid ${c.sep}`,
        boxShadow: active
          ? (dark ? '0 0 0 3px rgba(10,132,255,0.18)' : '0 0 0 3px rgba(0,122,255,0.12), 0 1px 2px rgba(0,0,0,0.04)')
          : (dark ? 'inset 0 1px 0 rgba(255,255,255,0.04)' : '0 1px 2px rgba(0,0,0,0.04)'),
        transition: 'all 0.15s ease',
        display: 'flex', flexDirection: 'column', gap: 8,
        minHeight: 148, position: 'relative'
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: active ? c.tint : (dark ? 'rgba(120,120,128,0.24)' : 'rgba(118,118,128,0.12)'),
          color: active ? '#fff' : c.text2,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16
        }}>{icon}</div>
        {/* check indicator */}
        <div style={{
          position: 'absolute', top: 14, right: 14,
          width: 20, height: 20, borderRadius: '50%',
          background: active ? c.tint : 'transparent',
          border: active ? 'none' : `1.5px solid ${c.text3}`,
          color: '#fff', fontSize: 12, fontWeight: 700,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>{active ? '✓' : ''}</div>

        <div style={{ flex: 1 }} />
        <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: -0.2, lineHeight: 1.2 }}>{label}</div>
        <div style={{ fontSize: 12, color: c.text2, lineHeight: 1.35 }}>{sub}</div>
      </div>);
  };

  const Input = ({ label, placeholder }) =>
    <div>
      <div style={{
        fontSize: 11, fontWeight: 600, letterSpacing: 0.4, color: c.text2,
        textTransform: 'uppercase', marginBottom: 6, padding: '0 4px'
      }}>{label}</div>
      <div style={{
        background: c.surface, borderRadius: 12,
        padding: '14px 14px',
        fontSize: 16, color: c.text3,
        border: dark ? '0.5px solid rgba(255,255,255,0.06)' : '0.5px solid rgba(0,0,0,0.04)',
        boxShadow: dark ? 'inset 0 1px 0 rgba(255,255,255,0.04)' : '0 1px 2px rgba(0,0,0,0.04)'
      }}>{placeholder}</div>
    </div>;

  return (
    <div style={{
      background: c.bg, color: c.text, height: '100%', fontFamily: _SFo,
      position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column'
    }}>
      {/* progress dots */}
      <div style={{ padding: '8px 24px 0', display: 'flex', gap: 6 }}>
        <div style={{ flex: 1, height: 3, borderRadius: 2, background: c.tint }} />
        <div style={{ flex: 1, height: 3, borderRadius: 2, background: c.sep }} />
      </div>

      <div style={{ padding: '24px 18px 0', flex: 1, overflowY: 'auto' }}>
        {/* Header — iOS large title style */}
        <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: -0.6, lineHeight: 1.05 }}>
          Welcome to Fince.
        </div>
        <div style={{ fontSize: 15, color: c.text2, marginTop: 8, lineHeight: 1.35 }}>
          Let's set up your workspace.
        </div>

        {/* Entity type */}
        <div style={{ marginTop: 28 }}>
          <div style={{
            fontSize: 13, fontWeight: 600, letterSpacing: 0.4, color: c.text2,
            textTransform: 'uppercase', marginBottom: 10, padding: '0 4px'
          }}>I'm a…</div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Card id="solo" label="Solo Freelancer" sub="Just me, my work, my numbers." icon="●" />
            <Card id="studio" label="Studio / Company" sub="A team with shared books." icon="◰" />
          </div>
        </div>

        {/* Name inputs */}
        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Input label="Your Name" placeholder="e.g. Aisha Rahman" />
          {type === 'studio' &&
            <div style={{ animation: 'fadeSlideIn 0.25s ease' }}>
              <Input label="Studio Name" placeholder="e.g. Filmpeak Studio" />
            </div>
          }
        </div>

        <div style={{ height: 120 }} />
      </div>

      {/* Bottom CTA — iOS tint */}
      <div style={{ padding: '12px 18px 28px', background: c.bg }}>
        <div style={{
          padding: '16px 20px', borderRadius: 14,
          background: c.tint, color: '#fff',
          fontSize: 17, fontWeight: 600, letterSpacing: -0.2,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          boxShadow: dark ? '0 8px 24px rgba(10,132,255,0.35)' : '0 8px 24px rgba(0,122,255,0.25)'
        }}>
          <span>Next</span>
          <span style={{ fontSize: 18 }}>→</span>
        </div>
      </div>

      <style>{`@keyframes fadeSlideIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>);
};

// ─────────────────────────────────────────────────────
// SCREEN 2 — Magic Permission Step
// ─────────────────────────────────────────────────────
const MidFi_Onboard_Magic = ({ dark = false }) => {
  const c = _COLo[dark ? 'dark' : 'light'];

  return (
    <div style={{
      background: c.bg, color: c.text, height: '100%', fontFamily: _SFo,
      position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column'
    }}>
      {/* progress dots */}
      <div style={{ padding: '8px 24px 0', display: 'flex', gap: 6 }}>
        <div style={{ flex: 1, height: 3, borderRadius: 2, background: c.tint }} />
        <div style={{ flex: 1, height: 3, borderRadius: 2, background: c.tint }} />
      </div>

      <div style={{ padding: '24px 18px 0', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: -0.6, lineHeight: 1.05 }}>
          Let's test the AI.
        </div>
        <div style={{ fontSize: 15, color: c.text2, marginTop: 8, lineHeight: 1.35 }}>
          Do you have a physical receipt nearby?
        </div>

        {/* Wireframe receipt illustration in a card */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 0' }}>
          <div style={{
            background: c.surface, borderRadius: 24, padding: 28,
            border: dark ? '0.5px solid rgba(255,255,255,0.06)' : '0.5px solid rgba(0,0,0,0.04)',
            boxShadow: dark ? 'inset 0 1px 0 rgba(255,255,255,0.04)' : '0 8px 24px rgba(0,0,0,0.04)'
          }}>
            <svg width="160" height="220" viewBox="0 0 180 240" fill="none" style={{ display: 'block' }}>
              <path
                d="M30 8 L150 8 L150 220 L138 230 L126 220 L114 230 L102 220 L90 230 L78 220 L66 230 L54 220 L42 230 L30 220 Z"
                stroke={c.text}
                strokeWidth="1.5"
                fill={c.surface2}
                strokeLinejoin="round"
              />
              <line x1="46" y1="36" x2="134" y2="36" stroke={c.text} strokeWidth="2" strokeLinecap="round" />
              <line x1="46" y1="48" x2="110" y2="48" stroke={c.text3} strokeWidth="1" strokeLinecap="round" />
              <line x1="42" y1="68" x2="138" y2="68" stroke={c.text3} strokeWidth="1" strokeDasharray="3 3" />
              {[88, 104, 120, 136].map((y, i) =>
                <g key={y}>
                  <line x1="42" y1={y} x2={92 - i * 4} y2={y} stroke={c.text3} strokeWidth="1" strokeLinecap="round" />
                  <line x1={120 - i * 2} y1={y} x2="138" y2={y} stroke={c.text2} strokeWidth="1.2" strokeLinecap="round" />
                </g>
              )}
              <line x1="42" y1="156" x2="138" y2="156" stroke={c.text3} strokeWidth="1" strokeDasharray="3 3" />
              <line x1="46" y1="176" x2="78" y2="176" stroke={c.text} strokeWidth="2.5" strokeLinecap="round" />
              <line x1="106" y1="176" x2="134" y2="176" stroke={c.tint} strokeWidth="2.5" strokeLinecap="round" />
              {/* scan corners in tint */}
              <path d="M14 24 L14 14 L24 14" stroke={c.tint} strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M156 14 L166 14 L166 24" stroke={c.tint} strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M14 196 L14 206 L24 206" stroke={c.tint} strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M156 206 L166 206 L166 196" stroke={c.tint} strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </svg>
          </div>
        </div>
      </div>

      {/* Stacked CTAs */}
      <div style={{ padding: '12px 18px 28px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{
          padding: '16px 20px', borderRadius: 14,
          background: c.tint, color: '#fff',
          fontSize: 17, fontWeight: 600, letterSpacing: -0.2,
          textAlign: 'center',
          boxShadow: dark ? '0 8px 24px rgba(10,132,255,0.35)' : '0 8px 24px rgba(0,122,255,0.25)'
        }}>Yes, scan a receipt</div>

        <div style={{
          padding: '14px 20px',
          color: c.text2, fontSize: 15, fontWeight: 500,
          textAlign: 'center'
        }}>No, skip for now</div>
      </div>
    </div>);
};

Object.assign(window, { MidFi_Onboard_Identity, MidFi_Onboard_Magic });
