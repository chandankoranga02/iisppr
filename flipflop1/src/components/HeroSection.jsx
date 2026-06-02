import React from "react";

export default function HeroSection({
  logoRef,
  heroContentOpacity,
  easedProgress,
  transitionProgress
}) {
  return (
    <section
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
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
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
        {/* Logo placeholder in hero */}
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
  );
}
