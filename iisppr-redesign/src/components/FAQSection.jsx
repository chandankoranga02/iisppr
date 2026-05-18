import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { D } from "../styles/theme";
import { FAQS } from "../data/constants";
import { GridBg } from "./ui/GridBg";
import { Orb } from "./ui/Orb";
import { Reveal } from "./ui/Reveal";
import { Tag } from "./ui/Tag";

// FAQ accordion section component
export function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" style={{
      background: D.bg1, position: "relative", overflow: "hidden",
      paddingTop: 100, paddingBottom: 100,
      borderTop: `1px solid ${D.ln0}`,
    }}>
      <GridBg opacity={0.015} />
      <Orb x="10%" y="80%" r={450} color={D.lavGl} opacity={0.15} />

      <div style={{ maxWidth: 840, margin: "0 auto", padding: "0 clamp(1rem,4vw,2.5rem)", position: "relative", zIndex: 1 }}>
        <Reveal style={{ textAlign: "center", marginBottom: 50 }}>
          <Tag color={D.lav} bg={D.lavSo}>❓ Got Questions?</Tag>
          <h2 style={{
            fontFamily: D.serif, fontSize: "clamp(30px,4.5vw,48px)",
            fontWeight: 900, letterSpacing: "-1.5px",
            color: D.t0, margin: "18px 0 14px", lineHeight: 1.08,
          }}>
            Frequently Asked Questions
          </h2>
        </Reveal>

        {/* Accordion container */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                style={{
                  background: isOpen ? D.bg3 : D.bg2,
                  border: `1px solid ${isOpen ? D.ln2 : D.ln1}`,
                  borderRadius: 16, overflow: "hidden",
                  transition: "all 0.3s ease",
                }}
              >
                {/* Accordion header / trigger */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  style={{
                    width: "100%", textAlign: "left", padding: "22px 24px",
                    background: "transparent", border: "none",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    cursor: "pointer", color: isOpen ? D.t0 : D.t1,
                  }}
                >
                  <span style={{ fontFamily: D.sans, fontSize: 16, fontWeight: 600, paddingRight: 20 }}>
                    {faq.q}
                  </span>
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                    background: isOpen ? D.lavSo : "transparent",
                    border: `1px solid ${isOpen ? D.lav + "44" : D.ln1}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: isOpen ? D.lav : D.t2, transition: "all 0.3s",
                  }}>
                    {isOpen ? <Minus size={14} strokeWidth={3} /> : <Plus size={14} strokeWidth={3} />}
                  </div>
                </button>
                
                {/* Accordion content */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div style={{
                        padding: "0 24px 24px", color: D.t2,
                        fontSize: 14.5, lineHeight: 1.7, fontFamily: D.sans,
                      }}>
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
