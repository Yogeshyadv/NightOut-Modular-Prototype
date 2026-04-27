// ─────────────────────────────────────────────────────────────────────────────
//  Features.jsx
// ─────────────────────────────────────────────────────────────────────────────
import { Button, Icon, SectionLabel } from '../../components/ui/index.js';
import { cn } from '../../utils/helpers.js';

const USER_FEATURES = [
  { icon: '🧭', title: 'Smart Discovery',       desc: 'AI-powered venue picks based on your taste, budget, and mood. Browse live crowd levels, tonight\'s DJ, and exact pricing before you leave home.' },
  { icon: '🎫', title: 'Instant Booking',        desc: 'Guestlists, VIP tables, and event tickets in under 60 seconds. Pay via UPI, card, or wallet. Confirmation hits your phone immediately.' },
  { icon: '📱', title: 'Offline QR Check-in',    desc: 'QR ticket works without internet — your phone is your pass. 6-digit backup code always included. Check-in under 2 seconds.' },
  { icon: '🛡️', title: 'Full Safety Suite',      desc: 'Live location sharing with emergency contacts, shake-to-SOS panic button, and automated post-trip check-ins every 30 minutes.' },
  { icon: '🌈', title: 'Rainbow Verified',        desc: 'Find genuinely inclusive venues. Rainbow-certified clubs have completed our full audit: staff training, gender-neutral facilities, equal pricing, zero tolerance policy.' },
  { icon: '👗', title: 'AI Outfit Checker',       desc: 'Upload your outfit. Our vision AI checks it against the venue dress code and tells you if you\'re good to go — before you leave home.' },
  { icon: '🚗', title: 'NightOut Rides',          desc: 'Late-night safe rides home and designated driver service. Sensitised drivers, panic button in-app, and real-time sharing with contacts.' },
  { icon: '👑', title: 'Gold Membership',         desc: 'Priority entry at every partner venue, 10% cashback on all bookings, exclusive deals, and a dedicated Gold support line. ₹299/month.' },
];

const VENDOR_FEATURES = [
  { icon: '📊', title: 'Live Dashboard',          desc: 'Real-time booking counts, crowd levels, and revenue numbers all in one place. Know exactly how tonight is going — from anywhere.' },
  { icon: '💰', title: 'Dynamic Pricing',         desc: 'Update stag, couple, or VIP pricing in under 30 seconds. Changes go live on the user app instantly.' },
  { icon: '📋', title: 'Guestlist Manager',        desc: 'Full digital guestlist with check-in tracking, no-show flagging, and one-click CSV export after every event.' },
  { icon: '📷', title: 'Offline QR Scanner',      desc: 'Works offline. Bouncer opens the app, scans the QR → guest name, payment status, and dress code match appear instantly.' },
  { icon: '📈', title: 'Revenue Analytics',        desc: 'Daily, weekly, and monthly revenue charts. Benchmark your performance against the city average and top venues.' },
  { icon: '🔔', title: 'Smart Notifications',      desc: 'Thursday pricing reminders, booking surge alerts, no-show flags, and daily end-of-day summaries sent directly to you.' },
];

function FeatureGrid({ features, accent = 'green' }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {features.map((f, i) => (
        <div key={i} className={cn(
          'dark:bg-dark-700 bg-light-50 dark:border-dark-500 border-light-200 border rounded-2xl p-6',
          'hover:-translate-y-1 transition-all duration-200',
          accent === 'green' ? 'hover:dark:border-green/30 hover:border-green/30' : 'hover:dark:border-purple/30 hover:border-purple/30',
        )}>
          <div className="text-2xl mb-3">{f.icon}</div>
          <h3 className="font-display text-sm font-bold mb-2">{f.title}</h3>
          <p className="text-xs dark:text-dark-100 text-dark-400 leading-relaxed">{f.desc}</p>
        </div>
      ))}
    </div>
  );
}

export default function Features() {
  return (
    <div className="dark:text-white text-dark-900">
      {/* Hero */}
      <section className="py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0, rgba(0,200,83,0.06) 0%, transparent 60%)' }} />
        <div className="max-w-4xl mx-auto px-5 relative">
          <SectionLabel>Platform Features</SectionLabel>
          <h1 className="heading-xl mt-4 mb-6">
            Everything you need for<br /><span className="text-gradient">the perfect night</span>
          </h1>
          <p className="text-lg dark:text-dark-100 text-dark-400 max-w-2xl mx-auto leading-relaxed">
            A complete nightlife platform — for guests who want the best experience, and venues who want to deliver it.
          </p>
        </div>
      </section>

      {/* User features */}
      <section className="py-16 dark:bg-dark-800 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <div className="mb-10">
            <SectionLabel>For Guests</SectionLabel>
            <h2 className="heading-md mt-2">Your night, your way</h2>
            <p className="text-sm dark:text-dark-100 text-dark-400 mt-2 max-w-xl">
              Everything you need to discover, book, and experience the best nights safely.
            </p>
          </div>
          <FeatureGrid features={USER_FEATURES} accent="green" />
        </div>
      </section>

      {/* Vendor features */}
      <section className="py-16 dark:bg-dark-900 bg-light-50">
        <div className="max-w-7xl mx-auto px-5">
          <div className="mb-10">
            <SectionLabel>For Venues</SectionLabel>
            <h2 className="heading-md mt-2">Run your venue smarter</h2>
            <p className="text-sm dark:text-dark-100 text-dark-400 mt-2 max-w-xl">
              Real-time tools built for club owners who want to increase revenue and reduce friction.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {VENDOR_FEATURES.map((f, i) => (
              <div key={i} className="dark:bg-dark-700 bg-white dark:border-dark-500 border-light-200 border rounded-2xl p-7 hover:dark:border-purple/30 hover:border-purple/30 hover:-translate-y-1 transition-all duration-200">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-display font-bold mb-2">{f.title}</h3>
                <p className="text-sm dark:text-dark-100 text-dark-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 dark:bg-dark-800 bg-white text-center">
        <div className="max-w-2xl mx-auto px-5">
          <h2 className="heading-md mb-5">Start using NightOut today</h2>
          <p className="dark:text-dark-100 text-dark-400 mb-8">Free for guests. Vendor plans from ₹0/month.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" rightIcon="arrow" onClick={() => window.location.href='/register'}>Create Free Account</Button>
            <Button size="lg" variant="ghost-dark" onClick={() => window.location.href='/pricing'}>See Pricing</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
