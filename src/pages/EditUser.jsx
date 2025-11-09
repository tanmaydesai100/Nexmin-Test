// src/pages/EditUser.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../redux/usersSlice';

const EditUser = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const navigate = useNavigate();

  const users = useSelector((state) => state.users.list || []);
  const user = users.find((u) => String(u.id) === String(userId));
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [role, setRole] = useState(user?.role || '');

  const handleSave = () => {
    dispatch(updateUser({ id: userId, changes: { name, email, role } }));
    navigate('/users');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto py-4 md:py-6 px-4 md:px-6">
        <div 
          className="bg-white p-4 md:p-6 rounded-lg shadow-md"
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
          }}
        >
          <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6" style={{ color: '#1a1a1a', lineHeight: '1.25' }}>Edit User</h2>
          <div className="space-y-4 md:space-y-6">
            <div>
              <label className="block text-sm md:text-base font-medium mb-2" style={{ color: '#2d3748' }}>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 md:p-4 border border-gray-300 rounded-lg text-base"
                style={{ 
                  lineHeight: '1.5',
                  minHeight: '44px',
                }}
              />
            </div>
            <div>
              <label className="block text-sm md:text-base font-medium mb-2" style={{ color: '#2d3748' }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 md:p-4 border border-gray-300 rounded-lg text-base"
                style={{ 
                  lineHeight: '1.5',
                  minHeight: '44px',
                }}
              />
            </div>
            <div>
              <label className="block text-sm md:text-base font-medium mb-2" style={{ color: '#2d3748' }}>Role</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-3 md:p-4 border border-gray-300 rounded-lg text-base"
                style={{ 
                  lineHeight: '1.5',
                  minHeight: '44px',
                }}
              />
            </div>
            <button 
              onClick={handleSave} 
              className="mt-4 md:mt-6 w-full text-white py-3 md:py-4 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg text-base md:text-lg"
              style={{ 
                background: 'linear-gradient(135deg, #5B32B4 0%, #7C4FCF 100%)',
                minHeight: '44px',
              }}
              onMouseEnter={(e) => e.target.style.background = 'linear-gradient(135deg, #4A2A95 0%, #5B32B4 100%)'}
              onMouseLeave={(e) => e.target.style.background = 'linear-gradient(135deg, #5B32B4 0%, #7C4FCF 100%)'}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
