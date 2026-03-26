import React from 'react';
import { T } from '../../theme/tokens';

// Section label for mobile
export const MobSectionHeader = ({ title, sub, action, onAction }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", padding: "0 20px", marginBottom: 16 }}>
    <div>
      <div style={{ fontSize: 17, fontWeight: 700, fontFamily: T.font2 }}>{title}</div>
      {sub && <div style={{ fontSize: 12, color: T.t2, marginTop: 2 }}>{sub}</div>}
    </div>
    {action && <span style={{ fontSize: 12, color: T.green, fontWeight: 600, cursor: "pointer" }} onClick={onAction}>{action}</span>}
  </div>
);

// Venue Card (mobile)
export const VenueCard = ({ venue, onBook, onDetail }) => (
  <div className="glass-card hover-lift" style={{ borderRadius: T.rlg, overflow: "hidden", cursor: "pointer", marginBottom: 16 }} onClick={onDetail}>
    <div style={{ height: 150, background: venue.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "4rem", position: "relative" }}>
      {venue.emoji}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,transparent 30%,rgba(0,0,0,0.6))" }} />
      <span style={{ position: "absolute", top: 10, right: 10, fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 10, background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.15)" }}>{venue.distance}</span>
    </div>
    <div style={{ padding: "14px 16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
        <div style={{ fontSize: 16, fontWeight: 700, fontFamily: T.font2 }}>{venue.name}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 12, fontWeight: 700, color: T.gold }}>⭐ {venue.rating} <span style={{ color: T.t3, fontWeight: 400 }}>({venue.reviews})</span></div>
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
        {venue.genre.map(g => <span key={g} style={{ fontSize: 10, padding: "3px 9px", borderRadius: 8, background: T.card2, color: T.t2, fontWeight: 500, border: `1px solid ${T.border}` }}>{g}</span>)}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 12, color: T.t2 }}>Stag <strong style={{ color: T.green, fontSize: 15, fontWeight: 700 }}>₹{venue.stagPrice.toLocaleString()}</strong></div>
        <button onClick={e => { e.stopPropagation(); onBook(); }} style={{ padding: "8px 18px", background: T.green, color: "#000", border: "none", borderRadius: T.rsm, fontFamily: T.font, fontSize: 12, fontWeight: 700, cursor: "pointer", boxShadow: "0 0 14px rgba(0,200,83,0.3)", transition: "all 0.2s" }}>Book Now</button>
      </div>
    </div>
  </div>
);

// Featured Card (horizontal scroll)
export const FeatCard = ({ venue, onClick }) => (
  <div className="hover-scale" style={{ minWidth: 210, height: 160, borderRadius: 20, position: "relative", overflow: "hidden", cursor: "pointer", flexShrink: 0, border: "1px solid transparent", transition: "border-color 0.2s" }}
    onClick={onClick}
    onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(0,200,83,0.3)"}
    onMouseLeave={e => e.currentTarget.style.borderColor = "transparent"}
  >
    <div style={{ position: "absolute", inset: 0, background: venue.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3.5rem" }}>{venue.emoji}</div>
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,0.85) 0%,transparent 60%)" }} />
    <div style={{ position: "absolute", bottom: 12, left: 14, right: 14 }}>
      <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{venue.name}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 10, background: T.greenGlow, border: `1px solid ${T.green}`, color: T.green }}>Tonight Live</span>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.7)" }}>⭐ {venue.rating}</span>
      </div>
      <div style={{ marginTop: 6, display: "flex", alignItems: "center", gap: 6 }}>
        <div style={{ flex: 1, height: 3, background: "rgba(255,255,255,0.15)", borderRadius: 2 }}>
          <div style={{ width: `${venue.crowdLevel}%`, height: "100%", background: venue.crowdColor, borderRadius: 2 }} />
        </div>
        <span style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", whiteSpace: "nowrap" }}>{venue.crowdLabel}</span>
      </div>
    </div>
  </div>
);
