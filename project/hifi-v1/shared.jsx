// V1 SHARED — with Wordmark, richer card defaults

const { FONT_UI, FONT_MONO, FONT_SERIF, TOKENS, WORKSPACE_TONES } = window.FINCE;

const Wordmark = ({ dark, size = 22, hairline = false }) => {
  const c = TOKENS[dark ? 'dark' : 'light'];
  return (
    <span style={{
      fontFamily: FONT_SERIF, fontSize: size, lineHeight: 1, fontWeight: 400,
      letterSpacing: -0.5, color: c.ink, display: 'inline-flex', alignItems: 'baseline',
    }}>
      F<span style={{ fontStyle: 'italic', marginLeft: -1 }}>i</span>nce
      {hairline && <span style={{
        marginLeft: 6, width: 4, height: 4, borderRadius: '50%',
        background: c.brand, alignSelf: 'center', display: 'inline-block',
      }} />}
    </span>
  );
};

const Card = ({ dark, radius = 20, children, style = {}, padding = 18, onClick }) => {
  const c = TOKENS[dark ? 'dark' : 'light'];
  return (
    <div onClick={onClick} style={{
      background: c.surface, borderRadius: radius, padding,
      boxShadow: c.cardShadow,
      border: dark ? `0.5px solid ${c.hairline}` : 'none',
      ...style,
    }}>{children}</div>
  );
};

const LargeTitle = ({ title, eyebrow, dark, trailing, leading, padX = 22 }) => {
  const c = TOKENS[dark ? 'dark' : 'light'];
  return (
    <div style={{ padding: `${leading ? 6 : 10}px ${padX}px 14px` }}>
      {(leading || trailing) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: 36, marginBottom: leading ? 4 : -10 }}>
          {leading || <div />}
          {trailing || <div />}
        </div>
      )}
      {eyebrow && (
        <div style={{
          fontFamily: FONT_UI, fontSize: 11, fontWeight: 600, letterSpacing: 1.2,
          textTransform: 'uppercase', color: c.ink2, marginBottom: 4,
        }}>{eyebrow}</div>
      )}
      <div style={{
        fontFamily: FONT_UI, fontSize: 34, fontWeight: 700,
        letterSpacing: -0.8, lineHeight: 1.05, color: c.ink,
      }}>{title}</div>
    </div>
  );
};

const SectionHeader = ({ dark, children, action, padX = 26 }) => {
  const c = TOKENS[dark ? 'dark' : 'light'];
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
      padding: `0 ${padX}px 8px`,
    }}>
      <div style={{
        fontFamily: FONT_UI, fontSize: 11, fontWeight: 600, letterSpacing: 1.2,
        textTransform: 'uppercase', color: c.ink2,
      }}>{children}</div>
      {action}
    </div>
  );
};

const WorkspacePill = ({ dark, name = 'Filmpeak', tone = WORKSPACE_TONES.filmpeak, initial }) => {
  const c = TOKENS[dark ? 'dark' : 'light'];
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '5px 10px 5px 5px',
      background: c.surface, borderRadius: 999,
      fontFamily: FONT_UI, fontSize: 13, fontWeight: 600, color: c.ink,
      boxShadow: c.cardShadow,
      border: dark ? `0.5px solid ${c.hairline}` : 'none',
    }}>
      <span style={{
        width: 22, height: 22, borderRadius: 7, background: tone.grad,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        color: '#fff', fontSize: 11, fontWeight: 700,
        boxShadow: 'inset 0 0.5px 0 rgba(255,255,255,0.4)',
      }}>{initial || name[0]}</span>
      {name}
      <Icon name="chevronDown" size={12} color={c.ink2} stroke={2} style={{ marginLeft: -2 }} />
    </div>
  );
};

const ChromeButton = ({ dark, icon, size = 36, color, onClick }) => {
  const c = TOKENS[dark ? 'dark' : 'light'];
  return (
    <div onClick={onClick} style={{
      width: size, height: size, borderRadius: size / 2,
      background: c.surface,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: color || c.ink, cursor: 'pointer',
      boxShadow: c.cardShadow,
      border: dark ? `0.5px solid ${c.hairline}` : 'none',
    }}>
      <Icon name={icon} size={18} color={color || c.ink} />
    </div>
  );
};

