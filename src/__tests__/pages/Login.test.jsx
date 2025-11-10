import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import Login from '../../pages/Login';
import authReducer from '../../redux/authSlice';
import { ROLES } from '../../utils/permissions';

// Mock react-toastify
jest.mock('react-toastify', () => ({
  ToastContainer: () => <div data-testid="toast-container" />,
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

// Mock LoadingRing component
jest.mock('../../components/LoadingRing', () => {
  return function LoadingRing({ loading, color, size }) {
    if (!loading) return null;
    return <div data-testid="loading-ring">Loading...</div>;
  };
});

// Mock react-router-dom (using manual mock)
jest.mock('react-router-dom');

describe('Login Test', () => {
  let store;
  let mockNavigate;

  beforeEach(() => {
    const reactRouterDom = require('react-router-dom');
    mockNavigate = reactRouterDom.mockNavigate;
    mockNavigate.mockClear();
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
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  const renderLogin = () => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
  };

  test('Should render Login component', () => {
    const screen = renderLogin();
    const tree = screen.container;
    expect(tree).toMatchSnapshot();
  });

  test('Should render Login with all form elements', () => {
    renderLogin();
    
    expect(screen.getByText(/Admin Dashboard — Login/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
    expect(screen.getByText(/Test accounts:/i)).toBeInTheDocument();
  });

  test('Should handle successful login with admin credentials', async () => {
    renderLogin();
    
    const emailInput = screen.getByPlaceholderText(/Enter email/i);
    const passwordInput = screen.getByPlaceholderText(/Enter password/i);
    const loginButton = screen.getByRole('button', { name: /Login/i });

    fireEvent.change(emailInput, { target: { value: 'admin@company.com' } });
    fireEvent.change(passwordInput, { target: { value: 'admin123' } });
    fireEvent.click(loginButton);

    // Should show loading state
    expect(screen.getByTestId('loading-ring')).toBeInTheDocument();

    // Fast-forward timers
    jest.advanceTimersByTime(1500);

    await waitFor(() => {
      const state = store.getState();
      expect(state.auth.isAuthenticated).toBe(true);
      expect(state.auth.user).toMatchObject({
        email: 'admin@company.com',
        role: ROLES.SUPER_ADMIN,
        name: 'Super Admin',
      });
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  test('Should handle successful login with accountant credentials', async () => {
    renderLogin();
    
    const emailInput = screen.getByPlaceholderText(/Enter email/i);
    const passwordInput = screen.getByPlaceholderText(/Enter password/i);
    const loginButton = screen.getByRole('button', { name: /Login/i });

    fireEvent.change(emailInput, { target: { value: 'accountant@company.com' } });
    fireEvent.change(passwordInput, { target: { value: 'acct123' } });
    fireEvent.click(loginButton);

    jest.advanceTimersByTime(1500);

    await waitFor(() => {
      const state = store.getState();
      expect(state.auth.isAuthenticated).toBe(true);
      expect(state.auth.user).toMatchObject({
        email: 'accountant@company.com',
        role: ROLES.ACCOUNTANT,
      });
    });
  });

  test('Should handle successful login with support credentials', async () => {
    renderLogin();
    
    const emailInput = screen.getByPlaceholderText(/Enter email/i);
    const passwordInput = screen.getByPlaceholderText(/Enter password/i);
    const loginButton = screen.getByRole('button', { name: /Login/i });

    fireEvent.change(emailInput, { target: { value: 'support@company.com' } });
    fireEvent.change(passwordInput, { target: { value: 'support123' } });
    fireEvent.click(loginButton);

    jest.advanceTimersByTime(1500);

    await waitFor(() => {
      const state = store.getState();
      expect(state.auth.isAuthenticated).toBe(true);
      expect(state.auth.user).toMatchObject({
        email: 'support@company.com',
        role: ROLES.SUPPORT,
      });
    });
  });

  test('Should show error for invalid credentials', async () => {
    const { toast } = require('react-toastify');
    renderLogin();
    
    const emailInput = screen.getByPlaceholderText(/Enter email/i);
    const passwordInput = screen.getByPlaceholderText(/Enter password/i);
    const loginButton = screen.getByRole('button', { name: /Login/i });

    fireEvent.change(emailInput, { target: { value: 'wrong@email.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Invalid credentials!');
    });

    // Should not navigate
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test('Should handle email input changes', () => {
    renderLogin();
    
    const emailInput = screen.getByPlaceholderText(/Enter email/i);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    
    expect(emailInput.value).toBe('test@example.com');
  });

  test('Should handle password input changes', () => {
    renderLogin();
    
    const passwordInput = screen.getByPlaceholderText(/Enter password/i);
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    
    expect(passwordInput.value).toBe('testpassword');
  });

  test('Should trim email and convert to lowercase on login', async () => {
    renderLogin();
    
    const emailInput = screen.getByPlaceholderText(/Enter email/i);
    const passwordInput = screen.getByPlaceholderText(/Enter password/i);
    const loginButton = screen.getByRole('button', { name: /Login/i });

    fireEvent.change(emailInput, { target: { value: '  ADMIN@COMPANY.COM  ' } });
    fireEvent.change(passwordInput, { target: { value: 'admin123' } });
    fireEvent.click(loginButton);

    jest.advanceTimersByTime(1500);

    await waitFor(() => {
      const state = store.getState();
      expect(state.auth.user.email).toBe('admin@company.com'); // Should be trimmed and lowercase
    });
  });
});

