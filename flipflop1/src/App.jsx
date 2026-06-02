import React, { useState, useEffect, useCallback } from "react";
import HeroSection from "./components/HeroSection";
import FloatingLogo from "./components/FloatingLogo";
import Book from "./components/Book";
import { useLogoTransition } from "./hooks/useLogoTransition";

export default function IISPPRLanding() {
  const [scrollY, setScrollY] = useState(0);
  const [viewportH, setViewportH] = useState(800);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;1,300&family=EB+Garamond:ital,wght@0,400;1,400&family=Cormorant+Garamond:wght@300;400;600&display=swap";
    document.head.appendChild(link);
    setMounted(true);
    setViewportH(window.innerHeight);
    const handleResize = () => setViewportH(window.innerHeight);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMainScroll = useCallback((e) => {
    setScrollY(e.target.scrollTop);
  }, []);

  const {
    logoRef,
    logoScale,
    logoY,
    floatY,
    rotateX,
    rotateZ,
    logoOpacity,
    logoLanded,
    heroContentOpacity,
    easedProgress,
    transitionProgress
  } = useLogoTransition({ scrollY, viewportH });

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "#0a0806",
        overflowY: "auto",
        overflowX: "hidden",
        position: "relative",
        scrollbarWidth: "none",
      }}
      onScroll={handleMainScroll}
    >
      <style>{`
        ::-webkit-scrollbar { display: none; }
        @keyframes grain {
          0%, 100% { transform: translate(0,0) }
          10% { transform: translate(-1%,-2%) }
          20% { transform: translate(2%,1%) }
          30% { transform: translate(-2%,3%) }
          40% { transform: translate(1%,-1%) }
          50% { transform: translate(-1%,2%) }
          60% { transform: translate(2%,-3%) }
          70% { transform: translate(-2%,1%) }
          80% { transform: translate(1%,2%) }
          90% { transform: translate(-1%,-1%) }
        }
      `}</style>

      {/* HERO SECTION */}
      <HeroSection
        logoRef={logoRef}
        heroContentOpacity={heroContentOpacity}
        easedProgress={easedProgress}
        transitionProgress={transitionProgress}
      />

      {/* ANIMATED FLOATING LOGO */}
      <FloatingLogo
        logoScale={logoScale}
        logoY={logoY}
        floatY={floatY}
        easedProgress={easedProgress}
        rotateX={rotateX}
        rotateZ={rotateZ}
        logoOpacity={logoOpacity}
        mounted={mounted}
      />

      {/* BOOK SECTION */}
      <Book
        scrollY={scrollY}
        viewportH={viewportH}
        logoLanded={logoLanded}
        easedProgress={easedProgress}
      />
    </div>
  );
}
