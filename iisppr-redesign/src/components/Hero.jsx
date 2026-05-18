import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { D, ease } from "../styles/theme";
import { HERO_STATS, TRUST_BADGES } from "../data/constants";
import { useCountUp } from "../hooks/useCountUp";
import { GridBg } from "./ui/GridBg";
import { Orb } from "./ui/Orb";
import { Tag } from "./ui/Tag";

// Helper component for animating stats in Hero section
function StatCounter({ stat }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const count = useCountUp(stat.value, stat.value > 100 ? 2000 : 1400, inView);
  
  return (
    <div ref={ref} style={{ textAlign: "center" }}>
      <div style={{
        fontSize: 28, fontWeight: 400, color: D.t0, lineHeight: 1,
        fontFamily: D.serif, letterSpacing: "-0.5px",
      }}>
        {count.toLocaleString()}{stat.suffix}
      </div>
      <div style={{ fontSize: 12, color: D.t2, marginTop: 4, fontFamily: D.sans }}>{stat.label}</div>
    </div>
  );
}

// Hero section component
export function Hero() {
  const stagger = {
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };
  const child = {
    hidden:  { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease } },
  };

  return (
    <section id="program" style={{
      position: "relative", overflow: "hidden",
      background: D.bg,
      paddingTop: "clamp(100px, 16vh, 150px)",
      paddingBottom: "clamp(70px, 10vh, 110px)",
    }}>
      <GridBg opacity={0.025} />
      <Orb x="15%" y="0%" r={700} color={D.goldGl} opacity={0.35} />
      <Orb x="85%" y="40%" r={500} color={D.sageGl} opacity={0.22} />
      <Orb x="50%" y="90%" r={400} color={D.lavGl} opacity={0.15} />

      {/* Vignette overlay */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
        background: "radial-gradient(ellipse 100% 60% at 50% 100%, rgba(9,9,11,0.9) 0%, transparent 60%)",
      }} />

      <div style={{
        maxWidth: 1160, margin: "0 auto",
        padding: "0 clamp(1rem,4vw,2.5rem)",
        position: "relative", zIndex: 2,
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr min(340px, 35%)",
          gap: "3rem 5rem",
          alignItems: "start",
        }} className="hero-grid">

          {/* Left side content */}
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.div variants={child} style={{ marginBottom: 24 }}>
              <Tag>🚀 March Cohort — Enrollment Open</Tag>
            </motion.div>

            <motion.h1 variants={child} style={{
              fontFamily: D.serif,
              fontSize: "clamp(38px,6vw,72px)",
              fontWeight: 900, lineHeight: 1.02,
              letterSpacing: "-2.5px", color: D.t0,
              margin: "0 0 24px", maxWidth: 640,
            }}>
              Quantitative{" "}
              <span style={{
                fontStyle: "italic",
                background: `linear-gradient(110deg, ${D.goldBr} 10%, ${D.sageBr} 90%)`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>Research</span>
              {" "}&amp;{" "}
              <span style={{
                fontStyle: "italic",
                background: `linear-gradient(110deg, ${D.sageBr} 10%, ${D.lav} 90%)`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>Data Science</span>
            </motion.h1>

            <motion.p variants={child} style={{
              fontSize: "clamp(15px,1.8vw,17px)", color: D.t1,
              lineHeight: 1.78, maxWidth: 510, margin: "0 0 36px",
              fontFamily: D.sans,
            }}>
              A 60-day intensive online program blending public policy, data science, and AI-driven governance. Think critically. Research boldly. Get published.
            </motion.p>

            {/* Call to action buttons */}
            <motion.div variants={child} style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 44 }}>
              <motion.a href="#pricing"
                whileHover={{ scale: 1.04, boxShadow: `0 0 32px ${D.goldGl}` }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "13px 28px", borderRadius: 12,
                  background: `linear-gradient(135deg, ${D.gold} 0%, ${D.goldBr} 100%)`,
                  color: "#09090b", fontSize: 15, fontWeight: 700,
                  textDecoration: "none", fontFamily: D.sans,
                  letterSpacing: "-0.1px",
                }}>
                View Enrollment Offers <span style={{ fontSize: 17 }}>→</span>
              </motion.a>
              <motion.a href="#curriculum"
                whileHover={{ borderColor: D.ln3, color: D.t0 }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "13px 24px", borderRadius: 12,
                  background: "transparent", border: `1px solid ${D.ln2}`,
                  color: D.t1, fontSize: 15, fontWeight: 500,
                  textDecoration: "none", fontFamily: D.sans,
                  transition: "all 0.2s",
                }}>Explore Curriculum</motion.a>
            </motion.div>

            {/* Trust badges row */}
            <motion.div variants={child} style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {TRUST_BADGES.map(b => (
                <div key={b.text} style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "5px 12px", borderRadius: 8,
                  background: D.bg3, border: `1px solid ${D.ln1}`,
                  fontSize: 12, color: D.t2, fontFamily: D.sans,
                }}>
                  <span style={{ fontSize: 13 }}>{b.icon}</span>{b.text}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right side floating card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease }}
            className="hero-card"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              style={{
                background: "rgba(18,18,23,0.88)",
                backdropFilter: "blur(28px) saturate(1.6)",
                border: `1px solid ${D.ln2}`,
                borderRadius: 22,
                padding: "28px 26px",
                boxShadow: `0 32px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04) inset, 0 0 60px ${D.goldGl}`,
              }}
            >
              <div style={{
                fontSize: 11, fontWeight: 700, color: D.t3,
                letterSpacing: "0.8px", textTransform: "uppercase",
                fontFamily: D.sans, marginBottom: 20,
              }}>Program at a Glance</div>

              {HERO_STATS.map((s, i) => (
                <div key={s.label} style={{
                  display: "flex", alignItems: "center", gap: 14,
                  paddingBottom: i < HERO_STATS.length - 1 ? 14 : 0,
                  marginBottom: i < HERO_STATS.length - 1 ? 14 : 0,
                  borderBottom: i < HERO_STATS.length - 1 ? `1px solid ${D.ln0}` : "none",
                }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: 10,
                    background: D.goldSo, border: `1px solid ${D.gold}30`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 17, flexShrink: 0,
                  }}>{s.icon}</div>
                  <div>
                    <StatCounter stat={s} />
                  </div>
                </div>
              ))}

              <div style={{ height: 1, background: D.ln1, margin: "20px 0" }} />

              {/* Pre-launch pill */}
              <div style={{
                padding: "12px 14px", borderRadius: 12,
                background: D.goldRg, border: `1px solid ${D.gold}30`,
              }}>
                <div style={{ fontSize: 10, color: D.gold, fontWeight: 700, fontFamily: D.sans, letterSpacing: "0.6px", textTransform: "uppercase", marginBottom: 4 }}>
                  ⏳ Pre-Launch Offer
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                  <span style={{ fontFamily: D.serif, fontSize: 26, fontWeight: 900, color: D.goldBr, letterSpacing: "-1px" }}>₹3,999</span>
                  <span style={{ fontSize: 14, color: D.t3, textDecoration: "line-through", fontFamily: D.sans }}>₹8,000</span>
                  <span style={{
                    marginLeft: "auto", fontSize: 11, fontWeight: 700,
                    color: "#09090b", background: D.gold,
                    padding: "2px 8px", borderRadius: 6, fontFamily: D.sans,
                  }}>50% off</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
