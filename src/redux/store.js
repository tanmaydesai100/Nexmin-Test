import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import usersReducer from './usersSlice';
// You can add other slices like ordersReducer, accountsReducer here later

function loadPersistedState() {
  try {
    const serialized = localStorage.getItem('app_state');
    if (!serialized) return undefined;
    const parsed = JSON.parse(serialized);
    return parsed && typeof parsed === 'object' ? parsed : undefined;
  } catch {
    return undefined;
  }
}

function savePersistedState(state) {
  try {
    // Persist auth and users so edits/deletes survive refresh
    const toPersist = { 
      auth: state.auth,
      users: state.users,
    };
    localStorage.setItem('app_state', JSON.stringify(toPersist));
  } catch {
    // ignore write errors
  }
}

const preloadedState = loadPersistedState();

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    // orders: ordersReducer,
    // accounts: accountsReducer,
  },
  preloadedState,
});

// Persist auth slice on any state change
store.subscribe(() => savePersistedState(store.getState()));

export default store;
