// ─────────────────────────────────────────────────────────────────────────────
//  Admin Moderation  —  content approval queue
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from 'react';
import { useAdminVenues } from '../../hooks/useAdminData.js';
import {
  StatCard, PageHeader, Button, StatusPill, EmptyState, Icon,
} from '../../components/ui/index.js';
import { useToast }       from '../../hooks/useToast.js';
import { ToastContainer } from '../../components/ui/Toast.jsx';
import { cn }             from '../../utils/helpers.js';

const TYPE_ICON = {
  'Venue Description': '📝',
  'Image Upload':      '🖼️',
  'Pricing Update':    '🏷️',
  'Event Creation':    '🎉',
};

export default function AdminModeration() {

  const { venues: rawVenues, loading, updateVenueStatus } = useAdminVenues();
  const { toasts, show, dismiss } = useToast();
  const [filter, setFilter] = useState('pending');
  const [expanded, setExpanded] = useState(null);

  const act = async (id, action) => {
    const status = action === 'approve' ? 'active' : 'rejected';
    const res = await updateVenueStatus(id, status);
    if (res.success) {
      if (expanded === id) setExpanded(null);
    }
  };

  const statusMap = {
    pending: 'Pending',
    active: 'Approved',
    rejected: 'Rejected'
  };

  const venues = rawVenues.map(v => ({
    ...v,
    id: v._id,
    displayStatus: statusMap[v.status] || 'Pending'
  }));

  const filtered = filter === 'all'
    ? venues
    : venues.filter(v => v.status === filter);

  const pending  = venues.filter(i => i.status === 'pending').length;
  const approved = venues.filter(i => i.status === 'active').length;
  const rejected = venues.filter(i => i.status === 'rejected').length;

  if (loading) {
    return <div className="p-6 space-y-6">
      <div className="h-24 shimmer rounded-2xl w-1/3" />
      <div className="space-y-4">
        {[1,2,3].map(i => <div key={i} className="h-32 shimmer rounded-2xl" />)}
      </div>
    </div>;
  }

  return (
    <div className="p-6 space-y-6 animate-fade-up">
      <ToastContainer toasts={toasts} dismiss={dismiss} />

      <PageHeader title="Venue Moderation" subtitle="Review and approve new venues" />

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard icon="⏳" label="Pending Review" value={pending}  accent="gold"   />
        <StatCard icon="✅" label="Approved"        value={approved} accent="green"  />
        <StatCard icon="❌" label="Rejected"        value={rejected} accent="danger" changeUp={false} />
      </div>

      {/* Pending alert banner */}
      {pending > 0 && (
        <div className="flex items-center gap-2.5 px-4 py-3 bg-gold/10 border border-gold/25 rounded-xl">
          <Icon name="alert" size={15} className="text-gold flex-shrink-0" />
          <span className="text-sm font-semibold text-gold">
            {pending} venue{pending !== 1 ? 's' : ''} awaiting your review
          </span>
        </div>
      )}

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {['all', 'pending', 'active', 'rejected'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={cn(
              'px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all',
              filter === f
                ? 'bg-purple text-white shadow-purple'
                : 'dark:bg-dark-600 bg-white dark:border-dark-400 border-light-200 border dark:text-dark-100 text-dark-400 hover:text-purple-light',
            )}>
            {f === 'all' ? 'All' : f === 'active' ? 'Approved' : f}
            {f === 'pending' && pending > 0 && (
              <span className="ml-1.5 bg-danger text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{pending}</span>
            )}
          </button>
        ))}
      </div>

      {/* Item list */}
      <div className="space-y-4">
        {filtered.length === 0 && (
          <div className="dark:bg-dark-600 bg-white dark:border-dark-400 border-light-200 border rounded-2xl p-12">
            <EmptyState icon="🎉" title="All caught up!" subtitle="No venues in this category right now." />
          </div>
        )}

        {filtered.map(venue => (
          <div key={venue.id}
            className={cn(
              'dark:bg-dark-600 bg-white dark:border-dark-400 border-light-200 border rounded-2xl overflow-hidden transition-all',
              venue.status === 'pending' && 'dark:border-gold/20 border-gold/20',
            )}>

            {/* Header row */}
            <div className="flex items-start justify-between gap-4 p-5">
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-11 h-11 rounded-xl dark:bg-dark-700 bg-light-50 dark:border-dark-500 border-light-200 border flex items-center justify-center text-xl flex-shrink-0">
                  🏢
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-sm">{venue.name}</div>
                  <div className="text-xs dark:text-dark-100 text-dark-400 mt-0.5">
                    <span className="text-purple-light font-semibold">{venue.location}</span>
                    {' · '}submitted on {new Date(venue.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <StatusPill status={venue.displayStatus} />
                <button
                  onClick={() => setExpanded(expanded === venue.id ? null : venue.id)}
                  className="w-8 h-8 rounded-xl dark:bg-dark-500 bg-light-100 flex items-center justify-center dark:text-dark-100 text-dark-400 hover:text-white transition-all"
                >
                  <Icon name={expanded === venue.id ? 'chevron-up' : 'chevron-down'} size={14} />
                </button>
              </div>
            </div>

            {/* Expanded content */}
            {expanded === venue.id && (
              <div className="px-5 pb-5 border-t dark:border-dark-500 border-light-200 pt-4 space-y-4 animate-fade-in">
                <div>
                  <div className="label-xs text-dark-100 mb-2">Description</div>
                  <div className="p-4 dark:bg-dark-700 bg-light-50 dark:border-dark-500 border-light-200 border rounded-xl text-sm dark:text-dark-100 text-dark-400 leading-relaxed">
                    {venue.description}
                  </div>
                </div>

                {venue.status === 'pending' && (
                  <div className="flex gap-3">
                    <Button size="sm" onClick={() => act(venue.id, 'approve')} leftIcon="check">
                      Approve & Publish
                    </Button>
                    <Button size="sm" variant="danger" onClick={() => act(venue.id, 'reject')} leftIcon="x">
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Quick actions (always visible for pending) */}
            {venue.status === 'pending' && expanded !== venue.id && (
              <div className="flex gap-3 px-5 pb-4">
                <Button size="xs" onClick={() => act(venue.id, 'approve')}>✓ Approve</Button>
                <Button size="xs" variant="danger" onClick={() => act(venue.id, 'reject')}>✕ Reject</Button>
                <Button size="xs" variant="ghost-dark" onClick={() => setExpanded(venue.id)}>View Details</Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

