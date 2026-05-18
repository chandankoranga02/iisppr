import { D } from "../../styles/theme";

// Reusable pill tag component
export function Tag({ children, color = D.gold, bg = D.goldSo, border }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      padding: "4px 13px", borderRadius: 99,
      background: bg, border: `1px solid ${border || color + "44"}`,
      fontSize: 11, fontWeight: 700, color,
      letterSpacing: "0.65px", textTransform: "uppercase",
      fontFamily: D.sans,
    }}>{children}</span>
  );
}
