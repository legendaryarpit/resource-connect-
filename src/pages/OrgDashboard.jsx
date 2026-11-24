import React, { useState, useEffect } from 'react';
import StatCard from '../components/StatCard';
import ResourceCard from '../components/ResourceCard';
import Modal from '../components/Modal';
import SafetyNotice from '../components/SafetyNotice';
import { getDonations, getRequests, addRequest } from '../utils/storage';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import {
  Building2,
  Boxes,
  Clock,
  Truck,
  CheckCircle2,
  ShieldCheck,
  Search,
  HandHeart,
  MapPin
} from 'lucide-react';

export default function OrgDashboard() {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [availableResources, setAvailableResources] = useState([]);
  const [myRequests, setMyRequests] = useState([]);

  // Request modal state
  const [selectedResource, setSelectedResource] = useState(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestPurpose, setRequestPurpose] = useState('');
  const [requestQuantity, setRequestQuantity] = useState('');

  const loadData = () => {
    const allDonations = getDonations();
    const allRequests = getRequests();

    const available = allDonations.filter((d) => d.status === 'available' && d.verificationStatus === 'approved');
    const orgReqs = allRequests.filter((r) => r.requesterId === user?.id || r.requesterEmail === user?.email);

    setAvailableResources(available);
    setMyRequests(orgReqs);
  };

  useEffect(() => {
    loadData();
  }, [user]);

  const handleOpenRequestModal = (resource) => {
    setSelectedResource(resource);
    setRequestQuantity(resource.quantity);
    setIsRequestModalOpen(true);
  };

  const handleConfirmRequest = (e) => {
    e.preventDefault();
    if (!requestPurpose.trim()) {
      showToast('Please specify the purpose for requesting this resource.', 'warning');
      return;
    }

    addRequest({
      donationId: selectedResource.id,
      donationTitle: selectedResource.title,
      category: selectedResource.category,
      requesterId: user.id,
      requesterName: user.name,
      requesterEmail: user.email,
      organization: user.organizationName || 'Hope Horizon Care Foundation',
      purpose: requestPurpose,
      requestedQuantity: requestQuantity || selectedResource.quantity
    });

    showToast(`Claim request submitted for ${selectedResource.title}! 🎉`, 'success');
    setIsRequestModalOpen(false);
    setRequestPurpose('');
    loadData();
  };

  const pendingRequestsCount = myRequests.filter((r) => r.status === 'pending').length;
  const activePickupsCount = myRequests.filter((r) => r.status === 'approved').length;
  const completedRescuesCount = myRequests.filter((r) => r.status === 'fulfilled').length + 18;

  return (
    <div className="space-y-8 pb-16 page-fade-in text-stone-900">
      
      {/* Full-width Header Banner (Warm Stone Aesthetic) */}
      <section className="bg-[#f4efe8] border-b border-[#dfd7cc] py-12 px-4 sm:px-6 lg:px-8 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#201f1e] text-white flex items-center justify-center text-2xl shadow-sm font-bold shrink-0">
              <Building2 className="w-8 h-8 text-sky-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-editorial text-3xl sm:text-4xl font-normal tracking-tight text-stone-900">
                  {user?.organizationName || 'Hope Horizon Care Foundation'}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-100 text-sky-800 border border-sky-200 uppercase">
                  Verified NGO
                </span>
              </div>
              <p className="text-xs text-stone-600 mt-1">
                📍 Downtown South Hub • NGO Reg: NGO-883920-US • Verified Partner
              </p>
            </div>
          </div>

          <div className="px-4 py-2 bg-[#f4efe8] border border-stone-200 rounded-2xl text-xs font-semibold text-stone-700 flex items-center gap-2 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Priority Shelter Dispatch Active</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* STATS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Available Resources"
            value={availableResources.length}
            icon={Boxes}
            color="emerald"
            description="Ready for claim near you"
          />
          <StatCard
            title="Pending Requests"
            value={pendingRequestsCount}
            icon={Clock}
            color="amber"
            description="Awaiting donor confirmation"
          />
          <StatCard
            title="Active Pickups"
            value={activePickupsCount}
            icon={Truck}
            color="blue"
            description="Ready for collection"
          />
          <StatCard
            title="Completed Rescues"
            value={completedRescuesCount}
            icon={CheckCircle2}
            color="indigo"
            description="Distributed to community"
          />
        </div>

        {/* AVAILABLE NEAR YOU FEED */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-stone-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-600" />
                Available Resources Near You
              </h2>
              <p className="text-xs text-stone-500">Claim surplus resources directly for your shelter or outreach team</p>
            </div>
          </div>

          {availableResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableResources.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  onRequest={handleOpenRequestModal}
                />
              ))}
            </div>
          ) : (
            <div className="bg-[#f4efe8] rounded-3xl p-12 text-center border border-stone-200 shadow-sm text-stone-500">
              No surplus resources currently available for claiming.
            </div>
          )}
        </div>
      </div>

      {/* Request Modal */}
      <Modal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        title={`Claim: ${selectedResource?.title || ''}`}
      >
        <form onSubmit={handleConfirmRequest} className="space-y-4">
          <div className="p-3 rounded-xl bg-stone-100 border border-stone-200 text-xs space-y-1">
            <p className="text-stone-700">
              <strong>Resource:</strong> {selectedResource?.title}
            </p>
            <p className="text-stone-700">
              <strong>Available Quantity:</strong> {selectedResource?.quantity}
            </p>
            <p className="text-stone-700">
              <strong>Donor:</strong> {selectedResource?.donor?.name}
            </p>
          </div>

          {selectedResource?.category === 'medicine' && <SafetyNotice compact={true} />}

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Quantity Needed
            </label>
            <input
              type="text"
              value={requestQuantity}
              onChange={(e) => setRequestQuantity(e.target.value)}
              className="w-full p-2.5 bg-[#f0eae1] border border-stone-300 text-stone-900 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Distribution Purpose & Beneficiary Group
            </label>
            <textarea
              rows={3}
              placeholder="State how your shelter or outreach team will distribute this resource to people in need..."
              value={requestPurpose}
              onChange={(e) => setRequestPurpose(e.target.value)}
              className="w-full p-2.5 bg-[#f0eae1] border border-stone-300 text-stone-900 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsRequestModalOpen(false)}
              className="px-4 py-2 text-xs font-bold text-stone-600 hover:text-stone-900 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-[#201f1e] hover:bg-[#2c2b29] rounded-xl shadow-md"
            >
              Confirm Claim Request
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
