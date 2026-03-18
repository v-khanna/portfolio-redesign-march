# AGENTS.md

The primary AI agent handbook for `PortfolioRedesignMarch`. Read this before touching any code. It covers architecture, conventions, design system, and editing rules so you don't re-derive them from scratch every session.

For human-oriented setup, see `README.md`. For all site features, see `FEATURES.md`. For animation specifics, see `ANIMATIONS.md`. For a high-level project overview, see `OVERVIEW.md`.

---

## Project Identity

Single-page personal portfolio for **Vir Khanna** (`virkhanna.com`). Dark, minimal, editorial, motion-forward. Inspired by Brittany Chiang's split-panel layout. The goal is clean and premium — not playful, not crowded, not noisy.

**Design intent:**
- Content-first, strong typography, restrained accents
- Teal as the sole accent color — no additional colors without explicit approval
- Motion-enhanced but never distracting
- Technical and modern in feel

---

## Tech Stack

| Layer | Technology | Notes |
|---|---|---|
| Framework | Next.js 14 (App Router) | Single route: `/` |
| UI | React **18.2.x** | **Do not upgrade to 18.3.x** — caused runtime/hook issues |
| Language | TypeScript 5.5 | Strict mode on |
| Styling | Tailwind CSS 3.4 | Custom tokens in `tailwind.config.ts` and `globals.css` |
| Animation | Framer Motion 11 | All motion; see `ANIMATIONS.md` |
| Icons | lucide-react 0.462 | |
| Class utils | clsx + tailwind-merge | Exposed as `cn()` in `lib/utils.ts` |
| RSS parsing | fast-xml-parser 4.4 | Substack feed only |
| Fonts | Inter (sans) + Fira Code (mono) | Loaded via `next/font/google` |
| Deployment | Netlify | `netlify.toml`, `@netlify/plugin-nextjs`, Node 20 |

---

## App Structure

### Render Order (`app/page.tsx`)

`page.tsx` is an **async Server Component** that:
1. Fetches Substack blog posts via `getBlogPosts()` (ISR, 1-hour revalidation)
2. Wraps everything in `ActiveSectionProvider`
3. Renders in this order:

```
FlickeringGridBackground   ← desktop-only background canvas
AmbientBackground          ← mobile-only blob gradient
MobileHero                 ← mobile-only hero (name, tagline, social links)
LeftPanel                  ← desktop-only fixed left sidebar
<main>
  About
  Experience
  Projects
  Skills
  Blog
  <footer>
```

### Directory Map

```
app/                    Root layout, global CSS, single page route
components/
  layout/               LeftPanel (desktop), MobileHero (mobile), MobileHeader (stub/null)
  sections/             About, Experience, Projects, Skills, Blog
  cards/                ExperienceCard, ProjectCard, BlogCard
  effects/              AnimatedSection, AmbientBackground, FlickeringGridBackground,
                        ScrambleText, SpotlightCursor
  magicui/              flickering-grid canvas component (third-party-style)
  providers/            ActiveSectionProvider (active nav context)
  ui/                   NavLink, SectionHeading, SkillBadge, SocialLink
hooks/                  useActiveSection, useReducedMotion, useSpotlight
lib/
  data/                 experience.ts, projects.ts, skills.ts (all static)
  rss.ts                Substack RSS fetch + parse
  types.ts              TypeScript interfaces
  utils.ts              cn() helper
public/                 profile.jpg, resume.pdf
```

---

## Layout System

### Desktop (lg+ breakpoints)

Two-column split layout:

- **Left (fixed, ~45% width):** `LeftPanel` — name, tagline, nav, social links, spotlight cursor. Fixed to the viewport; does not scroll.
- **Right (scrollable, ~55% width):** `<main>` — all sections, stacked vertically. Offset with `lg:ml-[45%]`.

This split is a defining part of the site. Do not change it without explicit approval.

### Mobile (< lg)

- `LeftPanel` is hidden (`hidden lg:flex`)
- `MobileHero` renders at the top of the document with name, tagline, and social links
- `MobileHeader` currently **returns `null`** — it is a stub with no functionality
- `AmbientBackground` replaces the desktop flickering grid with mobile blob animations

---

## Section Notes

### About
- **Source:** Inline copy in `components/sections/About.tsx` (not a data file)
- Covers: UC Davis degree, work history summary, MLSN co-founding, personal interests
- Tone: polished, personal, concise — do not over-lengthen

### Experience
- **Source:** `lib/data/experience.ts`
- 4 entries: Blendid AI, Everise, CK Birla Group, Machine Learning Student Network
- Cards are clickable links to the company URL (open in new tab)
- "View Full Résumé" link at the bottom opens `/resume.pdf` in a new tab
- **Company logos were intentionally removed — do not reintroduce them**

