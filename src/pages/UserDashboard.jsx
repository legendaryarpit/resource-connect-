import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';
import { getDonations, getRequests, updateDonationStatus } from '../utils/storage';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { formatDate } from '../utils/helpers';
import {
  Heart,
  Utensils,
  Pill,
  PlusCircle,
  Award,
  Clock,
  CheckCircle2,
  AlertCircle,
  PackageCheck,
  TrendingUp,
  MapPin
} from 'lucide-react';

export default function UserDashboard() {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [donations, setDonations] = useState([]);
  const [requests, setRequests] = useState([]);
  const [activeTab, setActiveTab] = useState('donations');

  const loadDashboardData = () => {
    const allDonations = getDonations();
    const allRequests = getRequests();

    const myDonations = allDonations.filter(
      (d) => d.donor?.email === user?.email || d.donor?.id === user?.id || user?.role === 'individual'
    );
    const myRequests = allRequests.filter((r) => r.requesterId === user?.id || r.requesterEmail === user?.email);

    setDonations(myDonations);
    setRequests(myRequests);
  };

  useEffect(() => {
    loadDashboardData();
  }, [user]);

  const handleMarkCollected = (id) => {
    updateDonationStatus(id, 'collected');
    showToast('Donation status updated to Collected! 🔵', 'info');
    loadDashboardData();
  };

  const handleMarkCompleted = (id) => {
    updateDonationStatus(id, 'completed');
    showToast('Donation rescue marked as Completed! ⚫ 🎉', 'success');
    loadDashboardData();
  };

  const totalDonationsCount = donations.length;
  const activeCount = donations.filter((d) => d.status === 'available').length;
  const completedCount = donations.filter((d) => d.status === 'completed' || d.status === 'collected').length;
  const requestsCount = requests.length;

  return (
    <div className="space-y-8 pb-16 page-fade-in text-stone-900">
      
      {/* Full-width Welcome Header Banner (Warm Stone Aesthetic) */}
      <section className="bg-[#f4efe8] border-b border-[#dfd7cc] py-12 px-4 sm:px-6 lg:px-8 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80'}
              alt={user?.name}
              className="w-16 h-16 rounded-2xl object-cover ring-4 ring-emerald-500/20 shadow-xs"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-editorial text-3xl sm:text-4xl font-normal tracking-tight text-stone-900">
                  Welcome back, {user?.name.split(' ')[0]}!
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#201f1e] text-white uppercase shadow-xs">
                  {user?.role}
                </span>
              </div>
              <p className="text-xs text-stone-600 mt-1">
                📍 {user?.location || 'Greenwich District'} • Member since {user?.joinedDate || '2026-01'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/donate-food"
              className="px-5 py-3 rounded-full font-bold text-white bg-amber-700 hover:bg-amber-800 shadow-sm transition-all flex items-center gap-1.5 text-xs"
            >
              <PlusCircle className="w-4 h-4" />
              Donate Food
            </Link>
            <Link
              to="/donate-medicine"
              className="px-5 py-3 rounded-full font-bold text-white bg-sky-700 hover:bg-sky-800 shadow-sm transition-all flex items-center gap-1.5 text-xs"
            >
              <Pill className="w-4 h-4" />
              Donate Medicine
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* OVERVIEW STATS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Donations"
            value={totalDonationsCount}
            icon={Heart}
            color="emerald"
            description="Lifetime contributions"
          />
          <StatCard
            title="Active Listings"
            value={activeCount}
            icon={Clock}
            color="amber"
            description="Available in market"
          />
          <StatCard
            title="Completed Rescues"
            value={completedCount}
            icon={CheckCircle2}
            color="blue"
            description="Collected by NGOs"
          />
          <StatCard
            title="My Requests"
            value={requestsCount}
            icon={Award}
            color="indigo"
            description="Claimed resources"
          />
        </div>

        {/* PERSONAL IMPACT HERO HIGHLIGHT */}
        <div className="bg-[#f4efe8] rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-[0_8px_24px_rgba(40,30,20,0.04)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-2xl shadow-xs shrink-0">
              🌱
            </div>
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">Your Civic Impact Milestone</span>
              <h2 className="text-xl font-bold text-stone-900 mt-0.5">
                "You've helped rescue <span className="text-emerald-800 underline font-black">47 meals</span> & prevented 18 kg waste!"
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Top 15% donor badge unlocked in Greenwich District.
              </p>
            </div>
          </div>

          {/* Dynamic Progress Bar */}
          <div className="w-full md:w-64 space-y-1.5">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-stone-700">Level 3 Community Hero</span>
              <span className="text-emerald-800 font-bold">47 / 50 Meals</span>
            </div>
            <div className="w-full h-3 bg-stone-200 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-600 rounded-full w-[94%]" />
            </div>
          </div>
        </div>

        {/* DASHBOARD TABS & LISTINGS */}
        <div className="bg-[#f4efe8] rounded-3xl border border-stone-200/90 shadow-[0_8px_24px_rgba(40,30,20,0.04)] overflow-hidden">
          
          {/* Tab Headers */}
          <div className="flex border-b border-stone-100 bg-stone-50 px-6 pt-4 gap-4">
            <button
              onClick={() => setActiveTab('donations')}
              className={`pb-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
                activeTab === 'donations'
                  ? 'border-emerald-700 text-emerald-800'
                  : 'border-transparent text-stone-500 hover:text-stone-900'
              }`}
            >
              <Heart className="w-4 h-4" />
              My Donations ({donations.length})
            </button>
            <button
              onClick={() => setActiveTab('requests')}
              className={`pb-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
                activeTab === 'requests'
                  ? 'border-emerald-700 text-emerald-800'
                  : 'border-transparent text-stone-500 hover:text-stone-900'
              }`}
            >
              <PackageCheck className="w-4 h-4" />
              My Requests ({requests.length})
            </button>
          </div>

          {/* Tab 1 Content: My Donations */}
          {activeTab === 'donations' && (
            <div className="p-6">
              {donations.length > 0 ? (
                <div className="divide-y divide-stone-100">
                  {donations.map((item) => (
                    <div key={item.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-stone-100 overflow-hidden shrink-0 border border-stone-200">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-stone-400">{item.id}</span>
                            <StatusBadge status={item.status} size="sm" />
                          </div>
                          <h4 className="text-sm font-bold text-stone-900 mt-0.5">{item.title}</h4>
                          <p className="text-xs text-stone-500">
                            {item.quantity} • 📍 {item.location} • Posted {formatDate(item.createdAt)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                        {item.status === 'requested' && (
                          <button
                            onClick={() => handleMarkCollected(item.id)}
                            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs"
                          >
                            Mark Collected 🔵
                          </button>
                        )}
                        {item.status === 'collected' && (
                          <button
                            onClick={() => handleMarkCompleted(item.id)}
                            className="px-3 py-1.5 bg-[#201f1e] hover:bg-[#2c2b29] text-white font-bold text-xs rounded-xl shadow-xs"
                          >
                            Mark Completed ⚫
                          </button>
                        )}
                        <Link
                          to={`/resource/${item.id}`}
                          className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs rounded-xl"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center text-stone-500 space-y-2">
                  <p className="font-semibold text-sm">You haven't listed any donations yet.</p>
                  <Link to="/donate-food" className="inline-block text-xs font-bold text-emerald-800 underline">
                    Donate your first food surplus now
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Tab 2 Content: My Requests */}
          {activeTab === 'requests' && (
            <div className="p-6">
              {requests.length > 0 ? (
                <div className="divide-y divide-stone-100">
                  {requests.map((req) => (
                    <div key={req.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-stone-400">{req.id}</span>
                          <span className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase ${
                            req.status === 'approved' || req.status === 'fulfilled'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {req.status}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-stone-900 mt-0.5">{req.donationTitle}</h4>
                        <p className="text-xs text-stone-500">
                          {req.requestedQuantity} • Purpose: {req.purpose}
                        </p>
                      </div>

                      <div className="text-xs text-stone-400">
                        {req.requestedAt ? formatDate(req.requestedAt) : 'Recently'}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center text-stone-500 space-y-2">
                  <p className="font-semibold text-sm">You haven't requested any resources yet.</p>
                  <Link to="/browse" className="inline-block text-xs font-bold text-emerald-800 underline">
                    Browse active surplus listings
                  </Link>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
