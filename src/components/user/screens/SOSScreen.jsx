import React, { useState } from 'react';
import { T } from '../../../theme/tokens';
import { Btn } from '../../common/Btn';

export const SOSScreen = ({ navigate }) => {
    const [sosState, setSosState] = useState("idle"); // idle, counting, active
    const [dots, setDots] = useState(0);

    const startSos = () => {
        setSosState("counting");
        const interval = setInterval(() => {
            setDots(d => {
                if(d >= 5) {
                    clearInterval(interval);
                    setSosState("active");
                    return 5;
                }
                return d + 1;
            });
        }, 1000);
    };

    const cancelSos = () => {
        setSosState("idle");
        setDots(0);
    };

    return (
        <div className="screen-enter" style={{ height: "100%", position: "relative", background: sosState === "active" ? `radial-gradient(circle at 50% 50%, rgba(255,82,82,0.3) 0%, ${T.bg} 80%)` : T.bg, transition: "background 0.3s" }}>
            <div style={{ padding: "72px 28px 24px", textAlign: "center" }}>
                <div style={{ display: "inline-flex", padding: "6px 14px", borderRadius: 30, background: "rgba(255,82,82,0.1)", border: `1px solid ${T.red}`, color: T.red, fontSize: 11, fontWeight: 700, letterSpacing: 1.5, marginBottom: 20 }}>SOS / EMERGENCY</div>
                <div style={{ fontFamily: T.font2, fontSize: 32, fontWeight: 800, lineHeight: 1.1, marginBottom: 12 }}>Stay Safe Always</div>
                <div style={{ fontSize: 13, color: T.t2 }}>Quick actions for unforeseen situations. Your safety is our number one priority.</div>
            </div>

            <div className="mscroll" style={{ padding: "0 28px", display: "flex", flexDirection: "column", gap: 20, paddingBottom: 100 }}>
                {sosState === "idle" && (
                    <>
                        <div style={{ padding: 40, background: "rgba(255,82,82,0.05)", borderRadius: "50%", border: `2px dashed rgba(255,82,82,0.2)`, width: 220, height: 220, margin: "20px auto", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.3s" }} onClick={startSos} className="hover-scale">
                            <div style={{ width: 140, height: 140, background: T.red, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 900, color: "#fff", boxShadow: `0 0 60px rgba(255,82,82,0.4)` }}>SOS</div>
                        </div>
                        <div style={{ textAlign: "center", fontSize: 12, color: T.t3 }}>Press and hold or tap once to alert 3 emergency contacts and local bouncers.</div>
                    </>
                )}

                {sosState === "counting" && (
                    <div style={{ padding: 40, textAlign: "center" }}>
                         <div style={{ fontSize: 60, fontWeight: 900, marginBottom: 20, color: T.red }}>0{5-dots}</div>
                         <div style={{ fontSize: 16, fontWeight: 700 }}>Activating SOS In...</div>
                         <div style={{ color: T.t2, fontSize: 13, marginTop: 10, marginBottom: 40 }}>Messages will be sent to 3 contacts.</div>
                         <Btn variant="secondary" onClick={cancelSos} full>Cancel SOS</Btn>
                    </div>
                )}

                {sosState === "active" && (
                    <div className="fade-in" style={{ padding: 20, textAlign: "center" }}>
                         <div style={{ fontSize: 60, marginBottom: 20 }}>📣</div>
                         <div style={{ fontSize: 22, fontWeight: 800, color: T.red }}>SOS ACTIVATED</div>
                         <div style={{ fontSize: 13, color: T.t2, lineHeight: 1.6, marginBottom: 30 }}>Local authorities, nearby venues, and your emergency contacts have been notified with your live location. Do not leave the area until safe.</div>
                         <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                            <Btn variant="primary" style={{ background: T.white, color: "#000" }} full>📞 Call 112</Btn>
                            <Btn variant="danger" onClick={cancelSos} full>Dismiss Alert</Btn>
                         </div>
                    </div>
                )}

                <div className="glass-card" style={{ borderRadius: 20, padding: 22 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, color: T.t3 }}>Emergency Contacts</div>
                        <div style={{ fontSize: 11, color: T.green, fontWeight: 700 }}>EDIT</div>
                    </div>
                    {[["Mom", "98xxx xxxxx"], ["Dad", "98xxx xxxxx"], ["Vikram", "76xxx xxxxx"]].map(([n, p]) => (
                        <div key={n} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${T.border}` }}>
                             <span style={{ fontSize: 14 }}>{n}</span><span style={{ fontSize: 13, color: T.t2 }}>{p}</span>
                        </div>
                    ))}
                </div>
            </div>
            {sosState === "idle" && <div onClick={() => navigate("home")} style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", color: T.t3, fontSize: 14, cursor: "pointer" }}>Back to Home</div>}
        </div>
    );
};
