// ─────────────────────────────────────────────────────────────────────────────
//  Vendor QR Scanner  —  mock scan simulation + manual code entry
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useEffect } from 'react';
import {
  StatCard, Card, PageHeader, Button, StatusPill, InfoRow, Icon,
} from '../../components/ui/index.js';
import { useToast }     from '../../hooks/useToast.js';
import { ToastContainer } from '../../components/ui/Toast.jsx';
import { fmt }          from '../../utils/helpers.js';
import api from '../../utils/api';


export default function Scanner() {
  const { toasts, show, dismiss } = useToast();
  const [scanning,   setScanning]   = useState(false);
  const [code,       setCode]       = useState('');
  const [result,     setResult]     = useState(null);
  const [stats,      setStats]      = useState({ scanned: 0, total: 0 });
  const [recentList, setRecentList] = useState([]);

  useEffect(() => {
    // Fetch initial stats for the vendor
    const fetchStats = async () => {
      try {
        const res = await api.get('/bookings');
        if (res.data.success) {
          const bookings = res.data.data;
          const scanned = bookings.filter(b => b.status === 'completed').length;
          setStats({ scanned, total: bookings.length });
          setRecentList(bookings.filter(b => b.status === 'completed').slice(-5).reverse().map(b => ({
            name: b.user?.name || 'Guest',
            time: new Date(b.updatedAt).toLocaleTimeString(),
            ok: true
          })));
        }
      } catch (err) {
        console.error('Failed to load scanner stats');
      }
    };
    fetchStats();
  }, []);

  const handleVerify = async (val) => {
    const t = val || code.trim();
    if (!t) return;
    
    setScanning(true);
    setResult(null);
    try {
      const res = await api.post('/bookings/verify', { code: t });
      if (res.data.success) {
        const booking = res.data.data;
        setResult({ ok: true, booking: {
          guest: booking.user?.name || 'Guest',
          venue: booking.venue?.name,
          type: booking.tickets.type,
          guests: booking.tickets.count,
          id: booking._id
        }});
        setStats(s => ({ ...s, scanned: s.scanned + 1 }));
        pushRecent(booking.user?.name || 'Guest', true);
        show(`✓ Verified: ${booking.user?.name}`, 'success');
      }
    } catch (err) {
      setResult({ ok: false });
      pushRecent('Unknown/Invalid', false);
      show(err.response?.data?.message || 'Verification failed', 'danger');
    } finally {
      setScanning(false);
      setCode('');
    }
  };

  const pushRecent = (name, ok) => {
    const time = new Date().toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit' });
    setRecentList(r => [{ name, time, ok }, ...r.slice(0, 7)]);
  };

  const reset = () => { setResult(null); setCode(''); };

  return (
    <div className="p-6 space-y-6 animate-fade-up">
      <ToastContainer toasts={toasts} dismiss={dismiss} />

      <PageHeader title="QR Scanner" subtitle="Scan guest tickets at the door — bouncer mode" />

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard icon="qr"      label="Scanned Tonight" value={stats.scanned}        accent="green"  />
        <StatCard icon="users"   label="Total Expected"  value={stats.total}          accent="purple" />
        <StatCard icon="⏳"       label="Remaining"       value={Math.max(0, stats.total - stats.scanned)}   accent="gold"   />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Scanner panel */}
        <Card title="Camera Scanner" subtitle="Point camera at guest's QR code">
          <div className="flex flex-col items-center gap-5 py-2">
            {/* Viewport */}
            <div className="relative w-full max-w-xs aspect-square dark:bg-dark-700 bg-light-100 dark:border-dark-500 border-light-200 border rounded-2xl overflow-hidden flex items-center justify-center">
              {/* Corner brackets */}
              {[
                ['top-3 left-3',    'border-t-2 border-l-2 rounded-tl-xl'],
                ['top-3 right-3',   'border-t-2 border-r-2 rounded-tr-xl'],
                ['bottom-3 left-3', 'border-b-2 border-l-2 rounded-bl-xl'],
                ['bottom-3 right-3','border-b-2 border-r-2 rounded-br-xl'],
              ].map(([pos, cls], i) => (
                <div key={i} className={`absolute ${pos} w-9 h-9 border-green ${cls}`} />
              ))}

              {/* Scan line */}
              {scanning && (
                <div className="absolute left-5 right-5 h-0.5 animate-scan"
                  style={{ background:'linear-gradient(to right,transparent,#00C853,transparent)', boxShadow:'0 0 12px rgba(0,200,83,0.6)' }} />
              )}

              {/* States */}
              {!result && !scanning && (
                <div className="text-center dark:text-dark-100 text-dark-400">
                  <Icon name="qr" size={52} className="mx-auto mb-3 opacity-20" />
                  <span className="text-sm">Point camera at QR code</span>
                </div>
              )}
              {scanning && (
                <div className="absolute bottom-4 text-xs text-green font-semibold animate-pulse">Verifying…</div>
              )}
              {result?.ok && (
                <div className="flex flex-col items-center gap-3 animate-fade-up">
                  <div className="w-20 h-20 rounded-full bg-green/15 border-2 border-green flex items-center justify-center text-green text-4xl">✓</div>
                  <div className="font-display font-bold text-green text-xl">ADMIT</div>
                </div>
              )}
              {result && !result.ok && (
                <div className="flex flex-col items-center gap-3 animate-fade-up">
                  <div className="w-20 h-20 rounded-full bg-danger/15 border-2 border-danger flex items-center justify-center text-danger text-4xl">✕</div>
                  <div className="font-display font-bold text-danger text-xl">DENY</div>
                </div>
              )}
            </div>

            {/* Main button (simulation) */}
            <Button
              size="lg"
              fullWidth
              variant={result ? 'ghost-dark' : 'primary'}
              loading={scanning}
              onClick={result ? reset : () => handleVerify('DEMO_SCAN')}
            >
              {scanning ? 'Verifying…' : result ? 'Scan Next Guest →' : (
                <><Icon name="qr" size={18} /> Tap to Scan QR</>
              )}
            </Button>

            {/* Manual entry */}
            <div className="w-full border-t dark:border-dark-500 border-light-200 pt-5">
              <div className="text-xs dark:text-dark-100 text-dark-400 mb-2.5">Or enter backup code manually:</div>
              <div className="flex gap-2">
                <input
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleVerify()}
                  placeholder="Enter 6-digit code or Booking ID"
                  className="input-base flex-1 font-mono text-center text-sm h-12"
                />
                <Button size="md" onClick={() => handleVerify()} className="h-12 px-5">Verify</Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Result + recent */}
        <div className="space-y-4">
          {/* Result card */}
          {result?.ok && result.booking && (
            <div className="dark:bg-dark-600 bg-white dark:border-green/35 border-green/35 border rounded-2xl p-5 animate-fade-up">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-green/10 border border-green/20 flex items-center justify-center font-bold text-green text-xl flex-shrink-0">
                  {result.booking.guest.split(' ').map(w=>w[0]).join('').slice(0,2)}
                </div>
                <div>
                  <div className="font-display text-lg font-bold text-green">✓ ADMIT</div>
                  <div className="text-sm dark:text-dark-100 text-dark-400">{result.booking.guest}</div>
                </div>
                <StatusPill status="Checked In" />
              </div>
              <div className="dark:bg-dark-700 bg-light-50 dark:border-dark-500 border-light-200 border rounded-xl p-4">
                <InfoRow label="Venue"   value={result.booking.venue}  />
                <InfoRow label="Type"    value={result.booking.type}   />
                <InfoRow label="Guests"  value={result.booking.guests} />
                <InfoRow label="Payment" value="PAID ✓" valueClassName="text-green" />
                <InfoRow label="Booking" value={<span className="font-mono text-xs">{result.booking.id}</span>} />
              </div>
            </div>
          )}

          {result && !result.ok && (
            <div className="dark:bg-dark-600 bg-white dark:border-danger/35 border-danger/35 border rounded-2xl p-5 animate-fade-up">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-danger/10 border border-danger/20 flex items-center justify-center text-danger text-xl flex-shrink-0">✕</div>
                <div>
                  <div className="font-display text-lg font-bold text-danger">INVALID — DENY ENTRY</div>
                  <div className="text-sm dark:text-dark-100 text-dark-400">Booking not found or already used</div>
                </div>
              </div>
            </div>
          )}

          {/* Recent scans */}
          <Card title="Recent Scans" subtitle="Guests processed tonight" noPad>
            <div className="divide-y dark:divide-dark-400 divide-light-200">
              {recentList.map((s, i) => (
                <div key={i} className="flex items-center justify-between px-5 py-3">
                  <div className="flex items-center gap-3">
                    <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${s.ok ? 'bg-green' : 'bg-danger'}`} />
                    <div>
                      <div className="text-sm font-semibold">{s.name}</div>
                      <div className="text-[11px] dark:text-dark-100 text-dark-400">{s.time}</div>
                    </div>
                  </div>
                  <StatusPill status={s.ok ? 'Checked In' : 'Failed'} />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

