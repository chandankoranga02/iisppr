import { BookOpen, Lightbulb, Rocket, Zap } from 'lucide-react';
import React from 'react';

export const bookContent = [
  {
    id: 1,
    title: "The Genesis",
    subtitle: "A New Chapter in Digital Experience",
    content: "We believe that interacting with the digital world should feel natural, immersive, and fundamentally beautiful. This journey begins by reimagining the very boundaries of the web.",
    icon: <BookOpen className="w-12 h-12 text-primary mb-6" />,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Research & Insights",
    subtitle: "Data-Driven Aesthetics",
    content: "Beneath every stunning interface lies a foundation of rigorous research. We analyze user behaviors and cognitive load to craft experiences that are as intuitive as they are visually striking.",
    icon: <Lightbulb className="w-12 h-12 text-primary mb-6" />,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Innovation Engine",
    subtitle: "Pushing the Envelope",
    content: "By leveraging modern web APIs, WebGL, and advanced physics-based animation libraries, we transform static layouts into living, breathing digital environments.",
    icon: <Rocket className="w-12 h-12 text-primary mb-6" />,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "The Future is Now",
    subtitle: "Unleashing Performance",
    content: "Performance is not a feature; it's a prerequisite. Our architectures are designed from the ground up to deliver buttery-smooth 60fps animations across all devices, unconditionally.",
    icon: <Zap className="w-12 h-12 text-primary mb-6" />,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop",
  }
];
