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
import { useDispatch } from "react-redux";
import { postDisLikes, postLikes } from "../../context/slice/post/postSlice";

const SinglePost = ({ post }) => {
  const dispatch = useDispatch();
  const postLikeHandler = async (id) => {
    await dispatch(postLikes(id));
  };
  const postDisLikeHandler = async (id) => {
    await dispatch(postDisLikes(id));
  };
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
          <AiOutlineLike onClick={() => postLikeHandler(post._id)} />
          {post.likes.length}
        </div>
        <div className="icons dislike">
          <AiOutlineDislike onClick={() => postDisLikeHandler(post._id)} />
          {post.DisLikes.length}
        </div>
        <div className="icons views">
          <GrView />
          {post.numViews}
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
