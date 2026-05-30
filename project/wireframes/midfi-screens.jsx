// MID-FI components for all 6 picked directions.
// Shares the COL palette + SF font stack with the dashboard.

const _SF = '-apple-system, "SF Pro Display", "SF Pro Text", "Inter", system-ui, sans-serif';
const _COL = {
  light: {
    bg: '#F2F2F7', surface: '#FFFFFF', surface2: '#F8F8FB',
    text: '#000', text2: 'rgba(60,60,67,0.6)', text3: 'rgba(60,60,67,0.3)',
    sep: 'rgba(60,60,67,0.12)', tint: '#007AFF',
    pos: '#00A35C', neg: '#E0451F', posBg: 'rgba(0,163,92,0.12)', negBg: 'rgba(224,69,31,0.12)'
  },
  dark: {
    bg: '#000', surface: '#1C1C1E', surface2: '#2C2C2E',
    text: '#fff', text2: 'rgba(235,235,245,0.6)', text3: 'rgba(235,235,245,0.3)',
    sep: 'rgba(84,84,88,0.65)', tint: '#0A84FF',
    pos: '#30D158', neg: '#FF6B3D', posBg: 'rgba(48,209,88,0.18)', negBg: 'rgba(255,107,61,0.18)'
  }
};

const _Card = (dark, radius) => ({ children, style = {}, onClick }) => {
  const c = _COL[dark ? 'dark' : 'light'];
  return (
    <div onClick={onClick} style={{
      background: c.surface, borderRadius: radius, padding: 18,
      boxShadow: dark ? 'inset 0 1px 0 rgba(255,255,255,0.04)' : '0 1px 2px rgba(0,0,0,0.04)',
      ...style
    }}>{children}</div>);

};

const _LargeTitle = ({ title, dark, trailing, leading }) => {
  const c = _COL[dark ? 'dark' : 'light'];
  // If there's a leading element (back button), keep the old stacked layout.
  // Otherwise put the title and trailing action on ONE row, vertically centered.
  if (leading) {
    return (
      <div style={{ padding: '8px 18px 12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: 36 }}>
          {leading}
          {trailing || <div />}
        </div>
        <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: -0.4, lineHeight: 1.1, marginTop: 4, color: c.text }}>{title}</div>
      </div>);

  }
  return (
    <div style={{ padding: '14px 18px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
      <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: -0.4, lineHeight: 1.1, color: c.text }}>{title}</div>
      {trailing || null}
    </div>);

};

