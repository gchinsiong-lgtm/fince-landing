// V1 LEDGER + PROJECTS — richer chrome, group totals, summary strip, budget burn

const HiFi_Ledger = ({ dark = true }) => {
  const c = window.FINCE.TOKENS[dark ? 'dark' : 'light'];
  const { FONT_UI, FONT_MONO } = window.FINCE;

  const Group = ({ title, total, items }) => (
    <div style={{ marginBottom: 18 }}>
      <SectionHeader dark={dark} action={
        <div style={{
          fontFamily: FONT_MONO, fontSize: 11, fontWeight: 500,
          color: c.ink2, letterSpacing: 0.4,
        }}>{total}</div>
      }>{title}</SectionHeader>
      <div style={{ padding: '0 18px' }}>
        <Card dark={dark} padding={0} style={{ overflow: 'hidden' }}>
          {items.map((t, i) => (
            <TxnRow key={i} dark={dark} t={t} last={i === items.length - 1} />
          ))}
        </Card>
      </div>
    </div>
  );

  return (
    <div style={{
      background: c.bgGrad, color: c.ink, height: '100%',
      fontFamily: FONT_UI, paddingBottom: 110, position: 'relative', overflow: 'auto',
      boxSizing: 'border-box',
    }}>
      <LargeTitle title="Ledger" dark={dark} trailing={
        <div style={{ display: 'flex', gap: 8 }}>
          <ChromeButton dark={dark} icon="filter" />
          <ChromeButton dark={dark} icon="arrowDownTray" />
        </div>
      } />

      <div style={{ padding: '0 22px 14px' }}>
        <div style={{
          background: c.surface, borderRadius: 14, padding: '11px 14px',
          display: 'flex', alignItems: 'center', gap: 10,
          color: c.ink3, fontSize: 15,
          boxShadow: c.cardShadow,
          border: dark ? `0.5px solid ${c.hairline}` : 'none',
        }}>
          <Icon name="search" size={18} color={c.ink2} />
          <span style={{ color: c.ink2 }}>Search transactions, clients, projects…</span>
          <div style={{ flex: 1 }} />
          <span style={{
            width: 22, height: 22, borderRadius: 6,
            background: dark ? 'rgba(255,255,255,0.07)' : 'rgba(20,19,15,0.06)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: FONT_MONO, fontSize: 10, fontWeight: 600, color: c.ink2,
          }}>⌘K</span>
        </div>
      </div>

      <div style={{ padding: '0 22px 18px', display: 'flex', gap: 6, overflowX: 'auto', flexWrap: 'nowrap' }}>
        {[
          { l: 'Pending', active: true, dot: c.brand, count: 3 },
          { l: 'All' }, { l: '30 days' }, { l: 'YTD' }, { l: '2026' },
          { l: 'Custom', trailing: <Icon name="chevronDown" size={11} stroke={2.4} color="currentColor" /> },
        ].map((f, i) => (
          <div key={i} style={{
            padding: '8px 14px', borderRadius: 999,
            background: f.active ? c.ink : c.surface,
            color: f.active ? (dark ? c.bg : '#fff') : c.ink,
            fontFamily: FONT_UI, fontSize: 13, fontWeight: 600,
            display: 'inline-flex', alignItems: 'center', gap: 6,
            whiteSpace: 'nowrap',
            boxShadow: f.active ? 'none' : c.cardShadow,
            border: !f.active && dark ? `0.5px solid ${c.hairline}` : 'none',
          }}>
            {f.dot && <span style={{ width: 6, height: 6, borderRadius: 3, background: f.dot }} />}
            {f.l}
            {f.count && (
              <span style={{
                background: dark ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.25)',
                padding: '0 6px', borderRadius: 999,
                fontSize: 11, fontWeight: 700, fontFeatureSettings: '"tnum"',
              }}>{f.count}</span>
            )}
            {f.trailing}
          </div>
        ))}
      </div>

      <Group title="Today · 6 May" total="+ RM 3,600.00" items={[
        { name: 'Client Retainer', date: '11:32 · Saffron Park · Filmpeak', amount: '3,600.00', kind: 'pos', status: 'PAID' },
      ]} />
      <Group title="This week" total="− RM 2,948.38" items={[
        { name: 'B&H Photo · Hardware', date: '1 May · Saffron Park',  amount: '2,828.38', kind: 'neg' },
        { name: 'Pond5 · Stock Footage', date: '30 Apr · Greenline',    amount: '120.00',   kind: 'neg' },
      ]} />
      <Group title="April" total="+ RM 6,270.00" items={[
        { name: 'Client Retainer', date: '9 Apr · Saffron Park', amount: '6,359.00', kind: 'pos', status: 'PAID' },
        { name: 'Adobe Creative Cloud', date: '5 Apr · auto-debit', amount: '89.00', kind: 'neg' },
      ]} />

      <TabBar active="ledger" dark={dark} />
    </div>
  );
};

