// Dashboard variations — 4 directions, all low-fi sketch
// A) iOS-grouped inset list (most native) — light
// B) Big hero number + pulse cashflow (BOLD idea) — dark
// C) "This month at-a-glance" stat tiles — light
// D) Workspace-first w/ swipeable account header — dark

const D_A = ({ dark = false }) => (
  <div className={`wf-screen ${dark ? 'dark' : ''}`}>
    <StatusBar dark={dark} />
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 10 }}>
      <div>
        <div className="wf-h1">Overview</div>
        <div className="wf-label">FilmpeakStudio ▾</div>
      </div>
    </div>

    {/* Inset card group: hero stat */}
    <div className="wf-box" style={{ padding: '10px 12px 12px', marginBottom: 10 }}>
      <div className="wf-label">Net Profit · 1M</div>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 2 }}>
        <div style={{ fontFamily: 'Kalam', fontSize: 22, fontWeight: 700, letterSpacing: -0.5 }}>
          RM 7,130<span style={{ fontSize: 14, opacity: 0.55 }}>.62</span>
        </div>
        <Spark width={70} height={26} color="var(--hi-green)" />
      </div>
      <div style={{ marginTop: 8 }}><Segmented active="1M" /></div>
    </div>

    {/* income/expense split */}
    <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
      <div className="wf-box" style={{ flex: 1, padding: 8 }}>
        <div className="wf-label">Income</div>
        <div className="wf-amount pos" style={{ fontSize: 13 }}>RM 9,959</div>
      </div>
      <div className="wf-box" style={{ flex: 1, padding: 8 }}>
        <div className="wf-label">Expenses</div>
        <div className="wf-amount neg" style={{ fontSize: 13 }}>RM 2,828</div>
      </div>
    </div>

    <div className="wf-h2">Recent Transactions</div>
    <div className="wf-box" style={{ padding: '4px 12px' }}>
      <TxnRow name="Client Retainer" date="2026-05-06" amount="3,600" kind="pos" status="PAID" dense />
      <TxnRow name="Hardware/Gear" date="2026-05-01" amount="2,828" kind="neg" dense />
      <TxnRow name="Subscription" date="2026-04-29" amount="89" kind="neg" dense />
    </div>

    <Annotate top={104} right={-90} arrow={{ pos: { left: -50, top: -10 }, flip: true }}>
      grouped iOS<br/>inset list ✓
    </Annotate>

    <TabBar active="home" dark={dark} />
  </div>
);

// B — Bold idea: "Pulse" — animated cashflow heartbeat as hero
const D_B = ({ dark = true }) => (
  <div className={`wf-screen ${dark ? 'dark' : ''}`}>
    <StatusBar dark={dark} />
    <div className="wf-label" style={{ marginTop: 4 }}>This month</div>
    <div className="wf-h1" style={{ fontSize: 38, lineHeight: 1, marginTop: 2 }}>
      RM 7,130
    </div>
    <div style={{ fontFamily: 'Kalam', fontSize: 12, opacity: 0.6, marginTop: -4 }}>
      <span className="pos">▲ 12%</span> vs last month
    </div>

    {/* PULSE — cashflow as a heartbeat trace */}
    <div style={{
      marginTop: 14, marginBottom: 14, padding: 10,
      border: '1.5px solid currentColor', borderRadius: 14, position: 'relative',
    }}>
      <div className="wf-label">cashflow pulse</div>
      <svg width="100%" height="60" viewBox="0 0 240 60" style={{ display: 'block', marginTop: 4 }}>
        <line x1="0" y1="30" x2="240" y2="30" stroke="currentColor" strokeOpacity="0.15" />
        {/* heartbeat-style trace with green spikes (income) and red dips (expenses) */}
        <path d="M0 30 L20 30 L25 18 L30 42 L40 30 L70 30 L75 14 L80 46 L90 30 L120 30 L125 22 L132 38 L150 30 L180 30 L185 10 L192 50 L200 30 L240 30"
          fill="none" stroke="#2ee07a" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
        <span className="wf-label">May 1</span>
        <span className="wf-label">today</span>
      </div>
    </div>

    <div style={{ display: 'flex', gap: 8 }}>
      <div className="wf-box" style={{ flex: 1, padding: 8 }}>
        <div className="wf-label">in</div>
        <div className="wf-amount pos" style={{ fontSize: 14 }}>9,959</div>
      </div>
      <div className="wf-box" style={{ flex: 1, padding: 8 }}>
        <div className="wf-label">out</div>
        <div className="wf-amount neg" style={{ fontSize: 14 }}>2,828</div>
      </div>
      <div className="wf-box" style={{ flex: 1, padding: 8 }}>
        <div className="wf-label">runway</div>
        <div className="wf-amount" style={{ fontSize: 14 }}>2.5mo</div>
      </div>
    </div>

    <Note style={{ position: 'absolute', right: -8, top: 130, width: 110, fontSize: 12 }}>
      BOLD: cashflow as a<br/>heartbeat trace ✶
    </Note>

    <TabBar active="home" dark={dark} />
  </div>
);

