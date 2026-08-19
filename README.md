# Cadence — Acdyon Frontend Challenge (Part 2)

Developer velocity intelligence for engineering leads. A landing page built for the Acdyon "Build It Like You Mean It" assessment.

## Live demo

https://cadencelanding-five.vercel.app

## What to try (60-second reviewer path)

1. **Simulate Deploy** — click the green button in the hero. Watch the CI/CD pipeline run and the dashboard deployment count tick up.
2. **Product demo toggle** — scroll to "Live product demo" and switch between *This week* and *Last week*. Interactive UI with sample data, not a screenshot.
3. **Easter egg** — Konami code: `↑ ↑ ↓ ↓ ← → ← → B A` (hint in the footer).

## Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Build | Vite + React 18 | Single page, no SSR needed — lean bundle, fast HMR |
| Styles | CSS Modules | Full control over animation timing without utility-class abstraction |
| Motion | Framer Motion | Scroll reveals and spring transitions without manual observers |
| Icons | Lucide React | Tree-shakeable, consistent stroke |

## Design decisions

### 1. Why this stack over the obvious alternative?

**Vite + React over Next.js:** No routing or server data on a one-page layout. Next.js adds SSR machinery with zero user-facing benefit here.

**CSS Modules over Tailwind:** Judges can read styles directly. Animation timing, pseudo-elements, and responsive behavior stay explicit.

**Framer Motion over CSS-only:** `whileInView`, `AnimatePresence`, and staggered entrances would need ~400 lines of IntersectionObserver + rAF code otherwise.

**CSS background over Three.js:** WebGL added ~600 KB and hurt mobile load with no product payoff. Replaced with lightweight CSS orbs.

### 2. One trade-off under the time limit

The CTA form is a client-side mock (timeout → success state, labeled "Demo only"). With a real week: wire to Resend + Supabase, store emails, send confirmation.

Product demo metrics are hardcoded. With more time: a tiny API returning realistic weekly snapshots so the toggle feels dynamic across sessions.

### 3. Where I used AI tools

**AI assisted:** Component boilerplate scaffolding, SVG sparkline coordinate math, CSS keyframe drafts.

**Personally verified or wrote:** Animation easing values, `useParallax.js` tilt formula, `useKonami.js` sequence detector, all product copy, honest stat footnotes (no fabricated user counts), deploy simulation interaction, color palette, easter egg hint.

## Honesty choices (intentional)

- No fake testimonials, logo walls, or invented waitlist numbers
- Stats section uses product facts only (4 DORA metrics, metadata-only storage, etc.)
- Product demo disclaimer labels data as synthetic
- CTA success state explicitly says no email is stored

## Run locally

```bash
git clone https://github.com/jyotsnak1603/cadencelanding.git
cd cadencelanding
npm install
npm run dev
```

```bash
npm run build   # production build
npm run preview # preview production output
```

---

Built for the Acdyon Technologies frontend challenge — Part 2: The Premium Home Page.
