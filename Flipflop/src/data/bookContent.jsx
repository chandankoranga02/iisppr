import { BookOpen, Lightbulb, Rocket, Zap } from 'lucide-react';
import React from 'react';

export const bookContent = [
  {
    id: 1,
    chapter: "CHAPTER I",
    title: "The Genesis",
    subtitle: "A New Chapter in Digital Experience",
    content: "We believe that interacting with the digital world should feel natural, immersive, and fundamentally beautiful. This journey begins by reimagining the boundaries of the web, blending physical interaction with state-of-the-art visual craftsmanship.",
    icon: <BookOpen className="w-10 h-10 text-[var(--color-gold)] mb-4 stroke-[1.5]" />,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop",
    quote: "A perfect blend of technology and human touch."
  },
  {
    id: 2,
    chapter: "CHAPTER II",
    title: "Research & Insights",
    subtitle: "Data-Driven Aesthetics",
    content: "Beneath every stunning interface lies a foundation of rigorous cognitive research. We analyze human scroll behavior and visual stress thresholds to craft layouts that feel intuitive, elegant, and perfectly balanced to the eye.",
    icon: <Lightbulb className="w-10 h-10 text-[var(--color-gold)] mb-4 stroke-[1.5]" />,
    image: "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?q=80&w=1600&auto=format&fit=crop",
    quote: "Designing for the subconscious mind."
  },
  {
    id: 3,
    chapter: "CHAPTER III",
    title: "Innovation Engine",
    subtitle: "Pushing the Envelope",
    content: "By leveraging modern GPU capabilities, dynamic spring equations, and hardware acceleration, we transform static elements into living web experiences. We don't build pages; we build responsive digital ecosystems.",
    icon: <Rocket className="w-10 h-10 text-[var(--color-gold)] mb-4 stroke-[1.5]" />,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop",
    quote: "Fluid movement is the language of the modern web."
  },
  {
    id: 4,
    chapter: "CHAPTER IV",
    title: "The Future is Now",
    subtitle: "Unleashing Performance",
    content: "Uncompromised performance is the cornerstone of premium experiences. Our architectures are engineered from the ground up to render at 60 frames per second, ensuring high-fidelity interaction on any device.",
    icon: <Zap className="w-10 h-10 text-[var(--color-gold)] mb-4 stroke-[1.5]" />,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop",
    quote: "Speed is the ultimate canvas of design."
  }
];
