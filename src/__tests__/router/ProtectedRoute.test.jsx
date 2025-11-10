import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import ProtectedRoute from '../../router/ProtectedRoute';
import authReducer from '../../redux/authSlice';

describe('ProtectedRoute Test', () => {
  let store;

  const TestComponent = () => <div>Protected Content</div>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Should render ProtectedRoute - authenticated user', () => {
    store = configureStore({
      reducer: {
        auth: authReducer,
      },
      preloadedState: {
        auth: {
          isAuthenticated: true,
          user: { id: '1', name: 'Test User', role: 'super_admin' },
          role: 'super_admin',
        },
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProtectedRoute>
            <TestComponent />
          </ProtectedRoute>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/Protected Content/i)).toBeInTheDocument();
  });

  test('Should redirect to login when not authenticated', () => {
    store = configureStore({
      reducer: {
        auth: authReducer,
      },
      preloadedState: {
        auth: {
          isAuthenticated: false,
          user: null,
          role: null,
        },
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/protected']}>
          <ProtectedRoute>
            <TestComponent />
          </ProtectedRoute>
        </MemoryRouter>
      </Provider>
    );

    // Should not render protected content
    expect(screen.queryByText(/Protected Content/i)).not.toBeInTheDocument();
  });

  test('Should render ProtectedRoute - with moduleKey and access', () => {
    store = configureStore({
      reducer: {
        auth: authReducer,
      },
      preloadedState: {
        auth: {
          isAuthenticated: true,
          user: { id: '1', name: 'Test User', role: 'super_admin' },
          role: 'super_admin',
        },
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProtectedRoute moduleKey="users">
            <TestComponent />
          </ProtectedRoute>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/Protected Content/i)).toBeInTheDocument();
  });

  test('Should redirect to unauthorized when no access to module', () => {
    store = configureStore({
      reducer: {
        auth: authReducer,
      },
      preloadedState: {
        auth: {
          isAuthenticated: true,
          user: { id: '1', name: 'Test User', role: 'support_staff' },
          role: 'support_staff',
        },
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/users']}>
          <ProtectedRoute moduleKey="users">
            <TestComponent />
          </ProtectedRoute>
        </MemoryRouter>
      </Provider>
    );

    // Should not render protected content
    expect(screen.queryByText(/Protected Content/i)).not.toBeInTheDocument();
  });

  test('Should allow access when role has permission', () => {
    store = configureStore({
      reducer: {
        auth: authReducer,
      },
      preloadedState: {
        auth: {
          isAuthenticated: true,
          user: { id: '1', name: 'Test User', role: 'accountant' },
          role: 'accountant',
        },
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProtectedRoute moduleKey="accounts">
            <TestComponent />
          </ProtectedRoute>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/Protected Content/i)).toBeInTheDocument();
  });

  test('Should redirect when role does not have permission', () => {
    store = configureStore({
      reducer: {
        auth: authReducer,
      },
      preloadedState: {
        auth: {
          isAuthenticated: true,
          user: { id: '1', name: 'Test User', role: 'support_staff' },
          role: 'support_staff',
        },
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/accounts']}>
          <ProtectedRoute moduleKey="accounts">
            <TestComponent />
          </ProtectedRoute>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/Protected Content/i)).not.toBeInTheDocument();
  });

  test('Should render ProtectedRoute - no moduleKey', () => {
    store = configureStore({
      reducer: {
        auth: authReducer,
      },
      preloadedState: {
        auth: {
          isAuthenticated: true,
          user: { id: '1', name: 'Test User', role: 'super_admin' },
          role: 'super_admin',
        },
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProtectedRoute>
            <TestComponent />
          </ProtectedRoute>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/Protected Content/i)).toBeInTheDocument();
  });
});

