# Handoff — Fince Hi-fi (iOS)

## Overview
Fince is a premium-feel iOS finance app for freelancers/studios. This package contains hi-fi mockups for the six core screens: **Dashboard**, **Ledger**, **Projects**, **Add Transaction (scan)**, **Transaction Detail**, and **Settings**, each in **Light + Dark** mode (Add is camera-only — dark).

## About the design files
The files in this bundle are **design references created in HTML** — React prototypes rendered inside a faux iOS device frame to show intended look and behavior. They are not production code to copy directly.

The task is to **recreate these designs in the target codebase's environment** (SwiftUI for native iOS, or React Native, or whatever framework the team uses), following established patterns and libraries. If there is no environment yet, SwiftUI is the natural choice given the iOS-native aesthetic.

## Fidelity
**High-fidelity.** All colors, typography, spacing, radii, and interactions are final. Recreate the UI pixel-accurately.

## ⚠ Hard design rules (must follow)
1. **Only three chromatic colors: red, green, blue.** Plus neutrals (white, black, warm-cream and grays). Slight readability variants of each are fine — `green`/`greenDeep`/`greenBg`/`greenGlow` etc. **No orange, yellow, purple, pink, cyan, magenta anywhere.** Workspace gradients use only the 3 chromatic + a neutral.
2. **Tab bar is transparent, iOS 26 Liquid Glass.** Very transparent base (alpha ~0.18), `backdrop-filter: blur(40px) saturate(190%)`, crisp double-ring inset, refraction highlight stack. The Dashboard's transaction list scrolls **beneath** the tab bar so partial rows are visible through the glass — this is intentional.
3. **No serif fonts.** Inter for all text. JetBrains Mono for numerals/refs only.
4. **Subtle glows** on a few strategic elements — FAB, PAID pill, active filter chip, sparkline endpoint, active tab dot. Glow values are encoded in tokens (`*Glow` colors).

## File map
- `Fince Hi-fi.html` — the prototype. Open in a browser to see all screens side-by-side on a design canvas.
- `hifi/system.jsx` — design tokens (palette, fonts, workspace tones)
- `hifi/icons.jsx` — full custom icon set (24×24, 1.75 stroke)
- `hifi/shared.jsx` — shared primitives: `Card`, `LargeTitle`, `SectionHeader`, `WorkspacePill`, `ChromeButton`, `Money`, `TabBar`, `TxnRow`
- `hifi/dashboard.jsx` — Dashboard screen
- `hifi/ledger-projects.jsx` — Ledger + Projects screens
- `hifi/add-detail-settings.jsx` — only `HiFi_Add` is used from here
- `hifi/recurring.jsx` — Recurring list + New-recurring entry form
- `hifi-v1/detail-only.jsx` — Transaction Detail (richer v1, no Instrument Serif)
- `hifi-v1/settings-only.jsx` — Settings (richer v1, with Automation + Data & privacy)
- `design-canvas.jsx`, `ios-frame.jsx`, `tweaks-panel.jsx` — preview infrastructure (not part of the design)

## Design tokens

### Neutral palette

**Light**
| token       | hex                          | use                                     |
|-------------|------------------------------|-----------------------------------------|
| bg          | `#F4F2EC`                    | screen background (warm cream)          |
| surface     | `#FFFFFF`                    | card surface                            |
| surface2    | `#F9F7F2`                    | secondary surface (segmented bg)        |
| surface3    | `#EEEBE3`                    | tertiary surface                        |
| ink         | `#14130F`                    | primary text                            |
| ink2        | `rgba(20,19,15,0.58)`        | secondary text                          |
| ink3        | `rgba(20,19,15,0.30)`        | tertiary text / placeholders            |
| ink4        | `rgba(20,19,15,0.12)`        | disabled / faint                        |
| sep         | `rgba(20,19,15,0.08)`        | hairline separator                      |
| hairline    | `rgba(20,19,15,0.06)`        | dark-mode card border equivalent        |

**Dark**
| token       | hex                          |
|-------------|------------------------------|
| bg          | `#0A0A0B`                    |
| surface     | `#161618`                    |
| surface2    | `#1F1F22`                    |
| surface3    | `#2A2A2E`                    |
| ink         | `#FAFAF7`                    |
| ink2        | `rgba(250,250,247,0.58)`     |
| ink3        | `rgba(250,250,247,0.28)`     |
| ink4        | `rgba(250,250,247,0.12)`     |
| sep         | `rgba(255,255,255,0.06)`     |
| hairline    | `rgba(255,255,255,0.04)`     |

