import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const UploadPost = createAsyncThunk(
  "post/upload",
  async (post, { rejectWithValue, getState }) => {
    const token = getState()?.users.user.token;
    console.log(token, "token");
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };
    console.log(post);
    try {
      const formData = new FormData();
      formData.append("title", post?.title);
      formData.append("description", post?.description);
      formData.append("category", post?.category);
      formData.append("image", post?.image);
      console.log(formData);
      const res = await axios.post(
        "http://localhost:5000/api/posts/",
        post,
        config
      );
      console.log(res.data);
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

const initialState = {
  loading: false,
  post: {},
  posts: [],
  error: initialError,
};

const PostSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    removeAlert(state, action) {
      state.error = initialError;
    },
  },
  extraReducers: {
    [UploadPost.pending]: (state, action) => {
      state.loading = true;
    },
    [UploadPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.post = action.payload.post;
      state.error.message = action.payload.message;
      state.error.open = true;
    },
    [UploadPost.rejected]: (state, action) => {
      state.loading = false;
      state.error.message = action.payload.message;
      state.error.open = true;
      state.error.type = "error";
    },
  },
});

export const { removeAlert } = PostSlice.actions;

export default PostSlice.reducer;
