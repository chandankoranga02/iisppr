// pages/HomePage.jsx — IISPPR Academy · Creative Home Page
import { motion } from "framer-motion";
import {
  ArrowRight, Star, Users, Award,
  Shield, TrendingUp, Lightbulb,
  GraduationCap, Brain, BarChart3,
  Globe2, Puzzle, MessageSquare, Trophy,
} from "lucide-react";

import './courseDifferent/styles/global.css';
import './courseDifferent/styles/LandingSections.css';
import './courseDifferent/styles/CourseDifferentPage.css';
import critical from "../assets/critical.png";
import data from '../assets/data.png';
import global from '../assets/global.png';
import problem from '../assets/problem.png';
import communication from '../assets/communication.png';
import real from '../assets/real.png';

/* ─── Image assets ─── */
import brainImg    from '../assets/brain.png';
import computerImg from '../assets/computer.png';
import earthImg    from '../assets/earth.png';
import masterImg   from '../assets/master.png';

/* ─── Framer Motion helpers ─── */
const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: d, duration: 0.6, ease: "easeOut" },
  }),
};
const fadeIn = {
  hidden:  { opacity: 0 },
  visible: (d = 0) => ({
    opacity: 1,
    transition: { delay: d, duration: 0.5 },
  }),
};

/* ─── Data ─── */
const STATS = [
  { num: "2,000+", label: "Students Enrolled",  icon: Users,      accent: "#e8a020" },
  { num: "96%",    label: "Completion Rate",     icon: TrendingUp, accent: "#f5c518" },
  { num: "12+",    label: "Expert Instructors",  icon: Award,      accent: "#00d4c8" },
  { num: "4.9 ★", label: "Average Rating",      icon: Star,       accent: "#bf7aff" },
];

const AUDIENCE = [
  {
    icon: GraduationCap,
    color: "#e8a020",
    bg: "rgba(232,160,32,0.1)",
    title: "Students & Graduates",
    desc: "Build skills that go far beyond the syllabus and stand out in competitive job markets.",
  },
  {
    icon: TrendingUp,
    color: "#f5c518",
    bg: "rgba(245,197,24,0.1)",
    title: "Working Professionals",
    desc: "Upskill at your own pace and switch into data-driven, high-growth career paths.",
  },
  {
    icon: Lightbulb,
    color: "#00d4c8",
    bg: "rgba(0,212,200,0.1)",
    title: "Entrepreneurs & Founders",
    desc: "Learn to make smarter decisions using data insights and analytical thinking.",
  },
];

const MODULES = [
  {
    num: "01",
    week: "Module 01",
    title: "Foundations of Critical Thinking",
    desc: "Learn to break down problems, evaluate arguments, and think with clarity.",
    topics: ["Logic & Fallacies", "Mental Models", "Bayesian Thinking"],
    accent: "#e8a020",
    icon: Brain,
    image: critical,
  },
  {
    num: "02",
    week: "Module 02",
    title: "Data Literacy & Interpretation",
    desc: "Make sense of data and turn numbers into real-world insights.",
    topics: ["Statistics Basics", "Visual Data", "Bias Detection"],
    accent: "#f5c518",
    icon: BarChart3,
    image: data,
  },
  {
    num: "03",
    week: "Module 03",
    title: "Global Trends & Local Impact",
    desc: "Explore global shifts and understand their real impact on communities.",
    topics: ["Economics", "Technology Trends", "Policy Analysis"],
    accent: "#00d4c8",
    icon: Globe2,
    image: global,
  },
  {
    num: "04",
    week: "Module 04",
    title: "Problem Solving Frameworks",
    desc: "Use proven frameworks to solve complex problems with confidence.",
    topics: ["First Principles", "MECE", "Design Thinking"],
    accent: "#bf7aff",
    icon: Puzzle,
    image: problem,
  },
  {
    num: "05",
    week: "Module 05",
    title: "Communication & Storytelling",
    desc: "Communicate ideas clearly and tell stories that inspire action.",
    topics: ["Data Storytelling", "Presentation Skills", "Executive Communication"],
    accent: "#ff6b4a",
    icon: MessageSquare,
    image: communication,
  },
  {
    num: "06",
    week: "Module 06",
    title: "Capstone & Real-World Project",
    desc: "Apply everything you've learned in a project that builds your portfolio.",
    topics: ["Industry Project", "Peer Review", "Expert Feedback"],
    accent: "#3ddc84",
    icon: Trophy,
    image: real,
  },
];

