import React from 'react';
import { Utensils, Pill, MapPin, Clock, Flame, ShieldCheck, Sparkles } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { getUrgencyBadge } from '../utils/helpers';

export default function LivePreviewCard({ form, category = 'food', donorName = 'You' }) {
  const isFood = category === 'food';
  const urgencyMeta = getUrgencyBadge(form.urgency || 'medium');

  const defaultImage = isFood
    ? 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800'
    : 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800';

  return (
    <div className="sticky top-24">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Real-time Card Preview</span>
        </div>
        <span className="text-[11px] text-stone-600 bg-[#f4efe8]/90 border border-stone-200 px-3 py-1 rounded-full shadow-2xs font-medium">
          Live Marketplace Card
        </span>
      </div>

      <div className="rounded-3xl overflow-hidden border border-stone-200/90 shadow-[0_12px_32px_rgba(40,30,20,0.06)] bg-[#f4efe8] transition-all">
        {/* Card Image */}
        <div className="relative h-48 w-full overflow-hidden bg-stone-100">
          <img
            src={form.image || defaultImage}
            alt="Preview"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold shadow-xs border ${isFood ? 'bg-amber-500 text-stone-950 border-amber-400/50' : 'bg-sky-600 text-white border-sky-400/50'}`}>
              {isFood ? <Utensils className="w-3.5 h-3.5" /> : <Pill className="w-3.5 h-3.5" />}
              <span>{isFood ? 'Food Rescue' : 'Medicine'}</span>
            </span>
            <span className="bg-emerald-600 text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-xs border border-emerald-400/40">
              <ShieldCheck className="w-3 h-3" />
              Ready
            </span>
          </div>

          <div className="absolute top-3 right-3">
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold shadow-xs backdrop-blur-md ${urgencyMeta.badge || 'bg-[#f4efe8]/90 text-stone-800'}`}>
              {form.urgency === 'high' ? <Flame className="w-3 h-3 text-red-500" /> : <Clock className="w-3 h-3" />}
              <span>{urgencyMeta.text}</span>
            </span>
          </div>

          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 font-medium">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Available Until: {form.availableUntil ? new Date(form.availableUntil).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Tonight 10 PM'}</span>
            </div>
            <StatusBadge status="available" />
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-bold text-stone-900 text-lg leading-snug truncate">
            {form.title || (isFood ? 'Listing Title (e.g. 25 Meal Boxes)' : 'Medicine Name (e.g. Amoxicillin)')}
          </h3>

          <div className="mt-2.5 flex items-center gap-2">
            <span className="font-semibold text-xs px-2.5 py-1 rounded-lg bg-stone-100 text-stone-700 border border-stone-200">
              📦 {form.quantity || 'Quantity specified'}
            </span>
            {(form.foodType || form.medicineType) && (
              <span className="text-xs font-semibold text-emerald-700">
                • {form.foodType || form.medicineType}
              </span>
            )}
          </div>

          <p className="mt-3 text-xs text-stone-600 line-clamp-2 leading-relaxed">
            {form.description || 'Description of the resource, packaging details, and handover instructions will appear here.'}
          </p>

          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
            <div className="flex items-center gap-1.5 truncate max-w-[180px]">
              <MapPin className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
              <span className="truncate">{form.location || 'Your pickup location'}</span>
            </div>
            <span className="font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full text-[11px] border border-emerald-200">
              📍 1.2 km away
            </span>
          </div>

          <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600">
            <span className="font-medium text-stone-700">Donor: {donorName}</span>
            <span className="text-emerald-700 font-bold">Ready to list</span>
          </div>
        </div>
      </div>
    </div>
  );
}
