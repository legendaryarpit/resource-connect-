import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message, type = 'success', duration = 4000) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[80] flex flex-col gap-2.5 pointer-events-none max-w-md w-full px-4">
        {toasts.map((toast) => {
          let border = 'border-stone-200';
          let Icon = Info;
          let iconColor = 'text-stone-700';
          let iconBg = 'bg-stone-100';

          if (toast.type === 'success') {
            border = 'border-emerald-200';
            Icon = CheckCircle2;
            iconColor = 'text-emerald-700';
            iconBg = 'bg-emerald-50';
          } else if (toast.type === 'error') {
            border = 'border-rose-200';
            Icon = AlertCircle;
            iconColor = 'text-rose-700';
            iconBg = 'bg-rose-50';
          } else if (toast.type === 'warning') {
            border = 'border-amber-200';
            Icon = AlertTriangle;
            iconColor = 'text-amber-700';
            iconBg = 'bg-amber-50';
          }

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl shadow-[0_12px_32px_rgba(40,30,20,0.12)] bg-[#f4efe8]/95 backdrop-blur-xl border ${border} text-stone-900 animate-slide-up transition-all duration-300`}
            >
              <div className={`w-8 h-8 rounded-xl ${iconBg} ${iconColor} flex items-center justify-center shrink-0 mt-0.5`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 text-xs font-semibold leading-relaxed pt-1 text-stone-800">{toast.message}</div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-stone-400 hover:text-stone-800 p-1 rounded-lg hover:bg-stone-100 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
}
