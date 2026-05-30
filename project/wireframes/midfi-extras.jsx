// MID-FI components for Empty States, Edit Transaction, Recurring Entries.
// Mirrors the visual system from midfi-screens.jsx (own scope, redefined helpers).

const _SFx = '-apple-system, "SF Pro Display", "SF Pro Text", "Inter", system-ui, sans-serif';
const _COLx = {
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

const _Cardx = (dark, radius) => ({ children, style = {}, onClick }) => {
  const c = _COLx[dark ? 'dark' : 'light'];
  return (
    <div onClick={onClick} style={{
      background: c.surface, borderRadius: radius, padding: 18,
      boxShadow: dark ? 'inset 0 1px 0 rgba(255,255,255,0.04)' : '0 1px 2px rgba(0,0,0,0.04)',
      ...style
    }}>{children}</div>);
};

const _LargeTitlex = ({ title, dark, trailing, leading }) => {
  const c = _COLx[dark ? 'dark' : 'light'];
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

// iOS 26 Liquid Glass tab bar — floating pill + detached FAB
const _TabBarx = ({ active, dark }) => {
  const c = _COLx[dark ? 'dark' : 'light'];
  const tabs = [
    { id: 'home', label: 'Dashboard', icon: '⌂' },
    { id: 'projects', label: 'Projects', icon: '◰' },
    { id: 'ledger', label: 'Ledger', icon: '☰' },
    { id: 'settings', label: 'Settings', icon: '⚙' }
  ];

  const glassBg = dark
    ? 'linear-gradient(180deg, rgba(40,40,44,0.55) 0%, rgba(20,20,22,0.45) 100%)'
    : 'linear-gradient(180deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.42) 100%)';

  const Tab = ({ t }) => {
    const isActive = t.id === active;
    return (
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 2px' }}>
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
          padding: isActive ? '8px 14px' : '8px 10px', borderRadius: 999,
          background: isActive ? (dark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.06)') : 'transparent',
          color: isActive ? c.text : c.text2,
          fontSize: 10, fontWeight: 600,
          boxShadow: isActive
            ? (dark ? 'inset 0 0.5px 0 rgba(255,255,255,0.18)' : 'inset 0 0.5px 0 rgba(255,255,255,0.6)')
            : 'none'
        }}>
          <span style={{ fontSize: 20, lineHeight: 1 }}>{t.icon}</span>
          {t.label}
        </div>
      </div>);
  };

  return (
    <div style={{
      position: 'absolute', bottom: 18, left: 14, right: 14,
      display: 'flex', alignItems: 'center', gap: 10
    }}>
      <div style={{
        flex: 1, position: 'relative', borderRadius: 32,
        background: glassBg,
        backdropFilter: 'blur(32px) saturate(180%)',
        WebkitBackdropFilter: 'blur(32px) saturate(180%)',
        boxShadow: dark
          ? '0 12px 36px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.06) inset, 0 -1px 0 rgba(0,0,0,0.2) inset, 0 0 0 0.5px rgba(255,255,255,0.08)'
          : '0 12px 36px rgba(0,0,0,0.12), 0 1px 0 rgba(255,255,255,0.9) inset, 0 -1px 0 rgba(0,0,0,0.04) inset, 0 0 0 0.5px rgba(0,0,0,0.04)',
        padding: 6, display: 'flex', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '50%',
          background: dark
            ? 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 100%)'
            : 'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 100%)',
          borderRadius: '32px 32px 0 0', pointerEvents: 'none'
        }} />
        <div style={{ position: 'relative', display: 'flex', flex: 1 }}>
          {tabs.map((t) => <Tab key={t.id} t={t} />)}
        </div>
      </div>

      <div style={{
        width: 56, height: 56, borderRadius: '50%',
        background: 'linear-gradient(135deg, #FF6B3D 0%, #E0451F 100%)',
        color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 26, fontWeight: 300, lineHeight: 1,
        boxShadow: '0 12px 28px rgba(224,69,31,0.5), inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.15), 0 0 0 0.5px rgba(255,255,255,0.15)',
        position: 'relative', flexShrink: 0
      }}>
        +
        <div style={{
          position: 'absolute', top: 6, left: 8, right: 8, height: '40%',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 100%)',
          borderRadius: '50% 50% 40% 40%', pointerEvents: 'none'
        }} />
      </div>
    </div>);
};

