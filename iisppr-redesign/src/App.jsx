import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, Plus, Minus } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   DESIGN TOKENS
═══════════════════════════════════════════════════════════════ */
const D = {
  // Backgrounds — warm dark, not cold
  bg:      "#09090b",
  bg1:     "#0e0e11",
  bg2:     "#121217",
  bg3:     "#17171e",
  bg4:     "#1c1c25",

  // Borders
  ln0:   "rgba(255,255,255,0.04)",
  ln1:   "rgba(255,255,255,0.08)",
  ln2:   "rgba(255,255,255,0.14)",
  ln3:   "rgba(255,255,255,0.22)",

  // Gold — primary accent
  gold:   "#c9973a",
  goldBr: "#e8b84b",
  goldSo: "rgba(201,151,58,0.12)",
  goldGl: "rgba(201,151,58,0.25)",
  goldRg: "rgba(201,151,58,0.08)",

  // Sage — secondary accent (academic, calm)
  sage:   "#5eaf8e",
  sageBr: "#7dcfac",
  sageSo: "rgba(94,175,142,0.10)",
  sageGl: "rgba(94,175,142,0.20)",

  // Lavender — tertiary (select highlights)
  lav:    "#9d8fdc",
  lavSo:  "rgba(157,143,220,0.10)",
  lavGl:  "rgba(157,143,220,0.20)",

  // Rose
  rose:   "#d97066",
  roseSo: "rgba(217,112,102,0.10)",

  // Text
  t0:  "#f5f4f0",   // near-white, warm
  t1:  "#c2bfb8",   // body
  t2:  "#7a7870",   // muted
  t3:  "#42403c",   // faint

  // Fonts
  serif: "'Fraunces', 'Georgia', serif",
  sans:  "'Cabinet Grotesk', 'DM Sans', sans-serif",
};

const spring = { type: "spring", stiffness: 280, damping: 30 };
const ease   = [0.22, 1, 0.36, 1];
const easeIn = [0.4, 0, 0.2, 1];

/* ═══════════════════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════════════════ */
function useCountUp(target, duration = 1800, active = true) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const prog = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(prog * prog * (3 - 2 * prog) * target)); // smoothstep
      if (prog < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, active]);
  return val;
}

function Orb({ x, y, r = 400, color, opacity = 1 }) {
  return (
    <div style={{
      position: "absolute",
      left: x, top: y,
      width: r, height: r,
      borderRadius: "50%",
      background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      transform: "translate(-50%,-50%)",
      filter: "blur(1px)",
      opacity,
      pointerEvents: "none",
      zIndex: 0,
    }} />
  );
}

function GridBg({ opacity = 0.025 }) {
  return (
    <div style={{
      position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
      backgroundImage: `
        linear-gradient(rgba(255,255,255,${opacity}) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,${opacity}) 1px, transparent 1px)
      `,
      backgroundSize: "52px 52px",
    }} />
  );
}

function Tag({ children, color = D.gold, bg = D.goldSo, border }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      padding: "4px 13px", borderRadius: 99,
      background: bg, border: `1px solid ${border || color + "44"}`,
      fontSize: 11, fontWeight: 700, color,
      letterSpacing: "0.65px", textTransform: "uppercase",
      fontFamily: D.sans,
    }}>{children}</span>
  );
}

