import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentVideo: null,
  loading: false,
  error: false,
};

export const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchSuccsess: (state, action) => {
      state.loading = false;
      state.currentVideo = action.payload;
    },
    fetchFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    like: (state, action) => {
      const { likes, dislikes } = state.currentVideo;
      const userId = action.payload;

      if (!likes.includes(userId)) {
        likes.push(userId);
        dislikes.splice(dislikes.indexOf(userId), 1);
      }
    },
    dislike: (state, action) => {
      const { likes, dislikes } = state.currentVideo;
      const userId = action.payload;

      if (!dislikes.includes(userId)) {
        dislikes.push(userId);
        likes.splice(likes.indexOf(userId), 1);
      }
    },
  },
});

export const { fetchStart, fetchSuccsess, fetchFailure, dislike, like } =
  videoSlice.actions;
export default videoSlice.reducer;
