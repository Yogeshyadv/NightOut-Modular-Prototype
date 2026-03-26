// NightOut — Complete React Application
// All files combined into single runnable JSX artifact
// Architecture: Landing | Mobile App (Phone) | Vendor Dashboard
// Stack: React + React Router (HashRouter) + inline CSS-in-JS design system

import { useState, useEffect, useCallback } from "react";

// ═══════════════════════════════════════════════════════
//  DESIGN SYSTEM TOKENS
// ═══════════════════════════════════════════════════════
const T = {
  bg: "#0A0A0A",
  bg2: "#0f0f0f",
  bg3: "#141414",
  card: "rgba(255,255,255,0.04)",
  card2: "rgba(255,255,255,0.07)",
  border: "rgba(255,255,255,0.08)",
  border2: "rgba(255,255,255,0.14)",
  green: "#00C853",
  green2: "#00E676",
  greenGlow: "rgba(0,200,83,0.16)",
  greenGlow2: "rgba(0,200,83,0.07)",
  purple: "#7C4DFF",
  purple2: "#9C6FFF",
  purpleGlow: "rgba(124,77,255,0.16)",
  gold: "#FFD740",
  red: "#FF5252",
  cyan: "#00E5FF",
  white: "#FFFFFF",
  t2: "#B0B0B0",
  t3: "#707070",
  t4: "#404040",
  r: "14px",
  rsm: "10px",
  rlg: "20px",
  rxl: "28px",
  font: "'Poppins', sans-serif",
  font2: "'Space Grotesk', sans-serif",
};

// ═══════════════════════════════════════════════════════
//  MOCK DATA
// ═══════════════════════════════════════════════════════
const venues = [
  {
    id: 1,
    name: "F Bar & Lounge",
    location: "MI Road, Jaipur",
    distance: "2.1 km",
    rating: 4.5,
    reviews: 312,
    emoji: "🎉",
    gradient: "linear-gradient(135deg,#0d001a,#1e0035,#080012)",
    genre: ["EDM", "Stag Friendly", "Rooftop"],
    stagPrice: 1500,
    couplePrice: 2000,
    femalePrice: 800,
    crowdLevel: 72,
    crowdLabel: "Buzzing",
    crowdColor: "#FFD740",
    djTonight: "DJ Arjun K",
    badges: ["Stag Friendly", "Rainbow", "Women Safe"],
    openTime: "8:00 PM – 1:00 AM",
    dressCode: "Smart casual · No shorts, flip-flops, or sportswear",
    includes: "2 complimentary drinks per person",
    featured: true,
  },
  {
    id: 2,
    name: "Fizz Rooftop Bar",
    location: "C-Scheme, Jaipur",
    distance: "3.4 km",
    rating: 4.3,
    reviews: 187,
    emoji: "🌃",
    gradient: "linear-gradient(135deg,#001108,#001f10,#000a04)",
    genre: ["Bollywood", "Couples", "Hookah"],
    stagPrice: 1200,
    couplePrice: 1800,
    femalePrice: 600,
    crowdLevel: 45,
    crowdLabel: "Moderate",
    crowdColor: "#00C853",
    djTonight: "DJ Priya",
    badges: ["Couples", "Rooftop"],
    openTime: "7:30 PM – 12:30 AM",
    dressCode: "Smart casual",
    includes: "1 welcome drink per person",
    featured: true,
  },
  {
    id: 3,
    name: "Skybar 22",
    location: "Tonk Road, Jaipur",
    distance: "5.2 km",
    rating: 4.8,
    reviews: 521,
    emoji: "🥂",
    gradient: "linear-gradient(135deg,#1a0f00,#2e1c00,#0d0800)",
    genre: ["House", "VIP Tables", "Premium"],
    stagPrice: 2500,
    couplePrice: 3500,
    femalePrice: 1200,
    crowdLevel: 88,
    crowdLabel: "Packed",
    crowdColor: "#FF5252",
    djTonight: "DJ Rahul Singh",
    badges: ["VIP Tables", "Premium"],
    openTime: "9:00 PM – 2:00 AM",
    dressCode: "Formal / Semi-formal mandatory",
    includes: "Unlimited soft beverages",
    featured: true,
  },
  {
    id: 4,
    name: "Neon Terrace",
    location: "Vaishali Nagar, Jaipur",
    distance: "4.1 km",
    rating: 4.4,
    reviews: 203,
    emoji: "🎶",
    gradient: "linear-gradient(135deg,#001a20,#002a33,#000d10)",
    genre: ["Techno", "Ladies Night", "Cocktails"],
    stagPrice: 1800,
    couplePrice: 2400,
    femalePrice: 700,
    crowdLevel: 60,
    crowdLabel: "Getting Busy",
    crowdColor: "#FFD740",
    djTonight: "DJ Meera",
    badges: ["Ladies Night", "Rainbow"],
    openTime: "8:30 PM – 1:30 AM",
    dressCode: "Smart casual",
    includes: "1 drink token per person",
    featured: false,
  },
];

const bookings = [
  { id: "NO-2026-84729", guest: "Rahul Sharma", phone: "+91 98765 43210", type: "Stag", guests: 1, amount: 1629, status: "Checked In", venue: "F Bar & Lounge", date: "25 Mar 2026", time: "9:04 PM" },
  { id: "NO-2026-84730", guest: "Priya & Arjun", phone: "+91 87654 32109", type: "Couple", guests: 2, amount: 2129, status: "Confirmed", venue: "F Bar & Lounge", date: "25 Mar 2026", time: "—" },
  { id: "NO-2026-84731", guest: "Rohan Mehra", phone: "+91 76543 21098", type: "Stag", guests: 1, amount: 1629, status: "Checked In", venue: "F Bar & Lounge", date: "25 Mar 2026", time: "9:12 PM" },
  { id: "NO-2026-84732", guest: "Anjali Singh & Group", phone: "+91 65432 10987", type: "Group", guests: 4, amount: 5496, status: "Confirmed", venue: "F Bar & Lounge", date: "25 Mar 2026", time: "—" },
  { id: "NO-2026-84733", guest: "Dev Kapoor", phone: "+91 54321 09876", type: "Couple", guests: 2, amount: 0, status: "Pending", venue: "Fizz Rooftop Bar", date: "25 Mar 2026", time: "—" },
  { id: "NO-2026-84734", guest: "Meera Joshi", phone: "+91 43210 98765", type: "Stag", guests: 1, amount: 1629, status: "No-Show", venue: "Skybar 22", date: "25 Mar 2026", time: "—" },
  { id: "NO-2026-84735", guest: "Vikram & Neha", phone: "+91 32109 87654", type: "Couple", guests: 2, amount: 2129, status: "Checked In", venue: "F Bar & Lounge", date: "25 Mar 2026", time: "9:18 PM" },
  { id: "NO-2026-84736", guest: "Sana Khan", phone: "+91 21098 76543", type: "Stag", guests: 3, amount: 4887, status: "Confirmed", venue: "Neon Terrace", date: "25 Mar 2026", time: "—" },
];

const analyticsData = {
  weeklyBookings: [22, 38, 19, 29, 56, 62, 40],
  weeklyRevenue: [1.2, 1.8, 1.1, 1.6, 3.0, 3.2, 2.0],
  days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  kpis: {
    totalBookings: 842,
    checkinRate: "91%",
    estRevenue: "₹38L",
    avgRating: "4.5",
  },
};

const userBookings = [
  { id: "NO-2026-84729", venue: "F Bar & Lounge", emoji: "🎉", gradient: "linear-gradient(135deg,#0d001a,#1e0035)", date: "Tue, 25 Mar 2026", time: "9:00 PM", type: "Guestlist · Stag", guests: 1, amount: 1629, status: "upcoming" },
  { id: "NO-2026-84728", venue: "Fizz Rooftop Bar", emoji: "🌃", gradient: "linear-gradient(135deg,#001108,#001f10)", date: "Sat, 29 Mar 2026", time: "8:30 PM", type: "Guestlist · Couple", guests: 2, amount: 2129, status: "upcoming" },
  { id: "NO-2026-84710", venue: "Skybar 22", emoji: "🥂", gradient: "linear-gradient(135deg,#1a0f00,#2e1c00)", date: "Sat, 15 Mar 2026", time: "9:00 PM", type: "Guestlist · Stag", guests: 1, amount: 2629, status: "past" },
];

// ═══════════════════════════════════════════════════════
//  SHARED CSS INJECT
// ═══════════════════════════════════════════════════════
const GlobalStyles = () => {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700;800&display=swap');
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body { background: #0A0A0A; color: #fff; font-family: 'Poppins', sans-serif; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
      ::-webkit-scrollbar { width: 4px; height: 4px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
      button { font-family: 'Poppins', sans-serif; cursor: pointer; border: none; outline: none; }
      input, select, textarea { font-family: 'Poppins', sans-serif; outline: none; }
      a { text-decoration: none; color: inherit; }
      
      @keyframes fadeSlideIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      @keyframes float1 { 0%,100%{transform:translateY(0) scale(1);} 50%{transform:translateY(-28px) scale(1.04);} }
      @keyframes float2 { 0%,100%{transform:translateY(0);} 50%{transform:translateY(20px);} }
      @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:0.3;} }
      @keyframes scanLine { 0%{top:15%;} 100%{top:82%;} }
      @keyframes splashPop { from{transform:scale(0.4);opacity:0;} to{transform:scale(1);opacity:1;} }
      @keyframes qrCheck { from{transform:scale(0);opacity:0;} to{transform:scale(1);opacity:1;} }
      @keyframes ringPulse { 0%,100%{opacity:0.5;transform:scale(1);} 50%{opacity:1;transform:scale(1.05);} }
      @keyframes slideScreenIn { from{opacity:0;transform:translateX(20px);} to{opacity:1;transform:translateX(0);} }
      @keyframes barGrow { from{height:0;} to{height:var(--bar-h);} }
      @keyframes spin { from{transform:rotate(0deg);} to{transform:rotate(360deg);} }
      @keyframes glow { 0%,100%{box-shadow:0 0 20px rgba(0,200,83,0.2);} 50%{box-shadow:0 0 40px rgba(0,200,83,0.4);} }
      
      .screen-enter { animation: slideScreenIn 0.32s cubic-bezier(0.4,0,0.2,1) forwards; }
      .fade-in { animation: fadeSlideIn 0.4s ease forwards; }
      .amb-glow-1 { animation: float1 8s ease-in-out infinite; }
      .amb-glow-2 { animation: float2 10s ease-in-out infinite; }
      .amb-glow-3 { animation: float1 12s ease-in-out infinite reverse; }
      .live-dot { animation: blink 2s ease infinite; }
      .scan-line { animation: scanLine 2.5s ease-in-out infinite; }
      .splash-pop { animation: splashPop 0.7s cubic-bezier(0.34,1.56,0.64,1) forwards; }
      .ring-pulse { animation: ringPulse 2.5s ease infinite; }
      .ring-pulse-2 { animation: ringPulse 2.5s ease 0.5s infinite; }
      .qr-check-anim { animation: qrCheck 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards; }
      .glow-pulse { animation: glow 3s ease infinite; }
      
      .hover-lift { transition: transform 0.2s ease, box-shadow 0.2s ease; }
      .hover-lift:hover { transform: translateY(-3px); }
      .hover-scale { transition: transform 0.2s ease; }
      .hover-scale:hover { transform: scale(0.97); }
      
      .glass-card { background: rgba(255,255,255,0.04); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.08); }
      .glass-card-2 { background: rgba(255,255,255,0.07); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.12); }
      
      .mscroll { overflow-y: auto; overflow-x: hidden; scrollbar-width: none; height: 100%; }
      .mscroll::-webkit-scrollbar { display: none; }
      
      .no-scroll-x { overflow-x: auto; scrollbar-width: none; }
      .no-scroll-x::-webkit-scrollbar { display: none; }
      
      table { width: 100%; border-collapse: collapse; }
      th { text-align: left; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #404040; padding: 12px 20px; border-bottom: 1px solid rgba(255,255,255,0.06); }
      td { padding: 14px 20px; font-size: 13px; border-bottom: 1px solid rgba(255,255,255,0.03); vertical-align: middle; }
      tr:last-child td { border-bottom: none; }
      tr:hover td { background: rgba(255,255,255,0.01); }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);
  return null;
};

