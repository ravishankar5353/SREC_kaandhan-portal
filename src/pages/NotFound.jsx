import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ChevronLeft } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 space-y-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-7xl sm:text-9xl font-black text-indigo-500 font-['Outfit'] tracking-wider"
      >
        404
      </motion.div>

      <div className="space-y-2">
        <h2 className="text-xl sm:text-2xl font-black text-white font-['Outfit']">Module Not Found</h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
          The requested page or ERP module has been restructured under SREC Autonomous R23 Guidelines or is unavailable.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-ghost border border-white/10 px-4 py-2 text-xs flex items-center gap-1"
        >
          <ChevronLeft size={14} />
          <span>Go Back</span>
        </button>
        <button
          onClick={() => navigate('/dashboard')}
          className="btn btn-primary px-4 py-2 text-xs flex items-center gap-1.5"
        >
          <Home size={14} />
          <span>Dashboard</span>
        </button>
      </div>
    </div>
  );
};

export default NotFound;
