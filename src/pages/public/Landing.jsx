// ─────────────────────────────────────────────────────────────────────────────
//  Landing.jsx  — PREMIER MARKETING LANDING PAGE
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useEffect, useRef } from 'react';
import { useNavigate }           from 'react-router-dom';
import { motion, AnimatePresence }    from 'framer-motion';
import { Button, Icon, SectionLabel } from '../../components/ui/index.js';
import { TESTIMONIALS, FAQ_ITEMS }    from '../../data/mockData.js';
import { cn }                         from '../../utils/helpers.js';

import { useTheme }                  from '../../context/ThemeContext.jsx';

// Assets
import hero1 from '../../assets/images/hero1.png';
import hero2 from '../../assets/images/hero2.png';
import feature_qr from '../../assets/images/feature_qr.png';

const HERO_IMAGES = [hero1, hero2];

// ── Motion Variants ──────────────────────────────────────────────────────────
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
};

// ── animated counter ──────────────────────────────────────────────────────────
function CountUp({ end, duration = 2000, prefix = '', suffix = '' }) {
  const [val, setVal] = useState(0);
  const [started, setStarted] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setStarted(true);
    }, { threshold: 0.1 });
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const endVal = parseFloat(end);
    if (start === endVal) return;

    let timer;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setVal(endVal * ease);
      if (progress < 1) {
        timer = requestAnimationFrame(step);
      }
    };
    timer = requestAnimationFrame(step);
    return () => cancelAnimationFrame(timer);
  }, [end, duration, started]);

  return (
    <span ref={elementRef} className="tabular-nums">
      {prefix}{val.toLocaleString(undefined, { minimumFractionDigits: end % 1 !== 0 ? 1 : 0, maximumFractionDigits: 1 })}{suffix}
    </span>
  );
}

// ── data ──────────────────────────────────────────────────────────────────────
const STEPS = [
  { num: '01', emoji: '🧭', title: 'Discover',   color: '#00C853',
    desc: 'Browse real-time venue listings with live crowd levels, tonight\'s DJ, and entry pricing.' },
  { num: '02', emoji: '🎫', title: 'Book',        color: '#7C4DFF',
    desc: 'Lock in your spot in 60 seconds. Pay via UPI, card, or wallet. Get a QR ticket instantly.' },
  { num: '03', emoji: '📱', title: 'Enter',       color: '#00E676',
    desc: 'Show your QR at the door. Bouncer scans — you\'re in under 2 seconds. Works offline.' },
];

const FEATURES = [
  { icon: '🧭', title: 'Smart Discovery',   accent: 'green',  desc: 'AI-powered venue recommendations based on your music taste, budget, and city. Filter by vibe or crowd size.' },
  { icon: '📱', title: 'Offline QR Check-in',accent: 'purple', desc: 'Your QR works without internet. 6-digit backup always included. Check-in takes under 2 seconds.' },
  { icon: '🛡️', title: 'Safety Suite',      accent: 'green',  desc: 'Live location sharing, shake-to-SOS panic button, and automated post-trip check-ins.' },
  { icon: '🌈', title: 'Rainbow Verified',  accent: 'purple', desc: 'Certified LGBTQ+-inclusive venues with trained staff, equal pricing, and gender-neutral facilities.' },
  { icon: '📊', title: 'Vendor Analytics',  accent: 'green',  desc: 'Club owners get real-time dashboards: live bookings, crowd data, and revenue.' },
  { icon: '👑', title: 'Gold Membership',   accent: 'purple', desc: 'Priority entry, 10% cashback, exclusive deals, and a dedicated support line.' },
];

