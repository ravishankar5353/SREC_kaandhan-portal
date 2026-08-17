import React from 'react';
import { motion } from 'framer-motion';

export const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizes = { sm: 16, md: 28, lg: 44 };
  const px = sizes[size] || 28;
  return (
    <motion.div
      className={`spinner ${className}`}
      style={{ width: px, height: px, borderWidth: Math.max(2, px / 10) }}
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 0.75, ease: 'linear' }}
    />
  );
};

export const PageLoader = () => (
  <div className="page-loader">
    <LoadingSpinner size="lg" />
    <p className="page-loader-text">Loading...</p>
  </div>
);

export const SkeletonBlock = ({ height = 40, radius = 8 }) => (
  <div className="skeleton-block" style={{ height, borderRadius: radius }} />
);
