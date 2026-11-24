import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ResourceCard from '../components/ResourceCard';
import SafetyNotice from '../components/SafetyNotice';
import Card3D from '../components/Card3D';
import { addDonation } from '../utils/storage';
import { validateMedicineDonation } from '../utils/validation';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Pill, ShieldCheck, Sparkles, Upload, AlertOctagon, CheckCircle2 } from 'lucide-react';

export default function DonateMedicine() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useToast();

  const defaultFutureExpiry = new Date();
  defaultFutureExpiry.setFullYear(defaultFutureExpiry.getFullYear() + 1);

  const [formData, setFormData] = useState({
    title: '',
    genericName: '',
    medicineType: 'Tablets',
    quantity: '',
    numericQuantity: 10,
    expiryDate: defaultFutureExpiry.toISOString().split('T')[0],
    batchNumber: '',
    storageRequirements: 'Store below 25°C in a dry place',
    description: '',
    location: user?.location || 'Westside Community Pharmacy Depot',
    contactPhone: user?.phone || '+1 (555) 889-0011',
    contactEmail: user?.email || 'pharma@rescueconnect.demo',
    urgency: 'medium',
    agreedToTerms: false,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80'
  });

  const [errors, setErrors] = useState({});
  const [submittedDonation, setSubmittedDonation] = useState(null);

  const sampleImages = [
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1550572017-edf70612072c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=800&q=80'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleImageFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validateMedicineDonation(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      showToast('Medicine submission validation failed. Please check critical warnings.', 'error');
      return;
    }

    const created = addDonation({
      category: 'medicine',
      ...formData,
      donor: {
        id: user?.id || `usr-${Date.now()}`,
        name: user?.name || 'Licensed Pharmacy / Donor',
        type: user?.role === 'organization' ? 'Verified Org' : 'Individual',
        rating: 5.0,
        contact: formData.contactEmail,
        phone: formData.contactPhone
      }
    });

    setSubmittedDonation(created);
    showToast(`Medicine donation submitted for verification! 🎉 ID: ${created.id}`, 'success');
  };

  const previewResource = {
    id: 'RC-MED-PREVIEW',
    category: 'medicine',
    title: formData.title || 'Paracetamol 500mg (Unopened)',
    medicineType: formData.medicineType,
    quantity: formData.quantity || '10 Sealed Strips',
    description: formData.description || 'Enter details to preview medicine card...',
    location: formData.location || 'Community Clinic',
    expiryDate: formData.expiryDate,
    urgency: formData.urgency,
    status: 'available',
    donor: { name: user?.name || 'Pharmacy / Donor', type: 'Donor' },
    image: formData.image,
    distance: '2.4 km away'
  };

  return (
    <div className="space-y-8 pb-16 page-fade-in text-stone-900">
      
      {/* Full-width Header Banner (Warm Stone Aesthetic) */}
      <section className="bg-[#f4efe8] border-b border-[#dfd7cc] py-12 px-4 sm:px-6 lg:px-8 shadow-xs">
        <div className="max-w-7xl mx-auto space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-800 flex items-center gap-1.5">
            <Pill className="w-4 h-4 text-sky-600" />
            Verified Medicine Redistribution Portal
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl font-normal tracking-tight text-stone-900">
            Donate Eligible Medicine
          </h1>
          <p className="text-sm text-stone-600 max-w-2xl">
            Redirect unopened, unexpired, legally eligible medicines to verified clinics, shelters, and non-profit healthcare units.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* COMPREHENSIVE SAFETY BANNER */}
        <SafetyNotice />

        {/* SUCCESS STATE */}
        {submittedDonation ? (
          <div className="bg-[#f4efe8] rounded-3xl p-10 border border-sky-200 shadow-[0_12px_32px_rgba(40,30,20,0.06)] text-center max-w-2xl mx-auto space-y-6 animate-fadeIn">
            <div className="w-20 h-20 mx-auto rounded-full bg-sky-100 text-sky-800 flex items-center justify-center text-3xl shadow-inner">
              💊
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 bg-sky-100 text-sky-800 font-mono text-xs font-bold rounded-full">
                Submission ID: {submittedDonation.id}
              </span>
              <h2 className="text-2xl font-bold text-stone-900">Medicine Submitted for Verification! 🛡️</h2>
              <p className="text-stone-600 text-sm max-w-md mx-auto">
                Thank you for your civic contribution. Our admin pharmacists will verify batch details within 2 hours before releasing to verified non-profit health units.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-left text-xs space-y-1">
              <p className="text-stone-700"><strong>Medicine:</strong> {submittedDonation.title}</p>
              <p className="text-stone-700"><strong>Expiry Date:</strong> {submittedDonation.expiryDate}</p>
              <p className="text-stone-700"><strong>Batch No:</strong> {submittedDonation.batchNumber || 'Under Review'}</p>
              <p className="text-stone-700"><strong>Status:</strong> <span className="text-amber-700 font-semibold">Pending Verification</span></p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  setSubmittedDonation(null);
                  setFormData({
                    title: '',
                    genericName: '',
                    medicineType: 'Tablets',
                    quantity: '',
                    numericQuantity: 10,
                    expiryDate: defaultFutureExpiry.toISOString().split('T')[0],
                    batchNumber: '',
                    storageRequirements: 'Store below 25°C in a dry place',
                    description: '',
                    location: user?.location || 'Westside Community Pharmacy Depot',
                    contactPhone: user?.phone || '+1 (555) 889-0011',
                    contactEmail: user?.email || 'pharma@rescueconnect.demo',
                    urgency: 'medium',
                    agreedToTerms: false,
                    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80'
                  });
                }}
                className="w-full sm:w-auto px-6 py-3 font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl text-xs"
              >
                Submit Another Item
              </button>
              <button
                onClick={() => navigate('/browse')}
                className="w-full sm:w-auto px-6 py-3 font-bold text-white bg-[#201f1e] hover:bg-[#2c2b29] rounded-xl text-xs shadow-md"
              >
                View Marketplace
              </button>
            </div>
          </div>
        ) : (
          /* MEDICINE FORM & LIVE PREVIEW */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Form Column (7 cols) */}
            <div className="lg:col-span-7 bg-[#f4efe8] rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-[0_8px_24px_rgba(40,30,20,0.04)] space-y-6">
              <div className="border-b border-stone-100 pb-4">
                <h2 className="text-xl font-bold text-stone-900">Medicine Donation Details</h2>
                <p className="text-xs text-stone-500">All submissions are reviewed for safety, legal compliance, and sealed packaging.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 text-xs">
                {/* Brand / Product Name */}
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Medicine / Brand Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="e.g. Paracetamol 500mg, Amoxicillin Oral Suspension"
                    value={formData.title}
                    onChange={handleChange}
                    className={`w-full p-3 bg-stone-50 border rounded-2xl text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                      errors.title ? 'border-rose-400' : 'border-stone-200'
                    }`}
                  />
                  {errors.title && <p className="text-rose-500 text-[11px] mt-1">{errors.title}</p>}
                </div>

                {/* Generic Active Salt Name */}
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Generic Composition / Salt Name
                  </label>
                  <input
                    type="text"
                    name="genericName"
                    placeholder="e.g. Acetaminophen, Ibuprofen IP"
                    value={formData.genericName}
                    onChange={handleChange}
                    className="w-full p-3 bg-stone-50 border border-stone-200 rounded-2xl text-sm text-stone-900"
                  />
                </div>

                {/* Grid: Type & Quantity */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">
                      Dosage Form / Type <span className="text-rose-500">*</span>
                    </label>
                    <select
                      name="medicineType"
                      value={formData.medicineType}
                      onChange={handleChange}
                      className="w-full p-3 bg-stone-50 border border-stone-200 rounded-2xl text-sm font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      <option value="Tablets">Tablets (Blister packs)</option>
                      <option value="Capsules">Capsules (Sealed bottle/pack)</option>
                      <option value="Syrup">Syrup (Unbroken seal)</option>
                      <option value="Cream">Ointment / Cream (Sealed tube)</option>
                      <option value="Inhaler">Inhaler / Respules</option>
                      <option value="Other">Other OTC First Aid Supplies</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">
                      Quantity & Units <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="quantity"
                      placeholder="e.g. 5 unopened strips (50 tabs)"
                      value={formData.quantity}
                      onChange={handleChange}
                      className={`w-full p-3 bg-stone-50 border rounded-2xl text-sm text-stone-900 ${
                        errors.quantity ? 'border-rose-400' : 'border-stone-200'
                      }`}
                    />
                    {errors.quantity && <p className="text-rose-500 text-[11px] mt-1">{errors.quantity}</p>}
                  </div>
                </div>

                {/* CRITICAL: Expiry Date Validation */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">
                      Expiry Date (MM/YYYY or YYYY-MM-DD) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      className={`w-full p-3 bg-stone-50 border rounded-2xl text-sm font-semibold text-stone-900 ${
                        errors.expiryDate ? 'border-rose-400 bg-rose-50 text-rose-800' : 'border-stone-200'
                      }`}
                    />
                    {errors.expiryDate ? (
                      <p className="text-rose-600 font-bold text-[11px] mt-1 flex items-center gap-1">
                        <AlertOctagon className="w-3.5 h-3.5 text-rose-600" />
                        {errors.expiryDate}
                      </p>
                    ) : (
                      <p className="text-emerald-700 text-[10px] mt-1 font-semibold">✓ Expiry date is unexpired and eligible</p>
                    )}
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">
                      Batch / Lot Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="batchNumber"
                      placeholder="e.g. B-88902A"
                      value={formData.batchNumber}
                      onChange={handleChange}
                      className={`w-full p-3 bg-stone-50 border rounded-2xl text-sm text-stone-900 ${
                        errors.batchNumber ? 'border-rose-400' : 'border-stone-200'
                      }`}
                    />
                    {errors.batchNumber && <p className="text-rose-500 text-[11px] mt-1">{errors.batchNumber}</p>}
                  </div>
                </div>

                {/* Storage Instructions */}
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Storage Requirements</label>
                  <input
                    type="text"
                    name="storageRequirements"
                    placeholder="e.g. Store below 25°C, keep refrigerated at 2-8°C..."
                    value={formData.storageRequirements}
                    onChange={handleChange}
                    className="w-full p-3 bg-stone-50 border border-stone-200 rounded-2xl text-sm text-stone-900"
                  />
                </div>

                {/* Packaging & Seal Integrity */}
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Packaging & Condition Notes <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    rows={2}
                    placeholder="Confirm intact blister seals, original manufacturer carton, outer foil intactness..."
                    value={formData.description}
                    onChange={handleChange}
                    className={`w-full p-3 bg-stone-50 border rounded-2xl text-sm text-stone-900 ${
                      errors.description ? 'border-rose-400' : 'border-stone-200'
                    }`}
                  />
                  {errors.description && <p className="text-rose-500 text-[11px] mt-1">{errors.description}</p>}
                </div>

                {/* Location & Urgency */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Donation Handover Location</label>
                    <input
                      type="text"
                      name="location"
                      placeholder="e.g. Westside Clinic Pharmacy Depot"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full p-3 bg-stone-50 border border-stone-200 rounded-2xl text-sm text-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Clinic Demand / Urgency</label>
                    <select
                      name="urgency"
                      value={formData.urgency}
                      onChange={handleChange}
                      className="w-full p-3 bg-stone-50 border border-stone-200 rounded-2xl text-sm text-stone-900"
                    >
                      <option value="medium">Medium</option>
                      <option value="urgent">Urgent Clinic Demand</option>
                      <option value="high">High Priority</option>
                      <option value="low">Standard Stock</option>
                    </select>
                  </div>
                </div>

                {/* Terms Checkbox */}
                <div className={`p-4 rounded-2xl border transition-all ${
                  errors.agreedToTerms ? 'bg-rose-50 border-rose-300' : 'bg-sky-50 border-sky-200'
                }`}>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="agreedToTerms"
                      checked={formData.agreedToTerms}
                      onChange={handleChange}
                      className="mt-1 w-4 h-4 text-sky-600 rounded focus:ring-sky-500"
                    />
                    <span className="text-stone-700 leading-relaxed text-xs">
                      I confirm that this medication is <strong>unopened, unexpired, un-tampered</strong>, and legally eligible for organization handling.
                    </span>
                  </label>
                  {errors.agreedToTerms && <p className="text-rose-600 font-bold text-[11px] mt-1.5 pl-7">{errors.agreedToTerms}</p>}
                </div>

                {/* Image Picker */}
                <div className="space-y-2">
                  <label className="block font-bold text-stone-700">Packaging Photo</label>
                  <div className="flex items-center gap-3">
                    <label className="cursor-pointer px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold rounded-xl flex items-center gap-2 border border-stone-200">
                      <Upload className="w-4 h-4 text-sky-600" />
                      Upload Photo
                      <input type="file" accept="image/*" onChange={handleImageFile} className="hidden" />
                    </label>
                    <span className="text-stone-500">or pick sample:</span>
                  </div>
                  <div className="flex gap-2 pt-1">
                    {sampleImages.map((img, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, image: img }))}
                        className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                          formData.image === img ? 'border-sky-600 scale-105 shadow' : 'border-transparent opacity-60'
                        }`}
                      >
                        <img src={img} alt="Sample" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit CTA */}
                <div className="pt-4 border-t border-stone-100">
                  <button
                    type="submit"
                    className="w-full py-4 px-6 rounded-2xl font-extrabold text-white bg-[#201f1e] hover:bg-[#2c2b29] shadow-md transition-all text-sm flex items-center justify-center gap-2"
                  >
                    <Pill className="w-4 h-4 text-sky-400" />
                    Submit Medicine for Verification
                  </button>
                </div>
              </form>
            </div>

            {/* Live Preview Column */}
            <div className="lg:col-span-5 space-y-4">
              <div className="sticky top-24 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-sky-600" />
                    Live Medicine Card Preview
                  </h3>
                  <span className="text-[11px] text-stone-500 font-mono">Updates live</span>
                </div>

                <Card3D intensity={6}>
                  <ResourceCard resource={previewResource} />
                </Card3D>

                <div className="p-4 rounded-3xl bg-sky-50 border border-sky-200 text-xs text-sky-900 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold">
                    <ShieldCheck className="w-4 h-4 text-sky-600" />
                    Verification & Safety Queue
                  </div>
                  <p className="leading-relaxed text-stone-600 text-[11px]">
                    All medicine donations are verified by RescueConnect civic admins before transfer to non-profit healthcare units.
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