### Chromatic palette — **RGB only**

**Light**
| token       | hex                          | use                                     |
|-------------|------------------------------|-----------------------------------------|
| blue        | `#2A6FF0`                    | primary accent / brand / FAB / links    |
| blueDeep    | `#1B4FBF`                    | FAB gradient bottom                     |
| blueBg      | `rgba(42,111,240,0.10)`      | blue tint background                    |
| blueGlow    | `rgba(42,111,240,0.45)`      | FAB & tab-dot glow                      |
| green       | `#0F8A53`                    | income / success / positive             |
| greenDeep   | `#0A6B40`                    | green gradient bottom                   |
| greenBg     | `rgba(15,138,83,0.10)`       | green tint background                   |
| greenGlow   | `rgba(15,138,83,0.45)`       | PAID pill, sparkline endpoint glow      |
| red         | `#C24628`                    | expense / alert / negative              |
| redDeep     | `#9B331C`                    | red gradient bottom                     |
| redBg       | `rgba(194,70,40,0.10)`       | red tint background                     |
| redGlow     | `rgba(194,70,40,0.45)`       | active "Pending" chip glow              |

**Dark**
| token       | hex                          |
|-------------|------------------------------|
| blue        | `#4D8BFF`                    |
| blueDeep    | `#2A6FF0`                    |
| blueBg      | `rgba(77,139,255,0.16)`      |
| blueGlow    | `rgba(77,139,255,0.55)`      |
| green       | `#30D27A`                    |
| greenDeep   | `#1FAA5E`                    |
| greenBg     | `rgba(48,210,122,0.16)`      |
| greenGlow   | `rgba(48,210,122,0.50)`      |
| red         | `#FF6B4A`                    |
| redDeep     | `#E04A2A`                    |
| redBg       | `rgba(255,107,74,0.16)`      |
| redGlow     | `rgba(255,107,74,0.50)`      |

Legacy aliases (still in code, point at the new tokens): `tint=blue`, `tintBg=blueBg`, `brand=blue`, `brandDeep=blueDeep`, `pos=green`, `posBg=greenBg`, `neg=red`, `negBg=redBg`. New code should use the explicit `blue/green/red` names.

### Workspace gradient tones
Decorative gradients used for project tiles, workspace pill avatar, account avatars. All within the RGB+neutral rule. Always include `inset 0 0.5px 0 rgba(255,255,255,0.4)` (and `inset 0 -1px 0 rgba(0,0,0,0.15)` on the larger avatars) for a top-edge highlight.

- **Filmpeak** (BLUE): `linear-gradient(135deg, #5B9BFF 0%, #1B4FBF 100%)`
- **Saffron** (RED, warm): `linear-gradient(135deg, #FF7A57 0%, #9B331C 100%)`
- **Greenline** (GREEN, eponymous): `linear-gradient(135deg, #4FD899 0%, #0A6B40 100%)`
- **Brand** (deep BLUE variant): `linear-gradient(135deg, #4D8BFF 0%, #0E2E78 100%)`
- **Personal** (NEUTRAL, greyscale): `linear-gradient(135deg, #C9C0AB 0%, #4A463F 100%)`

### Typography
**Inter** for all UI text. **JetBrains Mono** for numerals/references with `font-feature-settings: "tnum"`.
For SwiftUI: substitute Inter → SF Pro, JetBrains Mono → SF Mono. **Do not use any serif face.**

