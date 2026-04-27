// ─────────────────────────────────────────────────────────────────────────────
//  Admin User Management
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from 'react';
import {
  StatCard, PageHeader, Button, StatusPill, InfoRow, Avatar, Modal, ConfirmModal,
} from '../../components/ui/index.js';
import Table            from '../../components/ui/Table.jsx';
import { useToast }     from '../../hooks/useToast.js';
import { ToastContainer } from '../../components/ui/Toast.jsx';
import { PLATFORM_USERS, BOOKINGS } from '../../data/mockData.js';
import { fmt }          from '../../utils/helpers.js';

export default function AdminUsers() {
  const { toasts, show, dismiss } = useToast();
  const [users,    setUsers]    = useState(PLATFORM_USERS);
  const [selected, setSelected] = useState(null);
  const [confirm,  setConfirm]  = useState(null);

  const act = (user, action) => {
    const statusMap = { block:'Blocked', unblock:'Active', flag:'Flagged' };
    setUsers(us => us.map(u => u.id === user.id ? { ...u, status: statusMap[action] } : u));
    const msgs = { block:`${user.name} blocked.`, unblock:`${user.name} restored to active.`, flag:`${user.name} flagged for review.` };
    show(msgs[action], action === 'unblock' ? 'success' : action === 'flag' ? 'warning' : 'error');
    setSelected(null); setConfirm(null);
  };

  // bookings belonging to selected user
  const userBookings = selected
    ? BOOKINGS.filter(b => b.guest.toLowerCase().includes(selected.name.split(' ')[0].toLowerCase()))
    : [];

  const columns = [
    {
      key:'name', label:'User',
      render: (v, row) => (
        <div className="flex items-center gap-2.5">
          <Avatar name={v} size={32} accent={row.status==='Blocked'?'danger':row.status==='Flagged'?'gold':'green'} />
          <div>
            <div className="text-sm font-bold">{v}</div>
            <div className="text-[11px] dark:text-dark-100 text-dark-400">{row.email}</div>
          </div>
        </div>
      ),
    },
    { key:'city',     label:'City',      render: v => <span className="dark:text-dark-100 text-dark-400">{v}</span> },
    { key:'joined',   label:'Joined',    render: v => <span className="dark:text-dark-100 text-dark-400 text-xs">{v}</span> },
    { key:'bookings', label:'Bookings',  sortable:true, render: v => <span className="font-bold">{v}</span> },
    { key:'spent',    label:'Spent',     sortable:true, render: v => <span className="font-bold text-green">{fmt.currency(v)}</span> },
    { key:'lastSeen', label:'Last Seen', render: v => <span className="dark:text-dark-100 text-dark-400 text-xs">{v}</span> },
    { key:'status',   label:'Status' },
  ];

  return (
    <div className="p-6 space-y-6 animate-fade-up">
      <ToastContainer toasts={toasts} dismiss={dismiss} />
      <PageHeader title="User Management" subtitle={`${users.length} registered users`} />

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon="users"  label="Total Users" value={users.length}                               accent="info"   />
        <StatCard icon="✅"      label="Active"       value={users.filter(u=>u.status==='Active').length}  accent="green"  />
        <StatCard icon="⚠️"      label="Flagged"      value={users.filter(u=>u.status==='Flagged').length} accent="warn"  changeUp={false} />
        <StatCard icon="🚫"      label="Blocked"      value={users.filter(u=>u.status==='Blocked').length} accent="danger" changeUp={false} />
      </div>

      <Table
        data={users}
        columns={columns}
        searchable
        searchPlaceholder="Search by name, email, phone, city…"
        searchKeys={['name','email','phone','city']}
        filters={[
          { key:'status', label:'All Status', options:['Active','Flagged','Blocked'].map(s=>({value:s,label:s})) },
          { key:'city',   label:'All Cities', options:['Jaipur','Delhi','Mumbai','Bengaluru','Hyderabad'].map(c=>({value:c,label:c})) },
        ]}
        onRowClick={setSelected}
        rowActions={row => (
          <div className="flex gap-1.5">
            {row.status === 'Active'  && <Button size="xs" variant="warning"    onClick={() => setConfirm({ action:'flag',    user:row })}>Flag</Button>}
            {row.status !== 'Blocked' && <Button size="xs" variant="danger"     onClick={() => setConfirm({ action:'block',   user:row })}>Block</Button>}
            {row.status === 'Blocked' && <Button size="xs" variant="success"    onClick={() => act(row,'unblock')}>Unblock</Button>}
            <Button size="xs" variant="ghost-dark" leftIcon="eye" onClick={() => setSelected(row)}>View</Button>
          </div>
        )}
        emptyIcon="👥" emptyTitle="No users found" pageSize={8}
      />

      {/* Detail modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title="User Profile" subtitle={`ID: ${selected?.id}`} size="lg">
        {selected && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 dark:bg-dark-700 bg-light-50 dark:border-dark-500 border-light-200 border rounded-2xl">
              <Avatar name={selected.name} size={52} accent="green" />
              <div>
                <div className="font-display text-lg font-bold">{selected.name}</div>
                <div className="text-sm dark:text-dark-100 text-dark-400">{selected.email} · {selected.city}</div>
                <div className="mt-1.5 flex items-center gap-2">
                  <StatusPill status={selected.status} />
                  <span className="text-xs dark:text-dark-100 text-dark-400">Last seen {selected.lastSeen}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="dark:bg-dark-700 bg-light-50 dark:border-dark-500 border-light-200 border rounded-2xl p-4">
                <div className="label-xs text-dark-100 mb-3">Account Info</div>
                <InfoRow label="Phone"      value={selected.phone}  />
                <InfoRow label="City"       value={selected.city}   />
                <InfoRow label="Joined"     value={selected.joined} />
                <InfoRow label="Bookings"   value={selected.bookings} />
                <InfoRow label="Total Spent" value={fmt.currency(selected.spent)} valueClassName="text-green" />
              </div>
              <div className="dark:bg-dark-700 bg-light-50 dark:border-dark-500 border-light-200 border rounded-2xl p-4">
                <div className="label-xs text-dark-100 mb-3">Recent Bookings</div>
                {userBookings.length > 0 ? userBookings.slice(0,4).map(b => (
                  <div key={b.id} className="py-2 border-b dark:border-dark-500 border-light-200 last:border-0">
                    <div className="text-xs font-semibold">{b.venue}</div>
                    <div className="flex justify-between text-[10px] dark:text-dark-100 text-dark-400 mt-0.5">
                      <span>{b.date}</span>
                      <span className="text-green">{fmt.currency(b.amount)}</span>
                    </div>
                  </div>
                )) : (
                  <div className="text-xs dark:text-dark-100 text-dark-400 py-4 text-center">No recent bookings</div>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              {selected.status !== 'Blocked' && <Button size="md" variant="danger" onClick={() => act(selected,'block')}>Block User</Button>}
              {selected.status === 'Active'  && <Button size="md" variant="warning" onClick={() => act(selected,'flag')}>Flag for Review</Button>}
              {selected.status === 'Blocked' && <Button size="md" variant="success" onClick={() => act(selected,'unblock')}>Unblock User</Button>}
            </div>
          </div>
        )}
      </Modal>

      <ConfirmModal
        open={!!confirm}
        onClose={() => setConfirm(null)}
        onConfirm={() => confirm && act(confirm.user, confirm.action)}
        title={`${confirm?.action === 'flag' ? 'Flag' : 'Block'} User`}
        message={`Are you sure you want to ${confirm?.action} "${confirm?.user?.name}"?`}
        confirmLabel={confirm?.action === 'flag' ? 'Flag User' : 'Block User'}
        danger
      />
    </div>
  );
}