export default function Landing() {
  const { dark } = useTheme();
  const navigate = useNavigate();
  const [faqOpen, setFaqOpen] = useState(null);
  const [heroIdx, setHeroIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIdx((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="overflow-x-hidden font-body dark:text-white text-dark-900"
    >
      
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden dark:bg-black bg-white transition-colors duration-700">
        {/* Slideshow Background */}
        <AnimatePresence mode="wait">
          <motion.div
            key={heroIdx}
            initial={{ opacity: 0, scale: 1.15 }}
            animate={{ opacity: dark ? 0.6 : 0.35, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
            className="absolute inset-0 z-0"
          >
            <img 
              src={HERO_IMAGES[heroIdx]} 
              className="w-full h-full object-cover" 
              alt="Nightlife atmosphere" 
            />
            {/* Dynamic Overlays */}
            <div className="absolute inset-0 dark:bg-gradient-to-b dark:from-black/70 dark:via-transparent dark:to-black bg-gradient-to-b from-white/70 via-transparent to-white/90" />
            <div className="absolute inset-0 dark:bg-gradient-to-r dark:from-black dark:via-transparent dark:to-black/40 bg-gradient-to-r from-white/50 via-transparent to-white/30" />
          </motion.div>
        </AnimatePresence>

        {/* Animated Background Orbs */}
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden mix-blend-screen">
          <motion.div 
            animate={{ 
              x: [0, 80, -40, 0],
              y: [0, -60, 40, 0],
              scale: [1, 1.2, 0.9, 1],
              opacity: [0.15, 0.25, 0.15]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[5%] left-[5%] w-[800px] h-[800px] rounded-full dark:bg-green/20 bg-green/10 blur-[150px]" 
          />
          <motion.div 
            animate={{ 
              x: [0, -60, 30, 0],
              y: [0, 60, -20, 0],
              scale: [1, 1.15, 0.95, 1],
              opacity: [0.15, 0.25, 0.15]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-[5%] right-[5%] w-[600px] h-[600px] rounded-full dark:bg-purple/20 bg-purple/10 blur-[150px]" 
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 py-20 w-full">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="max-w-4xl"
          >
            {/* Eyebrow */}
            <motion.div 
              variants={fadeInUp}
              className="inline-flex items-center gap-2 dark:bg-white/10 bg-black/[0.03] backdrop-blur-md border dark:border-white/20 border-black/10 rounded-full px-5 py-2 mb-10 shadow-xl shadow-black/5"
            >
              <span className="w-2 h-2 bg-green rounded-full animate-pulse" />
              <span className="text-[11px] font-black uppercase tracking-[0.25em] dark:text-white text-dark-800">Operating in 12 Major Cities · India</span>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              variants={fadeInUp}
              className="heading-xl mb-10 dark:text-white text-dark-950 tracking-tighter"
            >
              India's nightlife,<br />
              <span className="text-gradient drop-shadow-2xl">reimagined & upgraded</span>
            </motion.h1>

            <motion.p 
              variants={fadeInUp}
              className="text-xl dark:text-white/70 text-dark-500 max-w-2xl leading-relaxed mb-14 font-medium"
            >
              Discover elite venues, skip the queue with instant booking, and check in with a single scan.
              The ultimate platform for India's premium clubbing scene.
            </motion.p>

            {/* CTAs */}
            <motion.div 
              variants={fadeInUp}
              className="flex flex-wrap gap-6 mb-24"
            >
              <Button size="xl" onClick={() => navigate('/register')} rightIcon="arrow" className="px-10 shadow-2xl shadow-green/20">
                Book Your Night
              </Button>
              <Button size="xl" variant="ghost-dark" onClick={() => navigate('/features')} className="px-10 backdrop-blur-md">
                Explore Features
              </Button>
            </motion.div>

            {/* Stats row */}
            <motion.div 
              variants={staggerContainer}
              className="grid grid-cols-2 sm:grid-cols-4 gap-12 border-t dark:border-white/10 border-black/10 pt-12"
            >
              {[
                { val: 200, suffix: '+', label: 'Partner Venues'  },
                { val: 50,  suffix: 'K+', label: 'Happy Guests' },
                { val: 12,  suffix: '',   label: 'Active Cities'  },
                { val: 4.9, suffix: '★',  label: 'User Rating'    },
              ].map((s, i) => (
                <motion.div key={i} variants={fadeInUp} className="relative group">
                  <div className="font-display text-5xl font-black dark:text-white text-dark-950 mb-2 transition-transform duration-500 group-hover:translate-x-1">
                    <CountUp end={s.val} suffix={s.suffix} />
                  </div>
                  <div className="text-[11px] font-black dark:text-white/40 text-dark-400 uppercase tracking-[0.2em]">{s.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div 
          animate={{ y: [0, 15, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
        >
          <div className="w-px h-16 bg-gradient-to-b from-transparent dark:via-white/40 via-black/20 to-transparent" />
          <Icon name="chevron-down" size={24} className="dark:text-white/20 text-dark-300" />
        </motion.div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-40 dark:bg-dark-900 bg-white relative overflow-hidden transition-colors duration-700">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-32"
          >
            <SectionLabel>The Experience</SectionLabel>
            <h2 className="heading-lg mt-8">
              Three steps to your<br />
              <span className="text-gradient">unforgettable night</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {STEPS.map((step, i) => (
              <motion.div 
                key={step.num}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.2 }}
                className="group relative"
              >
                <div className="glass-card p-12 h-full relative overflow-hidden group-hover:-translate-y-3 transition-all duration-700 dark:bg-dark-800/40 bg-light-50/50 border dark:border-white/5 border-black/5 rounded-[40px] shadow-2xl shadow-black/[0.02]">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br dark:from-white/[0.05] from-black/[0.03] to-transparent rounded-bl-full transition-transform duration-700 group-hover:scale-110" />
                  <div className="font-display text-[140px] font-black absolute -top-8 -right-4 opacity-[0.03] dark:text-white text-dark-900 pointer-events-none select-none">{step.num}</div>
                  
                  <div className="w-24 h-24 rounded-[32px] mb-10 flex items-center justify-center text-5xl shadow-2xl transition-all duration-700 group-hover:scale-110 group-hover:rotate-3" 
                    style={{ background: `linear-gradient(135deg, ${step.color}20, ${step.color}40)`, border: `1px solid ${step.color}30` }}>
                    {step.emoji}
                  </div>
                  
                  <h3 className="heading-sm mb-6 text-2xl">{step.title}</h3>
                  <p className="dark:text-dark-100 text-dark-500 leading-relaxed text-lg font-medium">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── IMAGE FEATURE SECTION ── */}
      <section className="py-40 dark:bg-dark-800 bg-light-50 overflow-hidden transition-colors duration-700">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-28">
            <motion.div 
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2"
            >
              <SectionLabel>Elite Technology</SectionLabel>
              <h2 className="heading-lg mt-8 mb-10">Skip the queue with <br/><span className="text-gradient">Proprietary QR</span></h2>
              <p className="text-xl dark:text-dark-100 text-dark-500 mb-12 leading-relaxed font-medium">
                Our Rainbow QR technology is built for the chaos of a club entrance. It works offline, refreshes dynamically, and clears bouncer scans in under 2 seconds.
              </p>
              <div className="space-y-8">
                {[
                  { t: 'Zero Network Required', d: 'Your ticket remains active even in basement clubs with no signal.' },
                  { t: 'Dynamic Security', d: 'QR codes refresh every 30 seconds to prevent unauthorized transfers.' },
                  { t: 'Universal Adoption', d: 'Trusted and used by bouncers at 200+ premium venues across India.' }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx} 
                    className="flex gap-6"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + (idx * 0.1) }}
                  >
                    <div className="mt-1 w-8 h-8 rounded-xl bg-green/20 flex items-center justify-center flex-shrink-0 shadow-lg shadow-green/10">
                      <Icon name="check" size={14} className="text-green" strokeWidth={3} />
                    </div>
                    <div>
                      <h4 className="font-black text-xl dark:text-white text-dark-900 mb-1">{item.t}</h4>
                      <p className="dark:text-dark-100 text-dark-500 font-medium leading-relaxed">{item.d}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="lg:w-1/2 relative"
            >
              <div className="relative rounded-[50px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border-[12px] dark:border-dark-700 border-white group">
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 1.5 }}
                  src={feature_qr} 
                  alt="QR Check-in" 
                  className="w-full aspect-[4/5] object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t dark:from-black/70 from-white/30 to-transparent" />
                <div className="absolute bottom-12 left-10 right-10 glass p-8 rounded-3xl border border-white/20 shadow-2xl backdrop-blur-3xl">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-green rounded-2xl flex items-center justify-center shadow-lg shadow-green/20">
                      <Icon name="qr" size={32} className="text-black" />
                    </div>
                    <div>
                      <div className="dark:text-white text-dark-900 text-xl font-black">Fast-Track Entry</div>
                      <div className="dark:text-white/60 text-dark-500 font-bold">Verified · Prism Nightclub</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative Glows */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple/30 blur-[100px] -z-1 animate-pulse" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-green/30 blur-[100px] -z-1 animate-pulse" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FEATURES GRID ── */}
      <section className="py-40 dark:bg-dark-950 bg-white transition-colors duration-700">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-32">
            <SectionLabel>Capabilities</SectionLabel>
            <h2 className="heading-lg mt-8">Everything you need <br/><span className="text-gradient">to own the night</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {FEATURES.map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="glass-card group p-10 hover:shadow-2xl hover:shadow-black/10 rounded-[40px] transition-all duration-700"
              >
                <div className="text-5xl mb-10 group-hover:scale-125 group-hover:rotate-6 transition-all duration-700 origin-left inline-block">{f.icon}</div>
                <h3 className="heading-sm mb-6 text-2xl">{f.title}</h3>
                <p className="dark:text-dark-100 text-dark-500 text-lg leading-relaxed mb-8 font-medium">{f.desc}</p>
                <div className={cn(
                  "inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] cursor-pointer group/link",
                  f.accent === 'green' ? 'text-green' : 'text-purple-light'
                )}>
                  Learn More <Icon name="arrow" size={14} className="transition-transform duration-500 group-hover/link:translate-x-2" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-40 dark:bg-dark-800 bg-light-50 transition-colors duration-700">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-24">
            <motion.div
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
            >
              <SectionLabel>Community</SectionLabel>
              <h2 className="heading-lg mt-8 text-dark-950 dark:text-white">Trusted by <span className="text-gradient">50k+ night owls</span></h2>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.7 }}
                className="glass-card p-10 flex flex-col hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] transition-all duration-700 dark:bg-dark-700/50 bg-white shadow-xl shadow-black/5 rounded-[40px]"
              >
                <div className="flex gap-1.5 mb-8">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <span key={j} className={cn("text-lg", j < t.rating ? "text-gold" : "text-dark-400")}>★</span>
                  ))}
                </div>
                <p className="dark:text-dark-100 text-dark-500 italic leading-relaxed flex-1 mb-10 text-lg font-medium">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-5 border-t dark:border-white/5 border-black/5 pt-8">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green/30 to-purple/30 flex items-center justify-center font-black text-green text-lg shadow-inner">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-lg font-black dark:text-white text-dark-950">{t.name}</div>
                    <div className="text-[11px] dark:text-white/40 text-dark-400 uppercase tracking-[0.25em] font-black">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-40 relative overflow-hidden transition-colors duration-700">
        <div className="absolute inset-0 dark:bg-dark-950 bg-green/5">
           <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at 50% 50%, #00C853 0%, transparent 70%)' }} />
        </div>
        
        <div className="max-w-4xl mx-auto px-6 relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="heading-xl mb-10 dark:text-white text-dark-950">Ready to own <br /><span className="text-gradient">the night?</span></h2>
            <p className="text-xl dark:text-dark-100 text-dark-500 mb-16 max-w-2xl mx-auto font-medium">Join thousands of clubbers who have already upgraded their weekend experience. Your next big night is just a scan away.</p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-20">
              <Button size="xl" onClick={() => navigate('/register')} rightIcon="arrow" className="px-12 shadow-2xl shadow-green/20">Create Free Account</Button>
              <Button size="xl" variant="ghost-dark" onClick={() => navigate('/pricing')} className="px-12 backdrop-blur-md">View Pricing Plans</Button>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-10 text-[11px] font-black dark:text-dark-100 text-dark-400 uppercase tracking-[0.3em]">
              {['Free Forever', 'Verified Venues', 'Secure Entry'].map(f => (
                <motion.span 
                  key={f} 
                  className="flex items-center gap-3"
                  whileHover={{ scale: 1.05, color: '#00C853' }}
                >
                  <Icon name="check" size={14} className="text-green" strokeWidth={3} />
                  {f}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
