'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Mail, Github, Linkedin, FileText } from 'lucide-react'
import { useActiveSectionValue } from '@/hooks/useActiveSection'

const NAV_ITEMS = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#blog', label: 'Blog' },
]

function SubstackIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
    </svg>
  )
}

export function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const activeSection = useActiveSectionValue()

  const handleNavClick = () => setIsOpen(false)

  return (
    <>
      {/* Sticky header */}
      <header className="lg:hidden sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-navy/95 backdrop-blur-sm border-b border-navy-lighter">
        <a href="#about" className="text-lightest-slate font-bold text-lg">
          VK
        </a>
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          className="text-slate hover:text-teal transition-colors duration-200 focus-visible:outline-none focus-visible:text-teal"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {/* Full-screen nav overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 z-40 bg-navy flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            <nav className="flex flex-col items-center gap-6">
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={handleNavClick}
                  className={`text-2xl font-bold tracking-wide transition-colors duration-200 ${
                    activeSection === item.href.slice(1)
                      ? 'text-teal'
                      : 'text-lightest-slate hover:text-teal'
                  }`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>

            {/* Social links */}
            <motion.div
              className="flex items-center gap-4 text-slate"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <a href="mailto:vkhanna@ucdavis.edu" aria-label="Email" className="hover:text-teal transition-colors duration-200">
                <Mail size={20} strokeWidth={1.5} />
              </a>
              <a href="https://github.com/v-khanna" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-teal transition-colors duration-200">
                <Github size={20} strokeWidth={1.5} />
              </a>
              <a href="https://www.linkedin.com/in/virkhanna" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-teal transition-colors duration-200">
                <Linkedin size={20} strokeWidth={1.5} />
              </a>
              <a href="https://virkhanna.substack.com" target="_blank" rel="noopener noreferrer" aria-label="Substack" className="hover:text-teal transition-colors duration-200">
                <SubstackIcon />
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Resume"
                className="hover:text-teal transition-colors duration-200"
              >
                <FileText size={20} strokeWidth={1.5} />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
