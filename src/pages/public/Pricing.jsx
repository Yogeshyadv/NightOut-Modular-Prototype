// ─────────────────────────────────────────────────────────────────────────────
//  Pricing.jsx
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from 'react';
import { Link }     from 'react-router-dom';
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

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  const price = (plan) => {
    if (plan.monthlyPrice === 0) return '₹0';
    const p = annual ? plan.annualPrice : plan.monthlyPrice;
    return `₹${p.toLocaleString('en-IN')}`;
  };

  return (
    <div className="dark:text-white text-dark-900">
      {/* Hero */}
      <section className="py-24 text-center">
        <div className="max-w-4xl mx-auto px-5">
          <SectionLabel>Pricing</SectionLabel>
          <h1 className="heading-xl mt-4 mb-5">Simple, transparent pricing</h1>
          <p className="dark:text-dark-100 text-dark-400 text-lg mb-10">No hidden fees. Start free, scale as you grow.</p>

          {/* Monthly / Annual toggle */}
          <div className="inline-flex items-center gap-1 dark:bg-dark-700 bg-light-100 dark:border-dark-500 border-light-200 border rounded-full p-1">
            {[['Monthly', false], ['Annual', true]].map(([label, val]) => (
              <button key={label} onClick={() => setAnnual(val)}
                className={cn('px-5 py-2.5 rounded-full text-sm font-semibold transition-all', annual === val ? 'bg-green text-black shadow-green' : 'dark:text-dark-100 text-dark-400 hover:text-green')}>
                {label}
                {val && <span className="ml-1.5 text-[10px] font-bold text-green">–20%</span>}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Plan cards */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {PRICING_PLANS.map((plan, i) => (
              <div key={plan.id}
                className={cn(
                  'relative dark:bg-dark-700 bg-white dark:border-dark-500 border-light-200 border rounded-3xl p-8 transition-all',
                  plan.highlight && 'dark:border-green/40 border-green/40 shadow-green scale-[1.02] md:scale-[1.02]',
                )}>
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-green text-black text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                    {plan.badge}
                  </div>
                )}

                <div className="mb-6">
                  <div className="font-display text-lg font-bold mb-1">{plan.name}</div>
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="font-display text-4xl font-bold">{price(plan)}</span>
                    <span className="dark:text-dark-100 text-dark-400 text-sm">/month</span>
                  </div>
                  <p className="text-sm dark:text-dark-100 text-dark-400">{plan.desc}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm">
                      <Icon
                        name={f.included ? 'check' : 'x'}
                        size={14}
                        className={cn('flex-shrink-0 mt-0.5', f.included ? 'text-green' : 'dark:text-dark-200 text-dark-300')}
                        strokeWidth={f.included ? 2.5 : 2}
                      />
                      <span className={f.included ? '' : 'dark:text-dark-200 text-dark-300'}>{f.text}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/register">
                  <Button
                    size="md"
                    variant={plan.ctaVariant}
                    fullWidth
                    className={plan.highlight ? 'shadow-green' : ''}
                  >
                    {plan.cta}
                  </Button>
                </Link>

                <div className="mt-4 text-center text-xs dark:text-dark-100 text-dark-400">
                  {plan.commissionRate}% platform commission
                </div>
              </div>
            ))}
          </div>

          {/* Comparison table */}
          <div className="dark:bg-dark-700 bg-white dark:border-dark-500 border-light-200 border rounded-3xl overflow-hidden">
            <div className="px-6 py-5 border-b dark:border-dark-500 border-light-200">
              <h3 className="font-display text-lg font-bold">Feature Comparison</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[540px]">
                <thead>
                  <tr className="border-b dark:border-dark-500 border-light-200">
                    <th className="text-left label-xs text-dark-100 px-6 py-4">Feature</th>
                    {['Starter', 'Growth', 'Premium'].map(p => (
                      <th key={p} className="text-center label-xs px-6 py-4">{p}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row, i) => (
                    <tr key={i} className="border-b dark:border-dark-500/50 border-light-200/70 last:border-0">
                      <td className="px-6 py-3.5 text-sm dark:text-dark-100 text-dark-400">{row.feature}</td>
                      {[row.starter, row.growth, row.premium].map((val, j) => (
                        <td key={j} className="px-6 py-3.5 text-center">
                          {typeof val === 'boolean'
                            ? <Icon name={val ? 'check' : 'x'} size={15} className={cn('mx-auto', val ? 'text-green' : 'dark:text-dark-200 text-dark-300')} strokeWidth={val ? 2.5 : 2} />
                            : <span className={cn('text-sm font-semibold', j === 1 ? 'text-green' : '')}>{val}</span>
                          }
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* FAQ note */}
          <div className="mt-12 text-center dark:text-dark-100 text-dark-400 text-sm">
            Questions?{' '}
            <Link to="/contact" className="text-green hover:underline font-semibold">Talk to our team</Link>
            {' '}or read our{' '}
            <Link to="/help" className="text-green hover:underline font-semibold">FAQ</Link>.
          </div>
        </div>
      </section>
    </div>
  );
}
