import { combineReducers, configureStore } from "@reduxjs/toolkit";
import CategorySlice from "../slice/category/CategorySlice";
import CommentSlice from "../slice/comment/CommentSlice";
import postSlice from "../slice/post/postSlice";
import userSlice from "../slice/user/userSlice";

const reducers = combineReducers({
  users: userSlice,
  category: CategorySlice,
  posts: postSlice,
  comments: CommentSlice
});

const store = configureStore({ reducer: reducers });

export default store;