// iOS 26 "Liquid Glass" tab bar — floating capsule with center FAB lifted above
const _TabBar = ({ active, dark }) => {
  const c = _COL[dark ? 'dark' : 'light'];
  const tabs = [
    { id: 'home',     label: 'Home',     icon: '⌂' },
    { id: 'projects', label: 'Projects', icon: '◰' },
    { id: 'ledger',   label: 'Ledger',   icon: '☰' },
    { id: 'settings', label: 'Settings', icon: '⚙' },
  ];
  const tint = c.tint;
  const inactive = c.text2;
  const glassBg = dark
    ? 'linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 55%, rgba(255,255,255,0.02) 100%)'
    : 'linear-gradient(180deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.45) 100%)';
  const baseTint = dark ? 'rgba(28,28,30,0.42)' : 'rgba(255,255,255,0.55)';
  const ring     = dark ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.85)';
  const innerHi  = dark ? 'rgba(255,255,255,0.28)' : 'rgba(255,255,255,0.9)';
  const innerLo  = dark ? 'rgba(0,0,0,0.35)' : 'rgba(0,0,0,0.06)';

  const Tab = ({ t }) => {
    const isActive = t.id === active;
    return (
      <div style={{
        flex: 1,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: 2,
        color: isActive ? tint : inactive,
        fontSize: 10, fontWeight: 600, letterSpacing: 0.1,
        position: 'relative',
        pointerEvents: 'auto',
      }}>
        {isActive && (
          <div style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 52, height: 48, borderRadius: 16,
            background: dark ? 'rgba(10,132,255,0.14)' : 'rgba(0,122,255,0.10)',
            border: `0.5px solid ${dark ? 'rgba(10,132,255,0.30)' : 'rgba(0,122,255,0.22)'}`,
          }} />
        )}
        <span style={{ fontSize: 22, lineHeight: 1, position: 'relative' }}>{t.icon}</span>
        <span style={{ position: 'relative' }}>{t.label}</span>
      </div>);
  };

  return (
    <div style={{
      position: 'absolute', bottom: 18, left: 14, right: 14,
      height: 64, borderRadius: 32,
      background: `${glassBg}, ${baseTint}`,
      backdropFilter: 'blur(28px) saturate(180%)',
      WebkitBackdropFilter: 'blur(28px) saturate(180%)',
      border: `1px solid ${ring}`,
      boxShadow: [
        `inset 0 1.5px 0 ${innerHi}`,
        `inset 0 -1.5px 0 ${innerLo}`,
        `inset 0 0 0 1px rgba(255,255,255,${dark ? 0.04 : 0.4})`,
        `0 14px 36px rgba(0,0,0,${dark ? 0.55 : 0.18})`,
        `0 3px 8px rgba(0,0,0,${dark ? 0.40 : 0.08})`,
      ].join(', '),
      display: 'flex', alignItems: 'stretch',
      padding: '0 6px',
      overflow: 'visible',
      pointerEvents: 'none',
    }}>
      <Tab t={tabs[0]} />
      <Tab t={tabs[1]} />
      {/* center FAB slot — circle lifted above the bar, plain color with glass edge */}
      <div style={{
        flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative'
      }}>
        <div style={{
          position: 'absolute', top: -30,
          width: 58, height: 58, borderRadius: '50%',
          background: '#FF6B3D',
          color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 30, fontWeight: 300, lineHeight: 1, paddingBottom: 2,
          boxShadow: [
            '0 16px 32px rgba(220,63,26,0.45)',
            '0 4px 10px rgba(0,0,0,0.28)',
            'inset 0 1.5px 0 rgba(255,255,255,0.55)',
            'inset 0 -1.5px 0 rgba(0,0,0,0.18)',
            'inset 0 0 0 1px rgba(255,255,255,0.18)',
          ].join(', '),
          pointerEvents: 'auto',
        }}>+</div>
      </div>
      <Tab t={tabs[2]} />
      <Tab t={tabs[3]} />
    </div>);
};

