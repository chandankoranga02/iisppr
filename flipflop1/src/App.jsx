import { useState, useEffect, useRef, useCallback } from "react";

const PAGES = [
  {
    id: 0,
    type: "cover",
    title: "IISPPR",
    subtitle: "International Institute of\nSDGs & Public Policy Research",
    accent: "#C8A96E",
    bg: "#0f0c08",
    textColor: "#f5f0e8",
  },
  {
    id: 1,
    type: "intro",
    chapter: "Preface",
    title: "Where Policy Meets Purpose",
    body: "Every sustainable future begins with rigorous inquiry — a commitment to understanding the complex systems that govern our world. We bridge evidence and action.",
    quote: "Policy without research is merely opinion. Research without policy is merely scholarship.",
    quoteAuthor: "— IISPPR Charter, 2019",
    accent: "#8B9E7A",
    bg: "#f7f4ef",
    textColor: "#2c2820",
  },
  {
    id: 2,
    type: "content",
    chapter: "Chapter I",
    title: "SDG Framework",
    body: "The Sustainable Development Goals represent humanity's most ambitious collective agreement. Our research provides the empirical scaffolding needed to transform aspirations into measurable outcomes.",
    visual: "geometry",
    accent: "#C8A96E",
    bg: "#faf8f4",
    textColor: "#2c2820",
  },
  {
    id: 3,
    type: "content",
    chapter: "Chapter II",
    title: "Policy Architecture",
    body: "Effective public policy emerges from the intersection of data, governance, and human insight. We design frameworks that translate complex research into implementable solutions.",
    visual: "dots",
    accent: "#9B8EA0",
    bg: "#f5f0f7",
    textColor: "#2c2820",
  },
  {
    id: 4,
    type: "content",
    chapter: "Chapter III",
    title: "Global Impact",
    body: "From local municipalities to international bodies, our research informs decisions that shape communities, economies, and environments across every inhabited continent.",
    visual: "lines",
    accent: "#7A9BAF",
    bg: "#f0f5f9",
    textColor: "#2c2820",
  },
  {
    id: 5,
    type: "content",
    chapter: "Chapter IV",
    title: "Research for Impact",
    body: "Sustainable impact demands more than publications — it requires partnerships, dialogue, and the courageous translation of findings into policy recommendations that governments can act upon.",
    visual: "palette",
    accent: "#C87A6E",
    bg: "#fdf4f0",
    textColor: "#2c2820",
  },
  {
    id: 6,
    type: "end",
    title: "Join Us",
    subtitle: "In building a sustainable tomorrow",
    message: "The questions that define our century demand rigorous, collaborative, and courageous research. IISPPR is where that work begins.",
    accent: "#C8A96E",
    bg: "#0f0c08",
    textColor: "#f5f0e8",
  },
];

function GeometryVisual({ accent }) {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      <circle cx="100" cy="80" r="55" fill="none" stroke={accent} strokeWidth="0.8" opacity="0.4" />
      <circle cx="100" cy="80" r="35" fill="none" stroke={accent} strokeWidth="0.8" opacity="0.6" />
      <circle cx="100" cy="80" r="15" fill={accent} opacity="0.15" />
      <rect x="65" y="45" width="70" height="70" fill="none" stroke={accent} strokeWidth="0.6" opacity="0.3" transform="rotate(15 100 80)" />
      <rect x="72" y="52" width="56" height="56" fill="none" stroke={accent} strokeWidth="0.6" opacity="0.5" transform="rotate(30 100 80)" />
      <line x1="45" y1="80" x2="155" y2="80" stroke={accent} strokeWidth="0.5" opacity="0.25" />
      <line x1="100" y1="25" x2="100" y2="135" stroke={accent} strokeWidth="0.5" opacity="0.25" />
      <circle cx="100" cy="80" r="3" fill={accent} opacity="0.8" />
    </svg>
  );
}

