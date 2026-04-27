// ─────────────────────────────────────────────────────────────────────────────
//  Vendor Settings
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from 'react';
import {
  PageHeader, Card, Button, Input, Select, Textarea,
  Toggle, InfoRow, Avatar, Icon,
} from '../../components/ui/index.js';
import { useToast }     from '../../hooks/useToast.js';
import { ToastContainer } from '../../components/ui/Toast.jsx';
import { useAuth }      from '../../context/AuthContext.jsx';
import { VENDOR_INFO }  from '../../data/mockData.js';

// Import VENDOR_INFO — fallback to inline if not in mockData yet
const VI = {
  name:'Amit Kumar', email:'amit@fbar.in', phone:'+91 98765 00001',
  businessName:'F Bar & Lounge', city:'Jaipur', address:'MI Road, Jaipur, Rajasthan 302001',
  joined:'Oct 2025', plan:'Premium', commissionRate:5, totalVenues:2, rating:4.5,
  ...VENDOR_INFO,
};

const CITY_OPTIONS = ['Jaipur','Delhi','Mumbai','Bengaluru','Chennai','Hyderabad','Pune','Kolkata'];

export default function VendorSettings() {
  const { user } = useAuth();
  const { toasts, show, dismiss } = useToast();

  const [profile, setProfile] = useState({
    name:         user?.name         ?? VI.name,
    email:        user?.email        ?? VI.email,
    phone:                              VI.phone,
    businessName: user?.business     ?? VI.businessName,
    city:         user?.city         ?? VI.city,
    address:                            VI.address,
  });

  const [notifs, setNotifs] = useState({
    newBooking:      true,
    checkin:         true,
    noShow:          true,
    dailySummary:    true,
    weeklyReport:    true,
    pricingReminder: true,
    complaints:      true,
    marketing:       false,
  });

  const [rules, setRules] = useState({
    minDeposit:        '99',
    cancellationHours: '4',
    noShowBan:         '3',
    maxGuests:         '10',
    autoCheckout:      false,
    requireDressCode:  true,
    allowGroups:       true,
  });

  const setP   = k => e  => setProfile(p => ({ ...p, [k]: e.target.value }));
  const setR   = k => e  => setRules(r   => ({ ...r, [k]: e.target.value }));
  const toggleN = k      => setNotifs(n  => ({ ...n, [k]: !n[k] }));
  const toggleR = k => v => setRules(r   => ({ ...r, [k]: v }));

  return (
    <div className="p-6 space-y-6 animate-fade-up max-w-2xl">
      <ToastContainer toasts={toasts} dismiss={dismiss} />

      <PageHeader title="Settings" subtitle="Account and venue preferences" />

      {/* ── Profile & business ── */}
      <Card>
        <div className="flex items-center justify-between pb-5 mb-5 border-b dark:border-dark-400 border-light-200">
          <div className="font-display text-base font-bold">Profile & Business</div>
          <Button size="sm" onClick={() => show('Profile saved successfully!')}>Save Changes</Button>
        </div>

        {/* Avatar chip */}
        <div className="flex items-center gap-4 p-4 dark:bg-dark-700 bg-light-50 dark:border-dark-500 border-light-200 border rounded-2xl mb-5">
          <Avatar name={profile.name} size={56} accent="green" />
          <div>
            <div className="font-display text-lg font-bold">{profile.name}</div>
            <div className="text-sm dark:text-dark-100 text-dark-400">{profile.businessName} · {profile.city}</div>
            <div className="mt-1.5 flex gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green/10 border border-green/20 text-green">✓ Verified</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gold/10 border border-gold/20 text-gold">Premium Plan</span>
            </div>
          </div>
          <Button size="xs" variant="ghost-dark" className="ml-auto">Change Photo</Button>
        </div>

        {/* Form */}
        <div className="grid grid-cols-2 gap-4">
          <Input label="Full Name"      value={profile.name}         onChange={setP('name')}         />
          <Input label="Email"          type="email" value={profile.email}  onChange={setP('email')}  />
          <Input label="Phone"          type="tel"   value={profile.phone}  onChange={setP('phone')}  placeholder="+91 98765 00000" />
          <Input label="Business Name"  value={profile.businessName} onChange={setP('businessName')} />
          <Select label="City" options={CITY_OPTIONS} value={profile.city} onChange={setP('city')} />
          <Input label="Address"        value={profile.address}      onChange={setP('address')}      />
        </div>
      </Card>

      {/* ── Account info ── */}
      <Card title="Account Details">
        <InfoRow label="Vendor ID"       value={VI.id ?? 'V001'}               />
        <InfoRow label="Member Since"    value={VI.joined}                      />
        <InfoRow label="Plan"            value={VI.plan}   valueClassName="text-gold"          />
        <InfoRow label="Commission Rate" value={`${VI.commissionRate}%`} valueClassName="text-purple-light" />
        <InfoRow label="Total Venues"    value={VI.totalVenues}                 />
        <InfoRow label="Overall Rating"  value={`⭐ ${VI.rating}`} valueClassName="text-gold"  />
      </Card>

      {/* ── Notifications ── */}
      <Card>
        <div className="flex items-center justify-between pb-4 mb-2 border-b dark:border-dark-400 border-light-200">
          <div className="font-display text-base font-bold">Notifications</div>
          <Button size="sm" variant="ghost-dark" onClick={() => show('Notification preferences saved!')}>Save</Button>
        </div>
        <div className="divide-y dark:divide-dark-400 divide-light-200">
          {[
            ['newBooking',      'New Bookings',              'Get notified for every booking at your venues'],
            ['checkin',         'Check-in Alerts',           'When a guest successfully scans their QR'],
            ['noShow',          'No-show Alerts',            'Flag guests who don\'t arrive after confirming'],
            ['dailySummary',    'Daily Summary',             'End-of-day performance report at 11 PM'],
            ['weeklyReport',    'Weekly Report',             'Monday morning analytics digest'],
            ['pricingReminder', 'Thursday Pricing Reminder', 'Reminder to update weekend pricing'],
            ['complaints',      'Complaint Alerts',          'Instant alert when a guest files a complaint'],
            ['marketing',       'Marketing Updates',         'NightOut feature announcements and tips'],
          ].map(([key, label, sub]) => (
            <div key={key} className="py-0.5">
              <Toggle label={label} sub={sub} checked={notifs[key]} onChange={() => toggleN(key)} />
            </div>
          ))}
        </div>
      </Card>

      {/* ── Venue rules ── */}
      <Card>
        <div className="flex items-center justify-between pb-4 mb-4 border-b dark:border-dark-400 border-light-200">
          <div className="font-display text-base font-bold">Platform Rules & Config</div>
          <Button size="sm" onClick={() => show('Rules saved and applied!')}>Save Rules</Button>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {[
            ['Minimum Deposit (₹)', 'minDeposit', 'number'],
            ['Cancellation Window (hrs)', 'cancellationHours', 'number'],
            ['No-show Ban Threshold', 'noShowBan', 'number'],
            ['Max Guests Per Booking', 'maxGuests', 'number'],
          ].map(([label, key, type]) => (
            <Input key={key} label={label} type={type} value={rules[key]} onChange={setR(key)} />
          ))}
        </div>
        <div className="divide-y dark:divide-dark-400 divide-light-200">
          {[
            ['autoCheckout',    'Auto Check-out',      'Mark guests as checked out after 2 AM'],
            ['requireDressCode','Enforce Dress Code',   'Show dress code warning on booking confirmation'],
            ['allowGroups',     'Allow Group Bookings', 'Accept bookings with 5+ guests'],
          ].map(([key, label, sub]) => (
            <div key={key} className="py-0.5">
              <Toggle label={label} sub={sub} checked={rules[key]} onChange={v => toggleR(key)(v)} />
            </div>
          ))}
        </div>
      </Card>

      {/* ── Danger zone ── */}
      <div className="dark:bg-dark-600 bg-white dark:border-danger/20 border-danger/20 border rounded-2xl p-5">
        <div className="font-display text-sm font-bold text-danger mb-4">Danger Zone</div>
        <div className="flex items-center justify-between p-4 bg-danger/5 rounded-xl dark:border-danger/10 border-danger/10 border">
          <div>
            <div className="text-sm font-semibold">Delete Vendor Account</div>
            <div className="text-xs dark:text-dark-100 text-dark-400 mt-0.5">Permanently remove your account and all associated data</div>
          </div>
          <Button size="sm" variant="danger" onClick={() => show('Please contact support to delete your account.', 'error')}>
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
}
