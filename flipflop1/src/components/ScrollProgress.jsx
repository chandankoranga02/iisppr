import React from "react";

export default function ScrollProgress({ progressDots, pages }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: -40,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: 8,
        alignItems: "center",
        zIndex: 60,
        pointerEvents: "none",
      }}
    >
      {pages.map((_, i) => (
        <div
          key={i}
          style={{
            borderRadius: 9999,
            width: progressDots[i] ? 20 : 5,
            height: 5,
            background: progressDots[i] ? "#C8A96E" : "rgba(255,255,255,0.15)",
            transition: "all 0.3s ease",
          }}
        />
      ))}
    </div>
  );
}
