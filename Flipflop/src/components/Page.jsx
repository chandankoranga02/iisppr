import { motion, useTransform } from 'framer-motion';
import React, { useState } from 'react';
import { Compass, BookOpen } from 'lucide-react';

export const Page = ({ index, totalSheets, smoothProgress, bookContent }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Scroll range step for this specific sheet
  const step = 1 / totalSheets;
  const start = index * step;
  const end = (index + 1) * step;
  const mid = start + step / 2;

  // Strict, mathematical angle mapping to ensure only the active page rotates.
  // Inactive pages are perfectly locked at 0deg or -180deg to prevent stack drift.
  const rotateY = useTransform(smoothProgress, (val) => {
    if (val <= start) return 0;
    if (val >= end) return -180;
    const ratio = (val - start) / (end - start);
    return -180 * ratio;
  });

  // Calculate dynamic z-index to prevent 3D clipping
  // Flipping pages float on top, unflipped stack on right, flipped stack on left
  const zIndex = useTransform(smoothProgress, (val) => {
    if (val > start && val < end) {
      return 100; // floating page
    }
    return val < mid ? totalSheets - index : index;
  });

  // 1. Kinetic Page Bending (Skewing)
  // Page skews slightly during the flip to simulate organic paper flexing
  const skewY = useTransform(rotateY, 
    [0, -45, -90, -135, -180], 
    [0, -4.5, 0, 4.5, 0]
  );

  // Subtle Z-displacement to push active flipping page slightly closer to camera
  const translateZ = useTransform(rotateY,
    [0, -90, -180],
    [0, 30, 0]
  );

  // 2. Dynamic Light Sweep Specular Reflection
  // Shines a white light gradient flare across the page when crossing -90 degrees
  const lightSweepFront = useTransform(rotateY,
    [0, -65, -90, -115, -180],
    [0, 0.45, 0.1, 0, 0]
  );

  const lightSweepBack = useTransform(rotateY,
    [0, -65, -90, -115, -180],
    [0, 0, 0.1, 0.45, 0]
  );

  // 3. Dynamic Under-Page Shadow Casting
  // Casts a dark shadow on the pages below
  // Left shadow is cast when page falls from -90 to -180
  const leftShadowOpacity = useTransform(rotateY,
    [-90, -135, -180],
    [0.7, 0.35, 0]
  );
  const leftShadowScale = useTransform(rotateY,
    [-90, -135, -180],
    [0.85, 0.95, 1.0]
  );

  // Right shadow is cast when page lifts from 0 to -90
  const rightShadowOpacity = useTransform(rotateY,
    [0, -45, -90],
    [0, 0.35, 0.7]
  );
  const rightShadowScale = useTransform(rotateY,
    [0, -45, -90],
    [1.0, 0.95, 0.85]
  );

  // Left Page Parallax translation
  // Moves the photo inside the left page window slightly as it flips
  const parallaxX = useTransform(rotateY,
    [0, -180],
    [30, -30]
  );

  // Hover status tracking

  // Retrieve current content items
  const isCover = index === 0;
  const isBackCover = index === totalSheets - 1;

  // Contents Mapping
  // Sheet i Back Face displays bookContent[i] (Left Page of Spread i + 1)
  const leftContent = !isBackCover ? bookContent[index] : null;
  
  // Sheet i Front Face displays bookContent[i - 1] (Right Page of Spread i)
  const rightContent = !isCover ? bookContent[index - 1] : null;

  return (
    <>
      {/* 3D Under-Shadow Layer (Cast on Right Stack) */}
      <motion.div
        style={{
          opacity: rightShadowOpacity,
          scale: rightShadowScale,
          transformOrigin: 'left center',
          rotateY: 0,
          zIndex: zIndex
        }}
        className="absolute top-0 right-0 w-1/2 h-full pointer-events-none bg-gradient-to-r from-black/80 via-black/40 to-transparent blur-md z-0"
      />

      {/* 3D Under-Shadow Layer (Cast on Left Stack) */}
      <motion.div
        style={{
          opacity: leftShadowOpacity,
          scale: leftShadowScale,
          transformOrigin: 'right center',
          rotateY: 0,
          zIndex: zIndex
        }}
        className="absolute top-0 left-0 w-1/2 h-full pointer-events-none bg-gradient-to-l from-black/80 via-black/40 to-transparent blur-md z-0"
      />

      {/* Main Flipping Sheet Component (Pure scroll control, no hover / animate conflicts) */}
      <motion.div
        style={{
          rotateY,
          skewY,
          translateZ,
          zIndex,
          transformOrigin: 'left center',
        }}
        className="absolute top-0 right-0 w-1/2 h-full preserve-3d transition-shadow duration-300 pointer-events-auto"
      >
        {/* ======================================================== */}
        {/* FRONT OF THE SHEET (Visible on the Right side of spread) */}
        {/* ======================================================== */}
        <motion.div 
          style={{ transformOrigin: 'left center' }}
          animate={isHovered ? {
            rotateY: -3.5,
            translateZ: 12,
            boxShadow: "0 15px 35px -5px rgba(0, 0, 0, 0.65), inset 0 0 15px rgba(0,0,0,0.15)"
          } : {
            rotateY: 0,
            translateZ: 0,
            boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.5), inset 0 0 15px rgba(0,0,0,0.1)"
          }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={() => {
            const currentProgress = smoothProgress.get();
            const activeIndex = Math.min(totalSheets - 1, Math.floor(currentProgress * totalSheets));
            // Hover only the active top page on the right stack when flat
            if (index === activeIndex && currentProgress <= start) {
              setIsHovered(true);
            }
          }}
          onMouseLeave={() => setIsHovered(false)}
          className="absolute inset-0 backface-hidden bg-[#0d121f] rounded-r-2xl border-y border-r border-slate-800/40 shadow-page-3d overflow-hidden flex flex-col z-10 preserve-3d cursor-pointer"
        >
          
          {/* Static creasing shadow gradient inside the page fold seam */}
          <div className="absolute inset-y-0 left-0 w-16 page-crease-right pointer-events-none z-30" />
          <div className="absolute inset-y-0 left-0 w-4 spine-groove-right pointer-events-none z-30" />

          {/* Dynamic Light Sweep flare overlay */}
          <motion.div 
            style={{ opacity: lightSweepFront }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none z-40" 
          />

          {isCover ? (
            /* FRONT COVER CLOSED DESIGN */
            <div className="relative w-full h-full bg-gradient-to-br from-[#0c0f18] via-[#090b11] to-[#040608] flex flex-col justify-between p-12 paper-texture border-l border-slate-900">
              {/* Embossed gold border */}
              <div className="absolute inset-6 border border-[var(--color-gold)]/20 rounded-lg pointer-events-none" />
              <div className="absolute inset-7 border border-[var(--color-gold)]/10 rounded-lg pointer-events-none" />

              <div className="flex justify-between items-start z-10 mt-4">
                <span className="font-display text-[9px] uppercase tracking-[0.3em] text-[var(--color-gold)]/60 font-bold">
                  Volume I
                </span>
                <span className="font-display text-[9px] uppercase tracking-[0.3em] text-[var(--color-gold)]/60 font-bold">
                  Edition MXXVI
                </span>
              </div>

              {/* Center Medallion Title */}
              <div className="flex flex-col items-center text-center z-10 my-auto">
                <div className="w-16 h-16 rounded-full border border-[var(--color-gold)]/30 flex items-center justify-center mb-8 bg-[#090c12] shadow-inner">
                  <Compass className="w-8 h-8 text-[var(--color-gold)] stroke-[1]" />
                </div>
                
                <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-wide leading-none mb-4">
                  The Story <br />
                  <span className="italic text-[var(--color-gold)] font-normal">Unfolds</span>
                </h1>
                
                <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-gold)]/40 to-transparent my-4" />
                
                <p className="font-display text-xs text-slate-400 font-light max-w-xs leading-relaxed uppercase tracking-[0.18em]">
                  An Interactive 3D Scroll Journey
                </p>
              </div>

              {/* Footer and Interactive Hint */}
              <div className="flex flex-col items-center gap-4 z-10 mb-4">
                <div className="flex items-center gap-2">
                  <span className="font-display text-[8px] uppercase tracking-[0.25em] text-slate-500">
                    Scroll down to open
                  </span>
                </div>
                {/* Visual folding corner indicator at bottom right */}
                <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-[var(--color-gold)]/20 to-transparent pointer-events-none rounded-br-2xl page-corner-lift" />
              </div>
            </div>
          ) : (
            /* STANDARD RIGHT PAGE: RICH CREAMS EDITORIAL Chapter Page */
            <div className="relative w-full h-full bg-[#fdfcf9] text-slate-900 flex flex-col justify-between p-8 sm:p-12 paper-texture">
              
              {/* Elegant header */}
              <div className="flex justify-between items-center z-10 border-b border-slate-200/60 pb-3">
                <span className="font-display text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">
                  {rightContent.chapter}
                </span>
                <span className="font-display text-[10px] uppercase tracking-[0.2em] text-slate-500">
                  Digital Craftsmanship
                </span>
              </div>

              {/* Editorial grid */}
              <div className="flex flex-col justify-center flex-grow z-10 my-auto py-6">
                
                {/* Chapter Icon */}
                <div className="mb-4">
                  {rightContent.icon}
                </div>

                {/* Subtitle Tag */}
                <span className="font-display text-[10px] uppercase tracking-[0.25em] text-[var(--color-copper)] font-semibold mb-2">
                  {rightContent.subtitle}
                </span>

                {/* Book Title */}
                <h2 className="font-editorial text-4xl sm:text-[2.85rem] font-medium leading-[1.05] text-slate-950 tracking-tight mb-6">
                  {rightContent.title}
                </h2>

                <div className="w-16 h-[2px] bg-[var(--color-copper)]/40 mb-6" />

                {/* Body Content with Drop Cap */}
                <p className="font-display text-[13px] sm:text-[14.5px] leading-relaxed text-slate-700 font-light antialiased max-w-lg">
                  <span className="font-editorial text-5xl float-left mr-2 mt-1 leading-[0.8] font-bold text-[var(--color-copper)] select-none">
                    {rightContent.content.charAt(0)}
                  </span>
                  {rightContent.content.substring(1)}
                </p>

                {/* Cinematic Block Quote overlay */}
                {rightContent.quote && (
                  <div className="mt-8 border-l border-[var(--color-copper)]/30 pl-4 py-1 italic font-editorial text-base text-slate-500 max-w-md">
                    "{rightContent.quote}"
                  </div>
                )}

              </div>

              {/* Page Number footer */}
              <div className="flex justify-end items-center z-10 border-t border-slate-200/60 pt-3">
                <span className="font-editorial text-sm font-semibold text-slate-400 font-mono italic">
                  {(index * 2) + 1}
                </span>
              </div>

              {/* Lift corner fold outline indicator */}
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-slate-200/30 rounded-br-2xl pointer-events-none" />
            </div>
          )}
        </motion.div>

        {/* ======================================================= */}
        {/* BACK OF THE SHEET (Visible on the Left side when flipped) */}
        {/* ======================================================= */}
        <div 
          className="absolute inset-0 backface-hidden bg-[#0d121f] rounded-l-2xl border-y border-l border-slate-800/40 shadow-page-3d overflow-hidden flex flex-col z-10 preserve-3d"
          style={{ transform: 'rotateY(180deg)' }}
        >
          {/* Static creasing shadow gradient inside the page fold seam */}
          <div className="absolute inset-y-0 right-0 w-16 page-crease-left pointer-events-none z-30" />
          <div className="absolute inset-y-0 right-0 w-4 spine-groove-left pointer-events-none z-30" />

          {/* Dynamic Light Sweep flare overlay */}
          <motion.div 
            style={{ opacity: lightSweepBack }}
            className="absolute inset-0 bg-gradient-to-l from-transparent via-white/20 to-transparent pointer-events-none z-40" 
          />

          {isBackCover ? (
            /* BACK COVER CLOSED DESIGN */
            <div className="relative w-full h-full bg-gradient-to-bl from-[#0c0f18] via-[#090b11] to-[#040608] flex flex-col justify-between p-12 paper-texture border-r border-slate-900">
              {/* Embossed gold border */}
              <div className="absolute inset-6 border border-[var(--color-gold)]/20 rounded-lg pointer-events-none" />

              <div className="flex justify-between items-start z-10 mt-4">
                <span className="font-display text-[9px] uppercase tracking-[0.3em] text-[var(--color-gold)]/40">
                  Antigravity Creative
                </span>
                <span className="font-display text-[9px] uppercase tracking-[0.3em] text-[var(--color-gold)]/40">
                  MXXVI
                </span>
              </div>

              {/* Embossed logo */}
              <div className="flex flex-col items-center text-center z-10 my-auto">
                <div className="w-12 h-12 rounded-full border border-[var(--color-gold)]/25 flex items-center justify-center mb-6 bg-[#090c12]/40">
                  <Compass className="w-5 h-5 text-[var(--color-gold)]/50 stroke-[1]" />
                </div>
                <h3 className="font-editorial text-2xl font-light text-slate-300 tracking-wider mb-2">
                  THE END
                </h3>
                <div className="w-12 h-[1px] bg-[var(--color-gold)]/30 my-3" />
                <p className="font-display text-[9px] uppercase tracking-[0.2em] text-slate-500 max-w-[200px] leading-relaxed">
                  Thank you for embarking on this visual journey
                </p>
              </div>

              <div className="flex justify-center z-10 mb-4">
                <span className="font-display text-[8px] uppercase tracking-[0.2em] text-slate-600">
                  All rights reserved
                </span>
              </div>
            </div>
          ) : (
            /* STANDARD LEFT PAGE: CINEMATIC IMAGES LAYER with Parallax Overlay */
            <div className="relative w-full h-full bg-slate-950 overflow-hidden flex flex-col justify-between">
              
              {/* Immersive high-res photo with horizontal parallax drift */}
              <motion.div 
                style={{ x: parallaxX }}
                className="absolute inset-0 w-[120%] h-full left-[-10%]"
              >
                <img 
                  src={leftContent.image} 
                  alt={leftContent.title} 
                  className="w-full h-full object-cover select-none filter brightness-[0.6] contrast-[1.08] saturate-[0.9]"
                />
                {/* Vignette shadows */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080b11] via-transparent to-[#080b11]/30 z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#080b11]/60 via-transparent to-transparent z-10" />
              </motion.div>

              {/* Overlay HUD stats & coordinates */}
              <div className="relative z-20 p-8 sm:p-12 flex flex-col justify-between h-full">
                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                  <span className="font-display text-[10px] uppercase tracking-[0.2em] text-white/50">
                    {leftContent.chapter}
                  </span>
                  <span className="font-display text-[10px] uppercase tracking-[0.2em] text-white/50">
                    Aesthetic Canvas
                  </span>
                </div>

                {/* Immersive huge chapter stamp inside image overlay */}
                <div className="my-auto py-8">
                  <div className="font-editorial text-[7rem] sm:text-[10rem] font-bold text-white/5 select-none leading-none tracking-tighter mb-2">
                    {leftContent.id.toString().padStart(2, '0')}
                  </div>
                  
                  {/* Floating Glassmorphic Caption Card */}
                  <div className="glass-panel p-4 rounded-xl border-white/10 max-w-xs mt-[-2rem] ml-4">
                    <span className="font-display text-[9px] uppercase tracking-[0.25em] text-[var(--color-gold)] font-bold mb-1 block">
                      Visual Fragment
                    </span>
                    <p className="font-display text-[11px] leading-relaxed text-slate-300 font-light">
                      Synthesized artwork demonstrating high-fidelity composition details.
                    </p>
                  </div>
                </div>

                {/* Footer and left page number */}
                <div className="flex justify-between items-center border-t border-white/10 pt-3">
                  <span className="font-display text-[9px] uppercase tracking-[0.2em] text-white/40">
                    Spread Index
                  </span>
                  <span className="font-editorial text-sm font-semibold text-white/40 font-mono italic">
                    {(index * 2) + 2}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
};
