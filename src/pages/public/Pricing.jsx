// ─────────────────────────────────────────────────────────────────────────────
//  Pricing.jsx
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from 'react';
import { Link, useNavigate }     from 'react-router-dom';
import { motion, AnimatePresence }    from 'framer-motion';
import { Button, Icon, SectionLabel } from '../../components/ui/index.js';
import { PRICING_PLANS }              from '../../data/mockData.js';
import { cn }                         from '../../utils/helpers.js';

const COMPARISON = [
  { feature: 'Venue Listings',        starter: '1',      growth: '3',         premium: 'Unlimited' },
  { feature: 'Monthly Bookings',      starter: '50',     growth: 'Unlimited', premium: 'Unlimited' },
  { feature: 'QR Check-in',           starter: true,     growth: true,         premium: true },
  { feature: 'Analytics Dashboard',   starter: 'Basic',  growth: 'Advanced',   premium: 'Custom + Export' },
  { feature: 'Dynamic Pricing',       starter: false,    growth: true,         premium: true },
  { feature: 'WhatsApp Notifications',starter: false,    growth: true,         premium: true },
  { feature: 'Dedicated Manager',     starter: false,    growth: false,        premium: true },
  { feature: 'API Access',            starter: false,    growth: false,        premium: true },
  { feature: 'Rainbow Certification', starter: false,    growth: true,         premium: true },
  { feature: 'Commission Rate',       starter: '7%',     growth: '5%',        premium: '3%' },
  { feature: 'Support',               starter: 'Email',  growth: 'Priority',   premium: '24/7 Phone' },
];

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
};

