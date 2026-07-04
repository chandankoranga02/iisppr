// components/PillarCard.jsx
// Memoized for performance (scalable to 1000-2000 users).
// Hover box-shadow uses the card's own accent color.
import { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import "./styles/PillarCard.css";

const cardVariants = {
  hidden:  { opacity: 0, y: 48, scale: 0.93 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.09,
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

function CheckIcon() {
  return (
    <svg width="8" height="6" viewBox="0 0 8 6" fill="none" aria-hidden="true">
      <path
        d="M1 3L3 5L7 1"
        stroke="#3ddb7a"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PillarCard({ card, index }) {
  const [hovered, setHovered] = useState(false);
  const { num, accent, icon: Icon, title, desc, bullets, img, dotActive } = card;
  const dots = [1, 2, 3, 4];

  return (
    <motion.article
      className="card"
      style={{ "--accent": accent }}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.12 }}
      variants={cardVariants}
      whileHover={{
        y: -14,
        // ← THE FIX: multi-layer colored box-shadow using the card's own accent
        boxShadow: `
          0 0 0 1.5px ${accent}55,
          0 8px 32px ${accent}45,
          0 20px 60px ${accent}28,
          0 32px 80px ${accent}15,
          inset 0 1px 0 rgba(255,255,255,0.10)
        `,
        borderColor: `${accent}50`,
        transition: { type: "spring", stiffness: 260, damping: 22 },
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={title}
    >
      {/* Hover top-bloom glow */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="card__glow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            style={{
              background: `radial-gradient(ellipse 85% 55% at 50% 0%, ${accent}32 0%, transparent 68%)`,
            }}
          />
        )}
      </AnimatePresence>

      {/* Top row */}
      <div className="card__top-row">
        <span className="card__num">{num}</span>
        <div className="card__dots" aria-hidden="true">
          {dots.map((d) => (
            <div key={d} className={`card__dot${d <= dotActive ? " card__dot--active" : ""}`} />
          ))}
        </div>
      </div>

      {/* Icon */}
      <div className="card__icon-wrap" aria-hidden="true">
        <Icon size={16} />
      </div>

      {/* Text */}
      <h3 className="card__title">{title}</h3>
      <p className="card__desc">{desc}</p>

      {/* Bullets */}
      <ul className="card__bullets" role="list">
        {bullets.map((text) => (
          <li key={text} className="card__bullet">
            <div className="card__bullet-dot" aria-hidden="true"><CheckIcon /></div>
            {text}
          </li>
        ))}
      </ul>

      {/* Image */}
      <div className="card__img-wrapper">
        <img
          src={img}
          alt={title}
          className="card__img"
          loading="lazy"
          onError={(e) => { e.currentTarget.style.display = "none"; }}
        />
      </div>

      {/* Footer */}
      <div className="card__footer">
        <span className="card__explore">Explore More</span>
        <motion.div
          className="card__arrow"
          animate={hovered ? { x: 3, scale: 1.15, backgroundColor: accent, color: "#020d07" }
                           : { x: 0, scale: 1,    backgroundColor: "transparent", color: accent }}
          transition={{ type: "spring", stiffness: 380, damping: 22 }}
          aria-hidden="true"
        >
          <ChevronRight size={13} />
        </motion.div>
      </div>
    </motion.article>
  );
}

// Memoize so cards don't re-render on unrelated state changes
export default memo(PillarCard);