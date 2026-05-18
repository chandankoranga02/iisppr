import { motion } from "framer-motion";
import { D } from "../styles/theme";
import { GridBg } from "./ui/GridBg";
import { Orb } from "./ui/Orb";
import { Reveal } from "./ui/Reveal";

// Final call-to-action bottom section component
export function FinalCTA() {
  return (
    <section id="cta" style={{
      background: D.bg, position: "relative", overflow: "hidden",
      padding: "110px clamp(1rem,4vw,2.5rem)",
      borderTop: `1px solid ${D.ln0}`,
    }}>
      <GridBg opacity={0.02} />
      <Orb x="50%" y="55%" r={700} color={D.goldGl} opacity={0.18} />
      <Orb x="50%" y="55%" r={400} color={D.sageGl} opacity={0.10} />

      <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <Reveal>
          {/* Decorative quote mark */}
          <div style={{
            fontFamily: D.serif, fontSize: "clamp(48px,8vw,96px)",
            color: D.ln1, lineHeight: 1, marginBottom: 8, userSelect: "none",
          }}>"</div>

          <h2 style={{
            fontFamily: D.serif,
            fontSize: "clamp(32px,5vw,58px)",
            fontWeight: 900, letterSpacing: "-2px",
            color: D.t0, lineHeight: 1.06, margin: "0 0 24px",
          }}>
            Ready to understand policy —
            <span style={{
              display: "block", fontStyle: "italic",
              background: `linear-gradient(110deg, ${D.goldBr} 0%, ${D.sageBr} 70%, ${D.lav} 100%)`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>and be part of changing it?</span>
          </h2>

          <p style={{
            fontSize: 16, color: D.t2, lineHeight: 1.8,
            marginBottom: 44, fontFamily: D.sans, maxWidth: 520, margin: "0 auto 44px",
          }}>
            18 power-packed lectures. 60 days. One program that bridges critical thinking, data science, and real-world policy impact. Limited seats for the March cohort.
          </p>

          {/* Action buttons row */}
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 32 }}>
            <motion.a
              href="#pricing"
              whileHover={{ scale: 1.05, boxShadow: `0 0 48px ${D.goldGl}` }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                padding: "15px 36px", borderRadius: 14,
                background: `linear-gradient(135deg, ${D.gold} 0%, ${D.goldBr} 100%)`,
                color: "#09090b", fontSize: 16, fontWeight: 700,
                textDecoration: "none", fontFamily: D.sans,
                boxShadow: `0 0 0 1px ${D.gold}44`,
              }}
            >
              View Enrollment Offers
              <span style={{ fontSize: 18 }}>→</span>
            </motion.a>
            <motion.a
              href="#curriculum"
              whileHover={{ borderColor: D.ln3, color: D.t0 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "15px 28px", borderRadius: 14,
                background: "transparent", border: `1px solid ${D.ln2}`,
                color: D.t1, fontSize: 16, fontWeight: 500,
                textDecoration: "none", fontFamily: D.sans,
                transition: "all 0.2s",
              }}
            >Explore Curriculum</motion.a>
          </div>

          {/* Trust points footer */}
          <div style={{
            display: "flex", justifyContent: "center", alignItems: "center",
            gap: 28, flexWrap: "wrap",
          }}>
            {[
              { icon: "🔒", text: "Secure payment" },
              { icon: "📜", text: "Official certificate" },
              { icon: "🌍", text: "Globally accessible" },
              { icon: "🚀", text: "Start March 2nd week" },
            ].map(item => (
              <div key={item.text} style={{
                display: "flex", alignItems: "center", gap: 6,
                fontSize: 13, color: D.t3, fontFamily: D.sans,
              }}>
                <span>{item.icon}</span><span>{item.text}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
