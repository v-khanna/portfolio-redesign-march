'use client'

import { Mail, Github, Linkedin, FileText } from 'lucide-react'
import { NavLink } from '@/components/ui/NavLink'
import { SocialLink } from '@/components/ui/SocialLink'
import { ScrambleText } from '@/components/effects/ScrambleText'
import { SpotlightCursor } from '@/components/effects/SpotlightCursor'
import { useActiveSectionValue } from '@/hooks/useActiveSection'
import { useActiveSection } from '@/hooks/useActiveSection'
import { motion } from 'framer-motion'

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

const panelVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export function LeftPanel() {
  // This hook both reads and sets active section
  useActiveSection()
  const activeSection = useActiveSectionValue()

  return (
    <>
      <SpotlightCursor />
      <aside className="hidden lg:flex lg:fixed lg:top-0 lg:left-0 lg:h-screen lg:w-[45%] lg:max-w-[560px] lg:flex-col lg:justify-between lg:px-16 lg:py-24 xl:px-24">
        <motion.div
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-8"
        >
          {/* Name & bio */}
          <motion.div variants={itemVariants}>
            <h1 className="text-4xl font-bold text-white tracking-tight mb-4 xl:text-5xl">
              <ScrambleText text="Vir Khanna" delay={300} />
            </h1>
            <p className="text-sm text-slate leading-relaxed max-w-xs">
              I build systems that think, automate, and scale
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.nav variants={itemVariants} aria-label="Portfolio sections">
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
        </motion.div>

        {/* Social links */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
          className="flex items-center gap-1"
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
