import type { ProjectEntry } from '@/lib/types'

export const projects: ProjectEntry[] = [
  // --- Resume projects (in resume order) ---
  {
    title: 'The Modelling Directory',
    description:
      'Production web platform for the modelling industry with multi-role auth, messaging, agency pipelines, and hardened security across 11 Django apps.',
    overview:
      'A full-stack platform where models, agencies, and clients can connect — with secure messaging, application workflows, and proper identity protection.',
    tags: ['Django 6.0', 'PostgreSQL', 'Tailwind CSS', 'Cloudflare R2', 'Render'],
    achievements: [
      'Shipped production web platform with multi-role auth, email verification, and onboarding across 11 Django apps',
      'Engineered messaging system with request/accept/block workflows and agency application pipeline with snapshots',
      'Hardened platform security with CSRF, rate limiting, IDOR protection, PII anonymization, and 255 test cases',
    ],
    githubUrl: null,
    externalUrl: 'https://themodellingdirectory.in/',
  },
  {
    title: 'Enterprise KG-RAG w/ Multi-Agent Layer (Graphiti)',
    description:
      'Enterprise knowledge graph RAG system for financial PDFs with structured entity extraction, graph-backed retrieval, and evidence-bound multi-agent answering.',
    overview:
      'Think of it as a smart filing cabinet for financial documents that maps relationships between companies and dates, then answers questions only with evidence it actually found.',
    tags: ['Neo4j', 'CrewAI', 'Docker', 'React'],
    achievements: [
      'Led enterprise KG-RAG product strategy, utilising Neo4j to extract complex financial entities from PDF data',
      'Enforced AI reliability by designing 5-agent CrewAI pipelines with strict evidence-only JSON output protocols',
      'Deployed Graphiti on Neo4j Aura, leveraging product telemetry and vector indexes for real-time visual graphs',
      'Formalised financial domain modelling, building typed Neo4j edges to capture precise dates in enterprise filings',
    ],
    githubUrl: null,
    externalUrl: null,
  },
  {
    title: 'Bullseye: AI Financial News Analysis Platform',
    description:
      'Real-time financial news analysis platform combining GPT-4 article understanding, Chrome extension workflows, and live market context across 200+ sources.',
    overview:
      'A Chrome extension that reads the financial article you are on, runs it through GPT-4, and gives you a plain-English summary with market charts in one click.',
    tags: ['OpenAI API', 'MySQL', 'Alpha Vantage', 'Node.js', 'React', 'TypeScript'],
    achievements: [
      'Synthesised real-time market analysis product pipelines, integrating GPT-4 APIs to deliver user news insights',
      'Launched Chrome extension product features, triggering seamless LLM analysis across 200+ financial portals',
      'Constructed interactive frontend UX with React and TS, embedding SVG charts for market data comparisons',
    ],
    githubUrl: null,
    externalUrl: null,
  },
  {
    title: 'Echo Journal: AI Voice Journaling iOS App',
    description:
      'AI voice journaling app with realtime transcription, async backend processing, and structured daily reflection generation.',
    overview:
      'You talk to your phone like a voice memo, and it turns that stream of thought into a structured journal entry with AI-generated reflections and insights.',
    tags: ['SwiftUI', 'FastAPI', 'WebSocket', 'PostgreSQL', 'OpenAI API'],
    achievements: [
      'Handled iOS scaling for 100+ concurrent OpenAI Realtime API connections with sub-second audio latency',
      'Supervised backend product architecture via FastAPI and async PostgreSQL to power AI-driven journal synthesis',
      'Prototyped iOS MVP roadmap and conducted local beta testing to validate core AI voice journaling UX workflows',
    ],
    githubUrl: null,
    externalUrl: null,
  },
  {
    title: 'NoAudience',
    description:
      'Local-first desktop media tracker built with Tauri v2 and SvelteKit, storing everything in SQLite with Drizzle ORM — no cloud, no accounts.',
    overview:
      'A desktop app for tracking movies, shows, and books that keeps all your data local on your machine — no sign-ups, no cloud sync, just yours.',
    tags: ['Tauri v2', 'SvelteKit', 'SQLite', 'Drizzle ORM'],
    achievements: [
      'Built local-first desktop app with Tauri v2 and SvelteKit for private media tracking with zero cloud dependencies',
      'Designed SQLite schema with Drizzle ORM for efficient querying across media types with full offline support',
    ],
    githubUrl: 'https://github.com/v-khanna/NoAudienceApps',
    externalUrl: null,
  },
  // --- Notable older projects ---
  {
    title: 'Relatient Appointment Pathway',
    description:
      'Healthcare voice agent for appointment scheduling with prompt-injection defences, entity capture, and reliable multi-turn conversation handling.',
    overview:
      'An AI phone agent that schedules doctor appointments, designed to resist manipulation and reliably handle real conversations.',
    tags: ['Bland AI', 'Prompt Injection', 'Zero-Shot Learning', 'LLM Security'],
    achievements: [
      'Built prompt-guarded voice flows for appointment booking, including zero-shot handling for names, dates of birth, and scheduling intents',
      'Combined phonetic parsing with context-aware prompting to reduce hallucinated transfers and improve captured caller details',
    ],
    githubUrl: null,
    externalUrl: null,
  },
  {
    title: 'Deep Q-Learning: Atari Pong',
    description:
      'Deep reinforcement learning agent for Atari Pong using convolutional Q-networks, replay buffers, and target-network training.',
    overview:
      'I trained an AI to play Pong from raw pixels until it could consistently learn winning behaviour through trial and error.',
    tags: ['PyTorch', 'OpenAI Gym', 'CUDA', 'OpenCV'],
    achievements: [
      'Implemented a convolutional DQN in PyTorch with epsilon-greedy exploration, target networks, and experience replay for stable Atari training',
      'Optimised preprocessing and training with frame stacking, reward clipping, and CUDA-backed batches to improve sample efficiency',
    ],
    githubUrl: 'https://github.com/v-khanna/Deep_Q_Network',
    externalUrl: null,
  },
  {
    title: 'ChatCKB: CK Birla AI Chatbot',
    description:
      'Internal document Q&A assistant built with GPT-4, LangChain, and Flask for answering employee questions from company PDFs.',
    overview:
      'Employees could ask a question in plain English and get an answer from company documents instead of digging through PDFs themselves.',
    tags: ['OpenAI API', 'LangChain', 'Python', 'GPT-4', 'Flask'],
    achievements: [
      'Built a retrieval-backed internal chatbot with LangChain, Flask, and GPT-4 to answer employee questions against company documents',
      'Created ingestion and query pipelines that extracted PDF content, chunked knowledge, and served responses through a lightweight internal interface',
    ],
    githubUrl: 'https://github.com/v-khanna/chatCKB',
    externalUrl: null,
  },
  {
    title: 'Real-Time ASL Recognition',
    description:
      'Real-time computer vision pipeline for translating ASL gestures to text with MediaPipe tracking and MobileNetV2 inference.',
    overview:
      'Point a webcam at someone signing and the system translates the hand signs to text in real time.',
    tags: ['TensorFlow', 'MediaPipe', 'OpenCV', 'MobileNetV2'],
    achievements: [
      'Trained a transfer-learning pipeline on MobileNetV2 with MediaPipe landmarks to classify ASL gestures from live webcam input',
      'Optimised inference with quantisation and efficient preprocessing to keep recognition responsive on edge hardware',
    ],
    githubUrl: null,
    externalUrl: null,
  },
  {
    title: 'Connect4 Championship',
    description:
      'Game-playing AI using Minimax, alpha-beta pruning, and heuristic board evaluation for tournament-scale competition.',
    overview:
      'I built a Connect 4 AI that looks several moves ahead and competed against more than 250 other agents in a class tournament.',
    tags: ['Python', 'PyGame', 'Minimax', 'Alpha-Beta Pruning'],
    achievements: [
      'Implemented Minimax with alpha-beta pruning and board evaluation heuristics to search several moves ahead under time limits',
      'Tuned move ordering and scoring logic to cut decision latency and improve play against a large field of competing agents',
    ],
    githubUrl: 'https://github.com/v-khanna/Connect4_Championship',
    externalUrl: null,
  },
]
