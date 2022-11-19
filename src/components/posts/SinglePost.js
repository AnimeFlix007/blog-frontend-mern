import React from "react";
import DateFormater from "../../utils/DateFormater";
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillDislike,
  AiFillLike,
} from "react-icons/ai";
import { GrView } from "react-icons/gr";
import "../../css/singlePost.css";

const SinglePost = ({ post }) => {
  return (
    <div className="post">
      <div className="top">
        <img src={post?.user?.profilePhoto} alt={post?.user?.firstName} />
        <p>{post?.user?.firstName}</p>
      </div>
      <div className="single_post_container">
        <img src={post.image} alt={post.title} />
        <h1>{post.title}</h1>
        <h3>{post.description}</h3>
        <DateFormater>{post.createdAt}</DateFormater>
      </div>
      <div className="features">
        <div className="icons like">
          <AiOutlineLike />
        </div>
        <div className="icons dislike">
          <AiOutlineDislike />
        </div>
        <div className="icons views">
          <GrView />
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
