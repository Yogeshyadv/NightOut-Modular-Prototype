import React from 'react';
import { T } from '../../theme/tokens';

export const KpiCard = ({ icon, label, value, change, changeUp = true, accentColor = T.green, onClick, style = {} }) => (
  <div className="glass hover-card" onClick={onClick} style={{ borderRadius: T.rlg, padding: 22, position: "relative", overflow: "hidden", cursor: onClick ? "pointer" : "default", ...style }}>
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: `linear-gradient(to right,${accentColor},transparent)` }} />
    <div style={{ fontSize: 22, marginBottom: 14 }}>{icon}</div>
    <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px", color: T.t3, marginBottom: 8 }}>{label}</div>
    <div style={{ fontFamily: T.font2, fontSize: 28, fontWeight: 800, marginBottom: 6 }}>{value}</div>
    {change && <div style={{ fontSize: 12, fontWeight: 600, color: changeUp ? T.green : T.red, display: "flex", alignItems: "center", gap: 4 }}>{changeUp ? "↑" : "↓"} {change}</div>}
  </div>
);
