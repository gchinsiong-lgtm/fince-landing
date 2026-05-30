// V1 ADD + DETAIL + SETTINGS — with scan mode segmented, parsed confidence,
// detail halo + tags, settings with Automation + Data & privacy + version footer

const HiFi_Add = () => {
  const c = window.FINCE.TOKENS.dark;
  const { FONT_UI, FONT_MONO, FONT_SERIF } = window.FINCE;

  return (
    <div style={{
      background: '#000', color: '#fff', height: '100%',
      fontFamily: FONT_UI, position: 'relative', overflow: 'hidden',
      boxSizing: 'border-box',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(120% 80% at 50% 45%, #2a241f 0%, #100c08 60%, #050403 100%)',
      }} />
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.08, mixBlendMode: 'screen',
        backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.15) 0 1px, transparent 1px 4px)',
      }} />

      {[[0,0],[1,0],[0,1],[1,1]].map(([x,y], idx) => (
        <div key={idx} style={{
          position: 'absolute', width: 32, height: 32,
          left:   x ? 'auto' : 22, right:  x ? 22 : 'auto',
          top:    y ? 'auto' : 92, bottom: y ? 290 : 'auto',
          borderTop:    y ? 'none' : '2.5px solid rgba(255,255,255,0.85)',
          borderBottom: y ? '2.5px solid rgba(255,255,255,0.85)' : 'none',
          borderLeft:   x ? 'none' : '2.5px solid rgba(255,255,255,0.85)',
          borderRight:  x ? '2.5px solid rgba(255,255,255,0.85)' : 'none',
          borderRadius: !x && !y ? '10px 0 0 0' : !y && x ? '0 10px 0 0' : !x && y ? '0 0 0 10px' : '0 0 10px 0',
        }} />
      ))}

      <div style={{
        position: 'absolute', top: 110, left: 44, right: 44, bottom: 310,
        background: '#F5F1E6', borderRadius: 6,
        boxShadow: '0 30px 70px rgba(0,0,0,0.65), 0 0 0 0.5px rgba(255,255,255,0.06)',
        transform: 'rotate(-2.5deg)',
        padding: '18px 16px', color: '#1a1816',
        fontFamily: FONT_MONO, fontSize: 10, lineHeight: 1.7, overflow: 'hidden',
      }}>
        <svg width="100%" height="6" viewBox="0 0 100 6" preserveAspectRatio="none" style={{ position: 'absolute', top: -3, left: 0 }}>
          <path d="M0 0 L0 3 L3 0 L6 3 L9 0 L12 3 L15 0 L18 3 L21 0 L24 3 L27 0 L30 3 L33 0 L36 3 L39 0 L42 3 L45 0 L48 3 L51 0 L54 3 L57 0 L60 3 L63 0 L66 3 L69 0 L72 3 L75 0 L78 3 L81 0 L84 3 L87 0 L90 3 L93 0 L96 3 L99 0 L100 0 Z" fill="#F5F1E6"/>
        </svg>
        <div style={{ fontFamily: FONT_SERIF, fontSize: 16, fontWeight: 400, letterSpacing: -0.3 }}>B&amp;H Photo Video</div>
        <div style={{ opacity: 0.6, fontSize: 9 }}>420 9th Ave · New York, NY 10001</div>
        <div style={{ opacity: 0.6, fontSize: 9, marginTop: 2 }}>01 MAY 2026 · 14:08 · INV #88421</div>
        <div style={{ borderTop: '1px dashed rgba(26,24,22,0.4)', margin: '10px 0' }} />
        {[
          ['SSD T9 · 2TB',            '1,899.00'],
          ['SD Card · 256GB UHS-II',   '129.38'],
          ['Tripod Plate · Manfrotto', '800.00'],
        ].map(([k,v]) => (
          <div key={k} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>{k}</span><span>{v}</span>
          </div>
        ))}
        <div style={{ borderTop: '1px dashed rgba(26,24,22,0.4)', margin: '10px 0' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', opacity: 0.7 }}>
          <span>Subtotal</span><span>2,828.38</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, marginTop: 4 }}>
          <span>TOTAL · USD</span><span>2,828.38</span>
        </div>
      </div>

      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        padding: '16px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10,
      }}>
        <div style={{
          width: 38, height: 38, borderRadius: '50%',
          background: 'rgba(0,0,0,0.42)', backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '0.5px solid rgba(255,255,255,0.12)',
        }}><Icon name="close" size={18} stroke={2.2} color="#fff" /></div>
        <div style={{
          padding: '6px 12px', borderRadius: 999,
          background: 'rgba(0,0,0,0.42)', backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          fontSize: 13, fontWeight: 600,
          border: '0.5px solid rgba(255,255,255,0.12)',
          display: 'inline-flex', alignItems: 'center', gap: 6,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: 3, background: c.brand, boxShadow: `0 0 8px ${c.brand}` }} />
          Scan receipt
        </div>
        <div style={{
          width: 38, height: 38, borderRadius: '50%',
          background: 'rgba(0,0,0,0.42)', backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '0.5px solid rgba(255,255,255,0.12)',
        }}><Icon name="flash" size={18} stroke={2.2} color="#FFC23D" fill="#FFC23D" /></div>
      </div>

      <div style={{
        position: 'absolute', top: 64, left: '50%', transform: 'translateX(-50%)',
        background: 'rgba(0,0,0,0.42)', backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderRadius: 999, padding: 3, display: 'flex',
        border: '0.5px solid rgba(255,255,255,0.10)',
      }}>
        {[{ l: 'Photo' }, { l: 'Receipt', active: true }, { l: 'PDF' }].map(t => (
          <div key={t.l} style={{
            padding: '5px 14px', borderRadius: 999,
            background: t.active ? '#fff' : 'transparent',
            color: t.active ? '#000' : 'rgba(255,255,255,0.7)',
            fontSize: 11, fontWeight: 700, letterSpacing: 0.4, textTransform: 'uppercase',
          }}>{t.l}</div>
        ))}
      </div>

      <div style={{
        position: 'absolute', bottom: 142, left: 16, right: 16,
        background: 'rgba(22,22,24,0.78)',
        backdropFilter: 'blur(28px) saturate(180%)',
        WebkitBackdropFilter: 'blur(28px) saturate(180%)',
        borderRadius: 24, padding: 18,
        border: `0.5px solid rgba(255,255,255,0.12)`,
        boxShadow: '0 24px 60px rgba(0,0,0,0.6)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: 3, background: c.pos, boxShadow: `0 0 10px ${c.pos}` }} />
              <div style={{ fontSize: 10, fontWeight: 700, color: c.pos, letterSpacing: 1, textTransform: 'uppercase' }}>
                Parsed · 96% confidence
              </div>
            </div>
            <div style={{ fontFamily: FONT_SERIF, fontSize: 22, fontWeight: 400, letterSpacing: -0.4, marginTop: 6 }}>
              B<span style={{ fontStyle: 'italic' }}>&amp;</span>H Photo
            </div>
          </div>
          <div style={{
            fontFamily: FONT_UI, fontSize: 24, fontWeight: 700, color: c.neg,
            fontFeatureSettings: '"tnum"', letterSpacing: -0.5,
          }}>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', fontWeight: 600, marginRight: 4 }}>−RM</span>
            2,828<span style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)' }}>.38</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 6, marginTop: 14, flexWrap: 'wrap' }}>
          {[
            { l: 'Hardware/Gear',   icon: 'card' },
            { l: 'Saffron Park',    icon: 'projects' },
            { l: '1 May 2026',      icon: 'calendar' },
            { l: 'USD → RM 4.71',   icon: 'currency' },
          ].map(chip => (
            <div key={chip.l} style={{
              padding: '5px 10px 5px 8px', borderRadius: 999,
              background: 'rgba(255,255,255,0.08)',
              fontSize: 12, fontWeight: 500,
              display: 'inline-flex', alignItems: 'center', gap: 5,
              border: '0.5px solid rgba(255,255,255,0.06)',
            }}>
              <Icon name={chip.icon} size={12} stroke={2} color="rgba(255,255,255,0.7)" />
              {chip.l}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          <div style={{
            padding: '13px 14px', borderRadius: 14, textAlign: 'center',
            background: 'rgba(255,255,255,0.10)',
            fontSize: 14, fontWeight: 600,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            border: '0.5px solid rgba(255,255,255,0.08)',
          }}>
            <Icon name="edit" size={15} stroke={2} color="#fff" />Edit
          </div>
          <div style={{
            flex: 1, padding: '13px 14px', borderRadius: 14, textAlign: 'center',
            background: `linear-gradient(180deg, ${c.brand} 0%, ${c.brandDeep} 100%)`,
            fontSize: 14, fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            boxShadow: [
              '0 10px 24px rgba(220,63,26,0.35)',
              'inset 0 1px 0 rgba(255,255,255,0.35)',
              'inset 0 -1px 0 rgba(0,0,0,0.20)',
            ].join(', '),
          }}>
            <Icon name="check" size={15} stroke={2.6} color="#fff" />Save transaction
          </div>
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 30, left: 0, right: 0,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 36px',
      }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: 'rgba(255,255,255,0.10)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '0.5px solid rgba(255,255,255,0.10)',
        }}>
          <Icon name="image" size={20} stroke={1.8} color="#fff" />
        </div>
        <div style={{
          width: 68, height: 68, borderRadius: '50%',
          border: '3.5px solid rgba(255,255,255,0.95)',
          padding: 5, boxSizing: 'border-box',
        }}>
          <div style={{
            width: '100%', height: '100%', borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 30%, #ffffff 0%, #ececec 100%)',
            boxShadow: 'inset 0 -1px 2px rgba(0,0,0,0.10)',
          }} />
        </div>
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: 'rgba(255,255,255,0.10)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '0.5px solid rgba(255,255,255,0.10)',
        }}>
          <Icon name="edit" size={18} stroke={1.8} color="#fff" />
        </div>
      </div>
    </div>
  );
};

