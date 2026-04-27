// ── Formatting helpers ─────────────────────────────────────────────────────────
export const fmt = {
  currency: (v) =>
    `₹${Number(v).toLocaleString('en-IN')}`,

  shortCurrency: (v) => {
    const n = Number(v);
    if (n >= 1e7) return `₹${(n / 1e7).toFixed(1)}Cr`;
    if (n >= 1e5) return `₹${(n / 1e5).toFixed(1)}L`;
    if (n >= 1e3) return `₹${(n / 1e3).toFixed(0)}K`;
    return `₹${n}`;
  },

  number: (v) => Number(v).toLocaleString('en-IN'),

  date: (d) =>
    new Date(d).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric',
    }),

  shortDate: (d) =>
    new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),

  initials: (name = '') =>
    name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || '??',

  percent: (v, total) =>
    total ? `${Math.round((v / total) * 100)}%` : '0%',

  pct: (v, total) =>
    total ? Math.round((v / total) * 100) : 0,
};

// ── Status → pill/dot class mapping ───────────────────────────────────────────
export const STATUS_CFG = {
  'Active':      { pill: 'pill-green',  dot: 'bg-green',   label: 'Active'      },
  'Confirmed':   { pill: 'pill-purple', dot: 'bg-purple',  label: 'Confirmed'   },
  'Checked In':  { pill: 'pill-green',  dot: 'bg-green',   label: 'Checked In'  },
  'Pending':     { pill: 'pill-gold',   dot: 'bg-gold',    label: 'Pending'     },
  'No-Show':     { pill: 'pill-danger', dot: 'bg-danger',  label: 'No-Show'     },
  'Cancelled':   { pill: 'pill-muted',  dot: 'bg-dark-100',label: 'Cancelled'   },
  'Blocked':     { pill: 'pill-danger', dot: 'bg-danger',  label: 'Blocked'     },
  'Flagged':     { pill: 'pill-warn',   dot: 'bg-warn',    label: 'Flagged'     },
  'Rejected':    { pill: 'pill-danger', dot: 'bg-danger',  label: 'Rejected'    },
  'Approved':    { pill: 'pill-green',  dot: 'bg-green',   label: 'Approved'    },
  'Upcoming':    { pill: 'pill-purple', dot: 'bg-purple',  label: 'Upcoming'    },
};

// ── Class name combiner ────────────────────────────────────────────────────────
export const cn = (...classes) => classes.filter(Boolean).join(' ');

// ── Misc ───────────────────────────────────────────────────────────────────────
export const sleep = (ms) => new Promise(r => setTimeout(r, ms));

export const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

export const truncate = (str, n) =>
  str && str.length > n ? `${str.slice(0, n)}…` : str;
