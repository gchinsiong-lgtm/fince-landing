// V1 DASHBOARD — with wordmark + greeting + tooltip + month axis

const HiFi_Dashboard = ({ dark = true }) => {
  const c = window.FINCE.TOKENS[dark ? 'dark' : 'light'];
  const { FONT_UI, FONT_MONO, FONT_SERIF, WORKSPACE_TONES } = window.FINCE;
  const tone = WORKSPACE_TONES.filmpeak;

  const chartData = [3.1, 2.4, 3.8, 4.1, 5.2, 4.9, 6.3, 5.7, 6.0, 7.4, 6.8, 7.1];
  const chartLabels = ['J','F','M','A','M','J','J','A','S','O','N','D'];
  const chartMax = Math.max(...chartData), chartMin = Math.min(...chartData);
  const W = 320, H = 84;
  const points = chartData.map((v, i) => {
    const x = (i / (chartData.length - 1)) * W;
    const y = H - ((v - chartMin) / (chartMax - chartMin)) * (H - 8) - 4;
    return [x, y];
  });
  const pathD = points.reduce((acc, [x,y], i) => {
    if (i === 0) return `M ${x} ${y}`;
    const [px, py] = points[i-1];
    return acc + ` C ${px + (x-px)/2} ${py}, ${px + (x-px)/2} ${y}, ${x} ${y}`;
  }, '');
  const areaD = pathD + ` L ${W} ${H} L 0 ${H} Z`;
  const focusIdx = chartData.length - 2;
  const [fx, fy] = points[focusIdx];

  return (
    <div style={{
      background: c.bgGrad, color: c.ink, height: '100%',
      fontFamily: FONT_UI, paddingBottom: 110, position: 'relative', overflow: 'hidden',
      boxSizing: 'border-box',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 22px 6px' }}>
        <Wordmark dark={dark} size={24} hairline />
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <ChromeButton dark={dark} icon="search" />
          <ChromeButton dark={dark} icon="bell" />
        </div>
      </div>

      <div style={{ padding: '12px 22px 16px' }}>
        <div style={{ fontFamily: FONT_SERIF, fontSize: 30, fontWeight: 400, letterSpacing: -0.6, lineHeight: 1.1, color: c.ink }}>
          Good morning, <span style={{ fontStyle: 'italic' }}>Aiman</span>.
        </div>
        <div style={{ fontFamily: FONT_UI, fontSize: 13, color: c.ink2, marginTop: 4 }}>
          Tuesday · 6 May · here's your month at a glance.
        </div>
      </div>

      <div style={{ padding: '0 22px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <WorkspacePill dark={dark} name="Filmpeak Studio" tone={WORKSPACE_TONES.filmpeak} initial="F" />
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', gap: 5 }}>
          {[0,1,2].map(i => (
            <span key={i} style={{
              width: i === 0 ? 14 : 6, height: 6, borderRadius: 3,
              background: i === 0 ? c.ink : c.ink4,
            }} />
          ))}
        </div>
      </div>

      <div style={{ padding: '0 18px 14px' }}>
        <Card dark={dark} radius={26} padding={22}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: 3, background: c.pos, boxShadow: `0 0 0 3px ${c.posBg}` }} />
                <div style={{ fontSize: 12, fontWeight: 600, color: c.ink2, letterSpacing: 0.4, textTransform: 'uppercase' }}>
                  Net Profit · YTD
                </div>
              </div>
              <div style={{ marginTop: 10 }}>
                <Money value="7,130.62" dark={dark} size={42} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 3,
                  background: c.posBg, color: c.pos,
                  padding: '3px 9px 3px 6px', borderRadius: 999,
                  fontFamily: FONT_UI, fontSize: 12, fontWeight: 700, fontFeatureSettings: '"tnum"',
                }}>
                  <Icon name="trendUp" size={12} stroke={2.4} />12.4%
                </span>
                <span style={{ color: c.ink2, fontSize: 12 }}>vs prior period</span>
              </div>
            </div>

            <div style={{
              display: 'flex',
              background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(20,19,15,0.05)',
              borderRadius: 10, padding: 2,
              fontSize: 11, fontWeight: 700, letterSpacing: 0.3,
            }}>
              {['1M','3M','1Y'].map((t, i) => (
                <div key={t} style={{
                  padding: '5px 9px', borderRadius: 8,
                  background: i === 2 ? c.surface2 : 'transparent',
                  color: i === 2 ? c.ink : c.ink2,
                  boxShadow: i === 2 ? c.cardShadow : 'none',
                }}>{t}</div>
              ))}
            </div>
          </div>

          <div style={{ position: 'relative', marginTop: 18, height: H }}>
            <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} style={{ display: 'block', overflow: 'visible' }} preserveAspectRatio="none">
              <defs>
                <linearGradient id={`grad-v1-${dark ? 'd' : 'l'}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={c.pos} stopOpacity={dark ? 0.30 : 0.22} />
                  <stop offset="100%" stopColor={c.pos} stopOpacity="0" />
                </linearGradient>
              </defs>
              <line x1="0" y1={H-1} x2={W} y2={H-1} stroke={c.sep} strokeWidth="0.5" />
              <path d={areaD} fill={`url(#grad-v1-${dark ? 'd' : 'l'})`} />
              <path d={pathD} stroke={c.pos} strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <line x1={fx} y1={0} x2={fx} y2={H} stroke={c.ink4} strokeWidth="0.5" strokeDasharray="2 3" />
              <circle cx={fx} cy={fy} r="8" fill={c.pos} fillOpacity="0.18" />
              <circle cx={fx} cy={fy} r="4" fill={c.surface} stroke={c.pos} strokeWidth="2" />
              <circle cx={points[points.length-1][0]} cy={points[points.length-1][1]} r="3.5" fill={c.pos} />
            </svg>
            <div style={{
              position: 'absolute', left: `${(fx / W) * 100}%`, top: -8,
              transform: 'translate(-50%, -100%)',
              background: c.ink, color: dark ? c.bg : '#fff',
              padding: '5px 10px', borderRadius: 8,
              fontFamily: FONT_UI, fontSize: 11, fontWeight: 600,
              whiteSpace: 'nowrap', boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
              fontFeatureSettings: '"tnum"',
            }}>
              Nov · RM 6,800
              <span style={{
                position: 'absolute', bottom: -3, left: '50%',
                transform: 'translateX(-50%) rotate(45deg)',
                width: 6, height: 6, background: c.ink,
              }} />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, padding: '0 2px' }}>
            {chartLabels.map((m, i) => (
              <div key={i} style={{
                fontFamily: FONT_MONO, fontSize: 9, fontWeight: 500,
                color: i === focusIdx ? c.ink : c.ink3, letterSpacing: 0.5,
              }}>{m}</div>
            ))}
          </div>
        </Card>
      </div>

      <div style={{ padding: '0 18px 22px', display: 'flex', gap: 10 }}>
        <Card dark={dark} radius={20} padding={16} style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{
              width: 22, height: 22, borderRadius: 7, background: c.posBg, color: c.pos,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            }}><Icon name="arrowDownLeft" size={13} stroke={2.4} /></span>
            <div style={{ fontSize: 12, fontWeight: 600, color: c.ink2, letterSpacing: 0.2 }}>Income</div>
          </div>
          <div style={{ marginTop: 8 }}><Money value="9,959.00" dark={dark} size={22} /></div>
          <div style={{ fontSize: 11, color: c.ink3, marginTop: 4, fontFamily: FONT_MONO, letterSpacing: 0.4 }}>
            ↗ 8 deposits
          </div>
        </Card>
        <Card dark={dark} radius={20} padding={16} style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{
              width: 22, height: 22, borderRadius: 7, background: c.negBg, color: c.neg,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            }}><Icon name="arrowUpRight" size={13} stroke={2.4} /></span>
            <div style={{ fontSize: 12, fontWeight: 600, color: c.ink2, letterSpacing: 0.2 }}>Expenses</div>
          </div>
          <div style={{ marginTop: 8 }}><Money value="2,828.38" dark={dark} size={22} /></div>
          <div style={{ fontSize: 11, color: c.ink3, marginTop: 4, fontFamily: FONT_MONO, letterSpacing: 0.4 }}>
            ↘ 14 charges
          </div>
        </Card>
      </div>

      <SectionHeader dark={dark} action={
        <div style={{ fontSize: 13, color: c.tint, fontWeight: 600, fontFamily: FONT_UI }}>See all</div>
      }>Recent activity</SectionHeader>
      <div style={{ padding: '0 18px' }}>
        <Card dark={dark} padding={0} style={{ overflow: 'hidden' }}>
          {[
            { name: 'Client Retainer · Saffron Park', date: 'Today · 11:32', amount: '3,600.00', kind: 'pos', status: 'PAID' },
            { name: 'B&H Photo · Hardware',           date: '1 May · receipt', amount: '2,828.38', kind: 'neg' },
            { name: 'Pond5 · Stock Footage',          date: '28 Apr · auto',  amount: '120.00',   kind: 'neg' },
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
