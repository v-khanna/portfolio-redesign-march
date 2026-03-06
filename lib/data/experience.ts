import type { ExperienceEntry } from '@/lib/types'

export const experience: ExperienceEntry[] = [
  {
    company: 'Blendid AI',
    role: 'Technical Support Product Engineer',
    period: 'June 2025 – October 2025',
    location: 'Sunnyvale, California',
    companyUrl: 'https://www.blendid.com',
    logoUrl: '/logos/blendid.png',
    type: 'internship',
    overview:
      'Built automation tools for a robotics food company — handling refunds, inventory alerts, and machine health monitoring across 15 kiosk locations.',
    achievements: [
      'Owned end-to-end product launch of automated refund flows, slashing ticket resolution latency 72% for 15 sites',
      'Orchestrated B2B inventory alerting platform, driving cross-functional ops alignment for 99% recipe availability',
      'Defined core system health metrics and launched predictive fault features, cutting operational false alarms 20%',
    ],
  },
  {
    company: 'Everise',
    role: 'Forward Deployed Engineer',
    period: 'June 2024 – December 2024',
    location: 'Plantation, Florida',
    companyUrl: 'https://www.everise.com',
    logoUrl: '/logos/everise.png',
    type: 'internship',
    overview:
      'Deployed AI voice agents in call centers across 4 countries, building self-service tools that dramatically reduced hold times and boosted automated resolutions.',
    achievements: [
      'Spearheaded global voice AI product rollout, driving cross-center adoption to boost automated resolutions 70%',
      'Championed enterprise UX overhaul by launching a self-serve IVR product, reducing hold times 70% in 4 countries',
      'Directed global infrastructure scaling for B2B enterprise clients, guaranteeing 99.9% SLA uptime for AI products',
    ],
  },
  {
    company: 'CK Birla Group · Healthcare & IVF',
    role: 'Product Engineer',
    period: 'June 2023 – December 2023',
    location: 'Gurugram, Haryana',
    companyUrl: 'https://www.ckbirla.com',
    logoUrl: '/logos/ckbirla.png',
    type: 'internship',
    overview:
      'Built an internal AI chatbot that could answer employee questions by reading company documents, and sped up the backend APIs powering it.',
    achievements: [
      'Integrated LLM chatbots via Langchain and Flask, optimizing internal Slack-based question answering workflows',
      'Engineered PDF data extraction pipelines for iKites.ai, enabling company-wide automated QA system capabilities',
      'Minimized employee query API latency by 25% through the strategic optimization of Flask and Node.js backends',
    ],
  },
  {
    company: 'Machine Learning Student Network',
    role: 'Tech Director, Founding Member',
    period: 'March 2024 – Present',
    location: 'Davis, California',
    companyUrl: 'https://mlsn.ucdavis.edu',
    logoUrl: '/logos/mlsn.png',
    type: 'leadership',
    overview:
      'Founded and grew a 50-member ML club at UC Davis, mentoring student teams through building and deploying real machine learning projects.',
    achievements: [
      'Mentored 50 members and 6 junior developers as Tech Director, scaling the Machine Learning Student Network',
      'Guided 5-person student cohorts from product ideation to full deployment of ML systems via end-to-end CI/CD',
      'Achieved 90%+ test accuracy for real-time ASL recognizers via MediaPipe hand tracking and MobileNetV2 models',
    ],
  },
]