// ─────────────────────────────────────────────────────
// DASHBOARD D (mid-fi) — workspace swipe + In/Out tiles
// ─────────────────────────────────────────────────────
const MidFi_Dashboard_D = ({ dark = true, radius = 20, density = 'comfy' }) => {
  const c = _COL[dark ? 'dark' : 'light'];
  const Card = _Card(dark, radius);
  const dense = density === 'compact';
  const [page, setPage] = React.useState(0);
  const workspaces = [
  { name: 'Filmpeak Studio', net: '7,130.62', delta: '+12%', tone: 'linear-gradient(135deg, #FF6B3D, #E0451F)' },
  { name: 'Saffron LLC', net: '12,840.00', delta: '+5%', tone: 'linear-gradient(135deg, #5AA9FF, #2070D8)' },
  { name: 'Personal', net: '2,310.20', delta: '−3%', tone: 'linear-gradient(135deg, #BFB39A, #6E6655)' }];

  const w = workspaces[page];

  return (
    <div style={{ background: c.bg, color: c.text, height: '100%', boxSizing: 'border-box', fontFamily: _SF, paddingBottom: 96, position: 'relative', overflow: 'hidden' }}>
      <div style={{ padding: '14px 18px 4px' }} />

      {/* Swipeable workspace hero */}
      <div style={{ padding: '0 18px', marginBottom: 18 }}>
        <Card style={{ padding: 22, position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: w.tone }} />
            <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: -0.2 }}>{w.name}</div>
            <div style={{ flex: 1 }} />
            <div style={{ display: 'flex', gap: 4 }}>
              {workspaces.map((_, i) =>
              <span key={i} onClick={() => setPage(i)} style={{
                width: 6, height: 6, borderRadius: '50%',
                background: i === page ? c.text : c.text3, cursor: 'pointer'
              }} />
              )}
            </div>
          </div>
          <div style={{ color: c.text2, fontSize: 13, marginTop: 18 }}>Net Profit · this month</div>
          <div style={{ fontSize: 42, fontWeight: 700, letterSpacing: -1.2, lineHeight: 1.05, marginTop: 2, fontFeatureSettings: '"tnum"' }}>
            <span style={{ fontSize: 22, color: c.text2, fontWeight: 600, marginRight: 6 }}>RM</span>
            {w.net.split('.')[0]}<span style={{ color: c.text2, fontSize: 26 }}>.{w.net.split('.')[1]}</span>
          </div>
          <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{
              background: w.delta.startsWith('+') ? c.posBg : c.negBg,
              color: w.delta.startsWith('+') ? c.pos : c.neg,
              padding: '2px 8px', borderRadius: 999, fontSize: 12, fontWeight: 600
            }}>{w.delta.startsWith('+') ? '↑' : '↓'} {w.delta.replace(/[+−-]/, '')}</span>
            <span style={{ color: c.text2, fontSize: 12 }}>vs last month</span>
          </div>

          {/* sparkline */}
          <svg width="100%" height="64" viewBox="0 0 320 64" style={{ display: 'block', marginTop: 14 }}>
            <defs>
              <linearGradient id={`g_${page}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={c.pos} stopOpacity="0.3" />
                <stop offset="100%" stopColor={c.pos} stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0 48 Q40 24 80 36 T160 18 T240 28 T318 8 L318 64 L0 64 Z" fill={`url(#g_${page})`} />
            <path d="M0 48 Q40 24 80 36 T160 18 T240 28 T318 8" stroke={c.pos} strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="318" cy="8" r="3.5" fill={c.pos} />
          </svg>

          <div style={{
            marginTop: 12, display: 'flex',
            background: dark ? 'rgba(120,120,128,0.24)' : 'rgba(120,120,128,0.12)',
            borderRadius: 9, padding: 2, fontSize: 13, fontWeight: 600
          }}>
            {['1M', '3M', 'YTD', '1Y', 'Max'].map((tt, i) =>
            <div key={tt} style={{
              flex: 1, textAlign: 'center', padding: '6px 0', borderRadius: 7,
              background: i === 0 ? c.surface2 : 'transparent',
              color: i === 0 ? c.text : c.text2,
              boxShadow: i === 0 ? '0 1px 2px rgba(0,0,0,0.1)' : 'none'
            }}>{tt}</div>
            )}
          </div>
        </Card>
      </div>

      {/* In/Out tiles */}
      <div style={{ padding: '0 18px', marginBottom: 22, display: 'flex', gap: 10 }}>
        <Card style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: c.text2, fontSize: 12, fontWeight: 500 }}>
            <span style={{ width: 18, height: 18, borderRadius: 6, background: c.posBg, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: c.pos }}>↗</span>
            Income
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, marginTop: 6, fontFeatureSettings: '"tnum"', letterSpacing: -0.3 }}>
            <span style={{ fontSize: 13, color: c.text2, marginRight: 2 }}>RM</span>9,959<span style={{ color: c.text2, fontSize: 14 }}>.00</span>
          </div>
        </Card>
        <Card style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: c.text2, fontSize: 12, fontWeight: 500 }}>
            <span style={{ width: 18, height: 18, borderRadius: 6, background: c.negBg, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: c.neg }}>↘</span>
            Expenses
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, marginTop: 6, fontFeatureSettings: '"tnum"', letterSpacing: -0.3 }}>
            <span style={{ fontSize: 13, color: c.text2, marginRight: 2 }}>RM</span>2,828<span style={{ color: c.text2, fontSize: 14 }}>.38</span>
          </div>
        </Card>
      </div>

      {/* Recent */}
      <div style={{ padding: '0 18px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 4px 8px' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: c.text2, textTransform: 'uppercase', letterSpacing: 0.4 }}>Recent</div>
          <div style={{ fontSize: 14, color: c.tint, fontWeight: 500 }}>See All</div>
        </div>
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          {[
          { name: 'Client Retainer', date: '6 May · Saffron Park', amount: '3,600.00', kind: 'pos', status: 'PAID' },
          { name: 'Hardware/Gear', date: '1 May · Saffron Park', amount: '2,828.38', kind: 'neg' },
          { name: 'Stock Footage', date: '28 Apr · Greenline', amount: '120.00', kind: 'neg' }].
          map((t, i, a) =>
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: dense ? '11px 16px' : '14px 16px',
            borderBottom: i < a.length - 1 ? `0.5px solid ${c.sep}` : 'none'
          }}>
              <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: t.kind === 'pos' ? c.posBg : c.negBg,
              color: t.kind === 'pos' ? c.pos : c.neg,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, fontWeight: 700
            }}>{t.kind === 'pos' ? '↗' : '↙'}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 500, letterSpacing: -0.2 }}>{t.name}</div>
                <div style={{ color: c.text2, fontSize: 12, marginTop: 1 }}>{t.date}</div>
              </div>
              {t.status &&
            <div style={{ background: c.posBg, color: c.pos, padding: '2px 8px', borderRadius: 999, fontSize: 10, fontWeight: 700, letterSpacing: 0.4 }}>{t.status}</div>
            }
              <div style={{ fontSize: 15, fontWeight: 600, color: t.kind === 'pos' ? c.pos : c.neg, fontFeatureSettings: '"tnum"' }}>
                {t.kind === 'pos' ? '+' : '−'} {t.amount}
              </div>
            </div>
          )}
        </Card>
      </div>

      <_TabBar active="home" dark={dark} />
    </div>);

};

