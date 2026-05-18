import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { D, ease } from "../styles/theme";
import { PLANS } from "../data/constants";
import { GridBg } from "./ui/GridBg";
import { Orb } from "./ui/Orb";
import { Reveal } from "./ui/Reveal";
import { Tag } from "./ui/Tag";

// Helper component for individual pricing plan cards
function PlanCard({ plan, index }) {
  const [hov, setHov] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      style={{ position: "relative" }}
    >
      {/* Featured gradient ring */}
      {plan.featured && (
        <div style={{
          position: "absolute", inset: -1.5, borderRadius: 23,
          background: `linear-gradient(135deg, ${D.gold} 0%, ${D.goldBr} 50%, ${D.sage} 100%)`,
          zIndex: 0, opacity: 0.65,
        }} />
      )}
      
      {/* Badge container */}
      {(plan.featuredLabel || plan.featured) && (
        <div style={{
          position: "absolute", top: plan.featured ? -13 : -12,
          left: "50%", transform: "translateX(-50%)",
          zIndex: 20, whiteSpace: "nowrap",
          background: plan.featured ? D.gold : plan.accentSo,
          border: plan.featured ? "none" : `1px solid ${plan.bNorm}`,
          color: plan.featured ? "#09090b" : plan.accent,
          fontSize: 11, fontWeight: 700, letterSpacing: "0.4px",
          padding: "5px 16px", borderRadius: 99,
          fontFamily: D.sans,
        }}>
          {plan.featured ? `⭐ ${plan.featuredLabel}` : `✦ ${plan.featuredLabel}`}
        </div>
      )}

      <motion.div
        animate={{
          y: hov ? (plan.featured ? -8 : -5) : 0,
          boxShadow: hov ? plan.glow + ", 0 28px 56px rgba(0,0,0,0.6)" : plan.featured ? `0 0 32px ${plan.accentGl}` : "0 4px 20px rgba(0,0,0,0.3)",
        }}
        transition={{ duration: 0.22 }}
        style={{
          position: "relative", zIndex: 1,
          borderRadius: 21,
          background: plan.featured
            ? `linear-gradient(170deg, rgba(22,20,14,0.98) 0%, rgba(15,14,10,0.99) 100%)`
            : D.bg2,
          border: `1px solid ${hov ? plan.bHov : plan.bNorm}`,
          padding: "30px 26px 26px",
          overflow: "hidden",
          transition: "border-color 0.2s",
        }}
      >
        {/* Ambient glow top */}
        {plan.featured && (
          <div style={{
            position: "absolute", top: -80, left: "50%", transform: "translateX(-50%)",
            width: 260, height: 160,
            background: `radial-gradient(circle, ${D.goldGl} 0%, transparent 70%)`,
            pointerEvents: "none",
          }} />
        )}

        {/* Plan tag */}
        <div style={{ marginBottom: 16 }}>
          <Tag color={plan.tagColor} bg={plan.tagBg} border={plan.tagBorder}>
            {plan.tag}
          </Tag>
        </div>

        <div style={{
          fontFamily: D.serif,
          fontSize: 24, fontWeight: 900, color: D.t0,
          letterSpacing: "-0.6px", marginBottom: 8,
        }}>{plan.name} Offer</div>

        <p style={{
          fontSize: 13, color: D.t2, lineHeight: 1.65, marginBottom: 24,
          fontFamily: D.sans, minHeight: 46,
        }}>{plan.desc}</p>

        {/* Price block */}
        <div style={{
          background: "rgba(0,0,0,0.3)", border: `1px solid ${D.ln0}`,
          borderRadius: 14, padding: "16px 18px", marginBottom: 22,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontSize: 12, color: D.t3, fontFamily: D.sans }}>Actual Fee</span>
            <span style={{ fontSize: 14, color: D.t3, textDecoration: "line-through", fontFamily: D.sans }}>
              ₹{plan.actualFee.toLocaleString("en-IN")}
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <div style={{ fontSize: 11, color: D.t2, fontFamily: D.sans, marginBottom: 2 }}>Offer Price</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 2 }}>
                <span style={{ fontSize: 17, color: plan.accent, fontFamily: D.sans, fontWeight: 700 }}>₹</span>
                <span style={{
                  fontFamily: D.serif, fontSize: 44, fontWeight: 900, color: D.t0,
                  letterSpacing: "-2px", lineHeight: 1,
                }}>{plan.price.toLocaleString("en-IN")}</span>
              </div>
            </div>
            <div style={{
              background: plan.accentSo, border: `1px solid ${plan.bNorm}`,
              borderRadius: 10, padding: "8px 12px", textAlign: "center",
            }}>
              <div style={{ fontFamily: D.serif, fontSize: 20, fontWeight: 900, color: plan.accent }}>
                {plan.saving}
              </div>
              <div style={{ fontSize: 10, color: D.t3, fontFamily: D.sans }}>off</div>
            </div>
          </div>
        </div>

        {/* Action CTA button */}
        <motion.a
          href="#"
          whileHover={{ scale: 1.025, boxShadow: plan.ctaFilled ? `0 0 28px ${plan.accentGl}` : "none" }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            width: "100%", padding: "13px 0",
            borderRadius: 11, marginBottom: 22, textDecoration: "none",
            border: plan.ctaFilled ? "none" : `1px solid ${plan.bHov}`,
            background: plan.ctaFilled
              ? `linear-gradient(135deg, ${D.gold} 0%, ${D.goldBr} 100%)`
              : plan.accentSo,
            color: plan.ctaFilled ? "#09090b" : plan.accent,
            fontSize: 14, fontWeight: 700,
            fontFamily: D.sans, letterSpacing: "-0.1px",
            transition: "all 0.2s",
          }}
        >{plan.cta} →</motion.a>

        {/* Divider line */}
        <div style={{ height: 1, background: D.ln0, marginBottom: 18 }} />

        {/* Plan features list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {plan.features.map(f => (
            <div key={f.text} style={{
              display: "flex", alignItems: "center", gap: 10,
              opacity: f.yes ? 1 : 0.32,
            }}>
              <div style={{
                width: 17, height: 17, borderRadius: 5, flexShrink: 0,
                background: f.yes ? plan.accentSo : "rgba(255,255,255,0.03)",
                border: `1px solid ${f.yes ? plan.bNorm : D.ln0}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 9, fontWeight: 900,
                color: f.yes ? plan.accent : D.t3,
              }}>{f.yes ? "✓" : "—"}</div>
              <span style={{
                fontSize: 12.5, color: f.yes ? D.t1 : D.t3,
                fontFamily: D.sans, lineHeight: 1.4,
              }}>{f.text}</span>
            </div>
          ))}
        </div>

        {/* Informational note footer */}
        <div style={{
          marginTop: 18, padding: "10px 14px", borderRadius: 9,
          background: plan.accentSo, border: `1px solid ${plan.bNorm}`,
          fontSize: 11.5, color: plan.noteColor, fontFamily: D.sans, lineHeight: 1.5,
        }}>{plan.note}</div>
      </motion.div>
    </motion.div>
  );
}

