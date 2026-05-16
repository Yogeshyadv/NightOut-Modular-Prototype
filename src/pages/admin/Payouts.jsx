// ─────────────────────────────────────────────────────────────────────────────
//  Admin Payout Management
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useEffect } from 'react';
import {
  Card, PageHeader, Button, StatusPill, Modal, Textarea
} from '../../components/ui/index.js';
import Table            from '../../components/ui/Table.jsx';
import api              from '../../utils/api';
import { fmt }          from '../../utils/helpers.js';
import { useToast }      from '../../hooks/useToast.js';
import { ToastContainer } from '../../components/ui/Toast.jsx';

export default function AdminPayouts() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [notes, setNotes] = useState('');
  const { toasts, show, dismiss } = useToast();

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await api.get('/wallet/admin/withdrawals');
      if (res.data.success) setRequests(res.data.data);
    } catch (err) {
      show('Failed to load payout requests', 'danger');
    } finally {
      setLoading(false);
    }
  };

  const processRequest = async (status) => {
    try {
      const res = await api.put(`/wallet/admin/withdrawals/${selected._id}`, {
        status,
        adminNotes: notes
      });
      if (res.data.success) {
        show(`Payout ${status} successfully`, 'success');
        setSelected(null);
        setNotes('');
        fetchRequests();
      }
    } catch (err) {
      show('Processing failed', 'danger');
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const columns = [
    { key: 'createdAt', label: 'Requested', render: v => new Date(v).toLocaleDateString() },
    { key: 'vendor',    label: 'Vendor',    render: v => (
      <div>
        <div className="font-bold">{v?.business || 'Unknown'}</div>
        <div className="text-[10px] opacity-60">{v?.name}</div>
      </div>
    )},
    { key: 'amount',    label: 'Amount',    render: v => <span className="font-bold text-green">{fmt.currency(v)}</span> },
    { key: 'method',    label: 'Method' },
    { key: 'status',    label: 'Status',    render: v => <StatusPill status={v} /> },
    { key: '_id',       label: 'Actions',   render: (_, row) => row.status === 'pending' && (
      <Button size="xs" variant="purple" onClick={() => setSelected(row)}>Review</Button>
    )}
  ];

  return (
    <div className="p-6 space-y-6 animate-fade-up">
      <ToastContainer toasts={toasts} dismiss={dismiss} />
      <PageHeader title="Payout Requests" subtitle="Review and process vendor withdrawals" />

      <Card noPad>
        <Table 
          data={requests}
          columns={columns}
          loading={loading}
          emptyTitle="No payout requests"
          emptySubtitle="Vendor withdrawal requests will appear here."
        />
      </Card>

      <Modal 
        open={!!selected} 
        onClose={() => setSelected(null)} 
        title="Review Payout" 
        subtitle={`Request for ${fmt.currency(selected?.amount || 0)} by ${selected?.vendor?.business}`}
      >
        <div className="space-y-4 pt-4">
           <div className="p-4 dark:bg-dark-700 bg-light-50 rounded-2xl border dark:border-dark-500 border-light-200">
              <div className="text-xs font-bold opacity-60 uppercase mb-2">Payment Details ({selected?.method})</div>
              <div className="font-mono text-sm break-all">{selected?.methodDetails}</div>
           </div>

           <Textarea 
             label="Admin Notes (Optional)" 
             placeholder="Transaction ID or reason for rejection..."
             value={notes}
             onChange={e => setNotes(e.target.value)}
           />

           <div className="grid grid-cols-2 gap-3 pt-2">
              <Button variant="danger" fullWidth onClick={() => processRequest('rejected')}>Reject Request</Button>
              <Button variant="purple" fullWidth onClick={() => processRequest('completed')}>Mark as Paid</Button>
           </div>
        </div>
      </Modal>
    </div>
  );
}
