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
    content: "The International Institute of SDGs & Public Policy Research is dedicated to advancing sustainable development through research, education, policy analysis, and community engagement. The institute works to create meaningful social impact by addressing contemporary global challenges.",
    icon: <Globe className="w-10 h-10 text-[var(--color-gold)] mb-4 stroke-[1.2]" />,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop",
    quote: "Bridging the gap between empirical science and public welfare."
  },
  {
    id: 2,
    chapter: "CHAPTER II",
    title: "Sustainable Development Goals",
    subtitle: "United Nations SDG Alignment",
    content: "IISPPR aligns its initiatives with the United Nations Sustainable Development Goals (SDGs), focusing on quality education, poverty reduction, gender equality, environmental sustainability, and inclusive development.",
    icon: <Shield className="w-10 h-10 text-[var(--color-gold)] mb-4 stroke-[1.2]" />,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1600&auto=format&fit=crop",
    quote: "Advancing the 2030 Agenda through localized research."
  },
  {
    id: 3,
    chapter: "CHAPTER III",
    title: "Research & Publications",
    subtitle: "Evidence-Based Policy Making",
    content: "The institute promotes high-quality academic research and evidence-based policy making through journals, reports, case studies, and interdisciplinary projects that contribute to societal development.",
    icon: <BookOpen className="w-10 h-10 text-[var(--color-gold)] mb-4 stroke-[1.2]" />,
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1600&auto=format&fit=crop",
    quote: "Encouraging rigorous scholarship for modern policy challenges."
  },
  {
    id: 4,
    chapter: "CHAPTER IV",
    title: "Public Policy & Innovation",
    subtitle: "Designing Strategic Solutions",
    content: "Through policy research and innovation-driven solutions, IISPPR supports governments, organizations, and communities in designing effective strategies for sustainable and equitable development.",
    icon: <Landmark className="w-10 h-10 text-[var(--color-gold)] mb-4 stroke-[1.2]" />,
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1600&auto=format&fit=crop",
    quote: "Transforming governance through scientific insight and technology."
  },
  {
    id: 5,
    chapter: "CHAPTER V",
    title: "Internships & Learning",
    subtitle: "Empowering Tomorrow's Leaders",
    content: "Students gain practical exposure through internships, collaborative projects, leadership opportunities, mentorship programs, and research-based learning experiences.",
    icon: <GraduationCap className="w-10 h-10 text-[var(--color-gold)] mb-4 stroke-[1.2]" />,
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1600&auto=format&fit=crop",
    quote: "Developing visual and empirical skills for leadership."
  }
];
