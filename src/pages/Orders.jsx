
import React, { useState } from 'react';
import { ordersData } from '../data/ordersData';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DataTable from '../components/common/DataTable';

export default function Orders() {
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  function handleRowClick(order) {
    setSelectedOrder(order);
    setOpen(true);
  }

  function closeDialog() {
    setOpen(false);
    setSelectedOrder(null);
  }

  function getStatusColor(status) {
    switch (status) {
      case 'Delivered':
        return {
          bg: '#d1fae5',
          text: '#065f46',
          border: '#10b981',
        };
      case 'Shipped':
        return {
          bg: '#dbeafe',
          text: '#1e40af',
          border: '#3b82f6',
        };
      case 'Processing':
        return {
          bg: '#fef3c7',
          text: '#92400e',
          border: '#f59e0b',
        };
      default:
        return {
          bg: '#f3f4f6',
          text: '#374151',
          border: '#9ca3af',
        };
    }
  }

  const statusStyle = selectedOrder ? getStatusColor(selectedOrder.status) : null;

  // Define table columns
  const columns = [
    {
      key: 'id',
      label: 'Order ID',
      render: (value) => (
        <div className="text-sm font-semibold" style={{ color: '#1a202c' }}>
          {value}
        </div>
      ),
    },
    {
      key: 'date',
      label: 'Date',
      render: (value) => (
        <div className="text-sm" style={{ color: '#4a5568' }}>
          {value}
        </div>
      ),
    },
    {
      key: 'customer',
      label: 'Customer',
      render: (value) => (
        <div className="text-sm font-medium" style={{ color: '#1a202c' }}>
          {value}
        </div>
      ),
    },
    {
      key: 'items',
      label: 'Items',
      nowrap: false,
      render: (value, order) => (
        <>
          <div className="text-sm" style={{ color: '#4a5568' }}>
            {order.items.length} item{order.items.length !== 1 ? 's' : ''}
          </div>
          <div className="text-xs mt-1" style={{ color: '#718096' }}>
            {order.items.slice(0, 2).map((item, idx) => (
              <span key={idx}>
                {item.name}
                {idx < Math.min(order.items.length - 1, 1) && ', '}
              </span>
            ))}
            {order.items.length > 2 && ` +${order.items.length - 2} more`}
          </div>
        </>
      ),
    },
    {
      key: 'total',
      label: 'Total',
      render: (value) => (
        <div className="text-sm font-semibold" style={{ color: '#5B32B4' }}>
          £{value.toFixed(2)}
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => {
        const statusColors = getStatusColor(value);
        return (
          <span
            className="px-3 py-1 text-xs font-semibold rounded-full"
            style={{
              backgroundColor: statusColors.bg,
              color: statusColors.text,
              border: `1px solid ${statusColors.border}`,
            }}
          >
            {value}
          </span>
        );
      },
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, item) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleRowClick(item);
          }}
          className="p-2 rounded transition-all hover:bg-purple-50"
          style={{ color: '#5B32B4' }}
          title="View Details"
        >
          <VisibilityIcon fontSize="small" />
        </button>
      ),
    },
  ];

  // Custom mobile card renderer
  const mobileCardRenderer = (order) => {
    const statusColors = getStatusColor(order.status);
    return (
      <div
        className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
        onClick={() => handleRowClick(order)}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-base" style={{ color: '#1a202c' }}>
                {order.id}
              </h3>
              <span
                className="px-2 py-1 text-xs font-semibold rounded-full"
                style={{
                  backgroundColor: statusColors.bg,
                  color: statusColors.text,
                  border: `1px solid ${statusColors.border}`,
                }}
              >
                {order.status}
              </span>
            </div>
            <p className="text-sm mb-1" style={{ color: '#4a5568' }}>
              Customer: <span className="font-medium">{order.customer}</span>
            </p>
            <p className="text-sm mb-1" style={{ color: '#4a5568' }}>
              Date: {order.date}
            </p>
            <p className="text-sm mb-1" style={{ color: '#4a5568' }}>
              Items: {order.items.length} item{order.items.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div>
            <p className="text-xs" style={{ color: '#718096' }}>
              Total Amount
            </p>
            <p className="text-lg font-bold" style={{ color: '#5B32B4' }}>
              £{order.total.toFixed(2)}
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleRowClick(order);
            }}
            className="flex items-center justify-center px-4 py-2 rounded-lg transition-all"
            style={{
              backgroundColor: '#f3e8ff',
              color: '#5B32B4',
              minHeight: '44px',
            }}
          >
            <VisibilityIcon fontSize="small" className="mr-2" />
            <span className="text-sm font-medium">View</span>
          </button>
        </div>
      </div>
    );
  };

  const emptyIcon = <ShoppingCartIcon style={{ fontSize: '64px', color: '#cbd5e0' }} />;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-4 md:py-6 px-4 md:px-6">
        <div
          className="bg-white p-4 md:p-6 rounded-lg shadow-md"
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
          }}
        >
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div className="flex items-center space-x-3">
              <div
                className="p-2 md:p-3 rounded-lg"
                style={{
                  background: 'linear-gradient(135deg, #5B32B4 0%, #7C4FCF 100%)',
                }}
              >
                <ShoppingCartIcon style={{ color: 'white', fontSize: '24px' }} />
              </div>
              <h2 className="text-xl md:text-2xl font-semibold" style={{ color: '#1a1a1a', lineHeight: '1.25' }}>
                Orders Management
              </h2>
            </div>
          </div>

          <DataTable
            columns={columns}
            data={ordersData}
            onRowClick={handleRowClick}
            emptyIcon={emptyIcon}
            emptyMessage="No orders found"
            emptySubMessage="Orders will appear here when available"
            mobileCardRenderer={mobileCardRenderer}
            rowKey="id"
          />
        </div>
      </div>

      {/* Order Details Modal */}
      {open && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={closeDialog} />
          <div
            className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 p-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6">
              <h3 className="text-xl md:text-2xl font-semibold mb-2" style={{ color: '#1a1a1a' }}>
                Order Details
              </h3>
              <p className="text-sm" style={{ color: '#718096' }}>
                Complete information about this order
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium mb-1" style={{ color: '#718096' }}>
                    Order ID
                  </p>
                  <p className="text-base font-semibold" style={{ color: '#1a202c' }}>
                    {selectedOrder.id}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium mb-1" style={{ color: '#718096' }}>
                    Date
                  </p>
                  <p className="text-base" style={{ color: '#4a5568' }}>
                    {selectedOrder.date}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium mb-1" style={{ color: '#718096' }}>
                    Customer
                  </p>
                  <p className="text-base font-medium" style={{ color: '#1a202c' }}>
                    {selectedOrder.customer}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium mb-1" style={{ color: '#718096' }}>
                    Status
                  </p>
                  <span
                    className="inline-block px-3 py-1 text-sm font-semibold rounded-full"
                    style={{
                      backgroundColor: statusStyle.bg,
                      color: statusStyle.text,
                      border: `1px solid ${statusStyle.border}`,
                    }}
                  >
                    {selectedOrder.status}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm font-medium mb-3" style={{ color: '#2d3748' }}>
                  Order Items
                </p>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-lg"
                      style={{ backgroundColor: '#f7fafc' }}
                    >
                      <div>
                        <p className="text-sm font-medium" style={{ color: '#1a202c' }}>
                          {item.name}
                        </p>
                        <p className="text-xs" style={{ color: '#718096' }}>
                          Quantity: {item.qty}
                        </p>
                      </div>
                      <p className="text-sm font-semibold" style={{ color: '#5B32B4' }}>
                        £{item.price.toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold" style={{ color: '#1a202c' }}>
                    Total Amount
                  </p>
                  <p className="text-2xl font-bold" style={{ color: '#5B32B4' }}>
                    £{selectedOrder.total.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={closeDialog}
                className="px-6 py-2 rounded-lg font-medium transition-all text-white shadow-md hover:shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #5B32B4 0%, #7C4FCF 100%)',
                  minHeight: '44px',
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

