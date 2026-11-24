import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Award,
  Trophy,
  Medal,
  Crown,
  Sparkles,
  Building2,
  User,
  Utensils,
  Pill,
  ShieldCheck,
  Star,
  Search,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Filter,
  MapPin,
  Calendar,
  Heart,
  TrendingUp,
  X,
  Phone,
  Mail,
  Recycle
} from 'lucide-react';
import Card3D from '../components/Card3D';
import { getDonations } from '../utils/storage';

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'organization', 'individual', 'healthcare'
  const [categoryFilter, setCategoryFilter] = useState('all'); // 'all', 'food', 'medicine'
  const [timeframe, setTimeframe] = useState('all-time'); // 'all-time', 'month', 'week'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDonor, setSelectedDonor] = useState(null);

  // Curated Comprehensive Leaderboard Data (Integrating verified partners & real storage items)
  const initialLeaders = useMemo(() => [
    {
      id: 'ldr-1',
      rank: 1,
      name: 'Grand Hyatt Culinary Services',
      type: 'organization',
      subType: 'Five-Star Hotel & Banquet Hub',
      category: 'food',
      avatar: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=300',
      mealsRescued: 2840,
      medicineUnits: 0,
      totalDonations: 74,
      wasteDivertedKg: 1420,
      rating: 4.98,
      reviewCount: 142,
      tier: 'Diamond Benefactor',
      tierBadge: 'bg-amber-100 text-amber-900 border-amber-300',
      verified: true,
      joinedDate: 'Joined Nov 2024',
      location: 'Central Business District, Sector 1',
      quote: 'Redirecting surplus banquets to local community shelters is our primary civic commitment.',
      phone: '+1 (555) 789-0123',
      email: 'culinary.csr@grandhyatt.demo',
      recentItem: '45 Boxed Meals (Rice, Dal, Paneer Medley)'
    },
    {
      id: 'ldr-2',
      rank: 2,
      name: 'Green Leaf Artisan Bakery Co.',
      type: 'organization',
      subType: 'Artisan Bakery & Cafe Chain',
      category: 'food',
      avatar: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=300',
      mealsRescued: 1960,
      medicineUnits: 0,
      totalDonations: 62,
      wasteDivertedKg: 890,
      rating: 4.95,
      reviewCount: 98,
      tier: 'Platinum Care Pillar',
      tierBadge: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      verified: true,
      joinedDate: 'Joined Jan 2025',
      location: 'Greenwich Avenue, Old Town',
      quote: 'Daily morning bake surplus goes straight to evening food kitchens before closing.',
      phone: '+1 (555) 345-6789',
      email: 'csr@greenleafbakery.demo',
      recentItem: '35 Fresh Sourdough Loaves & Croissants'
    },
    {
      id: 'ldr-3',
      rank: 3,
      name: 'MediCare Regional Healthcare & Labs',
      type: 'organization',
      subType: 'Licensed Clinical Network',
      category: 'medicine',
      avatar: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=300',
      mealsRescued: 0,
      medicineUnits: 1420,
      totalDonations: 53,
      wasteDivertedKg: 310,
      rating: 5.0,
      reviewCount: 84,
      tier: 'Platinum Care Pillar',
      tierBadge: 'bg-sky-100 text-sky-900 border-sky-300',
      verified: true,
      joinedDate: 'Joined Feb 2025',
      location: 'Westside Medical Corridor',
      quote: 'Verified surplus OTC pharmaceuticals and first-aid packs channeled to frontline clinic units.',
      phone: '+1 (555) 901-2345',
      email: 'donations@medicareregional.demo',
      recentItem: '60 Strips Paracetamol & Amoxicillin'
    },
    {
      id: 'ldr-4',
      rank: 4,
      name: 'Aarav Sharma',
      type: 'individual',
      subType: 'Neighborhood Civic Organizer',
      category: 'both',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
      mealsRescued: 470,
      medicineUnits: 85,
      totalDonations: 38,
      wasteDivertedKg: 280,
      rating: 4.96,
      reviewCount: 46,
      tier: 'Gold Rescuer',
      tierBadge: 'bg-amber-50 text-amber-800 border-amber-200',
      verified: true,
      joinedDate: 'Joined Mar 2025',
      location: 'Downtown Metro Sector 4',
      quote: 'Bridging surplus from family celebrations and home health supplies to homeless shelters.',
      phone: '+1 (555) 234-5678',
      email: 'aarav.sharma@rescueconnect.demo',
      recentItem: 'Family Feast Trays & Sterile First Aid'
    },
    {
      id: 'ldr-5',
      rank: 5,
      name: 'Valley Organic Farmers Co-op',
      type: 'organization',
      subType: 'Agricultural Collective',
      category: 'food',
      avatar: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&q=80&w=300',
      mealsRescued: 1540,
      medicineUnits: 0,
      totalDonations: 41,
      wasteDivertedKg: 1120,
      rating: 4.92,
      reviewCount: 65,
      tier: 'Gold Rescuer',
      tierBadge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      verified: true,
      joinedDate: 'Joined Dec 2024',
      location: 'North River Valley Sector',
      quote: 'Harvest grade-B delicious produce donated directly to community food pantries weekly.',
      phone: '+1 (555) 432-1098',
      email: 'contact@valleyorganics.demo',
      recentItem: '120 kg Fresh Crisp Apples & Greens'
    },
    {
      id: 'ldr-6',
      rank: 6,
      name: 'Dr. Elena Vance & Associates',
      type: 'healthcare',
      subType: 'Pediatric Clinic & Dispensary',
      category: 'medicine',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
      mealsRescued: 0,
      medicineUnits: 890,
      totalDonations: 34,
      wasteDivertedKg: 195,
      rating: 4.99,
      reviewCount: 52,
      tier: 'Gold Rescuer',
      tierBadge: 'bg-sky-50 text-sky-800 border-sky-200',
      verified: true,
      joinedDate: 'Joined Jan 2025',
      location: 'Civic Innovation District',
      quote: 'Safe medical compliance and sterile supplies for under-insured children and elders.',
      phone: '+1 (555) 678-9012',
      email: 'elena.vance@clinic.demo',
      recentItem: 'Pediatric Electrolytes & Multivitamins'
    },
    {
      id: 'ldr-7',
      rank: 7,
      name: 'Metro Food Markets & Deli',
      type: 'organization',
      subType: 'Gourmet Supermarket Chain',
      category: 'food',
      avatar: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=300',
      mealsRescued: 1280,
      medicineUnits: 0,
      totalDonations: 29,
      wasteDivertedKg: 780,
      rating: 4.88,
      reviewCount: 39,
      tier: 'Silver Guardian',
      tierBadge: 'bg-stone-100 text-stone-800 border-stone-300',
      verified: true,
      joinedDate: 'Joined Apr 2025',
      location: 'Midtown Commercial Plaza',
      quote: 'Daily deli items and dairy products within 48 hours of freshness redirected before shelf turnover.',
      phone: '+1 (555) 765-4321',
      email: 'sustainability@metrofood.demo',
      recentItem: '40 Gourmet Sandwiches & Dairy'
    },
    {
      id: 'ldr-8',
      rank: 8,
      name: 'Sophia Patel',
      type: 'individual',
      subType: 'Community Volunteer Lead',
      category: 'both',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300',
      mealsRescued: 340,
      medicineUnits: 120,
      totalDonations: 26,
      wasteDivertedKg: 210,
      rating: 4.94,
      reviewCount: 31,
      tier: 'Silver Guardian',
      tierBadge: 'bg-stone-100 text-stone-800 border-stone-300',
      verified: true,
      joinedDate: 'Joined May 2025',
      location: 'Harborview Community Block',
      quote: 'Organizing neighborhood donation drives for baby formula, dry goods, and first-aid essentials.',
      phone: '+1 (555) 890-1234',
      email: 'sophia.patel@rescueconnect.demo',
      recentItem: '30 Meal Tiffin Boxes & Sterile Gauze'
    },
    {
      id: 'ldr-9',
      rank: 9,
      name: 'Apex Community Pharmacy',
      type: 'healthcare',
      subType: 'Community Care Pharmacy',
      category: 'medicine',
      avatar: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=300',
      mealsRescued: 0,
      medicineUnits: 720,
      totalDonations: 22,
      wasteDivertedKg: 140,
      rating: 4.97,
      reviewCount: 28,
      tier: 'Silver Guardian',
      tierBadge: 'bg-stone-100 text-stone-800 border-stone-300',
      verified: true,
      joinedDate: 'Joined Feb 2025',
      location: 'Westside Plaza, Bay 3',
      quote: 'Factory-sealed OTC medications vetted to support local clinics and disaster relief.',
      phone: '+1 (555) 543-2109',
      email: 'info@apexpharmacy.demo',
      recentItem: 'Unopened Paracetamol & Antiseptics'
    },
    {
      id: 'ldr-10',
      rank: 10,
      name: 'Catering By Design Co.',
      type: 'organization',
      subType: 'Event & Wedding Catering',
      category: 'food',
      avatar: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=300',
      mealsRescued: 980,
      medicineUnits: 0,
      totalDonations: 19,
      wasteDivertedKg: 590,
      rating: 4.91,
      reviewCount: 24,
      tier: 'Bronze Contributor',
      tierBadge: 'bg-stone-50 text-stone-700 border-stone-200',
      verified: true,
      joinedDate: 'Joined Jun 2025',
      location: 'Harbor Arts District',
      quote: 'No wedding or corporate feast food goes to waste. Packaged hot for immediate distribution.',
      phone: '+1 (555) 321-0987',
      email: 'events@cateringbydesign.demo',
      recentItem: '18 Heated Banquet Rice & Stew Trays'
    }
  ], []);

  // Filtered Leaders
  const filteredLeaders = useMemo(() => {
    return initialLeaders.filter((donor) => {
      // Type Tab Filter
      if (activeTab === 'organization' && donor.type !== 'organization') return false;
      if (activeTab === 'individual' && donor.type !== 'individual') return false;
      if (activeTab === 'healthcare' && donor.type !== 'healthcare' && donor.category !== 'medicine') return false;

      // Category Scope Filter
      if (categoryFilter === 'food' && donor.category === 'medicine') return false;
      if (categoryFilter === 'medicine' && donor.category === 'food') return false;

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = donor.name.toLowerCase().includes(q);
        const matchSub = donor.subType.toLowerCase().includes(q);
        const matchLoc = donor.location.toLowerCase().includes(q);
        if (!matchName && !matchSub && !matchLoc) return false;
      }

      return true;
    });
  }, [initialLeaders, activeTab, categoryFilter, searchQuery]);

  const topThree = useMemo(() => {
    return filteredLeaders.slice(0, 3);
  }, [filteredLeaders]);

  const remainingLeaders = useMemo(() => {
    return filteredLeaders.slice(3);
  }, [filteredLeaders]);

  // Aggregate stats across leaderboard
  const totalMealsCount = useMemo(() => {
    return initialLeaders.reduce((acc, curr) => acc + curr.mealsRescued, 0);
  }, [initialLeaders]);

  const totalMedsCount = useMemo(() => {
    return initialLeaders.reduce((acc, curr) => acc + curr.medicineUnits, 0);
  }, [initialLeaders]);

  const totalDivertedKg = useMemo(() => {
    return initialLeaders.reduce((acc, curr) => acc + curr.wasteDivertedKg, 0);
  }, [initialLeaders]);

  return (
    <div className="space-y-12 pb-20 page-fade-in text-stone-900 min-h-screen">
      
      {/* ============================================================
          SPATIAL HERO BANNER (MATCHING WARM STONE ARCHITECTURAL AESTHETIC)
      ============================================================ */}
      <section className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 pt-2">
        <div className="relative rounded-[36px] sm:rounded-[48px] bg-[#f4efe8] border border-[#dfd7cc] shadow-[0_24px_60px_rgba(40,30,20,0.08)] overflow-hidden p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
          
          {/* Subtle Ambient Architectural Villa Photo Backdrop */}
          <div 
            className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-15 mix-blend-multiply"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80')`
            }}
          />

          {/* Warm Studio Gradient Lighting */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#f4efe8] via-[#f4efe8]/90 to-transparent pointer-events-none" />
          <div className="absolute top-10 right-20 w-[450px] h-[350px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-20 left-20 w-[400px] h-[300px] bg-emerald-500/5 blur-[110px] rounded-full pointer-events-none" />

          {/* Top Canvas Bar: Monogram Sub-tag + Top-Right Metadata */}
          <div className="relative z-10 flex items-center justify-between pb-6">
            <div className="flex items-center gap-2 text-stone-600 font-mono text-[10px] uppercase tracking-[0.25em] font-semibold">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span>CIVIC IMPACT & REDISTRIBUTION HONORS</span>
            </div>

            <div className="hidden md:flex flex-col text-right font-mono text-[9px] tracking-[0.25em] text-stone-500 uppercase leading-tight font-semibold">
              <span>RECOGNITION</span>
              <span>VERIFIED-DONORS</span>
              <span>COMMUNITY-PILLARS</span>
              <span>ZERO-WASTE</span>
            </div>
          </div>

          {/* Title & Editorial Description */}
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f4efe8]/80 border border-stone-200/90 text-[11px] font-mono tracking-wider text-emerald-800 shadow-2xs">
              <Trophy className="w-3.5 h-3.5 text-amber-600" />
              <span>COMMUNITY DONOR HALL OF FAME</span>
            </div>

            <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight leading-[1.0] text-[#1c1917]">
              Champions of <br />
              <span className="italic font-normal">Surplus & Care.</span>
            </h1>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-sans max-w-2xl">
              Honoring the exceptional hotels, bakeries, supermarkets, medical clinics, and individual citizens who redirect life-sustaining meals and certified pharmaceuticals to neighbors in need every single day.
            </p>
          </div>

          {/* Impact Stats Pills Bar Across Bottom of Banner */}
          <div className="relative z-10 pt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="p-4 rounded-3xl bg-[#f4efe8]/90 backdrop-blur-md border border-stone-200/90 shadow-2xs space-y-1">
              <div className="flex items-center gap-1.5 text-amber-700 text-xs font-mono font-bold uppercase">
                <Utensils className="w-3.5 h-3.5 text-amber-600" />
                <span>Meals Rescued</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-stone-900 font-sans">
                {totalMealsCount.toLocaleString()}+
              </div>
              <p className="text-[10px] text-stone-500">Redirected to local kitchens</p>
            </div>

            <div className="p-4 rounded-3xl bg-[#f4efe8]/90 backdrop-blur-md border border-stone-200/90 shadow-2xs space-y-1">
              <div className="flex items-center gap-1.5 text-sky-700 text-xs font-mono font-bold uppercase">
                <Pill className="w-3.5 h-3.5 text-sky-600" />
                <span>Medicines Donated</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-stone-900 font-sans">
                {totalMedsCount.toLocaleString()}+
              </div>
              <p className="text-[10px] text-stone-500">Verified eligible doses & kits</p>
            </div>

            <div className="p-4 rounded-3xl bg-[#f4efe8]/90 backdrop-blur-md border border-stone-200/90 shadow-2xs space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-mono font-bold uppercase">
                <Recycle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Waste Diverted</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-stone-900 font-sans">
                {totalDivertedKg.toLocaleString()} kg
              </div>
              <p className="text-[10px] text-stone-500">Prevented from city landfills</p>
            </div>

            <div className="p-4 rounded-3xl bg-[#f4efe8]/90 backdrop-blur-md border border-stone-200/90 shadow-2xs space-y-1">
              <div className="flex items-center gap-1.5 text-stone-700 text-xs font-mono font-bold uppercase">
                <Building2 className="w-3.5 h-3.5 text-stone-600" />
                <span>Active Donors</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-stone-900 font-sans">
                148+
              </div>
              <p className="text-[10px] text-stone-500">Verified community partners</p>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================
          FILTER CONTROLS & SEARCH BAR
      ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-4 sm:p-5 rounded-3xl bg-[#f4efe8]/90 backdrop-blur-xl border border-stone-200/90 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Main Segment Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {[
              { id: 'all', label: 'All Champions', icon: Trophy },
              { id: 'organization', label: 'Organizations & Hotels', icon: Building2 },
              { id: 'individual', label: 'Individual Citizens', icon: User },
              { id: 'healthcare', label: 'Healthcare & Pharma', icon: Pill },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-2xl text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-[#201f1e] text-white shadow-xs font-bold'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search & Category Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by name, sector..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-xl text-stone-900 placeholder-stone-400 focus:bg-[#f0eae1] focus:outline-none focus:ring-1 focus:ring-stone-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Category Dropdown */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-xl text-stone-700 font-semibold focus:outline-none focus:bg-[#f0eae1]"
            >
              <option value="all">All Sectors</option>
              <option value="food">🍱 Food Only</option>
              <option value="medicine">💊 Medicine Only</option>
            </select>
          </div>
        </div>
      </section>

      {/* ============================================================
          TOP 3 PODIUM SECTION (GOLD, SILVER, BRONZE SHOWCASE)
      ============================================================ */}
      {topThree.length >= 3 && !searchQuery && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-700 font-bold">
              THE HONORS PODIUM
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-normal text-stone-900">
              Leading Contributors
            </h2>
            <p className="text-xs text-stone-500">
              Highest cumulative civic impact across metropolitan sectors
            </p>
          </div>

          {/* 3-Column Podium Grid: #2 Silver (Left), #1 Gold (Center Elevated), #3 Bronze (Right) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end pt-4">
            
            {/* RANK 2: SILVER PODIUM CARD */}
            {topThree[1] && (
              <Card3D intensity={6}>
                <div 
                  onClick={() => setSelectedDonor(topThree[1])}
                  className="rounded-3xl bg-[#f4efe8] border border-stone-200/90 hover:border-stone-300 p-6 shadow-[0_12px_32px_rgba(40,30,20,0.05)] cursor-pointer transition-all space-y-5 relative overflow-hidden"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-stone-100 text-stone-700 border border-stone-300 font-mono text-xs font-bold flex items-center gap-1.5">
                      <Medal className="w-3.5 h-3.5 text-stone-500" />
                      <span>RANK #2 SILVER</span>
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${topThree[1].tierBadge}`}>
                      {topThree[1].tier}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={topThree[1].avatar}
                        alt=""
                        className="w-16 h-16 rounded-2xl object-cover ring-2 ring-stone-300 shadow-xs"
                      />
                      <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-stone-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-stone-800">
                        2
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1 font-bold text-stone-900 text-base truncate">
                        <span>{topThree[1].name}</span>
                        <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      </div>
                      <p className="text-xs text-stone-500 truncate">{topThree[1].subType}</p>
                      <div className="flex items-center gap-1 text-[11px] text-amber-700 font-semibold pt-0.5">
                        <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
                        <span>{topThree[1].rating}</span>
                        <span className="text-stone-400">({topThree[1].reviewCount} reviews)</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#f8f5f0] border border-stone-200/80 grid grid-cols-2 gap-2 text-center">
                    <div>
                      <div className="text-base font-black text-stone-900">
                        {topThree[1].category === 'food' ? `${topThree[1].mealsRescued}+` : `${topThree[1].medicineUnits}+`}
                      </div>
                      <div className="text-[10px] text-stone-500">
                        {topThree[1].category === 'food' ? 'Meals Rescued' : 'Medicine Units'}
                      </div>
                    </div>
                    <div>
                      <div className="text-base font-black text-emerald-700">
                        {topThree[1].wasteDivertedKg} kg
                      </div>
                      <div className="text-[10px] text-stone-500">Landfill Diverted</div>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 line-clamp-2 italic leading-relaxed">
                    "{topThree[1].quote}"
                  </p>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                    <span className="flex items-center gap-1 text-[11px]">
                      <MapPin className="w-3 h-3 text-stone-400" />
                      {topThree[1].location.split(',')[0]}
                    </span>
                    <span className="font-bold text-emerald-700 flex items-center gap-0.5">
                      <span>View Dossier</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Card3D>
            )}

            {/* RANK 1: GOLD PODIUM CARD (CENTER ELEVATED) */}
            {topThree[0] && (
              <Card3D intensity={8}>
                <div 
                  onClick={() => setSelectedDonor(topThree[0])}
                  className="rounded-3xl bg-gradient-to-b from-white via-white to-[#fbf7f0] border-2 border-amber-300 hover:border-amber-400 p-7 shadow-[0_20px_45px_rgba(217,119,6,0.12)] cursor-pointer transition-all space-y-5 relative overflow-hidden -translate-y-2 sm:-translate-y-4"
                >
                  {/* Subtle Golden Crown Ribbon Accent */}
                  <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-amber-400 text-stone-950 font-black text-[10px] px-4 py-1 rounded-bl-2xl shadow-xs uppercase tracking-wider flex items-center gap-1 font-mono">
                    <Crown className="w-3.5 h-3.5 fill-current" />
                    <span>#1 CIVIC LEADER</span>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-300 font-mono text-xs font-black flex items-center gap-1.5 shadow-2xs">
                      <Trophy className="w-3.5 h-3.5 text-amber-600" />
                      <span>GRAND CHAMPION</span>
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${topThree[0].tierBadge}`}>
                      {topThree[0].tier}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 pt-1">
                    <div className="relative">
                      <img
                        src={topThree[0].avatar}
                        alt=""
                        className="w-20 h-20 rounded-2xl object-cover ring-4 ring-amber-400/40 shadow-md"
                      />
                      <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-amber-500 text-stone-950 border-2 border-white flex items-center justify-center text-xs font-black shadow-xs">
                        1
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1 font-black text-stone-900 text-lg truncate">
                        <span>{topThree[0].name}</span>
                        <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      </div>
                      <p className="text-xs text-stone-600 font-medium truncate">{topThree[0].subType}</p>
                      <div className="flex items-center gap-1 text-xs text-amber-800 font-bold pt-1">
                        <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
                        <span>{topThree[0].rating}</span>
                        <span className="text-stone-400 font-normal">({topThree[0].reviewCount} certified handovers)</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/90 grid grid-cols-2 gap-2 text-center">
                    <div>
                      <div className="text-xl font-black text-stone-900 font-sans">
                        {topThree[0].mealsRescued.toLocaleString()}+
                      </div>
                      <div className="text-[10px] font-bold text-amber-900 uppercase tracking-wider">
                        Meals Rescued 🍱
                      </div>
                    </div>
                    <div>
                      <div className="text-xl font-black text-emerald-800 font-sans">
                        {topThree[0].wasteDivertedKg.toLocaleString()} kg
                      </div>
                      <div className="text-[10px] font-bold text-emerald-900 uppercase tracking-wider">
                        CO₂ & Landfill Diverted
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-stone-700 italic leading-relaxed bg-[#f4efe8]/70 p-3 rounded-xl border border-stone-200/70">
                    "{topThree[0].quote}"
                  </p>

                  <div className="pt-2 border-t border-amber-100 flex items-center justify-between text-xs text-stone-600">
                    <span className="flex items-center gap-1 text-[11px]">
                      <MapPin className="w-3.5 h-3.5 text-amber-600" />
                      {topThree[0].location.split(',')[0]}
                    </span>
                    <span className="font-extrabold text-[#201f1e] flex items-center gap-0.5">
                      <span>Full Donor Dossier</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Card3D>
            )}

            {/* RANK 3: BRONZE PODIUM CARD */}
            {topThree[2] && (
              <Card3D intensity={6}>
                <div 
                  onClick={() => setSelectedDonor(topThree[2])}
                  className="rounded-3xl bg-[#f4efe8] border border-stone-200/90 hover:border-stone-300 p-6 shadow-[0_12px_32px_rgba(40,30,20,0.05)] cursor-pointer transition-all space-y-5 relative overflow-hidden"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-mono text-xs font-bold flex items-center gap-1.5">
                      <Medal className="w-3.5 h-3.5 text-amber-700" />
                      <span>RANK #3 BRONZE</span>
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${topThree[2].tierBadge}`}>
                      {topThree[2].tier}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={topThree[2].avatar}
                        alt=""
                        className="w-16 h-16 rounded-2xl object-cover ring-2 ring-amber-600/30 shadow-xs"
                      />
                      <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-amber-600 text-white border-2 border-white flex items-center justify-center text-[10px] font-bold">
                        3
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1 font-bold text-stone-900 text-base truncate">
                        <span>{topThree[2].name}</span>
                        <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      </div>
                      <p className="text-xs text-stone-500 truncate">{topThree[2].subType}</p>
                      <div className="flex items-center gap-1 text-[11px] text-amber-700 font-semibold pt-0.5">
                        <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
                        <span>{topThree[2].rating}</span>
                        <span className="text-stone-400">({topThree[2].reviewCount} reviews)</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#f8f5f0] border border-stone-200/80 grid grid-cols-2 gap-2 text-center">
                    <div>
                      <div className="text-base font-black text-stone-900">
                        {topThree[2].category === 'medicine' ? `${topThree[2].medicineUnits}+` : `${topThree[2].mealsRescued}+`}
                      </div>
                      <div className="text-[10px] text-stone-500">
                        {topThree[2].category === 'medicine' ? 'Medicine Units' : 'Meals Rescued'}
                      </div>
                    </div>
                    <div>
                      <div className="text-base font-black text-emerald-700">
                        {topThree[2].wasteDivertedKg} kg
                      </div>
                      <div className="text-[10px] text-stone-500">Landfill Diverted</div>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 line-clamp-2 italic leading-relaxed">
                    "{topThree[2].quote}"
                  </p>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                    <span className="flex items-center gap-1 text-[11px]">
                      <MapPin className="w-3 h-3 text-stone-400" />
                      {topThree[2].location.split(',')[0]}
                    </span>
                    <span className="font-bold text-emerald-700 flex items-center gap-0.5">
                      <span>View Dossier</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Card3D>
            )}

          </div>
        </section>
      )}

      {/* ============================================================
          DETAILED RANKING DIRECTORY (RANKS 4 - 10+)
      ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex items-center justify-between pb-2">
          <div>
            <h3 className="font-editorial text-2xl sm:text-3xl font-normal text-stone-900">
              Complete Civic Directory
            </h3>
            <p className="text-xs text-stone-500">
              Showing {filteredLeaders.length} registered donors and community organizations
            </p>
          </div>
          <div className="text-xs text-stone-500 font-mono">
            UPDATED REAL-TIME
          </div>
        </div>

        {/* Directory Container */}
        <div className="bg-[#f4efe8] rounded-3xl border border-stone-200/90 shadow-[0_8px_24px_rgba(40,30,20,0.04)] overflow-hidden divide-y divide-stone-200/80">
          
          {/* Table Header (Desktop) */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3.5 bg-stone-50/80 text-[11px] font-mono uppercase tracking-wider text-stone-500 font-bold border-b border-stone-200/80">
            <div className="col-span-1">Rank</div>
            <div className="col-span-4">Donor / Organization</div>
            <div className="col-span-2">Sector & Location</div>
            <div className="col-span-2">Resource Volume</div>
            <div className="col-span-2">Civic Rating</div>
            <div className="col-span-1 text-right">Dossier</div>
          </div>

          {/* List Items */}
          {filteredLeaders.map((donor) => (
            <div
              key={donor.id}
              onClick={() => setSelectedDonor(donor)}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 px-5 sm:px-6 py-4 items-center hover:bg-[#faf7f2] transition-colors cursor-pointer group"
            >
              {/* Rank */}
              <div className="md:col-span-1 flex items-center gap-2">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-xs ${
                  donor.rank === 1 ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                  donor.rank === 2 ? 'bg-stone-200 text-stone-800' :
                  donor.rank === 3 ? 'bg-amber-50 text-amber-800' :
                  'bg-stone-100 text-stone-600'
                }`}>
                  #{donor.rank}
                </span>
                <span className="md:hidden text-xs font-bold text-stone-900">
                  {donor.name}
                </span>
              </div>

              {/* Donor Name & Avatar */}
              <div className="md:col-span-4 flex items-center gap-3.5 min-w-0">
                <img
                  src={donor.avatar}
                  alt=""
                  className="w-12 h-12 rounded-2xl object-cover ring-1 ring-stone-200 flex-shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 font-bold text-stone-900 text-sm truncate group-hover:text-emerald-800 transition-colors">
                    <span className="truncate">{donor.name}</span>
                    {donor.verified && <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />}
                  </div>
                  <p className="text-xs text-stone-500 truncate">{donor.subType}</p>
                  <span className={`inline-block md:hidden mt-1 px-2 py-0.5 rounded-full text-[9px] font-bold border ${donor.tierBadge}`}>
                    {donor.tier}
                  </span>
                </div>
              </div>

              {/* Sector & Location */}
              <div className="md:col-span-2 text-xs text-stone-600">
                <div className="flex items-center gap-1 text-stone-800 font-medium truncate">
                  <MapPin className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
                  <span className="truncate">{donor.location.split(',')[0]}</span>
                </div>
                <div className="text-[11px] text-stone-500 mt-0.5">
                  {donor.category === 'food' ? '🍱 Surplus Food' : donor.category === 'medicine' ? '💊 OTC Medicine' : '🍱 Food & Medicine 💊'}
                </div>
              </div>

              {/* Impact Resource Volume */}
              <div className="md:col-span-2 text-xs">
                <div className="font-extrabold text-stone-900">
                  {donor.mealsRescued > 0 && `${donor.mealsRescued.toLocaleString()} Meals`}
                  {donor.mealsRescued > 0 && donor.medicineUnits > 0 && ' • '}
                  {donor.medicineUnits > 0 && `${donor.medicineUnits.toLocaleString()} Meds`}
                </div>
                <div className="text-[11px] text-emerald-700 font-medium">
                  {donor.wasteDivertedKg} kg waste diverted
                </div>
              </div>

              {/* Civic Rating & Tier */}
              <div className="md:col-span-2 text-xs">
                <div className="flex items-center gap-1 font-bold text-amber-700">
                  <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
                  <span>{donor.rating}</span>
                  <span className="text-stone-400 font-normal">({donor.reviewCount})</span>
                </div>
                <span className={`hidden md:inline-block mt-1 px-2 py-0.5 rounded-full text-[9px] font-bold border ${donor.tierBadge}`}>
                  {donor.tier}
                </span>
              </div>

              {/* Action Arrow */}
              <div className="md:col-span-1 text-right">
                <button
                  className="w-8 h-8 rounded-full bg-stone-100 group-hover:bg-[#201f1e] group-hover:text-white text-stone-700 flex items-center justify-center transition-all ml-auto shadow-2xs"
                  title="View Donor Dossier"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {filteredLeaders.length === 0 && (
            <div className="p-12 text-center text-stone-500 space-y-3">
              <Trophy className="w-10 h-10 text-stone-300 mx-auto" />
              <p className="font-medium text-sm">No donors match your search criteria.</p>
              <button
                onClick={() => {
                  setActiveTab('all');
                  setCategoryFilter('all');
                  setSearchQuery('');
                }}
                className="px-4 py-2 bg-[#201f1e] text-white text-xs font-bold rounded-xl"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ============================================================
          CALLOUT ACTION CARD (MATCHING REFERENCE IMAGE DEEP CHARCOAL BENTO)
      ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[36px] bg-[#201f1e] text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          
          {/* Subtle Ambient Radial Highlight */}
          <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[200px] bg-amber-500/10 blur-[90px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 border border-white/15 text-xs font-mono font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>JOIN THE CIVIC HONORS DIRECTORY</span>
            </div>

            <h2 className="font-editorial text-3xl sm:text-5xl font-normal tracking-tight text-white leading-tight">
              Turn Daily Surplus Into <br />
              <span className="italic">Recognized Life-Saving Care.</span>
            </h2>

            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              Whether you represent a metropolitan hotel chain, an artisan cafe, a community pharmacy, or care about preventing food waste at home — every donation earns verified civic impact points and tax certificates.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <Link
              to="/donate-food"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#f4efe8] hover:bg-[#ede5da] text-[#201f1e] text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 group"
            >
              <Utensils className="w-4 h-4 text-amber-600" />
              <span>Donate Surplus Food</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>

            <Link
              to="/donate-medicine"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2"
            >
              <Pill className="w-4 h-4 text-sky-400" />
              <span>Donate Medicine</span>
            </Link>
          </div>

        </div>
      </section>

      {/* ============================================================
          INTERACTIVE DONOR DOSSIER MODAL
      ============================================================ */}
      {selectedDonor && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-md animate-fade-in">
          <div className="bg-[#f4efe8] rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-stone-200 max-h-[90vh] overflow-y-auto animate-slide-up text-stone-900 space-y-5">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-amber-800 uppercase">
                <Trophy className="w-4 h-4 text-amber-600" />
                <span>Verified Impact Dossier • Rank #{selectedDonor.rank}</span>
              </div>
              <button
                onClick={() => setSelectedDonor(null)}
                className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Overview */}
            <div className="flex items-center gap-4">
              <img
                src={selectedDonor.avatar}
                alt=""
                className="w-20 h-20 rounded-2xl object-cover ring-2 ring-stone-200 shadow-xs flex-shrink-0"
              />
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-stone-900 text-lg truncate">{selectedDonor.name}</h3>
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                </div>
                <p className="text-xs text-stone-500">{selectedDonor.subType}</p>
                <div className="flex items-center gap-2 pt-0.5">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${selectedDonor.tierBadge}`}>
                    {selectedDonor.tier}
                  </span>
                  <span className="text-xs text-amber-700 font-bold flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
                    <span>{selectedDonor.rating}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Quote / Statement */}
            <div className="p-3.5 rounded-2xl bg-[#f8f5f0] border border-stone-200 text-xs italic text-stone-700 leading-relaxed">
              "{selectedDonor.quote}"
            </div>

            {/* Key Stats Grid */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
                <div className="text-base font-black text-stone-900">
                  {selectedDonor.mealsRescued > 0 ? selectedDonor.mealsRescued.toLocaleString() : selectedDonor.medicineUnits.toLocaleString()}
                </div>
                <div className="text-[10px] text-stone-500">
                  {selectedDonor.mealsRescued > 0 ? 'Meals Provided' : 'Meds Supplied'}
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
                <div className="text-base font-black text-emerald-700">
                  {selectedDonor.wasteDivertedKg} kg
                </div>
                <div className="text-[10px] text-stone-500">Waste Prevented</div>
              </div>

              <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
                <div className="text-base font-black text-stone-900">
                  {selectedDonor.totalDonations}
                </div>
                <div className="text-[10px] text-stone-500">Total Missions</div>
              </div>
            </div>

            {/* Verification & Location Details */}
            <div className="space-y-2 text-xs text-stone-600 pt-2 border-t border-stone-100">
              <div className="flex items-center justify-between">
                <span className="text-stone-500">Operating Sector:</span>
                <span className="font-semibold text-stone-900">{selectedDonor.location}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-500">Tenure:</span>
                <span className="font-semibold text-stone-900">{selectedDonor.joinedDate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-500">Recent Contribution:</span>
                <span className="font-semibold text-emerald-800">{selectedDonor.recentItem}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-500">Direct Contact:</span>
                <span className="font-semibold text-stone-900">{selectedDonor.email}</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-100">
              <button
                type="button"
                onClick={() => setSelectedDonor(null)}
                className="px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:bg-stone-100 text-xs font-semibold transition"
              >
                Close Dossier
              </button>
              <Link
                to="/browse"
                onClick={() => setSelectedDonor(null)}
                className="px-5 py-2 rounded-full bg-[#201f1e] hover:bg-stone-800 text-white text-xs font-bold shadow-md transition flex items-center gap-1.5"
              >
                <span>View Current Listings</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
