// src/pages/Unauthorized.jsx
import React from 'react';

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-semibold mb-4">Unauthorized Access</h2>
        <p className="text-gray-600">You do not have permission to view this page.</p>
      </div>
    </div>
  );
};

export default Unauthorized;