function Reveal({ children, delay = 0, y = 28, once = true, style = {}, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-60px" });
  return (
    <motion.div ref={ref} className={className} style={style}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.72, delay, ease }}
    >{children}</motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   1. NAVBAR — pill-shaped floating glassmorphism
═══════════════════════════════════════════════════════════════ */
const NAV_LINKS = ["Program", "Curriculum", "Pricing", "Recognition", "FAQ"];

function Navbar() {
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
          {/* Logo */}
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

          {/* Desktop Links */}
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

          {/* Desktop CTA */}
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

          {/* Mobile Hamburger Toggle */}
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

      {/* Mobile Menu Dropdown */}
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

/* ═══════════════════════════════════════════════════════════════
   2. HERO SECTION
═══════════════════════════════════════════════════════════════ */
const HERO_STATS = [
  { value: 18,   suffix: "",   label: "Expert Lectures",    icon: "🎓" },
  { value: 60,   suffix: "",   label: "Day Program",        icon: "📅" },
  { value: 30,   suffix: "+",  label: "Countries Reached",  icon: "🌍" },
  { value: 2400, suffix: "+",  label: "Graduates",          icon: "🏅" },
];

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

const TRUST_BADGES = [
  { icon: "🏛️", text: "Govt. Recognized" },
  { icon: "🌐", text: "UN SDG Aligned" },
  { icon: "📖", text: "ISBN Publication" },
  { icon: "🥇", text: "Gold Medal Program" },
];

function Hero() {
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

      {/* Vignette */}
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

          {/* LEFT */}
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

            {/* CTAs */}
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

            {/* Trust badges */}
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

          {/* RIGHT — floating card */}
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

/* ═══════════════════════════════════════════════════════════════
   3. PRICING / ENROLLMENT
═══════════════════════════════════════════════════════════════ */
const PLANS = [
  {
    id: "student",
    tag: "🎓 Student Offer",
    tagColor: D.sage, tagBg: D.sageSo, tagBorder: `${D.sage}33`,
    name: "Student",
    desc: "For university students and recent graduates. Verify with a valid student ID.",
    actualFee: 8000, price: 4999,
    saving: "37%",
    accent: D.sage, accentSo: D.sageSo, accentGl: D.sageGl,
    bNorm: `${D.sage}28`, bHov: `${D.sage}60`,
    glow: `0 0 50px rgba(94,175,142,0.12)`,
    featured: false, featuredLabel: null,
    cta: "Enroll as Student", ctaFilled: false,
    features: [
      { text: "Full 18-lecture curriculum",  yes: true },
      { text: "60-day online program",        yes: true },
      { text: "Reading materials & PDFs",     yes: true },
      { text: "Certificate of Completion",    yes: true },
      { text: "Gold Medal Eligibility",       yes: true },
      { text: "Live Q&A Sessions",            yes: true },
      { text: "ISBN Book Publication",        yes: false },
    ],
    note: "📋 Student/institute ID required for verification",
    noteColor: D.sage,
  },
  {
    id: "prelaunch",
    tag: "🚀 Pre-Launch Offer",
    tagColor: D.goldBr, tagBg: D.goldSo, tagBorder: `${D.gold}40`,
    name: "Pre-Launch",
    desc: "Lock in the lowest price before the official launch. All standard benefits included.",
    actualFee: 8000, price: 3999,
    saving: "50%",
    accent: D.gold, accentSo: D.goldSo, accentGl: D.goldGl,
    bNorm: `${D.gold}40`, bHov: `${D.gold}80`,
    glow: `0 0 60px rgba(201,151,58,0.2), 0 0 0 1px rgba(201,151,58,0.1) inset`,
    featured: true, featuredLabel: "Best Value",
    cta: "Grab This Offer", ctaFilled: true,
    features: [
      { text: "Full 18-lecture curriculum",  yes: true },
      { text: "60-day online program",        yes: true },
      { text: "Reading materials & PDFs",     yes: true },
      { text: "Certificate of Completion",    yes: true },
      { text: "Gold Medal Eligibility",       yes: false },
      { text: "Live Q&A Sessions",            yes: false },
      { text: "ISBN Book Publication",        yes: false },
    ],
    note: "⚡ Expires at official launch — limited seats",
    noteColor: D.goldBr,
  },
  {
    id: "alumni",
    tag: "🏛️ Alumni / Professional",
    tagColor: D.lav, tagBg: D.lavSo, tagBorder: `${D.lav}33`,
    name: "Alumni & Pro",
    desc: "For IISPPR alumni and working professionals. Get the complete experience including publication.",
    actualFee: 8000, price: 5499,
    saving: "31%",
    accent: D.lav, accentSo: D.lavSo, accentGl: D.lavGl,
    bNorm: `${D.lav}28`, bHov: `${D.lav}60`,
    glow: `0 0 50px rgba(157,143,220,0.10)`,
    featured: false, featuredLabel: "Full Access",
    cta: "Enroll Now", ctaFilled: false,
    features: [
      { text: "Full 18-lecture curriculum",  yes: true },
      { text: "60-day online program",        yes: true },
      { text: "Reading materials & PDFs",     yes: true },
      { text: "Certificate of Completion",    yes: true },
      { text: "Gold Medal Eligibility",       yes: true },
      { text: "Live Q&A Sessions",            yes: true },
      { text: "ISBN Book Publication",        yes: true },
    ],
    note: "🔗 Alumni verified via previous IISPPR certificate",
    noteColor: D.lav,
  },
];

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
      {/* Badge */}
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

        {/* Tag */}
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

        {/* CTA */}
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

        {/* Divider */}
        <div style={{ height: 1, background: D.ln0, marginBottom: 18 }} />

        {/* Features */}
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

        {/* Note */}
        <div style={{
          marginTop: 18, padding: "10px 14px", borderRadius: 9,
          background: plan.accentSo, border: `1px solid ${plan.bNorm}`,
          fontSize: 11.5, color: plan.noteColor, fontFamily: D.sans, lineHeight: 1.5,
        }}>{plan.note}</div>
      </motion.div>
    </motion.div>
  );
}

function PricingSection() {
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

        {/* Header */}
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
          {/* Actual fee pill */}
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

        {/* Cards — 3 balanced */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 22, alignItems: "start",
        }} className="pricing-grid">
          {PLANS.map((plan, i) => (
            <PlanCard key={plan.id} plan={plan} index={i} />
          ))}
        </div>

        {/* Bottom trust bar */}
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

/* ═══════════════════════════════════════════════════════════════
   4. COURSE STRUCTURE / ROADMAP
═══════════════════════════════════════════════════════════════ */
const PHASES = [
  {
    label: "Foundation", color: D.sage, soft: D.sageSo, border: `${D.sage}30`,
    weeks: "Week 1–2",
    modules: [
      "Public Policy Concepts, Power & Participation",
      "Policy Processes, Institutions & Global Governance",
      "Tools, Trade-offs, and Health Policy Challenges",
    ],
  },
  {
    label: "Core", color: D.gold, soft: D.goldSo, border: `${D.gold}30`,
    weeks: "Week 3–5",
    modules: [
      "Data, Evidence, and Exclusion in Policymaking",
      "AI, Digital Governance, and Crisis Response",
      "Machine Learning for Social Problems — Responsibly",
    ],
  },
  {
    label: "Applied", color: D.lav, soft: D.lavSo, border: `${D.lav}30`,
    weeks: "Week 6–7",
    modules: [
      "Citizen Engagement, Advocacy & Communication Skills",
      "Ground-Level Research: Ethnography & Community Realities",
    ],
  },
  {
    label: "Capstone", color: D.rose, soft: D.roseSo, border: `${D.rose}30`,
    weeks: "Week 8–9",
    modules: [
      "Writing for Influence: Policy Briefs & Scholarly Publishing",
      "Reflective, Critical Approaches to Future Policy Pathways",
      "Final Capstone Submission & Peer Review",
    ],
  },
];

const OUTCOMES = [
  "Understand key concepts in data science, statistics, and visualization",
  "Analyse and interpret public datasets and policy indicators",
  "Apply ML and AI tools to social problems responsibly",
  "Identify biases and ethical challenges in data-driven governance",
  "Communicate findings through data storytelling",
  "Build a policy data dashboard or applied capstone project",
  "Network with professionals in analytics and policy research",
];

function CurriculumSection() {
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

        {/* Timeline + panel */}
        <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "0 40px" }} className="curriculum-layout">

          {/* Left: phase tabs with vertical line */}
          <div style={{ position: "relative" }}>
            {/* Vertical line */}
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
                {/* Dot */}
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

          {/* Right: active module cards */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.28, ease }}
              >
                {/* Phase banner */}
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

        {/* Outcomes */}
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

