import React from 'react';
import { T } from '../../theme/tokens';

export const Avatar = ({ name, size = 36, color = T.green }) => {
  const initials = (name || "?").split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div style={{ width: size, height: size, borderRadius: size * 0.28, background: `linear-gradient(135deg,${color},${color}88)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.35, fontWeight: 800, color: "#000", flexShrink: 0 }}>
      {initials}
    </div>
  );
};
