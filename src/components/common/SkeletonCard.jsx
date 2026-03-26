import React from 'react';
import { T } from '../../theme/tokens';

export const SkeletonCard = ({ height = 200 }) => (
  <div style={{ borderRadius: T.rlg, background: T.glass, border: `1px solid ${T.border}`, padding: 22, height, position: "relative", overflow: "hidden" }}>
    <div className="skeleton-line" style={{ width: "40%", height: 14, marginBottom: 12 }} />
    <div className="skeleton-line" style={{ width: "80%", height: 10, marginBottom: 8 }} />
    <div className="skeleton-line" style={{ width: "60%", height: 10 }} />
  </div>
);