// ─────────────────────────────────────────────────────
// LEDGER B — grouped by date
// ─────────────────────────────────────────────────────
const MidFi_Ledger = ({ dark = true, radius = 20, density = 'comfy' }) => {
  const c = _COL[dark ? 'dark' : 'light'];
  const Card = _Card(dark, radius);
  const dense = density === 'compact';

  const Group = ({ title, items }) =>
  <div style={{ marginBottom: 16 }}>
      <div style={{ padding: '0 22px 6px', fontSize: 13, fontWeight: 600, color: c.text2, textTransform: 'uppercase', letterSpacing: 0.4 }}>{title}</div>
      <div style={{ padding: '0 18px' }}>
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          {items.map((t, i) =>
        <div key={i} style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: dense ? '11px 16px' : '14px 16px',
          borderBottom: i < items.length - 1 ? `0.5px solid ${c.sep}` : 'none'
        }}>
              <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: t.kind === 'pos' ? c.posBg : c.negBg,
            color: t.kind === 'pos' ? c.pos : c.neg,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, fontWeight: 700
          }}>{t.kind === 'pos' ? '↗' : '↙'}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 500, letterSpacing: -0.2 }}>{t.name}</div>
                <div style={{ color: c.text2, fontSize: 12, marginTop: 1 }}>{t.date}</div>
              </div>
              {t.status && <div style={{ background: c.posBg, color: c.pos, padding: '2px 8px', borderRadius: 999, fontSize: 10, fontWeight: 700, letterSpacing: 0.4 }}>{t.status}</div>}
              <div style={{ fontSize: 15, fontWeight: 600, color: t.kind === 'pos' ? c.pos : c.neg, fontFeatureSettings: '"tnum"' }}>
                {t.kind === 'pos' ? '+' : '−'} {t.amount}
              </div>
            </div>
        )}
        </Card>
      </div>
    </div>;


  return (
    <div style={{ background: c.bg, color: c.text, height: '100%', boxSizing: 'border-box', fontFamily: _SF, paddingBottom: 96, position: 'relative', overflow: 'auto' }}>
      <_LargeTitle title="Ledger" dark={dark} trailing={
      <div style={{
        width: 36, height: 36, borderRadius: 10, background: c.surface,
        display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.tint, fontSize: 16
      }}>↓</div>
      } />

      {/* search */}
      <div style={{ padding: '0 18px 12px' }}>
        <div style={{
          background: dark ? 'rgba(120,120,128,0.24)' : 'rgba(118,118,128,0.12)',
          borderRadius: 10, padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 6,
          color: c.text2, fontSize: 15
        }}>
          <span>⌕</span><span>Search</span>
        </div>
      </div>

      {/* filter chips */}
      <div style={{ padding: '0 18px 18px', display: 'flex', gap: 6, overflowX: 'auto' }}>
        {[
        { l: 'Pending', active: true, tone: c.neg },
        { l: '1M' }, { l: '3M' }, { l: 'YTD' }, { l: '1Y' }, { l: 'Custom' }].
        map((f, i) =>
        <div key={i} style={{
          padding: '6px 12px', borderRadius: 999,
          background: f.active ? f.tone || c.text : dark ? 'rgba(120,120,128,0.18)' : 'rgba(118,118,128,0.1)',
          color: f.active ? '#fff' : c.text,
          fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap'
        }}>{f.l}</div>
        )}
      </div>

      <Group title="Today · 6 May" items={[
      { name: 'Client Retainer', date: '11:32 · Saffron Park', amount: '3,600.00', kind: 'pos', status: 'PAID' }]
      } />
      <Group title="This week" items={[
      { name: 'Hardware/Gear', date: '1 May · Saffron Park', amount: '2,828.38', kind: 'neg' },
      { name: 'Stock Footage', date: '30 Apr · Greenline', amount: '120.00', kind: 'neg' }]
      } />
      <Group title="April" items={[
      { name: 'Client Retainer', date: '9 Apr · Saffron Park', amount: '6,359.00', kind: 'pos', status: 'PAID' },
      { name: 'Adobe CC', date: '5 Apr · auto', amount: '89.00', kind: 'neg' }]
      } />

      <_TabBar active="ledger" dark={dark} />
    </div>);

};

