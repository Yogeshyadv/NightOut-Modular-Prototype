import React, { useState } from 'react';
import { T } from '../../../theme/tokens';
import { MobNav } from '../MobNav';
import { venues } from '../../../data/mockData';

export const HomeScreen = ({ navigate, setVenue }) => {
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "Stag", "Couples", "VIP", "Ladies Night", "🌈 Rainbow"];
  return (
    <div className="slide-in" style={{ height: "100%", position: "relative" }}>
      <div style={{ padding: "56px 20px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", background: `linear-gradient(to bottom, #0A0A0A 70%, transparent)`, position: "sticky", top: 0, zIndex: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: T.glass, border: `1px solid ${T.border2}`, borderRadius: 30, padding: "8px 16px", fontSize: 14, fontWeight: 600, backdropFilter: "blur(20px)", cursor: "pointer" }}>
          <div className="blink" style={{ width: 8, height: 8, background: T.green, borderRadius: "50%", boxShadow: `0 0 8px ${T.green}` }} />Jaipur ▾
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {["🔍", "🔔"].map((ic, i) => (
            <div key={i} onClick={i === 0 ? () => navigate("search") : undefined} style={{ width: 40, height: 40, background: T.glass, border: `1px solid ${T.border}`, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative", backdropFilter: "blur(20px)", transition: "border-color 0.2s" }} onMouseEnter={e => e.currentTarget.style.borderColor = T.border2} onMouseLeave={e => e.currentTarget.style.borderColor = T.border}>
              {ic}
              {i === 1 && <div style={{ position: "absolute", top: -2, right: -2, width: 9, height: 9, background: T.red, borderRadius: "50%", border: `2px solid #0A0A0A`, boxShadow: `0 0 6px ${T.red}` }} />}
            </div>
          ))}
        </div>
      </div>
      <div className="mscroll" style={{ paddingBottom: 90 }}>
        <div style={{ padding: "0 20px 18px" }}>
          <div style={{ fontSize: 12, color: T.green, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Good Evening</div>
          <div style={{ fontFamily: T.font2, fontSize: 24, fontWeight: 800, letterSpacing: "-0.5px" }}>Tonight in Jaipur</div>
          <div style={{ fontSize: 13, color: T.t2, marginTop: 4 }}>{venues.filter(v => v.status === "Active").length} venues open · 3 events tonight</div>
        </div>
        {/* Featured strip */}
        <div className="hscroll" style={{ display: "flex", gap: 14, padding: "0 20px", marginBottom: 22 }}>
          {venues.filter(v => v.featured).map(v => (
            <div key={v.id} className="hover-scale" style={{ minWidth: 210, height: 160, borderRadius: 20, position: "relative", overflow: "hidden", cursor: "pointer", flexShrink: 0 }} onClick={() => { setVenue(v); navigate("venue"); }}>
              <div style={{ position: "absolute", inset: 0, background: v.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3.5rem" }}>{v.emoji}</div>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,0.85) 0%,transparent 60%)" }} />
              <div style={{ position: "absolute", bottom: 12, left: 14, right: 14 }}>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{v.name}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 10, background: T.greenGlow, border: `1px solid ${T.green}`, color: T.green }}>Tonight Live</span>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.7)" }}>⭐ {v.rating}</span>
                </div>
                <div style={{ marginTop: 6, display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ flex: 1, height: 3, background: "rgba(255,255,255,0.15)", borderRadius: 2 }}>
                    <div style={{ width: `${v.crowdLevel}%`, height: "100%", background: v.crowdColor, borderRadius: 2 }} />
                  </div>
                  <span style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", whiteSpace: "nowrap" }}>{v.crowdLabel}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Filters */}
        <div className="hscroll" style={{ display: "flex", gap: 8, padding: "0 20px", marginBottom: 18 }}>
          {filters.map(f => (
            <div key={f} onClick={() => setActiveFilter(f)} style={{ padding: "7px 16px", borderRadius: 20, fontSize: 12, fontWeight: 600, border: `1px solid ${activeFilter === f ? T.green : T.border}`, background: activeFilter === f ? T.greenGlow : T.glass, color: activeFilter === f ? T.green : T.t2, cursor: "pointer", whiteSpace: "nowrap", backdropFilter: "blur(10px)", transition: "all 0.2s" }}>{f}</div>
          ))}
        </div>
        {/* Venue cards */}
        <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 16 }}>
          {venues.filter(v => v.status === "Active").map(v => (
            <div key={v.id} className="glass hover-card" style={{ borderRadius: T.rlg, overflow: "hidden", cursor: "pointer" }} onClick={() => { setVenue(v); navigate("venue"); }}>
              <div style={{ height: 150, background: v.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "4rem", position: "relative" }}>
                {v.emoji}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,transparent 30%,rgba(0,0,0,0.6))" }} />
                <span style={{ position: "absolute", top: 10, right: 10, fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 10, background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.15)" }}>{v.distance}</span>
                {v.badges.includes("Rainbow") && <span style={{ position: "absolute", top: 10, left: 10, fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 10, background: T.purpleGlow, border: `1px solid ${T.purple2}`, color: T.purple2 }}>🌈</span>}
              </div>
              <div style={{ padding: "14px 16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, fontFamily: T.font2 }}>{v.name}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 12, fontWeight: 700, color: T.gold }}>⭐ {v.rating} <span style={{ color: T.t3, fontWeight: 400, fontSize: 11 }}>({v.reviews})</span></div>
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
                  {v.genre.map(g => <span key={g} style={{ fontSize: 10, padding: "3px 9px", borderRadius: 8, background: T.glass2, color: T.t2, fontWeight: 500, border: `1px solid ${T.border}` }}>{g}</span>)}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: 12, color: T.t2 }}>Stag <strong style={{ color: T.green, fontSize: 15, fontWeight: 700 }}>₹{v.stagPrice.toLocaleString()}</strong></div>
                  <button onClick={e => { e.stopPropagation(); setVenue(v); navigate("booking"); }} style={{ padding: "8px 18px", background: T.green, color: "#000", border: "none", borderRadius: T.rsm, fontFamily: T.font, fontSize: 12, fontWeight: 700, cursor: "pointer", boxShadow: "0 0 14px rgba(0,200,83,0.3)" }}>Book Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ height: 20 }} />
      </div>
      <MobNav active="home" navigate={navigate} />
    </div>
  );
};
