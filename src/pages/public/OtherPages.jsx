// ─────────────────────────────────────────────────────────────────────────────
//  About.jsx
// ─────────────────────────────────────────────────────────────────────────────
import { Link }   from 'react-router-dom';
import { Button, Icon, SectionLabel } from '../../components/ui/index.js';

const VALUES = [
  { icon: '🌙', title: 'Night-first',      desc: 'We\'re built for the night economy — not adapted from a daytime product. Every feature ships with nightlife in mind.' },
  { icon: '🛡️', title: 'Safety always',   desc: 'Every feature ships with safety in mind. No exceptions. If it doesn\'t make the night safer, it doesn\'t ship.' },
  { icon: '🌈', title: 'Radical inclusion',desc: 'Nightlife is for everyone. We\'re building a platform that genuinely reflects that — not just in words.' },
  { icon: '⚡', title: 'Move fast',         desc: 'We ship every week. The nightlife space moves fast and so do we.' },
];

export function About() {
  return (
    <div className="dark:text-white text-dark-900">
      {/* Hero */}
      <section className="py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(124,77,255,0.06) 0%, transparent 60%)' }} />
        <div className="max-w-4xl mx-auto px-5 relative">
          <SectionLabel>Our Story</SectionLabel>
          <h1 className="heading-xl mt-4 mb-6">
            Built by people who<br /><span className="text-gradient-purple">love the night</span>
          </h1>
          <p className="text-lg dark:text-dark-100 text-dark-400 max-w-2xl mx-auto leading-relaxed">
            NightOut started in Jaipur in 2025 after three founders had one too many nights ruined by surprise entry fees,
            long queues, and unsafe taxi rides. We decided to fix it.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 dark:bg-dark-800 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[['₹4.8Cr', 'Platform GMV'], ['50K+', 'Happy Users'], ['200+', 'Venues Listed'], ['12', 'Cities Active']].map(([v, l]) => (
              <div key={l}>
                <div className="font-display text-4xl font-bold text-green mb-2">{v}</div>
                <div className="text-sm dark:text-dark-100 text-dark-400">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 dark:bg-dark-900 bg-light-50">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-12">
            <SectionLabel>What we believe</SectionLabel>
            <h2 className="heading-md mt-3">Our values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v, i) => (
              <div key={i} className="dark:bg-dark-700 bg-white dark:border-dark-500 border-light-200 border rounded-2xl p-6">
                <div className="text-3xl mb-4">{v.icon}</div>
                <h3 className="font-bold mb-2">{v.title}</h3>
                <p className="text-sm dark:text-dark-100 text-dark-400 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 dark:bg-dark-800 bg-white text-center">
        <div className="max-w-2xl mx-auto px-5">
          <h2 className="heading-md mb-5">Join us</h2>
          <p className="dark:text-dark-100 text-dark-400 mb-8 leading-relaxed">
            We're hiring designers, engineers, and city expansion leads. Come build the future of nightlife.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register"><Button size="lg" rightIcon="arrow">Get Started</Button></Link>
            <Link to="/contact"><Button size="lg" variant="ghost-dark">Contact Us</Button></Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  Contact.jsx
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from 'react';
import { Input, Textarea, Select } from '../../components/ui/index.js';

export function Contact() {
  const [form, setForm]   = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent]   = useState(false);
  const [loading, setLoading] = useState(false);

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setSent(true);
    setLoading(false);
  };

  return (
    <div className="dark:text-white text-dark-900">
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left */}
            <div>
              <SectionLabel>Contact</SectionLabel>
              <h1 className="heading-xl mt-4 mb-6">Let's talk</h1>
              <p className="text-lg dark:text-dark-100 text-dark-400 mb-10 leading-relaxed">
                Whether you're a club owner ready to list, a user with feedback, or just curious — we'd love to hear from you.
              </p>
              {[
                { icon: 'mail',     label: 'Email',  val: 'hello@nightout.in'       },
                { icon: 'phone',    label: 'Phone',  val: '+91 98765 00000'          },
                { icon: 'location', label: 'Office', val: 'Jaipur, Rajasthan, India' },
              ].map(c => (
                <div key={c.label} className="flex items-center gap-4 mb-6">
                  <div className="w-11 h-11 rounded-xl bg-green/10 border border-green/20 flex items-center justify-center text-green flex-shrink-0">
                    <Icon name={c.icon} size={18} />
                  </div>
                  <div>
                    <div className="label-xs text-dark-100 mb-0.5">{c.label}</div>
                    <div className="font-semibold">{c.val}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="dark:bg-dark-700 bg-white dark:border-dark-500 border-light-200 border rounded-3xl p-8">
              {sent ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-green/15 border border-green/30 flex items-center justify-center text-green text-2xl mx-auto mb-5">
                    <Icon name="check-circle" size={28} />
                  </div>
                  <h3 className="font-display text-xl font-bold mb-2">Message sent!</h3>
                  <p className="text-sm dark:text-dark-100 text-dark-400">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2 className="font-display text-xl font-bold mb-6">Send a message</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="Your name" placeholder="Rahul Sharma" value={form.name} onChange={set('name')} required />
                    <Input label="Email address" type="email" placeholder="rahul@email.com" value={form.email} onChange={set('email')} required />
                  </div>
                  <Select
                    label="Subject"
                    placeholder="Select subject…"
                    options={['List my venue', 'User support', 'Partnership', 'Media enquiry', 'Other']}
                    value={form.subject}
                    onChange={set('subject')}
                  />
                  <Textarea label="Message" placeholder="Tell us more…" rows={5} value={form.message} onChange={set('message')} required />
                  <Button type="submit" size="lg" fullWidth loading={loading} rightIcon="arrow">
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  Help.jsx  (FAQ / Help Centre)
// ─────────────────────────────────────────────────────────────────────────────
import { FAQ_ITEMS } from '../../data/mockData.js';
import { cn } from '../../utils/helpers.js';

export function Help() {
  const [open, setOpen] = useState(null);
  const categories = [
    { label: 'Booking & Payment',  items: FAQ_ITEMS.slice(0, 2) },
    { label: 'Venues & Vendors',   items: FAQ_ITEMS.slice(2, 4) },
    { label: 'Safety & Inclusion', items: FAQ_ITEMS.slice(4)    },
  ];
  return (
    <div className="dark:text-white text-dark-900">
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-5">
          <div className="text-center mb-14">
            <SectionLabel>Help Centre</SectionLabel>
            <h1 className="heading-lg mt-4 mb-4">How can we help?</h1>
            <p className="dark:text-dark-100 text-dark-400">Find answers to the most common questions below.</p>
          </div>
          {categories.map((cat, ci) => (
            <div key={ci} className="mb-10">
              <h2 className="font-display text-base font-bold mb-4 dark:text-dark-100 text-dark-400 uppercase tracking-wider text-xs">{cat.label}</h2>
              <div className="space-y-3">
                {cat.items.map((item, i) => {
                  const key = `${ci}-${i}`;
                  return (
                    <div key={key} className={cn('dark:bg-dark-700 bg-white dark:border-dark-500 border-light-200 border rounded-2xl overflow-hidden transition-all', open === key ? 'dark:border-green/30 border-green/30' : '')}>
                      <button onClick={() => setOpen(open === key ? null : key)} className="w-full flex items-center justify-between px-6 py-4 text-left">
                        <span className="font-semibold text-sm">{item.q}</span>
                        <Icon name={open === key ? 'x' : 'plus'} size={15} className={open === key ? 'text-green' : 'dark:text-dark-100 text-dark-400'} />
                      </button>
                      {open === key && <div className="px-6 pb-5 text-sm dark:text-dark-100 text-dark-400 leading-relaxed border-t dark:border-dark-600 border-light-200 pt-4">{item.a}</div>}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          <div className="text-center mt-10 dark:text-dark-100 text-dark-400 text-sm">
            Still stuck?{' '}
            <Link to="/contact" className="text-green hover:underline font-semibold">Contact support</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  Terms.jsx / Privacy.jsx  (minimal placeholders)
// ─────────────────────────────────────────────────────────────────────────────
function LegalPage({ title, sections }) {
  return (
    <div className="dark:text-white text-dark-900 py-24">
      <div className="max-w-3xl mx-auto px-5">
        <h1 className="heading-lg mb-3">{title}</h1>
        <p className="text-sm dark:text-dark-100 text-dark-400 mb-10">Last updated: 1 March 2026</p>
        <div className="space-y-8">
          {sections.map((s, i) => (
            <div key={i}>
              <h2 className="font-display text-lg font-bold mb-3">{s.title}</h2>
              <p className="text-sm dark:text-dark-100 text-dark-400 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
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
    <div className="dark:text-white text-dark-900 min-h-screen flex items-center justify-center dark:bg-dark-900 bg-light-50">
      <div className="text-center px-5">
        <div className="font-display text-[120px] font-bold leading-none text-green/20 mb-6 select-none">404</div>
        <h1 className="heading-md mb-4">Page not found</h1>
        <p className="dark:text-dark-100 text-dark-400 mb-8 max-w-sm mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/"><Button size="lg" rightIcon="arrow">Go Home</Button></Link>
          <Link to="/contact"><Button size="lg" variant="ghost-dark">Contact Support</Button></Link>
        </div>
      </div>
    </div>
  );
}
