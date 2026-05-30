# Handoff: Fince — Sign In (Dark)

## Overview
This is the **sign-in / login screen** for the Fince mobile app (iOS), in the **dark** theme. It's a single full-screen view: brand mark + welcome heading, email & password fields, "Forgot password?", a primary **Sign in** button, a **Use Face ID** affordance, an "OR CONTINUE WITH" divider, **Apple** and **Google** social sign-in buttons, and a footer "Create account" link.

## About the Design Files
The files in this bundle are **design references created in HTML/React (JSX)** — a prototype showing the intended look and behavior, not production code to copy directly. The task is to **recreate this design in the target codebase's existing environment** (e.g. SwiftUI for native iOS, or React Native / React, etc.) using its established components, patterns, and libraries. If no environment exists yet, pick the most appropriate framework for the project and implement there.

The prototype renders inside a simulated iPhone frame (390 × 844 pt). Ignore the device bezel, status bar, home indicator, and the surrounding design-canvas chrome — those are presentation scaffolding, not part of the screen.

## Fidelity
**High-fidelity (hifi).** Colors, typography, spacing, radii, and shadows are final and exact (values below). Recreate pixel-faithfully using the codebase's existing UI primitives. The one exception: field contents ("hello@fince.app", masked password) are placeholder demo values, not real defaults.

## Screen: Sign In (dark)

**Canvas:** 390 pt wide (iPhone). Full-height, dark background. Layout is a single vertical flex column, scrollable if it overflows.

**Background:** vertical linear gradient, top→bottom: `#0C0E0D → #070908`.

**Outer padding:** 44px top, 28px left/right, 24px bottom (`padding: 44px 28px 24px`).

### Layout (top → bottom)

1. **Brand header** (centered column, `margin-bottom: 30px`)
   - Logo mark (cream version), height **56px**, `margin-bottom: 22px`. See Assets.
   - Heading "**Welcome back**" — 28px / weight 700 / letter-spacing −0.6px / color `#F4F2EC`.
   - Subtitle "**Sign in to continue to Fince**" — 14.5px / weight 400 / color `rgba(244,242,236,0.58)` / `margin-top: 6px`.

2. **Email field** (see Field spec). Label "Email". Leading mail icon. Demo value `hello@fince.app`.

3. **Password field** (see Field spec). Label "Password". Leading lock icon, trailing eye (show/hide) icon. Value rendered as bullets `•` with `letter-spacing: 3px`.

4. **Forgot password?** — right-aligned row, `margin-top: -4px; margin-bottom: 18px`. Text 13.5px / weight 600 / color = accent `#2FA98A`.

5. **Sign in button** (primary)
   - Height **54px**, border-radius **14px** (default; tweakable 8–22).
   - Background: **solid** `#F4F2EC` (cream — NO gradient in dark theme).
   - Text + arrow color: `#0C1A15` (near-black green). Label "Sign in", 16.5px / weight 700 / letter-spacing 0.1px, with a trailing arrow icon (→) 18px.
   - Shadow: `0 10px 26px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.55)`.
   - `gap: 8px` between label and arrow, contents centered.

6. **Use Face ID** — centered row, `margin-top: 14px`, `gap: 8px`. Face-ID glyph (20px, stroke = accent `#2FA98A`) + text "Use Face ID" 13.5px / weight 600 / color `rgba(244,242,236,0.58)`.

7. **Divider** — `margin: 20px 0 16px`. Two 1px horizontal rules (`rgba(244,242,236,0.12)`) flanking the label "**OR CONTINUE WITH**" 12px / weight 600 / color `rgba(244,242,236,0.30)` / letter-spacing 0.4px. `gap: 12px`.

8. **Social buttons row** — two equal-width buttons, `gap: 10px`.
   - Each: `flex: 1`, height **50px**, border-radius 14px, background `rgba(244,242,236,0.06)`, border `1.5px solid rgba(244,242,236,0.14)`, contents centered with `gap: 9px`, label 14.5px / weight 600 / color `#F4F2EC`.
   - Left: Apple glyph (cream `#F4F2EC`) + "Apple". Right: Google glyph (full-color multi-path) + "Google".

9. **Footer** — centered, `margin-top: 22px`, 14px / color `rgba(244,242,236,0.58)`: "New to Fince?" followed by "**Create account**" in accent `#2FA98A` weight 700.

### Field spec (shared by Email & Password)
- Wrapper `margin-bottom: 14px`.
- Label above field: 12.5px / weight 600 / color `rgba(244,242,236,0.58)` / letter-spacing 0.1px / `margin-bottom: 7px`.
- Input row: flex, `align-items: center`, `gap: 10px`, height **52px**, padding `0 14px`, border-radius **14px**.
  - Background: `rgba(244,242,236,0.06)`.
  - Border: `1.5px solid` — default `rgba(244,242,236,0.12)`; **focused** `#34D399` (mint).
  - Focused state also adds a focus ring: `box-shadow: 0 0 0 4px rgba(52,211,153,0.12)` (the accent at ~12% alpha) and shows a blinking 1.5px caret (height 22px, mint, 1s steps blink).
  - Leading icon: 19px line icon, stroke `rgba(244,242,236,0.30)`.
  - Value text: 16px, color `#F4F2EC` when filled (weight 500), placeholder `rgba(244,242,236,0.30)` (weight 400).
  - Password masked as `•` per character at `letter-spacing: 3px`.
  - Trailing (password only): eye icon, 20px, stroke `rgba(244,242,236,0.30)`.

