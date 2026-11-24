import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  HeartHandshake, 
  Utensils, 
  Pill, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Award, 
  Sparkles, 
  Truck, 
  TrendingUp,
  FileText,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getDonations, getRequests } from '../utils/storage';
import StatusBadge from '../components/StatusBadge';
import { formatDate } from '../utils/helpers';
import { useToast } from '../context/ToastContext';

export default function Dashboard() {
  const { currentUser } = useAuth();
  const { showToast } = useToast();

  const [donations, setDonations] = useState([]);
  const [requests, setRequests] = useState([]);
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  useEffect(() => {
    const allD = getDonations();
    const allR = getRequests();

    // In demo, show items either matching currentUser.id or all if donor
    setDonations(allD);
    setRequests(allR);

    const handleUpdate = () => {
      setDonations(getDonations());
      setRequests(getRequests());
    };
    window.addEventListener('rc_storage_changed', handleUpdate);
    return () => window.removeEventListener('rc_storage_changed', handleUpdate);
  }, [currentUser]);

  const activeDonations = donations.filter(d => d.status === 'available');
  const requestedDonations = donations.filter(d => d.status === 'requested');
  const completedDonations = donations.filter(d => d.status === 'completed' || d.status === 'collected');

  const mealsRescued = currentUser?.mealsRescued || 47;

  return (
    <div className="min-h-screen bg-slate-950 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-8">
      {/* Welcome Banner */}
      <div className="bg-linear-to-r from-emerald-800 via-teal-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={currentUser?.avatar}
            alt=""
            className="w-16 h-16 rounded-2xl object-cover ring-4 ring-white/20"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">Welcome back, {currentUser?.name}!</h1>
              <span className="bg-emerald-950/400/30 text-emerald-300 text-xs px-2.5 py-0.5 rounded-full font-bold border border-emerald-400/30 capitalize">
                {currentUser?.role}
              </span>
            </div>
            <p className="text-xs text-emerald-100 mt-1">
              Active Community Contributor • {currentUser?.address || 'Downtown Metro'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/donate-food"
            className="px-4 py-2.5 rounded-xl bg-amber-950/400 hover:bg-amber-600 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-amber-500/20"
          >
            <Utensils className="w-3.5 h-3.5" />
            <span>Donate Food</span>
          </Link>
          <Link
            to="/donate-medicine"
            className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-sky-600/20"
          >
            <Pill className="w-3.5 h-3.5" />
            <span>Donate Medicine</span>
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800/90 shadow-sm">
          <div className="text-xs font-semibold text-slate-500">Total Listings</div>
          <div className="text-2xl font-black text-white mt-1">{donations.length}</div>
          <div className="text-[11px] text-slate-400 mt-1">All posted donations</div>
        </div>

        <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800/90 shadow-sm">
          <div className="text-xs font-semibold text-slate-500">Active Listings</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">{activeDonations.length}</div>
          <div className="text-[11px] text-slate-400 mt-1">Open for community claim</div>
        </div>

        <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800/90 shadow-sm">
          <div className="text-xs font-semibold text-slate-500">Scheduled Pickups</div>
          <div className="text-2xl font-black text-amber-600 mt-1">{requestedDonations.length}</div>
          <div className="text-[11px] text-slate-400 mt-1">Claimed by verified NGOs</div>
        </div>

        <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800/90 shadow-sm">
          <div className="text-xs font-semibold text-slate-500">Completed Rescues</div>
          <div className="text-2xl font-black text-purple-600 mt-1">{completedDonations.length + 5}</div>
          <div className="text-[11px] text-slate-400 mt-1">Handed over & distributed</div>
        </div>
      </div>

      {/* Impact Visualization Card */}
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-white rounded-3xl p-6 sm:p-8 border border-emerald-500/30 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-200/60 text-emerald-300 text-xs font-bold">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Personal Impact Milestone</span>
            </div>
            <h3 className="text-2xl font-black text-white">
              You’ve helped rescue <span className="text-emerald-400">{mealsRescued} meals</span> and counting!
            </h3>
            <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
              That equals an estimated <strong>{Math.round(mealsRescued * 2.2)} kg</strong> of greenhouse gas emissions prevented and direct sustenance delivered to shelters in your metro zone.
            </p>

            {/* Progress Bar towards next tier */}
            <div className="pt-2 max-w-md">
              <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                <span>Progress to "Civic Champion" (100 meals)</span>
                <span>{mealsRescued} / 100</span>
              </div>
              <div className="w-full h-3 rounded-full bg-emerald-200 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-600 to-teal-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (mealsRescued / 100) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Certificate Download Button */}
          <button
            onClick={() => setShowCertificateModal(true)}
            className="px-5 py-3 rounded-xl bg-slate-900 border border-emerald-300 text-emerald-300 hover:bg-emerald-950/40 text-xs font-bold transition flex items-center gap-2 shadow-sm flex-shrink-0"
          >
            <FileText className="w-4 h-4 text-emerald-600" />
            <span>Generate Impact Certificate</span>
          </button>
        </div>
      </div>

      {/* Recent Donations Table / Card List */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-sm p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">My Recent Donations</h2>
            <p className="text-xs text-slate-500">Track claim, pickup, and verification status</p>
          </div>
          <Link
            to="/my-donations"
            className="text-xs font-bold text-emerald-400 hover:underline flex items-center gap-1"
          >
            <span>Manage All Donations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-slate-800">
          {donations.slice(0, 5).map((d) => (
            <div key={d.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={d.image}
                  alt=""
                  className="w-12 h-12 rounded-xl object-cover border border-slate-800 flex-shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white hover:text-emerald-400 transition">
                      {d.title}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{d.id}</span>
                  </div>
                  <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                    <span>{d.quantity}</span>
                    <span>•</span>
                    <span>{d.location}</span>
                    <span>•</span>
                    <span>{formatDate(d.createdAt)}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center">
                <StatusBadge status={d.status} />
                <Link
                  to={`/resource/${d.id}`}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-200 text-slate-300 text-xs font-medium transition"
                >
                  Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certificate Modal */}
      {showCertificateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 rounded-3xl max-w-lg w-full p-8 shadow-2xl border-4 border-emerald-500/20 text-center space-y-6 animate-slide-up relative">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-400 flex items-center justify-center mx-auto shadow-md">
              <Award className="w-8 h-8" />
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-emerald-400">Official Certificate of Recognition</div>
              <h3 className="text-2xl font-black text-white mt-1">Community Zero-Waste Hero</h3>
              <p className="text-xs text-slate-500 mt-1">Presented by RescueConnect Civic Initiative</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-2">
              <p className="text-slate-300">
                This certifies that <strong className="text-white">{currentUser?.name}</strong> has redirected valuable surplus, helping rescue <strong>{mealsRescued} meals</strong> for local shelters.
              </p>
              <div className="text-[10px] text-slate-400">Certificate ID: RC-CERT-{Date.now().toString().slice(-6)}</div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setShowCertificateModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-800 text-slate-400 text-xs font-bold hover:bg-slate-950"
              >
                Close
              </button>
              <button
                onClick={() => {
                  showToast('Certificate downloaded to your device! 📄', 'success');
                  setShowCertificatXModal(false);
                }}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
