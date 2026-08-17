import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { LoadingSpinner } from './components/ui/LoadingSpinner';

// Layouts
import { AppLayout } from './layouts/AppLayout';
import { AuthLayout } from './layouts/AuthLayout';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Faculty from './pages/Faculty';
import Departments from './pages/Departments';
import Courses from './pages/Courses';
import Attendance from './pages/Attendance';
import Fees from './pages/Fees';
import Exams from './pages/Exams';
import Placements from './pages/Placements';
import Notices from './pages/Notices';
import CollegeProfile from './pages/CollegeProfile';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

// ─── Protected Route Component ──────────────────────────────────────────────
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-3">
        <LoadingSpinner size="lg" />
        <p className="text-xs text-slate-400 font-medium">Verifying portal session credentials...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

const App = () => {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Main ERP Routes */}
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Admin/Faculty Only */}
        <Route
          path="/students"
          element={
            <ProtectedRoute allowedRoles={['admin', 'faculty']}>
              <Students />
            </ProtectedRoute>
          }
        />
        <Route
          path="/faculty"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Faculty />
            </ProtectedRoute>
          }
        />
        <Route
          path="/departments"
          element={
            <ProtectedRoute allowedRoles={['admin', 'faculty']}>
              <Departments />
            </ProtectedRoute>
          }
        />

        {/* All Roles */}
        <Route path="/courses" element={<Courses />} />
        <Route path="/attendance" element={<Attendance />} />
        
        {/* Admin/Student Only */}
        <Route
          path="/fees"
          element={
            <ProtectedRoute allowedRoles={['admin', 'student']}>
              <Fees />
            </ProtectedRoute>
          }
        />
        
        <Route path="/exams" element={<Exams />} />
        
        {/* Admin/Student Only */}
        <Route
          path="/placements"
          element={
            <ProtectedRoute allowedRoles={['admin', 'student']}>
              <Placements />
            </ProtectedRoute>
          }
        />
        
        <Route path="/notices" element={<Notices />} />
        
        {/* Admin Only */}
        <Route
          path="/college-profile"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <CollegeProfile />
            </ProtectedRoute>
          }
        />
        
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* 404 Route */}
      <Route
        path="*"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