// ─────────────────────────────────────────────────────
// EMPTY STATE — Projects (B)
// ─────────────────────────────────────────────────────
const MidFi_EmptyProjects = ({ dark = true, radius = 20 }) => {
  const c = _COLx[dark ? 'dark' : 'light'];
  return (
    <div style={{ background: c.bg, color: c.text, height: '100%', boxSizing: 'border-box', fontFamily: _SFx, paddingBottom: 96, position: 'relative', overflow: 'hidden' }}>
      <_LargeTitlex title="Projects" dark={dark} trailing={
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: c.tint, color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 20, fontWeight: 300, lineHeight: 1,
          boxShadow: dark ? '0 4px 12px rgba(10,132,255,0.4)' : '0 4px 12px rgba(0,122,255,0.3)'
        }}>+</div>
      } />

      {/* hero illustration — stacked folder cards */}
      <div style={{
        position: 'absolute', top: 180, left: '50%', transform: 'translateX(-50%)',
        width: 200, height: 160
      }}>
        {[2, 1, 0].map((i) =>
          <div key={i} style={{
            position: 'absolute',
            left: 30 - i * 12, top: i * 10,
            width: 140, height: 100, borderRadius: 18,
            background: i === 0 ? c.surface : (dark ? `rgba(28,28,30,${0.55 - i * 0.18})` : `rgba(255,255,255,${0.6 - i * 0.18})`),
            border: dark ? '0.5px solid rgba(255,255,255,0.06)' : '0.5px solid rgba(0,0,0,0.06)',
            boxShadow: i === 0 ? (dark ? '0 18px 40px rgba(0,0,0,0.5)' : '0 12px 28px rgba(0,0,0,0.08)') : 'none',
            transform: `rotate(${(i - 1) * 4}deg)`,
            display: i === 0 ? 'flex' : 'block',
            alignItems: 'flex-start', padding: 14, boxSizing: 'border-box'
          }}>
            {i === 0 && <>
              <div style={{
                width: 28, height: 28, borderRadius: 8,
                background: 'linear-gradient(135deg, #5AA9FF, #2070D8)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14
              }}>📁</div>
              <div style={{ marginLeft: 10, flex: 1 }}>
                <div style={{ height: 8, width: 78, borderRadius: 4, background: c.text2, opacity: 0.4 }} />
                <div style={{ height: 6, width: 50, borderRadius: 3, background: c.text2, opacity: 0.25, marginTop: 6 }} />
                <div style={{ height: 6, width: 38, borderRadius: 3, background: c.pos, opacity: 0.6, marginTop: 14 }} />
              </div>
            </>}
          </div>
        )}
      </div>

      {/* copy */}
      <div style={{ position: 'absolute', top: 380, left: 0, right: 0, padding: '0 32px', textAlign: 'center' }}>
        <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.4 }}>Spin up your first project</div>
        <div style={{ marginTop: 8, color: c.text2, fontSize: 15, lineHeight: 1.4 }}>
          Group transactions, track budgets, and see real P&amp;L per client or shoot.
        </div>
      </div>

      {/* primary + secondary */}
      <div style={{ position: 'absolute', bottom: 110, left: 18, right: 18 }}>
        <div style={{
          padding: 16, borderRadius: 16, textAlign: 'center',
          background: c.tint, color: '#fff', fontSize: 16, fontWeight: 600,
          boxShadow: '0 8px 24px rgba(10,132,255,0.35)'
        }}>+ New Project</div>
        <div style={{ marginTop: 12, textAlign: 'center', color: c.tint, fontSize: 14, fontWeight: 500 }}>
          Import from CSV →
        </div>
      </div>

      <_TabBarx active="projects" dark={dark} />
    </div>);
};

