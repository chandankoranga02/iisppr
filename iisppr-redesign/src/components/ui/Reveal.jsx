import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ease } from "../../styles/theme";

// Scroll reveal animation wrapper
export function Reveal({ children, delay = 0, y = 28, once = true, style = {}, className = "" }) {
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
