import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Browse from './pages/Browse';
import ResourceDetails from './pages/ResourceDetails';
import DonateFood from './pages/DonateFood';
import DonateMedicine from './pages/DonateMedicine';
import About from './pages/About';
import CommunityImpact from './pages/CommunityImpact';
import Leaderboard from './pages/Leaderboard';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import OrgDashboard from './pages/OrgDashboard';
import AdminDashboard from './pages/AdminDashboard';
import MyDonations from './pages/MyDonations';
import MyRequests from './pages/MyRequests';
import Profile from './pages/Profile';

// Scroll to top wrapper
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastProvider>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col bg-[#e8e3dc] text-stone-900 font-sans selection:bg-emerald-600 selection:text-white">
            <Navbar />
            <main className="flex-1 bg-[#e8e3dc] pt-28 sm:pt-32">
              <Routes>
                {/* Public Pages */}
                <Route path="/" element={<Home />} />
                <Route path="/browse" element={<Browse />} />
                <Route path="/resource/:id" element={<ResourceDetails />} />
                <Route path="/donate-food" element={<DonateFood />} />
                <Route path="/donate-medicine" element={<DonateMedicine />} />
                <Route path="/about" element={<About />} />
                <Route path="/impact" element={<CommunityImpact />} />
                <Route path="/stats" element={<CommunityImpact />} />
                <Route path="/community-stats" element={<CommunityImpact />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/top-donors" element={<Leaderboard />} />
                <Route path="/hall-of-fame" element={<Leaderboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* User & Role Dashboards */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <UserDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/my-donations"
                  element={
                    <ProtectedRoute>
                      <MyDonations />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/manage-donations"
                  element={
                    <ProtectedRoute>
                      <MyDonations />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/my-requests"
                  element={
                    <ProtectedRoute>
                      <MyRequests />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/manage-requests"
                  element={
                    <ProtectedRoute>
                      <MyRequests />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/org-dashboard"
                  element={
                    <ProtectedRoute allowedRoles={['organization', 'admin']}>
                      <OrgDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/organization-dashboard"
                  element={
                    <ProtectedRoute allowedRoles={['organization', 'admin']}>
                      <OrgDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />

                {/* Fallback route */}
                <Route path="*" element={<Home />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </ToastProvider>
      </AuthProvider>
    </Router>
  );
}