## Interactions & Behavior
- **Field focus**: focused field gets mint border (`#34D399`), 4px mint focus ring, and a blinking caret. Only one field focused at a time. (Prototype shows email focused by default.)
- **Show/hide password**: trailing eye icon toggles password visibility (mask ↔ plaintext). Not wired in the prototype — implement the toggle.
- **Sign in**: submit credentials. Add pressed/disabled/loading states per the codebase's button conventions (prototype shows resting state only).
- **Use Face ID**: trigger biometric auth (LocalAuthentication / platform biometric API).
- **Forgot password?**: navigate to password-reset flow.
- **Apple / Google**: launch the respective OAuth / Sign in with Apple flow.
- **Create account**: navigate to sign-up.
- **Scroll**: content column scrolls if it exceeds viewport height (small devices / keyboard open).
- **Transitions**: border-color transitions `0.15s` on focus. Caret blink: 1s `steps(1)` infinite.

## State Management
- `email: string`, `password: string`
- `focusedField: 'email' | 'password' | null`
- `passwordVisible: boolean`
- `isSubmitting: boolean` + error state for failed sign-in
- Triggers: field focus/blur, eye toggle, submit, biometric result, OAuth callbacks.

## Design Tokens (dark theme)
**Colors**
- Background gradient: `#0C0E0D` → `#070908`
- Primary text (ink): `#F4F2EC`
- Secondary text (ink2): `rgba(244,242,236,0.58)`
- Tertiary text / placeholders (ink3): `rgba(244,242,236,0.30)`
- Accent (links, Face ID glyph, focus ring base): `#2FA98A`
- Field focus border / caret: `#34D399`
- Field background: `rgba(244,242,236,0.06)`
- Field border: `rgba(244,242,236,0.12)`
- Separator: `rgba(244,242,236,0.12)`
- Primary button bg: `#F4F2EC` (solid); button text/icon: `#0C1A15`
- Social button bg: `rgba(244,242,236,0.06)`; border: `rgba(244,242,236,0.14)`
- Brand green (logo): `#143E37`

**Typography** — font family **Inter** (fallbacks: `-apple-system, "SF Pro Display", system-ui, sans-serif`)
- Heading: 28 / 700 / −0.6px
- Subtitle: 14.5 / 400
- Field label: 12.5 / 600 / 0.1px
- Field value: 16 / 500
- Button: 16.5 / 700 / 0.1px
- Links (Forgot / Create account): 13.5–14 / 600–700
- Divider label: 12 / 600 / 0.4px
- Face ID / social: 13.5–14.5 / 600

**Spacing** (px): outer 44/28/24; field gap 14; section gaps 18–30; icon/label gaps 8–12.

**Radii**: fields, buttons, social = 14px (tweakable 8–22). Logo focus ring 4px spread.

**Shadows**
- Primary button: `0 10px 26px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.55)`
- Field focus ring: `0 0 0 4px rgba(52,211,153,0.12)`

**Icons** — all custom inline SVG on a 24×24 grid, 1.8 stroke, rounded caps/joins, `currentColor`:
mail, lock, eye, arrow-right, Face-ID frame. Apple glyph = filled path. Google glyph = 4-path full-color logo (`#4285F4 / #34A853 / #FBBC05 / #EA4335`). Reuse your codebase's icon set if equivalents exist; SVG paths are in `login.jsx`.

## Assets
- `brand/logo-mark-cream.png` — the Fince leaf-"F" mark in cream `#F4F2EC` on transparent, used in the dark header (rendered at 56px tall). Source: derived from the user's supplied logo.
- `brand/logo-mark-green.png` — same mark in brand green `#143E37` (for light backgrounds; included for reference).
Use vector/SF Symbol equivalents in production if available; otherwise these PNGs are provided.

## Files
- `login.jsx` — the `FinceLogin` React component. The `dark` entry in the `LOGIN_THEME` object holds every dark-theme token; the centered layout (used by `light`/`dark`) is the relevant one. Ignore the `forest` and `light` branches for this handoff.
- `Fince Login.html` — host page that mounts the component in an iPhone frame with a Tweaks panel (theme/radius/focused-field). For reference only.
- `brand/logo-mark-cream.png`, `brand/logo-mark-green.png` — logo assets.
- `screenshots/` — (only if included) rendered reference image of the dark screen.

> Note: the prototype's `light` and `forest` themes are alternate brand treatments. This handoff targets **dark** only; the other themes are present in `login.jsx` purely because they share the component.
