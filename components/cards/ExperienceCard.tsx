'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import type { ExperienceEntry } from '@/lib/types'

interface ExperienceCardProps {
  entry: ExperienceEntry
}

export function ExperienceCard({ entry }: ExperienceCardProps) {
  return (
    <motion.div
      className="group relative grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-2 sm:gap-6 p-5 rounded-lg cursor-default"
      whileHover={{ backgroundColor: '#112240' }}
      transition={{ duration: 0.2 }}
    >
      {/* Teal left border on hover */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-0.5 rounded-l-lg origin-top"
        initial={{ scaleY: 0, backgroundColor: '#64ffda' }}
        whileHover={{ scaleY: 1 }}
        transition={{ duration: 0.2 }}
      />

      {/* Period + logo */}
      <div className="flex flex-col items-start gap-3 mt-1">
        <div className="text-xs font-mono text-slate uppercase tracking-wider whitespace-nowrap">
          {entry.period.split(' – ')[0]}
          <br className="hidden sm:block" />
          <span className="sm:hidden"> – </span>
          {entry.period.split(' – ')[1]}
        </div>
        {entry.logoUrl && (
          <Image
            src={entry.logoUrl}
            alt={`${entry.company} logo`}
            width={32}
            height={32}
            className="hidden sm:block rounded opacity-60 group-hover:opacity-100 transition-opacity duration-200"
          />
        )}
      </div>

      {/* Content */}
      <div>
        <h3 className="text-lightest-slate font-semibold text-sm leading-tight mb-0.5">
          {entry.companyUrl ? (
            <a
              href={entry.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-1.5 hover:text-teal transition-colors duration-200 focus-visible:text-teal focus-visible:outline-none"
            >
              <span>{entry.role}</span>
              <span className="text-slate">·</span>
              <span>{entry.company}</span>
              <ExternalLink
                size={12}
                className="opacity-0 group-hover/link:opacity-100 transition-opacity duration-200 flex-shrink-0"
              />
            </a>
          ) : (
            <span>
              {entry.role} · {entry.company}
            </span>
          )}
        </h3>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-slate">{entry.location}</span>
          {entry.type === 'internship' && (
            <span className="text-[10px] font-mono text-slate/70 border border-navy-lighter rounded px-1.5 py-0.5 leading-none">
              internship
            </span>
          )}
        </div>
        <p className="text-sm text-light-slate leading-relaxed mb-3 italic">{entry.overview}</p>

        <ul className="space-y-2">
          {entry.achievements.map((achievement, i) => (
            <li key={i} className="flex gap-2 text-sm text-slate leading-relaxed">
              <span className="text-teal mt-1.5 flex-shrink-0 text-[8px]">▸</span>
              <span>{achievement}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}
