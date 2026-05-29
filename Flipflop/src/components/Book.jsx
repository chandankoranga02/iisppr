import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import React, { useRef, useEffect, useState } from 'react';
import { bookContent } from '../data/bookContent';
import { Page } from './Page';

// Subcomponent to adhere to React Rules of Hooks (hooks must not be called inside loops)
const NavigationDot = ({ idx, totalSheets, smoothProgress, scrollToPercent }) => {
  // Correctly aligned step intervals matching the 5 page transition zones (size 0.2 each)
  const step = 1 / totalSheets;
  const targetPercent = idx * step;
  const label = idx === 0 ? "Cover" : idx === totalSheets ? "End" : `Ch.${idx}`;

  const backgroundColor = useTransform(
    smoothProgress,
    [targetPercent - 0.1, targetPercent, targetPercent + 0.1],
    ["rgba(255,255,255,0.2)", "rgba(223,194,125,1)", "rgba(255,255,255,0.2)"]
  );

  const scale = useTransform(
    smoothProgress,
    [targetPercent - 0.1, targetPercent, targetPercent + 0.1],
    [1, 1.25, 1]
  );

  return (
    <button 
      onClick={() => scrollToPercent(targetPercent)}
      className="group flex flex-col items-center cursor-pointer focus:outline-none"
    >
      <motion.div 
        style={{
          backgroundColor,
          scale
        }}
        className="w-2 h-2 rounded-full transition-colors duration-300" 
      />
      <span className="font-display text-[9px] uppercase tracking-wider text-slate-500 group-hover:text-slate-200 mt-1 transition-colors font-semibold">
        {label}
      </span>
    </button>
  );
};