function DotsVisual({ accent }) {
  const dots = [];
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 10; c++) {
      dots.push({ x: c * 20 + 10, y: r * 18 + 9, r: (((r * 10 + c) * 7 + 13) % 25) / 10 + 0.5, op: (((r * 10 + c) * 3 + 7) % 50) / 100 + 0.1 });
    }
  }
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      {dots.map((d, i) => (<circle key={i} cx={d.x} cy={d.y} r={d.r} fill={accent} opacity={d.op} />))}
      <circle cx="100" cy="80" r="20" fill="none" stroke={accent} strokeWidth="1" opacity="0.4" />
      <circle cx="100" cy="80" r="5" fill={accent} opacity="0.6" />
    </svg>
  );
}

function LinesVisual({ accent }) {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      {Array.from({ length: 12 }).map((_, i) => (
        <line key={i} x1="20" y1={10 + i * 13} x2="180" y2={10 + i * 13}
          stroke={accent} strokeWidth={i % 3 === 0 ? "1.5" : "0.5"}
          opacity={i % 3 === 0 ? "0.5" : "0.2"} />
      ))}
      <rect x="60" y="40" width="80" height="80" fill={accent} opacity="0.06" />
      <line x1="60" y1="40" x2="140" y2="120" stroke={accent} strokeWidth="0.8" opacity="0.3" />
      <line x1="140" y1="40" x2="60" y2="120" stroke={accent} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

function PaletteVisual({ accent }) {
  const colors = ["#C87A6E", "#C8A96E", "#8B9E7A", "#9B8EA0", "#7A9BAF", "#A09B7A"];
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      {colors.map((c, i) => (
        <g key={i}>
          <rect x={20 + i * 28} y="40" width="22" height="80" rx="11" fill={c} opacity="0.7" />
          <rect x={20 + i * 28} y="40" width="22" height={30 + i * 8} rx="11" fill={c} opacity="0.9" />
        </g>
      ))}
    </svg>
  );
}

function PageVisual({ type, accent }) {
  if (type === "geometry") return <GeometryVisual accent={accent} />;
  if (type === "dots") return <DotsVisual accent={accent} />;
  if (type === "lines") return <LinesVisual accent={accent} />;
  if (type === "palette") return <PaletteVisual accent={accent} />;
  return null;
}

function IISPPRLogo({ size = 1, color = "#f5f0e8", compact = false }) {
  const s = size;
  return (
    <svg
      viewBox="0 0 120 120"
      style={{
        width: compact ? 60 * s : 80 * s,
        height: compact ? 60 * s : 80 * s,
        display: "block",
      }}
    >
      <defs>
        {/* Arc path for the arched text */}
        <path id="logo-text-path" d="M 24,64 A 36,36 0 0,1 96,64" fill="none" />
      </defs>

      {/* Laurel Wreath in green */}
      <g stroke="#82c341" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.9">
        {/* Stems */}
        <path d="M 60,105 C 40,105 26,90 26,65 C 26,55 30,45 34,40" strokeWidth="1.2" />
        <path d="M 60,105 C 80,105 94,90 94,65 C 94,55 90,45 86,40" strokeWidth="1.2" />
      </g>

      {/* Laurel Leaves (Filled green) */}
      <g fill="#82c341" opacity="0.95">
        {/* Left leaves */}
        <path d="M 34,40 C 32,38 31,32 34,30 C 36,32 37,38 34,40 Z" />
        <path d="M 29,48 C 26,46 25,41 28,38 C 30,40 31,46 29,48 Z" />
        <path d="M 26,57 C 23,55 22,50 25,47 C 27,49 28,55 26,57 Z" />
        <path d="M 25,67 C 22,66 21,60 24,57 C 26,59 27,65 25,67 Z" />
        <path d="M 26,77 C 23,77 22,71 25,68 C 27,70 28,76 26,77 Z" />
        <path d="M 29,86 C 26,88 25,82 28,79 C 30,81 31,86 29,86 Z" />
        <path d="M 35,94 C 32,97 30,92 33,88 C 35,90 37,94 35,94 Z" />
        <path d="M 43,100 C 40,103 37,99 40,95 C 42,97 44,100 43,100 Z" />
        <path d="M 52,104 C 50,106 46,103 49,99 C 51,101 53,104 52,104 Z" />

        {/* Right leaves */}
        <path d="M 86,40 C 88,38 89,32 86,30 C 84,32 83,38 86,40 Z" />
        <path d="M 91,48 C 94,46 95,41 92,38 C 90,40 89,46 91,48 Z" />
        <path d="M 94,57 C 97,55 98,50 95,47 C 93,49 92,55 94,57 Z" />
        <path d="M 95,67 C 98,66 99,60 96,57 C 94,59 93,65 95,67 Z" />
        <path d="M 94,77 C 97,77 98,71 95,68 C 93,70 92,76 94,77 Z" />
        <path d="M 91,86 C 94,88 95,82 92,79 C 90,81 89,86 91,86 Z" />
        <path d="M 85,94 C 88,97 90,92 87,88 C 85,90 83,94 85,94 Z" />
        <path d="M 77,100 C 80,103 83,99 80,95 C 78,97 76,100 77,100 Z" />
        <path d="M 68,104 C 70,106 74,103 71,99 C 69,101 67,104 68,104 Z" />
      </g>

      {/* Central Blue Globe */}
      <g>
        {/* Globe outer circle */}
        <circle cx="60" cy="68" r="24" fill="#0f0c08" stroke="#38bdf8" strokeWidth="2.5" />
        
        {/* Continent Lines */}
        <g stroke="#38bdf8" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.95">
          <path d="M 44,56 C 47,54 50,56 52,52 C 54,48 50,46 54,46 C 58,46 60,50 63,48 C 65,46 62,44 60,44 C 58,44 56,42 58,40" />
          <path d="M 52,68 C 48,68 44,72 44,76 C 44,80 48,84 52,86 C 56,88 56,92 60,92" />
          <path d="M 64,60 C 68,60 70,64 74,62 C 78,60 76,56 78,54 C 80,52 82,56 80,60 C 78,64 74,68 76,72 C 78,76 82,74 84,78 C 86,82 82,88 78,88 C 74,88 72,82 68,82 C 64,82 64,74 60,74" />
          <circle cx="72" cy="51" r="1" fill="#38bdf8" stroke="none" />
        </g>
      </g>

      {/* Curved Text along path */}
      <text fontFamily="'Playfair Display', Georgia, serif" fontSize="7.2" fontWeight="600" fill={color}>
        <textPath href="#logo-text-path" startOffset="50%" textAnchor="middle">
          • Edify Execute Effectuate •
        </textPath>
      </text>
    </svg>
  );
}

