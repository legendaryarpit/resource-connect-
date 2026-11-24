import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  Trash2, 
  CheckCircle2, 
  ArrowRight, 
  ExternalLink, 
  Clock, 
  Utensils, 
  Pill,
  Plus
} from 'lucide-react';
import { getDonations, updateDonation, deleteDonation } from '../utils/storage';
import StatusBadge from '../components/StatusBadge';
import ConfirmModal from '../components/ConfirmModal';
import { formatDate } from '../utils/helpers';
import { useToast } from '../context/ToastContext';

export default function MyDonations() {
  const { showToast } = useToast();
  const [donations, setDonations] = useState([]);
  const [tab, setTab] = useState('all');
  const [confirmModal, setConfirmModal] = useState({ open: false, type: '', id: null, title: '' });

  const loadData = () => {
    setDonations(getDonations());
  };

  useEffect(() => {
    loadData();
    window.addEventListener('rc_storage_changed', loadData);
    return () => window.removeEventListener('rc_storage_changed', loadData);
  }, []);

  const handleMarkCollected = (id) => {
    updateDonation(id, { status: 'completed' });
    showToast('Donation status updated to Completed! 🎉', 'success');
    setConfirmModal({ open: false, type: '', id: null, title: '' });
  };

  const handleDelete = (id) => {
    deleteDonation(id);
    showToast('Listing removed from marketplace', 'info');
    setConfirmModal({ open: false, type: '', id: null, title: '' });
  };

  const filtered = donations.filter((d) => {
    if (tab === 'all') return true;
    if (tab === 'available') return d.status === 'available';
    if (tab === 'requested') return d.status === 'requested';
    if (tab === 'completed') return d.status === 'completed' || d.status === 'collected';
    return true;
  });

  return (
    <div className="min-h-screen bg-[#e8e3dc] py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-6 text-stone-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-normal text-stone-900 tracking-tight">Manage My Donations</h1>
          <p className="text-xs text-stone-500 mt-1">Review active surplus listings, update pickup status, or withdraw items.</p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/donate-food"
            className="px-4 py-2 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Donate Food</span>
          </Link>
          <Link
            to="/donate-medicine"
            className="px-4 py-2 rounded-xl bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Donate Medicine</span>
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-3 text-xs font-bold">
        {[
          { id: 'all', label: `All Listings (${donations.length})` },
          { id: 'available', label: `Available (${donations.filter(d => d.status === 'available').length})` },
          { id: 'requested', label: `Claimed / In-Transit (${donations.filter(d => d.status === 'requested').length})` },
          { id: 'completed', label: `Completed (${donations.filter(d => d.status === 'completed' || d.status === 'collected').length})` }
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-3.5 py-1.5 rounded-xl transition ${tab === t.id ? 'bg-[#201f1e] text-white shadow-xs font-bold' : 'text-stone-600 hover:bg-stone-200'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Listings */}
      {filtered.length === 0 ? (
        <div className="bg-[#f4efe8] rounded-3xl border border-stone-200 p-12 text-center max-w-md mx-auto space-y-3 shadow-xs">
          <Package className="w-12 h-12 text-stone-400 mx-auto" />
          <h3 className="font-bold text-stone-900 text-base">No donations in this view</h3>
          <p className="text-xs text-stone-500">You don't have any listings in this filter category.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((d) => (
            <div
              key={d.id}
              className="bg-[#f4efe8] rounded-2xl p-4 sm:p-5 border border-stone-200/90 shadow-[0_4px_16px_rgba(40,30,20,0.03)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-stone-300 transition"
            >
              <div className="flex items-center gap-4">
                <img
                  src={d.image}
                  alt=""
                  className="w-16 h-16 rounded-xl object-cover border border-stone-200 flex-shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-900 text-base">{d.title}</span>
                    <span className="text-[10px] text-stone-400 font-mono">{d.id}</span>
                  </div>
                  <div className="text-xs text-stone-500 flex flex-wrap items-center gap-2 mt-1">
                    <span className="font-semibold text-stone-800">📦 {d.quantity}</span>
                    <span>•</span>
                    <span>{d.category === 'food' ? '🍱 Food' : '💊 Medicine'}</span>
                    <span>•</span>
                    <span>📍 {d.location}</span>
                    <span>•</span>
                    <span>Created: {formatDate(d.createdAt)}</span>
                  </div>
                  {d.claimedBy && (
                    <div className="text-xs text-emerald-700 font-semibold mt-1">
                      Claimed by partner: {d.claimedBy}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end pt-3 md:pt-0 border-t md:border-t-0 border-stone-100">
                <StatusBadge status={d.status} />

                {d.status === 'requested' && (
                  <button
                    onClick={() => setConfirmModal({
                      open: true,
                      type: 'mark_collected',
                      id: d.id,
                      title: `Confirm Handover of "${d.title}"?`
                    })}
                    className="px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition flex items-center gap-1 shadow-xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Mark Handed Over</span>
                  </button>
                )}

                <Link
                  to={`/resource/${d.id}`}
                  className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition"
                  title="View Public Page"
                >
                  <ExternalLink className="w-4 h-4" />
                </Link>

                <button
                  onClick={() => setConfirmModal({
                    open: true,
                    type: 'delete',
                    id: d.id,
                    title: `Remove "${d.title}" listing?`
                  })}
                  className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition"
                  title="Delete Listing"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={confirmModal.open}
        title={confirmModal.title}
        message={
          confirmModal.type === 'delete'
            ? 'Are you sure you want to withdraw this donation? It will no longer be visible on the public redistribution marketplace.'
            : 'Confirming handover records that the organization driver has physically verified and collected these items.'
        }
        confirmText={confirmModal.type === 'delete' ? 'Delete Listing' : 'Confirm Handover'}
        isDanger={confirmModal.type === 'delete'}
        onConfirm={() => {
          if (confirmModal.type === 'delete') handleDelete(confirmModal.id);
          else handleMarkCollected(confirmModal.id);
        }}
        onCancel={() => setConfirmModal({ open: false, type: '', id: null, title: '' })}
      />
    </div>
  );
}
