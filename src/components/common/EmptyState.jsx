import React from 'react';
import { T } from '../../theme/tokens';

export const EmptyState = ({ icon = "📭", title, sub }) => (
  <div style={{ textAlign: "center", padding: "60px 20px", color: T.t3 }}>
    <div style={{ fontSize: "3rem", marginBottom: 16 }}>{icon}</div>
    <div style={{ fontSize: 16, fontWeight: 700, color: T.t2, marginBottom: 8 }}>{title}</div>
    {sub && <div style={{ fontSize: 13, lineHeight: 1.7 }}>{sub}</div>}
  </div>
);
