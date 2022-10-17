import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentComments: [],
  loading: false,
  error: false,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchSuccsess: (state, action) => {
      state.loading = false;
      state.currentComments = action.payload;
    },
    deleteComment: (state, action) => {
      const commentId = action.payload;
      const { currentComments } = state;

      currentComments.splice(
        currentComments.findIndex((comment) => comment._id === commentId),
        1
      );
    },
    editComment: (state, action) => {
      const editedComment = action.payload;

      state.currentComments = state.currentComments.map((comment) =>
        comment._id === editedComment._id ? editedComment : comment
      );
    },
    fetchFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  fetchStart,
  fetchSuccsess,
  fetchFailure,
  deleteComment,
  editComment,
} = commentsSlice.actions;
export default commentsSlice.reducer;
