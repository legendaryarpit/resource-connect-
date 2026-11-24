import React, { useState, useEffect } from 'react';
import ImpactCharts from '../components/ImpactCharts';
import StatCard from '../components/StatCard';
import { getImpactStats, getDonations } from '../utils/storage';
import { Utensils, Pill, Users, Recycle, Award, Sparkles, Heart } from 'lucide-react';

export default function CommunityImpact() {
  const [stats, setStats] = useState(null);
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    setStats(getImpactStats());
    setDonations(getDonations());
  }, []);

  return (
    <div className="space-y-10 pb-16 page-fade-in text-stone-900">
      
      {/* Full-width Header Banner (Warm Stone Aesthetic) */}
      <section className="bg-[#f4efe8] border-b border-[#dfd7cc] py-12 px-4 sm:px-6 lg:px-8 shadow-xs">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Civic Environmental & Community Metrics</span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-6xl font-normal tracking-tight leading-tight text-stone-900">
            Community Impact Dashboard
          </h1>

          <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-3xl">
            Real-time analytics showcasing how neighborhood food rescue and medicine redistribution prevent municipal landfill waste while sustaining local human shelters.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* TOP OVERVIEW IMPACT STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Meals Rescued 🍱"
            value={`${stats?.dynamicMeals || 1240}+`}
            icon={Utensils}
            color="amber"
            description="Nutritious meals redirected"
            trendText="+24% this month"
          />
          <StatCard
            title="Medicine Redirected 💊"
            value={`${stats?.dynamicMedicineUnits || 680}+`}
            icon={Pill}
            color="blue"
            description="Eligible doses provided"
            trendText="+18% this month"
          />
          <StatCard
            title="People Helped 🤝"
            value="1,850+"
            icon={Users}
            color="emerald"
            description="Community beneficiaries"
            trendText="Active coverage"
          />
          <StatCard
            title="Waste Diverted ♻️"
            value="920 kg"
            icon={Recycle}
            color="indigo"
            description="Diverted from city landfills"
            trendText="Zero-Waste Goal"
          />
        </div>

        {/* DETAILED CHARTS & LEADERBOARD COMPONENT */}
        <ImpactCharts donations={donations} />
      </div>
    </div>
  );
}