// ─────────────────────────────────────────────────────
// EMPTY STATE — Search no-results (Ledger)
// ─────────────────────────────────────────────────────
const MidFi_EmptySearch = ({ dark = false, radius = 20 }) => {
  const c = _COLx[dark ? 'dark' : 'light'];
  return (
    <div style={{ background: c.bg, color: c.text, height: '100%', boxSizing: 'border-box', fontFamily: _SFx, paddingBottom: 96, position: 'relative', overflow: 'hidden' }}>
      <_LargeTitlex title="Ledger" dark={dark} />

      {/* active search bar with query */}
      <div style={{ padding: '0 18px 12px' }}>
        <div style={{
          background: dark ? 'rgba(120,120,128,0.24)' : 'rgba(118,118,128,0.12)',
          borderRadius: 10, padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 8,
          color: c.text, fontSize: 15
        }}>
          <span style={{ color: c.text2 }}>⌕</span>
          <span style={{ flex: 1 }}>camera rental</span>
          <div style={{
            width: 18, height: 18, borderRadius: '50%', background: c.text2, color: c.bg,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700
          }}>×</div>
        </div>
      </div>

      {/* filter chips (active) */}
      <div style={{ padding: '0 18px 18px', display: 'flex', gap: 6, overflowX: 'auto' }}>
        {[{ l: '90 days', active: true }, { l: 'Expenses', active: true }, { l: 'All projects' }].map((f, i) =>
          <div key={i} style={{
            padding: '6px 12px', borderRadius: 999,
            background: f.active ? c.text : dark ? 'rgba(120,120,128,0.18)' : 'rgba(118,118,128,0.1)',
            color: f.active ? c.bg : c.text,
            fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap'
          }}>{f.l}{f.active && ' ×'}</div>
        )}
      </div>

      {/* illustration: magnifier over empty card */}
      <div style={{
        position: 'absolute', top: 260, left: '50%', transform: 'translateX(-50%)',
        width: 120, height: 120
      }}>
        <div style={{
          position: 'absolute', inset: 0, borderRadius: 24,
          background: dark ? 'rgba(28,28,30,0.6)' : '#fff',
          border: `0.5px solid ${c.sep}`,
          boxShadow: dark ? '0 14px 30px rgba(0,0,0,0.4)' : '0 10px 24px rgba(0,0,0,0.06)',
          transform: 'rotate(-6deg)'
        }} />
        <div style={{ position: 'absolute', top: 20, left: 20, right: 20, height: 6, borderRadius: 3, background: c.text3, transform: 'rotate(-6deg)' }} />
        <div style={{ position: 'absolute', top: 40, left: 20, width: 60, height: 6, borderRadius: 3, background: c.text3, transform: 'rotate(-6deg)' }} />
        <div style={{
          position: 'absolute', right: -14, bottom: -14,
          width: 64, height: 64, borderRadius: '50%',
          border: `4px solid ${c.tint}`,
          background: dark ? 'rgba(10,132,255,0.12)' : 'rgba(0,122,255,0.08)'
        }} />
        <div style={{
          position: 'absolute', right: -30, bottom: -30,
          width: 24, height: 6, borderRadius: 3, background: c.tint,
          transform: 'rotate(45deg)'
        }} />
      </div>

      {/* copy */}
      <div style={{ position: 'absolute', top: 410, left: 0, right: 0, padding: '0 32px', textAlign: 'center' }}>
        <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: -0.3 }}>No matches found</div>
        <div style={{ marginTop: 6, color: c.text2, fontSize: 14, lineHeight: 1.4 }}>
          Try a different keyword or broaden the date filter.
        </div>
      </div>

      {/* suggestion chips */}
      <div style={{ position: 'absolute', top: 500, left: 0, right: 0, padding: '0 24px', display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
        {['rental', 'equipment', 'last 90 days', 'all projects'].map((s) =>
          <div key={s} style={{
            padding: '6px 12px', borderRadius: 999,
            background: c.surface, color: c.tint, fontSize: 13, fontWeight: 500,
            border: `0.5px solid ${c.sep}`
          }}>+ {s}</div>
        )}
      </div>

      <div style={{ position: 'absolute', bottom: 110, left: 18, right: 18, textAlign: 'center' }}>
        <div style={{
          padding: 14, borderRadius: 14,
          background: c.surface, color: c.tint, fontSize: 15, fontWeight: 600,
          border: `0.5px solid ${c.sep}`
        }}>Clear search</div>
      </div>

      <_TabBarx active="ledger" dark={dark} />
    </div>);
};