| element                     | family            | size  | weight | letter-spacing | line-height |
|-----------------------------|-------------------|-------|--------|----------------|-------------|
| Large title (nav)           | Inter             | 34    | 700    | -0.8           | 1.05        |
| Hero amount (dashboard)     | Inter             | 42    | 700    | -1             | 1           |
| Detail hero amount          | Inter             | 44    | 700    | -1.4           | 1           |
| Tile amount                 | Inter             | 22    | 700    | -0.3           | 1           |
| Row title                   | Inter             | 15    | 600    | -0.2           | normal      |
| Row meta                    | Inter             | 12    | 500    | normal         | normal      |
| Section header (eyebrow)    | Inter             | 11    | 600    | 1.2 + UPPER    | normal      |
| Filter chip / button label  | Inter             | 13    | 600    | normal         | normal      |
| Currency prefix (e.g. "RM") | Inter             | 55% of amount | 600 | normal     | normal      |
| Avatar monogram (28–56 px)  | Inter             | 15–22 | 700    | -0.5           | normal      |
| Mono numerals / refs        | JetBrains Mono    | varies| 500–600| 0.4            | normal      |

### Spacing, radii, shadows
- **Card radius**: 20px standard, 24–26px for hero cards
- **Card padding**: 16–22px
- **Card shadow (light)**: `0 1px 2px rgba(20,19,15,0.04), 0 8px 24px rgba(20,19,15,0.04)`
- **Card border (dark)**: `inset 0 0.5px 0 rgba(255,255,255,0.06)` (+ optional 0.5px hairline border)
- **Hairline separators**: `0.5px solid sep`

### Glow spec (rule 4)
Apply sparingly. Where used:

| Element                          | Glow                                    |
|----------------------------------|-----------------------------------------|
| FAB (tab bar center button)      | `0 0 0 8px blueBg, 0 18px 36px blueGlow` + multi-stop highlight stack |
| Active tab dot (below label)     | `0 0 8px blueGlow, 0 0 2px blue`        |
| `PAID` status pill (TxnRow)      | `0 0 12px greenGlow`                    |
| Active "Pending" filter chip     | `0 0 18px redGlow`                      |
| Sparkline endpoint (dashboard)   | Layered SVG circles: r=10 at 0.18 opacity + r=5 at 0.35 opacity + r=3.5 solid green |
| "Detected" parsed indicator (Add)| `box-shadow: 0 0 10px greenGlow` on the 6px dot |
| Detail hero icon halo            | Absolute 240×240 `radial-gradient(circle, greenBg 0%, transparent 70%)` behind the icon |

### Icon system
Custom 24×24 grid, **1.75px stroke**, rounded caps/joins, inherits `currentColor`. See `hifi/icons.jsx` for full SVG path data. Icon names: `home`, `projects`, `ledger`, `settings`, `arrowUpRight`, `arrowDownLeft`, `arrowDown`, `arrowDownTray`, `chevronRight`, `chevronDown`, `chevronLeft`, `plus`, `close`, `search`, `filter`, `edit`, `trash`, `share`, `paperclip`, `check`, `bolt`, `clock`, `calendar`, `currency`, `faceid`, `moon`, `bell`, `rocket`, `shield`, `globe`, `camera`, `image`, `flash`, `flashOff`, `bank`, `card`, `receipt`, `fingerprint`, `external`, `trendUp`, `trendDown`.

## Screens

### 01 · Dashboard
**Purpose**: User's home — see net profit, income/expenses, and recent activity at a glance for the active workspace.

**Layout (top → bottom)**:
1. **Workspace hero card** (radius 20, padding 22):
   - Header row: 28×28 gradient tile (workspace tone) + workspace name + spacer + page dots (3 dots, active is 14×6 pill ink, inactive 6×6 ink4).
   - Label: "Net Profit · this month" — 13/500, ink2.
   - Amount: `RM 7,130.62` rendered via `Money` (42px, tabular).
   - Delta pill: `↑ 12%` on `greenBg`, 12/700, plus "vs last month" 12/normal ink2.
   - **Sparkline**: 320×64 SVG, gradient fill `green @ 0.3 → 0`, line 2.2px green. Smooth cubic curve. Endpoint = layered glow dots (see glow spec).
   - **Range segmented** (1M/3M/YTD/1Y/Max): segmented control on `rgba(120,120,128,0.X)` tray, padding 2, radius 9. Active item: `surface2` background + cardShadow.
2. **In/Out tiles** (flex row, gap 10):
   - Each tile (flex 1, radius 20, padding 16): 20×20 rounded tint icon-square + label, then amount. Income tile uses `greenBg/green`; Expenses uses `redBg/red`.
