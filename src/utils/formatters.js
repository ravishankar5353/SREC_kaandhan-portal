// ─── Formatters ──────────────────────────────────────────────────────────────

export const formatCurrency = (amount, currency = 'INR') =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount);

export const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
};

export const formatDateTime = (dateStr) => {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
};

export const formatPercentage = (val, decimals = 1) =>
  `${Number(val).toFixed(decimals)}%`;

export const formatShortName = (name = '') => {
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export const getGradeFromMarks = (marks, total = 100) => {
  const pct = (marks / total) * 100;
  if (pct >= 90) return 'O';
  if (pct >= 80) return 'A+';
  if (pct >= 70) return 'A';
  if (pct >= 60) return 'B+';
  if (pct >= 50) return 'B';
  if (pct >= 40) return 'C';
  return 'F';
};

export const getAttendancePct = (present, total) => {
  if (!total) return 0;
  return Math.round((present / total) * 100 * 10) / 10;
};

export const truncate = (str, maxLen = 40) =>
  str && str.length > maxLen ? str.slice(0, maxLen) + '…' : str;

export const generateId = (prefix = 'ID') =>
  `${prefix}-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 5).toUpperCase()}`;
