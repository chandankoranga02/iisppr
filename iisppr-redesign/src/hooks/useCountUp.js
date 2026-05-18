import { useState, useEffect } from "react";

// Hook to animate a number counting up
export function useCountUp(target, duration = 1800, active = true) {
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
