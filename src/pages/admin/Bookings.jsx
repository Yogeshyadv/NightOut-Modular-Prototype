// ─────────────────────────────────────────────────────────────────────────────
//  Admin Booking Oversight
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from 'react';
import {
  StatCard, PageHeader, Button, StatusPill, InfoRow, Modal,
} from '../../components/ui/index.js';
import Table            from '../../components/ui/Table.jsx';
import { useAdminBookings } from '../../hooks/useAdminData.js';

export default function AdminBookings() {
  const { bookings: rawBookings, loading } = useAdminBookings();
  const [selected, setSelected] = useState(null);

  const bookings = rawBookings.map(b => ({
    ...b,
    id: b._id,
    guest: b.user?.name || 'Unknown Guest',
    phone: b.user?.email || '—',
    venueName: b.venue?.name || 'Deleted Venue',
    city: b.venue?.location || '—',
    type: b.tickets?.type || 'Standard',
    guests: b.tickets?.quantity || 1,
    amount: b.totalPrice,
    commission: b.totalPrice * 0.15,
    date: new Date(b.bookingDate).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' }),
    status: b.status === 'upcoming' ? 'Confirmed' : b.status === 'completed' ? 'Checked In' : b.status === 'cancelled' ? 'Cancelled' : b.status
  }));

  const totalGMV  = bookings.reduce((s,b) => s + b.amount, 0);
  const totalComm = bookings.reduce((s,b) => s + (b.commission||0), 0);


  const columns = [
    { key:'id',     label:'Booking ID', width:'150px', render: v => <span className="font-mono text-xs dark:text-dark-100 text-dark-400">{v}</span> },
    { key:'guest',  label:'Guest',      bold:true, render: (v,row) => (
        <div><div className="text-sm font-bold">{v}</div><div className="text-[11px] dark:text-dark-100 text-dark-400">{row.phone}</div></div>
      )
    },
    { key:'venueName',  label:'Venue',      render: v => <span className="dark:text-dark-100 text-dark-400">{v}</span> },

    { key:'city',   label:'City',       render: v => <span className="dark:text-dark-100 text-dark-400">{v}</span> },
    { key:'type',   label:'Type' },
    { key:'guests', label:'Guests',     render: v => <span className="font-semibold">{v}</span> },
    { key:'amount', label:'Amount',     sortable:true, render: v => <span className="font-bold text-green">{fmt.currency(v)}</span> },
    { key:'commission', label:'Commission', render: v => <span className="text-purple-light">{v ? `₹${v}` : '—'}</span> },
    { key:'payment',label:'Payment',    render: v => <span className="text-xs dark:text-dark-100 text-dark-400">{v}</span> },
    { key:'date',   label:'Date',       sortable:true, render: v => <span className="dark:text-dark-100 text-dark-400">{v}</span> },
    { key:'status', label:'Status' },
  ];

  return (
    <div className="p-6 space-y-6 animate-fade-up">
      <PageHeader title="Booking Oversight" subtitle="All bookings across the platform" />

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon="calendar" label="Total Bookings" value={bookings.length}                          accent="green"  />
        <StatCard icon="💰"       label="Total GMV"      value={fmt.shortCurrency(totalGMV)}                  accent="gold"   />
        <StatCard icon="💼"       label="Commission"     value={fmt.currency(totalComm)}                       accent="purple" />
        <StatCard icon="❌"       label="Cancelled"       value={bookings.filter(b=>b.status==='Cancelled').length} accent="danger" changeUp={false} />
      </div>

      <Table
        data={bookings}
        columns={columns}
        loading={loading}
        searchable
        searchPlaceholder="Search by guest, venue, city, booking ID…"
        searchKeys={['guest','venueName','city','id','phone']}
        filters={[
          { key:'status', label:'All Status', options:['Confirmed','Checked In','Cancelled','Pending'].map(s=>({value:s,label:s})) },
          { key:'city',   label:'All Cities', options:['Jaipur','Delhi','Mumbai','Bengaluru'].map(c=>({value:c,label:c})) },
          { key:'type',   label:'All Types',  options:['Stag','Couple','Group','VIP Table'].map(t=>({value:t,label:t})) },
        ]}
        onRowClick={setSelected}
        emptyIcon="📅" emptyTitle="No bookings found" pageSize={10}
      />


      <Modal open={!!selected} onClose={() => setSelected(null)} title="Booking Details" subtitle={selected?.id} size="md">
        {selected && (
          <div className="dark:bg-dark-700 bg-light-50 dark:border-dark-500 border-light-200 border rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="font-display text-base font-bold">{selected.guest}</div>
              <StatusPill status={selected.status} />
            </div>
            <InfoRow label="Venue"      value={selected.venue}      />
            <InfoRow label="City"       value={selected.city}       />
            <InfoRow label="Type"       value={selected.type}       />
            <InfoRow label="Guests"     value={selected.guests}     />
            <InfoRow label="Date"       value={selected.date}       />
            <InfoRow label="Payment"    value={selected.payment}    />
            <InfoRow label="Amount"     value={fmt.currency(selected.amount)} valueClassName="text-green" />
            <InfoRow label="Commission" value={`₹${selected.commission}`}     valueClassName="text-purple-light" />
          </div>
        )}
      </Modal>
    </div>
  );
}
