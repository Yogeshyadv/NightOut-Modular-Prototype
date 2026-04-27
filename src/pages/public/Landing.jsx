// ─────────────────────────────────────────────────────────────────────────────
//  Landing.jsx  — full marketing landing page
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate }           from 'react-router-dom';
import { Button, Icon, SectionLabel }  from '../../components/ui/index.js';
import { TESTIMONIALS, FAQ_ITEMS }     from '../../data/mockData.js';
import { cn }                          from '../../utils/helpers.js';

// ── animated counter ──────────────────────────────────────────────────────────
function CountUp({ end, duration = 1800, prefix = '', suffix = '' }) {
  const [val, setVal] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const t0 = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - t0) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(end * ease));
      if (p < 1) requestAnimationFrame(tick);
    };
    const timer = setTimeout(() => requestAnimationFrame(tick), 400);
    return () => clearTimeout(timer);
  }, [end, duration]);

  return <>{prefix}{val.toLocaleString()}{suffix}</>;
}

// ── data ──────────────────────────────────────────────────────────────────────
const STEPS = [
  { num: '01', emoji: '🧭', title: 'Discover',   color: '#00C853',
    desc: 'Browse real-time venue listings with live crowd levels, tonight\'s DJ, entry pricing, and vibe scores.' },
  { num: '02', emoji: '🎫', title: 'Book',        color: '#7C4DFF',
    desc: 'Lock in your spot in 60 seconds. Pay via UPI, card, or wallet. Get a QR ticket and 6-digit backup instantly.' },
  { num: '03', emoji: '📱', title: 'Enter',       color: '#00E676',
    desc: 'Show your QR at the door. Bouncer scans — you\'re in under 2 seconds. Works offline. No queues, ever.' },
];

const FEATURES = [
  { icon: '🧭', title: 'Smart Discovery',   accent: 'green',  desc: 'AI-powered venue recommendations based on your music taste, budget, and city. Filter by vibe, crowd size, or Rainbow status.' },
  { icon: '📱', title: 'Offline QR Check-in',accent: 'purple', desc: 'Your QR works without internet. 6-digit backup always included. Check-in takes under 2 seconds at any door.' },
  { icon: '🛡️', title: 'Safety Suite',      accent: 'green',  desc: 'Live location sharing, shake-to-SOS panic button, and automated post-trip check-ins keep you safe all night.' },
  { icon: '🌈', title: 'Rainbow Verified',  accent: 'purple', desc: 'Certified LGBTQ+-inclusive venues with trained staff, equal pricing, and gender-neutral facilities.' },
  { icon: '📊', title: 'Vendor Analytics',  accent: 'green',  desc: 'Club owners get real-time dashboards: live bookings, crowd data, revenue, and competitor benchmarks.' },
  { icon: '👑', title: 'Gold Membership',   accent: 'purple', desc: 'Priority entry, 10% cashback, exclusive deals, and a dedicated support line for ₹299/month.' },
];

