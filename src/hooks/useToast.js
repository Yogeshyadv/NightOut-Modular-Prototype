import { useState, useCallback } from 'react';

/**
 * useToast — lightweight in-app notification system
 *
 * Usage:
 *   const { toasts, show, dismiss } = useToast();
 *   show('Saved!');                  // success (default)
 *   show('Oops', 'error');
 *   show('Watch out', 'warning');
 *   show('FYI', 'info');
 *   <ToastContainer toasts={toasts} dismiss={dismiss} />
 */
export function useToast() {
  const [toasts, setToasts] = useState([]);

  const show = useCallback((message, type = 'success', duration = 3500) => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), duration);
    return id;
  }, []);

  const dismiss = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const dismissAll = useCallback(() => setToasts([]), []);

  return { toasts, show, dismiss, dismissAll };
}
