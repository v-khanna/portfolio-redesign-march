'use client'

import { AnimatedSection, AnimatedChild } from '@/components/effects/AnimatedSection'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ProjectCard } from '@/components/cards/ProjectCard'
import { projects } from '@/lib/data/projects'

export function Projects() {
  return (
    <section id="projects" className="mb-24 scroll-mt-2 lg:scroll-mt-0">
      <SectionHeading>Projects</SectionHeading>
      <AnimatedSection className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projects.map((project) => (
          <AnimatedChild key={project.title}>
            <ProjectCard project={project} />
          </AnimatedChild>
        ))}
      </AnimatedSection>
    </section>
  )
}
