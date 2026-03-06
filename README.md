# PortfolioRedesignMarch

A personal portfolio site built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

For a detailed repo handbook aimed at AI agents and future maintenance work, see `AGENTS.md`.

## Overview

This project is a single-page portfolio for Vir Khanna. It includes:

- A responsive desktop sidebar and mobile navigation
- Animated section reveals and interactive UI effects
- Experience, projects, skills, and about sections
- A blog section powered by the Substack RSS feed
- Deployment configuration for Netlify

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- fast-xml-parser

## Project Structure

- `app/`: App Router layout, page entrypoint, and global styles
- `components/layout/`: Desktop and mobile navigation/layout pieces
- `components/sections/`: Main portfolio content sections
- `components/cards/`: Reusable cards for experience, projects, and blog posts
- `components/effects/`: UI animation and motion helpers
- `components/providers/`: Shared React context providers
- `hooks/`: Custom hooks for active section state, reduced motion, and spotlight behavior
- `lib/data/`: Static portfolio content for experience, projects, and skills
- `lib/rss.ts`: Substack RSS fetching and parsing logic
- `public/`: Static assets including the profile image, resume, and favicon

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Notes

- Blog posts are fetched from `https://virkhanna.substack.com/feed`.
- Production builds require network access for Google Fonts and the RSS fetch during build/runtime behavior.
- Static assets referenced by the site live in `public/`.

## Deployment

This project includes `netlify.toml` and is configured for Netlify deployment with the Next.js plugin.
