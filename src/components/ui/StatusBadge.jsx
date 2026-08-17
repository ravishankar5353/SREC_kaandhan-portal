import React from 'react';

const variants = {
  Paid:        'badge-success',
  Active:      'badge-success',
  Present:     'badge-success',
  Pass:        'badge-success',
  Placed:      'badge-success',
  Completed:   'badge-success',
  Partial:     'badge-warning',
  'In Progress':'badge-warning',
  Upcoming:    'badge-warning',
  Pending:     'badge-danger',
  Absent:      'badge-danger',
  Fail:        'badge-danger',
  'Not Placed':'badge-danger',
  Inactive:    'badge-neutral',
  High:        'badge-danger',
  Medium:      'badge-warning',
  Low:         'badge-info',
  Admin:       'badge-purple',
  Faculty:     'badge-info',
  Student:     'badge-success',
};

export const StatusBadge = ({ status, size = 'sm' }) => {
  const cls = variants[status] || 'badge-neutral';
  return (
    <span className={`status-badge ${cls} ${size === 'xs' ? 'badge-xs' : ''}`}>
      {status}
    </span>
  );
};
