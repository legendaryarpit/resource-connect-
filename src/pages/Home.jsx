import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ResourceCard from '../components/ResourceCard';
import Modal from '../components/Modal';
import SafetyNotice from '../components/SafetyNotice';
import RescueCanvas3D from '../components/RescueCanvas3D';
import LeftDock from '../components/LeftDock';
import Card3D from '../components/Card3D';
import { getDonations, addRequest } from '../utils/storage';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import {
  Utensils,
  Pill,
  ShieldCheck,
  Heart,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Users,
  Building2,
  CheckCircle2,
  Boxes,
  HandHeart,
  Search,
  Globe,
  ChevronLeft,
  ChevronRight,
  Play,
  RotateCcw,
  Clock,
  MapPin
} from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useToast();

  const [donations, setDonations] = useState([]);
  const [activeFeaturedIndex, setActiveFeaturedIndex] = useState(0);
  const [selectedResource, setSelectedResource] = useState(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestPurpose, setRequestPurpose] = useState('');
  const [requestQuantity, setRequestQuantity] = useState('');
  const [canvas3DMode, setCanvas3DMode] = useState('network');

  useEffect(() => {
    const data = getDonations();
    const verified = data.filter(d => d.status === 'available' && d.verificationStatus === 'approved');
    setDonations(verified.length > 0 ? verified : data.slice(0, 6));
  }, []);

  const featuredList = [
    {
      id: 'RC-1024',
      title: 'Surplus Fresh Meal Boxes',
      quantity: '25 Meal Boxes',
      location: 'Downtown Metro Center',
      distance: '1.2 km away',
      availableUntil: 'Today 8:00 PM',
      category: 'food',
      donor: { name: 'Green Leaf Restaurant' },
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
      description: 'Chef-prepared nutritious boxed dinners packaged in insulated containers.'
    },
    {
      id: 'RC-1028',
      title: 'Unopened Paracetamol 500mg',
      quantity: '10 Sealed Strips',
      location: 'Westside Clinic Depot',
      distance: '2.4 km away',
      availableUntil: 'Expires 2027',
      category: 'medicine',
      donor: { name: 'Apex Pharmacy' },
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
      description: 'Factory-sealed fever and pain relief strips inspected by licensed pharmacist.'
    },
    {
      id: 'RC-1031',
      title: 'Artisan Bakery Sourdough Trays',
      quantity: '40 Fresh Loaves',
      location: 'East Market Plaza',
      distance: '0.8 km away',
      availableUntil: 'Tonight 9:30 PM',
      category: 'food',
      donor: { name: 'Crust & Crumb Bakery' },
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
      description: 'Freshly baked artisan loaves and whole wheat baguettes ready for community kitchens.'
    },
    {
      id: 'RC-1035',
      title: 'Pediatric Electrolyte Sachets',
      quantity: '15 Care Packs',
      location: 'Mercy Community Health',
      distance: '3.1 km away',
      availableUntil: 'Expires 2026',
      category: 'medicine',
      donor: { name: 'St. Jude Health Mission' },
      image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=800&q=80',
      description: 'Medical-grade oral rehydration packets for clinical shelter relief.'
    },
    {
      id: 'RC-1039',
      title: 'Catering Banquet Hot Trays',
      quantity: '12 Heated Pans',
      location: 'Harbor Convention Hotel',
      distance: '1.9 km away',
      availableUntil: 'Today 7:00 PM',
      category: 'food',
      donor: { name: 'Grand Ballroom Catering' },
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
      description: 'Hot gourmet pasta, roasted vegetable medleys, and rice dishes immediately dispatchable.'
    },
    {
      id: 'RC-1044',
      title: 'Sterile First-Aid Emergency Kits',
      quantity: '8 Trauma Pouches',
      location: 'Civic Volunteer Depot',
      distance: '1.5 km away',
      availableUntil: 'Expires 2028',
      category: 'medicine',
      donor: { name: 'Red Cross Civic Post' },
      image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=800&q=80',
      description: 'Antiseptic wipes, sterile gauze rolls, burn dressings, and surgical tape.'
    }
  ];

  const currentFeatured = featuredList[activeFeaturedIndex % featuredList.length];

  const handleNextFeatured = () => {
    setActiveFeaturedIndex((prev) => (prev + 1) % featuredList.length);
  };

  const handlePrevFeatured = () => {
    setActiveFeaturedIndex((prev) => (prev - 1 + featuredList.length) % featuredList.length);
  };

  const handleOpenRequestModal = (resource) => {
    if (!user) {
      showToast('Please log in or select a demo role to request resources.', 'info');
      navigate('/login');
      return;
    }
    setSelectedResource(resource);
    setRequestQuantity(resource.quantity);
    setIsRequestModalOpen(true);
  };

  const handleConfirmRequest = (e) => {
    e.preventDefault();
    if (!requestPurpose.trim()) {
      showToast('Please describe your purpose for requesting this resource.', 'warning');
      return;
    }

    addRequest({
      donationId: selectedResource.id,
      donationTitle: selectedResource.title,
      category: selectedResource.category,
      requesterId: user.id,
      requesterName: user.name,
      requesterEmail: user.email,
      organization: user.organizationName || 'Community Member',
      purpose: requestPurpose,
      requestedQuantity: requestQuantity || selectedResource.quantity
    });

    showToast(`Request submitted successfully for ${selectedResource.title}! 🎉`, 'success');
    setIsRequestModalOpen(false);
    setRequestPurpose('');
  };

  return (
    <div className="space-y-16 pb-20 page-fade-in text-stone-900 min-h-screen">
      
      {/* ============================================================
          SPATIAL HERO CANVAS (MATCHING USER REFERENCE DESIGN - WARM STONE)
      ============================================================ */}
      <section className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 pt-2">
        <div className="relative rounded-[36px] sm:rounded-[48px] bg-[#f4efe8] border border-[#dfd7cc] shadow-[0_24px_60px_rgba(40,30,20,0.08)] overflow-hidden p-4 sm:p-8 lg:p-10 flex flex-col justify-between min-h-[780px] lg:min-h-[840px]">
          
          {/* Subtle Ambient Architectural Villa Photo Backdrop with Soft Warm Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-20 mix-blend-multiply"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80')`
            }}
          />

          {/* Warm Studio Gradient Lighting */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#f4efe8] via-[#f4efe8]/80 to-transparent pointer-events-none" />
          <div className="absolute top-10 right-20 w-[500px] h-[400px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-20 left-20 w-[400px] h-[300px] bg-amber-500/5 blur-[110px] rounded-full pointer-events-none" />

          {/* Top Canvas Bar: Monogram Sub-tag + Top-Right Metadata (From Reference Image) */}
          <div className="relative z-10 flex items-center justify-between pb-4">
            <div className="hidden sm:flex items-center gap-2 text-stone-500 font-mono text-[10px] uppercase tracking-[0.25em] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              <span>COMMUNITY REDISTRIBUTION PROTOCOL</span>
            </div>

            {/* Top-Right Architecture Style Metadata Pill (Exact Match to Reference Image) */}
            <div className="hidden md:flex flex-col text-right font-mono text-[9px] tracking-[0.25em] text-stone-500 uppercase leading-tight font-semibold">
              <span>REAL-TIME</span>
              <span>SUSTAINABLE</span>
              <span>COMMUNITY</span>
              <span>ZERO-WASTE</span>
            </div>
          </div>

          {/* MAIN HERO GRID: Left Dock + Typography + 3D Scene */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-4">
            
            {/* Left Vertical Pill Dock (Desktop) */}
            <div className="hidden xl:flex lg:col-span-1 justify-start">
              <LeftDock onTrigger3D={() => setCanvas3DMode(canvas3DMode === 'network' ? 'food' : canvas3DMode === 'food' ? 'medicine' : 'network')} />
            </div>

            {/* Typography & Headlines (Reference layout: High-fashion Editorial Serif) */}
            <div className="lg:col-span-6 xl:col-span-5 space-y-6 text-left">
              {/* Architecture of Care Tagline */}
              <div className="inline-flex items-center gap-2 text-stone-600 font-mono text-[11px] uppercase tracking-[0.22em] font-semibold">
                <span>SURPLUS FOOD</span>
                <span className="text-stone-400">—</span>
                <span>CIVIC MEDICINE</span>
                <span className="text-stone-400">—</span>
                <span>ZERO HUNGER</span>
              </div>

              {/* Master Headline (Matches font feeling of "Spaces That Inspire" in Reference Image) */}
              <h1 className="font-editorial text-5xl sm:text-6xl lg:text-7.5xl font-normal tracking-tight leading-[1.0] text-[#1c1917]">
                Spaces That <br />
                <span className="italic font-normal">Sustain Life.</span>
              </h1>

              {/* Subtitle description */}
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-lg font-sans">
                We orchestrate meaningful redistribution networks that bridge verified food surplus and essential medicines directly to local shelters and community health clinics in real-time.
              </p>

              {/* Action Buttons (Matches reference "Explore Our Work" + "Watch Showreel") */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/browse"
                  className="px-6 py-3.5 rounded-full bg-[#201f1e] hover:bg-[#2c2b29] text-white shadow-md text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all group"
                >
                  <span>Explore Our Rescues</span>
                  <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                </Link>

                <button
                  onClick={() => setCanvas3DMode(canvas3DMode === 'network' ? 'food' : canvas3DMode === 'food' ? 'medicine' : 'network')}
                  className="px-5 py-3.5 rounded-full bg-[#f4efe8]/90 hover:bg-[#f4efe8] border border-stone-200/90 text-stone-800 text-xs sm:text-sm font-semibold flex items-center gap-2.5 transition-all group shadow-2xs backdrop-blur-md"
                >
                  <div className="w-7 h-7 rounded-full bg-stone-100 group-hover:bg-emerald-50 text-emerald-700 flex items-center justify-center transition-colors">
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  </div>
                  <span>Watch 3D Showreel</span>
                </button>
              </div>
            </div>

            {/* Right Interactive 3D WebGL Scene */}
            <div className="lg:col-span-6 xl:col-span-6 h-[420px] sm:h-[480px] lg:h-[530px] w-full rounded-3xl bg-[#f4efe8]/50 border border-stone-200/70 relative overflow-hidden backdrop-blur-sm shadow-inner">
              <RescueCanvas3D mode={canvas3DMode} onModeChange={setCanvas3DMode} />
            </div>
          </div>

          {/* ============================================================
              BOTTOM BENTO DECK (DIRECT REPLICA OF THE REFERENCE IMAGE!)
          ============================================================ */}
          <div className="relative z-10 pt-8 grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
            
            {/* 1. BOTTOM-LEFT CARD: Featured Project Capsule (Beige Capsule) */}
            <div className="md:col-span-5 lg:col-span-4 rounded-3xl bg-[#f4efe8]/95 backdrop-blur-xl border border-stone-200/90 p-5 flex flex-col justify-between shadow-[0_12px_32px_rgba(40,30,20,0.06)] space-y-4 hover:border-stone-300 transition-all">
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span className="font-mono text-[10px] tracking-wider uppercase font-bold text-emerald-700">
                  FEATURED RESCUE
                </span>
                <span className="font-mono text-[11px] text-stone-500 font-semibold">
                  0{activeFeaturedIndex + 1} / 0{featuredList.length}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <img
                  src={currentFeatured.image}
                  alt={currentFeatured.title}
                  className="w-20 h-20 rounded-2xl object-cover border border-stone-200 flex-shrink-0 shadow-xs"
                />
                <div className="space-y-1">
                  <h3 className="font-bold text-stone-900 text-sm line-clamp-1">
                    {currentFeatured.title}
                  </h3>
                  <p className="text-xs text-stone-500 line-clamp-1">
                    {currentFeatured.quantity} • {currentFeatured.donor?.name || 'Local Donor'}
                  </p>
                  <Link
                    to={`/resource/${currentFeatured.id}`}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 pt-1"
                  >
                    <span>View Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Bottom Controls: Avatars + Slider Pagination + Arrow Controls (Exact Reference Match) */}
              <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                {/* Stacked Volunteers Avatars */}
                <div className="flex items-center -space-x-2">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=80"
                    alt=""
                    className="w-6 h-6 rounded-full object-cover ring-2 ring-white"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=80"
                    alt=""
                    className="w-6 h-6 rounded-full object-cover ring-2 ring-white"
                  />
                  <div className="w-6 h-6 rounded-full bg-stone-100 text-stone-700 text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                    +18
                  </div>
                </div>

                {/* Pagination indicator dashes (— · · ·) */}
                <div className="flex items-center gap-1.5">
                  {featuredList.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveFeaturedIndex(idx)}
                      className={`transition-all h-1 rounded-full ${
                        idx === activeFeaturedIndex ? 'w-5 bg-stone-900' : 'w-1.5 bg-stone-300 hover:bg-stone-400'
                      }`}
                      title={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Slider Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevFeatured}
                    className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 border border-stone-200 text-stone-700 flex items-center justify-center transition-colors"
                    title="Previous Featured Resource"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextFeatured}
                    className="w-8 h-8 rounded-full bg-[#201f1e] hover:bg-[#2c2b29] text-white flex items-center justify-center transition-colors shadow-xs"
                    title="Next Featured Resource"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* 2. BOTTOM-CENTER CARD: Quick Impact Stats Pill (Frosted Stone Capsule) */}
            <Link
              to="/leaderboard"
              title="View Top Donors & Leaderboard"
              className="md:col-span-7 lg:col-span-5 rounded-3xl bg-[#eae4db]/95 hover:bg-[#e4ddd3] transition-all backdrop-blur-xl border border-[#ded7cc] p-5 flex items-center justify-around shadow-[0_12px_32px_rgba(40,30,20,0.06)] text-center divide-x divide-stone-300/80 group"
            >
              <div className="px-3 flex-1 space-y-1">
                <Utensils className="w-5 h-5 text-amber-700 mx-auto group-hover:scale-110 transition-transform" />
                <div className="text-xl sm:text-2xl font-black text-stone-900">1,240+</div>
                <div className="text-[11px] text-stone-600 font-medium">Meals Rescued</div>
              </div>

              <div className="px-3 flex-1 space-y-1">
                <Boxes className="w-5 h-5 text-emerald-700 mx-auto group-hover:scale-110 transition-transform" />
                <div className="text-xl sm:text-2xl font-black text-stone-900">320+</div>
                <div className="text-[11px] text-stone-600 font-medium">Active Donors 🏆</div>
              </div>

              <div className="px-3 flex-1 space-y-1">
                <Building2 className="w-5 h-5 text-sky-700 mx-auto group-hover:scale-110 transition-transform" />
                <div className="text-xl sm:text-2xl font-black text-stone-900">85+</div>
                <div className="text-[11px] text-stone-600 font-medium">Partner Shelters</div>
              </div>
            </Link>

            {/* 3. BOTTOM-RIGHT CARD: Callout Action Card (Deep Charcoal Luxury Card) */}
            <Link
              to="/donate-food"
              className="md:col-span-12 lg:col-span-3 rounded-3xl bg-[#201f1e] hover:bg-[#2c2b29] text-white p-5 flex flex-col justify-between shadow-xl group transition-all relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-2xl bg-white/10 text-emerald-300 border border-white/15 flex items-center justify-center font-bold">
                  <HandHeart className="w-4 h-4" />
                </div>
                <div className="w-8 h-8 rounded-full bg-[#f4efe8] text-[#201f1e] flex items-center justify-center font-bold group-hover:scale-105 transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              <div className="pt-4 space-y-1">
                <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                  Bring Surplus To Life
                </h4>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Join 180+ local restaurants & clinics redirecting resources today.
                </p>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* ============================================================
          TWO CORE PILLARS (WARM STONE / ALABASTER CARDS)
      ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono font-bold tracking-wider text-emerald-700 uppercase">
            Two Redistribution Pillars
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-normal tracking-tight text-stone-900">
            Choose Your Impact Category
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Dedicated protocols for surplus food rescue and verified medicine redistribution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* FOOD RESCUE PILLAR CARD */}
          <Card3D intensity={8}>
            <div className="h-full rounded-3xl bg-[#f5efe6] p-8 border border-[#e2d7c8] hover:border-amber-400/80 shadow-[0_12px_32px_rgba(40,30,20,0.06)] space-y-6 flex flex-col justify-between transition-all">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-amber-100 border border-amber-200 text-amber-800 flex items-center justify-center text-2xl shadow-xs">
                    🍱
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold text-amber-800 bg-amber-50 border border-amber-200">
                    Instant Claiming
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-black text-stone-900">Food Rescue</h3>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    Help prevent good food from going to waste. Connect fresh surplus meals with food banks and community shelters.
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">Eligible Categories:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {['Prepared Meals', 'Event Leftovers', 'Grocery Surplus', 'Bakery Fresh', 'Packaged Goods'].map((item) => (
                      <span key={item} className="px-2.5 py-1 rounded-xl bg-[#f4efe8] border border-stone-200 text-[11px] text-stone-700 shadow-2xs">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <Link
                to="/donate-food"
                className="w-full py-3.5 px-4 rounded-2xl font-bold text-white bg-amber-700 hover:bg-amber-800 shadow-md text-center text-xs sm:text-sm flex items-center justify-center gap-2 transition-all"
              >
                <Utensils className="w-4 h-4" />
                <span>Donate Food Surplus Now</span>
              </Link>
            </div>
          </Card3D>

          {/* MEDICINE DONATION PILLAR CARD */}
          <Card3D intensity={8}>
            <div className="h-full rounded-3xl bg-[#f0f4f8] p-8 border border-[#d2dfec] hover:border-sky-400/80 shadow-[0_12px_32px_rgba(40,30,20,0.06)] space-y-6 flex flex-col justify-between transition-all">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-sky-100 border border-sky-200 text-sky-800 flex items-center justify-center text-2xl shadow-xs">
                    💊
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold text-sky-800 bg-sky-50 border border-sky-200">
                    Admin Verified
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-black text-stone-900">Medicine Donation</h3>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    Connect unused, unexpired OTC medicines with registered non-profit health units under verification protocols.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#f4efe8] border border-sky-200/80 text-xs text-stone-600 space-y-1 shadow-2xs">
                  <div className="flex items-center gap-1.5 font-bold text-sky-800">
                    <ShieldCheck className="w-4 h-4" />
                    Safety & Compliance Assurance
                  </div>
                  <p className="text-[11px] text-stone-500 leading-relaxed">
                    Medicine donations are subject to batch validity and expiry verification. Controlled substances are strictly prohibited.
                  </p>
                </div>
              </div>

              <Link
                to="/donate-medicine"
                className="w-full py-3.5 px-4 rounded-2xl font-bold text-white bg-sky-700 hover:bg-sky-800 shadow-md text-center text-xs sm:text-sm flex items-center justify-center gap-2 transition-all"
              >
                <Pill className="w-4 h-4" />
                <span>Donate Eligible Medicine</span>
              </Link>
            </div>
          </Card3D>
        </div>
      </section>

      {/* ============================================================
          HOW IT WORKS (4-STEP REDISTRIBUTION ARCHITECTURE)
      ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono font-bold tracking-wider text-emerald-700 uppercase">
            Redistribution Architecture
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-normal tracking-tight text-stone-900">
            How The 4-Step Process Works
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            From surplus identification to physical recipient handover in under 2 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              num: '01',
              title: 'Donate',
              desc: 'List surplus food or unexpired medicine with quantity, pickup location, and expiry details.',
              color: 'text-emerald-700',
              accent: 'border-emerald-200 bg-[#f4f7f4]'
            },
            {
              num: '02',
              title: 'Verify',
              desc: 'Resources are reviewed according to category-specific safety and hygiene guidelines.',
              color: 'text-amber-800',
              accent: 'border-amber-200 bg-[#faf6f0]'
            },
            {
              num: '03',
              title: 'Connect',
              desc: 'Verified local shelters, clinics, or food banks claim the resource for their beneficiaries.',
              color: 'text-sky-800',
              accent: 'border-sky-200 bg-[#f0f5fa]'
            },
            {
              num: '04',
              title: 'Rescue',
              desc: 'The resource is collected and distributed to neighbors in need, preventing municipal landfill waste.',
              color: 'text-teal-800',
              accent: 'border-teal-200 bg-[#f0f7f6]'
            }
          ].map((step) => (
            <Card3D key={step.num} intensity={6}>
              <div className={`h-full rounded-3xl p-6 border shadow-[0_8px_24px_rgba(40,30,20,0.04)] space-y-3 relative flex flex-col justify-between ${step.accent}`}>
                <div>
                  <span className={`text-4xl font-black font-mono ${step.color} block opacity-90`}>
                    {step.num}
                  </span>
                  <h3 className="text-lg font-bold text-stone-900 mt-2">{step.title}</h3>
                  <p className="text-xs text-stone-600 leading-relaxed mt-1">
                    {step.desc}
                  </p>
                </div>
                <div className="pt-2 flex items-center text-[10px] font-mono text-stone-500 font-semibold">
                  <span>STAGE {step.num} COMPLETE</span>
                </div>
              </div>
            </Card3D>
          ))}
        </div>
      </section>

      {/* ============================================================
          FEATURED AVAILABLE RESOURCES MARKETPLACE
      ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-editorial text-2xl sm:text-3xl font-normal text-stone-900">Featured Available Resources</h2>
            <p className="text-xs text-stone-600">Ready for pickup by verified community partners</p>
          </div>
          <Link
            to="/browse"
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 hover:underline"
          >
            <span>View Marketplace</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {donations.slice(0, 3).map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              onRequest={handleOpenRequestModal}
            />
          ))}
        </div>
      </section>

      {/* ============================================================
          REQUEST MODAL
      ============================================================ */}
      <Modal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        title={`Request Resource: ${selectedResource?.title || ''}`}
      >
        <form onSubmit={handleConfirmRequest} className="space-y-4">
          <div className="p-3 rounded-xl bg-stone-100 border border-stone-200 text-xs space-y-1">
            <p className="text-stone-700">
              <strong>Category:</strong> {selectedResource?.category === 'food' ? 'Food Rescue 🍱' : 'Medicine Donation 💊'}
            </p>
            <p className="text-stone-700">
              <strong>Donated By:</strong> {selectedResource?.donor?.name}
            </p>
            <p className="text-stone-700">
              <strong>Available Quantity:</strong> {selectedResource?.quantity}
            </p>
          </div>

          {selectedResource?.category === 'medicine' && (
            <SafetyNotice compact={true} />
          )}

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Quantity Needed
            </label>
            <input
              type="text"
              value={requestQuantity}
              onChange={(e) => setRequestQuantity(e.target.value)}
              className="w-full p-2.5 bg-[#f0eae1] border border-stone-300 text-stone-900 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Organization Purpose / Distribution Plan
            </label>
            <textarea
              rows={3}
              placeholder="Describe how your shelter, kitchen, or clinic will distribute this resource..."
              value={requestPurpose}
              onChange={(e) => setRequestPurpose(e.target.value)}
              className="w-full p-2.5 bg-[#f0eae1] border border-stone-300 text-stone-900 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsRequestModalOpen(false)}
              className="px-4 py-2 text-xs font-bold text-stone-600 hover:text-stone-900 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-[#201f1e] hover:bg-[#2c2b29] rounded-xl shadow-md"
            >
              Submit Request
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
