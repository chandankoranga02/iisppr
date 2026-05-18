import { D } from "./styles/theme";

// Components
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { PricingSection } from "./components/PricingSection";
import { CurriculumSection } from "./components/CurriculumSection";
import { RecognitionSection } from "./components/RecognitionSection";
import { FAQSection } from "./components/FAQSection";
import { FinalCTA } from "./components/FinalCTA";

// Main application component
export default function App() {
  return (
    <div style={{ background: D.bg, minHeight: "100vh", overflowX: "hidden" }}>
      {/* Global CSS block preserving exact styling */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,100..900;1,100..900&display=swap');
        @import url('https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@400,500,600,700,800,900&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #09090b; }

        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #09090b; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 4px; }

        a { cursor: pointer; }
        button { cursor: pointer; font-family: inherit; }

        /* Responsive breakpoints */
        @media (max-width: 900px) {
          .hero-grid      { grid-template-columns: 1fr !important; gap: 3rem 0 !important; }
          .pricing-grid   { grid-template-columns: 1fr !important; }
          .curriculum-layout { grid-template-columns: 1fr !important; }
          .recognition-grid  { grid-template-columns: 1fr !important; }
          .outcomes-grid     { grid-template-columns: 1fr !important; }
          
          /* Navbar mobile toggles */
          .desktop-nav-links, .desktop-nav-cta { display: none !important; }
          .mobile-nav-toggle { display: flex !important; }
          .navbar-container { width: 100% !important; border-radius: 16px !important; }
        }
        @media (max-width: 640px) {
          .pricing-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Assembly of page sections */}
      <Navbar />
      <Hero />
      <PricingSection />
      <CurriculumSection />
      <RecognitionSection />
      <FAQSection />
      <FinalCTA />
    </div>
  );
}