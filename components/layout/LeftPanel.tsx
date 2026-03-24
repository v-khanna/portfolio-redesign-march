'use client'

import { Mail, Github, Linkedin, FileText } from 'lucide-react'
import { NavLink } from '@/components/ui/NavLink'
import { SocialLink } from '@/components/ui/SocialLink'
import { ScrambleText } from '@/components/effects/ScrambleText'
import { SpotlightCursor } from '@/components/effects/SpotlightCursor'
import { useActiveSectionValue } from '@/hooks/useActiveSection'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

const RotatingEarth = dynamic(() => import('@/components/ui/wireframe-dotted-globe'), {
  ssr: false,
  loading: () => <div className="w-[300px] h-[300px]" />,
})

// Substack SVG icon (not in lucide-react)
function SubstackIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
    </svg>
  )
}

const NAV_ITEMS = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#blog', label: 'Blog' },
]

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]

export function LeftPanel() {
  // This hook both reads and sets active section
  useActiveSection()
  const activeSection = useActiveSectionValue()
  const prefersReducedMotion = useReducedMotion()

  return (
    <>
      <SpotlightCursor />
      <aside className="hidden lg:flex lg:fixed lg:top-0 lg:left-0 lg:h-screen lg:w-[45%] lg:max-w-[560px] lg:flex-col lg:justify-between lg:px-16 lg:py-24 xl:px-24 ">
        <div className="flex flex-col gap-8">
          {/* Beat 1: Name */}
          <div>
            <motion.h1
              className="text-4xl font-display font-bold text-white tracking-[-0.01em] mb-4 xl:text-[3.25rem] xl:leading-[1.1]"
              initial={prefersReducedMotion ? false : { opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <ScrambleText text="Vir Khanna" delay={400} />
            </motion.h1>

            {/* Beat 2: Bio (clip-path wipe reveal) */}
            <motion.p
              className="text-base text-light-slate leading-relaxed max-w-sm"
              initial={prefersReducedMotion ? false : { opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
              animate={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
              transition={{ duration: 0.6, ease: EASE, delay: prefersReducedMotion ? 0 : 0.8 }}
            >
              I build systems that think, automate, and scale
            </motion.p>
          </div>

          {/* Beat 3: Navigation */}
          <motion.nav
            aria-label="Portfolio sections"
            initial={prefersReducedMotion ? false : { opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: prefersReducedMotion ? 0 : 1.2 }}
          >
            <div className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  isActive={activeSection === item.href.slice(1)}
                />
              ))}
            </div>
          </motion.nav>
        </div>

        {/* Globe */}
        <motion.div
          className="flex-shrink-0"
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: prefersReducedMotion ? 0 : 1.8 }}
        >
          <RotatingEarth
            width={300}
            height={300}
            interactive={true}
          />
        </motion.div>

        {/* Beat 3b: Social links (last to appear) */}
        <motion.div
          className="flex items-center gap-1"
          initial={prefersReducedMotion ? false : { opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: prefersReducedMotion ? 0 : 1.5 }}
        >
          <SocialLink
            href="mailto:vkhanna@ucdavis.edu"
            icon={Mail}
            label="Email Vir Khanna"
          />
          <SocialLink
            href="https://github.com/v-khanna"
            icon={Github}
            label="GitHub profile"
          />
          <SocialLink
            href="https://www.linkedin.com/in/virkhanna"
            icon={Linkedin}
            label="LinkedIn profile"
          />
          <a
            href="https://virkhanna.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Substack"
            title="Substack"
            className="flex items-center justify-center w-9 h-9 text-slate hover:text-teal hover:-translate-y-1 transition-all duration-200 focus-visible:text-teal focus-visible:outline-none"
          >
            <SubstackIcon size={18} />
          </a>
          <SocialLink
            href="/resume.pdf"
            icon={FileText}
            label="Open resume"
          />
        </motion.div>
      </aside>
    </>
  )
}