/* ═══════════════════════════════════════════════════════════════
   5. RECOGNITION & BENEFITS
═══════════════════════════════════════════════════════════════ */
const RECOGNITION_CARDS = [
  {
    icon: "🥇",
    color: D.goldBr, soft: D.goldSo, border: `${D.gold}30`,
    glow: `0 0 40px rgba(201,151,58,0.12)`,
    title: "Gold Medal Award",
    subtitle: "Top 2 Best Papers",
    body: "Participants who demonstrate exceptional critical thinking and research depth are awarded the prestigious Gold Medal — a distinguished recognition on any CV.",
    bullets: ["Showcase work to domain experts", "Gain recognition for original ideas", "Distinguished achievement badge"],
  },
  {
    icon: "📗",
    color: D.sageBr, soft: D.sageSo, border: `${D.sage}28`,
    glow: `0 0 40px rgba(94,175,142,0.10)`,
    title: "ISBN Book Publication",
    subtitle: "Top Selected Papers",
    body: "Outstanding papers are published as official book chapters under IISPPR's own ISBN-registered publication — globally accessible and permanently citable.",
    bullets: ["Part of a citable, global publication", "Academic credibility boost", "Contribute to public policy discourse"],
  },
  {
    icon: "📜",
    color: D.lav, soft: D.lavSo, border: `${D.lav}28`,
    glow: `0 0 40px rgba(157,143,220,0.10)`,
    title: "Certificate of Completion",
    subtitle: "All Graduates",
    body: "Every participant who completes the program and assessments receives an official IISPPR Certificate of Completion, recognized by partner organizations.",
    bullets: ["Official IISPPR-issued certificate", "Demonstrates critical policy skills", "Lifetime access to alumni network"],
  },
];

