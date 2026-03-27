import React from 'react';
import { T } from '../../theme/tokens';

export const TopNav = ({ role, setRole }) => (
  <div className="p-shrink" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 32px", background: "rgba(10,10,10,0.9)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${T.border}` }}>
    <div style={{ fontFamily: T.font2, fontSize: "clamp(18px, 4vw, 22px)", fontWeight: 800, color: T.green, letterSpacing: "-0.5px" }}>
      Night<span style={{ color: T.white }}>Out</span>
      <span className="hide-mobile" style={{ fontSize: 10, fontWeight: 600, color: T.t3, marginLeft: 10, letterSpacing: 2, textTransform: "uppercase" }}>Platform</span>
    </div>
    <div className="hscroll" style={{ display: "flex", gap: 10, background: "rgba(255,255,255,0.04)", borderRadius: 40, padding: "5px 10px", border: `1px solid ${T.border}`, margin: '0 10px' }}>
      {[[ "app", "📱 App" ], [ "vendor", "🏪 Vendor" ], [ "admin", "⚡ Admin" ]].map(([ id, label ]) => (
        <button key={id} onClick={() => setRole(id)} style={{ padding: "8px 16px", borderRadius: 30, fontSize: 11, fontWeight: 700, color: role === id ? "#000" : T.t3, background: role === id ? T.green : "transparent", border: "none", cursor: "pointer", transition: "all 0.22s", whiteSpace: 'nowrap' }}>{label}</button>
      ))}
    </div>
    <div className="desktop-only" style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div className="blink" style={{ width: 7, height: 7, background: T.green, borderRadius: "50%", boxShadow: `0 0 8px ${T.green}` }} />
      <span style={{ fontSize: 12, color: T.t3 }}>Live Demo</span>
    </div>
  </div>
);
