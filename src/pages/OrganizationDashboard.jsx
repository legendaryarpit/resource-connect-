import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  ShieldCheck, 
  Truck, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Utensils, 
  Pill, 
  ArrowRight,
  Compass,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getDonations, getRequests } from '../utils/storage';
import RequestModal from '../components/RequestModal';
import StatusBadge from '../components/StatusBadge';
import { formatTimeRemaining } from '../utils/helpers';

export default function OrganizationDashboard() {
  const { currentUser } = useAuth();
  const [donations, setDonations] = useState([]);
  const [requests, setRequests] = useState([]);
  const [claimingResource, setClaimingResource] = useState(null);

  const loadData = () => {
    setDonations(getDonations());
    setRequests(getRequests());
  };

  useEffect(() => {
    loadData();
    window.addEventListener('rc_storage_changed', loadData);
    return () => window.removeEventListener('rc_storage_changed', loadData);
  }, []);

  const availableResources = donations.filter(d => d.status === 'available');
  const activePickups = requests.filter(r => r.status !== 'collected');
  const completedRescues = requests.filter(r => r.status === 'collected');

  return (
    <div className="min-h-screen bg-slate-950 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-8">
      {/* NGO Header */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-slate-900/20 backdrop-blur-md text-white flex items-center justify-center font-bold text-2xl border border-white/30">
            <Building2 className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{currentUser?.organizationName || 'Hope Community Food Bank'}</h1>
              <span className="bg-slate-900/20 text-white text-xs px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1 border border-white/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified NGO Partner
              </span>
            </div>
            <p className="text-xs text-amber-100 mt-1">
              Field Logistics Operations • Eastside Community Hub, Sector 4
            </p>
          </div>
        </div>

        <Link
          to="/browse"
          className="px-5 py-2.5 rounded-xl bg-slate-900 text-amber-200 hover:bg-amber-950/40 text-xs font-bold transition flex items-center gap-1.5 shadow-md"
        >
          <span>Claim Available Surplus</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800/90 shadow-sm">
          <div className="text-xs font-semibold text-slate-500">Available in Sector</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">{availableResources.length}</div>
          <div className="text-[11px] text-slate-400 mt-1">Ready for pickup</div>
        </div>

        <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800/90 shadow-sm">
          <div className="text-xs font-semibold text-slate-500">Active Fleet Pickups</div>
          <div className="text-2xl font-black text-amber-600 mt-1">{activePickups.length}</div>
          <div className="text-[11px] text-slate-400 mt-1">Dispatched vehicles</div>
        </div>

        <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800/90 shadow-sm">
          <div className="text-xs font-semibold text-slate-500">Completed Rescues</div>
          <div className="text-2xl font-black text-white mt-1">{completedRescues.length + 84}</div>
          <div className="text-[11px] text-slate-400 mt-1">Redistributed this month</div>
        </div>

        <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800/90 shadow-sm">
          <div className="text-xs font-semibold text-slate-500">Cold-Chain Rating</div>
          <div className="text-2xl font-black text-sky-600 mt-1">100%</div>
          <div className="text-[11px] text-slate-400 mt-1">Sanitary compliance</div>
        </div>
      </div>

      {/* Available Near You - Quick Claim Radar */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-sm p-6 sm:p-7 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-emerald-600 animate-spin" style={{ animationDuration: '12s' }} />
            <div>
              <h2 className="text-lg font-bold text-white">Available Surplus Near Your Hub</h2>
              <p className="text-xs text-slate-500">Sorted by distance & perishable countdown</p>
            </div>
          </div>
          <Link to="/browse" className="text-xs font-bold text-emerald-400 hover:underline">
            View All Marketplace Items →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableResources.slice(0, 6).map((item) => {
            const timeInfo = formatTimeRemaining(item.availableUntil || item.expiryDate);
            return (
              <div
                key={item.id}
                className="p-5 rounded-2xl border border-slate-800 hover:border-emerald-300 bg-slate-950/50 hover:bg-slate-900 transition flex flex-col justify-between group space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className={`font-bold px-2 py-0.5 rounded-full ${item.category === 'food' ? 'bg-amber-100 text-amber-300' : 'bg-sky-100 text-sky-300'}`}>
                      {item.category === 'food' ? '🍱 Food' : '💊 Medicine'}
                    </span>
                    <span className="font-semibold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-full">
                      📍 {item.distanceKm || '1.5'} km
                    </span>
                  </div>

                  <h4 className="font-bold text-white text-base group-hover:text-emerald-400 transition line-clamp-1">
                    {item.title}
                  </h4>
                  <div className="text-xs font-semibold text-slate-300">📦 {item.quantity}</div>
                  <p className="text-xs text-slate-500 line-clamp-2">{item.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-800/70 flex items-center justify-between gap-2">
                  {timeInfo && (
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {timeInfo.text}
                    </span>
                  )}
                  <button
                    onClick={() => setClaimingResource(item)}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-sm"
                  >
                    Claim Resource
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Claim Modal */}
      {claimingResource && (
        <RequestModal
          resource={claimingResource}
          onClose={() => setClaimingResource(null)}
          onSuccess={() => loadData()}
        />
      )}
    </div>
  );
}
