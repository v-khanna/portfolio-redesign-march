import type { ExperienceEntry } from '@/lib/types'

export const experience: ExperienceEntry[] = [
  {
    company: 'Nudge AI',
    role: 'Software Engineer, AI',
    period: 'January 2026 – Present',
    location: 'San Francisco, California',
    companyUrl: 'https://getnudgeai.com/',
    type: 'internship',
    overview:
      'Building production AI receptionists for healthcare clinics, handling real-time voice interactions with sub-500ms latency and HIPAA-compliant patient intake.',
    achievements: [
      'Productionized AI receptionist over LiveKit & ElevenLabs at sub-500ms end-to-end latency with barge-in handling',
      'Wired LangGraph tool-calling agents with guardrails and MCP servers for HIPAA-aware patient intake workflows',
      'Instrumented Braintrust eval pipelines with trajectory tests and tool-call accuracy checks for agent reliability',
    ],
  },
  {
    company: 'Blendid AI',
    role: 'Technical Support Engineer',
    period: 'June 2025 – October 2025',
    location: 'Sunnyvale, California',
    companyUrl: 'https://www.blendid.com',
    type: 'internship',
    overview:
      'Built automation tools for a robotics food company, handling refunds, inventory alerts, and machine health monitoring across 15 kiosk locations.',
    achievements: [
      'Owned end-to-end product launch of automated refund flows, slashing ticket resolution latency 72% for 15 sites',
      'Orchestrated B2B inventory alerting platform, driving cross-functional ops alignment for 99% recipe availability',
      'Defined core system health metrics and launched predictive fault features, slashing operational false alarms 20%',
    ],
  },
  {
    company: 'Everise',
    role: 'Software Engineer, Voice AI',
    period: 'June 2024 – December 2024',
    location: 'Plantation, Florida',
    companyUrl: 'https://weareeverise.com/',
    type: 'internship',
    overview:
      'Deployed Retell AI voice agents across 4 global IT support centers, authoring prompt and tool-calling logic for live knowledge base retrieval.',
    achievements: [
      'Rolled out Retell AI voice agents across 4 global IT support centers, automating 70% of internal call resolutions',
      'Authored prompt and tool-calling logic for IT support agents, wiring internal knowledge bases for live retrieval',
      'Tuned voice agent reliability with low-latency targets and iterative prompt loops across 4 country deployments',
    ],
  },
  {
    company: 'CK Birla Group · Healthcare & IVF',
    role: 'Software Engineer, AI',
    period: 'June 2023 – December 2023',
    location: 'Gurugram, Haryana',
    companyUrl: 'https://birlafertility.com/',
    type: 'internship',
    overview:
      'Built an internal AI chatbot that could answer employee questions by reading company documents, and sped up the backend APIs powering it.',
    achievements: [
      'Integrated LLM-powered chatbots via LangChain and Flask for internal Slack-based question answering workflows',
      'Curated PDF text datasets for iKites.ai to enable efficient company-wide automated question answering systems',
      'Minimized API latency by 25% for employee queries by optimizing Flask and Node backends with data extraction',
    ],
  },
  {
    company: 'Machine Learning Student Network',
    role: 'Tech Director, Founding Member',
    period: 'March 2024 – Present',
    location: 'Davis, California',
    companyUrl: 'https://www.linkedin.com/company/mlsn-davis/posts/?feedView=all',
    type: 'leadership',
    overview:
      'Founded and grew a 50-member ML club at UC Davis, mentoring student teams through building and deploying real machine learning projects.',
    achievements: [
      'Founded UC Davis ML Student Network, scaling to 50 members and mentoring 6 juniors on end-to-end ML builds',
      'Guided 5-person student cohorts from ideation to complete deployment of ML systems with end-to-end CI/CD pipelines',
      'Trained real-time ASL recognizers via MediaPipe and MobileNetV2 to 90%+ accuracy on automated evaluations',
    ],
  },
]