// Pricing / Enrollment section component
export function PricingSection() {
  return (
    <section id="pricing" style={{
      background: D.bg1, position: "relative", overflow: "hidden",
      paddingTop: 100, paddingBottom: 100,
      borderTop: `1px solid ${D.ln0}`,
    }}>
      <GridBg opacity={0.02} />
      <Orb x="5%"  y="30%" r={500} color={D.goldGl} opacity={0.28} />
      <Orb x="95%" y="60%" r={450} color={D.sageGl} opacity={0.2} />

      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 clamp(1rem,4vw,2.5rem)", position: "relative", zIndex: 1 }}>

        {/* Section header */}
        <Reveal style={{ textAlign: "center", marginBottom: 64 }}>
          <Tag color={D.goldBr} bg={D.goldSo}>🎟 Enrollment Offers</Tag>
          <h2 style={{
            fontFamily: D.serif,
            fontSize: "clamp(32px,5vw,54px)",
            fontWeight: 900, letterSpacing: "-2px",
            color: D.t0, margin: "20px 0 16px", lineHeight: 1.05,
          }}>
            Choose your offer type
          </h2>
          <p style={{
            fontSize: 16, color: D.t2, maxWidth: 480,
            margin: "0 auto 28px", lineHeight: 1.75, fontFamily: D.sans,
          }}>
            Every offer accesses the same world-class curriculum. Your category determines pricing and benefits.
          </p>
          
          {/* Actual fee comparison pill */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 16,
            padding: "10px 24px", borderRadius: 12,
            background: D.bg3, border: `1px solid ${D.ln1}`,
          }}>
            <span style={{ fontSize: 13, color: D.t2, fontFamily: D.sans }}>Actual Program Fee</span>
            <span style={{ fontFamily: D.serif, fontSize: 20, fontWeight: 900, color: D.t0, letterSpacing: "-0.5px" }}>₹8,000</span>
            <div style={{ width: 1, height: 18, background: D.ln1 }} />
            <span style={{ fontSize: 12, color: D.goldBr, fontWeight: 600, fontFamily: D.sans }}>Save up to 50% →</span>
          </div>
        </Reveal>

        {/* Plan cards grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 22, alignItems: "start",
        }} className="pricing-grid">
          {PLANS.map((plan, i) => (
            <PlanCard key={plan.id} plan={plan} index={i} />
          ))}
        </div>

        {/* Trust factors bottom bar */}
        <Reveal delay={0.3} style={{ marginTop: 52, display: "flex", justifyContent: "center", gap: 40, flexWrap: "wrap" }}>
          {[
            { icon: "🔒", text: "Secure Payment" },
            { icon: "↩️", text: "Review Before Enrolling" },
            { icon: "📜", text: "IISPPR Certified" },
            { icon: "🌍", text: "Globally Accessible" },
          ].map(t => (
            <div key={t.text} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, color: D.t3, fontFamily: D.sans }}>
              <span>{t.icon}</span><span>{t.text}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
