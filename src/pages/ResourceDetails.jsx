import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';
import SafetyNotice from '../components/SafetyNotice';
import SimulatedMap from '../components/SimulatedMap';
import { getDonationById, addRequest } from '../utils/storage';
import { getUrgencyConfig, formatDate, formatDateTime, getTimeRemaining } from '../utils/helpers';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import {
  MapPin,
  Clock,
  Calendar,
  Utensils,
  Pill,
  ShieldCheck,
  Building2,
  Phone,
  Mail,
  ArrowLeft,
  HandHeart,
  AlertCircle,
  Eye,
  Share2
} from 'lucide-react';

export default function ResourceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useToast();

  const [resource, setResource] = useState(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestPurpose, setRequestPurpose] = useState('');
  const [requestQuantity, setRequestQuantity] = useState('');

  useEffect(() => {
    const data = getDonationById(id);
    if (data) {
      setResource(data);
      setRequestQuantity(data.quantity);
    }
  }, [id]);

  if (!resource) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4 text-stone-900">
        <p className="text-stone-500 font-medium">Resource not found or loading...</p>
        <Link
          to="/browse"
          className="px-4 py-2 bg-[#201f1e] text-white font-bold rounded-xl text-xs shadow-xs"
        >
          Back to Browse
        </Link>
      </div>
    );
  }

  const isFood = resource.category === 'food';
  const urgency = getUrgencyConfig(resource.urgency);
  const timeRemaining = isFood ? getTimeRemaining(resource.availableUntil) : null;

  const handleOpenRequestModal = () => {
    if (!user) {
      showToast('Please log in or switch to a demo role to submit a request.', 'info');
      navigate('/login');
      return;
    }
    setIsRequestModalOpen(true);
  };

  const handleConfirmRequest = (e) => {
    e.preventDefault();
    if (!requestPurpose.trim()) {
      showToast('Please describe your intended purpose for requesting this resource.', 'warning');
      return;
    }

    addRequest({
      donationId: resource.id,
      donationTitle: resource.title,
      category: resource.category,
      requesterId: user.id,
      requesterName: user.name,
      requesterEmail: user.email,
      organization: user.organizationName || 'Community Member',
      purpose: requestPurpose,
      requestedQuantity: requestQuantity || resource.quantity
    });

    showToast(`Resource request submitted successfully! 🎉`, 'success');
    setIsRequestModalOpen(false);
    setRequestPurpose('');
    setResource(getDonationById(id));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 page-fade-in text-stone-900">
      
      {/* Back Button */}
      <Link
        to="/browse"
        className="inline-flex items-center gap-2 text-sm font-semibold text-stone-600 hover:text-stone-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Browse Resources
      </Link>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Image & Details (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Image Banner */}
          <div className="relative h-80 sm:h-96 rounded-3xl overflow-hidden shadow-[0_12px_32px_rgba(40,30,20,0.08)] border border-stone-200/90 bg-stone-100">
            <img
              src={resource.image || 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1000&q=80'}
              alt={resource.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold shadow-md backdrop-blur-md ${
                  isFood ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-sky-100 text-sky-900 border border-sky-300'
                }`}
              >
                {isFood ? '🍱 Food Rescue' : '💊 Medicine Donation'}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-md ${urgency.class}`}>
                {urgency.label}
              </span>
            </div>

            <div className="absolute bottom-4 left-4">
              <StatusBadge status={resource.status} />
            </div>
          </div>

          {/* Details Body */}
          <div className="bg-[#f4efe8] rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-[0_8px_24px_rgba(40,30,20,0.04)] space-y-6">
            <div>
              <span className="text-xs font-mono font-bold text-stone-500">Resource ID: {resource.id}</span>
              <h1 className="text-2xl sm:text-3xl font-black text-stone-900 mt-1">{resource.title}</h1>
              <p className="text-xs text-stone-500 mt-1">Posted on {formatDate(resource.createdAt)} • {resource.views || 40} views</p>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">Resource Description</h3>
              <p className="text-sm text-stone-700 leading-relaxed bg-stone-50 p-4 rounded-2xl border border-stone-200/80">
                {resource.description}
              </p>
            </div>

            {/* Category Specific Technical Specs */}
            {isFood ? (
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                  <span className="text-stone-500 block">Food Type</span>
                  <span className="font-bold text-amber-900 text-sm">{resource.foodType || 'Prepared meals'}</span>
                </div>
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                  <span className="text-stone-500 block">Available Until</span>
                  <span className="font-bold text-amber-900 text-sm">{formatDateTime(resource.availableUntil)}</span>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-sky-50 rounded-xl border border-sky-200">
                    <span className="text-stone-500 block">Medicine Form</span>
                    <span className="font-bold text-sky-900 text-sm">{resource.medicineType || 'Tablets'}</span>
                  </div>
                  <div className="p-3 bg-sky-50 rounded-xl border border-sky-200">
                    <span className="text-stone-500 block">Expiry Date</span>
                    <span className="font-bold text-sky-900 text-sm">{formatDate(resource.expiryDate)}</span>
                  </div>
                  <div className="p-3 bg-sky-50 rounded-xl border border-sky-200">
                    <span className="text-stone-500 block">Batch Lot No.</span>
                    <span className="font-bold text-sky-900 text-sm">{resource.batchNumber || 'N/A'}</span>
                  </div>
                </div>

                {resource.storageRequirements && (
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs">
                    <span className="text-stone-500 font-semibold block">Storage Requirements:</span>
                    <span className="text-stone-800 font-medium">{resource.storageRequirements}</span>
                  </div>
                )}
              </div>
            )}

            {!isFood && <SafetyNotice />}

          </div>
        </div>

        {/* Right Column: Donor & Action Card (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Action Box */}
          <div className="bg-[#f4efe8] rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-[0_8px_24px_rgba(40,30,20,0.04)] space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-stone-500">Available Quantity</span>
              <p className="text-3xl font-black text-emerald-700">{resource.quantity}</p>
            </div>

            <div className="space-y-3 text-xs border-t border-b border-stone-100 py-4">
              <div className="flex items-center justify-between">
                <span className="text-stone-500 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  Pickup Location
                </span>
                <span className="font-bold text-stone-900">{resource.location}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-stone-500 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-600" />
                  Proximity
                </span>
                <span className="font-bold text-stone-900">{resource.distance || '1.5 km away'}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-stone-500 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-sky-600" />
                  Verification
                </span>
                <span className="font-bold text-emerald-700 uppercase">{resource.verificationStatus}</span>
              </div>
            </div>

            {/* Primary Action Button */}
            {resource.status === 'available' ? (
              <button
                onClick={handleOpenRequestModal}
                className="w-full py-4 px-6 rounded-2xl font-bold text-white bg-[#201f1e] hover:bg-[#2c2b29] shadow-md transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 text-base"
              >
                <HandHeart className="w-5 h-5 text-emerald-400" />
                Request Resource Now
              </button>
            ) : (
              <div className="p-4 rounded-2xl bg-stone-100 text-center text-xs font-semibold text-stone-600 border border-stone-200">
                This resource is currently marked as <strong className="capitalize text-stone-900">{resource.status}</strong>.
              </div>
            )}
          </div>

          {/* Donor Information Card */}
          <div className="bg-[#f4efe8] rounded-3xl p-6 border border-stone-200/90 shadow-[0_8px_24px_rgba(40,30,20,0.04)] space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">Donor Information</h3>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 border border-emerald-200 font-extrabold text-base flex items-center justify-center shrink-0">
                {resource.donor?.name?.charAt(0) || 'D'}
              </div>
              <div>
                <h4 className="text-base font-bold text-stone-900 flex items-center gap-1.5">
                  {resource.donor?.name || 'Community Donor'}
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </h4>
                <p className="text-xs text-stone-500">{resource.donor?.type || 'Verified Donor'} • ★ {resource.donor?.rating || 4.9} Rating</p>
              </div>
            </div>

            <div className="pt-2 text-xs text-stone-600 space-y-2 border-t border-stone-100">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-stone-400" />
                <span>{resource.donor?.contact || 'Contact details provided upon request approval'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-stone-400" />
                <span>{resource.donor?.phone || '+1 (555) Verified Hotline'}</span>
              </div>
            </div>
          </div>

          {/* Civic Radar & Proximity Telemetry */}
          <SimulatedMap
            location={resource.location}
            distanceKm={parseFloat(resource.distance) || 2.1}
            donor={resource.donor?.name || 'Verified Hub'}
          />
        </div>
      </div>

      {/* Request Modal */}
      <Modal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        title={`Request: ${resource.title}`}
      >
        <form onSubmit={handleConfirmRequest} className="space-y-4">
          <div className="p-3 rounded-xl bg-stone-100 border border-stone-200 text-xs space-y-1">
            <p className="text-stone-700">
              <strong>Item:</strong> {resource.title}
            </p>
            <p className="text-stone-700">
              <strong>Available Quantity:</strong> {resource.quantity}
            </p>
          </div>

          {!isFood && <SafetyNotice compact={true} />}

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Quantity Requested
            </label>
            <input
              type="text"
              value={requestQuantity}
              onChange={(e) => setRequestQuantity(e.target.value)}
              className="w-full p-2.5 bg-[#f0eae1] border border-stone-300 text-stone-900 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Distribution Purpose & Pickup Plan
            </label>
            <textarea
              rows={3}
              placeholder="State how your organization will collect and distribute this item..."
              value={requestPurpose}
              onChange={(e) => setRequestPurpose(e.target.value)}
              className="w-full p-2.5 bg-[#f0eae1] border border-stone-300 text-stone-900 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
              Submit Request
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