function RecognitionSection() {
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

/* ═══════════════════════════════════════════════════════════════
   6. FINAL CTA
═══════════════════════════════════════════════════════════════ */
function FinalCTA() {
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
          {/* Decorative quote */}
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

/* ═══════════════════════════════════════════════════════════════
   7. FAQ SECTION
═══════════════════════════════════════════════════════════════ */
const FAQS = [
  {
    q: "Who is this program designed for?",
    a: "This program is tailored for university students, recent graduates, and early-career professionals interested in public policy, data science, and governance. Whether you are aiming for a career in think tanks, public administration, or policy consulting, this provides the foundational and applied skills needed."
  },
  {
    q: "Are there any prerequisites?",
    a: "No prior experience in coding or advanced statistics is required. We start from the foundational concepts of public policy and gradually introduce data science and AI applications in an accessible, applied manner."
  },
  {
    q: "How does the ISBN Book Publication work?",
    a: "Participants in the Alumni/Pro track (or selected top papers from other tracks) will have their final capstone policy brief peer-reviewed. Accepted briefs are compiled, edited, and published as chapters in an official IISPPR book with a registered ISBN, providing you with a permanent, citable academic publication."
  },
  {
    q: "Is the program synchronous or asynchronous?",
    a: "The program features 18 expert lectures delivered online. While we encourage live participation to interact during Q&A sessions, all lectures are recorded and made available so you can learn at your own pace throughout the 60-day period."
  },
  {
    q: "Will I receive a certificate?",
    a: "Yes, every participant who completes the modules and submits the final capstone project will receive a verifiable Certificate of Completion from IISPPR, enhancing your CV and LinkedIn profile."
  }
];

function FAQSection() {
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

/* ═══════════════════════════════════════════════════════════════
   ROOT
═══════════════════════════════════════════════════════════════ */
export default function App() {
  return (
    <div style={{ background: D.bg, minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,100..900;1,100..900&display=swap');
        @import url('https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@400,500,600,700,800,900&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #09090b; }

        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #09090b; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 4px; }

        a { cursor: pointer; }
        button { cursor: pointer; font-family: inherit; }

        /* Responsive breakpoints */
        @media (max-width: 900px) {
          .hero-grid      { grid-template-columns: 1fr !important; gap: 3rem 0 !important; }
          .pricing-grid   { grid-template-columns: 1fr !important; }
          .curriculum-layout { grid-template-columns: 1fr !important; }
          .recognition-grid  { grid-template-columns: 1fr !important; }
          .outcomes-grid     { grid-template-columns: 1fr !important; }
          
          /* Navbar mobile toggles */
          .desktop-nav-links, .desktop-nav-cta { display: none !important; }
          .mobile-nav-toggle { display: flex !important; }
          .navbar-container { width: 100% !important; border-radius: 16px !important; }
        }
        @media (max-width: 640px) {
          .pricing-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <Navbar />
      <Hero />
      <PricingSection />
      <CurriculumSection />
      <RecognitionSection />
      <FAQSection />
      <FinalCTA />
    </div>
  );
}