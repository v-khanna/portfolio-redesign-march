'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function AmbientBackground() {
  const prefersReducedMotion = useReducedMotion()

  const upperBlob = prefersReducedMotion
    ? {}
    : {
        x: [0, 20, 0],
        y: [0, 15, 0],
      }

  const lowerBlob = prefersReducedMotion
    ? {}
    : {
        x: [0, -15, 0],
        y: [0, -20, 0],
      }

  return (
    <div
      className="lg:hidden fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Upper-right teal blob */}
      <motion.div
        className="absolute -top-32 -right-32 w-[50vw] h-[50vw] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(100,255,218,0.07) 0%, rgba(100,255,218,0) 70%)',
        }}
        animate={upperBlob}
        transition={
          prefersReducedMotion
            ? {}
            : { duration: 10, repeat: Infinity, ease: 'easeInOut' }
        }
      />

      {/* Lower-left deep teal blob */}
      <motion.div
        className="absolute -bottom-40 -left-32 w-[60vw] h-[60vw] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(15,75,80,0.18) 0%, rgba(15,75,80,0) 70%)',
        }}
        animate={lowerBlob}
        transition={
          prefersReducedMotion
            ? {}
            : { duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }
        }
      />
    </div>
  )
}
