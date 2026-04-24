# Noir Studio — Functional Website Spec
**Date:** 2026-04-23
**Project:** `/Users/jansenng/Desktop/website-builder/studio/`

## Context
The visual design (React + Vite + Tailwind v4 + motion/react + hls.js) is complete and live at `http://localhost:5173`. This spec covers making it a fully functional, content-complete static website — real agency identity, working lead capture, portfolio and pricing sections, and wired navigation.

---

## Agency Identity

**Name:** Noir Studio
**Tagline:** "Design for the top 1%."
**Positioning:** Ultra-premium AI-powered web design agency. Clients are Series A+ startups, established brands, and ambitious founders who understand that design is revenue.

### Services
1. **Web Design** — Full-site design from wireframes to launch in 5 days
2. **AI Optimization** — Continuous click/scroll/conversion monitoring, real-time improvements
3. **Brand Systems** — Visual identity, motion design, and complete design language
4. **CRO Engineering** — Conversion rate optimization backed by live data

### Case Studies (fabricated but believable)
| Client | Industry | Result |
|--------|----------|--------|
| Finlytic | Fintech SaaS | +180% trial conversions after redesign |
| Wealthr | Wealth management | 4x user retention, 2.1s load time |
| Apex Ventures | VC firm | Brand perception score 91 → 99 |

### Pricing Tiers
| Tier | Price | Scope |
|------|-------|-------|
| Launch | $5,900 | 1 landing page, 2-week delivery, 1 revision round |
| Studio | $14,900 | Up to 8 pages, 4-week delivery, 3 revision rounds + CRO audit |
| Enterprise | Custom | Multi-property, ongoing AI optimization, dedicated team |

---

## Features

### 1. Smooth-Scroll Navigation
- Every `<section>` gets an `id`: `hero`, `services`, `work`, `process`, `pricing`
- Existing sections map: Hero→`#hero`, FeaturesChess+Grid→`#services`, StartSection→`#process`, new portfolio→`#work`, new pricing→`#pricing`
- Navbar links use `href="#section-id"` with `scroll-behavior: smooth` on `html`
- Active section highlight: `IntersectionObserver` tracks which section is in view, applies `text-white` (vs `text-white/60`) to the matching nav link

### 2. Portfolio Section (`#work`)
- Positioned after FeaturesGrid, before Stats
- Header: "Work" badge + "The work speaks for itself." heading
- 3 case study cards in a responsive grid (`md:grid-cols-3`), each `liquid-glass rounded-2xl overflow-hidden`:
  - **Image area** (top, ~200px tall): gradient placeholder with client name watermark + tag (e.g. "Fintech")
  - **Content** (bottom, p-6): client name, one-line result metric, short description (2 sentences)
  - **Hover state**: card lifts (`translateY(-4px)`), border brightens via `motion.div` with `whileHover`
- No real images needed — styled gradient placeholders with client color palette

### 3. Pricing Section (`#pricing`)
- Positioned after Testimonials, before CtaFooter
- Header: "Pricing" badge + "Transparent. No surprises." heading
- 3 cards in `md:grid-cols-3 gap-6`. Middle card ("Studio") is highlighted with `liquid-glass-strong` + white border
- Each card contains: tier name, price, tagline, feature list (5–6 bullets with checkmarks), CTA button
- Launch + Enterprise buttons: `liquid-glass-strong rounded-full`
- Studio (middle) button: `bg-white text-black rounded-full` (emphasis)
- All CTA buttons open the qualifier modal

### 4. Qualifier Modal
**Trigger:** Any "Book a Call", "Get Started", or pricing CTA click throughout the page.

**Structure:** Full-screen backdrop (`bg-black/60 backdrop-blur-sm`), centered `liquid-glass` card `rounded-3xl p-10 max-w-lg`.

**3 steps, animated with `motion` (x-slide between steps):**

**Step 1 — Project type**
- Heading: "What are you building?"
- Multi-select chip group: New website · Redesign · Landing page · Brand identity · Ongoing CRO
- "Continue →" button (disabled until ≥1 selected)

**Step 2 — Scope**
- Heading: "Scope it out."
- Budget chips (single-select): Under $5k · $5k–$15k · $15k–$50k · $50k+
- Timeline chips (single-select): ASAP · 1–3 months · 3–6 months · 6+ months
- "Continue →" button (disabled until both selected)

**Step 3 — Contact**
- Heading: "Where do we reach you?"
- Fields: Full name, Work email, Company (optional)
- Submit button: "Send + Book a Call →"
- **On submit:** POST to Formspree endpoint (env var `VITE_FORMSPREE_ID`), then open `https://cal.com/noir-studio/strategy` in new tab
- **Success state:** Step slides out, shows confirmation: "We'll be in touch within 24 hours." + close button

**State management:** React `useState` in a `BookingModal` component. Modal open/close state lifted to `App.tsx` via `isModalOpen` + `setIsModalOpen` props (or React context).

**Close:** `×` button top-right, `Escape` key, clicking backdrop.

### 5. Real Copy Throughout
Replace all placeholder text with Noir Studio content:
- Hero badge: "Now accepting Q3 clients"
- Hero heading: unchanged ("The Website Your Brand Deserves")
- Hero subtext: "Noir Studio builds for founders who refuse to blend in. AI precision, human taste, results you can measure."
- Partners bar label: "Trusted by the teams behind" (keep existing names)
- StartSection: "You dream it. We ship it." (keep — it's perfect)
- Stats: keep existing numbers, update labels slightly if needed
- Footer: "© 2026 Noir Studio. All rights reserved."

---

## Architecture

### New Files
```
src/
  components/
    BookingModal.tsx      — 3-step qualifier modal + Formspree submit
    Portfolio.tsx         — #work section, 3 case study cards
    Pricing.tsx           — #pricing section, 3 tier cards
  hooks/
    useActiveSection.ts   — IntersectionObserver for nav active state
```

### Modified Files
```
src/App.tsx               — add isModalOpen state, wire modal, add new sections
src/components/Navbar.tsx — anchor hrefs, accept activeSection prop
src/components/Hero.tsx   — update copy, wire CTAs to modal
src/components/StartSection.tsx  — wire CTA to modal
src/components/CtaFooter.tsx     — wire CTAs to modal
src/index.css             — add scroll-behavior: smooth to html
```

### Formspree
- Free tier: 50 submissions/month, emails results to registered address
- No backend required — direct `fetch` POST from `BookingModal`
- Endpoint: `https://formspree.io/f/{VITE_FORMSPREE_ID}`
- Fields posted: `projectType`, `budget`, `timeline`, `name`, `email`, `company`

---

## Verification
1. `npm run dev` → `http://localhost:5173`
2. Click any "Get Started" / "Book a Call" → modal opens with step 1
3. Complete all 3 steps → success state shows, Cal.com opens in new tab
4. Nav links scroll to correct sections, active link highlights
5. Portfolio cards hover lifts correctly
6. Pricing middle card is visually distinct
7. `node screenshot.mjs http://localhost:5173 final` → review full page
