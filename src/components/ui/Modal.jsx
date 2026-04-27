// ─────────────────────────────────────────────────────────────────────────────
//  Modal.jsx  — Modal, ConfirmModal, Drawer
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect } from 'react';
import { cn } from '../../utils/helpers.js';
import Icon from './Icon.jsx';
import Button from './Button.jsx';

/* ── lock body scroll when modal is open ─────────────────────────────────── */
function useLockScroll(active) {
  useEffect(() => {
    if (active) document.body.style.overflow = 'hidden';
    else        document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [active]);
}

/* ── Modal ───────────────────────────────────────────────────────────────── */
const SIZE_CLS = {
  xs:   'max-w-xs',
  sm:   'max-w-md',
  md:   'max-w-xl',
  lg:   'max-w-2xl',
  xl:   'max-w-4xl',
  full: 'max-w-5xl',
};

export function Modal({
  open,
  onClose,
  title,
  subtitle,
  children,
  footer,
  size      = 'md',
  closeOnBackdrop = true,
  className = '',
}) {
  useLockScroll(open);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/65 backdrop-blur-sm animate-fade-in"
        onClick={closeOnBackdrop ? onClose : undefined}
      />

      {/* Panel */}
      <div
        className={cn(
          'relative w-full flex flex-col',
          'dark:bg-dark-700 bg-white',
          'dark:border-dark-400 border-light-200 border',
          'rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.6)]',
          'animate-fade-up',
          'max-h-[92vh]',
          SIZE_CLS[size] ?? SIZE_CLS.md,
          className,
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-5 border-b dark:border-dark-400 border-light-200 flex-shrink-0">
          <div>
            {title    && <div className="font-display text-lg font-bold">{title}</div>}
            {subtitle && <div className="text-xs dark:text-dark-100 text-dark-400 mt-1">{subtitle}</div>}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl dark:bg-dark-500 bg-light-100 flex items-center justify-center dark:text-dark-100 text-dark-400 hover:text-white hover:dark:bg-dark-400 transition-all ml-4 flex-shrink-0"
          >
            <Icon name="x" size={14} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 border-t dark:border-dark-400 border-light-200 flex items-center justify-end gap-3 flex-shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Confirm Dialog ──────────────────────────────────────────────────────── */
export function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title       = 'Are you sure?',
  message,
  confirmLabel = 'Confirm',
  cancelLabel  = 'Cancel',
  danger       = false,
  loading      = false,
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <>
          <Button variant="ghost-dark" size="md" onClick={onClose}>
            {cancelLabel}
          </Button>
          <Button
            variant={danger ? 'danger' : 'primary'}
            size="md"
            loading={loading}
            onClick={() => { onConfirm?.(); onClose(); }}
          >
            {confirmLabel}
          </Button>
        </>
      }
    >
      {message && (
        <p className="text-sm dark:text-dark-100 text-dark-400 leading-relaxed">{message}</p>
      )}
    </Modal>
  );
}

/* ── Right Drawer ────────────────────────────────────────────────────────── */
export function Drawer({
  open,
  onClose,
  title,
  subtitle,
  children,
  footer,
  width = 'w-[480px]',
}) {
  useLockScroll(open);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Panel — slides in from right */}
      <div
        className={cn(
          'relative flex flex-col h-full',
          'dark:bg-dark-700 bg-white',
          'dark:border-l dark:border-dark-400 border-l border-light-200',
          'shadow-[−24px_0_80px_rgba(0,0,0,0.5)]',
          'animate-slide-in',
          width,
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-5 border-b dark:border-dark-400 border-light-200">
          <div>
            {title    && <div className="font-display text-lg font-bold">{title}</div>}
            {subtitle && <div className="text-xs dark:text-dark-100 text-dark-400 mt-1">{subtitle}</div>}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl dark:bg-dark-500 bg-light-100 flex items-center justify-center dark:text-dark-100 text-dark-400 hover:text-white transition-all"
          >
            <Icon name="x" size={14} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 border-t dark:border-dark-400 border-light-200 flex items-center justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
