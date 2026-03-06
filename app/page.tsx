import { getBlogPosts } from '@/lib/rss'
import { ActiveSectionProvider } from '@/components/providers/ActiveSectionProvider'
import { LeftPanel } from '@/components/layout/LeftPanel'
import { MobileHeader } from '@/components/layout/MobileHeader'
import { MobileHero } from '@/components/layout/MobileHero'
import { MobileTabBar } from '@/components/layout/MobileTabBar'
import { About } from '@/components/sections/About'
import { Experience } from '@/components/sections/Experience'
import { Projects } from '@/components/sections/Projects'
import { Skills } from '@/components/sections/Skills'
import { Blog } from '@/components/sections/Blog'

export default async function Page() {
  const blogPosts = await getBlogPosts()

  return (
    <ActiveSectionProvider>
      <MobileHeader />
      <MobileHero />
      <MobileTabBar />
      <div className="relative min-h-screen">
        <LeftPanel />

        {/* Right scrollable content */}
        <main className="lg:ml-[45%] lg:max-w-[55%] px-6 py-16 pb-mobile-tabbar lg:px-16 lg:py-24 xl:px-24">
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Blog posts={blogPosts} />

          {/* Footer */}
          <footer className="pt-8 pb-4 border-t border-navy-lighter">
            <p className="text-xs text-slate">
              Inspired by Brittany Chiang.
            </p>
          </footer>
        </main>
      </div>
    </ActiveSectionProvider>
  )
}
