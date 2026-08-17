import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Building2, TrendingUp, DollarSign } from 'lucide-react';
import { DataTable } from '../components/ui/DataTable';
import { SearchBar } from '../components/ui/SearchBar';
import { StatusBadge } from '../components/ui/StatusBadge';
import { mockCompanies, mockPlacements } from '../data/mockPlacements';
import { formatCurrency } from '../utils/formatters';

const Placements = () => {
  const [activeTab, setActiveTab] = useState('companies');
  const [searchComp, setSearchComp] = useState('');
  const [searchPl, setSearchPl] = useState('');

  const filteredCompanies = mockCompanies.filter((c) =>
    c.name.toLowerCase().includes(searchComp.toLowerCase()) ||
    c.sector.toLowerCase().includes(searchComp.toLowerCase())
  );

  const filteredPlacements = mockPlacements.filter((p) =>
    p.studentName.toLowerCase().includes(searchPl.toLowerCase()) ||
    p.rollNo.toLowerCase().includes(searchPl.toLowerCase()) ||
    p.company.toLowerCase().includes(searchPl.toLowerCase())
  );

  const companyColumns = [
    {
      key: 'name',
      label: 'Recruiter',
      sortable: true,
      render: (_, row) => (
        <div className="flex items-center gap-2">
          <span className="text-xl">{row.logo}</span>
          <span className="font-bold text-white">{row.name}</span>
        </div>
      )
    },
    { key: 'sector', label: 'Sector', sortable: true },
    { key: 'visits', label: 'Visits', sortable: true },
    { key: 'offers', label: 'Total Offers Issued', sortable: true },
    { key: 'avgPackage', label: 'Average Package', sortable: true, render: (v) => formatCurrency(v) },
    { key: 'maxPackage', label: 'Highest Package Offered', sortable: true, render: (v) => <strong className="text-emerald-400">{formatCurrency(v)}</strong> }
  ];

  const placementColumns = [
    { key: 'rollNo', label: 'Roll Number', sortable: true },
    { key: 'studentName', label: 'Student Name', sortable: true },
    { key: 'department', label: 'Department', sortable: true },
    { key: 'company', label: 'Company', sortable: true },
    { key: 'role', label: 'Offered Role', sortable: true },
    { key: 'package', label: 'Package LPA', sortable: true, render: (v) => formatCurrency(v) },
    { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> }
  ];

  return (
    <motion.div className="page-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Career Development & Placements</h1>
          <p className="page-subtitle">Track top hiring partners, placement packages, and selected students</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 mb-6">
        <button
          onClick={() => setActiveTab('companies')}
          className={`pb-3 px-6 text-sm font-bold border-b-2 transition-all ${
            activeTab === 'companies'
              ? 'border-indigo-500 text-white font-extrabold'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Top Recruiters
        </button>
        <button
          onClick={() => setActiveTab('placements')}
          className={`pb-3 px-6 text-sm font-bold border-b-2 transition-all ${
            activeTab === 'placements'
              ? 'border-indigo-500 text-white font-extrabold'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Selected Students Ledger
        </button>
      </div>

      {activeTab === 'companies' ? (
        <>
          <div className="toolbar">
            <SearchBar value={searchComp} onChange={setSearchComp} placeholder="Search hiring partners or sectors..." />
          </div>
          <DataTable columns={companyColumns} data={filteredCompanies} emptyMessage="No recruiters listed." />
        </>
      ) : (
        <>
          <div className="toolbar">
            <SearchBar value={searchPl} onChange={setSearchPl} placeholder="Search student name, roll or recruiter..." />
          </div>
          <DataTable columns={placementColumns} data={filteredPlacements} emptyMessage="No placements recorded for this batch yet." />
        </>
      )}
    </motion.div>
  );
};

export default Placements;
