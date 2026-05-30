// Fince Hi-fi icon set
// 24×24 grid, 1.75 stroke, rounded caps & joins.
// All icons inherit `currentColor` and accept size + stroke props.

const Icon = ({ name, size = 22, stroke = 1.75, color = 'currentColor', fill = 'none', style = {} }) => {
  const props = {
    width: size, height: size, viewBox: '0 0 24 24',
    fill: 'none', stroke: color, strokeWidth: stroke,
    strokeLinecap: 'round', strokeLinejoin: 'round',
    style,
  };
  const paths = ICONS[name];
  if (!paths) return null;
  return <svg {...props} dangerouslySetInnerHTML={{ __html: paths }} />;
};

// Each icon is raw SVG inner-markup. Designed in pairs (line + small accent fill where useful).
const ICONS = {
  // navigation
  home:        '<path d="M3.5 10.5 12 4l8.5 6.5"/><path d="M5.5 9.7V19a1 1 0 0 0 1 1H10v-5h4v5h3.5a1 1 0 0 0 1-1V9.7"/>',
  projects:    '<rect x="3.5" y="4.5" width="7.5" height="7.5" rx="1.6"/><rect x="13" y="4.5" width="7.5" height="7.5" rx="1.6"/><rect x="3.5" y="13.5" width="7.5" height="7.5" rx="1.6"/><rect x="13" y="13.5" width="7.5" height="7.5" rx="1.6"/>',
  ledger:      '<path d="M5 4.5h11.5A2.5 2.5 0 0 1 19 7v13H7.5A2.5 2.5 0 0 1 5 17.5Z"/><path d="M9 9.5h6M9 13h6M9 16.5h3.5"/>',
  settings:    '<circle cx="12" cy="12" r="2.6"/><path d="M19.5 13.5v-3l-1.7-.4a6 6 0 0 0-.6-1.4l.9-1.5-2.1-2.1-1.5.9a6 6 0 0 0-1.4-.6L12.6 3.7h-1.2L11 5.4a6 6 0 0 0-1.4.6L8 5.1 5.9 7.2l.9 1.5a6 6 0 0 0-.6 1.4l-1.7.4v3l1.7.4a6 6 0 0 0 .6 1.4l-.9 1.5L8 18.9l1.5-.9a6 6 0 0 0 1.4.6l.4 1.7h1.2l.4-1.7a6 6 0 0 0 1.4-.6l1.5.9 2.1-2.1-.9-1.5a6 6 0 0 0 .6-1.4Z"/>',

  // directional
  arrowUpRight:   '<path d="M7 17 17 7M9 7h8v8"/>',
  arrowDownLeft:  '<path d="M17 7 7 17M15 17H7V9"/>',
  arrowDown:      '<path d="M12 5v14M6 13l6 6 6-6"/>',
  arrowDownTray:  '<path d="M12 4v10M7.5 9.5l4.5 4.5 4.5-4.5"/><path d="M5 17v1.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V17"/>',
  chevronRight:   '<path d="M9.5 5.5 16 12l-6.5 6.5"/>',
  chevronDown:    '<path d="M5.5 9.5 12 16l6.5-6.5"/>',
  chevronLeft:    '<path d="M14.5 5.5 8 12l6.5 6.5"/>',

  // actions
  plus:        '<path d="M12 5.5v13M5.5 12h13"/>',
  close:       '<path d="M6 6l12 12M6 18 18 6"/>',
  search:      '<circle cx="11" cy="11" r="6"/><path d="m15.5 15.5 4 4"/>',
  filter:      '<path d="M4 6h16M7 12h10M10 18h4"/>',
  edit:        '<path d="m4.5 19.5 4-1L19 8a1.9 1.9 0 0 0-2.7-2.7L5.5 16Z"/><path d="m14.5 7.5 2.7 2.7"/>',
  trash:       '<path d="M4.5 6.5h15M9.5 6.5V5a1.5 1.5 0 0 1 1.5-1.5h2A1.5 1.5 0 0 1 14.5 5v1.5M6.5 6.5 7.7 19a1.5 1.5 0 0 0 1.5 1.4h5.6a1.5 1.5 0 0 0 1.5-1.4l1.2-12.5M10 10.5v6M14 10.5v6"/>',
  share:       '<path d="M5 12.5V19a1.5 1.5 0 0 0 1.5 1.5h11A1.5 1.5 0 0 0 19 19v-6.5M12 3v12M7.5 7.5 12 3l4.5 4.5"/>',
  paperclip:   '<path d="M19 11.5 11.5 19a4 4 0 0 1-5.7-5.7l8.5-8.5a2.7 2.7 0 0 1 3.8 3.8l-8.4 8.4a1.4 1.4 0 0 1-2-2l7.4-7.4"/>',

  // state
  check:       '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  bolt:        '<path d="M13 3.5 4.5 14h6L9.5 20.5 19.5 9h-6Z"/>',
  spark:       '<path d="M12 3.5v3M12 17.5v3M3.5 12h3M17.5 12h3M6 6l2 2M16 16l2 2M6 18l2-2M16 8l2-2"/>',
  clock:       '<circle cx="12" cy="12" r="8"/><path d="M12 7.5V12l3 2"/>',
  calendar:    '<rect x="4" y="5.5" width="16" height="14.5" rx="2"/><path d="M4 10h16M8.5 3.5v4M15.5 3.5v4"/>',

  // settings glyphs
  currency:    '<circle cx="12" cy="12" r="8"/><path d="M14.5 9.2c-.7-1-1.8-1.7-3-1.5-1.7.3-2.6 2-2 3.5.5 1.4 2 1.5 3.5 1.8s2.9.7 3.2 2.3c.3 1.6-1 3-2.8 3.2-1.3.1-2.5-.6-3.2-1.7M12 6v1.5M12 16.5V18"/>',
  faceid:      '<path d="M4 8.5V6.5A2 2 0 0 1 6 4.5h2M16 4.5h2A2 2 0 0 1 20 6.5v2M20 15.5v2A2 2 0 0 1 18 19.5h-2M8 19.5H6a2 2 0 0 1-2-2v-2"/><path d="M9 9.5v1.5M15 9.5v1.5M12 9.5V13h-1M9 15s1.2 1.2 3 1.2S15 15 15 15"/>',
  moon:        '<path d="M19 14.5A8 8 0 0 1 9.5 5a7.5 7.5 0 1 0 9.5 9.5Z"/>',
  bell:        '<path d="M6.5 17h11l-1.2-1.5a3 3 0 0 1-.7-1.9V11a3.6 3.6 0 0 0-7.2 0v2.6a3 3 0 0 1-.7 1.9Z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>',
  rocket:      '<path d="M13 3.5c4 0 7.5 3.5 7.5 7.5l-5 5-5-5c0-4 2.5-7.5 2.5-7.5Z"/><circle cx="14.5" cy="9.5" r="1.5"/><path d="m9 15-2 2c-.7.7-.7 2 0 2.7s2 .7 2.7 0l2-2M5.5 14.5c-1 1.5-1 4-1 4s2.5 0 4-1"/>',
  shield:      '<path d="M12 3.5 5 6v6.5c0 4 3 7 7 8 4-1 7-4 7-8V6Z"/>',
  globe:       '<circle cx="12" cy="12" r="8"/><path d="M4 12h16M12 4a13 13 0 0 1 0 16M12 4a13 13 0 0 0 0 16"/>',

  // misc
  camera:      '<rect x="3.5" y="7" width="17" height="13" rx="2"/><circle cx="12" cy="13.5" r="3.5"/><path d="M9 7l1-2.5h4L15 7"/>',
  image:       '<rect x="3.5" y="4.5" width="17" height="15" rx="2"/><circle cx="9" cy="10" r="1.8"/><path d="m4 17 5-5 5 4.5 2-1.5 4 3.5"/>',
  flash:       '<path d="M13 3 5 14h5.5L10 21l8-11h-5.5Z"/>',
  flashOff:    '<path d="M11 3 5 12h3l-1 7M13 12h5l-3 4M3 3l18 18"/>',
  bank:        '<path d="M3.5 9.5 12 4l8.5 5.5M5 10v8M9 10v8M15 10v8M19 10v8M3.5 19.5h17"/>',
  card:        '<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10.5h18M7 15.5h4"/>',
  receipt:     '<path d="M6 3.5h12v17l-2-1.2-2 1.2-2-1.2-2 1.2-2-1.2-2 1.2Z"/><path d="M9 8h6M9 11.5h6M9 15h3.5"/>',
  fingerprint: '<path d="M7.5 9a5 5 0 0 1 9-2M5 13c.2-2 .8-3.5 1.5-4.5M19 13.5c0 4-2.5 6.5-2.5 6.5M9 10.5a3 3 0 0 1 6 0c0 2 0 4-1 6M11 12v1.5c0 1.7-.5 3-1 4M14 17c-.5 1-1 2-1 2"/>',
  external:    '<path d="M6 6h6M6 6v6M6 6l12 12"/>',

  // hero glyphs
  trendUp:     '<path d="M4 17 10 11l4 4 6-6M14 9h6v6"/>',
  trendDown:   '<path d="M4 7 10 13l4-4 6 6M14 15h6V9"/>',
};

window.Icon = Icon;
