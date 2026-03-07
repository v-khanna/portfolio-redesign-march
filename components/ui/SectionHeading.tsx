'use client'

import { useRef, useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  children: React.ReactNode
  className?: string
  sectionId?: string
}

export function SectionHeading({ children, className }: SectionHeadingProps) {
  const sentinelRef = useRef<HTMLDivElement>(null)
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
      <h2
        className={cn(
          'flex items-center gap-3 text-sm font-bold uppercase tracking-widest',
          'text-lightest-slate mb-8',
          'sticky top-0 z-20 py-5 -mx-6 px-6 w-screen lg:static lg:mx-0 lg:px-0 lg:py-0 lg:z-auto lg:w-auto',
          'bg-navy/75 backdrop-blur lg:bg-transparent lg:backdrop-blur-none',
          className
        )}
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
      </h2>
    </>
  )
}