// ═══════════════════════════════════════════════════════
//  REUSABLE COMPONENTS
// ═══════════════════════════════════════════════════════

// Button Component
const Btn = ({ children, variant = "primary", onClick, style = {}, full = false, small = false }) => {
  const base = {
    display: "inline-flex", alignItems: "center", gap: 8,
    borderRadius: T.r, fontFamily: T.font, fontWeight: 700,
    cursor: "pointer", border: "none", transition: "all 0.22s ease",
    padding: small ? "8px 16px" : "14px 28px",
    fontSize: small ? "12px" : "14px",
    width: full ? "100%" : "auto",
    justifyContent: full ? "center" : "flex-start",
  };
  const variants = {
    primary: { background: T.green, color: "#000", boxShadow: "0 0 24px rgba(0,200,83,0.25)" },
    secondary: { background: T.card, color: T.white, border: `1px solid ${T.border}`, backdropFilter: "blur(10px)" },
    ghost: { background: "transparent", color: T.white, border: `1px solid ${T.border}` },
    purple: { background: T.purple, color: "#fff", boxShadow: "0 0 24px rgba(124,77,255,0.25)" },
    danger: { background: "rgba(255,82,82,0.1)", color: T.red, border: `1px solid rgba(255,82,82,0.2)` },
  };
  return (
    <button
      onClick={onClick}
      className="hover-lift"
      style={{ ...base, ...variants[variant], ...style }}
      onMouseEnter={e => { if (variant === "primary") e.currentTarget.style.boxShadow = "0 0 40px rgba(0,200,83,0.45)"; }}
      onMouseLeave={e => { if (variant === "primary") e.currentTarget.style.boxShadow = "0 0 24px rgba(0,200,83,0.25)"; }}
    >{children}</button>
  );
};

// Status Pill
const StatusPill = ({ status }) => {
  const cfg = {
    "Checked In": { bg: "rgba(0,200,83,0.12)", border: "rgba(0,200,83,0.3)", color: "#00C853" },
    "Confirmed": { bg: "rgba(124,77,255,0.12)", border: "rgba(124,77,255,0.3)", color: "#9C6FFF" },
    "Pending": { bg: "rgba(255,215,64,0.12)", border: "rgba(255,215,64,0.3)", color: "#FFD740" },
    "No-Show": { bg: "rgba(255,82,82,0.12)", border: "rgba(255,82,82,0.3)", color: "#FF5252" },
    "Past": { bg: "rgba(176,176,176,0.08)", border: "rgba(176,176,176,0.2)", color: "#B0B0B0" },
  };
  const s = cfg[status] || cfg["Pending"];
  return (
    <span style={{ display: "inline-block", padding: "4px 11px", borderRadius: 10, fontSize: 11, fontWeight: 700, background: s.bg, border: `1px solid ${s.border}`, color: s.color }}>{status}</span>
  );
};

// Input
const Input = ({ label, value, onChange, placeholder, type = "text", style = {} }) => (
  <div style={{ marginBottom: 16 }}>
    {label && <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px", color: T.t3, marginBottom: 8 }}>{label}</div>}
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{ width: "100%", background: T.card, border: `1.5px solid ${T.border}`, borderRadius: T.rsm, padding: "13px 16px", color: T.white, fontSize: 14, fontFamily: T.font, transition: "border-color 0.2s", ...style }}
      onFocus={e => e.target.style.borderColor = T.green}
      onBlur={e => e.target.style.borderColor = T.border}
    />
  </div>
);

// KPI Card
const KpiCard = ({ icon, label, value, change, changeUp = true, accentColor = T.green }) => (
  <div className="glass-card hover-lift" style={{ borderRadius: T.rlg, padding: "22px", position: "relative", overflow: "hidden" }}>
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: `linear-gradient(to right, ${accentColor}, transparent)` }} />
    <div style={{ fontSize: 22, marginBottom: 14 }}>{icon}</div>
    <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px", color: T.t3, marginBottom: 8 }}>{label}</div>
    <div style={{ fontFamily: T.font2, fontSize: 30, fontWeight: 800, marginBottom: 6 }}>{value}</div>
    {change && <div style={{ fontSize: 12, fontWeight: 600, color: changeUp ? T.green : T.red, display: "flex", alignItems: "center", gap: 4 }}>{changeUp ? "↑" : "↓"} {change}</div>}
  </div>
);

// Bar Chart
const BarChart = ({ data, labels, color = T.green, color2 = T.purple2, height = 160, unit = "" }) => {
  const max = Math.max(...data);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height }}>
      {data.map((v, i) => {
        const h = Math.round((v / max) * (height - 24));
        const isMax = v === max;
        return (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, flex: 1 }}>
            <div style={{ position: "relative" }}>
              <div
                style={{
                  width: "100%", minWidth: 12, borderRadius: "5px 5px 0 0",
                  height: h,
                  background: isMax ? `linear-gradient(to top, ${color}, ${color2 || T.green2})` : `linear-gradient(to top, rgba(0,200,83,0.3), ${color})`,
                  boxShadow: isMax ? `0 0 20px rgba(0,200,83,0.3)` : "none",
                  transition: "all 0.3s ease",
                }}
              />
            </div>
            <span style={{ fontSize: 10, color: T.t4 }}>{labels[i]}</span>
          </div>
        );
      })}
    </div>
  );
};

// Section label for mobile
const MobSectionHeader = ({ title, sub, action, onAction }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", padding: "0 20px", marginBottom: 16 }}>
    <div>
      <div style={{ fontSize: 17, fontWeight: 700, fontFamily: T.font2 }}>{title}</div>
      {sub && <div style={{ fontSize: 12, color: T.t2, marginTop: 2 }}>{sub}</div>}
    </div>
    {action && <span style={{ fontSize: 12, color: T.green, fontWeight: 600, cursor: "pointer" }} onClick={onAction}>{action}</span>}
  </div>
);

// Venue Card (mobile)
const VenueCard = ({ venue, onBook, onDetail }) => (
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
const FeatCard = ({ venue, onClick }) => (
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

// Mobile Bottom Nav
const MobNav = ({ active, navigate }) => {
  const items = [
    { id: "home", icon: "🏠", label: "Home" },
    { id: "search", icon: "🔍", label: "Explore" },
    { id: "bookings", icon: "📅", label: "Bookings" },
    { id: "favorites", icon: "❤️", label: "Saved" },
    { id: "profile", icon: "👤", label: "Profile" },
  ];
  return (
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 84, background: "rgba(8,8,8,0.96)", backdropFilter: "blur(30px)", borderTop: `1px solid ${T.border}`, display: "flex", alignItems: "flex-start", justifyContent: "space-around", padding: "12px 0 0", zIndex: 50 }}>
      {items.map(item => (
        <div key={item.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer", padding: "4px 14px", transition: "opacity 0.2s" }} onClick={() => navigate(item.id)}>
          <div style={{ fontSize: 18, filter: active === item.id ? `drop-shadow(0 0 6px ${T.green})` : "none" }}>{item.icon}</div>
          <span style={{ fontSize: 9, fontWeight: 600, color: active === item.id ? T.green : T.t4 }}>{item.label}</span>
          {active === item.id && <div style={{ width: 4, height: 4, background: T.green, borderRadius: "50%", marginTop: -2 }} />}
        </div>
      ))}
    </div>
  );
};

// ═══════════════════════════════════════════════════════
//  MOBILE APP SCREENS
// ═══════════════════════════════════════════════════════

const SplashScreen = ({ navigate }) => (
  <div className="screen-enter" style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: `radial-gradient(ellipse at 50% 45%, ${T.greenGlow} 0%, ${T.bg} 65%)` }}>
    <div style={{ position: "relative", marginBottom: 28 }}>
      <div className="ring-pulse-2" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 160, height: 160, border: `1px solid rgba(0,200,83,0.07)`, borderRadius: 46 }} />
      <div className="ring-pulse" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 128, height: 128, border: `1px solid rgba(0,200,83,0.15)`, borderRadius: 38 }} />
      <div className="splash-pop glow-pulse" style={{ width: 96, height: 96, background: `linear-gradient(135deg,${T.greenGlow},${T.greenGlow2})`, border: `1.5px solid rgba(0,200,83,0.3)`, borderRadius: 30, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, backdropFilter: "blur(10px)", boxShadow: "0 0 60px rgba(0,200,83,0.2)" }}>🌙</div>
    </div>
    <div style={{ fontFamily: T.font2, fontSize: 38, fontWeight: 700, letterSpacing: "-1px", marginBottom: 10 }}>Night<span style={{ color: T.green, textShadow: `0 0 20px rgba(0,200,83,0.4)` }}>Out</span></div>
    <div style={{ fontSize: 14, color: T.t2, marginBottom: 64 }}>Your Night. Your Terms.</div>
    <button onClick={() => navigate("login")} className="glow-pulse" style={{ width: 260, padding: 16, background: T.green, color: "#000", border: "none", borderRadius: 50, fontFamily: T.font, fontSize: 15, fontWeight: 700, cursor: "pointer", boxShadow: "0 0 30px rgba(0,200,83,0.3)" }}>Get Started →</button>
    <div style={{ position: "absolute", bottom: 40, fontSize: 11, color: T.t4 }}>v2.1.0 · India · Beta</div>
  </div>
);

