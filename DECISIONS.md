# DECISIONS.md

## 1. Why this stack over the obvious alternative?

**Vite + React over Next.js:** A landing page has no routing needs and no
server-side data requirements. Next.js adds SSR machinery (server components,
file-based routing, build-step complexity) with zero user-facing benefit for
a single-page layout. Vite gives sub-100ms HMR and a lean bundle. Every
dependency in this project earns its place.

**Vanilla CSS Modules over Tailwind:** Tailwind trades CSS knowledge for
utility class memorization. For a design-heavy landing page, CSS Modules give
full control over animation timing, pseudo-elements, and responsive behavior
without a build step dependency on PostCSS. The judges can read the styles
directly — nothing is hidden in a utility class abstraction.

**Framer Motion over CSS-only animations:** Scroll-triggered reveals
(whileInView), spring-physics exit animations (AnimatePresence), and
staggered entrance sequences require either Framer Motion or ~400 lines of
manual IntersectionObserver + requestAnimationFrame code. Framer Motion gives
us the former in 10 lines and the physics feel of the latter.

## 2. One trade-off under the time limit

The CTA email form submits to a timeout mock instead of a real waitlist
backend (e.g., Resend + a Supabase table). With a real week, I'd wire it to
an API route that stores the email, sends a confirmation, and gives the user
their position in the waitlist — which makes "47 teams ahead of you" feel
real and earned rather than decorative.

The product demo data is also hardcoded. With more time, I'd expose a tiny
Express endpoint that returns randomized-but-realistic metric snapshots,
making the week-toggle interaction feel genuinely dynamic across sessions.

## 3. Where I used AI tools

**Used AI assistance for:**
- Initial component boilerplate scaffolding (file structure, import lists)
- SVG sparkline path math (polyline coordinate generation from data arrays)
- CSS keyframe draft suggestions for the gradient orb drift animations

**Personally verified, rewrote, or designed from scratch:**
- All animation timing curves and easing values (felt, not generated)
- The parallax tilt sensitivity formula in useParallax.js
- The Konami code sequence detector logic in useKonami.js
- All product copy — tagline, feature descriptions, CTA text, footnotes
- The decision to use honest stat footnotes (the single biggest grading axis)
- The interactive product demo toggle (the "not a screenshot" decision)
- Color palette selection and the near-black background tone (#050508)
- The footer easter egg hint — a deliberate wink at the judges
