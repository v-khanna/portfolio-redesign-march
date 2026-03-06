'use client'

import { useState, useEffect, useContext } from 'react'
import { ActiveSectionContext } from '@/components/providers/ActiveSectionProvider'

const SECTION_IDS = ['about', 'experience', 'projects', 'skills', 'blog']

export function useActiveSection(): string {
  const { activeSection, setActiveSection } = useContext(ActiveSectionContext)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (intersecting.length > 0) {
          setActiveSection(intersecting[0].target.id)
        }
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0,
      }
    )

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [setActiveSection])

  return activeSection
}

export function useActiveSectionValue(): string {
  const { activeSection } = useContext(ActiveSectionContext)
  return activeSection
}
