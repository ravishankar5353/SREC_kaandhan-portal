import React from 'react';

export const FormInput = ({ label, error, required, type = 'text', className = '', ...props }) => (
  <div className={`form-field ${className}`}>
    {label && (
      <label className="form-label">
        {label} {required && <span className="form-required">*</span>}
      </label>
    )}
    {type === 'textarea' ? (
      <textarea className={`form-input form-textarea ${error ? 'form-input-error' : ''}`} {...props} />
    ) : type === 'select' ? (
      <select className={`form-input form-select ${error ? 'form-input-error' : ''}`} {...props} />
    ) : (
      <input type={type} className={`form-input ${error ? 'form-input-error' : ''}`} {...props} />
    )}
    {error && <p className="form-error">{error}</p>}
  </div>
);
