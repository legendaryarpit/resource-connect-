import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  trendText,
  color = 'emerald',
  description
}) {
  const colorStyles = {
    emerald: {
      bg: 'bg-[#f4efe8] hover:border-emerald-300',
      iconBg: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
      border: 'border-stone-200/90',
      text: 'text-stone-900'
    },
    amber: {
      bg: 'bg-[#f4efe8] hover:border-amber-300',
      iconBg: 'bg-amber-50 text-amber-700 border border-amber-200',
      border: 'border-stone-200/90',
      text: 'text-stone-900'
    },
    blue: {
      bg: 'bg-[#f4efe8] hover:border-sky-300',
      iconBg: 'bg-sky-50 text-sky-700 border border-sky-200',
      border: 'border-stone-200/90',
      text: 'text-stone-900'
    },
    indigo: {
      bg: 'bg-[#f4efe8] hover:border-indigo-300',
      iconBg: 'bg-indigo-50 text-indigo-700 border border-indigo-200',
      border: 'border-stone-200/90',
      text: 'text-stone-900'
    },
    rose: {
      bg: 'bg-[#f4efe8] hover:border-rose-300',
      iconBg: 'bg-rose-50 text-rose-700 border border-rose-200',
      border: 'border-stone-200/90',
      text: 'text-stone-900'
    }
  };

  const style = colorStyles[color] || colorStyles.emerald;

  return (
    <div
      className={`p-6 rounded-3xl border ${style.border} ${style.bg} transition-all duration-200 shadow-[0_8px_24px_rgba(40,30,20,0.04)] hover:shadow-[0_12px_28px_rgba(40,30,20,0.07)] flex flex-col justify-between text-stone-900`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-stone-500">{title}</p>
          <h3 className={`text-3xl font-black mt-1.5 tracking-tight ${style.text}`}>
            {value}
          </h3>
        </div>
        {Icon && (
          <div className={`p-3 rounded-2xl ${style.iconBg} shadow-xs shrink-0`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>

      {(trendText || description) && (
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
          {description && <span>{description}</span>}
          {trendText && (
            <span className="inline-flex items-center gap-1 font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              <TrendingUp className="w-3 h-3 text-emerald-600" />
              {trendText}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
