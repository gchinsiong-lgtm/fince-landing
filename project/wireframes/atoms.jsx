// Reusable wireframe atoms — sketchy, low-fi vocabulary
// Loaded BEFORE other component files so they share these primitives.

const StatusBar = ({ dark = false }) => (
  <div className="wf-status" style={{ color: dark ? '#f4f1ea' : '#1c1a17' }}>
    <span>9:41</span>
    <span style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
      <span>•••</span><span>◐</span><span>▮</span>
    </span>
  </div>
);

const TabBar = ({ active = 'home', dark = false, style = 'classic' }) => {
  const items = [
    { id: 'home', label: 'Dashboard' },
    { id: 'projects', label: 'Projects' },
    { id: 'ledger', label: 'Ledger' },
    { id: 'settings', label: 'Settings' },
  ];
  if (style === 'pill') {
    return (
      <div style={{
        position: 'absolute', bottom: 18, left: '50%', transform: 'translateX(-50%)',
        border: '1.5px solid currentColor', borderRadius: 999, padding: '6px 10px',
        display: 'flex', gap: 14, background: dark ? '#1a1816' : '#f4f1ea',
        boxShadow: '2px 3px 0 rgba(0,0,0,0.06)',
      }}>
        {items.map(i => (
          <div key={i.id} style={{
            width: 22, height: 22, borderRadius: 6,
            border: '1.3px solid currentColor',
            background: i.id === active ? 'currentColor' : 'transparent',
          }} />
        ))}
      </div>
    );
  }
  if (style === 'fab') {
    const paper = dark ? '#1a1816' : '#f4f1ea';
    return (
      <>
        <div className="wf-tabbar wf-tabbar-notch">
          {items.slice(0, 2).map(i => (
            <div key={i.id} className="item" style={{ fontWeight: i.id === active ? 700 : 400, opacity: i.id === active ? 1 : 0.5 }}>
              <div className="glyph" />
              <span>{i.label}</span>
            </div>
          ))}
          <div style={{ width: 56 }} />
          {items.slice(2).map(i => (
            <div key={i.id} className="item" style={{ fontWeight: i.id === active ? 700 : 0.5, opacity: i.id === active ? 1 : 0.5 }}>
              <div className="glyph" />
              <span>{i.label}</span>
            </div>
          ))}
          {/* notch cutout — paper-colored circle masking the bar's top edge */}
          <div style={{
            position: 'absolute', top: -26, left: '50%', transform: 'translateX(-50%)',
            width: 64, height: 32, background: paper,
            borderBottomLeftRadius: 36, borderBottomRightRadius: 36,
            borderBottom: '1.5px solid currentColor',
            zIndex: 1,
          }} />
          <div style={{
            position: 'absolute', top: -2, left: '50%', transform: 'translateX(-50%)',
            width: 64, height: 6, background: paper, zIndex: 2,
          }} />
        </div>
        <div style={{
          position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)',
          width: 46, height: 46, borderRadius: '50%',
          border: '1.5px solid currentColor', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          background: paper, fontSize: 24, fontWeight: 400,
          zIndex: 3, fontFamily: 'Kalam, cursive',
        }}>+</div>
      </>
    );
  }
  return (
    <div className="wf-tabbar">
      {items.map(i => (
        <div key={i.id} className="item" style={{ opacity: i.id === active ? 1 : 0.5 }}>
          <div className="glyph" />
          <span>{i.label}</span>
        </div>
      ))}
    </div>
  );
};

// hand-drawn sparkline / wave
const Spark = ({ width = 80, height = 28, color = 'currentColor', positive = true }) => {
  // generate a slightly wobbly path
  const pts = positive
    ? [[0,20],[10,15],[20,18],[30,10],[40,12],[50,6],[60,9],[70,4],[80,7]]
    : [[0,8],[10,12],[20,9],[30,16],[40,13],[50,20],[60,17],[70,22],[80,18]];
  const d = pts.map((p,i) => (i ? 'L' : 'M') + p[0] + ' ' + p[1]).join(' ');
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <path className="spark" d={d} stroke={color} />
      <circle cx={pts[pts.length-1][0]} cy={pts[pts.length-1][1]} r="2" fill={color} />
    </svg>
  );
};

