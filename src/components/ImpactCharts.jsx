import React from 'react';
import { Utensils, Pill, Award, TrendingUp, ShieldCheck } from 'lucide-react';

export default function ImpactCharts({ donations = [] }) {
  // Monthly Data Calculation
  const monthlyData = [
    { month: 'Apr', food: 45, medicine: 20 },
    { month: 'May', food: 65, medicine: 32 },
    { month: 'Jun', food: 88, medicine: 45 },
    { month: 'Jul', food: 110, medicine: 58 },
    { month: 'Aug', food: 142, medicine: 72 },
    { month: 'Sep', food: 175, medicine: 95 }
  ];

  const maxMonthValue = 200;

  // Category Ratio
  const foodCount = donations.filter(d => d.category === 'food').length || 15;
  const medCount = donations.filter(d => d.category === 'medicine').length || 10;
  const total = foodCount + medCount;
  const foodPct = Math.round((foodCount / total) * 100);
  const medPct = 100 - foodPct;

  // Top Donors List
  const topDonors = [
    { name: 'Green Leaf Restaurant', category: 'Food', count: '142 Meals', rating: 4.9 },
    { name: 'MediCare Pharma Services', category: 'Medicine', count: '85 Supplies', rating: 5.0 },
    { name: 'Sunrise Bakery Co.', category: 'Food', count: '96 Bakery items', rating: 4.8 },
    { name: 'Harbor Pediatric Clinic', category: 'Medicine', count: '64 Medicines', rating: 5.0 },
    { name: 'Valley Organic Co-op', category: 'Food', count: '210 kg Produce', rating: 4.9 }
  ];

  return (
    <div className="space-y-8 text-stone-900">
      {/* 2 Grid Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart 1: Monthly Trend SVG Bar Chart (2 Cols) */}
        <div className="lg:col-span-2 bg-[#f4efe8] rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-[0_8px_24px_rgba(40,30,20,0.04)] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-stone-900">Donation Growth & Trends</h3>
              <p className="text-xs text-stone-500">Monthly surplus resources rescued (Food vs Medicine)</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-amber-700">
                <span className="w-3 h-3 rounded-sm bg-amber-500 inline-block" />
                Food Rescue
              </span>
              <span className="flex items-center gap-1.5 text-sky-700">
                <span className="w-3 h-3 rounded-sm bg-sky-500 inline-block" />
                Medicine
              </span>
            </div>
          </div>

          {/* SVG Bar Chart Graphic */}
          <div className="pt-6 pb-2">
            <div className="h-56 flex items-end justify-between gap-3 sm:gap-6 border-b border-stone-200 pb-2">
              {monthlyData.map((item, idx) => {
                const foodHeight = (item.food / maxMonthValue) * 100;
                const medHeight = (item.medicine / maxMonthValue) * 100;

                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="w-full flex items-end justify-center gap-1 sm:gap-2 h-full">
                      {/* Food Bar */}
                      <div
                        style={{ height: `${foodHeight}%` }}
                        className="w-full max-w-[24px] bg-gradient-to-t from-amber-600 to-amber-400 rounded-t-lg transition-all duration-500 group-hover:brightness-110 relative"
                      >
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-7 left-1/2 -translate-x-1/2 bg-[#201f1e] text-white text-[10px] px-2 py-0.5 rounded shadow whitespace-nowrap z-10 font-bold">
                          {item.food}
                        </span>
                      </div>

                      {/* Medicine Bar */}
                      <div
                        style={{ height: `${medHeight}%` }}
                        className="w-full max-w-[24px] bg-gradient-to-t from-sky-600 to-sky-400 rounded-t-lg transition-all duration-500 group-hover:brightness-110 relative"
                      >
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-7 left-1/2 -translate-x-1/2 bg-[#201f1e] text-white text-[10px] px-2 py-0.5 rounded shadow whitespace-nowrap z-10 font-bold">
                          {item.medicine}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-stone-500">{item.month}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Chart 2: Category Split Donut & Ratio (1 Col) */}
        <div className="bg-[#f4efe8] rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-[0_8px_24px_rgba(40,30,20,0.04)] flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-base font-bold text-stone-900">Resource Category Ratio</h3>
            <p className="text-xs text-stone-500">Distribution between Food & Medicine</p>
          </div>

          {/* SVG Donut */}
          <div className="flex flex-col items-center justify-center my-2 relative">
            <svg className="w-44 h-44 transform -rotate-90" viewBox="0 0 36 36">
              {/* Background Ring */}
              <path
                className="text-stone-100"
                strokeWidth="3.8"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              {/* Food Segment */}
              <path
                className="text-amber-500 transition-all duration-1000"
                strokeDasharray={`${foodPct}, 100`}
                strokeWidth="3.8"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              {/* Medicine Segment */}
              <path
                className="text-sky-500 transition-all duration-1000"
                strokeDasharray={`${medPct}, 100`}
                strokeDashoffset={`-${foodPct}`}
                strokeWidth="3.8"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-black text-stone-900">{total}</span>
              <span className="text-[11px] text-stone-500 font-medium">Total Listings</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-center pt-2 border-t border-stone-100 text-xs">
            <div className="p-2 rounded-xl bg-amber-50 border border-amber-200">
              <div className="text-amber-900 font-extrabold text-base">{foodPct}%</div>
              <div className="text-stone-600 font-medium">Food Rescue</div>
            </div>
            <div className="p-2 rounded-xl bg-sky-50 border border-sky-200">
              <div className="text-sky-900 font-extrabold text-base">{medPct}%</div>
              <div className="text-stone-600 font-medium">Medicine</div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Contributing Organizations Leaderboard */}
      <div className="bg-[#f4efe8] rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-[0_8px_24px_rgba(40,30,20,0.04)] space-y-4">
        <div>
          <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-600" />
            Top Community Donors Leaderboard
          </h3>
          <p className="text-xs text-stone-500">Recognizing verified partners with highest redistribution impact</p>
        </div>

        <div className="divide-y divide-stone-100">
          {topDonors.map((donor, idx) => (
            <div key={idx} className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-xl bg-stone-100 font-mono font-bold text-xs flex items-center justify-center text-stone-700">
                  #{idx + 1}
                </span>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">{donor.name}</h4>
                  <p className="text-xs text-stone-500">★ {donor.rating} rating • {donor.category} Partner</p>
                </div>
              </div>
              <span className="font-bold text-xs px-3 py-1 bg-stone-100 text-stone-800 rounded-full">
                {donor.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
