import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, Eye, EyeOff, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/ui/Toast';

const Login = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const { addToast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) { addToast('Please enter email and password.', 'warning'); return; }
    setSubmitting(true);
    const res = await login(email, password);
    setSubmitting(false);
    if (res.error) { addToast(res.error, 'error'); return; }
    addToast(`Welcome back, ${res.user?.name || 'User'}!`, 'success');
    navigate('/dashboard');
  };

  const fillDemo = (em, pw) => { setEmail(em); setPassword(pw); };

  return (
    <div className="login-page">
      <motion.div
        className="login-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="login-brand">
          <div className="login-logo">S</div>
          <h1 className="login-title">SREC Kaandhan ERP</h1>
          <p className="login-subtitle">College Management Portal 2026</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-field">
            <label className="form-label">Email Address</label>
            <div className="input-icon-wrap">
              <Mail size={16} className="input-icon" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@srecnandyal.edu.in" className="form-input form-input-icon" required />
            </div>
          </div>

          <div className="form-field">
            <label className="form-label">Password</label>
            <div className="input-icon-wrap">
              <Lock size={16} className="input-icon" />
              <input type={showPw ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" className="form-input form-input-icon" required />
              <button type="button" className="input-toggle-pw" onClick={() => setShowPw(!showPw)}>
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-full" disabled={submitting}>
            {submitting ? 'Signing In...' : <><LogIn size={16} /> Sign In</>}
          </button>
        </form>

        <div className="login-demo-section">
          <p className="login-demo-label">Quick Demo Access</p>
          <div className="login-demo-chips">
            <button className="demo-chip demo-admin" onClick={() => fillDemo('admin@srecnandyal.edu.in', 'admin2026')}>
              <span className="demo-chip-role">Admin</span>
              <span className="demo-chip-email">admin@srecnandyal.edu.in</span>
            </button>
            <button className="demo-chip demo-faculty" onClick={() => fillDemo('mahesh.kumar@srecnandyal.edu.in', 'faculty2026')}>
              <span className="demo-chip-role">Faculty</span>
              <span className="demo-chip-email">Mr. Mahesh (Code Tantra)</span>
            </button>
            <button className="demo-chip demo-student" onClick={() => fillDemo('ravi.shankar@srecnandyal.edu.in', 'student2026')}>
              <span className="demo-chip-role">Student</span>
              <span className="demo-chip-email">Y. Ravi Shankar (24X51A05Y9)</span>
            </button>
          </div>
        </div>

        <p className="login-footer-text">
          Developed by <strong>Y. Ravi Shankar</strong> · Trained by <strong>Mr. Mahesh</strong> (Code Tantra)
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
