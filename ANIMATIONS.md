# ANIMATIONS.md

Complete animation reference for `PortfolioRedesignMarch`. Documents every animation and visual effect: mechanism, trigger, duration, and accessibility handling. For broader feature context, see `FEATURES.md`.

---

## Animation Stack

**Framer Motion v11** is the sole animation library. No GSAP, AnimeJS, or CSS `@keyframes` are used. Simple hover state transitions are handled by Tailwind CSS. Two effects use `requestAnimationFrame` directly (`useSpotlight`, `FlickeringGrid`). One effect uses `setInterval` (`ScrambleText`).

**Custom easing** used throughout: `cubic-bezier(0.25, 0.46, 0.45, 0.94)` — smooth deceleration. Defined in `tailwind.config.ts` as `ease-custom-ease`.

---

## Reduced Motion

Every animation in the codebase is gated on `useReducedMotion()` (`hooks/useReducedMotion.ts`), which reads `prefers-reduced-motion: reduce` from the OS and updates reactively.

Behavior per component when reduced motion is active:

| Component | Reduced Motion Behavior |
|---|---|
| `FlickeringGridBackground` | Returns `null` — not rendered |
| `SpotlightCursor` | Returns `null` — not rendered |
| `AmbientBackground` | Blobs render but do not animate (`animate={{}}`) |
| `ScrambleText` | Shows final text immediately, no scramble |
| `LeftPanel` | Skips entrance animation, renders at full opacity |
| `MobileHero` | Skips entrance animation, renders at full opacity |
| `AnimatedSection` / `AnimatedChild` | Skips fade/slide, renders instantly |
| `SectionHeading` | Skips slide-in, renders instantly |
| `ExperienceCard` / `ProjectCard` / `BlogCard` | Hover animations still run (user-initiated, not automatic) |

---

## Background Effects

### Flickering Grid

**Files:** `components/effects/FlickeringGridBackground.tsx` + `components/magicui/flickering-grid.tsx`
**Trigger:** Page load (continuous)
**Platform:** Desktop only (`hidden lg:block`)

Renders a full-screen fixed `<canvas>` of tiny teal squares that flicker asynchronously, like a field of faintly pulsing pixels.

**Configuration used:**
- `squareSize: 5` (px)
- `gridGap: 1` (px)
- `color: 'rgb(100, 255, 218)'` (teal)
- `maxOpacity: 0.03` (3% — nearly invisible)
- `flickerChance: 0.5` per second per square

**How it works:**
- `requestAnimationFrame` loop calculates `deltaTime` each frame.
- Each square has a `flickerChance * deltaTime` probability of jumping to a new random opacity between `0` and `maxOpacity`.
- `ResizeObserver` recalculates the grid layout when the container resizes.
- `IntersectionObserver` pauses the RAF loop when the canvas is off-screen.
- DPR-aware: scales the canvas for retina displays.

**Accessibility:** Returns `null` entirely if `prefers-reduced-motion`.

---

### Ambient Background (Mobile)

**File:** `components/effects/AmbientBackground.tsx`
**Trigger:** Page load (continuous loop)
**Platform:** Mobile only (`lg:hidden`)

Two large radial gradient blobs that slowly drift, providing depth on mobile where the flickering grid is hidden.

**Blob 1 — Upper-right teal:**
- Size: `50vw × 50vw`, positioned `-top-32 -right-32`
- Color: `rgba(100, 255, 218, 0.07)` at center → transparent at 70%
- Animation: `x: [0, 20, 0]`, `y: [0, 15, 0]`
- Duration: 10s, `repeat: Infinity`, `easeInOut`

**Blob 2 — Lower-left deep teal:**
- Size: `60vw × 60vw`, positioned `-bottom-40 -left-32`
- Color: `rgba(15, 75, 80, 0.18)` at center → transparent
- Animation: `x: [0, -15, 0]`, `y: [0, -20, 0]`
- Duration: 12s, `repeat: Infinity`, `easeInOut`, `delay: 2s`

**Accessibility:** Blobs render but `animate` prop is set to `{}` (empty) — no movement.

---

### Spotlight Cursor

**File:** `components/effects/SpotlightCursor.tsx`
**Hook:** `hooks/useSpotlight.ts`
**Trigger:** Mouse movement (continuous)
**Platform:** Desktop only (`hidden lg:block`)

