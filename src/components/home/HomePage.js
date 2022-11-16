import React from "react";
import Poster from "../../images/poster.jfif";
import "../../css/homepage.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.users);
  return (
    <section className="homepage">
      <div className="homepage__left">
        <h1>Create Your Own Beautiful Blog Now</h1>
        {!user ? (
          <button onClick={() => navigate("/login")}>Login Now</button>
        ) : (
          <button onClick={() => navigate("/create-post")}>Create Blog</button>
        )}
      </div>
      <div className="homepage__right">
        <img src={Poster} alt="poster" />
      </div>
    </section>
  );
};

export default HomePage;
