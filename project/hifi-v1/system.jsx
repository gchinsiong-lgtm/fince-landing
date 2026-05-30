// V1 SYSTEM — with Instrument Serif

const FONT_UI    = '"Inter", -apple-system, "SF Pro Display", system-ui, sans-serif';
const FONT_MONO  = '"JetBrains Mono", "SF Mono", ui-monospace, Menlo, monospace';
const FONT_SERIF = '"Instrument Serif", "Times New Roman", Georgia, serif';

const TOKENS = {
  light: {
    bg: '#F4F2EC', bgGrad: 'linear-gradient(180deg, #F6F5EF 0%, #F2F0E9 100%)',
    surface: '#FFFFFF', surface2: '#F9F7F2', surface3: '#EEEBE3',
    ink: '#14130F', ink2: 'rgba(20,19,15,0.58)', ink3: 'rgba(20,19,15,0.30)',
    ink4: 'rgba(20,19,15,0.12)', sep: 'rgba(20,19,15,0.08)', hairline: 'rgba(20,19,15,0.06)',
    tint: '#2A5BD7', tintBg: 'rgba(42,91,215,0.10)',
    brand: '#F26A3F', brandDeep: '#C7521F',
    pos: '#0F8A53', posBg: 'rgba(15,138,83,0.10)',
    neg: '#C24628', negBg: 'rgba(194,70,40,0.10)',
    cardShadow: '0 1px 2px rgba(20,19,15,0.04), 0 8px 24px rgba(20,19,15,0.04)',
    insetHi: 'inset 0 0.5px 0 rgba(255,255,255,0.9)',
  },
  dark: {
    bg: '#0A0A0B', bgGrad: 'linear-gradient(180deg, #0C0C0E 0%, #08080A 100%)',
    surface: '#161618', surface2: '#1F1F22', surface3: '#2A2A2E',
    ink: '#FAFAF7', ink2: 'rgba(250,250,247,0.58)', ink3: 'rgba(250,250,247,0.28)',
    ink4: 'rgba(250,250,247,0.12)', sep: 'rgba(255,255,255,0.06)', hairline: 'rgba(255,255,255,0.04)',
    tint: '#6E97FF', tintBg: 'rgba(110,151,255,0.14)',
    brand: '#FF7A4D', brandDeep: '#E0451F',
    pos: '#30D27A', posBg: 'rgba(48,210,122,0.16)',
    neg: '#FF7752', negBg: 'rgba(255,119,82,0.16)',
    cardShadow: 'inset 0 0.5px 0 rgba(255,255,255,0.06)',
    insetHi: 'inset 0 0.5px 0 rgba(255,255,255,0.06)',
  },
};

const WORKSPACE_TONES = {
  filmpeak:  { grad: 'linear-gradient(135deg, #FF8557 0%, #D63E16 100%)', accent: '#FF7A4D' },
  saffron:   { grad: 'linear-gradient(135deg, #FFC23D 0%, #E07A12 100%)', accent: '#F19828' },
  greenline: { grad: 'linear-gradient(135deg, #57D89A 0%, #1F8A5B 100%)', accent: '#30B074' },
  brand:     { grad: 'linear-gradient(135deg, #B89BFF 0%, #6A4FE0 100%)', accent: '#8C6BFF' },
  personal:  { grad: 'linear-gradient(135deg, #C9C0AB 0%, #6E6655 100%)', accent: '#9C927F' },
};

window.FINCE = { FONT_UI, FONT_MONO, FONT_SERIF, TOKENS, WORKSPACE_TONES };
