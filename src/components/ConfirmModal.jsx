import React from 'react';
import { AlertCircle, X } from 'lucide-react';

export default function ConfirmModal({ isOpen, title, message, confirmText = 'Confirm', onConfirm, onCancel, isDanger = false }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-md animate-fade-in">
      <div className="bg-[#f4efe8] rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 animate-slide-up text-stone-900">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isDanger ? 'bg-rose-50 text-rose-600 border border-rose-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
              <AlertCircle className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-stone-900">{title}</h3>
          </div>
          <button onClick={onCancel} className="text-stone-400 hover:text-stone-700 p-1 rounded-lg hover:bg-stone-100 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-stone-600 leading-relaxed mb-6">
          {message}
        </p>

        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2.5 rounded-full border border-stone-200 text-stone-700 hover:bg-stone-100 text-xs font-semibold transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`px-5 py-2.5 rounded-full text-xs font-bold text-white shadow-md transition ${isDanger ? 'bg-rose-600 hover:bg-rose-700' : 'bg-[#201f1e] hover:bg-stone-800'}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
