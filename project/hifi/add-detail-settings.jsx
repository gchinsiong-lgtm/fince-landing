// Hi-fi Add — mid-fi C scan-first structure (no extra mode selector, no confidence %)
// Hi-fi Detail — mid-fi A clean iOS detail
// Hi-fi Settings — mid-fi B (Preferences + Recurring only)

// ─────────────────────────────────────────────────────
const HiFi_Add = () => {
  const c = window.FINCE.TOKENS.dark;
  const { FONT_UI, FONT_MONO } = window.FINCE;

  return (
    <div style={{
      background: '#000', color: '#fff', height: '100%',
      fontFamily: FONT_UI, position: 'relative', overflow: 'hidden',
      boxSizing: 'border-box',
    }}>
      {/* Viewfinder gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(120% 80% at 50% 40%, #2a241f 0%, #100c08 60%, #050403 100%)',
      }} />

      {/* Viewfinder corners */}
      {[[0,0],[1,0],[0,1],[1,1]].map(([x,y], idx) => (
        <div key={idx} style={{
          position: 'absolute', width: 30, height: 30,
          left:   x ? 'auto' : 24, right:  x ? 24 : 'auto',
          top:    y ? 'auto' : 96, bottom: y ? 290 : 'auto',
          borderTop:    y ? 'none' : '2.5px solid rgba(255,255,255,0.9)',
          borderBottom: y ? '2.5px solid rgba(255,255,255,0.9)' : 'none',
          borderLeft:   x ? 'none' : '2.5px solid rgba(255,255,255,0.9)',
          borderRight:  x ? '2.5px solid rgba(255,255,255,0.9)' : 'none',
          borderRadius: !x && !y ? '8px 0 0 0' : !y && x ? '0 8px 0 0' : !x && y ? '0 0 0 8px' : '0 0 8px 0',
        }} />
      ))}

      {/* Receipt */}
      <div style={{
        position: 'absolute', top: 110, left: 44, right: 44, bottom: 290,
        background: '#F5F1E6', borderRadius: 6,
        boxShadow: '0 24px 60px rgba(0,0,0,0.6), 0 0 0 0.5px rgba(255,255,255,0.06)',
        transform: 'rotate(-2deg)',
        padding: '16px 14px', color: '#1a1816',
        fontFamily: FONT_MONO, fontSize: 10, lineHeight: 1.7, overflow: 'hidden',
      }}>
        <div style={{ fontWeight: 700, fontSize: 12, letterSpacing: 0.3 }}>B&amp;H PHOTO VIDEO</div>
        <div style={{ opacity: 0.6, fontSize: 9 }}>420 9th Ave, NYC</div>
        <div style={{ borderTop: '1px dashed rgba(26,24,22,0.4)', margin: '8px 0' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>SSD 2TB</span><span>1,899.00</span></div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>SD card 256GB</span><span>129.38</span></div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Tripod plate</span><span>800.00</span></div>
        <div style={{ borderTop: '1px dashed rgba(26,24,22,0.4)', margin: '8px 0' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}><span>TOTAL</span><span>2,828.38</span></div>
      </div>

      {/* Top bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        zIndex: 10,
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '0.5px solid rgba(255,255,255,0.12)',
        }}><Icon name="close" size={18} stroke={2.2} color="#fff" /></div>
        <div style={{ fontSize: 15, fontWeight: 600, color: '#fff' }}>Scan Receipt</div>
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '0.5px solid rgba(255,255,255,0.12)',
        }}><Icon name="flash" size={18} stroke={2.2} color="#fff" fill="#fff" /></div>
      </div>

      {/* Parsed result */}
      <div style={{
        position: 'absolute', bottom: 130, left: 18, right: 18,
        background: 'rgba(28,28,30,0.85)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderRadius: 20, padding: 16, color: '#fff',
        border: '0.5px solid rgba(255,255,255,0.1)',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          fontSize: 11, fontWeight: 700, color: c.pos,
          textTransform: 'uppercase', letterSpacing: 0.5,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: 3, background: c.pos }} />
          Detected
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 8 }}>
          <div style={{ fontSize: 17, fontWeight: 600 }}>B&amp;H Photo</div>
          <div style={{
            fontSize: 22, fontWeight: 700, color: c.neg,
            fontFeatureSettings: '"tnum"', letterSpacing: -0.4,
          }}>− RM 2,828.38</div>
        </div>
        <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
          {['Hardware/Gear', 'Saffron Park', '1 May 2026'].map(t => (
            <div key={t} style={{
              padding: '4px 10px', borderRadius: 999,
              background: 'rgba(255,255,255,0.1)',
              fontSize: 12, fontWeight: 500,
            }}>{t}</div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
          <div style={{
            flex: 1, padding: 12, borderRadius: 12, textAlign: 'center',
            background: 'rgba(255,255,255,0.1)',
            fontSize: 14, fontWeight: 600,
          }}>Edit</div>
          <div style={{
            flex: 2, padding: 12, borderRadius: 12, textAlign: 'center',
            background: c.pos, color: '#000',
            fontSize: 14, fontWeight: 700,
          }}>Save Transaction</div>
        </div>
      </div>

      {/* Shutter */}
      <div style={{
        position: 'absolute', bottom: 30, left: 0, right: 0,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '0 32px',
      }}>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>Manual</div>
        <div style={{
          width: 64, height: 64, borderRadius: '50%',
          border: '3px solid rgba(255,255,255,0.9)',
          padding: 4, boxSizing: 'border-box',
        }}>
          <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#fff' }} />
        </div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>Album</div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────
const HiFi_Detail = ({ dark = true }) => {
  const c = window.FINCE.TOKENS[dark ? 'dark' : 'light'];
  const { FONT_UI } = window.FINCE;

  return (
    <div style={{
      background: c.bg, color: c.ink, height: '100%',
      fontFamily: FONT_UI, position: 'relative', overflow: 'auto',
      boxSizing: 'border-box', paddingBottom: 24,
    }}>
      <LargeTitle title="Transaction" dark={dark} />

      {/* Hero */}
      <div style={{ padding: '0 18px 18px' }}>
        <Card dark={dark} radius={20} padding={24} style={{ textAlign: 'center' }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16,
            background: c.posBg, color: c.pos,
            margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon name="arrowDownLeft" size={26} stroke={2.2} color={c.pos} />
          </div>
          <div style={{
            fontSize: 38, fontWeight: 700, color: c.pos,
            marginTop: 14, letterSpacing: -1,
            fontFeatureSettings: '"tnum"',
          }}>
            <span style={{ fontSize: 20, marginRight: 4, color: c.ink2, fontWeight: 600 }}>RM</span>
            3,600<span style={{ fontSize: 22, color: c.ink2, fontWeight: 600 }}>.00</span>
          </div>
          <div style={{ color: c.ink2, fontSize: 13, marginTop: 4 }}>Income · Client Retainer</div>
          <div style={{
            display: 'inline-block', marginTop: 10,
            padding: '3px 10px', borderRadius: 999,
            background: c.posBg, color: c.pos,
            fontSize: 11, fontWeight: 700, letterSpacing: 0.4,
          }} data-comment-anchor="b69fb3cafc-div-554-11">PAID</div>
        </Card>
      </div>

      {/* Details list */}
      <div style={{ padding: '0 18px 14px' }}>
        <Card dark={dark} padding={0} style={{ overflow: 'hidden' }}>
          {[
            ['Date',      '6 May 2026'],
            ['Project',   'Saffron Park Residences', c.tint],
            ['Client',    '—'],
            ['Reference', '—'],
            ['Receipt',   'receipt.pdf',               c.tint, 'paperclip'],
          ].map(([k, v, col, icon], i, a) => (
            <div key={k} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '14px 16px', fontSize: 15,
              borderBottom: i < a.length - 1 ? `0.5px solid ${c.sep}` : 'none',
            }}>
              <span style={{ color: c.ink2 }}>{k}</span>
              <span style={{
                color: col || c.ink, fontWeight: col ? 500 : 400,
                display: 'inline-flex', alignItems: 'center', gap: 6,
              }}>
                {icon && <Icon name={icon} size={14} stroke={2} color={col || c.ink} />}
                {v}
              </span>
            </div>
          ))}
        </Card>
      </div>

      {/* Actions */}
      <div style={{ padding: '0 18px', display: 'flex', gap: 10 }}>
        <div style={{
          flex: 1, padding: 14, borderRadius: 14, textAlign: 'center',
          background: c.tint, color: '#fff',
          fontSize: 15, fontWeight: 600,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        }}>
          <Icon name="edit" size={15} stroke={2.2} color="#fff" />
          Edit
        </div>
        <div style={{
          flex: 1, padding: 14, borderRadius: 14, textAlign: 'center',
          background: c.surface, color: c.neg,
          fontSize: 15, fontWeight: 600,
          border: `0.5px solid ${c.sep}`,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        }}>
          <Icon name="trash" size={15} stroke={2} color={c.neg} />
          Delete
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────
const HiFi_Settings = ({ dark = true }) => {
  const c = window.FINCE.TOKENS[dark ? 'dark' : 'light'];
  const { FONT_UI, WORKSPACE_TONES } = window.FINCE;
  const [page, setPage] = React.useState(0);

  const accounts = [
    { name: 'Filmpeak Studio', type: 'Business · 3 projects', tone: WORKSPACE_TONES.filmpeak, initial: 'F' },
    { name: 'Saffron LLC',      type: 'Business · 1 project',  tone: WORKSPACE_TONES.saffron,  initial: 'S' },
    { name: 'Personal',         type: 'Personal · 0 projects', tone: WORKSPACE_TONES.personal, initial: 'P' },
  ];
  const a = accounts[page];

  const Row = ({ icon, tone, label, value, last }) => (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '13px 16px',
      borderBottom: last ? 'none' : `0.5px solid ${c.sep}`,
    }}>
      <div style={{
        width: 30, height: 30, borderRadius: 8,
        background: tone, color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: 'inset 0 0.5px 0 rgba(255,255,255,0.3)',
      }}>
        <Icon name={icon} size={15} stroke={2.2} color="#fff" />
      </div>
      <div style={{ flex: 1, fontSize: 15, fontWeight: 500, color: c.ink }}>{label}</div>
      <div style={{ color: c.ink2, fontSize: 14 }}>{value}</div>
      <Icon name="chevronRight" size={13} stroke={2} color={c.ink3} />
    </div>
  );

  return (
    <div style={{
      background: c.bg, color: c.ink, height: '100%',
      fontFamily: FONT_UI, paddingBottom: 110, position: 'relative', overflow: 'auto',
      boxSizing: 'border-box',
    }}>
      <LargeTitle title="Settings" dark={dark} />

      {/* Swipeable account card */}
      <div style={{ padding: '0 18px 22px' }}>
        <Card dark={dark} radius={20} padding={18}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <div style={{
              width: 52, height: 52, borderRadius: 16,
              background: a.tone.grad,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontSize: 22, fontWeight: 700,
              boxShadow: 'inset 0 0.5px 0 rgba(255,255,255,0.4)',
            }}>{a.initial}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: -0.2, color: c.ink }}>{a.name}</div>
              <div style={{ color: c.ink2, fontSize: 13, marginTop: 2 }}>{a.type}</div>
            </div>
            <div style={{
              padding: '6px 10px', borderRadius: 999,
              background: dark ? 'rgba(120,120,128,0.24)' : 'rgba(118,118,128,0.12)',
              color: c.tint, fontSize: 12, fontWeight: 600,
            }}>Manage</div>
          </div>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginTop: 14,
          }}>
            <div style={{ color: c.ink2, fontSize: 11, fontWeight: 500 }}>← swipe to switch →</div>
            <div style={{ display: 'flex', gap: 5 }}>
              {accounts.map((_, i) => (
                <span key={i} onClick={() => setPage(i)} style={{
                  width: 7, height: 7, borderRadius: '50%',
                  background: i === page ? c.ink : c.ink3, cursor: 'pointer',
                  transition: 'background 0.15s',
                }} />
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Preferences */}
      <SectionHeader dark={dark}>Preferences</SectionHeader>
      <div style={{ padding: '0 18px', marginBottom: 22 }}>
        <Card dark={dark} padding={0} style={{ overflow: 'hidden' }}>
          <Row icon="currency" tone="#5AA9FF" label="Base Currency"     value="RM (MYR)" />
          <Row icon="faceid"   tone="#30D158" label="Face ID"            value="On" />
          <Row icon="moon"     tone="#A78BFA" label="Appearance"         value="Auto" />
          <Row icon="bell"     tone="#FF6B3D" label="Notifications"      value="3 enabled" />
          <Row icon="rocket"   tone="#FFB800" label="Default on Launch"  value={a.name} last />
        </Card>
      </div>

      {/* Recurring */}
      <SectionHeader dark={dark}>Recurring</SectionHeader>
      <div style={{ padding: '0 18px', marginBottom: 22 }}>
        <Card dark={dark} radius={20} padding={16}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ color: c.ink2, fontSize: 14 }}>No recurring entries</div>
          <div style={{
            padding: '7px 14px 7px 11px', borderRadius: 999,
            background: c.tint, color: '#fff',
            fontSize: 13, fontWeight: 600,
            display: 'inline-flex', alignItems: 'center', gap: 5,
          }}>
            <Icon name="plus" size={12} stroke={2.6} color="#fff" />
            Add
          </div>
        </Card>
      </div>

      <TabBar active="settings" dark={dark} />
    </div>
  );
};

window.HiFi_Add = HiFi_Add;
window.HiFi_Detail = HiFi_Detail;
window.HiFi_Settings = HiFi_Settings;
