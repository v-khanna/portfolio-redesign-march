'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.05,
    },
  },
}

const reducedContainerVariants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
}

export const childVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
}

const mobileChildVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.45,
      ease: 'easeOut',
    },
  },
}

export const reducedChildVariants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
}

function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(true)
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 1024px)')
    setIsMobile(!mql.matches)
    const handler = () => setIsMobile(!mql.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])
  return isMobile
}

export function AnimatedSection({ children, className, delay = 0 }: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const variants = prefersReducedMotion ? reducedContainerVariants : containerVariants

  return (
    <motion.div
      ref={ref}
      className={cn('relative', className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {children}
    </motion.div>
  )
}

export function AnimatedChild({ children, className }: { children: React.ReactNode; className?: string }) {
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useIsMobile()

  const variants = prefersReducedMotion
    ? reducedChildVariants
    : isMobile
      ? mobileChildVariants
      : childVariants

  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  )
}