export default function Pricing() {
  const [annual, setAnnual] = useState(false);
  const navigate = useNavigate();

  const price = (plan) => {
    if (plan.monthlyPrice === 0) return '₹0';
    const p = annual ? plan.annualPrice : plan.monthlyPrice;
    return `₹${p.toLocaleString('en-IN')}`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="dark:text-white text-dark-900 font-body overflow-x-hidden"
    >
      {/* Hero */}
      <section className="py-40 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0, rgba(124,77,255,0.12) 0%, transparent 60%)' }} />
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto px-6 relative"
        >
          <SectionLabel>Pricing Plans</SectionLabel>
          <h1 className="heading-xl mt-8 mb-10 tracking-tighter">Transparent pricing for <br /><span className="text-gradient drop-shadow-2xl">every venue size</span></h1>
          <p className="dark:text-dark-100 text-dark-500 text-xl max-w-2xl mx-auto leading-relaxed mb-16 font-medium">No hidden fees or setup costs. Choose a plan that fits your current volume and scale as you grow.</p>

          {/* Monthly / Annual toggle */}
          <div className="inline-flex items-center gap-1 dark:bg-dark-700 bg-white dark:border-dark-500 border-black/10 border rounded-2xl p-2 shadow-2xl shadow-black/[0.03]">
            {[
              { label: 'Monthly', val: false },
              { label: 'Annual Billing', val: true }
            ].map(({ label, val }) => (
              <button 
                key={label} 
                onClick={() => setAnnual(val)}
                className={cn(
                  'relative px-10 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-all duration-500',
                  annual === val ? 'text-black' : 'dark:text-dark-100 text-dark-400 hover:text-green'
                )}
              >
                {annual === val && (
                  <motion.div 
                    layoutId="toggle-bg"
                    className="absolute inset-0 bg-green rounded-xl shadow-lg shadow-green/30"
                    transition={{ type: 'spring', bounce: 0.15, duration: 0.7 }}
                  />
                )}
                <span className="relative z-10">
                  {label}
                  {val && <span className="ml-3 text-[10px] font-black bg-black/10 px-2 py-0.5 rounded-md text-black/70 tracking-tight">Save 20%</span>}
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Plan cards */}
      <section className="pb-40 dark:bg-dark-900 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-32"
          >
            {PRICING_PLANS.map((plan, i) => (
              <motion.div 
                key={plan.id}
                variants={fadeInUp}
                className={cn(
                  'glass-card group flex flex-col relative overflow-hidden transition-all duration-[800ms] hover:-translate-y-4 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]',
                  plan.highlight && 'ring-2 ring-green shadow-[0_50px_100px_-20px_rgba(0,200,83,0.15)] scale-105 z-10 !dark:bg-dark-800/80 !bg-white/90',
                )}
              >
                <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-b", plan.highlight ? "from-green/5 to-transparent" : "from-purple/5 to-transparent")} />
                <div className="relative z-10">
                {plan.badge && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-green text-black text-[11px] font-black uppercase tracking-[0.25em] px-8 py-2.5 rounded-full shadow-2xl shadow-green/20">
                    {plan.badge}
                  </div>
                )}

                <div className="mb-12 text-center">
                  <div className="text-xs font-black uppercase tracking-[0.3em] dark:text-white/40 text-dark-400 mb-8">{plan.name}</div>
                  <div className="flex items-baseline justify-center gap-3 mb-6">
                    <AnimatePresence mode="wait">
                      <motion.span 
                        key={annual}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        className="heading-lg tracking-tighter"
                      >
                        {price(plan)}
                      </motion.span>
                    </AnimatePresence>
                    <span className="dark:text-dark-100 text-dark-400 font-black text-lg uppercase">/mo</span>
                  </div>
                  <p className="text-lg dark:text-dark-100 text-dark-500 leading-relaxed font-medium">{plan.desc}</p>
                </div>

                <ul className="space-y-6 mb-16 flex-1">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-5 text-base font-bold">
                      <div className={cn(
                        "mt-0.5 w-6 h-6 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg",
                        f.included ? "bg-green/20 text-green shadow-green/10" : "bg-dark-100/10 text-dark-100/40"
                      )}>
                        <Icon name={f.included ? 'check' : 'x'} size={14} strokeWidth={3} />
                      </div>
                      <span className={f.included ? 'dark:text-white text-dark-900' : 'dark:text-white/20 text-dark-900/20'}>{f.text}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <Button
                    size="xl"
                    variant={plan.ctaVariant}
                    fullWidth
                    className={cn("shadow-xl", plan.highlight ? 'shadow-green/20' : '')}
                    onClick={() => navigate('/register')}
                  >
                    {plan.cta}
                  </Button>
                  <div className="mt-8 text-center text-[11px] font-black uppercase tracking-[0.2em] dark:text-white/30 text-dark-400">
                    {plan.commissionRate}% Platform Fee per booking
                  </div>
                </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Comparison table */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card !p-0 shadow-3xl overflow-hidden border dark:border-white/5 border-black/5"
          >
            <div className="px-12 py-12 border-b dark:border-white/5 border-black/5 bg-gradient-to-r from-transparent via-purple/5 to-transparent">
              <h3 className="heading-sm dark:text-white text-dark-950 text-3xl">Deep Feature Comparison</h3>
              <p className="dark:text-dark-100 text-dark-500 text-lg mt-3 font-medium">Examine every capability across our partnership tiers.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="border-b dark:border-white/5 border-black/5 dark:bg-white/[0.02] bg-black/[0.01]">
                    <th className="text-left text-[11px] font-black uppercase tracking-[0.2em] dark:text-dark-100 text-dark-400 px-12 py-8">Capability</th>
                    {['Starter', 'Growth', 'Premium'].map(p => (
                      <th key={p} className="text-center text-[11px] font-black uppercase tracking-[0.2em] px-12 py-8 dark:text-white text-dark-950">{p}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row, i) => (
                    <tr key={i} className="border-b dark:border-white/5 border-black/5 last:border-0 hover:bg-black/[0.01] dark:hover:bg-white/[0.01] transition-all duration-500">
                      <td className="px-12 py-6 text-lg font-black dark:text-white text-dark-950">{row.feature}</td>
                      {[row.starter, row.growth, row.premium].map((val, j) => (
                        <td key={j} className="px-12 py-6 text-center">
                          {typeof val === 'boolean'
                            ? (
                                <div className={cn(
                                  "mx-auto w-8 h-8 rounded-xl flex items-center justify-center shadow-lg",
                                  val ? "bg-green/15 text-green shadow-green/5" : "dark:text-white/10 text-dark-900/10"
                                )}>
                                  <Icon name={val ? 'check' : 'x'} size={16} strokeWidth={3} />
                                </div>
                              )
                            : <span className={cn('text-lg font-black', j === 2 ? 'text-green' : 'dark:text-dark-100 text-dark-500')}>{val}</span>
                          }
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Support note */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-32 text-center"
          >
            <p className="text-xl mb-8 font-medium dark:text-white/60 text-dark-500">Still have questions about our plans?</p>
            <div className="flex flex-wrap items-center justify-center gap-10">
              <Link to="/contact" className="text-green hover:text-green-light font-black uppercase tracking-[0.2em] text-xs flex items-center gap-3 group">
                Contact Sales <Icon name="arrow" size={16} className="transition-transform duration-500 group-hover:translate-x-2" />
              </Link>
              <div className="w-1.5 h-1.5 rounded-full dark:bg-white/10 bg-black/10" />
              <Link to="/help" className="text-green hover:text-green-light font-black uppercase tracking-[0.2em] text-xs flex items-center gap-3 group">
                Visit Help Center <Icon name="external-link" size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
