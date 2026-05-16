import { useState, useMemo } from 'react';
import {
  StatCard, PageHeader, Button, Icon, StatusPill, InfoRow, Avatar, Modal,
} from '../../components/ui/index.js';
import Table            from '../../components/ui/Table.jsx';
import { useToast }     from '../../hooks/useToast.js';
import { useBookings }  from '../../hooks/useBookings.js';
import { ToastContainer } from '../../components/ui/Toast.jsx';
import { fmt }          from '../../utils/helpers.js';

export default function VendorBookings() {
  const { bookings, loading, updateBookingStatus } = useBookings();
  const { toasts, show, dismiss } = useToast();
  const [selected, setSelected]   = useState(null);

  const checkIn = async (b) => {
    const res = await updateBookingStatus(b._id, 'completed');
    if (res.success) {
      show(`${b.user?.name || 'Guest'} checked in ✓`);
      setSelected(null);
    }
  };

  // Map backend status to UI status pills
  const statusMap = {
    upcoming: 'Confirmed',
    completed: 'Checked In',
    cancelled: 'Cancelled'
  };

  const mappedBookings = useMemo(() => bookings.map(b => ({
    ...b,
    id: b._id,
    guest: b.user?.name || 'Guest',
    venueName: b.venue?.name || 'Unknown Venue',
    type: b.tickets?.type || 'Standard',
    guests: b.tickets?.count || 1,
    amount: b.totalPrice,
    date: new Date(b.bookingDate).toLocaleDateString('en-IN'),
    displayStatus: statusMap[b.status] || b.status
  })), [bookings]);

  const totRev    = mappedBookings.filter(b => b.status !== 'cancelled').reduce((s,b) => s + b.amount, 0);
  const upcoming  = mappedBookings.filter(b => b.status === 'upcoming').length;
  const completed = mappedBookings.filter(b => b.status === 'completed').length;
  const cancelled = mappedBookings.filter(b => b.status === 'cancelled').length;

  const columns = [
    {
      key: '_id', label: 'Booking ID', width: '140px',
      render: v => <span className="font-mono text-xs dark:text-dark-100 text-dark-400">{v?.slice(-8).toUpperCase()}</span>,
    },
    {
      key: 'guest', label: 'Guest', bold: true,
      render: (v, row) => (
        <div className="flex items-center gap-2.5">
          <Avatar name={v} size={32} accent="green" />
          <div>
            <div className="text-sm font-semibold">{v}</div>
            <div className="text-[11px] dark:text-dark-100 text-dark-400">{row.user?.email}</div>
          </div>
        </div>
      ),
    },
    { key: 'venueName', label: 'Venue', render: v => <span className="text-sm dark:text-dark-100 text-dark-400">{v}</span> },
    { key: 'type',      label: 'Type', render: v => <span className="capitalize">{v}</span> },
    { key: 'guests',    label: 'Guests', render: v => <span className="font-semibold">{v}</span> },
    {
      key: 'amount', label: 'Amount', sortable: true,
      render: v => <span className="font-bold text-green">{fmt.currency(v)}</span>,
    },
    {
      key: 'date', label: 'Date', sortable: true,
      render: v => <span className="dark:text-dark-100 text-dark-400">{v}</span>,
    },
    { key: 'displayStatus', label: 'Status', render: v => <StatusPill status={v} /> },
  ];

  return (
    <div className="p-6 space-y-6 animate-fade-up">
      <ToastContainer toasts={toasts} dismiss={dismiss} />

      <PageHeader title="Bookings" subtitle="All reservations across your venues" />

      <div className="grid grid-cols-2 xl:grid-cols-5 gap-4">
        <StatCard icon="calendar" label="Total"       value={bookings.length} accent="green"  />
        <StatCard icon="⏳"        label="Upcoming"    value={upcoming}        accent="purple" />
        <StatCard icon="✅"        label="Completed"   value={completed}       accent="green"  />
        <StatCard icon="❌"        label="Cancelled"   value={cancelled}       accent="danger" changeUp={false} />
        <StatCard icon="💰"       label="Revenue"     value={fmt.shortCurrency(totRev)} accent="gold" />
      </div>

      <Table
        data={mappedBookings}
        columns={columns}
        loading={loading}
        searchable
        searchPlaceholder="Search by guest, ID…"
        searchKeys={['guest','venueName','_id']}
        onRowClick={setSelected}
        rowActions={row => (
          <div className="flex gap-1.5">
            {row.status === 'upcoming' && (
              <Button size="xs" variant="success" onClick={() => checkIn(row)} leftIcon="check">
                Check In
              </Button>
            )}
            <Button size="xs" variant="ghost-dark" onClick={() => setSelected(row)} leftIcon="eye">
              View
            </Button>
          </div>
        )}
        emptyIcon="📅"
        emptyTitle="No bookings found"
        emptySubtitle="Adjust your filters or wait for new reservations."
        pageSize={8}
      />

      {/* Booking detail modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title="Booking Details" subtitle={selected?._id} size="md">
        {selected && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 dark:bg-dark-700 bg-light-50 dark:border-dark-500 border-light-200 border rounded-2xl">
              <Avatar name={selected.guest} size={52} accent="green" />
              <div>
                <div className="font-display text-lg font-bold">{selected.guest}</div>
                <div className="text-sm dark:text-dark-100 text-dark-400">{selected.user?.email}</div>
                <div className="mt-1.5"><StatusPill status={selected.displayStatus} /></div>
              </div>
            </div>

            <div className="dark:bg-dark-700 bg-light-50 dark:border-dark-500 border-light-200 border rounded-2xl p-4">
              <InfoRow label="Venue"      value={selected.venueName} />
              <InfoRow label="Type"       value={selected.type}  />
              <InfoRow label="Guests"     value={selected.guests} />
              <InfoRow label="Date"       value={selected.date}  />
              <InfoRow label="Booking ID" value={selected._id} />
              <InfoRow label="Amount"     value={fmt.currency(selected.amount)} valueClassName="text-green" />
            </div>

            {selected.status === 'upcoming' && (
              <Button size="lg" fullWidth leftIcon="check" onClick={() => checkIn(selected)}>
                Mark as Checked In (Complete)
              </Button>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}

