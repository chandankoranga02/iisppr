import React, { useEffect, useRef } from 'react';
// import '../styles/Testimonials.css';

const testimonials = [
  {
    id: 1,
    name: "Jessica Parker",
    role: "VP of Engineering at CloudNet",
    avatar: "https://i.pravatar.cc/150?img=68",
    text: "The deployment process is flawless. We reduced our build times by 40% in the first week. The analytics dashboard is incredibly intuitive and perfectly fits our workflow."
  },
  {
    id: 2,
    name: "Omar Fadel",
    role: "Marketing Director at Nexus",
    avatar: "https://i.pravatar.cc/150?img=59",
    text: "Our conversion rates doubled after implementing this solution. The out-of-the-box SEO optimization and clean user interface made it effortless for our team to launch campaigns quickly."
  },
  {
    id: 3,
    name: "Lily Wei",
    role: "Head of Customer Success at Horizon",
    avatar: "https://i.pravatar.cc/150?img=31",
    text: "Supporting our clients has never been easier. The integrated ticketing system and lightning-fast search capabilities give us exactly what we need to resolve issues in record time."
  },
  {
    id: 4,
    name: "Thomas Muller",
    role: "Lead Developer at FinTech Global",
    avatar: "https://i.pravatar.cc/150?img=12",
    text: "A developer's dream. The API documentation is crystal clear, and the seamless webhooks integration meant we were fully set up in under an hour. Outstanding engineering."
  },
  {
    id: 5,
    name: "Sophia Rossi",
    role: "Art Director at Studio Nova",
    avatar: "https://i.pravatar.cc/150?img=24",
    text: "Visually breathtaking and structurally sound. The design tokens make maintaining brand consistency across thousands of pages a complete breeze. I highly recommend it."
  }
];
const styles = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

:root {
  --bg-color: #000000;
  --cyan-glow: #00e5ff;
  --lime-glow: #c8ff6b;
  --card-bg: rgba(255, 255, 255, 0.03);
  --text-primary: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.7);
  --star-color: #ffcc00;
  --border-color: rgba(255, 255, 255, 0.05);
  --card-gap: 28px;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', sans-serif;
  background-color: var(--bg-color);
  color: var(--text-primary);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.testimonial-section {
  position: relative;
  padding: clamp(60px, 12vh, 140px) 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}

.glow {
  position: absolute;
  width: clamp(300px, 50vw, 600px);
  height: clamp(300px, 50vw, 600px);
  border-radius: 50%;
  filter: blur(clamp(80px, 12vw, 150px));
  z-index: 0;
  opacity: 0.15;
  pointer-events: none;
}

.glow-blue {
  background: var(--cyan-glow);
  top: 10%;
  left: -10vw;
}

.glow-amber {
  background: #ffb347;
  bottom: 10%;
  right: -10vw;
}

.testimonial-header {
  text-align: center;
  position: relative;
  z-index: 1;
  margin-bottom: clamp(40px, 8vh, 100px);
  padding: 0 clamp(16px, 5vw, 24px);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: clamp(6px, 1.5vw, 8px) clamp(12px, 3vw, 16px);
  background: rgba(255,255,255,.05);
  border: 1px solid rgba(255,255,255,.1);
  border-radius: 999px;
  font-size: clamp(.75rem,2vw,.9rem);
  color: var(--text-primary);
  margin-bottom: clamp(16px,3vw,24px);
  font-weight: 500;
  backdrop-filter: blur(8px);
}

