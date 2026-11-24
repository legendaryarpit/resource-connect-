import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Heart, Lock, Mail, ArrowRight, User, Building2, ShieldCheck, Sparkles } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { login, switchDemoRole } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState('user@rescueconnect.demo');
  const [password, setPassword] = useState('demo123');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const result = login(email, password);
    if (result.success) {
      showToast(`Welcome back, ${result.user.name}! 👋`, 'success');
      if (result.user.role === 'admin') navigate('/admin');
      else if (result.user.role === 'organization') navigate('/org-dashboard');
      else navigate('/dashboard');
    } else {
      setError(result.error);
    }
  };

  const handleQuickDemoClick = (role, demoEmail, label) => {
    setEmail(demoEmail);
    const switched = switchDemoRole(role);
    if (switched) {
      showToast(`Logged in as Demo ${label} (${switched.name})`, 'success');
      if (role === 'admin') navigate('/admin');
      else if (role === 'organization') navigate('/org-dashboard');
      else navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 page-fade-in bg-[#e8e3dc] text-stone-900">
      <div className="max-w-md w-full space-y-8 bg-[#f4efe8] p-8 sm:p-10 rounded-3xl border border-stone-200/90 shadow-[0_16px_40px_rgba(40,30,20,0.06)]">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-[#201f1e] flex items-center justify-center text-emerald-400 font-bold shadow-md">
              <Heart className="w-5 h-5 fill-current" />
            </div>
            <span className="text-2xl font-black text-stone-900">RescueConnect</span>
          </Link>
          <h2 className="font-editorial text-2xl font-normal text-stone-900 pt-2">Sign in to your account</h2>
          <p className="text-xs text-stone-500">Access your donor or organization dashboard</p>
        </div>

        {/* 1-CLICK DEMO ACCOUNTS BOX */}
        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-stone-900 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1 font-mono">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Quick Demo Accounts
            </span>
            <span className="text-[10px] text-stone-400 font-medium">Click to auto-login</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleQuickDemoClick('individual', 'user@rescueconnect.demo', 'Donor')}
              className="p-2.5 rounded-xl bg-[#f0eae1] border border-stone-200 hover:border-emerald-500 hover:bg-emerald-50/50 text-stone-800 text-[11px] font-bold flex flex-col items-center gap-1 transition-colors shadow-2xs"
            >
              <User className="w-4 h-4 text-emerald-600" />
              Individual
            </button>
            <button
              onClick={() => handleQuickDemoClick('organization', 'ngo@rescueconnect.demo', 'NGO')}
              className="p-2.5 rounded-xl bg-[#f0eae1] border border-stone-200 hover:border-sky-500 hover:bg-sky-50/50 text-stone-800 text-[11px] font-bold flex flex-col items-center gap-1 transition-colors shadow-2xs"
            >
              <Building2 className="w-4 h-4 text-sky-600" />
              NGO / Org
            </button>
            <button
              onClick={() => handleQuickDemoClick('admin', 'admin@rescueconnect.demo', 'Admin')}
              className="p-2.5 rounded-xl bg-[#f0eae1] border border-stone-200 hover:border-amber-500 hover:bg-amber-50/50 text-stone-800 text-[11px] font-bold flex flex-col items-center gap-1 transition-colors shadow-2xs"
            >
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              Civic Admin
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700 text-center">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-stone-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-3 bg-stone-50 border border-stone-200 rounded-2xl text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-stone-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-3 bg-stone-50 border border-stone-200 rounded-2xl text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-2xl font-bold text-white bg-[#201f1e] hover:bg-[#2c2b29] shadow-md transition-all text-sm flex items-center justify-center gap-2"
          >
            Sign In
            <ArrowRight className="w-4 h-4 text-emerald-400" />
          </button>
        </form>

        <div className="text-center text-xs text-stone-500 pt-2 border-t border-stone-100">
          Don't have an account?{' '}
          <Link to="/register" className="font-bold text-emerald-800 hover:underline">
            Register here
          </Link>
        </div>

      </div>
    </div>
  );
}
