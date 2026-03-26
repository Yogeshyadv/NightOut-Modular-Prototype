import React, { useState } from 'react';
import { T } from '../../../theme/tokens';

export const VenueDetailScreen = ({ venue, navigate }) => {
  const [faved, setFaved] = useState(false);
  if (!venue) return (
    <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: T.bg }}>
      <div style={{ textAlign: "center", padding: "60px 20px", color: T.t3 }}>
        <div style={{ fontSize: "3rem", marginBottom: 16 }}>🏠</div>
        <div style={{ fontSize: 16, fontWeight: 700, color: T.t2, marginBottom: 8 }}>No venue selected</div>
        <div style={{ fontSize: 13, lineHeight: 1.7 }}>Go back and pick a venue</div>
      </div>
    </div>
  );
  return (
    <div className="slide-in" style={{ height: "100%", position: "relative" }}>
      <div className="mscroll" style={{ paddingBottom: 100 }}>
        <div style={{ height: 280, background: venue.gradient, display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", fontSize: "6rem", position: "relative", overflow: "hidden", flexShrink: 0 }}>
          {venue.emoji}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,rgba(0,0,0,0.3) 0%,transparent 40%,rgba(10,10,10,1) 100%)" }} />
          <div onClick={() => navigate("home")} style={{ position: "absolute", top: 60, left: 18, width: 40, height: 40, background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", backdropFilter: "blur(10px)", zIndex: 10 }}>←</div>
          <div onClick={() => setFaved(f => !f)} style={{ position: "absolute", top: 60, right: 18, width: 40, height: 40, background: "rgba(0,0,0,0.5)", border: `1px solid ${faved ? T.red : "rgba(255,255,255,0.15)"}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", backdropFilter: "blur(10px)", fontSize: 18, color: faved ? T.red : T.white, zIndex: 10 }}>{faved ? "♥" : "♡"}</div>
        </div>
        <div style={{ padding: "0 20px 20px" }}>
          <div style={{ display: "flex", justifyItems: "center", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
            <div style={{ fontFamily: T.font2, fontSize: 22, fontWeight: 700, letterSpacing: "-0.5px" }}>{venue.name}</div>
            <div style={{ textAlign: "right" }}><div style={{ color: T.gold, fontWeight: 700, fontSize: 15 }}>⭐ {venue.rating}</div><div style={{ fontSize: 11, color: T.t3 }}>({venue.reviews})</div></div>
          </div>
          <div style={{ fontSize: 13, color: T.t2, marginBottom: 14 }}>📍 {venue.location} · {venue.distance}</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
            {venue.badges.map(b => <span key={b} style={{ padding: "5px 12px", borderRadius: 8, fontSize: 11, fontWeight: 600, background: T.greenGlow, border: "1px solid rgba(0,200,83,0.3)", color: T.green }}>{b}</span>)}
          </div>
          <div className="glass" style={{ borderRadius: T.r, padding: 18, marginBottom: 14 }}>
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: T.green, marginBottom: 14 }}>🏷️ Tonight's Pricing</div>
            {[["Stag Entry", venue.stagPrice], ["Couple Entry", venue.couplePrice], ["Female Entry", venue.femalePrice]].map(([t, p]) => (
              <div key={t} style={{ display: "flex", justifyItems: "center", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${T.border}` }}>
                <span style={{ fontSize: 13, color: T.t2, fontWeight: 500 }}>{t}</span>
                <span style={{ fontSize: 16, fontWeight: 700 }}>₹{p.toLocaleString()}</span>
              </div>
            ))}
            <div style={{ fontSize: 11, color: T.t3, marginTop: 12, paddingTop: 12, borderTop: `1px solid ${T.border}` }}>🥃 {venue.includes}</div>
          </div>
          <div className="glass" style={{ borderRadius: T.r, padding: 18, marginBottom: 14 }}>
            {[["👗", "Dress Code", venue.dressCode], ["🎵", "Music Tonight", `${venue.djTonight} · Live`], ["🕐", "Hours", venue.openTime]].map(([ic, lb, val]) => (
              <div key={lb} style={{ display: "flex", gap: 10, padding: "10px 0", borderBottom: `1px solid ${T.border}` }}>
                <span style={{ fontSize: 14, color: T.green, width: 20, textAlign: "center" }}>{ic}</span>
                <div><div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px", color: T.t3, marginBottom: 3 }}>{lb}</div><div style={{ fontSize: 13, lineHeight: 1.5 }}>{val}</div></div>
              </div>
            ))}
            <div style={{ display: "flex", gap: 10, padding: "10px 0" }}>
              <span style={{ fontSize: 14, color: T.green, width: 20, textAlign: "center" }}>🔥</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px", color: T.t3, marginBottom: 6 }}>Crowd Level</div>
                <div style={{ display: "flex", justifyItems: "center", alignItems: "center", gap: 8 }}>
                  <div style={{ flex: 1, height: 5, background: "rgba(255,255,255,0.1)", borderRadius: 3, overflow: "hidden" }}><div style={{ width: `${venue.crowdLevel}%`, height: "100%", background: venue.crowdColor, borderRadius: 3 }} /></div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: venue.crowdColor }}>{venue.crowdLabel} {venue.crowdLevel}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px 20px 28px", background: "linear-gradient(to top,rgba(10,10,10,1) 60%,transparent)", zIndex: 50 }}>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => navigate("booking")} style={{ flex: 2, padding: 16, background: T.green, color: "#000", border: "none", borderRadius: T.r, fontFamily: T.font, fontSize: 15, fontWeight: 700, boxShadow: "0 0 24px rgba(0,200,83,0.25)", cursor: "pointer" }}>Book Guestlist</button>
          <div onClick={() => setFaved(f => !f)} style={{ width: 52, background: T.glass, border: `1.5px solid ${faved ? T.red : T.border}`, borderRadius: T.r, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 18, color: faved ? T.red : T.white }}>{faved ? "♥" : "♡"}</div>
        </div>
      </div>
    </div>
  );
};
