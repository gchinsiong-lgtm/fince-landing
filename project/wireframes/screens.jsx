// Add/Edit transaction (no bottom sheet), Detail, Settings

// A_A — Full screen modal w/ "amount as hero" + keypad (premium iOS-y)
const A_A = ({ dark = true }) => (
  <div className={`wf-screen ${dark ? 'dark' : ''}`}>
    <StatusBar dark={dark} />
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontFamily: 'Kalam', fontSize: 12, opacity: 0.6 }}>Cancel</span>
      <span style={{ fontFamily: 'Kalam', fontSize: 13, fontWeight: 700 }}>New</span>
      <span style={{ fontFamily: 'Kalam', fontSize: 12, color: 'var(--hi-blue)' }}>Save</span>
    </div>

    {/* Hero amount */}
    <div style={{ textAlign: 'center', marginTop: 20 }}>
      <div className="wf-label" style={{ fontSize: 11 }}>Amount</div>
      <div style={{ fontFamily: 'Kalam', fontSize: 44, fontWeight: 700, lineHeight: 1, letterSpacing: -1 }}>
        <span style={{ opacity: 0.4 }}>RM </span>3,600<span style={{ opacity: 0.4 }}>.00</span>
      </div>
      {/* income/expense toggle pill */}
      <div style={{ display: 'inline-flex', marginTop: 10, border: '1.5px solid currentColor', borderRadius: 999, padding: 2 }}>
        <span style={{ padding: '4px 14px', borderRadius: 999, background: 'var(--hi-green)', color: '#fff', fontFamily: 'Kalam', fontSize: 11, fontWeight: 700 }}>Income</span>
        <span style={{ padding: '4px 14px', fontFamily: 'Kalam', fontSize: 11, opacity: 0.6 }}>Expense</span>
      </div>
    </div>

    {/* Quick fields */}
    <div className="wf-box" style={{ padding: 0, marginTop: 14, overflow: 'hidden' }}>
      {[['Category','Client Retainer'],['Project','Saffron Park'],['Date','6 May 2026'],['Status','Paid ●']].map(([k,v],i,a) => (
        <div key={k} style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '9px 12px', borderBottom: i < a.length-1 ? '1px solid rgba(127,127,127,0.2)' : 'none',
          fontFamily: 'Kalam', fontSize: 12,
        }}>
          <span style={{ opacity: 0.6 }}>{k}</span>
          <span style={{ fontWeight: 600 }}>{v} ›</span>
        </div>
      ))}
    </div>

    <Annotate top={90} left={-72} arrow={{ pos: { right: -50, top: 0 } }}>
      amount as<br/>the hero
    </Annotate>

    {/* mini keypad indicator */}
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 130, borderTop: '1.5px solid currentColor', opacity: 0.7,
      background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
      display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', alignContent: 'center', padding: '8px 18px', gap: 4 }}>
      {[1,2,3,4,5,6,7,8,9,'.',0,'⌫'].map((k,i) => (
        <div key={i} style={{ textAlign: 'center', fontFamily: 'Kalam', fontSize: 18, fontWeight: 600 }}>{k}</div>
      ))}
    </div>
  </div>
);

