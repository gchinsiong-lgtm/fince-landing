// MID-FI — Settings ▸ Customize Categories sub-page
// Shares the _COL palette + SF font stack with the rest of mid-fi.

const _SF_CAT = '-apple-system, "SF Pro Display", "SF Pro Text", "Inter", system-ui, sans-serif';
const _COL_CAT = {
  light: {
    bg: '#F2F2F7', surface: '#FFFFFF', surface2: '#F8F8FB',
    text: '#000', text2: 'rgba(60,60,67,0.6)', text3: 'rgba(60,60,67,0.3)',
    sep: 'rgba(60,60,67,0.12)', tint: '#007AFF',
    pos: '#00A35C', neg: '#E0451F',
    posBg: 'rgba(0,163,92,0.12)', negBg: 'rgba(224,69,31,0.12)',
    grayChip: 'rgba(118,118,128,0.12)',
  },
  dark: {
    bg: '#000', surface: '#1C1C1E', surface2: '#2C2C2E',
    text: '#fff', text2: 'rgba(235,235,245,0.6)', text3: 'rgba(235,235,245,0.3)',
    sep: 'rgba(84,84,88,0.65)', tint: '#0A84FF',
    pos: '#30D158', neg: '#FF6B3D',
    posBg: 'rgba(48,209,88,0.18)', negBg: 'rgba(255,107,61,0.18)',
    grayChip: 'rgba(120,120,128,0.24)',
  },
};

// ─────────────────────────────────────────────────────
// Category seed data
// ─────────────────────────────────────────────────────
const CATS = {
  business: {
    income: [
      { id: 'client',    label: 'Client Services',     glyph: '💼', tint: '#5AA9FF', count: 18 },
      { id: 'product',   label: 'Product Sales',       glyph: '🏷️', tint: '#30D158', count: 7  },
      { id: 'otherInB',  label: 'Other Income',        glyph: '✨', tint: '#A78BFA', count: 2  },
    ],
    expenses: [
      { id: 'software',  label: 'Software & Subscriptions', glyph: '💿', tint: '#5AA9FF', count: 12 },
      { id: 'equipment', label: 'Equipment & Hardware',     glyph: '🛠', tint: '#FFB800', count: 6  },
      { id: 'meals',     label: 'Meals & Entertainment',    glyph: '🍽',  tint: '#FF6B3D', count: 9  },
      { id: 'travel',    label: 'Travel & Transport',       glyph: '✈️', tint: '#34C7C0', count: 4  },
      { id: 'marketing', label: 'Marketing & Ads',          glyph: '📣', tint: '#FF2D8E', count: 11 },
      { id: 'inventory', label: 'Inventory & Shipping',     glyph: '📦', tint: '#A78BFA', count: 3  },
      { id: 'office',    label: 'Office & Admin',           glyph: '📎', tint: '#8E8E93', count: 8  },
      { id: 'personalX', label: 'Personal / Non-Business',  glyph: '🚫', tint: '#E0451F', count: 1, muted: true },
    ],
  },
  personal: {
    income: [
      { id: 'salary',    label: "Salary / Owner's Draw", glyph: '💵', tint: '#30D158', count: 12 },
      { id: 'invest',    label: 'Investments',           glyph: '📈', tint: '#5AA9FF', count: 5  },
      { id: 'otherInP',  label: 'Other Income',          glyph: '✨', tint: '#A78BFA', count: 3  },
    ],
    expenses: [
      { id: 'food',      label: 'Food & Dining',         glyph: '🍽',  tint: '#FF6B3D', count: 24 },
      { id: 'housing',   label: 'Housing & Utilities',   glyph: '🏠', tint: '#5AA9FF', count: 9  },
      { id: 'transport', label: 'Transportation',        glyph: '🚗', tint: '#34C7C0', count: 14 },
      { id: 'shopping',  label: 'Shopping & Hobbies',    glyph: '🛍', tint: '#FF2D8E', count: 17 },
      { id: 'leisure',   label: 'Travel & Leisure',      glyph: '✈️', tint: '#A78BFA', count: 4  },
      { id: 'health',    label: 'Health & Fitness',      glyph: '🏃', tint: '#30D158', count: 8  },
    ],
  },
};

