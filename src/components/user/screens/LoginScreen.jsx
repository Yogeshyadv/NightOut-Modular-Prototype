import React, { useState } from 'react';
import { T } from '../../../theme/tokens';

export const LoginScreen = ({ navigate }) => {
  const [showOtp, setShowOtp] = useState(false);
  return (
    <div className="slide-in" style={{ height: "100%", background: `radial-gradient(ellipse at 50% -20%, rgba(0,200,83,0.08) 0%, #0A0A0A 60%)`, overflow: "hidden auto" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />
      <div style={{ padding: "72px 28px 40px", position: "relative" }}>
        <div style={{ fontFamily: T.font2, fontSize: 28, fontWeight: 700, lineHeight: 1.3, marginBottom: 8 }}>Welcome back 👋<br />Let's get you in.</div>
        <div style={{ fontSize: 14, color: T.t2, marginBottom: 32 }}>Enter your mobile number to continue</div>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px", color: T.t3, marginBottom: 8 }}>Mobile Number</div>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: T.glass, border: `1.5px solid ${T.border}`, borderRadius: T.rsm, padding: "14px", fontSize: 14, fontWeight: 600, backdropFilter: "blur(10px)", cursor: "pointer" }}>🇮🇳 +91</div>
            <input placeholder="98765 43210" type="tel" style={{ flex: 1, background: T.glass, border: `1.5px solid ${T.border}`, borderRadius: T.rsm, padding: "14px 16px", color: T.white, fontSize: 15, fontFamily: T.font }} onFocus={e => e.target.style.borderColor = T.green} onBlur={e => e.target.style.borderColor = T.border} />
          </div>
        </div>
        <button onClick={() => setShowOtp(true)} style={{ width: "100%", padding: 16, background: T.green, color: "#000", border: "none", borderRadius: T.r, fontFamily: T.font, fontSize: 15, fontWeight: 700, marginBottom: 20, boxShadow: "0 0 24px rgba(0,200,83,0.25)", cursor: "pointer" }}>Send OTP</button>
        {showOtp && (
          <div className="fade-up">
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px", color: T.t3, marginBottom: 8 }}>Enter 6-digit OTP</div>
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              {["8", "4", "7", "", "", ""].map((v, i) => (
                <div key={i} style={{ flex: 1, aspectRatio: 1, maxWidth: 48, background: v ? T.greenGlow2 : T.glass, border: `1.5px solid ${v ? T.green : (i === 3 ? T.green : T.border)}`, borderRadius: T.rsm, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 700, color: T.green, boxShadow: i === 3 ? `0 0 0 3px rgba(0,200,83,0.12)` : "none" }}>{v}</div>
              ))}
            </div>
            <div style={{ textAlign: "center", fontSize: 12, color: T.t3, marginBottom: 20 }}>Resend OTP in <span style={{ color: T.green, fontWeight: 600 }}>0:44</span></div>
            <button onClick={() => navigate("home")} style={{ width: "100%", padding: 16, background: T.green, color: "#000", border: "none", borderRadius: T.r, fontFamily: T.font, fontSize: 15, fontWeight: 700, boxShadow: "0 0 24px rgba(0,200,83,0.25)", cursor: "pointer" }}>Verify & Continue →</button>
          </div>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0", fontSize: 12, color: T.t4 }}>
          <div style={{ flex: 1, height: 1, background: T.border }} />or continue with<div style={{ flex: 1, height: 1, background: T.border }} />
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {["🅖 Google", "🍎 Apple"].map(s => (
            <button key={s} style={{ flex: 1, padding: 13, background: T.glass, border: `1px solid ${T.border}`, borderRadius: T.rsm, color: T.white, fontFamily: T.font, fontSize: 13, fontWeight: 500, cursor: "pointer", backdropFilter: "blur(10px)" }}>{s}</button>
          ))}
        </div>
      </div>
    </div>
  );
};
