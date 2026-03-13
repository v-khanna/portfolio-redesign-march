'use client'

import { useReducedMotion } from '@/hooks/useReducedMotion'
import { FlickeringGrid } from '@/components/magicui/flickering-grid'

export function FlickeringGridBackground() {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) return null

  return (
    <FlickeringGrid
      className="fixed inset-0 z-0"
      color="rgb(100, 255, 218)"
      maxOpacity={0.03}
      squareSize={5}
      gridGap={1}
      flickerChance={0.5}
      aria-hidden="true"
    />
  )
}
