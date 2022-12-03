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
    // console.log(post);
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

export const FetchAllPosts = createAsyncThunk(
  "posts/all",
  async (category, { rejectWithValue, getState }) => {
    const token = getState()?.users.user.token;
    console.log(token, "token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await axios.get(
        `http://localhost:5000/api/posts?category=${category}`,
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

export const postLikes = createAsyncThunk(
  "post/like",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    const token = getState()?.users.user.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await axios.put(
        "http://localhost:5000/api/posts/likes",
        { id: postId },
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

export const postDisLikes = createAsyncThunk(
  "post/like",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    const token = getState()?.users.user.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await axios.put(
        "http://localhost:5000/api/posts/dislikes",
        { id: postId },
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

export const fetchSinglePostDetail = createAsyncThunk(
  "posts/details",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    const token = getState()?.users?.user.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.get(
        `http://localhost:5000/api/posts/${postId}`,
        config
      );
      return response.data;
    } catch (error) {
      if (!error && !error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const deletePost = createAsyncThunk(
  "post/delete",
  async (postId, { rejectWithValue, getState }) => {
    try {
      const token = getState()?.users.user.token;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      console.log(token);
      const res = await axios.delete(
        `http://localhost:5000/api/posts/${postId}`,
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

export const Update_Post = createAsyncThunk(
  "post/update",
  async (post, { rejectWithValue, getState }) => {
    try {
      const token = getState()?.users.user.token;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.put(
        `http://localhost:5000/api/posts/${post.postId}`,
        post,
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

const initialState = {
  loading: false,
  post: {},
  postDetail: {},
  posts: [],
  error: initialError,
  updated: false
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
    [FetchAllPosts.pending]: (state, action) => {
      state.loading = true;
    },
    [FetchAllPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts = action.payload.posts;
    },
    [FetchAllPosts.rejected]: (state, action) => {
      state.loading = false;
      state.error.message = action.payload.message;
      state.error.open = true;
      state.error.type = "error";
    },
    [postLikes.pending]: (state, action) => {
      state.loading = true;
    },
    [postLikes.fulfilled]: (state, action) => {
      state.loading = false;
      state.error.message = action.payload.message;
      state.post = action.payload.post;
      state.error.open = true;
    },
    [postLikes.rejected]: (state, action) => {
      state.loading = false;
      state.error.message = action.payload.message;
      state.error.open = true;
      state.error.type = "error";
    },
    [postDisLikes.pending]: (state, action) => {
      state.loading = true;
    },
    [postDisLikes.fulfilled]: (state, action) => {
      state.loading = false;
      state.error.message = action.payload.message;
      state.post = action.payload.post;
      state.error.open = true;
    },
    [postDisLikes.rejected]: (state, action) => {
      state.loading = false;
      state.error.message = action.payload.message;
      state.error.open = true;
      state.error.type = "error";
    },
    [fetchSinglePostDetail.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchSinglePostDetail.fulfilled]: (state, action) => {
      state.loading = false;
      state.postDetail = action.payload.post;
    },
    [fetchSinglePostDetail.rejected]: (state, action) => {
      state.loading = false;
      state.error.message = action.payload.message;
      state.error.open = true;
      state.error.type = "error";
      state.postDetail = 1;
    },
    [Update_Post.pending]: (state, action) => {
      state.loading = true;
    },
    [Update_Post.fulfilled]: (state, action) => {
      state.loading = false;
      state.error.message = action.payload.message;
      state.error.open = true;
      state.updated = true;
    },
    [Update_Post.rejected]: (state, action) => {
      state.loading = false;
      state.error.message = action.payload.message;
      state.error.open = true;
      state.error.type = "error";
    },
    [deletePost.pending]: (state, action) => {
      state.loading = true;
    },
    [deletePost.fulfilled]: (state, action) => {
      state.loading = false;
      state.error.message = action.payload.message;
      state.error.open = true;
    },
    [deletePost.rejected]: (state, action) => {
      state.loading = false;
      state.error.message = action.payload.message;
      state.error.open = true;
      state.error.type = "error";
    },
  },
});

export const { removeAlert } = PostSlice.actions;

export default PostSlice.reducer;
