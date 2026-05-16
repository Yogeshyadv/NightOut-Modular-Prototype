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
import { useBookings } from '../../hooks/useBookings.js';

export default function Guests() {
  const { bookings, loading, updateBookingStatus } = useBookings();
  const { toasts, show, dismiss } = useToast();
  const [venueFilter, setVenueFilter] = useState('all');

  const guests = bookings.flatMap(b => {
    const qty = b.tickets?.count || 1;
    return Array.from({ length: qty }, (_, i) => ({
      id: `${b._id}-G${i}`,
      _id: b._id, // Keep original ID for API
      name: i === 0 ? (b.user?.name || 'Guest') : `Guest ${i + 1} (${b._id.slice(-4)})`,
      bookingId: b._id,
      venue: b.venue?.name || 'Unknown',
      date: new Date(b.bookingDate).toLocaleDateString('en-IN'),
      type: b.tickets?.type || 'Standard',
      status: b.status === 'upcoming' ? 'Confirmed' : b.status === 'completed' ? 'Checked In' : b.status === 'cancelled' ? 'Cancelled' : b.status,
      checkinTime: b.status === 'completed' ? 'Arrived' : '—',
      amount: i === 0 ? b.totalPrice : 0,
    }));
  });

  const myVenues = ['all', ...new Set(bookings.map(b => b.venue?.name).filter(Boolean))];

  const visible = venueFilter === 'all'
    ? guests
    : guests.filter(g => g.venue === venueFilter);

  const checkedIn = visible.filter(g => g.status === 'Checked In').length;
  const pending   = visible.filter(g => g.status === 'Confirmed').length;
  const noShows   = visible.filter(g => g.status === 'No-Show' || g.status === 'Cancelled').length;
  const pct       = visible.length ? Math.round((checkedIn / visible.length) * 100) : 0;

  const checkIn = async (g) => {
    const res = await updateBookingStatus(g._id, 'completed');
    if (res.success) {
      show(`${g.name.split(' (')[0]} checked in ✓`);
    }
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
        loading={loading}

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
