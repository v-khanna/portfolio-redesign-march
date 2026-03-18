# FEATURES.md

Complete feature reference for `PortfolioRedesignMarch`. Documents every section, component, and behavior on the site. For animation specifics, see `ANIMATIONS.md`. For architecture and editing rules, see `AGENTS.md`.

---

## Site Overview

A single-page personal portfolio for **Vir Khanna** deployed at `virkhanna.com`. One route (`/`), no sub-pages. The page is split into a fixed left panel (desktop) and a scrollable right column containing five content sections.

---

## Layout

### Desktop Layout (`lg:` and above)

Two-column split layout:

- **Left panel (fixed, ~45% width):** Identity, navigation, social links. Stays pinned to the viewport while the right column scrolls.
- **Right column (scrollable, ~55% width):** All content sections stacked vertically. Offset with `lg:ml-[45%]`.

### Mobile Layout (below `lg:`)

- Left panel is hidden.
- `MobileHero` renders at the top with the same name, tagline, and social links.
- `MobileHeader` is present in the codebase but currently returns `null` (stub).
- Content sections are full-width, stacked vertically.

---

## Background Effects

### Flickering Grid (Desktop only)

- Component: `components/effects/FlickeringGridBackground.tsx` wrapping `components/magicui/flickering-grid.tsx`
- Visible only on `lg:` breakpoints (`hidden lg:block`)
- Full-screen fixed canvas of teal squares (5px, 1px gap, 50% flicker chance) at 3% max opacity
- Nearly invisible — adds subtle texture and depth without distracting
- Pauses automatically when off-screen; retina-display aware
- Disabled entirely if `prefers-reduced-motion` is set

### Ambient Background (Mobile only)

- Component: `components/effects/AmbientBackground.tsx`
- Visible only below `lg:` (`lg:hidden`)
- Two animated radial gradient blobs: upper-right teal (7% opacity), lower-left deep teal (18% opacity)
- Slow looping drift animations (10s and 12s cycles)
- Compensates for the absent flickering grid on mobile
- Disabled if `prefers-reduced-motion` is set

### Grain Texture Overlay

- Defined in `app/globals.css` via `body::before`
- Fixed pseudo-element at `z-index: 9999`, covers entire viewport
- SVG fractalNoise filter at 4% opacity — adds analog depth
- Pointer-events: none; does not interfere with interactions
- Static, not animated

### Spotlight Cursor (Desktop only)

- Component: `components/effects/SpotlightCursor.tsx`
- Visible only on `lg:` (`hidden lg:block`)
- Full-screen fixed `div` at `z-index: 30`
- 600px teal radial gradient (8% opacity) that lazily follows the mouse via RAF-based lerping
- Fades in when cursor enters the window, fades out when it leaves
- Adds an ambient "flashlight" effect across the page
- Returns `null` if `prefers-reduced-motion` is set

---

## Left Panel (Desktop)

Component: `components/layout/LeftPanel.tsx`

### Name

- Displays "Vir Khanna" using the `ScrambleText` component
- On load: text decodes from random characters to the real name (see `ANIMATIONS.md`)

### Tagline

- Static text: "I build systems that think, automate, and scale"

### Navigation

- Five links: About, Experience, Projects, Skills, Blog
- Active section is highlighted using a spring-animated teal indicator bar (`layoutId="nav-indicator"`)
- Active section is tracked via `useActiveSection` (IntersectionObserver-based)
- Inactive links have a line that expands on hover
- Entire panel entrance is staggered with Framer Motion on mount

### Social Links

- Email (`mailto:`)
- GitHub (`github.com/v-khanna`)
- LinkedIn (`linkedin.com/in/virkhanna`)
- Substack (custom inline SVG icon)
- Resume (links to `/resume.pdf`, opens in new tab)
- Each icon lifts and turns teal on hover

### Spotlight Cursor

- `SpotlightCursor` is rendered inside `LeftPanel` (fixed, so it covers the full page)

---

## Mobile Hero

Component: `components/layout/MobileHero.tsx`

- Mirrors the LeftPanel content for mobile screens
- Contains: name (`ScrambleText`), tagline, and the same social link row
- Fades and slides in from below on mount
- Respects `prefers-reduced-motion`

---

## Content Sections

All sections use `AnimatedSection` + `AnimatedChild` for scroll-triggered staggered entrance animations.

### About (`id="about"`)

Component: `components/sections/About.tsx`

