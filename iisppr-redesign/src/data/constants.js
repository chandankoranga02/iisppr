import { D } from "../styles/theme";

// Navigation links
export const NAV_LINKS = ["Program", "Curriculum", "Pricing", "Recognition", "FAQ"];

// Hero statistics
export const HERO_STATS = [
  { value: 18,   suffix: "",   label: "Expert Lectures",    icon: "🎓" },
  { value: 60,   suffix: "",   label: "Day Program",        icon: "📅" },
  { value: 30,   suffix: "+",  label: "Countries Reached",  icon: "🌍" },
  { value: 2400, suffix: "+",  label: "Graduates",          icon: "🏅" },
];

// Trust badges
export const TRUST_BADGES = [
  { icon: "🏛️", text: "Govt. Recognized" },
  { icon: "🌐", text: "UN SDG Aligned" },
  { icon: "📖", text: "ISBN Publication" },
  { icon: "🥇", text: "Gold Medal Program" },
];

// Pricing plans
export const PLANS = [
  {
    id: "student",
    tag: "🎓 Student Offer",
    tagColor: D.sage, tagBg: D.sageSo, tagBorder: `${D.sage}33`,
    name: "Student",
    desc: "For university students and recent graduates. Verify with a valid student ID.",
    actualFee: 8000, price: 4999,
    saving: "37%",
    accent: D.sage, accentSo: D.sageSo, accentGl: D.sageGl,
    bNorm: `${D.sage}28`, bHov: `${D.sage}60`,
    glow: `0 0 50px rgba(94,175,142,0.12)`,
    featured: false, featuredLabel: null,
    cta: "Enroll as Student", ctaFilled: false,
    features: [
      { text: "Full 18-lecture curriculum",  yes: true },
      { text: "60-day online program",        yes: true },
      { text: "Reading materials & PDFs",     yes: true },
      { text: "Certificate of Completion",    yes: true },
      { text: "Gold Medal Eligibility",       yes: true },
      { text: "Live Q&A Sessions",            yes: true },
      { text: "ISBN Book Publication",        yes: false },
    ],
    note: "📋 Student/institute ID required for verification",
    noteColor: D.sage,
  },
  {
    id: "prelaunch",
    tag: "🚀 Pre-Launch Offer",
    tagColor: D.goldBr, tagBg: D.goldSo, tagBorder: `${D.gold}40`,
    name: "Pre-Launch",
    desc: "Lock in the lowest price before the official launch. All standard benefits included.",
    actualFee: 8000, price: 3999,
    saving: "50%",
    accent: D.gold, accentSo: D.goldSo, accentGl: D.goldGl,
    bNorm: `${D.gold}40`, bHov: `${D.gold}80`,
    glow: `0 0 60px rgba(201,151,58,0.2), 0 0 0 1px rgba(201,151,58,0.1) inset`,
    featured: true, featuredLabel: "Best Value",
    cta: "Grab This Offer", ctaFilled: true,
    features: [
      { text: "Full 18-lecture curriculum",  yes: true },
      { text: "60-day online program",        yes: true },
      { text: "Reading materials & PDFs",     yes: true },
      { text: "Certificate of Completion",    yes: true },
      { text: "Gold Medal Eligibility",       yes: false },
      { text: "Live Q&A Sessions",            yes: false },
      { text: "ISBN Book Publication",        yes: false },
    ],
    note: "⚡ Expires at official launch — limited seats",
    noteColor: D.goldBr,
  },
  {
    id: "alumni",
    tag: "🏛️ Alumni / Professional",
    tagColor: D.lav, tagBg: D.lavSo, tagBorder: `${D.lav}33`,
    name: "Alumni & Pro",
    desc: "For IISPPR alumni and working professionals. Get the complete experience including publication.",
    actualFee: 8000, price: 5499,
    saving: "31%",
    accent: D.lav, accentSo: D.lavSo, accentGl: D.lavGl,
    bNorm: `${D.lav}28`, bHov: `${D.lav}60`,
    glow: `0 0 50px rgba(157,143,220,0.10)`,
    featured: false, featuredLabel: "Full Access",
    cta: "Enroll Now", ctaFilled: false,
    features: [
      { text: "Full 18-lecture curriculum",  yes: true },
      { text: "60-day online program",        yes: true },
      { text: "Reading materials & PDFs",     yes: true },
      { text: "Certificate of Completion",    yes: true },
      { text: "Gold Medal Eligibility",       yes: true },
      { text: "Live Q&A Sessions",            yes: true },
      { text: "ISBN Book Publication",        yes: true },
    ],
    note: "🔗 Alumni verified via previous IISPPR certificate",
    noteColor: D.lav,
  },
];

