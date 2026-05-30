// Empty states, Edit Transaction, Recurring Entries — sketchy low-fi
// Reuses StatusBar, TabBar, atoms etc.

// ─── Glass tab bar (mid-fi, "liquid glass" feel) ───
// Floating translucent capsule with a soft inner specular ring + center FAB.
// Used inside otherwise lo-fi screens as a focal mid-fi treatment.
const GlassTabBar = ({ active = 'projects', dark = true }) => {
  const tabs = [
    { id: 'home',     icon: '⌂' },
    { id: 'projects', icon: '◰' },
    { id: 'ledger',   icon: '☰' },
    { id: 'settings', icon: '⚙' },
  ];
  const tint = dark ? '#0A84FF' : '#007AFF';
  const inactive = dark ? 'rgba(235,235,245,0.55)' : 'rgba(60,60,67,0.55)';
  const fontStack = '-apple-system, "SF Pro Display", system-ui, sans-serif';

  // Glass surface
  const bg = dark
    ? 'linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 55%, rgba(255,255,255,0.02) 100%)'
    : 'linear-gradient(180deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.45) 100%)';
  const baseTint = dark ? 'rgba(28,28,30,0.42)' : 'rgba(255,255,255,0.55)';
  const ring = dark ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.85)';
  const innerHi = dark ? 'rgba(255,255,255,0.28)' : 'rgba(255,255,255,0.9)';
  const innerLo = dark ? 'rgba(0,0,0,0.35)' : 'rgba(0,0,0,0.06)';

  return (
    <div style={{
      position: 'absolute',
      left: 12, right: 12, bottom: 16,
      height: 60,
      borderRadius: 28,
      // layer 1: base tint behind the gradient so it reads as glass even on solid sketch bg
      background: `${bg}, ${baseTint}`,
      backdropFilter: 'blur(22px) saturate(180%)',
      WebkitBackdropFilter: 'blur(22px) saturate(180%)',
      border: `1px solid ${ring}`,
      boxShadow: [
        `inset 0 1px 0 ${innerHi}`,           // top specular highlight
        `inset 0 -1px 0 ${innerLo}`,          // bottom catch
        `inset 0 0 0 1px rgba(255,255,255,${dark ? 0.04 : 0.4})`, // refraction ring
        `0 12px 32px rgba(0,0,0,${dark ? 0.50 : 0.18})`,         // floating shadow
        `0 2px 6px rgba(0,0,0,${dark ? 0.35 : 0.08})`,
      ].join(', '),
      display: 'flex', alignItems: 'stretch',
      padding: '0 4px',
      fontFamily: fontStack,
      zIndex: 5,
      overflow: 'visible',
    }}>
      {tabs.map((t, i) => {
        const isActive = t.id === active;
        // FAB sits between projects (idx 1) and ledger (idx 2)
        const showFabBefore = i === 2;
        return (
          <React.Fragment key={t.id}>
            {showFabBefore && (
              <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  top: -30, // lifted clearly above the capsule, not bounded by it
                  width: 54, height: 54,
                  borderRadius: '50%',
                  background: '#FF6B3D',
                  color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 28, fontWeight: 300, lineHeight: 1, paddingBottom: 2,
                  boxShadow: [
                    '0 14px 28px rgba(220,63,26,0.45)',
                    '0 4px 10px rgba(0,0,0,0.28)',
                    // glass edge: bright specular top + subtle bottom catch + thin refraction ring
                    'inset 0 1.5px 0 rgba(255,255,255,0.55)',
                    'inset 0 -1.5px 0 rgba(0,0,0,0.18)',
                    'inset 0 0 0 1px rgba(255,255,255,0.18)',
                  ].join(', '),
                  // no thick ring binding it to the bar — let it float
                }}>+</div>
              </div>
            )}
            <div style={{
              flex: 1,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: 2,
              color: isActive ? tint : inactive,
              fontSize: 9.5, fontWeight: 500, letterSpacing: 0.1,
              position: 'relative',
            }}>
              {isActive && (
                <div style={{
                  position: 'absolute',
                  top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 44, height: 44, borderRadius: 14,
                  background: dark ? 'rgba(10,132,255,0.14)' : 'rgba(0,122,255,0.10)',
                  border: `0.5px solid ${dark ? 'rgba(10,132,255,0.30)' : 'rgba(0,122,255,0.22)'}`,
                }} />
              )}
              <span style={{ fontSize: 19, lineHeight: 1, position: 'relative' }}>{t.icon}</span>
              <span style={{ position: 'relative', opacity: isActive ? 1 : 0.9 }}>
                {t.id === 'home' ? 'Home' :
                 t.id === 'projects' ? 'Projects' :
                 t.id === 'ledger' ? 'Ledger' : 'Settings'}
              </span>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

// ───────────────────────────────────
// EMPTY STATES — 3 directions
// ───────────────────────────────────

// E_A — Ledger empty (illustration + primary CTA)
const E_A = ({ dark = false }) =>
<div className={`wf-screen ${dark ? 'dark' : ''}`}>
    <StatusBar dark={dark} />
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div className="wf-h1" style={{ margin: 0 }}>Ledger</div>
      <div style={{ width: 32, height: 32, border: '1.5px solid currentColor', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>↓</div>
    </div>

    <div style={{
    position: 'absolute', top: '38%', left: '50%', transform: 'translate(-50%,-50%)',
    textAlign: 'center', width: 200
  }}>
      {/* simple shape illustration */}
      <div style={{
      width: 80, height: 80, margin: '0 auto 14px',
      border: '1.8px dashed currentColor', borderRadius: 18,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Kalam', fontSize: 26, opacity: 0.6
    }}>☰</div>
      <div style={{ fontFamily: 'Kalam', fontWeight: 700, fontSize: 14 }}>No transactions yet</div>
      <div className="wf-label" style={{ fontSize: 11, marginTop: 4 }}>
        Scan a receipt or add manually to<br />start your ledger.
      </div>
      <div style={{
      marginTop: 14, padding: '8px 14px', display: 'inline-block',
      border: '1.5px solid currentColor', borderRadius: 999,
      fontFamily: 'Kalam', fontWeight: 700, fontSize: 12,
      background: 'currentColor', color: dark ? '#1a1816' : '#f4f1ea'
    }}>+ Add first entry</div>
    </div>

    <Annotate top={120} right={-72} arrow={{ pos: { left: -50, top: -8 }, flip: true }}>
      friendly empty<br />w/ CTA
    </Annotate>

    <TabBar active="ledger" dark={dark} style="fab" />
  </div>;


// E_B — Projects empty (split screen, big CTA)
const E_B = ({ dark = true }) =>
<div className={`wf-screen ${dark ? 'dark' : ''}`}>
    <StatusBar dark={dark} />
    <div className="wf-h1">Projects</div>

    <div style={{ position: 'absolute', top: 120, left: 14, right: 14, textAlign: 'center' }}>
      <div style={{
      width: 96, height: 70, margin: '0 auto', position: 'relative'
    }}>
        {/* stacked folder shapes */}
        {[0, 1, 2].map((i) =>
      <div key={i} style={{
        position: 'absolute', left: i * 6, top: i * 4,
        width: 80, height: 56, border: '1.5px solid currentColor', borderRadius: 6,
        opacity: 0.4 + i * 0.2,
        background: dark ? '#1a1816' : '#f4f1ea'
      }} />
      )}
      </div>
      <div style={{ fontFamily: 'Kalam', fontWeight: 700, fontSize: 14, marginTop: 18 }}>
        Spin up your first project
      </div>
      <div className="wf-label" style={{ fontSize: 11, marginTop: 4 }}>
        Group transactions, see P&amp;L,<br />track budgets per client.
      </div>
    </div>

    {/* primary action filling lower half */}
    <div style={{ position: 'absolute', bottom: 100, left: 14, right: 14 }}>
      <div style={{
      padding: 14, textAlign: 'center', borderRadius: 14,
      background: 'currentColor', color: dark ? '#1a1816' : '#f4f1ea',
      fontFamily: 'Kalam', fontWeight: 700, fontSize: 14
    }}>+ New Project</div>
      <div style={{ textAlign: 'center', marginTop: 10, fontFamily: 'Kalam', fontSize: 11, opacity: 0.6 }}>
        or import from CSV →
      </div>
    </div>

    <Note style={{ position: 'absolute', left: -10, top: 100, width: 100, fontSize: 12 }}>
      stacked-folder<br />illustration<br />+ secondary
    </Note>

    {/* Mid-fi glass tab bar — iOS26 "liquid glass" feel, floats over the lo-fi body */}
    <GlassTabBar active="projects" dark={dark} />

    <Note style={{ position: 'absolute', right: -86, bottom: 26, width: 78, fontSize: 11, textAlign: 'left' }}>
      mid-fi glass bar<br />blur · spec ring<br />floating capsule
    </Note>
  </div>;


// E_C — Search empty / no results
const E_C = ({ dark = false }) =>
<div className={`wf-screen ${dark ? 'dark' : ''}`}>
    <StatusBar dark={dark} />
    <div className="wf-h1" style={{ marginBottom: 8 }}>Ledger</div>

    {/* search w/ active query */}
    <div className="wf-box" style={{ padding: '6px 10px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6, borderRadius: 999 }}>
      <span style={{ opacity: 0.5 }}>⌕</span>
      <span style={{ fontFamily: 'Kalam', fontSize: 12 }}>"camera rental"</span>
      <span style={{ marginLeft: 'auto', opacity: 0.6 }}>×</span>
    </div>

    <div style={{ position: 'absolute', top: 220, left: 0, right: 0, textAlign: 'center' }}>
      <div style={{ fontFamily: 'Kalam', fontSize: 30, opacity: 0.4 }}>⌕</div>
      <div style={{ fontFamily: 'Kalam', fontWeight: 700, fontSize: 13, marginTop: 6 }}>No matches</div>
      <div className="wf-label" style={{ fontSize: 11, marginTop: 4 }}>
        Try a different keyword or<br />broaden the date filter.
      </div>

      {/* suggested chips */}
      <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginTop: 14, flexWrap: 'wrap', padding: '0 20px' }}>
        {['rental', 'equipment', 'last 90 days'].map((c) =>
      <div key={c} className="wf-tab" style={{ fontSize: 10 }}>{c}</div>
      )}
      </div>
    </div>

    <Annotate bottom={140} left={-72} arrow={{ pos: { right: -50, top: -8 } }}>
      no-results +<br />recovery chips
    </Annotate>

    <TabBar active="ledger" dark={dark} style="fab" />
  </div>;


// ───────────────────────────────────
// EDIT TRANSACTION — 3 directions (based on uploaded screen)
// ───────────────────────────────────

// ET_A — Faithful refresh: grouped iOS list, large title, save bar
const ET_A = ({ dark = false }) =>
<div className={`wf-screen ${dark ? 'dark' : ''}`}>
    <StatusBar dark={dark} />
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontFamily: 'Kalam', fontSize: 12, opacity: 0.6 }}>Cancel</span>
      <span style={{ fontFamily: 'Kalam', fontSize: 12, color: 'var(--hi-blue)', fontWeight: 700 }}>Save</span>
    </div>
    <div className="wf-h1" style={{ marginTop: 4 }}>Edit Transaction</div>

    {/* Amount hero */}
    <div className="wf-box" style={{ padding: 14, textAlign: 'center', marginBottom: 10 }}>
      <div className="wf-label">Amount</div>
      <div style={{ fontFamily: 'Kalam', fontSize: 32, fontWeight: 700, letterSpacing: -0.5 }}>
        <span style={{ opacity: 0.4, fontSize: 18 }}>RM</span> 3,600<span style={{ opacity: 0.4 }}>.00</span>
      </div>
      {/* Income/Expense pill */}
      <div style={{ display: 'inline-flex', marginTop: 8, border: '1.3px solid currentColor', borderRadius: 999, padding: 2 }}>
        <span style={{ padding: '4px 14px', borderRadius: 999, background: 'var(--hi-green)', color: '#fff', fontFamily: 'Kalam', fontSize: 11, fontWeight: 700 }}>Income</span>
        <span style={{ padding: '4px 14px', fontFamily: 'Kalam', fontSize: 11, opacity: 0.6 }}>Expense</span>
      </div>
    </div>

    {/* Grouped list — DETAILS */}
    <div className="wf-label" style={{ marginBottom: 4 }}>DETAILS</div>
    <div className="wf-box" style={{ padding: 0, marginBottom: 10 }}>
      {[
    ['Category', 'Client Retainer'],
    ['Project', 'Saffron Park Residences'],
    ['Status', 'Paid ●'],
    ['Date', '6 May 2026']].
    map(([k, v], i, a) =>
    <div key={k} style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '9px 12px', fontFamily: 'Kalam', fontSize: 12,
      borderBottom: i < a.length - 1 ? '1px solid rgba(127,127,127,0.2)' : 'none'
    }}>
          <span style={{ opacity: 0.6 }}>{k}</span>
          <span style={{ fontWeight: 600 }}>{v} ›</span>
        </div>
    )}
    </div>

    {/* OPTIONAL */}
    <div className="wf-label" style={{ marginBottom: 4 }}>OPTIONAL</div>
    <div className="wf-box" style={{ padding: 0 }}>
      {[['Client Name', '—'], ['Reference', '—'], ['Notes', 'tap to add…']].map(([k, v], i, a) =>
    <div key={k} style={{
      display: 'flex', justifyContent: 'space-between',
      padding: '9px 12px', fontFamily: 'Kalam', fontSize: 12,
      borderBottom: i < a.length - 1 ? '1px solid rgba(127,127,127,0.2)' : 'none'
    }}>
          <span style={{ opacity: 0.6 }}>{k}</span>
          <span style={{ opacity: 0.5 }}>{v}</span>
        </div>
    )}
    </div>

    <Annotate top={70} right={-72} arrow={{ pos: { left: -50, top: -8 }, flip: true }}>
      iOS grouped<br />+ optional split
    </Annotate>
  </div>;


// ET_B — One-screen compact form: 2-col grid, everything fits, no scroll
const ET_B = ({ dark = true }) => {
  const Field = ({ label, value, placeholder, trailing }) =>
    <div>
      <div className="wf-label" style={{ marginBottom: 2, fontSize: 9 }}>{label}</div>
      <div className="wf-box" style={{
        padding: '6px 8px', display: 'flex', alignItems: 'center', gap: 4,
        fontFamily: 'Kalam', fontSize: 11, minHeight: 14
      }}>
        <span style={{ flex: 1, fontWeight: value ? 600 : 400, opacity: value ? 1 : 0.4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {value || placeholder}
        </span>
        {trailing && <span style={{ opacity: 0.6, fontSize: 10 }}>{trailing}</span>}
      </div>
    </div>;

  return (
    <div className={`wf-screen ${dark ? 'dark' : ''}`} data-comment-anchor="d15d3ce93d-div-218-5">
      <StatusBar dark={dark} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 14 }}>×</span>
        <span style={{ fontFamily: 'Kalam', fontSize: 11, fontWeight: 700 }}>Edit Transaction</span>
        <span style={{ fontFamily: 'Kalam', fontSize: 11, color: 'var(--hi-blue)', fontWeight: 700 }}>Save</span>
      </div>

      {/* Amount full-width first */}
      <div style={{ marginTop: 8 }}>
        <Field label="Amount (RM)" value="3,600.00" />
      </div>

      {/* Category | Date pair */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginTop: 6 }}>
        <Field label="Category" value="Client Retainer" trailing="›" />
        <Field label="Date" value="6 May 2026" trailing="›" />
      </div>

      {/* Vendor + Client Name — each full-width on their own row */}
      <div style={{ marginTop: 6 }}>
        <Field label="Vendor" value="Saffron Park Sdn Bhd" />
      </div>
      <div style={{ marginTop: 6 }}>
        <Field label="Client Name" placeholder="—" />
      </div>

      {/* Reference | Tax pair */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginTop: 6 }}>
        <Field label="Reference" placeholder="invoice #" />
        <Field label="Tax (RM)" value="0.00" />
      </div>

      {/* Notes full-width */}
      <div style={{ marginTop: 6 }}>
        <Field label="Notes" placeholder="tap to add…" />
      </div>

      {/* Documents — compact row */}
      <div style={{ marginTop: 6 }}>
        <div className="wf-label" style={{ marginBottom: 2, fontSize: 9 }}>Documents</div>
        <div style={{ display: 'flex', gap: 5 }}>
          <div style={{
            flex: 1, height: 44, borderRadius: 6,
            background: dark ? '#2a2622' : '#e8e3d6',
            position: 'relative', overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'repeating-linear-gradient(45deg, rgba(127,127,127,0.08), rgba(127,127,127,0.08) 6px, transparent 6px, transparent 12px)'
            }} />
            <div style={{
              position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'ui-monospace, monospace', fontSize: 8, opacity: 0.5
            }}>[ receipt.jpg ]</div>
          </div>
          <div style={{
            width: 44, height: 44, borderRadius: 6,
            border: '1.3px dashed currentColor', opacity: 0.5,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Kalam', fontSize: 14
          }}>+</div>
        </div>
      </div>

      <Note style={{ position: 'absolute', right: -10, top: 60, width: 96, fontSize: 11 }}>
        one-screen<br />compact · 2-col<br />grid · all fields
      </Note>
    </div>);
};

