'use client'

import { AnimatedSection, AnimatedChild } from '@/components/effects/AnimatedSection'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ExperienceCard } from '@/components/cards/ExperienceCard'
import { experience } from '@/lib/data/experience'
import { ArrowRight } from 'lucide-react'

export function Experience() {
  return (
    <section id="experience" className="relative isolate mb-24 scroll-mt-2 lg:scroll-mt-0">
      <SectionHeading sectionId="experience">Experience</SectionHeading>
      <AnimatedSection className="flex flex-col gap-2">
        {experience.map((entry) => (
          <AnimatedChild key={entry.company}>
            <ExperienceCard entry={entry} />
          </AnimatedChild>
        ))}

        <AnimatedChild>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 mt-4 text-sm font-semibold text-lightest-slate hover:text-teal transition-colors duration-200 focus-visible:text-teal focus-visible:outline-none"
          >
            View Full Résumé
            <ArrowRight
              size={14}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </a>
        </AnimatedChild>
      </AnimatedSection>
    </section>
  )
}
