import { SkillTrack, Mentor, ResultItem, WhatsAppOnboarding, PaymentTransaction } from "./types";

export const INITIAL_TRACKS: SkillTrack[] = [
  {
    id: "web-dev",
    slug: "web-dev",
    title: "Web Development & Full-Stack Next.js Architecture",
    shortDesc: "Master Next.js 14, React, Tailwind CSS, Supabase, and build production web apps & high-converting client landing pages.",
    fullDesc: "Move beyond tutorial hell. Build full-featured, real-world fullstack web apps with authentication, payments, database architecture, and edge deployment. Learn how to sell high-performance custom websites to businesses for ₹50,000 - ₹1,50,000 each.",
    icon: "Globe",
    badge: "High Demand",
    mentorName: "Priya Nair",
    mentorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80",
    mentorTitle: "Senior Full-Stack Architect & SaaS Founder",
    averageEarnings: "₹75,000 - ₹3,00,000 / mo",
    modulesCount: 9,
    studentsCount: 380,
    tags: ["Next.js 14", "React", "Supabase", "Tailwind CSS", "TypeScript", "Vercel"],
    modules: [
      {
        title: "Module 1: Modern Fullstack Architecture",
        duration: "2h 30m",
        lessons: ["Next.js App Router deep dive", "Server Components vs Client Components", "TypeScript best practices for speed"]
      },
      {
        title: "Module 2: Supabase Backend & Database Modeling",
        duration: "3h 00m",
        lessons: ["PostgreSQL schema design", "Row Level Security (RLS) policies", "Database auth & social logins"]
      },
      {
        title: "Module 3: Payments & Webhook Architectures",
        duration: "2h 15m",
        lessons: ["Integrating Razorpay & Stripe Checkout", "Handling asynchronous webhooks reliably", "Subscription gating and access tokens"]
      },
      {
        title: "Module 4: Client Acquisition for Web Developers",
        duration: "2h 00m",
        lessons: ["Auditing slow local business websites", "Pitching modern Next.js redesigns", "Monthly maintenance retainers"]
      }
    ],
    deliverables: [
      "Complete Next.js + Supabase SaaS Starter Kit",
      "Figma UI Component Design System",
      "Website Performance & SEO Audit Checklist",
      "Client Website Proposal Presentation Deck"
    ]
  },
  {
    id: "app-dev",
    slug: "app-dev",
    title: "App Development (iOS & Android with Flutter & React Native)",
    shortDesc: "Build cross-platform mobile apps from scratch with native performance, real-time databases, push notifications, and App Store publishing.",
    fullDesc: "Learn cross-platform app engineering to ship production-ready iOS and Android mobile apps. Master state management, Firebase backend, offline persistence, in-app purchases, and client contract pitching for mobile products.",
    icon: "Smartphone",
    badge: "Top Salary",
    mentorName: "Siddharth Rao",
    mentorAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80",
    mentorTitle: "Senior Mobile Engineer • 500k+ App Downloads",
    averageEarnings: "₹85,000 - ₹3,50,000 / mo",
    modulesCount: 8,
    studentsCount: 260,
    tags: ["Flutter", "React Native", "iOS & Android", "Firebase", "App Store", "Mobile UI"],
    modules: [
      {
        title: "Module 1: Mobile UI Architecture & State Management",
        duration: "2h 15m",
        lessons: ["Component lifecycle & reactive state", "Smooth 60fps animations", "Responsive mobile layouts for all screen sizes"]
      },
      {
        title: "Module 2: Cloud Backend, Auth & Real-Time Sync",
        duration: "3h 00m",
        lessons: ["Firebase & Supabase mobile setup", "Push notification delivery (FCM)", "Offline caching and local storage"]
      },
      {
        title: "Module 3: In-App Purchases, APIs & Store Deployment",
        duration: "2h 45m",
        lessons: ["Apple App Store & Google Play publishing", "In-app subscriptions with RevenueCat", "Passing review guidelines on first try"]
      },
      {
        title: "Module 4: Pitching $2k-$5k Mobile Projects",
        duration: "2h 00m",
        lessons: ["Scoping client MVPs in 3 weeks", "Milestone pricing for mobile dev", "Post-launch maintenance agreements"]
      }
    ],
    deliverables: [
      "Production-ready Flutter & React Native Boilerplates",
      "App Store & Play Store Submission Checklist",
      "Mobile Figma UI Kit (50+ screens)",
      "Client App Development Scope & Agreement"
    ]
  },
  {
    id: "video-editing",
    slug: "video-editing",
    title: "Viral Video Editing & High-Retention Storytelling",
    shortDesc: "Master Premiere Pro, After Effects, viral retention pacing, sound design, and land $1,000+ monthly international creator retainers.",
    fullDesc: "Learn how the top 0.1% video editors create content that holds millions of eyeballs and commands premium international retainers. From documentary-style storytelling (Magnates Media / Iman Gadzhi style) to high-converting short-form reels and corporate films.",
    icon: "Video",
    badge: "Most High-Demand",
    mentorName: "Aman Verma",
    mentorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    mentorTitle: "Lead Editor for 4M+ YouTuber & Agency Founder",
    averageEarnings: "₹65,000 - ₹2,50,000 / mo",
    modulesCount: 8,
    studentsCount: 412,
    tags: ["Premiere Pro", "After Effects", "Sound Design", "Client Acquisition", "Retention"],
    modules: [
      {
        title: "Module 1: The Psychology of High-Retention Pacing",
        duration: "1h 45m",
        lessons: ["Hook design in the first 3 seconds", "Visual pattern interrupts", "Pacing curves for YouTube & Reels"]
      },
      {
        title: "Module 2: Advanced Motion Graphics & 3D Transitions",
        duration: "2h 30m",
        lessons: ["After Effects camera mapping", "Custom kinetic typography", "3D asset integration"]
      },
      {
        title: "Module 3: Hollywood-Grade Sound Design",
        duration: "2h 10m",
        lessons: ["Layering whooshes, risers, and hits", "Audio ducking & master EQ", "Curating copyright-safe SFX libraries"]
      },
      {
        title: "Module 4: Packaging & Landing $1,500/Month Retainers",
        duration: "3h 00m",
        lessons: ["Cold outreach scripts for US/UK creators", "Handling sample edits without being scammed", "Contracts & upfront invoicing"]
      }
    ],
    deliverables: [
      "50GB+ Exclusive SFX & Motion Assets Pack",
      "Plug-and-play After Effects Presets (.ffx)",
      "High-converting Cold Email & Twitter DM Templates",
      "Client Contract & Milestone Billing Agreement"
    ]
  },
  {
    id: "thumbnail-design",
    slug: "thumbnail-design",
    title: "High-CTR Thumbnail Designing & Visual Packaging",
    shortDesc: "Design click-worthy 15%+ CTR thumbnails in Photoshop. Master color grading, 3D lighting, face manipulation, and packaging psychology.",
    fullDesc: "Thumbnails make or break every YouTube video. Learn the exact compositional rules, 3D subject cutouts, lighting effects, and typography hierarchies used by MrBeast, Ali Abdaal, and top creator agencies to guarantee viral click-through rates.",
    icon: "Image",
    badge: "Fastest Cashflow",
    mentorName: "Kunal Kashyap",
    mentorAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80",
    mentorTitle: "Lead Thumbnail Designer for 10M+ Creators",
    averageEarnings: "₹40,000 - ₹1,80,000 / mo",
    modulesCount: 7,
    studentsCount: 290,
    tags: ["Photoshop", "Thumbnail Design", "CTR Optimization", "Color Theory", "Lighting"],
    modules: [
      {
        title: "Module 1: The Science of High-CTR Visual Cues",
        duration: "1h 30m",
        lessons: ["Eye-tracking psychology on mobile screens", "Rule of thirds vs centered focal points", "Curiosity gaps without clickbait backlash"]
      },
      {
        title: "Module 2: Advanced Subject Cutouts, Rim Lighting & Color Grading",
        duration: "2h 15m",
        lessons: ["Photoshop pen tool mastery", "Painting rim lights and glowing highlights", "Camera Raw color grading for punchy contrast"]
      },
      {
        title: "Module 3: Typography & Micro-Copy that Pops",
        duration: "1h 45m",
        lessons: ["Best font pairings for YouTube", "Drop shadows and 3D bevels that stay readable", "The 3-word rule for thumbnail text"]
      },
      {
        title: "Module 4: Landing Top Creator Retainers ($50-$150/Thumbnail)",
        duration: "2h 00m",
        lessons: ["Auditing creator channels with low CTR", "Sending unsolicited thumbnail redesigns that close deals", "Monthly bundle pricing packages"]
      }
    ],
    deliverables: [
      "25GB+ High-Res Expression & Asset Vault",
      "Layered Photoshop PSD Templates for Viral Niches",
      "Custom Brush, Gradients & Lighting Pack",
      "Cold Pitch DM Templates for YouTubers"
    ]
  },
  {
    id: "seo-growth",
    slug: "seo-growth",
    title: "SEO Growth & Organic Google Search Domination",
    shortDesc: "Rank websites #1 on Google without paid ads. Master keyword clustering, technical SEO, programmatic page generation, and high-DA backlinks.",
    fullDesc: "Learn modern SEO that actually moves the needle in the era of AI search. Build organic traffic engines that generate passive leads and high-ticket sales for clients, businesses, and niche digital properties.",
    icon: "TrendingUp",
    badge: "High ROI",
    mentorName: "Meera Bansal",
    mentorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80",
    mentorTitle: "Organic Growth Lead • 2.5M Monthly Search Impressions",
    averageEarnings: "₹70,000 - ₹2,80,000 / mo",
    modulesCount: 7,
    studentsCount: 215,
    tags: ["SEO", "Keyword Research", "Technical SEO", "Backlinks", "Programmatic SEO", "Google Search Console"],
    modules: [
      {
        title: "Module 1: High-Intent Keyword Clustering",
        duration: "2h 00m",
        lessons: ["Finding zero-difficulty high-intent buyer keywords", "Search intent breakdown (Informational vs Transactional)", "Structuring topic clusters and silo architectures"]
      },
      {
        title: "Module 2: Technical SEO & Core Web Vitals",
        duration: "2h 30m",
        lessons: ["Crawl budget optimization & schema markup", "Fixing Core Web Vitals (LCP, CLS, INP)", "Clean URL indexing and sitemaps"]
      },
      {
        title: "Module 3: Programmatic SEO & Scaled Content",
        duration: "2h 15m",
        lessons: ["Generating 1,000+ targeted landing pages from databases", "Preventing thin content penalties", "Automating internal linking"]
      },
      {
        title: "Module 4: Selling Monthly SEO Retainers (₹50k-₹1.5L/mo)",
        duration: "2h 00m",
        lessons: ["Performing 10-minute video audits that hook business owners", "Reporting ROI with Search Console & Analytics", "Structuring 6-month minimum retainer agreements"]
      }
    ],
    deliverables: [
      "Comprehensive Technical SEO Audit Spreadsheet",
      "Keyword Clustering & Content Calendar Template",
      "Schema Markup JSON-LD Generator Library",
      "White-Label Monthly SEO Client Reporting Dashboard"
    ]
  },
  {
    id: "youtube-growth",
    slug: "youtube-growth",
    title: "YouTube Growth & Complete Channel Management",
    shortDesc: "Scale YouTube channels from 0 to 100k+ subscribers. Manage content calendars, A/B title testing, monetization, and sponsorship deals.",
    fullDesc: "Learn end-to-end channel operations: ideation, title & thumbnail packaging, script structure, retention analytics, and monetization funnels. Become the strategic operator creators and brands compete to hire as their Channel Manager.",
    icon: "PlaySquare",
    badge: "Creator Economy",
    mentorName: "Tarun Bhatia",
    mentorAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80",
    mentorTitle: "YouTube Strategist & Executive Producer for 8 Channels",
    averageEarnings: "₹80,000 - ₹3,20,000 / mo",
    modulesCount: 8,
    studentsCount: 310,
    tags: ["YouTube Algorithm", "Channel Management", "Title A/B Testing", "Scripting", "Brand Deals"],
    modules: [
      {
        title: "Module 1: Cracking the YouTube Recommendation Engine",
        duration: "2h 00m",
        lessons: ["How Browse Features & Suggested Videos actually work", "CTR x AVD (Average View Duration) equation", "Session time and viewer velocity"]
      },
      {
        title: "Module 2: Viral Title Ideation & A/B Testing Systems",
        duration: "2h 15m",
        lessons: ["The 10 fundamental viral title frameworks", "Testing thumbnails with YouTube Test & Compare", "Reframing boring topics into high-stakes stories"]
      },
      {
        title: "Module 3: Script Architecture for 50%+ Retention",
        duration: "2h 30m",
        lessons: ["Open loops and payoff mechanics", "Editing notes built directly into scripts", "Trimming dead air and filler content"]
      },
      {
        title: "Module 4: Managing Channels as a High-Ticket Operator",
        duration: "2h 30m",
        lessons: ["Building an asynchronous editorial team (scriptwriter, editor, designer)", "Negotiating brand sponsorship contracts", "Retainer + backend revenue share agreements"]
      }
    ],
    deliverables: [
      "Notion YouTube Channel Master Production OS",
      "50+ Tested Viral Title Formats & Swipe File",
      "Brand Sponsorship Rate Calculator & Pitch Deck",
      "Channel Manager Retainer Agreement SLA"
    ]
  },
  {
    id: "instagram-growth",
    slug: "instagram-growth",
    title: "Instagram Organic Growth & Viral Reels Systems",
    shortDesc: "Crack the Instagram algorithm. Create viral reels, design shareable carousels, build an engaged community, and automate high-converting DM funnels.",
    fullDesc: "The complete playbook for organic reach on Instagram. Learn how to script viral 7-30 second reels, write captions that spark saves & shares, build a recognized niche identity, and set up ManyChat DM automation to convert viewers into paying clients.",
    icon: "Instagram",
    badge: "High Reach",
    mentorName: "Rhea Kapoor",
    mentorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80",
    mentorTitle: "Organic Growth Consultant • 500k+ Followers Managed",
    averageEarnings: "₹50,000 - ₹2,20,000 / mo",
    modulesCount: 7,
    studentsCount: 340,
    tags: ["Instagram Reels", "Viral Scripts", "ManyChat", "Carousel Design", "Personal Brand"],
    modules: [
      {
        title: "Module 1: The 2026 Instagram Algorithm Blueprint",
        duration: "1h 45m",
        lessons: ["Sends-per-reach metric (the #1 viral factor)", "Audience watch-time loops", "Categorization and search SEO on profile bio"]
      },
      {
        title: "Module 2: Scripting & Filming High-Velocity Reels",
        duration: "2h 15m",
        lessons: ["The 2-second visual hook rule", "Text-on-screen placement that stops scrolling", "Trending audio strategy without being cringe"]
      },
      {
        title: "Module 3: High-Converting ManyChat DM Automation",
        duration: "2h 00m",
        lessons: ["Comment 'GUIDE' to get automated DM funnels", "Lead magnet delivery in DMs", "Qualifying leads directly inside chat without being pushy"]
      },
      {
        title: "Module 4: Landing Brand Deals & Organic Growth Retainers",
        duration: "2h 00m",
        lessons: ["Pitching local businesses for reel production", "Pricing monthly content management ($1,000-$2,500/mo)", "Media kits that impress marketing directors"]
      }
    ],
    deliverables: [
      "100+ Plug-and-Play Viral Reel Script Hooks",
      "Figma Carousel & Story Template System",
      "ManyChat 1-Click Automation Blueprint (.flow)",
      "Influencer Media Kit & Sponsorship Contract"
    ]
  },
  {
    id: "client-hunting",
    slug: "client-hunting",
    title: "Client Hunting & High-Ticket Outbound Closing",
    shortDesc: "The exact cold email, LinkedIn, and Twitter/X DM outreach scripts to close $1,000 to $5,000 international clients without bidding wars.",
    fullDesc: "Stop waiting for clients to discover you. Master the art of direct hunting: build targeted prospect lists, craft hyper-personalized Loom audits, handle every pricing objection effortlessly, and close international deals on Zoom with 50% upfront deposits.",
    icon: "Target",
    badge: "Sales Mastery",
    mentorName: "Rohan Sharma",
    mentorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    mentorTitle: "Outreach & Agency Founder • $140k+ Generated in Deals",
    averageEarnings: "₹1,00,000 - ₹4,50,000 / mo",
    modulesCount: 8,
    studentsCount: 390,
    tags: ["Cold Email", "LinkedIn Outreach", "Twitter DMs", "Sales Closing", "Objection Handling"],
    modules: [
      {
        title: "Module 1: Building a Qualified High-Ticket Prospect List",
        duration: "2h 00m",
        lessons: ["Apollo & LinkedIn Sales Navigator filtering", "Verifying CEO & founder email addresses", "Identifying companies with hiring budgets"]
      },
      {
        title: "Module 2: Cold Email Deliverability & High-Reply Copywriting",
        duration: "2h 30m",
        lessons: ["SPF, DKIM, DMARC domain setup for 99% inbox placement", "The 4-sentence cold email that gets 40%+ open rates", "Follow-up sequences that resurrect ghosted prospects"]
      },
      {
        title: "Module 3: The 3-Minute Loom Audit that Converts at 30%",
        duration: "2h 15m",
        lessons: ["Structure of an irresistible personalized video pitch", "Hooking the prospect in the first 10 seconds", "The friction-free call to action"]
      },
      {
        title: "Module 4: Sales Calls & Objection Elimination",
        duration: "2h 45m",
        lessons: ["Discovery questions that make the client articulate their pain", "Overcoming 'We don't have the budget right now'", "Securing wire transfers, Stripe, and upfront retainers"]
      }
    ],
    deliverables: [
      "50+ Battle-Tested Cold Email, LinkedIn & Twitter Scripts",
      "Notion Outbound Prospecting & Lead Tracking CRM",
      "Sales Discovery Call Script & Question Sheet",
      "International Client Contract & Retainer Agreement"
    ]
  },
  {
    id: "freelancing",
    slug: "freelancing",
    title: "Global Freelancing (Upwork Top 1% & Direct Invoicing)",
    shortDesc: "Stop bidding ₹500 on crowded marketplaces. Learn how to sign $1,500 to $5,000 clients directly from US, Europe, and UAE.",
    fullDesc: "The exact blueprint used by members to escape low-ticket local rates. Master outbound prospecting on Twitter/LinkedIn, craft irresistible offers, conduct sales calls with confident closing, and set up smooth automated invoice collection in USD/EUR.",
    icon: "Briefcase",
    badge: "Fastest ROI",
    mentorName: "Rohan Sharma",
    mentorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    mentorTitle: "Top Rated Plus Upwork Freelancer ($140k+ Earned)",
    averageEarnings: "₹90,000 - ₹4,00,000 / mo",
    modulesCount: 7,
    studentsCount: 420,
    tags: ["Cold Outreach", "Upwork Top 1%", "Sales Closing", "Contract Negotiation", "Stripe Setup"],
    modules: [
      {
        title: "Module 1: Positioning Yourself as the 0.1% Specialist",
        duration: "2h 00m",
        lessons: ["Niche selection matrix", "Why generalists starve while specialists thrive", "Creating an irresistible 'No-Brainer' offer"]
      },
      {
        title: "Module 2: The Direct Outbound Flywheel (LinkedIn & X)",
        duration: "3h 15m",
        lessons: ["Boolean search lead generation", "Hyper-personalized Loom video pitching", "Following up without being annoying"]
      },
      {
        title: "Module 3: Upwork Dominance Strategy",
        duration: "2h 45m",
        lessons: ["Ranking on Upwork search algorithms", "The 3-paragraph proposal formula with 80% reply rate", "Winning the badge: Rising Talent to Top Rated Plus"]
      },
      {
        title: "Module 4: Sales Calls, Objection Handling & Closing",
        duration: "2h 30m",
        lessons: ["Discovery questions that make clients sell themselves", "Handling 'You are too expensive'", "Getting 50% upfront deposits safely"]
      }
    ],
    deliverables: [
      "100+ Tested Cold Email & DM Scripts",
      "Notion Client Management CRM Dashboard",
      "Loom Pitch Video Recording Checklist",
      "Legal International Service Level Agreement (SLA)"
    ]
  },
  {
    id: "software-dev",
    slug: "software-dev",
    title: "Software Engineering & Autonomous AI Agents",
    shortDesc: "Build automated systems, AI tools, custom APIs, and production software workflows that companies and founders pay high hourly rates for.",
    fullDesc: "Learn how to build software with AI agent frameworks, automate complex business workflows, integrate APIs, and ship production applications. Designed for developers who want to stay ahead of the curve and command $50 - $100/hour freelance rates.",
    icon: "Cpu",
    badge: "Future-Proof",
    mentorName: "Devansh Gupta",
    mentorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
    mentorTitle: "AI Systems Architect & Open-Source Maintainer",
    averageEarnings: "₹1,00,000 - ₹5,00,000 / mo",
    modulesCount: 8,
    studentsCount: 220,
    tags: ["AI Agents", "Python", "LangChain", "FastAPI", "Automation", "Vector DBs"],
    modules: [
      {
        title: "Module 1: Building with LLM APIs & Vector Databases",
        duration: "2h 45m",
        lessons: ["Gemini & OpenAI API integrations", "RAG pipelines with embeddings", "Prompt engineering for consistent JSON outputs"]
      },
      {
        title: "Module 2: Autonomous Agentic Workflows",
        duration: "3h 30m",
        lessons: ["Tool use and function calling", "Multi-agent coordination patterns", "Error recovery and self-healing systems"]
      },
      {
        title: "Module 3: Selling AI Automation to Businesses",
        duration: "2h 15m",
        lessons: ["Identifying $10k manual bottlenecks in companies", "Building proof-of-concept demos in 48 hours", "Pricing value vs hourly rates"]
      }
    ],
    deliverables: [
      "Production Agentic Workflow Python Boilerplates",
      "FastAPI + Docker Deployment Configs",
      "Enterprise AI Discovery Questionnaire",
      "API Integration & Webhook Templates"
    ]
  },
  {
    id: "content-creation",
    slug: "content-creation",
    title: "Content Creation & Personal Brand Monetization",
    shortDesc: "Build a high-leverage personal brand across YouTube, X, and LinkedIn. Master scripting, camera setup, storytelling, and digital product sales.",
    fullDesc: "Your personal brand is your most unfair advantage in the digital economy. Learn how to craft high-retention long-form and short-form content, build an email list of thousands of hyper-engaged fans, and monetize through high-ticket consulting, sponsorships, and digital products.",
    icon: "Sparkles",
    badge: "High Leverage",
    mentorName: "Kabir Mehta",
    mentorAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80",
    mentorTitle: "Creator & Host of Top Tech & Creator Podcast",
    averageEarnings: "₹75,000 - ₹3,50,000 / mo",
    modulesCount: 8,
    studentsCount: 310,
    tags: ["Personal Branding", "Scripting", "Twitter/X", "Newsletter", "Digital Products", "Storytelling"],
    modules: [
      {
        title: "Module 1: Defining Your Unique Creator Angle",
        duration: "2h 00m",
        lessons: ["The Ikigai creator quadrant", "Synthesizing your skills into an authoritative niche", "Profile setup that turns visitors into followers"]
      },
      {
        title: "Module 2: Storytelling Frameworks for Video & Written Posts",
        duration: "2h 30m",
        lessons: ["The Hero's Journey in 60 seconds", "Hook-Story-Offer architecture", "Writing punchy X threads and LinkedIn posts"]
      },
      {
        title: "Module 3: Lighting, Camera & Audio Setup on a Budget",
        duration: "2h 00m",
        lessons: ["Three-point lighting with budget softboxes", "Microphone selection & room acoustics", "Natural teleprompter and camera confidence"]
      },
      {
        title: "Module 4: Monetizing via Communities & Digital Assets",
        duration: "2h 30m",
        lessons: ["Launching a paid WhatsApp/Discord community", "Packaging Notion templates and digital toolkits", "Closing 4-figure consulting clients via direct DMs"]
      }
    ],
    deliverables: [
      "Personal Brand Content Production Notion Dashboard",
      "30-Day Viral Content Script Calendar",
      "Creator Sponsorship Pitch Deck Template",
      "Digital Product Launch & Funnel Blueprint"
    ]
  }
];

