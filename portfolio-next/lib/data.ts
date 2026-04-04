/**
 * Portfolio content — mirrored from saifsalmani.me (static site + script.js).
 * Image paths live under /public/images/ (copy from your existing deploy).
 */

/** Rich case study — shown in project modal */
export type ProjectDetail = {
  overview?: string;
  problem?: string;
  solution?: string;
  impact?: string;
  features?: string[];
  myRole?: string;
  /** Deeper tech narrative */
  techNotes?: string;
};

export type Project = {
  id: string;
  type: "developer" | "editor";
  title: string;
  /** Card hook only — ~6–8 words */
  hook: string;
  /** Short intro (modal overview fallback) */
  description: string;
  date: string;
  githubUrl: string;
  siteUrl: string;
  technologies: string[];
  thumbnail: string;
  /** Local MP4 under /public — card preview + modal */
  videoSrc?: string;
  /** Card + modal media framing: reel = 9:16 (vertical), landscape = 16:9 / 4:3 style */
  mediaAspect?: "reel" | "landscape";
  /** Full case study sections */
  detail?: ProjectDetail;
};

export type Achievement = {
  id: string;
  type: "developer" | "editor";
  name: string;
  platform: string;
  year: string;
  /** Card hook — one short line */
  hook: string;
  /** Full story in modal */
  description: string;
  thumbnail: string;
  linkedinUrl?: string;
  position?: string;
  skill?: string;
};

/** Brand portraits — use a real cutout PNG (transparent) at heroPortrait for best results */
export const siteImages = {
  heroPortrait: "/images/profile/hero-portrait-large.png",
  aboutPortrait: "/images/profile/saif.jpg",
  /** Developer section — coding / workstation visual */
  developerAtWork: "/images/profile/developer-at-work.png",
  heroAlt: "Saif — developer portrait",
  aboutAlt: "Saif — portrait",
  developerAtWorkAlt: "Saif — coding with holographic displays",
} as const;

export const hero = {
  eyebrow: "Saif Salmani",
  /** Shown as staggered word reveal */
  headline: "I Build Scalable, High-Performance Web Experiences",
  role: "Full-stack developer & video editor",
  location: "Mumbai, India",
  /** Small tech chips under headline */
  badges: ["React", "Next.js", "TypeScript", "Node.js", "MongoDB", "Motion"],
};

export const developerOverview =
  "MERN stack, polished UI, and products shipped from hackathons to production.";

export const developerTags = ["MERN", "Socket.IO", "UI systems", "Hackathons"];

export const editorOverview =
  "Short-form & long-form edits — CapCut, Final Cut Pro, and social-first pacing for clubs & brands.";

export const editorTags = ["Reels & Shorts", "CapCut", "Final Cut Pro", "Color & pacing"];

