import React, { useState } from 'react';
import { T } from '../../../theme/tokens';
import { MobNav } from '../MobNav';
import { venues } from '../../../data/mockData';

const EmptyState = ({ icon = "📭", title, sub }) => (
  <div style={{ textAlign: "center", padding: "60px 20px", color: T.t3 }}>
    <div style={{ fontSize: "3rem", marginBottom: 16 }}>{icon}</div>
    <div style={{ fontSize: 16, fontWeight: 700, color: T.t2, marginBottom: 8 }}>{title}</div>
    {sub && <div style={{ fontSize: 13, lineHeight: 1.7 }}>{sub}</div>}
  </div>
);

export const SearchScreen = ({ navigate, setVenue }) => {
  const [q, setQ] = useState("");
  const [activeCity, setActiveCity] = useState("All");
  const cities = ["All", "Jaipur", "Delhi", "Mumbai", "Bengaluru"];
  const filtered = venues.filter(v => (q === "" || v.name.toLowerCase().includes(q.toLowerCase()) || v.genre.some(g => g.toLowerCase().includes(q.toLowerCase()))) && (activeCity === "All" || v.location.includes(activeCity)));
  return (
    <div className="slide-in" style={{ height: "100%", position: "relative" }}>
      <div style={{ padding: "60px 20px 16px" }}>
        <div style={{ fontFamily: T.font2, fontSize: 20, fontWeight: 700, marginBottom: 14 }}>Search Venues</div>
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="🔍  Clubs, events, areas..." style={{ width: "100%", background: T.glass, border: `1.5px solid ${T.border}`, borderRadius: T.r, padding: "13px 16px", color: T.white, fontSize: 14, fontFamily: T.font, marginBottom: 14 }} onFocus={e => e.target.style.borderColor = T.green} onBlur={e => e.target.style.borderColor = T.border} />
        <div className="hscroll" style={{ display: "flex", gap: 8 }}>
          {cities.map(c => <div key={c} onClick={() => setActiveCity(c)} style={{ padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600, border: `1px solid ${activeCity === c ? T.green : T.border}`, background: activeCity === c ? T.greenGlow : T.glass, color: activeCity === c ? T.green : T.t2, cursor: "pointer", whiteSpace: "nowrap" }}>{c}</div>)}
        </div>
      </div>
      <div className="mscroll" style={{ padding: "0 20px 90px" }}>
        {!q && !filtered.length && <EmptyState icon="🔍" title="Start searching" sub="Type a venue name or vibe" />}
        {filtered.length === 0 && q && <EmptyState icon="😕" title="No results found" sub={`No venues found for "${q}"`} />}
        {filtered.map(v => (
          <div key={v.id} className="glass hover-card" style={{ borderRadius: T.rlg, overflow: "hidden", cursor: "pointer", marginBottom: 14 }} onClick={() => { setVenue(v); navigate("venue"); }}>
            <div style={{ height: 100, background: v.gradient, display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", fontSize: "3rem", position: "relative" }}>
              {v.emoji}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,transparent 30%,rgba(0,0,0,0.5))" }} />
              <span style={{ position: "absolute", top: 8, right: 8, fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 10, background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.1)" }}>{v.distance}</span>
            </div>
            <div style={{ padding: "12px 14px" }}>
              <div style={{ display: "flex", justifyItems: "center", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                <div style={{ fontSize: 15, fontWeight: 700 }}>{v.name}</div>
                <span style={{ color: T.gold, fontSize: 12, fontWeight: 700 }}>⭐ {v.rating}</span>
              </div>
              <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
                {v.genre.slice(0, 2).map(g => <span key={g} style={{ fontSize: 10, padding: "2px 8px", borderRadius: 8, background: T.glass2, color: T.t2, border: `1px solid ${T.border}` }}>{g}</span>)}
              </div>
              <div style={{ display: "flex", justifyItems: "center", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 12, color: T.t2 }}>from <strong style={{ color: T.green }}>₹{v.stagPrice.toLocaleString()}</strong></span>
                <button onClick={e => { e.stopPropagation(); setVenue(v); navigate("booking"); }} style={{ padding: "6px 14px", background: T.green, color: "#000", border: "none", borderRadius: 8, fontFamily: T.font, fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Book</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <MobNav active="search" navigate={navigate} />
    </div>
  );
};