// ─────────────────────────────────────────────────────
// EDIT TRANSACTION — compact one-screen form (mid-fi)
// ─────────────────────────────────────────────────────
const MidFi_EditTransaction = ({ dark = true, radius = 20 }) => {
  const c = _COLx[dark ? 'dark' : 'light'];
  const Card = _Cardx(dark, 14);

  const Field = ({ label, value, placeholder, trailing }) =>
    <div>
      <div style={{ fontSize: 11, color: c.text2, fontWeight: 600, letterSpacing: 0.3, textTransform: 'uppercase', marginBottom: 4 }}>{label}</div>
      <div style={{
        background: c.surface, borderRadius: 12, padding: '10px 12px',
        display: 'flex', alignItems: 'center', gap: 6, minHeight: 22,
        border: dark ? '0.5px solid rgba(255,255,255,0.06)' : '0.5px solid rgba(0,0,0,0.04)'
      }}>
        <span style={{
          flex: 1, fontSize: 14, fontWeight: value ? 600 : 400,
          color: value ? c.text : c.text3,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          fontFeatureSettings: '"tnum"'
        }}>{value || placeholder}</span>
        {trailing && <span style={{ color: c.text3, fontSize: 14 }}>{trailing}</span>}
      </div>
    </div>;

  return (
    <div style={{ background: c.bg, color: c.text, height: '100%', boxSizing: 'border-box', fontFamily: _SFx, position: 'relative', overflow: 'hidden' }}>
      {/* nav bar */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '10px 18px', minHeight: 44
      }}>
        <span style={{ fontSize: 15, color: c.tint }}>Cancel</span>
        <span style={{ fontSize: 16, fontWeight: 600 }}>Edit Transaction</span>
        <span style={{ fontSize: 15, color: c.tint, fontWeight: 700 }}>Save</span>
      </div>

      <div style={{ padding: '6px 18px' }}>
        {/* Amount first, full width */}
        <Field label="Amount (RM)" value="3,600.00" />

        {/* Category | Date */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 8 }}>
          <Field label="Category" value="Client Retainer" trailing="›" />
          <Field label="Date" value="6 May 2026" trailing="›" />
        </div>

        {/* Vendor full-width */}
        <div style={{ marginTop: 8 }}>
          <Field label="Vendor" value="Saffron Park Sdn Bhd" />
        </div>

        {/* Client name full-width */}
        <div style={{ marginTop: 8 }}>
          <Field label="Client Name" placeholder="—" />
        </div>

        {/* Reference | Tax */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 8 }}>
          <Field label="Reference" placeholder="invoice #" />
          <Field label="Tax (RM)" value="0.00" />
        </div>

        {/* Notes full-width */}
        <div style={{ marginTop: 8 }}>
          <Field label="Notes" placeholder="tap to add…" />
        </div>

        {/* Documents */}
        <div style={{ marginTop: 12 }}>
          <div style={{ fontSize: 11, color: c.text2, fontWeight: 600, letterSpacing: 0.3, textTransform: 'uppercase', marginBottom: 6 }}>Documents</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{
              flex: 1, height: 64, borderRadius: 12, position: 'relative', overflow: 'hidden',
              background: dark ? '#2a2622' : '#e8e3d6'
            }}>
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(135deg, #f5f1e8 0%, #d8d2c2 100%)'
              }} />
              <div style={{
                position: 'absolute', inset: 8, fontFamily: '"SF Mono", monospace',
                fontSize: 7, color: '#1a1816', lineHeight: 1.4, opacity: 0.6
              }}>
                B&H PHOTO<br />SSD 2TB · 1,899<br />SD card · 129<br />TOTAL 2,828
              </div>
              <div style={{
                position: 'absolute', top: 6, right: 6,
                width: 18, height: 18, borderRadius: '50%',
                background: 'rgba(0,0,0,0.5)', color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11
              }}>×</div>
            </div>
            <div style={{
              width: 64, height: 64, borderRadius: 12,
              background: c.surface, color: c.tint, fontSize: 24, fontWeight: 300,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: `0.5px dashed ${c.text3}`
            }}>+</div>
          </div>
        </div>
      </div>
    </div>);
};

