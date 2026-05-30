import { Globe, Shield, BookOpen, Landmark, GraduationCap } from 'lucide-react';
import React from 'react';

/**
 * ========================================================
 * BOOK CONTENT DATA - IISPPR RESEARCH SHOWCASE
 * ========================================================
 * This data array drives the page spreads of the interactive 3D book.
 * Each object represents one editorial chapter or section:
 * - chapter: The Roman numeral chapter label.
 * - title: Large serif title for the editorial page.
 * - subtitle: Small gold tagline outlining the topic.
 * - content: Refined copy representing IISPPR's initiatives.
 * - icon: Lucide-react component styled with the gold theme.
 * - image: Curated, high-resolution Unsplash photo with dark academic tones.
 * - quote: Majestic blockquote that fits underneath the body text.
 */
export const bookContent = [
  {
    id: 1,
    chapter: "CHAPTER I",
    title: "About IISPPR",
    subtitle: "Advancing Global Sustainability",
    content: "The International Institute of SDGs & Public Policy Research is committed to advancing sustainable development through rigorous research, public policy analysis, innovative education models, and collaborative community engagement. The institute actively works towards creating meaningful social impact by addressing contemporary global challenges through evidence-based insights.",
    icon: <Globe className="w-10 h-10 text-[var(--color-gold)] mb-4 stroke-[1.2]" />,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop",
    quote: "Bridging the gap between empirical science and public welfare."
  },
  {
    id: 2,
    chapter: "CHAPTER II",
    title: "Sustainable Goals",
    subtitle: "United Nations SDG Alignment",
    content: "IISPPR aligns its core research initiatives and community outreach with the United Nations Sustainable Development Goals (SDGs). By focusing on educational equity, poverty reduction, gender equality, environmental sustainability, and inclusive industrial growth, we translate global targets into localized, actionable strategies.",
    icon: <Shield className="w-10 h-10 text-[var(--color-gold)] mb-4 stroke-[1.2]" />,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1600&auto=format&fit=crop",
    quote: "Advancing the 2030 Agenda through localized research."
  },
  {
    id: 3,
    chapter: "CHAPTER III",
    title: "Research & Journals",
    subtitle: "Evidence-Based Policy Making",
    content: "The institute promotes high-quality academic research and encourages evidence-based policy making through scholarly journals, extensive reports, policy briefs, case studies, and interdisciplinary research projects. We provide researchers, scientists, and analysts a premium platform to publish findings that shape public guidelines.",
    icon: <BookOpen className="w-10 h-10 text-[var(--color-gold)] mb-4 stroke-[1.2]" />,
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1600&auto=format&fit=crop",
    quote: "Encouraging rigorous scholarship for modern policy challenges."
  },
  {
    id: 4,
    chapter: "CHAPTER IV",
    title: "Policy & Innovation",
    subtitle: "Designing Strategic Solutions",
    content: "Through policy research, collaborative focus groups, and innovation-driven digital solutions, IISPPR actively supports governments, non-profit organizations, and local communities in designing, deploying, and evaluating effective strategies that ensure long-term, equitable, and sustainable regional development.",
    icon: <Landmark className="w-10 h-10 text-[var(--color-gold)] mb-4 stroke-[1.2]" />,
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1600&auto=format&fit=crop",
    quote: "Transforming governance through scientific insight and technology."
  },
  {
    id: 5,
    chapter: "CHAPTER V",
    title: "Internships & Learning",
    subtitle: "Empowering Tomorrow's Leaders",
    content: "Students and young professionals gain practical, real-world exposure through IISPPR's immersive internships, collaborative policy projects, international leadership opportunities, and structured mentorship programs. We foster critical thinking and professional research skills to nurture the next generation of global policy makers.",
    icon: <GraduationCap className="w-10 h-10 text-[var(--color-gold)] mb-4 stroke-[1.2]" />,
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1600&auto=format&fit=crop",
    quote: "Developing visual and empirical skills for leadership."
  }
];
