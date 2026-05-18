// Background grid pattern component
export function GridBg({ opacity = 0.025 }) {
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
