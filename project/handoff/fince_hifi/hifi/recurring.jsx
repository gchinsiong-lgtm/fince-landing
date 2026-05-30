// Hi-fi Recurring — list + new entry
// Same system as the rest: Inter only, RGB+neutrals, subtle glows.

// ─────────────────────────────────────────────────────
const HiFi_Recurring = ({ dark = true }) => {
  const c = window.FINCE.TOKENS[dark ? 'dark' : 'light'];
  const { FONT_UI, FONT_MONO, WORKSPACE_TONES } = window.FINCE;

  const items = [
    { name: 'Adobe Creative Cloud', cat: 'Software',  freq: 'Monthly',  amt: '89.00',   kind: 'neg', next: 'in 4 days',  icon: 'card',    tone: WORKSPACE_TONES.brand.grad },
    { name: 'Studio Rent',          cat: 'Overhead',  freq: 'Monthly',  amt: '2,400.00',kind: 'neg', next: 'in 12 days', icon: 'bank',    tone: WORKSPACE_TONES.personal.grad },
    { name: 'Saffron Retainer',     cat: 'Income',    freq: 'Monthly',  amt: '3,600.00',kind: 'pos', next: 'in 26 days', icon: 'receipt', tone: WORKSPACE_TONES.greenline.grad },
  ];

  return (
    <div style={{
      background: c.bg, color: c.ink, height: '100%',
      fontFamily: FONT_UI, paddingBottom: 110, position: 'relative', overflow: 'auto',
      boxSizing: 'border-box',
    }}>
      <LargeTitle title="Recurring" dark={dark}
        leading={
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: c.blue, fontSize: 15, fontWeight: 500 }}>
            <Icon name="chevronLeft" size={16} stroke={2.4} color={c.blue} />
            Settings
          </div>
        }
        trailing={
          <div style={{
            padding: '7px 14px 7px 11px', borderRadius: 999,
            background: c.blue, color: '#fff',
            fontSize: 13, fontWeight: 600,
            display: 'inline-flex', alignItems: 'center', gap: 5,
            boxShadow: `0 0 18px ${c.blueGlow}`,
          }}>
            <Icon name="plus" size={13} stroke={2.6} color="#fff" />
            New
          </div>
        }
      />

      {/* Summary hero */}
      <div style={{ padding: '0 18px 18px' }}>
        <Card dark={dark} radius={22} padding={20}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{
              width: 6, height: 6, borderRadius: 3, background: c.green,
              boxShadow: `0 0 0 3px ${c.greenBg}, 0 0 10px ${c.greenGlow}`,
            }} />
            <div style={{ fontSize: 12, fontWeight: 600, color: c.ink2, letterSpacing: 0.4, textTransform: 'uppercase' }}>
              Net impact · this month
            </div>
          </div>
          <div style={{ marginTop: 10 }}>
            <Money value="1,111.00" dark={dark} size={36} color={c.green} sign="+" />
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <div style={{ flex: 1, padding: 12, borderRadius: 14, background: c.greenBg }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{
                  width: 16, height: 16, borderRadius: 5, background: c.green, color: '#fff',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                }}><Icon name="arrowDownLeft" size={10} stroke={2.6} color="#fff" /></span>
                <div style={{ fontSize: 11, color: c.ink2, fontWeight: 600 }}>Income</div>
              </div>
              <div style={{
                fontFamily: FONT_UI, fontSize: 17, fontWeight: 700, color: c.green,
                fontFeatureSettings: '"tnum"', marginTop: 4, letterSpacing: -0.2,
              }}>
                <span style={{ fontSize: 10, color: c.ink2, marginRight: 2, fontWeight: 600 }}>RM</span>+3,600
              </div>
              <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: c.ink3, marginTop: 3, letterSpacing: 0.4 }}>1 entry</div>
            </div>
            <div style={{ flex: 1, padding: 12, borderRadius: 14, background: c.redBg }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{
                  width: 16, height: 16, borderRadius: 5, background: c.red, color: '#fff',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                }}><Icon name="arrowUpRight" size={10} stroke={2.6} color="#fff" /></span>
                <div style={{ fontSize: 11, color: c.ink2, fontWeight: 600 }}>Expenses</div>
              </div>
              <div style={{
                fontFamily: FONT_UI, fontSize: 17, fontWeight: 700, color: c.red,
                fontFeatureSettings: '"tnum"', marginTop: 4, letterSpacing: -0.2,
              }}>
                <span style={{ fontSize: 10, color: c.ink2, marginRight: 2, fontWeight: 600 }}>RM</span>−2,489
              </div>
              <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: c.ink3, marginTop: 3, letterSpacing: 0.4 }}>2 entries</div>
            </div>
          </div>
        </Card>
      </div>

      <SectionHeader dark={dark} action={
        <div style={{ fontFamily: FONT_MONO, fontSize: 11, color: c.ink2, letterSpacing: 0.4 }}>
          {items.length} ACTIVE
        </div>
      }>Active</SectionHeader>

      <div style={{ padding: '0 18px' }}>
        <Card dark={dark} padding={0} style={{ overflow: 'hidden' }}>
          {items.map((t, i) => {
            const isPos = t.kind === 'pos';
            return (
              <div key={t.name} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '14px 16px',
                borderBottom: i < items.length - 1 ? `0.5px solid ${c.sep}` : 'none',
              }}>
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 12,
                    background: t.tone, color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: 'inset 0 0.5px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(0,0,0,0.15)',
                  }}>
                    <Icon name={t.icon} size={18} stroke={2} color="#fff" />
                  </div>
                  {/* recurring badge */}
                  <div style={{
                    position: 'absolute', bottom: -3, right: -3,
                    width: 18, height: 18, borderRadius: '50%',
                    background: c.surface, color: c.ink2,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: `2px solid ${c.surface}`,
                    boxShadow: `0 0 0 0.5px ${c.sep}`,
                  }}>
                    <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                      <path d="M3 6a3 3 0 0 1 5-2.2M9 6a3 3 0 0 1-5 2.2M8 1.8v2h-2M4 10.2v-2h2"
                        stroke={c.ink2} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: 15, fontWeight: 600, letterSpacing: -0.2, color: c.ink,
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  }}>{t.name}</div>
                  <div style={{ color: c.ink2, fontSize: 12, marginTop: 2 }}>
                    {t.cat} · {t.freq} · next <span style={{ color: c.ink, fontWeight: 600 }}>{t.next}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    fontFamily: FONT_UI, fontSize: 15, fontWeight: 700,
                    color: isPos ? c.green : c.ink,
                    fontFeatureSettings: '"tnum"',
                  }}>{isPos ? '+' : '−'}{t.amt}</div>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 3,
                    marginTop: 4, padding: '2px 7px', borderRadius: 6,
                    background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(20,19,15,0.05)',
                    color: c.ink2, fontFamily: FONT_MONO,
                    fontSize: 9, fontWeight: 700, letterSpacing: 0.5,
                  }}>
                    <span style={{ width: 4, height: 4, borderRadius: 2, background: c.green,
                                   boxShadow: `0 0 4px ${c.greenGlow}` }} />
                    AUTO
                  </div>
                </div>
              </div>
            );
          })}
        </Card>
      </div>

      <TabBar active="settings" dark={dark} />
    </div>
  );
};

