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
import { useDispatch, useSelector } from "react-redux";
import { postDisLikes, postLikes } from "../../context/slice/post/postSlice";
import { Link } from "react-router-dom";

const SinglePost = ({ post }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.users);
  const isLiked = post.likes.find((p) => {
    return p.id.toString() === user.user.id.toString()
  });
  const isDisLiked = post.DisLikes.find((p) => {
    return p.id.toString() === user.user.id.toString()
  });

  // console.log(isLiked, isDisLiked);
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
          {isLiked ? (
            <AiFillLike onClick={() => postLikeHandler(post._id)} />
          ) : (
            <AiOutlineLike onClick={() => postLikeHandler(post._id)} />
          )}

          {post.likes.length}
        </div>
        <div className="icons dislike">
          {isDisLiked ? (
            <AiFillDislike onClick={() => postDisLikeHandler(post._id)} />
          ) : (
            <AiOutlineDislike onClick={() => postDisLikeHandler(post._id)} />
          )}
          {post.DisLikes.length}
        </div>
        <div className="icons views">
          <GrView />
          {post.numViews}
        </div>
        <div className="details">
          <Link to={`/posts/${post._id}`}>View details</Link>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
