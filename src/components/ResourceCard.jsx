import React from 'react';
import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import { getUrgencyConfig, getTimeRemaining, formatDate } from '../utils/helpers';
import { MapPin, Clock, Utensils, Pill, ShieldCheck, ArrowRight, Calendar } from 'lucide-react';

export default function ResourceCard({ resource, onRequest }) {
  const isFood = resource.category === 'food';
  const urgency = getUrgencyConfig(resource.urgency);
  const timeRemaining = isFood
    ? getTimeRemaining(resource.availableUntil)
    : null;

  return (
    <div className="bg-[#f4efe8] rounded-3xl border border-stone-200/90 shadow-[0_8px_24px_rgba(40,30,20,0.04)] hover:shadow-[0_16px_36px_rgba(40,30,20,0.08)] hover:border-stone-300 transition-all duration-300 overflow-hidden flex flex-col group hover:-translate-y-1 text-stone-900">
      {/* Card Image Header */}
      <div className="relative h-48 w-full bg-stone-100 overflow-hidden">
        <img
          src={resource.image || 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=600&q=80'}
          alt={resource.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Top Left: Category Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold shadow-md backdrop-blur-md ${
              isFood
                ? 'bg-amber-100 text-amber-900 border border-amber-300/80 font-bold'
                : 'bg-sky-100 text-sky-900 border border-sky-300/80 font-bold'
            }`}
          >
            {isFood ? <Utensils className="w-3.5 h-3.5 text-amber-700" /> : <Pill className="w-3.5 h-3.5 text-sky-700" />}
            {isFood ? 'Food Rescue 🍱' : 'Medicine Donation 💊'}
          </span>
        </div>

        {/* Top Right: Urgency Tag */}
        <div className="absolute top-3 right-3">
          <span
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase shadow-sm ${urgency.class}`}
          >
            {urgency.label}
          </span>
        </div>

        {/* Bottom Left on Image: Quantity Banner */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
          <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-xl font-bold flex items-center gap-1.5 border border-white/20">
            <span className="text-stone-300">Qty:</span>
            <span className="text-emerald-300">{resource.quantity}</span>
          </div>

          <StatusBadge status={resource.status} size="sm" />
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-base font-bold text-stone-900 group-hover:text-emerald-800 transition-colors line-clamp-1">
            {resource.title}
          </h3>

          <p className="text-xs text-stone-600 line-clamp-2 mt-1.5 leading-relaxed">
            {resource.description}
          </p>
        </div>

        {/* Key Attributes Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs bg-stone-50 p-2.5 rounded-2xl border border-stone-200/80">
          <div className="flex items-center gap-1.5 text-stone-700 truncate">
            <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="truncate">{resource.distance || resource.location}</span>
          </div>

          <div className="flex items-center gap-1.5 text-stone-700 truncate">
            {isFood ? (
              <>
                <Clock className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span className={`truncate font-medium ${timeRemaining?.isUrgent ? 'text-rose-600 font-bold' : ''}`}>
                  {timeRemaining ? timeRemaining.text : 'Fresh'}
                </span>
              </>
            ) : (
              <>
                <Calendar className="w-3.5 h-3.5 text-sky-700 shrink-0" />
                <span className="truncate">
                  Exp: {formatDate(resource.expiryDate)}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Donor & Verification Info */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] flex items-center justify-center border border-emerald-200">
              {resource.donor?.name?.charAt(0) || 'D'}
            </div>
            <div>
              <p className="text-xs font-semibold text-stone-900 line-clamp-1">
                {resource.donor?.name || 'Community Donor'}
              </p>
              <p className="text-[10px] text-stone-500">
                {resource.donor?.type || 'Verified Donor'}
              </p>
            </div>
          </div>

          <ShieldCheck className="w-4 h-4 text-emerald-600" title="Verified Donor" />
        </div>

        {/* Footer Buttons */}
        <div className="flex items-center gap-2 pt-1">
          <Link
            to={`/resource/${resource.id}`}
            className="flex-1 py-2 px-3 text-center text-xs font-bold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors border border-stone-200 flex items-center justify-center gap-1"
          >
            View Details
          </Link>

          {resource.status === 'available' && onRequest && (
            <button
              onClick={() => onRequest(resource)}
              className="py-2 px-3.5 text-xs font-bold text-white bg-[#201f1e] hover:bg-[#2c2b29] rounded-xl transition-all shadow-sm flex items-center gap-1 shrink-0"
            >
              Request
              <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
