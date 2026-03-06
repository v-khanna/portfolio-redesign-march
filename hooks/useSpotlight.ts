'use client'

import { useState, useEffect, useRef } from 'react'

interface SpotlightPosition {
  x: number
  y: number
}

interface UseSpotlightReturn {
  position: SpotlightPosition
  isVisible: boolean
}

export function useSpotlight(): UseSpotlightReturn {
  const [position, setPosition] = useState<SpotlightPosition>({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const rafRef = useRef<number>(0)
  const targetRef = useRef<SpotlightPosition>({ x: 0, y: 0 })
  const currentRef = useRef<SpotlightPosition>({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY }
      if (!isVisible) setIsVisible(true)
    }

    const handleLeave = () => setIsVisible(false)

    const animate = () => {
      const dx = targetRef.current.x - currentRef.current.x
      const dy = targetRef.current.y - currentRef.current.y

      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        currentRef.current = {
          x: currentRef.current.x + dx * 0.08,
          y: currentRef.current.y + dy * 0.08,
        }
        setPosition({ ...currentRef.current })
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    window.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseleave', handleLeave)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseleave', handleLeave)
    }
  }, [isVisible])

  return { position, isVisible }
}