// ─────────────────────────────────────────────────────
// PROJECTS B — accordion
// ─────────────────────────────────────────────────────
const MidFi_Projects = ({ dark = true, radius = 20, density = 'comfy' }) => {
  const c = _COL[dark ? 'dark' : 'light'];
  const Card = _Card(dark, radius);
  const dense = density === 'compact';
  const [open, setOpen] = React.useState('saffron');
  const projects = [
  { id: 'saffron', name: 'Saffron Park Residences', state: 'Active', net: '771.62', tone: '#5AA9FF' },
  { id: 'greenline', name: 'Greenline Spec Reel', state: 'Active', net: '1,240.00', tone: '#30D158' },
  { id: 'brand', name: 'Q2 Brand Campaign', state: 'Wrapped', net: '4,200.00', tone: '#FFB800' }];


  return (
    <div style={{ background: c.bg, color: c.text, height: '100%', boxSizing: 'border-box', fontFamily: _SF, paddingBottom: 96, position: 'relative', overflow: 'auto' }}>
      <_LargeTitle title="Projects" dark={dark} trailing={
      <div style={{
        padding: '6px 12px 6px 10px', borderRadius: 999, background: c.tint,
        color: '#fff', fontSize: 13, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4
      }}>+ New</div>
      } />

      <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {projects.map((p) => {
          const isOpen = open === p.id;
          return (
            <Card key={p.id} style={{ padding: 0, overflow: 'hidden' }}>
              <div onClick={() => setOpen(isOpen ? null : p.id)} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', cursor: 'pointer'
              }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: p.tone, opacity: 0.85, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14 }}>📁</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: -0.2 }}>{p.name}</div>
                  <div style={{ color: c.text2, fontSize: 12, marginTop: 1 }}>
                    {p.state} · Net <span style={{ color: c.pos, fontWeight: 600 }}>RM {p.net}</span>
                  </div>
                </div>
                <svg width="12" height="8" viewBox="0 0 12 8" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>
                  <path d="M1 1l5 5 5-5" stroke={c.text2} strokeWidth="2" fill="none" strokeLinecap="round" />
                </svg>
              </div>

              {isOpen &&
              <div style={{ padding: '0 16px 16px' }}>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                    {[
                  { l: 'Income', v: '3,600', k: 'pos' },
                  { l: 'Expenses', v: '2,828', k: 'neg' },
                  { l: 'Net P&L', v: p.net.split('.')[0], k: 'pos' }].
                  map((s, i) =>
                  <div key={i} style={{
                    flex: 1, padding: 10, borderRadius: 12,
                    background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)'
                  }}>
                        <div style={{ fontSize: 11, color: c.text2 }}>{s.l}</div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: s.k === 'pos' ? c.pos : c.neg, fontFeatureSettings: '"tnum"', marginTop: 2 }}>
                          RM {s.v}
                        </div>
                      </div>
                  )}
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: c.text2, textTransform: 'uppercase', letterSpacing: 0.4, padding: '0 4px 6px' }}>Transactions</div>
                  {[
                { name: 'Client Retainer', date: '6 May', amount: '3,600.00', kind: 'pos' },
                { name: 'Hardware/Gear', date: '1 May', amount: '2,828.38', kind: 'neg' }].
                map((t, i, a) =>
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', padding: '8px 4px',
                  borderBottom: i < a.length - 1 ? `0.5px solid ${c.sep}` : 'none', fontSize: 14
                }}>
                      <div>
                        <div style={{ fontWeight: 500 }}>{t.name}</div>
                        <div style={{ color: c.text2, fontSize: 12 }}>{t.date}</div>
                      </div>
                      <div style={{ color: t.kind === 'pos' ? c.pos : c.neg, fontWeight: 600, fontFeatureSettings: '"tnum"' }}>
                        {t.kind === 'pos' ? '+' : '−'} {t.amount}
                      </div>
                    </div>
                )}
                </div>
              }
            </Card>);

        })}
      </div>

      <_TabBar active="projects" dark={dark} />
    </div>);

};