/* ─── Styles ─── */
const PageStyles = () => (
  <style>{`
    /* Section backgrounds */
    .stats-section,
    .audience-section,
    .curriculum-section,
    .final-cta-section {
      background: #000 !important;
    }

    /* ── Curriculum grid ── */
    .curriculum-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }
    @media (max-width: 900px) {
      .curriculum-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 580px) {
      .curriculum-grid { grid-template-columns: 1fr; }
    }

    /* ── Flip card shell ── */
    .flip-card {
      perspective: 1400px;
      height: 420px;
      cursor: pointer;
    }

    .flip-card-inner {
      position: relative;
      width: 100%;
      height: 100%;
      transition: transform 0.65s cubic-bezier(0.4, 0.2, 0.2, 1);
      transform-style: preserve-3d;
    }

    .flip-card:hover .flip-card-inner,
    .flip-card:focus-within .flip-card-inner {
      transform: rotateY(180deg);
    }

    /* ── Shared face rules ── */
    .flip-card-front,
    .flip-card-back {
      position: absolute;
      inset: 0;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      border-radius: 18px;
      overflow: hidden;
      box-sizing: border-box;
      border: 1px solid var(--c-border);
    }

    /* ══════════════════════════════
       FRONT FACE
       Layout (top→bottom):
         [image ~55%]
         [content area ~45%]
           row1: icon-box | module-label | number-badge
           row2: title
           row3: short desc
    ══════════════════════════════ */
    .flip-card-front {
      display: flex;
      flex-direction: column;
      background: #07070a;
    }

    /* Image — top 55% of card */
    .fcard__img {
      width: 100%;
      height: 55%;
      object-fit: cover;
      object-position: center;
      display: block;
      flex-shrink: 0;
      border-radius: 18px 18px 0 0;
      filter: brightness(0.85) saturate(1.15);
    }

    /* Content zone — bottom 45% */
    .fcard__body {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 14px 18px 18px;
      background:
        radial-gradient(circle at 0% 0%, var(--c-glow), transparent 70%),
        #07070a;
      position: relative;
    }

    /* Row 1: icon  |  module label + number */
    .fcard__meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }

    .fcard__left {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .fcard__icon-box {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      border: 1.5px solid var(--c-accent);
      background: rgba(255,255,255,0.03);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .fcard__module-label {
      font-size: 10.5px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--c-accent);
      line-height: 1.2;
    }

    /* Number badge — top-right */
    .fcard__num-badge {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      border: 1.5px solid var(--c-accent);
      background: rgba(255,255,255,0.03);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 15px;
      font-weight: 700;
      color: var(--c-accent);
      flex-shrink: 0;
    }

    /* Row 2: title */
    .fcard__title {
      font-size: 18px;
      font-weight: 800;
      color: #fff;
      line-height: 1.25;
      margin: 0;
    }

    /* Row 3: short description */
    .fcard__desc {
      font-size: 13px;
      color: #aaa;
      line-height: 1.55;
      margin: 0;
    }

    /* ══════════════════════════════
       BACK FACE — topics + full desc
    ══════════════════════════════ */
    .flip-card-back {
      transform: rotateY(180deg);
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 18px;
      padding: 32px 28px;
      background:
        radial-gradient(circle at 85% 100%, var(--c-glow), transparent 65%),
        #0c0c10;
    }

    .bcard__header {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .bcard__icon-box {
      width: 46px;
      height: 46px;
      border-radius: 12px;
      border: 1.5px solid var(--c-accent);
      background: rgba(255,255,255,0.03);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .bcard__label-group {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }

    .bcard__module-label {
      font-size: 10.5px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--c-accent);
    }

    .bcard__title {
      font-size: 16px;
      font-weight: 800;
      color: #fff;
      line-height: 1.25;
    }

    .bcard__divider {
      height: 1px;
      background: var(--c-border);
    }

    .bcard__desc {
      font-size: 13.5px;
      color: #c8c8c8;
      line-height: 1.6;
    }

    .bcard__topics {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .bcard__topic {
      font-size: 11.5px;
      font-weight: 600;
      padding: 5px 12px;
      border-radius: 999px;
      border: 1px solid var(--c-accent);
      color: var(--c-accent);
      background: rgba(255,255,255,0.04);
      letter-spacing: 0.02em;
    }

    .bcard__hint {
      font-size: 11px;
      color: #555;
      text-align: center;
      margin-top: auto;
      letter-spacing: 0.04em;
    }
  `}</style>
);