// circular percent dial — sketchy
const Dial = ({ pct = 0.7, size = 60, label, sublabel }) => {
  const r = size/2 - 4;
  const c = 2 * Math.PI * r;
  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={size} height={size}>
        <circle cx={size/2} cy={size/2} r={r} stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" fill="none" />
        <circle cx={size/2} cy={size/2} r={r} stroke="currentColor" strokeWidth="2" fill="none"
          strokeDasharray={`${c*pct} ${c}`} strokeLinecap="round"
          transform={`rotate(-90 ${size/2} ${size/2})`} />
      </svg>
      <div style={{ position: 'absolute', textAlign: 'center', fontFamily: 'Kalam', lineHeight: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 700 }}>{label}</div>
        {sublabel && <div style={{ fontSize: 9, opacity: 0.6 }}>{sublabel}</div>}
      </div>
    </div>
  );
};

// arrow icon
const Arrow = ({ dir = 'up', color }) => {
  const rotate = { up: -45, down: 135, left: 180, right: 0 }[dir];
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" style={{ transform: `rotate(${rotate}deg)` }}>
      <path d="M3 7h8M8 4l3 3-3 3" stroke={color || 'currentColor'} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

// transaction row — hand-drawn
const TxnRow = ({ name, date, amount, kind = 'pos', status, dense = false }) => (
  <div className="wf-row" style={{ padding: dense ? '6px 0' : '8px 0' }}>
    <div className="wf-circle">
      <Arrow dir={kind === 'pos' ? 'up' : 'down'} color={kind === 'pos' ? 'var(--hi-green)' : 'var(--hi-red)'} />
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontFamily: 'Kalam', fontWeight: 700, fontSize: 12, lineHeight: 1.1 }}>{name}</div>
      <div style={{ fontFamily: 'Kalam', fontSize: 10, opacity: 0.55 }}>{date}</div>
    </div>
    {status && (
      <div style={{
        fontFamily: 'Kalam', fontSize: 9, padding: '1px 6px',
        border: '1.2px solid var(--hi-green)', borderRadius: 999, color: 'var(--hi-green)',
      }}>{status}</div>
    )}
    <div className={`wf-amount ${kind}`} style={{ fontSize: 12 }}>
      {kind === 'pos' ? '+' : '-'} RM {amount}
    </div>
  </div>
);

// annotation w/ hand-drawn arrow pointing somewhere
const Annotate = ({ children, top, left, right, bottom, arrow }) => (
  <div className="annotation" style={{ top, left, right, bottom }}>
    {children}
    {arrow && (
      <svg width="60" height="40" viewBox="0 0 60 40" style={{
        position: 'absolute', ...arrow.pos,
        transform: arrow.flip ? 'scaleX(-1)' : '',
      }}>
        <path d="M5 5 Q 25 30, 50 30" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        <path d="M50 30 L 44 26 M50 30 L 46 36" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      </svg>
    )}
  </div>
);

// note (post-it style)
const Note = ({ children, style = {} }) => (
  <div className="note" style={style}>{children}</div>
);

// sketchy chart area
const SketchChart = ({ width = 220, height = 70, dark = false }) => {
  const stroke = dark ? '#2ee07a' : 'var(--hi-green)';
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {/* baseline grid */}
      <line x1="0" y1={height-1} x2={width} y2={height-1} stroke="currentColor" strokeOpacity="0.2" />
      <path
        d={`M0 ${height*0.7} Q${width*0.18} ${height*0.4} ${width*0.32} ${height*0.55}
            T ${width*0.6} ${height*0.3} T ${width*0.85} ${height*0.2} T ${width} ${height*0.25}`}
        fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      <circle cx={width-2} cy={height*0.25} r="3" fill={stroke} />
    </svg>
  );
};

// segmented date selector
const Segmented = ({ items = ['1M','3M','YTD','1Y','Max'], active = '1M' }) => (
  <div style={{ display: 'flex', gap: 4 }}>
    {items.map(i => (
      <div key={i} className={`wf-tab ${i === active ? 'active' : ''}`} style={{ fontSize: 9, padding: '2px 7px' }}>
        {i}
      </div>
    ))}
  </div>
);

Object.assign(window, {
  StatusBar, TabBar, Spark, Dial, Arrow, TxnRow, Annotate, Note, SketchChart, Segmented,
});