3. **Recent section header**: "Recent" eyebrow + "See All" blue link.
4. **Recent list**: one rounded card containing 8 `TxnRow`s. **The list extends past the bottom of the viewport** — the tab bar overlays on top with `backdrop-filter: blur(40px) saturate(190%)`, so partial rows are visible behind the glass. The root container has `overflow: auto`, the list has `padding-bottom: ~120px`.

### 02 · Ledger
**Purpose**: Browse all transactions chronologically with quick filters.

**Layout**:
1. `LargeTitle` "Ledger" + trailing `ChromeButton` (download icon, blue).
2. **Search field**: full-width rounded pill on faint tint, search icon + "Search" placeholder.
3. **Filter chips** (horizontal scroll, gap 6): `Pending` (active — solid red background, white text, **red glow**) + `1M / 3M / YTD / 1Y / Custom` (default chips on faint tint).
4. **Groups**: each group = `SectionHeader` (e.g. "Today · 6 May") + rounded card containing `TxnRow`s. Three groups in the mock: Today (1), This week (2), April (2).

### 03 · Projects
**Purpose**: See projects, their state and P&L, expand for detail.

**Layout**:
1. `LargeTitle` "Projects" + trailing pill button "+ New" (filled blue background, white text, 13/600).
2. **Project cards** (3 cards, gap 10), each:
   - Header row (cursor pointer, toggles open state): 36×36 gradient tile with bold sans initial (white, 15/700) + name (15/600) + meta "Active · Net RM 771.62" (12/normal ink2, "RM ###" in green-700) + chevron-down (rotates 180° when open).
   - **Open state** (default: first project): padded body with three stat tiles (Income / Expenses / Net P&L) on faint tint background, then a "Transactions" eyebrow followed by 2 simple rows.

**Interaction**: tap header to expand/collapse. Only one open at a time (`open` state is the project id or null).

### 04 · Add Transaction (Scan-first)
**Purpose**: Primary add flow is the camera — scan a receipt and confirm parsed data.

**Always rendered dark** (camera UI). Background: `radial-gradient(120% 80% at 50% 40%, #2a241f 0%, #100c08 60%, #050403 100%)` (decorative neutral).

**Layout**:
1. **Top bar (over viewfinder)**: close button (36 circle, blurred dark bg) + "Scan Receipt" title 15/600 + flash button (**white icon**, neutral — no yellow).
2. **Viewfinder corners**: four 30×30 white L-brackets framing the receipt zone.
3. **Receipt card**: a tilted (-2°) cream paper rectangle in the middle of the viewfinder. Mono 10/lh1.7 in `#1a1816` on `#F5F1E6` (decorative paper neutrals — exempt from RGB rule).
4. **Parsed result card** (absolute, bottom 130, left/right 18):
   - Glass panel: `rgba(28,28,30,0.85)` + `backdrop-filter: blur(20px) saturate(180%)`, radius 20, padding 16, hairline border.
   - "● DETECTED" eyebrow in `green` color with a 6×6 green dot that has `0 0 10px greenGlow`.
   - Vendor name (17/600) + amount on right (22/700 in `red`, mono).
   - Chip row: `Hardware/Gear`, `Saffron Park`, `1 May 2026` (white-alpha pills).
   - Action row: "Edit" (flex 1, white-alpha) + "Save Transaction" (flex 2, **green background, black text**, 14/700).
5. **Shutter row** (absolute bottom 30): "Manual" label + shutter button (64 circle, 3px white border + inner white fill 4px inset) + "Album" label.

### 05 · Transaction Detail
**Purpose**: Drill into a single transaction, edit or delete.

**Layout**:
1. `LargeTitle` "Transaction" with leading back chevron `ChromeButton`, trailing share + edit `ChromeButton`s.
2. **Hero card** (radius 26, padding 26, centered):
   - **Halo**: absolute 240×240 radial gradient (`greenBg → transparent`) behind the icon.
   - Icon block: 60×60 rounded square with `greenBg → transparent` gradient, greenBg hairline border, `arrowDownLeft` icon 28px.
   - Eyebrow: "INCOME · CLIENT RETAINER" 13/500 ink2 uppercase.
   - Amount: `+RM 3,600.00` — 44/700 in `green`, tabular. "+RM" prefix 22/600 ink2.
   - Status pill: green capsule `✓ PAID · 6 MAY` 11/700.
