import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../components/home/HomePage";
import AddCategory from "../components/categories/AddCategory";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import CategoryList from "../components/categories/CategoryList";
import CreatePost from "../components/posts/CreatePost";
import UpdateCategory from "../components/categories/UpdateCategory";
import AllPosts from "../components/posts/AllPosts";

const Router = () => {
  const { user } = useSelector((store) => store.users);
  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage />}
      />
      <Route
        path="/posts"
        element={<AllPosts />}
      />
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to={"/"} replace />}
      />
      <Route
        path="/register"
        element={!user ? <Register /> : <Navigate to={"/"} replace />}
      />
      <Route
        path="/create-post"
        element={user ? <CreatePost /> : <Navigate to={"/"} replace />}
      />
      <Route
        path="/add-category"
        element={
          user?.user?.isAdmin ? (
            <AddCategory />
          ) : (
            <Navigate to={"/"} replace />
          )
        }
      />
      <Route
        path="/edit-category/:id"
        element={
          user?.user?.isAdmin ? (
            <UpdateCategory />
          ) : (
            <Navigate to={"/"} replace />
          )
        }
      />
      <Route
        path="/category-list"
        element={
          user?.user?.isAdmin ? (
            <CategoryList />
          ) : (
            <Navigate to={"/"} replace />
          )
        }
      />
    </Routes>
  );
};

export default Router;
