// V1 SETTINGS — extracted from add-detail-settings.jsx

const HiFi_Settings = ({ dark = true }) => {
  const c = window.FINCE.TOKENS[dark ? 'dark' : 'light'];
  const { FONT_UI, FONT_MONO, WORKSPACE_TONES } = window.FINCE;
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
              color: '#fff', fontFamily: FONT_UI, fontSize: 22, fontWeight: 700, letterSpacing: -0.5,
              boxShadow: 'inset 0 0.5px 0 rgba(255,255,255,0.45), inset 0 -1px 0 rgba(0,0,0,0.15)',
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
        <Row icon="currency" tone={c.green} label="Base currency"     value="RM (MYR)" />
        <Row icon="faceid"   tone={c.green} label="Face ID"            toggle={true} />
        <Row icon="moon"     tone={c.ink}   label="Appearance"         value="Auto" />
        <Row icon="bell"     tone={c.blue}  label="Notifications"      value="3 enabled" />
        <Row icon="rocket"   tone={c.blue}  label="Default on launch"  value={a.name} last />
      </Section>

      <Section title="Automation">
        <Row icon="calendar" tone={c.blue}  label="Recurring entries"  value="2 active" />
        <Row icon="bolt"     tone={c.green} label="Smart scan"         toggle={true} />
        <Row icon="bank"     tone={c.green} label="Bank sync"          value="2 banks" last />
      </Section>

      <Section title="Data & privacy">
        <Row icon="shield"        tone={c.ink}   label="Privacy & security"  />
        <Row icon="arrowDownTray" tone={c.ink2}  label="Export · CSV / PDF"  />
        <Row icon="external"      tone={c.green} label="Connect accountant" tintRow={c.tint} last />
      </Section>

      <div style={{ padding: '0 22px 28px', textAlign: 'center', color: c.ink3, fontSize: 11, fontFamily: FONT_MONO, letterSpacing: 0.6 }}>
        Fince · v2.4.1 · Build 8842
      </div>

      <TabBar active="settings" dark={dark} />
    </div>
  );
};


window.HiFi_Settings = HiFi_Settings;
