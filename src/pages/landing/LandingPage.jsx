import React from 'react';
import { T } from '../../theme/tokens';
import { PhoneMockup } from '../../components/user/PhoneMockup';
import { SectionLabel } from '../../components/common/SectionLabel';

export const LandingPage = ({ setRole }) => (
  <div style={{ minHeight: "100vh", background: T.bg, position: "relative", overflow: "hidden" }}>
    {[["600px", "600px", "rgba(0,200,83,0.07)", "-200px", "-200px", "amb1"], ["500px", "500px", "rgba(124,77,255,0.07)", "20%", "-150px", "amb2"], ["400px", "400px", "rgba(0,229,255,0.05)", "60%", "10%", "amb3"]].map(([w, h, c, t, l, cls]) => (
      <div key={cls} className={cls} style={{ position: "absolute", width: w, height: h, background: `radial-gradient(circle, ${c} 0%, transparent 70%)`, top: t, left: l, pointerEvents: "none" }} />
    ))}
    <div style={{ maxWidth: 1400, margin: "0 auto", padding: "120px 80px 60px", position: "relative", zIndex: 1 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 80, flexWrap: "wrap" }}>
        <div style={{ flex: 1, maxWidth: 560 }} className="fade-up">
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: T.glass, border: "1px solid rgba(0,200,83,0.2)", borderRadius: 30, padding: "6px 16px", fontSize: 12, fontWeight: 600, color: T.green, letterSpacing: 1, textTransform: "uppercase", marginBottom: 28, backdropFilter: "blur(10px)" }}>
            <div className="blink" style={{ width: 6, height: 6, background: T.green, borderRadius: "50%", boxShadow: `0 0 8px ${T.green}` }} />Live Demo — v3.0
          </div>
          <h1 style={{ fontFamily: T.font2, fontSize: "clamp(36px, 4.5vw, 68px)", fontWeight: 700, lineHeight: 1.08, letterSpacing: "-2px", marginBottom: 20 }}>
            <div>India's First</div>
            <div style={{ background: `linear-gradient(135deg,${T.green} 0%,${T.cyan} 50%,${T.purple} 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Nightlife OS</div>
            <div style={{ color: T.t2 }}>— Built for Everyone</div>
          </h1>
          <p style={{ fontSize: 16, color: T.t2, lineHeight: 1.75, marginBottom: 36 }}>Three-role platform: Users discover & book. Vendors manage venues. Super Admin controls the ecosystem. Real-time, connected, powerful.</p>
          <div style={{ display: "flex", gap: 12, marginBottom: 48, flexWrap: "wrap" }}>
            <button onClick={() => setRole("app")} className="hover-bright" style={{ padding: "14px 28px", borderRadius: 50, fontSize: 14, fontWeight: 700, background: T.green, color: "#000", border: "none", boxShadow: "0 0 30px rgba(0,200,83,0.3)", cursor: "pointer" }}>📱 User App</button>
            <button onClick={() => setRole("vendor")} className="hover-bright" style={{ padding: "14px 28px", borderRadius: 50, fontSize: 14, fontWeight: 700, background: T.glass, color: T.white, border: `1px solid ${T.border}`, cursor: "pointer", backdropFilter: "blur(10px)" }}>🏪 Vendor Dashboard</button>
            <button onClick={() => setRole("admin")} className="hover-bright" style={{ padding: "14px 28px", borderRadius: 50, fontSize: 14, fontWeight: 700, background: T.purpleGlow, color: T.purple2, border: `1px solid rgba(124,77,255,0.3)`, cursor: "pointer", backdropFilter: "blur(10px)" }}>⚡ Admin Panel</button>
          </div>
          <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
            {[["200+", "Venues"], ["50K+", "Bookings"], ["12", "Cities"], ["3", "Roles"]].map(([n, l]) => (
              <div key={l}><div style={{ fontFamily: T.font2, fontSize: 26, fontWeight: 700, color: T.green, lineHeight: 1, marginBottom: 4 }}>{n}</div><div style={{ fontSize: 12, color: T.t3 }}>{l}</div></div>
            ))}
          </div>
        </div>
        <PhoneMockup />
      </div>
    </div>
    <div style={{ maxWidth: 1400, margin: "0 auto", padding: "20px 80px 100px", position: "relative", zIndex: 1 }}>
      <SectionLabel>Platform Roles</SectionLabel>
      <div style={{ fontFamily: T.font2, fontSize: 34, fontWeight: 700, letterSpacing: "-1px", marginBottom: 40 }}>Three views, <span style={{ color: T.green }}>one platform</span></div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
        {[
          { icon: "📱", color: T.green, role: "app", title: "User App", desc: "Discover venues, book guestlists, pay via UPI, check-in with QR code, and get home safe. Full booking lifecycle.", cta: "Open User App" },
          { icon: "🏪", color: T.purple2, role: "vendor", title: "Vendor Dashboard", desc: "Manage venues, track bookings, update pricing, scan QR at the door, view analytics, and respond to reviews.", cta: "Open Dashboard" },
          { icon: "⚡", color: T.gold, role: "admin", title: "Super Admin Panel", desc: "Full platform control: user management, vendor approval, revenue analytics, content moderation, and settings.", cta: "Open Admin" },
        ].map(f => (
          <div key={f.role} className="glass hover-card" style={{ borderRadius: 28, padding: 32, cursor: "pointer", position: "relative", overflow: "hidden" }} onClick={() => setRole(f.role)}>
            <div style={{ width: 56, height: 56, borderRadius: 16, background: `rgba(${f.color === T.green ? "0,200,83" : f.color === T.purple2 ? "124,77,255" : "255,215,64"}, 0.12)`, border: `1px solid rgba(${f.color === T.green ? "0,200,83" : f.color === T.purple2 ? "124,77,255" : "255,215,64"}, 0.2)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 20 }}>{f.icon}</div>
            <div style={{ fontFamily: T.font2, fontSize: 20, fontWeight: 700, marginBottom: 10 }}>{f.title}</div>
            <div style={{ fontSize: 14, color: T.t2, lineHeight: 1.7, marginBottom: 20 }}>{f.desc}</div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 700, color: f.color }}>
              {f.cta} →
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
