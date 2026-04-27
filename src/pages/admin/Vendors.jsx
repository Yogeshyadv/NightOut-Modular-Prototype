// ─────────────────────────────────────────────────────────────────────────────
//  Admin Vendor Management
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from 'react';
import {
  StatCard, PageHeader, Button, StatusPill, InfoRow, Avatar, Modal, ConfirmModal,
} from '../../components/ui/index.js';
import Table            from '../../components/ui/Table.jsx';
import { useToast }     from '../../hooks/useToast.js';
import { ToastContainer } from '../../components/ui/Toast.jsx';
import { PLATFORM_VENDORS } from '../../data/mockData.js';
import { fmt, cn }      from '../../utils/helpers.js';

export default function AdminVendors() {
  const { toasts, show, dismiss } = useToast();
  const [vendors,  setVendors]  = useState(PLATFORM_VENDORS);
  const [selected, setSelected] = useState(null);
  const [confirm,  setConfirm]  = useState(null); // { action, vendor }

  const act = (vendor, action) => {
    const statusMap = { approve:'Active', block:'Blocked', unblock:'Active', reject:'Blocked' };
    setVendors(vs => vs.map(v => v.id === vendor.id ? { ...v, status: statusMap[action] } : v));
    const msgs = {
      approve: `${vendor.name} approved and activated!`,
      block:   `${vendor.name} blocked.`,
      unblock: `${vendor.name} unblocked and restored.`,
      reject:  `${vendor.name} application rejected.`,
    };
    show(msgs[action], action === 'approve' || action === 'unblock' ? 'success' : 'error');
    setSelected(null);
    setConfirm(null);
  };

  const columns = [
    {
      key: 'name', label: 'Vendor',
      render: (v, row) => (
        <div className="flex items-center gap-2.5">
          <Avatar name={v} size={32} accent="purple" />
          <div>
            <div className="text-sm font-bold">{v}</div>
            <div className="text-[11px] dark:text-dark-100 text-dark-400">{row.owner} · {row.email}</div>
          </div>
        </div>
      ),
    },
    { key:'city',          label:'City',      render: v => <span className="dark:text-dark-100 text-dark-400">{v}</span> },
    { key:'venues',        label:'Venues',    render: v => <span className="font-semibold">{v}</span> },
    { key:'bookings',      label:'Bookings',  sortable:true, render: v => <span className="font-semibold">{v.toLocaleString()}</span> },
    { key:'revenue',       label:'Revenue',   sortable:true, render: v => <span className="font-bold text-green">{v ? fmt.shortCurrency(v) : '—'}</span> },
    { key:'commission',    label:'Commission',render: v => <span className="text-purple-light">{v ? fmt.shortCurrency(v) : '—'}</span> },
    { key:'rating',        label:'Rating',    render: v => v ? <span className="text-gold font-bold">⭐ {v}</span> : <span className="dark:text-dark-100 text-dark-400">—</span> },
    { key:'status',        label:'Status' },
  ];

  return (
    <div className="p-6 space-y-6 animate-fade-up">
      <ToastContainer toasts={toasts} dismiss={dismiss} />

      <PageHeader title="Vendor Management" subtitle={`${vendors.length} vendors · ${vendors.filter(v=>v.status==='Pending').length} pending approval`} />

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon="building" label="Total Vendors" value={vendors.length}                               accent="purple" />
        <StatCard icon="✅"        label="Active"         value={vendors.filter(v=>v.status==='Active').length} accent="green"  />
        <StatCard icon="⏳"        label="Pending"        value={vendors.filter(v=>v.status==='Pending').length} accent="gold"  />
        <StatCard icon="🚫"        label="Blocked"        value={vendors.filter(v=>v.status==='Blocked').length} accent="danger" changeUp={false} />
      </div>

      <Table
        data={vendors}
        columns={columns}
        searchable
        searchPlaceholder="Search vendors by name, owner, city…"
        searchKeys={['name','owner','email','city']}
        filters={[
          { key:'status', label:'All Status', options:['Active','Pending','Blocked'].map(s=>({value:s,label:s})) },
          { key:'city',   label:'All Cities', options:['Jaipur','Delhi','Mumbai','Bengaluru','Chennai','Hyderabad'].map(c=>({value:c,label:c})) },
        ]}
        onRowClick={setSelected}
        rowActions={row => (
          <div className="flex gap-1.5">
            {row.status === 'Pending' && (
              <>
                <Button size="xs" variant="success" onClick={() => setConfirm({ action:'approve', vendor:row })}>Approve</Button>
                <Button size="xs" variant="danger"  onClick={() => setConfirm({ action:'reject',  vendor:row })}>Reject</Button>
              </>
            )}
            {row.status === 'Active'  && <Button size="xs" variant="danger"  onClick={() => setConfirm({ action:'block',   vendor:row })}>Block</Button>}
            {row.status === 'Blocked' && <Button size="xs" variant="success" onClick={() => setConfirm({ action:'unblock', vendor:row })}>Unblock</Button>}
            <Button size="xs" variant="ghost-dark" onClick={() => setSelected(row)} leftIcon="eye">View</Button>
          </div>
        )}
        emptyIcon="🏪" emptyTitle="No vendors found" pageSize={8}
      />

      {/* Detail modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title="Vendor Details" subtitle={`ID: ${selected?.id}`} size="lg">
        {selected && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 dark:bg-dark-700 bg-light-50 dark:border-dark-500 border-light-200 border rounded-2xl">
              <Avatar name={selected.name} size={52} accent="purple" />
              <div>
                <div className="font-display text-lg font-bold">{selected.name}</div>
                <div className="text-sm dark:text-dark-100 text-dark-400">{selected.owner} · {selected.city}</div>
                <div className="mt-1.5 flex gap-2">
                  <StatusPill status={selected.status} />
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full dark:bg-dark-600 bg-light-100 dark:text-dark-100 text-dark-400">
                    Joined {selected.joined}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="dark:bg-dark-700 bg-light-50 dark:border-dark-500 border-light-200 border rounded-2xl p-4">
                <div className="label-xs text-dark-100 mb-3">Contact</div>
                <InfoRow label="Email"  value={selected.email} />
                <InfoRow label="Phone"  value={selected.phone} />
                <InfoRow label="City"   value={selected.city}  />
                <InfoRow label="Joined" value={selected.joined}/>
              </div>
              <div className="dark:bg-dark-700 bg-light-50 dark:border-dark-500 border-light-200 border rounded-2xl p-4">
                <div className="label-xs text-dark-100 mb-3">Performance</div>
                <InfoRow label="Venues"     value={selected.venues} />
                <InfoRow label="Bookings"   value={selected.bookings.toLocaleString()} />
                <InfoRow label="Revenue"    value={selected.revenue ? fmt.shortCurrency(selected.revenue) : '—'} valueClassName="text-green" />
                <InfoRow label="Commission" value={selected.commission ? fmt.shortCurrency(selected.commission) : '—'} valueClassName="text-purple-light" />
                <InfoRow label="Rating"     value={selected.rating ? `⭐ ${selected.rating}` : '—'} valueClassName="text-gold" />
              </div>
            </div>

            <div className="flex gap-3">
              {selected.status === 'Pending' && (
                <>
                  <Button size="md" onClick={() => act(selected,'approve')} className="flex-1 justify-center">✓ Approve</Button>
                  <Button size="md" variant="danger" onClick={() => act(selected,'reject')}>✕ Reject</Button>
                </>
              )}
              {selected.status === 'Active'  && <Button size="md" variant="danger"  onClick={() => setConfirm({ action:'block',   vendor:selected })}>Block Vendor</Button>}
              {selected.status === 'Blocked' && <Button size="md" variant="success" onClick={() => act(selected,'unblock')}>Unblock Vendor</Button>}
            </div>
          </div>
        )}
      </Modal>

      <ConfirmModal
        open={!!confirm}
        onClose={() => setConfirm(null)}
        onConfirm={() => confirm && act(confirm.vendor, confirm.action)}
        title={`${confirm?.action?.charAt(0).toUpperCase()}${confirm?.action?.slice(1)} Vendor`}
        message={`Are you sure you want to ${confirm?.action} "${confirm?.vendor?.name}"?`}
        confirmLabel={`${confirm?.action?.charAt(0).toUpperCase()}${confirm?.action?.slice(1)}`}
        danger={['block','reject'].includes(confirm?.action)}
      />
    </div>
  );
}
