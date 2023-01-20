import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUserAction = createAsyncThunk(
  "users/register",
  async (user, { rejectWithValue, getState, dispatch }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(
        "http://localhost:5000/api/users/register",
        user,
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

export const userLogin = createAsyncThunk(
  "users/login",
  async (user, { rejectWithValue, getState, dispatch }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        user,
        config
      );
      const data = {
        user: {
          firstName: res.data.user.firstName,
          lastName: res.data.user.lastName,
          email: res.data.user.email,
          profilePhoto: res.data.user.profilePhoto,
          role: res.data.user.role,
          isAdmin: res.data.user.isAdmin,
          id: res.data.user._id,
        },
        token: res.data.token,
      };
      localStorage.setItem("userInfo", JSON.stringify(data));
      return res.data;
    } catch (error) {
      if (!error && !error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const userProfile = createAsyncThunk(
  "users/profile",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getState()?.users.user.token;
      console.log(token, "token");
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.get(
        `http://localhost:5000/api/users/profile/${id}`,
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

export const userLogout = createAsyncThunk(
  "users/logout",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      localStorage.removeItem("userInfo");
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const userLoggedIn = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

console.log(userLoggedIn);

const initialError = {
  open: false,
  message: "",
  type: "success",
};

const userSlice = createSlice({
  name: "users",
  initialState: {
    loading: false,
    error: initialError,
    user: userLoggedIn,
    registered: false,
    isLoggedIn: false,
    userprofile: {}
  },
  reducers: {
    removeAlert(state, action) {
      state.error = initialError;
    },
  },
  extraReducers: {
    [registerUserAction.pending]: (state, action) => {
      state.loading = true;
      // state.error = initialError;
      // state.registered = false
    },
    [registerUserAction.fulfilled]: (state, action) => {
      state.loading = false;
      state.error.open = true;
      state.error.message = "User Registered Successfully";
      state.registered = true;
    },
    [registerUserAction.rejected]: (state, action) => {
      state.loading = false;
      state.error.open = true;
      state.error.message = action?.payload?.message;
      state.error.type = "error";
    },
    [userLogin.pending]: (state, action) => {
      state.loading = true;
      state.error = initialError;
      // state.user = null;
      // state.isLoggedIn = false
    },
    [userLogin.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error.open = true;
      state.error.message = "User Logged In Successfully";
      state.isLoggedIn = true;
    },
    [userLogin.rejected]: (state, action) => {
      state.loading = false;
      state.error.open = true;
      state.error.message = action?.payload?.message;
      state.error.type = "error";
      state.user = null;
    },
    [userLogout.pending]: (state, action) => {
      state.loading = true;
      state.error = initialError;
    },
    [userLogout.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = null;
      state.error.open = true;
      state.error.message = "User Logged Out Successfully";
      state.isLoggedIn = false;
    },
    [userLogout.rejected]: (state, action) => {
      state.loading = false;
      state.error.open = true;
      state.error.message = action?.payload?.message;
      state.error.type = "error";
    },
    [userProfile.pending]: (state, action) => {
      state.loading = true;
    },
    [userProfile.fulfilled]: (state, action) => {
      state.loading = false;
      state.userprofile = action.payload.profile;
    },
    [userProfile.rejected]: (state, action) => {
      state.loading = false;
      state.error.open = true;
      state.error.message = action?.payload?.message;
      state.error.type = "error";
    },
  },
});

export const userActionns = userSlice.actions;

export default userSlice.reducer;
