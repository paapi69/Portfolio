# SPEC.md — Sahil Gupta Portfolio Website

## Mission
Build a single-page portfolio website for Sahil Gupta, a Senior Product Manager who builds and scales LLM-powered products. The site must feel like a premium, dark, immersive experience — inspired by thibaut.cool — but adapted for a Product Manager's world instead of a 3D artist's. Think: the intersection of tech sophistication and storytelling.

## Tech Stack & Architecture

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14+ (App Router, TypeScript) |
| Styling | Tailwind CSS v4 + CSS custom properties for theming |
| Animations | Framer Motion (page transitions, scroll reveals, hover states) |
| 3D Element | Three.js (single hero-level 3D element — NOT a full 3D scene) |
| Smooth Scroll | Lenis (smooth, butter-smooth scroll behavior) |
| Font Loading | next/font (self-hosted, no CLS) |
| Deployment | Vercel-ready (static export compatible) |

## File Structure

```
/app
  layout.tsx          — Root layout, font imports, Lenis provider, metadata
  page.tsx            — Main single-page with all sections
  globals.css         — CSS variables, custom utilities, noise textures
/components
  Navbar.tsx          — Sticky floating navbar with section highlighting
  Hero.tsx            — 3D interactive element + intro text
  Works.tsx           — Project showcase cards
  ProjectCard.tsx     — Individual project with expand/video capability
  About.tsx           — Bio section with creative desk/workspace visual
  Stats.tsx           — Animated metric counters
  Contact.tsx         — Contact section with interactive element
  Footer.tsx          — Minimal footer
  ScrollReveal.tsx    — Reusable Framer Motion scroll-trigger wrapper
/lib
  three-scene.tsx     — Three.js hero setup (isolated, client-only)
```

## Design System

### Aesthetic Direction: "Dark Command Center"
The vibe is a senior tech leader's mission control — dark, confident, data-rich, with selective bursts of energy. NOT a designer portfolio. This is a builder's portfolio. Every visual choice should whisper "I ship things that matter at scale."

### Color Palette

```css
:root {
  --bg-primary:     #000000;          /* Pure black background */
  --bg-secondary:   #0a0a0a;          /* Slightly lifted black for cards */
  --bg-elevated:    #111111;          /* Card hover states */
  --text-primary:   #f5f5f5;          /* Off-white for body text */
  --text-secondary: #888888;          /* Muted gray for labels */
  --text-dim:       #444444;          /* Very subtle text */
  --accent:         #00e5a0;          /* Electric mint green — represents growth/scale */
  --accent-glow:    rgba(0,229,160,0.15); /* Glow effect for accent */
  --border:         rgba(255,255,255,0.08); /* Subtle borders */
  --gradient-hero:  radial-gradient(ellipse at 50% 100%, rgba(0,229,160,0.08) 0%, transparent 60%);
}
```

### Typography

| Role | Font | Notes |
|------|------|-------|
| Display/Headings | Playfair Display | Serif, italic for section titles — editorial gravitas |
| Body/UI | Outfit | Geometric sans, modern, highly readable |
| Monospace/Data | JetBrains Mono | For stats, metrics, technical details |

#### Heading Hierarchy
- **H1 (Hero name)**: 80-96px, Playfair Display italic, letter-spacing: -0.03em
- **H2 (Section titles)**: 56-64px, Playfair Display italic
- **H3 (Project names)**: 36-42px, Outfit semibold
- **Body**: 16-18px, Outfit regular, line-height 1.7
- **Labels/Tags**: 12-13px, JetBrains Mono, uppercase, letter-spacing: 0.15em, --text-secondary

### Spacing System
Use Tailwind's scale but be generous. Sections should have 120-160px vertical padding. Let the content breathe inside the darkness.

---

## Sections

### 1. NAVBAR (Sticky, Floating)

**Behavior**: Sticky top, floating pill shape with rounded border (`border: 1px solid var(--border)`), backdrop-blur. Active section name highlights in `--text-primary`, others in `--text-secondary`. Smooth scroll-to on click.

**Items**: Home · Work · About · Contact

**Design**: Centered horizontally, ~80% max-width, appears after scrolling past hero fold. Use `position: sticky` with Framer Motion `AnimatePresence` for entrance.

### 2. HERO SECTION

**Layout**: Full viewport height. Content centered.

**3D Element**: A floating, slowly rotating 3D laptop/terminal rendered with Three.js. It should have:
- A glowing screen showing a matrix-style rain of product metrics ("$20M ARR", "+94% accuracy", "100K users", "6 markets") in green monospace text
- Subtle ambient lighting (mint green accent light from below)
- Mouse parallax — the laptop tilts slightly following cursor position
- On mobile: replace with a CSS-only glowing terminal ASCII art block

**Text Content** (below/overlapping the 3D element):

