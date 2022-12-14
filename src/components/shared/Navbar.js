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
        {user && <li>
          <Link to="/posts">Posts</Link>
        </li>}
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


// import "../../css/navbar.css";
// import React, { useState } from "react";
// import { SiDatabricks } from "react-icons/si";
// import { FaBars, FaTimes } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { userLogout } from "../../context/slice/user/userSlice";

// const Navbar = () => {
//   const [nav, setNav] = useState(false);
//   const showHandler = () => {
//     setNav((prev) => !prev);
//   };
//   const title = nav ? "nav-menu active" : "nav-menu";
//   const dispatch = useDispatch();
//   const { user } = useSelector((store) => store.users);
//   function logoutHandler() {
//     dispatch(userLogout());
//   }
//   return (
//     <nav className="navbar">
//       <div className="container">
//         <div className="logo">
//           <SiDatabricks className="icon" />
//           <h1><Link to='/'>Security</Link></h1>
//         </div>

//         <ul className={title}>
//         <li>
//           <Link to="/">Home</Link>
//         </li>
//         {!user && (
//           <li>
//             <Link to="/login">Login</Link>
//           </li>
//         )}
//         {user && (
//           <li>
//             <Link to="/create-post">create-post</Link>
//           </li>
//         )}
//         {user && <li>
//           <Link to="/posts">Posts</Link>
//         </li>}
//         {!user && (
//           <li>
//             <Link to="/register">register</Link>
//           </li>
//         )}
//         {user && (
//           <li>
//             <Link to="/authors">authors</Link>
//           </li>
//         )}
//         {user && (
//           <li>
//             <button onClick={logoutHandler}>logout</button>
//           </li>
//         )}
//         {user?.user?.isAdmin && (
//           <li>
//             <Link to="/add-category">add category</Link>
//           </li>
//         )}
//         {user?.user?.isAdmin && (
//           <li>
//             <Link to="/category-list">category list</Link>
//           </li>
//         )}
//         </ul>

//         <div className="hamburger" onClick={showHandler}>
//           {!nav && <FaBars />}
//           {nav && <FaTimes />}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;