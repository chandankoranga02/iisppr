import {useEffect} from 'react'

import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import CourseDifferentPage from "../components/CourseDifferentPage";
import LandingSections from "../components/LandingSections";
import Book from "../components/Book";
import Faq from "../components/Faq";
import Testimonials from "../components/Testimonials";
import InteractiveBackground from "../components/InteractiveBackground";


export default function Homepage() {
  useEffect(() => {
    document.title = "Homepage - International Institute of SDGs and Public policy Research";
  }, []);

  return (
    <>
      <InteractiveBackground />
      <Navbar />
      <HeroSection />
      <CourseDifferentPage />
      <LandingSections />
      <Book />
      <div className="dark-zone">
        <Testimonials/>
        <Faq />
      </div>
    </>
  );
}