```
Sahil Gupta
Product leader who turns AI into revenue engines.
Your 0-to-1 partner, with more data.
```

- "Sahil Gupta" in large Playfair Display italic
- Tagline in Outfit, muted gray
- Subtle gradient glow at bottom of hero (`--gradient-hero`)

**Scroll indicator**: Minimal animated chevron or "scroll" text at bottom

### 3. WORK / PROJECTS SECTION

**Section Title**: "Things I've built" — Playfair Display italic, centered, massive (56-64px)

**Layout**: Vertically stacked project cards, each taking significant vertical space. NOT a grid — one project at a time demands attention.

**Each Project Card includes**:
- Project name (H3, bold)
- Role label + date (monospace, muted: "Product Manager · 2022–2025")
- One-liner description
- 3-4 key metrics displayed as animated counters (JetBrains Mono, large, accent color)
- Tags/pills for tech used
- Scroll-triggered entrance animation (fade up + slight scale)

#### Projects Data

**Project 1: Builder.ai — No-Code Studio Store**
```
Role:           Product Manager
Period:         Mar 2022 – Jun 2025 (3 yrs)
Company Type:   Series D, $450M+ raised
One-liner:      Led product strategy scaling a No-Code SaaS platform from $0 to $20M ARR across 6 global markets
Key Metrics:
  - $20M ARR (from $0)
  - 6 Global Markets (US, UK, UAE, India, Switzerland, Singapore)
  - 500K+ Automated Uploads (94% accuracy)
  - 60% LLM Cost Reduction ($45K → $18K/mo)
Tags:           GPT-4 Vision, RAG, LLM Optimization, A/B Testing, Mixpanel
Highlight:      "Magic Upload" — multimodal GenAI engine using GPT-4 Vision
```

**Project 2: Fyp — Neo Banking Platform**
```
Role:           Senior Product Manager
Period:         Jun 2021 – Apr 2022
Company Type:   Series A Fintech
One-liner:      Architected payments infrastructure and fraud detection, scaling 0 → 100K users in 25 days
Key Metrics:
  - 100K Users in 25 Days
  - $1M+ Monthly Transaction Volume
  - 45% Fraud Reduction
  - $150K+ Annual Savings
Tags:           Payments, Fraud Detection, RBI Compliance, Real-time Systems
```

**Project 3: FamPay — Teen Fintech**
```
Role:           Product Consultant, Founder's Office
Period:         Oct 2020 – Jun 2021
Company Type:   Series A Fintech
One-liner:      Spearheaded growth to $12M+ revenue and 500K MAU through viral loops and gamification
Key Metrics:
  - $12M+ Revenue in 6 Months
  - 500K MAU
  - 1M+ App Downloads
  - 65% CAC Reduction (Viral Coefficient: 1.4)
Tags:           Growth, Gamification, Referral Mechanics, GTM Strategy
```

**Project 4: Founder Era (Combined card, special styling)**
```
Title:          "The Founder Chapter"
Sub-projects:
  DiscovrIt (Co-Founder, 2018-2020):
    - Travel marketplace, $700K revenue, 150+ vendors, 35% repeat rate
  Block 5 (Founder, 2013-2018):
    - Artist marketplace, $500K+ revenue, 150K+ sales
    - B2B clients: Amazon, Google, Pizza Hut
Tags:           Marketplace, Bootstrapped, 0-to-1, B2B
```

### 4. ABOUT SECTION

**Section Title**: "About Me" — Playfair Display italic, centered

**Layout**: Two-column on desktop. Left: bio text. Right: creative visual element.

**Bio Text** (left column):
```
Ten years ago, I was a founder who had to figure out everything from scratch — validating ideas, building cross-functional teams, and turning concepts into revenue.

That experience taught me that great products aren't about features. They're about understanding real problems and assembling the right people to solve them.

Today, I lead product for AI-powered platforms, translating LLM capabilities into real business outcomes. From reducing costs 60% through prompt optimization to launching multimodal systems processing 500K+ uploads — I bridge the gap between what AI can do and what users actually need.
```

**Right Column Visual** — "My Workspace" Interactive Element:
Create a CSS/SVG pegboard-style visual with floating items representing Sahil's toolkit:
- A terminal icon labeled "Claude Code"
- A cursor icon labeled "Cursor"
- A brain/AI icon labeled "LLM Stack"
- A chart icon labeled "Mixpanel"
- A rocket icon labeled "0→1"
- LinkedIn and Email icons

Each item should have a subtle hover effect (scale + glow). On mobile, collapse to a horizontal scrolling row.

**Below the two columns**, add a horizontal scrolling ticker/marquee:
```
AI Product Management · LLM Optimization · RAG Architecture · Prompt Engineering · 0-to-1 · A/B Testing · Multimodal AI · Fintech · SaaS · Growth Strategy · Cross-Functional Leadership
```
Style: Monospace, uppercase, muted text, slow infinite horizontal scroll, separator dots between items.