// ─────────────────────────────────────────────────────
// Atoms
// ─────────────────────────────────────────────────────
const _CatCard = (dark, radius) => ({ children, style = {} }) => {
  const c = _COL_CAT[dark ? 'dark' : 'light'];
  return (
    <div style={{
      background: c.surface, borderRadius: radius, overflow: 'hidden',
      boxShadow: dark ? 'inset 0 1px 0 rgba(255,255,255,0.04)' : '0 1px 2px rgba(0,0,0,0.04)',
      ...style,
    }}>{children}</div>
  );
};

const _CatNavBar = ({ dark, title, ledger, edit, onEdit, onBack }) => {
  const c = _COL_CAT[dark ? 'dark' : 'light'];
  return (
    <div style={{ padding: '8px 14px 6px' }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        minHeight: 36,
      }}>
        <div onClick={onBack} style={{
          display: 'inline-flex', alignItems: 'center', gap: 2,
          color: c.tint, fontSize: 17, fontWeight: 400, padding: '4px 4px 4px 0',
        }}>
          <svg width="11" height="18" viewBox="0 0 11 18" style={{ marginRight: 2 }}>
            <path d="M9 1 1.5 9 9 17" stroke={c.tint} strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Settings
        </div>
        <div onClick={onEdit} style={{
          color: c.tint, fontSize: 16, fontWeight: edit ? 600 : 400,
          padding: '4px 4px',
        }}>{edit ? 'Done' : 'Edit'}</div>
      </div>
      <div style={{
        fontSize: 34, fontWeight: 700, letterSpacing: -0.4, lineHeight: 1.1,
        marginTop: 4, color: c.text, padding: '0 4px',
      }}>{title}</div>
      <div style={{ color: c.text2, fontSize: 14, padding: '4px 4px 0', lineHeight: 1.35 }}>
        {ledger === 'business'
          ? 'Tag transactions in your Business ledger.'
          : 'Tag transactions in your Personal ledger.'}
      </div>
    </div>
  );
};

// Segmented control — iOS style
const _Segmented = ({ dark, value, onChange, items }) => {
  const c = _COL_CAT[dark ? 'dark' : 'light'];
  return (
    <div style={{
      margin: '14px 18px 8px',
      background: c.grayChip,
      borderRadius: 9, padding: 2,
      display: 'flex', gap: 0,
    }}>
      {items.map(it => {
        const active = it.id === value;
        return (
          <div key={it.id} onClick={() => onChange(it.id)} style={{
            flex: 1, textAlign: 'center', padding: '7px 0',
            borderRadius: 7,
            background: active ? c.surface : 'transparent',
            color: active ? c.text : c.text2,
            fontSize: 13, fontWeight: 600, letterSpacing: -0.1,
            boxShadow: active ? (dark ? 'inset 0 0 0 0.5px rgba(255,255,255,0.06)' : '0 2px 6px rgba(0,0,0,0.08)') : 'none',
          }}>{it.label}</div>
        );
      })}
    </div>
  );
};

// Category row — same shape across normal / edit modes
const _CatRow = ({ dark, item, last, edit, kind, density }) => {
  const c = _COL_CAT[dark ? 'dark' : 'light'];
  const dense = density === 'compact';
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: dense ? '10px 14px' : '12px 14px',
      borderBottom: last ? 'none' : `0.5px solid ${c.sep}`,
      opacity: item.muted ? 0.55 : 1,
    }}>
      {edit && (
        <div style={{
          width: 22, height: 22, borderRadius: '50%',
          background: c.neg, color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 700, fontSize: 18, lineHeight: 1, paddingBottom: 2,
          flexShrink: 0,
        }}>−</div>
      )}
      <div style={{
        width: 32, height: 32, borderRadius: 9,
        background: item.tint + '26',
        color: item.tint,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 16, flexShrink: 0,
        border: `0.5px solid ${item.tint}33`,
      }}>{item.glyph}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 15, fontWeight: 500, letterSpacing: -0.2, color: c.text,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>{item.label}</div>
        {!edit && (
          <div style={{ color: c.text2, fontSize: 12, marginTop: 1 }}>
            {item.count} {item.count === 1 ? 'transaction' : 'transactions'}
            {item.muted ? ' · excluded from reports' : ''}
          </div>
        )}
      </div>
      {edit ? (
        <div style={{ color: c.text3, paddingRight: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
          <div style={{ width: 18, height: 1.5, background: c.text3, borderRadius: 1 }} />
          <div style={{ width: 18, height: 1.5, background: c.text3, borderRadius: 1 }} />
          <div style={{ width: 18, height: 1.5, background: c.text3, borderRadius: 1 }} />
        </div>
      ) : (
        <svg width="8" height="14" viewBox="0 0 8 14" style={{ flexShrink: 0 }}>
          <path d="M1 1l6 6-6 6" stroke={c.text3} strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
      )}
    </div>
  );
};

