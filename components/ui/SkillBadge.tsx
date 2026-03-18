'use client'

import { useRef, type MouseEvent } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface SkillBadgeProps {
  skill: string
  className?: string
}

export function SkillBadge({ skill, className }: SkillBadgeProps) {
  const prefersReducedMotion = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 400, damping: 20 })
  const springY = useSpring(y, { stiffness: 400, damping: 20 })

  function handleMouseMove(e: MouseEvent) {
    if (prefersReducedMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const offsetX = (e.clientX - centerX) * 0.12
    const offsetY = (e.clientY - centerY) * 0.12
    x.set(Math.max(-3, Math.min(3, offsetX)))
    y.set(Math.max(-3, Math.min(3, offsetY)))
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.span
      ref={ref}
      style={prefersReducedMotion ? undefined : { x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium',
        'bg-teal/10 text-teal/70 border border-teal/20',
        'transition-all duration-200 hover:bg-teal/20 hover:border-teal/40 hover:text-teal hover:shadow-[0_0_10px_rgba(100,255,218,0.12)]',
        className
      )}
    >
      {skill}
    </motion.span>
  )
}
