import React from 'react';
import { Book } from './components/Book';

function App() {
  return (
    <div className="min-h-screen bg-background font-sans text-slate-100 selection:bg-primary/30">
      
      {/* Intro Section to allow some scrolling before the book */}
      <section className="h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-500">
          The Story Unfolds
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl font-light">
          Experience a new dimension of digital storytelling. Scroll down to interact with the immersive 2D page-flipping book.
        </p>
      </section>

      {/* The Interactive Book Section */}
      <Book />

      {/* Outro Section */}
      <section className="h-screen flex flex-col items-center justify-center text-center px-4 bg-slate-950">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready for the Next Chapter?
        </h2>
        <button className="px-8 py-4 bg-primary text-slate-900 rounded-full font-semibold tracking-wide hover:bg-sky-300 transition-colors duration-300 shadow-[0_0_30px_-5px_rgba(56,189,248,0.4)]">
          Get in Touch
        </button>
      </section>

    </div>
  );
}

export default App;
