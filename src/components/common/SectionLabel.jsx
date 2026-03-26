import React from 'react';
import { T } from '../../theme/tokens';

export const SectionLabel = ({ children, color = T.green }) => (
  <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: T.glass, border: `1px solid ${color}33`, borderRadius: 30, padding: "6px 14px", fontSize: 11, fontWeight: 700, color, letterSpacing: 1, textTransform: "uppercase", marginBottom: 16, backdropFilter: "blur(10px)" }}>
    {children}
  </div>
);
