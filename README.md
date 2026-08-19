# Cadence | Engineering Showcase

A high-fidelity, interactive landing page built to demonstrate advanced frontend engineering capabilities. Cadence goes beyond standard web design by implementing complex UI interactions, scroll-triggered physics animations, and custom 3D elements.

## 🚀 Overview

This project was built as an assessment showcase to highlight an uncompromising approach to craft, performance, and user experience. 

Instead of relying on heavy frameworks or pre-built UI libraries, Cadence is constructed from the ground up using a lean stack to ensure sub-100ms Hot Module Replacement (HMR) and a minimal production bundle. It features a fully custom physics-based cursor, staggered entrance sequences, and a dynamic product demo toggle.

## 🛠 Tech Stack

*   **Core:** React 18 + Vite
*   **Styling:** Vanilla CSS Modules (deliberately chosen over Tailwind for total control over animation timing and pseudo-elements without build-step dependency).
*   **Animations:** Framer Motion (for spring-physics exit animations and scroll-triggered reveals)
*   **3D / WebGL:** Three.js (for the custom interactive background)
*   **Icons:** Lucide React

## ✨ Key Technical Features

*   **Interactive Product Demo:** Not just static screenshots. The product demo features a week-toggle interaction that feels genuinely dynamic and responsive.
*   **Physics-Based UI:** Utilizing custom hooks (`useParallax.js`) to calculate tilt sensitivity formulas and create a sense of depth that responds to user input.
*   **Advanced Animations:** Complex stagger sequences, gradient orb drift animations, and fluid entrance reveals carefully choreographed using custom timing curves and easing values.
*   **Hidden Interactions:** Includes a custom Konami code sequence detector (`useKonami.js`) built from scratch—a subtle nod to technical depth.

## 🧠 Engineering Decisions

Every dependency in this project earned its place:

1.  **Vite + React over Next.js:** A landing page has no routing needs and no server-side data requirements. Next.js adds SSR machinery with zero user-facing benefit for a single-page layout. Vite keeps the architecture lean and incredibly fast.
2.  **Vanilla CSS over Utility Classes:** For a design-heavy, animation-rich showcase, pure CSS modules grant absolute control. Reviewers can read the styles directly without navigating a utility class abstraction.
3.  **Framer Motion over Vanilla IntersectionObservers:** Spring-physics and complex staggered entrance sequences require either Framer Motion or hundreds of lines of manual `IntersectionObserver` + `requestAnimationFrame` code. Framer Motion provides the physics feel natively in a fraction of the code.

## 🚀 Running Locally

To run this project locally and explore the code:

```bash
# Clone the repository
git clone https://github.com/jyotsnak1603/AcdyonAssessment.git

# Navigate to the project directory
cd AcdyonAssessment

# Install dependencies
npm install

# Start the local development server
npm run dev
```

## 📝 Next Steps (Future Roadmap)

Given more time, future iterations would include:
*   Wiring the CTA email form to a real backend (e.g., Resend + Supabase) to manage waitlist positions dynamically.
*   Replacing hardcoded product demo data with an API endpoint that returns randomized-but-realistic metric snapshots.

---
*Built with deliberate craft and an obsession for detail.*