// ─────────────────────────────────────────────────────
const HiFi_NewRecurring = ({ dark = true }) => {
  const c = window.FINCE.TOKENS[dark ? 'dark' : 'light'];
  const { FONT_UI, FONT_MONO } = window.FINCE;

  const Field = ({ label, value, placeholder, trailing, mono }) => (
    <div>
      <div style={{
        fontFamily: FONT_UI, fontSize: 11, color: c.ink2, fontWeight: 600,
        letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 6,
      }}>{label}</div>
      <div style={{
        background: c.surface, borderRadius: 14, padding: '11px 13px',
        display: 'flex', alignItems: 'center', gap: 6, minHeight: 24,
        border: dark ? `0.5px solid ${c.hairline}` : `0.5px solid ${c.sep}`,
        boxShadow: c.cardShadow,
      }}>
        <span style={{
          flex: 1, fontSize: 14, fontWeight: value ? 600 : 400,
          color: value ? c.ink : c.ink3,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          fontFamily: mono ? FONT_MONO : FONT_UI,
          fontFeatureSettings: '"tnum"',
        }}>{value || placeholder}</span>
        {trailing && (
          typeof trailing === 'string'
            ? <span style={{ color: c.ink3, fontSize: 14 }}>{trailing}</span>
            : trailing
        )}
      </div>
    </div>
  );

  return (
    <div style={{
      background: c.bg, color: c.ink, height: '100%',
      fontFamily: FONT_UI, position: 'relative', overflow: 'auto',
      boxSizing: 'border-box', paddingBottom: 24,
    }}>
      {/* Nav bar — sheet style */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '12px 18px', minHeight: 44,
      }}>
        <span style={{ fontSize: 15, color: c.blue, fontWeight: 500 }}>Cancel</span>
        <span style={{ fontSize: 16, fontWeight: 700, letterSpacing: -0.2 }}>New Recurring</span>
        <span style={{
          fontSize: 15, color: c.blue, fontWeight: 700,
          textShadow: `0 0 12px ${c.blueGlow}`,
        }}>Save</span>
      </div>

      {/* Amount hero */}
      <div style={{ padding: '8px 18px 18px' }}>
        <Card dark={dark} radius={20} padding={20} style={{ textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          {/* halo */}
          <div style={{
            position: 'absolute', top: -80, left: '50%', transform: 'translateX(-50%)',
            width: 240, height: 240, borderRadius: '50%',
            background: `radial-gradient(circle, ${c.blueBg} 0%, transparent 70%)`,
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'relative',
            fontFamily: FONT_UI, fontSize: 11, fontWeight: 600,
            color: c.ink2, letterSpacing: 0.6, textTransform: 'uppercase',
          }}>Amount</div>
          <div style={{
            position: 'relative', marginTop: 8,
            display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 4,
          }}>
            <span style={{ fontSize: 20, color: c.ink2, fontWeight: 600 }}>RM</span>
            <span style={{
              fontFamily: FONT_UI, fontSize: 48, fontWeight: 700, color: c.ink,
              letterSpacing: -1.4, lineHeight: 1, fontFeatureSettings: '"tnum"',
            }}>0</span>
            <span style={{
              fontFamily: FONT_UI, fontSize: 24, fontWeight: 600, color: c.ink3,
              fontFeatureSettings: '"tnum"',
            }}>.00</span>
            {/* caret */}
            <span style={{
              display: 'inline-block', width: 2, height: 36,
              background: c.blue, marginLeft: 2,
              boxShadow: `0 0 8px ${c.blueGlow}`,
              animation: 'finceCaret 1s infinite',
            }} />
          </div>
          {/* segmented +/− */}
          <div style={{
            position: 'relative',
            display: 'inline-flex', marginTop: 14, padding: 2,
            background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(20,19,15,0.05)',
            borderRadius: 10,
            fontFamily: FONT_UI, fontSize: 11, fontWeight: 700, letterSpacing: 0.5,
          }}>
            {[
              { l: 'EXPENSE', active: true, color: c.red },
              { l: 'INCOME',  color: c.green },
            ].map((s, i) => (
              <div key={s.l} style={{
                padding: '5px 14px', borderRadius: 8,
                background: s.active ? c.surface2 : 'transparent',
                color: s.active ? s.color : c.ink2,
                boxShadow: s.active ? c.cardShadow : 'none',
              }}>{s.l}</div>
            ))}
          </div>
        </Card>
      </div>

      <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <Field label="Title" placeholder="e.g. Adobe" />
          <Field label="Category" placeholder="Software" trailing={<Icon name="chevronRight" size={13} color={c.ink3} stroke={2}/>} />
        </div>

        <Field label="Vendor / Client" placeholder="e.g. Adobe Systems" />

        {/* Repeat segmented */}
        <div>
          <div style={{
            fontFamily: FONT_UI, fontSize: 11, color: c.ink2, fontWeight: 600,
            letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 6,
          }}>Repeat</div>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0,
            background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(20,19,15,0.05)',
            borderRadius: 11, padding: 3,
          }}>
            {['Weekly', 'Monthly', 'Quarterly', 'Yearly'].map((f, i) => (
              <div key={f} style={{
                textAlign: 'center', padding: '8px 0', borderRadius: 9,
                background: i === 1 ? c.surface : 'transparent',
                color: i === 1 ? c.ink : c.ink2,
                fontFamily: FONT_UI, fontSize: 12, fontWeight: 600,
                boxShadow: i === 1 ? c.cardShadow : 'none',
              }}>{f}</div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <Field label="Start date" value="6 May 2026" trailing={<Icon name="calendar" size={14} color={c.blue} stroke={2}/>} />
          <Field label="End date" placeholder="Never" trailing={<Icon name="chevronRight" size={13} color={c.ink3} stroke={2}/>} />
        </div>

        {/* Reminder toggle */}
        <Card dark={dark} radius={14} padding={14}
              style={{ marginTop: 4, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10,
            background: c.blue, color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `inset 0 0.5px 0 rgba(255,255,255,0.4), 0 0 14px ${c.blueGlow}`,
          }}>
            <Icon name="bell" size={16} stroke={2.2} color="#fff" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: c.ink }}>Remind me 1 day before</div>
            <div style={{ fontSize: 12, color: c.ink2, marginTop: 2 }}>Push notification</div>
          </div>
          <div style={{
            width: 50, height: 30, borderRadius: 15, background: c.green,
            padding: 2, boxSizing: 'border-box',
            display: 'flex', justifyContent: 'flex-end',
            boxShadow: `0 0 10px ${c.greenGlow}`,
          }}>
            <div style={{
              width: 26, height: 26, borderRadius: 13, background: '#fff',
              boxShadow: '0 1px 2px rgba(0,0,0,0.2), 0 2px 6px rgba(0,0,0,0.12)',
            }} />
          </div>
        </Card>

        {/* Auto-link toggle */}
        <Card dark={dark} radius={14} padding={14}
              style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10,
            background: c.green, color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: 'inset 0 0.5px 0 rgba(255,255,255,0.4)',
          }}>
            <Icon name="bolt" size={16} stroke={2.2} color="#fff" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: c.ink }}>Auto-log on due date</div>
            <div style={{ fontSize: 12, color: c.ink2, marginTop: 2 }}>Creates a transaction automatically</div>
          </div>
          <div style={{
            width: 50, height: 30, borderRadius: 15,
            background: dark ? 'rgba(120,120,128,0.32)' : 'rgba(120,120,128,0.22)',
            padding: 2, boxSizing: 'border-box',
            display: 'flex', justifyContent: 'flex-start',
          }}>
            <div style={{
              width: 26, height: 26, borderRadius: 13, background: '#fff',
              boxShadow: '0 1px 2px rgba(0,0,0,0.2), 0 2px 6px rgba(0,0,0,0.12)',
            }} />
          </div>
        </Card>
      </div>

      {/* Sticky save (visual only — sheet pattern) */}
      <div style={{ padding: '20px 18px 8px' }}>
        <div style={{
          padding: 16, borderRadius: 16, textAlign: 'center',
          background: c.blue, color: '#fff',
          fontFamily: FONT_UI, fontSize: 15, fontWeight: 700,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          width: '100%', boxSizing: 'border-box',
          boxShadow: `0 0 24px ${c.blueGlow}, inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.2)`,
        }}>
          <Icon name="check" size={15} stroke={2.6} color="#fff" />
          Save recurring
        </div>
      </div>

      <style>{`@keyframes finceCaret { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }`}</style>
    </div>
  );
};

window.HiFi_Recurring = HiFi_Recurring;
window.HiFi_NewRecurring = HiFi_NewRecurring;
