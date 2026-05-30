// Hi-fi Dashboard — mid-fi D structure, hi-fi polish only.
// Workspace hero + In/Out + Recent. No greeting, no top chrome, no tooltip.

const HiFi_Dashboard = ({ dark = true }) => {
  const c = window.FINCE.TOKENS[dark ? 'dark' : 'light'];
  const { FONT_UI, FONT_MONO, WORKSPACE_TONES } = window.FINCE;

  // Smooth net-profit sparkline data (same shape, just real points)
  const data = [3.1, 2.4, 3.8, 4.1, 5.2, 4.9, 6.3, 5.7, 6.0, 7.4, 6.8, 7.1];
  const W = 320, H = 64;
  const mx = Math.max(...data), mn = Math.min(...data);
  const pts = data.map((v, i) => [
    (i / (data.length - 1)) * W,
    H - ((v - mn) / (mx - mn)) * (H - 8) - 4,
  ]);
  const line = pts.reduce((acc, [x, y], i) => {
    if (i === 0) return `M ${x} ${y}`;
    const [px, py] = pts[i - 1];
    const cx = px + (x - px) / 2;
    return acc + ` C ${cx} ${py}, ${cx} ${y}, ${x} ${y}`;
  }, '');
  const area = line + ` L ${W} ${H} L 0 ${H} Z`;
  const [ex, ey] = pts[pts.length - 1];

  return (
    <div style={{
      background: c.bg, color: c.ink, height: '100%',
      fontFamily: FONT_UI, position: 'relative', overflow: 'auto',
      boxSizing: 'border-box',
    }}>
      <div style={{ padding: '14px 18px 4px' }} />

      {/* HERO — workspace card */}
      <div style={{ padding: '0 18px 18px' }}>
        <Card dark={dark} radius={20} padding={22}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 28, height: 28, borderRadius: 8,
              background: WORKSPACE_TONES.filmpeak.grad,
              boxShadow: 'inset 0 0.5px 0 rgba(255,255,255,0.4)',
            }} />
            <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: -0.2, color: c.ink }}>
              Filmpeak Studio
            </div>
            <div style={{ flex: 1 }} />
            <div style={{ display: 'flex', gap: 5 }}>
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  width: i === 0 ? 14 : 6, height: 6, borderRadius: 3,
                  background: i === 0 ? c.ink : c.ink4,
                }} />
              ))}
            </div>
          </div>

          <div style={{ color: c.ink2, fontSize: 13, marginTop: 18, fontWeight: 500 }}>
            Net Profit · this month
          </div>
          <div style={{ marginTop: 4 }}>
            <Money value="7,130.62" dark={dark} size={42} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 3,
              background: c.posBg, color: c.pos,
              padding: '3px 9px 3px 6px', borderRadius: 999,
              fontFamily: FONT_UI, fontSize: 12, fontWeight: 700,
              fontFeatureSettings: '"tnum"',
            }}>
              <Icon name="trendUp" size={12} stroke={2.4} />
              12%
            </span>
            <span style={{ color: c.ink2, fontSize: 12 }}>vs last month</span>
          </div>

          {/* Sparkline */}
          <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} style={{ display: 'block', marginTop: 14 }} preserveAspectRatio="none">
            <defs>
              <linearGradient id={`spark-${dark ? 'd' : 'l'}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={c.pos} stopOpacity={dark ? 0.3 : 0.22} />
                <stop offset="100%" stopColor={c.pos} stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={area} fill={`url(#spark-${dark ? 'd' : 'l'})`} />
            <path d={line} stroke={c.pos} strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx={ex} cy={ey} r="10" fill={c.pos} opacity="0.18" />
            <circle cx={ex} cy={ey} r="5" fill={c.pos} opacity="0.35" />
            <circle cx={ex} cy={ey} r="3.5" fill={c.pos} />
          </svg>

          {/* Range segmented */}
          <div style={{
            marginTop: 12, display: 'flex',
            background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(20,19,15,0.05)',
            borderRadius: 9, padding: 2, fontSize: 13, fontWeight: 600,
          }}>
            {['1M', '3M', 'YTD', '1Y', 'Max'].map((t, i) => (
              <div key={t} style={{
                flex: 1, textAlign: 'center', padding: '6px 0', borderRadius: 7,
                background: i === 0 ? c.surface2 : 'transparent',
                color: i === 0 ? c.ink : c.ink2,
                boxShadow: i === 0 ? c.cardShadow : 'none',
              }}>{t}</div>
            ))}
          </div>
        </Card>
      </div>

      {/* In / Out */}
      <div style={{ padding: '0 18px 22px', display: 'flex', gap: 10 }}>
        <Card dark={dark} radius={20} padding={16} style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: c.ink2, fontSize: 12, fontWeight: 500 }}>
            <span style={{
              width: 20, height: 20, borderRadius: 6, background: c.posBg, color: c.pos,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            }}><Icon name="arrowDownLeft" size={12} stroke={2.4} /></span>
            Income
          </div>
          <div style={{ marginTop: 8 }}><Money value="9,959.00" dark={dark} size={22} /></div>
        </Card>
        <Card dark={dark} radius={20} padding={16} style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: c.ink2, fontSize: 12, fontWeight: 500 }}>
            <span style={{
              width: 20, height: 20, borderRadius: 6, background: c.negBg, color: c.neg,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            }}><Icon name="arrowUpRight" size={12} stroke={2.4} /></span>
            Expenses
          </div>
          <div style={{ marginTop: 8 }}><Money value="2,828.38" dark={dark} size={22} /></div>
        </Card>
      </div>

      {/* Recent */}
      <SectionHeader dark={dark} action={
        <div style={{ fontSize: 14, color: c.tint, fontWeight: 500 }}>See All</div>
      }>Recent</SectionHeader>
      <div style={{ padding: '0 18px 120px' }}>
        <Card dark={dark} padding={0} style={{ overflow: 'hidden' }}>
          {[
            { name: 'Client Retainer',      date: '6 May · Saffron Park', amount: '3,600.00', kind: 'pos', status: 'PAID' },
            { name: 'Hardware/Gear',        date: '1 May · Saffron Park', amount: '2,828.38', kind: 'neg' },
            { name: 'Stock Footage',        date: '28 Apr · Greenline',   amount: '120.00',   kind: 'neg' },
            { name: 'Adobe Creative Cloud', date: '5 Apr · auto-debit',   amount: '89.00',    kind: 'neg' },
            { name: 'Client Retainer',      date: '9 Apr · Saffron Park', amount: '6,359.00', kind: 'pos', status: 'PAID' },
            { name: 'Studio Rent',          date: '1 Apr · Filmpeak',     amount: '1,200.00', kind: 'neg' },
            { name: 'Brand Sponsorship',    date: '28 Mar · Greenline',   amount: '2,400.00', kind: 'pos', status: 'PAID' },
            { name: 'Frame.io',             date: '25 Mar · auto',         amount: '45.00',    kind: 'neg' },
          ].map((t, i, a) => (
            <TxnRow key={i} dark={dark} t={t} last={i === a.length - 1} />
          ))}
        </Card>
      </div>

      <TabBar active="home" dark={dark} />
    </div>
  );
};

window.HiFi_Dashboard = HiFi_Dashboard;
