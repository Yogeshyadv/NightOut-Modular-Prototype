// ─────────────────────────────────────────────────────────────────────────────
//  Vendor Bookings
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from 'react';
import {
  StatCard, PageHeader, Button, Icon, StatusPill, InfoRow, Avatar, Modal,
} from '../../components/ui/index.js';
import Table            from '../../components/ui/Table.jsx';
import { useToast }     from '../../hooks/useToast.js';
import { ToastContainer } from '../../components/ui/Toast.jsx';
import { BOOKINGS }     from '../../data/mockData.js';
import { fmt }          from '../../utils/helpers.js';

export default function VendorBookings() {
  const { toasts, show, dismiss } = useToast();
  const [bookings, setBookings]   = useState(BOOKINGS);
  const [selected, setSelected]   = useState(null);

  const checkIn = (b) => {
    setBookings(bs => bs.map(bk =>
      bk.id === b.id
        ? { ...bk, status: 'Checked In', time: new Date().toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit' }) }
        : bk
    ));
    show(`${b.guest} checked in ✓`);
    setSelected(null);
  };

  const totRev    = bookings.filter(b => b.status !== 'Cancelled').reduce((s,b) => s + b.amount, 0);
  const confirmed = bookings.filter(b => b.status === 'Confirmed').length;
  const checkedIn = bookings.filter(b => b.status === 'Checked In').length;
  const noShows   = bookings.filter(b => b.status === 'No-Show').length;

  const columns = [
    {
      key: 'id', label: 'Booking ID', width: '140px',
      render: v => <span className="font-mono text-xs dark:text-dark-100 text-dark-400">{v}</span>,
    },
    {
      key: 'guest', label: 'Guest', bold: true,
      render: (v, row) => (
        <div className="flex items-center gap-2.5">
          <Avatar name={v} size={32} accent="green" />
          <div>
            <div className="text-sm font-semibold">{v}</div>
            <div className="text-[11px] dark:text-dark-100 text-dark-400">{row.phone}</div>
          </div>
        </div>
      ),
    },
    { key: 'venue',   label: 'Venue',  render: v => <span className="text-sm dark:text-dark-100 text-dark-400">{v}</span> },
    { key: 'type',    label: 'Type' },
    { key: 'guests',  label: 'Guests', render: v => <span className="font-semibold">{v}</span> },
    {
      key: 'amount', label: 'Amount', sortable: true,
      render: v => <span className="font-bold text-green">{fmt.currency(v)}</span>,
    },
    {
      key: 'date', label: 'Date', sortable: true,
      render: v => <span className="dark:text-dark-100 text-dark-400">{v}</span>,
    },
    { key: 'status', label: 'Status' },
  ];

  return (
    <div className="p-6 space-y-6 animate-fade-up">
      <ToastContainer toasts={toasts} dismiss={dismiss} />

      <PageHeader title="Bookings" subtitle="All reservations across your venues" />

      <div className="grid grid-cols-2 xl:grid-cols-5 gap-4">
        <StatCard icon="calendar" label="Total"       value={bookings.length} accent="green"  />
        <StatCard icon="⏳"        label="Confirmed"   value={confirmed}        accent="purple" />
        <StatCard icon="✅"        label="Checked In"  value={checkedIn}        accent="green"  />
        <StatCard icon="❌"        label="No-Shows"    value={noShows}          accent="danger" changeUp={false} />
        <StatCard icon="💰"       label="Revenue"     value={fmt.shortCurrency(totRev)} accent="gold" />
      </div>

      <Table
        data={bookings}
        columns={columns}
        searchable
        searchPlaceholder="Search by guest, phone, ID…"
        searchKeys={['guest','phone','venue','id']}
        filters={[
          { key:'status', label:'All Status', options:['Confirmed','Checked In','Pending','No-Show','Cancelled'].map(s=>({value:s,label:s})) },
          { key:'venue',  label:'All Venues', options:['F Bar & Lounge','Skybar 22','Neon Terrace'].map(v=>({value:v,label:v})) },
          { key:'type',   label:'All Types',  options:['Stag','Couple','Group','VIP Table'].map(t=>({value:t,label:t})) },
        ]}
        onRowClick={setSelected}
        rowActions={row => (
          <div className="flex gap-1.5">
            {row.status === 'Confirmed' && (
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
      <Modal open={!!selected} onClose={() => setSelected(null)} title="Booking Details" subtitle={selected?.id} size="md">
        {selected && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 dark:bg-dark-700 bg-light-50 dark:border-dark-500 border-light-200 border rounded-2xl">
              <Avatar name={selected.guest} size={52} accent="green" />
              <div>
                <div className="font-display text-lg font-bold">{selected.guest}</div>
                <div className="text-sm dark:text-dark-100 text-dark-400">{selected.phone}</div>
                <div className="mt-1.5"><StatusPill status={selected.status} /></div>
              </div>
            </div>

            <div className="dark:bg-dark-700 bg-light-50 dark:border-dark-500 border-light-200 border rounded-2xl p-4">
              <InfoRow label="Venue"      value={selected.venue} />
              <InfoRow label="Type"       value={selected.type}  />
              <InfoRow label="Guests"     value={selected.guests} />
              <InfoRow label="Date"       value={selected.date}  />
              <InfoRow label="Check-in"   value={selected.time || '—'} />
              <InfoRow label="Payment"    value={selected.payment} />
              <InfoRow label="Amount"     value={fmt.currency(selected.amount)} valueClassName="text-green" />
              <InfoRow label="Commission" value={`₹${selected.commission}`}     valueClassName="text-purple-light" />
            </div>

            {selected.status === 'Confirmed' && (
              <Button size="lg" fullWidth leftIcon="check" onClick={() => checkIn(selected)}>
                Mark as Checked In
              </Button>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
