import { motion, useScroll } from 'framer-motion';
import React, { useRef } from 'react';
import { bookContent } from '../data/bookContent';
import { Page } from './Page';

export const Book = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Calculate container height based on number of pages to give enough scrolling space
  // 100vh per page + 100vh for the initial view
  const containerHeight = `${(bookContent.length + 1) * 100}vh`;

  return (
    <div 
      ref={containerRef} 
      className="relative w-full bg-background"
      style={{ height: containerHeight }}
    >
      {/* Sticky container that stays in view while scrolling */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-4 sm:px-10">
        
        {/* Background glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative w-full max-w-5xl aspect-[3/4] sm:aspect-[2/1.2] lg:aspect-[2/1.1] perspective-[2500px]">
          
          {/* Book Spine */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-4 sm:w-8 bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 z-0 shadow-2xl rounded-sm" />
          
          {/* Static Back Cover (Right) */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-950 rounded-r-2xl sm:rounded-r-3xl border-y border-r border-slate-800 shadow-book" />
          
          {/* Static Front Cover (Left - shown when pages flip) */}
          <div className="absolute top-0 left-0 w-1/2 h-full bg-slate-950 rounded-l-2xl sm:rounded-l-3xl border-y border-l border-slate-800 shadow-book" />

          {/* Book Pages */}
          {bookContent.map((item, index) => (
            <Page 
              key={item.id} 
              item={item} 
              index={index} 
              totalPages={bookContent.length} 
              scrollYProgress={scrollYProgress} 
            />
          ))}
          
        </div>
        
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 opacity-50"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs uppercase tracking-widest">Scroll to Flip</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-slate-400 to-transparent" />
        </motion.div>
        
      </div>
    </div>
  );
};
