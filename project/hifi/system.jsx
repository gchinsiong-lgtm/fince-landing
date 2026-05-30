// Fince Hi-fi — design tokens. RULES: only red, green, blue + neutrals.

const FONT_UI    = '"Inter", -apple-system, "SF Pro Display", system-ui, sans-serif';
const FONT_MONO  = '"JetBrains Mono", "SF Mono", ui-monospace, Menlo, monospace';

const TOKENS = {
  light: {
    bg:       '#F4F2EC',
    bgGrad:   'linear-gradient(180deg, #F6F5EF 0%, #F2F0E9 100%)',
    surface:  '#FFFFFF',
    surface2: '#F9F7F2',
    surface3: '#EEEBE3',
    ink:      '#14130F',
    ink2:     'rgba(20,19,15,0.58)',
    ink3:     'rgba(20,19,15,0.30)',
    ink4:     'rgba(20,19,15,0.12)',
    sep:      'rgba(20,19,15,0.08)',
    hairline: 'rgba(20,19,15,0.06)',
    // BLUE — primary accent / brand / FAB
    blue:      '#2A6FF0',
    blueDeep:  '#1B4FBF',
    blueBg:    'rgba(42,111,240,0.10)',
    blueGlow:  'rgba(42,111,240,0.45)',
    // GREEN — income / positive
    green:     '#0F8A53',
    greenDeep: '#0A6B40',
    greenBg:   'rgba(15,138,83,0.10)',
    greenGlow: 'rgba(15,138,83,0.45)',
    // RED — expense / alert
    red:       '#C24628',
    redDeep:   '#9B331C',
    redBg:     'rgba(194,70,40,0.10)',
    redGlow:   'rgba(194,70,40,0.45)',
    cardShadow: '0 1px 2px rgba(20,19,15,0.04), 0 8px 24px rgba(20,19,15,0.04)',
    // legacy aliases (so existing screens keep working)
    get tint()   { return this.blue; },
    get tintBg() { return this.blueBg; },
    get brand()  { return this.blue; },
    get brandDeep() { return this.blueDeep; },
    get pos()    { return this.green; },
    get posBg()  { return this.greenBg; },
    get neg()    { return this.red; },
    get negBg()  { return this.redBg; },
  },
  dark: {
    bg:       '#0A0A0B',
    bgGrad:   'linear-gradient(180deg, #0C0C0E 0%, #08080A 100%)',
    surface:  '#161618',
    surface2: '#1F1F22',
    surface3: '#2A2A2E',
    ink:      '#FAFAF7',
    ink2:     'rgba(250,250,247,0.58)',
    ink3:     'rgba(250,250,247,0.28)',
    ink4:     'rgba(250,250,247,0.12)',
    sep:      'rgba(255,255,255,0.06)',
    hairline: 'rgba(255,255,255,0.04)',
    blue:      '#4D8BFF',
    blueDeep:  '#2A6FF0',
    blueBg:    'rgba(77,139,255,0.16)',
    blueGlow:  'rgba(77,139,255,0.55)',
    green:     '#30D27A',
    greenDeep: '#1FAA5E',
    greenBg:   'rgba(48,210,122,0.16)',
    greenGlow: 'rgba(48,210,122,0.50)',
    red:       '#FF6B4A',
    redDeep:   '#E04A2A',
    redBg:     'rgba(255,107,74,0.16)',
    redGlow:   'rgba(255,107,74,0.50)',
    cardShadow: 'inset 0 0.5px 0 rgba(255,255,255,0.06)',
    get tint()   { return this.blue; },
    get tintBg() { return this.blueBg; },
    get brand()  { return this.blue; },
    get brandDeep() { return this.blueDeep; },
    get pos()    { return this.green; },
    get posBg()  { return this.greenBg; },
    get neg()    { return this.red; },
    get negBg()  { return this.redBg; },
  },
};

// Workspace gradients — only the 3 primaries + a neutral
const WORKSPACE_TONES = {
  // Filmpeak — BLUE (primary studio)
  filmpeak:  { grad: 'linear-gradient(135deg, #5B9BFF 0%, #1B4FBF 100%)', accent: '#2A6FF0' },
  // Saffron — RED (warm)
  saffron:   { grad: 'linear-gradient(135deg, #FF7A57 0%, #9B331C 100%)', accent: '#C24628' },
  // Greenline — GREEN (eponymous)
  greenline: { grad: 'linear-gradient(135deg, #4FD899 0%, #0A6B40 100%)', accent: '#0F8A53' },
  // Brand campaign — deep BLUE variant
  brand:     { grad: 'linear-gradient(135deg, #4D8BFF 0%, #0E2E78 100%)', accent: '#1B4FBF' },
  // Personal — NEUTRAL (greyscale)
  personal:  { grad: 'linear-gradient(135deg, #C9C0AB 0%, #4A463F 100%)', accent: '#6E6655' },
};

window.FINCE = { FONT_UI, FONT_MONO, TOKENS, WORKSPACE_TONES };
