'use client'

import { useSpotlight } from '@/hooks/useSpotlight'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function SpotlightCursor() {
  const { position, isVisible } = useSpotlight()
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) return null

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 hidden lg:block transition-opacity duration-300"
      style={{
        opacity: isVisible ? 1 : 0,
        background: `radial-gradient(150px at ${position.x}px ${position.y}px, rgba(100, 255, 218, 0.04), transparent 80%)`,
      }}
    />
  )
}
