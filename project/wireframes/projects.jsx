// Projects + Project detail variations + Add/Edit + Detail + Settings

// P_A — List with progress bars per project
const P_A = ({ dark = false }) => (
  <div className={`wf-screen ${dark ? 'dark' : ''}`}>
    <StatusBar dark={dark} />
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div className="wf-h1">Projects</div>
      <div className="wf-pill" style={{ borderColor: 'var(--hi-blue)', color: 'var(--hi-blue)', fontSize: 11 }}>+ New</div>
    </div>

    {[
      { name: 'Saffron Park Residences', state: 'Active', pl: '+ 771', pct: 0.6 },
      { name: 'Greenline Spec Reel', state: 'Active', pl: '+ 1,240', pct: 0.3 },
      { name: 'Q2 Brand Campaign', state: 'Wrapped', pl: '+ 4,200', pct: 1 },
    ].map((p,i) => (
      <div key={i} className="wf-box" style={{ padding: 10, marginBottom: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: 'Kalam', fontSize: 13, fontWeight: 700 }}>📁 {p.name}</div>
          <div className="wf-amount pos" style={{ fontSize: 12 }}>{p.pl}</div>
        </div>
        <div className="wf-label" style={{ fontSize: 10 }}>{p.state} · budget</div>
        {/* progress */}
        <div style={{ height: 5, background: 'rgba(0,0,0,0.08)', borderRadius: 3, marginTop: 6, overflow: 'hidden' }}>
          <div style={{ width: `${p.pct*100}%`, height: '100%', background: 'var(--hi-green)' }} />
        </div>
      </div>
    ))}

    <Annotate bottom={120} right={-70} arrow={{ pos: { left: -50, top: -4 }, flip: true }}>
      budget burn<br/>per project
    </Annotate>

    <TabBar active="projects" dark={dark} />
  </div>
);

// P_B — Expanded project detail (inline accordion - current pattern)
const P_B = ({ dark = true }) => (
  <div className={`wf-screen ${dark ? 'dark' : ''}`}>
    <StatusBar dark={dark} />
    <div className="wf-h1">Projects</div>

    <div className="wf-box" style={{ padding: 10, marginBottom: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontFamily: 'Kalam', fontSize: 13, fontWeight: 700 }}>📁 Saffron Park Residences</div>
        <div style={{ fontSize: 14 }}>▾</div>
      </div>
      <div className="wf-label">Active · Net P&L: <span className="pos">RM 771.62</span></div>

      <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
        {[['Income','3,600','pos'],['Exp.','2,828','neg'],['Net','771','pos']].map(([l,v,k]) => (
          <div key={l} className="wf-box" style={{ flex: 1, padding: 6 }}>
            <div className="wf-label" style={{ fontSize: 9 }}>{l}</div>
            <div className={`wf-amount ${k}`} style={{ fontSize: 11 }}>{v}</div>
          </div>
        ))}
      </div>

      <div className="wf-h2" style={{ fontSize: 11, marginTop: 8 }}>Transactions</div>
      <TxnRow name="Client Retainer" date="May 6" amount="3,600" kind="pos" dense />
      <TxnRow name="Hardware/Gear" date="May 1" amount="2,828" kind="neg" dense />
    </div>

    <div className="wf-box" style={{ padding: 10, marginBottom: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ fontFamily: 'Kalam', fontSize: 13, fontWeight: 700 }}>📁 Greenline Spec</div>
        <div style={{ fontSize: 14, opacity: 0.5 }}>▸</div>
      </div>
    </div>

    <Annotate top={250} left={-68} arrow={{ pos: { right: -50, top: -8 } }}>
      tap to expand<br/>in-place
    </Annotate>

    <TabBar active="projects" dark={dark} />
  </div>
);

// P_C — Card grid (boards-feel) BOLD
const P_C = ({ dark = false }) => (
  <div className={`wf-screen ${dark ? 'dark' : ''}`}>
    <StatusBar dark={dark} />
    <div className="wf-h1">Projects</div>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
      {[
        { name: 'Saffron Park', tone: 'var(--hi-green)', pl: '+ 771' },
        { name: 'Greenline', tone: 'var(--hi-blue)', pl: '+ 1,240' },
        { name: 'Brand Q2', tone: 'var(--hi-red)', pl: '+ 4,200' },
        { name: '+ New', tone: 'var(--rule-soft)', pl: '' },
      ].map((p,i) => (
        <div key={i} className="wf-box" style={{
          padding: 10, height: 110, position: 'relative',
          background: i === 3 ? 'transparent' : undefined,
          borderStyle: i === 3 ? 'dashed' : 'solid',
        }}>
          <div style={{
            width: 8, height: 8, borderRadius: '50%', background: p.tone,
            position: 'absolute', top: 8, right: 8,
          }} />
          <div style={{ fontFamily: 'Kalam', fontSize: 12, fontWeight: 700, marginTop: 24 }}>{p.name}</div>
          {p.pl && <div className="wf-amount pos" style={{ fontSize: 14, marginTop: 4 }}>{p.pl}</div>}
          {p.pl && <Spark width={60} height={20} color={p.tone} />}
        </div>
      ))}
    </div>

    <Note style={{ position: 'absolute', right: -8, top: 240, width: 100, fontSize: 12 }}>
      BOLD: card grid<br/>color-tagged
    </Note>

    <TabBar active="projects" dark={dark} />
  </div>
);

Object.assign(window, { P_A, P_B, P_C });
