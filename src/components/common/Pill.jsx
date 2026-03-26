import React from 'react';
import { T } from '../../theme/tokens';

export const Pill = ({ status, size = "sm" }) => {
  const cfg = {
    "Active": { bg: "rgba(0,200,83,0.12)", b: "rgba(0,200,83,0.3)", c: T.green },
    "Pending": { bg: "rgba(255,215,64,0.12)", b: "rgba(255,215,64,0.3)", c: T.gold },
    "Blocked": { bg: "rgba(255,82,82,0.12)", b: "rgba(255,82,82,0.3)", c: T.red },
    "Flagged": { bg: "rgba(255,109,0,0.12)", b: "rgba(255,109,0,0.3)", c: T.orange },
    "Confirmed": { bg: "rgba(124,77,255,0.12)", b: "rgba(124,77,255,0.3)", c: T.purple2 },
    "Checked In": { bg: "rgba(0,200,83,0.18)", b: "rgba(0,200,83,0.4)", c: T.green2 },
    "No-Show": { bg: "rgba(255,82,82,0.12)", b: "rgba(255,82,82,0.3)", c: T.red },
    "Approved": { bg: "rgba(0,200,83,0.12)", b: "rgba(0,200,83,0.3)", c: T.green },
    "Rejected": { bg: "rgba(255,82,82,0.12)", b: "rgba(255,82,82,0.3)", c: T.red },
    "default": { bg: "rgba(176,176,176,0.1)", b: "rgba(176,176,176,0.2)", c: T.t2 },
  };
  const s = cfg[status] || cfg.default;
  const p = size === "sm" ? "4px 10px" : "6px 14px";
  return (
    <span style={{
      display: "inline-block",
      padding: p,
      borderRadius: 10,
      fontSize: size === "sm" ? 11 : 12,
      fontWeight: 700,
      background: s.bg,
      border: `1px solid ${s.b}`,
      color: s.c,
      whiteSpace: "nowrap"
    }}>
      {status}
    </span>
  );
};
