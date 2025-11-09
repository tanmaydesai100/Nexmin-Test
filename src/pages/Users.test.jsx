import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import Users from './Users';
import authReducer from '../redux/authSlice';
import usersReducer from '../redux/usersSlice';

// Mock react-router-dom (using manual mock)
jest.mock('react-router-dom');

describe('Users Test', () => {
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

  test('Should render Users component', () => {
    const screen = renderUsers();
    const tree = screen.container;
    expect(tree).toMatchSnapshot();
  });

  test('Should render Users with user list', () => {
    renderUsers();
    
    expect(screen.getByText(/User Management/i)).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
  });

  test('Should render empty state when no users', () => {
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

    expect(screen.getAllByText(/No users found/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Get started by adding your first user/i).length).toBeGreaterThan(0);
  });

  test('Should open add user modal when Add User button is clicked', () => {
    renderUsers();
    
    const addButton = screen.getByText(/Add User/i);
    fireEvent.click(addButton);

    expect(screen.getByText(/Add New User/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter full name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/name@example.com/i)).toBeInTheDocument();
  });

  test('Should close add user modal when Cancel is clicked', () => {
    renderUsers();
    
    const addButton = screen.getByText(/Add User/i);
    fireEvent.click(addButton);

    expect(screen.getByText(/Add New User/i)).toBeInTheDocument();

    const cancelButton = screen.getByText(/Cancel/i);
    fireEvent.click(cancelButton);

    expect(screen.queryByText(/Add New User/i)).not.toBeInTheDocument();
  });

  test('Should add new user when form is submitted', async () => {
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
      expect(users).toContainEqual(
        expect.objectContaining({
          name: 'New User',
          email: 'newuser@example.com',
          role: 'support',
        })
      );
    });
  });

  test('Should not add user with empty fields', () => {
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

  test('Should delete user when delete button is clicked', async () => {
    renderUsers();
    
    const deleteButtons = screen.getAllByTitle(/Delete/i);
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      const state = store.getState();
      const userExists = state.users.list.find(u => u.id === '1');
      expect(userExists).toBeUndefined();
    });
  });

  test('Should trim and lowercase email when adding user', async () => {
    renderUsers();
    
    const addButton = screen.getByText(/Add User/i);
    fireEvent.click(addButton);

    const nameInput = screen.getByPlaceholderText(/Enter full name/i);
    const emailInput = screen.getByPlaceholderText(/name@example.com/i);
    const roleInput = screen.getByPlaceholderText(/e.g., admin, accountant/i);
    const saveButton = screen.getByText(/Save User/i);

    fireEvent.change(nameInput, { target: { value: '  Test User  ' } });
    fireEvent.change(emailInput, { target: { value: '  TEST@EXAMPLE.COM  ' } });
    fireEvent.change(roleInput, { target: { value: '  admin  ' } });
    fireEvent.click(saveButton);

    await waitFor(() => {
      const state = store.getState();
      const users = state.users.list;
      expect(users).toContainEqual(
        expect.objectContaining({
          name: 'Test User',
          email: 'test@example.com',
          role: 'admin',
        })
      );
    });
  });
});

