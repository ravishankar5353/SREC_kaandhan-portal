import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export const DashboardCard = ({ title, value, subtitle, icon: Icon, color = 'blue', trend, trendValue, onClick }) => {
  const colorMap = {
    blue:   { bg: 'var(--card-blue-bg)',   icon: 'var(--card-blue-icon)',   border: 'var(--card-blue-border)' },
    green:  { bg: 'var(--card-green-bg)',  icon: 'var(--card-green-icon)',  border: 'var(--card-green-border)' },
    purple: { bg: 'var(--card-purple-bg)', icon: 'var(--card-purple-icon)', border: 'var(--card-purple-border)' },
    amber:  { bg: 'var(--card-amber-bg)',  icon: 'var(--card-amber-icon)',  border: 'var(--card-amber-border)' },
    red:    { bg: 'var(--card-red-bg)',    icon: 'var(--card-red-icon)',    border: 'var(--card-red-border)' },
    cyan:   { bg: 'var(--card-cyan-bg)',   icon: 'var(--card-cyan-icon)',   border: 'var(--card-cyan-border)' },
    pink:   { bg: 'var(--card-pink-bg)',   icon: 'var(--card-pink-icon)',   border: 'var(--card-pink-border)' },
    indigo: { bg: 'var(--card-indigo-bg)', icon: 'var(--card-indigo-icon)', border: 'var(--card-indigo-border)' },
  };
  const c = colorMap[color] || colorMap.blue;

  return (
    <motion.div
      className="dashboard-card"
      style={{ borderColor: c.border }}
      whileHover={{ translateY: -4, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={onClick}
    >
      <div className="dashboard-card-header">
        <div>
          <p className="dashboard-card-title">{title}</p>
          <p className="dashboard-card-value">{value}</p>
          {subtitle && <p className="dashboard-card-subtitle">{subtitle}</p>}
        </div>
        <div className="dashboard-card-icon" style={{ background: c.bg, color: c.icon }}>
          {Icon && <Icon size={22} />}
        </div>
      </div>
      {trendValue !== undefined && (
        <div className="dashboard-card-trend">
          {trend === 'up' && <TrendingUp size={13} className="trend-up" />}
          {trend === 'down' && <TrendingDown size={13} className="trend-down" />}
          {trend === 'flat' && <Minus size={13} className="trend-flat" />}
          <span className={trend === 'up' ? 'trend-up' : trend === 'down' ? 'trend-down' : 'trend-flat'}>
            {trendValue}
          </span>
        </div>
      )}
    </motion.div>
  );
};
