import React from 'react';
import { Search, Filter, Utensils, Pill, MapPin, Clock, RotateCcw } from 'lucide-react';

export default function ResourceFilters({
  filters,
  onChange,
  onReset,
  totalResults
}) {
  const handleInputChange = (field, value) => {
    onChange({ ...filters, [field]: value });
  };

  return (
    <div className="bg-[#f4efe8] rounded-3xl p-6 border border-stone-200/90 shadow-[0_8px_24px_rgba(40,30,20,0.04)] space-y-4 text-stone-900">
      {/* Search Input Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search donated resources by name, location, or donor..."
            value={filters.search}
            onChange={(e) => handleInputChange('search', e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-2xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => handleInputChange('category', 'all')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
              filters.category === 'all'
                ? 'bg-[#201f1e] text-white shadow-xs font-extrabold'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            All Resources
          </button>
          <button
            onClick={() => handleInputChange('category', 'food')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              filters.category === 'food'
                ? 'bg-amber-100 text-amber-900 border border-amber-300 shadow-xs font-extrabold'
                : 'bg-stone-100 text-amber-800 hover:bg-amber-50 border border-transparent'
            }`}
          >
            <Utensils className="w-3.5 h-3.5 text-amber-600" />
            Food Rescue 🍱
          </button>
          <button
            onClick={() => handleInputChange('category', 'medicine')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              filters.category === 'medicine'
                ? 'bg-sky-100 text-sky-900 border border-sky-300 shadow-xs font-extrabold'
                : 'bg-stone-100 text-sky-800 hover:bg-sky-50 border border-transparent'
            }`}
          >
            <Pill className="w-3.5 h-3.5 text-sky-600" />
            Medicine Donation 💊
          </button>
        </div>
      </div>

      {/* Secondary Filter Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-stone-100 text-xs">
        {/* Status Dropdown */}
        <div>
          <label className="block text-stone-500 font-medium mb-1">Availability Status</label>
          <select
            value={filters.status}
            onChange={(e) => handleInputChange('status', e.target.value)}
            className="w-full py-2 px-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500"
          >
            <option value="all">All Statuses</option>
            <option value="available">Available Now</option>
            <option value="requested">Requested</option>
            <option value="completed">Completed / Rescued</option>
          </select>
        </div>

        {/* Urgency Filter */}
        <div>
          <label className="block text-stone-500 font-medium mb-1">Urgency Level</label>
          <select
            value={filters.urgency}
            onChange={(e) => handleInputChange('urgency', e.target.value)}
            className="w-full py-2 px-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500"
          >
            <option value="all">Any Urgency</option>
            <option value="urgent">Urgent / Express</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium</option>
            <option value="low">Standard</option>
          </select>
        </div>

        {/* Distance Range */}
        <div>
          <label className="block text-stone-500 font-medium mb-1">Proximity</label>
          <select
            value={filters.distance}
            onChange={(e) => handleInputChange('distance', e.target.value)}
            className="w-full py-2 px-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500"
          >
            <option value="all">Any Distance</option>
            <option value="2">Within 2 km</option>
            <option value="5">Within 5 km</option>
            <option value="10">Within 10 km</option>
          </select>
        </div>

        {/* Sorting Dropdown */}
        <div>
          <label className="block text-stone-500 font-medium mb-1">Sort Results By</label>
          <select
            value={filters.sortBy}
            onChange={(e) => handleInputChange('sortBy', e.target.value)}
            className="w-full py-2 px-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500"
          >
            <option value="newest">Newest Listed First</option>
            <option value="urgency">Highest Urgency First</option>
            <option value="distance">Nearest Distance First</option>
          </select>
        </div>
      </div>

      {/* Results Count & Reset Filter Action */}
      <div className="flex items-center justify-between text-xs pt-1 text-stone-500">
        <span>
          Showing <strong className="text-stone-900">{totalResults}</strong> matching resources
        </span>

        <button
          onClick={onReset}
          className="text-stone-600 hover:text-stone-900 font-semibold flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Filters</span>
        </button>
      </div>
    </div>
  );
}