- Static copy written directly in the component (not a data file)
- Four paragraphs:
  1. Education: UC Davis, B.S. Computational Cognitive Science (Data & AI track), Philosophy minor (AI Ethics focus), 3.8 GPA
  2. Work history: Everise (AI voice agents, call centers), Blendid AI (robotics, kiosk automation)
  3. Co-founded Machine Learning Student Network (MLSN) at UC Davis — 50+ members
  4. Personal interests: chess, hiking, writing on Substack
- Inline links to UC Davis, MLSN LinkedIn, and Substack

### Experience (`id="experience"`)

Component: `components/sections/Experience.tsx`
Card: `components/cards/ExperienceCard.tsx`
Data: `lib/data/experience.ts`

Four entries (rendered in order):

| Company | Role | Period | Type |
|---|---|---|---|
| Blendid AI | Technical Support Product Engineer | June – Oct 2025, Sunnyvale CA | Internship |
| Everise | Forward Deployed Engineer | June – Dec 2024, Plantation FL | Internship |
| CK Birla Group | Product Engineer | June – Dec 2023, Gurugram | Internship |
| Machine Learning Student Network | Tech Director / Founding Member | March 2024 – Sept 2025, Davis CA | Leadership |

**Card layout:**
- Left column: date period in Fira Code mono (desktop: stacked, mobile: inline)
- Right column: role, company name, location, optional "Internship" badge, italic overview paragraph, achievement bullets with teal `▸` markers
- Entire card is a clickable link to the company URL (opens in new tab)
- On hover: navy-light background, drop shadow, animated teal left border, ExternalLink icon appears

**Footer:** "View Full Résumé" link (opens `/resume.pdf` in new tab) with an animated arrow icon

### Projects (`id="projects"`)

Component: `components/sections/Projects.tsx`
Card: `components/cards/ProjectCard.tsx`
Data: `lib/data/projects.ts`

Eight projects displayed in a 2-column grid (1 column on mobile):

| Project | Description |
|---|---|
| Enterprise KG-RAG w/ Multi-Agent Layer | Neo4j knowledge graph RAG for financial PDFs, 5-agent CrewAI pipelines |
| Bullseye: AI Financial News Analysis | GPT-4 article analysis, Chrome extension, 200+ sources, SVG market charts |
| Echo Journal: AI Voice Journaling iOS App | SwiftUI + FastAPI + WebSocket + PostgreSQL + OpenAI Realtime API |
| Relatient Appointment Pathway | Healthcare voice agent, prompt-injection defences, zero-shot entity capture |
| Deep Q-Learning: Atari Pong | Convolutional DQN in PyTorch, epsilon-greedy, target networks, CUDA |
| ChatCKB: CK Birla AI Chatbot | LangChain + Flask + GPT-4, PDF ingestion pipeline |
| Real-Time ASL Recognition | MobileNetV2 + MediaPipe, live webcam, quantised for edge inference |
| Connect4 Championship | Minimax with alpha-beta pruning, competed against 250+ agents |

**Card layout:**
- Title row with optional GitHub and external link icons
- Italic overview paragraph (layman-friendly)
- Achievement bullets with teal `▸` markers
- Tech tag badges at the bottom (white-tinted variant, not teal)
- On hover: navy-light background, drop shadow, animated teal left border

### Skills (`id="skills"`)

Component: `components/sections/Skills.tsx`
Data: `lib/data/skills.ts`

Five categories displayed in a 2-column grid:

| Category | Sample Skills |
|---|---|
| Product & Analytics | Agile/Scrum, A/B Testing, Figma, Tableau, Jira |
| Languages | Python, SQL, TypeScript, Rust, Go, C/C++, Bash |
| ML & Data Science | LLMs, LangChain, TensorFlow, Knowledge Graphs, NLP, OpenCV |
| Technologies | React, FastAPI, Neo4j, PostgreSQL, Redis, AWS, GCP, Azure |
| Tools & Infrastructure | Docker, Kubernetes, GitHub Actions, Terraform, WebSockets |

Each skill renders as a `SkillBadge` pill (teal-tinted, glows on hover).

### Blog / Writing (`id="blog"`)

Component: `components/sections/Blog.tsx`
Data: `lib/rss.ts` (server-fetched)

