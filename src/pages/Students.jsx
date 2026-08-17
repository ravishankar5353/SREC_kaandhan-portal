import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Eye, Users } from 'lucide-react';
import { useStudents } from '../hooks/useStudents';
import { DataTable } from '../components/ui/DataTable';
import { SearchBar, FilterDropdown } from '../components/ui/SearchBar';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Modal } from '../components/ui/Modal';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { FormInput } from '../components/ui/FormInput';
import { useToast } from '../components/ui/Toast';
import { DEPARTMENTS, YEARS, GENDERS } from '../utils/constants';
import { validateStudent } from '../utils/validators';
import { formatShortName } from '../utils/formatters';

const emptyStudent = { name: '', email: '', phone: '', gender: '', dob: '', department: '', course: '', year: '', rollNo: '', bloodGroup: '', address: '' };

const Students = () => {
  const { students, loading, addStudent, updateStudent, deleteStudent } = useStudents();
  const { addToast } = useToast();
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [viewStudent, setViewStudent] = useState(null);
  const [editStudent, setEditStudent] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [form, setForm] = useState(emptyStudent);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const filtered = useMemo(() => {
    return students.filter((s) => {
      const matchSearch = !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.rollNo.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase());
      const matchDept = !deptFilter || s.department === deptFilter;
      const matchYear = !yearFilter || s.year === yearFilter;
      return matchSearch && matchDept && matchYear;
    });
  }, [students, search, deptFilter, yearFilter]);

  const openAdd = () => { setEditStudent(null); setForm(emptyStudent); setErrors({}); setModalOpen(true); };
  const openEdit = (s) => { setEditStudent(s); setForm({ ...s }); setErrors({}); setModalOpen(true); };

  const handleSave = async () => {
    const errs = validateStudent(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSaving(true);
    if (editStudent) {
      const { error } = await updateStudent(editStudent.id, form);
      if (error) addToast('Failed to update student.', 'error');
      else { addToast('Student updated successfully.', 'success'); setModalOpen(false); }
    } else {
      const { error } = await addStudent(form);
      if (error) addToast('Failed to add student.', 'error');
      else { addToast('Student added successfully!', 'success'); setModalOpen(false); }
    }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const { error } = await deleteStudent(deleteTarget.id);
    if (error) addToast('Failed to delete student.', 'error');
    else addToast(`${deleteTarget.name} has been removed.`, 'success');
    setDeleteTarget(null);
  };

  const columns = [
    { key: 'name', label: 'Student', sortable: true, render: (_, row) => (
      <div className="table-user-cell">
        <div className="table-avatar">{formatShortName(row.name)}</div>
        <div><div className="table-cell-primary">{row.name}</div><div className="table-cell-secondary">{row.rollNo}</div></div>
      </div>
    )},
    { key: 'department', label: 'Department', sortable: true, render: (v) => <span className="table-cell-truncate">{v}</span> },
    { key: 'year', label: 'Year', sortable: true },
    { key: 'cgpa', label: 'CGPA', sortable: true, render: (v) => <strong>{v}</strong> },
    { key: 'attendance', label: 'Attendance', sortable: true, render: (v) => `${v}%` },
    { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} size="xs" /> },
    { key: 'actions', label: 'Actions', render: (_, row) => (
      <div className="table-actions">
        <button className="table-action-btn" title="View" onClick={() => setViewStudent(row)}><Eye size={14} /></button>
        <button className="table-action-btn" title="Edit" onClick={() => openEdit(row)}><Edit2 size={14} /></button>
        <button className="table-action-btn table-action-danger" title="Delete" onClick={() => setDeleteTarget(row)}><Trash2 size={14} /></button>
      </div>
    )},
  ];

  return (
    <motion.div className="page-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="page-header">
        <div><h1 className="page-title">Student Management</h1><p className="page-subtitle">{students.length} registered students</p></div>
        <button className="btn btn-primary" onClick={openAdd}><Plus size={16} /> Add Student</button>
      </div>

      <div className="toolbar">
        <SearchBar value={search} onChange={setSearch} placeholder="Search by name, roll no, or email..." />
        <FilterDropdown label="Department" value={deptFilter} onChange={setDeptFilter} options={DEPARTMENTS} allLabel="All Departments" />
        <FilterDropdown label="Year" value={yearFilter} onChange={setYearFilter} options={YEARS} allLabel="All Years" />
      </div>

      <DataTable columns={columns} data={filtered} loading={loading} emptyMessage="No students match your search criteria." />

      {/* Add / Edit Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editStudent ? 'Edit Student' : 'Add New Student'} size="lg"
        footer={<><button className="btn btn-ghost" onClick={() => setModalOpen(false)}>Cancel</button><button className="btn btn-primary" onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : editStudent ? 'Update Student' : 'Add Student'}</button></>}
      >
        <div className="form-grid-2">
          <FormInput label="Full Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} error={errors.name} placeholder="e.g. Y. Ravi Shankar" />
          <FormInput label="Roll Number" value={form.rollNo} onChange={(e) => setForm({ ...form, rollNo: e.target.value.toUpperCase() })} placeholder="e.g. 24X51A05Y9" />
          <FormInput label="Email" required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} error={errors.email} placeholder="student@srecnandyal.edu.in" />
          <FormInput label="Phone" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} error={errors.phone} placeholder="9848XXXXXX" />
          <FormInput label="Gender" required type="select" value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} error={errors.gender}>
            <option value="">Select Gender</option>{GENDERS.map((g) => <option key={g}>{g}</option>)}
          </FormInput>
          <FormInput label="Date of Birth" type="date" value={form.dob} onChange={(e) => setForm({ ...form, dob: e.target.value })} />
          <FormInput label="Department" required type="select" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} error={errors.department}>
            <option value="">Select Department</option>{DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
          </FormInput>
          <FormInput label="Year" required type="select" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} error={errors.year}>
            <option value="">Select Year</option>{YEARS.map((y) => <option key={y}>{y}</option>)}
          </FormInput>
          <FormInput label="Address" type="textarea" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="form-col-span-2" placeholder="D.No, Street, City, Pincode" />
        </div>
      </Modal>

      {/* View Modal */}
      <Modal isOpen={!!viewStudent} onClose={() => setViewStudent(null)} title="Student Profile" size="md">
        {viewStudent && (
          <div className="profile-view">
            <div className="profile-view-header">
              <div className="profile-view-avatar">{formatShortName(viewStudent.name)}</div>
              <div><h3 className="profile-view-name">{viewStudent.name}</h3><p className="profile-view-sub">{viewStudent.rollNo} · {viewStudent.department}</p></div>
            </div>
            <div className="profile-view-grid">
              <div><span className="pv-label">Email</span><span className="pv-value">{viewStudent.email}</span></div>
              <div><span className="pv-label">Phone</span><span className="pv-value">{viewStudent.phone}</span></div>
              <div><span className="pv-label">Gender</span><span className="pv-value">{viewStudent.gender}</span></div>
              <div><span className="pv-label">Year</span><span className="pv-value">{viewStudent.year}</span></div>
              <div><span className="pv-label">CGPA</span><span className="pv-value">{viewStudent.cgpa}</span></div>
              <div><span className="pv-label">Attendance</span><span className="pv-value">{viewStudent.attendance}%</span></div>
              <div><span className="pv-label">Blood Group</span><span className="pv-value">{viewStudent.bloodGroup || '—'}</span></div>
              <div><span className="pv-label">Status</span><StatusBadge status={viewStudent.status} /></div>
            </div>
            {viewStudent.address && <div className="profile-view-address"><span className="pv-label">Address</span><p className="pv-value">{viewStudent.address}</p></div>}
          </div>
        )}
      </Modal>

      {/* Delete Confirm */}
      <ConfirmDialog isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete}
        title="Delete Student" message={`Are you sure you want to permanently remove ${deleteTarget?.name}? This action cannot be undone.`} />
    </motion.div>
  );
};

export default Students;
