'use client'

import { useState, useEffect, useRef } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&'

interface ScrambleTextProps {
  text: string
  className?: string
  delay?: number
}

function randomChar(): string {
  return CHARS[Math.floor(Math.random() * CHARS.length)]
}

export function ScrambleText({ text, className, delay = 400 }: ScrambleTextProps) {
  const prefersReducedMotion = useReducedMotion()
  const [displayText, setDisplayText] = useState(prefersReducedMotion ? text : '')
  const frameRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const resolvedRef = useRef(0)
  const iterRef = useRef(0)

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayText(text)
      return
    }

    // Initial scramble before resolving
    const startTimeout = setTimeout(() => {
      frameRef.current = setInterval(() => {
        iterRef.current++

        // Every 3 iterations, lock in the next character
        if (iterRef.current % 3 === 0 && resolvedRef.current < text.length) {
          resolvedRef.current++
        }

        const resolved = text.slice(0, resolvedRef.current)
        const scrambled = Array.from(
          { length: text.length - resolvedRef.current },
          () => randomChar()
        ).join('')

        setDisplayText(resolved + scrambled)

        if (resolvedRef.current >= text.length) {
          clearInterval(frameRef.current!)
          setDisplayText(text)
        }
      }, 40)
    }, delay)

    return () => {
      clearTimeout(startTimeout)
      if (frameRef.current) clearInterval(frameRef.current)
    }
  }, [text, delay, prefersReducedMotion])

  return (
    <span className={className} aria-label={text}>
      {displayText}
    </span>
  )
}