// ─────────────────────────────────────────────────────
// ADD C — scan-first
// ─────────────────────────────────────────────────────
const MidFi_Add = ({ dark = true, radius = 20 }) => {
  const c = _COL.dark; // scan camera always dark
  return (
    <div style={{ background: '#000', color: '#fff', height: '100%', boxSizing: 'border-box', fontFamily: _SF, position: 'relative', overflow: 'hidden' }}>
      {/* faux camera viewfinder — dark gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 40%, #2a2622 0%, #0a0908 70%)'
      }} />

      {/* scanned receipt placeholder (centered, with glow frame) */}
      <div style={{
        position: 'absolute', top: 110, left: 40, right: 40, bottom: 250,
        background: '#f5f1e8', borderRadius: 8,
        boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)',
        transform: 'rotate(-2deg)',
        padding: '16px 14px', fontFamily: '"SF Mono", ui-monospace, monospace',
        color: '#1a1816', fontSize: 10, lineHeight: 1.6, overflow: 'hidden'
      }}>
        <div style={{ fontWeight: 700, fontSize: 12 }}>B&H PHOTO VIDEO</div>
        <div style={{ opacity: 0.6 }}>420 9th Ave, NYC</div>
        <div style={{ borderTop: '1px dashed #1a1816', margin: '8px 0', opacity: 0.4 }} />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>SSD 2TB</span><span>1,899.00</span></div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>SD card 256GB</span><span>129.38</span></div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Tripod plate</span><span>800.00</span></div>
        <div style={{ borderTop: '1px dashed #1a1816', margin: '8px 0', opacity: 0.4 }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}><span>TOTAL</span><span>2,828.38</span></div>
      </div>

      {/* viewfinder corners */}
      {[['top-left', 0, 0], ['top-right', 1, 0], ['bottom-left', 0, 1], ['bottom-right', 1, 1]].map(([k, x, y]) =>
      <div key={k} style={{
        position: 'absolute', width: 28, height: 28,
        left: x ? 'auto' : 26, right: x ? 26 : 'auto',
        top: y ? 'auto' : 96, bottom: y ? 264 : 'auto',
        borderTop: y ? 'none' : '3px solid #fff',
        borderBottom: y ? '3px solid #fff' : 'none',
        borderLeft: x ? 'none' : '3px solid #fff',
        borderRight: x ? '3px solid #fff' : 'none',
        borderTopLeftRadius: !x && !y ? 8 : 0,
        borderTopRightRadius: x && !y ? 8 : 0,
        borderBottomLeftRadius: !x && y ? 8 : 0,
        borderBottomRightRadius: x && y ? 8 : 0,
        opacity: 0.9
      }} />
      )}

      {/* top bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(20px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 18
        }}>×</div>
        <div style={{ fontSize: 15, fontWeight: 600 }}>Scan Receipt</div>
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(20px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFB800', fontSize: 16
        }}>⚡</div>
      </div>

      {/* parsed result card */}
      <div style={{
        position: 'absolute', bottom: 130, left: 18, right: 18,
        background: 'rgba(28,28,30,0.85)', backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderRadius: radius, padding: 16, color: '#fff',
        border: '0.5px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, color: c.pos, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: c.pos }} />
          Detected
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 8 }}>
          <div style={{ fontSize: 17, fontWeight: 600 }}>B&H Photo</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: c.neg, fontFeatureSettings: '"tnum"' }}>− RM 2,828.38</div>
        </div>
        <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
          {['Hardware/Gear', 'Saffron Park', '1 May 2026'].map((t) =>
          <div key={t} style={{
            padding: '4px 10px', borderRadius: 999,
            background: 'rgba(255,255,255,0.1)', fontSize: 12, fontWeight: 500
          }}>{t}</div>
          )}
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
          <div style={{
            flex: 1, padding: '12px', borderRadius: 12, textAlign: 'center',
            background: 'rgba(255,255,255,0.1)', fontSize: 14, fontWeight: 600
          }}>Edit</div>
          <div style={{
            flex: 2, padding: '12px', borderRadius: 12, textAlign: 'center',
            background: c.pos, color: '#000', fontSize: 14, fontWeight: 700
          }}>Save Transaction</div>
        </div>
      </div>

      {/* shutter row */}
      <div style={{ position: 'absolute', bottom: 30, left: 0, right: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 32px' }}>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>Manual</div>
        <div style={{
          width: 64, height: 64, borderRadius: '50%',
          border: '3px solid rgba(255,255,255,0.9)', padding: 4, boxSizing: 'border-box'
        }}>
          <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#fff' }} />
        </div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>Album</div>
      </div>
    </div>);

};

