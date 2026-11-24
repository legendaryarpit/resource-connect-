import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Utensils, 
  Pill, 
  Leaf, 
  Users, 
  Award, 
  Building2, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import StatCounter from '../components/StatCounter';
import { getCommunityStats, getDonations } from '../utils/storage';

export default function CommunityStats() {
  const [stats, setStats] = useState(getCommunityStats());
  const [donations, setDonations] = useState(getDonations());

  useEffect(() => {
    const handleUpdate = () => {
      setStats(getCommunityStats());
      setDonations(getDonations());
    };
    window.addEventListener('rc_storage_changed', handleUpdate);
    return () => window.removeEventListener('rc_storage_changed', handleUpdate);
  }, []);

  const totalMeals = stats.mealsRescued || 1248;
  const totalMeds = stats.medicineUnitsRedirected || 410;
  const co2Kg = stats.co2EmissionsSavedKg || 3450;
  const orgsCount = stats.partnerOrganizations || 86;

  // Monthly data calculation
  const months = stats.monthlyData || [];
  const maxMonthly = Math.max(...months.map(m => m.meals + m.medicines), 800);

  // Category proportions
  const foodCount = donations.filter(d => d.category === 'food').length || 6;
  const medCount = donations.filter(d => d.category === 'medicine').length || 4;
  const totalCount = foodCount + medCount;
  const foodPercent = Math.round((foodCount / totalCount) * 100);
  const medPercent = 100 - foodPercent;

  return (
    <div className="min-h-screen bg-slate-950 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-300 text-xs font-bold shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Real-time Civic Impact Ledger</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Community Impact Analytics
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          Measuring the tangible social, nutritional, and environmental ripple effect of our shared resource redistribution network.
        </p>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-amber-500/10 via-white to-white rounded-3xl p-6 border border-amber-500/30/80 shadow-sm relative overflow-hidden group">
          <div className="w-12 h-12 rounded-2xl bg-amber-950/400 text-white flex items-center justify-center shadow-lg shadow-amber-500/30 mb-4">
            <Utensils className="w-6 h-6" />
          </div>
          <div className="text-3xl font-black text-white tracking-tight">
            <StatCounter end={totalMeals} suffix="+" />
          </div>
          <div className="text-sm font-bold text-slate-300 mt-1">Meals Rescued 🍱</div>
          <p className="text-xs text-slate-500 mt-1">Prevented from commercial disposal</p>
        </div>

        <div className="bg-gradient-to-br from-sky-500/10 via-white to-white rounded-3xl p-6 border border-sky-500/30/80 shadow-sm relative overflow-hidden group">
          <div className="w-12 h-12 rounded-2xl bg-sky-600 text-white flex items-center justify-center shadow-lg shadow-sky-600/30 mb-4">
            <Pill className="w-6 h-6" />
          </div>
          <div className="text-3xl font-black text-white tracking-tight">
            <StatCounter end={totalMeds} suffix="+" />
          </div>
          <div className="text-sm font-bold text-slate-300 mt-1">Medicine Units Redirected 💊</div>
          <p className="text-xs text-slate-500 mt-1">Dispensed to low-income patients</p>
        </div>

        <div className="bg-gradient-to-br from-emerald-500/10 via-white to-white rounded-3xl p-6 border border-emerald-500/30/80 shadow-sm relative overflow-hidden group">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30 mb-4">
            <Leaf className="w-6 h-6" />
          </div>
          <div className="text-3xl font-black text-white tracking-tight">
            <StatCounter end={co2Kg} suffix=" kg" />
          </div>
          <div className="text-sm font-bold text-slate-300 mt-1">CO₂ Waste Prevented ♻️</div>
          <p className="text-xs text-slate-500 mt-1">Estimated greenhouse mitigation</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 via-white to-white rounded-3xl p-6 border border-purple-200/80 shadow-sm relative overflow-hidden group">
          <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-lg shadow-purple-600/30 mb-4">
            <Users className="w-6 h-6" />
          </div>
          <div className="text-3xl font-black text-white tracking-tight">
            <StatCounter end={orgsCount} suffix=" Hubs" />
          </div>
          <div className="text-sm font-bold text-slate-300 mt-1">Verified Organizations 🤝</div>
          <p className="text-xs text-slate-500 mt-1">Active shelters & non-profits</p>
        </div>
      </div>

      {/* Visual Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 7 Columns: Monthly Growth Bar Chart */}
        <div className="lg:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">Donations Trend by Month</h3>
              <p className="text-xs text-slate-500">Monthly breakdown of food servings vs pharmaceutical units</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-amber-950/400" />
                <span>Food (Meals)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-sky-950/400" />
                <span>Medicine</span>
              </span>
            </div>
          </div>

          {/* Bar Chart Visual */}
          <div className="h-64 flex items-end justify-between gap-4 pt-8 pb-2 px-2 border-b border-slate-800/80">
            {months.map((m) => {
              const foodHeight = Math.max(16, Math.round((m.meals / maxMonthly) * 100));
              const medHeight = Math.max(10, Math.round((m.medicines / maxMonthly) * 100));

              return (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-1 group">
                  <div className="text-[10px] font-bold text-slate-400 group-hover:text-white transition">
                    {m.meals + m.medicines}
                  </div>
                  <div className="w-full max-w-[36px] flex flex-col items-stretch gap-1">
                    {/* Food bar */}
                    <div
                      style={{ height: `${foodHeight}%` }}
                      className="w-full bg-gradient-to-t from-amber-600 to-amber-400 rounded-t-md transition-all duration-500 group-hover:brightness-110"
                      title={`${m.meals} food meals in ${m.month}`}
                    />
                    {/* Medicine bar */}
                    <div
                      style={{ height: `${medHeight}%` }}
                      className="w-full bg-gradient-to-t from-sky-600 to-sky-400 rounded-b-md transition-all duration-500 group-hover:brightness-110"
                      title={`${m.medicines} medicine units in ${m.month}`}
                    />
                  </div>
                  <div className="text-xs font-semibold text-slate-400 mt-2">{m.month}</div>
                </div>
              );
            })}
          </div>
          <div className="text-[11px] text-slate-400 text-center">
            Consistent 35% compound monthly growth in community donor participation.
          </div>
        </div>

        {/* Right 5 Columns: Resource Distribution Donut & Stats */}
        <div className="lg:col-span-5 bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-sm space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white">Category Distribution</h3>
            <p className="text-xs text-slate-500">Live ratio of active resource categories</p>
          </div>

          {/* Clean Segmented Progress Bar */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-amber-700">Food Rescue ({foodPercent}%)</span>
              <span className="text-sky-700">Medicine ({medPercent}%)</span>
            </div>
            <div className="w-full h-4 rounded-full bg-slate-800 flex overflow-hidden p-0.5 border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-l-full transition-all duration-700"
                style={{ width: `${foodPercent}%` }}
              />
              <div
                className="h-full bg-gradient-to-r from-sky-500 to-indigo-600 rounded-r-full transition-all duration-700"
                style={{ width: `${medPercent}%` }}
              />
            </div>
          </div>

          {/* Breakdown Pills */}
          <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
            <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/20 space-y-1">
              <div className="font-bold text-amber-200">Food Categories</div>
              <div className="text-slate-400">Bakery (35%)</div>
              <div className="text-slate-400">Prepared Meals (45%)</div>
              <div className="text-slate-400">Fresh Produce (20%)</div>
            </div>
            <div className="p-3 rounded-xl bg-sky-950/40 border border-sky-500/20 space-y-1">
              <div className="font-bold text-sky-200">Medicine Types</div>
              <div className="text-slate-400">Tablets & Blisters (50%)</div>
              <div className="text-slate-400">Syrups & Suspensions (30%)</div>
              <div className="text-slate-400">First-Aid Dressing (20%)</div>
            </div>
          </div>

          {/* Environmental Carbon Impact Note */}
          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-950 space-y-1">
            <div className="font-bold text-emerald-200 flex items-center gap-1.5">
              <Leaf className="w-4 h-4 text-emerald-400" />
              <span>Zero-Landfill Civic Equivalent</span>
            </div>
            <p className="leading-relaxed text-emerald-300">
              Every 100 kg of food rescued avoids approximately 250 kg of methane & CO₂ equivalents produced by decomposition in landfills.
            </p>
          </div>
        </div>
      </div>

      {/* Top Contributing Organizations Leaderboard */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white">Top Community Contributors</h3>
            <p className="text-xs text-slate-500">Leading food suppliers, pharmacies, and non-profit redistribution partners</p>
          </div>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-500/30">
            Gold Tier Civic Partners
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {(stats.topContributors || []).map((c, idx) => (
            <div
              key={c.name}
              className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-300 text-xs font-bold flex items-center justify-center">
                    #{idx + 1}
                  </span>
                  <span className="text-xs font-bold text-emerald-400">{c.score}% Reliability</span>
                </div>
                <h4 className="font-bold text-white text-sm leading-snug">{c.name}</h4>
                <div className="text-xs text-slate-500 mt-0.5">{c.type}</div>
              </div>
              <div className="pt-2 border-t border-slate-800/60 text-xs font-bold text-slate-300">
                {c.rescued}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