// A_B — Stepper / multi-step wizard (push-nav style)
const A_B = ({ dark = false }) => (
  <div className={`wf-screen ${dark ? 'dark' : ''}`}>
    <StatusBar dark={dark} />
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ fontSize: 16 }}>‹</span>
      <span style={{ fontFamily: 'Kalam', fontSize: 12, opacity: 0.6 }}>step 2 of 4</span>
    </div>
    {/* progress dashes */}
    <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
      {[1,1,0,0].map((on,i) => (
        <div key={i} style={{ flex: 1, height: 3, background: on ? 'currentColor' : 'rgba(127,127,127,0.3)', borderRadius: 2 }} />
      ))}
    </div>

    <div className="wf-h1" style={{ marginTop: 18 }}>What was it<br/>for?</div>

    {/* category chips */}
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
      {['Client Retainer','Hardware/Gear','Software','Travel','Stock Footage','Catering','+ Custom'].map((c,i) => (
        <div key={c} className={`wf-tab ${i === 0 ? 'active' : ''}`}>{c}</div>
      ))}
    </div>

    <div className="wf-h2">Project</div>
    <div className="wf-box" style={{ padding: '8px 10px', display: 'flex', justifyContent: 'space-between' }}>
      <span className="wf-label" style={{ fontSize: 12 }}>Saffron Park Residences</span>
      <span>▾</span>
    </div>

    {/* full-width Continue */}
    <div style={{
      position: 'absolute', bottom: 30, left: 14, right: 14, padding: '12px',
      background: 'currentColor', borderRadius: 14, textAlign: 'center',
    }}>
      <span style={{ color: dark ? '#1a1816' : '#f4f1ea', fontFamily: 'Kalam', fontWeight: 700, fontSize: 14 }}>Continue ›</span>
    </div>

    <Note style={{ position: 'absolute', right: -8, top: 230, width: 100, fontSize: 12 }}>
      stepper for<br/>fewer fields<br/>per screen
    </Note>
  </div>
);

// A_C — Camera-first (scan a receipt) BOLD
const A_C = ({ dark = true }) => (
  <div className={`wf-screen ${dark ? 'dark' : ''}`}>
    <StatusBar dark={dark} />
    {/* camera viewfinder placeholder */}
    <div style={{
      position: 'absolute', inset: '40px 14px 220px',
      borderRadius: 18, overflow: 'hidden',
    }}>
      <div className="placeholder" style={{ height: '100%' }}>📷 viewfinder</div>
      {/* corner brackets */}
      {[['top-left',[0,0]],['top-right',[1,0]],['bottom-left',[0,1]],['bottom-right',[1,1]]].map(([k,[x,y]]) => (
        <div key={k} style={{
          position: 'absolute', width: 24, height: 24,
          left: x ? 'auto' : 8, right: x ? 8 : 'auto',
          top: y ? 'auto' : 8, bottom: y ? 8 : 'auto',
          borderTop: y ? 'none' : '2px solid currentColor',
          borderBottom: y ? '2px solid currentColor' : 'none',
          borderLeft: x ? 'none' : '2px solid currentColor',
          borderRight: x ? '2px solid currentColor' : 'none',
        }} />
      ))}
    </div>

    {/* parsed-text preview */}
    <div className="wf-box" style={{
      position: 'absolute', bottom: 110, left: 14, right: 14, padding: 10,
      background: dark ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.9)',
      backdropFilter: 'blur(8px)',
    }}>
      <div className="wf-label">detected ✓</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Kalam', fontSize: 12, fontWeight: 700 }}>
        <span>B&H Photo</span>
        <span className="neg">- RM 2,828.38</span>
      </div>
      <div className="wf-label">→ Hardware/Gear · Saffron Park</div>
    </div>

    {/* shutter */}
    <div style={{
      position: 'absolute', bottom: 30, left: '50%', transform: 'translateX(-50%)',
      width: 56, height: 56, borderRadius: '50%',
      border: '2.5px solid currentColor', display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'currentColor' }} />
    </div>
    <div style={{ position: 'absolute', bottom: 30, left: 30, fontFamily: 'Kalam', fontSize: 11, opacity: 0.6 }}>manual</div>
    <div style={{ position: 'absolute', bottom: 30, right: 30, fontFamily: 'Kalam', fontSize: 11, opacity: 0.6 }}>album</div>

    <Note style={{ position: 'absolute', left: -10, top: 80, width: 100, fontSize: 12 }}>
      BOLD: scan-first<br/>add flow
    </Note>
  </div>
);

