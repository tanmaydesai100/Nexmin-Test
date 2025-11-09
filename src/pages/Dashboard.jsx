import React from 'react';
import { useSelector } from 'react-redux';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PeopleIcon from '@mui/icons-material/People';
import ReportsCard from '../components/dashboard/ReportsCard';

export default function Dashboard() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="space-y-4 md:space-y-6">
      <div 
        className="bg-white rounded-lg shadow-md p-4 md:p-6"
        style={{
          background: 'linear-gradient(135deg, rgba(91, 50, 180, 0.05) 0%, rgba(124, 79, 207, 0.05) 100%)',
        }}
      >
        <h1 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: '#1a1a1a', lineHeight: '1.25' }}>Dashboard</h1>
        <p className="text-base md:text-lg" style={{ color: '#4a5568', lineHeight: '1.75' }}>
          Welcome back, <span className="font-semibold" style={{ color: '#5B32B4' }}>{user?.name || 'User'}</span>!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <ReportsCard />
      </div>

      <div 
        className="bg-white rounded-lg shadow-md p-4 md:p-6"
        style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
        }}
      >
        <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4" style={{ color: '#1a1a1a', lineHeight: '1.25' }}>Quick Stats</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          <div 
            className="p-4 md:p-5 rounded-lg shadow-sm transition-transform hover:scale-105"
            style={{ 
              background: 'linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 100%)',
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <ShoppingCartIcon style={{ color: '#5B32B4', fontSize: '24px' }} />
            </div>
            <p className="text-sm font-medium mb-1" style={{ color: '#4a5568', lineHeight: '1.5' }}>Total Orders</p>
            <p className="text-2xl md:text-3xl font-bold" style={{ color: '#5B32B4', lineHeight: '1.25' }}>0</p>
          </div>
          <div 
            className="p-4 md:p-5 rounded-lg shadow-sm transition-transform hover:scale-105"
            style={{ 
              background: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)',
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <AccountBalanceIcon style={{ color: '#2e7d32', fontSize: '24px' }} />
            </div>
            <p className="text-sm font-medium mb-1" style={{ color: '#4a5568', lineHeight: '1.5' }}>Total Accounts</p>
            <p className="text-2xl md:text-3xl font-bold" style={{ color: '#2e7d32', lineHeight: '1.25' }}>0</p>
          </div>
          <div 
            className="p-4 md:p-5 rounded-lg shadow-sm transition-transform hover:scale-105"
            style={{ 
              background: 'linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 100%)',
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <PeopleIcon style={{ color: '#5B32B4', fontSize: '24px' }} />
            </div>
            <p className="text-sm font-medium mb-1" style={{ color: '#4a5568', lineHeight: '1.5' }}>Total Users</p>
            <p className="text-2xl md:text-3xl font-bold" style={{ color: '#5B32B4', lineHeight: '1.25' }}>0</p>
          </div>
        </div>
      </div>
    </div>
  );
}

