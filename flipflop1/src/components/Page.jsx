import React from "react";
import IISPPRLogo from "./IISPPRLogo";

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

export default function Page({ page, style, zIndex, logoLanded }) {
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
