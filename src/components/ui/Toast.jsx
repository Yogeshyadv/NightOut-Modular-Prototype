// ─────────────────────────────────────────────────────────────────────────────
//  Toast.jsx  — ToastContainer (works with useToast hook from Part 1)
// ─────────────────────────────────────────────────────────────────────────────
import { cn } from '../../utils/helpers.js';
import Icon from './Icon.jsx';

const TOAST_CFG = {
  success: {
    border:    'border-green/35',
    shadow:    '0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(0,200,83,0.15)',
    icon:      'check-circle',
    iconColor: 'text-green',
  },
  error: {
    border:    'border-danger/35',
    shadow:    '0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(255,82,82,0.15)',
    icon:      'x-circle',
    iconColor: 'text-danger',
  },
  warning: {
    border:    'border-warn/35',
    shadow:    '0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(255,109,0,0.15)',
    icon:      'alert',
    iconColor: 'text-warn',
  },
  info: {
    border:    'border-info/35',
    shadow:    '0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(0,229,255,0.15)',
    icon:      'info',
    iconColor: 'text-info',
  },
};

export function ToastContainer({ toasts = [], dismiss }) {
  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[300] flex flex-col gap-3 pointer-events-none">
      {toasts.map(t => {
        const cfg = TOAST_CFG[t.type] ?? TOAST_CFG.success;
        return (
          <div
            key={t.id}
            style={{ boxShadow: cfg.shadow }}
            className={cn(
              'flex items-center gap-3 px-4 py-3.5',
              'dark:bg-dark-600 bg-white',
              'border rounded-xl',
              cfg.border,
              'animate-fade-up',
              'min-w-[260px] max-w-sm',
              'pointer-events-auto',
            )}
          >
            <Icon name={cfg.icon} size={16} className={cn('flex-shrink-0', cfg.iconColor)} />
            <span className="text-sm font-medium flex-1 leading-snug">{t.message}</span>
            {dismiss && (
              <button
                onClick={() => dismiss(t.id)}
                className="dark:text-dark-100 text-dark-400 hover:text-danger transition-colors flex-shrink-0 ml-1"
              >
                <Icon name="x" size={12} />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
