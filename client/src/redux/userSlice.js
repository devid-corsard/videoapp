import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccsess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logout: (state) => {
      return initialState;
    },
    subscription: (state, action) => {
      const { subscribedUsers } = state.currentUser;
      const userId = action.payload;

      if (subscribedUsers.includes(userId)) {
        subscribedUsers.splice(subscribedUsers.indexOf(userId), 1);
      } else {
        subscribedUsers.push(userId);
      }
    },
  },
});

export const { loginStart, loginSuccsess, loginFailure, logout, subscription } =
  userSlice.actions;
export default userSlice.reducer;
