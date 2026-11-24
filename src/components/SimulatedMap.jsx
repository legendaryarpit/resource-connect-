import React, { useState } from 'react';
import { MapPin, Navigation, Compass, ShieldCheck, Truck, Layers, Radio, Activity } from 'lucide-react';

export default function SimulatedMap({ location = "City Center", distanceKm = 2.4, donor = "Green Leaf Bakery" }) {
  const [viewMode, setViewMode] = useState('radar'); // 'radar' or 'route'
  const travelTimeMinutes = Math.max(4, Math.round(distanceKm * 2.8));

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#dfd7cc] bg-[#f7f3ec] text-stone-900 shadow-sm p-5 h-72 flex flex-col justify-between group select-none">
      {/* Background Vector Map Grid & Roads */}
      <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="radar-grid" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M 28 0 L 0 0 0 28" fill="none" stroke="#b8b0a2" strokeWidth="0.75" strokeDasharray="1 3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#radar-grid)" />
        {/* Curved simulated transit route line */}
        <path d="M 40 180 Q 140 60 260 140 T 480 80" fill="none" stroke="#059669" strokeWidth="3" strokeDasharray="6 4" className="animate-pulse" />
      </svg>

      {/* Sweeping Radar Center Ring & Rotating Beam */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-56 h-56 flex items-center justify-center">
        {/* Concentric distance range rings */}
        <div className="w-56 h-56 rounded-full border border-emerald-600/15 absolute" />
        <div className="w-40 h-40 rounded-full border border-emerald-600/20 absolute" />
        <div className="w-24 h-24 rounded-full border border-teal-600/25 absolute" />

        {/* Rotating Radar Sweep Cone */}
        <div
          className="absolute w-56 h-56 rounded-full animate-radar-sweep pointer-events-none"
          style={{
            background: 'conic-gradient(from 0deg, rgba(5, 150, 105, 0.25) 0deg, rgba(5, 150, 105, 0.04) 60deg, transparent 75deg)'
          }}
        />

        {/* Center Origin Node */}
        <div className="w-4 h-4 rounded-full bg-emerald-600 ring-4 ring-emerald-500/30 relative z-10 shadow-md shadow-emerald-600/30" />
      </div>

      {/* Floating Simulated Blips on the Radar */}
      {/* Donor Blip */}
      <div className="absolute top-16 left-20 z-10 flex items-center gap-1.5 animate-bounce-subtle">
        <div className="w-3.5 h-3.5 rounded-full bg-amber-500 ring-4 ring-amber-400/30 animate-pulse" />
        <span className="text-[10px] font-bold bg-[#f4efe8]/95 text-amber-900 px-2 py-0.5 rounded-full border border-amber-300 shadow-xs backdrop-blur-md">
          Donor Hub
        </span>
      </div>

      {/* NGO En Route Van Blip */}
      <div className="absolute bottom-20 right-28 z-10 flex items-center gap-1.5">
        <div className="w-3.5 h-3.5 rounded-full bg-sky-500 ring-4 ring-sky-400/30 animate-ping" />
        <span className="text-[10px] font-bold bg-[#f4efe8]/95 text-sky-900 px-2 py-0.5 rounded-full border border-sky-300 shadow-xs backdrop-blur-md flex items-center gap-1">
          <Truck className="w-3 h-3 text-sky-600" />
          <span>Shelter Van (ETA {travelTimeMinutes}m)</span>
        </span>
      </div>

      {/* Top Telemetry Header */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#f4efe8]/90 border border-stone-200 text-xs backdrop-blur-md shadow-2xs">
          <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
          <span className="font-bold text-stone-800 tracking-wide uppercase text-[11px]">Civic Radar</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
          <span className="text-stone-500 text-[10px]">99.8% Sync</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            <span>Zone Verified</span>
          </span>
        </div>
      </div>

      {/* Bottom Route & Destination Telemetry Bar */}
      <div className="relative z-10 flex items-center justify-between mt-auto bg-[#f4efe8]/95 backdrop-blur-xl p-3.5 rounded-2xl border border-stone-200 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#201f1e] text-white flex items-center justify-center shadow-xs flex-shrink-0">
            <MapPin className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="text-xs font-bold text-stone-900 truncate max-w-[200px]">{location}</div>
            <div className="text-[11px] text-stone-500">Donor: <span className="text-stone-700 font-medium">{donor}</span></div>
          </div>
        </div>

        <div className="text-right pl-3 border-l border-stone-200">
          <div className="text-xs font-black text-emerald-700 flex items-center gap-1 justify-end font-mono">
            <Navigation className="w-3.5 h-3.5" />
            <span>{distanceKm} KM</span>
          </div>
          <div className="text-[10px] text-stone-500 flex items-center gap-1 justify-end">
            <Activity className="w-3 h-3 text-teal-600" />
            <span>~{travelTimeMinutes} min transit</span>
          </div>
        </div>
      </div>
    </div>
  );
}
