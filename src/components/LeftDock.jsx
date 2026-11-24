import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  LayoutGrid,
  Package,
  Heart,
  Activity,
  Play,
  User,
  Award
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LeftDock({ onTrigger3D }) {
  const location = useLocation();
  const { user } = useAuth();
  const [isPlaying, setIsPlaying] = useState(false);

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/browse', icon: LayoutGrid, label: 'Marketplace' },
    { path: '/leaderboard', icon: Award, label: 'Top Donors 🏆' },
    { path: '/my-donations', icon: Package, label: 'My Donations' },
    { path: '/my-requests', icon: Heart, label: 'Claims & Pickups' },
    { path: '/impact', icon: Activity, label: 'Community Impact' },
  ];

  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying);
    if (onTrigger3D) onTrigger3D();
  };

  return (
    <aside className="hidden xl:flex flex-col items-center justify-between py-5 px-2.5 rounded-full bg-[#f4efe8]/90 backdrop-blur-xl border border-stone-200/90 shadow-[0_12px_32px_rgba(40,30,20,0.07)] z-30 w-16 my-auto select-none">
      {/* Top Main Action / Active Indicator (Matches dark circle in reference image!) */}
      <Link
        to="/"
        className="w-11 h-11 rounded-full bg-[#201f1e] text-white flex items-center justify-center hover:scale-105 transition-all shadow-md group relative"
        title="Home"
      >
        <Home className="w-5 h-5 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
        <span className="absolute left-full ml-3 px-2.5 py-1 rounded-md bg-[#201f1e] text-stone-100 text-[11px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-md">
          Home
        </span>
      </Link>

      {/* Middle Navigation Stack */}
      <div className="flex flex-col items-center gap-4 py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all relative group ${
                isActive
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-xs'
                  : 'text-stone-500 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="absolute left-full ml-3 px-2.5 py-1 rounded-md bg-[#201f1e] text-stone-100 text-[11px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-md">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>

      {/* User Avatar + Bottom 3D / Showreel Control */}
      <div className="flex flex-col items-center gap-3 pt-2">
        <Link
          to={user?.role === 'admin' ? '/admin' : user?.role === 'organization' ? '/org-dashboard' : '/dashboard'}
          className="relative group"
          title={`Profile (${user?.name || 'Guest'})`}
        >
          <div className="w-9 h-9 rounded-full ring-2 ring-emerald-500/40 overflow-hidden bg-stone-200 flex items-center justify-center">
            {user?.avatar ? (
              <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <User className="w-4 h-4 text-stone-600" />
            )}
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[#f4efe8]" />
          <span className="absolute left-full ml-3 px-2.5 py-1 rounded-md bg-[#201f1e] text-stone-100 text-[11px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-md">
            {user?.name || 'User Profile'}
          </span>
        </Link>

        {/* 3D Action Pill (Matches "Watch Showreel" play icon in reference image!) */}
        <button
          onClick={handlePlayToggle}
          className="w-10 h-10 rounded-full bg-stone-100 hover:bg-emerald-50 border border-stone-200 hover:border-emerald-300 flex flex-col items-center justify-center text-stone-700 hover:text-emerald-700 transition-all group relative"
          title="Interactive 3D View"
        >
          <Play className="w-3.5 h-3.5 fill-current text-emerald-600 ml-0.5" />
          <span className="text-[8px] font-extrabold tracking-tighter text-stone-500 uppercase mt-0.5">3D</span>
          <span className="absolute left-full ml-3 px-2.5 py-1 rounded-md bg-[#201f1e] text-stone-100 text-[11px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-md">
            Toggle 3D Scene
          </span>
        </button>
      </div>
    </aside>
  );
}