// ─────────────────────────────────────────────────────
// RECURRING — list (filled state)
// ─────────────────────────────────────────────────────
const MidFi_Recurring = ({ dark = true, radius = 20, density = 'comfy' }) => {
  const c = _COLx[dark ? 'dark' : 'light'];
  const Card = _Cardx(dark, radius);
  const dense = density === 'compact';

  const items = [
    { name: 'Adobe CC', cat: 'Software', freq: 'Monthly', amt: '89.00', kind: 'neg', next: 'in 4d', icon: '🅰', tone: '#FF6B3D' },
    { name: 'Studio Rent', cat: 'Overhead', freq: 'Monthly', amt: '2,400.00', kind: 'neg', next: 'in 12d', icon: '🏢', tone: '#5AA9FF' },
    { name: 'Saffron Retainer', cat: 'Income', freq: 'Monthly', amt: '3,600.00', kind: 'pos', next: 'in 26d', icon: '💼', tone: '#30D158' }
  ];

  return (
    <div style={{ background: c.bg, color: c.text, height: '100%', boxSizing: 'border-box', fontFamily: _SFx, paddingBottom: 96, position: 'relative', overflow: 'auto' }}>
      <_LargeTitlex title="Recurring" dark={dark} leading={
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: c.tint, fontSize: 16 }}>
          <span style={{ fontSize: 20 }}>‹</span> Settings
        </div>
      } trailing={
        <div style={{
          padding: '6px 12px', borderRadius: 999, background: c.tint,
          color: '#fff', fontSize: 13, fontWeight: 600
        }}>+ New</div>
      } />

      {/* Summary hero */}
      <div style={{ padding: '0 18px', marginBottom: 18 }}>
        <Card style={{ padding: 18 }}>
          <div style={{ color: c.text2, fontSize: 12, fontWeight: 600, letterSpacing: 0.3, textTransform: 'uppercase' }}>Net impact · this month</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginTop: 6 }}>
            <div style={{ fontSize: 32, fontWeight: 700, color: c.pos, letterSpacing: -0.8, fontFeatureSettings: '"tnum"' }}>
              <span style={{ fontSize: 18, opacity: 0.7, marginRight: 2 }}>+RM</span>1,111<span style={{ opacity: 0.5, fontSize: 18 }}>.00</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <div style={{ flex: 1, padding: 10, borderRadius: 12, background: dark ? 'rgba(48,209,88,0.12)' : 'rgba(0,163,92,0.08)' }}>
              <div style={{ fontSize: 11, color: c.text2 }}>Income</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: c.pos, fontFeatureSettings: '"tnum"', marginTop: 2 }}>+ 3,600</div>
            </div>
            <div style={{ flex: 1, padding: 10, borderRadius: 12, background: dark ? 'rgba(255,107,61,0.12)' : 'rgba(224,69,31,0.08)' }}>
              <div style={{ fontSize: 11, color: c.text2 }}>Expenses</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: c.neg, fontFeatureSettings: '"tnum"', marginTop: 2 }}>− 2,489</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Active list */}
      <div style={{ padding: '0 22px 6px', fontSize: 13, fontWeight: 600, color: c.text2, textTransform: 'uppercase', letterSpacing: 0.4 }}>Active · {items.length}</div>
      <div style={{ padding: '0 18px' }}>
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          {items.map((t, i) =>
            <div key={t.name} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: dense ? '11px 16px' : '14px 16px',
              borderBottom: i < items.length - 1 ? `0.5px solid ${c.sep}` : 'none'
            }}>
              <div style={{
                width: 38, height: 38, borderRadius: 11,
                background: t.tone, color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
                position: 'relative'
              }}>
                {t.icon}
                <div style={{
                  position: 'absolute', bottom: -3, right: -3,
                  width: 16, height: 16, borderRadius: '50%',
                  background: c.surface, color: c.text2,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, border: `1.5px solid ${c.surface}`
                }}>↻</div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: -0.2 }}>{t.name}</div>
                <div style={{ color: c.text2, fontSize: 12, marginTop: 1 }}>{t.cat} · {t.freq} · next {t.next}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  fontSize: 15, fontWeight: 600,
                  color: t.kind === 'pos' ? c.pos : c.neg, fontFeatureSettings: '"tnum"'
                }}>
                  {t.kind === 'pos' ? '+' : '−'} {t.amt}
                </div>
                <div style={{
                  display: 'inline-block', marginTop: 3,
                  padding: '1px 6px', borderRadius: 6,
                  background: dark ? 'rgba(120,120,128,0.24)' : 'rgba(118,118,128,0.12)',
                  color: c.text2, fontSize: 9, fontWeight: 700, letterSpacing: 0.3
                }}>AUTO</div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>);
};