// C — At-a-glance grid (more dashboardy)
const D_C = ({ dark = false }) => (
  <div className={`wf-screen ${dark ? 'dark' : ''}`}>
    <StatusBar dark={dark} />
    <div className="wf-h1">Overview</div>
    <div className="wf-label" style={{ marginTop: -6, marginBottom: 10 }}>May 2026 · FilmpeakStudio</div>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
      <div className="wf-box" style={{ padding: 10, gridColumn: '1 / -1' }}>
        <div className="wf-label">Net Profit</div>
        <div className="wf-amount" style={{ fontSize: 22 }}>RM 7,130</div>
        <SketchChart width={240} height={50} dark={dark} />
      </div>
      <div className="wf-box" style={{ padding: 10, display: 'flex', gap: 8, alignItems: 'center' }}>
        <Dial pct={0.83} label="83%" sublabel="paid" size={48} />
        <div className="wf-label" style={{ fontSize: 10, lineHeight: 1.2 }}>Invoice<br/>collection</div>
      </div>
      <div className="wf-box" style={{ padding: 10 }}>
        <div className="wf-label">Pending</div>
        <div className="wf-amount" style={{ fontSize: 16 }}>RM 1,200</div>
        <div style={{ fontFamily: 'Kalam', fontSize: 10, opacity: 0.6 }}>2 invoices</div>
      </div>
      <div className="wf-box" style={{ padding: 10 }}>
        <div className="wf-label">Top Project</div>
        <div style={{ fontFamily: 'Kalam', fontSize: 12, fontWeight: 700 }}>Saffron Park</div>
        <div className="wf-amount pos" style={{ fontSize: 11 }}>+ RM 771</div>
      </div>
      <div className="wf-box" style={{ padding: 10 }}>
        <div className="wf-label">Biggest expense</div>
        <div style={{ fontFamily: 'Kalam', fontSize: 12, fontWeight: 700 }}>Hardware</div>
        <div className="wf-amount neg" style={{ fontSize: 11 }}>- RM 2,828</div>
      </div>
    </div>

    <Annotate bottom={92} left={4} arrow={{ pos: { right: -50, top: 0 } }}>
      KPI tile grid<br/>scannable ✓
    </Annotate>

    <TabBar active="home" dark={dark} />
  </div>
);

// D — Workspace-first w/ swipeable account header (dark)
const D_D = ({ dark = true }) => (
  <div className={`wf-screen ${dark ? 'dark' : ''}`}>
    <StatusBar dark={dark} />

    {/* swipeable workspace header */}
    <div style={{
      border: '1.5px solid currentColor', borderRadius: 16, padding: 12,
      marginTop: 4, marginBottom: 10, position: 'relative',
    }}>
      <div className="wf-label">Workspace 1 of 3</div>
      <div style={{ fontFamily: 'Kalam', fontSize: 18, fontWeight: 700 }}>FilmpeakStudio</div>
      <div className="wf-amount pos" style={{ fontSize: 22 }}>RM 7,130.62</div>
      <SketchChart width={240} height={40} dark={dark} />
      {/* page dots */}
      <div style={{ position: 'absolute', bottom: 6, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 4 }}>
        <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'currentColor' }} />
        <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'currentColor', opacity: 0.3 }} />
        <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'currentColor', opacity: 0.3 }} />
      </div>
    </div>

    <div className="wf-h2" style={{ marginTop: 0 }}>Recent</div>
    <div className="wf-box" style={{ padding: '4px 12px' }}>
      <TxnRow name="Client Retainer" date="May 6" amount="3,600" kind="pos" status="PAID" dense />
      <TxnRow name="Hardware/Gear" date="May 1" amount="2,828" kind="neg" dense />
      <TxnRow name="Stock Footage" date="Apr 28" amount="120" kind="neg" dense />
    </div>

    <Annotate top={64} right={-78} arrow={{ pos: { left: -56, top: -8 }, flip: true }}>
      swipe between<br/>workspaces ←→
    </Annotate>

    <TabBar active="home" dark={dark} />
  </div>
);

Object.assign(window, { D_A, D_B, D_C, D_D });
