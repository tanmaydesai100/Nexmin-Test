import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PeopleIcon from '@mui/icons-material/People';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { hasAccess } from '../../utils/permissions';

export default function Sidebar() {
  const { role } = useSelector((state) => state.auth);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: DashboardIcon },
    { path: '/orders', label: 'Orders', moduleKey: 'orders', icon: ShoppingCartIcon },
    { path: '/accounts', label: 'Accounts', moduleKey: 'accounts', icon: AccountBalanceIcon },
    { path: '/reports', label: 'Reports', moduleKey: 'reports', icon: AssessmentIcon },
    { path: '/users', label: 'Users', moduleKey: 'users', icon: PeopleIcon },
  ];

  const filteredMenuItems = menuItems.filter((item) => {
    if (!item.moduleKey) return true;
    return hasAccess(role, item.moduleKey);
  });

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-white rounded-lg shadow-md"
        style={{
          background: 'linear-gradient(135deg, #5B32B4 0%, #7C4FCF 100%)',
          minHeight: '44px',
          minWidth: '44px',
        }}
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <CloseIcon style={{ color: 'white', fontSize: '24px' }} />
        ) : (
          <MenuIcon style={{ color: 'white', fontSize: '24px' }} />
        )}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static
          w-64 bg-white shadow-md min-h-[calc(100vh-64px)]
          transform transition-transform duration-300 ease-in-out z-40
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <nav className="p-4">
          <ul className="space-y-2">
            {filteredMenuItems.map((item) => {
              const isActive = location.pathname === item.path;
              const IconComponent = item.icon;
              
              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={closeSidebar}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    style={{
                      background: isActive 
                        ? 'linear-gradient(135deg, #5B32B4 0%, #7C4FCF 100%)' 
                        : 'transparent',
                      minHeight: '44px', // Touch-friendly
                    }}
                  >
                    <IconComponent 
                      style={{ 
                        fontSize: '20px',
                        color: isActive ? 'white' : '#4a5568'
                      }} 
                    />
                    <span className="font-medium text-base">{item.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}

