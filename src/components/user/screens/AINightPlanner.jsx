import React, { useState } from 'react';
import { T } from '../../../theme/tokens';

export const AINightPlanner = ({ navigate }) => {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hey! I'm your NightOut AI. Where are we heading tonight? 🌙", type: "text" },
    { role: "ai", text: "Tell me your vibe: '4 guys, ₹2K budget', 'Romantic date', or 'Best Bollywood music'?", type: "prompts" }
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    if(!input) return;
    const newMsgs = [...messages, { role: "user", text: input, type: "text" }];
    setMessages(newMsgs);
    setInput("");
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "ai", 
        text: "I've planned a perfect night for you! 🍸", 
        type: "plan",
        plan: {
          venue: "Skybar 22",
          reason: "Top rated for VIP experience & House music. Fits your ₹5,000+ preference.",
          itinerary: "8 PM: Entry → 10 PM: Table Service → 1 AM: Safe Ride home"
        }
      }]);
    }, 1000);
  };

  return (
    <div className="screen-enter" style={{ height: "100%", position: "relative", background: T.bg }}>
      <div style={{ padding: "56px 20px 16px", background: T.bg2, borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 12 }}>
        <div onClick={() => navigate("home")} style={{ fontSize: 20, cursor: "pointer" }}>←</div>
        <div style={{ fontFamily: T.font2, fontSize: 18, fontWeight: 700 }}>AI Night Planner ✨</div>
      </div>

      <div className="mscroll" style={{ padding: "20px", display: "flex", flexDirection: "column", gap: 16, paddingBottom: 100 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ alignSelf: m.role === "user" ? "flex-end" : "flex-start", maxWidth: "85%" }}>
            {m.type === "text" && (
              <div style={{ background: m.role === "user" ? T.greenGlow : T.card2, borderRadius: 16, padding: "12px 16px", fontSize: 13, border: `1px solid ${m.role === "user" ? T.green : T.border}` }}>
                {m.text}
              </div>
            )}
            {m.type === "prompts" && (
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
                {["4 guys, ₹2K budget", "Romantic date", "Sufi night", "🌈 Rainbow friendly"].map(p => (
                   <div key={p} onClick={() => setInput(p)} style={{ fontSize: 11, background: T.card, border: `1px solid ${T.border}`, padding: "6px 12px", borderRadius: 20, cursor: "pointer" }}>{p}</div>
                ))}
              </div>
            )}
            {m.type === "plan" && (
              <div className="glass-card" style={{ borderRadius: 16, padding: 16, marginTop: 8, border: `1.5px solid ${T.green}` }}>
                <div style={{ fontWeight: 800, color: T.green, fontSize: 15, marginBottom: 8 }}>{m.plan.venue}</div>
                <div style={{ fontSize: 12, color: T.t2, marginBottom: 10 }}>{m.plan.reason}</div>
                <div style={{ fontSize: 11, color: T.t3, background: T.bg, padding: 10, borderRadius: 8 }}>{m.plan.itinerary}</div>
                <button onClick={() => navigate("booking")} style={{ width: "100%", marginTop: 12, background: T.green, border: "none", padding: "8px", borderRadius: 8, fontWeight: 700, fontSize: 12 }}>Book this plan</button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 20, background: T.bg2, borderTop: `1px solid ${T.border}` }}>
        <div style={{ display: "flex", gap: 10 }}>
          <input 
            value={input} 
            onChange={e => setInput(e.target.value)} 
            placeholder="Plan my night..." 
            style={{ flex: 1, background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: "12px 16px", color: "#fff", fontSize: 14 }} 
          />
          <button onClick={send} style={{ width: 44, height: 44, borderRadius: 12, background: T.green, border: "none", fontSize: 20 }}>🚀</button>
        </div>
      </div>
    </div>
  );
};
