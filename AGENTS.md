# AGENTS.md

This file is the primary repo-level context doc for AI agents working in `PortfolioRedesignMarch`.

Use this as the first-stop project handbook before reading individual files. It does not replace code inspection when a change is detailed, but it should prevent re-deriving the overall architecture, design system, and editing preferences from scratch every session.

For human-oriented setup and quickstart instructions, also read `README.md`. `README.md` is the concise project overview; `AGENTS.md` is the deeper implementation and editing guide.

## Project Identity

This repo is a single-page personal portfolio for Vir Khanna. It is built as a polished, editorial-style landing page rather than a multi-page app. The visual tone is dark, minimal, technical, and motion-forward, with Brittany Chiang-style influence in the left/right split layout.

The site is meant to feel:

- clean and premium
- minimal rather than crowded
- motion-enhanced but still readable
- technical and modern, not playful
- content-first, with strong typography and restrained accents

## Core Stack

- Next.js 14 App Router
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- `fast-xml-parser` for the blog RSS feed
- `lucide-react` for icons
- `clsx` and `tailwind-merge` for class utilities

## Version Guidance

- Keep React on `18.2.x` with this repo's Next 14 setup.
- This project previously hit runtime and dev-server issues with React `18.3.x`, including invalid hook call behavior.
- If dependencies are updated later, verify both `npm run lint` and `npm run build`, and sanity-check local dev mode.

## App Structure

### Top-Level Flow

- `app/layout.tsx`
  - defines metadata, Open Graph/Twitter metadata, and fonts
  - loads `globals.css`
  - applies the dark global body styling

- `app/page.tsx`
  - fetches Substack blog posts server-side with `getBlogPosts()`
  - wraps the page in `ActiveSectionProvider`
  - renders the page in this order:
    1. `MobileHeader`
    2. `LeftPanel`
    3. main content column
    4. `About`
    5. `Experience`
    6. `Projects`
    7. `Skills`
    8. `Blog`
    9. footer

### Important Folders

- `app/`
  - entrypoint, layout, global styling
- `components/layout/`
  - desktop left column and mobile navigation
- `components/sections/`
  - top-level page sections
- `components/cards/`
  - reusable content presentation for experience, projects, and blog
- `components/effects/`
  - animation wrappers and decorative effects
- `components/providers/`
  - active-section context provider
- `hooks/`
  - active section tracking, spotlight behavior, reduced-motion helpers
- `lib/data/`
  - static data for experience, projects, and skills
- `lib/rss.ts`
  - Substack feed parsing and fallback behavior
- `public/`
  - static assets like `profile.jpg`, `resume.pdf`, and favicon

## Layout System

### Desktop Layout

The desktop experience is a split layout:

- Left side:
  - fixed sidebar
  - roughly `45%` width
  - intro text, nav, social links
  - decorative spotlight cursor effect

- Right side:
  - scrollable main content column
  - offset by `lg:ml-[45%]`
  - constrained to `lg:max-w-[55%]`
  - sections stack vertically with generous spacing

This split layout is a defining part of the site. Do not redesign it casually.

### Mobile Layout

On mobile:

- the fixed desktop sidebar is hidden
- `MobileHeader` becomes the main nav shell
- a sticky top header stays visible
- tapping the menu opens a full-screen overlay navigation

The mobile layout should remain simple and legible. Avoid introducing heavy UI chrome unless explicitly requested.

## Section-by-Section Notes

### About

- Mostly inline copy in `components/sections/About.tsx`
- Tone should stay polished, personal, and concise
- Avoid overloading this section with too much text

### Experience

- Data source: `lib/data/experience.ts`
- Rendering: `components/sections/Experience.tsx` and `components/cards/ExperienceCard.tsx`
- Experience cards are clickable and should open the company page in a new tab
- Resume link at the bottom should open in a new tab, not force-download

Important preference:

- Company logos were intentionally removed from both the UI and the repo. Do not reintroduce them unless the user explicitly asks.

### Projects

- Data source: `lib/data/projects.ts`
- Rendering: `components/sections/Projects.tsx` and `components/cards/ProjectCard.tsx`
- The layout should stay as a two-column grid on larger screens
- This two-column presentation is preferred and should not be replaced with a stacked list unless explicitly requested

Project card content order should remain:

1. title
2. technical description
3. layman-friendly overview
4. achievement bullets
5. tech tags

Additional project-content preference:

- Use resume-aligned language when editing project bullets or descriptions
- Keep the layman-friendly overview above the detailed bullets in the visual flow