// ─────────────────────────────────────────────────────
// TXN DETAIL A — clean iOS
// ─────────────────────────────────────────────────────
const MidFi_Detail = ({ dark = true, radius = 20 }) => {
  const c = _COL[dark ? 'dark' : 'light'];
  const Card = _Card(dark, radius);
  return (
    <div style={{ background: c.bg, color: c.text, height: '100%', boxSizing: 'border-box', fontFamily: _SF, position: 'relative', overflow: 'auto' }}>
      <_LargeTitle title="Transaction" dark={dark} />

      {/* hero */}
      <div style={{ padding: '0 18px', marginBottom: 18 }}>
        <Card style={{ textAlign: 'center', padding: 24 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16, background: c.posBg, color: c.pos,
            margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 24, fontWeight: 700
          }}>↗</div>
          <div style={{ fontSize: 38, fontWeight: 700, color: c.pos, marginTop: 14, letterSpacing: -1, fontFeatureSettings: '"tnum"' }}>
            <span style={{ fontSize: 20, marginRight: 4 }}>RM</span>3,600<span style={{ fontSize: 22, opacity: 0.6 }}>.00</span>
          </div>
          <div style={{ color: c.text2, fontSize: 13, marginTop: 4 }}>Income · Client Retainer</div>
          <div style={{
            display: 'inline-block', marginTop: 10, padding: '3px 10px',
            background: c.posBg, color: c.pos, borderRadius: 999,
            fontSize: 11, fontWeight: 700, letterSpacing: 0.4
          }} data-comment-anchor="b69fb3cafc-div-554-11">PAID</div>
        </Card>
      </div>

      {/* details list */}
      <div style={{ padding: '0 18px', marginBottom: 14 }}>
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          {[
          ['Date', '6 May 2026'],
          ['Project', 'Saffron Park Residences', c.tint],
          ['Client', '—'],
          ['Reference', '—'],
          ['Receipt', '📎 receipt.pdf', c.tint]].
          map(([k, v, col], i, a) =>
          <div key={k} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '14px 16px', fontSize: 15,
            borderBottom: i < a.length - 1 ? `0.5px solid ${c.sep}` : 'none'
          }}>
              <span style={{ color: c.text2 }}>{k}</span>
              <span style={{ color: col || c.text, fontWeight: col ? 500 : 400 }}>{v}</span>
            </div>
          )}
        </Card>
      </div>

      {/* actions */}
      <div style={{ padding: '0 18px', display: 'flex', gap: 10 }}>
        <div style={{
          flex: 1, padding: 14, borderRadius: 14, textAlign: 'center',
          background: c.tint, color: '#fff', fontSize: 15, fontWeight: 600
        }}>✎ Edit</div>
        <div style={{
          flex: 1, padding: 14, borderRadius: 14, textAlign: 'center',
          background: c.surface, color: c.neg, fontSize: 15, fontWeight: 600,
          border: `0.5px solid ${c.sep}`
        }}>🗑 Delete</div>
      </div>
    </div>);

};

