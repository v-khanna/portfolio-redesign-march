'use client'

import { motion } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'
import { SkillBadge } from '@/components/ui/SkillBadge'
import type { ProjectEntry } from '@/lib/types'

interface ProjectCardProps {
  project: ProjectEntry
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      className="group relative flex flex-col p-5 rounded-lg border border-navy-lighter cursor-default"
      whileHover={{
        y: -4,
        borderColor: '#233554',
        backgroundColor: '#112240',
        boxShadow: '0 20px 40px rgba(0,0,0,0.35)',
      }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <h3 className="text-lightest-slate font-semibold text-sm leading-snug group-hover:text-teal transition-colors duration-200">
          {project.title}
        </h3>
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

      {/* Overview (layman's terms) */}
      <p className="text-sm text-light-slate leading-relaxed mb-2 italic">{project.overview}</p>

      {/* Technical description */}
      <p className="text-xs text-slate leading-relaxed mb-4 flex-grow">{project.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <SkillBadge key={tag} skill={tag} />
        ))}
      </div>
    </motion.div>
  )
}