// ET_C — BOLD: amount-as-hero, fields collapse below (premium)
const ET_C = ({ dark = true }) =>
<div className={`wf-screen ${dark ? 'dark' : ''}`}>
    <StatusBar dark={dark} />
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontSize: 16 }}>×</span>
      <span style={{ fontFamily: 'Kalam', fontSize: 12, opacity: 0.6 }}>Editing</span>
      <span style={{ fontFamily: 'Kalam', fontSize: 12, color: 'var(--hi-blue)', fontWeight: 700 }}>Save</span>
    </div>

    {/* Big amount */}
    <div style={{ textAlign: 'center', marginTop: 32 }}>
      <div className="wf-label" style={{ fontSize: 11 }}>Income · Client Retainer</div>
      <div style={{ fontFamily: 'Kalam', fontSize: 50, fontWeight: 700, lineHeight: 1, color: 'var(--hi-green)', marginTop: 4 }}>
        <span style={{ opacity: 0.5, fontSize: 22 }}>RM</span> 3,600
        <span style={{ opacity: 0.5, fontSize: 24 }}>.00</span>
      </div>
      <div style={{ marginTop: 6, fontFamily: 'Kalam', fontSize: 11, opacity: 0.5 }}>tap to edit ✎</div>
    </div>

    {/* Field chips */}
    <div className="wf-box" style={{ padding: 0, marginTop: 22, overflow: 'hidden' }}>
      {[
    ['📁', 'Project', 'Saffron Park'],
    ['🏷', 'Category', 'Client Retainer'],
    ['📅', 'Date', '6 May 2026'],
    ['●', 'Status', 'Paid'],
    ['👤', 'Client', '—'],
    ['#', 'Reference', '—'],
    ['📝', 'Notes', '—']].
    map(([g, k, v], i, a) =>
    <div key={k} style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '9px 12px', fontFamily: 'Kalam', fontSize: 12,
      borderBottom: i < a.length - 1 ? '1px solid rgba(127,127,127,0.2)' : 'none'
    }}>
          <span>{g}</span>
          <span style={{ flex: 1, opacity: 0.6 }}>{k}</span>
          <span style={{ fontWeight: 600 }}>{v} ›</span>
        </div>
    )}
    </div>

    <Note style={{ position: 'absolute', left: -10, top: 110, width: 100, fontSize: 12 }}>
      BOLD: amount<br />as hero · fields<br />compact below
    </Note>
  </div>;


