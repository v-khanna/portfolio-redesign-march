'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import type { BlogPost } from '@/lib/types'

interface BlogCardProps {
  post: BlogPost
}

function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  } catch {
    return dateStr
  }
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <motion.a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-lg border border-navy-lighter overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={{
        rest: { y: 0 },
        hover: {
          y: -3,
          borderColor: '#233554',
          backgroundColor: '#112240',
          boxShadow: '0 16px 32px rgba(0,0,0,0.3)',
        },
      }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {/* Cover image with parallax tilt on hover */}
      {post.coverImage && (
        <div className="relative h-36 overflow-hidden bg-navy-light" style={{ perspective: 800 }}>
          <motion.div
            className="relative h-full w-full"
            variants={{
              rest: { rotateX: 0, scale: 1 },
              hover: { rotateX: 2, scale: 1.05 },
            }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </motion.div>
        </div>
      )}

      <div className="flex flex-col flex-grow p-4">
        <p className="text-xs font-mono text-slate mb-2">{formatDate(post.date)}</p>
        <h3 className="text-lightest-slate text-sm font-semibold leading-snug mb-2 group-hover:text-teal transition-colors duration-200 flex items-start gap-1">
          <span className="flex-grow">{post.title}</span>
          <ArrowUpRight
            size={14}
            className="flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 text-teal"
          />
        </h3>
        <p className="text-xs text-slate leading-relaxed">{post.excerpt}</p>
      </div>
    </motion.a>
  )
}
