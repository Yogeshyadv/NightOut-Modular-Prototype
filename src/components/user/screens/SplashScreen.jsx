import React from 'react';
import { T } from '../../../theme/tokens';

export const SplashScreen = ({ navigate }) => (
  <div className="slide-in" style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyItems: "center", justifyContent: "center", background: `radial-gradient(ellipse at 50% 45%, rgba(0,200,83,0.12) 0%, #0A0A0A 65%)` }}>
    <div style={{ position: "relative", marginBottom: 28 }}>
      <div className="ring2" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 160, height: 160, border: "1px solid rgba(0,200,83,0.07)", borderRadius: 46 }} />
      <div className="ring1" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 128, height: 128, border: "1px solid rgba(0,200,83,0.15)", borderRadius: 38 }} />
      <div className="splash-pop glow-pulse" style={{ width: 96, height: 96, background: `linear-gradient(135deg,rgba(0,200,83,0.2),rgba(0,200,83,0.05))`, border: "1.5px solid rgba(0,200,83,0.3)", borderRadius: 30, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, boxShadow: "0 0 60px rgba(0,200,83,0.2)" }}>🌙</div>
    </div>
    <div style={{ fontFamily: T.font2, fontSize: 38, fontWeight: 700, letterSpacing: "-1px", marginBottom: 10 }}>Night<span style={{ color: T.green, textShadow: "0 0 20px rgba(0,200,83,0.4)" }}>Out</span></div>
    <div style={{ fontSize: 14, color: T.t2, marginBottom: 64 }}>Your Night. Your Terms.</div>
    <button onClick={() => navigate("login")} className="glow-pulse" style={{ width: 260, padding: 16, background: T.green, color: "#000", border: "none", borderRadius: 50, fontFamily: T.font, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>Get Started →</button>
    <div style={{ position: "absolute", bottom: 40, fontSize: 11, color: T.t4 }}>v3.0 · India · Multi-city</div>
  </div>
);
