// src/router/AppRouter.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Orders from "../pages/Orders";
import Accounts from "../pages/Accounts";
import Reports from "../pages/Reports";
import Users from "../pages/Users";
import UserDetail from "../pages/UserDetail";
import EditUser from "../pages/EditUser";

import ProtectedRoute from "./ProtectedRoute";
import Layout from "../components/layout/Layout";
import Unauthorized from "../pages/Unauthorized";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<Login />} />

        {/* All routes inside Layout require authentication */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          {/* Dashboard (authenticated users) */}
          <Route path="/" element={<Dashboard />} />

          {/* Orders (requires 'orders' permission) */}
          <Route
            path="/orders"
            element={
              <ProtectedRoute moduleKey="orders">
                <Orders />
              </ProtectedRoute>
            }
          />

          {/* Accounts (requires 'accounts' permission) */}
          <Route
            path="/accounts"
            element={
              <ProtectedRoute moduleKey="accounts">
                <Accounts />
              </ProtectedRoute>
            }
          />

          {/* Reports (requires 'reports' permission) */}
          <Route
            path="/reports"
            element={
              <ProtectedRoute moduleKey="reports">
                <Reports />
              </ProtectedRoute>
            }
          />

          {/* Users - list, detail and edit (requires 'users' permission) */}
          <Route
            path="/users"
            element={
              <ProtectedRoute moduleKey="users">
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/:userId"
            element={
              <ProtectedRoute moduleKey="users">
                <UserDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/edit/:userId"
            element={
              <ProtectedRoute moduleKey="users">
                <EditUser />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Unauthorized */}
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </BrowserRouter>
  );
}
