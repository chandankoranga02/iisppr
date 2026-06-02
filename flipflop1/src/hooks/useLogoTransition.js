import { useState, useEffect, useRef } from "react";

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

export function useLogoTransition({ scrollY, viewportH }) {
  const logoRef = useRef(null);
  const [logoHeroY, setLogoHeroY] = useState(250);
  const [floatPhase, setFloatPhase] = useState(0);

  useEffect(() => {
    let raf;
    const animate = (t) => {
      setFloatPhase(t / 1000);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    // Measure starting position of logo above EST 2019 in Hero layout
    const timer = setTimeout(() => {
      if (logoRef.current) {
        const rect = logoRef.current.getBoundingClientRect();
        setLogoHeroY(rect.top + rect.height / 2);
      }
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  const heroHeight = viewportH;
  const transitionStart = heroHeight * 0.2;
  const transitionEnd = heroHeight * 0.85;

  let transitionProgress = 0;
  if (scrollY >= transitionStart) {
    transitionProgress = Math.min(1, (scrollY - transitionStart) / (transitionEnd - transitionStart));
  }
  const easedProgress = easeInOutCubic(transitionProgress);

  const floatY = Math.sin(floatPhase * 0.8) * 10;

  const logoStartScale = 1;
  const logoEndScale = 0.45; // Exactly maps 120px to the 54px cover logo width
  const logoScale = lerp(logoStartScale, logoEndScale, easedProgress);

  // Precision travel between Hero placeholder and Book cover center
  const logoCoverY = viewportH / 2 - 36;
  const logoY = lerp(logoHeroY, logoCoverY, easedProgress);

  const rotateX = lerp(0, 8, easedProgress);
  const rotateZ = lerp(0, -2, easedProgress);

  const logoOpacity = easedProgress > 0.92 ? lerp(1, 0, (easedProgress - 0.92) / 0.08) : 1;
  const logoLanded = easedProgress > 0.95;

  const heroContentOpacity = easedProgress < 0.3
    ? 1
    : easedProgress < 0.7
    ? lerp(1, 0, (easedProgress - 0.3) / 0.4)
    : 0;

  return {
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
  };
}
