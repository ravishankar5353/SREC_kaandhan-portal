import React from 'react';
import { Search, X } from 'lucide-react';

export const SearchBar = ({ value, onChange, placeholder = 'Search...', onClear }) => (
  <div className="search-bar">
    <Search className="search-icon" size={16} />
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="search-input"
    />
    {value && (
      <button className="search-clear-btn" onClick={() => { onChange(''); onClear?.(); }}>
        <X size={14} />
      </button>
    )}
  </div>
);

export const FilterDropdown = ({ label, value, onChange, options, allLabel = 'All' }) => (
  <select
    className="filter-dropdown"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    aria-label={label}
  >
    <option value="">{allLabel}</option>
    {options.map((opt) => (
      <option key={typeof opt === 'string' ? opt : opt.value} value={typeof opt === 'string' ? opt : opt.value}>
        {typeof opt === 'string' ? opt : opt.label}
      </option>
    ))}
  </select>
);
