import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Icon, SectionLabel, Input, Textarea, Select } from '../../components/ui/index.js';
import { FAQ_ITEMS } from '../../data/mockData.js';
import { cn } from '../../utils/helpers.js';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
};

const VALUES = [
  { icon: '🌙', title: 'Night-first',      desc: 'We\'re built for the night economy — not adapted from a daytime product. Every feature ships with nightlife in mind.' },
  { icon: '🛡️', title: 'Safety always',   desc: 'Every feature ships with safety in mind. No exceptions. If it doesn\'t make the night safer, it doesn\'t ship.' },
  { icon: '🌈', title: 'Radical inclusion',desc: 'Nightlife is for everyone. We\'re building a platform that genuinely reflects that — not just in words.' },
  { icon: '⚡', title: 'Move fast',         desc: 'We ship every week. The nightlife space moves fast and so do we.' },
];

export function About() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="dark:text-white text-dark-900"
    >
      {/* Hero */}
      <section className="py-32 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(124,77,255,0.1) 0%, transparent 60%)' }} />
        <div className="max-w-4xl mx-auto px-6 relative">
          <motion.div variants={staggerContainer} initial="initial" animate="animate">
            <motion.div variants={fadeInUp}><SectionLabel>Our Story</SectionLabel></motion.div>
            <motion.h1 variants={fadeInUp} className="heading-xl mt-8 mb-8 tracking-tighter">
              Built by people who<br /><span className="text-gradient drop-shadow-2xl">love the night</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl dark:text-dark-100 text-dark-500 max-w-2xl mx-auto leading-relaxed">
              NightOut started in Jaipur in 2025 after three founders had one too many nights ruined by surprise entry fees,
              long queues, and unsafe taxi rides. We decided to fix it for everyone.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 dark:bg-dark-800/50 bg-light-50/50 border-y dark:border-white/5 border-black/5">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center"
          >
            {[
              ['₹4.8Cr', 'Platform GMV'], 
              ['50K+', 'Happy Users'], 
              ['200+', 'Partner Venues'], 
              ['12', 'Active Cities']
            ].map(([v, l], i) => (
              <motion.div key={l} variants={fadeInUp}>
                <div className="font-display text-5xl font-black text-gradient mb-3">{v}</div>
                <div className="text-sm font-black dark:text-dark-100 text-dark-400 uppercase tracking-widest">{l}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-32 dark:bg-dark-900 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <SectionLabel>What we believe</SectionLabel>
            <h2 className="heading-lg mt-6">Our Core Values</h2>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {VALUES.map((v, i) => (
              <motion.div key={i} variants={fadeInUp} className="glass-card group hover:-translate-y-4 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] transition-all duration-700 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="text-5xl mb-8 transition-transform duration-700 group-hover:scale-125 group-hover:rotate-6 origin-center inline-block">{v.icon}</div>
                <h3 className="heading-sm mb-4 group-hover:text-green transition-colors duration-500 relative z-10">{v.title}</h3>
                <p className="dark:text-dark-100 text-dark-500 leading-relaxed font-medium relative z-10">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-40 dark:bg-dark-800 bg-light-50 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-purple/5 to-transparent opacity-50" />
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-lg mb-8">Come build the future</h2>
            <p className="text-xl dark:text-dark-100 text-dark-500 mb-12 leading-relaxed">
              We're always looking for designers, engineers, and nightlife enthusiasts. Join the revolution.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/register"><Button size="xl" rightIcon="arrow">Get Started</Button></Link>
              <Link to="/contact"><Button size="xl" variant="ghost-dark">Contact Us</Button></Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  Contact.jsx
// ─────────────────────────────────────────────────────────────────────────────

export function Contact() {
  const [form, setForm]   = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent]   = useState(false);
  const [loading, setLoading] = useState(false);

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setSent(true);
    setLoading(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="dark:text-white text-dark-900"
    >
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            {/* Left */}
            <motion.div variants={staggerContainer} initial="initial" animate="animate">
              <motion.div variants={fadeInUp}><SectionLabel>Contact Us</SectionLabel></motion.div>
              <motion.h1 variants={fadeInUp} className="heading-xl mt-8 mb-8 tracking-tighter">Let's start a <br /><span className="text-gradient drop-shadow-2xl">conversation</span></motion.h1>
              <motion.p variants={fadeInUp} className="text-xl dark:text-dark-100 text-dark-500 mb-12 leading-relaxed">
                Have a question about the platform? Want to partner with us? Our team is here to help you own the night.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="space-y-8">
                {[
                  { icon: 'mail',     label: 'Email Support',  val: 'hello@nightout.in'       },
                  { icon: 'phone',    label: 'Call Us',        val: '+91 98765 00000'          },
                  { icon: 'location', label: 'Our HQ',         val: 'Jaipur, Rajasthan, India' },
                ].map(c => (
                  <div key={c.label} className="flex items-center gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-green/10 border border-green/20 flex items-center justify-center text-green flex-shrink-0 transition-transform group-hover:scale-110">
                      <Icon name={c.icon} size={24} />
                    </div>
                    <div>
                      <div className="text-xs font-black uppercase tracking-[0.2em] dark:text-white/40 text-dark-400 mb-1">{c.label}</div>
                      <div className="text-xl font-bold">{c.val}</div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Form */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass-card !p-12 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-green/5 rounded-bl-[100px]" />
              
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-20"
                  >
                    <div className="w-20 h-20 rounded-full bg-green/15 border border-green/30 flex items-center justify-center text-green text-4xl mx-auto mb-8 shadow-lg shadow-green/10">
                      <Icon name="check-circle" size={40} />
                    </div>
                    <h3 className="heading-sm mb-4">Message Sent!</h3>
                    <p className="text-lg dark:text-dark-100 text-dark-500 font-medium">We'll get back to you within 24 hours.</p>
                    <Button className="mt-10" variant="ghost-dark" onClick={() => setSent(false)}>Send another</Button>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit} 
                    className="space-y-6 relative z-10"
                  >
                    <h2 className="heading-sm mb-8">Send a message</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <Input label="Your Name" placeholder="Rahul Sharma" value={form.name} onChange={set('name')} required />
                      <Input label="Email Address" type="email" placeholder="rahul@email.com" value={form.email} onChange={set('email')} required />
                    </div>
                    <Select
                      label="Subject"
                      placeholder="What is this about?"
                      options={['List my venue', 'User support', 'Partnership', 'Media enquiry', 'Other']}
                      value={form.subject}
                      onChange={set('subject')}
                    />
                    <Textarea label="Message" placeholder="Tell us more about your enquiry..." rows={5} value={form.message} onChange={set('message')} required />
                    <Button type="submit" size="xl" fullWidth loading={loading} rightIcon="arrow" className="mt-4 shadow-xl shadow-green/10">
                      Send Message
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  Help.jsx  (FAQ / Help Centre)
// ─────────────────────────────────────────────────────────────────────────────

export function Help() {
  const [open, setOpen] = useState(null);
  const categories = [
    { label: 'Booking & Payment',  items: FAQ_ITEMS.slice(0, 2) },
    { label: 'Venues & Vendors',   items: FAQ_ITEMS.slice(2, 4) },
    { label: 'Safety & Inclusion', items: FAQ_ITEMS.slice(4)    },
  ];
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="dark:text-white text-dark-900"
    >
      <section className="py-32">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-24">
            <SectionLabel>Help Centre</SectionLabel>
            <h1 className="heading-lg mt-8 mb-6">How can we help you?</h1>
            <p className="dark:text-dark-100 text-dark-500 text-xl font-medium">Everything you need to know about NightOut.</p>
          </div>

          <div className="space-y-16">
            {categories.map((cat, ci) => (
              <motion.div 
                key={ci}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-xs font-black dark:text-white/40 text-dark-400 uppercase tracking-[0.3em] mb-8 px-2">{cat.label}</h2>
                <div className="space-y-4">
                  {cat.items.map((item, i) => {
                    const key = `${ci}-${i}`;
                    const isOpen = open === key;
                    return (
                      <div 
                        key={key} 
                        className={cn(
                          'glass-card !p-0 overflow-hidden transition-all duration-500 rounded-3xl',
                          isOpen ? 'dark:bg-white/[0.05] bg-black/[0.03] dark:border-green/30 border-green/30' : ''
                        )}
                      >
                        <button 
                          onClick={() => setOpen(isOpen ? null : key)} 
                          className="w-full flex items-center justify-between px-8 py-6 text-left"
                        >
                          <span className="font-bold text-lg dark:text-white text-dark-950">{item.q}</span>
                          <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500",
                            isOpen ? "bg-green text-black rotate-45" : "dark:bg-white/5 bg-black/5 dark:text-dark-100 text-dark-400"
                          )}>
                            <Icon name="plus" size={16} strokeWidth={3} />
                          </div>
                        </button>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            >
                              <div className="px-8 pb-8 text-lg dark:text-dark-100 text-dark-500 leading-relaxed font-medium border-t dark:border-white/5 border-black/5 pt-6">
                                {item.a}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mt-24 glass-card py-10"
          >
            <p className="text-lg dark:text-dark-100 text-dark-500 mb-6 font-medium">Still have questions?</p>
            <Link to="/contact">
              <Button size="xl" rightIcon="arrow">Contact Support</Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  Terms.jsx / Privacy.jsx  (minimal placeholders)
// ─────────────────────────────────────────────────────────────────────────────
function LegalPage({ title, sections }) {
  return (
    <div className="dark:text-white text-dark-900 py-32">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="heading-lg mb-4">{title}</h1>
          <p className="text-sm font-black dark:text-dark-100 text-dark-400 mb-16 uppercase tracking-widest">Last updated: 1 March 2026</p>
          <div className="space-y-12">
            {sections.map((s, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <h2 className="heading-sm mb-4 text-xl">{s.title}</h2>
                <p className="text-lg dark:text-dark-100 text-dark-500 leading-relaxed font-medium">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export function Terms() {
  return <LegalPage title="Terms of Service" sections={[
    { title: '1. Acceptance',       body: 'By using NightOut you agree to these terms. If you disagree, please do not use the platform.' },
    { title: '2. User Accounts',    body: 'You must be 18 years or older to create an account. You are responsible for maintaining the confidentiality of your credentials.' },
    { title: '3. Bookings',         body: 'Bookings are confirmed upon payment. Cancellations must be made 4+ hours before the event for a full refund as NightOut credit.' },
    { title: '4. Vendor Conduct',   body: 'Vendors must honour listed pricing, maintain venue standards, and comply with all applicable laws and the NightOut vendor agreement.' },
    { title: '5. Prohibited Use',   body: 'You may not use NightOut for fraudulent bookings, scalping, or any activity that violates applicable law.' },
    { title: '6. Limitation',       body: 'NightOut is not liable for venue-side incidents, changes to events, or acts beyond our reasonable control.' },
  ]} />;
}

export function Privacy() {
  return <LegalPage title="Privacy Policy" sections={[
    { title: 'What we collect',     body: 'We collect your name, phone number, email, and booking history when you register and use the platform.' },
    { title: 'How we use it',       body: 'Your data powers bookings, safety features (live location during trips), recommendations, and platform improvement.' },
    { title: 'Sharing',             body: 'We share necessary booking data with vendors for check-in. We never sell personal data to third parties.' },
    { title: 'Retention',           body: 'We retain personal data for 90 days post-account deletion, then permanently delete it in line with DPDP Act 2023.' },
    { title: 'Your rights',         body: 'You can request access, correction, or deletion of your data at any time by emailing privacy@nightout.in.' },
    { title: 'Cookies',             body: 'We use essential cookies only. No advertising or cross-site tracking cookies are used.' },
  ]} />;
}

// ─────────────────────────────────────────────────────────────────────────────
//  NotFound.jsx  (404)
// ─────────────────────────────────────────────────────────────────────────────
export function NotFound() {
  return (
    <div className="dark:text-white text-dark-900 min-h-screen flex items-center justify-center dark:bg-dark-950 bg-white">
      <div className="text-center px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 10 }}
          className="font-display text-[180px] font-black leading-none text-gradient mb-8 select-none opacity-20"
        >
          404
        </motion.div>
        <h1 className="heading-lg mb-6">Lost in the night?</h1>
        <p className="text-xl dark:text-dark-100 text-dark-500 mb-12 max-w-sm mx-auto font-medium">
          The page you're looking for doesn't exist or has moved to a different club.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link to="/"><Button size="xl" rightIcon="arrow">Return Home</Button></Link>
          <Link to="/contact"><Button size="xl" variant="ghost-dark">Contact Support</Button></Link>
        </div>
      </div>
    </div>
  );
}
