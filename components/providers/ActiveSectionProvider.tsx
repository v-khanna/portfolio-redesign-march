'use client'

import { createContext, useState } from 'react'

interface ActiveSectionContextType {
  activeSection: string
  setActiveSection: (section: string) => void
}

export const ActiveSectionContext = createContext<ActiveSectionContextType>({
  activeSection: 'about',
  setActiveSection: () => {},
})

export function ActiveSectionProvider({ children }: { children: React.ReactNode }) {
  const [activeSection, setActiveSection] = useState('about')

  return (
    <ActiveSectionContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </ActiveSectionContext.Provider>
  )
}
