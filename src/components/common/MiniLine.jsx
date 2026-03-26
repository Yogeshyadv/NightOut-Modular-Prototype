import React from 'react';
import { T } from '../../theme/tokens';

export const MiniLine = ({ data, color = T.green }) => {
  const max = Math.max(...data, 1);
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * 100},${100 - (v / max) * 100}`).join(" ");
  return (
    <svg viewBox="0 0 100 100" width="60" height="30" style={{ overflow: "visible" }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};