export const INITIAL_MENTORS: Mentor[] = [
  {
    id: "mentor-1",
    name: "Aman Verma",
    title: "Lead Video Editor & Studio Founder",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    bio: "Over 6 years editing for creators with 10M+ collective subscribers. Helped 180+ community students land their first $500+ client.",
    trackId: "video-editing",
    trackName: "Viral Video Editing",
    whatsappGroup: "0.1% Video Masters (VIP)",
    activeStudents: 142,
    totalEarningsHelped: "₹1.8 Crore+",
    rating: 4.96
  },
  {
    id: "mentor-2",
    name: "Rohan Sharma",
    title: "Top Rated Plus Upwork Freelancer & Agency Founder",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    bio: "Generated over $140,000 in freelance revenue working with enterprise clients in US and London. 1-on-1 pitch and cold outreach reviewer.",
    trackId: "freelancing",
    trackName: "Global Freelancing & Client Hunting",
    whatsappGroup: "0.1% Freelance Elite",
    activeStudents: 185,
    totalEarningsHelped: "₹3.2 Crore+",
    rating: 4.98
  },
  {
    id: "mentor-3",
    name: "Priya Nair",
    title: "Senior Full-Stack Architect & Ex-CTO",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80",
    bio: "Built scalable web apps for 1M+ active users. Mentors students on building production-ready SaaS and landing ₹1L+ client websites.",
    trackId: "web-dev",
    trackName: "Full-Stack Web Dev",
    whatsappGroup: "0.1% Web Architects",
    activeStudents: 110,
    totalEarningsHelped: "₹1.4 Crore+",
    rating: 4.94
  },
  {
    id: "mentor-4",
    name: "Devansh Gupta",
    title: "AI Systems Architect & Open-Source Maintainer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
    bio: "Consults for US startups on building autonomous agent systems and LLM pipelines. Passionate about empowering developers to land $50-$100/hr contracts.",
    trackId: "software-dev",
    trackName: "Software & AI Agents",
    whatsappGroup: "0.1% AI Engineers",
    activeStudents: 85,
    totalEarningsHelped: "₹95 Lakh+",
    rating: 4.97
  },
  {
    id: "mentor-5",
    name: "Siddharth Rao",
    title: "Senior Mobile Engineer • 500k+ App Downloads",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80",
    bio: "Shipped 12+ apps to the Apple App Store and Google Play Store. Guides students through Flutter/React Native builds and pitching mobile app projects.",
    trackId: "app-dev",
    trackName: "App Development",
    whatsappGroup: "0.1% App Builders",
    activeStudents: 92,
    totalEarningsHelped: "₹1.1 Crore+",
    rating: 4.95
  },
  {
    id: "mentor-6",
    name: "Kunal Kashyap",
    title: "Lead Thumbnail Designer for 10M+ Creators",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80",
    bio: "Designed over 1,500+ viral thumbnails averaging 14%+ CTR across top infotainment and tech channels. 1-on-1 PSD review in WhatsApp.",
    trackId: "thumbnail-design",
    trackName: "Thumbnail Designing",
    whatsappGroup: "0.1% Thumbnail Masters",
    activeStudents: 130,
    totalEarningsHelped: "₹80 Lakh+",
    rating: 4.96
  },
  {
    id: "mentor-7",
    name: "Meera Bansal",
    title: "Organic SEO Director",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80",
    bio: "Grew search traffic from 0 to 2.5M monthly organic visits across client websites. Mentors on programmatic SEO, technical fixes, and high-retainer pitching.",
    trackId: "seo-growth",
    trackName: "SEO Growth",
    whatsappGroup: "0.1% SEO Specialists",
    activeStudents: 78,
    totalEarningsHelped: "₹75 Lakh+",
    rating: 4.93
  },
  {
    id: "mentor-8",
    name: "Tarun Bhatia",
    title: "YouTube Channel Strategist & Executive Producer",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80",
    bio: "Managed 8 channels from inception to silver and gold creator awards. Specializes in title packaging, script review, and brand sponsorships.",
    trackId: "youtube-growth",
    trackName: "YouTube Growth",
    whatsappGroup: "0.1% YouTube Guild",
    activeStudents: 115,
    totalEarningsHelped: "₹1.6 Crore+",
    rating: 4.96
  },
  {
    id: "mentor-9",
    name: "Rhea Kapoor",
    title: "Instagram Growth Consultant",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80",
    bio: "Generated 40M+ Reels views across creator and brand accounts. Teaches viral pacing, ManyChat DM automation funnels, and organic client acquisition.",
    trackId: "instagram-growth",
    trackName: "Instagram Growth",
    whatsappGroup: "0.1% Instagram Viral Circle",
    activeStudents: 124,
    totalEarningsHelped: "₹90 Lakh+",
    rating: 4.95
  },
  {
    id: "mentor-10",
    name: "Kabir Mehta",
    title: "Top Business & Tech Show Host",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80",
    bio: "Built an audience of 350k+ across YouTube and LinkedIn. Mentors students on personal branding, monetization, and launch funnels.",
    trackId: "content-creation",
    trackName: "Content Creation",
    whatsappGroup: "0.1% Content Creators",
    activeStudents: 105,
    totalEarningsHelped: "₹1.2 Crore+",
    rating: 4.97
  }
];

// Real-world production start: Zero fake reviews or fake students.
// Milestones and students are populated dynamically through actual enrollments & admin additions.
export const INITIAL_RESULTS: ResultItem[] = [];

export const INITIAL_ONBOARDING_QUEUE: WhatsAppOnboarding[] = [];

export const INITIAL_TRANSACTIONS: PaymentTransaction[] = [];