3. **Detail list** (single card, 7 rows separated by hairlines, 14/18 padding):
   - Date — `Tue, 6 May 2026 · 11:32`
   - Project — `Saffron Park Residences` (blue, with 16×16 gradient tile)
   - Client — `Saffron LLC` (blue)
   - Method — `Bank transfer · MBB ••24` (with bank icon)
   - Reference — `INV-2026-018` (mono, ink2)
   - Receipt — `retainer-may.pdf · 84 KB` (blue, paperclip icon)
   - Notes — `May milestone — VFX pass approved.` (wrap to next line)
4. **Tag row**: `#retainer  #recurring  #q2-revenue` — mono 12/500, ink2 on surface, hairline border.
5. **Action row**:
   - Edit (flex 1, ink button, inverse text, edit icon)
   - Delete (flex 1, surface + sep border, **red text**, trash icon)

### 06 · Settings
**Purpose**: Account switcher + preferences + automation + data/privacy.

**Layout**:
1. `LargeTitle` "Settings" + trailing search `ChromeButton`.
2. **Account hero card** (radius 24, padding 20):
   - Avatar (56×56 rounded 18, gradient, **bold Inter** initial 22px, white) + name (17/700) + meta (12/normal ink2) + "Manage" pill.
   - Divider hairline.
   - "← swipe to switch →" mono 10/uppercase ink2 + page dots (3 dots; active 16×6, inactive 6×6).
   - **Tap dots to switch** account. Demo accounts: Filmpeak Studio / Saffron LLC / Personal.
3. **Preferences** (5 rows, each: 30×30 colored icon-square + label flex + value ink2 + chevron OR toggle). Icon tones use only `green/blue/ink` per rule 1:
   - Base currency → `RM (MYR)` (icon `currency`, tone **green**)
   - Face ID → toggle ON (icon `faceid`, tone **green**)
   - Appearance → `Auto` (icon `moon`, tone **ink**)
   - Notifications → `3 enabled` (icon `bell`, tone **blue**)
   - Default on launch → `<current account name>` (icon `rocket`, tone **blue**)
4. **Automation** (3 rows):
   - Recurring entries → `2 active` (icon `calendar`, tone **blue**)
   - Smart scan → toggle ON (icon `bolt`, tone **green**)
   - Bank sync → `2 banks` (icon `bank`, tone **green**)
5. **Data & privacy** (3 rows):
   - Privacy & security (icon `shield`, tone **ink**)
   - Export · CSV / PDF (icon `arrowDownTray`, tone **ink2**)
   - Connect accountant — label in blue (icon `external`, tone **green**)
6. **Version footer**: `Fince · v2.4.1 · Build 8842` — mono 11/normal ink3, centered.

### 07 · Recurring · list
**Purpose**: See all recurring entries (auto income + expenses), their next-due date, and the net impact for the current month. Reached from Settings → Recurring entries.

**Layout**:
1. `LargeTitle` "Recurring" with leading `‹ Settings` back-link (blue) and trailing `+ New` pill button (blue, with `0 0 18px blueGlow`).
2. **Net-impact hero card** (radius 22, padding 20):
   - Eyebrow row: 6×6 green dot with double glow (`0 0 0 3px greenBg, 0 0 10px greenGlow`) + "NET IMPACT · THIS MONTH" 12/600 ink2 uppercase letter-spaced.
   - Hero amount: `+RM 1,111.00` rendered via `Money` (36px, **green**, tabular).
   - Split tiles (Income / Expenses), gap 10:
     - Income tile: `greenBg` background, radius 14, padding 12. Tiny 16×16 green icon-square with `arrowDownLeft` + "Income" label (11/600 ink2). Amount `RM +3,600` in green 17/700. "1 entry" mono 10/normal ink3.
     - Expenses tile: `redBg` background, same structure. `arrowUpRight` icon. Amount `RM −2,489` in red. "2 entries".