// ─────────────────────────────────────────────────────
// NEW RECURRING — entry form (mid-fi)
// ─────────────────────────────────────────────────────
const MidFi_NewRecurring = ({ dark = true, radius = 20 }) => {
  const c = _COLx[dark ? 'dark' : 'light'];

  const Field = ({ label, value, placeholder, trailing }) =>
    <div>
      <div style={{ fontSize: 11, color: c.text2, fontWeight: 600, letterSpacing: 0.3, textTransform: 'uppercase', marginBottom: 4 }}>{label}</div>
      <div style={{
        background: c.surface, borderRadius: 12, padding: '10px 12px',
        display: 'flex', alignItems: 'center', gap: 6, minHeight: 22,
        border: dark ? '0.5px solid rgba(255,255,255,0.06)' : '0.5px solid rgba(0,0,0,0.04)'
      }}>
        <span style={{
          flex: 1, fontSize: 14, fontWeight: value ? 600 : 400,
          color: value ? c.text : c.text3,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          fontFeatureSettings: '"tnum"'
        }}>{value || placeholder}</span>
        {trailing && <span style={{ color: c.text3, fontSize: 14 }}>{trailing}</span>}
      </div>
    </div>;

  return (
    <div style={{ background: c.bg, color: c.text, height: '100%', boxSizing: 'border-box', fontFamily: _SFx, position: 'relative', overflow: 'hidden' }}>
      {/* nav bar */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '10px 18px', minHeight: 44
      }}>
        <span style={{ fontSize: 15, color: c.tint }}>Cancel</span>
        <span style={{ fontSize: 16, fontWeight: 600 }}>New Recurring</span>
        <span style={{ fontSize: 15, color: c.tint, fontWeight: 700 }}>Save</span>
      </div>

      <div style={{ padding: '6px 18px' }}>
        {/* Amount first */}
        <Field label="Amount (RM)" value="0.00" />

        {/* Title | Category */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 8 }}>
          <Field label="Title" placeholder="e.g. Adobe" />
          <Field label="Category" placeholder="Software" trailing="›" />
        </div>

        {/* Vendor full-width */}
        <div style={{ marginTop: 8 }}>
          <Field label="Vendor / Client" placeholder="e.g. Adobe Systems" />
        </div>

        {/* Repeat segmented */}
        <div style={{ marginTop: 10 }}>
          <div style={{ fontSize: 11, color: c.text2, fontWeight: 600, letterSpacing: 0.3, textTransform: 'uppercase', marginBottom: 6 }}>Repeat</div>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2,
            background: dark ? 'rgba(120,120,128,0.24)' : 'rgba(118,118,128,0.12)',
            borderRadius: 9, padding: 2
          }}>
            {['Weekly', 'Monthly', 'Quarterly', 'Yearly'].map((f, i) =>
              <div key={f} style={{
                textAlign: 'center', padding: '7px 0', borderRadius: 7,
                background: i === 1 ? c.surface : 'transparent',
                color: i === 1 ? c.text : c.text2,
                fontSize: 12, fontWeight: 600,
                boxShadow: i === 1 ? '0 1px 2px rgba(0,0,0,0.1)' : 'none'
              }}>{f}</div>
            )}
          </div>
        </div>

        {/* Start Date | End Date */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 10 }}>
          <Field label="Start Date" value="6 May 2026" trailing="›" />
          <Field label="End Date" placeholder="Never" trailing="›" />
        </div>

        {/* Reminder toggle */}
        <div style={{ marginTop: 14, padding: '12px 14px', background: c.surface, borderRadius: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 30, height: 30, borderRadius: 8, background: '#FFB800',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14
          }}>🔔</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Remind me 1 day before</div>
            <div style={{ fontSize: 12, color: c.text2 }}>Push notification</div>
          </div>
          {/* iOS switch */}
          <div style={{
            width: 51, height: 31, borderRadius: 999, background: c.pos,
            position: 'relative', padding: 2, boxSizing: 'border-box'
          }}>
            <div style={{
              width: 27, height: 27, borderRadius: '50%', background: '#fff',
              position: 'absolute', right: 2, top: 2,
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }} />
          </div>
        </div>
      </div>
    </div>);
};

Object.assign(window, {
  MidFi_EmptyProjects, MidFi_EmptySearch, MidFi_EditTransaction, MidFi_Recurring, MidFi_NewRecurring
});
