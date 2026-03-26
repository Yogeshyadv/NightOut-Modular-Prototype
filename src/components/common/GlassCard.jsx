import React from 'react';
import { T } from '../../theme/tokens';

export const GlassCard = ({ children, style = {} }) => (
  <div className="glass" style={{ borderRadius: T.rlg, padding: 22, position: "relative", overflow: "hidden", ...style }}>
    {children}
  </div>
);