const HiFi_Detail = ({ dark = true }) => {
  const c = window.FINCE.TOKENS[dark ? 'dark' : 'light'];
  const { FONT_UI, FONT_MONO, FONT_SERIF, WORKSPACE_TONES } = window.FINCE;

  return (
    <div style={{
      background: c.bgGrad, color: c.ink, height: '100%',
      fontFamily: FONT_UI, position: 'relative', overflow: 'auto',
      boxSizing: 'border-box', paddingBottom: 24,
    }}>
      <LargeTitle title="Transaction" dark={dark}
        leading={<ChromeButton dark={dark} icon="chevronLeft" />}
        trailing={
          <div style={{ display: 'flex', gap: 8 }}>
            <ChromeButton dark={dark} icon="share" />
            <ChromeButton dark={dark} icon="edit" />
          </div>
        } />

      <div style={{ padding: '0 18px 18px' }}>
        <Card dark={dark} radius={26} padding={26} style={{ textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', top: -60, left: '50%', transform: 'translateX(-50%)',
            width: 240, height: 240, borderRadius: '50%',
            background: `radial-gradient(circle, ${c.posBg} 0%, transparent 70%)`,
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'relative',
            width: 60, height: 60, borderRadius: 18,
            background: `linear-gradient(135deg, ${c.posBg} 0%, transparent 100%)`,
            color: c.pos,
            margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: `0.5px solid ${c.posBg}`,
          }}>
            <Icon name="arrowDownLeft" size={28} stroke={2.2} color={c.pos} />
          </div>
          <div style={{ marginTop: 14, fontSize: 13, color: c.ink2, fontWeight: 500, letterSpacing: 0.3, textTransform: 'uppercase' }}>
            Income · Client retainer
          </div>
          <div style={{
            fontFamily: FONT_UI, fontSize: 44, fontWeight: 700, color: c.pos,
            letterSpacing: -1.4, marginTop: 8, lineHeight: 1,
            fontFeatureSettings: '"tnum"',
          }}>
            <span style={{ fontSize: 22, color: c.ink2, fontWeight: 600, marginRight: 4 }}>+RM</span>
            3,600<span style={{ fontSize: 24, color: c.ink2, fontWeight: 600 }}>.00</span>
          </div>
          <div style={{
            position: 'relative',
            display: 'inline-flex', alignItems: 'center', gap: 4,
            marginTop: 12, padding: '4px 10px 4px 8px',
            background: c.posBg, color: c.pos,
            borderRadius: 999, fontSize: 11, fontWeight: 700, letterSpacing: 0.6,
          }}>
            <Icon name="check" size={11} stroke={3} color={c.pos} />PAID · 6 MAY
          </div>
        </Card>
      </div>

      <div style={{ padding: '0 18px 14px' }}>
        <Card dark={dark} padding={0} style={{ overflow: 'hidden' }}>
          {[
            { k: 'Date',      v: 'Tue, 6 May 2026 · 11:32', tone: c.ink },
            { k: 'Project',   v: 'Saffron Park Residences', tone: c.tint, tile: WORKSPACE_TONES.saffron.grad },
            { k: 'Client',    v: 'Saffron LLC',             tone: c.tint },
            { k: 'Method',    v: 'Bank transfer · MBB ••24', tone: c.ink, icon: 'bank' },
            { k: 'Reference', v: 'INV-2026-018',            tone: c.ink2, mono: true },
            { k: 'Receipt',   v: 'retainer-may.pdf · 84 KB', tone: c.tint, icon: 'paperclip' },
            { k: 'Notes',     v: 'May milestone — VFX pass approved.', tone: c.ink, wrap: true },
          ].map((row, i, a) => (
            <div key={row.k} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: row.wrap ? 'flex-start' : 'center', gap: 12,
              padding: '14px 18px',
              borderBottom: i < a.length - 1 ? `0.5px solid ${c.sep}` : 'none',
            }}>
              <span style={{ color: c.ink2, fontSize: 14, fontWeight: 500, flexShrink: 0 }}>{row.k}</span>
              <span style={{
                color: row.tone,
                fontSize: 14, fontWeight: row.tone === c.tint ? 600 : 500,
                fontFamily: row.mono ? FONT_MONO : FONT_UI,
                textAlign: 'right',
                display: 'inline-flex', alignItems: 'center', gap: 8,
                maxWidth: '65%',
              }}>
                {row.tile && <span style={{ width: 16, height: 16, borderRadius: 5, background: row.tile, display: 'inline-block' }} />}
                {row.icon && <Icon name={row.icon} size={14} color={row.tone} stroke={1.8} />}
                {row.v}
              </span>
            </div>
          ))}
        </Card>
      </div>

      <div style={{ padding: '0 22px 16px', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {['retainer', 'recurring', 'q2-revenue'].map(t => (
          <div key={t} style={{
            padding: '5px 10px', borderRadius: 999,
            background: c.surface, color: c.ink2,
            fontSize: 12, fontWeight: 500,
            border: dark ? `0.5px solid ${c.hairline}` : `0.5px solid ${c.sep}`,
            fontFamily: FONT_MONO, letterSpacing: 0.2,
          }}>#{t}</div>
        ))}
      </div>

      <div style={{ padding: '0 18px', display: 'flex', gap: 10 }}>
        <div style={{
          flex: 1, padding: 15, borderRadius: 16, textAlign: 'center',
          background: c.ink, color: dark ? c.bg : '#fff',
          fontSize: 14, fontWeight: 700,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        }}>
          <Icon name="edit" size={15} stroke={2.2} color={dark ? c.bg : '#fff'} />Edit
        </div>
        <div style={{
          flex: 1, padding: 15, borderRadius: 16, textAlign: 'center',
          background: c.surface, color: c.neg,
          fontSize: 14, fontWeight: 600,
          border: `0.5px solid ${c.sep}`,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        }}>
          <Icon name="trash" size={15} stroke={2} color={c.neg} />Delete
        </div>
      </div>
    </div>
  );
};

