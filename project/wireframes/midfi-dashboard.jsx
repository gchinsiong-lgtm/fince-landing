// MID-FI favorite — Dashboard, premium iOS-native feel
// Lives inside the iOS frame. Dark + light modes. Subtle layering, large display type,
// monospaced numerals, generous whitespace, grouped inset list.
// Reads tweaks from window for radius + density.

const SF = '-apple-system, "SF Pro Display", "SF Pro Text", "Inter", system-ui, sans-serif';
const SF_MONO = '"SF Mono", ui-monospace, Menlo, monospace';

// signature colors — keep neon green/red financial signals as user asked
const COL = {
  light: {
    bg: '#F2F2F7', surface: '#FFFFFF', surface2: '#F8F8FB',
    text: '#000', text2: 'rgba(60,60,67,0.6)', text3: 'rgba(60,60,67,0.3)',
    sep: 'rgba(60,60,67,0.12)', tint: '#007AFF',
    pos: '#00A35C', neg: '#E0451F', posBg: 'rgba(0,163,92,0.12)',
  },
  dark: {
    bg: '#000', surface: '#1C1C1E', surface2: '#2C2C2E',
    text: '#fff', text2: 'rgba(235,235,245,0.6)', text3: 'rgba(235,235,245,0.3)',
    sep: 'rgba(84,84,88,0.65)', tint: '#0A84FF',
    pos: '#30D158', neg: '#FF6B3D', posBg: 'rgba(48,209,88,0.18)',
  },
};

