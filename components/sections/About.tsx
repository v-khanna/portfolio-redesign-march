'use client'

import { AnimatedSection, AnimatedChild } from '@/components/effects/AnimatedSection'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function About() {
  return (
    <section id="about" className="mb-32 scroll-mt-2 lg:scroll-mt-0">
      <SectionHeading>About</SectionHeading>
      <AnimatedSection>
        <AnimatedChild>
          <p className="text-slate leading-relaxed mb-4">
            I recently graduated from{' '}
            <a
              href="https://www.ucdavis.edu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lightest-slate font-medium hover:text-teal transition-colors duration-200"
            >
              UC Davis
            </a>{' '}
            with a B.S. in Computational Cognitive Science (Data &amp; AI) and a minor
            in Philosophy focused on AI Ethics, with a{' '}
            <span className="text-lightest-slate font-medium">3.8 GPA</span>. I&apos;m
            currently building AI receptionists at{' '}
            <a
              href="https://getnudgeai.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lightest-slate font-medium hover:text-teal transition-colors duration-200"
            >
              Nudge AI
            </a>{' '}
            in San Francisco, working on real-time voice agents for healthcare.
          </p>
        </AnimatedChild>
        <AnimatedChild>
          <p className="text-slate leading-relaxed mb-4">
            Previously, I deployed voice AI agents across 4 countries at{' '}
            <span className="text-lightest-slate font-medium">Everise</span>, built
            automated refund flows and predictive fault systems at{' '}
            <span className="text-lightest-slate font-medium">Blendid AI</span>, and
            integrated LLM-powered chatbots at the{' '}
            <span className="text-lightest-slate font-medium">CK Birla Group</span>.
          </p>
        </AnimatedChild>
        <AnimatedChild>
          <p className="text-slate leading-relaxed mb-4">
            Outside of engineering, I founded the{' '}
            <a
              href="https://www.linkedin.com/company/mlsn-davis/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lightest-slate font-medium hover:text-teal transition-colors duration-200"
            >
              Machine Learning Student Network
            </a>{' '}
            at UC Davis, a community I scaled to 50+ members, where I mentor students
            through end-to-end ML project development and deployment.
          </p>
        </AnimatedChild>
        <AnimatedChild>
          <p className="text-slate leading-relaxed">
            When I&apos;m not coding, I&apos;m probably deep in a{' '}
            <span className="text-lightest-slate">chess endgame</span>, hiking somewhere with
            terrible cell service, or writing about AI on{' '}
            <a
              href="https://virkhanna.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lightest-slate font-medium hover:text-teal transition-colors duration-200"
            >
              Substack
            </a>
            .{' '}
            <span className="text-teal/80">Currently open to full-time opportunities in AI/ML engineering.</span>
          </p>
        </AnimatedChild>
      </AnimatedSection>
    </section>
  )
}
