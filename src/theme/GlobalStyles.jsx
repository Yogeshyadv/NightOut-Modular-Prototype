import React, { useEffect } from 'react';

export const GlobalStyles = () => {
  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700;800&display=swap');
      *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
      html{scroll-behavior:smooth}
      body{background:#0A0A0A;color:#fff;font-family:'Poppins',sans-serif;-webkit-font-smoothing:antialiased;overflow-x:hidden}
      ::-webkit-scrollbar{width:4px;height:4px}
      ::-webkit-scrollbar-track{background:transparent}
      ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:4px}
      button{font-family:'Poppins',sans-serif;cursor:pointer;border:none;outline:none}
      input,select,textarea{font-family:'Poppins',sans-serif;outline:none}
      a{text-decoration:none;color:inherit}
      @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
      @keyframes fadeIn{from{opacity:0}to{opacity:1}}
      @keyframes slideIn{from{opacity:0;transform:translateX(18px)}to{opacity:1;transform:translateX(0)}}
      @keyframes float1{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-28px) scale(1.04)}}
      @keyframes float2{0%,100%{transform:translateY(0)}50%{transform:translateY(20px)}}
      @keyframes blink{0%,100%{opacity:1}50%{opacity:0.3}}
      @keyframes scanLine{0%{top:15%}100%{top:82%}}
      @keyframes splashPop{from{transform:scale(0.4);opacity:0}to{transform:scale(1);opacity:1}}
      @keyframes qrCheck{from{transform:scale(0);opacity:0}to{transform:scale(1);opacity:1}}
      @keyframes ringPulse{0%,100%{opacity:0.5;transform:scale(1)}50%{opacity:1;transform:scale(1.05)}}
      @keyframes glow{0%,100%{box-shadow:0 0 20px rgba(0,200,83,0.2)}50%{box-shadow:0 0 40px rgba(0,200,83,0.45)}}
      @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
      @keyframes barRise{from{transform:scaleY(0)}to{transform:scaleY(1)}}
      @keyframes countUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
      @keyframes shimmer{0%{background-position:-1000px 0}100%{background-position:1000px 0}}
      .fade-up{animation:fadeUp 0.4s ease forwards}
      .fade-in{animation:fadeIn 0.3s ease forwards}
      .slide-in{animation:slideIn 0.32s cubic-bezier(0.4,0,0.2,1) forwards}
      .amb1{animation:float1 8s ease-in-out infinite}
      .amb2{animation:float2 10s ease-in-out infinite}
      .amb3{animation:float1 12s ease-in-out infinite reverse}
      .blink{animation:blink 2s ease infinite}
      .scan-anim{animation:scanLine 2.5s ease-in-out infinite}
      .splash-pop{animation:splashPop 0.7s cubic-bezier(0.34,1.56,0.64,1) forwards}
      .ring1{animation:ringPulse 2.5s ease infinite}
      .ring2{animation:ringPulse 2.5s ease 0.5s infinite}
      .qr-pop{animation:qrCheck 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards}
      .glow-pulse{animation:glow 3s ease infinite}
      .hover-card{transition:transform 0.2s ease,box-shadow 0.2s ease,border-color 0.2s ease}
      .hover-card:hover{transform:translateY(-3px)}
      .hover-scale{transition:transform 0.2s ease}
      .hover-scale:hover{transform:scale(0.97)}
      .hover-bright{transition:filter 0.2s ease,transform 0.2s ease}
      .hover-bright:hover{filter:brightness(1.08);transform:translateY(-1px)}
      .glass{background:rgba(255,255,255,0.04);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.08)}
      .glass2{background:rgba(255,255,255,0.07);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.12)}
      .mscroll{overflow-y:auto;overflow-x:hidden;scrollbar-width:none;height:100%}
      .mscroll::-webkit-scrollbar{display:none}
      table{width:100%;border-collapse:collapse;margin-top:0}
      thead th{text-align:left;padding:14px 22px;background:rgba(255,255,255,0.02);font-size:11,fontWeight:700,color:rgba(255,255,255,0.4),textTransform:"uppercase",letterSpacing:"1px"}
      tbody tr{border-bottom:1px solid rgba(255,255,255,0.04);transition:background 0.2s}
      tbody tr:hover{background:rgba(255,255,255,0.015)}
      tbody td{padding:16px 22px;font-size:13px;vertical-align:middle}
      .shimmer{background:linear-gradient(to right, rgba(255,255,255,0.03) 8%, rgba(255,255,255,0.08) 18%, rgba(255,255,255,0.03) 33%);background-size:1000px 100%;animation:shimmer 2s linear infinite}
    `;
    document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, []);
  return null;
};
