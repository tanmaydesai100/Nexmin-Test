import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function UserDetail() {
  const { userId } = useParams();
  const users = useSelector((state) => state.users.list || []);
  const user = users.find((u) => String(u.id) === String(userId));

  if (!user) {
    return (
      <div 
        className="bg-white p-4 md:p-6 rounded-lg shadow-md"
        style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
        }}
      >
        <p className="text-base md:text-lg mb-4" style={{ color: '#4a5568', lineHeight: '1.75' }}>User not found.</p>
        <Link 
          to="/users" 
          className="inline-block px-4 py-3 rounded-lg font-medium transition-all"
          style={{ 
            color: '#5B32B4',
            backgroundColor: '#f3e8ff',
            minHeight: '44px',
            lineHeight: '1.5',
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#e9d5ff';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#f3e8ff';
          }}
        >
          Back to Users
        </Link>
      </div>
    );
  }

  return (
    <div 
      className="bg-white p-4 md:p-6 rounded-lg shadow-md"
      style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
      }}
    >
      <div className="space-y-3 md:space-y-4">
        <h2 className="text-xl md:text-2xl font-semibold mb-4" style={{ color: '#1a1a1a', lineHeight: '1.25' }}>{user.name}</h2>
        <div>
          <p className="text-sm font-medium mb-1" style={{ color: '#2d3748' }}>Email</p>
          <p className="text-base md:text-lg" style={{ color: '#4a5568', lineHeight: '1.75' }}>{user.email}</p>
        </div>
        <div>
          <p className="text-sm font-medium mb-1" style={{ color: '#2d3748' }}>Role</p>
          <p className="text-base md:text-lg" style={{ color: '#4a5568', lineHeight: '1.75' }}>{user.role}</p>
        </div>
        <div className="pt-4">
          <Link 
            to="/users" 
            className="inline-block px-4 py-3 rounded-lg font-medium transition-all"
            style={{ 
              color: '#5B32B4',
              backgroundColor: '#f3e8ff',
              minHeight: '44px',
              lineHeight: '1.5',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#e9d5ff';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#f3e8ff';
            }}
          >
            Back to Users
          </Link>
        </div>
      </div>
    </div>
  );
}
