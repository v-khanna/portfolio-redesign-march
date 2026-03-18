# OVERVIEW.md

High-level orientation for `PortfolioRedesignMarch`. For deeper detail, see `FEATURES.md` (all features), `ANIMATIONS.md` (all effects), and `AGENTS.md` (editing rules and conventions).

---

## What This Is

A single-page personal portfolio for **Vir Khanna**, a UC Davis graduate (B.S. Computational Cognitive Science, Data & AI track; Philosophy minor; 3.8 GPA). Deployed at `virkhanna.com` via Netlify.

The visual style is dark, minimal, and motion-forward — inspired by Brittany Chiang's portfolio — with a fixed left sidebar on desktop and a scrollable content column on the right. The site is meant to feel premium and editorial, not playful or crowded.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| UI | React 18.2.x |
| Language | TypeScript 5.5 (strict mode) |
| Styling | Tailwind CSS 3.4 with custom color tokens |
| Animation | Framer Motion 11 |
| Icons | lucide-react |
| Fonts | Inter (sans), Fira Code (mono) via `next/font/google` |
| Deployment | Netlify with `@netlify/plugin-nextjs`, Node 20 |

One page, one route. No database, no API routes, no analytics, no contact form.

---

## Project Structure

```
app/                    Root layout, global CSS, single async Server Component page
components/
  layout/               LeftPanel (desktop sidebar), MobileHero, MobileHeader (stub)
  sections/             About, Experience, Projects, Skills, Blog
  cards/                ExperienceCard, ProjectCard, BlogCard
  effects/              AnimatedSection, AmbientBackground, FlickeringGridBackground,
                        ScrambleText, SpotlightCursor
  magicui/              flickering-grid canvas component
  providers/            ActiveSectionProvider (active nav state)
  ui/                   NavLink, SectionHeading, SkillBadge, SocialLink
hooks/                  useActiveSection, useReducedMotion, useSpotlight
lib/
  data/                 experience.ts, projects.ts, skills.ts (all static TypeScript)
  rss.ts                Substack RSS fetch and parse
  types.ts              TypeScript interfaces
  utils.ts              cn() class utility
public/                 profile.jpg, resume.pdf
```

---

## Layout

### Desktop (lg+ breakpoints)

Two-column split:
- **Left (fixed, ~45%):** `LeftPanel` — name, tagline, navigation, social/resume links, spotlight cursor effect. Does not scroll.
- **Right (scrollable, ~55%):** `<main>` — all five content sections stacked vertically.

### Mobile (below lg)

- `LeftPanel` is hidden.
- `MobileHero` renders at top: same name, tagline, and social links.
- Content sections are full-width, stacked.
- Mobile gets a different background effect (animated gradient blobs instead of the flickering grid).

---

## Content Sections

Five sections, rendered in this fixed order:

| Section | Source | Notes |
|---|---|---|
| **About** | Inline copy in `components/sections/About.tsx` | UC Davis, work history, MLSN, personal interests |
| **Experience** | `lib/data/experience.ts` | 4 entries: Blendid AI, Everise, CK Birla Group, MLSN |
| **Projects** | `lib/data/projects.ts` | 8 projects in a 2-column grid |
| **Skills** | `lib/data/skills.ts` | 5 categories, teal badge pills |
| **Blog (Writing)** | `lib/rss.ts` — Substack RSS | Up to 6 posts, server-fetched, ISR 1h |

---

## Data Flow

```
app/page.tsx (async Server Component)
  │
  ├── getBlogPosts()          ← lib/rss.ts fetches Substack RSS (ISR, 1h cache)
  │
  └── ActiveSectionProvider  ← React context for active nav state
        │
        ├── FlickeringGridBackground   (desktop bg, canvas)
        ├── AmbientBackground          (mobile bg, gradient blobs)
        ├── MobileHero                 (mobile-only hero block)
        ├── LeftPanel                  (desktop-only fixed sidebar)
        └── <main>
              ├── About
              ├── Experience   ← lib/data/experience.ts
              ├── Projects     ← lib/data/projects.ts
              ├── Skills       ← lib/data/skills.ts
              └── Blog         ← posts prop from getBlogPosts()
```

Active section tracking: `useActiveSection` hook registers an `IntersectionObserver` on all five section elements. When a section enters the viewport's active band (`rootMargin: '-20% 0px -60% 0px'`), it updates context, which highlights the corresponding nav item in `LeftPanel` via a spring-animated shared-layout teal bar.

---

## Design System

### Colors

| Token | Hex | Use |
|---|---|---|
| `navy` | `#0a192f` | Page background |
| `navy-light` | `#112240` | Card hover background |
| `navy-lighter` | `#233554` | Borders, separators |
| `slate` | `#8892b0` | Body text |
| `light-slate` | `#a8b2d8` | Secondary text |
| `lightest-slate` | `#ccd6f6` | Headings, emphasized text |
| `white` | `#e6f1ff` | Strongest text |
| `teal` | `#64ffda` | Sole accent color |

Defined in both `tailwind.config.ts` (Tailwind tokens) and `app/globals.css` (CSS custom properties).

### Typography

- **Inter** — all body text, headings, card content
- **Fira Code** — dates, metadata labels, section category text, inline code

### Global CSS Effects

- Grain texture overlay (`body::before`): SVG fractalNoise at 4% opacity — static, adds depth
- Custom scrollbar: 6px wide, navy-colored
- Teal text selection (`::selection`)
- Teal focus ring (`:focus-visible`)

---

## Animations (Summary)

Full details in `ANIMATIONS.md`. Key effects:

| Effect | Where | When |
|---|---|---|
| Flickering grid | Full-screen canvas background | Desktop, continuous |
| Ambient gradient blobs | Full-screen background | Mobile, continuous slow loop |
| Spotlight cursor | Follows mouse across page | Desktop, on mouse move |
| Name scramble | "Vir Khanna" in sidebar/hero | Page load, once |
| Section reveals | All content (fade up + stagger) | Scroll into viewport, once |
| Nav indicator | Active nav teal bar | Slides between items on scroll |
| Card hover | Background fill + teal left border | On hover |

All animations respect `prefers-reduced-motion` — every animated component disables or skips animations when the OS setting is active.

---

## External Dependencies

| Service | How |
|---|---|
| **Substack** | RSS feed fetched server-side every 1 hour |
| **Netlify** | Deployment platform |
| **Google Fonts** | Inter + Fira Code (via `next/font`) |
| **next/image** | Substack cover images (remote patterns configured in `next.config.mjs`) |

---

## Quick Edit Reference

| What | File |
|---|---|
| Experience entries | `lib/data/experience.ts` |
| Projects | `lib/data/projects.ts` |
| Skills | `lib/data/skills.ts` |
| About copy | `components/sections/About.tsx` |
| SEO / metadata | `app/layout.tsx` |
| Footer | `app/page.tsx` |
| Resume file | `public/resume.pdf` |
| Blog RSS URL | `lib/rss.ts` |
| Colors | `app/globals.css` + `tailwind.config.ts` |

---

## Scripts

```bash
npm run dev     # Start dev server at localhost:3000
npm run build   # Production build
npm run start   # Serve production build
npm run lint    # ESLint
```

After any meaningful change: run `npm run lint`, then `npm run build` if layout or data flow changed.
