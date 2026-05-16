import { useState } from 'react';
import { PageHeader, Card, Button, StatusPill, EmptyState, Icon, StatCard } from '../../components/ui/index.js';
import { useAdminVerifications } from '../../hooks/useAdminVerifications.js';
import { useNotifications } from '../../hooks/useNotifications.js';
import { cn } from '../../utils/helpers.js';
import { useEffect } from 'react';

export default function AdminVerifications() {
  const { applications, loading, review } = useAdminVerifications();
  const { markTypeRead } = useNotifications();
  const [filter, setFilter] = useState('pending');
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    markTypeRead('verification_applied');
  }, []);


  const filtered = filter === 'all' 
    ? applications 
    : applications.filter(a => a.status === filter);

  const pending = applications.filter(a => a.status === 'pending').length;

  if (loading) return <div className="p-6">Loading queue...</div>;

  return (
    <div className="p-6 space-y-6 animate-fade-up">
      <PageHeader title="Vendor Verification" subtitle="Review business applications for marketplace access" />

      <div className="grid grid-cols-3 gap-4">
        <StatCard icon="🛡️" label="Pending Verification" value={pending} accent="gold" />
        <StatCard icon="✅" label="Approved Vendors" value={applications.filter(a=>a.status==='approved').length} accent="green" />
        <StatCard icon="🏢" label="Total Applications" value={applications.length} accent="purple" />
      </div>

      <div className="flex gap-2">
        {['pending', 'approved', 'rejected', 'all'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={cn(
              'px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all',
              filter === f ? 'bg-purple text-white shadow-lg' : 'dark:bg-dark-600 bg-white border dark:border-dark-400 border-light-200'
            )}>
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.length === 0 && (
          <Card className="p-12">
            <EmptyState title="No applications found" subtitle="The queue is currently empty." />
          </Card>
        )}

        {filtered.map(app => (
          <Card key={app._id} className="overflow-hidden border-l-4 border-l-purple/50">
            <div className="p-5 flex items-start justify-between bg-dark-700/30">
              <div className="flex gap-4">
                <div className="w-14 h-14 bg-dark-800 rounded-2xl flex items-center justify-center text-xl overflow-hidden border dark:border-dark-500 border-light-200">
                  {app.logo ? (
                    <img src={app.logo} className="w-full h-full object-cover" alt="Logo" />
                  ) : (
                    <Icon name="building" size={24} className="text-dark-400" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg">{app.businessName}</h3>
                    <span className={cn(
                      "text-[10px] px-2 py-0.5 rounded-lg font-black uppercase tracking-tighter",
                      app.selectedPlan === 'elite' ? 'bg-purple/20 text-purple-light' : 
                      app.selectedPlan === 'pro' ? 'bg-green/20 text-green' : 'bg-dark-500 text-dark-100'
                    )}>
                      {app.selectedPlan}
                    </span>
                  </div>
                  <div className="text-xs text-dark-100 mt-0.5 italic">"{app.slogan || 'No slogan provided'}"</div>
                  <div className="text-[10px] text-dark-400 mt-1 uppercase font-bold tracking-wider">
                    Owner: {app.vendor?.name} • {app.vendor?.email}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <StatusPill status={app.status === 'approved' ? 'Active' : app.status === 'rejected' ? 'Rejected' : 'Pending'} />
                <button 
                  onClick={() => setExpanded(expanded === app._id ? null : app._id)}
                  className="p-2 hover:bg-white/5 rounded-lg"
                >
                  <Icon name={expanded === app._id ? 'chevron-up' : 'chevron-down'} size={16} />
                </button>
              </div>
            </div>

            {expanded === app._id && (
              <div className="px-5 pb-5 pt-4 border-t dark:border-dark-600 border-light-200 space-y-6 animate-fade-in">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="label-xs text-dark-100 mb-2">Business Details</div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-dark-400">License/GST:</span>
                        <span className="font-mono font-bold text-green">{app.businessId}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-dark-400">Contact:</span>
                        <span className="font-semibold">{app.contactNumber}</span>
                      </div>
                      <div className="text-sm mt-2">
                        <span className="text-dark-400">Address:</span>
                        <div className="text-dark-100 mt-1 italic">{app.businessAddress}</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="label-xs text-dark-100 mb-2">Documents</div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-3 border dark:border-dark-500 border-light-200 rounded-xl flex items-center gap-2 cursor-pointer hover:bg-white/5">
                        <Icon name="file" size={14} className="text-purple-light" />
                        <span className="text-[10px] font-bold">Business_ID.pdf</span>
                      </div>
                      <div className="p-3 border dark:border-dark-500 border-light-200 rounded-xl flex items-center gap-2 cursor-pointer hover:bg-white/5">
                        <Icon name="file" size={14} className="text-purple-light" />
                        <span className="text-[10px] font-bold">License.jpg</span>
                      </div>
                    </div>
                  </div>
                </div>

                {app.status === 'pending' && (
                  <div className="flex gap-3 pt-2">
                    <Button onClick={() => review(app._id, 'approved')} leftIcon="check">
                      Approve & Verify Vendor
                    </Button>
                    <Button variant="danger" onClick={() => review(app._id, 'rejected')} leftIcon="x">
                      Reject Application
                    </Button>
                  </div>
                )}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