### 5. CONTACT SECTION

**Section Title**: "Let's build something" — Playfair Display italic

**Content**:
```
Looking for a product leader who speaks both AI and business?

I'm actively exploring Senior PM / Lead PM roles in AI/ML, GenAI, LLM products, Fintech, or SaaS. Open to India, UK, and UAE (visa sponsorship welcome).

Best way to reach me: email.
```

**Interactive Contact Element**: Create a retro-inspired "command console" — a dark rounded card styled like a vintage device with clickable keycap-style buttons:
- **EMAIL** → copies sahil.sg.1991@gmail.com to clipboard (show toast "Copied!")
- **LINKEDIN** → opens linkedin.com/in/sahilgupta-41a3b6113
- **CALL** → tel:9971107229
- **HOME** → scrolls to top

Each button styled as a raised 3D keycap with different subtle colors (dark base, slight color tint). Hover: press-down effect.

### 6. FOOTER

Minimal. One line:
```
© 2025 Sahil Gupta · Built with Claude Code
```
Centered, small, muted text. Maybe a subtle green glow orb floating above.

---

## Animations & Interactions

### Global
- **Smooth scroll**: Lenis with `lerp: 0.1`, `duration: 1.2`
- **Custom cursor**: Replace default cursor with a small circle (12px, border-only, accent color) that scales up on hovering interactive elements. Desktop only.
- **Page load**: Staggered fade-in — navbar first, then hero text, then 3D element fades in
- **Noise overlay**: Subtle full-page grain texture (CSS background with SVG noise, opacity 0.03)

### Per-Section
- **Scroll reveals**: Every section uses ScrollReveal wrapper — Framer Motion `whileInView` with `y: 40 → 0`, `opacity: 0 → 1`, `duration: 0.8`, `ease: [0.25, 0.4, 0.25, 1]`
- **Metric counters**: When stats scroll into view, numbers count up from 0 to final value over 1.5s using `useMotionValue` + `useTransform`
- **Project cards**: On hover, subtle border glow (`box-shadow` with `--accent-glow`) and background shifts to `--bg-elevated`
- **Section titles**: Slight parallax (scroll slower than content, translateY offset)

### Mobile-Specific
- No custom cursor
- No Three.js (replace with CSS terminal/ASCII art)
- Reduce animation complexity (shorter durations, fewer parallax layers)
- Navbar becomes bottom-fixed pill on mobile
- Stack all layouts to single column

---

## Responsive Breakpoints

| Breakpoint | Width | Notes |
|-----------|-------|-------|
| Mobile | < 640px | Single column, reduced spacing, bottom nav |
| Tablet | 640-1024px | Adjusted grid, slightly reduced typography |
| Desktop | 1024px+ | Full experience with all animations |
| Wide | 1440px+ | Max-width container (1200px), centered |

---

## SEO & Meta

```html
<title>Sahil Gupta — Senior Product Manager | AI & LLM Products</title>
<meta name="description" content="Senior Product Manager with 10+ years building AI-powered products. $20M+ ARR, 500K+ users, 2x Founder. Expert in LLM optimization, RAG, and scaling SaaS platforms." />
<meta property="og:title" content="Sahil Gupta — Product Leader building AI that ships" />
<meta property="og:description" content="10+ years driving product success in SaaS, Fintech & AI. $20M ARR. 2x Founder." />
<meta property="og:type" content="website" />
<meta name="robots" content="index, follow" />
```

Structured data (JSON-LD) for Person schema with jobTitle, worksFor, url.

---

## Performance Requirements
- Lighthouse score: 90+ across all categories
- Three.js scene lazy-loaded (dynamic import, only on desktop)
- All images optimized (next/image with WebP)
- Fonts preloaded, display: swap
- Above-the-fold content renders without JS (SSR)
- Minimal bundle: no unnecessary dependencies

---

## CSS Terminal Fallback (if Three.js is too complex)

Instead of the 3D laptop, create a CSS-only terminal:
- Dark rounded rectangle with terminal chrome (three dots top-left)
- Green monospace text typing animation
- Cycling through metrics: "$20M ARR", "500K+ Users", "6 Global Markets", "94% Accuracy"
- Subtle glow around the terminal (box-shadow with accent-glow)
- Cursor blink animation
- This is simpler and more reliable than Three.js

---

## Execution Order
1. `npx create-next-app@latest` with TypeScript, Tailwind, App Router, src directory
2. Install dependencies: `framer-motion`, `lenis`, `three`, `@react-three/fiber`, `@react-three/drei`
3. Build mobile-first, then enhance for desktop
4. The 3D scene is optional — CSS terminal fallback is fine
5. Test scroll performance — Lenis + Framer Motion can conflict; ensure coordinated
6. Commit the dark theme hard — no light mode toggle
7. Every number/metric should animate
