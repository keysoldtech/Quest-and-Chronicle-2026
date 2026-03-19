import { useState, useEffect, useCallback } from 'react';

export type ToastType = 'info' | 'success' | 'error' | 'warning';

interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
  duration: number;
}

let nextId = 0;
let addToastFn: ((msg: string, type?: ToastType, duration?: number) => void) | null = null;

/** Show a toast from anywhere in the app */
export function showToast(message: string, type: ToastType = 'info', duration = 3000) {
  addToastFn?.(message, type, duration);
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback((message: string, type: ToastType = 'info', duration = 3000) => {
    const id = nextId++;
    setToasts(prev => [...prev, { id, message, type, duration }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  }, []);

  useEffect(() => {
    addToastFn = addToast;
    return () => { addToastFn = null; };
  }, [addToast]);

  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`toast toast-${t.type}`}>
          <span className="toast-icon">{toastIcon(t.type)}</span>
          <span className="toast-message">{t.message}</span>
        </div>
      ))}
    </div>
  );
}

function toastIcon(type: ToastType): string {
  switch (type) {
    case 'success': return '✓';
    case 'error': return '✗';
    case 'warning': return '⚠';
    default: return 'ℹ';
  }
}
