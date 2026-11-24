import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Heart, User, Building2, Mail, Lock, Phone, MapPin, ArrowRight } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'individual',
    organizationName: '',
    phone: '',
    location: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    const result = register(formData);
    if (result.success) {
      showToast(`Account registered successfully! Welcome ${result.user.name} 🎉`, 'success');
      if (result.user.role === 'organization') navigate('/org-dashboard');
      else navigate('/dashboard');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 page-fade-in bg-[#e8e3dc] text-stone-900">
      <div className="max-w-lg w-full space-y-8 bg-[#f4efe8] p-8 sm:p-10 rounded-3xl border border-stone-200/90 shadow-[0_16px_40px_rgba(40,30,20,0.06)]">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-[#201f1e] flex items-center justify-center text-emerald-400 font-bold shadow-md">
              <Heart className="w-5 h-5 fill-current" />
            </div>
            <span className="text-2xl font-black text-stone-900">RescueConnect</span>
          </Link>
          <h2 className="font-editorial text-2xl font-normal text-stone-900 pt-2">Create Your Community Account</h2>
          <p className="text-xs text-stone-500">Join the civic redistribution network</p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700 text-center">
            {error}
          </div>
        )}

        {/* Account Type Selector */}
        <div className="grid grid-cols-2 gap-3 p-1.5 bg-stone-100 rounded-2xl border border-stone-200">
          <button
            type="button"
            onClick={() => setFormData((prev) => ({ ...prev, role: 'individual' }))}
            className={`py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              formData.role === 'individual'
                ? 'bg-[#201f1e] text-white shadow-xs font-extrabold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <User className="w-4 h-4 text-emerald-400" />
            Individual Donor
          </button>
          <button
            type="button"
            onClick={() => setFormData((prev) => ({ ...prev, role: 'organization' }))}
            className={`py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              formData.role === 'organization'
                ? 'bg-[#201f1e] text-white shadow-xs font-extrabold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Building2 className="w-4 h-4 text-sky-400" />
            NGO / Organization
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-stone-700 mb-1">
              Full Name / Primary Contact <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="e.g. Elena Rostova"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 bg-stone-50 border border-stone-200 rounded-2xl text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          {formData.role === 'organization' && (
            <div>
              <label className="block font-bold text-stone-700 mb-1">
                Organization / Non-Profit Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="organizationName"
                placeholder="e.g. Hope Horizon Care Foundation"
                value={formData.organizationName}
                onChange={handleChange}
                className="w-full p-3 bg-stone-50 border border-stone-200 rounded-2xl text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                required={formData.role === 'organization'}
              />
            </div>
          )}

          <div>
            <label className="block font-bold text-stone-700 mb-1">
              Email Address <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="e.g. elena@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 bg-stone-50 border border-stone-200 rounded-2xl text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-stone-700 mb-1">
              Password <span className="text-rose-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 bg-stone-50 border border-stone-200 rounded-2xl text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-stone-700 mb-1">Phone Number</label>
              <input
                type="text"
                name="phone"
                placeholder="+1 (555) 234-5678"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 bg-stone-50 border border-stone-200 rounded-2xl text-sm text-stone-900"
              />
            </div>
            <div>
              <label className="block font-bold text-stone-700 mb-1">Location / District</label>
              <input
                type="text"
                name="location"
                placeholder="Greenwich District"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-3 bg-stone-50 border border-stone-200 rounded-2xl text-sm text-stone-900"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-2xl font-bold text-white bg-[#201f1e] hover:bg-[#2c2b29] shadow-md transition-all text-sm flex items-center justify-center gap-2"
          >
            Create {formData.role === 'organization' ? 'Organization' : 'Individual'} Account
            <ArrowRight className="w-4 h-4 text-emerald-400" />
          </button>
        </form>

        <div className="text-center text-xs text-stone-500 pt-2 border-t border-stone-100">
          Already registered?{' '}
          <Link to="/login" className="font-bold text-emerald-800 hover:underline">
            Log in here
          </Link>
        </div>

      </div>
    </div>
  );
}
