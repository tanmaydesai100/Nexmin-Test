import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Dashboard from '../../pages/Dashboard';
import authReducer from '../../redux/authSlice';
import usersReducer from '../../redux/usersSlice';

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('../../__mocks__/react-router-dom'),
  Link: ({ to, children }) => <a href={to}>{children}</a>,
}));

describe('Dashboard', () => {
  let store;

  const mockUser = {
    id: 'admin-1',
    name: 'Super Admin',
    role: 'super_admin',
    email: 'admin@company.com',
  };

  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authReducer,
        users: usersReducer,
      },
      preloadedState: {
        auth: {
          isAuthenticated: true,
          user: mockUser,
          role: 'super_admin',
        },
        users: {
          list: [],
        },
      },
    });
  });

  test('renders Dashboard title', () => {
    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );
    
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  test('displays welcome message with user name', () => {
    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );
    
    expect(screen.getByText(/Welcome back/i)).toBeInTheDocument();
    expect(screen.getByText('Super Admin')).toBeInTheDocument();
  });

  test('displays welcome message with default user when user is null', () => {
    store = configureStore({
      reducer: {
        auth: authReducer,
        users: usersReducer,
      },
      preloadedState: {
        auth: {
          isAuthenticated: true,
          user: null,
          role: null,
        },
        users: {
          list: [],
        },
      },
    });

    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );

    expect(screen.getByText(/Welcome back/i)).toBeInTheDocument();
    expect(screen.getByText('User')).toBeInTheDocument();
  });

  test('displays Total Orders card', () => {
    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );
    
    expect(screen.getByText('Total Orders')).toBeInTheDocument();
  });

  test('displays Total Accounts card', () => {
    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );
    
    expect(screen.getByText('Total Accounts')).toBeInTheDocument();
  });

  test('displays Total Users card', () => {
    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );
    
    expect(screen.getByText('Total Users')).toBeInTheDocument();
  });

  test('displays Pending Payments card', () => {
    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );
    
    expect(screen.getByText('Pending Payments')).toBeInTheDocument();
  });

  test('displays Order Status Overview section', () => {
    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );
    
    expect(screen.getByText('Order Status Overview')).toBeInTheDocument();
  });

  test('displays Revenue Trend section', () => {
    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );
    
    expect(screen.getByText('Revenue Trend (Last 3 Months)')).toBeInTheDocument();
  });
});