### Projects
- **Source:** `lib/data/projects.ts`
- 8 projects; rendered as a two-column grid (`sm:grid-cols-2`)
- **Do not replace the grid with a stacked list without explicit approval**
- Card content order: title → description → overview (layman-friendly) → achievement bullets → tech tags

### Skills
- **Source:** `lib/data/skills.ts`
- 5 categories; purely static content
- Rendered as a two-column grid of SkillBadge pills

### Blog
- **Source:** `lib/rss.ts` (fetched at the Server Component level)
- Substack RSS feed: `https://virkhanna.substack.com/feed`
- Up to 6 posts displayed; gracefully falls back to a Substack link if fetch fails
- Section label is "Writing", not "Blog"

---

## Data Editing Map

| What to change | File |
|---|---|
| Experience entries | `lib/data/experience.ts` |
| Projects | `lib/data/projects.ts` |
| Skills | `lib/data/skills.ts` |
| About section copy | `components/sections/About.tsx` |
| Site metadata / SEO / OG | `app/layout.tsx` |
| Footer copy | `app/page.tsx` |
| Resume file | `public/resume.pdf` |
| Global styles / CSS tokens | `app/globals.css` |
| Tailwind tokens | `tailwind.config.ts` |
| Blog RSS source URL | `lib/rss.ts` |
| Remote image hosts | `next.config.mjs` |

---

## Visual Design System

### Color Palette

Defined in both `tailwind.config.ts` (as Tailwind tokens) and `app/globals.css` (as CSS custom properties).

| Token | Hex | Intent |
|---|---|---|
| `navy` | `#0a192f` | Page background |
| `navy-light` | `#112240` | Card hover background |
| `navy-lighter` | `#233554` | Borders, separators |
| `slate` | `#8892b0` | Body / supporting text |
| `light-slate` | `#a8b2d8` | Secondary text |
| `lightest-slate` | `#ccd6f6` | Headings, emphasized text |
| `white` | `#e6f1ff` | Strongest text |
| `teal` | `#64ffda` | Accent: hovers, active nav, focus rings |

**The design works because it stays disciplined.** Do not introduce new accent colors.

### Typography

- **Sans (Inter):** body text, headings, card content
- **Mono (Fira Code):** dates, category labels, section metadata, code elements
- Custom easing throughout: `cubic-bezier(0.25, 0.46, 0.45, 0.94)` (defined as `ease-custom-ease` in Tailwind)

---

## Motion Guidelines

See `ANIMATIONS.md` for the full animation reference.

Key rules:
- All Framer Motion animations must respect `useReducedMotion()` — every animated component already does this
- Motion should feel smooth and premium, not noisy or distracting
- Do not add animation layers without a clear UX reason
- Do not remove existing reduced-motion gating

---

## UX/Content Preferences

- **No em dashes** in site copy unless explicitly requested
- **Surgical edits only** — do not redesign sections, reorder content, or change the split layout without approval
- **Resume links** open in a new tab (never force-download)
- **Experience cards** link to the company page
- **No company logos** — intentionally removed, do not re-add
- **Projects stay in the 2-column grid** — do not convert to a stacked list
- **Section order is fixed** — About, Experience, Projects, Skills, Blog — do not reorder

---

## External Integrations

| Integration | How |
|---|---|
| Substack | RSS fetch in `lib/rss.ts`, 1-hour ISR revalidation |
| Netlify | `netlify.toml` with `@netlify/plugin-nextjs`, Node 20 |
| next/image | Substack cover images; remote patterns in `next.config.mjs` |
| Google Fonts | Inter + Fira Code via `next/font/google` |

**No analytics, no contact form, no database, no API routes.** This is a static+ISR site.

---

## Verification Workflow

After any meaningful change:

1. `npm run lint` — always
2. `npm run build` — if layout, data flow, or runtime behavior changed
3. If dev server seems broken, check for a stale `next dev` process before assuming the code is at fault

---

## Relationship to Other Docs

| File | Purpose |
|---|---|
| `README.md` | Human quickstart — setup, scripts, deployment |
| `AGENTS.md` | Agent handbook — architecture, conventions, guardrails |
| `FEATURES.md` | Complete feature reference — every component and what it does |
| `ANIMATIONS.md` | Full animation catalog — every effect, mechanism, trigger, duration |
| `OVERVIEW.md` | High-level project summary — for quick orientation |

Update `AGENTS.md` when architecture, layout conventions, or editing preferences change.
