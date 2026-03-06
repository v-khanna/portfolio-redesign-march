'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface NavLinkProps {
  href: string
  label: string
  isActive: boolean
  onClick?: () => void
}

export function NavLink({ href, label, isActive, onClick }: NavLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="group flex items-center gap-4 py-2 focus-visible:outline-none"
    >
      {/* Animated indicator line */}
      {isActive ? (
        <motion.span
          layoutId="nav-indicator"
          className="block h-px w-12 bg-teal"
          transition={{ type: 'spring', stiffness: 450, damping: 38 }}
        />
      ) : (
        <motion.span
          className="block h-px bg-slate/50 group-hover:bg-slate"
          animate={{ width: 16 }}
          whileHover={{ width: 32 }}
          transition={{ duration: 0.2 }}
        />
      )}

      {/* Label */}
      <span
        className={cn(
          'text-[11px] font-bold tracking-[0.15em] uppercase transition-colors duration-200',
          isActive ? 'text-lightest-slate' : 'text-slate group-hover:text-lightest-slate'
        )}
      >
        {label}
      </span>
    </a>
  )
}
