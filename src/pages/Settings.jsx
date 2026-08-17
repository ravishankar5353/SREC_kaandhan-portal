import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Shield, Database, Sparkles, Key, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../components/ui/Toast';
import { FormInput } from '../components/ui/FormInput';
import { isMockMode } from '../lib/supabaseClient';

const Settings = () => {
  const { user } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { addToast } = useToast();
  const [profileName, setProfileName] = useState(user?.name || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleProfileSave = (e) => {
    e.preventDefault();
    if (!profileName.trim()) {
      addToast('Profile name cannot be blank.', 'warning');
      return;
    }
    addToast('Profile settings updated successfully!', 'success');
  };

  const handlePasswordSave = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      addToast('Passwords do not match.', 'error');
      return;
    }
    if (password.length < 6) {
      addToast('Password must be at least 6 characters long.', 'warning');
      return;
    }
    addToast('Security credentials updated successfully!', 'success');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <motion.div className="page-container text-left" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Portal Settings</h1>
          <p className="page-subtitle">Manage accounts, security configurations, and theme parameters</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Profile Settings */}
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-3xl p-6 bg-slate-900/60 border border-white/10 backdrop-blur-xl shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white font-['Outfit'] border-b border-white/10 pb-2">
              Student/User Profile Settings
            </h3>
            <form onSubmit={handleProfileSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput
                  label="Registered Email"
                  disabled
                  value={user?.email || 'student@srecnandyal.edu.in'}
                />
                <FormInput
                  label="Current User Role"
                  disabled
                  value={user?.role?.toUpperCase() || 'STUDENT'}
                />
              </div>
              <FormInput
                label="Full Name"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                placeholder="Enter full name"
              />
              <button type="submit" className="btn btn-primary">
                Save Profile
              </button>
            </form>
          </div>

          {/* Change Password */}
          <div className="rounded-3xl p-6 bg-slate-900/60 border border-white/10 backdrop-blur-xl shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white font-['Outfit'] border-b border-white/10 pb-2">
              Update Portal Password
            </h3>
            <form onSubmit={handlePasswordSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput
                  label="New Password"
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 6 characters"
                />
                <FormInput
                  label="Confirm New Password"
                  required
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Update Security Credentials
              </button>
            </form>
          </div>
        </div>

        {/* Database & Theme Info */}
        <div className="lg:col-span-4 space-y-6">
          {/* Theme card */}
          <div className="rounded-3xl p-6 bg-slate-900/60 border border-white/10 backdrop-blur-xl shadow-xl space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Appearance Mode</h4>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-300">Switch Theme</span>
              <button onClick={toggleTheme} className="btn btn-xs btn-ghost text-xs border border-white/15 px-3 py-1.5 rounded-lg">
                {isDark ? '🌙 Dark Mode' : '☀️ Light Mode'}
              </button>
            </div>
          </div>

          {/* Database mode */}
          <div className="rounded-3xl p-6 bg-slate-900/60 border border-white/10 backdrop-blur-xl shadow-xl space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Database Status</h4>
            <div className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${isMockMode ? 'bg-amber-500' : 'bg-emerald-500 animate-pulse'}`} />
              <span className="text-xs font-bold text-white">
                {isMockMode ? 'Local Session Mock Mode' : 'Connected to Supabase'}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              {isMockMode
                ? 'To integrate with a live Supabase PostgreSQL database, add the Supabase URL and Anon Key variables to the project .env configuration file.'
                : 'Your session is successfully connected to your Supabase cloud backend database.'}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;
