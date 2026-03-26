import React from 'react';
import { T } from '../../theme/tokens';

export const MobNav = ({ active, navigate }) => {
  const items = [{ id: "home", icon: "🏠", label: "Home" }, { id: "search", icon: "🔍", label: "Explore" }, { id: "bookings", icon: "📅", label: "Bookings" }, { id: "favorites", icon: "❤️", label: "Saved" }, { id: "profile", icon: "👤", label: "Profile" }];
  return (
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 84, background: "rgba(6,6,6,0.97)", backdropFilter: "blur(30px)", borderTop: `1px solid ${T.border}`, display: "flex", alignItems: "flex-start", justifyContent: "space-around", padding: "12px 0 0", zIndex: 50 }}>
      {items.map(item => (
        <div key={item.id} onClick={() => navigate(item.id)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, cursor: "pointer", padding: "4px 12px", transition: "all 0.2s" }}>
          <div style={{ fontSize: 18, filter: active === item.id ? `drop-shadow(0 0 6px ${T.green})` : "none", transition: "filter 0.2s" }}>{item.icon}</div>
          <span style={{ fontSize: 9, fontWeight: 600, color: active === item.id ? T.green : T.t4, transition: "color 0.2s" }}>{item.label}</span>
          {active === item.id && <div style={{ width: 4, height: 4, background: T.green, borderRadius: "50%", boxShadow: `0 0 6px ${T.green}` }} />}
        </div>
      ))}
    </div>
  );
};
