import { getBlogPosts } from '@/lib/rss'
import { ActiveSectionProvider } from '@/components/providers/ActiveSectionProvider'
import { LeftPanel } from '@/components/layout/LeftPanel'
import { MobileHero } from '@/components/layout/MobileHero'
import { AmbientBackground } from '@/components/effects/AmbientBackground'
import { FlickeringGridBackground } from '@/components/effects/FlickeringGridBackground'
import { About } from '@/components/sections/About'
import { Experience } from '@/components/sections/Experience'
import { Projects } from '@/components/sections/Projects'
import { Skills } from '@/components/sections/Skills'
import { Blog } from '@/components/sections/Blog'

export default async function Page() {
  const blogPosts = await getBlogPosts()

  return (
    <ActiveSectionProvider>
      <FlickeringGridBackground />
      <AmbientBackground />
      <MobileHero />
      <div className="relative min-h-screen">
        <LeftPanel />

        {/* Right scrollable content */}
        <main className="lg:ml-[45%] lg:max-w-[55%] px-6 py-16 lg:px-16 lg:py-24 xl:px-24">
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Blog posts={blogPosts} />

          {/* Footer */}
          <footer className="pt-8 pb-4 border-t border-navy-lighter">
            <p className="text-xs text-slate leading-relaxed">
              Designed and built by Vir. Coded in Visual Studio Code and built with{' '}
              <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="text-light-slate hover:text-teal transition-colors duration-200">Next.js</a>,{' '}
              <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" className="text-light-slate hover:text-teal transition-colors duration-200">Tailwind CSS</a>, and{' '}
              <a href="https://www.framer.com/motion" target="_blank" rel="noopener noreferrer" className="text-light-slate hover:text-teal transition-colors duration-200">Framer Motion</a>.
              Deployed with{' '}
              <a href="https://netlify.com" target="_blank" rel="noopener noreferrer" className="text-light-slate hover:text-teal transition-colors duration-200">Netlify</a>.
              All text is set in the{' '}
              <a href="https://fonts.google.com/specimen/Inter" target="_blank" rel="noopener noreferrer" className="text-light-slate hover:text-teal transition-colors duration-200">Inter</a> and{' '}
              <a href="https://fonts.google.com/specimen/Fira+Code" target="_blank" rel="noopener noreferrer" className="text-light-slate hover:text-teal transition-colors duration-200">Fira Code</a> typefaces.
              Inspired by{' '}
              <a href="https://brittanychiang.com" target="_blank" rel="noopener noreferrer" className="text-light-slate hover:text-teal transition-colors duration-200">Brittany Chiang</a>.
            </p>
          </footer>
        </main>
      </div>
    </ActiveSectionProvider>
  )
}
