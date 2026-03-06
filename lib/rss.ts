import type { BlogPost } from '@/lib/types'
import { XMLParser } from 'fast-xml-parser'

const SUBSTACK_RSS_URL = 'https://virkhanna.substack.com/feed'

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .trim()
}

function extractExcerpt(description: string, maxLength = 160): string {
  const stripped = stripHtml(description)
  if (stripped.length <= maxLength) return stripped
  return stripped.slice(0, maxLength).replace(/\s+\S*$/, '') + '…'
}

function extractCoverImage(item: Record<string, unknown>): string | null {
  // Try media:content
  const mediaContent = item['media:content'] as Record<string, unknown> | undefined
  if (mediaContent?.['@_url']) return mediaContent['@_url'] as string

  // Try enclosure
  const enclosure = item['enclosure'] as Record<string, unknown> | undefined
  if (enclosure?.['@_url']) return enclosure['@_url'] as string

  // Try to extract first img src from content:encoded or description
  const content = (item['content:encoded'] || item['description'] || '') as string
  const imgMatch = content.match(/src="([^"]+\.(jpg|jpeg|png|webp)[^"]*)"/)
  if (imgMatch) return imgMatch[1]

  return null
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch(SUBSTACK_RSS_URL, {
      next: { revalidate: 3600 },
      headers: {
        'User-Agent': 'portfolio-site/1.0',
        Accept: 'application/rss+xml, application/xml, text/xml',
      },
    })

    if (!res.ok) return []

    const xml = await res.text()

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
      allowBooleanAttributes: true,
    })

    const parsed = parser.parse(xml)
    const items = parsed?.rss?.channel?.item

    if (!items) return []

    const itemArray = Array.isArray(items) ? items : [items]

    return itemArray.slice(0, 6).map((item: Record<string, unknown>) => ({
      title: stripHtml(String(item.title || '')),
      url: String(item.link || ''),
      date: String(item.pubDate || ''),
      excerpt: extractExcerpt(String(item.description || item['content:encoded'] || '')),
      coverImage: extractCoverImage(item),
    }))
  } catch {
    return []
  }
}
