import React from 'react';
import { T } from '../../theme/tokens';

export const Input = ({ label, value, onChange, placeholder, type = "text", style = {} }) => (
  <div style={{ marginBottom: 16 }}>
    {label && <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px", color: T.t3, marginBottom: 8 }}>{label}</div>}
    <input type={type} value={value} onChange={onChange || ((e) => { })} placeholder={placeholder}
      style={{ width: "100%", background: T.glass, border: `1.5px solid ${T.border}`, borderRadius: T.rsm, padding: "13px 16px", color: T.white, fontSize: 14, fontFamily: T.font, transition: "border-color 0.2s", ...style }}
      onFocus={e => e.target.style.borderColor = T.green}
      onBlur={e => e.target.style.borderColor = T.border} />
  </div>
);
