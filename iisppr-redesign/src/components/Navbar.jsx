import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import { D, ease } from "../styles/theme";
import { NAV_LINKS } from "../data/constants";

// Navbar component with pill-shaped floating glassmorphism
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  return (
    <>
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 999,
        display: "flex", justifyContent: "center",
        padding: scrolled ? "10px 0" : "16px 0",
        transition: "padding 0.4s ease",
        pointerEvents: "none",
      }}>
        <motion.nav
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
          style={{
            pointerEvents: "all",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            gap: 0,
            padding: "8px 10px 8px 14px",
            borderRadius: 999,
            background: scrolled
              ? "rgba(9,9,11,0.82)"
              : "rgba(14,14,17,0.55)",
            backdropFilter: "blur(24px) saturate(1.8)",
            border: `1px solid ${scrolled ? D.ln2 : D.ln1}`,
            boxShadow: scrolled
              ? "0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04) inset"
              : "0 4px 24px rgba(0,0,0,0.3)",
            transition: "all 0.35s ease",
            maxWidth: "calc(100vw - 2rem)",
            width: "fit-content",
          }}
          className="navbar-container"
        >
          {/* Logo block */}
          <div style={{ display: "flex", alignItems: "center", gap: 9, marginRight: 22, paddingRight: 22, borderRight: `1px solid ${D.ln1}` }}>
            <div style={{
              width: 30, height: 30, borderRadius: 9,
              background: `linear-gradient(135deg, ${D.gold} 0%, ${D.goldBr} 100%)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 11, fontWeight: 900, color: "#09090b",
              fontFamily: D.sans, letterSpacing: "-0.2px",
            }}>II</div>
            <span style={{
              fontSize: 13, fontWeight: 700, color: D.t0,
              fontFamily: D.sans, letterSpacing: "-0.2px",
            }}>IISPPR</span>
          </div>

          {/* Desktop navigation links */}
          <div className="desktop-nav-links" style={{ display: "flex", gap: 2 }}>
            {NAV_LINKS.map(link => (
              <a key={link} href={`#${link.toLowerCase()}`}
                style={{
                  fontSize: 13, fontWeight: 500, color: D.t2,
                  textDecoration: "none", padding: "6px 13px", borderRadius: 99,
                  fontFamily: D.sans, transition: "all 0.2s",
                  letterSpacing: "-0.1px",
                }}
                onMouseEnter={e => { e.target.style.background = D.bg4; e.target.style.color = D.t0; }}
                onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = D.t2; }}
              >{link}</a>
            ))}
          </div>

          {/* Desktop enrollment CTA button */}
          <motion.a
            href="#pricing"
            className="desktop-nav-cta"
            whileHover={{ scale: 1.04, boxShadow: `0 0 20px ${D.goldGl}` }}
            whileTap={{ scale: 0.96 }}
            style={{
              marginLeft: 10,
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "8px 18px", borderRadius: 99,
              background: D.gold,
              color: "#09090b", fontSize: 13, fontWeight: 700,
              textDecoration: "none", fontFamily: D.sans,
              letterSpacing: "-0.1px",
            }}
          >Enroll Now →</motion.a>

          {/* Mobile hamburger menu toggle */}
          <button 
            className="mobile-nav-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: "transparent", border: "none", color: D.t0,
              display: "none", alignItems: "center", justifyContent: "center",
              padding: "4px", marginLeft: "auto"
            }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </motion.nav>
      </div>

      {/* Mobile navigation menu dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed", top: scrolled ? 68 : 74, left: "1rem", right: "1rem", zIndex: 998,
              background: "rgba(14,14,17,0.95)",
              backdropFilter: "blur(24px) saturate(1.8)",
              border: `1px solid ${D.ln2}`,
              borderRadius: 20,
              padding: "16px",
              boxShadow: "0 16px 40px rgba(0,0,0,0.6)",
              display: "flex", flexDirection: "column", gap: 8
            }}
            className="mobile-nav-menu"
          >
            {NAV_LINKS.map(link => (
              <a key={link} href={`#${link.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  fontSize: 15, fontWeight: 500, color: D.t0,
                  textDecoration: "none", padding: "12px 16px", borderRadius: 12,
                  fontFamily: D.sans, transition: "background 0.2s",
                  background: D.bg2
                }}
              >{link}</a>
            ))}
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                padding: "14px 18px", borderRadius: 12, marginTop: 8,
                background: `linear-gradient(135deg, ${D.gold} 0%, ${D.goldBr} 100%)`,
                color: "#09090b", fontSize: 15, fontWeight: 700,
                textDecoration: "none", fontFamily: D.sans,
              }}
            >Enroll Now →</a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
