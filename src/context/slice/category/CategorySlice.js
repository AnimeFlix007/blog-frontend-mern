import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createCategory = createAsyncThunk(
  "category/create",
  async (category, { rejectWithValue, getState }) => {
    // console.log(getState());
    const token = getState()?.users?.user?.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await axios.post(
        "http://localhost:5000/api/category",
        category,
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

export const getAllCategories = createAsyncThunk(
  "category/getAllCategories",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const token = getState()?.users?.user?.token;
    console.log(getState());
    console.log(token);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await axios.get(
        "http://localhost:5000/api/category/",
        config
      );
      console.log("resssssss", res.data);
      return res.data;
    } catch (error) {
      if (!error && !error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "category/update",
  async (category, { rejectWithValue, getState }) => {
    const token = getState()?.users?.user?.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await axios.put(
        `http://localhost:5000/api/category/${category.id}`,
        { title: category.title },
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

export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (id, { rejectWithValue, getState }) => {
    const token = getState()?.users?.user?.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/category/${id}`,
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

export const getCategory = createAsyncThunk(
  "category/getDetail",
  async (id, { rejectWithValue, getState }) => {
    const token = getState()?.users?.user?.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await axios.get(
        `http://localhost:5000/api/category/${id}`,
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

const categorySlice = createSlice({
  name: "category",
  initialState: {
    loading: false,
    category: "",
    categories: [],
    error: initialError,
  },
  reducers: {
    removeAlert(state, action) {
      state.error = initialError;
    },
  },
  extraReducers: {
    [createCategory.pending]: (state, action) => {
      state.loading = true;
    },
    [createCategory.fulfilled]: (state, action) => {
      state.loading = false;
      state.category = action.payload;
      state.error.message = action?.payload?.message;
      state.error.open = true;
    },
    [createCategory.rejected]: (state, action) => {
      state.loading = false;
      state.error.message = action?.payload?.message;
      state.error.open = true;
      state.error.type = "error";
    },
    [getAllCategories.pending]: (state, action) => {
      state.loading = true;
      state.categories = null;
    },
    [getAllCategories.fulfilled]: (state, action) => {
      state.loading = false;
      state.categories = action?.payload?.categories;
      // state.error.message = action?.payload?.message;
      // state.error.open = true;
    },
    [getAllCategories.rejected]: (state, action) => {
      state.loading = false;
      state.error.message = action?.payload?.message;
      state.error.open = true;
      state.error.type = "error";
    },
    [deleteCategory.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteCategory.fulfilled]: (state, action) => {
      state.loading = false;
      state.error.message = action?.payload?.message;
      state.error.open = true;
    },
    [deleteCategory.rejected]: (state, action) => {
      state.loading = false;
      state.error.message = action?.payload?.message;
      state.error.open = true;
      state.error.type = "error";
    },
    [updateCategory.pending]: (state, action) => {
      state.loading = true;
    },
    [updateCategory.fulfilled]: (state, action) => {
      state.loading = false;
      state.error.message = action?.payload?.message;
      state.error.open = true;
    },
    [updateCategory.rejected]: (state, action) => {
      state.loading = false;
      state.error.message = action?.payload?.message;
      state.error.open = true;
      state.error.type = "error";
    },
    [getCategory.pending]: (state, action) => {
      state.loading = true;
    },
    [getCategory.fulfilled]: (state, action) => {
      state.loading = false;
      state.category = action.payload.category;
    },
    [getCategory.rejected]: (state, action) => {
      state.loading = false;
      state.error.message = action?.payload?.message;
      state.error.open = true;
      state.error.type = "error";
    },
  },
});

export const CategoryActions = categorySlice.actions;

export default categorySlice.reducer;
