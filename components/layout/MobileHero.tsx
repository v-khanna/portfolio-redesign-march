'use client'

import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, FileText } from 'lucide-react'
import { ScrambleText } from '@/components/effects/ScrambleText'
import { SocialLink } from '@/components/ui/SocialLink'
import { useReducedMotion } from '@/hooks/useReducedMotion'

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

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]

export function MobileHero() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="lg:hidden px-6 pt-10 pb-8">
      {/* Beat 1: Name */}
      <motion.h1
        className="text-3xl font-display font-bold text-white tracking-[-0.01em] mb-3"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: EASE }}
      >
        <ScrambleText text="Vir Khanna" delay={200} />
      </motion.h1>

      {/* Beat 2: Bio (clip-path wipe reveal) */}
      <motion.p
        className="text-base text-light-slate leading-relaxed max-w-md mb-5"
        initial={prefersReducedMotion ? false : { opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
        animate={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
        transition={{ duration: 0.6, ease: EASE, delay: prefersReducedMotion ? 0 : 0.5 }}
      >
        I build systems that think, automate, and scale
      </motion.p>

      {/* Beat 3: Social links */}
      <motion.div
        className="flex items-center gap-1"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: prefersReducedMotion ? 0 : 0.8 }}
      >
        <SocialLink href="mailto:vkhanna@ucdavis.edu" icon={Mail} label="Email Vir Khanna" />
        <SocialLink href="https://github.com/v-khanna" icon={Github} label="GitHub profile" />
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
          className="group flex items-center justify-center w-9 h-9 text-slate transition-all duration-200 hover:text-teal hover:-translate-y-1 focus-visible:text-teal focus-visible:outline-none"
        >
          <SubstackIcon size={18} />
        </a>
        <SocialLink href="/resume.pdf" icon={FileText} label="Open resume" />
      </motion.div>
    </section>
  )
}