// ─────────────────────────────────────────────────────
// SETTINGS B — profile + icon rows + SWIPEABLE account switcher
// ─────────────────────────────────────────────────────
const MidFi_Settings = ({ dark = true, radius = 20, density = 'comfy' }) => {
  const c = _COL[dark ? 'dark' : 'light'];
  const Card = _Card(dark, radius);
  const dense = density === 'compact';
  const [page, setPage] = React.useState(0);

  const accounts = [
  { name: 'Filmpeak Studio', type: 'Business · 3 projects', tone: 'linear-gradient(135deg, #FF6B3D, #E0451F)', initial: 'F' },
  { name: 'Saffron LLC', type: 'Business · 1 project', tone: 'linear-gradient(135deg, #5AA9FF, #2070D8)', initial: 'S' },
  { name: 'Personal', type: 'Personal · 0 projects', tone: 'linear-gradient(135deg, #BFB39A, #6E6655)', initial: 'P' }];

  const a = accounts[page];

  return (
    <div style={{ background: c.bg, color: c.text, height: '100%', boxSizing: 'border-box', fontFamily: _SF, paddingBottom: 96, position: 'relative', overflow: 'auto' }}>
      <_LargeTitle title="Settings" dark={dark} />

      {/* swipeable account card */}
      <div style={{ padding: '0 18px', marginBottom: 22 }}>
        <Card style={{ padding: 18, position: 'relative' }}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <div style={{
              width: 52, height: 52, borderRadius: 16, background: a.tone,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontSize: 22, fontWeight: 700
            }}>{a.initial}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: -0.2 }}>{a.name}</div>
              <div style={{ color: c.text2, fontSize: 13, marginTop: 2 }}>{a.type}</div>
            </div>
            <div style={{
              padding: '6px 10px', borderRadius: 999,
              background: dark ? 'rgba(120,120,128,0.24)' : 'rgba(118,118,128,0.12)',
              color: c.tint, fontSize: 12, fontWeight: 600
            }}>Manage</div>
          </div>

          {/* page dots + arrow hint */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14 }}>
            <div style={{ color: c.text2, fontSize: 11, fontWeight: 500 }}>← swipe to switch →</div>
            <div style={{ display: 'flex', gap: 5 }}>
              {accounts.map((_, i) =>
              <span key={i} onClick={() => setPage(i)} style={{
                width: 7, height: 7, borderRadius: '50%',
                background: i === page ? c.text : c.text3, cursor: 'pointer',
                transition: 'background 0.15s'
              }} />
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* preferences */}
      <div style={{ padding: '0 22px 6px', fontSize: 13, fontWeight: 600, color: c.text2, textTransform: 'uppercase', letterSpacing: 0.4 }}>Preferences</div>
      <div style={{ padding: '0 18px', marginBottom: 22 }}>
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          {[
          { g: '💱', l: 'Base Currency', v: 'RM (MYR)', tint: '#5AA9FF' },
          { g: '🔒', l: 'Face ID', v: 'On', tint: '#30D158' },
          { g: '🌗', l: 'Appearance', v: 'Auto', tint: '#A78BFA' },
          { g: '🔔', l: 'Notifications', v: '3 enabled', tint: '#FF6B3D' },
          { g: '🚀', l: 'Default on Launch', v: a.name, tint: '#FFB800' }].
          map((row, i, arr) =>
          <div key={row.l} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: dense ? '11px 16px' : '14px 16px',
            borderBottom: i < arr.length - 1 ? `0.5px solid ${c.sep}` : 'none'
          }}>
              <div style={{
              width: 30, height: 30, borderRadius: 8, background: row.tint,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14
            }}>{row.g}</div>
              <div style={{ flex: 1, fontSize: 15, fontWeight: 500 }}>{row.l}</div>
              <div style={{ color: c.text2, fontSize: 14 }}>{row.v}</div>
              <svg width="8" height="14" viewBox="0 0 8 14"><path d="M1 1l6 6-6 6" stroke={c.text3} strokeWidth="2" fill="none" strokeLinecap="round" /></svg>
            </div>
          )}
        </Card>
      </div>

      {/* recurring */}
      <div style={{ padding: '0 22px 6px', fontSize: 13, fontWeight: 600, color: c.text2, textTransform: 'uppercase', letterSpacing: 0.4 }}>Recurring</div>
      <div style={{ padding: '0 18px', marginBottom: 22 }}>
        <Card style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ color: c.text2, fontSize: 14 }}>No recurring entries</div>
          <div style={{
            padding: '6px 12px', borderRadius: 999, background: c.tint, color: '#fff',
            fontSize: 13, fontWeight: 600
          }}>+ Add</div>
        </Card>
      </div>

      <_TabBar active="settings" dark={dark} />
    </div>);

};

Object.assign(window, {
  MidFi_Dashboard_D, MidFi_Ledger, MidFi_Projects, MidFi_Add, MidFi_Detail, MidFi_Settings
});