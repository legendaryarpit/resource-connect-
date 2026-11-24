import { INITIAL_USERS, INITIAL_DONATIONS, INITIAL_REQUESTS, COMMUNITY_STATS, RECENT_ACTIVITY_LOGS } from '../data/seedData.js';

const KEYS = {
  DONATIONS: 'rc_donations_v1',
  REQUESTS: 'rc_requests_v1',
  USERS: 'rc_users_v1',
  CURRENT_USER: 'rc_current_user_v1',
  STATS: 'rc_stats_v1',
  ACTIVITY: 'rc_activity_v1',
  SIMULATED_LOCATION: 'rc_simulated_location_v1'
};

function dispatchDataChange(eventName) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('rc_storage_changed', { detail: { eventName } }));
  }
}

export function initStorage() {
  if (typeof localStorage === 'undefined') return;
  if (!localStorage.getItem(KEYS.USERS)) {
    localStorage.setItem(KEYS.USERS, JSON.stringify(INITIAL_USERS));
  }
  if (!localStorage.getItem(KEYS.DONATIONS)) {
    localStorage.setItem(KEYS.DONATIONS, JSON.stringify(INITIAL_DONATIONS));
  }
  if (!localStorage.getItem(KEYS.REQUESTS)) {
    localStorage.setItem(KEYS.REQUESTS, JSON.stringify(INITIAL_REQUESTS));
  }
  if (!localStorage.getItem(KEYS.STATS)) {
    localStorage.setItem(KEYS.STATS, JSON.stringify(COMMUNITY_STATS));
  }
  if (!localStorage.getItem(KEYS.ACTIVITY)) {
    localStorage.setItem(KEYS.ACTIVITY, JSON.stringify(RECENT_ACTIVITY_LOGS));
  }
  if (!localStorage.getItem(KEYS.CURRENT_USER)) {
    localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(INITIAL_USERS[0]));
  }
  if (!localStorage.getItem(KEYS.SIMULATED_LOCATION)) {
    localStorage.setItem(KEYS.SIMULATED_LOCATION, JSON.stringify({
      area: "Downtown Metro District",
      lat: 40.7128,
      lng: -74.0060
    }));
  }
}

initStorage();

/* ---------------- DONATIONS CRUD ---------------- */
export function getDonations() {
  if (typeof localStorage === 'undefined') return INITIAL_DONATIONS;
  try {
    const data = localStorage.getItem(KEYS.DONATIONS);
    return data ? JSON.parse(data) : INITIAL_DONATIONS;
  } catch (e) {
    console.error('Error reading donations', e);
    return INITIAL_DONATIONS;
  }
}

export function getDonationById(id) {
  const donations = getDonations();
  return donations.find(d => d.id === id) || null;
}

export function addDonation(newDonation) {
  const donations = getDonations();
  const id = `RC-${Math.floor(1000 + Math.random() * 9000)}`;
  const donationWithId = {
    ...newDonation,
    id,
    status: newDonation.status || 'available',
    verificationStatus: newDonation.category === 'medicine' ? 'pending' : 'approved',
    createdAt: new Date().toISOString(),
    distanceKm: newDonation.distanceKm || +(1 + Math.random() * 5).toFixed(1)
  };
  
  const updated = [donationWithId, ...donations];
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(KEYS.DONATIONS, JSON.stringify(updated));
  }

  addActivityLog({
    type: 'donation_submitted',
    title: `New ${newDonation.category === 'food' ? 'Food' : 'Medicine'} Listing`,
    description: `${newDonation.donor?.name || 'User'} posted "${newDonation.title}"`,
    time: 'Just now',
    badge: newDonation.category === 'food' ? 'Food' : 'Medicine',
    color: newDonation.category === 'food' ? 'amber' : 'indigo'
  });

  const curr = getCurrentUser();
  if (curr) {
    updateCurrentUserStats(newDonation.category === 'food' ? 25 : 10);
  }

  dispatchDataChange('donation_added');
  return donationWithId;
}

export function updateDonation(id, updates) {
  const donations = getDonations();
  const index = donations.findIndex(d => d.id === id);
  if (index === -1) return null;

  donations[index] = { ...donations[index], ...updates };
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(KEYS.DONATIONS, JSON.stringify(donations));
  }
  dispatchDataChange('donation_updated');
  return donations[index];
}

