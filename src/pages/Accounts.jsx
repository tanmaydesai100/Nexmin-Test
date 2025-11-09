import React, { useMemo } from 'react';
import { accountsData } from '../data/accountsData';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import DataTable from '../components/common/DataTable';

export default function Accounts() {
  const accounts = useMemo(() => accountsData, []);

  const totalPending = useMemo(
    () => accounts.reduce((sum, acc) => sum + (acc.pending || 0), 0),
    [accounts]
  );

  const accountsWithPending = useMemo(
    () => accounts.filter(acc => acc.pending > 0),
    [accounts]
  );

  const totalBalance = useMemo(
    () => accounts.reduce((sum, acc) => sum + acc.balance, 0),
    [accounts]
  );

  function formatCurrency(amount) {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(amount);
  }

  // Define table columns
  const columns = [
    {
      key: 'id',
      label: 'Account ID',
      render: (value) => (
        <div className="text-sm font-semibold" style={{ color: '#1a202c' }}>
          {value}
        </div>
      ),
    },
    {
      key: 'name',
      label: 'Name',
      render: (value) => (
        <div className="text-sm font-medium" style={{ color: '#1a202c' }}>
          {value}
        </div>
      ),
    },
    {
      key: 'balance',
      label: 'Balance',
      align: 'right',
      render: (value) => (
        <div className="text-sm font-semibold" style={{ color: '#2e7d32' }}>
          {formatCurrency(value)}
        </div>
      ),
    },
    {
      key: 'pending',
      label: 'Pending',
      align: 'right',
      render: (value, account) => {
        if (value > 0) {
          return (
            <span
              className="px-3 py-1 text-xs font-semibold rounded-full"
              style={{
                backgroundColor: '#fef3c7',
                color: '#92400e',
                border: '1px solid #f59e0b',
              }}
            >
              {formatCurrency(value)}
            </span>
          );
        }
        return (
          <div className="text-sm" style={{ color: '#718096' }}>
            {formatCurrency(0)}
          </div>
        );
      },
    },
    {
      key: 'lastPayment',
      label: 'Last Payment',
      render: (value) => (
        <div className="text-sm" style={{ color: '#4a5568' }}>
          {value}
        </div>
      ),
    },
  ];

  // Custom mobile card renderer
  const mobileCardRenderer = (account) => (
    <div
      className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
      style={{
        backgroundColor: account.pending > 0 ? '#fef9c3' : 'white',
      }}
    >
      <div className="mb-3">
        <p className="text-xs font-medium mb-1" style={{ color: '#718096' }}>
          Account ID
        </p>
        <p className="text-sm font-semibold" style={{ color: '#1a202c' }}>
          {account.id}
        </p>
      </div>
      <div className="mb-3">
        <p className="text-xs font-medium mb-1" style={{ color: '#718096' }}>
          Name
        </p>
        <p className="text-sm font-medium" style={{ color: '#1a202c' }}>
          {account.name}
        </p>
      </div>
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-xs font-medium mb-1" style={{ color: '#718096' }}>
            Balance
          </p>
          <p className="text-sm font-semibold" style={{ color: '#2e7d32' }}>
            {formatCurrency(account.balance)}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium mb-1" style={{ color: '#718096' }}>
            Pending
          </p>
          {account.pending > 0 ? (
            <span
              className="px-2 py-1 text-xs font-semibold rounded-full"
              style={{
                backgroundColor: '#fef3c7',
                color: '#92400e',
                border: '1px solid #f59e0b',
              }}
            >
              {formatCurrency(account.pending)}
            </span>
          ) : (
            <p className="text-sm" style={{ color: '#718096' }}>
              {formatCurrency(0)}
            </p>
          )}
        </div>
      </div>
      <div>
        <p className="text-xs font-medium mb-1" style={{ color: '#718096' }}>
          Last Payment
        </p>
        <p className="text-sm" style={{ color: '#4a5568' }}>
          {account.lastPayment}
        </p>
      </div>
    </div>
  );

  const emptyIcon = <AccountBalanceIcon style={{ fontSize: '64px', color: '#cbd5e0' }} />;

  return (
    <div className="min-h-screen py-4 md:py-6 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div
          className="bg-white p-4 md:p-6 rounded-lg"
          style={{
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
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
                <AccountBalanceIcon style={{ color: 'white', fontSize: '24px' }} />
              </div>
              <h2 className="text-xl md:text-2xl font-semibold" style={{ color: '#1a1a1a', lineHeight: '1.25' }}>
                Account Management
              </h2>
            </div>
          </div>

          {accountsWithPending.length > 0 && (
            <div
              className="mb-4 p-4 rounded-lg"
              style={{
                backgroundColor: '#fef3c7',
                border: '1px solid #f59e0b',
              }}
            >
              <p className="text-sm" style={{ color: '#92400e' }}>
                <strong>{accountsWithPending.length}</strong> account(s) with pending payments.
                Total pending: <strong>{formatCurrency(totalPending)}</strong>
              </p>
            </div>
          )}

          <DataTable
            columns={columns}
            data={accounts}
            emptyIcon={emptyIcon}
            emptyMessage="No accounts found"
            emptySubMessage="Accounts will appear here when available"
            mobileCardRenderer={mobileCardRenderer}
            rowKey="id"
            getRowStyle={(account) =>
              account.pending > 0
                ? { backgroundColor: '#fef9c3' }
                : {}
            }
          />

          {/* Summary Stats */}
          <div
            className="mt-6 p-4 rounded-lg"
            style={{
              backgroundColor: '#f7fafc',
              border: '1px solid #e2e8f0',
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-xs font-medium mb-1" style={{ color: '#718096' }}>
                  Total Accounts
                </p>
                <p className="text-lg font-semibold" style={{ color: '#1a202c' }}>
                  {accounts.length}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium mb-1" style={{ color: '#718096' }}>
                  Total Balance
                </p>
                <p className="text-lg font-semibold" style={{ color: '#2e7d32' }}>
                  {formatCurrency(totalBalance)}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium mb-1" style={{ color: '#718096' }}>
                  Total Pending
                </p>
                <p
                  className="text-lg font-semibold"
                  style={{
                    color: totalPending > 0 ? '#f59e0b' : '#1a202c',
                  }}
                >
                  {formatCurrency(totalPending)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

