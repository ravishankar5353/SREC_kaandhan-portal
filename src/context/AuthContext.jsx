import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { isMockMode, supabase } from '../lib/supabaseClient';
import { ROLES } from '../utils/constants';

// ─── Demo accounts for mock mode ─────────────────────────────────────────────
const DEMO_ACCOUNTS = [
  { id: 'ADMIN-001', email: 'admin@srecnandyal.edu.in', password: 'admin2026', role: ROLES.ADMIN, name: 'Administrator', department: 'Administration' },
  { id: 'FAC-003', email: 'mahesh.kumar@srecnandyal.edu.in', password: 'faculty2026', role: ROLES.FACULTY, name: 'Mr. Mahesh Kumar', department: 'Computer Science & Engineering' },
  { id: 'STU-002', email: 'ravi.shankar@srecnandyal.edu.in', password: 'student2026', role: ROLES.STUDENT, name: 'Y. Ravi Shankar', rollNo: '24X51A05Y9', department: 'Computer Science & Engineering' },
];

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load persisted session on mount
  useEffect(() => {
    if (isMockMode) {
      const stored = localStorage.getItem('srec_erp_user');
      if (stored) {
        try { setUser(JSON.parse(stored)); } catch {}
      }
      setLoading(false);
    } else {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          setUser({ ...session.user, role: session.user.user_metadata?.role || ROLES.STUDENT });
        }
        setLoading(false);
      });
      const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          setUser({ ...session.user, role: session.user.user_metadata?.role || ROLES.STUDENT });
        } else {
          setUser(null);
        }
      });
      return () => listener?.subscription?.unsubscribe();
    }
  }, []);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    try {
      if (isMockMode) {
        const acc = DEMO_ACCOUNTS.find(
          (a) => a.email.toLowerCase() === email.toLowerCase() && a.password === password
        );
        if (!acc) {
          return { error: 'Invalid credentials. Use demo accounts shown on the login page.' };
        }
        const sessionUser = { ...acc };
        setUser(sessionUser);
        localStorage.setItem('srec_erp_user', JSON.stringify(sessionUser));
        return { user: sessionUser };
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) return { error: error.message };
        return { user: data.user };
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    if (isMockMode) {
      localStorage.removeItem('srec_erp_user');
      setUser(null);
    } else {
      await supabase.auth.signOut();
      setUser(null);
    }
  }, []);

  const isAdmin = user?.role === ROLES.ADMIN;
  const isFaculty = user?.role === ROLES.FACULTY;
  const isStudent = user?.role === ROLES.STUDENT;

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAdmin, isFaculty, isStudent }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};

export default AuthContext;
