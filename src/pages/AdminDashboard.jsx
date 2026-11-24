import React, { useState, useEffect } from 'react';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';
import {
  getDonations,
  updateDonationVerification,
  getActivityLogs,
  getUsers
} from '../utils/storage';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { formatDate, formatDateTime } from '../utils/helpers';
import {
  ShieldCheck,
  Users,
  Utensils,
  Pill,
  Building2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
  Activity,
  Award,
  Search,
  MessageSquare
} from 'lucide-react';

export default function AdminDashboard() {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [donations, setDonations] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [activityLogs, setActivityLogs] = useState([]);
  const [activeTab, setActiveTab] = useState('verification');

  // Clarification modal
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noteText, setNoteText] = useState('');

  const loadAdminData = () => {
    const allDonations = getDonations();
    const allUsers = getUsers();
    const logs = getActivityLogs();

    setDonations(allDonations);
    setUsersList(allUsers);
    setActivityLogs(logs);
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  const handleApprove = (id, title) => {
    updateDonationVerification(id, 'approved');
    showToast(`Approved donation listing: "${title}" 🎉`, 'success');
    loadAdminData();
  };

  const handleReject = (id, title) => {
    updateDonationVerification(id, 'rejected');
    showToast(`Rejected donation listing: "${title}"`, 'warning');
    loadAdminData();
  };

  const handleClarify = (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    showToast(`Clarification request sent to donor for ${selectedDonation?.title}`, 'info');
    setIsModalOpen(false);
    setNoteText('');
  };

  // Metric totals
  const pendingQueue = donations.filter((d) => d.verificationStatus === 'pending');
  const foodCount = donations.filter((d) => d.category === 'food').length;
  const medCount = donations.filter((d) => d.category === 'medicine').length;
  const completedCount = donations.filter((d) => d.status === 'completed' || d.status === 'collected').length + 34;

  return (
    <div className="space-y-8 pb-16 page-fade-in text-stone-900">
      
      {/* Full-width Admin Header (Warm Stone Aesthetic) */}
      <section className="bg-[#f4efe8] border-b border-[#dfd7cc] py-12 px-4 sm:px-6 lg:px-8 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#201f1e] text-amber-400 flex items-center justify-center text-2xl shadow-sm font-bold shrink-0">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-editorial text-3xl sm:text-4xl font-normal tracking-tight text-stone-900">
                  Civic Verification Console
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200 uppercase">
                  Admin Control
                </span>
              </div>
              <p className="text-xs text-stone-600 mt-1">
                Logged in as {user?.name || 'Marcus Vance'} ({user?.email}) • Platform Overseer
              </p>
            </div>
          </div>

          <div className="px-4 py-2 bg-[#f4efe8] border border-stone-200 rounded-2xl text-xs text-stone-700 flex items-center gap-2 shadow-xs">
            <Activity className="w-4 h-4 text-emerald-600" />
            <span>System Health: 100% Operational</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* OVERVIEW STATS CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
          <StatCard title="Total Users" value={usersList.length + 42} icon={Users} color="emerald" />
          <StatCard title="Total Listings" value={donations.length} icon={ShieldCheck} color="blue" />
          <StatCard title="Food Surplus" value={foodCount} icon={Utensils} color="amber" />
          <StatCard title="Medicine" value={medCount} icon={Pill} color="blue" />
          <StatCard title="Active Orgs" value={85} icon={Building2} color="indigo" />
          <StatCard title="Completed" value={completedCount} icon={CheckCircle2} color="emerald" />
        </div>

        {/* ADMIN WORKSPACE TABS */}
        <div className="bg-[#f4efe8] rounded-3xl border border-stone-200 shadow-xs overflow-hidden">
          
          {/* Tabs */}
          <div className="flex border-b border-slate-100 bg-slate-50/60 px-6 pt-4 gap-6">
            <button
              onClick={() => setActiveTab('verification')}
              className={`pb-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
                activeTab === 'verification'
                  ? 'border-amber-600 text-amber-900'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Clock className="w-4 h-4 text-amber-600" />
              Verification Queue ({pendingQueue.length})
            </button>
            <button
              onClick={() => setActiveTab('activity')}
              className={`pb-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
                activeTab === 'activity'
                  ? 'border-emerald-600 text-emerald-900'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Activity className="w-4 h-4 text-emerald-600" />
              Recent Activity Feed ({activityLogs.length})
            </button>
            <button
              onClick={() => setActiveTab('all-donations')}
              className={`pb-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
                activeTab === 'all-donations'
                  ? 'border-blue-600 text-blue-900'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              All Platform Donations ({donations.length})
            </button>
          </div>

          {/* Tab 1: Verification Queue */}
          {activeTab === 'verification' && (
            <div className="p-6">
              {pendingQueue.length > 0 ? (
                <div className="space-y-4">
                  {pendingQueue.map((item) => (
                    <div
                      key={item.id}
                      className="p-5 rounded-2xl border border-amber-200 bg-amber-50/30 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-amber-800">{item.id}</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-200 text-amber-900">
                              {item.category}
                            </span>
                            {item.category === 'medicine' && (
                              <span className="text-[10px] text-blue-800 font-semibold bg-blue-100 px-2 py-0.5 rounded">
                                Batch: {item.batchNumber || 'N/A'} • Exp: {formatDate(item.expiryDate)}
                              </span>
                            )}
                          </div>

                          <h4 className="text-base font-bold text-slate-900">{item.title}</h4>
                          <p className="text-xs text-slate-600 max-w-xl leading-relaxed">{item.description}</p>
                          <p className="text-[11px] text-slate-400">
                            Submitted by <strong>{item.donor?.name}</strong> • Location: {item.location}
                          </p>
                        </div>
                      </div>

                      {/* Admin Action Buttons */}
                      <div className="flex items-center gap-2 w-full lg:w-auto justify-end">
                        <button
                          onClick={() => handleApprove(item.id, item.title)}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(item.id, item.title)}
                          className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          Reject
                        </button>
                        <button
                          onClick={() => {
                            setSelectedDonation(item);
                            setIsModalOpen(true);
                          }}
                          className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          Clarification
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center text-slate-500 space-y-2">
                  <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-500" />
                  <h4 className="font-bold text-slate-800 text-base">Verification Queue Clear!</h4>
                  <p className="text-xs text-slate-400">All submitted resources have been reviewed and approved.</p>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Activity Stream Timeline */}
          {activeTab === 'activity' && (
            <div className="p-6">
              <div className="relative pl-6 border-l-2 border-slate-200 space-y-6">
                {activityLogs.map((log) => (
                  <div key={log.id} className="relative group">
                    <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-emerald-500 border-4 border-white shadow-xs" />
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-[#f0eae1] hover:shadow-xs transition-all">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-900">{log.title}</span>
                        <span className="text-slate-400 font-mono">{formatDateTime(log.timestamp)}</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">{log.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: All Platform Donations */}
          {activeTab === 'all-donations' && (
            <div className="p-6">
              <div className="divide-y divide-slate-100">
                {donations.map((item) => (
                  <div key={item.id} className="py-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-slate-400">{item.id}</span>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                        <p className="text-[11px] text-slate-500">{item.donor?.name} • {item.quantity}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <StatusBadge status={item.status} size="sm" />
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        item.verificationStatus === 'approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {item.verificationStatus}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Clarification Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Request Clarification: ${selectedDonation?.title || ''}`}
      >
        <form onSubmit={handleClarify} className="space-y-4">
          <p className="text-xs text-slate-600">
            Send a notification note to <strong>{selectedDonation?.donor?.name}</strong> requesting missing packaging, expiry proof, or storage details.
          </p>

          <textarea
            rows={3}
            placeholder="e.g. Please upload clear photo showing factory foil seal intact..."
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
            required
          />

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-sm"
            >
              Send Request
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
