import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import Login from '../../pages/Login';
import authReducer from '../../redux/authSlice';

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
  return function LoadingRing() {
    return <div data-testid="loading-ring">Loading...</div>;
  };
});

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('../../__mocks__/react-router-dom'),
  BrowserRouter: ({ children }) => <div>{children}</div>,
}));

describe('Login', () => {
  let store;

  beforeEach(() => {
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

  test('renders Login component', () => {
    renderLogin();
    expect(screen.getByText(/Admin Dashboard — Login/i)).toBeInTheDocument();
  });

  test('renders email input field', () => {
    renderLogin();
    expect(screen.getByPlaceholderText(/Enter email/i)).toBeInTheDocument();
  });

  test('renders password input field', () => {
    renderLogin();
    expect(screen.getByPlaceholderText(/Enter password/i)).toBeInTheDocument();
  });

  test('renders Login button', () => {
    renderLogin();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });

  test('renders test accounts section', () => {
    renderLogin();
    expect(screen.getByText(/Test accounts:/i)).toBeInTheDocument();
  });

  test('allows typing in email input', () => {
    renderLogin();
    const emailInput = screen.getByPlaceholderText(/Enter email/i);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput.value).toBe('test@example.com');
  });

  test('allows typing in password input', () => {
    renderLogin();
    const passwordInput = screen.getByPlaceholderText(/Enter password/i);
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(passwordInput.value).toBe('password123');
  });

  test('can click Login button', () => {
    renderLogin();
    const loginButton = screen.getByRole('button', { name: /Login/i });
    fireEvent.click(loginButton);
    // Button should still be in the document after click
    expect(loginButton).toBeInTheDocument();
  });

  test('displays form with both inputs and button', () => {
    renderLogin();
    expect(screen.getByPlaceholderText(/Enter email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });
});
