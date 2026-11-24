import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Truck, 
  MapPin, 
  Clock, 
  Phone, 
  CheckCircle2, 
  Package, 
  Building2, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { getRequests, updateRequest, updateDonation, getDonationById } from '../utils/storage';
import StatusBadge from '../components/StatusBadge';
import { formatDate } from '../utils/helpers';
import { useToast } from '../context/ToastContext';

export default function MyRequests() {
  const { showToast } = useToast();
  const [requests, setRequests] = useState([]);

  const loadRequests = () => {
    setRequests(getRequests());
  };

  useEffect(() => {
    loadRequests();
    window.addEventListener('rc_storage_changed', loadRequests);
    return () => window.removeEventListener('rc_storage_changed', loadRequests);
  }, []);

  const handleCompletePickup = (req) => {
    updateRequest(req.id, { status: 'collected' });
    if (req.donationId) {
      updateDonation(req.donationId, { status: 'completed' });
    }
    showToast(`Pickup for "${req.resourceTitle}" completed and logged! 🎉`, 'success');
  };

  return (
    <div className="min-h-screen bg-[#e8e3dc] py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-6 text-stone-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider font-mono">
            <Truck className="w-4 h-4" />
            <span>Community Logistics Hub</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-normal text-stone-900 tracking-tight">Active Resource Claims & Pickups</h1>
          <p className="text-xs text-stone-500 mt-1">Track scheduled pickups, field coordinators, and confirmed handovers.</p>
        </div>

        <Link
          to="/browse"
          className="px-4 py-2 rounded-xl bg-[#201f1e] hover:bg-[#2c2b29] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm self-start sm:self-auto"
        >
          <span>Claim More Surplus</span>
          <ArrowRight className="w-4 h-4 text-emerald-400" />
        </Link>
      </div>

      {requests.length === 0 ? (
        <div className="bg-[#f4efe8] rounded-3xl border border-stone-200 p-12 text-center max-w-md mx-auto space-y-3 shadow-xs">
          <Package className="w-12 h-12 text-stone-400 mx-auto" />
          <h3 className="font-bold text-stone-900 text-base">No active requests</h3>
          <p className="text-xs text-stone-500">You have not claimed any resources yet.</p>
          <Link
            to="/browse"
            className="inline-block px-4 py-2 rounded-xl bg-[#201f1e] text-white text-xs font-bold hover:bg-[#2c2b29] transition"
          >
            Browse Resources
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => {
            const donation = req.donationId ? getDonationById(req.donationId) : null;
            return (
              <div
                key={req.id}
                className="bg-[#f4efe8] rounded-3xl p-6 border border-stone-200/90 shadow-[0_8px_24px_rgba(40,30,20,0.04)] space-y-4 hover:border-stone-300 transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-stone-900 text-base">{req.resourceTitle}</h3>
                        <span className="text-[10px] text-stone-400 font-mono">{req.id}</span>
                      </div>
                      <div className="text-xs text-stone-500 mt-0.5">
                        Claimed by: <strong className="text-stone-800">{req.organizationName}</strong> • {formatDate(req.requestedAt)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <StatusBadge status={req.status === 'collected' ? 'completed' : 'requested'} />
                    {req.status !== 'collected' && (
                      <button
                        onClick={() => handleCompletePickup(req)}
                        className="px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition flex items-center gap-1 shadow-xs"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Confirm Delivered</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200">
                    <span className="text-stone-500 font-medium block">Scheduled Pickup:</span>
                    <strong className="text-stone-900 flex items-center gap-1.5 mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      {req.scheduledPickup || 'Today at 3:00 PM'}
                    </strong>
                  </div>

                  <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200">
                    <span className="text-stone-500 font-medium block">Assigned Volunteer / Driver:</span>
                    <strong className="text-stone-900 block mt-0.5">
                      {req.contactPerson || 'Field Volunteer'} ({req.contactPhone || 'Contact verified'})
                    </strong>
                  </div>

                  <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200">
                    <span className="text-stone-500 font-medium block">Handover Location:</span>
                    <strong className="text-stone-900 flex items-center gap-1 mt-0.5 truncate">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span className="truncate">{donation?.location || 'Central Metro Hub'}</span>
                    </strong>
                  </div>
                </div>

                {/* Purpose Note */}
                {req.intendedUse && (
                  <div className="text-xs text-stone-600 bg-emerald-50/60 p-3 rounded-2xl border border-emerald-200">
                    <strong className="text-emerald-900">Beneficiary Distribution: </strong>
                    {req.intendedUse}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