// TXN_DETAIL
const T_A = ({ dark = false }) => (
  <div className={`wf-screen ${dark ? 'dark' : ''}`}>
    <StatusBar dark={dark} />
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ fontSize: 16 }}>‹</span>
      <span style={{ fontFamily: 'Kalam', fontSize: 13, fontWeight: 700 }}>Transaction</span>
    </div>

    <div className="wf-box" style={{ padding: 18, textAlign: 'center', marginTop: 10 }}>
      <div className="wf-circle" style={{ width: 36, height: 36, margin: '0 auto', borderColor: 'var(--hi-green)' }}>
        <Arrow dir="up" color="var(--hi-green)" />
      </div>
      <div style={{ fontFamily: 'Kalam', fontSize: 26, fontWeight: 700, color: 'var(--hi-green)', marginTop: 4 }}>
        RM 3,600.00
      </div>
      <div className="wf-label">Client Retainer · Income</div>
      <div className="wf-pill" style={{ borderColor: 'var(--hi-green)', color: 'var(--hi-green)', fontSize: 9, marginTop: 6 }}>PAID</div>
    </div>

    <div className="wf-box" style={{ padding: 0, marginTop: 10 }}>
      {[['Date','2026-05-06'],['Project','Saffron Park'],['Client','—'],['Reference','—'],['Receipt','📎 attached']].map(([k,v],i,a) => (
        <div key={k} style={{
          display: 'flex', justifyContent: 'space-between',
          padding: '8px 12px', fontFamily: 'Kalam', fontSize: 12,
          borderBottom: i < a.length-1 ? '1px solid rgba(127,127,127,0.2)' : 'none',
        }}>
          <span style={{ opacity: 0.6 }}>{k}</span>
          <span style={{ fontWeight: 600 }}>{v}</span>
        </div>
      ))}
    </div>

    <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
      <div style={{ flex: 1, padding: 10, border: '1.5px solid var(--hi-blue)', borderRadius: 12, textAlign: 'center', color: 'var(--hi-blue)', fontFamily: 'Kalam', fontWeight: 700, fontSize: 12 }}>✎ Edit</div>
      <div style={{ flex: 1, padding: 10, border: '1.5px solid var(--hi-red)', borderRadius: 12, textAlign: 'center', color: 'var(--hi-red)', fontFamily: 'Kalam', fontWeight: 700, fontSize: 12 }}>🗑 Delete</div>
    </div>
  </div>
);

const T_B = ({ dark = true }) => (
  <div className={`wf-screen ${dark ? 'dark' : ''}`}>
    <StatusBar dark={dark} />
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ fontSize: 16 }}>‹</span>
      <span style={{ fontFamily: 'Kalam', fontSize: 12, opacity: 0.6 }}>Ledger</span>
    </div>

    {/* receipt-style card */}
    <div className="wf-box" style={{ padding: 14, marginTop: 10, position: 'relative' }}>
      <div style={{
        position: 'absolute', top: -1, left: -1, right: -1, height: 8,
        background: `radial-gradient(circle at 4px 100%, transparent 4px, ${dark?'#1a1816':'var(--paper)'} 4px)`,
        backgroundSize: '8px 8px', backgroundRepeat: 'repeat-x',
      }} />
      <div className="wf-label" style={{ marginTop: 4 }}>Income · Saffron Park</div>
      <div style={{ fontFamily: 'Kalam', fontSize: 28, fontWeight: 700, color: 'var(--hi-green)' }}>RM 3,600.00</div>

      <div className="hr-hand" />
      {[['Client Retainer','category'],['6 May 2026','date'],['Reference 0042','ref'],['—','client'],['📎 receipt.pdf','attached']].map(([v,k]) => (
        <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Kalam', fontSize: 11, padding: '3px 0' }}>
          <span style={{ opacity: 0.55 }}>{k}</span>
          <span>{v}</span>
        </div>
      ))}
    </div>

    <div className="wf-box" style={{ padding: 0, marginTop: 10 }}>
      {['✎ Edit','🗂 Move project','📤 Share','🗑 Delete'].map((a,i,arr) => (
        <div key={a} style={{
          padding: '10px 12px', fontFamily: 'Kalam', fontSize: 12,
          borderBottom: i < arr.length-1 ? '1px solid rgba(127,127,127,0.2)' : 'none',
          color: i === 3 ? 'var(--hi-red)' : 'inherit',
        }}>{a}</div>
      ))}
    </div>

    <Annotate top={90} right={-78} arrow={{ pos: { left: -54, top: -8 }, flip: true }}>
      receipt-style<br/>card metaphor
    </Annotate>
  </div>
);