// Add-row at the bottom of a group
const _AddRow = ({ dark, label, density }) => {
  const c = _COL_CAT[dark ? 'dark' : 'light'];
  const dense = density === 'compact';
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: dense ? '10px 14px' : '12px 14px',
      color: c.tint,
    }}>
      <div style={{
        width: 22, height: 22, borderRadius: '50%',
        background: c.pos, color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: 700, fontSize: 16, lineHeight: 1,
        flexShrink: 0,
      }}>＋</div>
      <div style={{ fontSize: 15, fontWeight: 500, letterSpacing: -0.2 }}>{label}</div>
    </div>
  );
};

const _GroupHeader = ({ children, action, dark, total }) => {
  const c = _COL_CAT[dark ? 'dark' : 'light'];
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
      padding: '0 22px 6px',
    }}>
      <div style={{
        fontSize: 13, fontWeight: 600, color: c.text2,
        textTransform: 'uppercase', letterSpacing: 0.4,
      }}>{children}</div>
      {total != null && (
        <div style={{ color: c.text3, fontSize: 12, fontWeight: 500 }}>{total}</div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────
// Main screen
// ─────────────────────────────────────────────────────
const MidFi_Categories = ({
  dark = true,
  radius = 14,
  density = 'comfy',
  initialLedger = 'business',
  initialEdit = false,
}) => {
  const c = _COL_CAT[dark ? 'dark' : 'light'];
  const Card = _CatCard(dark, radius);
  const [ledger, setLedger] = React.useState(initialLedger);
  const [edit, setEdit] = React.useState(initialEdit);

  const data = CATS[ledger];

  return (
    <div style={{
      background: c.bg, color: c.text, height: '100%',
      boxSizing: 'border-box', fontFamily: _SF_CAT,
      position: 'relative', overflow: 'auto',
      paddingBottom: 28,
    }}>
      <_CatNavBar
        dark={dark}
        title="Categories"
        ledger={ledger}
        edit={edit}
        onEdit={() => setEdit(e => !e)}
        onBack={() => {}}
      />

      <_Segmented
        dark={dark}
        value={ledger}
        onChange={setLedger}
        items={[
          { id: 'business', label: 'Business Ledger' },
          { id: 'personal', label: 'Personal Ledger' },
        ]}
      />

      {/* INCOME */}
      <div style={{ marginTop: 18 }}>
        <_GroupHeader dark={dark} total={`${data.income.length} categories`}>Income</_GroupHeader>
        <div style={{ padding: '0 18px', marginBottom: 22 }}>
          <Card>
            {data.income.map((cat, i, a) => (
              <_CatRow
                key={cat.id} dark={dark} item={cat}
                last={i === a.length - 1 && edit}
                edit={edit} kind="pos" density={density}
              />
            ))}
            {!edit && (
              <div style={{ borderTop: `0.5px solid ${c.sep}` }}>
                <_AddRow dark={dark} label="Add income category" density={density} />
              </div>
            )}
            {edit && (
              <div style={{ borderTop: `0.5px solid ${c.sep}` }}>
                <_AddRow dark={dark} label="Add income category" density={density} />
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* EXPENSES */}
      <div>
        <_GroupHeader dark={dark} total={`${data.expenses.length} categories`}>Expenses</_GroupHeader>
        <div style={{ padding: '0 18px', marginBottom: 18 }}>
          <Card>
            {data.expenses.map((cat, i, a) => (
              <_CatRow
                key={cat.id} dark={dark} item={cat}
                last={i === a.length - 1 && edit}
                edit={edit} kind="neg" density={density}
              />
            ))}
            <div style={{ borderTop: `0.5px solid ${c.sep}` }}>
              <_AddRow dark={dark} label="Add expense category" density={density} />
            </div>
          </Card>
        </div>
      </div>

      {/* footnote */}
      <div style={{
        padding: '4px 22px 12px',
        color: c.text2, fontSize: 12, lineHeight: 1.5,
      }}>
        {edit
          ? 'Tap − to delete · drag ≡ to reorder. Deleting a category moves its transactions to Uncategorized.'
          : 'Categories are shared across all projects in this ledger. Switch ledgers above to edit the other set.'}
      </div>
    </div>
  );
};

window.MidFi_Categories = MidFi_Categories;
