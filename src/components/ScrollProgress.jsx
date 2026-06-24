import React from "react";

export default function ScrollProgress({ progressDots, pages, scrollToPage }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: -40,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: 10,
        alignItems: "center",
        zIndex: 60,
      }}
    >
      {pages.map((_, i) => (
        <button
          key={i}
          onClick={() => scrollToPage && scrollToPage(i)}
          aria-label={`Go to page ${i + 1}`}
          style={{
            padding: 0,
            border: "none",
            borderRadius: 9999,
            width: progressDots[i] ? 20 : 6,
            height: 6,
            background: progressDots[i] ? "#C8A96E" : "rgba(255,255,255,0.25)",
            transition: "all 0.3s ease",
            cursor: "pointer",
            outline: "none",
          }}
          className="focus-visible:ring-1 focus-visible:ring-[#C8A96E]"
        />
      ))}
    </div>
  );
}
