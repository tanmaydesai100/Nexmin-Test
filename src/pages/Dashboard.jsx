import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { ordersData } from '../data/ordersData';
import { accountsData } from '../data/accountsData';
import { usersData } from '../data/usersData';
import { monthlyOrderReports } from '../data/reportsData';

export default function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const usersList = useSelector((state) => state.users.list || []);

  // Calculate real statistics
  const stats = useMemo(() => {
    const totalOrders = ordersData.length;
    const totalRevenue = ordersData.reduce((sum, order) => sum + order.total, 0);
    const totalAccounts = accountsData.length;
    const totalAccountBalance = accountsData.reduce((sum, acc) => sum + acc.balance, 0);
    const totalPending = accountsData.reduce((sum, acc) => sum + (acc.pending || 0), 0);
    const totalUsers = usersList.length || usersData.length;
    
    // Order status breakdown
    const ordersByStatus = ordersData.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {});

    // Monthly revenue trend (last 3 months)
    const monthlyRevenue = monthlyOrderReports
      .slice(0, 3)
      .map((report) => ({
        month: report.month,
        revenue: report.totalRevenue,
        orders: report.totalOrders,
      }));

    return {
      totalOrders,
      totalRevenue,
      totalAccounts,
      totalAccountBalance,
      totalPending,
      totalUsers,
      ordersByStatus,
      monthlyRevenue,
    };
  }, [usersList]);

  function formatCurrency(amount) {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(amount);
  }

  function getStatusColor(status) {
    const colors = {
      Delivered: { bg: '#d1fae5', text: '#065f46', border: '#10b981' },
      Shipped: { bg: '#dbeafe', text: '#1e40af', border: '#3b82f6' },
      Processing: { bg: '#fef3c7', text: '#92400e', border: '#f59e0b' },
    };
    return colors[status] || { bg: '#f3f4f6', text: '#374151', border: '#9ca3af' };
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div
        className="bg-white rounded-lg shadow-md p-4 md:p-6"
        style={{
          background: 'linear-gradient(135deg, rgba(91, 50, 180, 0.05) 0%, rgba(124, 79, 207, 0.05) 100%)',
        }}
      >
        <h1 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: '#1a1a1a', lineHeight: '1.25' }}>
          Dashboard
        </h1>
        <p className="text-base md:text-lg" style={{ color: '#4a5568', lineHeight: '1.75' }}>
          Welcome back, <span className="font-semibold" style={{ color: '#5B32B4' }}>{user?.name || 'User'}</span>!
        </p>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div
          className="bg-white rounded-lg shadow-md p-4 md:p-5 transition-transform hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 100%)',
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <ShoppingCartIcon style={{ color: '#5B32B4', fontSize: '28px' }} />
            <Link
              to="/orders"
              className="text-xs font-medium"
              style={{ color: '#5B32B4' }}
            >
              View All →
            </Link>
          </div>
          <p className="text-sm font-medium mb-1" style={{ color: '#4a5568' }}>
            Total Orders
          </p>
          <p className="text-2xl md:text-3xl font-bold" style={{ color: '#5B32B4' }}>
            {stats.totalOrders}
          </p>
          <p className="text-xs mt-1" style={{ color: '#718096' }}>
            {formatCurrency(stats.totalRevenue)} total revenue
          </p>
        </div>

        <div
          className="bg-white rounded-lg shadow-md p-4 md:p-5 transition-transform hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)',
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <AccountBalanceIcon style={{ color: '#2e7d32', fontSize: '28px' }} />
            <Link
              to="/accounts"
              className="text-xs font-medium"
              style={{ color: '#2e7d32' }}
            >
              View All →
            </Link>
          </div>
          <p className="text-sm font-medium mb-1" style={{ color: '#4a5568' }}>
            Total Accounts
          </p>
          <p className="text-2xl md:text-3xl font-bold" style={{ color: '#2e7d32' }}>
            {stats.totalAccounts}
          </p>
          <p className="text-xs mt-1" style={{ color: '#718096' }}>
            {formatCurrency(stats.totalAccountBalance)} balance
          </p>
        </div>

        <div
          className="bg-white rounded-lg shadow-md p-4 md:p-5 transition-transform hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 100%)',
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <PeopleIcon style={{ color: '#5B32B4', fontSize: '28px' }} />
            <Link
              to="/users"
              className="text-xs font-medium"
              style={{ color: '#5B32B4' }}
            >
              View All →
            </Link>
          </div>
          <p className="text-sm font-medium mb-1" style={{ color: '#4a5568' }}>
            Total Users
          </p>
          <p className="text-2xl md:text-3xl font-bold" style={{ color: '#5B32B4' }}>
            {stats.totalUsers}
          </p>
          <p className="text-xs mt-1" style={{ color: '#718096' }}>
            Active members
          </p>
        </div>

        <div
          className="bg-white rounded-lg shadow-md p-4 md:p-5 transition-transform hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%)',
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <AttachMoneyIcon style={{ color: '#f59e0b', fontSize: '28px' }} />
            <Link
              to="/accounts"
              className="text-xs font-medium"
              style={{ color: '#f59e0b' }}
            >
              View All →
            </Link>
          </div>
          <p className="text-sm font-medium mb-1" style={{ color: '#4a5568' }}>
            Pending Payments
          </p>
          <p className="text-2xl md:text-3xl font-bold" style={{ color: '#f59e0b' }}>
            {formatCurrency(stats.totalPending)}
          </p>
          <p className="text-xs mt-1" style={{ color: '#718096' }}>
            Requires attention
          </p>
        </div>
      </div>

      {/* Overview Section */}
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
        <div className="space-y-6">
          {/* Order Status Breakdown */}
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#1a1a1a' }}>
              Order Status Overview
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {Object.entries(stats.ordersByStatus).map(([status, count]) => {
                const colors = getStatusColor(status);
                return (
                  <div
                    key={status}
                    className="p-4 rounded-lg border"
                    style={{
                      borderColor: colors.border,
                      backgroundColor: colors.bg,
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="text-sm font-semibold"
                        style={{ color: colors.text }}
                      >
                        {status}
                      </span>
                    </div>
                    <p
                      className="text-2xl font-bold"
                      style={{ color: colors.text }}
                    >
                      {count}
                    </p>
                    <p className="text-xs mt-1" style={{ color: '#718096' }}>
                      {((count / stats.totalOrders) * 100).toFixed(1)}% of total
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Monthly Revenue Trend */}
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#1a1a1a' }}>
              Revenue Trend (Last 3 Months)
            </h3>
            <div className="space-y-3">
              {stats.monthlyRevenue.map((month, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                  <div className="flex-1">
                    <p className="text-sm font-medium" style={{ color: '#1a1a1a' }}>
                      {month.month}
                    </p>
                    <p className="text-xs" style={{ color: '#718096' }}>
                      {month.orders} orders
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold" style={{ color: '#5B32B4' }}>
                      {formatCurrency(month.revenue)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

