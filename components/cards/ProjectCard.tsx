'use client'

import { useRef, useState, type MouseEvent } from 'react'
import { motion } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'
import { SkillBadge } from '@/components/ui/SkillBadge'
import type { ProjectEntry } from '@/lib/types'

interface ProjectCardProps {
  project: ProjectEntry
}

export function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  function handleMouseMove(e: MouseEvent) {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="group relative p-5 rounded-lg cursor-default border border-transparent hover:border-teal/[0.08] transition-[border-color] duration-200 overflow-hidden"
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={{
        rest: { backgroundColor: 'rgba(0,0,0,0)' },
        hover: { backgroundColor: '#112240', boxShadow: '0 4px 20px rgba(0,0,0,0.25)' },
      }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {/* Cursor-following radial gradient — living surface effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, rgba(100,255,218,0.06), transparent 60%)`,
        }}
      />

      {/* Top border accent on hover — horizontal draw from center */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-teal/40 origin-center"
        variants={{
          rest: { scaleX: 0 },
          hover: { scaleX: 1 },
        }}
        transition={{ duration: 0.25 }}
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <h3 className="text-lightest-slate font-semibold text-sm leading-snug group-hover:text-teal transition-colors duration-200">
              {project.title}
            </h3>
            <p className="mt-1 text-xs text-slate leading-relaxed">{project.description}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} GitHub repository`}
                className="text-slate hover:text-teal transition-colors duration-200 focus-visible:text-teal focus-visible:outline-none"
              >
                <Github size={16} strokeWidth={1.5} />
              </a>
            )}
            {project.externalUrl && (
              <a
                href={project.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} external link`}
                className="text-slate hover:text-teal transition-colors duration-200 focus-visible:text-teal focus-visible:outline-none"
              >
                <ExternalLink size={15} strokeWidth={1.5} />
              </a>
            )}
          </div>
        </div>

        <p className="mb-3 text-sm italic text-light-slate leading-relaxed">
          {project.overview}
        </p>

        <ul className="mb-4 space-y-2">
          {project.achievements.map((achievement) => (
            <li key={achievement} className="flex gap-2 text-sm text-slate leading-relaxed">
              <span className="mt-1.5 flex-shrink-0 text-[8px] text-teal/40">▸</span>
              <span>{achievement}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <SkillBadge key={tag} skill={tag} className="bg-white/5 text-light-slate border-white/10 hover:bg-white/10 hover:border-white/15 hover:text-lightest-slate" />
          ))}
        </div>
      </div>
    </motion.article>
  )
}
