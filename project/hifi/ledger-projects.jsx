// Hi-fi Ledger — mid-fi B structure
// Hi-fi Projects — mid-fi B accordion structure

const HiFi_Ledger = ({ dark = true }) => {
  const c = window.FINCE.TOKENS[dark ? 'dark' : 'light'];
  const { FONT_UI } = window.FINCE;

  const Group = ({ title, items }) => (
    <div style={{ marginBottom: 16 }}>
      <SectionHeader dark={dark}>{title}</SectionHeader>
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
      background: c.bg, color: c.ink, height: '100%',
      fontFamily: FONT_UI, paddingBottom: 110, position: 'relative', overflow: 'auto',
      boxSizing: 'border-box',
    }}>
      <LargeTitle title="Ledger" dark={dark}
        trailing={<ChromeButton dark={dark} icon="arrowDownTray" color={c.tint} />} />

      {/* Search */}
      <div style={{ padding: '0 18px 12px' }}>
        <div style={{
          background: dark ? 'rgba(120,120,128,0.24)' : 'rgba(118,118,128,0.12)',
          borderRadius: 10, padding: '9px 12px',
          display: 'flex', alignItems: 'center', gap: 8,
          color: c.ink2, fontSize: 15,
        }}>
          <Icon name="search" size={16} color={c.ink2} stroke={2} />
          Search
        </div>
      </div>

      {/* Filter chips */}
      <div style={{ padding: '0 18px 18px', display: 'flex', gap: 6, overflowX: 'auto' }}>
        {[
          { l: 'Pending', active: true },
          { l: '1M' }, { l: '3M' }, { l: 'YTD' }, { l: '1Y' }, { l: 'Custom' },
        ].map((f, i) => (
          <div key={i} style={{
            padding: '7px 13px', borderRadius: 999,
            background: f.active ? c.red : dark ? 'rgba(120,120,128,0.18)' : 'rgba(118,118,128,0.10)',
            color: f.active ? '#fff' : c.ink,
            fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap',
            boxShadow: f.active ? `0 0 18px ${c.redGlow}` : 'none',
          }}>{f.l}</div>
        ))}
      </div>

      <Group title="Today · 6 May" items={[
        { name: 'Client Retainer', date: '11:32 · Saffron Park', amount: '3,600.00', kind: 'pos', status: 'PAID' },
      ]} />
      <Group title="This week" items={[
        { name: 'Hardware/Gear', date: '1 May · Saffron Park', amount: '2,828.38', kind: 'neg' },
        { name: 'Stock Footage', date: '30 Apr · Greenline',   amount: '120.00',   kind: 'neg' },
      ]} />
      <Group title="April" items={[
        { name: 'Client Retainer', date: '9 Apr · Saffron Park', amount: '6,359.00', kind: 'pos', status: 'PAID' },
        { name: 'Adobe CC',        date: '5 Apr · auto',          amount: '89.00',    kind: 'neg' },
      ]} />

      <TabBar active="ledger" dark={dark} />
    </div>
  );
};

// ─────────────────────────────────────────────────────
const HiFi_Projects = ({ dark = true }) => {
  const c = window.FINCE.TOKENS[dark ? 'dark' : 'light'];
  const { FONT_UI, WORKSPACE_TONES } = window.FINCE;
  const [open, setOpen] = React.useState('saffron');

  const projects = [
    { id: 'saffron',   name: 'Saffron Park Residences', state: 'Active',  net: '771.62',   tone: WORKSPACE_TONES.saffron,   initial: 'S' },
    { id: 'greenline', name: 'Greenline Spec Reel',     state: 'Active',  net: '1,240.00', tone: WORKSPACE_TONES.greenline, initial: 'G' },
    { id: 'brand',     name: 'Q2 Brand Campaign',       state: 'Wrapped', net: '4,200.00', tone: WORKSPACE_TONES.brand,     initial: 'B' },
  ];

  return (
    <div style={{
      background: c.bg, color: c.ink, height: '100%',
      fontFamily: FONT_UI, paddingBottom: 110, position: 'relative', overflow: 'auto',
      boxSizing: 'border-box',
    }}>
      <LargeTitle title="Projects" dark={dark} trailing={
        <div style={{
          padding: '7px 14px 7px 11px', borderRadius: 999,
          background: c.tint, color: '#fff',
          fontSize: 13, fontWeight: 600,
          display: 'inline-flex', alignItems: 'center', gap: 5,
        }}>
          <Icon name="plus" size={13} stroke={2.6} color="#fff" />
          New
        </div>
      } />

      <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {projects.map(p => {
          const isOpen = open === p.id;
          return (
            <Card key={p.id} dark={dark} padding={0} style={{ overflow: 'hidden' }}>
              <div onClick={() => setOpen(isOpen ? null : p.id)} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', cursor: 'pointer',
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: p.tone.grad,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: 15, fontWeight: 700,
                  boxShadow: 'inset 0 0.5px 0 rgba(255,255,255,0.4)',
                }}>{p.initial}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: -0.2, color: c.ink }}>{p.name}</div>
                  <div style={{ color: c.ink2, fontSize: 12, marginTop: 2 }}>
                    {p.state} · Net <span style={{ color: c.pos, fontWeight: 700, fontFeatureSettings: '"tnum"' }}>RM {p.net}</span>
                  </div>
                </div>
                <Icon name="chevronDown" size={14} color={c.ink2} stroke={2}
                      style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }} />
              </div>

              {isOpen && (
                <div style={{ padding: '0 16px 16px' }}>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                    {[
                      { l: 'Income',   v: '3,600', k: 'pos' },
                      { l: 'Expenses', v: '2,828', k: 'neg' },
                      { l: 'Net P&L',  v: p.net.split('.')[0], k: 'pos' },
                    ].map((s, i) => (
                      <div key={i} style={{
                        flex: 1, padding: 10, borderRadius: 12,
                        background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(20,19,15,0.04)',
                      }}>
                        <div style={{ fontSize: 11, color: c.ink2 }}>{s.l}</div>
                        <div style={{
                          fontSize: 14, fontWeight: 700, marginTop: 2,
                          color: s.k === 'pos' ? c.pos : c.neg,
                          fontFeatureSettings: '"tnum"',
                        }}>
                          <span style={{ fontSize: 10, color: c.ink2, marginRight: 2, fontWeight: 600 }}>RM</span>{s.v}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{
                    fontSize: 11, fontWeight: 700, color: c.ink2,
                    textTransform: 'uppercase', letterSpacing: 1.2, padding: '0 4px 8px',
                  }}>Transactions</div>
                  {[
                    { name: 'Client Retainer',   date: '6 May', amount: '3,600.00', kind: 'pos' },
                    { name: 'Hardware/Gear',     date: '1 May', amount: '2,828.38', kind: 'neg' },
                  ].map((t, i, a) => (
                    <div key={i} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '10px 4px',
                      borderBottom: i < a.length - 1 ? `0.5px solid ${c.sep}` : 'none',
                      fontSize: 14,
                    }}>
                      <div>
                        <div style={{ fontWeight: 500, color: c.ink }}>{t.name}</div>
                        <div style={{ color: c.ink2, fontSize: 12, marginTop: 1 }}>{t.date}</div>
                      </div>
                      <div style={{
                        fontWeight: 700, fontFeatureSettings: '"tnum"',
                        color: t.kind === 'pos' ? c.pos : c.ink,
                      }}>{t.kind === 'pos' ? '+' : '−'} {t.amount}</div>
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
