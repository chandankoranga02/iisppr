import React from 'react';
import { Book } from './components/Book';
import { Compass, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

function App() {
  return (
    <div className="min-h-screen bg-[#080b11] text-slate-100 font-sans selection:bg-[var(--color-gold)]/30 selection:text-white">
      
      {/* Intro Landing Section (Awwwards Style Hero) */}
      <section className="relative h-screen flex flex-col justify-between items-center text-center px-6 overflow-hidden bg-[#080b11] z-10 py-12">
        {/* Decorative Grid Mesh Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[160px] pointer-events-none z-0" />
        
        {/* Floating Brand Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2.5 z-10 glass-panel py-1.5 px-4 rounded-full border-white/5"
        >
          <Compass className="w-4 h-4 text-[var(--color-gold)] stroke-[1.5]" />
          <span className="font-display text-[9px] uppercase tracking-[0.25em] font-semibold text-slate-300">
            Antigravity Creative Lab
          </span>
        </motion.div>

        {/* Big Editorial Hero Text */}
        <div className="flex flex-col items-center justify-center z-10 my-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-display text-xs uppercase tracking-[0.35em] text-[var(--color-gold)] font-bold mb-4 block">
              EST. MXXVI
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-editorial text-5xl sm:text-7xl lg:text-[5.5rem] font-light leading-[1.05] tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-500 max-w-4xl"
          >
            When Pixels <span className="italic font-normal text-[var(--color-gold)]">Turn</span> Into Paper
          </motion.h1>
          
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut" }}
            className="h-[1px] bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent my-8" 
          />

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-sm sm:text-base text-slate-400 max-w-2xl font-light leading-relaxed tracking-wider"
          >
            Reimagining the digital book as a physical interactive canvas. Scroll down to experience weighted spring page physics, tactile textures, and specular light sweeps.
          </motion.p>
        </div>

        {/* Scroll Prompt indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-col items-center gap-2 text-slate-500 z-10 pointer-events-none"
        >
          <span className="font-display text-[9px] uppercase tracking-[0.25em] font-semibold">
            Begin the Journey
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 text-[var(--color-gold)]" />
          </motion.div>
        </motion.div>
      </section>

      {/* The Interactive Book Section */}
      <Book />

      {/* Outro Ending Section (Premium CTA) */}
      <section className="relative h-screen flex flex-col justify-between items-center text-center px-6 overflow-hidden bg-[#05070a] z-10 py-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.04),transparent_70%)] pointer-events-none z-0" />
        
        <div className="w-full flex justify-center z-10">
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />
        </div>

        {/* Editorial Ending CTA */}
        <div className="flex flex-col items-center justify-center z-10 my-auto">
          <span className="font-display text-[10px] uppercase tracking-[0.3em] text-[var(--color-gold)] font-bold mb-6 block">
            EPILOGUE
          </span>
          
          <h2 className="font-editorial text-4xl sm:text-6xl font-light leading-none text-white tracking-wide max-w-2xl mb-8">
            Create Your Next <br />
            <span className="italic font-normal text-[var(--color-gold)]">Interactive Legend</span>
          </h2>
          
          <p className="font-display text-sm text-slate-400 max-w-md font-light leading-relaxed tracking-wider mb-10">
            Let's translate your stories into immersive digital experiences that captivate, educate, and inspire.
          </p>

          <button 
            className="group relative px-8 py-4 bg-transparent text-[var(--color-gold)] border border-[var(--color-gold)]/40 rounded-full font-display text-xs uppercase tracking-[0.2em] font-semibold overflow-hidden transition-all duration-300 hover:text-[#05070a] hover:border-[var(--color-gold)] hover:shadow-[0_0_40px_rgba(223,194,125,0.25)] pointer-events-auto cursor-pointer"
            onClick={() => window.open('mailto:hello@antigravity.co', '_blank')}
          >
            {/* Hover overlay background slider */}
            <div className="absolute inset-0 bg-[var(--color-gold)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left -z-10" />
            Get In Touch
          </button>
        </div>

        <div className="flex flex-col items-center gap-3 z-10">
          <span className="font-display text-[9px] uppercase tracking-[0.25em] text-slate-500 font-semibold">
            Antigravity © 2026
          </span>
          <div className="w-[1px] h-6 bg-gradient-to-b from-slate-800 to-transparent" />
        </div>
      </section>

    </div>
  );
}

export default App;
