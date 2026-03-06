'use client'

import { AnimatedSection, AnimatedChild } from '@/components/effects/AnimatedSection'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SkillBadge } from '@/components/ui/SkillBadge'
import { skills } from '@/lib/data/skills'

export function Skills() {
  return (
    <section id="skills" className="relative isolate mb-24 scroll-mt-2 lg:scroll-mt-0">
      <SectionHeading sectionId="skills">Skills</SectionHeading>
      <AnimatedSection className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {Object.entries(skills).map(([category, items]) => (
          <AnimatedChild key={category}>
            <div>
              <h3 className="text-xs font-mono text-white uppercase tracking-widest mb-3">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <SkillBadge key={skill} skill={skill} />
                ))}
              </div>
            </div>
          </AnimatedChild>
        ))}
      </AnimatedSection>
    </section>
  )
}
