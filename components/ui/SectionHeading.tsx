'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface SectionHeadingProps {
  children: React.ReactNode
  className?: string
  sectionId?: string
}

export function SectionHeading({ children, className }: SectionHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const [isStuck, setIsStuck] = useState(false)

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return
    const observer = new IntersectionObserver(
      ([entry]) => setIsStuck(!entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div ref={sentinelRef} className="h-px -mt-px" aria-hidden="true" />
      <motion.h2
        ref={ref}
        className={cn(
          'flex items-center gap-3 text-sm font-bold uppercase tracking-widest',
          'text-lightest-slate mb-8',
          // Mobile: sticky heading that covers safe-area (notch/Dynamic Island)
          // -top-[env()] + pt-[env()] extends bg above into the safe area
          'sticky z-30 -mx-6 px-6 pb-4 lg:static lg:mx-0 lg:px-0 lg:py-0 lg:z-auto',
          'bg-navy lg:bg-transparent',
          className
        )}
        style={{
          top: 'calc(-1 * env(safe-area-inset-top, 0px))',
          paddingTop: 'calc(1rem + env(safe-area-inset-top, 0px))',
        }}
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
            isStuck ? 'text-white' : 'text-teal'
          )}
        >
          {children}
        </span>
      </motion.h2>
    </>
  )
}
