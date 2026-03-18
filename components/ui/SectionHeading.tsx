'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface SectionHeadingProps {
  children: React.ReactNode
  className?: string
}

const WIPE_EASE = [0.65, 0, 0.35, 1] as [number, number, number, number]

export function SectionHeading({ children, className }: SectionHeadingProps) {
  const ref = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.h2
      ref={ref}
      className={cn(
        'flex items-center gap-4 text-sm font-bold uppercase tracking-widest',
        'text-lightest-slate mb-10',
        className
      )}
    >
      {/* Text wipes in from left via clip-path */}
      <motion.span
        className="font-mono text-teal whitespace-nowrap"
        initial={prefersReducedMotion ? false : { opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
        animate={
          prefersReducedMotion
            ? {}
            : isInView
            ? { opacity: 1, clipPath: 'inset(0 0% 0 0)' }
            : { opacity: 0, clipPath: 'inset(0 100% 0 0)' }
        }
        transition={{ duration: 0.5, ease: WIPE_EASE }}
      >
        {children}
      </motion.span>

      {/* Trailing horizontal rule draws in after text */}
      <motion.span
        className="flex-grow h-px bg-navy-lighter"
        aria-hidden="true"
        initial={prefersReducedMotion ? false : { scaleX: 0 }}
        animate={
          prefersReducedMotion
            ? {}
            : isInView
            ? { scaleX: 1 }
            : { scaleX: 0 }
        }
        style={{ originX: 0 }}
        transition={{ duration: 0.5, ease: WIPE_EASE, delay: 0.15 }}
      />
    </motion.h2>
  )
}
