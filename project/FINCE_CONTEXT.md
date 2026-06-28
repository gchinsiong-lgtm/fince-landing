# Fince — Website Content & Context Brief

> Handoff for building the **LHDN Tax Roadmap / Guide** — the reward users receive for joining the Fince waitlist. Use this to match brand, voice, design, and factual framing so the guide feels native to the product.

---

## 1. What Fince is

- **Product:** AI bookkeeping iPhone app for **Malaysian freelancers and solo founders**.
- **Core promise:** *Snap a receipt. Books done.* The app reads receipts, posts every ringgit under the right **LHDN-mapped category**, and keeps books **tax-ready all year round** — so filing season is an *export*, not a project.
- **Stage:** Pre-launch. Two funnels:
  - **Waitlist** — notified when the app hits the App Store (general audience).
  - **TestFlight beta** — 100 founding-tester seats, separate commitment (needs an iPhone).
- **Platform:** iPhone-first. Free during early access.
- **Compliance posture:** Fince keeps the books tidy — **it is not tax advice.** Every tax-facing surface carries this disclaimer. The roadmap/guide should keep the same "educational, not advice" tone and link users to LHDN / a tax agent for anything binding.

## 2. Audience & voice

- **Who:** Malaysian freelancers, contractors, solo founders, creators, small-studio owners. Often filing under their own name / sole-prop; some newly registered. Tax-anxious, time-poor, not accountants.
- **Voice:** Calm, plain-spoken, confident, a little warm. Short sentences. Malaysian-grounded specifics (Grab, ZUS, Maxis, Unifi, LHDN, ringgit, "April"). No jargon dumps, no hype, no emoji in body copy (icons instead). Signed off as **"Gene, Fince"** in emails.
- **Headline cadence:** two short clauses — *"Snap a receipt. Books done." / "Sort your tax with a swipe." / "Filing season becomes an export."*

## 3. Existing on-site copy (reuse the framing, don't contradict it)

**Hero:** "AI bookkeeping for freelancers" → *Snap a receipt. Books done.* → "Fince reads your receipts, posts every ringgit under the right LHDN-mapped category, and keeps your books tax-ready — automatically."

**LHDN proof section ("Tax-ready / Filing season becomes an export"):**
- Categories mapped to LHDN expense groups
- Entries land filing-ready, all year round
- One clean export — for you or your tax agent
- Disclaimer: "Fince keeps the books tidy. It isn't tax advice."

**Expense categories shown (LHDN-mapped):** Meals & Entertainment (client lunches, ZUS runs) · Travel & Transport (Grab, parking, tolls) · Office & Equipment (gear, software, supplies) · Phone & Internet (Maxis, Unifi) · Marketing (ads, portfolio site).

**Tax Inbox (swipe demo) — deduction/relief logic already presented to users.** Keep the guide consistent with these treatments:

| Item | Type | Treatment shown |
|---|---|---|
| Adobe CC, Canva Pro | Business · Software | 100% deductible |
| Apple Magic Keyboard | Business · Equipment | 100% deductible |
| Grab (work travel) | Business · Travel | 100% deductible |
| Starbucks (client meeting) | Business · Client meeting | 50% deductible |
| Maxis Fibre | Business · Phone & Internet | 50% deductible |
| Guardian Pharmacy | Personal relief · Health | Serious disease treatment relief |
| BookXcess | Personal relief · Lifestyle | Lifestyle — books, devices, net |
| Decathlon | Personal relief · Sports | Sports equipment & activities relief |

> Two worlds the product already distinguishes: **business expenses** (deductible against income) vs **personal reliefs** (claimed on the individual return). A good roadmap should make this split obvious.

## 4. Design tokens (match exactly)

