import React from 'react';
import { T } from '../../theme/tokens';

export const SearchBar = ({ value, onChange, placeholder, style = {} }) => (
  <div style={{ position: "relative", ...style }}>
    <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      style={{ background: T.glass, border: `1px solid ${T.border}`, borderRadius: T.rsm, padding: "8px 14px 8px 36px", color: T.white, fontSize: 13, fontFamily: T.font, width: 220, transition: "all 0.2s" }}
      onFocus={e => e.target.style.borderColor = T.green}
      onBlur={e => e.target.style.borderColor = T.border} />
    <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 13, pointerEvents: "none", opacity: 0.6 }}>🔍</span>
  </div>
);
