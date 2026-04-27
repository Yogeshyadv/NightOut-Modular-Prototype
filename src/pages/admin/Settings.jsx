// ─────────────────────────────────────────────────────────────────────────────
//  Admin Settings  —  platform configuration
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from 'react';
import {
  PageHeader, Card, Button, Input, Select, Toggle, InfoRow,
} from '../../components/ui/index.js';
import { useToast }       from '../../hooks/useToast.js';
import { ToastContainer } from '../../components/ui/Toast.jsx';

export default function AdminSettings() {
  const { toasts, show, dismiss } = useToast();

  const [commission, setCommission] = useState({
    base:      '5',
    premium:   '4',
    newVendor: '3',
  });

  const [notifs, setNotifs] = useState({
    vendorApproval: true,
    highValue:      true,
    dailyReport:    true,
    weeklyDigest:   true,
    complaints:     true,
    systemAlerts:   true,
    moderation:     true,
    milestones:     false,
  });

  const [features, setFeatures] = useState({
    aiPlanner:       true,
    outfitCheck:     true,
    prideRides:      true,
    groupBooking:    true,
    goldMembership:  true,
    safetyMode:      true,
    liveQueue:       false,
    betaFeatures:    false,
  });

  const [rules, setRules] = useState({
    minDeposit:          '99',
    cancellationHours:   '4',
    noShowBanCount:      '3',
    reviewAutoApprove:   '4',
    maxGroupSize:        '10',
    refundAsCreditDays:  '7',
  });

  const setC = k => e => setCommission(c => ({ ...c, [k]: e.target.value }));
  const setR = k => e => setRules(r => ({ ...r, [k]: e.target.value }));

  return (
    <div className="p-6 space-y-6 animate-fade-up max-w-2xl">
      <ToastContainer toasts={toasts} dismiss={dismiss} />

      <PageHeader title="Platform Settings" subtitle="Global configuration and feature flags" />

      {/* ── Commission ── */}
      <Card>
        <div className="flex items-center justify-between pb-4 mb-5 border-b dark:border-dark-400 border-light-200">
          <div>
            <div className="font-display text-base font-bold">Commission Rates</div>
            <div className="text-xs dark:text-dark-100 text-dark-400 mt-0.5">Applied at booking checkout</div>
          </div>
          <Button size="sm" onClick={() => show('Commission rates saved and applied!')}>Save</Button>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-4">
          {[
            ['base',      'Base Rate (%)',         'All standard vendors'],
            ['premium',   'Premium Vendors (%)',   'Growth + Premium plans'],
            ['newVendor', 'New Vendor Rate (%)',    'First 3 months'],
          ].map(([key, label, hint]) => (
            <Input key={key} label={label} type="number" min="0" max="20"
              value={commission[key]} onChange={setC(key)} hint={hint} />
          ))}
        </div>
        <div className="p-3.5 bg-green/5 border border-green/15 rounded-xl text-xs text-green font-medium flex items-start gap-2">
          <span className="text-base leading-none">💡</span>
          At current volume, {commission.base}% commission generates approx. ₹24L/month in platform revenue.
        </div>
      </Card>

      {/* ── Platform rules ── */}
      <Card>
        <div className="flex items-center justify-between pb-4 mb-5 border-b dark:border-dark-400 border-light-200">
          <div>
            <div className="font-display text-base font-bold">Platform Rules</div>
            <div className="text-xs dark:text-dark-100 text-dark-400 mt-0.5">Applied globally across all venues</div>
          </div>
          <Button size="sm" onClick={() => show('Platform rules updated!')}>Save</Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            ['minDeposit',         'Min Deposit (₹)',           'Charged on all bookings'],
            ['cancellationHours',  'Cancellation Window (hrs)', 'Before event start time'],
            ['noShowBanCount',     'No-show Ban Threshold',     'Times before auto-block'],
            ['reviewAutoApprove',  'Auto-approve Reviews ≥',   'Stars (1–5)'],
            ['maxGroupSize',       'Max Group Size',            'Guests per booking'],
            ['refundAsCreditDays', 'Refund as Credit (days)',   'Days valid after cancellation'],
          ].map(([key, label, hint]) => (
            <Input key={key} label={label} type="number" value={rules[key]} onChange={setR(key)} hint={hint} />
          ))}
        </div>
      </Card>

      {/* ── Notifications ── */}
      <Card>
        <div className="flex items-center justify-between pb-4 mb-2 border-b dark:border-dark-400 border-light-200">
          <div>
            <div className="font-display text-base font-bold">Admin Notifications</div>
            <div className="text-xs dark:text-dark-100 text-dark-400 mt-0.5">Alerts sent to the super admin account</div>
          </div>
          <Button size="sm" variant="ghost-dark" onClick={() => show('Notification preferences saved!')}>Save</Button>
        </div>
        <div className="divide-y dark:divide-dark-400 divide-light-200">
          {[
            ['vendorApproval', 'Vendor Approval Requests',  'Alert when a new vendor submits for approval'],
            ['highValue',      'High-value Bookings',        'Bookings above ₹10,000'],
            ['dailyReport',    'Daily Revenue Report',       'Platform earnings digest at 11 PM'],
            ['weeklyDigest',   'Weekly Digest',              'Monday morning performance summary'],
            ['complaints',     'Complaint Escalations',      '48hr unresolved complaints'],
            ['systemAlerts',   'System Alerts',              'Infrastructure and payment gateway alerts'],
            ['moderation',     'Moderation Queue',           'New content submitted for review'],
            ['milestones',     'Platform Milestones',        'Revenue, user, and booking record alerts'],
          ].map(([key, label, sub]) => (
            <div key={key} className="py-0.5">
              <Toggle
                label={label} sub={sub}
                checked={notifs[key]}
                onChange={() => setNotifs(n => ({ ...n, [key]: !n[key] }))}
                accent="purple"
              />
            </div>
          ))}
        </div>
      </Card>

      {/* ── Feature flags ── */}
      <Card>
        <div className="flex items-center justify-between pb-4 mb-2 border-b dark:border-dark-400 border-light-200">
          <div>
            <div className="font-display text-base font-bold">Feature Flags</div>
            <div className="text-xs dark:text-dark-100 text-dark-400 mt-0.5">Toggle platform features for all users</div>
          </div>
          <Button size="sm" variant="purple" onClick={() => show('Feature flags deployed to production!', 'success')}>
            Deploy
          </Button>
        </div>
        <div className="divide-y dark:divide-dark-400 divide-light-200">
          {[
            ['aiPlanner',      'AI Night Planner',        'Gemini-powered venue discovery and recommendations'],
            ['outfitCheck',    'AI Outfit Checker',        'Vision API dress code verification at booking'],
            ['prideRides',     'Pride Rides',              'LGBTQ+-sensitised driver matching for safe transport'],
            ['groupBooking',   'Group Bookings',           'Allow bookings with 5+ guests'],
            ['goldMembership', 'Gold Membership',          'Premium subscription tier (₹299/mo) for users'],
            ['safetyMode',     'Safety Suite',             'Live location sharing, SOS panic button'],
            ['liveQueue',      'Live Queue Visibility',    'Show real-time venue queue length in app (beta)'],
            ['betaFeatures',   'Beta Features (Internal)', 'Enable unreleased features for internal testing'],
          ].map(([key, label, sub]) => (
            <div key={key} className="py-0.5">
              <Toggle
                label={label} sub={sub}
                checked={features[key]}
                onChange={() => setFeatures(f => ({ ...f, [key]: !f[key] }))}
                accent="purple"
              />
            </div>
          ))}
        </div>
      </Card>

      {/* ── Compliance ── */}
      <Card title="Compliance & Legal">
        <div className="space-y-3">
          {[
            ['DPDP Act 2023',            'Data retention limits enforced · 90-day post-deletion purge', true ],
            ['GSTIN Verification',       'Vendor GST validation at onboarding',                          true ],
            ['Rainbow Audit Log',        'Certification audit trail stored for 5 years',                 true ],
            ['Payment PCI-DSS',          'All card payments routed via Razorpay PCI-DSS L1',             true ],
            ['Minor Protection Filter',  'Age gate on booking — 18+ verification required',              true ],
          ].map(([title, desc, active]) => (
            <div key={title} className="flex items-start justify-between p-4 dark:bg-dark-700 bg-light-50 dark:border-dark-500 border-light-200 border rounded-xl gap-4">
              <div>
                <div className="text-sm font-semibold">{title}</div>
                <div className="text-xs dark:text-dark-100 text-dark-400 mt-0.5">{desc}</div>
              </div>
              <span className={`flex-shrink-0 text-[10px] font-bold px-2.5 py-1 rounded-full ${
                active ? 'bg-green/10 border border-green/20 text-green' : 'bg-danger/10 border border-danger/20 text-danger'
              }`}>
                {active ? 'ACTIVE' : 'INACTIVE'}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* ── Danger zone ── */}
      <div className="dark:bg-dark-600 bg-white dark:border-danger/20 border-danger/20 border rounded-2xl p-5 space-y-3">
        <div className="font-display text-sm font-bold text-danger">Danger Zone</div>
        {[
          ['Flush Cache',          'Clear all Redis caches and CDN edge nodes'],
          ['Force Re-index',       'Rebuild the full Elasticsearch search index'],
          ['Platform Maintenance', 'Take the platform offline for emergency maintenance'],
        ].map(([label, desc]) => (
          <div key={label} className="flex items-center justify-between p-4 bg-danger/5 dark:border-danger/10 border-danger/10 border rounded-xl">
            <div>
              <div className="text-sm font-semibold">{label}</div>
              <div className="text-xs dark:text-dark-100 text-dark-400 mt-0.5">{desc}</div>
            </div>
            <Button size="xs" variant="danger"
              onClick={() => show(`"${label}" requires two-factor confirmation. Please use the CLI.`, 'error')}>
              Execute
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