export const projects: Project[] = [
  {
    id: "dev-1",
    type: "developer",
    title: "PrismHold",
    hook: "Co-founded luxury handmade brand · 100+ units · Amazon & Flipkart.",
    description:
      "Co-founded with my brother: e-commerce, branding, and growth. Live storefront and ongoing product development.",
    date: "2023-11-30",
    githubUrl: "https://github.com/Saif09inAction/Prismhold.store",
    siteUrl: "https://www.prismhold.store/",
    technologies: ["HTML", "CSS", "JavaScript"],
    thumbnail: "/images/projects/prismhold.png",
    detail: {
      overview:
        "PrismHold is a luxury handmade brand co-founded with my brother. We sell on Amazon & Flipkart and iterate on product, packaging, and storefront experience.",
      problem: "Stand out in handmade e-commerce and scale fulfillment without losing craft identity.",
      solution:
        "Built and maintained the web presence, listing strategy, and brand visuals; coordinated ops with marketplaces.",
      impact: "100+ units sold; repeat customers and ongoing brand growth.",
      features: ["E-commerce storefront", "Marketplace listings", "Brand-led product pages"],
      myRole: "Co-founder — product, web, and growth alongside my brother.",
      techNotes: "HTML/CSS/JS storefront; focus on clarity and trust for luxury positioning.",
    },
  },
  {
    id: "dev-2",
    type: "developer",
    title: "LinguaSync",
    hook: "Real-time multilingual MERN chat with instant translation.",
    description:
      "Socket.IO messaging, JWT auth, MongoDB persistence. Built to let people chat across languages in one thread.",
    date: "2024-01-15",
    githubUrl: "https://github.com/Saif09inAction/linguasync",
    siteUrl: "",
    technologies: ["React", "Tailwind", "Node", "Express", "MongoDB", "Socket.IO", "JWT"],
    thumbnail: "/images/projects/lyguasync.png",
    detail: {
      overview:
        "LinguaSync is a MERN chat app where messages can be translated in real time so people who speak different languages can collaborate in one thread.",
      problem: "Language barriers slow collaboration in global teams and communities.",
      solution:
        "Socket.IO for live messaging, JWT sessions, MongoDB persistence, and translation layered on the message pipeline.",
      impact: "Demo-ready full-stack reference for real-time + i18n patterns.",
      features: ["Real-time rooms", "JWT auth", "Translation on send/receive", "Mongo persistence"],
      myRole: "Full-stack — API, client, and real-time layer.",
      techNotes: "React (Vite) + Tailwind UI; Express + Socket.IO; MongoDB for messages and users.",
    },
  },
  {
    id: "dev-3",
    type: "developer",
    title: "PlagiaCheck",
    hook: "Academic plagiarism checks — upload PDF/DOCX/TXT, similarity scoring.",
    description:
      "Cosine similarity & TF-based analysis. Firebase for auth and data. Built for coursework and demos.",
    date: "2024-02-20",
    githubUrl: "https://github.com/Saif09inAction/PlagiaCheck",
    siteUrl: "https://saif09inaction.github.io/PlagiaCheck/",
    technologies: ["JavaScript", "Node", "Express", "Firebase"],
    thumbnail: "/images/projects/plagiacheck.png",
  },
  {
    id: "dev-4",
    type: "developer",
    title: "FundFlow – Finance Learning Platform",
    hook: "Hackathon finance app — AI stock signal, paper trading, news, chat.",
    description:
      "Demo Day build: learning surface with simulated trades, news feed, and community discussion.",
    date: "2024-01-25",
    githubUrl: "https://github.com/Saif09inAction/Fund-Flow-mumbai-hacks",
    siteUrl: "",
    technologies: ["JavaScript", "Node", "AI/ML"],
    thumbnail: "/images/projects/fundflow.png",
    detail: {
      overview:
        "Hackathon finance learning surface: paper trading, news, community chat, and an ML-inspired stock signal experiment for demo day.",
      problem: "Make finance concepts approachable under time pressure at a hackathon.",
      solution:
        "Rapid UI + API integration; simulated trades and news feed; chat for peer learning; model hook for signals.",
      impact: "🥈 Demo Day recognition — shipped narrative and working demo.",
      features: ["Paper trading", "News module", "Community chat", "Signal experiment"],
      myRole: "Full-stack contributor — features, integration, and pitch support.",
      techNotes: "Node/JavaScript stack; AI/ML module scoped for demo reliability.",
    },
  },
  {
    id: "dev-life-lens",
    type: "developer",
    title: "LifeLens",
    hook: "Hackathon story site — AI goggles for blind & deaf users.",
    description:
      "Next.js marketing site for LifeLens: narrative scroll, stats, prototypes, and team — Code Paglu's.",
    date: "2025",
    githubUrl: "https://github.com/Saif09inAction/Life-Lens",
    siteUrl: "https://life-lens-flax.vercel.app/",
    technologies: ["Next.js", "TypeScript", "Tailwind", "Framer Motion", "R3F"],
    thumbnail: "/images/projects/life-lens.jpg",
    detail: {
      overview:
        "LifeLens is a concept for AI-powered smart goggles that help blind users navigate safely and deaf users follow conversations with live captions. The public site tells that story with chapters, impact numbers, prototype sketches, and team — built for a hackathon as Code Paglu's.",
      problem:
        "Blind and deaf people face daily barriers crossing streets, following speech in noise, and getting timely environmental cues.",
      solution:
        "A startup-style Next.js site presents research, imagined user journeys, hardware concept (Raspberry Pi, sensors, displays), and clear calls to action — with motion and layout tuned for emotional storytelling.",
      impact:
        "Deployed demo at Vercel; repo and narrative package for judges and stakeholders.",
      features: [
        "Story-driven sections (problem → journeys → concept → prototypes)",
        "Dark-mode UI, glass cards, animated counters",
        "Team & contact; SEO-oriented structure",
        "R3F-ready stack for future product mockups",
      ],
      myRole:
        "Team Code Paglu's — contributor alongside Sufyan Khan and Arsheel Patel (site build, content, and presentation).",
      techNotes:
        "Next.js 16, Tailwind CSS 4, Framer Motion, React Three Fiber per project README. Live: https://life-lens-flax.vercel.app/ · Source: https://github.com/Saif09inAction/Life-Lens",
    },
  },
  {
    id: "dev-5",
    type: "developer",
    title: "Revora",
    hook: "UI/UX playground — layout, motion, and component experiments.",
    description: "Early-stage lab for interaction patterns and structure before shipping features.",
    date: "2023-09-15",
    githubUrl: "https://github.com/Saif09inAction/Revora",
    siteUrl: "https://revorabysaif.netlify.app/",
    technologies: ["HTML", "CSS", "JavaScript"],
    thumbnail: "/images/projects/revora.png",
  },
  {
    id: "dev-6",
    type: "developer",
    title: "Family Info App",
    hook: "Family dashboard — profiles, birthdays, and reminders.",
    description: "Firebase-backed CRUD with upcoming dates highlighted. Simple household hub.",
    date: "2024-03-10",
    githubUrl: "https://github.com/Saif09inAction/family-info-app",
    siteUrl: "https://familyboard.netlify.app",
    technologies: ["HTML", "CSS", "JavaScript", "Firebase"],
    thumbnail: "/images/projects/familyinfo.png",
  },
  {
    id: "dev-7",
    type: "developer",
    title: "Country Info",
    hook: "REST-driven country explorer — flags, regions, metadata.",
    description: "API-driven cards for quick reference and geography demos.",
    date: "2023-12-15",
    githubUrl: "https://github.com/Saif09inAction/Country-Info",
    siteUrl: "https://country-info-app-by-saifsalmani.netlify.app/",
    technologies: ["HTML", "CSS", "JavaScript"],
    thumbnail: "/images/projects/countryinfo.png",
  },
  {
    id: "dev-8",
    type: "developer",
    title: "YouTube Clone",
    hook: "Responsive YouTube UI clone — layout & grid fidelity.",
    description: "Front-end practice: responsive shell and visual parity with the real product.",
    date: "2023-10-20",
    githubUrl: "https://github.com/Saif09inAction/youtube-clone",
    siteUrl: "https://youtubeclone-by-saif.netlify.app/",
    technologies: ["HTML", "CSS"],
    thumbnail: "/images/projects/youtubeclone.png",
  },
  {
    id: "edit-reel-1",
    type: "editor",
    title: "Reel 1",
    hook: "Vertical short-form — pacing & hooks for feeds.",
    description: "Edited reel for social: vertical format, retention-focused cuts.",
    date: "2025",
    githubUrl: "",
    siteUrl: "",
    technologies: ["Reels", "Short-form", "CapCut"],
    thumbnail: "/images/projects/externalclub.png",
    videoSrc: "/videos/reel-1.mp4",
    mediaAspect: "reel",
  },
  {
    id: "edit-reel-2",
    type: "editor",
    title: "Reel 2",
    hook: "Social edit — motion & clarity in 9:16.",
    description: "Vertical reel: rhythm, transitions, and brand-safe framing.",
    date: "2025",
    githubUrl: "",
    siteUrl: "",
    technologies: ["Reels", "Short-form", "CapCut"],
    thumbnail: "/images/projects/externalclub.png",
    videoSrc: "/videos/reel-2.mp4",
    mediaAspect: "reel",
  },
  {
    id: "edit-reel-3",
    type: "editor",
    title: "Reel 3",
    hook: "Feed-ready cut — hook-first structure.",
    description: "Short-form vertical video tuned for Instagram-style feeds.",
    date: "2025",
    githubUrl: "",
    siteUrl: "",
    technologies: ["Reels", "Short-form", "CapCut"],
    thumbnail: "/images/projects/externalclub.png",
    videoSrc: "/videos/reel-3.mp4",
    mediaAspect: "reel",
  },
  {
    id: "edit-reel-4",
    type: "editor",
    title: "Reel 4",
    hook: "Vertical story — pacing & polish.",
    description: "Edited reel showcasing timing, grade, and end-card clarity.",
    date: "2025",
    githubUrl: "",
    siteUrl: "",
    technologies: ["Reels", "Short-form", "CapCut"],
    thumbnail: "/images/projects/externalclub.png",
    videoSrc: "/videos/reel-4.mp4",
    mediaAspect: "reel",
  },
  {
    id: "edit-reel-5",
    type: "editor",
    title: "Reel 5",
    hook: "Vertical edit — retention & rhythm.",
    description: "Short-form reel: pacing, hooks, and feed-friendly structure.",
    date: "2025",
    githubUrl: "",
    siteUrl: "",
    technologies: ["Reels", "Short-form", "CapCut"],
    thumbnail: "/images/projects/externalclub.png",
    videoSrc: "/videos/reel-5.mp4",
    mediaAspect: "reel",
  },
  {
    id: "edit-reel-6",
    type: "editor",
    title: "Reel 6",
    hook: "Social-first cut — polish & clarity.",
    description: "Edited vertical video for social: motion, grade, and clear storytelling.",
    date: "2025",
    githubUrl: "",
    siteUrl: "",
    technologies: ["Reels", "Short-form", "CapCut"],
    thumbnail: "/images/projects/externalclub.png",
    videoSrc: "/videos/reel-6.mp4",
    mediaAspect: "reel",
  },
];

