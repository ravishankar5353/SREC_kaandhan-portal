import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell, Legend, LineChart, Line } from 'recharts';

const COLORS = ['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6'];

export const AttendanceChart = ({ data }) => (
  <div className="chart-card">
    <h3 className="chart-title">Monthly Attendance Trend</h3>
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="attGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="month" tick={{ fill: 'var(--text-3)', fontSize: 11 }} />
        <YAxis domain={[70, 100]} tick={{ fill: 'var(--text-3)', fontSize: 11 }} />
        <Tooltip contentStyle={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 10, fontSize: 12, color: 'var(--text-1)' }} />
        <Area type="monotone" dataKey="avg" stroke="#6366f1" fill="url(#attGrad)" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

export const StudentStatsChart = ({ data }) => (
  <div className="chart-card">
    <h3 className="chart-title">Students by Department</h3>
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} barSize={28}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="code" tick={{ fill: 'var(--text-3)', fontSize: 11 }} />
        <YAxis tick={{ fill: 'var(--text-3)', fontSize: 11 }} />
        <Tooltip contentStyle={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 10, fontSize: 12, color: 'var(--text-1)' }} />
        <Bar dataKey="students" fill="#6366f1" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export const PlacementChart = ({ data }) => (
  <div className="chart-card">
    <h3 className="chart-title">Year-wise Placement Statistics</h3>
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="year" tick={{ fill: 'var(--text-3)', fontSize: 11 }} />
        <YAxis tick={{ fill: 'var(--text-3)', fontSize: 11 }} />
        <Tooltip contentStyle={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 10, fontSize: 12, color: 'var(--text-1)' }} />
        <Line type="monotone" dataKey="percentage" stroke="#10b981" strokeWidth={2.5} dot={{ fill: '#10b981', r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export const FeeChart = ({ data }) => (
  <div className="chart-card">
    <h3 className="chart-title">Fee Collection Breakdown</h3>
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={95} paddingAngle={4} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
          {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
        </Pie>
        <Tooltip contentStyle={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 10, fontSize: 12, color: 'var(--text-1)' }} />
        <Legend wrapperStyle={{ fontSize: 11, color: 'var(--text-3)' }} />
      </PieChart>
    </ResponsiveContainer>
  </div>
);
