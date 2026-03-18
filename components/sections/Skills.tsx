'use client'

import { motion } from 'framer-motion'
import { AnimatedSection, AnimatedChild } from '@/components/effects/AnimatedSection'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SkillBadge } from '@/components/ui/SkillBadge'
import { skills } from '@/lib/data/skills'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const badgeContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.03 },
  },
}

const badgeVariants = {
  hidden: { scale: 0.85, y: 6 },
  visible: {
    scale: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
}

export function Skills() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section id="skills" className="mb-16 scroll-mt-2 lg:scroll-mt-0">
      <SectionHeading>Skills</SectionHeading>
      <AnimatedSection className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {Object.entries(skills).map(([category, items]) => (
          <AnimatedChild key={category}>
            <div>
              <h3 className="text-xs font-mono text-white uppercase tracking-widest mb-3">
                {category}
              </h3>
              {prefersReducedMotion ? (
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <SkillBadge key={skill} skill={skill} />
                  ))}
                </div>
              ) : (
                <motion.div
                  className="flex flex-wrap gap-2"
                  variants={badgeContainerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                >
                  {items.map((skill) => (
                    <motion.div key={skill} variants={badgeVariants}>
                      <SkillBadge skill={skill} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </AnimatedChild>
        ))}
      </AnimatedSection>
    </section>
  )
}
