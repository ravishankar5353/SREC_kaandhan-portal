import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { Modal } from './Modal';

export const ConfirmDialog = ({ isOpen, onClose, onConfirm, title = 'Confirm Action', message, confirmLabel = 'Delete', confirmClass = 'btn-danger', loading }) => (
  <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
    <div className="confirm-dialog">
      <div className="confirm-icon">
        <AlertTriangle size={28} />
      </div>
      <p className="confirm-message">{message}</p>
      <div className="confirm-actions">
        <button className="btn btn-ghost" onClick={onClose} disabled={loading}>Cancel</button>
        <button className={`btn ${confirmClass}`} onClick={onConfirm} disabled={loading}>
          {loading ? 'Processing...' : confirmLabel}
        </button>
      </div>
    </div>
  </Modal>
);
