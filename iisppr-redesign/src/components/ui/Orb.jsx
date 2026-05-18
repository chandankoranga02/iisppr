// Background glowing orb component
export function Orb({ x, y, r = 400, color, opacity = 1 }) {
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
