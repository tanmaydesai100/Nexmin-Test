import React from 'react';

/**
 * DataTable - A reusable table component for displaying data
 * 
 * @param {Array} columns - Array of column definitions
 *   - key: unique identifier
 *   - label: column header text
 *   - render: function to render cell content (optional)
 *   - align: 'left' | 'right' | 'center' (optional, default: 'left')
 *   - mobileLabel: label for mobile card view (optional)
 * @param {Array} data - Array of data objects
 * @param {Function} onRowClick - Callback when row is clicked (optional)
 * @param {ReactNode} emptyState - Custom empty state component (optional)
 * @param {ReactNode} emptyIcon - Icon for empty state (optional)
 * @param {String} emptyMessage - Message for empty state (optional)
 * @param {String} emptySubMessage - Sub message for empty state (optional)
 * @param {Function} mobileCardRenderer - Custom renderer for mobile cards (optional)
 * @param {String} rowKey - Key to use as unique identifier for rows (default: 'id')
 * @param {Function} getRowClassName - Function to get custom className for row (optional)
 * @param {Function} getRowStyle - Function to get custom style for row (optional)
 */
export default function DataTable({
  columns,
  data,
  onRowClick,
  emptyState,
  emptyIcon,
  emptyMessage = 'No data found',
  emptySubMessage = 'Data will appear here when available',
  mobileCardRenderer,
  rowKey = 'id',
  getRowClassName,
  getRowStyle,
}) {
  // Default empty state
  const defaultEmptyState = (
    <div className="px-6 py-12 text-center">
      <div className="flex flex-col items-center">
        {emptyIcon && <div className="mb-4">{emptyIcon}</div>}
        <p className="text-lg font-medium" style={{ color: '#4a5568' }}>
          {emptyMessage}
        </p>
        <p className="text-sm mt-2" style={{ color: '#718096' }}>
          {emptySubMessage}
        </p>
      </div>
    </div>
  );

  const renderEmptyState = emptyState || defaultEmptyState;

  // Default mobile card renderer
  const defaultMobileCardRenderer = (item) => (
    <div
      className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => onRowClick && onRowClick(item)}
    >
      {columns.map((column) => {
        if (column.hideOnMobile) return null;
        
        const value = column.render
          ? column.render(item[column.key], item)
          : item[column.key];
        
        const label = column.mobileLabel || column.label;

        return (
          <div key={column.key} className="mb-3 last:mb-0">
            <p className="text-xs font-medium mb-1" style={{ color: '#718096' }}>
              {label}
            </p>
            <div className="text-sm" style={{ color: '#1a202c' }}>
              {value}
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderMobileCard = mobileCardRenderer || defaultMobileCardRenderer;

  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr
              style={{
                background: 'linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)',
              }}
            >
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                  style={{
                    color: '#2d3748',
                    textAlign: column.align || 'left',
                  }}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12">
                  {renderEmptyState}
                </td>
              </tr>
            ) : (
              data.map((item) => {
                const customClassName = getRowClassName ? getRowClassName(item) : '';
                const customStyle = getRowStyle ? getRowStyle(item) : {};
                return (
                  <tr
                    key={item[rowKey]}
                    className={`transition-colors ${
                      onRowClick ? 'hover:bg-gray-50 cursor-pointer' : ''
                    } ${customClassName}`}
                    style={customStyle}
                    onClick={() => onRowClick && onRowClick(item)}
                  >
                  {columns.map((column) => {
                    const cellContent = column.render
                      ? column.render(item[column.key], item)
                      : item[column.key];

                    return (
                      <td
                        key={column.key}
                        className={`px-6 py-4 text-sm ${column.nowrap !== false ? 'whitespace-nowrap' : ''}`}
                        style={{
                          textAlign: column.align || 'left',
                        }}
                      >
                        {cellContent}
                      </td>
                    );
                  })}
                </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {data.length === 0 ? (
          <div className="py-12 text-center">
            {emptyIcon && <div className="mb-4 flex justify-center">{emptyIcon}</div>}
            <p className="text-lg font-medium mb-2" style={{ color: '#4a5568' }}>
              {emptyMessage}
            </p>
            <p className="text-sm" style={{ color: '#718096' }}>
              {emptySubMessage}
            </p>
          </div>
        ) : (
          data.map((item) => (
            <div key={item[rowKey]}>{renderMobileCard(item)}</div>
          ))
        )}
      </div>
    </>
  );
}

