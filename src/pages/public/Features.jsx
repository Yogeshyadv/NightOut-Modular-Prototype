import { motion } from 'framer-motion';
import { Button, Icon, SectionLabel } from '../../components/ui/index.js';
import { cn } from '../../utils/helpers.js';
import { useNavigate } from 'react-router-dom';

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

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
};

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

function FeatureGrid({ features, accent = 'green' }) {
  return (
    <motion.div 
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
    >
      {features.map((f, i) => (
        <motion.div 
          key={i} 
          variants={fadeInUp}
          className="glass-card !p-8 group hover:-translate-y-4 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] transition-all duration-700 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="text-5xl mb-8 transition-transform duration-700 group-hover:scale-125 group-hover:-rotate-6 origin-center inline-block">{f.icon}</div>
          <h3 className="heading-sm mb-4 text-2xl group-hover:text-green transition-colors duration-500">{f.title}</h3>
          <p className="dark:text-dark-100 text-dark-500 leading-relaxed font-medium">{f.desc}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default function Features() {
  const navigate = useNavigate();

  return (
    <div className="dark:text-white text-dark-900 font-body overflow-x-hidden">
      {/* Hero */}
      <section className="py-40 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0, rgba(0,200,83,0.15) 0%, transparent 60%)' }} />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto px-6 relative"
        >
          <SectionLabel>Platform Capabilities</SectionLabel>
          <h1 className="heading-xl mt-8 mb-10 tracking-tighter">
            Everything you need for<br /><span className="text-gradient drop-shadow-2xl">the perfect night out</span>
          </h1>
          <p className="text-xl dark:text-dark-100 text-dark-500 max-w-2xl mx-auto leading-relaxed font-medium">
            A complete operating system for modern nightlife — built for guests who demand safety and venues that demand growth.
          </p>
        </motion.div>
      </section>

      {/* User features */}
      <section className="py-32 dark:bg-dark-800 bg-white border-y dark:border-white/5 border-black/5">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <SectionLabel>For Our Guests</SectionLabel>
            <h2 className="heading-lg mt-6">Your weekend, upgraded</h2>
            <p className="text-xl dark:text-dark-100 text-dark-500 mt-6 max-w-xl font-medium">
              Discover, book, and experience India's elite venues with zero friction and total safety.
            </p>
          </motion.div>
          <FeatureGrid features={USER_FEATURES} accent="green" />
        </div>
      </section>

      {/* Vendor features */}
      <section className="py-32 dark:bg-dark-900 bg-light-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-20 lg:text-right flex flex-col lg:items-end"
          >
            <SectionLabel>For Our Partners</SectionLabel>
            <h2 className="heading-lg mt-6">Run your venue with precision</h2>
            <p className="text-xl dark:text-dark-100 text-dark-500 mt-6 max-w-xl font-medium">
              Real-time analytics and management tools built for high-volume premium clubs.
            </p>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {VENDOR_FEATURES.map((f, i) => (
              <motion.div 
                key={i} 
                variants={fadeInUp}
                className="glass-card hover:-translate-y-4 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] transition-all duration-700 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="text-5xl mb-8 transition-transform duration-700 group-hover:scale-125 group-hover:rotate-6 origin-center inline-block">{f.icon}</div>
                <h3 className="heading-sm mb-4 text-2xl group-hover:text-purple-light transition-colors duration-500">{f.title}</h3>
                <p className="dark:text-dark-100 text-dark-500 leading-relaxed font-medium relative z-10">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-40 dark:bg-dark-800 bg-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-green/5 via-transparent to-transparent opacity-50" />
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-lg mb-10">Experience the difference</h2>
            <p className="text-xl dark:text-dark-100 text-dark-500 mb-16 leading-relaxed font-medium">
              Join thousands of clubbers and hundreds of venues already using NightOut to power their nights.
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <Button size="xl" rightIcon="arrow" onClick={() => navigate('/register')}>Get Started Now</Button>
              <Button size="xl" variant="ghost-dark" onClick={() => navigate('/pricing')}>Explore Pricing</Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