A full-screen fixed `div` (`z-30`, pointer-events: none) with a CSS `radial-gradient` centered on the cursor.

**Visual:** `radial-gradient(600px at {x}px {y}px, rgba(100, 255, 218, 0.08), transparent 80%)`

**`useSpotlight` (RAF lerp):**
- Listens to `mousemove` events to record a target position.
- Every animation frame, lerps current position toward target by `0.08` (8% per frame) — creates a smooth, sluggish-follow effect.
- `isVisible` becomes `true` on first `mousemove`; `false` on `document` `mouseleave`.
- Returns `{ position: { x, y }, isVisible }`.

**Opacity:** CSS `transition-opacity duration-300`; `opacity: 0` when `isVisible` is false, `1` when true.

**Accessibility:** Returns `null` entirely if `prefers-reduced-motion`.

---

## Grain Texture Overlay

**File:** `app/globals.css` — `body::before`
**Trigger:** Always present (static)
**Platform:** All

Fixed full-viewport pseudo-element at `z-index: 9999`, pointer-events: none.

Uses an inline SVG `feTurbulence` filter (`type="fractalNoise"`, `baseFrequency="0.75"`, `numOctaves="4"`) as a repeating `200px × 200px` background tile at `opacity: 0.04`. Adds subtle analog grain/depth. Not animated.

---

## Page Load Animations

### LeftPanel Entrance (Desktop)

**File:** `components/layout/LeftPanel.tsx`
**Trigger:** Component mount
**Platform:** Desktop only

The sidebar animates in with a staggered sequence using Framer Motion variants.

**`panelVariants` (container):**
- `hidden`: `opacity: 0`
- `visible`: `opacity: 1`, `staggerChildren: 0.1`, `delayChildren: 0.1`

**`itemVariants` (per item — name block, nav block):**
- `hidden`: `{ opacity: 0, x: -16 }`
- `visible`: `{ opacity: 1, x: 0 }`, duration: 0.5s, `ease: 'easeOut'`

**Social links row:**
Separate `initial="hidden" animate="visible"` with `transition: { delay: 0.6 }` — animates last, after the nav.

---

### MobileHero Entrance (Mobile)

**File:** `components/layout/MobileHero.tsx`
**Trigger:** Component mount
**Platform:** Mobile only

**`heroVariants`:**
- `hidden`: `{ opacity: 0, y: 18 }`
- `visible`: `{ opacity: 1, y: 0 }`, duration: 0.55s, easing: `cubic-bezier(0.25, 0.46, 0.45, 0.94)`

**Accessibility:** Starts at `visible` immediately if `prefers-reduced-motion`.

---

### ScrambleText (Name Reveal)

**File:** `components/effects/ScrambleText.tsx`
**Trigger:** Page load, after a configurable delay
**Used in:** `LeftPanel` (delay: 300ms), `MobileHero` (delay: 250ms)

Decodes the name "Vir Khanna" from random characters, left to right.

**Algorithm:**
1. After `delay` ms, a `setInterval` fires every **40ms**.
2. A `resolvedCount` increments by 1 every 3 ticks (~120ms per character).
3. Each tick, unresolved characters are replaced with a random character from `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&`.
4. Characters at index `< resolvedCount` always display their final value.
5. Interval clears once all characters are resolved.

The interval at 40ms with a tick-every-3 resolution rate means approximately 120ms per character lock-in. For "Vir Khanna" (10 characters), total duration is roughly 1.2 seconds after the initial delay.

**Accessibility:** `aria-label` always shows the real name. If `prefers-reduced-motion`, renders final text immediately with no interval.

---

## Scroll-Triggered Animations

### AnimatedSection + AnimatedChild

**File:** `components/effects/AnimatedSection.tsx`
**Trigger:** Scroll into viewport (fires once)
**Used in:** About, Experience, Projects, Skills sections

The core scroll-animation primitive. Wraps any content to stagger-reveal children as the user scrolls down.

**`AnimatedSection` (container):**
- Uses `useInView(ref, { once: true, margin: '-80px' })` — fires when the element enters 80px inside the viewport.
- `hidden → visible` triggers stagger.
- Variants: `staggerChildren: 0.14`, `delayChildren: 0.05`
- **Reduced motion:** Container stays at `opacity: 1`, no stagger (all children appear instantly).

