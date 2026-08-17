import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DataTable } from '../components/ui/DataTable';
import { SearchBar, FilterDropdown } from '../components/ui/SearchBar';
import { mockCourses } from '../data/mockDepts';
import { DEPARTMENTS, YEARS } from '../utils/constants';

const Courses = () => {
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('');

  const filtered = mockCourses.filter((c) => {
    const ms = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.code.toLowerCase().includes(search.toLowerCase());
    const md = !deptFilter || c.department === deptFilter;
    return ms && md;
  });

  const columns = [
    { key: 'code', label: 'Code', sortable: true, render: (v) => <strong className="font-mono">{v}</strong> },
    { key: 'name', label: 'Course Name', sortable: true },
    { key: 'department', label: 'Department', sortable: true, render: (v) => <span className="table-cell-truncate">{v}</span> },
    { key: 'year', label: 'Year', sortable: true },
    { key: 'semester', label: 'Sem', sortable: true },
    { key: 'credits', label: 'Credits', sortable: true },
    { key: 'type', label: 'Type', sortable: true },
    { key: 'faculty', label: 'Faculty', sortable: true },
    { key: 'enrolled', label: 'Enrolled', sortable: true },
  ];

  return (
    <motion.div className="page-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="page-header">
        <div><h1 className="page-title">Courses</h1><p className="page-subtitle">{mockCourses.length} courses (R23 Autonomous)</p></div>
      </div>
      <div className="toolbar">
        <SearchBar value={search} onChange={setSearch} placeholder="Search by course name or code..." />
        <FilterDropdown label="Department" value={deptFilter} onChange={setDeptFilter} options={DEPARTMENTS} allLabel="All Departments" />
      </div>
      <DataTable columns={columns} data={filtered} emptyMessage="No courses found." />
    </motion.div>
  );
};

export default Courses;
