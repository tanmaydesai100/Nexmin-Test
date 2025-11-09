import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { hasAccess } from '../utils/permissions';

export default function ProtectedRoute({ children, moduleKey }) {
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (moduleKey && !hasAccess(role, moduleKey)) return <Navigate to="/unauthorized" replace />;

  return children;
}
