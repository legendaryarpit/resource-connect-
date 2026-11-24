import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ResourceCard from '../components/ResourceCard';
import Card3D from '../components/Card3D';
import { addDonation } from '../utils/storage';
import { validateFoodDonation } from '../utils/validation';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Utensils, Sparkles, CheckCircle2, ArrowRight, Upload, Clock, AlertCircle } from 'lucide-react';

export default function DonateFood() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    foodType: 'Prepared meals',
    quantity: '',
    numericQuantity: 10,
    description: '',
    prepTime: new Date().toISOString().slice(0, 16),
    availableUntil: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
    location: user?.location || 'Downtown City Center',
    contactPhone: user?.phone || '+1 (555) 234-5678',
    contactEmail: user?.email || 'donor@rescueconnect.demo',
    urgency: 'high',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'
  });

  const [errors, setErrors] = useState({});
  const [submittedDonation, setSubmittedDonation] = useState(null);

  const sampleImages = [
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=800&q=80'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    const validation = validateFoodDonation(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      showToast('Please fix the errors in the food donation form.', 'error');
      return;
    }

    const created = addDonation({
      category: 'food',
      ...formData,
      donor: {
        id: user?.id || `usr-${Date.now()}`,
        name: user?.name || 'Community Food Donor',
        type: user?.role === 'organization' ? 'Organization' : 'Individual',
        rating: 5.0,
        contact: formData.contactEmail,
        phone: formData.contactPhone
      }
    });

    setSubmittedDonation(created);
    showToast(`Food donation listed successfully! 🎉 ID: ${created.id}`, 'success');
  };

  // Construct draft object for live preview card
  const previewResource = {
    id: 'RC-PREVIEW',
    category: 'food',
    title: formData.title || 'Surplus Meal Box Preview',
    foodType: formData.foodType,
    quantity: formData.quantity || '10 Servings',
    description: formData.description || 'Enter details to see live card preview...',
    location: formData.location || 'Local Community Center',
    availableUntil: formData.availableUntil,
    urgency: formData.urgency,
    status: 'available',
    donor: { name: user?.name || 'Your Name', type: 'Donor' },
    image: formData.image,
    distance: '1.2 km away'
  };

  return (
    <div className="space-y-8 pb-16 page-fade-in text-stone-900">
      
      {/* Full-width Header Banner (Warm Stone Aesthetic) */}
      <section className="bg-[#f4efe8] border-b border-[#dfd7cc] py-12 px-4 sm:px-6 lg:px-8 shadow-xs">
        <div className="max-w-7xl mx-auto space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
            <Utensils className="w-4 h-4 text-amber-600" />
            Food Rescue Portal
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl font-normal tracking-tight text-stone-900">
            Donate Surplus Food
          </h1>
          <p className="text-sm text-stone-600 max-w-2xl">
            List prepared meals, bakery surplus, packaged goods, or fresh produce to help neighbors in need.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* SUCCESS CONFIRMATION STATE */}
        {submittedDonation ? (
          <div className="bg-[#f4efe8] rounded-3xl p-10 border border-emerald-200 shadow-[0_12px_32px_rgba(40,30,20,0.06)] text-center max-w-2xl mx-auto space-y-6 animate-fadeIn">
            <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-3xl shadow-inner">
              🎉
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-mono text-xs font-bold rounded-full">
                Donation ID: {submittedDonation.id}
              </span>
              <h2 className="text-2xl font-bold text-stone-900">Food donation listed successfully! 🎉</h2>
              <p className="text-stone-600 text-sm max-w-md mx-auto">
                Your food surplus listing is live and visible to verified community shelters and organizations near you.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-left text-xs space-y-1">
              <p className="text-stone-700"><strong>Listing Title:</strong> {submittedDonation.title}</p>
              <p className="text-stone-700"><strong>Quantity:</strong> {submittedDonation.quantity}</p>
              <p className="text-stone-700"><strong>Location:</strong> {submittedDonation.location}</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  setSubmittedDonation(null);
                  setFormData({
                    title: '',
                    foodType: 'Prepared meals',
                    quantity: '',
                    numericQuantity: 10,
                    description: '',
                    prepTime: new Date().toISOString().slice(0, 16),
                    availableUntil: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
                    location: user?.location || 'Downtown City Center',
                    contactPhone: user?.phone || '+1 (555) 234-5678',
                    contactEmail: user?.email || 'donor@rescueconnect.demo',
                    urgency: 'high',
                    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'
                  });
                }}
                className="w-full sm:w-auto px-6 py-3 font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl text-xs"
              >
                Donate Another Item
              </button>
              <button
                onClick={() => navigate('/browse')}
                className="w-full sm:w-auto px-6 py-3 font-bold text-white bg-[#201f1e] hover:bg-[#2c2b29] rounded-xl text-xs shadow-md"
              >
                View in Marketplace
              </button>
            </div>
          </div>
        ) : (
          /* FORM & PREVIEW GRID */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Form Column (7 cols) */}
            <div className="lg:col-span-7 bg-[#f4efe8] rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-[0_8px_24px_rgba(40,30,20,0.04)] space-y-6">
              <div className="border-b border-stone-100 pb-4">
                <h2 className="text-xl font-bold text-stone-900">Food Donation Form</h2>
                <p className="text-xs text-stone-500">Provide details so local shelters can safely collect your food.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 text-xs">
                {/* Title */}
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Food Item Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="e.g. 25 Fresh Vegetarian Meal Boxes"
                    value={formData.title}
                    onChange={handleChange}
                    className={`w-full p-3 bg-stone-50 border rounded-2xl text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                      errors.title ? 'border-rose-400' : 'border-stone-200'
                    }`}
                  />
                  {errors.title && <p className="text-rose-500 text-[11px] mt-1">{errors.title}</p>}
                </div>

                {/* Grid: Category & Quantity */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">
                      Food Category <span className="text-rose-500">*</span>
                    </label>
                    <select
                      name="foodType"
                      value={formData.foodType}
                      onChange={handleChange}
                      className="w-full p-3 bg-stone-50 border border-stone-200 rounded-2xl text-sm font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="Prepared meals">Prepared meals</option>
                      <option value="Packaged food">Packaged food</option>
                      <option value="Grocery items">Grocery items</option>
                      <option value="Bakery">Bakery</option>
                      <option value="Fruits & vegetables">Fruits & vegetables</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">
                      Quantity & Unit <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="quantity"
                      placeholder="e.g. 15 meal boxes / 20 kg produce"
                      value={formData.quantity}
                      onChange={handleChange}
                      className={`w-full p-3 bg-stone-50 border rounded-2xl text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                        errors.quantity ? 'border-rose-400' : 'border-stone-200'
                      }`}
                    />
                    {errors.quantity && <p className="text-rose-500 text-[11px] mt-1">{errors.quantity}</p>}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Description & Hygiene Notes <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    rows={3}
                    placeholder="Describe dietary info (vegetarian, halal, gluten-free), container packaging, and storage..."
                    value={formData.description}
                    onChange={handleChange}
                    className={`w-full p-3 bg-stone-50 border rounded-2xl text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                      errors.description ? 'border-rose-400' : 'border-stone-200'
                    }`}
                  />
                  {errors.description && <p className="text-rose-500 text-[11px] mt-1">{errors.description}</p>}
                </div>

                {/* Grid: Times & Urgency */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Preparation Date/Time</label>
                    <input
                      type="datetime-local"
                      name="prepTime"
                      value={formData.prepTime}
                      onChange={handleChange}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">
                      Available Until <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="datetime-local"
                      name="availableUntil"
                      value={formData.availableUntil}
                      onChange={handleChange}
                      className={`w-full p-2.5 bg-stone-50 border rounded-xl text-xs text-stone-800 ${
                        errors.availableUntil ? 'border-rose-400' : 'border-stone-200'
                      }`}
                    />
                    {errors.availableUntil && <p className="text-rose-500 text-[10px] mt-1">{errors.availableUntil}</p>}
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Urgency</label>
                    <select
                      name="urgency"
                      value={formData.urgency}
                      onChange={handleChange}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-stone-800"
                    >
                      <option value="urgent">Urgent (Pick up today)</option>
                      <option value="high">High Priority</option>
                      <option value="medium">Medium</option>
                      <option value="low">Standard</option>
                    </select>
                  </div>
                </div>

                {/* Grid: Location & Contact */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">
                      Pickup Location / Area <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="location"
                      placeholder="e.g. City Center Catering Hub"
                      value={formData.location}
                      onChange={handleChange}
                      className={`w-full p-3 bg-stone-50 border rounded-2xl text-sm text-stone-900 ${
                        errors.location ? 'border-rose-400' : 'border-stone-200'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Contact Phone/Email</label>
                    <input
                      type="text"
                      name="contactPhone"
                      placeholder="e.g. +1 (555) 234-5678"
                      value={formData.contactPhone}
                      onChange={handleChange}
                      className="w-full p-3 bg-stone-50 border border-stone-200 rounded-2xl text-sm text-stone-900"
                    />
                  </div>
                </div>

                {/* Image Picker */}
                <div className="space-y-2">
                  <label className="block font-bold text-stone-700">Listing Image</label>
                  <div className="flex items-center gap-3">
                    <label className="cursor-pointer px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold rounded-xl flex items-center gap-2 border border-stone-200">
                      <Upload className="w-4 h-4 text-emerald-600" />
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
                          formData.image === img ? 'border-amber-600 scale-105 shadow' : 'border-transparent opacity-70'
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
                    <Utensils className="w-4 h-4 text-amber-400" />
                    Submit Food Donation Listing
                  </button>
                </div>
              </form>
            </div>

            {/* Live Preview Card Column (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="sticky top-24 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    Live Card Preview
                  </h3>
                  <span className="text-[11px] text-stone-500 font-mono">Updates as you type</span>
                </div>

                <Card3D intensity={6}>
                  <ResourceCard resource={previewResource} />
                </Card3D>

                <div className="p-4 rounded-3xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-2">
                  <div className="flex items-center gap-1.5 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-amber-700" />
                    Food Rescue Guarantee
                  </div>
                  <p className="leading-relaxed text-stone-700 text-[11px]">
                    Food donations are listed instantly for nearby verified shelters, NGOs, and food banks. Please ensure food is stored in clean, food-safe containers.
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
