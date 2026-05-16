// ─────────────────────────────────────────────────────────────────────────────
//  Register.jsx  — 2-step registration wizard
// ─────────────────────────────────────────────────────────────────────────────
import { useState }          from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth }           from '../../context/AuthContext.jsx';
import {
  Button, Input, PasswordInput, Select, Checkbox, Icon, Divider,
} from '../../components/ui/index.js';
import { AuthShell } from './Login.jsx';
import { cn }        from '../../utils/helpers.js';

const CITIES   = ['Jaipur','Delhi','Mumbai','Bengaluru','Chennai','Hyderabad','Pune','Kolkata'];
const PLANS    = [
  { id: 'starter', label: 'Starter', price: 'Free',          note: '7% commission' },
  { id: 'growth',  label: 'Growth',  price: '₹2,999/mo',     note: '5% commission' },
  { id: 'premium', label: 'Premium', price: '₹7,999/mo',     note: '3% commission' },
];

export default function Register() {
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const [step,   setStep]   = useState(1);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    name: '', email: '', password: '', confirm: '',
    businessName: '', city: '', phone: '', plan: 'growth', agreed: false,
  });

  const set = k => e => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm(f => ({ ...f, [k]: val }));
    setErrors(er => ({ ...er, [k]: '' }));
  };

  // ── Step 1 validation ──
  const validate1 = () => {
    const e = {};
    if (!form.name.trim())        e.name     = 'Name is required';
    if (!form.email.includes('@')) e.email    = 'Valid email required';
    if (form.password.length < 6) e.password = 'Password must be 6+ characters';
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleStep1 = (e) => { e.preventDefault(); if (validate1()) setStep(2); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.agreed) { setErrors(er => ({ ...er, agreed: 'You must agree to continue' })); return; }
    const res = await register(form);
    if (res.success) {
      const targetRole = res.user.role;
      navigate(targetRole === 'admin' ? '/admin/dashboard' : '/vendor/dashboard');
    }
  };


  return (
    <AuthShell title={step === 1 ? 'Create account' : 'Business details'} subtitle={step === 1 ? 'Join 200+ venues on NightOut' : 'Tell us about your venue'}>
      {/* Step progress */}
      <div className="flex gap-2 mb-8">
        {[1, 2].map(s => (
          <div key={s} className={cn('flex-1 h-1 rounded-full transition-all duration-300', s <= step ? 'bg-green' : 'dark:bg-dark-500 bg-light-200')} />
        ))}
      </div>
      <div className="text-xs dark:text-dark-100 text-dark-400 mb-6">Step {step} of 2</div>

      {/* ── STEP 1 ── */}
      {step === 1 && (
        <form onSubmit={handleStep1} className="space-y-4">
          <Input label="Full Name" placeholder="Amit Kumar" icon="user" value={form.name} onChange={set('name')} error={errors.name} required />
          <Input label="Email Address" type="email" placeholder="amit@venue.in" icon="mail" value={form.email} onChange={set('email')} error={errors.email} required />
          <PasswordInput label="Password" placeholder="Min. 6 characters" value={form.password} onChange={set('password')} error={errors.password} required />
          <PasswordInput label="Confirm Password" placeholder="Repeat password" value={form.confirm} onChange={set('confirm')} error={errors.confirm} required />
          <Button type="submit" size="lg" fullWidth rightIcon="arrow">Continue</Button>
        </form>
      )}

      {/* ── STEP 2 ── */}
      {step === 2 && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Business Name" placeholder="F Bar & Lounge" icon="building" value={form.businessName} onChange={set('businessName')} required />
          <Input label="Phone Number" type="tel" placeholder="+91 98765 00000" icon="phone" value={form.phone} onChange={set('phone')} />
          <Select
            label="City"
            placeholder="Select city…"
            options={CITIES}
            value={form.city}
            onChange={set('city')}
            required
          />

          {/* Plan picker */}
          <div>
            <div className="label-xs text-dark-100 mb-2">Plan</div>
            <div className="grid grid-cols-3 gap-2">
              {PLANS.map(p => (
                <button type="button" key={p.id} onClick={() => setForm(f => ({ ...f, plan: p.id }))}
                  className={cn(
                    'p-3 rounded-xl border text-center transition-all text-xs font-semibold',
                    form.plan === p.id
                      ? 'bg-green/10 border-green/40 text-green'
                      : 'dark:bg-dark-600 bg-light-50 dark:border-dark-400 border-light-200 dark:text-dark-100 text-dark-400',
                  )}>
                  <div>{p.label}</div>
                  <div className="font-normal text-[10px] mt-0.5 opacity-80">{p.price}</div>
                  <div className="font-normal text-[9px] opacity-60">{p.note}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Agreement */}
          <div>
            <Checkbox
              checked={form.agreed}
              onChange={v => { setForm(f => ({ ...f, agreed: v })); setErrors(er => ({ ...er, agreed: '' })); }}
              label={
                <span>
                  I agree to NightOut's{' '}
                  <Link to="/terms" className="text-green hover:underline">Terms of Service</Link>
                  {' '}and{' '}
                  <Link to="/privacy" className="text-green hover:underline">Privacy Policy</Link>
                </span>
              }
            />
            {errors.agreed && <div className="text-xs text-danger mt-1">{errors.agreed}</div>}
          </div>

          <div className="flex gap-3">
            <Button type="button" size="md" variant="ghost-dark" onClick={() => setStep(1)} leftIcon="arrow-left">
              Back
            </Button>
            <Button type="submit" size="md" fullWidth loading={loading} rightIcon="arrow">
              Create Account
            </Button>
          </div>
        </form>
      )}

      <Divider label="or" />
      <p className="text-sm dark:text-dark-100 text-dark-400 text-center">
        Already have an account?{' '}
        <Link to="/login" className="text-green font-semibold hover:underline">Sign in</Link>
      </p>
    </AuthShell>
  );
}
