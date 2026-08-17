import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Eye } from 'lucide-react';
import { useFaculty } from '../hooks/useFaculty';
import { DataTable } from '../components/ui/DataTable';
import { SearchBar, FilterDropdown } from '../components/ui/SearchBar';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Modal } from '../components/ui/Modal';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { FormInput } from '../components/ui/FormInput';
import { useToast } from '../components/ui/Toast';
import { DEPARTMENTS } from '../utils/constants';
import { validateFaculty } from '../utils/validators';
import { formatShortName } from '../utils/formatters';

const emptyForm = { name: '', email: '', phone: '', department: '', designation: '', qualification: '', experience: '', specialization: '' };

const Faculty = () => {
  const { faculty, loading, addFaculty, updateFaculty, deleteFaculty } = useFaculty();
  const { addToast } = useToast();
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [viewTarget, setViewTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const filtered = useMemo(() => faculty.filter((f) => {
    const ms = !search || f.name.toLowerCase().includes(search.toLowerCase()) || f.email.toLowerCase().includes(search.toLowerCase());
    const md = !deptFilter || f.department === deptFilter;
    return ms && md;
  }), [faculty, search, deptFilter]);

  const openAdd = () => { setEditTarget(null); setForm(emptyForm); setErrors({}); setModalOpen(true); };
  const openEdit = (f) => { setEditTarget(f); setForm({ ...f }); setErrors({}); setModalOpen(true); };

  const handleSave = async () => {
    const errs = validateFaculty(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSaving(true);
    if (editTarget) {
      const { error } = await updateFaculty(editTarget.id, form);
      error ? addToast('Failed to update.', 'error') : addToast('Faculty updated.', 'success');
    } else {
      const { error } = await addFaculty(form);
      error ? addToast('Failed to add.', 'error') : addToast('Faculty added!', 'success');
    }
    setSaving(false);
    setModalOpen(false);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const { error } = await deleteFaculty(deleteTarget.id);
    error ? addToast('Delete failed.', 'error') : addToast(`${deleteTarget.name} removed.`, 'success');
    setDeleteTarget(null);
  };

  const columns = [
    { key: 'name', label: 'Faculty Member', sortable: true, render: (_, row) => (
      <div className="table-user-cell"><div className="table-avatar">{formatShortName(row.name)}</div><div><div className="table-cell-primary">{row.name}</div><div className="table-cell-secondary">{row.facultyId}</div></div></div>
    )},
    { key: 'department', label: 'Department', sortable: true, render: (v) => <span className="table-cell-truncate">{v}</span> },
    { key: 'designation', label: 'Designation', sortable: true },
    { key: 'experience', label: 'Exp. (Yrs)', sortable: true, render: (v) => `${v} yrs` },
    { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} size="xs" /> },
    { key: 'actions', label: 'Actions', render: (_, row) => (
      <div className="table-actions">
        <button className="table-action-btn" title="View" onClick={() => setViewTarget(row)}><Eye size={14} /></button>
        <button className="table-action-btn" title="Edit" onClick={() => openEdit(row)}><Edit2 size={14} /></button>
        <button className="table-action-btn table-action-danger" title="Delete" onClick={() => setDeleteTarget(row)}><Trash2 size={14} /></button>
      </div>
    )},
  ];

  return (
    <motion.div className="page-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="page-header">
        <div><h1 className="page-title">Faculty Management</h1><p className="page-subtitle">{faculty.length} faculty members</p></div>
        <button className="btn btn-primary" onClick={openAdd}><Plus size={16} /> Add Faculty</button>
      </div>
      <div className="toolbar">
        <SearchBar value={search} onChange={setSearch} placeholder="Search by name or email..." />
        <FilterDropdown label="Department" value={deptFilter} onChange={setDeptFilter} options={DEPARTMENTS} allLabel="All Departments" />
      </div>
      <DataTable columns={columns} data={filtered} loading={loading} emptyMessage="No faculty members found." />

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editTarget ? 'Edit Faculty' : 'Add Faculty'} size="lg"
        footer={<><button className="btn btn-ghost" onClick={() => setModalOpen(false)}>Cancel</button><button className="btn btn-primary" onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Save'}</button></>}>
        <div className="form-grid-2">
          <FormInput label="Full Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} error={errors.name} />
          <FormInput label="Email" required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} error={errors.email} />
          <FormInput label="Phone" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} error={errors.phone} />
          <FormInput label="Department" required type="select" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} error={errors.department}>
            <option value="">Select</option>{DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
          </FormInput>
          <FormInput label="Designation" required value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} error={errors.designation} />
          <FormInput label="Experience (Years)" type="number" value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} />
          <FormInput label="Qualification" value={form.qualification} onChange={(e) => setForm({ ...form, qualification: e.target.value })} />
          <FormInput label="Specialization" value={form.specialization} onChange={(e) => setForm({ ...form, specialization: e.target.value })} />
        </div>
      </Modal>

      <Modal isOpen={!!viewTarget} onClose={() => setViewTarget(null)} title="Faculty Profile" size="md">
        {viewTarget && (
          <div className="profile-view">
            <div className="profile-view-header"><div className="profile-view-avatar">{formatShortName(viewTarget.name)}</div><div><h3 className="profile-view-name">{viewTarget.name}</h3><p className="profile-view-sub">{viewTarget.designation} · {viewTarget.department}</p></div></div>
            <div className="profile-view-grid">
              <div><span className="pv-label">Email</span><span className="pv-value">{viewTarget.email}</span></div>
              <div><span className="pv-label">Phone</span><span className="pv-value">{viewTarget.phone}</span></div>
              <div><span className="pv-label">Experience</span><span className="pv-value">{viewTarget.experience} Years</span></div>
              <div><span className="pv-label">Qualification</span><span className="pv-value">{viewTarget.qualification}</span></div>
              <div><span className="pv-label">Specialization</span><span className="pv-value">{viewTarget.specialization || '—'}</span></div>
              <div><span className="pv-label">Status</span><StatusBadge status={viewTarget.status} /></div>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDialog isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete}
        title="Remove Faculty" message={`Are you sure you want to remove ${deleteTarget?.name}?`} />
    </motion.div>
  );
};

export default Faculty;
