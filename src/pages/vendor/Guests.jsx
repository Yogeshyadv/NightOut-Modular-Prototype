// ─────────────────────────────────────────────────────────────────────────────
//  Vendor Guests  —  guestlist with per-venue filter + check-in
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from 'react';
import {
  StatCard, Card, PageHeader, Button, StatusPill, ProgressBar, Avatar,
} from '../../components/ui/index.js';
import Table            from '../../components/ui/Table.jsx';
import { useToast }     from '../../hooks/useToast.js';
import { ToastContainer } from '../../components/ui/Toast.jsx';
import { BOOKINGS, VENUES } from '../../data/mockData.js';
import { fmt }          from '../../utils/helpers.js';

// Flatten bookings → individual guest rows
const buildGuests = (bookings) =>
  bookings.flatMap(b =>
    Array.from({ length: b.guests }, (_, i) => ({
      id:         `${b.id}-G${i}`,
      name:       i === 0 ? b.guest : `Guest ${i + 1} (${b.id})`,
      bookingId:  b.id,
      venue:      b.venue,
      date:       b.date,
      type:       b.type,
      status:     b.status,
      checkinTime:b.time,
      amount:     i === 0 ? b.amount : 0,
    }))
  );

export default function Guests() {
  const { toasts, show, dismiss } = useToast();
  const [guests,      setGuests]      = useState(buildGuests(BOOKINGS));
  const [venueFilter, setVenueFilter] = useState('all');

  const myVenues = ['all', ...new Set(BOOKINGS.map(b => b.venue))];

  const visible = venueFilter === 'all'
    ? guests
    : guests.filter(g => g.venue === venueFilter);

  const checkedIn = visible.filter(g => g.status === 'Checked In').length;
  const pending   = visible.filter(g => g.status === 'Confirmed').length;
  const noShows   = visible.filter(g => g.status === 'No-Show').length;
  const pct       = visible.length ? Math.round((checkedIn / visible.length) * 100) : 0;

  const checkIn = (g) => {
    const now = new Date().toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit' });
    setGuests(gs => gs.map(x =>
      x.id === g.id ? { ...x, status:'Checked In', checkinTime: now } : x
    ));
    show(`${g.name.split(' (')[0]} checked in at ${now}!`);
  };

  const columns = [
    {
      key: 'name', label: 'Guest Name', bold: true,
      render: (v, row) => (
        <div className="flex items-center gap-2.5">
          <Avatar name={v} size={32} accent="purple" />
          <div>
            <div className="text-sm font-semibold">{v.split(' (')[0]}</div>
            <div className="text-[11px] dark:text-dark-100 text-dark-400 font-mono">{row.bookingId}</div>
          </div>
        </div>
      ),
    },
    { key: 'venue', label: 'Venue', render: v => <span className="text-sm dark:text-dark-100 text-dark-400">{v}</span> },
    { key: 'date',  label: 'Date',  render: v => <span className="dark:text-dark-100 text-dark-400">{v}</span> },
    { key: 'type',  label: 'Type'  },
    {
      key: 'checkinTime', label: 'Check-in',
      render: v => (
        <span className={v && v !== '—' ? 'text-green font-semibold' : 'dark:text-dark-100 text-dark-400'}>
          {v || '—'}
        </span>
      ),
    },
    { key: 'status', label: 'Status' },
  ];

  return (
    <div className="p-6 space-y-6 animate-fade-up">
      <ToastContainer toasts={toasts} dismiss={dismiss} />

      <PageHeader title="Guestlist" subtitle="Track guest arrivals across all venues" />

      {/* KPIs */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon="users"  label="Total Guests" value={visible.length}  accent="green"  />
        <StatCard icon="✅"     label="Checked In"   value={checkedIn}       accent="green"  change={`${pct}%`} />
        <StatCard icon="⏳"     label="Pending"      value={pending}         accent="purple" />
        <StatCard icon="❌"     label="No-Shows"     value={noShows}         accent="danger" changeUp={false} />
      </div>

      {/* Venue filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {myVenues.map(v => (
          <button key={v} onClick={() => setVenueFilter(v)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              venueFilter === v
                ? 'bg-green text-black shadow-green'
                : 'dark:bg-dark-600 bg-white dark:border-dark-400 border-light-200 border dark:text-dark-100 text-dark-400 hover:text-green'
            }`}>
            {v === 'all' ? 'All Venues' : v}
          </button>
        ))}
      </div>

      {/* Progress card */}
      <Card title="Tonight's Check-in Progress" subtitle="Real-time guest arrival tracking">
        <div className="grid grid-cols-3 gap-6 mb-5">
          {[
            ['Checked In', checkedIn, '#00C853'],
            ['Pending',    pending,   '#7C4DFF'],
            ['No-Show',    noShows,   '#FF5252'],
          ].map(([l, v, color]) => (
            <div key={l} className="text-center">
              <div className="font-display text-2xl font-bold mb-1" style={{ color }}>{v}</div>
              <div className="text-xs dark:text-dark-100 text-dark-400 mb-2">{l}</div>
              <div className="h-1.5 rounded-full dark:bg-dark-400 bg-light-200 overflow-hidden">
                <div className="h-full rounded-full" style={{ width:`${visible.length ? (v/visible.length)*100 : 0}%`, background: color }} />
              </div>
            </div>
          ))}
        </div>
        <ProgressBar value={pct} showPct label={`${checkedIn} of ${visible.length} guests arrived`} accent="green" height={8} />
      </Card>

      {/* Table */}
      <Table
        data={visible}
        columns={columns}
        searchable
        searchPlaceholder="Search guests by name or booking ID…"
        searchKeys={['name','bookingId']}
        filters={[
          { key:'status', label:'All Status', options:['Checked In','Confirmed','No-Show'].map(s=>({value:s,label:s})) },
          { key:'type',   label:'All Types',  options:['Stag','Couple','Group','VIP Table'].map(t=>({value:t,label:t})) },
        ]}
        rowActions={row =>
          row.status === 'Confirmed'
            ? <Button size="xs" variant="success" leftIcon="check" onClick={() => checkIn(row)}>Check In</Button>
            : null
        }
        emptyIcon="👥"
        emptyTitle="No guests found"
        pageSize={10}
      />
    </div>
  );
}