const LoginScreen = ({ navigate }) => {
  const [showOtp, setShowOtp] = useState(false);
  return (
    <div className="screen-enter" style={{ height: "100%", background: `radial-gradient(ellipse at 50% -20%, rgba(0,200,83,0.08) 0%, ${T.bg} 60%)`, overflow: "hidden auto" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />
      <div style={{ padding: "72px 28px 40px", position: "relative" }}>
        <div style={{ fontFamily: T.font2, fontSize: 28, fontWeight: 700, lineHeight: 1.3, marginBottom: 8 }}>Welcome back 👋<br />Let's get you in.</div>
        <div style={{ fontSize: 14, color: T.t2, marginBottom: 32 }}>Sign in to discover and book tonight</div>

        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px", color: T.t3, marginBottom: 8 }}>Mobile Number</div>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: T.card, border: `1.5px solid ${T.border}`, borderRadius: T.rsm, padding: "14px", fontSize: 14, fontWeight: 600, backdropFilter: "blur(10px)", cursor: "pointer" }}>🇮🇳 +91</div>
            <input placeholder="98765 43210" type="tel" style={{ flex: 1, background: T.card, border: `1.5px solid ${T.border}`, borderRadius: T.rsm, padding: "14px 16px", color: T.white, fontSize: 15, fontFamily: T.font, backdropFilter: "blur(10px)" }}
              onFocus={e => e.target.style.borderColor = T.green}
              onBlur={e => e.target.style.borderColor = T.border}
            />
          </div>
        </div>

        <button onClick={() => setShowOtp(true)} style={{ width: "100%", padding: 16, background: T.green, color: "#000", border: "none", borderRadius: T.r, fontFamily: T.font, fontSize: 15, fontWeight: 700, marginBottom: 20, boxShadow: `0 0 24px rgba(0,200,83,0.25)`, cursor: "pointer" }}>Send OTP</button>

        {showOtp && (
          <div className="fade-in">
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px", color: T.t3, marginBottom: 8 }}>Enter 6-digit OTP</div>
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              {["8","4","7","","",""].map((v, i) => (
                <div key={i} style={{ flex: 1, aspectRatio: 1, maxWidth: 48, background: v ? T.greenGlow2 : T.card, border: `1.5px solid ${v ? T.green : (i === 3 ? T.green : T.border)}`, borderRadius: T.rsm, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 700, color: T.green, boxShadow: i === 3 ? `0 0 0 3px rgba(0,200,83,0.12)` : "none" }}>{v}</div>
              ))}
            </div>
            <div style={{ textAlign: "center", fontSize: 12, color: T.t3, marginBottom: 20 }}>Resend OTP in <span style={{ color: T.green, fontWeight: 600 }}>0:44</span></div>
            <button onClick={() => navigate("home")} style={{ width: "100%", padding: 16, background: T.green, color: "#000", border: "none", borderRadius: T.r, fontFamily: T.font, fontSize: 15, fontWeight: 700, boxShadow: `0 0 24px rgba(0,200,83,0.25)`, cursor: "pointer" }}>Verify & Continue →</button>
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0", fontSize: 12, color: T.t4 }}>
          <div style={{ flex: 1, height: 1, background: T.border }} />or continue with<div style={{ flex: 1, height: 1, background: T.border }} />
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {["🅖 Google", "🍎 Apple"].map(s => (
            <button key={s} style={{ flex: 1, padding: 13, background: T.card, border: `1px solid ${T.border}`, borderRadius: T.rsm, color: T.white, fontFamily: T.font, fontSize: 13, fontWeight: 500, cursor: "pointer", backdropFilter: "blur(10px)" }}>{s}</button>
          ))}
        </div>
      </div>
    </div>
  );
};

const HomeScreen = ({ navigate, setSelectedVenue }) => {
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "Stag", "Couples", "VIP Tables", "Ladies Night", "🌈 Rainbow", "Live Music"];
  const featured = venues.filter(v => v.featured);

  return (
    <div className="screen-enter" style={{ height: "100%", position: "relative" }}>
      {/* Header */}
      <div style={{ padding: "56px 20px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 20, background: `linear-gradient(to bottom, ${T.bg} 70%, transparent)` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: T.card, border: `1px solid ${T.border2}`, borderRadius: 30, padding: "8px 16px", fontSize: 14, fontWeight: 600, backdropFilter: "blur(20px)", cursor: "pointer" }}>
          <div className="live-dot" style={{ width: 8, height: 8, background: T.green, borderRadius: "50%", boxShadow: `0 0 8px ${T.green}` }} />
          Jaipur ▾
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {["🔍","🔔"].map((ic, i) => (
            <div key={i} style={{ width: 40, height: 40, background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative", backdropFilter: "blur(20px)" }}>
              {ic}
              {i === 1 && <div style={{ position: "absolute", top: -2, right: -2, width: 9, height: 9, background: T.red, borderRadius: "50%", border: `2px solid ${T.bg}`, boxShadow: `0 0 6px ${T.red}` }} />}
            </div>
          ))}
        </div>
      </div>

      <div className="mscroll" style={{ paddingBottom: 90 }}>
        {/* Greeting */}
        <div style={{ padding: "0 20px 20px" }}>
          <div style={{ fontSize: 12, color: T.green, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Good Evening</div>
          <div style={{ fontFamily: T.font2, fontSize: 24, fontWeight: 800, letterSpacing: "-0.5px" }}>Tonight in Jaipur</div>
          <div style={{ fontSize: 13, color: T.t2, marginTop: 4 }}>{venues.length} venues open · 3 events tonight</div>
        </div>

        {/* Featured strip */}
        <div className="no-scroll-x" style={{ display: "flex", gap: 14, padding: "0 20px", marginBottom: 24 }}>
          {featured.map(v => <FeatCard key={v.id} venue={v} onClick={() => { setSelectedVenue(v); navigate("venue"); }} />)}
        </div>

        {/* Filters */}
        <div className="no-scroll-x" style={{ display: "flex", gap: 8, padding: "0 20px", marginBottom: 20 }}>
          {filters.map(f => (
            <div key={f} onClick={() => setActiveFilter(f)} style={{ padding: "7px 16px", borderRadius: 20, fontSize: 12, fontWeight: 600, border: `1px solid ${activeFilter === f ? T.green : T.border}`, background: activeFilter === f ? T.greenGlow : T.card, color: activeFilter === f ? T.green : T.t2, cursor: "pointer", whiteSpace: "nowrap", backdropFilter: "blur(10px)", transition: "all 0.2s" }}>
              {f}
            </div>
          ))}
        </div>

        {/* Venue list */}
        <MobSectionHeader title="Nearby Venues" sub={`${venues.length} open tonight`} action="See all →" />
        <div style={{ padding: "0 20px" }}>
          {venues.map(v => (
            <VenueCard key={v.id} venue={v}
              onDetail={() => { setSelectedVenue(v); navigate("venue"); }}
              onBook={() => { setSelectedVenue(v); navigate("booking"); }}
            />
          ))}
        </div>
      </div>
      <MobNav active="home" navigate={navigate} />
    </div>
  );
};

const SearchScreen = ({ navigate, setSelectedVenue }) => {
  const [query, setQuery] = useState("");
  const filtered = venues.filter(v => v.name.toLowerCase().includes(query.toLowerCase()) || v.genre.some(g => g.toLowerCase().includes(query.toLowerCase())));
  return (
    <div className="screen-enter" style={{ height: "100%", position: "relative" }}>
      <div style={{ padding: "60px 20px 16px" }}>
        <div style={{ fontFamily: T.font2, fontSize: 22, fontWeight: 700, marginBottom: 16 }}>Search Venues</div>
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="🔍  Search clubs, events, areas..." style={{ width: "100%", background: T.card, border: `1.5px solid ${T.border}`, borderRadius: T.r, padding: "14px 16px", color: T.white, fontSize: 14, fontFamily: T.font, backdropFilter: "blur(20px)" }}
          onFocus={e => e.target.style.borderColor = T.green}
          onBlur={e => e.target.style.borderColor = T.border}
        />
      </div>
      <div className="mscroll" style={{ padding: "0 20px", paddingBottom: 90 }}>
        {!query && (
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px", color: T.t3, marginBottom: 10 }}>Trending</div>
            {["Bollywood night 🎶", "Ladies night Jaipur", "VIP tables tonight", "EDM parties"].map(t => (
              <div key={t} onClick={() => setQuery(t.replace(/[🎶]/g, "").trim())} style={{ padding: "12px 0", borderBottom: `1px solid ${T.border}`, fontSize: 14, color: T.t2, cursor: "pointer" }}>🔥 {t}</div>
            ))}
          </div>
        )}
        {filtered.map(v => <VenueCard key={v.id} venue={v} onDetail={() => { setSelectedVenue(v); navigate("venue"); }} onBook={() => { setSelectedVenue(v); navigate("booking"); }} />)}
        {query && filtered.length === 0 && <div style={{ textAlign: "center", color: T.t3, padding: 40, fontSize: 14 }}>No venues found for "{query}"</div>}
      </div>
      <MobNav active="search" navigate={navigate} />
    </div>
  );
};

const VenueDetailScreen = ({ venue, navigate }) => {
  const [faved, setFaved] = useState(false);
  if (!venue) return null;
  return (
    <div className="screen-enter" style={{ height: "100%", position: "relative" }}>
      <div className="mscroll" style={{ paddingBottom: 100 }}>
        {/* Banner */}
        <div style={{ height: 280, background: venue.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "6rem", position: "relative", overflow: "hidden", flexShrink: 0 }}>
          {venue.emoji}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 40%, rgba(10,10,10,1) 100%)" }} />
          <div onClick={() => navigate("home")} style={{ position: "absolute", top: 60, left: 18, width: 40, height: 40, background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", backdropFilter: "blur(10px)", zIndex: 10 }}>←</div>
          <div onClick={() => setFaved(f => !f)} style={{ position: "absolute", top: 60, right: 18, width: 40, height: 40, background: "rgba(0,0,0,0.5)", border: `1px solid ${faved ? T.red : "rgba(255,255,255,0.15)"}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", backdropFilter: "blur(10px)", color: faved ? T.red : T.white, fontSize: 18, zIndex: 10 }}>{faved ? "♥" : "♡"}</div>
        </div>

        <div style={{ padding: "0 20px 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
            <div style={{ fontFamily: T.font2, fontSize: 24, fontWeight: 700, letterSpacing: "-0.5px" }}>{venue.name}</div>
            <div><div style={{ color: T.gold, fontWeight: 700, fontSize: 15 }}>⭐ {venue.rating}</div><div style={{ fontSize: 11, color: T.t3, textAlign: "right" }}>({venue.reviews})</div></div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: T.t2, marginBottom: 16 }}>📍 {venue.location} · {venue.distance}</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
            {venue.badges.map(b => <span key={b} style={{ padding: "5px 12px", borderRadius: 8, fontSize: 11, fontWeight: 600, background: T.greenGlow, border: `1px solid rgba(0,200,83,0.3)`, color: T.green }}>{b}</span>)}
          </div>

          {/* Pricing */}
          <div className="glass-card" style={{ borderRadius: T.r, padding: 18, marginBottom: 16 }}>
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: T.green, marginBottom: 14 }}>🏷️ Tonight's Pricing</div>
            {[["Stag Entry", venue.stagPrice],["Couple Entry", venue.couplePrice],["Female Entry", venue.femalePrice]].map(([type, price]) => (
              <div key={type} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${T.border}` }}>
                <span style={{ fontSize: 13, color: T.t2, fontWeight: 500 }}>{type}</span>
                <span style={{ fontSize: 16, fontWeight: 700 }}>₹{price.toLocaleString()}</span>
              </div>
            ))}
            <div style={{ fontSize: 11, color: T.t3, marginTop: 12, paddingTop: 12, borderTop: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 6 }}>🥃 {venue.includes}</div>
          </div>

          {/* Info */}
          <div className="glass-card" style={{ borderRadius: T.r, padding: 18, marginBottom: 14 }}>
            {[["👗", "Dress Code", venue.dressCode],["🎵", "Music Tonight", `${venue.djTonight} · Live`],["🕐", "Hours", venue.openTime]].map(([icon, label, val]) => (
              <div key={label} style={{ display: "flex", gap: 10, padding: "10px 0", borderBottom: `1px solid ${T.border}` }}>
                <span style={{ fontSize: 14, color: T.green, width: 20, textAlign: "center", marginTop: 1 }}>{icon}</span>
                <div><div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px", color: T.t3, marginBottom: 3 }}>{label}</div><div style={{ fontSize: 13, lineHeight: 1.5 }}>{val}</div></div>
              </div>
            ))}
            <div style={{ display: "flex", gap: 10, padding: "10px 0" }}>
              <span style={{ fontSize: 14, color: T.green, width: 20, textAlign: "center", marginTop: 1 }}>🔥</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px", color: T.t3, marginBottom: 6 }}>Crowd Level</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ flex: 1, height: 5, background: "rgba(255,255,255,0.1)", borderRadius: 3, overflow: "hidden" }}><div style={{ width: `${venue.crowdLevel}%`, height: "100%", background: venue.crowdColor, borderRadius: 3 }} /></div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: venue.crowdColor }}>{venue.crowdLabel} {venue.crowdLevel}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px 20px 28px", background: `linear-gradient(to top, rgba(10,10,10,1) 60%, transparent)`, zIndex: 50 }}>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => navigate("booking")} style={{ flex: 2, padding: 16, background: T.green, color: "#000", border: "none", borderRadius: T.r, fontFamily: T.font, fontSize: 15, fontWeight: 700, boxShadow: `0 0 24px rgba(0,200,83,0.25)`, cursor: "pointer" }}>Book Guestlist</button>
          <div style={{ width: 52, background: T.card, border: `1.5px solid ${faved ? T.red : T.border}`, borderRadius: T.r, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 18, color: faved ? T.red : T.white, backdropFilter: "blur(10px)" }} onClick={() => setFaved(f => !f)}>{faved ? "♥" : "♡"}</div>
        </div>
      </div>
    </div>
  );
};

const BookingScreen = ({ venue, navigate }) => {
  const [activeDay, setActiveDay] = useState(1);
  const [entryType, setEntryType] = useState("stag");
  const [guests, setGuests] = useState(1);
  const days = [["Mon","24"],["Tue","25"],["Wed","26"],["Thu","27"],["Fri","28"],["Sat","29"]];
  const entryTypes = [{ id: "stag", label: "Stag", price: venue?.stagPrice || 1500 }, { id: "couple", label: "Couple", price: venue?.couplePrice || 2000 }, { id: "group", label: "Group", price: venue?.stagPrice ? venue.stagPrice - 300 : 1200 }];
  const total = entryTypes.find(e => e.id === entryType).price * guests + 99 + 30;

  return (
    <div className="screen-enter" style={{ height: "100%", position: "relative" }}>
      <div style={{ padding: "56px 20px 20px", display: "flex", alignItems: "center", gap: 14, borderBottom: `1px solid ${T.border}` }}>
        <div onClick={() => navigate("venue")} style={{ width: 40, height: 40, background: T.card, border: `1px solid ${T.border}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>←</div>
        <div>
          <div style={{ fontFamily: T.font2, fontSize: 20, fontWeight: 700 }}>Guestlist Booking</div>
          <div style={{ fontSize: 12, color: T.t2 }}>{venue?.name || "F Bar & Lounge"}</div>
        </div>
      </div>

      <div className="mscroll" style={{ paddingBottom: 20 }}>
        {/* Date picker */}
        <div className="no-scroll-x" style={{ display: "flex", gap: 10, padding: "20px 20px 0", marginBottom: 20 }}>
          {days.map(([d, n], i) => (
            <div key={i} onClick={() => setActiveDay(i)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "10px 14px", minWidth: 52, background: activeDay === i ? T.green : T.card, border: `1.5px solid ${activeDay === i ? T.green : T.border}`, borderRadius: T.rsm, cursor: "pointer", flexShrink: 0, backdropFilter: "blur(10px)", transition: "all 0.2s" }}>
              <div style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", color: activeDay === i ? "#000" : T.t3 }}>{d}</div>
              <div style={{ fontSize: 18, fontWeight: 800, fontFamily: T.font2, color: activeDay === i ? "#000" : T.white }}>{n}</div>
            </div>
          ))}
        </div>

        <div style={{ padding: "0 20px" }}>
          {/* Entry type */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px", color: T.t3, marginBottom: 10 }}>Entry Type</div>
            <div style={{ display: "flex", gap: 10 }}>
              {entryTypes.map(e => (
                <div key={e.id} onClick={() => setEntryType(e.id)} style={{ flex: 1, padding: "14px 10px", background: entryType === e.id ? T.greenGlow2 : T.card, border: `1.5px solid ${entryType === e.id ? T.green : T.border}`, borderRadius: T.r, cursor: "pointer", textAlign: "center", backdropFilter: "blur(10px)", transition: "all 0.2s" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{e.label}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: entryType === e.id ? T.green : T.t3 }}>₹{e.price.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Guests */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px", color: T.t3, marginBottom: 10 }}>Number of Guests</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: T.card, border: `1px solid ${T.border}`, borderRadius: T.r, padding: "14px 18px", backdropFilter: "blur(10px)" }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>Guests</div>
                <div style={{ fontSize: 11, color: T.t2, marginTop: 2 }}>Name must match ID at door</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div onClick={() => setGuests(g => Math.max(1, g - 1))} style={{ width: 36, height: 36, background: T.card2, border: `1px solid ${T.border}`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 18, fontWeight: 700, color: T.green, transition: "all 0.2s" }}>−</div>
                <div style={{ fontFamily: T.font2, fontSize: 22, fontWeight: 800, minWidth: 28, textAlign: "center" }}>{guests}</div>
                <div onClick={() => setGuests(g => Math.min(10, g + 1))} style={{ width: 36, height: 36, background: T.card2, border: `1px solid ${T.border}`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 18, fontWeight: 700, color: T.green, transition: "all 0.2s" }}>+</div>
              </div>
            </div>
          </div>

          {/* Guest name */}
          <Input label="Guest Name" placeholder="Full name as on ID" value="Rahul Sharma" />

          {/* Summary */}
          <div className="glass-card" style={{ borderRadius: T.r, padding: 18, marginBottom: 20 }}>
            {[["Entry", `₹${entryTypes.find(e => e.id === entryType).price.toLocaleString()} × ${guests}`],["Refundable deposit","₹99"],["Platform fee","₹30"]].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "6px 0" }}>
                <span style={{ color: T.t2 }}>{k}</span><span style={{ fontWeight: 600 }}>{v}</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 16, fontWeight: 800, paddingTop: 14, marginTop: 8, borderTop: `1px solid ${T.border}` }}>
              <span>Total</span><span style={{ color: T.green }}>₹{total.toLocaleString()}</span>
            </div>
          </div>

          <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: T.r, padding: 14, display: "flex", gap: 10, marginBottom: 20, backdropFilter: "blur(10px)" }}>
            <span style={{ color: T.green }}>ℹ️</span>
            <div style={{ fontSize: 12, color: T.t2, lineHeight: 1.6 }}>Free cancellation up to 4 hrs before. ₹99 deposit refunded as NightOut credit on check-in.</div>
          </div>
          <button onClick={() => navigate("payment")} style={{ width: "100%", padding: 16, background: T.green, color: "#000", border: "none", borderRadius: T.r, fontFamily: T.font, fontSize: 15, fontWeight: 700, boxShadow: `0 0 24px rgba(0,200,83,0.25)`, cursor: "pointer" }}>Confirm & Pay ₹{total.toLocaleString()}</button>
        </div>
      </div>
    </div>
  );
};

const PaymentScreen = ({ venue, navigate }) => {
  const [selected, setSelected] = useState(0);
  const methods = [
    { icon: "🔵", name: "UPI", sub: "GPay, PhonePe, Paytm", color: "rgba(0,100,255,0.1)" },
    { icon: "💳", name: "Credit / Debit Card", sub: "Visa, Mastercard, RuPay", color: "rgba(255,140,0,0.1)" },
    { icon: "🏦", name: "Net Banking", sub: "All major banks", color: "rgba(0,200,83,0.1)" },
    { icon: "👛", name: "Wallet", sub: "Paytm, Amazon Pay", color: "rgba(124,77,255,0.1)" },
  ];
  return (
    <div className="screen-enter" style={{ height: "100%", position: "relative" }}>
      <div style={{ padding: "56px 20px 20px", display: "flex", alignItems: "center", gap: 14, borderBottom: `1px solid ${T.border}` }}>
        <div onClick={() => navigate("booking")} style={{ width: 40, height: 40, background: T.card, border: `1px solid ${T.border}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>←</div>
        <div><div style={{ fontFamily: T.font2, fontSize: 20, fontWeight: 700 }}>Payment</div><div style={{ fontSize: 12, color: T.t2 }}>Secure checkout</div></div>
      </div>
      <div className="mscroll" style={{ paddingBottom: 20 }}>
        {/* Order summary */}
        <div className="glass-card" style={{ borderRadius: T.rlg, padding: 20, margin: "20px 20px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18, paddingBottom: 16, borderBottom: `1px solid ${T.border}` }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: T.greenGlow, border: `1px solid rgba(0,200,83,0.2)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>{venue?.emoji || "🎉"}</div>
            <div><div style={{ fontSize: 15, fontWeight: 700 }}>{venue?.name || "F Bar & Lounge"}</div><div style={{ fontSize: 12, color: T.t2, marginTop: 2 }}>Guestlist · Stag · 25 March 2026</div></div>
          </div>
          {[["Entry (1 person)","₹1,500"],["Deposit","₹99"],["Platform fee","₹30"],].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "7px 0", borderBottom: `1px solid rgba(255,255,255,0.04)` }}>
              <span style={{ color: T.t2 }}>{k}</span><span style={{ fontWeight: 600 }}>{v}</span>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 15, fontWeight: 800, paddingTop: 12, marginTop: 4 }}>
            <span>Total</span><span style={{ color: T.green }}>₹1,629</span>
          </div>
        </div>

        <div style={{ padding: "0 20px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px", color: T.t3, marginBottom: 12 }}>Choose Payment Method</div>
          {methods.map((m, i) => (
            <div key={m.name} onClick={() => setSelected(i)} style={{ display: "flex", alignItems: "center", gap: 14, padding: 16, background: selected === i ? "rgba(0,200,83,0.04)" : T.card, border: `1.5px solid ${selected === i ? T.green : T.border}`, borderRadius: T.r, cursor: "pointer", marginBottom: 10, backdropFilter: "blur(10px)", transition: "all 0.2s" }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: m.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{m.icon}</div>
              <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 600 }}>{m.name}</div><div style={{ fontSize: 11, color: T.t2, marginTop: 2 }}>{m.sub}</div></div>
              <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${selected === i ? T.green : T.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {selected === i && <div style={{ width: 10, height: 10, background: T.green, borderRadius: "50%", boxShadow: `0 0 8px ${T.green}` }} />}
              </div>
            </div>
          ))}
          <button onClick={() => navigate("qr")} style={{ width: "100%", padding: 16, background: T.green, color: "#000", border: "none", borderRadius: T.r, fontFamily: T.font, fontSize: 15, fontWeight: 700, boxShadow: `0 0 24px rgba(0,200,83,0.25)`, cursor: "pointer", marginTop: 4 }}>Pay ₹99 Deposit Now</button>
          <div style={{ textAlign: "center", fontSize: 11, color: T.t4, marginTop: 10, display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>🔒 Secured by Razorpay · 256-bit SSL</div>
        </div>
      </div>
    </div>
  );
};

const QRScreen = ({ venue, navigate }) => (
  <div className="screen-enter" style={{ height: "100%", position: "relative" }}>
    <div className="mscroll">
      <div style={{ padding: "72px 20px 28px", textAlign: "center" }}>
        <div className="qr-check-anim" style={{ width: 72, height: 72, background: T.greenGlow, border: `2px solid rgba(0,200,83,0.4)`, borderRadius: "50%", margin: "0 auto 18px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, color: T.green, boxShadow: "0 0 40px rgba(0,200,83,0.2)" }}>✓</div>
        <div style={{ fontFamily: T.font2, fontSize: 24, fontWeight: 700, marginBottom: 6 }}>Booking Confirmed!</div>
        <div style={{ fontSize: 13, color: T.t2 }}>Show this QR code at the venue entrance</div>
      </div>

      {/* QR Code */}
      <div style={{ background: "#fff", borderRadius: 20, padding: 24, margin: "0 20px 16px", display: "flex", flexDirection: "column", alignItems: "center", gap: 12, boxShadow: "0 0 0 1px rgba(0,200,83,0.15), 0 8px 40px rgba(0,0,0,0.5), 0 0 60px rgba(0,200,83,0.08)" }}>
        <svg viewBox="0 0 200 200" width="180" height="180" xmlns="http://www.w3.org/2000/svg">
          <rect width="200" height="200" fill="white"/>
          <rect x="12" y="12" width="56" height="56" rx="6" fill="#000"/><rect x="20" y="20" width="40" height="40" rx="3" fill="#fff"/><rect x="27" y="27" width="26" height="26" rx="2" fill="#000"/>
          <rect x="132" y="12" width="56" height="56" rx="6" fill="#000"/><rect x="140" y="20" width="40" height="40" rx="3" fill="#fff"/><rect x="147" y="27" width="26" height="26" rx="2" fill="#000"/>
          <rect x="12" y="132" width="56" height="56" rx="6" fill="#000"/><rect x="20" y="140" width="40" height="40" rx="3" fill="#fff"/><rect x="27" y="147" width="26" height="26" rx="2" fill="#000"/>
          <rect x="76" y="12" width="8" height="8" rx="1" fill="#000"/><rect x="88" y="12" width="8" height="8" rx="1" fill="#000"/><rect x="100" y="12" width="8" height="8" rx="1" fill="#000"/><rect x="120" y="12" width="8" height="8" rx="1" fill="#000"/>
          <rect x="76" y="24" width="8" height="8" rx="1" fill="#000"/><rect x="100" y="24" width="8" height="8" rx="1" fill="#000"/><rect x="112" y="24" width="8" height="8" rx="1" fill="#000"/>
          <rect x="12" y="76" width="8" height="8" rx="1" fill="#000"/><rect x="28" y="76" width="8" height="8" rx="1" fill="#000"/><rect x="76" y="76" width="8" height="8" rx="1" fill="#000"/><rect x="100" y="76" width="8" height="8" rx="1" fill="#000"/><rect x="132" y="76" width="8" height="8" rx="1" fill="#000"/><rect x="156" y="76" width="8" height="8" rx="1" fill="#000"/><rect x="180" y="76" width="8" height="8" rx="1" fill="#000"/>
          <rect x="12" y="92" width="8" height="8" rx="1" fill="#000"/><rect x="44" y="92" width="8" height="8" rx="1" fill="#000"/><rect x="76" y="92" width="8" height="8" rx="1" fill="#000"/><rect x="148" y="92" width="8" height="8" rx="1" fill="#000"/><rect x="172" y="92" width="8" height="8" rx="1" fill="#000"/>
          <rect x="28" y="108" width="8" height="8" rx="1" fill="#000"/><rect x="52" y="108" width="8" height="8" rx="1" fill="#000"/><rect x="108" y="108" width="8" height="8" rx="1" fill="#000"/><rect x="136" y="108" width="8" height="8" rx="1" fill="#000"/>
          <rect x="76" y="132" width="8" height="8" rx="1" fill="#000"/><rect x="100" y="132" width="8" height="8" rx="1" fill="#000"/><rect x="148" y="132" width="8" height="8" rx="1" fill="#000"/>
          <rect x="88" y="148" width="8" height="8" rx="1" fill="#000"/><rect x="160" y="148" width="8" height="8" rx="1" fill="#000"/>
          <rect x="84" y="84" width="32" height="32" rx="6" fill="#00C853"/>
          <text x="100" y="106" fontSize="18" fontWeight="800" fill="#000" textAnchor="middle" fontFamily="sans-serif">N</text>
        </svg>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>{venue?.name || "F Bar & Lounge"} — Guestlist</div>
        <div style={{ fontSize: 11, color: "#888" }}>Booking ID: NO-2026-84729</div>
      </div>

      {/* Backup code */}
      <div style={{ background: T.card, border: `1px dashed rgba(0,200,83,0.35)`, borderRadius: T.r, padding: 16, margin: "0 20px 16px", textAlign: "center", backdropFilter: "blur(10px)" }}>
        <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", color: T.t3, marginBottom: 8 }}>Backup Code</div>
        <div style={{ fontFamily: T.font2, fontSize: 30, fontWeight: 800, color: T.green, letterSpacing: 10, textShadow: `0 0 20px rgba(0,200,83,0.3)` }}>847 291</div>
      </div>

      {/* Details */}
      <div className="glass-card" style={{ borderRadius: T.r, padding: 18, margin: "0 20px 16px" }}>
        {[["Venue",venue?.name||"F Bar & Lounge"],["Date","Tue, 25 March 2026"],["Type","Guestlist — Stag"],["Guest","Rahul Sharma"],["Status","✓ Confirmed & Paid"]].map(([k, v]) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "8px 0", borderBottom: `1px solid ${T.border}` }}>
            <span style={{ color: T.t2 }}>{k}</span><span style={{ fontWeight: 600, color: k === "Status" ? T.green : T.white }}>{v}</span>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: 10, padding: "0 20px 30px" }}>
        {[["📤 Share"],["📍 Directions"],["📅 Bookings"]].map(([label], i) => (
          <button key={label} onClick={() => i === 2 && navigate("bookings")} style={{ flex: 1, padding: 13, background: T.card, border: `1px solid ${T.border}`, borderRadius: T.r, color: T.white, fontFamily: T.font, fontSize: 12, fontWeight: 600, cursor: "pointer", backdropFilter: "blur(10px)" }}>{label}</button>
        ))}
      </div>
    </div>
  </div>
);

const BookingsScreen = ({ navigate }) => {
  const [tab, setTab] = useState("upcoming");
  const filtered = userBookings.filter(b => b.status === tab);
  return (
    <div className="screen-enter" style={{ height: "100%", position: "relative" }}>
      <div style={{ padding: "56px 20px 20px" }}>
        <div style={{ fontFamily: T.font2, fontSize: 22, fontWeight: 700, marginBottom: 4 }}>My Bookings</div>
        <div style={{ fontSize: 13, color: T.t2 }}>Your upcoming & past nights out</div>
      </div>
      {/* Tabs */}
      <div style={{ display: "flex", background: T.card, border: `1px solid ${T.border}`, borderRadius: T.r, padding: 4, margin: "0 20px 20px", backdropFilter: "blur(10px)" }}>
        {["upcoming","past"].map(t => (
          <div key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: 10, textAlign: "center", fontSize: 13, fontWeight: 600, borderRadius: T.rsm, cursor: "pointer", background: tab === t ? T.green : "transparent", color: tab === t ? "#000" : T.t3, boxShadow: tab === t ? `0 0 14px rgba(0,200,83,0.3)` : "none", transition: "all 0.2s", textTransform: "capitalize" }}>{t}</div>
        ))}
      </div>
      <div className="mscroll" style={{ paddingBottom: 90, padding: "0 20px 90px" }}>
        {filtered.map(b => (
          <div key={b.id} className="glass-card hover-lift" style={{ borderRadius: T.rlg, overflow: "hidden", marginBottom: 16 }}>
            <div style={{ height: 110, background: b.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.5rem", position: "relative" }}>
              {b.emoji}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,transparent 20%,rgba(0,0,0,0.6))" }} />
              <span style={{ position: "absolute", top: 10, right: 10, padding: "3px 10px", borderRadius: 10, fontSize: 10, fontWeight: 700, background: b.status === "upcoming" ? "rgba(0,200,83,0.15)" : "rgba(176,176,176,0.1)", border: `1px solid ${b.status === "upcoming" ? T.green : "rgba(176,176,176,0.2)"}`, color: b.status === "upcoming" ? T.green : T.t2 }}>{b.status === "upcoming" ? "Confirmed" : "Completed"}</span>
            </div>
            <div style={{ padding: "14px 16px" }}>
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6, fontFamily: T.font2 }}>{b.venue}</div>
              <div style={{ display: "flex", gap: 14, marginBottom: 12 }}>
                {[[" 📅", b.date],[" 🕐", b.time],[" 👤", `${b.guests} Guest${b.guests > 1 ? "s" : ""}`]].map(([ic, val]) => (
                  <div key={ic} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: T.t2 }}>{ic} {val}</div>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 12, borderTop: `1px solid ${T.border}` }}>
                <div><div style={{ fontSize: 11, color: T.t3 }}>Total Paid</div><div style={{ fontSize: 15, fontWeight: 700, color: b.status === "upcoming" ? T.green : T.t2 }}>₹{b.amount.toLocaleString()}</div></div>
                {b.status === "upcoming"
                  ? <button onClick={() => navigate("qr")} style={{ padding: "9px 16px", background: T.green, color: "#000", border: "none", borderRadius: T.rsm, fontFamily: T.font, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>📱 View QR</button>
                  : <button style={{ padding: "9px 14px", background: "transparent", color: T.t2, border: `1px solid ${T.border}`, borderRadius: T.rsm, fontFamily: T.font, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Write Review ⭐</button>
                }
              </div>
            </div>
          </div>
        ))}
      </div>
      <MobNav active="bookings" navigate={navigate} />
    </div>
  );
};

const ProfileScreen = ({ navigate }) => (
  <div className="screen-enter" style={{ height: "100%", position: "relative" }}>
    <div className="mscroll" style={{ paddingBottom: 90 }}>
      {/* Header */}
      <div style={{ padding: "56px 20px 24px", background: `radial-gradient(ellipse at 50% 0%, rgba(0,200,83,0.07) 0%, transparent 60%)`, borderBottom: `1px solid ${T.border}`, marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
          <div style={{ width: 72, height: 72, borderRadius: 22, background: `linear-gradient(135deg,${T.green},#007A32)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, fontWeight: 800, color: "#000", flexShrink: 0, position: "relative", boxShadow: `0 0 30px rgba(0,200,83,0.3)` }}>
            RS
            <div style={{ position: "absolute", bottom: -4, right: -4, width: 22, height: 22, background: T.gold, borderRadius: "50%", border: `2px solid ${T.bg}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10 }}>👑</div>
          </div>
          <div>
            <div style={{ fontFamily: T.font2, fontSize: 20, fontWeight: 700, marginBottom: 3 }}>Rahul Sharma</div>
            <div style={{ fontSize: 13, color: T.t2 }}>+91 98765 43210 · <span style={{ color: T.green, fontWeight: 700 }}>✓ Verified</span></div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {[["12","Nights Out"],["8","Venues"],["5","Reviews"]].map(([n, l]) => (
            <div key={l}><div style={{ fontFamily: T.font2, fontSize: 22, fontWeight: 800, color: T.green, marginBottom: 2 }}>{n}</div><div style={{ fontSize: 11, color: T.t3, fontWeight: 500 }}>{l}</div></div>
          ))}
        </div>
      </div>

      {/* Gold card */}
      <div style={{ background: "linear-gradient(135deg,rgba(255,215,64,0.08),rgba(255,140,0,0.05))", border: "1px solid rgba(255,215,64,0.2)", borderRadius: T.rlg, padding: 18, margin: "0 20px 20px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }}>
        <div style={{ fontSize: "2rem" }}>👑</div>
        <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 700, color: T.gold }}>NightOut Gold</div><div style={{ fontSize: 12, color: "rgba(255,215,64,0.5)", marginTop: 2 }}>Priority entry · Exclusive deals · ₹299/mo</div></div>
        <div style={{ color: T.gold, fontSize: 18 }}>›</div>
      </div>

      {/* Menu */}
      {[
        { label: "Account", items: [["🎟️", "My Bookings", "2 upcoming", "bookings"],["❤️", "Favourites", "6 saved venues", "favorites"],["⭐", "My Reviews", "5 reviews written", null]] },
        { label: "Safety", items: [["📍", "Live Location", "Share with contacts", null],["🆘", "Emergency SOS", "3 contacts saved", null]] },
        { label: "App", items: [["⚙️", "Settings", "Notifications, privacy", null],["🚪", "Logout", "rahul.s@gmail.com", null]] },
      ].map(section => (
        <div key={section.label} style={{ padding: "0 20px", marginBottom: 20 }}>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", color: T.t4, marginBottom: 8 }}>{section.label}</div>
          {section.items.map(([icon, name, sub, target]) => (
            <div key={name} onClick={() => target && navigate(target)} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0", borderBottom: `1px solid rgba(255,255,255,0.04)`, cursor: target ? "pointer" : "default" }}>
              <div style={{ width: 38, height: 38, borderRadius: 11, background: name === "Logout" ? "rgba(255,82,82,0.1)" : T.greenGlow, border: `1px solid ${name === "Logout" ? "rgba(255,82,82,0.15)" : "rgba(0,200,83,0.15)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>{icon}</div>
              <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 600, color: name === "Logout" ? T.red : T.white }}>{name}</div><div style={{ fontSize: 11, color: T.t2, marginTop: 1 }}>{sub}</div></div>
              <div style={{ color: T.t4, fontSize: 14 }}>›</div>
            </div>
          ))}
        </div>
      ))}
      <div style={{ textAlign: "center", padding: "10px 20px 20px", fontSize: 11, color: T.t4 }}>NightOut v2.1.0 · Made with ♥ in India</div>
    </div>
    <MobNav active="profile" navigate={navigate} />
  </div>
);

const FavoritesScreen = ({ navigate, setSelectedVenue }) => (
  <div className="screen-enter" style={{ height: "100%", position: "relative" }}>
    <div style={{ padding: "56px 20px 20px" }}>
      <div style={{ fontFamily: T.font2, fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Saved Venues</div>
      <div style={{ fontSize: 13, color: T.t2 }}>6 venues in your wishlist</div>
    </div>
    <div className="mscroll" style={{ padding: "0 20px", paddingBottom: 90 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {venues.concat([
          { id: 5, name: "Neon Terrace", emoji: "🎶", gradient: "linear-gradient(135deg,#001a20,#002a33)", stagPrice: 1800, rating: 4.4 },
          { id: 6, name: "Pulse Club", emoji: "🎤", gradient: "linear-gradient(135deg,#1a001a,#300030)", stagPrice: 2000, rating: 4.6 },
        ]).map(v => (
          <div key={v.id} className="glass-card hover-scale" style={{ borderRadius: T.rlg, overflow: "hidden", cursor: "pointer" }} onClick={() => { setSelectedVenue(v); navigate("venue"); }}>
            <div style={{ height: 100, background: v.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.5rem", position: "relative" }}>
              {v.emoji}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,transparent 40%,rgba(0,0,0,0.6))" }} />
              <span style={{ position: "absolute", top: 8, right: 8, fontSize: 14, color: T.red, textShadow: `0 0 8px rgba(255,64,129,0.5)` }}>♥</span>
            </div>
            <div style={{ padding: "10px 12px" }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{v.name}</div>
              <div style={{ fontSize: 11, color: T.t2 }}>Stag <strong style={{ color: T.green }}>₹{v.stagPrice?.toLocaleString()}</strong></div>
              <div style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 11, color: T.gold, marginTop: 4 }}>⭐ {v.rating}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <MobNav active="favorites" navigate={navigate} />
  </div>
);

// ═══════════════════════════════════════════════════════
//  PHONE MOCKUP COMPONENT
// ═══════════════════════════════════════════════════════
const PhoneMockup = () => {
  const [screen, setScreen] = useState("splash");
  const [selectedVenue, setSelectedVenue] = useState(venues[0]);

  const navigate = useCallback((s) => setScreen(s), []);
  const screens = ["splash","login","home","search","venue","booking","payment","qr","bookings","profile","favorites"];

  const renderScreen = () => {
    const props = { navigate, venue: selectedVenue, setSelectedVenue };
    switch (screen) {
      case "splash": return <SplashScreen {...props} />;
      case "login": return <LoginScreen {...props} />;
      case "home": return <HomeScreen {...props} />;
      case "search": return <SearchScreen {...props} />;
      case "venue": return <VenueDetailScreen {...props} />;
      case "booking": return <BookingScreen {...props} />;
      case "payment": return <PaymentScreen {...props} />;
      case "qr": return <QRScreen {...props} />;
      case "bookings": return <BookingsScreen {...props} />;
      case "profile": return <ProfileScreen {...props} />;
      case "favorites": return <FavoritesScreen {...props} />;
      default: return <HomeScreen {...props} />;
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24, flexShrink: 0 }}>
      {/* Phone shell */}
      <div style={{ width: 390, height: 844, background: "#080808", borderRadius: 54, border: "1.5px solid rgba(255,255,255,0.12)", boxShadow: "0 0 0 8px rgba(255,255,255,0.02), 0 60px 120px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 80px rgba(0,200,83,0.06)", position: "relative", overflow: "hidden", flexShrink: 0 }}>
        {/* Dynamic island */}
        <div style={{ position: "absolute", top: 14, left: "50%", transform: "translateX(-50%)", width: 126, height: 36, background: "#000", borderRadius: 20, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <div style={{ width: 10, height: 10, background: "#1a1a1a", borderRadius: "50%", border: "1px solid #2a2a2a" }} />
          <div style={{ width: 44, height: 8, background: "#1a1a1a", borderRadius: 6 }} />
          <div style={{ width: 10, height: 10, background: "#1a1a1a", borderRadius: "50%", border: "1px solid #2a2a2a" }} />
        </div>
        {/* Status bar */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 56, display: "flex", alignItems: "flex-end", justifyContent: "space-between", padding: "0 28px 8px", fontSize: 12, fontWeight: 600, zIndex: 100, pointerEvents: "none" }}>
          <span>9:41</span>
          <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11 }}>
            <span>▐▐▐</span><span>WiFi</span><span>🔋</span>
          </div>
        </div>
        {/* Screen content */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          {renderScreen()}
        </div>
      </div>

      {/* Screen navigation pills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", maxWidth: 420 }}>
        {screens.map(s => (
          <button key={s} onClick={() => setScreen(s)} style={{ padding: "6px 13px", borderRadius: 20, fontSize: 11, fontWeight: 600, color: screen === s ? T.green : T.t3, background: screen === s ? T.greenGlow : T.card, border: `1px solid ${screen === s ? T.green : T.border}`, cursor: "pointer", backdropFilter: "blur(10px)", transition: "all 0.2s", textTransform: "capitalize" }}>{s}</button>
        ))}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════
//  LANDING PAGE
// ═══════════════════════════════════════════════════════
const LandingPage = ({ switchView }) => (
  <div style={{ minHeight: "100vh", background: T.bg, position: "relative", overflow: "hidden" }}>
    {/* Ambient blobs */}
    {[["600px","600px","rgba(0,200,83,0.07)","-200px","-200px","amb-glow-1"],["500px","500px","rgba(124,77,255,0.07)","20%","-150px","amb-glow-2"],["400px","400px","rgba(0,229,255,0.05)","60%","10%","amb-glow-3"]].map(([w,h,c,t,l,cls]) => (
      <div key={cls} className={cls} style={{ position: "absolute", width: w, height: h, background: `radial-gradient(circle, ${c} 0%, transparent 70%)`, top: t, left: l, pointerEvents: "none" }} />
    ))}

    <div style={{ maxWidth: 1400, margin: "0 auto", padding: "120px 80px 80px", position: "relative", zIndex: 1 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 80 }}>
        {/* Left */}
        <div style={{ flex: 1, maxWidth: 560 }} className="fade-in">
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: T.glass, border: "1px solid rgba(0,200,83,0.2)", borderRadius: 30, padding: "6px 16px", fontSize: 12, fontWeight: 600, color: T.green, letterSpacing: 1, textTransform: "uppercase", marginBottom: 28, backdropFilter: "blur(10px)" }}>
            <div className="live-dot" style={{ width: 6, height: 6, background: T.green, borderRadius: "50%", boxShadow: `0 0 8px ${T.green}` }} />
            Live Demo — v2.1.0
          </div>
          <h1 style={{ fontFamily: T.font2, fontSize: "clamp(42px,5vw,70px)", fontWeight: 700, lineHeight: 1.08, letterSpacing: "-2px", marginBottom: 20 }}>
            <div>India's First</div>
            <div style={{ background: `linear-gradient(135deg,${T.green} 0%,${T.cyan} 50%,${T.purple} 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Nightlife OS</div>
            <div style={{ color: T.t2 }}>— Built for You</div>
          </h1>
          <p style={{ fontSize: 17, color: T.t2, lineHeight: 1.7, marginBottom: 40, fontWeight: 400 }}>
            Discover top clubs, book guaranteed entry with a QR code, and get home safe. NightOut is the complete nightlife stack — for guests, venues, and operators.
          </p>
          <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 48, flexWrap: "wrap" }}>
            <button className="hover-lift" style={{ padding: "16px 32px", borderRadius: 50, fontSize: 15, fontWeight: 700, background: T.green, color: "#000", border: "none", boxShadow: `0 0 30px rgba(0,200,83,0.3)`, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>📱 Try Live Demo</button>
            <button onClick={() => switchView("vendor")} className="hover-lift" style={{ padding: "16px 32px", borderRadius: 50, fontSize: 15, fontWeight: 700, background: T.card, color: T.white, border: `1px solid ${T.border}`, cursor: "pointer", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", gap: 8 }}>📊 Vendor Portal</button>
          </div>
          <div style={{ display: "flex", gap: 32 }}>
            {[["200+","Venues"],["50K+","Bookings"],["12","Cities"],["4.8★","App Rating"]].map(([n, l]) => (
              <div key={l}><div style={{ fontFamily: T.font2, fontSize: 28, fontWeight: 700, color: T.green, lineHeight: 1, marginBottom: 4 }}>{n}</div><div style={{ fontSize: 12, color: T.t3, fontWeight: 500 }}>{l}</div></div>
            ))}
          </div>
        </div>
        {/* Right — phone */}
        <PhoneMockup />
      </div>
    </div>

    {/* Features section */}
    <div style={{ maxWidth: 1400, margin: "0 auto", padding: "40px 80px 100px", position: "relative", zIndex: 1 }}>
      <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: T.green, marginBottom: 12 }}>How It Works</div>
      <div style={{ fontFamily: T.font2, fontSize: 38, fontWeight: 700, letterSpacing: "-1px", marginBottom: 50 }}>Three steps to your <span style={{ color: T.green }}>perfect night</span></div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
        {[
          { icon: "🧭", color: T.green, step: "01", title: "Discover Tonight", desc: "Browse live venues with real-time crowd levels, pricing, and DJ info. AI recommends based on your taste and budget.", cta: "Explore venues" },
          { icon: "🎫", color: T.purple2, step: "02", title: "Book & Pay in 60s", desc: "Select date, entry type, guests. Pay via UPI/card instantly. Get offline-capable QR ticket + backup code.", cta: "Book now" },
          { icon: "📱", color: T.cyan, step: "03", title: "Walk In. No Queue.", desc: "Show QR at the door. Works offline. Bouncer scans, you're in. Live location sharing keeps you safe.", cta: "See safety features" },
        ].map(f => (
          <div key={f.step} className="glass-card hover-lift" style={{ borderRadius: 28, padding: 32, position: "relative", overflow: "hidden", cursor: "pointer" }}>
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, rgba(${f.color === T.green ? "0,200,83" : f.color === T.purple2 ? "124,77,255" : "0,229,255"},0.04) 0%, transparent 60%)`, opacity: 0, transition: "opacity 0.3s" }} onMouseEnter={e => e.currentTarget.style.opacity = 1} onMouseLeave={e => e.currentTarget.style.opacity = 0} />
            <div style={{ width: 56, height: 56, borderRadius: 16, background: `rgba(${f.color === T.green ? "0,200,83" : f.color === T.purple2 ? "124,77,255" : "0,229,255"},0.12)`, border: `1px solid rgba(${f.color === T.green ? "0,200,83" : f.color === T.purple2 ? "124,77,255" : "0,229,255"},0.2)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 20 }}>{f.icon}</div>
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", color: T.t3, marginBottom: 10 }}>Step {f.step}</div>
            <div style={{ fontFamily: T.font2, fontSize: 20, fontWeight: 700, marginBottom: 10 }}>{f.title}</div>
            <div style={{ fontSize: 14, color: T.t2, lineHeight: 1.7 }}>{f.desc}</div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, marginTop: 20, color: f.color }}>
              {f.cta} →
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════
//  VENDOR DASHBOARD
// ═══════════════════════════════════════════════════════
const VendorDashboard = () => {
  const [panel, setPanel] = useState("overview");
  const [scanResult, setScanResult] = useState(null);
  const [pricingToast, setPricingToast] = useState(false);

  const navItems = [
    { section: "Operations", items: [["overview","📊","Overview"],["bookings","📅","Booking Manager",3],["guestlist","✅","Guestlist"],["scanner","📱","QR Scanner"]] },
    { section: "Management", items: [["analytics","📈","Analytics"],["venues","🏪","Edit Venue"],["pricing","🏷️","Pricing Manager"]] },
    { section: "Account", items: [["settings","⚙️","Settings"]] },
  ];

  const showPanel = (p) => setPanel(p);
  const triggerScan = () => setScanResult("valid");

  const showPricingToast = () => {
    setPricingToast(true);
    setTimeout(() => setPricingToast(false), 3500);
  };

  const sidebarWidth = 260;

  const PanelHeader = ({ title, sub, actions }) => (
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 32 }}>
      <div>
        <div style={{ fontFamily: T.font2, fontSize: 26, fontWeight: 700, letterSpacing: "-0.5px", marginBottom: 4 }}>{title}</div>
        <div style={{ fontSize: 14, color: T.t3 }}>{sub}</div>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        {actions?.map(([label, variant]) => <Btn key={label} variant={variant} small>{label}</Btn>)}
      </div>
    </div>
  );

  const panels = {
    overview: () => (
      <div className="fade-in">
        <PanelHeader title="Today's Overview" sub="Tuesday, 25 March 2026 · Live" actions={[["Export","ghost"],["+ New Event","primary"]]} />
        {/* Alerts */}
        <div style={{ marginBottom: 24, display: "flex", flexDirection: "column", gap: 10 }}>
          {[["warn","⚠️","Pricing not set for Friday","Update to avoid losing bookings"],["error","🚨","1 complaint awaiting","48-hr SLA · Respond now to maintain rating"]].map(([type, icon, title, sub]) => (
            <div key={title} style={{ display: "flex", alignItems: "flex-start", gap: 12, background: T.card, border: `1px solid ${type === "warn" ? "rgba(255,215,64,0.2)" : "rgba(255,82,82,0.2)"}`, borderLeft: `3px solid ${type === "warn" ? T.gold : T.red}`, borderRadius: T.r, padding: "14px 16px" }}>
              <span>{icon}</span>
              <div><div style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{title}</div><div style={{ fontSize: 12, color: T.t2 }}>{sub}</div></div>
            </div>
          ))}
        </div>
        {/* KPIs */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18, marginBottom: 28 }}>
          <KpiCard icon="🎟️" label="Bookings Tonight" value="47" change="+12% vs last Tue" accentColor={T.green} />
          <KpiCard icon="✅" label="Checked In" value="23" change="of 47 confirmed" changeUp={false} accentColor={T.purple} />
          <KpiCard icon="💰" label="Est. Revenue" value="₹2.8L" change="+8% vs avg" accentColor={T.gold} />
          <KpiCard icon="⭐" label="Avg Rating" value="4.5" change="+0.2 this month" accentColor={T.gold} />
        </div>
        {/* Charts */}
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 18, marginBottom: 28 }}>
          <div className="glass-card" style={{ borderRadius: T.rlg, padding: 22 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div><div style={{ fontFamily: T.font2, fontSize: 15, fontWeight: 700, marginBottom: 3 }}>Bookings This Week</div><div style={{ fontSize: 12, color: T.t3 }}>Daily breakdown</div></div>
              <div style={{ display: "flex", gap: 4 }}>
                {["Week","Month","Year"].map(p => <button key={p} style={{ padding: "4px 10px", borderRadius: 6, fontSize: 11, fontWeight: 600, color: p === "Week" ? T.green : T.t3, background: p === "Week" ? T.greenGlow : "transparent", border: `1px solid ${p === "Week" ? T.green : T.border}`, cursor: "pointer" }}>{p}</button>)}
              </div>
            </div>
            <BarChart data={analyticsData.weeklyBookings} labels={analyticsData.days} />
          </div>
          <div className="glass-card" style={{ borderRadius: T.rlg, padding: 22 }}>
            <div style={{ fontFamily: T.font2, fontSize: 15, fontWeight: 700, marginBottom: 20 }}>Booking Types</div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
              <svg viewBox="0 0 120 120" width="160" height="160">
                <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="18"/>
                <circle cx="60" cy="60" r="50" fill="none" stroke="#00C853" strokeWidth="18" strokeDasharray="213.6 100" strokeLinecap="round" transform="rotate(-90 60 60)"/>
                <circle cx="60" cy="60" r="50" fill="none" stroke="#7C4DFF" strokeWidth="18" strokeDasharray="53.4 260.2" strokeDashoffset="-213.6" strokeLinecap="round" transform="rotate(-90 60 60)"/>
                <circle cx="60" cy="60" r="50" fill="none" stroke="#FFD740" strokeWidth="18" strokeDasharray="47 266.6" strokeDashoffset="-267" strokeLinecap="round" transform="rotate(-90 60 60)"/>
                <text x="60" y="56" textAnchor="middle" fontSize="14" fontWeight="800" fill="white" fontFamily="sans-serif">47</text>
                <text x="60" y="70" textAnchor="middle" fontSize="7" fill="#707070" fontFamily="sans-serif">bookings</text>
              </svg>
              <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 10 }}>
                {[["#00C853","Guestlist","32","68%"],["#7C4DFF","Tables","8","17%"],["#FFD740","Events","7","15%"]].map(([color, label, val, pct]) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 10, height: 10, borderRadius: 3, background: color, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: T.t2, flex: 1 }}>{label}</span>
                    <span style={{ fontSize: 13, fontWeight: 700 }}>{val}</span>
                    <span style={{ fontSize: 11, color: T.t3 }}>{pct}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Check-in bar */}
        <div className="glass-card" style={{ borderRadius: T.rlg, padding: 22 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div><div style={{ fontFamily: T.font2, fontSize: 15, fontWeight: 700, marginBottom: 3 }}>Tonight's Check-in Progress</div><div style={{ fontSize: 12, color: T.t3 }}>Live · updates every 30s</div></div>
            <div style={{ fontFamily: T.font2, fontSize: 22, fontWeight: 800, color: T.green }}>23 / 47</div>
          </div>
          <div style={{ width: "100%", height: 12, background: "rgba(255,255,255,0.06)", borderRadius: 8, overflow: "hidden", marginBottom: 10 }}>
            <div style={{ width: "49%", height: "100%", background: `linear-gradient(to right,${T.green},${T.green2})`, borderRadius: 8, boxShadow: `0 0 16px rgba(0,200,83,0.3)` }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: T.t3 }}>
            <span><span style={{ color: T.green, fontWeight: 700 }}>49%</span> checked in</span>
            <span>Expected footfall: 120–150 guests</span>
          </div>
        </div>
      </div>
    ),

    bookings: () => (
      <div className="fade-in">
        <PanelHeader title="Booking Manager" sub="All bookings for tonight · 47 total" actions={[["Export CSV","ghost"]]} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 24 }}>
          <KpiCard icon="📋" label="Total Bookings" value="47" accentColor={T.green} />
          <KpiCard icon="✅" label="Checked In" value="23" accentColor={T.purple} />
          <KpiCard icon="❌" label="No-Shows" value="3" accentColor={T.red} />
        </div>
        <div className="glass-card" style={{ borderRadius: T.rlg, overflow: "hidden" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 22px", borderBottom: `1px solid ${T.border}` }}>
            <div style={{ fontFamily: T.font2, fontSize: 15, fontWeight: 700 }}>Tonight's Guestlist</div>
            <input placeholder="🔍 Search guests..." style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 8, padding: "8px 14px", color: T.white, fontSize: 13, fontFamily: T.font, width: 220 }}
              onFocus={e => e.target.style.borderColor = T.green}
              onBlur={e => e.target.style.borderColor = T.border}
            />
          </div>
          <table>
            <thead><tr><th>Guest Name</th><th>Contact</th><th>Type</th><th>Guests</th><th>Amount</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {bookings.map(b => (
                <tr key={b.id}>
                  <td><strong>{b.guest}</strong></td>
                  <td style={{ color: T.t2 }}>{b.phone}</td>
                  <td>{b.type}</td>
                  <td>{b.guests}</td>
                  <td>{b.amount ? `₹${b.amount.toLocaleString()}` : "—"}</td>
                  <td><StatusPill status={b.status} /></td>
                  <td>{b.status === "Confirmed" && <button onClick={() => showPanel("scanner")} style={{ padding: "5px 12px", borderRadius: 6, fontSize: 11, fontWeight: 700, border: `1px solid ${T.green}`, background: "transparent", color: T.green, cursor: "pointer", fontFamily: T.font }}>Check In</button>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),

    guestlist: () => (
      <div className="fade-in">
        <PanelHeader title="Guestlist" sub="Tonight's entry log" actions={[["Print List","ghost"],["Open Scanner","primary"]]} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 24 }}>
          <KpiCard icon="📋" label="Total Booked" value="47" accentColor={T.green} />
          <KpiCard icon="✅" label="Checked In" value="23" accentColor={T.green} />
          <KpiCard icon="⏳" label="Still Expected" value="21" accentColor={T.gold} />
        </div>
        <div className="glass-card" style={{ borderRadius: T.rlg, overflow: "hidden" }}>
          <div style={{ padding: "18px 22px", borderBottom: `1px solid ${T.border}` }}><div style={{ fontFamily: T.font2, fontSize: 15, fontWeight: 700 }}>Entry Log</div></div>
          <table>
            <thead><tr><th>Time</th><th>Guest</th><th>Type</th><th>Guests</th><th>Checked In By</th></tr></thead>
            <tbody>
              {[["9:04 PM","Rahul Sharma","Stag",1,"Vikram (Bouncer)"],["9:12 PM","Rohan Mehra","Stag",1,"QR Scan"],["9:18 PM","Vikram & Neha","Couple",2,"QR Scan"],["9:31 PM","Riya Gupta","Stag",1,"Manual"],["9:45 PM","Karan Shah","Couple",2,"QR Scan"]].map(([time, guest, type, g, by]) => (
                <tr key={time}><td style={{ color: T.t2 }}>{time}</td><td><strong>{guest}</strong></td><td>{type}</td><td>{g}</td><td>{by}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),

    scanner: () => (
      <div className="fade-in">
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 32 }}>
          <div><div style={{ fontFamily: T.font2, fontSize: 26, fontWeight: 700, letterSpacing: "-0.5px", marginBottom: 4 }}>QR Scanner</div><div style={{ fontSize: 14, color: T.t3 }}>Bouncer mode · Scan guest tickets at the door</div></div>
          <div style={{ fontSize: 14, color: T.green, fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}><div className="live-dot" style={{ width: 8, height: 8, background: T.green, borderRadius: "50%", boxShadow: `0 0 8px ${T.green}` }} />Scanned tonight: 23</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <div className="glass-card" style={{ borderRadius: T.rlg, padding: 22 }}>
            <div style={{ fontFamily: T.font2, fontSize: 15, fontWeight: 700, marginBottom: 20 }}>Camera Scanner</div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24, padding: "20px 0" }}>
              <div style={{ width: 300, height: 300, background: T.card, border: `2px solid ${T.border}`, borderRadius: 24, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(10px)", overflow: "hidden" }}>
                {[["tl","top:14px;left:14px;border-top:3px solid;border-left:3px solid;border-radius:4px 0 0 0"],["tr","top:14px;right:14px;border-top:3px solid;border-right:3px solid;border-radius:0 4px 0 0"],["bl","bottom:14px;left:14px;border-bottom:3px solid;border-left:3px solid;border-radius:0 0 0 4px"],["br","bottom:14px;right:14px;border-bottom:3px solid;border-right:3px solid;border-radius:0 0 4px 0"]].map(([k, s]) => (
                  <div key={k} style={{ position: "absolute", width: 32, height: 32, borderColor: T.green, ...Object.fromEntries(s.split(";").filter(Boolean).map(p => { const [k, v] = p.split(":"); return [k.trim().replace(/-([a-z])/g, g => g[1].toUpperCase()), v.trim()]; })) }} />
                ))}
                <div className="scan-line" style={{ position: "absolute", width: "70%", height: 2, background: `linear-gradient(to right, transparent, ${T.green}, transparent)`, boxShadow: `0 0 10px rgba(0,200,83,0.5)` }} />
                <div style={{ textAlign: "center", color: T.t4, fontSize: 14, lineHeight: 1.8 }}>📱<br/>Point at guest QR</div>
              </div>
              <div style={{ textAlign: "center", width: "100%" }}>
                <div style={{ fontSize: 13, color: T.t2, marginBottom: 10 }}>Or enter backup code manually:</div>
                <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
                  <input placeholder="6-digit code" maxLength={6} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 8, padding: "10px 14px", color: T.white, fontSize: 14, fontFamily: T.font, width: 160, textAlign: "center", letterSpacing: 4 }}
                    onFocus={e => e.target.style.borderColor = T.green}
                    onBlur={e => e.target.style.borderColor = T.border}
                  />
                  <button onClick={triggerScan} style={{ padding: "10px 20px", background: T.green, color: "#000", border: "none", borderRadius: 8, fontFamily: T.font, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Verify</button>
                </div>
              </div>
            </div>
          </div>
          <div className="glass-card" style={{ borderRadius: T.rlg, padding: 22 }}>
            <div style={{ fontFamily: T.font2, fontSize: 15, fontWeight: 700, marginBottom: 20 }}>Scan Result</div>
            {!scanResult ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 280, color: T.t4, textAlign: "center" }}>
                <div style={{ fontSize: "3rem", marginBottom: 16 }}>📱</div>
                <div style={{ fontSize: 14 }}>Scan a QR or enter a backup code</div>
              </div>
            ) : (
              <div className="fade-in" style={{ background: "rgba(0,200,83,0.04)", border: `2px solid ${T.green}`, borderRadius: T.rlg, padding: 24, textAlign: "center" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
                <div style={{ fontFamily: T.font2, fontSize: 22, fontWeight: 800, color: T.green, marginBottom: 16 }}>VALID — ADMIT</div>
                {[["Guest","Priya & Arjun"],["Type","Couple Guestlist"],["Guests","2 people"],["Payment","PAID ✓"]].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 14, padding: "6px 0", borderBottom: `1px solid ${T.border}` }}>
                    <span style={{ color: T.t2 }}>{k}</span>
                    <span style={{ fontWeight: 700, color: k === "Payment" ? T.green : T.white }}>{v}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    ),

    analytics: () => (
      <div className="fade-in">
        <PanelHeader title="Analytics" sub="March 2026 · Performance overview" actions={[["Last 30 days","ghost"],["PDF Report","ghost"]]} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18, marginBottom: 28 }}>
          <KpiCard icon="📋" label="Total Bookings" value="842" change="+23%" accentColor={T.green} />
          <KpiCard icon="✅" label="Check-in Rate" value="91%" change="+4%" accentColor={T.purple} />
          <KpiCard icon="💰" label="Est. Revenue" value="₹38L" change="+18%" accentColor={T.gold} />
          <KpiCard icon="⭐" label="Avg Rating" value="4.5" change="+0.3" accentColor={T.gold} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 18, marginBottom: 24 }}>
          <div className="glass-card" style={{ borderRadius: T.rlg, padding: 22 }}>
            <div style={{ fontFamily: T.font2, fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Revenue This Week</div>
            <div style={{ fontSize: 12, color: T.t3, marginBottom: 20 }}>Daily estimated revenue (₹L)</div>
            <BarChart data={analyticsData.weeklyRevenue} labels={analyticsData.days} color={T.purple} color2={T.purple2} />
          </div>
          <div className="glass-card" style={{ borderRadius: T.rlg, padding: 22 }}>
            <div style={{ fontFamily: T.font2, fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Competitor Benchmark</div>
            <table>
              <thead><tr><th>Metric</th><th>Us</th><th>City Avg</th></tr></thead>
              <tbody>
                {[["Cover Charge","₹1,500","+15% above"],["Rating","4.5 ⭐","+0.3 above"],["Check-in","91%","+13% above"],["Monthly Bkgs","842","+65% above"]].map(([m, us, diff]) => (
                  <tr key={m}><td style={{ color: T.t2 }}>{m}</td><td style={{ fontWeight: 700 }}>{us}</td><td style={{ color: T.green, fontWeight: 600 }}>{diff}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="glass-card" style={{ borderRadius: T.rlg, padding: 22 }}>
          <div style={{ fontFamily: T.font2, fontSize: 15, fontWeight: 700, marginBottom: 6 }}>Rating Breakdown</div>
          <div style={{ fontSize: 12, color: T.t3, marginBottom: 16 }}>Based on 312 reviews</div>
          <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
            <div style={{ fontFamily: T.font2, fontSize: 48, fontWeight: 800, color: T.gold }}>4.5</div>
            <div style={{ flex: 1 }}>
              {[[5,62],[4,24],[3,8],[2,4],[1,2]].map(([stars, pct]) => (
                <div key={stars} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <span style={{ fontSize: 12, color: T.t2, minWidth: 50 }}>{stars} ★</span>
                  <div style={{ flex: 1, height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 4, overflow: "hidden" }}>
                    <div style={{ width: `${pct}%`, height: "100%", background: T.gold, borderRadius: 4 }} />
                  </div>
                  <span style={{ fontSize: 11, color: T.t3, minWidth: 30, textAlign: "right" }}>{pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),

    venues: () => (
      <div className="fade-in">
        <PanelHeader title="Edit Venue" sub="Update your NightOut listing" actions={[["Save Changes","primary"]]} />
        <div className="glass-card" style={{ borderRadius: T.rlg, padding: 22, marginBottom: 20 }}>
          <div style={{ fontFamily: T.font2, fontSize: 15, fontWeight: 700, marginBottom: 20 }}>Basic Information</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
            {[["Venue Name","F Bar & Lounge"],["Category","Nightclub"],["City","Jaipur"],["Capacity","350"]].map(([label, val]) => (
              <Input key={label} label={label} value={val} />
            ))}
            <div style={{ gridColumn: "span 2" }}><Input label="Address" value="MI Road, Jaipur, Rajasthan 302001" /></div>
          </div>
        </div>
        <div className="glass-card" style={{ borderRadius: T.rlg, padding: 22 }}>
          <div style={{ fontFamily: T.font2, fontSize: 15, fontWeight: 700, marginBottom: 20 }}>Amenities</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {[["Parking",true],["Valet",true],["Dance Floor",true],["Rooftop",false],["Hookah",false],["VIP Lounge",false]].map(([am, on]) => (
              <div key={am} style={{ padding: "8px 16px", background: on ? T.greenGlow : T.card, border: `1px solid ${on ? "rgba(0,200,83,0.3)" : T.border}`, borderRadius: 10, fontSize: 13, fontWeight: 600, color: on ? T.green : T.t3, cursor: "pointer", transition: "all 0.2s" }}>{on ? "✓" : "+"} {am}</div>
            ))}
          </div>
        </div>
      </div>
    ),

    pricing: () => (
      <div className="fade-in">
        <PanelHeader title="Pricing Manager" sub="Changes go live on the app instantly" actions={[["Publish Live","primary"]]} />
        <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
          {["Weekday","Friday","Saturday","Sunday","Special Event"].map((d, i) => (
            <button key={d} onClick={i === 0 ? showPricingToast : undefined} style={{ padding: "8px 16px", borderRadius: 6, fontSize: 12, fontWeight: 600, color: i === 0 ? T.green : T.t3, background: i === 0 ? T.greenGlow : "transparent", border: `1px solid ${i === 0 ? T.green : T.border}`, cursor: "pointer" }}>{d}</button>
          ))}
        </div>
        <div className="glass-card" style={{ borderRadius: T.rlg, padding: 22, marginBottom: 20 }}>
          <div style={{ fontFamily: T.font2, fontSize: 15, fontWeight: 700, marginBottom: 20 }}>Weekday Pricing (Mon–Thu)</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
            {[["Stag Entry (₹)","1500"],["Couple Entry (₹)","2000"],["Female Entry (₹)","800"],["Includes","2 Drinks"]].map(([l, v]) => <Input key={l} label={l} value={v} />)}
            <div style={{ gridColumn: "span 2" }}><Input label="Dress Code" value="Smart casual · No shorts, flip-flops, or sportswear" /></div>
          </div>
          <button onClick={showPricingToast} style={{ padding: "12px 28px", background: T.green, color: "#000", border: "none", borderRadius: T.r, fontFamily: T.font, fontSize: 14, fontWeight: 700, cursor: "pointer", boxShadow: `0 0 20px rgba(0,200,83,0.2)` }}>Save & Publish Live</button>
          {pricingToast && <div className="fade-in" style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 16, background: T.greenGlow, border: `1px solid rgba(0,200,83,0.3)`, borderRadius: T.r, padding: "14px 20px", color: T.green, fontWeight: 600, fontSize: 14 }}>✓ Pricing updated! Now visible to users in the NightOut app.</div>}
        </div>
        <div className="glass-card" style={{ borderRadius: T.rlg, overflow: "hidden" }}>
          <div style={{ padding: "18px 22px", borderBottom: `1px solid ${T.border}` }}><div style={{ fontFamily: T.font2, fontSize: 15, fontWeight: 700 }}>Pricing History</div></div>
          <table>
            <thead><tr><th>Date</th><th>Stag</th><th>Couple</th><th>Female</th><th>Changed By</th></tr></thead>
            <tbody>
              {[["25 Mar","₹1,500","₹2,000","₹800","Vikram (Manager)"],["21 Mar","₹2,000","₹2,500","₹1,000","Amit Kumar (Owner)"],["14 Mar","₹1,500","₹2,000","₹800","Vikram (Manager)"]].map(([d,...rest]) => (
                <tr key={d}><td style={{ color: T.t2 }}>{d}</td>{rest.map((v, i) => <td key={i} style={{ fontWeight: i < 3 ? 700 : 400 }}>{v}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),

    settings: () => (
      <div className="fade-in">
        <PanelHeader title="Settings" sub="Manage your account and preferences" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div className="glass-card" style={{ borderRadius: T.rlg, padding: 22 }}>
            <div style={{ fontFamily: T.font2, fontSize: 15, fontWeight: 700, marginBottom: 20 }}>Account Details</div>
            {[["Full Name","Amit Kumar"],["Email","amit@fbar.in"],["Phone","+91 98765 00000"]].map(([l, v]) => <Input key={l} label={l} value={v} />)}
            <Btn variant="primary" full>Save Account</Btn>
          </div>
          <div className="glass-card" style={{ borderRadius: T.rlg, padding: 22 }}>
            <div style={{ fontFamily: T.font2, fontSize: 15, fontWeight: 700, marginBottom: 20 }}>Notifications</div>
            {[["New Bookings","Get notified for each booking",true],["Daily Summary","End-of-day performance email",true],["Complaints","Alert when complaint received",false]].map(([name, sub, on]) => (
              <div key={name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <div><div style={{ fontSize: 14, fontWeight: 600 }}>{name}</div><div style={{ fontSize: 12, color: T.t2, marginTop: 2 }}>{sub}</div></div>
                <div style={{ width: 44, height: 24, background: on ? T.green : T.card, border: `1px solid ${on ? T.green : T.border}`, borderRadius: 12, cursor: "pointer", position: "relative", transition: "all 0.2s" }}>
                  <div style={{ position: "absolute", top: 3, [on ? "right" : "left"]: 3, width: 18, height: 18, background: on ? "#000" : "rgba(255,255,255,0.2)", borderRadius: "50%", transition: "all 0.2s" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", paddingTop: 74 }}>
      {/* Sidebar */}
      <div style={{ width: sidebarWidth, minWidth: sidebarWidth, background: "rgba(10,10,10,0.9)", borderRight: `1px solid ${T.border}`, display: "flex", flexDirection: "column", padding: "28px 0", position: "sticky", top: 74, height: `calc(100vh - 74px)`, overflowY: "auto" }}>
        <div style={{ padding: "0 24px 24px", borderBottom: `1px solid ${T.border}`, marginBottom: 16 }}>
          <div style={{ fontFamily: T.font2, fontSize: 22, fontWeight: 700, color: T.green }}>NightOut</div>
          <div style={{ fontSize: 11, color: T.t3, marginTop: 4, fontWeight: 500 }}>Vendor Portal · v2.1</div>
        </div>
        <div style={{ padding: "0 24px 20px", borderBottom: `1px solid ${T.border}`, marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>F Bar & Lounge</div>
          <div style={{ fontSize: 12, color: T.t3, marginBottom: 8 }}>MI Road, Jaipur</div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 10, fontWeight: 700, color: T.green, background: T.greenGlow, border: `1px solid rgba(0,200,83,0.2)`, padding: "3px 10px", borderRadius: 10 }}>✓ Rainbow Verified</div>
        </div>

        {navItems.map(({ section, items }) => (
          <div key={section}>
            <div style={{ padding: "8px 24px 4px", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", color: T.t4 }}>{section}</div>
            {items.map(([id, icon, label, badge]) => (
              <div key={id} onClick={() => showPanel(id)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 24px", cursor: "pointer", fontSize: 13, fontWeight: panel === id ? 700 : 500, color: panel === id ? T.green : T.t3, borderLeft: `2px solid ${panel === id ? T.green : "transparent"}`, background: panel === id ? "rgba(0,200,83,0.04)" : "transparent", transition: "all 0.2s" }}>
                <span style={{ fontSize: 15, width: 20, textAlign: "center", filter: panel === id ? `drop-shadow(0 0 6px rgba(0,200,83,0.4))` : "none" }}>{icon}</span>
                <span style={{ flex: 1 }}>{label}</span>
                {badge && <span style={{ background: T.red, color: "#fff", fontSize: 10, fontWeight: 700, padding: "1px 7px", borderRadius: 10 }}>{badge}</span>}
              </div>
            ))}
          </div>
        ))}

        <div style={{ marginTop: "auto", padding: "20px 24px 0", borderTop: `1px solid ${T.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: T.greenGlow, border: `1px solid rgba(0,200,83,0.2)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: T.green }}>AK</div>
            <div><div style={{ fontSize: 13, fontWeight: 600 }}>Amit Kumar</div><div style={{ fontSize: 11, color: T.t3 }}>Club Owner</div></div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: "36px 40px", overflowY: "auto" }}>
        {(panels[panel] || panels.overview)()}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════
//  TOP-LEVEL APP — VIEW SWITCHER + ROUTING
// ═══════════════════════════════════════════════════════
export default function App() {
  const [view, setView] = useState("landing");

  const switchView = (v) => {
    setView(v);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <GlobalStyles />

      {/* Top view switcher */}
      <div style={{ position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)", zIndex: 9999, display: "flex", gap: 6, background: "rgba(10,10,10,0.85)", backdropFilter: "blur(20px)", border: `1px solid ${T.border2}`, borderRadius: 40, padding: 6, boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}>
        {[["landing","🌐 Web Demo"],["vendor","📊 Vendor Dashboard"]].map(([v, label]) => (
          <button key={v} onClick={() => switchView(v)} style={{ padding: "9px 20px", borderRadius: 30, fontSize: 12, fontWeight: 600, color: view === v ? "#000" : T.t3, background: view === v ? T.green : "transparent", border: "none", cursor: "pointer", transition: "all 0.25s", boxShadow: view === v ? `0 0 20px rgba(0,200,83,0.3)` : "none", whiteSpace: "nowrap", letterSpacing: "0.3px" }}>{label}</button>
        ))}
      </div>

      {/* Views */}
      {view === "landing" && <LandingPage switchView={switchView} />}
      {view === "vendor" && <VendorDashboard />}
    </>
  );
}
