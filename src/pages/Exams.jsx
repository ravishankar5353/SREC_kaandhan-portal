import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { DataTable } from '../components/ui/DataTable';
import { SearchBar, FilterDropdown } from '../components/ui/SearchBar';
import { StatusBadge } from '../components/ui/StatusBadge';
import { mockExams, mockResults } from '../data/mockExams';
import { DEPARTMENTS } from '../utils/constants';

const Exams = () => {
  const [activeTab, setActiveTab] = useState('schedule');
  const [searchSchedule, setSearchSchedule] = useState('');
  const [searchResult, setSearchResult] = useState('');
  const [deptFilter, setDeptFilter] = useState('');

  const filteredSchedule = mockExams.filter((exam) => {
    const matchesSearch =
      !searchSchedule ||
      exam.name.toLowerCase().includes(searchSchedule.toLowerCase()) ||
      exam.course.toLowerCase().includes(searchSchedule.toLowerCase());
    const matchesDept = !deptFilter || exam.department === deptFilter;
    return matchesSearch && matchesDept;
  });

  const filteredResults = mockResults.filter((res) => {
    return (
      !searchResult ||
      res.studentName.toLowerCase().includes(searchResult.toLowerCase()) ||
      res.rollNo.toLowerCase().includes(searchResult.toLowerCase()) ||
      res.course.toLowerCase().includes(searchResult.toLowerCase())
    );
  });

  const scheduleColumns = [
    { key: 'name', label: 'Exam Name', sortable: true },
    { key: 'department', label: 'Department', sortable: true, render: (v) => <span className="table-cell-truncate">{v}</span> },
    { key: 'course', label: 'Subject/Course', sortable: true },
    { key: 'date', label: 'Date', sortable: true },
    { key: 'time', label: 'Time' },
    { key: 'venue', label: 'Venue' },
    { key: 'totalMarks', label: 'Marks', render: (v) => `${v} Marks` },
    { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> }
  ];

  const resultsColumns = [
    { key: 'rollNo', label: 'Roll Number', sortable: true },
    { key: 'studentName', label: 'Student Name', sortable: true },
    { key: 'course', label: 'Subject/Course', sortable: true },
    { key: 'marksObtained', label: 'Marks Obtained', sortable: true, render: (v, row) => `${v} / ${row.totalMarks}` },
    { key: 'percentage', label: 'Percentage', sortable: true, render: (v) => `${v}%` },
    { key: 'grade', label: 'Grade', sortable: true, render: (v) => <strong className="text-cyan-400 font-mono">{v}</strong> },
    { key: 'result', label: 'Result', sortable: true, render: (v) => <StatusBadge status={v} /> }
  ];

  return (
    <motion.div className="page-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Exams & Semester Results</h1>
          <p className="page-subtitle">Manage examination schedules, subjects, and student scorecards</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 mb-6">
        <button
          onClick={() => setActiveTab('schedule')}
          className={`pb-3 px-6 text-sm font-bold border-b-2 transition-all ${
            activeTab === 'schedule'
              ? 'border-indigo-500 text-white font-extrabold'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Exam Schedule
        </button>
        <button
          onClick={() => setActiveTab('results')}
          className={`pb-3 px-6 text-sm font-bold border-b-2 transition-all ${
            activeTab === 'results'
              ? 'border-indigo-500 text-white font-extrabold'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Semester Results Ledger
        </button>
      </div>

      {activeTab === 'schedule' ? (
        <>
          <div className="toolbar">
            <SearchBar value={searchSchedule} onChange={setSearchSchedule} placeholder="Search exams or subjects..." />
            <FilterDropdown
              label="Department"
              value={deptFilter}
              onChange={setDeptFilter}
              options={DEPARTMENTS}
              allLabel="All Departments"
            />
          </div>
          <DataTable columns={scheduleColumns} data={filteredSchedule} emptyMessage="No exam schedules available." />
        </>
      ) : (
        <>
          <div className="toolbar">
            <SearchBar value={searchResult} onChange={setSearchResult} placeholder="Search student name, roll or course..." />
          </div>
          <DataTable columns={resultsColumns} data={filteredResults} emptyMessage="No exam results entered yet." />
        </>
      )}
    </motion.div>
  );
};

export default Exams;