```
Cream    #F4F2EC   (page bg)        Cream-2 #ECE9E0   Cream-3 #E4E0D4
Surface  #FFFFFF
Ink      #14130F   Ink-2 rgba(20,19,15,.60)   Ink-3 rgba(20,19,15,.38)
Line     rgba(20,19,15,.10)   Hair rgba(20,19,15,.07)
Forest   #16463A   Forest-2 #0F3329   (dark hero bands)
Green    #0F8A53   Green-2 #12A463    Green-bg rgba(15,138,83,.10)
Mint     #4FD899   Check #2BC57E
Red      #C24628   Red-bg rgba(194,70,40,.10)
Blue accent (deductible 50% / info): #2A6FF0
Font: Inter (self-hosted, weights 100–900). Mono: ui-monospace / SF Mono.
Radius ~16px cards. Shadow: 0 1px 2px rgba(20,19,15,.04), 0 10px 30px rgba(20,19,15,.05)
```

**Color semantics already in use:** green = income / 100% deductible / positive; blue = partial-deductible / informational; red = expense / alert; forest = dark hero bands; mint = eyebrow/accent on dark. Keep these meanings.

**Layout pattern:** light cream body, occasional **dark forest hero bands** (`#16463A`→`#0F3329`) with a **mint eyebrow** label above a two-clause headline. Cards are white on cream, rounded, soft shadow. Icons (line, 1.75 stroke, rounded) — **never emoji** in body.

## 5. Tech & repo

- **Repo:** `gchinsiong-lgtm/fince-landing`, site files under `project/`. Static HTML/CSS/JS, no framework. Main page is the single file `project/index.html`. Deployed on **Vercel** (zero-config).
- **Content pages:** `about.html`, `blog.html`, `contact.html` (full-screen dark forest "coming soon" heroes), `privacy.html`, `terms.html` (dark title band + light legal body; min age **13** with parent/guardian consent).
- **Backend:** `project/api/waitlist.js` — Vercel serverless. Stores signups in **Supabase** (`waitlist` table, one row per email; beta info as extra columns), sends confirmation + team-notification email via **Nodemailer / Gmail SMTP** (`waitlist@fince.my`). Tier-aware (`waitlist` vs `beta`).
- **Brand asset:** `project/brand/fince-logo-black.svg` (vector lockup: leaf mark + "Fince" in Inter 800). Cream logo mark: `logo-mark-cream.png`.
- **Git:** branch → push → `git merge --ff-only` to main. Do **not** put the model identifier in commits. Commit footer uses the session URL.

## 6. The reward to build — LHDN Tax Roadmap / Guide

**Purpose:** a genuinely useful guide gifted to people who join the waitlist (likely a confirmation-email link and/or a gated page on the site). It should reinforce Fince's core claim — *we already understand how LHDN expects your money grouped* — and build trust before launch.

**Fit notes for whoever builds it:**
- Keep it **educational, not tax advice**; mirror the on-site disclaimer and point to LHDN / a tax agent for anything binding.
- Audience is a Malaysian freelancer/sole-prop, not a company. Frame around **individual / sole-prop filing** (e.g. Form B / business income), the **business-expense vs personal-relief** split, and the year-round "tag as you go, export in April" workflow Fince sells.
- Reuse the exact deduction/relief examples and categories above so the guide and app speak the same language.
- Match the visual system in §4 — Inter, cream/forest/green palette, mint eyebrows, line icons, two-clause headings, no emoji.
- **Verify all figures, relief names, and percentages against current LHDN guidance** (relief amounts and rules change yearly — the YA on the site copy was illustrative). Do not ship hard numbers without checking the latest LHDN tables.
- Likely deliverable formats to consider: a styled `roadmap.html` page on the site (cream/forest, matches index.html) and/or a downloadable PDF. Confirm with the user which.

**Open questions to confirm with the user before building:**
1. Delivery — gated web page, emailed PDF, or both?
2. Scope/YA — which assessment year, and how deep (quick-start checklist vs full walkthrough)?
3. Should it be Fince-branded marketing or a neutral, genuinely-useful reference?
