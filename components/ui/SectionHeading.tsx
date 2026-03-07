'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useActiveSectionValue } from '@/hooks/useActiveSection'

interface SectionHeadingProps {
  children: React.ReactNode
  className?: string
  sectionId?: string
}

export function SectionHeading({ children, className, sectionId }: SectionHeadingProps) {
  const ref = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const activeSection = useActiveSectionValue()
  const isActive = sectionId ? activeSection === sectionId : false

  return (
    <motion.h2
      ref={ref}
      className={cn(
        'flex items-center gap-3 text-sm font-bold uppercase tracking-widest',
        'text-lightest-slate mb-8',
        'sticky top-0 z-10 py-4 -mx-6 px-6 lg:static lg:mx-0 lg:px-0 lg:py-0',
        'bg-navy/90 backdrop-blur-sm lg:bg-transparent lg:backdrop-blur-none',
        className
      )}
      initial={prefersReducedMotion ? false : { opacity: 0, x: -20 }}
      animate={
        prefersReducedMotion
          ? {}
          : isInView
          ? { opacity: 1, x: 0 }
          : { opacity: 0, x: -20 }
      }
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <span
        className={cn(
          'font-mono transition-colors duration-300',
          'lg:text-teal',
          isActive ? 'text-white' : 'text-teal'
        )}
      >
        {children}
      </span>
    </motion.h2>
  )
}
