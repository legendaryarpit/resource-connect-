import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, setCurrentUser as setStorageUser, switchRole as storageSwitchRole, getUsers, registerUser as storageRegisterUser, loginUser as storageLoginUser, logoutUser as storageLogoutUser } from '../utils/storage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUserState] = useState(() => getCurrentUser());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function handleStorageChange(e) {
      if (['user_switched', 'demo_reset', 'user_logged_out'].includes(e.detail?.eventName)) {
        setCurrentUserState(getCurrentUser());
      }
    }
    window.addEventListener('rc_storage_changed', handleStorageChange);
    return () => window.removeEventListener('rc_storage_changed', handleStorageChange);
  }, []);

  const login = (email, password) => {
    const res = storageLoginUser(email, password);
    if (res.success) {
      setCurrentUserState(res.user);
      return res;
    }
    const users = getUsers();
    const match = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (match) {
      setStorageUser(match);
      setCurrentUserState(match);
      return { success: true, user: match };
    }
    // Demo fallback
    const fallbackUser = {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0],
      email,
      role: email.includes('admin') ? 'admin' : (email.includes('ngo') ? 'organization' : 'individual'),
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      phone: '+1 (555) 000-0000',
      location: 'Downtown District',
      mealsRescued: 0,
      donationsCount: 0,
      badges: ['New Neighbor']
    };
    setStorageUser(fallbackUser);
    setCurrentUserState(fallbackUser);
    return { success: true, user: fallbackUser };
  };

  const register = (userData) => {
    const res = storageRegisterUser(userData);
    if (res.success) {
      setCurrentUserState(res.user);
      return res;
    }
    return res;
  };

  const logout = () => {
    storageLogoutUser();
    // Default to first user or individual demo
    const users = getUsers();
    const individual = users.find(u => u.role === 'individual') || users[0];
    setStorageUser(individual);
    setCurrentUserState(individual);
  };

  const switchRole = (role) => {
    const switched = storageSwitchRole(role);
    if (switched) {
      setCurrentUserState(switched);
      return switched;
    }
    return null;
  };

  const activeUser = currentUser || getCurrentUser();

  return (
    <AuthContext.Provider value={{
      currentUser: activeUser,
      user: activeUser,
      loading,
      login,
      register,
      logout,
      switchRole,
      switchDemoRole: switchRole,
      isAuthenticated: !!activeUser,
      isIndividual: activeUser?.role === 'individual',
      isOrganization: activeUser?.role === 'organization',
      isAdmin: activeUser?.role === 'admin'
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
