// ─────────────────────────────────────────────────────────────────────────────
//  Admin Moderation  —  content approval queue
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from 'react';
import {
  StatCard, PageHeader, Button, StatusPill, EmptyState, Icon,
} from '../../components/ui/index.js';
import { useToast }       from '../../hooks/useToast.js';
import { ToastContainer } from '../../components/ui/Toast.jsx';
import { MODERATION_ITEMS } from '../../data/mockData.js';
import { cn }             from '../../utils/helpers.js';

const TYPE_ICON = {
  'Venue Description': '📝',
  'Image Upload':      '🖼️',
  'Pricing Update':    '🏷️',
  'Event Creation':    '🎉',
};

export default function AdminModeration() {
  const { toasts, show, dismiss } = useToast();
  const [items,  setItems]  = useState(MODERATION_ITEMS);
  const [filter, setFilter] = useState('all');
  const [expanded, setExpanded] = useState(null);

  const act = (id, action) => {
    setItems(its => its.map(it =>
      it.id === id ? { ...it, status: action === 'approve' ? 'Approved' : 'Rejected' } : it
    ));
    show(
      action === 'approve' ? 'Content approved and now live!' : 'Content rejected and removed.',
      action === 'approve' ? 'success' : 'error',
    );
    if (expanded === id) setExpanded(null);
  };

  const filtered = filter === 'all'
    ? items
    : items.filter(it => it.status.toLowerCase() === filter);

  const pending  = items.filter(i => i.status === 'Pending').length;
  const approved = items.filter(i => i.status === 'Approved').length;
  const rejected = items.filter(i => i.status === 'Rejected').length;

  return (
    <div className="p-6 space-y-6 animate-fade-up">
      <ToastContainer toasts={toasts} dismiss={dismiss} />

      <PageHeader title="Content Moderation" subtitle="Review venue content before it goes live" />

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
            {pending} item{pending !== 1 ? 's' : ''} awaiting your review
          </span>
        </div>
      )}

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {['all', 'pending', 'approved', 'rejected'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={cn(
              'px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all',
              filter === f
                ? 'bg-purple text-white shadow-purple'
                : 'dark:bg-dark-600 bg-white dark:border-dark-400 border-light-200 border dark:text-dark-100 text-dark-400 hover:text-purple-light',
            )}>
            {f === 'all' ? 'All' : f}
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
            <EmptyState icon="🎉" title="All caught up!" subtitle="No items in this category right now." />
          </div>
        )}

        {filtered.map(item => (
          <div key={item.id}
            className={cn(
              'dark:bg-dark-600 bg-white dark:border-dark-400 border-light-200 border rounded-2xl overflow-hidden transition-all',
              item.status === 'Pending' && 'dark:border-gold/20 border-gold/20',
            )}>

            {/* Header row */}
            <div className="flex items-start justify-between gap-4 p-5">
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-11 h-11 rounded-xl dark:bg-dark-700 bg-light-50 dark:border-dark-500 border-light-200 border flex items-center justify-center text-xl flex-shrink-0">
                  {TYPE_ICON[item.type] ?? '📋'}
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-sm">{item.venue}</div>
                  <div className="text-xs dark:text-dark-100 text-dark-400 mt-0.5">
                    <span className="text-purple-light font-semibold">{item.type}</span>
                    {' · '}by <span className="font-medium">{item.vendorName}</span>
                    {' · '}{item.submitted}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <StatusPill status={item.status} />
                <button
                  onClick={() => setExpanded(expanded === item.id ? null : item.id)}
                  className="w-8 h-8 rounded-xl dark:bg-dark-500 bg-light-100 flex items-center justify-center dark:text-dark-100 text-dark-400 hover:text-white transition-all"
                >
                  <Icon name={expanded === item.id ? 'chevron-up' : 'chevron-down'} size={14} />
                </button>
              </div>
            </div>

            {/* Expanded content */}
            {expanded === item.id && (
              <div className="px-5 pb-5 border-t dark:border-dark-500 border-light-200 pt-4 space-y-4 animate-fade-in">
                <div>
                  <div className="label-xs text-dark-100 mb-2">Submitted Content</div>
                  <div className="p-4 dark:bg-dark-700 bg-light-50 dark:border-dark-500 border-light-200 border rounded-xl text-sm dark:text-dark-100 text-dark-400 leading-relaxed">
                    {item.content}
                  </div>
                </div>

                {item.status === 'Pending' && (
                  <div className="flex gap-3">
                    <Button size="sm" onClick={() => act(item.id, 'approve')} leftIcon="check">
                      Approve & Publish
                    </Button>
                    <Button size="sm" variant="danger" onClick={() => act(item.id, 'reject')} leftIcon="x">
                      Reject
                    </Button>
                    <Button size="sm" variant="ghost-dark" leftIcon="eye">
                      Preview Live
                    </Button>
                  </div>
                )}

                {item.status !== 'Pending' && (
                  <div className={cn(
                    'flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl w-fit',
                    item.status === 'Approved'
                      ? 'bg-green/10 border border-green/20 text-green'
                      : 'bg-danger/10 border border-danger/20 text-danger',
                  )}>
                    <Icon name={item.status === 'Approved' ? 'check-circle' : 'x-circle'} size={14} />
                    {item.status === 'Approved' ? 'Live on platform' : 'Rejected — not published'}
                  </div>
                )}
              </div>
            )}

            {/* Quick actions (always visible for pending) */}
            {item.status === 'Pending' && expanded !== item.id && (
              <div className="flex gap-3 px-5 pb-4">
                <Button size="xs" onClick={() => act(item.id, 'approve')}>✓ Approve</Button>
                <Button size="xs" variant="danger" onClick={() => act(item.id, 'reject')}>✕ Reject</Button>
                <Button size="xs" variant="ghost-dark" onClick={() => setExpanded(item.id)}>View Content</Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