.gradient-heading {
  font-size: clamp(1.8rem,7vw,4rem);
  font-weight: 700;
  letter-spacing: -.02em;
  line-height: 1.2;
  margin-bottom: clamp(16px,3vw,24px);
  background: linear-gradient(
    135deg,
    var(--cyan-glow),
    var(--lime-glow)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  max-width: 90vw;
}

.subtitle {
  font-size: clamp(.95rem,3.5vw,1.25rem);
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.5;
}

.scroller-wrapper {
  position: relative;
  z-index: 1;
  width: 100%;
  mask-image: linear-gradient(
    to right,
    transparent,
    black 5%,
    black 95%,
    transparent
  );
}

.scroller {
  overflow: hidden;
  padding: clamp(16px,3vw,24px) 0;
}

.scroller-inner {
  display: flex;
  gap: var(--card-gap);
  width: max-content;
  animation: scroll 45s linear infinite;
}

@keyframes scroll {
  to {
    transform: translate(calc(-50% - (var(--card-gap) / 2)));
  }
}

.card {
  width: 440px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 24px;
  padding: clamp(20px,4vw,32px);
  backdrop-filter: blur(16px);
  transition: all .4s ease;
  display: flex;
  flex-direction: column;
  gap: clamp(16px,3vw,24px);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 16px;
}

.avatar {
  width: clamp(48px,8vw,56px);
  height: clamp(48px,8vw,56px);
  border-radius: 50%;
  object-fit: cover;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.name {
  font-size: clamp(1rem,2.5vw,1.1rem);
  font-weight: 600;
}

.role {
  font-size: clamp(.8rem,2vw,.9rem);
  color: var(--text-secondary);
}

.stars {
  color: var(--star-color);
  font-size: clamp(1.1rem,2.5vw,1.25rem);
  letter-spacing: 2px;
}

.testimonial-text {
  font-size: clamp(.95rem,2.5vw,1.05rem);
  line-height: 1.6;
  color: var(--text-secondary);
}

@media (hover: hover) and (pointer: fine) {
  .card:hover {
    transform: translateY(-8px);
    border-color: rgba(255,255,255,.15);
    box-shadow:
      0 16px 40px rgba(0,0,0,.4),
      0 0 30px rgba(0,229,255,.08);
  }

  .scroller-inner:hover {
    animation-play-state: paused;
  }
}

@media (max-width:768px) {
  :root {
    --card-gap: 20px;
  }

  .card {
    width: 340px;
  }
}

@media (max-width:480px) {
  :root {
    --card-gap: 16px;
  }

  .card {
    width: 85vw;
    max-width: 340px;
  }
}

@media (max-width:375px) {
  .card {
    width: 88vw;
  }
}
`;
export default function Testimonials() {
  const scrollerInnerRef = useRef(null);

  useEffect(() => {
    const scrollerInner = scrollerInnerRef.current;
    if (!scrollerInner) return;

    // Clone all the cards inside the scroller to create a seamless infinite loop
    const scrollerContent = Array.from(scrollerInner.children);

    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      // Add an attribute just to denote it's a clone (optional)
      duplicatedItem.setAttribute('aria-hidden', 'true');
      scrollerInner.appendChild(duplicatedItem);
    });

    // Cleanup function in case of React StrictMode double invocation
    return () => {
      while (scrollerInner.children.length > scrollerContent.length) {
        scrollerInner.removeChild(scrollerInner.lastChild);
      }
    };
  }, []);

  return (
    <>
    <style>{styles}</style>
        <section className="testimonial-section">
        <div className="glow glow-blue"></div>
        <div className="glow glow-amber"></div>

        <div className="testimonial-header">
            <div className="badge">
            <svg className="globe-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
            Trusted by 10,000+ Teams
            </div>
            <h2 className="gradient-heading">What our users are saying</h2>
            <p className="subtitle">Real feedback from people who use our product every day.</p>
        </div>

        <div className="scroller-wrapper">
            <div className="scroller" id="scroller">
            <div className="scroller-inner" ref={scrollerInnerRef}>
                {testimonials.map((testimonial) => (
                <div className="card" key={testimonial.id}>
                    <div className="card-header">
                    <img src={testimonial.avatar} alt={`${testimonial.name} Avatar`} className="avatar" />
                    <div className="user-info">
                        <h3 className="name">{testimonial.name}</h3>
                        <p className="role">{testimonial.role}</p>
                    </div>
                    </div>
                    <div className="stars">
                    ★★★★★
                    </div>
                    <p className="testimonial-text">
                    "{testimonial.text}"
                    </p>
                </div>
                ))}
            </div>
            </div>
        </div>
        </section>
    </>
  );
}