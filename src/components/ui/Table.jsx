// ─────────────────────────────────────────────────────────────────────────────
//  Table.jsx  — sortable · filterable · searchable · paginated
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useMemo } from 'react';
import { cn } from '../../utils/helpers.js';
import { StatusPill } from './Cards.jsx';
import { SearchInput } from './Inputs.jsx';
import Icon from './Icon.jsx';

/**
 * Table
 *
 * columns: [{
 *   key        – data key
 *   label      – header text
 *   sortable?  – boolean
 *   width?     – e.g. '160px'
 *   bold?      – make the default text bold
 *   render?    – (value, row) => ReactNode  (optional custom cell)
 * }]
 *
 * filters: [{
 *   key     – data key to filter on
 *   label   – placeholder text, e.g. "All Status"
 *   options – [{ value, label }] or string[]
 * }]
 */
export default function Table({
  data         = [],
  columns      = [],
  searchable   = false,
  searchPlaceholder = 'Search…',
  searchKeys   = [],       // which keys to search
  filters      = [],
  onRowClick,
  rowActions,              // (row) => ReactNode
  emptyIcon    = '📋',
  emptyTitle   = 'No data found',
  emptySubtitle = '',
  pageSize     = 10,
  className    = '',
}) {
  const [query,       setQuery]       = useState('');
  const [activeFilters, setActiveFilters] = useState({});
  const [sortKey,     setSortKey]     = useState('');
  const [sortDir,     setSortDir]     = useState('asc');
  const [page,        setPage]        = useState(0);

  /* ── filter + sort ────────────────────────────────────────────────────── */
  const filtered = useMemo(() => {
    let rows = [...data];

    // text search
    if (query.trim() && searchKeys.length) {
      const q = query.trim().toLowerCase();
      rows = rows.filter(row =>
        searchKeys.some(k => String(row[k] ?? '').toLowerCase().includes(q))
      );
    }

    // dropdown filters
    Object.entries(activeFilters).forEach(([key, val]) => {
      if (val && val !== '__all__') {
        rows = rows.filter(row => String(row[key]) === val);
      }
    });

    // sort
    if (sortKey) {
      rows.sort((a, b) => {
        const av = a[sortKey]; const bv = b[sortKey];
        const cmp = typeof av === 'number'
          ? av - bv
          : String(av ?? '').localeCompare(String(bv ?? ''));
        return sortDir === 'asc' ? cmp : -cmp;
      });
    }

    return rows;
  }, [data, query, activeFilters, sortKey, sortDir]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const visible    = filtered.slice(page * pageSize, (page + 1) * pageSize);

  /* ── helpers ──────────────────────────────────────────────────────────── */
  const setFilter = (key, val) => {
    setActiveFilters(prev => ({ ...prev, [key]: val }));
    setPage(0);
  };

  const handleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
    setPage(0);
  };

  const clearAll = () => {
    setQuery(''); setActiveFilters({}); setPage(0);
  };

  const hasActiveFilters =
    query.trim().length > 0 ||
    Object.values(activeFilters).some(v => v && v !== '__all__');

  /* ── render ───────────────────────────────────────────────────────────── */
  return (
    <div className={cn('w-full space-y-3', className)}>

      {/* Controls bar */}
      {(searchable || filters.length > 0) && (
        <div className="flex flex-wrap items-center gap-3">
          {searchable && (
            <SearchInput
              placeholder={searchPlaceholder}
              value={query}
              onChange={e => { setQuery(e.target.value); setPage(0); }}
              className="flex-1 min-w-[180px]"
            />
          )}

          {filters.map(f => {
            const opts = f.options.map(o =>
              typeof o === 'string' ? { value: o, label: o } : o
            );
            return (
              <div key={f.key} className="relative">
                <select
                  value={activeFilters[f.key] ?? '__all__'}
                  onChange={e => setFilter(f.key, e.target.value)}
                  className="select-base h-10 text-sm min-w-[130px] w-auto pr-8"
                >
                  <option value="__all__">{f.label}</option>
                  {opts.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
                <Icon name="chevron-down" size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-dark-100" />
              </div>
            );
          })}

          {hasActiveFilters && (
            <button
              onClick={clearAll}
              className="text-xs dark:text-dark-100 text-dark-400 hover:text-green transition-colors px-1 underline underline-offset-2"
            >
              Clear
            </button>
          )}

          <div className="ml-auto text-xs dark:text-dark-100 text-dark-400 whitespace-nowrap">
            {filtered.length} result{filtered.length !== 1 ? 's' : ''}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="dark:bg-dark-600 bg-white dark:border-dark-400 border-light-200 border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-max">
            <thead>
              <tr className="border-b dark:border-dark-400 border-light-200">
                {columns.map(col => (
                  <th
                    key={col.key}
                    onClick={col.sortable ? () => handleSort(col.key) : undefined}
                    style={col.width ? { width: col.width } : undefined}
                    className={cn(
                      'text-left label-xs text-dark-100 px-5 py-4',
                      col.sortable && 'cursor-pointer select-none hover:text-white transition-colors',
                    )}
                  >
                    <span className="inline-flex items-center gap-1.5">
                      {col.label}
                      {col.sortable && (
                        <span className={cn(
                          'text-[10px] transition-colors',
                          sortKey === col.key ? 'text-green' : 'opacity-30',
                        )}>
                          {sortKey === col.key
                            ? (sortDir === 'asc' ? '↑' : '↓')
                            : '⇅'
                          }
                        </span>
                      )}
                    </span>
                  </th>
                ))}
                {rowActions && (
                  <th className="text-right label-xs text-dark-100 px-5 py-4">
                    Actions
                  </th>
                )}
              </tr>
            </thead>

            <tbody>
              {visible.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + (rowActions ? 1 : 0)}>
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <div className="text-4xl mb-3 opacity-40">{emptyIcon}</div>
                      <div className="text-sm font-semibold dark:text-dark-100 text-dark-400">{emptyTitle}</div>
                      {emptySubtitle && (
                        <div className="text-xs dark:text-dark-200 text-dark-300 mt-1">{emptySubtitle}</div>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                visible.map((row, i) => (
                  <tr
                    key={row.id ?? i}
                    onClick={onRowClick ? () => onRowClick(row) : undefined}
                    className={cn(
                      'border-b dark:border-dark-400/50 border-light-200/70 last:border-0 transition-colors duration-150',
                      onRowClick
                        ? 'cursor-pointer hover:dark:bg-dark-500/60 hover:bg-light-50'
                        : 'hover:dark:bg-dark-500/30 hover:bg-light-50/60',
                    )}
                  >
                    {columns.map(col => (
                      <td key={col.key} className="px-5 py-3.5 text-sm">
                        {col.render
                          ? col.render(row[col.key], row)
                          : col.key === 'status'
                            ? <StatusPill status={row[col.key]} />
                            : <span className={col.bold ? 'font-semibold' : 'dark:text-dark-100 text-dark-400'}>
                                {row[col.key] ?? '—'}
                              </span>
                        }
                      </td>
                    ))}
                    {rowActions && (
                      <td
                        className="px-5 py-3.5 text-right"
                        onClick={e => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-end gap-2">
                          {rowActions(row)}
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3 border-t dark:border-dark-400 border-light-200">
            <div className="text-xs dark:text-dark-100 text-dark-400">
              Showing {page * pageSize + 1}–{Math.min((page + 1) * pageSize, filtered.length)} of {filtered.length}
            </div>
            <div className="flex items-center gap-1">
              <button
                disabled={page === 0}
                onClick={() => setPage(p => p - 1)}
                className="w-7 h-7 rounded-lg dark:bg-dark-500 bg-light-100 text-xs dark:text-dark-100 text-dark-400 hover:text-green disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                ←
              </button>

              {/* Show up to 5 page buttons */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                // centre window on current page
                const half   = 2;
                const start  = Math.max(0, Math.min(page - half, totalPages - 5));
                const pageNum = start + i;
                if (pageNum >= totalPages) return null;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={cn(
                      'w-7 h-7 rounded-lg text-xs font-semibold transition-all',
                      page === pageNum
                        ? 'bg-green text-black'
                        : 'dark:bg-dark-500 bg-light-100 dark:text-dark-100 text-dark-400 hover:text-green',
                    )}
                  >
                    {pageNum + 1}
                  </button>
                );
              })}

              <button
                disabled={page >= totalPages - 1}
                onClick={() => setPage(p => p + 1)}
                className="w-7 h-7 rounded-lg dark:bg-dark-500 bg-light-100 text-xs dark:text-dark-100 text-dark-400 hover:text-green disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
