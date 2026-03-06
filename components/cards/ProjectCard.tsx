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
    <motion.article
      className="group relative p-5 rounded-lg cursor-default"
      whileHover={{
        backgroundColor: '#112240',
      }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-0.5 rounded-l-lg origin-top"
        initial={{ scaleY: 0, backgroundColor: '#64ffda' }}
        whileHover={{ scaleY: 1 }}
        transition={{ duration: 0.2 }}
      />

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
            <span className="mt-1.5 flex-shrink-0 text-[8px] text-teal">▸</span>
            <span>{achievement}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <SkillBadge key={tag} skill={tag} className="bg-white/5 text-light-slate border-white/10 hover:bg-white/10 hover:border-white/15 hover:text-lightest-slate" />
        ))}
      </div>
    </motion.article>
  )
}
