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
import SinglePostDetail from "../components/posts/SinglePostDetail";
import UpdatePost from "../components/posts/UpdatePost";
import Profile from "../components/users/Profile/Profile";
import Navbar from "../components/shared/Navbar";
import MuiNavbar from "../components/shared/MuiNavbar";

const Router = () => {
  const { user } = useSelector((store) => store.users);
  return (
    <Routes>
      <Route
        path="/"
        element={
          user ? (
            <Navbar>
              <HomePage />
            </Navbar>
          ) : (
            <Navigate to={"/login"} replace />
          )
        }
      />
      <Route
        path="/posts"
        element={
          user ? (
            <Navbar>
              <AllPosts />
            </Navbar>
          ) : (
            <Navigate to={"/login"} replace />
          )
        }
      />
      <Route
        path="/posts/:id"
        element={
          user ? (
            <Navbar>
              <SinglePostDetail />
            </Navbar>
          ) : (
            <Navigate to={"/login"} replace />
          )
        }
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
        element={
          user ? (
            <Navbar>
              <CreatePost />
            </Navbar>
          ) : (
            <Navigate to={"/"} replace />
          )
        }
      />
      <Route
        path="/edit-post/:id"
        element={
          user ? (
            <Navbar>
              <UpdatePost />
            </Navbar>
          ) : (
            <Navigate to={"/"} replace />
          )
        }
      />
      <Route
        path="/add-category"
        element={
          user?.user?.isAdmin ? (
            <Navbar>
              <AddCategory />
            </Navbar>
          ) : (
            <Navigate to={"/"} replace />
          )
        }
      />
      <Route
        path="/edit-category/:id"
        element={
          user?.user?.isAdmin ? (
            <Navbar>
              <UpdateCategory />
            </Navbar>
          ) : (
            <Navigate to={"/"} replace />
          )
        }
      />
      <Route
        path="/category-list"
        element={
          user?.user?.isAdmin ? (
            <Navbar>
              <CategoryList />
            </Navbar>
          ) : (
            <Navigate to={"/"} replace />
          )
        }
      />
      <Route
        path="/profile"
        element={
          user ? (
            <Navbar>
              <Profile />
            </Navbar>
          ) : (
            <Navigate to={"/"} replace />
          )
        }
      />
    </Routes>
  );
};

export default Router;
