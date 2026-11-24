import React from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle, Info } from 'lucide-react';

export default function SafetyNotice({ compact = false }) {
  if (compact) {
    return (
      <div className="bg-sky-50/80 border border-sky-200 text-sky-900 rounded-2xl p-3.5 text-xs flex items-start gap-2.5 shadow-2xs">
        <Info className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="font-semibold text-sky-950">Safety Notice:</strong> Medicine donations are subject to eligibility, expiry, and organizational verification. RescueConnect does not facilitate unsafe or unauthorized medicine transfers.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#f4efe8] rounded-3xl p-6 shadow-[0_8px_24px_rgba(40,30,20,0.04)] border border-stone-200/90 text-stone-900 space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700 shrink-0">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-base font-bold text-stone-900">
            Medicine Redistribution & Verification Safety Protocol
          </h4>
          <p className="text-xs text-stone-500">
            Strict civic compliance & community health standards
          </p>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-stone-700 leading-relaxed bg-[#f8f5f0] p-4 rounded-2xl border border-stone-200/80">
        "Only unused, unexpired, and legally eligible medicines should be submitted. Prescription and controlled medicines must not be transferred directly between individuals. Donations are intended for review and handling by verified organizations."
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-stone-600 pt-1">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Must be factory sealed & un-tampered</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Minimum 30-day shelf life remaining</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Reviewed by verified medical NGOs</span>
        </div>
      </div>
    </div>
  );
}
