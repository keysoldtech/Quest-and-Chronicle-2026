export type ToastType = 'info' | 'success' | 'error' | 'warning';

let addToastFn: ((msg: string, type?: ToastType, duration?: number) => void) | null = null;

export function setToastHandler(fn: typeof addToastFn) {
  addToastFn = fn;
}

/** Show a toast from anywhere (e.g. Zustand store) — wired by ToastContainer */
export function showToast(message: string, type: ToastType = 'info', duration = 3000) {
  addToastFn?.(message, type, duration);
}
