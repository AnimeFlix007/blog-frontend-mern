import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userLogout } from "../../context/slice/user/userSlice";
import "../../css/navbar.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.users);
  function logoutHandler() {
    dispatch(userLogout());
  }
  return (
    <nav className="navbar">
      <div className="logo">BLOGS</div>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        {!user && (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
        {user && (
          <li>
            <Link to="/create-post">create-post</Link>
          </li>
        )}
        <li>
          <Link to="/posts">Posts</Link>
        </li>
        {!user && (
          <li>
            <Link to="/register">register</Link>
          </li>
        )}
        {user && (
          <li>
            <Link to="/authors">authors</Link>
          </li>
        )}
        {user && (
          <li>
            <button onClick={logoutHandler}>logout</button>
          </li>
        )}
        {user?.user?.isAdmin && (
          <li>
            <Link to="/add-category">add category</Link>
          </li>
        )}
        {user?.user?.isAdmin && (
          <li>
            <Link to="/category-list">category list</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