function CoverPage({ page, logoLanded }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-10"
      style={{ background: page.bg, color: page.textColor }}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px" style={{ background: page.accent, opacity: 0.6 }} />
        <div className="absolute bottom-0 left-0 w-full h-px" style={{ background: page.accent, opacity: 0.6 }} />
        {[0.05, 0.12, 0.88, 0.95].map((x, i) => (
          <div key={i} className="absolute top-0 bottom-0 w-px"
            style={{ left: `${x * 100}%`, background: page.accent, opacity: 0.08 }} />
        ))}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 560" preserveAspectRatio="xMidYMid slice">
          <circle cx="200" cy="280" r="180" fill="none" stroke={page.accent} strokeWidth="0.5" opacity="0.1" />
          <circle cx="200" cy="280" r="120" fill="none" stroke={page.accent} strokeWidth="0.5" opacity="0.07" />
          <circle cx="200" cy="280" r="60" fill="none" stroke={page.accent} strokeWidth="0.5" opacity="0.05" />
        </svg>
      </div>
      <div className="relative z-10 text-center flex flex-col items-center">
        <div style={{
          width: 72, height: 72,
          opacity: logoLanded ? 1 : 0,
          transform: logoLanded ? "scale(1)" : "scale(0.5)",
          transition: "opacity 0.4s ease, transform 0.4s ease",
          marginBottom: 12,
        }}>
          <IISPPRLogo size={0.9} color={page.accent} compact />
        </div>
        <div style={{
          opacity: logoLanded ? 1 : 0,
          transform: logoLanded ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s",
        }}>
          <p style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", opacity: 0.5, marginBottom: 4, fontFamily: "Georgia, serif" }}>IISPPR</p>
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "1rem", fontWeight: 300, letterSpacing: "0.05em",
            lineHeight: 1.4, opacity: 0.85, marginBottom: 6,
            whiteSpace: "pre-line",
          }}>Research for{"\n"}Sustainable Impact</h1>
          <div style={{ height: 1, width: 32, background: page.accent, margin: "0 auto", opacity: 0.5 }} />
        </div>
      </div>
      <div className="absolute bottom-6 left-0 right-0 flex justify-center">
        <span style={{ fontSize: "0.55rem", letterSpacing: "0.2em", opacity: 0.2, textTransform: "uppercase" }}>Vol. I</span>
      </div>
    </div>
  );
}