export const achievements: Achievement[] = [
  {
    id: "ach-dev-1",
    type: "developer",
    name: "🥈 1st Runner-Up – DemoDay 2025",
    platform: "ITM Skills University & LetsUpgrade",
    year: "2025",
    hook: "Demo Day 🥈 — finance learning app",
    description: "Demo Day 🥈 — finance app with AI signals, paper trading, news & chat.",
    thumbnail: "/images/achievements/DemoDay 2025 (1st Runner-Up).png",
    linkedinUrl:
      "https://www.linkedin.com/posts/saif-salmani-38b63a30b_financeapp-ai-demoday-activity-7358619143362736130-Ix3e?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE7wMJsBpGf8OfntguvZE7ddl_5AIEmDzOk",
    position: "1st Runner-Up (Team: Code Blooded Brothers)",
  },
  {
    id: "ach-dev-2",
    type: "developer",
    name: "Marketing Intern – LetsUpgrade",
    platform: "LetsUpgrade",
    year: "2024-2025",
    hook: "Marketing intern — LetsUpgrade cohorts",
    description: "Two cohorts — analysis, QC, and product feedback.",
    thumbnail: "/images/achievements/ Quality Control Leadership.png",
    linkedinUrl:
      "https://www.linkedin.com/posts/saif-salmani-38b63a30b_internshipexperience-letsupgrade-marketinginternship-activity-7311539032281272320-IE5q?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE7wMJsBpGf8OfntguvZE7ddl_5AIEmDzOk",
    position: "Marketing Intern (Dec 2024 & Feb 2025)",
  },
  {
    id: "ach-dev-3",
    type: "developer",
    name: "Entrepreneurial Achievement – PrismHold",
    platform: "Co-Founder",
    year: "2024",
    hook: "Co-founder — PrismHold handmade brand",
    description: "Co-founder — 100+ units via Amazon & Flipkart.",
    thumbnail: "/images/achievements/Entrepreneurial.PNG",
    position: "Co-Founder & Entrepreneur",
  },
  {
    id: "ach-dev-4",
    type: "developer",
    name: "Mumbai Hacks 2024 – Guinness World Records",
    platform: "Mumbai Hacks",
    year: "2024",
    hook: "Guinness-scale Mumbai Hacks participant",
    description: "World’s largest hackathon — Guinness record event.",
    thumbnail: "/images/achievements/Mumbai Hacks 2024.png",
    linkedinUrl:
      "https://www.linkedin.com/posts/saif-salmani-38b63a30b_mumbaihacks2k24-worldrecord-guinnessworldrecords-activity-7256566133988769793-6MQe?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE7wMJsBpGf8OfntguvZE7ddl_5AIEmDzOk",
    position: "Participant",
  },
  {
    id: "ach-dev-5",
    type: "developer",
    name: "PIWOT Imagine Hackathon 2025",
    platform: "PIWOT",
    year: "2025",
    hook: "PIWOT hackathon — demo round qualifier",
    description: "Jio Convention Centre — reached demo round.",
    thumbnail: "/images/achievements/PIWOT Hackathon.png",
    linkedinUrl:
      "https://www.linkedin.com/posts/saif-salmani-38b63a30b_hackathonexperience-innovation-teamwork-activity-7289224601560072192-JZDF?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE7wMJsBpGf8OfntguvZE7ddl_5AIEmDzOk",
    position: "Participant (Reached Demo Round)",
  },
  {
    id: "ach-dev-6",
    type: "developer",
    name: "Avalanche Hackathon – Mumbai Edition",
    platform: "Avalanche",
    year: "2024",
    hook: "Avalanche Web3 hackathon — Mumbai",
    description: "Web3 builders & Avalanche ecosystem — Mumbai.",
    thumbnail: "/images/achievements/Avalanche Hackathon.png",
    linkedinUrl:
      "https://www.linkedin.com/posts/saif-salmani-38b63a30b_avalanche-hackathon-web3-activity-7364003970584911875-3MZF?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE7wMJsBpGf8OfntguvZE7ddl_5AIEmDzOk",
    position: "Participant",
  },
  {
    id: "ach-dev-7",
    type: "developer",
    name: "Stellar Hackathon – Pune",
    platform: "Stellar Hackathon",
    year: "2024",
    hook: "Stellar hackathon — Pune sprint",
    description: "Multi-team builds & competitive sprints.",
    thumbnail: "/images/achievements/stellar.png",
    position: "Participant",
  },
  {
    id: "ach-dev-8",
    type: "developer",
    name: "ITM DemoDay",
    platform: "ITM Skills University",
    year: "2024",
    hook: "ITM DemoDay — judged pitch",
    description: "Judged pitch — innovation & execution.",
    thumbnail: "/images/achievements/demoday .png",
    position: "Participant",
  },
  {
    id: "ach-dev-9",
    type: "developer",
    name: "Mumbai Hacks 2025",
    platform: "Mumbai Hacks",
    year: "2025",
    hook: "Mumbai Hacks return — sharper pitch",
    description: "Stronger pitch & product narrative — return run.",
    thumbnail: "/images/achievements/mumbai hacks 2025.png",
    position: "Participant",
  },
  {
    id: "ach-edit-1",
    type: "editor",
    name: "🥈 1st Runner-Up – DemoDay 2025",
    platform: "ITM Skills University & LetsUpgrade",
    year: "2025",
    hook: "Demo Day 🥈 — team innovation",
    description: "Demo Day 🥈 — Code Blooded Brothers team build.",
    thumbnail: "/images/achievements/DemoDay 2025 (1st Runner-Up).png",
    linkedinUrl:
      "https://www.linkedin.com/posts/saif-salmani-38b63a30b_financeapp-ai-demoday-activity-7358619143362736130-Ix3e?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE7wMJsBpGf8OfntguvZE7ddl_5AIEmDzOk",
    skill: "Innovation & Business",
  },
  {
    id: "ach-edit-2",
    type: "editor",
    name: "PrismHold – Co-Founder",
    platform: "Entrepreneurship",
    year: "2024",
    hook: "PrismHold co-founder — e-commerce",
    description: "Co-founder — e-com & brand growth.",
    thumbnail: "/images/achievements/Entrepreneurial.PNG",
    skill: "E-commerce & Marketing",
  },
  {
    id: "ach-edit-3",
    type: "editor",
    name: "Marketing Intern – LetsUpgrade",
    platform: "LetsUpgrade",
    year: "2024-2025",
    hook: "LetsUpgrade — marketing & QC",
    description: "Marketing intern — analysis & QC across two cohorts.",
    thumbnail: "/images/achievements/ Quality Control Leadership.png",
    skill: "Business Analysis & Quality Control",
  },
];

