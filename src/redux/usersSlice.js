import { createSlice } from '@reduxjs/toolkit';
import { usersData } from '../data/usersData';

const usersSlice = createSlice({
  name: 'users',
  initialState: { list: usersData },
  reducers: {
    addUser(state, action) { state.list.unshift(action.payload); },
    updateUser(state, action) {
      const idx = state.list.findIndex(u => u.id === action.payload.id);
      if (idx !== -1) state.list[idx] = { ...state.list[idx], ...action.payload.changes };
    },
    removeUser(state, action) { state.list = state.list.filter(u => u.id !== action.payload); },
  },
});

export const { addUser, updateUser, removeUser } = usersSlice.actions;
export default usersSlice.reducer;
