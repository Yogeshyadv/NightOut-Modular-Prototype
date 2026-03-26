import React from 'react';
import { T } from '../../../theme/tokens';
import { MobNav } from '../MobNav';

const Avatar = ({ name, size = 36, color = T.green }) => {
  const initials = (name || "?").split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div style={{ width: size, height: size, borderRadius: size * 0.28, background: `linear-gradient(135deg,${color},${color}88)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.35, fontWeight: 800, color: "#000", flexShrink: 0 }}>
      {initials}
    </div>
  );
};

export const ProfileScreen = ({ navigate }) => (
  <div className="slide-in" style={{ height: "100%", position: "relative" }}>
    <div className="mscroll" style={{ paddingBottom: 90 }}>
      <div style={{ padding: "56px 20px 24px", background: `radial-gradient(ellipse at 50% 0%, rgba(0,200,83,0.07) 0%, transparent 60%)`, borderBottom: `1px solid ${T.border}`, marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
          <div style={{ width: 72, height: 72, borderRadius: 22, background: `linear-gradient(135deg,${T.green},#007A32)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, fontWeight: 800, color: "#000", flexShrink: 0, position: "relative", boxShadow: "0 0 30px rgba(0,200,83,0.3)" }}>
            RS<div style={{ position: "absolute", bottom: -4, right: -4, width: 22, height: 22, background: T.gold, borderRadius: "50%", border: "2px solid #0A0A0A", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10 }}>👑</div>
          </div>
          <div>
            <div style={{ fontFamily: T.font2, fontSize: 20, fontWeight: 700, marginBottom: 3 }}>Rahul Sharma</div>
            <div style={{ fontSize: 13, color: T.t2 }}>+91 98765 43210 · <span style={{ color: T.green, fontWeight: 700 }}>✓ Verified</span></div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {[["12", "Nights Out"], ["8", "Venues"], ["₹24.8K", "Total Spent"]].map(([n, l]) => (
            <div key={l}><div style={{ fontFamily: T.font2, fontSize: 20, fontWeight: 800, color: T.green, marginBottom: 2 }}>{n}</div><div style={{ fontSize: 11, color: T.t3 }}>{l}</div></div>
          ))}
        </div>
      </div>
      <div style={{ background: "linear-gradient(135deg,rgba(255,215,64,0.08),rgba(255,140,0,0.05))", border: "1px solid rgba(255,215,64,0.2)", borderRadius: T.rlg, padding: 18, margin: "0 20px 20px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }}>
        <div style={{ fontSize: "2rem" }}>👑</div>
        <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 700, color: T.gold }}>NightOut Gold</div><div style={{ fontSize: 12, color: "rgba(255,215,64,0.5)", marginTop: 2 }}>Priority entry · Exclusive deals · ₹299/mo</div></div>
        <div style={{ color: T.gold, fontSize: 18 }}>›</div>
      </div>
      {[
        { section: "Account", items: [["🎟️", "My Bookings", "2 upcoming", "bookings", "g"], ["❤️", "Favourites", "6 venues", "favorites", "p"], ["⭐", "My Reviews", "5 reviews", null, "gold"], ["⚙️", "Settings", "Preferences", null, "gr"]] },
        { section: "Safety", items: [["📍", "Live Location", "Share with contacts", null, "g"], ["🆘", "Emergency SOS", "3 contacts saved", null, "r"]] },
        { section: "App", items: [["ℹ️", "About NightOut", "v3.0", null, "gr"], ["🚪", "Logout", "rahul.s@gmail.com", null, "r"]] },
      ].map(({ section, items }) => (
        <div key={section} style={{ padding: "0 20px", marginBottom: 20 }}>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", color: T.t4, marginBottom: 8 }}>{section}</div>
          {items.map(([icon, name, sub, target]) => (
            <div key={name} onClick={() => target && navigate(target)} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.04)", cursor: target ? "pointer" : "default", transition: "opacity 0.2s" }}>
              <div style={{ width: 38, height: 38, borderRadius: 11, background: name === "Logout" || name === "Emergency SOS" ? "rgba(255,82,82,0.1)" : T.greenGlow, border: `1px solid ${name === "Logout" || name === "Emergency SOS" ? "rgba(255,82,82,0.15)" : "rgba(0,200,83,0.15)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>{icon}</div>
              <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 600, color: name === "Logout" ? T.red : T.white }}>{name}</div><div style={{ fontSize: 11, color: T.t2, marginTop: 1 }}>{sub}</div></div>
              <div style={{ color: T.t4, fontSize: 14 }}>›</div>
            </div>
          ))}
        </div>
      ))}
    </div>
    <MobNav active="profile" navigate={navigate} />
  </div>
);