### Skills

- Data source: `lib/data/skills.ts`
- Purely static content
- Should remain easy to scan and not overly stylized

### Blog

- Content comes from `lib/rss.ts`
- Feed source is Vir Khanna's Substack RSS feed
- UI should tolerate feed failure gracefully
- If the RSS fetch breaks, the page should still render without collapsing the section

## Visual Design System

### Color Palette

Core colors are defined in both `app/globals.css` and `tailwind.config.ts`.

- `navy`: `#0a192f`
- `navy-light`: `#112240`
- `navy-lighter`: `#233554`
- `slate`: `#8892b0`
- `light-slate`: `#a8b2d8`
- `lightest-slate`: `#ccd6f6`
- `white`: `#e6f1ff`
- `teal`: `#64ffda`

### Color Intent

- `navy` is the page background
- `navy-light` is the main hover-panel/card background
- `navy-lighter` is used for borders and structural separators
- `slate` and `light-slate` are body/supporting text tones
- `lightest-slate` and `white` are for headings and emphasized text
- `teal` is the accent color for hover states, active nav cues, and focus affordances

Do not introduce random accent colors unless the user explicitly asks. The design works because it stays disciplined.

### Typography

- Primary sans font: Inter
- Monospace accent font: Fira Code
- Sans is used for body and major headings
- Mono is used selectively for metadata, dates, and small technical accents

### Motion

- Framer Motion is used throughout for:
  - section reveal animations
  - card hover interactions
  - mobile menu transitions
  - nav/interactivity polish
  - text/effect components like the scramble name animation

Motion should feel smooth and premium, not noisy.

- Preserve reduced-motion support
- Avoid adding excessive animation layers unless requested

## Current UX/Content Preferences

- No em dashes in site copy unless explicitly requested
- Keep edits surgical; do not redesign sections without approval
- Preserve the existing visual feel unless the user clearly asks for a redesign
- Resume links should open in a new tab
- Experience cards should link to the company page
- Do not re-add company logos
- Keep projects in the side-by-side grid layout

## Important Components and Responsibilities

- `components/layout/LeftPanel.tsx`
  - desktop intro panel
  - active nav state
  - social links
  - resume icon link
  - spotlight cursor effect

- `components/layout/MobileHeader.tsx`
  - mobile sticky header
  - full-screen overlay menu
  - mobile social/resume links

- `components/providers/ActiveSectionProvider.tsx`
  - stores current active section

- `hooks/useActiveSection.ts`
  - tracks which section is currently in view
  - powers nav highlighting

- `components/effects/AnimatedSection.tsx`
  - section entrance animation wrapper

- `components/effects/ScrambleText.tsx`
  - animated name reveal in the left panel

- `components/effects/SpotlightCursor.tsx`
  - ambient cursor-following glow on desktop

## Data Editing Map

When a user asks to update content:

- experience entries: `lib/data/experience.ts`
- projects: `lib/data/projects.ts`
- skills: `lib/data/skills.ts`
- about copy: `components/sections/About.tsx`
- site metadata/title/SEO: `app/layout.tsx`
- footer copy: `app/page.tsx`
- resume file: `public/resume.pdf`

## External Integrations

### Substack

- RSS feed source: `https://virkhanna.substack.com/feed`
- `lib/rss.ts` parses feed entries and extracts excerpts/images
- `next.config.mjs` allows the remote image hosts needed for Substack imagery

### Netlify

- `netlify.toml` is present
- Node version is pinned there
- Project is structured for Netlify deployment with the Next plugin

## Editing Guardrails

- Read `README.md` for quickstart/setup context before changing tooling or deployment behavior
- Use this file for overall architectural context and project conventions
- Avoid broad refactors unless the user asks
- Avoid changing the section order unless explicitly requested
- Avoid changing the overall left-panel/right-content composition without approval
- If a change affects content only, prefer editing the data files instead of reshaping component structure
- If a change affects visuals, try to preserve spacing, typography hierarchy, and the established palette

## Verification Workflow

After meaningful changes:

1. run `npm run lint`
2. run `npm run build` if layout, runtime behavior, or data flow changed
3. if local dev seems broken, check for stale `next dev` processes before assuming code is bad

## Relationship To README

- `README.md` should stay concise and human-friendly
- `AGENTS.md` should stay detailed and agent-oriented
- If architecture, layout conventions, or editing preferences change, update `AGENTS.md`
- If setup, scripts, or deployment instructions change, update `README.md`
