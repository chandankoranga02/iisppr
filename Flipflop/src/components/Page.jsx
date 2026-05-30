import { motion, useTransform } from 'framer-motion';
import React, { useState } from 'react';
import { Compass, FileText } from 'lucide-react';

/**
 * ========================================================
 * PAGE COMPONENT - DOUBLE-SIDED 3D SHEET RENDERER
 * ========================================================
 * This component represents one physical sheet of the book:
 * - A single sheet is double-sided: its Front is the Right Page of Spread i,
 *   and its Back is the Left Page of Spread i + 1.
 * - Sheet 0 is the Closed Front Cover.
 * - Sheet 5 (the last sheet) has its Back Face styled as the Closed Back Cover.
 * - It pivot-rotates about the left edge (center spine) in 3D.
 */
export const Page = ({ index, totalSheets, smoothProgress, bookContent }) => {
  // Local state to monitor corner lifting hover actions
  const [isHovered, setIsHovered] = useState(false);

  // --------------------------------------------------------
  // 1. SCROLL-DRIVEN 3D TRANSFORMS
  // --------------------------------------------------------
  // Define strict, sequential scroll intervals for each sheet
  const step = 1 / totalSheets;
  const start = index * step;
  const end = (index + 1) * step;
  const mid = start + step / 2;

  // Strict, mathematical angle mapping to ensure only the active page rotates.
  // Inactive pages are perfectly locked at 0deg (unflipped) or -180deg (flipped)
  // to prevent spring overshoot oscillations or stack wiggles.
  const rotateY = useTransform(smoothProgress, (val) => {
    if (val <= start) return 0;
    if (val >= end) return -180;
    const ratio = (val - start) / (end - start);
    return -180 * ratio;
  });

  // Calculate dynamic z-index to prevent 3D clipping in the browser.
  // Flipping pages float on top, unflipped stack on right, flipped stack on left.
  const zIndex = useTransform(smoothProgress, (val) => {
    if (val > start && val < end) {
      return 100; // Floating active turning page
    }
    return val < mid ? totalSheets - index : index;
  });

  // --------------------------------------------------------
  // 2. KINETIC FLEXING & SPECULAR SHINE EFFECTS
  // --------------------------------------------------------
  // Page skews slightly during the turn to simulate flexible paper bending
  const skewY = useTransform(rotateY, 
    [0, -45, -90, -135, -180], 
    [0, -4.5, 0, 4.5, 0]
  );

  // Subtle Z-displacement pushes active flipping page slightly closer to camera
  const translateZ = useTransform(rotateY,
    [0, -90, -180],
    [0, 30, 0]
  );

  // Specular light sweep sheens flaring across the page surface at 90 degrees
  const lightSweepFront = useTransform(rotateY,
    [0, -65, -90, -115, -180],
    [0, 0.45, 0.1, 0, 0]
  );

  const lightSweepBack = useTransform(rotateY,
    [0, -65, -90, -115, -180],
    [0, 0, 0.1, 0.45, 0]
  );

  // --------------------------------------------------------
  // 3. UNDER-PAGE SHADOW PROJECTIONS
  // --------------------------------------------------------
  // Casts a dark shadow on the left stack when the page settles to the left
  const leftShadowOpacity = useTransform(rotateY,
    [-90, -135, -180],
    [0.7, 0.35, 0]
  );
  const leftShadowScale = useTransform(rotateY,
    [-90, -135, -180],
    [0.85, 0.95, 1.0]
  );

  // Casts a dark shadow on the right stack when the page lifts to the left
  const rightShadowOpacity = useTransform(rotateY,
    [0, -45, -90],
    [0, 0.35, 0.7]
  );
  const rightShadowScale = useTransform(rotateY,
    [0, -45, -90],
    [1.0, 0.95, 0.85]
  );

  // --------------------------------------------------------
  // 4. CONTENT PARALLAX OVERLAYS
  // --------------------------------------------------------
  // Horizontal drift inside left page photo frame to create parallax depth
  const parallaxX = useTransform(rotateY,
    [0, -180],
    [30, -30]
  );

  // Identify cover layers
  const isCover = index === 0;
  const isBackCover = index === totalSheets - 1;

  // Map spread content to the left and right pages symmetrically
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

      {/* ======================================================== */}
      {/* MAIN FLIPPING SHEET CONTAINER */}
      {/* ======================================================== */}
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
            // Hover only if this page is the current active top page and is still flat on the right
            if (index === activeIndex && currentProgress <= start) {
              setIsHovered(true);
            }
          }}
          onMouseLeave={() => setIsHovered(false)}
          className="absolute inset-0 backface-hidden bg-[#0e1320] rounded-r-2xl border-y border-r border-slate-800/40 shadow-page-3d overflow-hidden flex flex-col z-10 preserve-3d cursor-pointer"
        >
          
          {/* Static creases in the center spine seam */}
          <div className="absolute inset-y-0 left-0 w-16 page-crease-right pointer-events-none z-30" />
          <div className="absolute inset-y-0 left-0 w-4 spine-groove-right pointer-events-none z-30" />

          {/* Dynamic Light Sweep reflection overlay */}
          <motion.div 
            style={{ opacity: lightSweepFront }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none z-40" 
          />

          {isCover ? (
            /* FRONT COVER CLOSED DESIGN */
            <div className="relative w-full h-full bg-gradient-to-br from-[#0c0f18] via-[#090b11] to-[#040608] flex flex-col justify-between p-12 paper-texture border-l border-slate-900/60">
              
              {/* Embossed gold double borders */}
              <div className="absolute inset-6 border border-[var(--color-gold)]/20 rounded-lg pointer-events-none" />
              <div className="absolute inset-7 border border-[var(--color-gold)]/10 rounded-lg pointer-events-none" />

              <div className="flex justify-between items-start z-10 mt-4">
                <span className="font-display text-[9px] uppercase tracking-[0.3em] text-[var(--color-gold)]/60 font-bold">
                  Annual Report
                </span>
                <span className="font-display text-[9px] uppercase tracking-[0.3em] text-[var(--color-gold)]/60 font-bold">
                  IISPPR • MXXVI
                </span>
              </div>

              {/* Center Embossed Seal */}
              <div className="flex flex-col items-center text-center z-10 my-auto">
                <div className="w-16 h-16 rounded-full border border-[var(--color-gold)]/30 flex items-center justify-center mb-8 bg-[#090c12] shadow-inner">
                  <Compass className="w-8 h-8 text-[var(--color-gold)] stroke-[1]" />
                </div>
                
                <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-wide leading-[1.08] mb-4">
                  The SDG <br />
                  <span className="italic text-[var(--color-gold)] font-normal">Chronicles</span>
                </h1>
                
                <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-gold)]/40 to-transparent my-4" />
                
                <p className="font-display text-[9px] text-slate-400 font-light max-w-xs leading-relaxed uppercase tracking-[0.25em]">
                  Sustainable Policy & Governance Review
                </p>
              </div>

              {/* Cover Footer & Action Hint */}
              <div className="flex flex-col items-center gap-4 z-10 mb-4">
                <span className="font-display text-[8px] uppercase tracking-[0.25em] text-slate-500">
                  Scroll down to open
                </span>
                <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-[var(--color-gold)]/20 to-transparent pointer-events-none rounded-br-2xl page-corner-lift" />
              </div>
            </div>
          ) : (
            /* STANDARD RIGHT PAGE: PREMIUM DARK ACADEMIC RESEARCH JOURNAL PAGE */
            <div className="relative w-full h-full bg-[#0d121f] text-slate-100 flex flex-col justify-between p-8 sm:p-12 paper-texture border-l border-slate-800/30">
              
              {/* Gold foiled border accent around the magazine page */}
              <div className="absolute inset-5 border border-[var(--color-gold)]/10 rounded pointer-events-none z-0" />
              
              {/* Elegant header */}
              <div className="flex justify-between items-center z-10 border-b border-slate-800 pb-3">
                <span className="font-display text-[10px] uppercase tracking-[0.2em] text-[var(--color-gold)]/70 font-bold">
                  {rightContent.chapter}
                </span>
                <span className="font-display text-[10px] uppercase tracking-[0.2em] text-slate-400">
                  IISPPR Research Review
                </span>
              </div>

              {/* Research journal layout */}
              <div className="flex flex-col justify-center flex-grow z-10 my-auto py-6 pl-2">
                
                {/* Custom Lucide Icon */}
                <div className="mb-4">
                  {rightContent.icon}
                </div>

                {/* Tagline */}
                <span className="font-display text-[9px] uppercase tracking-[0.25em] text-slate-400 font-semibold mb-2">
                  {rightContent.subtitle}
                </span>

                {/* Article Serif Header */}
                <h2 className="font-editorial text-3xl sm:text-4xl font-light leading-[1.08] text-white tracking-wide mb-6">
                  {rightContent.title}
                </h2>

                <div className="w-16 h-[1px] bg-[var(--color-gold)]/40 mb-6" />

                {/* Editorial text with drop cap */}
                <p className="font-display text-[12.5px] sm:text-[14px] leading-relaxed text-slate-300 font-light antialiased max-w-lg">
                  <span className="font-editorial text-5xl float-left mr-2 mt-1 leading-[0.8] font-bold text-[var(--color-gold)] select-none">
                    {rightContent.content.charAt(0)}
                  </span>
                  {rightContent.content.substring(1)}
                </p>

                {/* Academic Quote overlay */}
                {rightContent.quote && (
                  <div className="mt-8 border-l border-[var(--color-gold)]/30 pl-4 py-1 italic font-editorial text-sm text-[var(--color-gold)]/60 max-w-md">
                    "{rightContent.quote}"
                  </div>
                )}

              </div>

              {/* Page Number footer */}
              <div className="flex justify-end items-center z-10 border-t border-slate-800 pt-3">
                <span className="font-editorial text-sm font-semibold text-[var(--color-gold)]/60 font-mono italic">
                  {(index * 2) + 1}
                </span>
              </div>

              {/* Interactive Corner Lift Indicator */}
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-[var(--color-gold)]/5 rounded-br-2xl pointer-events-none" />
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
          {/* Static creases in the center spine seam */}
          <div className="absolute inset-y-0 right-0 w-16 page-crease-left pointer-events-none z-30" />
          <div className="absolute inset-y-0 right-0 w-4 spine-groove-left pointer-events-none z-30" />

          {/* Dynamic Light Sweep reflection overlay */}
          <motion.div 
            style={{ opacity: lightSweepBack }}
            className="absolute inset-0 bg-gradient-to-l from-transparent via-white/20 to-transparent pointer-events-none z-40" 
          />

          {isBackCover ? (
            /* BACK COVER CLOSED DESIGN */
            <div className="relative w-full h-full bg-gradient-to-bl from-[#0c0f18] via-[#090b11] to-[#040608] flex flex-col justify-between p-12 paper-texture border-r border-slate-900/60">
              
              {/* Embossed gold border */}
              <div className="absolute inset-6 border border-[var(--color-gold)]/20 rounded-lg pointer-events-none" />

              <div className="flex justify-between items-start z-10 mt-4">
                <span className="font-display text-[9px] uppercase tracking-[0.3em] text-[var(--color-gold)]/40">
                  IISPPR Publications
                </span>
                <span className="font-display text-[9px] uppercase tracking-[0.3em] text-[var(--color-gold)]/40">
                  MXXVI
                </span>
              </div>

              {/* Embossed Gold Stamp */}
              <div className="flex flex-col items-center text-center z-10 my-auto">
                <div className="w-12 h-12 rounded-full border border-[var(--color-gold)]/25 flex items-center justify-center mb-6 bg-[#090c12]/40">
                  <Compass className="w-5 h-5 text-[var(--color-gold)]/50 stroke-[1]" />
                </div>
                <h3 className="font-editorial text-2xl font-light text-slate-350 tracking-wider mb-2">
                  THE END
                </h3>
                <div className="w-12 h-[1px] bg-[var(--color-gold)]/30 my-3" />
                <p className="font-display text-[9px] uppercase tracking-[0.2em] text-slate-500 max-w-[200px] leading-relaxed">
                  Advancing sustainable policy through academic consensus
                </p>
              </div>

              <div className="flex justify-center z-10 mb-4">
                <span className="font-display text-[8px] uppercase tracking-[0.2em] text-slate-600">
                  All rights reserved
                </span>
              </div>
            </div>
          ) : (
            /* STANDARD LEFT PAGE: CINEMATIC IMAGES LAYER WITH DUAL LABELS & PARALLAX */
            <div className="relative w-full h-full bg-slate-950 overflow-hidden flex flex-col justify-between">
              
              {/* Immersive photo with horizontal parallax translation */}
              <motion.div 
                style={{ x: parallaxX }}
                className="absolute inset-0 w-[120%] h-full left-[-10%]"
              >
                <img 
                  src={leftContent.image} 
                  alt={leftContent.title} 
                  className="w-full h-full object-cover select-none filter brightness-[0.55] contrast-[1.08] saturate-[0.85]"
                />
                {/* Ambient dark vignette styling */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080b11] via-transparent to-[#080b11]/30 z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#080b11]/60 via-transparent to-transparent z-10" />
              </motion.div>

              {/* Overlay HUD metrics and labels */}
              <div className="relative z-20 p-8 sm:p-12 flex flex-col justify-between h-full">
                
                {/* Thin gold foiled top line */}
                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                  <span className="font-display text-[10px] uppercase tracking-[0.2em] text-white/50">
                    {leftContent.chapter}
                  </span>
                  <span className="font-display text-[10px] uppercase tracking-[0.2em] text-white/50">
                    Empirical Canvas
                  </span>
                </div>

                {/* Chapter visual stamp */}
                <div className="my-auto py-8">
                  <div className="font-editorial text-[7rem] sm:text-[10rem] font-bold text-white/5 select-none leading-none tracking-tighter mb-2">
                    {leftContent.id.toString().padStart(2, '0')}
                  </div>
                  
                  {/* Floating Glassmorphic Caption Card */}
                  <div className="glass-panel p-4 rounded-xl border-white/10 max-w-xs mt-[-2rem] ml-4 bg-[#0a0f1d]/50">
                    <span className="font-display text-[9px] uppercase tracking-[0.25em] text-[var(--color-gold)] font-bold mb-1 block">
                      Core Blueprint
                    </span>
                    <p className="font-display text-[11px] leading-relaxed text-slate-300 font-light">
                      Localized sustainable development goals policy blueprint and framework visual fragment.
                    </p>
                  </div>
                </div>

                {/* Footer labels */}
                <div className="flex justify-between items-center border-t border-white/10 pt-3">
                  <span className="font-display text-[9px] uppercase tracking-[0.2em] text-white/40">
                    Global Perspective
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
