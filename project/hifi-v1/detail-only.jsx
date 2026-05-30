// V1 DETAIL — extracted from add-detail-settings.jsx

const HiFi_Detail = ({ dark = true }) => {
  const c = window.FINCE.TOKENS[dark ? 'dark' : 'light'];
  const { FONT_UI, FONT_MONO, WORKSPACE_TONES } = window.FINCE;

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


window.HiFi_Detail = HiFi_Detail;
