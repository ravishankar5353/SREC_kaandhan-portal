import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Users, GraduationCap, Building2, BookOpen,
  CalendarCheck, CreditCard, FileText, Briefcase, Bell,
  School, Settings, ChevronLeft, ChevronRight, X, LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ROLES } from '../../utils/constants';

const iconMap = { LayoutDashboard, Users, GraduationCap, Building2, BookOpen, CalendarCheck, CreditCard, FileText, Briefcase, Bell, School, Settings };

const NAV_ITEMS = [
  { to: '/dashboard',       label: 'Dashboard',       icon: 'LayoutDashboard', roles: [ROLES.ADMIN, ROLES.FACULTY, ROLES.STUDENT] },
  { to: '/students',        label: 'Students',         icon: 'Users',           roles: [ROLES.ADMIN, ROLES.FACULTY] },
  { to: '/faculty',         label: 'Faculty',          icon: 'GraduationCap',   roles: [ROLES.ADMIN] },
  { to: '/departments',     label: 'Departments',      icon: 'Building2',       roles: [ROLES.ADMIN, ROLES.FACULTY] },
  { to: '/courses',         label: 'Courses',          icon: 'BookOpen',        roles: [ROLES.ADMIN, ROLES.FACULTY, ROLES.STUDENT] },
  { to: '/attendance',      label: 'Attendance',       icon: 'CalendarCheck',   roles: [ROLES.ADMIN, ROLES.FACULTY, ROLES.STUDENT] },
  { to: '/fees',            label: 'Fees',             icon: 'CreditCard',      roles: [ROLES.ADMIN, ROLES.STUDENT] },
  { to: '/exams',           label: 'Exams & Results',  icon: 'FileText',        roles: [ROLES.ADMIN, ROLES.FACULTY, ROLES.STUDENT] },
  { to: '/placements',      label: 'Placements',       icon: 'Briefcase',       roles: [ROLES.ADMIN, ROLES.STUDENT] },
  { to: '/notices',         label: 'Notices',          icon: 'Bell',            roles: [ROLES.ADMIN, ROLES.FACULTY, ROLES.STUDENT] },
  { to: '/college-profile', label: 'College Profile',  icon: 'School',          roles: [ROLES.ADMIN] },
  { to: '/settings',        label: 'Settings',         icon: 'Settings',        roles: [ROLES.ADMIN, ROLES.FACULTY, ROLES.STUDENT] },
];

export const Sidebar = ({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) => {
  const { user, logout } = useAuth();
  const userRole = user?.role || ROLES.STUDENT;
  const filtered = NAV_ITEMS.filter((item) => item.roles.includes(userRole));

  return (
    <>
      {/* Desktop sidebar */}
      <aside className={`sidebar ${collapsed ? 'sidebar-collapsed' : ''}`}>
        {/* Brand */}
        <div className="sidebar-brand">
          <div className="sidebar-logo">S</div>
          {!collapsed && (
            <div className="sidebar-brand-text">
              <span className="sidebar-brand-name">SREC ERP</span>
              <span className="sidebar-brand-sub">Kaandhan Portal 2026</span>
            </div>
          )}
          <button className="sidebar-toggle" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {filtered.map((item) => {
            const Icon = iconMap[item.icon] || LayoutDashboard;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`}
                title={collapsed ? item.label : undefined}
              >
                <Icon size={18} className="sidebar-link-icon" />
                {!collapsed && <span className="sidebar-link-label">{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* User Card */}
        <div className="sidebar-user">
          <div className="sidebar-user-avatar">{user?.name?.charAt(0) || 'U'}</div>
          {!collapsed && (
            <div className="sidebar-user-info">
              <span className="sidebar-user-name">{user?.name || 'User'}</span>
              <span className="sidebar-user-role">{user?.role || 'student'}</span>
            </div>
          )}
          <button className="sidebar-logout" onClick={logout} title="Sign Out">
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      {/* Mobile overlay + drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="sidebar-mobile-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              className="sidebar sidebar-mobile"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="sidebar-brand">
                <div className="sidebar-logo">S</div>
                <div className="sidebar-brand-text">
                  <span className="sidebar-brand-name">SREC ERP</span>
                  <span className="sidebar-brand-sub">Kaandhan Portal 2026</span>
                </div>
                <button className="sidebar-toggle" onClick={() => setMobileOpen(false)}>
                  <X size={18} />
                </button>
              </div>
              <nav className="sidebar-nav">
                {filtered.map((item) => {
                  const Icon = iconMap[item.icon] || LayoutDashboard;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className={({ isActive }) => `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`}
                      onClick={() => setMobileOpen(false)}
                    >
                      <Icon size={18} className="sidebar-link-icon" />
                      <span className="sidebar-link-label">{item.label}</span>
                    </NavLink>
                  );
                })}
              </nav>
              <div className="sidebar-user">
                <div className="sidebar-user-avatar">{user?.name?.charAt(0) || 'U'}</div>
                <div className="sidebar-user-info">
                  <span className="sidebar-user-name">{user?.name || 'User'}</span>
                  <span className="sidebar-user-role">{user?.role || 'student'}</span>
                </div>
                <button className="sidebar-logout" onClick={logout} title="Sign Out">
                  <LogOut size={16} />
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