- Section label: "Writing" with tagline "Minds to machines, and everything in between"
- Fetches up to 6 posts from `https://virkhanna.substack.com/feed` at build time (ISR, 1-hour revalidation)
- Posts displayed in a 2-column grid (1 column on mobile)
- If RSS fetch fails: section shows a fallback link directly to Substack (does not crash or hide the section)
- Footer: "View all posts on Substack" link with animated diagonal arrow

**BlogCard layout:**
- Optional cover image (scales up 5% on hover)
- Formatted date in Fira Code mono
- Post title with ArrowUpRight icon (appears on hover)
- Excerpt text (stripped HTML, 160 chars max)
- Entire card is a link to the Substack post (opens in new tab)
- On hover: lifts 3px, navy-light background, drop shadow, border brightens

---

## Footer

Rendered inline at the bottom of `app/page.tsx`.

Credits the technologies and people that shaped the site:
- Built with Next.js, Tailwind CSS, Framer Motion, deployed on Netlify
- Fonts: Inter, Fira Code
- Inspired by Brittany Chiang's portfolio

---

## Navigation System

### Active Section Tracking

- `ActiveSectionProvider` (`components/providers/ActiveSectionProvider.tsx`) holds the current section in React context (default: `'about'`).
- `useActiveSection` (`hooks/useActiveSection.ts`) registers an `IntersectionObserver` on all five section elements with `rootMargin: '-20% 0px -60% 0px'`. When a section enters the active band, it calls `setActiveSection`.
- `LeftPanel` calls `useActiveSection()` to set up the observer, and `useActiveSectionValue()` to read the current value and pass `isActive` to each `NavLink`.

### NavLink Behavior

- Active: a teal horizontal bar (48px) animates between nav items via Framer Motion `layoutId="nav-indicator"` (shared spring transition).
- Inactive: a 16px slate bar extends to 32px on hover.
- Both behaviors are smooth and hardware-accelerated.

---

## SEO / Metadata

Defined in `app/layout.tsx`:

- Title: Vir Khanna's portfolio name
- Description: professional summary
- Keywords: relevant tech/ML terms
- Open Graph: title, description, image (`/profile.jpg`), url (`https://virkhanna.com`)
- Twitter Card: `summary_large_image`
- Robots: index, follow
- `metadataBase`: `https://virkhanna.com`
- Viewport: `viewportFit: 'cover'` for iOS notch support

---

## Server-Side Features

### Substack RSS Integration (`lib/rss.ts`)

- Fetches `https://virkhanna.substack.com/feed` as a server-side operation
- Uses `fast-xml-parser` to parse RSS XML
- ISR cache: `next: { revalidate: 3600 }` (refreshes once per hour)
- Returns up to 6 `BlogPost` objects
- Cover image extraction waterfall: `media:content` → `enclosure` → first `<img>` in content HTML
- Excerpt: strips HTML, truncates to 160 chars at word boundary
- Returns `[]` on any error (graceful degradation)

### ISR

`getBlogPosts()` is called in the async `page.tsx` Server Component. Netlify caches the result for 1 hour, then regenerates on the next request after expiry. No other server-side data fetching exists.

---

## Accessibility

- `prefers-reduced-motion`: Every animated component reads `useReducedMotion()` and disables or skips animations accordingly. See `ANIMATIONS.md` for per-component details.
- `ScrambleText` always sets the correct `aria-label` on the element regardless of animation state.
- `focus-visible` outlines use a 2px solid teal ring.
- `::selection` is styled teal for visibility.
- All external links include `target="_blank" rel="noopener noreferrer"`.

---

## TypeScript Interfaces (`lib/types.ts`)

```ts
interface ExperienceEntry {
  company: string
  role: string
  period: string
  location: string
  overview: string
  achievements: string[]
  companyUrl: string
  type: 'internship' | 'leadership'
}

interface ProjectEntry {
  title: string
  description: string
  overview: string
  tags: string[]
  achievements: string[]
  githubUrl: string | null
  externalUrl: string | null
}

interface SkillCategory {
  label: string
  skills: string[]
}

interface BlogPost {
  title: string
  url: string
  date: string
  excerpt: string
  coverImage: string | null
}
```

---

## Utility

### `cn()` (`lib/utils.ts`)

```ts
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

Used throughout the codebase for conditional, conflict-free Tailwind class merging.

---

## Public Assets

| File | Purpose |
|---|---|
| `public/profile.jpg` | OG/Twitter card image |
| `public/resume.pdf` | Resume (linked from nav and Experience section) |
| `app/icon.png` | Favicon (Next.js App Router auto-detected) |
