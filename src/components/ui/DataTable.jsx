import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown, ChevronsLeft, ChevronsRight } from 'lucide-react';

const PAGE_SIZE_OPTIONS = [10, 25, 50];

export const DataTable = ({
  columns,      // [{ key, label, render, sortable, className }]
  data,
  loading,
  emptyMessage = 'No records found.',
  pageSize: defaultPageSize = 10,
}) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState('asc');

  const sorted = useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortKey] ?? '';
      const bVal = b[sortKey] ?? '';
      const cmp = typeof aVal === 'number' ? aVal - bVal : String(aVal).localeCompare(String(bVal));
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [data, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paginated = sorted.slice((page - 1) * pageSize, page * pageSize);

  const handleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDir('asc'); }
    setPage(1);
  };

  return (
    <div className="data-table-container">
      <div className="table-scroll-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`table-th ${col.sortable ? 'sortable-th' : ''} ${col.className || ''}`}
                  onClick={col.sortable ? () => handleSort(col.key) : undefined}
                >
                  <span>{col.label}</span>
                  {col.sortable && sortKey === col.key && (
                    <span className="sort-icon">
                      {sortDir === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  {columns.map((col) => (
                    <td key={col.key} className="table-td"><div className="skeleton-line" /></td>
                  ))}
                </tr>
              ))
            ) : paginated.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="table-empty">{emptyMessage}</td>
              </tr>
            ) : (
              paginated.map((row, i) => (
                <tr key={row.id || i} className="table-row">
                  {columns.map((col) => (
                    <td key={col.key} className={`table-td ${col.className || ''}`}>
                      {col.render ? col.render(row[col.key], row) : (row[col.key] ?? '—')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="table-footer">
        <div className="table-info">
          Showing {Math.min((page - 1) * pageSize + 1, sorted.length)}–{Math.min(page * pageSize, sorted.length)} of {sorted.length} records
          <select
            value={pageSize}
            onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
            className="page-size-select"
          >
            {PAGE_SIZE_OPTIONS.map((s) => <option key={s} value={s}>{s} / page</option>)}
          </select>
        </div>
        <div className="table-pagination">
          <button className="page-btn" onClick={() => setPage(1)} disabled={page === 1}><ChevronsLeft size={14} /></button>
          <button className="page-btn" onClick={() => setPage((p) => p - 1)} disabled={page === 1}><ChevronLeft size={14} /></button>
          <span className="page-indicator">{page} / {totalPages}</span>
          <button className="page-btn" onClick={() => setPage((p) => p + 1)} disabled={page === totalPages}><ChevronRight size={14} /></button>
          <button className="page-btn" onClick={() => setPage(totalPages)} disabled={page === totalPages}><ChevronsRight size={14} /></button>
        </div>
      </div>
    </div>
  );
};
