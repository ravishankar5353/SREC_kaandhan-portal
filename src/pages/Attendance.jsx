import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DataTable } from '../components/ui/DataTable';
import { SearchBar, FilterDropdown } from '../components/ui/SearchBar';
import { StatusBadge } from '../components/ui/StatusBadge';
import { mockAttendance } from '../data/mockAttendance';
import { DEPARTMENTS } from '../utils/constants';

const Attendance = () => {
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('');
  const [attendanceData, setAttendanceData] = useState(mockAttendance);

  const toggleStatus = (id) => {
    setAttendanceData((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newStatus = item.status === 'Present' ? 'Absent' : 'Present';
          const newAttended = newStatus === 'Present' ? item.attended + 1 : Math.max(0, item.attended - 1);
          const newPercentage = Math.round((newAttended / item.totalClasses) * 100 * 10) / 10;
          return {
            ...item,
            status: newStatus,
            attended: newAttended,
            percentage: newPercentage
          };
        }
        return item;
      })
    );
  };

  const filtered = attendanceData.filter((item) => {
    const matchesSearch =
      !search ||
      item.studentName.toLowerCase().includes(search.toLowerCase()) ||
      item.rollNo.toLowerCase().includes(search.toLowerCase());
    const matchesDept = !deptFilter || item.department === deptFilter;
    return matchesSearch && matchesDept;
  });

  const columns = [
    { key: 'rollNo', label: 'Roll Number', sortable: true },
    { key: 'studentName', label: 'Student Name', sortable: true },
    { key: 'department', label: 'Department', sortable: true },
    { key: 'course', label: 'Course', sortable: true },
    {
      key: 'attendanceDetail',
      label: 'Attended / Total',
      render: (_, row) => `${row.attended} / ${row.totalClasses}`
    },
    {
      key: 'percentage',
      label: 'Percentage',
      sortable: true,
      render: (v) => (
        <span className={`font-bold ${v < 75 ? 'text-rose-500' : 'text-emerald-500'}`}>
          {v}%
        </span>
      )
    },
    {
      key: 'status',
      label: 'Today\'s Status',
      render: (v, row) => (
        <button
          onClick={() => toggleStatus(row.id)}
          className="focus:outline-none hover:opacity-85 transition-opacity"
        >
          <StatusBadge status={v} size="sm" />
        </button>
      )
    }
  ];

  return (
    <motion.div className="page-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Attendance Tracking</h1>
          <p className="page-subtitle">Manage daily biometric and manual attendance logs</p>
        </div>
      </div>
      <div className="toolbar">
        <SearchBar value={search} onChange={setSearch} placeholder="Search by student name or roll..." />
        <FilterDropdown
          label="Department"
          value={deptFilter}
          onChange={setDeptFilter}
          options={DEPARTMENTS}
          allLabel="All Departments"
        />
      </div>
      <DataTable columns={columns} data={filtered} emptyMessage="No students found for attendance tracking." />
    </motion.div>
  );
};

export default Attendance;
