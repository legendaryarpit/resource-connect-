import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import {
  Heart,
  Utensils,
  Pill,
  Menu,
  X,
  User,
  Building2,
  ShieldCheck,
  Search,
  ArrowUpRight,
  Sparkles,
  LayoutDashboard,
  LogOut,
  ChevronDown
} from 'lucide-react';

export default function Navbar() {
  const { user, logout, switchDemoRole } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRoleSwitch = (role, label) => {
    const switched = switchDemoRole(role);
    if (switched) {
      showToast(`Switched to ${label} account (${switched.name})`, 'info');
      setUserDropdownOpen(false);
      if (role === 'admin') navigate('/admin');
      else if (role === 'organization') navigate('/org-dashboard');
      else navigate('/dashboard');
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 w-full px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
      scrolled
        ? 'bg-[#e8e3dc]/95 backdrop-blur-xl border-b border-[#dfd7cc] shadow-[0_10px_30px_rgba(40,30,20,0.08)] py-2'
        : 'bg-[#e8e3dc]/85 backdrop-blur-md pt-3 pb-2'
    }`}>
      {/* Top Demo Bar Pill */}
      <div className="max-w-7xl mx-auto mb-2 flex items-center justify-between text-xs px-4 py-1.5 rounded-full bg-[#f4efe8]/80 backdrop-blur-md border border-stone-200/80 shadow-xs text-stone-600">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-700 font-bold">
            Redistribution Console
          </span>
          <span className="hidden md:inline text-stone-500 text-[11px]">
            Switch roles to experience from any perspective:
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => handleRoleSwitch('individual', 'Individual Donor')}
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold transition-all flex items-center gap-1 ${
              user?.role === 'individual'
                ? 'bg-[#201f1e] text-white font-bold shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <User className="w-3 h-3 text-emerald-400" />
            Donor
          </button>
          <button
            onClick={() => handleRoleSwitch('organization', 'NGO / Org')}
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold transition-all flex items-center gap-1 ${
              user?.role === 'organization'
                ? 'bg-[#201f1e] text-white font-bold shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <Building2 className="w-3 h-3 text-sky-400" />
            NGO
          </button>
          <button
            onClick={() => handleRoleSwitch('admin', 'Civic Admin')}
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold transition-all flex items-center gap-1 ${
              user?.role === 'admin'
                ? 'bg-[#201f1e] text-white font-bold shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <ShieldCheck className="w-3 h-3 text-amber-400" />
            Admin
          </button>
        </div>
      </div>

      {/* Main Spatial Capsule Bar */}
      <nav className="max-w-7xl mx-auto flex items-center justify-between gap-4 py-1">
        {/* Brand Monogram & Name (Match image top-left style) */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-[#201f1e] flex items-center justify-center text-emerald-400 font-black shadow-md group-hover:scale-105 transition-transform">
            <Heart className="w-5 h-5 fill-current" />
          </div>
          <div>
            <span className="text-base sm:text-lg font-black tracking-tight text-stone-900 flex items-center gap-1.5">
              RESCUE<span className="text-emerald-600">CONNECT</span>
            </span>
            <span className="block text-[9px] font-mono tracking-widest text-stone-500 uppercase -mt-1">
              Civic Redistribution
            </span>
          </div>
        </Link>

        {/* Center Floating Pill Menu (Match image capsule style) */}
        <div className="hidden lg:flex items-center gap-1 p-1.5 rounded-full bg-[#f4efe8]/90 backdrop-blur-xl border border-stone-200/90 shadow-[0_4px_20px_rgba(40,30,20,0.04)]">
          <Link
            to="/"
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              isActive('/')
                ? 'bg-[#201f1e] text-white font-bold shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/70'
            }`}
          >
            Home
          </Link>

          <Link
            to="/browse"
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              isActive('/browse')
                ? 'bg-[#201f1e] text-white font-bold shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/70'
            }`}
          >
            Browse
          </Link>

          <Link
            to="/donate-food"
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              isActive('/donate-food')
                ? 'bg-amber-50 text-amber-800 font-bold border border-amber-200 shadow-xs'
                : 'text-stone-600 hover:text-amber-700 hover:bg-amber-50/50'
            }`}
          >
            Donate Food 🍱
          </Link>

          <Link
            to="/donate-medicine"
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              isActive('/donate-medicine')
                ? 'bg-sky-50 text-sky-800 font-bold border border-sky-200 shadow-xs'
                : 'text-stone-600 hover:text-sky-700 hover:bg-sky-50/50'
            }`}
          >
            Donate Medicine 💊
          </Link>

          <Link
            to="/impact"
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              isActive('/impact')
                ? 'bg-[#201f1e] text-white font-bold shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/70'
            }`}
          >
            Impact
          </Link>

          <Link
            to="/leaderboard"
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              isActive('/leaderboard') || isActive('/top-donors')
                ? 'bg-[#201f1e] text-white font-bold shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/70'
            }`}
          >
            Top Donors 🏆
          </Link>

          <Link
            to="/about"
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              isActive('/about')
                ? 'bg-[#201f1e] text-white font-bold shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/70'
            }`}
          >
            About
          </Link>
        </div>

        {/* Right Action Stack (Search + Capsule CTA Button) */}
        <div className="flex items-center gap-2.5">
          {/* Search Trigger */}
          <Link
            to="/browse"
            className="w-10 h-10 rounded-full bg-[#f4efe8]/90 hover:bg-[#f4efe8] border border-stone-200 flex items-center justify-center text-stone-600 hover:text-stone-900 transition-colors shadow-xs"
            title="Search Surplus Resources"
          >
            <Search className="w-4 h-4" />
          </Link>

          {/* User Account Capsule / Dropdown */}
          <div className="relative">
            {user ? (
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1 pl-2.5 rounded-full bg-[#f4efe8]/90 border border-stone-200 hover:border-stone-300 text-xs font-semibold text-stone-700 transition-all shadow-xs"
              >
                <span className="hidden sm:inline font-medium">{user.name.split(' ')[0]}</span>
                <img
                  src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120'}
                  alt=""
                  className="w-7 h-7 rounded-full object-cover ring-1 ring-emerald-500/40"
                />
                <ChevronDown className="w-3.5 h-3.5 text-stone-500 mr-1" />
              </button>
            ) : (
              <Link
                to="/login"
                className="hidden sm:inline-flex px-3.5 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 rounded-full transition-colors"
              >
                Sign In
              </Link>
            )}

            {/* Dropdown Menu */}
            {userDropdownOpen && user && (
              <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-[#f4efe8] border border-stone-200 shadow-xl p-1.5 text-xs text-stone-700 z-50 animate-fadeIn">
                <div className="px-3 py-2 border-b border-stone-200">
                  <p className="font-bold text-stone-900 truncate">{user.name}</p>
                  <p className="text-[10px] text-stone-500 uppercase font-mono tracking-wider mt-0.5">{user.role}</p>
                </div>
                <div className="py-1">
                  <Link
                    to={user.role === 'admin' ? '/admin' : user.role === 'organization' ? '/org-dashboard' : '/dashboard'}
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-stone-200/60 text-stone-700 hover:text-stone-900 font-medium"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5 text-emerald-600" />
                    Dashboard
                  </Link>
                  <Link
                    to="/my-donations"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-stone-200/60 text-stone-700 hover:text-stone-900 font-medium"
                  >
                    <Utensils className="w-3.5 h-3.5 text-amber-600" />
                    My Donations
                  </Link>
                  <Link
                    to="/my-requests"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-stone-200/60 text-stone-700 hover:text-stone-900 font-medium"
                  >
                    <Heart className="w-3.5 h-3.5 text-sky-600" />
                    My Claims
                  </Link>
                </div>
                <div className="pt-1 border-t border-stone-200">
                  <button
                    onClick={() => {
                      logout();
                      setUserDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-rose-50 text-rose-600 font-medium"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Signature Capsule CTA Button (Match image: black capsule + arrow circle) */}
          <Link
            to="/donate-food"
            className="flex items-center gap-2.5 pl-4 pr-1.5 py-1.5 rounded-full bg-[#201f1e] hover:bg-[#2c2b29] text-white shadow-md transition-all group"
          >
            <span className="text-xs font-bold tracking-tight">Donate Surplus</span>
            <div className="w-7 h-7 rounded-full bg-[#f4efe8] text-[#201f1e] flex items-center justify-center font-bold group-hover:scale-105 transition-all">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </Link>

          {/* Mobile Drawer Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 lg:hidden rounded-full bg-[#f4efe8] border border-stone-200 text-stone-700 hover:text-stone-900"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 p-4 rounded-3xl bg-[#f4efe8]/95 backdrop-blur-2xl border border-stone-200 shadow-xl space-y-3 animate-fadeIn text-stone-800">
          <div className="flex flex-col gap-1">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl text-sm font-semibold hover:bg-stone-100"
            >
              Home
            </Link>
            <Link
              to="/browse"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl text-sm font-semibold hover:bg-stone-100"
            >
              Browse Resources
            </Link>
            <Link
              to="/donate-food"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl text-sm font-semibold text-amber-700 hover:bg-amber-50"
            >
              Donate Food 🍱
            </Link>
            <Link
              to="/donate-medicine"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl text-sm font-semibold text-sky-700 hover:bg-sky-50"
            >
              Donate Medicine 💊
            </Link>
            <Link
              to="/impact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl text-sm font-semibold hover:bg-stone-100"
            >
              Community Impact
            </Link>
            <Link
              to="/leaderboard"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl text-sm font-semibold text-emerald-800 hover:bg-emerald-50 flex items-center gap-2"
            >
              <span>Top Donors & Organizations</span>
              <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">🏆 Hall of Fame</span>
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl text-sm font-semibold hover:bg-stone-100"
            >
              How It Works
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
