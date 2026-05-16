// ─────────────────────────────────────────────────────────────────────────────
//  Vendor Wallet & Payouts
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from 'react';
import {
  StatCard, Card, PageHeader, Button, Icon, Modal, Input, Select, StatusPill
} from '../../components/ui/index.js';
import Table            from '../../components/ui/Table.jsx';
import { useWallet }     from '../../hooks/useWallet.js';
import { fmt, cn }       from '../../utils/helpers.js';

export default function Wallet() {
  const { wallet, history, loading, requestPayout } = useWallet();
  const [showPayout, setShowPayout] = useState(false);
  const [payoutForm, setPayoutForm] = useState({ amount: '', method: 'UPI', methodDetails: '' });

  const handlePayout = async (e) => {
    e.preventDefault();
    if (!payoutForm.amount || !payoutForm.methodDetails) return;
    
    const res = await requestPayout({
      amount: Number(payoutForm.amount),
      method: payoutForm.method,
      methodDetails: payoutForm.methodDetails
    });

    if (res.success) {
      setShowPayout(false);
      setPayoutForm({ amount: '', method: 'UPI', methodDetails: '' });
    }
  };

  const columns = [
    { key: 'createdAt', label: 'Date', render: v => <span className="dark:text-dark-100 text-dark-400">{new Date(v).toLocaleDateString()}</span> },
    { key: 'amount',    label: 'Amount', render: v => <span className="font-bold text-green">{fmt.currency(v)}</span> },
    { key: 'method',    label: 'Method' },
    { key: 'status',    label: 'Status', render: v => <StatusPill status={v} /> },
    { key: 'methodDetails', label: 'Details', render: v => <span className="text-xs opacity-60 font-mono">{v}</span> }
  ];

  if (loading && !wallet) {
    return (
      <div className="p-6 space-y-6 animate-fade-up">
        <PageHeader title="Wallet" subtitle="Your earnings and payouts" />
        <div className="h-64 shimmer dark:bg-dark-600 bg-white rounded-3xl" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 animate-fade-up">
      <PageHeader 
        title="Wallet" 
        subtitle="Manage your earnings and request payouts"
        action={
          <Button leftIcon="wallet" onClick={() => setShowPayout(true)} disabled={wallet?.balance < 500}>
            Request Payout
          </Button>
        }
      />

      {/* Financial Summary */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
        <div className="xl:col-span-2 relative overflow-hidden dark:bg-dark-600 bg-white dark:border-dark-400 border-light-200 border rounded-3xl p-6 shadow-xl">
           <div className="absolute top-0 right-0 p-8 opacity-[0.03] scale-[3] pointer-events-none">
             <Icon name="wallet" size={64} />
           </div>
           <div className="relative">
             <div className="label-xs text-green mb-1 uppercase tracking-widest font-bold">Withdrawable Balance</div>
             <div className="heading-lg text-green mb-2">{fmt.currency(wallet?.balance || 0)}</div>
             <p className="text-xs dark:text-dark-100 text-dark-400 max-w-xs leading-relaxed">
               Earnings from bookings are credited to your balance instantly upon guest check-in (after 15% platform fee).
             </p>
             <div className="mt-6 flex gap-4">
                <div className="flex-1 px-4 py-3 dark:bg-dark-700 bg-light-50 rounded-2xl border dark:border-dark-500 border-light-200">
                   <div className="text-[10px] uppercase font-bold dark:text-dark-100 text-dark-400 mb-0.5">Total Earned</div>
                   <div className="text-lg font-bold">{fmt.currency(wallet?.totalEarned || 0)}</div>
                </div>
                <div className="flex-1 px-4 py-3 dark:bg-dark-700 bg-light-50 rounded-2xl border dark:border-dark-500 border-light-200">
                   <div className="text-[10px] uppercase font-bold dark:text-dark-100 text-dark-400 mb-0.5">Withdrawn</div>
                   <div className="text-lg font-bold">{fmt.currency(wallet?.totalWithdrawn || 0)}</div>
                </div>
             </div>
           </div>
        </div>

        <div className="space-y-4">
          <StatCard icon="⏳" label="Pending Approval" value={fmt.shortCurrency(wallet?.pendingWithdrawals || 0)} accent="purple" />
          <StatCard icon="%" label="Platform Fee" value="15%" accent="info" />
        </div>

        <div className="dark:bg-dark-600 bg-white dark:border-dark-400 border-light-200 border rounded-3xl p-6 flex flex-col justify-center gap-3">
           <div className="text-sm font-bold">Minimum Payout</div>
           <div className="text-2xl font-black text-purple-light">₹500.00</div>
           <div className="text-[11px] dark:text-dark-100 text-dark-400 leading-relaxed">
             Payout requests are typically processed within 24-48 business hours.
           </div>
        </div>
      </div>

      {/* History */}
      <Card title="Payout History" subtitle="Your recent withdrawal requests">
        <Table 
          data={history}
          columns={columns}
          emptyIcon="💸"
          emptyTitle="No payouts yet"
          emptySubtitle="Your withdrawal history will appear here once you request your first payout."
          pageSize={5}
        />
      </Card>

      {/* Payout Modal */}
      <Modal open={showPayout} onClose={() => setShowPayout(false)} title="Request Payout" subtitle="Transfer funds to your account">
        <form onSubmit={handlePayout} className="space-y-4 pt-2">
          <div className="dark:bg-dark-700 bg-light-50 p-4 rounded-2xl border dark:border-dark-500 border-light-200 mb-2">
            <div className="text-xs font-bold opacity-60 uppercase mb-1">Available for withdrawal</div>
            <div className="text-2xl font-black text-green">{fmt.currency(wallet?.balance || 0)}</div>
          </div>

          <Input 
            label="Amount to Withdraw" 
            type="number" 
            placeholder="e.g. 1000" 
            min="500" 
            max={wallet?.balance}
            value={payoutForm.amount}
            onChange={e => setPayoutForm(p => ({ ...p, amount: e.target.value }))}
            required
          />

          <Select 
            label="Payment Method" 
            options={['UPI', 'Bank Transfer']} 
            value={payoutForm.method}
            onChange={e => setPayoutForm(p => ({ ...p, method: e.target.value }))}
          />

          <Input 
            label={payoutForm.method === 'UPI' ? 'UPI ID' : 'Bank Account Details'} 
            placeholder={payoutForm.method === 'UPI' ? 'yourname@upi' : 'Account No, IFSC, Name'}
            value={payoutForm.methodDetails}
            onChange={e => setPayoutForm(p => ({ ...p, methodDetails: e.target.value }))}
            required
          />

          <div className="pt-2">
            <Button type="submit" fullWidth size="lg">Submit Payout Request</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
