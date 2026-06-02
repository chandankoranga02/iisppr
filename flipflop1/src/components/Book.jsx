import React from "react";
import Page from "./Page";
import ScrollProgress from "./ScrollProgress";
import { PAGES } from "../data/bookContent";
import { useBookScroll } from "../hooks/useBookScroll";

export default function Book({ scrollY, viewportH, logoLanded, easedProgress }) {
  const totalPages = PAGES.length;
  
  const {
    currentPageIndex,
    progressDots,
    getPageStyle
  } = useBookScroll({ scrollY, viewportH, totalPages });

  return (
    <section
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
          transform: `translateY(${easedProgress > 0.7 ? (20 - ((easedProgress - 0.7) / 0.3) * 20) : 20}px)`,
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
          style={{
            position: "relative",
            width: "min(380px, 90vw)",
            height: "min(540px, 75vh)",
            opacity: easedProgress > 0.5 ? Math.min(1, (easedProgress - 0.5) / 0.4) : 0,
            transform: `translateY(${easedProgress > 0.5 ? (30 - ((easedProgress - 0.5) / 0.4) * 30) : 30}px)`,
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
              <Page
                key={page.id}
                page={page}
                style={getPageStyle(index)}
                zIndex={index === currentPageIndex ? 10 : 5}
                logoLanded={logoLanded}
              />
            ))}
          </div>

          {/* Progress dots */}
          <ScrollProgress progressDots={progressDots} pages={PAGES} />

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
  );
}
