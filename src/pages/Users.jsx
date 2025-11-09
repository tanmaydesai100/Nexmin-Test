// src/pages/Users.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PeopleIcon from '@mui/icons-material/People';
import { addUser, removeUser } from '../redux/usersSlice';
import DataTable from '../components/common/DataTable';

const Users = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const usersData = useSelector((state) => state.users.list || []);

  const [showAdd, setShowAdd] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
  });

  // Form field configurations
  const formFields = [
    {
      key: 'name',
      label: 'Name',
      type: 'text',
      placeholder: 'Enter full name',
    },
    {
      key: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'name@example.com',
    },
    {
      key: 'role',
      label: 'Role',
      type: 'text',
      placeholder: 'e.g., admin, accountant',
    },
  ];

  const handleDelete = (id) => {
    dispatch(removeUser(id));
  };

  const handleOpenAdd = () => {
    setShowAdd(true);
  };

  const handleCloseAdd = () => {
    setShowAdd(false);
    setFormData({ name: '', email: '', role: '' });
  };

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.role.trim()) return;
    const id = Date.now();
    dispatch(
      addUser({
        id,
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        role: formData.role.trim(),
      })
    );
    handleCloseAdd();
  };

  // Action buttons configuration
  const actionButtons = [
    {
      key: 'view',
      icon: VisibilityIcon,
      to: (userId) => `/users/${userId}`,
      color: '#5B32B4',
      bgColor: '#f3e8ff',
      hoverBg: 'hover:bg-purple-50',
      title: 'View',
      className: 'p-2 rounded transition-all',
    },
    {
      key: 'edit',
      icon: EditIcon,
      to: (userId) => `/users/edit/${userId}`,
      color: '#f59e0b',
      bgColor: '#fef3c7',
      hoverBg: 'hover:bg-yellow-50',
      title: 'Edit',
      className: 'p-2 rounded transition-all',
    },
    {
      key: 'delete',
      icon: DeleteIcon,
      onClick: (userId) => handleDelete(userId),
      color: '#ef4444',
      bgColor: '#fee2e2',
      hoverBg: 'hover:bg-red-50',
      title: 'Delete',
      className: 'p-2 rounded transition-all',
    },
  ];

  // Define table columns
  const columns = [
    {
      key: 'name',
      label: 'Name',
      render: (value) => (
        <div className="text-sm font-semibold" style={{ color: '#1a202c' }}>
          {value}
        </div>
      ),
    },
    {
      key: 'email',
      label: 'Email',
      render: (value) => (
        <div className="text-sm" style={{ color: '#4a5568' }}>
          {value}
        </div>
      ),
    },
    {
      key: 'role',
      label: 'Role',
      render: (value) => (
        <div className="text-sm" style={{ color: '#4a5568' }}>
          {value}
        </div>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, userItem) => (
        <div className="flex items-center space-x-3">
          {actionButtons.map((action) => {
            const IconComponent = action.icon;
            const content = (
              <IconComponent fontSize="small" />
            );

            if (action.to) {
              return (
                <Link
                  key={action.key}
                  to={action.to(userItem.id)}
                  className={`${action.className} ${action.hoverBg}`}
                  style={{ color: action.color }}
                  title={action.title}
                >
                  {content}
                </Link>
              );
            }

            return (
              <button
                key={action.key}
                onClick={() => action.onClick(userItem.id)}
                className={`${action.className} ${action.hoverBg}`}
                style={{ color: action.color }}
                title={action.title}
              >
                {content}
              </button>
            );
          })}
        </div>
      ),
    },
  ];

  // Custom mobile card renderer
  const mobileCardRenderer = (userItem) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-base mb-1" style={{ color: '#1a202c' }}>
            {userItem.name}
          </h3>
          <p className="text-sm mb-1" style={{ color: '#4a5568' }}>
            {userItem.email}
          </p>
          <p className="text-sm" style={{ color: '#4a5568' }}>
            {userItem.role}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-2 pt-3 border-t border-gray-100">
        {actionButtons.map((action) => {
          const IconComponent = action.icon;
          const content = (
            <>
              <IconComponent fontSize="small" className="mr-2" />
              <span className="text-sm font-medium">
                {action.title.charAt(0).toUpperCase() + action.title.slice(1)}
              </span>
            </>
          );

          if (action.to) {
            return (
              <Link
                key={action.key}
                to={action.to(userItem.id)}
                className="flex-1 flex items-center justify-center p-3 rounded-lg transition-all"
                style={{
                  backgroundColor: action.bgColor,
                  color: action.color,
                  minHeight: '44px',
                }}
              >
                {content}
              </Link>
            );
          }

          return (
            <button
              key={action.key}
              onClick={() => action.onClick(userItem.id)}
              className="flex-1 flex items-center justify-center p-3 rounded-lg transition-all"
              style={{
                backgroundColor: action.bgColor,
                color: action.color,
                minHeight: '44px',
              }}
            >
              {content}
            </button>
          );
        })}
      </div>
    </div>
  );

  const emptyIcon = <PeopleIcon style={{ fontSize: '64px', color: '#cbd5e0' }} />;

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
                <PeopleIcon style={{ color: 'white', fontSize: '24px' }} />
              </div>
              <h2 className="text-xl md:text-2xl font-semibold" style={{ color: '#1a1a1a', lineHeight: '1.25' }}>
                User Management
              </h2>
            </div>
            <button
              onClick={handleOpenAdd}
              className="px-4 py-2 rounded-lg font-medium transition-all text-white shadow-md hover:shadow-lg text-sm md:text-base"
              style={{
                background: 'linear-gradient(135deg, #5B32B4 0%, #7C4FCF 100%)',
                minHeight: '44px',
              }}
            >
              Add User
            </button>
          </div>

          <DataTable
            columns={columns}
            data={usersData}
            emptyIcon={emptyIcon}
            emptyMessage="No users found"
            emptySubMessage="Get started by adding your first user"
            mobileCardRenderer={mobileCardRenderer}
            rowKey="id"
          />
        </div>
      </div>

      {/* Add User Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={handleCloseAdd} />
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-5">
            <div className="mb-4">
              <h3 className="text-lg md:text-xl font-semibold" style={{ color: '#1a1a1a' }}>
                Add New User
              </h3>
              <p className="text-sm" style={{ color: '#718096' }}>
                Provide user details and save.
              </p>
            </div>
            <form onSubmit={handleAddSubmit} className="space-y-4">
              {formFields.map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#2d3748' }}>
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    value={formData[field.key]}
                    onChange={(e) => handleInputChange(field.key, e.target.value)}
                    className="block w-full border border-gray-300 rounded-lg text-base"
                    style={{ padding: '0.75rem 1rem', minHeight: '44px' }}
                    placeholder={field.placeholder}
                  />
                </div>
              ))}
              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={handleCloseAdd}
                  className="px-4 py-2 rounded-lg font-medium transition-all text-gray-700 hover:bg-gray-100"
                  style={{ minHeight: '44px' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg font-medium transition-all text-white shadow-md hover:shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #5B32B4 0%, #7C4FCF 100%)',
                    minHeight: '44px',
                  }}
                >
                  Save User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