// ───────────────────────────────────
// RECURRING ENTRIES — 3 directions
// ───────────────────────────────────

// R_A — List view (filled state)
const R_A = ({ dark = false }) =>
<div className={`wf-screen ${dark ? 'dark' : ''}`}>
    <StatusBar dark={dark} />
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div className="wf-h1" style={{ margin: 0 }}>Recurring</div>
      <div style={{
      padding: '4px 10px', borderRadius: 999, border: '1.3px solid var(--hi-blue)',
      color: 'var(--hi-blue)', fontFamily: 'Kalam', fontSize: 11, fontWeight: 700
    }}>+ New</div>
    </div>

    <div className="wf-label" style={{ marginTop: 12, marginBottom: 4 }}>ACTIVE · 3</div>
    <div className="wf-box" style={{ padding: 0 }}>
      {[
    { name: 'Adobe CC', cat: 'Software', freq: 'Monthly', amt: '89.00', kind: 'neg', next: 'in 4d' },
    { name: 'Studio Rent', cat: 'Overhead', freq: 'Monthly', amt: '2,400.00', kind: 'neg', next: 'in 12d' },
    { name: 'Saffron Retainer', cat: 'Income', freq: 'Monthly', amt: '3,600.00', kind: 'pos', next: 'in 26d' }].
    map((r, i, a) =>
    <div key={r.name} style={{
      padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10,
      borderBottom: i < a.length - 1 ? '1px solid rgba(127,127,127,0.2)' : 'none'
    }}>
          <div className="wf-circle" style={{
        width: 28, height: 28,
        borderColor: r.kind === 'pos' ? 'var(--hi-green)' : 'var(--hi-red)'
      }}>
            <span style={{ fontSize: 11 }}>↻</span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: 'Kalam', fontSize: 12, fontWeight: 700 }}>{r.name}</div>
            <div className="wf-label" style={{ fontSize: 10 }}>{r.cat} · {r.freq} · next {r.next}</div>
          </div>
          <div className={`wf-amount ${r.kind}`} style={{ fontSize: 12 }}>
            {r.kind === 'pos' ? '+' : '−'} {r.amt}
          </div>
        </div>
    )}
    </div>

    <div className="wf-label" style={{ marginTop: 14, marginBottom: 4 }}>UP NEXT · this month</div>
    <div className="wf-box" style={{ padding: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Kalam', fontSize: 12 }}>
        <span>Net impact</span>
        <span className="wf-amount pos">+ 1,111.00</span>
      </div>
    </div>

    <Annotate top={80} right={-72} arrow={{ pos: { left: -50, top: -8 }, flip: true }}>
      list w/ next-due<br />chip + summary
    </Annotate>

    <TabBar active="settings" dark={dark} style="fab" />
  </div>;


// R_B — New Recurring Entry FORM (refined from upload, no bottom-sheet)
const R_B = ({ dark = true }) =>
<div className={`wf-screen ${dark ? 'dark' : ''}`}>
    <StatusBar dark={dark} />
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontSize: 16 }}>×</span>
      <span style={{ fontFamily: 'Kalam', fontSize: 12, color: 'var(--hi-blue)', fontWeight: 700 }}>Save</span>
    </div>
    <div className="wf-h1" style={{ marginTop: 4 }}>New Recurring</div>

    {/* Amount hero */}
    <div className="wf-box" style={{ padding: 14, textAlign: 'center', marginBottom: 10 }}>
      <div className="wf-label">Amount (RM)</div>
      <div style={{ fontFamily: 'Kalam', fontSize: 36, fontWeight: 700, color: 'var(--hi-red)', letterSpacing: -0.5, lineHeight: 1.1, marginTop: 2 }}>
        <span style={{ opacity: 0.5, fontSize: 18 }}>RM</span> 0<span style={{ opacity: 0.5 }}>.00</span>
      </div>
    </div>

    {/* Title / Category / Vendor */}
    {[
  ['Title', 'e.g. Adobe License'],
  ['Category', 'e.g. Software Subscriptions'],
  ['Vendor / Client', 'e.g. Adobe Systems']].
  map(([k, v]) =>
  <div key={k} style={{ marginBottom: 8 }}>
        <div className="wf-label" style={{ marginBottom: 3 }}>{k}</div>
        <div className="wf-box" style={{ padding: '9px 12px', fontFamily: 'Kalam', fontSize: 12, opacity: 0.5 }}>{v}</div>
      </div>
  )}

    {/* Repeat frequency — segmented */}
    <div className="wf-label" style={{ marginBottom: 4 }}>Repeat</div>
    <div style={{ display: 'flex', gap: 4, marginBottom: 10, flexWrap: 'wrap' }}>
      {['Weekly', 'Monthly', 'Quarterly', 'Yearly'].map((f, i) =>
    <div key={f} className={`wf-tab ${i === 1 ? 'active' : ''}`} style={{ fontSize: 11 }}>{f}</div>
    )}
    </div>

    {/* Start Date + End Date side by side */}
    <div style={{ display: 'flex', gap: 8 }}>
      <div style={{ flex: 1 }}>
        <div className="wf-label" style={{ marginBottom: 3 }}>Start Date</div>
        <div className="wf-box" style={{ padding: '9px 12px', fontFamily: 'Kalam', fontSize: 12, fontWeight: 700 }}>6 May 2026</div>
      </div>
      <div style={{ flex: 1 }}>
        <div className="wf-label" style={{ marginBottom: 3 }}>End Date</div>
        <div className="wf-box" style={{ padding: '9px 12px', fontFamily: 'Kalam', fontSize: 12, opacity: 0.6 }}>Never ›</div>
      </div>
    </div>

    <Note style={{ position: 'absolute', left: -10, top: 90, width: 100, fontSize: 12 }}>
      amount hero<br />+ start/end<br />side-by-side<br />+ frequency<br />segmented
    </Note>
  </div>;