3. **Active list section header**: `Active` eyebrow + mono `3 ACTIVE` trailing.
4. **List card** (single card, hairline-separated rows, 14/16 padding):
   - Each row: 40×40 gradient avatar (workspace tone) with **icon** (not initial) + small recurring-loop badge overlaid bottom-right (-3/-3, 18×18 white circle with 2px white border + 0.5px sep ring, hand-drawn refresh-loop SVG glyph 9×9 in ink2).
   - Middle column: name (15/600 -0.2) + meta `Software · Monthly · next in 4 days` (12/normal ink2; the `in 4 days` token in ink + 600).
   - Right column: amount `−89.00` (15/700 ink for expense or green for income, tabular) + AUTO chip below (mono 9/700, faint tint background, with a 4×4 green pulsing dot using `box-shadow: 0 0 4px greenGlow`).
5. Tab bar floats over the list (settings active), same iOS 26 Liquid Glass as everywhere.

**Demo data**:
- Adobe Creative Cloud · Software · Monthly · next in 4 days · −RM 89.00 · brand-tone avatar · `card` icon
- Studio Rent · Overhead · Monthly · next in 12 days · −RM 2,400.00 · personal-tone avatar · `bank` icon
- Saffron Retainer · Income · Monthly · next in 26 days · +RM 3,600.00 · greenline-tone avatar · `receipt` icon

### 08 · New recurring · entry form
**Purpose**: Create a new recurring entry. Modal sheet with amount-hero + form rows.

**Layout** (no tab bar; this is a modal sheet):
1. **Sheet nav bar**: `Cancel` (left, blue 15/500) + `New Recurring` (center, 16/700) + `Save` (right, blue 15/700 with `text-shadow: 0 0 12px blueGlow`).
2. **Amount hero card** (radius 20, padding 20, centered, position relative with overflow hidden for halo):
   - **Halo**: absolute 240×240 radial gradient (`blueBg → transparent`) positioned at `top: -80, left 50% → translate(-50%, 0)`.
   - "AMOUNT" eyebrow 11/600 ink2 letter-spaced.
   - Inline amount row centered: `RM` (20/600 ink2) + `0` (48/700 ink, -1.4 letter-spacing, tabular) + `.00` (24/600 ink3) + **blinking caret** (2×36 blue, `0 0 8px blueGlow`, CSS animation `finceCaret 1s infinite` flipping opacity at 50%).
   - EXPENSE / INCOME segmented control (padding 2, radius 10, surface2 tray): EXPENSE tab active with red text on surface; INCOME tab inactive ink2.
3. **Form rows** (gap 10, each row uses `Field` primitive):
   - **Row 1**: Title (placeholder "e.g. Adobe") | Category (placeholder "Software", chevron right trailing) — 50/50 grid.
   - **Row 2**: Vendor / Client full-width (placeholder "e.g. Adobe Systems").
   - **Row 3 — Repeat segmented**: 4-column grid (Weekly / Monthly / Quarterly / Yearly), Monthly active. Tray is `rgba(255,255,255,0.06)` dark / `rgba(20,19,15,0.05)` light, radius 11, padding 3. Active item: `surface` background + cardShadow, radius 9, padding 8/0.
   - **Row 4**: Start date (value "6 May 2026", **calendar icon blue trailing**) | End date (placeholder "Never", chevron right) — 50/50 grid.
4. **Toggle row — Reminder** (card, radius 14, padding 14, flex row gap 12):
   - 34×34 rounded-square 10 with **blue** background + bell icon white, shadow `inset 0 0.5px 0 rgba(255,255,255,0.4), 0 0 14px blueGlow`.
   - Label: "Remind me 1 day before" (14/600) + meta "Push notification" (12/normal ink2).
   - iOS-style toggle: 50×30 capsule **green** with `0 0 10px greenGlow`, 26×26 white thumb pushed right, drop-shadow on thumb.
5. **Toggle row — Auto-log** (card, same shape):
   - Green icon square with `bolt` icon white (no extra glow on this one).
   - Label: "Auto-log on due date" + meta "Creates a transaction automatically".
   - Toggle in OFF state (grey track, thumb left).
6. **Sticky save button** at bottom (padding 20/18/8):
   - Full-width blue button, radius 16, padding 16, 15/700 white text + check icon, shadow `0 0 24px blueGlow, inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.2)`.

**`Field` primitive spec**:
- Label: 11/600 ink2 letter-spaced 0.6 UPPER, margin-bottom 6.
- Input cell: surface background, radius 14, padding 11/13, min-height 24, 0.5px border (sep/hairline based on mode), cardShadow.
- Value: 14/(600 if filled / 400 if placeholder), color ink/ink3, tabular numerals on. Optional mono prop for refs.
- Trailing slot: takes either a string (right-aligned ink3 14) or any node (used for icon trailing).

