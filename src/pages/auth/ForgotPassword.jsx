// ─────────────────────────────────────────────────────────────────────────────
//  ForgotPassword.jsx
// ─────────────────────────────────────────────────────────────────────────────
import { useState }  from 'react';
import { Link }      from 'react-router-dom';
import { Button, Input, Icon } from '../../components/ui/index.js';
import { AuthShell }           from './Login.jsx';

export default function ForgotPassword() {
  const [email,   setEmail]   = useState('');
  const [sent,    setSent]    = useState(false);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.includes('@')) { setError('Please enter a valid email address.'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setSent(true);
    setLoading(false);
  };

  return (
    <AuthShell title="Reset password" subtitle="We'll send a reset link to your email">
      {sent ? (
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-green/15 border border-green/30 flex items-center justify-center text-green mx-auto mb-6">
            <Icon name="check-circle" size={28} />
          </div>
          <h3 className="font-display text-xl font-bold mb-2">Check your email</h3>
          <p className="text-sm dark:text-dark-100 text-dark-400 mb-2">
            We sent a password reset link to:
          </p>
          <p className="text-sm font-semibold text-green mb-8">{email}</p>
          <p className="text-xs dark:text-dark-100 text-dark-400 mb-6">
            Didn't receive it? Check your spam folder or{' '}
            <button onClick={() => setSent(false)} className="text-green hover:underline font-semibold">try again</button>.
          </p>
          <Link to="/login">
            <Button size="md" variant="ghost-dark" leftIcon="arrow-left" fullWidth>
              Back to sign in
            </Button>
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email address"
            type="email"
            placeholder="you@example.com"
            icon="mail"
            value={email}
            onChange={e => { setEmail(e.target.value); setError(''); }}
            error={error}
            required
            autoComplete="email"
          />

          <Button type="submit" size="lg" fullWidth loading={loading} rightIcon="arrow">
            Send Reset Link
          </Button>

          <div className="text-center">
            <Link to="/login" className="text-sm dark:text-dark-100 text-dark-400 hover:text-green transition-colors inline-flex items-center gap-1.5">
              <Icon name="arrow-left" size={13} /> Back to sign in
            </Link>
          </div>
        </form>
      )}
    </AuthShell>
  );
}