export function updateDonationStatus(id, newStatus) {
  return updateDonation(id, { status: newStatus });
}

export function updateDonationVerification(id, verificationStatus) {
  const updates = { verificationStatus };
  if (verificationStatus === 'approved') {
    updates.status = 'available';
  }
  return updateDonation(id, updates);
}

export function deleteDonation(id) {
  const donations = getDonations();
  const filtered = donations.filter(d => d.id !== id);
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(KEYS.DONATIONS, JSON.stringify(filtered));
  }
  dispatchDataChange('donation_deleted');
  return true;
}

/* ---------------- REQUESTS ---------------- */
export function getRequests() {
  if (typeof localStorage === 'undefined') return INITIAL_REQUESTS;
  try {
    const data = localStorage.getItem(KEYS.REQUESTS);
    return data ? JSON.parse(data) : INITIAL_REQUESTS;
  } catch (e) {
    return INITIAL_REQUESTS;
  }
}

export function createRequest(requestData) {
  const requests = getRequests();
  const id = `REQ-${Math.floor(500 + Math.random() * 500)}`;
  const newReq = {
    ...requestData,
    id,
    status: 'approved',
    requestedAt: new Date().toISOString(),
  };

  const updated = [newReq, ...requests];
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(KEYS.REQUESTS, JSON.stringify(updated));
  }

  if (requestData.donationId) {
    updateDonation(requestData.donationId, {
      status: 'requested',
      claimedBy: requestData.organizationName || 'Verified Partner',
      claimedAt: new Date().toISOString()
    });
  }

  addActivityLog({
    type: 'request_claimed',
    title: 'Resource Claimed',
    description: `${requestData.organizationName || 'Organization'} requested "${requestData.resourceTitle || requestData.donationTitle}"`,
    time: 'Just now',
    badge: 'Claimed',
    color: 'emerald'
  });

  dispatchDataChange('request_created');
  return newReq;
}

export const addRequest = createRequest;

export function updateRequest(id, updates) {
  const requests = getRequests();
  const index = requests.findIndex(r => r.id === id);
  if (index === -1) return null;

  requests[index] = { ...requests[index], ...updates };
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(KEYS.REQUESTS, JSON.stringify(requests));
  }
  dispatchDataChange('request_updated');
  return requests[index];
}

export function updateRequestStatus(id, newStatus) {
  return updateRequest(id, { status: newStatus });
}

/* ---------------- USERS & AUTH ---------------- */
export function getUsers() {
  if (typeof localStorage === 'undefined') return INITIAL_USERS;
  try {
    const data = localStorage.getItem(KEYS.USERS);
    return data ? JSON.parse(data) : INITIAL_USERS;
  } catch (e) {
    return INITIAL_USERS;
  }
}

export function getCurrentUser() {
  if (typeof localStorage === 'undefined') return INITIAL_USERS[0];
  try {
    const data = localStorage.getItem(KEYS.CURRENT_USER);
    return data ? JSON.parse(data) : INITIAL_USERS[0];
  } catch (e) {
    return INITIAL_USERS[0];
  }
}

export function setCurrentUser(user) {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(user));
  }
  dispatchDataChange('user_switched');
}

export function loginUser(email, password) {
  const users = getUsers();
  const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (found) {
    setCurrentUser(found);
    return { success: true, user: found };
  }
  if (email.includes('rescueconnect.demo')) {
    const demoUser = INITIAL_USERS.find(u => u.email.toLowerCase() === email.toLowerCase()) || {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0],
      email: email,
      role: email.includes('admin') ? 'admin' : (email.includes('ngo') ? 'organization' : 'individual')
    };
    setCurrentUser(demoUser);
    return { success: true, user: demoUser };
  }
  return { success: false, error: 'Invalid email or password.' };
}

export function logoutUser() {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem(KEYS.CURRENT_USER);
  }
  dispatchDataChange('user_logged_out');
}