const Money = ({ value, currency = 'RM', size = 38, color, dark, sign }) => {
  const c = TOKENS[dark ? 'dark' : 'light'];
  const [intPart, decPart] = String(value).split('.');
  return (
    <span style={{
      fontFamily: FONT_UI, fontSize: size, fontWeight: 700,
      letterSpacing: -1, lineHeight: 1, color: color || c.ink,
      fontFeatureSettings: '"tnum","ss01"',
      display: 'inline-flex', alignItems: 'baseline',
    }}>
      <span style={{ fontSize: size * 0.55, color: c.ink2, fontWeight: 600, marginRight: 5 }}>{currency}</span>
      {sign && <span style={{ marginRight: 2 }}>{sign}</span>}
      {intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      {decPart && <span style={{ fontSize: size * 0.6, color: c.ink2, fontWeight: 600 }}>.{decPart}</span>}
    </span>
  );
};

const TabBar = ({ active = 'home', dark }) => {
  const c = TOKENS[dark ? 'dark' : 'light'];
  const tabs = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'projects', label: 'Projects', icon: 'projects' },
    { id: 'ledger', label: 'Ledger', icon: 'ledger' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ];
  const glassBg = dark
    ? 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%), rgba(22,22,24,0.55)'
    : 'linear-gradient(180deg, rgba(255,255,255,0.70) 0%, rgba(255,255,255,0.55) 100%), rgba(255,255,255,0.6)';
  const ring = dark ? 'rgba(255,255,255,0.10)' : 'rgba(20,19,15,0.06)';
  const innerHi = dark ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.95)';
  const innerLo = dark ? 'rgba(0,0,0,0.45)' : 'rgba(20,19,15,0.04)';

  const Tab = ({ t }) => {
    const isActive = t.id === active;
    return (
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: 3, position: 'relative',
        color: isActive ? c.ink : c.ink2,
        fontFamily: FONT_UI, fontSize: 10, fontWeight: 600, letterSpacing: 0.1,
      }}>
        <Icon name={t.icon} size={22} stroke={isActive ? 2 : 1.7} />
        <span>{t.label}</span>
        {isActive && (
          <span style={{
            position: 'absolute', bottom: -2,
            width: 4, height: 4, borderRadius: 2, background: c.brand,
          }} />
        )}
      </div>
    );
  };

  return (
    <div style={{
      position: 'absolute', bottom: 18, left: 14, right: 14,
      height: 66, borderRadius: 33,
      background: glassBg,
      backdropFilter: 'blur(30px) saturate(180%)',
      WebkitBackdropFilter: 'blur(30px) saturate(180%)',
      border: `1px solid ${ring}`,
      boxShadow: [
        `inset 0 1px 0 ${innerHi}`, `inset 0 -1px 0 ${innerLo}`,
        `0 18px 40px rgba(0,0,0,${dark ? 0.55 : 0.10})`,
        `0 4px 10px rgba(0,0,0,${dark ? 0.35 : 0.04})`,
      ].join(', '),
      display: 'flex', alignItems: 'stretch', padding: '0 6px', overflow: 'visible',
    }}>
      <Tab t={tabs[0]} /><Tab t={tabs[1]} />
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
        <div style={{
          position: 'absolute', top: -28,
          width: 60, height: 60, borderRadius: '50%',
          background: `radial-gradient(circle at 35% 30%, ${c.brand} 0%, ${c.brandDeep} 100%)`,
          color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: [
            '0 18px 36px rgba(220,63,26,0.45)', '0 4px 10px rgba(0,0,0,0.28)',
            'inset 0 1.5px 0 rgba(255,255,255,0.45)', 'inset 0 -1.5px 0 rgba(0,0,0,0.20)',
            'inset 0 0 0 0.5px rgba(255,255,255,0.22)',
          ].join(', '),
        }}>
          <Icon name="plus" size={26} stroke={2.4} color="#fff" />
        </div>
      </div>
      <Tab t={tabs[2]} /><Tab t={tabs[3]} />
    </div>
  );
};

const TxnRow = ({ dark, t, last, dense }) => {
  const c = TOKENS[dark ? 'dark' : 'light'];
  const isPos = t.kind === 'pos';
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: dense ? '11px 16px' : '14px 16px',
      borderBottom: last ? 'none' : `0.5px solid ${c.sep}`,
    }}>
      <div style={{
        width: 38, height: 38, borderRadius: 11,
        background: isPos ? c.posBg : c.negBg, color: isPos ? c.pos : c.neg,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        <Icon name={isPos ? 'arrowDownLeft' : 'arrowUpRight'} size={18} stroke={2} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: FONT_UI, fontSize: 15, fontWeight: 600, letterSpacing: -0.2, color: c.ink,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>{t.name}</div>
        <div style={{
          fontFamily: FONT_UI, fontSize: 12, color: c.ink2, marginTop: 2,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>{t.date}</div>
      </div>
      {t.status && (
        <div style={{
          background: c.posBg, color: c.pos,
          padding: '3px 8px', borderRadius: 999,
          fontFamily: FONT_UI, fontSize: 10, fontWeight: 700, letterSpacing: 0.6,
        }}>{t.status}</div>
      )}
      <div style={{
        fontFamily: FONT_UI, fontSize: 15, fontWeight: 700,
        color: isPos ? c.pos : c.ink, fontFeatureSettings: '"tnum"', whiteSpace: 'nowrap',
      }}>{isPos ? '+' : '−'}{t.amount}</div>
    </div>
  );
};

Object.assign(window, {
  Wordmark, Card, LargeTitle, SectionHeader, WorkspacePill, ChromeButton, Money, TabBar, TxnRow,
});