**Animations**: caret blink only. Form interactions otherwise rely on platform default.

### 06 · Settings (placeholder anchor)

## Tab bar component — iOS 26 Liquid Glass

*(Recurring list uses the tab bar with `active="settings"`. New recurring is a modal sheet — no tab bar.)*

Floating glass capsule. `bottom: 18`, `left: 14`, `right: 14`. Height 66, radius 33.

**Background** (highly transparent, blur does the work):
- Light: `linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.20) 60%, rgba(255,255,255,0.35) 100%), rgba(255,255,255,0.18)`
- Dark:  `linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.01) 60%, rgba(255,255,255,0.04) 100%), rgba(22,22,24,0.18)`

**Blur**: `backdrop-filter: blur(40px) saturate(190%)` (iOS 26 Liquid Glass level).

**Border + refraction (all via box-shadow inset)**:
```
inset 0 0 0 0.5px <ring>,     /* crisp outer ring */
inset 0 0 0 1.5px <ringLo>,    /* second ring offset */
inset 0 1.5px 0 <innerHi>,     /* top refraction highlight */
inset 0 -1.5px 0 <innerLo>,    /* bottom refraction shadow */
0 18px 40px rgba(0,0,0,0.45 dark / 0.10 light),
0 4px 10px rgba(0,0,0,0.35 dark / 0.04 light)
```
Where:
- light: `ring=rgba(255,255,255,0.85)`, `ringLo=rgba(20,19,15,0.08)`, `innerHi=rgba(255,255,255,1)`, `innerLo=rgba(20,19,15,0.05)`
- dark: `ring=rgba(255,255,255,0.16)`, `ringLo=rgba(0,0,0,0.55)`, `innerHi=rgba(255,255,255,0.30)`, `innerLo=rgba(0,0,0,0.40)`

**Layout**: 5 slots — Home / Projects / [FAB slot] / Ledger / Settings.
- Tabs: icon 22 (stroke 2 active, 1.7 inactive) + label 10/600 letter-spacing 0.1, color ink active / ink2 inactive. Active tab gets a 5×5 **blue dot** beneath the label with `box-shadow: 0 0 8px blueGlow, 0 0 2px blue`.
- **FAB**: 60×60 circle, sits at `top: -28` of the capsule (lifted above), `radial-gradient(circle at 35% 30%, blue 0%, blueDeep 100%)`, plus icon 26/2.4 white. Shadow stack:
  - `0 0 0 8px blueBg` (outer glow ring)
  - `0 18px 36px blueGlow` (deep cast)
  - `0 4px 10px rgba(0,0,0,0.28)`
  - inset highlight 1.5px white 0.55, inset shadow 1.5px black 0.22, inset 0.5px white 0.30 ring

**SwiftUI equivalents**: `.background(.ultraThinMaterial, in: Capsule())` is the closest baseline — but you'll need to add the multi-stop inset highlights manually (overlay capsules with `.strokeBorder` and gradients) to match the refraction look.

## Interactions

| Interaction                            | Spec                                                                          |
|----------------------------------------|-------------------------------------------------------------------------------|
| Tab tap                                | Switch screen, no transition spec (use platform default).                     |
| FAB tap                                | Push Add (scan) modal from bottom.                                            |
| Dashboard workspace pill / dots        | Switch active workspace; updates hero card content (Filmpeak/Saffron/Personal).|
| Range segmented (1M/3M/...)            | Filter chart range. Active item gets `surface2` + shadow.                     |
| Ledger filter chips                    | Filter list. "Pending" is the default-active; others toggle on tap.           |
| Project card tap                       | Toggle open/closed. Only one open at a time. Chevron rotates 180° smoothly.   |
| Settings account dot tap               | Switch active account; hero card content updates; "Default on launch" row updates.|
| Detail back chevron                    | Pop back to Ledger.                                                           |
| Detail Edit / Delete                   | Push edit screen / show confirm dialog.                                       |
| Add close (×)                          | Dismiss to previous screen.                                                   |
| Add shutter                            | Capture; show parsed-result card.                                             |
| Add Save Transaction                   | Persist, dismiss to Ledger with new row.                                      |
| Recurring entry tap                    | Push edit / detail view.                                                      |
| Recurring `+ New` tap                  | Present New Recurring sheet (screen 08).                                       |
| New Recurring Cancel                   | Dismiss sheet without saving.                                                 |
| New Recurring Save                     | Validate, persist, dismiss to Recurring list with new row inserted.            |
| New Recurring EXPENSE/INCOME segmented | Toggle entry kind; affects amount color and the icon-tile color downstream.   |
| New Recurring Repeat segmented         | Choose Weekly/Monthly/Quarterly/Yearly.                                       |
| New Recurring date fields              | Open date picker.                                                              |
| New Recurring Reminder toggle          | Schedule local notification 1 day before due.                                 |
| New Recurring Auto-log toggle          | Auto-create a Transaction on due-date (otherwise prompt the user).            |

