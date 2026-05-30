// Ledger variations — 3 directions

// L_A — Flat list w/ floating filter pill (close to current, polished)
const L_A = ({ dark = false }) => (
  <div className={`wf-screen ${dark ? 'dark' : ''}`}>
    <StatusBar dark={dark} />
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div className="wf-h1">Ledger</div>
      <div style={{
        width: 32, height: 32, border: '1.5px solid currentColor', borderRadius: 8,
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
      }}>↓</div>
    </div>

    {/* search */}
    <div className="wf-box" style={{ padding: '6px 10px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6, borderRadius: 999 }}>
      <span style={{ opacity: 0.5 }}>⌕</span>
      <span className="wf-label">search transactions</span>
    </div>

    {/* filters */}
    <div style={{ display: 'flex', gap: 4, marginBottom: 8, flexWrap: 'wrap' }}>
      <div className="wf-tab active" style={{ background: 'var(--hi-red)', color: '#fff', borderColor: 'var(--hi-red)' }}>Pending</div>
      <Segmented active="1M" />
    </div>

    <div className="wf-box" style={{ padding: '4px 12px' }}>
      <TxnRow name="Client Retainer" date="2026-05-06" amount="3,600" kind="pos" status="PAID" dense />
      <TxnRow name="Hardware/Gear" date="2026-05-01" amount="2,828" kind="neg" dense />
      <TxnRow name="Client Retainer" date="2026-04-09" amount="6,359" kind="pos" status="PAID" dense />
      <TxnRow name="Stock Footage" date="2026-04-02" amount="120" kind="neg" dense />
      <TxnRow name="Client Retainer" date="2026-02-01" amount="5,453" kind="pos" status="PAID" dense />
    </div>
    <Annotate bottom={88} left={6} arrow={{ pos: { right: -54, top: -4 } }}>
      flat list,<br/>iOS card group
    </Annotate>
    <TabBar active="ledger" dark={dark} />
  </div>
);

// L_B — Grouped by date with sticky headers (BOLD-ish)
const L_B = ({ dark = false }) => (
  <div className={`wf-screen ${dark ? 'dark' : ''}`}>
    <StatusBar dark={dark} />
    <div className="wf-h1">Ledger</div>

    {/* sticky date headers */}
    <div style={{ fontFamily: 'Kalam', fontSize: 11, fontWeight: 700, opacity: 0.6, marginBottom: 4, letterSpacing: 0.5 }}>TODAY · 6 MAY</div>
    <div className="wf-box" style={{ padding: '4px 12px', marginBottom: 8 }}>
      <TxnRow name="Client Retainer" date="Saffron Park" amount="3,600" kind="pos" status="PAID" dense />
    </div>
    <div style={{ fontFamily: 'Kalam', fontSize: 11, fontWeight: 700, opacity: 0.6, marginBottom: 4, letterSpacing: 0.5 }}>THIS WEEK</div>
    <div className="wf-box" style={{ padding: '4px 12px', marginBottom: 8 }}>
      <TxnRow name="Hardware/Gear" date="May 1 · Saffron" amount="2,828" kind="neg" dense />
      <TxnRow name="Stock Footage" date="Apr 30" amount="120" kind="neg" dense />
    </div>
    <div style={{ fontFamily: 'Kalam', fontSize: 11, fontWeight: 700, opacity: 0.6, marginBottom: 4, letterSpacing: 0.5 }}>APRIL</div>
    <div className="wf-box" style={{ padding: '4px 12px' }}>
      <TxnRow name="Client Retainer" date="Apr 9" amount="6,359" kind="pos" status="PAID" dense />
      <TxnRow name="Subscription" date="Apr 5" amount="89" kind="neg" dense />
    </div>

    <Annotate top={70} right={-72} arrow={{ pos: { left: -50, top: -8 }, flip: true }}>
      grouped by<br/>relative date
    </Annotate>
    <TabBar active="ledger" dark={dark} />
  </div>
);

// L_C — Calendar strip + filtered list (bold idea #2)
const L_C = ({ dark = true }) => (
  <div className={`wf-screen ${dark ? 'dark' : ''}`}>
    <StatusBar dark={dark} />
    <div className="wf-h1">Ledger</div>

    {/* week strip with cashflow dots */}
    <div className="wf-box" style={{ padding: 10, marginBottom: 10 }}>
      <div className="wf-label">May · week 19</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
        {['M','T','W','T','F','S','S'].map((d,i) => (
          <div key={i} style={{ textAlign: 'center', fontFamily: 'Kalam', fontSize: 10 }}>
            <div style={{ opacity: 0.6 }}>{d}</div>
            <div style={{
              width: 22, height: 22, borderRadius: '50%',
              border: '1.3px solid currentColor',
              background: i === 2 ? 'currentColor' : 'transparent',
              color: i === 2 ? (dark ? '#1a1816' : '#f4f1ea') : 'inherit',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 10, fontWeight: 700, margin: '2px auto',
            }}>{4+i}</div>
            {/* cashflow dots */}
            <div style={{ display: 'flex', gap: 1, justifyContent: 'center', height: 6 }}>
              {i % 2 === 0 && <span style={{ width: 3, height: 3, background: '#2ee07a', borderRadius: '50%' }} />}
              {i === 4 && <span style={{ width: 3, height: 3, background: '#ff6b3d', borderRadius: '50%' }} />}
            </div>
          </div>
        ))}
      </div>
    </div>

    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
      <div className="wf-h2" style={{ margin: 0 }}>Wed, May 6</div>
      <div className="wf-amount pos" style={{ fontSize: 13 }}>+ RM 3,600</div>
    </div>

    <div className="wf-box" style={{ padding: '4px 12px' }}>
      <TxnRow name="Client Retainer" date="11:32 · Saffron" amount="3,600" kind="pos" status="PAID" dense />
      <TxnRow name="Adobe CC" date="08:00 · auto" amount="89" kind="neg" dense />
    </div>

    <Note style={{ position: 'absolute', right: -10, top: 200, width: 100, fontSize: 12 }}>
      BOLD: calendar<br/>cashflow strip
    </Note>

    <TabBar active="ledger" dark={dark} />
  </div>
);

Object.assign(window, { L_A, L_B, L_C });
