import { motion, useTransform } from 'framer-motion';
import React from 'react';

export const Page = ({ item, index, totalPages, scrollYProgress }) => {
  // Each page takes up a fraction of the total scroll
  const step = 1 / totalPages;
  const start = index * step;
  const end = (index + 1) * step;
  const mid = start + step / 2;

  // Map scroll progress to a -180 degree rotation for the page turn
  const rotateY = useTransform(scrollYProgress, [start, end], [0, -180], {
    clamp: true,
  });

  // Calculate dynamic z-index so pages stack correctly on both sides
  // When on the right (not flipped), lower index (earlier page) has higher zIndex
  // When on the left (flipped), lower index has lower zIndex so later pages cover it
  const zIndex = useTransform(scrollYProgress, (val) => {
    return val < mid ? totalPages - index : index;
  });

  return (
    <motion.div
      style={{
        rotateY,
        zIndex,
      }}
      className="absolute top-0 right-0 w-1/2 h-full origin-left preserve-3d rounded-r-2xl sm:rounded-r-3xl transition-shadow duration-300"
    >
      {/* Front of the page (Right side of the spread) */}
      <div className="absolute inset-0 backface-hidden bg-surface border border-slate-700/50 rounded-r-2xl sm:rounded-r-3xl overflow-hidden shadow-page flex flex-col">
        <div className="absolute inset-0 page-gradient pointer-events-none z-10" />
        
        {/* Content Container */}
        <div className="relative z-0 h-1/2 overflow-hidden">
          <img 
            src={item.image} 
            alt={item.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
        </div>
        
        <div className="relative z-20 flex-1 p-6 sm:p-10 flex flex-col justify-center">
          {item.icon}
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 tracking-tight">
            {item.title}
          </h2>
          <h3 className="text-primary font-medium mb-6 uppercase tracking-widest text-sm">
            {item.subtitle}
          </h3>
          <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
            {item.content}
          </p>
          
          <div className="mt-auto pt-6 text-right text-slate-500 font-medium font-mono text-sm">
            {(index * 2) + 1}
          </div>
        </div>
      </div>

      {/* Back of the page (Left side of the spread when flipped) */}
      <div 
        className="absolute inset-0 backface-hidden bg-slate-900 border border-slate-700/50 rounded-l-2xl sm:rounded-l-3xl overflow-hidden flex flex-col shadow-page"
        style={{ transform: 'rotateY(180deg)' }}
      >
        <div className="absolute inset-0 page-gradient-back pointer-events-none z-10" />
        <div className="flex-1 flex flex-col items-center justify-center p-10 opacity-20">
           {/* Decorative back page pattern or logo could go here */}
           <div className="w-24 h-24 rounded-full border-4 border-slate-700 mb-4" />
           <div className="h-2 w-32 bg-slate-700 rounded-full mb-2" />
           <div className="h-2 w-24 bg-slate-700 rounded-full" />
        </div>
        
        <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 text-slate-600 font-medium font-mono text-sm">
           {(index * 2) + 2}
        </div>
      </div>
    </motion.div>
  );
};