// Course phases
export const PHASES = [
  {
    label: "Foundation", color: D.sage, soft: D.sageSo, border: `${D.sage}30`,
    weeks: "Week 1–2",
    modules: [
      "Public Policy Concepts, Power & Participation",
      "Policy Processes, Institutions & Global Governance",
      "Tools, Trade-offs, and Health Policy Challenges",
    ],
  },
  {
    label: "Core", color: D.gold, soft: D.goldSo, border: `${D.gold}30`,
    weeks: "Week 3–5",
    modules: [
      "Data, Evidence, and Exclusion in Policymaking",
      "AI, Digital Governance, and Crisis Response",
      "Machine Learning for Social Problems — Responsibly",
    ],
  },
  {
    label: "Applied", color: D.lav, soft: D.lavSo, border: `${D.lav}30`,
    weeks: "Week 6–7",
    modules: [
      "Citizen Engagement, Advocacy & Communication Skills",
      "Ground-Level Research: Ethnography & Community Realities",
    ],
  },
  {
    label: "Capstone", color: D.rose, soft: D.roseSo, border: `${D.rose}30`,
    weeks: "Week 8–9",
    modules: [
      "Writing for Influence: Policy Briefs & Scholarly Publishing",
      "Reflective, Critical Approaches to Future Policy Pathways",
      "Final Capstone Submission & Peer Review",
    ],
  },
];

// Course outcomes
export const OUTCOMES = [
  "Understand key concepts in data science, statistics, and visualization",
  "Analyse and interpret public datasets and policy indicators",
  "Apply ML and AI tools to social problems responsibly",
  "Identify biases and ethical challenges in data-driven governance",
  "Communicate findings through data storytelling",
  "Build a policy data dashboard or applied capstone project",
  "Network with professionals in analytics and policy research",
];

// Recognition and awards
export const RECOGNITION_CARDS = [
  {
    icon: "🥇",
    color: D.goldBr, soft: D.goldSo, border: `${D.gold}30`,
    glow: `0 0 40px rgba(201,151,58,0.12)`,
    title: "Gold Medal Award",
    subtitle: "Top 2 Best Papers",
    body: "Participants who demonstrate exceptional critical thinking and research depth are awarded the prestigious Gold Medal — a distinguished recognition on any CV.",
    bullets: ["Showcase work to domain experts", "Gain recognition for original ideas", "Distinguished achievement badge"],
  },
  {
    icon: "📗",
    color: D.sageBr, soft: D.sageSo, border: `${D.sage}28`,
    glow: `0 0 40px rgba(94,175,142,0.10)`,
    title: "ISBN Book Publication",
    subtitle: "Top Selected Papers",
    body: "Outstanding papers are published as official book chapters under IISPPR's own ISBN-registered publication — globally accessible and permanently citable.",
    bullets: ["Part of a citable, global publication", "Academic credibility boost", "Contribute to public policy discourse"],
  },
  {
    icon: "📜",
    color: D.lav, soft: D.lavSo, border: `${D.lav}28`,
    glow: `0 0 40px rgba(157,143,220,0.10)`,
    title: "Certificate of Completion",
    subtitle: "All Graduates",
    body: "Every participant who completes the program and assessments receives an official IISPPR Certificate of Completion, recognized by partner organizations.",
    bullets: ["Official IISPPR-issued certificate", "Demonstrates critical policy skills", "Lifetime access to alumni network"],
  },
];

// FAQs
export const FAQS = [
  {
    q: "Who is this program designed for?",
    a: "This program is tailored for university students, recent graduates, and early-career professionals interested in public policy, data science, and governance. Whether you are aiming for a career in think tanks, public administration, or policy consulting, this provides the foundational and applied skills needed."
  },
  {
    q: "Are there any prerequisites?",
    a: "No prior experience in coding or advanced statistics is required. We start from the foundational concepts of public policy and gradually introduce data science and AI applications in an accessible, applied manner."
  },
  {
    q: "How does the ISBN Book Publication work?",
    a: "Participants in the Alumni/Pro track (or selected top papers from other tracks) will have their final capstone policy brief peer-reviewed. Accepted briefs are compiled, edited, and published as chapters in an official IISPPR book with a registered ISBN, providing you with a permanent, citable academic publication."
  },
  {
    q: "Is the program synchronous or asynchronous?",
    a: "The program features 18 expert lectures delivered online. While we encourage live participation to interact during Q&A sessions, all lectures are recorded and made available so you can learn at your own pace throughout the 60-day period."
  },
  {
    q: "Will I receive a certificate?",
    a: "Yes, every participant who completes the modules and submits the final capstone project will receive a verifiable Certificate of Completion from IISPPR, enhancing your CV and LinkedIn profile."
  }
];
