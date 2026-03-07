'use client'

import { motion } from 'framer-motion'
import { User, Briefcase, Code2, Wrench, PenLine } from 'lucide-react'
import { useActiveSectionValue } from '@/hooks/useActiveSection'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const NAV_ITEMS = [
  { href: '#about', label: 'About', icon: User },
  { href: '#experience', label: 'Experience', icon: Briefcase },
  { href: '#projects', label: 'Projects', icon: Code2 },
  { href: '#skills', label: 'Skills', icon: Wrench },
  { href: '#blog', label: 'Blog', icon: PenLine },
] as const

export function MobileTabBar() {
  const activeSection = useActiveSectionValue()
  const prefersReducedMotion = useReducedMotion()

  return (
    <nav
      aria-label="Primary"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] bg-navy border-t border-navy-lighter"
      style={{
        paddingBottom: 'env(safe-area-inset-bottom)',
        WebkitTransform: 'translate3d(0,0,0)',
      }}
    >
      <div className="relative grid grid-cols-5 items-stretch">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.href.slice(1)

          return (
            <a
              key={item.href}
              href={item.href}
              className="relative flex flex-col items-center justify-center gap-1 py-3 text-[10px] font-semibold tracking-wide text-slate transition-colors duration-200 focus-visible:outline-none focus-visible:text-teal"
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon size={18} strokeWidth={1.6} className={isActive ? 'text-teal' : undefined} />
              <span className={isActive ? 'text-teal' : undefined}>{item.label}</span>

              {isActive && !prefersReducedMotion && (
                <motion.div
                  layoutId="mobileTabActive"
                  className="absolute left-3 right-3 top-0 h-0.5 bg-teal rounded-full"
                  transition={{ type: 'spring', stiffness: 520, damping: 40, mass: 0.6 }}
                />
              )}

              {isActive && prefersReducedMotion && (
                <div className="absolute left-3 right-3 top-0 h-0.5 bg-teal rounded-full" />
              )}
            </a>
          )
        })}
      </div>
    </nav>
  )
}

