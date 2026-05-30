// Fince Hi-fi — shared atoms & navigation chrome.
// All screens import the system tokens + Icon set + these primitives.

const { FONT_UI, FONT_MONO, TOKENS, WORKSPACE_TONES } = window.FINCE;

// ─────────────────────────────────────────────────────────────
// Card surface — subtle stack with hairline + inset highlight
// ─────────────────────────────────────────────────────────────
const Card = ({ dark, radius = 20, children, style = {}, padding = 18, onClick }) => {
  const c = TOKENS[dark ? 'dark' : 'light'];
  return (
    <div onClick={onClick} style={{
      background: c.surface,
      borderRadius: radius,
      padding,
      boxShadow: c.cardShadow,
      border: dark ? `0.5px solid ${c.hairline}` : 'none',
      ...style,
    }}>{children}</div>
  );
};

// ─────────────────────────────────────────────────────────────
// Large-title nav with optional trailing actions
// ─────────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────
// Section header used above grouped inset cards
// ─────────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────
// Workspace pill — branded gradient monogram + name + chevron
// ─────────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────
// Round chrome button (top-right corners)
// ─────────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────
// Tabular money — splits int + decimals, monospace tnum
// ─────────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────
// Tab bar — iOS 26 Liquid Glass: highly transparent, strong blur,
// crisp inset highlights, soft refraction.
// ─────────────────────────────────────────────────────────────
const TabBar = ({ active = 'home', dark }) => {
  const c = TOKENS[dark ? 'dark' : 'light'];
  const tabs = [
    { id: 'home',     label: 'Home',     icon: 'home' },
    { id: 'projects', label: 'Projects', icon: 'projects' },
    { id: 'ledger',   label: 'Ledger',   icon: 'ledger' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ];
  const tint = c.ink;
  const inactive = c.ink2;

  // Truly transparent — just enough base to keep legibility, blur does the work.
  const glassBg = dark
    ? 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.01) 60%, rgba(255,255,255,0.04) 100%), rgba(22,22,24,0.18)'
    : 'linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.20) 60%, rgba(255,255,255,0.35) 100%), rgba(255,255,255,0.18)';
  const ring     = dark ? 'rgba(255,255,255,0.16)' : 'rgba(255,255,255,0.85)';
  const ringLo   = dark ? 'rgba(0,0,0,0.55)' : 'rgba(20,19,15,0.08)';
  const innerHi  = dark ? 'rgba(255,255,255,0.30)' : 'rgba(255,255,255,1)';
  const innerLo  = dark ? 'rgba(0,0,0,0.40)' : 'rgba(20,19,15,0.05)';

  const Tab = ({ t }) => {
    const isActive = t.id === active;
    return (
      <div style={{
        flex: 1,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: 3, position: 'relative',
        color: isActive ? tint : inactive,
        fontFamily: FONT_UI, fontSize: 10, fontWeight: 600, letterSpacing: 0.1,
      }}>
        <Icon name={t.icon} size={22} stroke={isActive ? 2 : 1.7} />
        <span>{t.label}</span>
        {isActive && (
          <span style={{
            position: 'absolute', bottom: -2,
            width: 5, height: 5, borderRadius: 3,
            background: c.blue,
            boxShadow: `0 0 8px ${c.blueGlow}, 0 0 2px ${c.blue}`,
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
      backdropFilter: 'blur(40px) saturate(190%)',
      WebkitBackdropFilter: 'blur(40px) saturate(190%)',
      boxShadow: [
        // crisp double ring (Liquid Glass look)
        `inset 0 0 0 0.5px ${ring}`,
        `inset 0 0 0 1.5px ${ringLo}`,
        // refraction highlights
        `inset 0 1.5px 0 ${innerHi}`,
        `inset 0 -1.5px 0 ${innerLo}`,
        // soft lift
        `0 18px 40px rgba(0,0,0,${dark ? 0.45 : 0.10})`,
        `0 4px 10px rgba(0,0,0,${dark ? 0.35 : 0.04})`,
      ].join(', '),
      display: 'flex', alignItems: 'stretch',
      padding: '0 6px',
      overflow: 'visible',
    }}>
      <Tab t={tabs[0]} />
      <Tab t={tabs[1]} />
      {/* center FAB slot — blue gradient + glow */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
        <div style={{
          position: 'absolute', top: -28,
          width: 60, height: 60, borderRadius: '50%',
          background: `radial-gradient(circle at 35% 30%, ${c.blue} 0%, ${c.blueDeep} 100%)`,
          color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: [
            // glow ring
            `0 0 0 8px ${c.blueBg}`,
            // deep cast shadow
            `0 18px 36px ${c.blueGlow}`,
            '0 4px 10px rgba(0,0,0,0.28)',
            // refraction highlight stack
            'inset 0 1.5px 0 rgba(255,255,255,0.55)',
            'inset 0 -1.5px 0 rgba(0,0,0,0.22)',
            'inset 0 0 0 0.5px rgba(255,255,255,0.30)',
          ].join(', '),
        }}>
          <Icon name="plus" size={26} stroke={2.4} color="#fff" />
        </div>
      </div>
      <Tab t={tabs[2]} />
      <Tab t={tabs[3]} />
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Status bar (since we render inside IOSDevice, our parent already
// injects IOSStatusBar — but we expose a helper for the no-bezel
// previews used in onboarding/etc).
// ─────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────
// Generic transaction row
// ─────────────────────────────────────────────────────────────
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
        background: isPos ? c.posBg : c.negBg,
        color: isPos ? c.pos : c.neg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        <Icon name={isPos ? 'arrowDownLeft' : 'arrowUpRight'} size={18} stroke={2} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: FONT_UI, fontSize: 15, fontWeight: 600,
          letterSpacing: -0.2, color: c.ink,
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
          boxShadow: `0 0 12px ${c.greenGlow}`,
        }}>{t.status}</div>
      )}
      <div style={{
        fontFamily: FONT_UI, fontSize: 15, fontWeight: 700,
        color: isPos ? c.pos : c.ink,
        fontFeatureSettings: '"tnum"',
        whiteSpace: 'nowrap',
      }}>
        {isPos ? '+' : '−'}{t.amount}
      </div>
    </div>
  );
};

Object.assign(window, {
  Card, LargeTitle, SectionHeader, WorkspacePill, ChromeButton, Money, TabBar, TxnRow,
});
