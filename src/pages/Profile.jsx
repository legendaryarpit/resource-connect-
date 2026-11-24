import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Award, 
  Sparkles, 
  LogOut, 
  Bell, 
  CheckCircle2 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getSimulatedLocation, setSimulatedLocation } from '../utils/storage';
import { useToast } from '../context/ToastContext';

export default function Profile() {
  const { currentUser, logout, switchRole } = useAuth();
  const { showToast } = useToast();
  const [simLoc, setSimLocState] = useState(getSimulatedLocation());
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleLocationUpdate = (area) => {
    const updated = { area, lat: 40.7128, lng: -74.0060 };
    setSimulatedLocation(updated);
    setSimLocState(updated);
    showToast(`Simulated active sector set to ${area}`, 'success');
  };

  return (
    <div className="min-h-screen bg-[#e8e3dc] py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-8 text-stone-900">
      {/* Profile Banner */}
      <div className="bg-[#f4efe8] rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-[0_8px_24px_rgba(40,30,20,0.04)] flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <img
          src={currentUser?.avatar}
          alt=""
          className="w-24 h-24 rounded-3xl object-cover ring-4 ring-emerald-500/20 shadow-md flex-shrink-0"
        />
        <div className="space-y-2 flex-1 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h1 className="font-editorial text-3xl font-normal text-stone-900">{currentUser?.name}</h1>
            <span className="bg-[#201f1e] text-white text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wide">
              {currentUser?.role}
            </span>
          </div>

          <p className="text-xs text-stone-500">{currentUser?.organizationName || 'Individual Community Donor'}</p>

          <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-stone-600">
            <div className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-stone-400" />
              <span>{currentUser?.email}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-stone-400" />
              <span>{currentUser?.phone}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
              <span>{simLoc.area}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Badges Earned */}
      <div className="bg-[#f4efe8] rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-[0_8px_24px_rgba(40,30,20,0.04)] space-y-4">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-emerald-700" />
          <h2 className="text-lg font-bold text-stone-900">Civic Badges & Recognition</h2>
        </div>
        <p className="text-xs text-stone-500">Earned for consistent quality, verified handovers, and waste prevention</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {(currentUser?.badges || ["Zero-Waste Hero", "Civic Champion"]).map((badge) => (
            <div
              key={badge}
              className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-emerald-700" />
              </div>
              <div>
                <div className="text-xs font-bold text-stone-900">{badge}</div>
                <div className="text-[10px] text-emerald-800 font-semibold">Verified Active Badge</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Location Simulation Settings */}
      <div className="bg-[#f4efe8] rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-[0_8px_24px_rgba(40,30,20,0.04)] space-y-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-emerald-700" />
          <h2 className="text-lg font-bold text-stone-900">Simulated Location Sector</h2>
        </div>
        <p className="text-xs text-stone-500">
          Select your simulated testing sector to test dynamic distance offsets and travel time calculations:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
          {[
            "Downtown Metro District",
            "Eastside Community Hub, Sector 4",
            "Valley Harvest Co-op Zone",
            "West End Health Corridor",
            "North University Campus Area"
          ].map((area) => (
            <button
              key={area}
              onClick={() => handleLocationUpdate(area)}
              className={`p-3 rounded-2xl border text-xs font-semibold text-left transition flex items-center justify-between ${simLoc.area === area ? 'border-emerald-600 bg-emerald-50 text-emerald-900' : 'border-stone-200 hover:border-stone-300 text-stone-700'}`}
            >
              <span>{area}</span>
              {simLoc.area === area && <CheckCircle2 className="w-4 h-4 text-emerald-700" />}
            </button>
          ))}
        </div>
      </div>

      {/* Preferences & Sign Out */}
      <div className="bg-[#f4efe8] rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-[0_8px_24px_rgba(40,30,20,0.04)] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bell className="w-5 h-5 text-stone-400" />
          <div>
            <div className="text-xs font-bold text-stone-900">Urgent Food Expiry & Pickup Alerts</div>
            <div className="text-[11px] text-stone-500">Receive simulated alerts when resources in your sector are under 2h</div>
          </div>
        </div>

        <button
          onClick={() => {
            setNotificationsEnabled(!notificationsEnabled);
            showToast(notificationsEnabled ? 'Alerts muted' : 'Alerts enabled!', 'info');
          }}
          className={`w-12 h-6 flex items-center rounded-full p-1 transition duration-300 ${notificationsEnabled ? 'bg-emerald-700 justify-end' : 'bg-stone-300 justify-start'}`}
        >
          <div className="bg-white w-4 h-4 rounded-full shadow-md transform" />
        </button>
      </div>

      <div className="pt-4 flex justify-end">
        <button
          onClick={logout}
          className="px-5 py-2.5 rounded-2xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition flex items-center gap-1.5"
        >
          <LogOut className="w-4 h-4" />
          <span>Reset Session / Sign Out</span>
        </button>
      </div>
    </div>
  );
}