const MidFiDashboard = ({ dark = true, radius = 20, density = 'comfy' }) => {
  const c = dark ? COL.dark : COL.light;
  const dense = density === 'compact';
  const pad = dense ? 14 : 18;
  const cardPad = dense ? 14 : 18;
  const sectionGap = dense ? 14 : 22;

  const Card = ({ children, style = {}, accent = false }) => (
    <div style={{
      background: c.surface,
      borderRadius: radius,
      padding: cardPad,
      boxShadow: dark
        ? `inset 0 1px 0 rgba(255,255,255,0.04)`
        : `0 1px 2px rgba(0,0,0,0.04), 0 0.5px 0 rgba(0,0,0,0.04)`,
      ...style,
    }}>{children}</div>
  );

  return (
    <div style={{
      background: c.bg, color: c.text, height: '100%',
      fontFamily: SF, WebkitFontSmoothing: 'antialiased',
      paddingBottom: 96, position: 'relative', overflow: 'hidden',
    }}>
      {/* Large title nav */}
      <div style={{ padding: `8px ${pad}px 12px` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: -0.4, lineHeight: 1.1 }}>
            Overview
          </div>
          {/* workspace pill */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '6px 10px 6px 12px',
            background: c.surface, borderRadius: 999,
            fontSize: 13, fontWeight: 500, color: c.text,
          }}>
            <span style={{
              width: 16, height: 16, borderRadius: 4,
              background: 'linear-gradient(135deg, #FF6B3D, #E0451F)',
            }} />
            Filmpeak
            <svg width="10" height="6" viewBox="0 0 10 6"><path d="M1 1l4 4 4-4" stroke={c.text2} strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>
          </div>
        </div>
      </div>

      {/* HERO — Net Profit */}
      <div style={{ padding: `0 ${pad}px`, marginBottom: sectionGap }}>
        <Card style={{ padding: cardPad + 4 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ color: c.text2, fontSize: 13, fontWeight: 500 }}>Net Profit</div>
              <div style={{
                fontSize: 38, fontWeight: 700, letterSpacing: -1, lineHeight: 1.1, marginTop: 2,
                fontFamily: SF, fontFeatureSettings: '"tnum"',
              }}>
                <span style={{ fontSize: 22, color: c.text2, fontWeight: 600, marginRight: 4 }}>RM</span>
                7,130<span style={{ color: c.text2, fontSize: 24 }}>.62</span>
              </div>
              <div style={{ marginTop: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 2,
                  background: c.posBg, color: c.pos,
                  padding: '2px 8px', borderRadius: 999,
                  fontSize: 12, fontWeight: 600, fontFeatureSettings: '"tnum"',
                }}>↑ 12%</span>
                <span style={{ color: c.text2, fontSize: 12 }}>vs last month</span>
              </div>
            </div>
            {/* hero spark */}
            <svg width="110" height="50" viewBox="0 0 110 50">
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={c.pos} stopOpacity="0.25"/>
                  <stop offset="100%" stopColor={c.pos} stopOpacity="0"/>
                </linearGradient>
              </defs>
              <path d="M0 36 Q15 18 30 28 T55 14 T80 22 T108 6 L108 50 L0 50 Z" fill="url(#g1)"/>
              <path d="M0 36 Q15 18 30 28 T55 14 T80 22 T108 6"
                stroke={c.pos} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="108" cy="6" r="3" fill={c.pos}/>
              <circle cx="108" cy="6" r="6" fill={c.pos} fillOpacity="0.2"/>
            </svg>
          </div>
          {/* range segmented */}
          <div style={{
            marginTop: 14, display: 'flex',
            background: dark ? 'rgba(120,120,128,0.24)' : 'rgba(120,120,128,0.12)',
            borderRadius: 9, padding: 2, fontSize: 13, fontWeight: 600,
          }}>
            {['1M','3M','YTD','1Y','Max'].map((t,i) => (
              <div key={t} style={{
                flex: 1, textAlign: 'center', padding: '6px 0',
                borderRadius: 7,
                background: i === 0 ? c.surface : 'transparent',
                color: i === 0 ? c.text : c.text2,
                boxShadow: i === 0 ? '0 1px 2px rgba(0,0,0,0.1)' : 'none',
              }}>{t}</div>
            ))}
          </div>
        </Card>
      </div>

      {/* In/Out */}
      <div style={{ padding: `0 ${pad}px`, marginBottom: sectionGap, display: 'flex', gap: 10 }}>
        <Card style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: c.text2, fontSize: 12, fontWeight: 500 }}>
            <span style={{
              width: 18, height: 18, borderRadius: 6, background: c.posBg,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: c.pos,
            }}>↑</span>
            Income
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, marginTop: 6, fontFeatureSettings: '"tnum"', letterSpacing: -0.3 }}>
            <span style={{ fontSize: 13, color: c.text2, marginRight: 2 }}>RM</span>9,959<span style={{ color: c.text2, fontSize: 14 }}>.00</span>
          </div>
        </Card>
        <Card style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: c.text2, fontSize: 12, fontWeight: 500 }}>
            <span style={{
              width: 18, height: 18, borderRadius: 6, background: 'rgba(224,69,31,0.15)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: c.neg,
            }}>↓</span>
            Expenses
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, marginTop: 6, fontFeatureSettings: '"tnum"', letterSpacing: -0.3 }}>
            <span style={{ fontSize: 13, color: c.text2, marginRight: 2 }}>RM</span>2,828<span style={{ color: c.text2, fontSize: 14 }}>.38</span>
          </div>
        </Card>
      </div>

      {/* Recent Transactions — grouped inset */}
      <div style={{ padding: `0 ${pad}px` }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          padding: '0 4px 8px',
        }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: c.text2, textTransform: 'uppercase', letterSpacing: 0.4 }}>
            Recent
          </div>
          <div style={{ fontSize: 14, color: c.tint, fontWeight: 500 }}>See All</div>
        </div>
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          {[
            { name: 'Client Retainer', date: '6 May · Saffron Park', amount: '3,600.00', kind: 'pos', status: 'PAID' },
            { name: 'Hardware/Gear', date: '1 May · Saffron Park', amount: '2,828.38', kind: 'neg' },
            { name: 'Stock Footage', date: '28 Apr · Greenline', amount: '120.00', kind: 'neg' },
          ].map((t,i,a) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: dense ? '11px 16px' : '14px 16px',
              borderBottom: i < a.length-1 ? `0.5px solid ${c.sep}` : 'none',
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: t.kind === 'pos' ? c.posBg : 'rgba(224,69,31,0.15)',
                color: t.kind === 'pos' ? c.pos : c.neg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16, fontWeight: 700,
              }}>{t.kind === 'pos' ? '↗' : '↙'}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 500, letterSpacing: -0.2 }}>{t.name}</div>
                <div style={{ color: c.text2, fontSize: 12, marginTop: 1 }}>{t.date}</div>
              </div>
              {t.status && (
                <div style={{
                  background: c.posBg, color: c.pos,
                  padding: '2px 8px', borderRadius: 999,
                  fontSize: 10, fontWeight: 700, letterSpacing: 0.4,
                }}>{t.status}</div>
              )}
              <div style={{
                fontSize: 15, fontWeight: 600,
                color: t.kind === 'pos' ? c.pos : c.neg,
                fontFeatureSettings: '"tnum"',
              }}>
                {t.kind === 'pos' ? '+' : '−'} {t.amount}
              </div>
            </div>
          ))}
        </Card>
      </div>

      {/* TAB BAR */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: 84, paddingBottom: 24,
        background: dark ? 'rgba(20,20,22,0.72)' : 'rgba(255,255,255,0.78)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        borderTop: `0.5px solid ${c.sep}`,
        display: 'flex', justifyContent: 'space-around', alignItems: 'center',
      }}>
        {[
          { id: 'home', label: 'Dashboard', icon: '⌂' },
          { id: 'projects', label: 'Projects', icon: '◰' },
          { id: 'ledger', label: 'Ledger', icon: '☰' },
          { id: 'settings', label: 'Settings', icon: '⚙' },
        ].map((t,i) => (
          <div key={t.id} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
            color: i === 0 ? c.tint : c.text2,
            fontSize: 10, fontWeight: 500,
          }}>
            <span style={{ fontSize: 22, lineHeight: 1 }}>{t.icon}</span>
            {t.label}
          </div>
        ))}
      </div>
    </div>
  );
};

window.MidFiDashboard = MidFiDashboard;
