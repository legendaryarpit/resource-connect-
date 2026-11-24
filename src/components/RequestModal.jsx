import React, { useState } from 'react';
import { X, ShieldCheck, Clock, Calendar, User, Phone, CheckCircle2, Truck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { createRequest } from '../utils/storage';
import { useToast } from '../context/ToastContext';
import { triggerConfetti } from '../utils/helpers';

export default function RequestModal({ resource, onClose, onSuccess }) {
  const { currentUser } = useAuth();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    organizationName: currentUser?.organizationName || currentUser?.name || 'Community Hope Shelter',
    contactPerson: currentUser?.name || 'Authorized Coordinator',
    contactPhone: currentUser?.phone || '+1 (555) 321-7654',
    pickupTime: 'Today at 3:30 PM',
    intendedUse: 'Direct distribution to sheltered families and hot community kitchen meals.',
    volunteerNotes: 'Vehicle Van #2 with temperature-insulated transport cooler.'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      createRequest({
        donationId: resource.id,
        resourceTitle: resource.title,
        category: resource.category,
        organizationId: currentUser?.id,
        organizationName: formData.organizationName,
        contactPerson: formData.contactPerson,
        contactPhone: formData.contactPhone,
        scheduledPickup: formData.pickupTime,
        intendedUse: formData.intendedUse,
        requestedQuantity: resource.quantity,
        volunteerNotes: formData.volunteerNotes
      });

      triggerConfetti();
      showToast(`Resource "${resource.title}" claimed successfully! 🎉`, 'success');
      setIsSubmitting(false);
      if (onSuccess) onSuccess();
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-md animate-fade-in">
      <div className="bg-[#f4efe8] rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-stone-200 max-h-[90vh] overflow-y-auto animate-slide-up text-stone-900">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-stone-900">Claim Resource for Pickup</h3>
              <p className="text-xs text-stone-500">Organization Redistribution Protocol</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Resource Mini Banner */}
        <div className="my-4 p-3.5 rounded-2xl bg-[#f8f5f0] border border-stone-200 flex items-center gap-3">
          <img
            src={resource.image}
            alt=""
            className="w-14 h-14 rounded-xl object-cover border border-stone-200 flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="text-[11px] font-bold text-emerald-700 uppercase tracking-wide">
              {resource.category === 'food' ? '🍱 Food Rescue' : '💊 Eligible Medicine'}
            </div>
            <div className="text-sm font-bold text-stone-900 truncate">{resource.title}</div>
            <div className="text-xs text-stone-500">Quantity: {resource.quantity} • {resource.location}</div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">
              Requesting Organization / Group
            </label>
            <input
              type="text"
              required
              value={formData.organizationName}
              onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-[#fdfbf9] text-stone-900 text-sm focus:bg-[#f0eae1] focus:ring-2 focus:ring-stone-400/30 focus:border-stone-400 outline-none transition"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">
                Field Coordinator / Driver
              </label>
              <input
                type="text"
                required
                value={formData.contactPerson}
                onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-[#fdfbf9] text-stone-900 text-sm focus:bg-[#f0eae1] focus:ring-2 focus:ring-stone-400/30 focus:border-stone-400 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">
                Contact Phone
              </label>
              <input
                type="tel"
                required
                value={formData.contactPhone}
                onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-[#fdfbf9] text-stone-900 text-sm focus:bg-[#f0eae1] focus:ring-2 focus:ring-stone-400/30 focus:border-stone-400 outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">
              Estimated Pickup Time Window
            </label>
            <select
              value={formData.pickupTime}
              onChange={(e) => setFormData({ ...formData, pickupTime: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-[#fdfbf9] text-stone-900 text-sm focus:bg-[#f0eae1] focus:ring-2 focus:ring-stone-400/30 focus:border-stone-400 outline-none transition"
            >
              <option value="Within 1 Hour (Urgent Dispatch)">Within 1 Hour (Urgent Dispatch)</option>
              <option value="Today between 2:00 PM - 4:00 PM">Today between 2:00 PM - 4:00 PM</option>
              <option value="Today between 5:00 PM - 7:00 PM">Today between 5:00 PM - 7:00 PM</option>
              <option value="Tomorrow Morning 9:00 AM - 11:00 AM">Tomorrow Morning 9:00 AM - 11:00 AM</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">
              Beneficiary Distribution Purpose
            </label>
            <textarea
              rows={2}
              required
              value={formData.intendedUse}
              onChange={(e) => setFormData({ ...formData, intendedUse: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-[#fdfbf9] text-stone-900 text-sm focus:bg-[#f0eae1] focus:ring-2 focus:ring-stone-400/30 focus:border-stone-400 outline-none transition"
              placeholder="e.g. Feeding 60 shelter residents; replenishing community clinic..."
            />
          </div>

          <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-start gap-2.5 text-xs text-emerald-900">
            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              By claiming, your organization confirms adherence to sanitary handling and non-commercial redistribution guidelines.
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-full border border-stone-200 text-stone-700 hover:bg-stone-100 text-xs font-semibold transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-full bg-[#201f1e] hover:bg-stone-800 text-white text-xs font-bold shadow-md transition flex items-center gap-2"
            >
              {isSubmitting ? 'Confirming...' : 'Confirm Claim & Schedule'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
