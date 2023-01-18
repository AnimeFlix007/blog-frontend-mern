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

export const getAllComment = createAsyncThunk(
  "comment/getAll",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const token = getState()?.users?.user?.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await axios.get(
        `http://localhost:5000/api/comments/`,
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

export const EditComment = createAsyncThunk(
  "comment/editComment",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const token = getState()?.users?.user?.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      console.log(payload);
      const res = await axios.put(
        `http://localhost:5000/api/comments/${payload.id}`,
        payload,
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

export const DeleteComment = createAsyncThunk(
  "comment/deletecomment",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const token = getState()?.users?.user?.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/comments/${payload.id}`,
        config
      );
      console.log(res);
      return res.data;
    } catch (error) {
      if (!error && !error?.response) {
        throw error;
      }
      console.log(error.response);
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
    comment: {},
    comments: [],
    error: initialError,
    commentAdded: false,
    commentdeleted: false
  },
  reducers: {
    removeAlert(state, action) {
      state.error = initialError;
    },
  },
  extraReducers: {
    [postComment.pending]: (state, action) => {
      state.loading = true;
      state.commentAdded = false
    },
    [postComment.fulfilled]: (state, action) => {
      state.loading = false;
      state.commentAdded = true
      state.comment = action.payload.comment;
      state.error.message = action?.payload?.message;
      state.error.open = true;
    },
    [postComment.rejected]: (state, action) => {
      state.loading = false;
      state.error.message = action?.payload?.message;
      state.error.open = true;
      state.error.type = "error";
    },
    [getAllComment.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllComment.fulfilled]: (state, action) => {
      state.loading = false;
      state.comments = action.payload.comments;
    },
    [getAllComment.rejected]: (state, action) => {
      state.loading = false;
      state.error.message = action?.payload?.message;
      state.error.open = true;
      state.error.type = "error";
    },
    [EditComment.pending]: (state, action) => {
      state.loading = true;
      state.commentEdited = false
    },
    [EditComment.fulfilled]: (state, action) => {
      state.loading = false;
      state.commentEdited = true
      state.error.open = true;
      state.error.message = action?.payload?.message;
      state.error.type = "success";
    },
    [EditComment.rejected]: (state, action) => {
      state.loading = false;
      state.commentEdited = false
      state.error.message = action?.payload?.message;
      state.error.open = true;
      state.error.type = "error";
    },
    [DeleteComment.pending]: (state, action) => {
      state.loading = true;
      state.commentdeleted = false
    },
    [DeleteComment.fulfilled]: (state, action) => {
      state.loading = false;
      state.commentdeleted = true
      state.error.open = true;
      state.error.message = action?.payload?.message;
      state.error.type = "success";
    },
    [DeleteComment.rejected]: (state, action) => {
      state.loading = false;
      state.commentdeleted = false
      state.error.message = action?.payload?.message;
      state.error.open = true;
      state.error.type = "error";
    },
  },
});

export const CommentActions = commentSlice.actions;

export default commentSlice.reducer;