/* ════════════════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════════════════ */
export default function LandingSections() {
  return (
    <>
      <PageStyles />

      {/* ── STATS ─────────────────────────────────────── */}
      <section className="stats-section" id="stats" aria-label="Course statistics">
        <div className="stats-inner">
          <div className="stats-grid">
            {STATS.map(({ num, label, icon: Icon, accent }, i) => (
              <motion.div
                key={label}
                className="stat-card"
                style={{ "--accent-color": accent }}
                custom={i * 0.1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
              >
                <div className="stat-card__icon" style={{ background: `${accent}18`, border: `1px solid ${accent}33` }}>
                  <Icon size={22} color={accent} />
                </div>
                <div className="stat-card__num">{num}</div>
                <div className="stat-card__label">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO IS THIS FOR ───────────────────────────── */}
      <section className="audience-section" id="whyus" aria-label="Who is this for">
        <div className="audience-inner">
          <motion.div
            className="audience__left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
          >
            <span className="section-pill">Who Is This For?</span>
            <h2 className="section-title">Built for the <span>Next Generation</span> of Thinkers</h2>
            <p className="section-desc">
              Whether you're a student hungry for an edge, a professional seeking a career leap,
              or an entrepreneur who wants to make smarter decisions — this course was crafted for you.
            </p>
            <div className="audience__cards">
              {AUDIENCE.map(({ icon: Icon, color, bg, title, desc }, i) => (
                <motion.div
                  key={title}
                  className="audience-card"
                  custom={i * 0.1 + 0.2}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeUp}
                >
                  <div className="audience-card__icon" style={{ background: bg, border: `1px solid ${color}33` }}>
                    <Icon size={20} color={color} />
                  </div>
                  <div>
                    <div className="audience-card__title">{title}</div>
                    <div className="audience-card__desc">{desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="audience__right"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn}
            custom={0.3}
          >
            <div className="audience-photo-grid">
              <motion.div className="audience-photo-card audience-photo-card--wide"
                whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 250 }}>
                <img src={masterImg} alt="Expert instructor teaching" className="audience-photo-img" />
                <div className="audience-photo-overlay">
                  <span className="audience-photo-tag">🏆 IIT Alumni Crafted</span>
                  <p>Industry-first approach</p>
                </div>
              </motion.div>
              <motion.div className="audience-photo-card"
                whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 250 }}>
                <img src={brainImg} alt="Critical thinking brain" className="audience-photo-img" />
                <div className="audience-photo-overlay">
                  <span className="audience-photo-tag">🧠 Critical Thinking</span>
                  <p>6 core modules</p>
                </div>
              </motion.div>
              <motion.div className="audience-photo-card"
                whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 250 }}>
                <img src={computerImg} alt="Hands-on learning" className="audience-photo-img" />
                <div className="audience-photo-overlay">
                  <span className="audience-photo-tag">💻 Hands-on Projects</span>
                  <p>Real datasets</p>
                </div>
              </motion.div>
              <motion.div className="audience-photo-card audience-photo-card--wide"
                whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 250 }}>
                <img src={earthImg} alt="Global perspective" className="audience-photo-img" />
                <div className="audience-photo-overlay">
                  <span className="audience-photo-tag">🌍 Global Perspective</span>
                  <p>50+ case studies</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CURRICULUM ────────────────────────────────── */}
      <section className="curriculum-section" id="curriculum" aria-label="Course curriculum">
        <div className="curriculum-inner">
          <motion.div
            className="curriculum-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <span className="section-pill">The Curriculum</span>
            <h2 className="section-title" style={{ textAlign: "center" }}>
              6 Weeks. <span>Life-Changing</span> Skills.
            </h2>
            <p className="section-desc" style={{ textAlign: "center", margin: "14px auto 0", maxWidth: 520 }}>
              Every module is designed to challenge you, build on the last, and leave you with
              a tangible, portfolio-ready skill. <em>Hover a card to explore.</em>
            </p>
          </motion.div>

          <div className="curriculum-grid">
            {MODULES.map(({ num, week, title, desc, topics, accent, icon: Icon, image }, i) => (
              <motion.div
                key={week}
                className="flip-card"
                style={{
                  "--c-accent": accent,
                  "--c-glow":   `${accent}28`,
                  "--c-border": `${accent}45`,
                }}
                custom={i * 0.08}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={fadeUp}
                tabIndex={0}
                aria-label={`${week}: ${title}`}
              >
                <div className="flip-card-inner">

                  {/* ── FRONT ── */}
                  <div className="flip-card-front">
                    {/* Image — top portion */}
                    <img
                      src={image}
                      alt=""
                      aria-hidden="true"
                      className="fcard__img"
                    />

                    {/* Content zone */}
                    <div className="fcard__body">
                      {/* Row 1: icon + module label | number badge */}
                      <div className="fcard__meta">
                        <div className="fcard__left">
                          <div className="fcard__icon-box">
                            <Icon size={20} color={accent} />
                          </div>
                          <span className="fcard__module-label">{week}</span>
                        </div>
                        <div className="fcard__num-badge">{num}</div>
                      </div>

                      {/* Row 2: title */}
                      <p className="fcard__title">{title}</p>

                      {/* Row 3: short description */}
                      <p className="fcard__desc">{desc}</p>
                    </div>
                  </div>

                  {/* ── BACK ── */}
                  <div className="flip-card-back">
                    {/* Header: icon + module + title */}
                    <div className="bcard__header">
                      <div className="bcard__icon-box">
                        <Icon size={22} color={accent} />
                      </div>
                      <div className="bcard__label-group">
                        <span className="bcard__module-label">{week}</span>
                        <span className="bcard__title">{title}</span>
                      </div>
                    </div>

                    <div className="bcard__divider" />

                    {/* Full description */}
                    <p className="bcard__desc">{desc}</p>

                    {/* Topic pills */}
                    <div className="bcard__topics">
                      {topics.map((t) => (
                        <span key={t} className="bcard__topic">{t}</span>
                      ))}
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────── */}
      <section className="final-cta-section" aria-label="Enrol call to action">
        <motion.div
          className="final-cta-inner"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <h2 className="final-cta__title">
            Ready to Unlock Your <span>Thinking Potential?</span>
          </h2>
          <p className="final-cta__desc">
            Join thousands of learners who are already thinking differently, communicating better,
            and growing faster. Your transformation starts today.
          </p>
          <div className="final-cta__actions">
            <a href="https://iisppracademy.com/course" target="_blank" rel="noopener noreferrer" className="final-cta__btn">
              Start Learning Today
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
          <p className="final-cta__note">
            <Shield size={12} />
            No prerequisites · Self-paced · Certificate included
          </p>
        </motion.div>
      </section>
    </>
  );
}