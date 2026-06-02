import React from "react";
import IISPPRLogo from "./IISPPRLogo";

export default function FloatingLogo({
  logoScale,
  logoY,
  floatY,
  easedProgress,
  rotateX,
  rotateZ,
  logoOpacity,
  mounted
}) {
  if (!mounted) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: "50%",
        zIndex: 200,
        pointerEvents: "none",
        transform: `
          translate(-50%, calc(-50% + ${logoY}px + ${floatY * (1 - easedProgress)}px))
          scale(${logoScale})
          rotateX(${rotateX}deg)
          rotateZ(${rotateZ}deg)
        `,
        opacity: logoOpacity,
        willChange: "transform, opacity",
      }}
    >
      <IISPPRLogo size={1.5} color="#f5f0e8" compact={false} />
    </div>
  );
}
