import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { D, ease } from "../styles/theme";
import { PHASES, OUTCOMES } from "../data/constants";
import { GridBg } from "./ui/GridBg";
import { Orb } from "./ui/Orb";
import { Reveal } from "./ui/Reveal";
import { Tag } from "./ui/Tag";

// Curriculum timeline section component
export function CurriculumSection() {
  const [active, setActive] = useState(0);

  return (
    <section id="curriculum" style={{
      background: D.bg, position: "relative", overflow: "hidden",
      paddingTop: 100, paddingBottom: 100,
      borderTop: `1px solid ${D.ln0}`,
    }}>
      <GridBg opacity={0.022} />
      <Orb x="80%" y="20%" r={400} color={D.lavGl} opacity={0.2} />

      <div style={{ maxWidth: 1060, margin: "0 auto", padding: "0 clamp(1rem,4vw,2.5rem)", position: "relative", zIndex: 1 }}>

        <Reveal style={{ marginBottom: 60 }}>
          <Tag color={D.sageBr} bg={D.sageSo}>📚 18 Power-Packed Lectures</Tag>
          <h2 style={{
            fontFamily: D.serif, fontSize: "clamp(30px,4.5vw,52px)",
            fontWeight: 900, letterSpacing: "-1.8px",
            color: D.t0, margin: "18px 0 14px", lineHeight: 1.08,
          }}>
            Course Roadmap
          </h2>
          <p style={{ fontSize: 16, color: D.t2, maxWidth: 520, lineHeight: 1.75, fontFamily: D.sans }}>
            60 days of structured learning — from policy foundations to advanced data science applications and capstone delivery.
          </p>
        </Reveal>

        {/* Timeline navigation and panels */}
        <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "0 40px" }} className="curriculum-layout">

          {/* Left side: Phase selection tabs */}
          <div style={{ position: "relative" }}>
            {/* Connecting vertical line */}
            <div style={{
              position: "absolute", left: 14, top: 20, bottom: 20,
              width: 2, background: `linear-gradient(to bottom, ${D.gold}44, ${D.lav}22)`,
            }} />

            {PHASES.map((p, i) => (
              <motion.button
                key={p.label}
                onClick={() => setActive(i)}
                whileHover={{ x: 4 }}
                style={{
                  display: "flex", alignItems: "flex-start", gap: 14,
                  padding: "10px 14px 10px 0", width: "100%",
                  background: "none", border: "none", cursor: "pointer",
                  textAlign: "left", position: "relative", zIndex: 1,
                  marginBottom: 8,
                }}
              >
                {/* Active indicator dot */}
                <motion.div
                  animate={{
                    background: active === i ? p.color : D.bg4,
                    boxShadow: active === i ? `0 0 12px ${p.color}` : "none",
                  }}
                  transition={{ duration: 0.2 }}
                  style={{
                    width: 10, height: 10, borderRadius: "50%", flexShrink: 0, marginTop: 4,
                    border: `2px solid ${active === i ? p.color : D.ln1}`,
                    transition: "border-color 0.2s",
                    marginLeft: 10,
                  }}
                />
                <div>
                  <div style={{
                    fontSize: 13, fontWeight: 700,
                    color: active === i ? D.t0 : D.t2,
                    fontFamily: D.sans, transition: "color 0.2s",
                  }}>{p.label}</div>
                  <div style={{ fontSize: 11, color: D.t3, fontFamily: D.sans, marginTop: 2 }}>{p.weeks}</div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Right side: Active module content */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.28, ease }}
              >
                {/* Active phase summary banner */}
                <div style={{
                  display: "flex", alignItems: "center", gap: 12, marginBottom: 18,
                  padding: "12px 18px", borderRadius: 12,
                  background: PHASES[active].soft, border: `1px solid ${PHASES[active].border}`,
                }}>
                  <div style={{ width: 3, height: 30, borderRadius: 2, background: PHASES[active].color, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: PHASES[active].color, fontFamily: D.sans }}>
                      {PHASES[active].label} Phase — {PHASES[active].weeks}
                    </div>
                    <div style={{ fontSize: 11, color: D.t2, fontFamily: D.sans }}>
                      {PHASES[active].modules.length} modules
                    </div>
                  </div>
                </div>

                {/* Module items list */}
                {PHASES[active].modules.map((mod, mi) => (
                  <motion.div
                    key={mod}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: mi * 0.07, duration: 0.38, ease }}
                    style={{
                      display: "flex", alignItems: "flex-start", gap: 14,
                      padding: "15px 18px", borderRadius: 12, marginBottom: 10,
                      background: D.bg2, border: `1px solid ${D.ln1}`,
                    }}
                  >
                    <div style={{
                      width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                      background: PHASES[active].soft, border: `1px solid ${PHASES[active].border}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 11, fontWeight: 900, color: PHASES[active].color,
                      fontFamily: D.sans,
                    }}>{String(mi + 1).padStart(2, "0")}</div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 500, color: D.t0, fontFamily: D.sans, lineHeight: 1.5 }}>{mod}</div>
                      <div style={{ fontSize: 11, color: D.t3, marginTop: 3, fontFamily: D.sans }}>Lecture {mi + 1} · 2–3 hrs</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Learning outcomes grid */}
        <Reveal delay={0.2} style={{ marginTop: 52 }}>
          <div style={{
            background: D.bg2, border: `1px solid ${D.ln2}`,
            borderRadius: 20, padding: "32px 34px",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <div style={{
                width: 34, height: 34, borderRadius: 10,
                background: D.sageSo, border: `1px solid ${D.sage}30`,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
              }}>🎯</div>
              <div style={{ fontFamily: D.serif, fontSize: 18, fontWeight: 900, color: D.t0, letterSpacing: "-0.3px" }}>
                By the end, you'll be able to:
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 32px" }} className="outcomes-grid">
              {OUTCOMES.map((o, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                  style={{ display: "flex", gap: 10, alignItems: "flex-start" }}
                >
                  <span style={{ color: D.sage, fontSize: 13, flexShrink: 0, marginTop: 3 }}>✓</span>
                  <span style={{ fontSize: 13, color: D.t2, lineHeight: 1.65, fontFamily: D.sans }}>{o}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