**`AnimatedChild` (per item):**
- `hidden`: `{ opacity: 0, y: 28, scale: 0.98 }`
- `visible`: `{ opacity: 1, y: 0, scale: 1 }`, duration: 0.55s, easing: `cubic-bezier(0.25, 0.46, 0.45, 0.94)`
- **Reduced motion:** `hidden` and `visible` both set to `{ opacity: 1, y: 0, scale: 1 }` — instant.

Every card, paragraph, and skill category fades up into place as the user scrolls through the page.

---

### SectionHeading

**File:** `components/ui/SectionHeading.tsx`
**Trigger:** Scroll into viewport (fires once)

Each section's `<h2>` slides in from the left when scrolled into view.

- Uses `useInView(ref, { once: true, margin: '-60px' })`
- `hidden`: `{ opacity: 0, x: -20 }`
- `visible`: `{ opacity: 1, x: 0 }`, duration: 0.4s, easing: `cubic-bezier(0.25, 0.46, 0.45, 0.94)`
- **Reduced motion:** Instant, no movement.

Applied to all section headings: About, Experience, Projects, Skills, Writing.

---

## Navigation Animations

### NavLink — Active Indicator (Shared Layout)

**File:** `components/ui/NavLink.tsx`
**Trigger:** Active section changes (on scroll)

When the active section changes, a teal horizontal bar physically slides between nav items.

- Active state renders a `motion.span` with `layoutId="nav-indicator"`, `bg-teal`, `h-px`, `w-12` (48px).
- Framer Motion's shared layout animation moves the element between nav items with a spring: `stiffness: 450`, `damping: 38`.
- Result: the bar smoothly slides from one nav item to the next as you scroll through sections.

### NavLink — Hover State (Inactive)

**Trigger:** Mouse hover

Inactive nav items show a 16px slate bar. On hover:
- `whileHover: { width: 32 }`, duration: 0.2s.
- The line physically extends right.

---

## Card Hover Animations

### ExperienceCard

**File:** `components/cards/ExperienceCard.tsx`
**Trigger:** Mouse hover

The entire card is a `motion.a`.

- **Background + shadow:** `whileHover: { backgroundColor: '#112240', boxShadow: '0 4px 20px rgba(0,0,0,0.25)' }`, duration: 0.2s
- **Teal left border accent** (`motion.div`, `w-0.5`, absolute left edge): `initial: { scaleY: 0 }` → `whileHover: { scaleY: 1 }`, duration: 0.2s, `transformOrigin: top` — grows downward from the top
- **Role/company text:** `group-hover:text-teal transition-colors duration-200` (CSS)
- **ExternalLink icon:** `opacity-0 group-hover:opacity-100 transition-opacity duration-200` (CSS)

---

### ProjectCard

**File:** `components/cards/ProjectCard.tsx`
**Trigger:** Mouse hover

The entire card is a `motion.article`.

- **Background + shadow:** `whileHover: { backgroundColor: '#112240', boxShadow: '0 4px 20px rgba(0,0,0,0.25)' }`, duration: 0.25s, `ease: 'easeOut'`
- **Teal left border accent:** identical to ExperienceCard — `scaleY: 0 → 1`, `origin-top`, 0.2s
- **Title text:** `group-hover:text-teal transition-colors duration-200` (CSS)

---

### BlogCard

**File:** `components/cards/BlogCard.tsx`
**Trigger:** Mouse hover

The entire card is a `motion.a`.

- **Lift + background + shadow + border:** `whileHover: { y: -3, borderColor: '#233554', backgroundColor: '#112240', boxShadow: '0 16px 32px rgba(0,0,0,0.3)' }`, duration: 0.25s, `ease: 'easeOut'`
- The `y: -3` lift is unique to BlogCard — ExperienceCard and ProjectCard do not lift.
- **Cover image:** `transition-transform duration-500 group-hover:scale-105` (CSS) — slowest transition in the codebase at 500ms
- **Title text:** `group-hover:text-teal transition-colors duration-200` (CSS)
- **ArrowUpRight icon:** `opacity-0 group-hover:opacity-100 transition-opacity duration-200` (CSS)

---

## Micro-Interactions

### SocialLink

**File:** `components/ui/SocialLink.tsx`
**Mechanism:** Tailwind CSS transitions