// R_C — Recurring detail / occurrences timeline
const R_C = ({ dark = false }) =>
<div className={`wf-screen ${dark ? 'dark' : ''}`}>
    <StatusBar dark={dark} />
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ fontSize: 16 }}>‹</span>
      <span style={{ fontFamily: 'Kalam', fontSize: 12, opacity: 0.6 }}>Recurring</span>
    </div>
    <div className="wf-h1" style={{ marginTop: 2 }}>Adobe CC</div>

    {/* hero amount */}
    <div className="wf-box" style={{ padding: 14, marginBottom: 10 }}>
      <div className="wf-label">Monthly · Software</div>
      <div style={{ fontFamily: 'Kalam', fontSize: 30, fontWeight: 700, color: 'var(--hi-red)', marginTop: 2 }}>
        − RM 89.00
      </div>
      <div className="wf-label" style={{ marginTop: 4 }}>Next: 10 May 2026 · auto</div>
    </div>

    <div className="wf-label" style={{ marginBottom: 4 }}>UPCOMING · 6</div>
    <div className="wf-box" style={{ padding: 10 }}>
      {/* timeline */}
      <div style={{ position: 'relative', paddingLeft: 16 }}>
        <div style={{ position: 'absolute', left: 4, top: 4, bottom: 4, width: 1.3, background: 'currentColor', opacity: 0.3 }} />
        {['10 May', '10 Jun', '10 Jul', '10 Aug', '10 Sep'].map((d, i) =>
      <div key={d} style={{ position: 'relative', padding: '4px 0', display: 'flex', justifyContent: 'space-between', fontFamily: 'Kalam', fontSize: 11 }}>
            <div style={{ position: 'absolute', left: -16, top: 8, width: 8, height: 8, borderRadius: '50%', border: '1.3px solid currentColor', background: i === 0 ? 'currentColor' : 'transparent' }} />
            <span>{d}</span>
            <span className="neg">− 89.00</span>
          </div>
      )}
      </div>
    </div>

    <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
      <div style={{ flex: 1, padding: 10, border: '1.5px solid currentColor', borderRadius: 12, textAlign: 'center', fontFamily: 'Kalam', fontWeight: 700, fontSize: 12 }}>Pause</div>
      <div style={{ flex: 1, padding: 10, border: '1.5px solid var(--hi-red)', color: 'var(--hi-red)', borderRadius: 12, textAlign: 'center', fontFamily: 'Kalam', fontWeight: 700, fontSize: 12 }}>End</div>
    </div>

    <Annotate top={150} right={-72} arrow={{ pos: { left: -50, top: -8 }, flip: true }}>
      timeline of<br />upcoming hits
    </Annotate>
  </div>;


Object.assign(window, { E_A, E_B, E_C, ET_A, ET_B, ET_C, R_A, R_B, R_C });