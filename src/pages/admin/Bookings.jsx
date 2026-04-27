// ─────────────────────────────────────────────────────────────────────────────
//  Admin Booking Oversight
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from 'react';
import {
  StatCard, PageHeader, Button, StatusPill, InfoRow, Modal,
} from '../../components/ui/index.js';
import Table            from '../../components/ui/Table.jsx';
import { BOOKINGS }     from '../../data/mockData.js';
import { fmt }          from '../../utils/helpers.js';

// Augment with city and extra entries
const ALL_BOOKINGS = [
  ...BOOKINGS.map(b => ({ ...b, city: b.city ?? 'Jaipur' })),
  { id:'NO-2026-84739', guest:'Ravi Patel',    phone:'+91 11122 33344', venue:'Neon Lounge',  city:'Delhi',     type:'Couple',    guests:2, amount:2400,  commission:120,  status:'Confirmed',  date:'2026-03-25', time:'—',       payment:'UPI'  },
  { id:'NO-2026-84740', guest:'Zara Ahmed',    phone:'+91 55566 77788', venue:'Pulse Club',   city:'Bengaluru', type:'Stag',      guests:1, amount:1800,  commission:90,   status:'Checked In', date:'2026-03-25', time:'9:45 PM', payment:'Card' },
  { id:'NO-2026-84741', guest:'Karan Singh',   phone:'+91 99988 77766', venue:'Skybar 22',    city:'Jaipur',    type:'Group',     guests:8, amount:14400, commission:720,  status:'Confirmed',  date:'2026-03-27', time:'—',       payment:'Bank Transfer' },
  { id:'NO-2026-84742', guest:'Meera Nair',    phone:'+91 77766 55544', venue:'Beat Factory', city:'Mumbai',    type:'Couple',    guests:2, amount:2100,  commission:105,  status:'No-Show',    date:'2026-03-24', time:'—',       payment:'UPI'  },
];

export default function AdminBookings() {
  const [selected, setSelected] = useState(null);

  const totalGMV  = ALL_BOOKINGS.reduce((s,b) => s + b.amount, 0);
  const totalComm = ALL_BOOKINGS.reduce((s,b) => s + (b.commission||0), 0);

  const columns = [
    { key:'id',     label:'Booking ID', width:'150px', render: v => <span className="font-mono text-xs dark:text-dark-100 text-dark-400">{v}</span> },
    { key:'guest',  label:'Guest',      bold:true, render: (v,row) => (
        <div><div className="text-sm font-bold">{v}</div><div className="text-[11px] dark:text-dark-100 text-dark-400">{row.phone}</div></div>
      )
    },
    { key:'venue',  label:'Venue',      render: v => <span className="dark:text-dark-100 text-dark-400">{v}</span> },
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
        <StatCard icon="calendar" label="Total Bookings" value={ALL_BOOKINGS.length}                          accent="green"  />
        <StatCard icon="💰"       label="Total GMV"      value={fmt.shortCurrency(totalGMV)}                  accent="gold"   />
        <StatCard icon="💼"       label="Commission"     value={fmt.currency(totalComm)}                       accent="purple" />
        <StatCard icon="❌"       label="No-Shows"       value={ALL_BOOKINGS.filter(b=>b.status==='No-Show').length} accent="danger" changeUp={false} />
      </div>

      <Table
        data={ALL_BOOKINGS}
        columns={columns}
        searchable
        searchPlaceholder="Search by guest, venue, city, booking ID…"
        searchKeys={['guest','venue','city','id','phone']}
        filters={[
          { key:'status', label:'All Status', options:['Confirmed','Checked In','No-Show','Pending','Cancelled'].map(s=>({value:s,label:s})) },
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
