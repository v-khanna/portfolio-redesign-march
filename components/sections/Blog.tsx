import { SectionHeading } from '@/components/ui/SectionHeading'
import { BlogCard } from '@/components/cards/BlogCard'
import { ArrowUpRight } from 'lucide-react'
import type { BlogPost } from '@/lib/types'

interface BlogProps {
  posts: BlogPost[]
}

export function Blog({ posts }: BlogProps) {
  return (
    <section id="blog" className="mb-24 scroll-mt-20 lg:scroll-mt-0">
      <SectionHeading>Writing</SectionHeading>

      {posts.length === 0 ? (
        <div className="text-slate text-sm">
          <p className="mb-3">Posts are temporarily unavailable.</p>
          <a
            href="https://virkhanna.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-lightest-slate font-medium hover:text-teal transition-colors duration-200"
          >
            Read on Substack
            <ArrowUpRight size={14} />
          </a>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {posts.map((post) => (
              <BlogCard key={post.url} post={post} />
            ))}
          </div>
          <a
            href="https://virkhanna.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-lightest-slate hover:text-teal transition-colors duration-200"
          >
            View all posts on Substack
            <ArrowUpRight
              size={14}
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </>
      )}
    </section>
  )
}
