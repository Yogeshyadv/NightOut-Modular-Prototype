import React, { useState } from 'react';
import { T } from '../../../theme/tokens';
import { Btn } from '../../common/Btn';

export const AIOutfitChecker = ({ navigate, venue }) => {
    const [status, setStatus] = useState("idle"); // idle, processing, approved, warning
    
    const check = () => {
        setStatus("processing");
        setTimeout(() => {
            setStatus(Math.random() > 0.5 ? "approved" : "warning");
        }, 2000);
    };

    return (
        <div className="screen-enter" style={{ height: "100%", position: "relative", background: T.bg }}>
            <div style={{ padding: "56px 20px 20px", display: "flex", alignItems: "center", gap: 14, borderBottom: `1px solid ${T.border}` }}>
                <div onClick={() => navigate("venue")} style={{ width: 40, height: 40, background: T.card, border: `1px solid ${T.border}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>←</div>
                <div>
                    <div style={{ fontFamily: T.font2, fontSize: 20, fontWeight: 700 }}>AI Outfit Checker 👗</div>
                    <div style={{ fontSize: 12, color: T.t2 }}>Checking against {venue?.name || "F Bar & Lounge"} dress code</div>
                </div>
            </div>

            <div className="mscroll" style={{ padding: 20, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
                <div style={{ width: "100%", height: 350, background: T.card, border: `2px dashed ${T.border}`, borderRadius: 20, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                    {status === "idle" && (
                        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                            <div style={{ fontSize: "3rem" }}>📸</div>
                            <Btn variant="primary" small>Take Photo</Btn>
                            <Btn variant="secondary" small onClick={() => setStatus("ready")}>Upload from Gallery</Btn>
                        </div>
                    )}
                    {status === "ready" && (
                        <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
                            <div style={{ height: "100%", background: "rgba(255,255,255,0.02)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "4rem" }}>👤</div>
                            <Btn variant="primary" onClick={check} style={{ margin: 20 }}>Analyze Outfit</Btn>
                        </div>
                    )}
                    {status === "processing" && (
                        <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
                            <div className="spin" style={{ width: 40, height: 40, border: `4px solid ${T.greenGlow}`, borderTopColor: T.green, borderRadius: "50%", animation: "spin 1s linear infinite" }}></div>
                            <div style={{ fontSize: 14, color: T.green, fontWeight: 700 }}>AI Scanning your look...</div>
                        </div>
                    )}
                    {status === "approved" && (
                        <div className="fade-in" style={{ padding: 20, background: "rgba(0,200,83,0.05)", width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
                            <div style={{ fontSize: "4rem" }}>✅</div>
                            <div style={{ fontSize: 22, fontWeight: 800, color: T.green }}>Approved!</div>
                            <div style={{ fontSize: 13, color: T.t2 }}>Your outfit perfectly matches the venue's smart casual dress code.</div>
                            <Btn variant="primary" small onClick={() => navigate("booking")}>Proceed to Book</Btn>
                        </div>
                    )}
                    {status === "warning" && (
                        <div className="fade-in" style={{ padding: 20, background: "rgba(255,215,64,0.05)", width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
                            <div style={{ fontSize: "4rem" }}>⚠️</div>
                            <div style={{ fontSize: 22, fontWeight: 800, color: T.gold }}>Needs Change</div>
                            <div style={{ fontSize: 13, color: T.t2 }}>Hmm, the venue might not allow the shorts you're wearing. We suggest switching to smart casual trousers.</div>
                            <Btn variant="secondary" small onClick={() => setStatus("idle")}>Try Different Look</Btn>
                        </div>
                    )}
                </div>

                <div className="glass-card" style={{ borderRadius: 16, padding: 16, textAlign: "left", width: "100%" }}>
                    <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: T.t3, marginBottom: 8 }}>Venue Dress Code Rules</div>
                    <div style={{ fontSize: 13, color: T.t2, lineHeight: 1.6 }}>{venue?.dressCode || "Smart casual · No shorts, flip-flops, or sportswear"}</div>
                </div>
            </div>
        </div>
    );
};
