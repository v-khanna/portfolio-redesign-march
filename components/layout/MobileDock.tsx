'use client'

import { User, Briefcase, FolderOpen, Layers, PenTool } from 'lucide-react'
import { motion } from 'framer-motion'
import { useActiveSectionValue } from '@/hooks/useActiveSection'

const NAV_ITEMS = [
  { id: 'about', icon: User },
  { id: 'experience', icon: Briefcase },
  { id: 'projects', icon: FolderOpen },
  { id: 'skills', icon: Layers },
  { id: 'blog', icon: PenTool },
]

export function MobileDock() {
  const activeSection = useActiveSectionValue()

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 lg:hidden"
    >
      <div
        className="flex items-center gap-7 px-6 py-2.5 rounded-[14px] backdrop-blur-[16px]"
        style={{
          background: 'rgba(10, 25, 47, 0.8)',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3)',
          paddingBottom: 'calc(0.625rem + env(safe-area-inset-bottom, 0px))',
        }}
      >
        {NAV_ITEMS.map(({ id, icon: Icon }) => (
          <button
            key={id}
            onClick={() => {
              const el = document.getElementById(id)
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
            aria-label={id}
            className="relative p-1"
          >
            <motion.div
              animate={{ color: activeSection === id ? '#64ffda' : '#8892b0' }}
              transition={{ duration: 0.2 }}
            >
              <Icon size={20} strokeWidth={1.8} />
            </motion.div>
          </button>
        ))}
      </div>
    </nav>
  )
}