// SETTINGS variations
const S_A = ({ dark = true }) => (
  <div className={`wf-screen ${dark ? 'dark' : ''}`}>
    <StatusBar dark={dark} />
    <div className="wf-h1">Settings</div>
    <div className="wf-label" style={{ marginTop: -4, marginBottom: 10 }}>ACCOUNT</div>
    <div className="wf-box" style={{ padding: 0 }}>
      {[['Workspace','FilmpeakStudio ▾'],['Base Currency','RM'],['Face ID','● ON'],['Default on Launch','this one']].map(([k,v],i,a) => (
        <div key={k} style={{
          display: 'flex', justifyContent: 'space-between', padding: '10px 12px',
          fontFamily: 'Kalam', fontSize: 12,
          borderBottom: i < a.length-1 ? '1px solid rgba(127,127,127,0.2)' : 'none',
        }}>
          <span>{k}</span>
          <span style={{ opacity: 0.6 }}>{v}</span>
        </div>
      ))}
    </div>

    <div className="wf-label" style={{ marginTop: 14, marginBottom: 6 }}>RECURRING</div>
    <div className="wf-box dashed" style={{ padding: 12, textAlign: 'center', fontFamily: 'Kalam', fontSize: 12, opacity: 0.6 }}>
      no recurring entries · + Add
    </div>

    <div className="wf-label" style={{ marginTop: 14, marginBottom: 6 }}>DATA</div>
    <div className="wf-box" style={{ padding: 0 }}>
      {['Export CSV','Backup','Sign out'].map((a,i,arr) => (
        <div key={a} style={{
          padding: '9px 12px', fontFamily: 'Kalam', fontSize: 12,
          borderBottom: i < arr.length-1 ? '1px solid rgba(127,127,127,0.2)' : 'none',
        }}>{a}</div>
      ))}
    </div>

    <Annotate top={70} right={-78} arrow={{ pos: { left: -54, top: -8 }, flip: true }}>
      iOS grouped<br/>inset list ✓
    </Annotate>

    <TabBar active="settings" dark={dark} />
  </div>
);

const S_B = ({ dark = false }) => (
  <div className={`wf-screen ${dark ? 'dark' : ''}`}>
    <StatusBar dark={dark} />
    <div className="wf-h1">Settings</div>

    {/* profile-card top */}
    <div className="wf-box" style={{ padding: 12, display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
      <div style={{ width: 40, height: 40, borderRadius: '50%', border: '1.5px solid currentColor', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>F</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: 'Kalam', fontWeight: 700, fontSize: 13 }}>FilmpeakStudio</div>
        <div className="wf-label">3 workspaces</div>
      </div>
      <span style={{ fontSize: 14 }}>›</span>
    </div>

    <div className="wf-box" style={{ padding: 0, marginBottom: 8 }}>
      {[['💱','Base Currency','RM'],['🔒','Face ID','on'],['🌗','Appearance','auto'],['🔔','Notifications','3']].map(([g,k,v],i,a) => (
        <div key={k} style={{
          display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
          fontFamily: 'Kalam', fontSize: 12,
          borderBottom: i < a.length-1 ? '1px solid rgba(127,127,127,0.2)' : 'none',
        }}>
          <span>{g}</span>
          <span style={{ flex: 1 }}>{k}</span>
          <span style={{ opacity: 0.6 }}>{v} ›</span>
        </div>
      ))}
    </div>

    <Note style={{ position: 'absolute', right: -10, top: 110, width: 100, fontSize: 12 }}>
      profile card<br/>+ icon rows
    </Note>

    <TabBar active="settings" dark={dark} />
  </div>
);

Object.assign(window, { A_A, A_B, A_C, T_A, T_B, S_A, S_B });