## State

| Screen     | State                                                                |
|------------|----------------------------------------------------------------------|
| Dashboard  | active workspace (id), chart range (1M/3M/YTD/1Y/Max)                |
| Ledger     | active filter chip, search query                                     |
| Projects   | open project id (only one open at a time)                            |
| Add        | scan mode, parsed result                                              |
| Detail     | navigation context (which transaction)                               |
| Settings   | active account index                                                  |
| Recurring  | (read-only list; route param for the back-link target)                |
| New Recurring | { kind: 'expense'|'income', amount, title, category, vendor, repeat, startDate, endDate, remind: bool, autoLog: bool } |

## Data model (sketch)

```ts
type Money = { amountMinor: number; currency: 'MYR' | 'USD'; };
type Transaction = {
  id: string;
  kind: 'income' | 'expense';
  amount: Money;
  vendorOrClient: string;
  date: ISODate;
  projectId?: string;
  reference?: string;
  method?: string;             // "Bank transfer · MBB ••24"
  receiptUrl?: string;
  notes?: string;
  tags: string[];              // ["retainer","recurring"]
  status?: 'PAID' | 'PENDING';
};
type Project = {
  id: string; name: string; client: string;
  state: 'active' | 'wrapped';
  income: Money; expenses: Money;
  toneId: 'filmpeak' | 'saffron' | 'greenline' | 'brand' | 'personal';
  initial: string;
};
type Recurring = {
  id: string;
  kind: 'income' | 'expense';
  amount: Money;
  title: string;                  // "Adobe Creative Cloud"
  category: string;               // "Software" | "Overhead" | "Income" | ...
  vendor?: string;                // "Adobe Systems"
  repeat: 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  startDate: ISODate;
  endDate?: ISODate;
  nextDueDate: ISODate;            // computed
  remind: boolean;                 // 1 day before
  autoLog: boolean;                // auto-create Transaction on due date
  toneId: 'filmpeak'|'saffron'|'greenline'|'brand'|'personal';
  iconName: keyof IconSet;
};

type Workspace = {
  id: string; name: string;
  toneId: 'filmpeak' | 'saffron' | 'greenline' | 'brand' | 'personal';
  initial: string;
  type: 'business' | 'personal';
};
```

## Notes & gotchas
- **RGB-only rule** is hard. Audit at the end — no orange / yellow / purple / pink / cyan / magenta hex codes anywhere except in decorative gradients explicitly approved (workspace tones), the receipt paper, and the camera-bg radial.
- **Tabular numerals matter.** Every amount uses `font-feature-settings: "tnum"` so digits align. In SwiftUI: `.monospacedDigit()`.
- **Glass tab bar** depends on `backdrop-filter` (CSS) or `.background(.ultraThinMaterial)` (SwiftUI). The Dashboard's recent list **must scroll beneath it** — content shouldn't pad-clear the tab bar entirely; partial rows should remain visible at the bottom.
- The **minus glyph** in amounts is `−` (U+2212), not a hyphen.
- The **delta arrows** in chips are SVG `trendUp` / `trendDown`, not Unicode arrows.
- Hairlines are `0.5px` — important for that iOS-native feel.
- Avatars use **bold Inter** (700, letter-spacing -0.5), not a serif. No italic.
- The hero "halo" on Detail and the FAB shadow stack are doing a lot of the premium-feel work — don't simplify them.