const HiFi_Projects = ({ dark = true }) => {
  const c = window.FINCE.TOKENS[dark ? 'dark' : 'light'];
  const { FONT_UI, FONT_MONO, FONT_SERIF, WORKSPACE_TONES } = window.FINCE;
  const [open, setOpen] = React.useState('saffron');

  const projects = [
    { id: 'saffron',   name: 'Saffron Park Residences', client: 'Saffron LLC',  state: 'active',  net: '771.62',   budget: 78,  tone: WORKSPACE_TONES.saffron,   initial: 'S' },
    { id: 'greenline', name: 'Greenline Spec Reel',      client: 'Greenline Co', state: 'active',  net: '1,240.00', budget: 42,  tone: WORKSPACE_TONES.greenline, initial: 'G' },
    { id: 'brand',     name: 'Q2 Brand Campaign',         client: 'Filmpeak',     state: 'wrapped', net: '4,200.00', budget: 100, tone: WORKSPACE_TONES.brand,     initial: 'B' },
  ];

  return (
    <div style={{
      background: c.bgGrad, color: c.ink, height: '100%',
      fontFamily: FONT_UI, paddingBottom: 110, position: 'relative', overflow: 'auto',
      boxSizing: 'border-box',
    }}>
      <LargeTitle title="Projects" dark={dark} trailing={
        <div style={{
          padding: '8px 14px 8px 12px', borderRadius: 999,
          background: c.ink, color: dark ? c.bg : '#fff',
          fontFamily: FONT_UI, fontSize: 13, fontWeight: 600,
          display: 'inline-flex', alignItems: 'center', gap: 6,
        }}>
          <Icon name="plus" size={13} stroke={2.6} color={dark ? c.bg : '#fff'} />New
        </div>
      } />

      <div style={{ padding: '0 22px 18px' }}>
        <div style={{ display: 'flex', gap: 16 }}>
          {[
            { l: 'Active', v: '2', accent: c.pos },
            { l: 'Wrapped', v: '1', accent: c.ink2 },
            { l: 'Avg margin', v: '32%', accent: c.brand },
          ].map(s => (
            <div key={s.l} style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: c.ink2, letterSpacing: 1, textTransform: 'uppercase' }}>{s.l}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 4 }}>
                <span style={{ width: 5, height: 5, borderRadius: 3, background: s.accent }} />
                <div style={{
                  fontFamily: FONT_SERIF, fontSize: 24, fontWeight: 400, color: c.ink,
                  letterSpacing: -0.5, lineHeight: 1, fontFeatureSettings: '"tnum"',
                }}>{s.v}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {projects.map((p) => {
          const isOpen = open === p.id;
          return (
            <Card key={p.id} dark={dark} padding={0} style={{ overflow: 'hidden' }}>
              <div onClick={() => setOpen(isOpen ? null : p.id)} style={{
                display: 'flex', alignItems: 'center', gap: 14, padding: '16px 16px', cursor: 'pointer',
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12,
                  background: p.tone.grad,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontFamily: FONT_SERIF, fontSize: 20, fontWeight: 400, fontStyle: 'italic',
                  boxShadow: 'inset 0 0.5px 0 rgba(255,255,255,0.45)',
                }}>{p.initial}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: -0.2, color: c.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                    <span style={{
                      fontFamily: FONT_UI, fontSize: 10, fontWeight: 700, letterSpacing: 0.6,
                      textTransform: 'uppercase',
                      padding: '2px 7px', borderRadius: 999,
                      background: p.state === 'active' ? c.posBg : (dark ? 'rgba(255,255,255,0.06)' : 'rgba(20,19,15,0.06)'),
                      color: p.state === 'active' ? c.pos : c.ink2,
                    }}>{p.state}</span>
                    <span style={{ fontSize: 12, color: c.ink2 }}>{p.client}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    fontFamily: FONT_UI, fontSize: 15, fontWeight: 700, color: c.pos,
                    fontFeatureSettings: '"tnum"',
                  }}>+{p.net}</div>
                  <div style={{ fontSize: 10, color: c.ink3, marginTop: 2, fontFamily: FONT_MONO, letterSpacing: 0.4 }}>NET</div>
                </div>
                <Icon name="chevronDown" size={16} color={c.ink2} stroke={2}
                      style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }} />
              </div>

              {isOpen && (
                <div style={{ padding: '0 16px 18px', borderTop: `0.5px solid ${c.sep}` }}>
                  <div style={{ padding: '14px 0 16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <div style={{ fontSize: 12, color: c.ink2, fontWeight: 500 }}>Budget burn</div>
                      <div style={{ fontFamily: FONT_MONO, fontSize: 12, fontWeight: 600, color: c.ink, fontFeatureSettings: '"tnum"' }}>
                        <span style={{ color: c.ink2 }}>RM 11.7k of</span> 15.0k · {p.budget}%
                      </div>
                    </div>
                    <div style={{
                      marginTop: 8, height: 6, borderRadius: 3,
                      background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(20,19,15,0.06)',
                      overflow: 'hidden', position: 'relative',
                    }}>
                      <div style={{
                        width: `${p.budget}%`, height: '100%', borderRadius: 3,
                        background: `linear-gradient(90deg, ${p.tone.accent} 0%, ${c.brand} 100%)`,
                      }} />
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                    {[
                      { l: 'Income',   v: '3,600', k: 'pos' },
                      { l: 'Expenses', v: '2,828', k: 'neg' },
                      { l: 'Margin',   v: '21%',   k: 'ink' },
                    ].map((s, i) => (
                      <div key={i} style={{
                        flex: 1, padding: '10px 12px', borderRadius: 12,
                        background: dark ? 'rgba(255,255,255,0.04)' : c.surface2,
                      }}>
                        <div style={{ fontSize: 10, fontWeight: 600, color: c.ink2, letterSpacing: 0.4, textTransform: 'uppercase' }}>{s.l}</div>
                        <div style={{
                          fontFamily: FONT_UI, fontSize: 14, fontWeight: 700, marginTop: 4,
                          color: s.k === 'pos' ? c.pos : c.ink,
                          fontFeatureSettings: '"tnum"',
                        }}>
                          {s.k === 'ink' ? s.v : <><span style={{ fontSize: 10, color: c.ink2, marginRight: 2 }}>RM</span>{s.v}</>}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ fontSize: 10, fontWeight: 700, color: c.ink2, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Latest in project</div>
                  {[
                    { name: 'Client Retainer', date: '6 May', amount: '3,600.00', kind: 'pos' },
                    { name: 'B&H Photo · Gear', date: '1 May', amount: '2,828.38', kind: 'neg' },
                  ].map((t, i, a) => (
                    <div key={i} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '10px 0',
                      borderBottom: i < a.length - 1 ? `0.5px solid ${c.sep}` : 'none',
                    }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 500, color: c.ink }}>{t.name}</div>
                        <div style={{ fontSize: 11, color: c.ink2, marginTop: 1 }}>{t.date}</div>
                      </div>
                      <div style={{
                        fontFamily: FONT_UI, fontSize: 14, fontWeight: 700,
                        color: t.kind === 'pos' ? c.pos : c.ink,
                        fontFeatureSettings: '"tnum"',
                      }}>{t.kind === 'pos' ? '+' : '−'}{t.amount}</div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          );
        })}
      </div>

      <TabBar active="projects" dark={dark} />
    </div>
  );
};

window.HiFi_Ledger = HiFi_Ledger;
window.HiFi_Projects = HiFi_Projects;
