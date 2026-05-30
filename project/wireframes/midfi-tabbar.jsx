// MID-FI TAB BAR — component showcase, 4-tab + center FAB

const _SFt = '-apple-system, "SF Pro Display", "SF Pro Text", "Inter", system-ui, sans-serif';
const _COLt = {
  light: {
    bg: '#F2F2F7', surface: '#FFFFFF', text: '#000',
    text2: 'rgba(60,60,67,0.6)', text3: 'rgba(60,60,67,0.3)',
    sep: 'rgba(60,60,67,0.12)', tint: '#007AFF'
  },
  dark: {
    bg: '#000', surface: '#1C1C1E', text: '#fff',
    text2: 'rgba(235,235,245,0.6)', text3: 'rgba(235,235,245,0.3)',
    sep: 'rgba(84,84,88,0.65)', tint: '#0A84FF'
  }
};

const _TabBarShowcase = ({ active = 'home', dark }) => {
  const c = _COLt[dark ? 'dark' : 'light'];
  const left = [
    { id: 'home', label: 'Dashboard', icon: '⌂' },
    { id: 'projects', label: 'Projects', icon: '◰' }];
  const right = [
    { id: 'ledger', label: 'Ledger', icon: '☰' },
    { id: 'settings', label: 'Settings', icon: '⚙' }];

  const Tab = ({ t }) =>
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
      color: t.id === active ? c.tint : c.text2, fontSize: 10, fontWeight: 500, flex: 1
    }}>
      <span style={{ fontSize: 22, lineHeight: 1 }}>{t.icon}</span>
      {t.label}
    </div>;

  return (
    <div style={{
      position: 'relative',
      height: 84, paddingBottom: 24,
      background: dark ? 'rgba(20,20,22,0.72)' : 'rgba(255,255,255,0.92)',
      backdropFilter: 'blur(24px) saturate(180%)',
      WebkitBackdropFilter: 'blur(24px) saturate(180%)',
      borderTop: `0.5px solid ${c.sep}`,
      display: 'flex', alignItems: 'center', padding: '0 8px',
      borderRadius: 0
    }}>
      {left.map((t) => <Tab key={t.id} t={t} />)}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', position: 'relative' }}>
        <div style={{
          position: 'absolute', top: -22,
          width: 56, height: 56, borderRadius: 18,
          background: 'linear-gradient(135deg, #FF6B3D, #E0451F)',
          color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 28, fontWeight: 300, lineHeight: 1,
          boxShadow: '0 8px 24px rgba(224,69,31,0.45), 0 2px 6px rgba(0,0,0,0.2)',
          border: dark ? '3px solid rgba(20,20,22,0.6)' : '3px solid rgba(255,255,255,0.6)'
        }}>+</div>
      </div>
      {right.map((t) => <Tab key={t.id} t={t} />)}
    </div>);
};

const MidFi_TabBar = ({ dark = false }) => {
  const c = _COLt[dark ? 'dark' : 'light'];
  const states = [
    { l: 'Dashboard active', a: 'home' },
    { l: 'Projects active', a: 'projects' },
    { l: 'Ledger active', a: 'ledger' },
    { l: 'Settings active', a: 'settings' }
  ];

  return (
    <div style={{
      background: c.bg, color: c.text, height: '100%', fontFamily: _SFt,
      padding: '28px 20px', boxSizing: 'border-box', overflowY: 'auto'
    }}>
      <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.5 }}>Tab Bar</div>
      <div style={{ fontSize: 14, color: c.text2, marginTop: 4 }}>4-tab + center FAB · blurred translucent material</div>

      <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 22 }}>
        {states.map((s) =>
          <div key={s.a}>
            <div style={{
              fontSize: 11, fontWeight: 600, letterSpacing: 0.4,
              color: c.text2, textTransform: 'uppercase', marginBottom: 8, padding: '0 4px'
            }}>{s.l}</div>
            <div style={{
              borderRadius: 18, overflow: 'hidden',
              background: c.surface,
              border: `0.5px solid ${c.sep}`,
              boxShadow: dark ? 'inset 0 1px 0 rgba(255,255,255,0.04)' : '0 1px 2px rgba(0,0,0,0.04)'
            }}>
              {/* a sliver of "content above" for context */}
              <div style={{
                height: 28,
                background: dark
                  ? 'linear-gradient(180deg, rgba(28,28,30,0) 0%, rgba(28,28,30,0.6) 100%)'
                  : 'linear-gradient(180deg, rgba(245,245,247,0) 0%, rgba(245,245,247,0.8) 100%)'
              }} />
              <_TabBarShowcase active={s.a} dark={dark} />
            </div>
          </div>
        )}
      </div>

      {/* Spec notes */}
      <div style={{ marginTop: 28, padding: 16, borderRadius: 14, background: c.surface, border: `0.5px solid ${c.sep}` }}>
        <div style={{
          fontSize: 11, fontWeight: 600, letterSpacing: 0.4,
          color: c.text2, textTransform: 'uppercase', marginBottom: 8
        }}>Spec</div>
        {[
          ['Height', '84pt (60 + 24 home indicator)'],
          ['Material', 'blur(24) saturate(180%) · 0.72 / 0.92 alpha'],
          ['Hairline', `0.5px ${dark ? 'rgba(84,84,88,0.65)' : 'rgba(60,60,67,0.12)'}`],
          ['Tab icon', '22pt SF · label 10pt 500'],
          ['Active tint', dark ? '#0A84FF' : '#007AFF'],
          ['FAB', '56pt · radius 18 · gradient #FF6B3D → #E0451F'],
          ['FAB lift', 'top: −22 · shadow 8 24 rgba(224,69,31,0.45)']
        ].map(([k, v], i, a) =>
          <div key={k} style={{
            display: 'flex', justifyContent: 'space-between',
            padding: '8px 0', fontSize: 13,
            borderBottom: i < a.length - 1 ? `0.5px solid ${c.sep}` : 'none'
          }}>
            <span style={{ color: c.text2 }}>{k}</span>
            <span style={{ color: c.text, fontWeight: 500, fontFeatureSettings: '"tnum"' }}>{v}</span>
          </div>
        )}
      </div>
    </div>);
};

Object.assign(window, { MidFi_TabBar });
