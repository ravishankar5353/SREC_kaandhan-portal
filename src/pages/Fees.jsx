import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, CreditCard, Receipt, FileText } from 'lucide-react';
import { DataTable } from '../components/ui/DataTable';
import { SearchBar, FilterDropdown } from '../components/ui/SearchBar';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Modal } from '../components/ui/Modal';
import { FormInput } from '../components/ui/FormInput';
import { mockFees } from '../data/mockFees';
import { DEPARTMENTS } from '../utils/constants';
import { formatCurrency, formatDate } from '../utils/formatters';
import { useToast } from '../components/ui/Toast';

const Fees = () => {
  const { addToast } = useToast();
  const [fees, setFees] = useState(mockFees);
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFee, setSelectedFee] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMode, setPaymentMode] = useState('Online');

  const filtered = fees.filter((f) => {
    const matchesSearch =
      !search ||
      f.studentName.toLowerCase().includes(search.toLowerCase()) ||
      f.rollNo.toLowerCase().includes(search.toLowerCase());
    const matchesDept = !deptFilter || f.department === deptFilter;
    return matchesSearch && matchesDept;
  });

  const openPaymentModal = (fee) => {
    setSelectedFee(fee);
    setPaymentAmount(fee.pendingAmount.toString());
    setModalOpen(true);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    const amount = Number(paymentAmount);
    if (isNaN(amount) || amount <= 0 || amount > selectedFee.pendingAmount) {
      addToast('Please enter a valid payment amount.', 'warning');
      return;
    }

    setFees((prev) =>
      prev.map((f) => {
        if (f.id === selectedFee.id) {
          const newPaid = f.paidAmount + amount;
          const newPending = f.totalFee - newPaid;
          const newStatus = newPending === 0 ? 'Paid' : 'Partial';
          return {
            ...f,
            paidAmount: newPaid,
            pendingAmount: newPending,
            status: newStatus,
            lastPaymentDate: new Date().toISOString().split('T')[0],
            paymentMode,
            receiptNo: `RCP-2026-${Math.floor(100 + Math.random() * 900)}`
          };
        }
        return f;
      })
    );

    addToast('Payment recorded successfully!', 'success');
    setModalOpen(false);
  };

  const columns = [
    { key: 'rollNo', label: 'Roll Number', sortable: true },
    { key: 'studentName', label: 'Student Name', sortable: true },
    { key: 'department', label: 'Department', sortable: true, render: (v) => <span className="table-cell-truncate">{v}</span> },
    { key: 'totalFee', label: 'Total Fee', sortable: true, render: (v) => formatCurrency(v) },
    { key: 'paidAmount', label: 'Paid', sortable: true, render: (v) => formatCurrency(v) },
    { key: 'pendingAmount', label: 'Pending', sortable: true, render: (v) => formatCurrency(v) },
    { key: 'status', label: 'Status', sortable: true, render: (v) => <StatusBadge status={v} /> },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <div className="table-actions">
          {row.pendingAmount > 0 && (
            <button
              className="btn btn-xs btn-primary py-1 px-2.5 rounded-lg flex items-center gap-1"
              onClick={() => openPaymentModal(row)}
            >
              <CreditCard size={12} />
              <span>Pay</span>
            </button>
          )}
          {row.receiptNo && (
            <span className="text-[11px] text-slate-400 font-mono" title={`Receipt: ${row.receiptNo}`}>
              {row.receiptNo}
            </span>
          )}
        </div>
      )
    }
  ];

  return (
    <motion.div className="page-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Fee Management</h1>
          <p className="page-subtitle">Track student tuition fees, outstanding balances, and receipts</p>
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
      <DataTable columns={columns} data={filtered} emptyMessage="No student fee records found." />

      {/* Payment Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Record Student Fee Payment"
        size="sm"
        footer={
          <>
            <button className="btn btn-ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handlePaymentSubmit}>
              Submit Payment
            </button>
          </>
        }
      >
        {selectedFee && (
          <form className="space-y-4 text-left">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-1 text-xs">
              <div>
                <strong className="text-slate-400">Student:</strong> <span className="text-white font-bold">{selectedFee.studentName} ({selectedFee.rollNo})</span>
              </div>
              <div>
                <strong className="text-slate-400">Total Tuition Fee:</strong> <span className="text-white">{formatCurrency(selectedFee.totalFee)}</span>
              </div>
              <div>
                <strong className="text-slate-400">Total Paid Amount:</strong> <span className="text-emerald-400 font-bold">{formatCurrency(selectedFee.paidAmount)}</span>
              </div>
              <div>
                <strong className="text-slate-400">Pending Balance:</strong> <span className="text-rose-400 font-bold">{formatCurrency(selectedFee.pendingAmount)}</span>
              </div>
            </div>

            <FormInput
              label="Payment Amount (INR)"
              required
              type="number"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              placeholder="e.g. 10000"
            />

            <FormInput
              label="Payment Mode"
              required
              type="select"
              value={paymentMode}
              onChange={(e) => setPaymentMode(e.target.value)}
            >
              <option value="Online">Online Transfer / UPI</option>
              <option value="DD">Demand Draft (DD)</option>
              <option value="Cash">Cash Counter</option>
            </FormInput>
          </form>
        )}
      </Modal>
    </motion.div>
  );
};

export default Fees;