export const Book = () => {
  const containerRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [windowHeight, setWindowHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 800);

  // Monitor resize to recalculate scaling
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Adaptive scaling ratio calculation based on window dimensions
  const baseWidth = 1200;
  const baseHeight = 780; // 1200px / (2/1.3 aspect ratio)
  
  let scale = 1.0;
  if (windowWidth < baseWidth) {
    scale = (windowWidth - 32) / baseWidth; // padding-sensitive width scale
  }
  
  // Height constraint scaling
  const currentHeight = baseHeight * scale;
  if (windowHeight < currentHeight + 140) {
    scale = (windowHeight - 140) / baseHeight;
  }
  
  // Set bounding limits
  scale = Math.max(0.38, Math.min(1.0, scale));

  // Set comfortable scrolling length - 90vh per page transition
  const totalSheets = bookContent.length + 1; // 4 chapters + 1 cover
  const scrollHeightMultiplier = 110; // vh per sheet flip
  const containerHeight = `${totalSheets * scrollHeightMultiplier}vh`;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Spring physics for ultra-smooth easing and inertia
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,  // Low stiffness for luxurious, weighted slow flip
    damping: 26,    // Damped to prevent spring oscillation
    mass: 0.9       // Gives page a feeling of heavy organic paper
  });

  // Dynamic Page Thickness (Decks)
  // Left Deck gets thicker as scroll increases, Right Deck gets thinner
  const leftDeckWidth = useTransform(smoothProgress, [0, 1], [0, 8]);
  const rightDeckWidth = useTransform(smoothProgress, [0, 1], [8, 0]);
  const leftDeckOpacity = useTransform(smoothProgress, [0, 0.05], [0, 1]);
  const rightDeckOpacity = useTransform(smoothProgress, [0.95, 1], [1, 0]);

  // Click-to-scroll navigation handler
  const scrollToPercent = (percent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const elementTop = rect.top + scrollTop;
    const elementHeight = rect.height;
    
    // Account for window height to avoid landing exactly at the boundary
    const targetScroll = elementTop + (percent * (elementHeight - window.innerHeight));
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full bg-[#080b11] select-none"
      style={{ height: containerHeight }}
    >
      {/* Sticky Container: Holds the book in viewport center while scrolling */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 md:px-12">
        
        {/* Cinematic Backdrop Glow Canvas */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 bg-[#080b11]">
          {/* Cyan/Blue Aura */}
          <div className="absolute top-[20%] left-[30%] w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[130px] animate-glow-slow" />
          {/* Indigo/Violet Aura */}
          <div className="absolute bottom-[20%] right-[30%] w-[700px] h-[700px] rounded-full bg-violet-600/10 blur-[150px] animate-glow-delayed" />
          {/* Golden Ambient Reflection */}
          <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-yellow-500/5 blur-[120px]" />
        </div>

        {/* Minimal Premium Editorial HUD: Top Header */}
        <div className="absolute top-8 left-0 right-0 px-6 sm:px-16 flex items-center justify-between z-40 pointer-events-none">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />
            <span className="font-display text-xs uppercase tracking-[0.25em] text-slate-400 font-semibold">
              The Digital Chronicles
            </span>
          </div>
          <span className="font-editorial italic text-sm text-[var(--color-gold)]/60">
            A Cinematic Scroll Narrative
          </span>
        </div>

        {/* Immersive 3D Book Container with Responsive Scaling */}
        <div 
          style={{ 
            transform: `scale(${scale}) translateZ(0)`,
            transformOrigin: 'center center',
            transition: 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          className="relative w-full max-w-6xl aspect-[2/1.3] z-10 flex items-center justify-center preserve-3d"
        >
          
          {/* Static Book Covers (Hardbacks) */}
          {/* Left Hardback Cover */}
          <div 
            className="absolute top-[-8px] bottom-[-8px] right-1/2 w-[50.5%] bg-gradient-to-l from-slate-900 via-slate-950 to-slate-900 rounded-l-[1.8rem] shadow-book-3d border-y border-l border-slate-800/40 origin-right transition-transform"
            style={{
              boxShadow: 'inset -20px 0 30px rgba(0,0,0,0.8), -15px 25px 40px rgba(0,0,0,0.8)',
              paddingRight: '6px'
            }}
          >
            {/* Inner leather border */}
            <div className="w-full h-full border border-slate-800/60 rounded-l-[1.5rem] opacity-30 bg-radial-gradient" />
          </div>
          
          {/* Right Hardback Cover */}
          <div 
            className="absolute top-[-8px] bottom-[-8px] left-1/2 w-[50.5%] bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 rounded-r-[1.8rem] shadow-book-3d border-y border-r border-slate-800/40 origin-left transition-transform"
            style={{
              boxShadow: 'inset 20px 0 30px rgba(0,0,0,0.8), 15px 25px 40px rgba(0,0,0,0.8)',
              paddingLeft: '6px'
            }}
          >
            {/* Inner leather border */}
            <div className="w-full h-full border border-slate-800/60 rounded-r-[1.5rem] opacity-30 bg-radial-gradient" />
          </div>

          {/* Dynamic Page Thickness (Decks) */}
          {/* Left Deck (Paper edges stacking up) */}
          <motion.div 
            style={{ 
              width: leftDeckWidth, 
              opacity: leftDeckOpacity,
              boxShadow: '0 8px 16px rgba(0,0,0,0.5)'
            }}
            className="absolute top-[2px] bottom-[2px] right-1/2 bg-slate-800 border-y border-l border-slate-700/40 rounded-l shadow-inner origin-right z-5 overflow-hidden"
          >
            {/* Multi-layered edge lines overlay */}
            <div className="w-full h-full opacity-60 bg-[repeating-linear-gradient(to_bottom,transparent,transparent_2px,rgba(255,255,255,0.08)_2px,rgba(255,255,255,0.08)_4px)] bg-slate-200/5" />
          </motion.div>

          {/* Right Deck (Paper edges peeling off) */}
          <motion.div 
            style={{ 
              width: rightDeckWidth, 
              opacity: rightDeckOpacity,
              boxShadow: '0 8px 16px rgba(0,0,0,0.5)'
            }}
            className="absolute top-[2px] bottom-[2px] left-1/2 bg-slate-800 border-y border-r border-slate-700/40 rounded-r shadow-inner origin-left z-5 overflow-hidden"
          >
            {/* Multi-layered edge lines overlay */}
            <div className="w-full h-full opacity-60 bg-[repeating-linear-gradient(to_bottom,transparent,transparent_2px,rgba(255,255,255,0.08)_2px,rgba(255,255,255,0.08)_4px)] bg-slate-200/5" />
          </motion.div>

          {/* Book Spine (3D cylindrical center fold) */}
          <div 
            className="absolute top-[-8px] bottom-[-8px] left-1/2 -translate-x-1/2 w-6 sm:w-10 bg-gradient-to-r from-[#030508] via-slate-850 to-[#030508] border-x border-slate-900/60 z-30 shadow-[0_0_30px_rgba(0,0,0,0.95)] flex flex-col justify-between py-12"
            style={{
              boxShadow: 'inset 0 0 12px rgba(255,255,255,0.03), 0 0 40px rgba(0,0,0,0.6)'
            }}
          >
            {/* Embossed gold binding threads */}
            <div className="w-full h-0.5 bg-[var(--color-gold)]/20 shadow-sm" />
            <div className="w-full flex flex-col items-center gap-1.5 opacity-30">
              <div className="w-1 h-1 rounded-full bg-[var(--color-gold)]" />
              <div className="w-0.5 h-6 bg-gradient-to-b from-[var(--color-gold)] via-transparent to-[var(--color-gold)]" />
              <div className="w-1 h-1 rounded-full bg-[var(--color-gold)]" />
            </div>
            <div className="w-full h-0.5 bg-[var(--color-gold)]/20 shadow-sm" />
          </div>

          {/* Flipping 3D Sheets */}
          {Array.from({ length: totalSheets }).map((_, index) => (
            <Page 
              key={index} 
              index={index} 
              totalSheets={totalSheets} 
              smoothProgress={smoothProgress} 
              bookContent={bookContent}
            />
          ))}

        </div>

        {/* Minimal Premium Editorial HUD: Bottom Controls */}
        <div className="absolute bottom-6 left-0 right-0 px-6 sm:px-16 flex flex-col items-center gap-4 z-40 w-full">
          
          {/* Sleek Progress / Chapter Slider Panel */}
          <div className="glass-panel py-3 px-6 sm:px-8 rounded-full flex items-center justify-between gap-6 max-w-xl w-full pointer-events-auto">
            {/* Scroll indicators / Dots */}
            <div className="flex items-center gap-5 sm:gap-6">
              {Array.from({ length: totalSheets + 1 }).map((_, idx) => (
                <NavigationDot 
                  key={idx}
                  idx={idx}
                  totalSheets={totalSheets}
                  smoothProgress={smoothProgress}
                  scrollToPercent={scrollToPercent}
                />
              ))}
            </div>

            {/* Micro-progress line bar */}
            <div className="flex-1 h-[2px] bg-slate-800 rounded-full overflow-hidden relative min-w-[60px] sm:min-w-[100px]">
              <motion.div 
                style={{ 
                  scaleX: smoothProgress,
                  originX: 0
                }}
                className="absolute inset-y-0 left-0 bg-[var(--color-gold)] w-full"
              />
            </div>

            {/* Page percentage indicator */}
            <motion.span 
              className="font-display text-[10px] font-semibold tracking-widest text-[var(--color-gold)]/90 min-w-[32px] text-right"
              style={{
                opacity: 0.9
              }}
            >
              {useTransform(smoothProgress, (val) => `${Math.min(100, Math.max(0, Math.round(val * 100)))}%`)}
            </motion.span>
          </div>

          {/* Centered scroll guidance */}
          <motion.div 
            className="flex flex-col items-center gap-1.5 text-slate-500 opacity-60"
            style={{
              opacity: useTransform(smoothProgress, [0, 0.05], [0.6, 0])
            }}
          >
            <span className="font-display text-[9px] uppercase tracking-[0.25em] font-semibold animate-pulse">
              Scroll down to flip pages
            </span>
          </motion.div>

        </div>

      </div>
    </div>
  );
};
