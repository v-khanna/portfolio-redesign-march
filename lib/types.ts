export interface ExperienceEntry {
  company: string
  role: string
  period: string
  location: string
  overview: string
  achievements: string[]
  companyUrl: string
  type: 'internship' | 'leadership'
}

export interface ProjectEntry {
  title: string
  description: string
  overview: string
  tags: string[]
  achievements: string[]
  githubUrl: string | null
  externalUrl: string | null
}

export interface SkillCategory {
  label: string
  skills: string[]
}

export interface BlogPost {
  title: string
  url: string
  date: string
  excerpt: string
  coverImage: string | null
}
