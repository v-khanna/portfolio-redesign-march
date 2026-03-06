'use client'

import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import type { ExperienceEntry } from '@/lib/types'

interface ExperienceCardProps {
  entry: ExperienceEntry
}

export function ExperienceCard({ entry }: ExperienceCardProps) {
  return (
    <motion.a
      href={entry.companyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-2 sm:gap-6 rounded-lg p-5 cursor-pointer focus-visible:outline-none border border-transparent hover:border-teal/[0.08] transition-[border-color] duration-200"
      whileHover={{ backgroundColor: '#112240', boxShadow: '0 4px 20px rgba(0,0,0,0.25)' }}
      transition={{ duration: 0.2 }}
      aria-label={`${entry.company} company site`}
    >
      {/* Teal left border on hover */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-0.5 rounded-l-lg origin-top"
        initial={{ scaleY: 0, backgroundColor: '#64ffda' }}
        whileHover={{ scaleY: 1 }}
        transition={{ duration: 0.2 }}
      />

      {/* Period */}
      <div className="mt-1">
        <div className="text-xs font-mono text-slate uppercase tracking-wider whitespace-nowrap">
          {entry.period.split(' – ')[0]}
          <br className="hidden sm:block" />
          <span className="sm:hidden"> – </span>
          {entry.period.split(' – ')[1]}
        </div>
      </div>

      {/* Content */}
      <div>
        <h3 className="text-lightest-slate font-semibold text-sm leading-tight mb-0.5">
          <span className="inline-flex items-center gap-1.5 group-hover:text-teal transition-colors duration-200">
            <span>{entry.role}</span>
            <span className="text-slate">·</span>
            <span>{entry.company}</span>
            <ExternalLink
              size={12}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0"
            />
          </span>
        </h3>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-slate">{entry.location}</span>
          {entry.type === 'internship' && (
            <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-medium tracking-wide text-light-slate/75">
              Internship
            </span>
          )}
        </div>
        <p className="text-sm text-light-slate leading-relaxed mb-3 italic">{entry.overview}</p>

        <ul className="space-y-2">
          {entry.achievements.map((achievement, i) => (
            <li key={i} className="flex gap-2 text-sm text-slate leading-relaxed">
              <span className="text-teal/40 mt-1.5 flex-shrink-0 text-[8px]">▸</span>
              <span>{achievement}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.a>
  )
}
