// ─────────────────────────────────────────────────────────────────────────────
//  Vendor QR Scanner  —  mock scan simulation + manual code entry
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from 'react';
import {
  StatCard, Card, PageHeader, Button, StatusPill, InfoRow, Icon,
} from '../../components/ui/index.js';
import { useToast }     from '../../hooks/useToast.js';
import { ToastContainer } from '../../components/ui/Toast.jsx';
import { BOOKINGS }     from '../../data/mockData.js';
import { fmt }          from '../../utils/helpers.js';

// demo: short code → booking
const CODE_MAP = { '847291': 0, '392847': 1, '918273': 2 };

export default function Scanner() {
  const { toasts, show, dismiss } = useToast();
  const [scanning,   setScanning]   = useState(false);
  const [code,       setCode]       = useState('');
  const [result,     setResult]     = useState(null); // null | { ok, booking? }
  const [scanned,    setScanned]    = useState(23);
  const [recentList, setRecentList] = useState([
    { name:'Rahul Sharma',  time:'9:04 PM',  ok:true  },
    { name:'Rohan Mehra',   time:'9:12 PM',  ok:true  },
    { name:'Unknown Code',  time:'9:21 PM',  ok:false },
    { name:'Vikram Singh',  time:'10:02 PM', ok:true  },
  ]);

  const pushRecent = (name, ok) => {
    const time = new Date().toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit' });
    setRecentList(r => [{ name, time, ok }, ...r.slice(0, 7)]);
  };

  /* ── Camera scan simulation ── */
  const doScan = () => {
    if (scanning) return;
    setScanning(true); setResult(null);
    setTimeout(() => {
      const booking = BOOKINGS[Math.floor(Math.random() * 3)];
      setResult({ ok: true, booking });
      setScanned(c => c + 1);
      pushRecent(booking.guest, true);
      show(`✓ ${booking.guest} — check-in successful!`);
      setScanning(false);
    }, 2000);
  };

  /* ── Manual code verify ── */
  const verify = () => {
    const t = code.trim();
    setCode('');
    if (t === 'INVALID' || (!CODE_MAP[t] && CODE_MAP[t] !== 0 && t !== '')) {
      setResult({ ok: false });
      pushRecent('Unknown Code', false);
      show('Invalid code — booking not found.', 'error');
    } else {
      const idx = CODE_MAP[t] ?? 1;
      const booking = BOOKINGS[idx];
      setResult({ ok: true, booking });
      setScanned(c => c + 1);
      pushRecent(booking.guest, true);
      show(`✓ ${booking.guest} — verified!`);
    }
  };

  const reset = () => { setResult(null); setCode(''); };

  return (
    <div className="p-6 space-y-6 animate-fade-up">
      <ToastContainer toasts={toasts} dismiss={dismiss} />

      <PageHeader title="QR Scanner" subtitle="Scan guest tickets at the door — bouncer mode" />

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard icon="qr"      label="Scanned Tonight" value={scanned}        accent="green"  />
        <StatCard icon="users"   label="Total Expected"  value={47}             accent="purple" />
        <StatCard icon="⏳"       label="Remaining"       value={47 - scanned}   accent="gold"   />
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
                <div className="absolute bottom-4 text-xs text-green font-semibold animate-pulse">Scanning…</div>
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

            {/* Main button */}
            <Button
              size="lg"
              fullWidth
              variant={result ? 'ghost-dark' : 'primary'}
              loading={scanning}
              onClick={result ? reset : doScan}
            >
              {scanning ? 'Scanning…' : result ? 'Scan Next Guest →' : (
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
                  onKeyDown={e => e.key === 'Enter' && verify()}
                  placeholder="6-digit code"
                  maxLength={6}
                  className="input-base flex-1 font-mono tracking-[4px] text-center text-lg h-12"
                />
                <Button size="md" onClick={verify} className="h-12 px-5">Verify</Button>
              </div>
              <div className="text-[10px] dark:text-dark-100 text-dark-400 mt-1.5">
                Demo codes: <span className="font-mono">847291</span> · <span className="font-mono">392847</span> · <span className="font-mono">918273</span>
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
          <Card title="Recent Scans" subtitle={`${scanned} guests processed tonight`} noPad>
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
                  <StatusPill status={s.ok ? 'Checked In' : 'Cancelled'} />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
