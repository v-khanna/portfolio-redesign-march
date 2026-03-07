'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface SectionHeadingProps {
  children: React.ReactNode
  className?: string
}

export function SectionHeading({ children, className }: SectionHeadingProps) {
  const ref = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.h2
      ref={ref}
      className={cn(
        'flex items-center gap-3 text-sm font-bold uppercase tracking-widest',
        'text-lightest-slate mb-8',
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
      <span className={cn('font-mono text-teal', className)}>
        {children}
      </span>
    </motion.h2>
  )
}
