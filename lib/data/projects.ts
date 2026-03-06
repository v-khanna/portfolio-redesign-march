import type { ProjectEntry } from '@/lib/types'

export const projects: ProjectEntry[] = [
  // --- Resume projects (in resume order) ---
  {
    title: 'Enterprise KG-RAG w/ Multi-Agent Layer (Graphiti)',
    description: 'A knowledge graph + AI system that reads financial PDFs, extracts entities and relationships, and answers questions with strict evidence-only outputs.',
    overview:
      'Think of it as a smart filing cabinet for financial documents — it reads PDFs, understands the relationships between companies and dates, and answers questions only using what it actually found.',
    tags: ['Neo4j', 'CrewAI', 'Docker', 'React'],
    achievements: [
      'Led enterprise KG-RAG product strategy, utilizing Neo4j to extract complex financial entities from PDF data',
      'Enforced AI reliability by designing 5-agent CrewAI pipelines with strict evidence-only JSON output protocols',
      'Deployed Graphiti on Neo4j Aura, leveraging product telemetry and vector indexes for real-time visual graphs',
      'Formalized financial domain modeling, building typed Neo4j edges to capture precise dates in enterprise filings',
    ],
    githubUrl: null,
    externalUrl: null,
  },
  {
    title: 'Bullseye — AI Financial News Analysis Platform',
    description: 'A real-time market analysis tool with a Chrome extension that uses GPT-4 to summarize and contextualize financial news across 200+ portals.',
    overview:
      'A Chrome extension that reads the financial news article you\'re on, runs it through GPT-4, and gives you a plain-English summary with market charts — all in one click.',
    tags: ['OpenAI API', 'MySQL', 'Alpha Vantage', 'Node.js', 'React', 'TypeScript'],
    achievements: [
      'Synthesized real-time market analysis product pipelines, integrating GPT-4 APIs to deliver user news insights',
      'Launched Chrome extension product features, triggering seamless LLM analysis across 200+ financial portals',
      'Constructed interactive frontend UX with React and TS, embedding SVG charts for market data comparisons',
    ],
    githubUrl: null,
    externalUrl: null,
  },
  {
    title: 'Echo Journal — AI Voice Journaling iOS App',
    description: 'An iOS app that lets you journal by talking — it records your voice, transcribes it in real-time via OpenAI, and synthesizes daily reflections.',
    overview:
      'You talk to your phone like a voice memo, and it turns your rambling into a structured journal entry with AI-generated reflections and insights.',
    tags: ['SwiftUI', 'FastAPI', 'WebSocket', 'PostgreSQL', 'OpenAI API'],
    achievements: [
      'Handled iOS scaling for 100+ concurrent OpenAI Realtime API connections with sub-second audio latency',
      'Supervised backend product architecture via FastAPI and async PostgreSQL to power AI-driven journal synthesis',
      'Prototyped iOS MVP roadmap and conducted local beta testing to validate core AI voice journaling UX workflows',
    ],
    githubUrl: null,
    externalUrl: null,
  },
  // --- Notable older projects ---
  {
    title: 'Relatient Appointment Pathway',
    description: 'AI voice agent for healthcare appointment scheduling with prompt injection defense and zero-shot learning techniques.',
    overview:
      'An AI phone agent that schedules doctor\'s appointments, designed to resist manipulation and handle real conversations with 95% accuracy on names and dates.',
    tags: ['Bland AI', 'Prompt Injection', 'Zero-Shot Learning', 'LLM Security'],
    achievements: [
      'Devised phonetic algorithms capturing emails, DOB, etc., during natural speech pauses to 95% accuracy',
      'Reduced hallucinations by 85% via context-aware prompting, eliminating 100% phantom transfers in test calls',
      'Secured voice agents by solving 50+ LLM challenges (Bland AI, Lakera\'s Gandalf) to prevent real-world attacks',
    ],
    githubUrl: null,
    externalUrl: null,
  },
  {
    title: 'Deep Q-Learning · Atari Pong',
    description: 'Reinforcement learning agent using CNN architecture and epsilon-greedy exploration to master Atari Pong.',
    overview:
      'Taught an AI to play Pong from scratch by watching pixels — it learned to beat the game 70% of the time through trial and error.',
    tags: ['PyTorch', 'OpenAI Gym', 'CUDA', 'OpenCV'],
    achievements: [
      'Built Deep Q-Network with CNN architecture and epsilon-greedy exploration, achieving 70% win rate on Pong',
      'Incorporated experience replay with CUDA optimization and target network, reducing training variance by 45%',
      'Refined frame stacking and reward clipping using OpenCV and PyTorch, improving model stability by 30%',
    ],
    githubUrl: 'https://github.com/v-khanna/Deep_Q_Network',
    externalUrl: null,
  },
  {
    title: 'ChatCKB · CK Birla AI Chatbot',
    description: 'Internal AI chatbot for CK Birla that reads company documents and answers questions using GPT-4 and LangChain.',
    overview:
      'A chatbot employees could ask questions to — it would read through the company\'s PDFs and give a direct answer instead of making you search for it.',
    tags: ['OpenAI API', 'LangChain', 'Python', 'GPT-4', 'Flask'],
    achievements: [
      'Built intelligent chatbot that comprehends and processes company documents using OpenAI API and LangChain',
      'Implemented 24/7 availability with NLP for complex queries and document insights',
      'Designed seamless integration for websites, apps, and customer service interfaces',
    ],
    githubUrl: 'https://github.com/v-khanna/chatCKB',
    externalUrl: null,
  },
  {
    title: 'Real-Time ASL Recognition',
    description: 'Computer vision system translating ASL hand signs to text using edge AI and MediaPipe hand tracking.',
    overview:
      'Point your webcam at someone signing ASL and it translates the hand signs to text in real-time at 15+ frames per second.',
    tags: ['TensorFlow', 'MediaPipe', 'OpenCV', 'MobileNetV2'],
    achievements: [
      'Achieved 92% accuracy on 5-class ASL alphabet using transfer learning with MobileNetV2 and real-time hand tracking',
      'Optimized for edge deployment with 15+ FPS through model quantization and efficient preprocessing',
      'Built robust hand detection pipeline using MediaPipe landmarks with dynamic ROI cropping',
    ],
    githubUrl: null,
    externalUrl: null,
  },
  {
    title: 'Connect4 Championship',
    description: 'AI-powered Connect-4 game using Minimax and Alpha-Beta Pruning, competing against 250+ opponents.',
    overview:
      'Built an AI that plays Connect 4 — it thinks several moves ahead and competed against 250+ other AIs in a class tournament.',
    tags: ['Python', 'PyGame', 'Minimax', 'Alpha-Beta Pruning'],
    achievements: [
      'Devised a Connect-4 AI utilizing Minimax & Alpha-Beta Pruning; competed against 250+ opponents',
      'Boosted decision-making speed by 50%, allowing real-time gameplay adjustments within time constraints',
    ],
    githubUrl: 'https://github.com/v-khanna/Connect4_Championship',
    externalUrl: null,
  },
]
