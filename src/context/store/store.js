import { combineReducers, configureStore } from "@reduxjs/toolkit";
import CategorySlice from "../slice/category/CategorySlice";
import postSlice from "../slice/post/postSlice";
import userSlice from "../slice/user/userSlice";

const reducers = combineReducers({
  users: userSlice,
  category: CategorySlice,
  posts: postSlice,
});

const store = configureStore({ reducer: reducers });

export default store;
