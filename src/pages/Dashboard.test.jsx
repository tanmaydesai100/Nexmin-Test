import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Dashboard from './Dashboard';
import authReducer from '../redux/authSlice';

// Mock ReportsCard component
jest.mock('../components/dashboard/ReportsCard', () => {
  return function ReportsCard() {
    return <div data-testid="reports-card">Reports Card</div>;
  };
});

describe('Dashboard Test', () => {
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
      },
      preloadedState: {
        auth: {
          isAuthenticated: true,
          user: mockUser,
          role: 'super_admin',
        },
      },
    });
  });

  const renderDashboard = () => {
    return render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );
  };

  test('Should render Dashboard component', () => {
    const screen = renderDashboard();
    const tree = screen.container;
    expect(tree).toMatchSnapshot();
  });

  test('Should render Dashboard with user name', () => {
    renderDashboard();
    
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Welcome back, Super Admin!/i)).toBeInTheDocument();
  });

  test('Should render Dashboard with default user name when user is null', () => {
    store = configureStore({
      reducer: {
        auth: authReducer,
      },
      preloadedState: {
        auth: {
          isAuthenticated: true,
          user: null,
          role: null,
        },
      },
    });

    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );

    expect(screen.getByText(/Welcome back, User!/i)).toBeInTheDocument();
  });

  test('Should render Quick Stats section', () => {
    renderDashboard();
    
    expect(screen.getByText(/Quick Stats/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Orders/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Accounts/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Users/i)).toBeInTheDocument();
  });

  test('Should render ReportsCard component', () => {
    renderDashboard();
    
    expect(screen.getByTestId('reports-card')).toBeInTheDocument();
  });

  test('Should display stats values', () => {
    renderDashboard();
    
    // Check that stats show 0 (as per component)
    const statsValues = screen.getAllByText('0');
    expect(statsValues.length).toBeGreaterThan(0);
  });
});

