import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const postComment = createAsyncThunk(
  "comment/add",
  async (comment, { rejectWithValue, getState, dispatch }) => {
    const token = getState()?.users?.user?.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    console.log(comment);
    try {
        const res = await axios.post(
          `http://localhost:5000/api/comments/`,
          comment,
          config
        );
        return res.data;
      } catch (error) {
        if (!error && !error?.response) {
          throw error;
        }
        return rejectWithValue(error?.response?.data);
      }
    }
);

const initialError = {
  open: false,
  message: "",
  type: "success",
};

const commentSlice = createSlice({
  name: "category",
  initialState: {
    loading: false,
    comment: "",
    comments: [],
    error: initialError,
  },
  reducers: {
    removeAlert(state, action) {
      state.error = initialError;
    },
  },
  extraReducers: {
    [postComment.pending]: (state, action) => {
        state.loading = true;
    },
    [postComment.fulfilled]: (state, action) => {
        state.loading = false;
        state.comment = action.payload.comment
        state.error.message = action?.payload?.message;
        state.error.open = true;
    },
    [postComment.rejected]: (state, action) => {
        state.loading = false;
        state.error.message = action?.payload?.message;
        state.error.open = true;
        state.error.type = "error";
    },
  },
});

export const CommentActions = commentSlice.actions;

export default commentSlice.reducer;
