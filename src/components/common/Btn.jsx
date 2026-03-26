import React from 'react';
import { T } from '../../theme/tokens';

export const Btn = ({ children, variant = "primary", onClick, style = {}, full = false, sm = false, disabled = false }) => {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: T.r,
    fontFamily: T.font,
    fontWeight: 700,
    cursor: disabled ? "not-allowed" : "pointer",
    border: "none",
    transition: "all 0.22s ease",
    padding: sm ? "8px 16px" : "14px 28px",
    fontSize: sm ? 12 : 14,
    width: full ? "100%" : "auto",
    opacity: disabled ? 0.5 : 1,
    ...style
  };
  const v = {
    primary: { background: T.green, color: "#000", boxShadow: "0 0 24px rgba(0,200,83,0.2)" },
    secondary: { background: T.glass, color: T.white, border: `1px solid ${T.border}`, backdropFilter: "blur(10px)" },
    ghost: { background: "transparent", color: T.white, border: `1px solid ${T.border}` },
    purple: { background: T.purple, color: "#fff", boxShadow: "0 0 24px rgba(124,77,255,0.2)" },
    danger: { background: "rgba(255,82,82,0.1)", color: T.red, border: `1px solid rgba(255,82,82,0.2)` },
    success: { background: "rgba(0,200,83,0.1)", color: T.green, border: `1px solid rgba(0,200,83,0.2)` },
    gold: { background: "rgba(255,215,64,0.12)", color: T.gold, border: `1px solid rgba(255,215,64,0.25)` },
  };
  return (
    <button onClick={disabled ? undefined : onClick} className="hover-bright" style={{ ...base, ...v[variant] }}>{children}</button>
  );
};
