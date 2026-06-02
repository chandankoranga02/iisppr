import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Testimonials from './components/testimonials';

export default function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Testimonials/>
    </>
  );
}