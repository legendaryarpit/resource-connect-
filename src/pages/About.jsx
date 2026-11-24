import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SafetyNotice from '../components/SafetyNotice';
import Card3D from '../components/Card3D';
import { Heart, Utensils, Pill, ShieldCheck, ArrowRight, ChevronDown, CheckCircle2, Award, Sparkles } from 'lucide-react';

export default function About() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: "Who can donate food on RescueConnect?",
      a: "Restaurants, caterers, bakeries, corporate cafeterias, supermarkets, farmers, and individual community members can list surplus food as long as it is stored in hygienic, food-safe containers."
    },
    {
      q: "What medicines are eligible for donation?",
      a: "Only unused, unexpired OTC medications, supplements, and first-aid care kits with intact factory seals can be listed. Controlled substances and prescription drugs cannot be transferred between individuals."
    },
    {
      q: "How does organization verification work?",
      a: "Non-profit shelters, food banks, and medical outreach teams register with their tax/NGO identification. Civic admins verify credentials before granting priority pickup claim privileges."
    },
    {
      q: "Is there any fee to use RescueConnect?",
      a: "No! RescueConnect is a 100% free community platform built to reduce environmental waste and support social welfare."
    }
  ];

  return (
    <div className="space-y-16 pb-16 page-fade-in text-stone-900">
      
      {/* Full-width Header Banner (Warm Stone Aesthetic) */}
      <section className="bg-[#f4efe8] border-b border-[#dfd7cc] py-12 px-4 sm:px-6 lg:px-8 shadow-xs">
        <div className="max-w-7xl mx-auto space-y-4 text-center">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            About RescueConnect Platform
          </span>
          <h1 className="font-editorial text-4xl sm:text-6xl font-normal tracking-tight text-stone-900">
            "Rescue resources. Reduce waste. Help communities."
          </h1>
          <p className="text-stone-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            RescueConnect is a modern civic-tech platform that redirects surplus food and eligible unused medicine to verified non-profit organizations and neighbors in need.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* 4-STEP DETAILED WORKFLOW */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900">How The Redistribution Workflow Operates</h2>
            <p className="text-xs sm:text-sm text-stone-600">End-to-end civic care in 4 simple stages</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card3D intensity={8}>
              <div className="h-full bg-[#f4efe8] rounded-3xl p-6 border border-stone-200/90 hover:border-emerald-300 shadow-[0_8px_24px_rgba(40,30,20,0.04)] space-y-3 relative flex flex-col justify-between">
                <div>
                  <span className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 font-black text-sm flex items-center justify-center">01</span>
                  <h3 className="text-base font-bold text-stone-900 mt-3">01 — Donate</h3>
                  <p className="text-xs text-stone-600 leading-relaxed mt-1">
                    List surplus food or unexpired medicine resources with quantity, location, and packaging notes.
                  </p>
                </div>
              </div>
            </Card3D>

            <Card3D intensity={8}>
              <div className="h-full bg-[#f4efe8] rounded-3xl p-6 border border-stone-200/90 hover:border-amber-300 shadow-[0_8px_24px_rgba(40,30,20,0.04)] space-y-3 relative flex flex-col justify-between">
                <div>
                  <span className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 font-black text-sm flex items-center justify-center">02</span>
                  <h3 className="text-base font-bold text-stone-900 mt-3">02 — Verify</h3>
                  <p className="text-xs text-stone-600 leading-relaxed mt-1">
                    The resource is reviewed according to category-specific hygiene and expiration rules.
                  </p>
                </div>
              </div>
            </Card3D>

            <Card3D intensity={8}>
              <div className="h-full bg-[#f4efe8] rounded-3xl p-6 border border-stone-200/90 hover:border-sky-300 shadow-[0_8px_24px_rgba(40,30,20,0.04)] space-y-3 relative flex flex-col justify-between">
                <div>
                  <span className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-700 font-black text-sm flex items-center justify-center">03</span>
                  <h3 className="text-base font-bold text-stone-900 mt-3">03 — Connect</h3>
                  <p className="text-xs text-stone-600 leading-relaxed mt-1">
                    A verified shelter or community partner requests or claims the item for their beneficiaries.
                  </p>
                </div>
              </div>
            </Card3D>

            <Card3D intensity={8}>
              <div className="h-full bg-[#f4efe8] rounded-3xl p-6 border border-stone-200/90 hover:border-teal-300 shadow-[0_8px_24px_rgba(40,30,20,0.04)] space-y-3 relative flex flex-col justify-between">
                <div>
                  <span className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-700 font-black text-sm flex items-center justify-center">04</span>
                  <h3 className="text-base font-bold text-stone-900 mt-3">04 — Rescue</h3>
                  <p className="text-xs text-stone-600 leading-relaxed mt-1">
                    The resource is collected and redirected to people in need, preventing municipal landfill waste.
                  </p>
                </div>
              </div>
            </Card3D>
          </div>
        </div>

        {/* SAFETY & COMPLIANCE SECTION */}
        <div id="medicine-safety" className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900">Safety & Verification Protocols</h2>
          <SafetyNotice />
        </div>

        {/* FAQ ACCORDION */}
        <div className="bg-[#f4efe8] rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-[0_8px_24px_rgba(40,30,20,0.04)] space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-stone-900">Frequently Asked Questions</h2>
            <p className="text-xs text-stone-500 mt-1">Common questions about resource redistribution</p>
          </div>

          <div className="divide-y divide-stone-100">
            {faqs.map((faq, idx) => (
              <div key={idx} className="py-4">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between text-left text-sm font-bold text-stone-900 hover:text-emerald-700 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <p className="text-xs text-stone-600 leading-relaxed mt-2 pt-1 animate-fadeIn">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