function IntroPage({ page }) {
  return (
    <div className="absolute inset-0 flex flex-col px-10 py-12"
      style={{ background: page.bg, color: page.textColor }}>
      <div className="flex items-center gap-3 mb-10">
        <span style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.4 }}>{page.chapter}</span>
        <div className="h-px flex-1 opacity-20" style={{ background: page.textColor }} />
      </div>
      <div className="flex-1 flex flex-col justify-center max-w-xs">
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.4rem", fontWeight: 300, marginBottom: 20, lineHeight: 1.3 }}>
          {page.title}
        </h2>
        <p style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: "0.85rem", lineHeight: 1.7, opacity: 0.7, marginBottom: 32 }}>
          {page.body}
        </p>
        <div className="pl-4 border-l-2" style={{ borderColor: page.accent }}>
          <p style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: "0.8rem", fontStyle: "italic", opacity: 0.75, marginBottom: 4 }}>
            "{page.quote}"
          </p>
          <p style={{ fontSize: "0.65rem", opacity: 0.4, letterSpacing: "0.05em" }}>{page.quoteAuthor}</p>
        </div>
      </div>
    </div>
  );
}

function ContentPage({ page }) {
  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: page.bg, color: page.textColor }}>
      <div className="absolute right-0 top-0 bottom-0 w-1/2 flex items-center justify-center p-8 opacity-60">
        <PageVisual type={page.visual} accent={page.accent} />
      </div>
      <div className="relative z-10 flex flex-col h-full px-10 py-12">
        <div className="flex items-center gap-3 mb-10">
          <span style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.4 }}>{page.chapter}</span>
          <div style={{ height: 1, width: 32, opacity: 0.2, background: page.textColor }} />
        </div>
        <div className="flex-1 flex flex-col justify-center" style={{ maxWidth: "55%" }}>
          <div style={{ width: 24, height: 2, background: page.accent, marginBottom: 20 }} />
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.2rem", fontWeight: 300, marginBottom: 16, lineHeight: 1.3 }}>
            {page.title}
          </h2>
          <p style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: "0.82rem", lineHeight: 1.7, opacity: 0.65 }}>
            {page.body}
          </p>
        </div>
        <div className="flex justify-between items-end">
          <span style={{ fontSize: "0.6rem", opacity: 0.2, letterSpacing: "0.1em" }}>{page.id}</span>
          <div style={{ height: 1, width: 24, opacity: 0.2, background: page.textColor }} />
        </div>
      </div>
    </div>
  );
}

function EndPage({ page }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-10"
      style={{ background: page.bg, color: page.textColor }}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px" style={{ background: page.accent, opacity: 0.6 }} />
        <div className="absolute bottom-0 left-0 w-full h-px" style={{ background: page.accent, opacity: 0.6 }} />
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 560" preserveAspectRatio="xMidYMid slice">
          {[40, 80, 120, 160].map((r, i) => (
            <circle key={i} cx="200" cy="280" r={r} fill="none" stroke={page.accent} strokeWidth="0.4" opacity={0.06 + i * 0.02} />
          ))}
        </svg>
      </div>
      <div className="relative z-10 text-center">
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "2.5rem", fontWeight: 300, marginBottom: 12, letterSpacing: "-0.02em" }}>
          {page.title}
        </h1>
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.15em", marginBottom: 32, opacity: 0.5, textTransform: "uppercase" }}>{page.subtitle}</p>
        <div style={{ height: 1, width: 48, margin: "0 auto", marginBottom: 24, background: page.accent, opacity: 0.5 }} />
        <p style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: "0.82rem", lineHeight: 1.7, opacity: 0.5, maxWidth: 180, margin: "0 auto" }}>
          {page.message}
        </p>
      </div>
    </div>
  );
}

