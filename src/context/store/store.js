import { combineReducers, configureStore } from "@reduxjs/toolkit";
import CategorySlice from "../slice/category/CategorySlice";
import userSlice from "../slice/user/userSlice";

const reducers = combineReducers({
  users: userSlice,
  category: CategorySlice
});

const store = configureStore({ reducer: reducers });

export default store;
