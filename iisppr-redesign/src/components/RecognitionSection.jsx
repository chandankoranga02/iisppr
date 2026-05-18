import { motion } from "framer-motion";
import { D } from "../styles/theme";
import { RECOGNITION_CARDS } from "../data/constants";
import { GridBg } from "./ui/GridBg";
import { Orb } from "./ui/Orb";
import { Reveal } from "./ui/Reveal";
import { Tag } from "./ui/Tag";

// Recognition and benefits section component
export function RecognitionSection() {
  return (
    <section id="recognition" style={{
      background: D.bg1, position: "relative", overflow: "hidden",
      paddingTop: 100, paddingBottom: 100,
      borderTop: `1px solid ${D.ln0}`,
    }}>
      <GridBg opacity={0.018} />
      <Orb x="50%" y="0%" r={600} color={D.goldGl} opacity={0.12} />

      <div style={{ maxWidth: 1060, margin: "0 auto", padding: "0 clamp(1rem,4vw,2.5rem)", position: "relative", zIndex: 1 }}>
        <Reveal style={{ textAlign: "center", marginBottom: 60 }}>
          <Tag color={D.goldBr} bg={D.goldSo}>🏆 Recognition & Awards</Tag>
          <h2 style={{
            fontFamily: D.serif, fontSize: "clamp(30px,4.5vw,52px)",
            fontWeight: 900, letterSpacing: "-1.8px",
            color: D.t0, margin: "18px 0 14px", lineHeight: 1.08,
          }}>
            Think critically.
            <span style={{
              display: "block", fontStyle: "italic",
              background: `linear-gradient(110deg, ${D.goldBr} 0%, ${D.sageBr} 100%)`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>Write boldly. Compete for the Gold.</span>
          </h2>
          <p style={{ fontSize: 16, color: D.t2, maxWidth: 460, margin: "0 auto", lineHeight: 1.75, fontFamily: D.sans }}>
            Excellence is recognized at every level — from a certificate of completion to a Gold Medal and global publication.
          </p>
        </Reveal>

        {/* Benefits cards grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }} className="recognition-grid">
          {RECOGNITION_CARDS.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.12}>
              <motion.div
                whileHover={{ y: -7, boxShadow: card.glow + ", 0 20px 48px rgba(0,0,0,0.5)" }}
                style={{
                  background: D.bg2, border: `1px solid ${card.border}`,
                  borderRadius: 20, padding: "28px 24px",
                  height: "100%", transition: "box-shadow 0.25s",
                }}
              >
                <div style={{
                  width: 50, height: 50, borderRadius: 14,
                  background: card.soft, border: `1px solid ${card.border}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 24, marginBottom: 18,
                }}>{card.icon}</div>
                <div style={{ fontSize: 10, color: card.color, fontWeight: 700, letterSpacing: "0.7px", textTransform: "uppercase", fontFamily: D.sans, marginBottom: 6 }}>
                  {card.subtitle}
                </div>
                <div style={{ fontFamily: D.serif, fontSize: 20, fontWeight: 900, color: D.t0, letterSpacing: "-0.4px", marginBottom: 12 }}>
                  {card.title}
                </div>
                <p style={{ fontSize: 13, color: D.t2, lineHeight: 1.7, fontFamily: D.sans, marginBottom: 18 }}>
                  {card.body}
                </p>
                
                {/* Benefits bullet points */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {card.bullets.map(b => (
                    <div key={b} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                      <span style={{ color: card.color, fontSize: 12, flexShrink: 0, marginTop: 2 }}>✦</span>
                      <span style={{ fontSize: 12.5, color: D.t2, fontFamily: D.sans, lineHeight: 1.5 }}>{b}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
