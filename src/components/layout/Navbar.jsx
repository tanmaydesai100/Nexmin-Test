import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/authSlice';

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav
      style={{ 
        background: 'linear-gradient(135deg, #5B32B4 0%, #7C4FCF 100%)',
        boxShadow: '0 2px 8px rgba(91, 50, 180, 0.3)',
      }}
      className="h-16 md:h-20 flex items-center justify-between px-4 md:px-6"
    >
      <div className="flex items-center space-x-2 md:space-x-3">
        {/* Replaced logo image with white circular text logo */}
        <div className="w-10 h-10 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center">
          <span className="text-black font-semibold text-xs md:text-sm">nexmin</span>
        </div>

        {/* Dashboard Title */}
        <h1 className="text-lg md:text-xl font-semibold text-white hidden sm:block">Admin Dashboard</h1>
      </div>

      <div className="flex items-center space-x-2 md:space-x-4">
        {user && (
          <span className="text-gray-100 text-sm md:text-base hidden md:block">
            Welcome, <span className="font-medium">{user.name}</span>
          </span>
        )}
        <button
          onClick={handleLogout}
          className="px-4 md:px-5 py-2 text-white rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg text-sm md:text-base"
          style={{
            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            minHeight: '44px',
            minWidth: '80px',
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
