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
      <motion.span
        className="block h-px origin-left"
        animate={{
          width: isActive ? 48 : 16,
          backgroundColor: isActive ? '#64ffda' : '#8892b0',
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      />
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
