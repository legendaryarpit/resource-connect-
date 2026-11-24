import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShieldCheck, Utensils, Pill } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#ded8cf] text-stone-800 pt-16 pb-12 border-t border-stone-300/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-300/80">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#201f1e] flex items-center justify-center text-emerald-400 font-bold shadow-md">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <span className="text-2xl font-black text-stone-900 tracking-tight">
                RescueConnect
              </span>
            </Link>

            <p className="text-stone-600 text-sm leading-relaxed max-w-sm">
              Connecting surplus community resources with verified shelters, food banks, and civic organizations. 
              Reducing environmental waste while empowering neighbors in need.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-emerald-900 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2 max-w-xs shadow-xs">
              <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-700" />
              <span>Civic Trust Verified Platform • Non-Profit Prototype</span>
            </div>
          </div>

          {/* Column 1: Food Rescue */}
          <div className="space-y-3">
            <h4 className="text-stone-900 font-bold text-sm tracking-wider uppercase flex items-center gap-1.5">
              <Utensils className="w-4 h-4 text-amber-700" />
              Food Rescue
            </h4>
            <ul className="space-y-2 text-sm text-stone-600">
              <li>
                <Link to="/browse?category=food" className="hover:text-stone-900 transition-colors">
                  Browse Surplus Meals
                </Link>
              </li>
              <li>
                <Link to="/donate-food" className="hover:text-stone-900 transition-colors">
                  Donate Restaurant Meals
                </Link>
              </li>
              <li>
                <Link to="/donate-food" className="hover:text-stone-900 transition-colors">
                  Bakery & Produce Surplus
                </Link>
              </li>
              <li>
                <Link to="/about#food-safety" className="hover:text-stone-900 transition-colors">
                  Food Handling Protocol
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Medicine Donation */}
          <div className="space-y-3">
            <h4 className="text-stone-900 font-bold text-sm tracking-wider uppercase flex items-center gap-1.5">
              <Pill className="w-4 h-4 text-sky-700" />
              Medicine Donation
            </h4>
            <ul className="space-y-2 text-sm text-stone-600">
              <li>
                <Link to="/browse?category=medicine" className="hover:text-stone-900 transition-colors">
                  Eligible Medications
                </Link>
              </li>
              <li>
                <Link to="/donate-medicine" className="hover:text-stone-900 transition-colors">
                  Donate Unused Medicine
                </Link>
              </li>
              <li>
                <Link to="/about#medicine-safety" className="hover:text-stone-900 transition-colors">
                  Verification Guidelines
                </Link>
              </li>
              <li>
                <Link to="/about#disclaimer" className="hover:text-stone-900 transition-colors">
                  Safety & OTC Regulations
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Platform Portals */}
          <div className="space-y-3">
            <h4 className="text-stone-900 font-bold text-sm tracking-wider uppercase">
              Quick Portals
            </h4>
            <ul className="space-y-2 text-sm text-stone-600">
              <li>
                <Link to="/dashboard" className="hover:text-stone-900 transition-colors">
                  User Dashboard
                </Link>
              </li>
              <li>
                <Link to="/org-dashboard" className="hover:text-stone-900 transition-colors">
                  NGO & Shelter Hub
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-stone-900 transition-colors">
                  Admin Verification Queue
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="hover:text-stone-900 transition-colors font-semibold text-emerald-800 flex items-center gap-1">
                  <span>Top Donors 🏆</span>
                </Link>
              </li>
              <li>
                <Link to="/impact" className="hover:text-stone-900 transition-colors">
                  Community Impact Stats
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright and project badge */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>
            © 2026 RescueConnect. Built as a 1st-Semester Software Engineering Micro-Project.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-emerald-800 font-medium">
              "Rescue resources. Reduce waste. Help communities."
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