function BookPage({ page, style, zIndex, logoLanded }) {
  const content = () => {
    if (page.type === "cover") return <CoverPage page={page} logoLanded={logoLanded} />;
    if (page.type === "intro") return <IntroPage page={page} />;
    if (page.type === "content") return <ContentPage page={page} />;
    if (page.type === "end") return <EndPage page={page} />;
    return null;
  };

  return (
    <div className="absolute inset-0" style={{
      ...style,
      zIndex,
      transformOrigin: "left center",
      borderRadius: "2px",
      boxShadow: "4px 0 20px rgba(0,0,0,0.25), 1px 0 4px rgba(0,0,0,0.15)",
      overflow: "hidden",
      willChange: "transform, opacity",
    }}>
      {content()}
      <div className="absolute inset-y-0 left-0 w-4 pointer-events-none"
        style={{ background: "linear-gradient(to right, rgba(0,0,0,0.12) 0%, transparent 100%)", zIndex: 10 }} />
    </div>
  );
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

export default function IISPPRLanding() {
  const heroRef = useRef(null);
  const bookSectionRef = useRef(null);
  const logoRef = useRef(null);
  const bookContainerRef = useRef(null);
  const containerRef = useRef(null);

  const [scrollY, setScrollY] = useState(0);
  const [viewportH, setViewportH] = useState(800);
  const [mounted, setMounted] = useState(false);
  const [floatPhase, setFloatPhase] = useState(0);
  const [logoHeroY, setLogoHeroY] = useState(250);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;1,300&family=EB+Garamond:ital,wght@0,400;1,400&family=Cormorant+Garamond:wght@300;400;600&display=swap";
    document.head.appendChild(link);
    setMounted(true);
    setViewportH(window.innerHeight);
    const handleResize = () => setViewportH(window.innerHeight);
    window.addEventListener("resize", handleResize);

    // Measure starting position of logo above EST 2019 in Hero layout
    setTimeout(() => {
      if (logoRef.current) {
        const rect = logoRef.current.getBoundingClientRect();
        setLogoHeroY(rect.top + rect.height / 2);
      }
    }, 150);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let raf;
    const animate = (t) => {
      setFloatPhase(t / 1000);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleMainScroll = useCallback((e) => {
    setScrollY(e.target.scrollTop);
  }, []);

  const totalPages = PAGES.length;

  // Global scroll-to-book-progress translation
  const bookScrollStart = viewportH;
  const bookScrollLength = (totalPages - 1) * viewportH;
  
  const bookScrollProgress = scrollY >= bookScrollStart
    ? Math.max(0, Math.min(1, (scrollY - bookScrollStart) / bookScrollLength))
    : 0;

  const currentPageFloat = bookScrollProgress * (totalPages - 1);
  const currentPageIndex = Math.floor(currentPageFloat);
  const pageProgress = currentPageFloat - currentPageIndex;

  const getPageStyle = (index) => {
    // Keep only left page, active turning page, and right page to eliminate visual ghost layers
    if (index < currentPageIndex - 1 || index > currentPageIndex + 1) {
      return { display: "none" };
    }

    if (index === currentPageIndex - 1) {
      return { 
        transform: "perspective(1200px) rotateY(-165deg)", 
        opacity: 1, 
        transition: "none" 
      };
    }

    if (index === currentPageIndex) {
      const angle = -165 * pageProgress;
      const scaleX = 1 - Math.abs(angle / 165) * 0.02;
      return {
        transform: `perspective(1200px) rotateY(${angle}deg) scaleX(${scaleX})`,
        opacity: 1 - (pageProgress > 0.5 ? (pageProgress - 0.5) * 0.6 : 0),
        transition: "none",
      };
    }

    if (index === currentPageIndex + 1) {
      return { 
        transform: "perspective(1200px) rotateY(0deg)", 
        opacity: 1, 
        transition: "none" 
      };
    }

    return { display: "none" };
  };

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

  const progressDots = PAGES.map((_, i) => bookScrollProgress * (totalPages - 1) >= i);

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
      <section
        ref={heroRef}
        style={{
          height: "100vh",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          background: "linear-gradient(160deg, #0f0c08 0%, #1a1208 40%, #0d0a06 100%)",
        }}
      >
        {/* Atmospheric background */}
        <div style={{
          position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none",
        }}>
          <div style={{
            position: "absolute",
            top: "20%", left: "50%",
            transform: "translateX(-50%)",
            width: 600, height: 600,
            background: "radial-gradient(circle, rgba(200,169,110,0.06) 0%, transparent 70%)",
            borderRadius: "50%",
          }} />
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
            {[80, 160, 240, 320, 400].map((r, i) => (
              <circle key={i} cx="600" cy="380" r={r} fill="none" stroke="#C8A96E" strokeWidth="0.4" opacity={0.04 + i * 0.01} />
            ))}
            <line x1="200" y1="0" x2="600" y2="800" stroke="#C8A96E" strokeWidth="0.3" opacity="0.03" />
            <line x1="1000" y1="0" x2="600" y2="800" stroke="#C8A96E" strokeWidth="0.3" opacity="0.03" />
          </svg>
        </div>

        {/* Hero content */}
        <div style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          opacity: heroContentOpacity,
          transform: `translateY(${easedProgress * -20}px)`,
          transition: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0,
        }}>
          {/* Logo placeholder in hero — the actual animated logo floats above */}
          <div ref={logoRef} style={{ width: 120, height: 120, marginBottom: 32 }} />

          <div style={{
            display: "flex", alignItems: "center", gap: 16, marginBottom: 20,
            opacity: 0.5,
          }}>
            <div style={{ height: 1, width: 40, background: "#C8A96E" }} />
            <span style={{ fontFamily: "Georgia, serif", fontSize: "0.65rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#C8A96E" }}>
              Est. 2019
            </span>
            <div style={{ height: 1, width: 40, background: "#C8A96E" }} />
          </div>

          <h1 style={{
            fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
            fontSize: "clamp(1.8rem, 5vw, 3.5rem)",
            fontWeight: 300,
            color: "#f5f0e8",
            letterSpacing: "0.02em",
            lineHeight: 1.15,
            marginBottom: 12,
            maxWidth: 620,
          }}>
            International Institute of<br />
            <span style={{ color: "#C8A96E", fontStyle: "italic" }}>SDGs & Public Policy</span><br />
            Research
          </h1>

          <p style={{
            fontFamily: "'EB Garamond', Georgia, serif",
            fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
            color: "#f5f0e8",
            opacity: 0.55,
            letterSpacing: "0.08em",
            marginBottom: 48,
            fontStyle: "italic",
          }}>
            Research For Sustainable Impact
          </p>

          <p style={{
            fontFamily: "Georgia, serif",
            fontSize: "0.82rem",
            color: "#f5f0e8",
            opacity: 0.35,
            maxWidth: 480,
            lineHeight: 1.75,
            marginBottom: 48,
            letterSpacing: "0.03em",
          }}>
            Bridging rigorous academic inquiry with actionable policy frameworks across all 17 Sustainable Development Goals — for governments, institutions, and communities worldwide.
          </p>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button style={{
              fontFamily: "Georgia, serif",
              fontSize: "0.72rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              padding: "14px 36px",
              background: "#C8A96E",
              color: "#0a0806",
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
            }}>
              Explore Research
            </button>
            <button style={{
              fontFamily: "Georgia, serif",
              fontSize: "0.72rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              padding: "14px 36px",
              background: "transparent",
              color: "#C8A96E",
              border: "1px solid rgba(200,169,110,0.4)",
              cursor: "pointer",
            }}>
              Our Publications
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          opacity: Math.max(0, 1 - transitionProgress * 3),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          zIndex: 5,
        }}>
          <span style={{ fontFamily: "Georgia, serif", fontSize: "0.6rem", letterSpacing: "0.3em", color: "#f5f0e8", opacity: 0.3, textTransform: "uppercase" }}>
            Scroll
          </span>
          <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, rgba(200,169,110,0.4), transparent)" }} />
        </div>
      </section>

      {/* ANIMATED FLOATING LOGO — fixed, travels with scroll */}
      {mounted && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: "50%",
            zIndex: 200,
            pointerEvents: "none",
            transform: `
              translate(-50%, calc(-50% + ${logoY}px + ${floatY * (1 - easedProgress)}px))
              scale(${logoScale})
              rotateX(${rotateX}deg)
              rotateZ(${rotateZ}deg)
            `,
            opacity: logoOpacity,
            willChange: "transform, opacity",
          }}
        >
          <IISPPRLogo size={1.5} color="#f5f0e8" compact={false} />
        </div>
      )}

      {/* BOOK SECTION */}
      <section
        ref={bookSectionRef}
        style={{
          height: `${totalPages * 100}vh`, // 700vh total height scroll track
          background: "#0a0806",
          position: "relative",
        }}
      >
        {/* Sticky viewport container */}
        <div style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          padding: "60px 20px",
        }}>
          <div style={{
            position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none",
          }}>
            <div style={{
              position: "absolute", top: 0, left: "50%",
              transform: "translateX(-50%)",
              width: "100%", height: 1,
              background: "linear-gradient(to right, transparent, rgba(200,169,110,0.2), transparent)",
            }} />
          </div>

          <div style={{
            textAlign: "center",
            marginBottom: 48,
            opacity: easedProgress > 0.7 ? Math.min(1, (easedProgress - 0.7) / 0.3) : 0,
            transform: `translateY(${easedProgress > 0.7 ? lerp(20, 0, (easedProgress - 0.7) / 0.3) : 20}px)`,
            transition: "none",
          }}>
            <p style={{ fontFamily: "Georgia, serif", fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C8A96E", opacity: 0.6, marginBottom: 10 }}>
              Publications
            </p>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
              fontWeight: 300,
              color: "#f5f0e8",
              letterSpacing: "0.02em",
            }}>
              Annual Research Compendium
            </h2>
          </div>

          {/* Book widget */}
          <div
            ref={bookContainerRef}
            style={{
              position: "relative",
              width: "min(380px, 90vw)",
              height: "min(540px, 75vh)",
              opacity: easedProgress > 0.5 ? Math.min(1, (easedProgress - 0.5) / 0.4) : 0,
              transform: `translateY(${easedProgress > 0.5 ? lerp(30, 0, (easedProgress - 0.5) / 0.4) : 30}px)`,
              transition: "none",
            }}
          >
            <div style={{
              position: "absolute", inset: 0,
              filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.7))",
              pointerEvents: "none",
            }}>
              {/* Spine */}
              <div style={{
                position: "absolute",
                left: -12, top: 8, bottom: 8, width: 24,
                background: "linear-gradient(to right, #1e150a 0%, #2e2010 40%, #251a0d 100%)",
                borderRadius: "3px 0 0 3px",
                zIndex: 100,
              }}>
                {Array.from({ length: 18 }).map((_, i) => (
                  <div key={i} style={{
                    position: "absolute", left: 0, right: 0, height: 1,
                    top: `${(i + 1) * 5.3}%`,
                    background: "#C8A96E",
                    opacity: 0.15,
                  }} />
                ))}
              </div>

              {PAGES.map((page, index) => (
                <BookPage
                  key={page.id}
                  page={page}
                  style={getPageStyle(index)}
                  zIndex={index === currentPageIndex ? 10 : 5}
                  logoLanded={logoLanded}
                />
              ))}
            </div>

            {/* Progress dots */}
            <div style={{
              position: "absolute",
              bottom: -40,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: 8,
              alignItems: "center",
              zIndex: 60,
              pointerEvents: "none",
            }}>
              {PAGES.map((_, i) => (
                <div key={i} style={{
                  borderRadius: 9999,
                  width: progressDots[i] ? 20 : 5,
                  height: 5,
                  background: progressDots[i] ? "#C8A96E" : "rgba(255,255,255,0.15)",
                  transition: "all 0.3s ease",
                }} />
              ))}
            </div>

            <div style={{
              position: "absolute",
              top: -30,
              right: 0,
              fontSize: "0.6rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#f5f0e8",
              opacity: 0.25,
              fontFamily: "Georgia, serif",
              pointerEvents: "none",
            }}>
              {Math.min(currentPageIndex + 1, totalPages)} / {totalPages}
            </div>
          </div>

          <div style={{
            marginTop: 80,
            textAlign: "center",
            opacity: easedProgress > 0.8 ? Math.min(1, (easedProgress - 0.8) / 0.2) : 0,
          }}>
            <p style={{ fontFamily: "Georgia, serif", fontSize: "0.72rem", color: "#f5f0e8", opacity: 0.3, letterSpacing: "0.1em" }}>
              Scroll down to explore chapters
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