export default function Landing() {
  const navigate     = useNavigate();
  const [faqOpen, setFaqOpen] = useState(null);

  return (
    <div className="dark:text-white text-dark-900">

      {/* ── HERO ── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 dark:bg-dark-900 bg-light-50 dark:grid-bg grid-bg-light pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(0,200,83,0.08) 0%, transparent 70%)' }} />
          <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full"  style={{ background: 'radial-gradient(circle, rgba(124,77,255,0.07) 0%, transparent 70%)' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-5 py-28 w-full">
          <div className="max-w-4xl mx-auto text-center">

            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 dark:bg-dark-600/80 bg-white/80 backdrop-blur-md border dark:border-dark-400 border-light-200 rounded-full px-4 py-2 mb-8 animate-fade-up">
              <span className="w-2 h-2 bg-green rounded-full animate-blink" />
              <span className="text-xs font-bold uppercase tracking-wider text-green">Live in 12 cities · India</span>
            </div>

            {/* Headline */}
            <h1 className="heading-xl mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              India's nightlife,<br />
              <span className="text-gradient">finally upgraded</span>
            </h1>

            <p className="text-xl dark:text-dark-100 text-dark-400 max-w-2xl mx-auto leading-relaxed mb-10 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              Discover top clubs, book guaranteed entry in 60&nbsp;seconds, and check in with a QR code.
              NightOut is the complete operating system for India's nightlife.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <Button size="xl" onClick={() => navigate('/register')} rightIcon="arrow">
                Start Booking Tonight
              </Button>
              <Button size="xl" variant="ghost-dark" onClick={() => navigate('/features')}>
                How It Works
              </Button>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-up" style={{ animationDelay: '0.4s' }}>
              {[
                { val: 200, suffix: '+', label: 'Venues Listed'  },
                { val: 50,  suffix: 'K+', label: 'Bookings Made' },
                { val: 12,  suffix: '',   label: 'Cities Active'  },
                { val: 4.8, suffix: '★',  label: 'App Rating'    },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="font-display text-3xl md:text-4xl font-bold text-green mb-1">
                    <CountUp end={s.val} />{s.suffix}
                  </div>
                  <div className="text-xs dark:text-dark-100 text-dark-400 uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-float">
          <div className="w-px h-8 dark:bg-gradient-to-b dark:from-transparent dark:via-dark-300 dark:to-transparent bg-gradient-to-b from-transparent via-light-300 to-transparent" />
          <Icon name="chevron-down" size={14} className="dark:text-dark-100 text-dark-300" />
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 dark:bg-dark-800 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-16">
            <SectionLabel>Process</SectionLabel>
            <h2 className="heading-lg mt-3">
              Three steps to your<br />
              <span className="text-gradient-green">perfect night</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map((step, i) => (
              <div key={step.num} className="relative">
                {/* connector line */}
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[calc(50%+90px)] right-[-50%] h-px" style={{ background: `linear-gradient(to right, ${step.color}40, transparent)` }} />
                )}
                <div className="dark:bg-dark-700 bg-light-50 dark:border-dark-500 border-light-200 border rounded-3xl p-8 text-center hover:-translate-y-1 transition-transform duration-300">
                  <div className="font-display text-7xl font-bold mb-4 leading-none select-none" style={{ color: step.color, opacity: 0.12 }}>{step.num}</div>
                  <div className="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center text-3xl" style={{ background: `${step.color}12`, border: `1px solid ${step.color}25` }}>
                    {step.emoji}
                  </div>
                  <h3 className="font-display text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-sm dark:text-dark-100 text-dark-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-24 dark:bg-dark-900 bg-light-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-80 h-80 rounded-full" style={{ background: 'radial-gradient(circle, rgba(0,200,83,0.05) 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full" style={{ background: 'radial-gradient(circle, rgba(124,77,255,0.05) 0%, transparent 70%)' }} />
        </div>
        <div className="max-w-7xl mx-auto px-5 relative">
          <div className="text-center mb-16">
            <SectionLabel>Capabilities</SectionLabel>
            <h2 className="heading-lg mt-3">
              Built for every role in<br />
              <span className="text-gradient-purple">the nightlife ecosystem</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <div key={i}
                className={cn(
                  'dark:bg-dark-700 bg-white dark:border-dark-500 border-light-200 border rounded-3xl p-7',
                  'hover:-translate-y-1 transition-all duration-250 group cursor-default',
                  f.accent === 'green' ? 'hover:dark:border-green/30 hover:border-green/30' : 'hover:dark:border-purple/30 hover:border-purple/30',
                )}>
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-display text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-sm dark:text-dark-100 text-dark-400 leading-relaxed">{f.desc}</p>
                <div className={cn('mt-4 inline-flex items-center gap-1.5 text-xs font-semibold transition-colors', f.accent === 'green' ? 'text-green' : 'text-purple-light')}>
                  Learn more <Icon name="arrow" size={12} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button size="lg" variant="ghost-dark" onClick={() => navigate('/features')} rightIcon="arrow">
              View all features
            </Button>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 dark:bg-dark-800 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-14">
            <SectionLabel>Testimonials</SectionLabel>
            <h2 className="heading-lg mt-3">Loved by <span className="text-gradient-green">50,000+ users</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="dark:bg-dark-700 bg-light-50 dark:border-dark-500 border-light-200 border rounded-3xl p-6 flex flex-col">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <span key={j} className="text-gold text-sm">★</span>
                  ))}
                </div>
                <p className="text-sm dark:text-dark-100 text-dark-400 leading-relaxed flex-1 mb-5">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-green/20 border border-green/30 flex items-center justify-center text-xs font-bold text-green flex-shrink-0">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-bold">{t.name}</div>
                    <div className="text-[11px] dark:text-dark-100 text-dark-400">{t.role} · {t.city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 dark:bg-dark-900 bg-light-50">
        <div className="max-w-3xl mx-auto px-5">
          <div className="text-center mb-14">
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="heading-lg mt-3">Common questions</h2>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i}
                className={cn(
                  'dark:bg-dark-700 bg-white border rounded-2xl overflow-hidden transition-all',
                  faqOpen === i ? 'dark:border-green/30 border-green/30' : 'dark:border-dark-500 border-light-200',
                )}>
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                >
                  <span className="font-semibold text-sm pr-4">{item.q}</span>
                  <Icon
                    name={faqOpen === i ? 'x' : 'plus'}
                    size={16}
                    className={cn('flex-shrink-0 transition-colors', faqOpen === i ? 'text-green' : 'dark:text-dark-100 text-dark-400')}
                  />
                </button>
                {faqOpen === i && (
                  <div className="px-6 pb-5 text-sm dark:text-dark-100 text-dark-400 leading-relaxed border-t dark:border-dark-600 border-light-200 pt-4">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 dark:bg-dark-800 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(0,200,83,0.07) 0%, transparent 65%)' }} />
        <div className="max-w-4xl mx-auto px-5 text-center relative">
          <h2 className="heading-lg mb-5">
            Ready to upgrade<br /><span className="text-gradient">your nights?</span>
          </h2>
          <p className="dark:text-dark-100 text-dark-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Join 50,000+ users who've already made the switch. Free to sign up, no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="xl" onClick={() => navigate('/register')} rightIcon="arrow">
              Create Free Account
            </Button>
            <Button size="xl" variant="ghost-dark" onClick={() => navigate('/contact')}>
              Talk to Sales
            </Button>
          </div>
          <div className="flex items-center justify-center gap-6 text-xs dark:text-dark-100 text-dark-400">
            {['Free to get started', 'No credit card needed', 'Cancel anytime'].map(f => (
              <span key={f} className="flex items-center gap-1.5">
                <Icon name="check" size={11} className="text-green" strokeWidth={2.5} />
                {f}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
