import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ResourceCard from '../components/ResourceCard';
import ResourceFilters from '../components/ResourceFilters';
import Modal from '../components/Modal';
import SafetyNotice from '../components/SafetyNotice';
import { getDonations, addRequest } from '../utils/storage';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Sparkles, PackageX } from 'lucide-react';

export default function Browse() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useToast();

  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);

  // Filter state
  const [filters, setFilters] = useState({
    search: '',
    category: searchParams.get('category') || 'all',
    status: 'all',
    urgency: 'all',
    distance: 'all',
    sortBy: 'newest'
  });

  // Request Modal State
  const [selectedResource, setSelectedResource] = useState(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestPurpose, setRequestPurpose] = useState('');
  const [requestQuantity, setRequestQuantity] = useState('');

  const loadData = () => {
    const data = getDonations();
    setDonations(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    let result = [...donations];

    // Filter by Search text
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q) ||
          d.location.toLowerCase().includes(q) ||
          d.donor?.name?.toLowerCase().includes(q)
      );
    }

    // Filter by Category
    if (filters.category !== 'all') {
      result = result.filter((d) => d.category === filters.category);
    }

    // Filter by Status
    if (filters.status !== 'all') {
      result = result.filter((d) => d.status === filters.status);
    }

    // Filter by Urgency
    if (filters.urgency !== 'all') {
      result = result.filter((d) => d.urgency === filters.urgency);
    }

    // Filter by Distance approximation
    if (filters.distance !== 'all') {
      const maxDist = parseFloat(filters.distance);
      result = result.filter((d) => {
        const dDist = parseFloat(d.distance || '3');
        return dDist <= maxDist;
      });
    }

    // Sorting
    if (filters.sortBy === 'newest') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (filters.sortBy === 'urgency') {
      const urgencyRank = { urgent: 4, high: 3, medium: 2, low: 1 };
      result.sort((a, b) => (urgencyRank[b.urgency] || 0) - (urgencyRank[a.urgency] || 0));
    } else if (filters.sortBy === 'distance') {
      result.sort((a, b) => parseFloat(a.distance || 0) - parseFloat(b.distance || 0));
    }

    setFilteredDonations(result);
  }, [donations, filters]);

  const handleResetFilters = () => {
    setFilters({
      search: '',
      category: 'all',
      status: 'all',
      urgency: 'all',
      distance: 'all',
      sortBy: 'newest'
    });
  };

  const handleOpenRequestModal = (resource) => {
    if (!user) {
      showToast('Please log in or select a demo account to request resources.', 'info');
      navigate('/login');
      return;
    }
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
      organization: user.organizationName || 'Community Member',
      purpose: requestPurpose,
      requestedQuantity: requestQuantity || selectedResource.quantity
    });

    showToast(`Request created for ${selectedResource.title}! 🎉`, 'success');
    setIsRequestModalOpen(false);
    setRequestPurpose('');
    loadData();
  };

  return (
    <div className="space-y-8 pb-16 page-fade-in text-stone-900">
      
      {/* Full-width Header Banner (Warm Stone Aesthetic) */}
      <section className="bg-[#f4efe8] border-b border-[#dfd7cc] py-12 px-4 sm:px-6 lg:px-8 shadow-xs">
        <div className="max-w-7xl mx-auto space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">
            Community Resource Marketplace
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl font-normal tracking-tight text-stone-900">
            Browse Donated Resources
          </h1>
          <p className="text-sm text-stone-600 max-w-2xl">
            Search verified food surplus and eligible medicine donations available in your area.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Filter Toolbar */}
        <ResourceFilters
          filters={filters}
          onChange={setFilters}
          onReset={handleResetFilters}
          totalResults={filteredDonations.length}
        />

        {/* Resource Grid */}
        {filteredDonations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDonations.map((resource) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                onRequest={handleOpenRequestModal}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-[#f4efe8] rounded-3xl p-12 text-center border border-stone-200/90 shadow-sm space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-stone-100 text-stone-400 flex items-center justify-center">
              <PackageX className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-stone-900">No resources match your filters</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto mt-1">
                Try adjusting your search keywords, expanding your location distance, or clearing category filters.
              </p>
            </div>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 text-xs font-bold text-white bg-[#201f1e] hover:bg-[#2c2b29] rounded-xl transition-colors shadow-xs"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* Request Modal */}
      <Modal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        title={`Request Resource: ${selectedResource?.title || ''}`}
      >
        <form onSubmit={handleConfirmRequest} className="space-y-4">
          <div className="p-3 rounded-xl bg-stone-100 border border-stone-200 text-xs space-y-1">
            <p className="text-stone-700">
              <strong>Item:</strong> {selectedResource?.title}
            </p>
            <p className="text-stone-700">
              <strong>Donor:</strong> {selectedResource?.donor?.name}
            </p>
            <p className="text-stone-700">
              <strong>Distance:</strong> {selectedResource?.distance}
            </p>
          </div>

          {selectedResource?.category === 'medicine' && <SafetyNotice compact={true} />}

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Requested Quantity
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
              Community / Organization Purpose
            </label>
            <textarea
              rows={3}
              placeholder="Explain how this resource will be distributed to people in need..."
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
