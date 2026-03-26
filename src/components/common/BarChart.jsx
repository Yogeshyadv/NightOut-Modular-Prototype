import React from 'react';
import { T } from '../../theme/tokens';

export const BarChart = ({ data, labels, height = 160, primaryColor = T.green, secondaryColor = T.purple2 }) => {
  const max = Math.max(...data, 1);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height }}>
      {data.map((v, i) => {
        const h = Math.round((v / max) * (height - 24));
        const isMax = v === max;
        return (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, flex: 1 }}>
            <div title={`${v}`} style={{ width: "100%", minWidth: 6, height: h, borderRadius: "5px 5px 0 0", background: isMax ? `linear-gradient(to top,${primaryColor},${secondaryColor})` : `linear-gradient(to top,rgba(0,200,83,0.25),${primaryColor})`, boxShadow: isMax ? `0 0 16px ${primaryColor}44` : "none", transition: "all 0.3s ease", transformOrigin: "bottom", animation: "barRise 0.5s ease forwards" }} />
            {labels && <span style={{ fontSize: 9, color: T.t4, whiteSpace: "nowrap" }}>{labels[i]}</span>}
          </div>
        );
      })}
    </div>
  );
};
