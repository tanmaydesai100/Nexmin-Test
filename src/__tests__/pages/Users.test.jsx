import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import Users from '../../pages/Users';
import authReducer from '../../redux/authSlice';
import usersReducer from '../../redux/usersSlice';

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('../../__mocks__/react-router-dom'),
  Link: ({ to, children }) => <a href={to}>{children}</a>,
  BrowserRouter: ({ children }) => <div>{children}</div>,
}));

describe('Users', () => {
  let store;

  const mockUsers = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'admin',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'accountant',
    },
  ];

  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authReducer,
        users: usersReducer,
      },
      preloadedState: {
        auth: {
          isAuthenticated: true,
          user: { id: 'admin-1', name: 'Admin', role: 'super_admin' },
          role: 'super_admin',
        },
        users: {
          list: mockUsers,
        },
      },
    });
  });

  const renderUsers = () => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <Users />
        </BrowserRouter>
      </Provider>
    );
  };

  test('renders Users component', () => {
    renderUsers();
    expect(screen.getByText(/User Management/i)).toBeInTheDocument();
  });

  test('displays user list', () => {
    renderUsers();
    
    // Check that user names appear (may appear multiple times in table and mobile views)
    const johnElements = screen.getAllByText('John Doe');
    expect(johnElements.length).toBeGreaterThan(0);
    
    const janeElements = screen.getAllByText('Jane Smith');
    expect(janeElements.length).toBeGreaterThan(0);
  });

  test('displays empty state when no users', () => {
    store = configureStore({
      reducer: {
        auth: authReducer,
        users: usersReducer,
      },
      preloadedState: {
        auth: {
          isAuthenticated: true,
          user: { id: 'admin-1', name: 'Admin', role: 'super_admin' },
          role: 'super_admin',
        },
        users: {
          list: [],
        },
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Users />
        </BrowserRouter>
      </Provider>
    );

    const emptyMessages = screen.getAllByText(/No users found/i);
    expect(emptyMessages.length).toBeGreaterThan(0);
  });

  test('opens add user modal when Add User button is clicked', () => {
    renderUsers();
    
    const addButton = screen.getByText(/Add User/i);
    fireEvent.click(addButton);

    expect(screen.getByText(/Add New User/i)).toBeInTheDocument();
  });

  test('closes add user modal when Cancel is clicked', () => {
    renderUsers();
    
    const addButton = screen.getByText(/Add User/i);
    fireEvent.click(addButton);

    expect(screen.getByText(/Add New User/i)).toBeInTheDocument();

    const cancelButton = screen.getByText(/Cancel/i);
    fireEvent.click(cancelButton);

    expect(screen.queryByText(/Add New User/i)).not.toBeInTheDocument();
  });

  test('adds new user when form is submitted', async () => {
    renderUsers();
    
    const addButton = screen.getByText(/Add User/i);
    fireEvent.click(addButton);

    const nameInput = screen.getByPlaceholderText(/Enter full name/i);
    const emailInput = screen.getByPlaceholderText(/name@example.com/i);
    const roleInput = screen.getByPlaceholderText(/e.g., admin, accountant/i);
    const saveButton = screen.getByText(/Save User/i);

    fireEvent.change(nameInput, { target: { value: 'New User' } });
    fireEvent.change(emailInput, { target: { value: 'newuser@example.com' } });
    fireEvent.change(roleInput, { target: { value: 'support' } });
    fireEvent.click(saveButton);

    await waitFor(() => {
      const state = store.getState();
      const users = state.users.list;
      expect(users.length).toBeGreaterThan(mockUsers.length);
    });
  });

  test('does not add user with empty fields', () => {
    renderUsers();
    
    const addButton = screen.getByText(/Add User/i);
    fireEvent.click(addButton);

    const saveButton = screen.getByText(/Save User/i);
    fireEvent.click(saveButton);

    // Modal should still be open
    expect(screen.getByText(/Add New User/i)).toBeInTheDocument();
    
    // No user should be added
    const state = store.getState();
    expect(state.users.list).toHaveLength(mockUsers.length);
  });

  test('deletes user when delete button is clicked', async () => {
    renderUsers();
    
    const deleteButtons = screen.getAllByTitle(/Delete/i);
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      const state = store.getState();
      expect(state.users.list.length).toBeLessThan(mockUsers.length);
    });
  });
});