export const developerSkillCategories = [
  {
    title: "Stack",
    tags: ["React", "Next.js", "TypeScript", "Node", "Express", "MongoDB"],
  },
  {
    title: "Foundations",
    tags: ["DSA", "System design basics", "REST", "JWT", "Socket.IO"],
  },
  {
    title: "Ship",
    tags: ["Firebase", "Vite", "Tailwind", "Git", "Vercel / Netlify"],
  },
];

export const editorSkillCategories = [
  {
    title: "Edit",
    tags: ["Reels & Shorts", "Long-form", "Club & brand content", "Pacing & grade"],
  },
  {
    title: "Tools",
    tags: ["CapCut", "Final Cut Pro", "Premiere (learning)"],
  },
];

export const about = {
  /** One punchy line + optional second short line */
  paragraphs: [
    "Computer Engineering @ ITM — I ship full-stack web, compete in hackathons, and co-run a handmade brand.",
  ],
  /** Visual chips (no long paragraph) */
  focusTags: ["MERN", "Hackathons", "Product", "Video", "Startup"],
  education: {
    title: "BTech — Computer Science Engineering",
    place: "ITM Skills University, Mumbai",
    period: "2024 – 2028",
    body: "DSA, systems, and shipped apps — DemoDay 🥈, multiple hackathons, real clients.",
  },
  keyAchievements: [
    "🥈 DemoDay 2025 — finance learning app",
    "Co-founder — PrismHold · 100+ units sold",
    "LetsUpgrade — marketing & QC internships",
    "Mumbai Hacks — Guinness-scale event",
    "PIWOT — demo round",
    "8+ shipped repos (LinguaSync, PlagiaCheck, …)",
  ],
  internships: [
    {
      title: "PrismHold — Co-Founder",
      period: "2024",
      body: "E-commerce, ops, and growth — handmade brand with my brother.",
    },
    {
      title: "LetsUpgrade — Marketing Intern",
      period: "Dec 2024 & Feb 2025",
      body: "QC, product feedback loops, and GTM research.",
    },
  ],
  languages: [
    "Hindi – Proficient",
    "English – Advanced",
    "German – Beginner",
  ],
};

export const ideas = {
  subtitle: "Labs & experiments",
  cards: [
    { status: "Idea" as const, title: "Coming soon", problem: "—" },
    { status: "In Progress" as const, title: "Coming soon", problem: "—" },
    { status: "Built" as const, title: "Coming soon", problem: "—" },
    { status: "Idea" as const, title: "Coming soon", problem: "—" },
  ],
};

export const contact = {
  subtitle: "Collaborations & opportunities",
  links: [
    { label: "GitHub", href: "https://github.com/Saif09inAction", icon: "github" as const },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/saif-salmani-38b63a30b/", icon: "linkedin" as const },
    { label: "Email", href: "mailto:saifsalmani224@gmail.com", icon: "mail" as const },
  ],
};

export const resumeUrl =
  "https://drive.google.com/uc?export=download&id=1hLZFlz9x_Os6IXZYqQ7-2h6wUpUgmsT0";

export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#developer", label: "Developer" },
  { href: "#editor", label: "Editor" },
  { href: "#ideas", label: "Ideas" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];
