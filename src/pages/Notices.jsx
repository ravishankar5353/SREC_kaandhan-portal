import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Bell, Pin } from 'lucide-react';
import { useNotices } from '../hooks/useNotices';
import { useAuth } from '../context/AuthContext';
import { DataTable } from '../components/ui/DataTable';
import { SearchBar, FilterDropdown } from '../components/ui/SearchBar';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Modal } from '../components/ui/Modal';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { FormInput } from '../components/ui/FormInput';
import { useToast } from '../components/ui/Toast';
import { NOTICE_PRIORITY } from '../utils/constants';
import { validateNotice } from '../utils/validators';
import { formatDate } from '../utils/formatters';

const emptyNotice = { title: '', content: '', category: 'General', priority: 'Medium', targetAudience: 'All Students', pinned: false };

const Notices = () => {
  const { notices, loading, addNotice, updateNotice, deleteNotice } = useNotices();
  const { user, isAdmin, isFaculty } = useAuth();
  const { addToast } = useToast();
  const [search, setSearch] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [viewTarget, setViewTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [form, setForm] = useState(emptyNotice);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const canEdit = isAdmin || isFaculty;

  const filtered = notices.filter((n) => {
    const matchesSearch =
      !search ||
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase());
    const matchesPriority = !priorityFilter || n.priority === priorityFilter;
    return matchesSearch && matchesPriority;
  });

  const openAdd = () => {
    if (!canEdit) return;
    setEditTarget(null);
    setForm({ ...emptyNotice, author: user?.name || 'Administrator' });
    setErrors({});
    setModalOpen(true);
  };

  const openEdit = (notice) => {
    if (!canEdit) return;
    setEditTarget(notice);
    setForm({ ...notice });
    setErrors({});
    setModalOpen(true);
  };

  const handleSave = async () => {
    const errs = validateNotice(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setSaving(true);
    if (editTarget) {
      const { error } = await updateNotice(editTarget.id, form);
      if (error) addToast('Failed to update notice.', 'error');
      else {
        addToast('Notice updated successfully.', 'success');
        setModalOpen(false);
      }
    } else {
      const { error } = await addNotice(form);
      if (error) addToast('Failed to post notice.', 'error');
      else {
        addToast('Notice posted successfully!', 'success');
        setModalOpen(false);
      }
    }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const { error } = await deleteNotice(deleteTarget.id);
    if (error) addToast('Failed to delete notice.', 'error');
    else addToast('Notice removed successfully.', 'success');
    setDeleteTarget(null);
  };

  const columns = [
    {
      key: 'title',
      label: 'Notice Title',
      sortable: true,
      render: (_, row) => (
        <div className="flex items-center gap-2">
          {row.pinned && <Pin size={12} className="text-amber-400 fill-amber-400 rotate-45 shrink-0" />}
          <span className="font-bold text-white hover:text-indigo-400 cursor-pointer" onClick={() => setViewTarget(row)}>
            {row.title}
          </span>
        </div>
      )
    },
    { key: 'category', label: 'Category', sortable: true },
    { key: 'priority', label: 'Priority', render: (v) => <StatusBadge status={v} size="xs" /> },
    { key: 'targetAudience', label: 'Audience' },
    { key: 'publishedAt', label: 'Posted Date', render: (v) => formatDate(v) },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <div className="table-actions">
          {canEdit && (
            <>
              <button className="table-action-btn" title="Edit" onClick={() => openEdit(row)}>
                <Edit2 size={13} />
              </button>
              <button className="table-action-btn table-action-danger" title="Delete" onClick={() => setDeleteTarget(row)}>
                <Trash2 size={13} />
              </button>
            </>
          )}
        </div>
      )
    }
  ];

  return (
    <motion.div className="page-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Notices & Announcements</h1>
          <p className="page-subtitle">{notices.length} active announcements posted</p>
        </div>
        {canEdit && (
          <button className="btn btn-primary" onClick={openAdd}>
            <Plus size={16} />
            <span>Post Notice</span>
          </button>
        )}
      </div>

      <div className="toolbar">
        <SearchBar value={search} onChange={setSearch} placeholder="Search notice title or content..." />
        <FilterDropdown
          label="Priority"
          value={priorityFilter}
          onChange={setPriorityFilter}
          options={Object.values(NOTICE_PRIORITY)}
          allLabel="All Priorities"
        />
      </div>

      <DataTable columns={columns} data={filtered} loading={loading} emptyMessage="No notices match your filters." />

      {/* Add/Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editTarget ? 'Edit Notice' : 'Post New Notice'}
        size="lg"
        footer={
          <>
            <button className="btn btn-ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : 'Post Notice'}
            </button>
          </>
        }
      >
        <div className="form-grid-2">
          <FormInput
            label="Notice Title"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            error={errors.title}
            className="form-col-span-2"
            placeholder="e.g. SANKET 2026 Symposium Registration"
          />

          <FormInput
            label="Category"
            required
            type="select"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option>General</option>
            <option>Events</option>
            <option>Examinations</option>
            <option>Fees</option>
            <option>Placements</option>
            <option>Administrative</option>
          </FormInput>

          <FormInput
            label="Priority"
            required
            type="select"
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </FormInput>

          <FormInput
            label="Target Audience"
            required
            value={form.targetAudience}
            onChange={(e) => setForm({ ...form, targetAudience: e.target.value })}
            placeholder="e.g. All Students, Faculty only"
          />

          <div className="form-field flex items-center gap-2 pt-6">
            <input
              type="checkbox"
              id="pinned"
              checked={form.pinned}
              onChange={(e) => setForm({ ...form, pinned: e.target.checked })}
              className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="pinned" className="text-xs font-bold text-slate-300 cursor-pointer">
              Pin Notice to Top of Ticker
            </label>
          </div>

          <FormInput
            label="Notice Description / Content"
            required
            type="textarea"
            rows="5"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            error={errors.content}
            className="form-col-span-2"
            placeholder="Describe the announcement details here..."
          />
        </div>
      </Modal>

      {/* View Modal */}
      <Modal isOpen={!!viewTarget} onClose={() => setViewTarget(null)} title="Notice Announcement" size="md">
        {viewTarget && (
          <div className="space-y-4 text-left">
            <div className="border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 mb-2">
                <StatusBadge status={viewTarget.priority} size="xs" />
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[10px] text-indigo-300 font-bold">
                  {viewTarget.category}
                </span>
                {viewTarget.pinned && <span className="text-[10px] text-amber-300 font-bold flex items-center gap-0.5">📌 Pinned</span>}
              </div>
              <h2 className="text-lg font-black text-white font-['Outfit']">{viewTarget.title}</h2>
              <p className="text-[10px] text-slate-400 mt-1">
                Posted by <strong>{viewTarget.author}</strong> on {formatDate(viewTarget.publishedAt)}
              </p>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">{viewTarget.content}</p>

            <div className="pt-3 border-t border-white/10 text-[10px] text-slate-400">
              Target Audience: <strong className="text-white">{viewTarget.targetAudience}</strong>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Remove Announcement"
        message={`Are you sure you want to delete "${deleteTarget?.title}"?`}
      />
    </motion.div>
  );
};

export default Notices;
