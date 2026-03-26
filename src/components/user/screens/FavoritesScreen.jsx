import React from 'react';
import { T } from '../../../theme/tokens';
import { MobNav } from '../MobNav';
import { venues } from '../../../data/mockData';

export const FavoritesScreen = ({ navigate, setVenue }) => (
  <div className="slide-in" style={{ height: "100%", position: "relative" }}>
    <div style={{ padding: "56px 20px 18px" }}>
      <div style={{ fontFamily: T.font2, fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Saved Venues</div>
      <div style={{ fontSize: 13, color: T.t2 }}>{venues.length} venues in your wishlist</div>
    </div>
    <div className="mscroll" style={{ padding: "0 20px 90px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {venues.map(v => (
          <div key={v.id} className="glass hover-scale" style={{ borderRadius: T.rlg, overflow: "hidden", cursor: "pointer" }} onClick={() => { setVenue(v); navigate("venue"); }}>
            <div style={{ height: 100, background: v.gradient, display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", fontSize: "2.5rem", position: "relative" }}>
              {v.emoji}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.6))" }} />
              <span style={{ position: "absolute", top: 8, right: 8, fontSize: 14, color: T.pink, textShadow: "0 0 8px rgba(255,64,129,0.5)" }}>♥</span>
            </div>
            <div style={{ padding: "10px 12px" }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{v.name}</div>
              <div style={{ fontSize: 11, color: T.t2 }}>from <strong style={{ color: T.green }}>₹{v.stagPrice?.toLocaleString()}</strong></div>
              <div style={{ fontSize: 11, color: T.gold, marginTop: 4 }}>⭐ {v.rating}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <MobNav active="favorites" navigate={navigate} />
  </div>
);
