import React from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, Sun, Moon, Bell } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

const routeNames = {
  '/dashboard': 'Dashboard',
  '/students': 'Students',
  '/faculty': 'Faculty',
  '/departments': 'Departments',
  '/courses': 'Courses',
  '/attendance': 'Attendance',
  '/fees': 'Fees',
  '/exams': 'Exams & Results',
  '/placements': 'Placements',
  '/notices': 'Notices',
  '/college-profile': 'College Profile',
  '/settings': 'Settings',
};

export const Navbar = ({ onMenuClick }) => {
  const { isDark, toggleTheme } = useTheme();
  const { user } = useAuth();
  const location = useLocation();
  const pageTitle = routeNames[location.pathname] || 'SREC ERP';

  return (
    <header className="navbar">
      <div className="navbar-left">
        <button className="navbar-menu-btn" onClick={onMenuClick} aria-label="Toggle menu">
          <Menu size={20} />
        </button>
        <div className="navbar-breadcrumb">
          <span className="navbar-breadcrumb-root">SREC ERP</span>
          <span className="navbar-breadcrumb-sep">/</span>
          <span className="navbar-breadcrumb-page">{pageTitle}</span>
        </div>
      </div>

      <div className="navbar-right">
        <button className="navbar-icon-btn" onClick={toggleTheme} aria-label="Toggle theme">
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button className="navbar-icon-btn navbar-notif-btn" aria-label="Notifications">
          <Bell size={18} />
          <span className="navbar-notif-dot" />
        </button>
        <div className="navbar-user-chip">
          <div className="navbar-user-avatar">{user?.name?.charAt(0) || 'U'}</div>
          <div className="navbar-user-meta">
            <span className="navbar-user-name">{user?.name || 'User'}</span>
            <span className="navbar-user-role">{user?.role || 'student'}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