const HiFi_Settings = ({ dark = true }) => {
  const c = window.FINCE.TOKENS[dark ? 'dark' : 'light'];
  const { FONT_UI, FONT_MONO, FONT_SERIF, WORKSPACE_TONES } = window.FINCE;
  const [page, setPage] = React.useState(0);

  const accounts = [
    { name: 'Filmpeak Studio', meta: 'Business · 3 projects · RM 12.8k',  tone: WORKSPACE_TONES.filmpeak, initial: 'F' },
    { name: 'Saffron LLC',      meta: 'Business · 1 project · RM 4.2k',   tone: WORKSPACE_TONES.saffron,  initial: 'S' },
    { name: 'Personal',         meta: 'Personal · 0 projects',             tone: WORKSPACE_TONES.personal, initial: 'A' },
  ];
  const a = accounts[page];

  const Section = ({ title, children }) => (
    <>
      <SectionHeader dark={dark}>{title}</SectionHeader>
      <div style={{ padding: '0 18px', marginBottom: 18 }}>
        <Card dark={dark} padding={0} style={{ overflow: 'hidden' }}>{children}</Card>
      </div>
    </>
  );

  const Row = ({ icon, tone, label, value, last, toggle, tintRow }) => (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14,
      padding: '13px 16px',
      borderBottom: last ? 'none' : `0.5px solid ${c.sep}`,
    }}>
      <div style={{
        width: 30, height: 30, borderRadius: 8,
        background: tone, color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: 'inset 0 0.5px 0 rgba(255,255,255,0.3)',
      }}>
        <Icon name={icon} size={16} stroke={2.2} color="#fff" />
      </div>
      <div style={{ flex: 1, fontSize: 15, fontWeight: 500, color: tintRow || c.ink }}>{label}</div>
      {toggle !== undefined ? (
        <div style={{
          width: 44, height: 26, borderRadius: 13,
          background: toggle ? c.pos : (dark ? 'rgba(120,120,128,0.32)' : 'rgba(120,120,128,0.22)'),
          padding: 2, boxSizing: 'border-box',
          display: 'flex', justifyContent: toggle ? 'flex-end' : 'flex-start',
        }}>
          <div style={{
            width: 22, height: 22, borderRadius: 11, background: '#fff',
            boxShadow: '0 1px 2px rgba(0,0,0,0.2), 0 2px 6px rgba(0,0,0,0.12)',
          }} />
        </div>
      ) : (
        <>
          {value && <div style={{ color: c.ink2, fontSize: 14 }}>{value}</div>}
          <Icon name="chevronRight" size={14} stroke={2} color={c.ink3} />
        </>
      )}
    </div>
  );

  return (
    <div style={{
      background: c.bgGrad, color: c.ink, height: '100%',
      fontFamily: FONT_UI, paddingBottom: 110, position: 'relative', overflow: 'auto',
      boxSizing: 'border-box',
    }}>
      <LargeTitle title="Settings" dark={dark} trailing={<ChromeButton dark={dark} icon="search" />} />

      <div style={{ padding: '0 18px 22px' }}>
        <Card dark={dark} radius={24} padding={20}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <div style={{
              width: 56, height: 56, borderRadius: 18,
              background: a.tone.grad,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontFamily: FONT_SERIF, fontSize: 26, fontWeight: 400, fontStyle: 'italic',
              boxShadow: 'inset 0 0.5px 0 rgba(255,255,255,0.45)',
            }}>{a.initial}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: -0.3, color: c.ink }}>{a.name}</div>
              <div style={{ fontSize: 12, color: c.ink2, marginTop: 3 }}>{a.meta}</div>
            </div>
            <div style={{
              padding: '7px 12px', borderRadius: 999,
              background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(20,19,15,0.06)',
              color: c.ink, fontSize: 12, fontWeight: 600,
            }}>Manage</div>
          </div>

          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16,
            paddingTop: 14, borderTop: `0.5px solid ${c.sep}`,
          }}>
            <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: c.ink2, letterSpacing: 0.6, textTransform: 'uppercase' }}>
              ← swipe to switch →
            </div>
            <div style={{ display: 'flex', gap: 5 }}>
              {accounts.map((_, i) => (
                <span key={i} onClick={() => setPage(i)} style={{
                  width: i === page ? 16 : 6, height: 6, borderRadius: 3,
                  background: i === page ? c.ink : c.ink4, cursor: 'pointer',
                  transition: 'all 0.2s',
                }} />
              ))}
            </div>
          </div>
        </Card>
      </div>

      <Section title="Preferences">
        <Row icon="currency" tone="#3B82F6" label="Base currency"     value="RM (MYR)" />
        <Row icon="faceid"   tone="#10B981" label="Face ID"            toggle={true} />
        <Row icon="moon"     tone="#7C3AED" label="Appearance"         value="Auto" />
        <Row icon="bell"     tone="#F26A3F" label="Notifications"      value="3 enabled" />
        <Row icon="rocket"   tone="#F19828" label="Default on launch"  value={a.name} last />
      </Section>

      <Section title="Automation">
        <Row icon="calendar" tone="#06B6D4" label="Recurring entries"  value="2 active" />
        <Row icon="bolt"     tone="#FFC23D" label="Smart scan"         toggle={true} />
        <Row icon="bank"     tone="#0F8A53" label="Bank sync"          value="2 banks" last />
      </Section>

      <Section title="Data & privacy">
        <Row icon="shield"        tone="#1F2937" label="Privacy & security"  />
        <Row icon="arrowDownTray" tone="#6B7280" label="Export · CSV / PDF"  />
        <Row icon="external"      tone="#0F8A53" label="Connect accountant" tintRow={c.tint} last />
      </Section>

      <div style={{ padding: '0 22px 28px', textAlign: 'center', color: c.ink3, fontSize: 11, fontFamily: FONT_MONO, letterSpacing: 0.6 }}>
        Fince · v2.4.1 · Build 8842
      </div>

      <TabBar active="settings" dark={dark} />
    </div>
  );
};

window.HiFi_Add = HiFi_Add;
window.HiFi_Detail = HiFi_Detail;
window.HiFi_Settings = HiFi_Settings;