- `hover:text-teal` — icon color to teal
- `hover:-translate-y-1` — lifts 4px upward
- `transition-all duration-200`

### SkillBadge

**File:** `components/ui/SkillBadge.tsx`
**Mechanism:** Tailwind CSS transitions

- `bg-teal/10 → hover:bg-teal/20` — background brightens
- `border-teal/20 → hover:border-teal/40` — border brightens
- `text-teal/70 → hover:text-teal` — text brightens to full teal
- `hover:shadow-[0_0_10px_rgba(100,255,218,0.12)]` — subtle teal glow bloom
- `transition-all duration-200`

### Arrow Icons (Section CTAs)

**"View Full Résumé" link (Experience):**
- `ArrowRight` icon: `group-hover:translate-x-1 transition-transform duration-200` — nudges right on hover

**"View all posts on Substack" link (Blog):**
- `ArrowUpRight` icon: `group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200` — diagonal nudge (up-right) on hover

---

## Global CSS Effects

**Smooth scroll:** `html { scroll-behavior: smooth }` — native CSS smooth scroll when anchor links are clicked.

**Text selection:** `::selection { background-color: rgba(100, 255, 218, 0.2); color: #64ffda }` — selected text glows teal.

**Scrollbar:** Track: `#0a192f` (navy), thumb: `#233554` (navy-lighter), thumb on hover: `#8892b0` (slate). CSS color change only, no animation.

**Focus ring:** `:focus-visible { outline: 2px solid #64ffda }` — teal focus outline for keyboard navigation.

---

## Complete Reference Table

| Component | Effect | Mechanism | Duration | Trigger | Platform |
|---|---|---|---|---|---|
| `FlickeringGrid` | Canvas grid of twinkling squares | `requestAnimationFrame` loop | Continuous | Page load | Desktop only |
| `AmbientBackground` | Two floating gradient blobs | Framer Motion keyframe loop | 10s / 12s | Page load | Mobile only |
| `SpotlightCursor` | Lagged teal radial gradient follows cursor | RAF lerp + CSS inline style | Continuous | Mouse move | Desktop only |
| `ScrambleText` | Name decodes from random noise | `setInterval` 40ms | ~1.2s after delay | Page load | Both |
| `LeftPanel` | Slides in from left, staggered items | Framer Motion variants | 0.5s per item | Mount | Desktop only |
| `MobileHero` | Fades + rises into view | Framer Motion variants | 0.55s | Mount | Mobile only |
| `SectionHeading` | Slides in from left | Framer Motion `useInView` | 0.4s | Scroll (once) | Both |
| `AnimatedChild` | Fades up + scale 0.98→1, staggered | Framer Motion `useInView` | 0.55s per child, 0.14s stagger | Scroll (once) | Both |
| `NavLink` active indicator | Teal bar slides between items | Framer Motion `layoutId` spring | Spring (450/38) | Section scroll | Desktop only |
| `NavLink` hover | Inactive line extends 16→32px | Framer Motion `whileHover` | 0.2s | Hover | Desktop only |
| `ExperienceCard` | Background fill + teal border grows down | Framer Motion `whileHover` | 0.2s | Hover | Both |
| `ProjectCard` | Background fill + teal border grows down | Framer Motion `whileHover` | 0.25s | Hover | Both |
| `BlogCard` | Lifts 3px + background fill + image zoom | Framer Motion `whileHover` + CSS | 0.25s card / 0.5s image | Hover | Both |
| `SocialLink` | Color teal + lifts 4px | Tailwind `transition-all` | 200ms | Hover | Both |
| `SkillBadge` | Brighter border/bg/text + teal glow | Tailwind `transition-all` | 200ms | Hover | Both |
| Icon fade-in (ExperienceCard, BlogCard) | Opacity 0→1 | Tailwind `transition-opacity` | 200ms | Hover | Both |
| Arrow nudge (Resume, Blog CTA) | Directional translate | Tailwind `transition-transform` | 200ms | Hover | Both |
| Grain overlay | Static noise texture | CSS SVG `feTurbulence` filter | Static | Always | Both |
| Smooth scroll | Page scrolls to anchor | CSS `scroll-behavior: smooth` | Native | Nav click | Both |
| Text selection | Teal highlight | CSS `::selection` | Instant | User select | Both |