export function registerUser(userData) {
  const users = getUsers();
  if (users.some(u => u.email.toLowerCase() === userData.email.toLowerCase())) {
    return { success: false, error: 'An account with this email already exists.' };
  }
  const newUser = {
    id: `usr-${Date.now()}`,
    ...userData,
    avatar: userData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(userData.name)}`,
    joinedDate: new Date().toISOString().split('T')[0],
    verified: userData.role === 'organization' ? false : true
  };
  users.push(newUser);
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(KEYS.USERS, JSON.stringify(users));
  }
  setCurrentUser(newUser);
  return { success: true, user: newUser };
}

export function switchRole(role) {
  const users = getUsers();
  const match = users.find(u => u.role === role);
  if (match) {
    setCurrentUser(match);
    return match;
  }
  return null;
}

export function updateCurrentUserStats(addMeals = 10) {
  const curr = getCurrentUser();
  if (!curr) return;
  const updatedUser = {
    ...curr,
    mealsRescued: (curr.mealsRescued || 0) + addMeals,
    donationsCount: (curr.donationsCount || 0) + 1
  };
  setCurrentUser(updatedUser);

  const users = getUsers();
  const idx = users.findIndex(u => u.id === curr.id);
  if (idx !== -1) {
    users[idx] = updatedUser;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(KEYS.USERS, JSON.stringify(users));
    }
  }
}

/* ---------------- STATS & ACTIVITY ---------------- */
export function getCommunityStats() {
  if (typeof localStorage === 'undefined') return COMMUNITY_STATS;
  try {
    const data = localStorage.getItem(KEYS.STATS);
    const stats = data ? JSON.parse(data) : COMMUNITY_STATS;
    const donations = getDonations();
    
    const foodCount = donations.filter(d => d.category === 'food').length;
    const medCount = donations.filter(d => d.category === 'medicine').length;
    const completedCount = donations.filter(d => d.status === 'completed' || d.status === 'collected').length;

    return {
      ...stats,
      totalDonations: donations.length,
      foodDonations: foodCount,
      medicineDonations: medCount,
      completedRescues: completedCount + 312,
      activeResources: donations.filter(d => d.status === 'available').length,
      dynamicMeals: (stats.mealsRescued || 1240) + (foodCount * 25),
      dynamicMedicineUnits: (stats.medicineUnitsRedirected || 680) + (medCount * 15)
    };
  } catch (e) {
    return COMMUNITY_STATS;
  }
}

export const getImpactStats = getCommunityStats;

export function getActivityLogs() {
  if (typeof localStorage === 'undefined') return RECENT_ACTIVITY_LOGS;
  try {
    const data = localStorage.getItem(KEYS.ACTIVITY);
    return data ? JSON.parse(data) : RECENT_ACTIVITY_LOGS;
  } catch (e) {
    return RECENT_ACTIVITY_LOGS;
  }
}

export function addActivityLog(log) {
  const logs = getActivityLogs();
  const newLog = {
    id: `act-${Date.now()}`,
    ...log
  };
  const updated = [newLog, ...logs.slice(0, 19)];
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(KEYS.ACTIVITY, JSON.stringify(updated));
  }
  dispatchDataChange('activity_added');
}

export const logActivity = addActivityLog;

/* ---------------- LOCATION SIMULATOR ---------------- */
export function getSimulatedLocation() {
  if (typeof localStorage === 'undefined') return { area: "Downtown Metro District", lat: 40.7128, lng: -74.0060 };
  try {
    const data = localStorage.getItem(KEYS.SIMULATED_LOCATION);
    return data ? JSON.parse(data) : { area: "Downtown Metro District", lat: 40.7128, lng: -74.0060 };
  } catch (e) {
    return { area: "Downtown Metro District", lat: 40.7128, lng: -74.0060 };
  }
}

export function setSimulatedLocation(location) {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(KEYS.SIMULATED_LOCATION, JSON.stringify(location));
  }
  dispatchDataChange('location_changed');
}

export function resetDemoData() {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(KEYS.USERS, JSON.stringify(INITIAL_USERS));
    localStorage.setItem(KEYS.DONATIONS, JSON.stringify(INITIAL_DONATIONS));
    localStorage.setItem(KEYS.REQUESTS, JSON.stringify(INITIAL_REQUESTS));
    localStorage.setItem(KEYS.STATS, JSON.stringify(COMMUNITY_STATS));
    localStorage.setItem(KEYS.ACTIVITY, JSON.stringify(RECENT_ACTIVITY_LOGS));
    localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(INITIAL_USERS[0]));
  }
  dispatchDataChange('demo_reset');
}
