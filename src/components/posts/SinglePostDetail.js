/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deletePost,
  fetchSinglePostDetail,
  postDisLikes,
  postLikes,
} from "../../context/slice/post/postSlice";
import "../../css/singlePostDetail.css";
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillDislike,
  AiFillLike,
  AiFillEdit,
  AiFillDelete,
} from "react-icons/ai";
import { GrView } from "react-icons/gr";
import AddComment from "../comments/AddComment";

const SinglePostDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postDetail, isNotValid } = useSelector((store) => store.posts);
  const { user } = useSelector((store) => store.users);
  const [x, setX] = useState(false);
  const isLiked = postDetail.likes?.find((p) => {
    return p.id.toString() === user.user.id.toString();
  });
  const isDisLiked = postDetail.DisLikes?.find((p) => {
    return p.id.toString() === user.user.id.toString();
  });

  const deletePostHandler = async (id) => {
    await dispatch(deletePost(id));
    navigate("/posts");
  };

  useEffect(() => {
    dispatch(fetchSinglePostDetail(id));
  }, [id, x]);

  useEffect(() => {
    if (isNotValid) {
      navigate("/posts");
    }
  }, [isNotValid]);

  // console.log(isLiked, isDisLiked);
  const postLikeHandler = async (id) => {
    await dispatch(postLikes(id));
    setX(!x);
  };
  const postDisLikeHandler = async (id) => {
    await dispatch(postDisLikes(id));
    setX(!x);
  };

  return (
    <section className="post__detail-container">
        <div className="image-container">
          <img src={postDetail?.image} alt="alpha" />
        </div>
        <div className="post-details">
          <h1>{postDetail?.title}</h1>
          <div className="user-details">
            <img src={postDetail?.user?.profilePhoto} alt="userImage" />
            <p className="username">{postDetail?.user?.firstName}</p>
          </div>
          <div className="post-description">{postDetail?.description}</div>
          <div className="features">
            <div className="icons like">
              {isLiked ? (
                <AiFillLike onClick={() => postLikeHandler(postDetail?._id)} />
              ) : (
                <AiOutlineLike
                  onClick={() => postLikeHandler(postDetail?._id)}
                />
              )}
              {postDetail?.likes?.length}
            </div>
            <div className="icons dislike">
              {isDisLiked ? (
                <AiFillDislike
                  onClick={() => postDisLikeHandler(postDetail._id)}
                />
              ) : (
                <AiOutlineDislike
                  onClick={() => postDisLikeHandler(postDetail._id)}
                />
              )}
              {postDetail.DisLikes?.length}
            </div>
            <div className="icons views">
              <GrView />
              {postDetail.numViews}
            </div>
            <div className="details">
              <Link to={`/posts`}>Back To All Posts</Link>
            </div>
          </div>
          {user.user.id.toString() === postDetail?.user?.id?.toString() && (
            <div className="editPost">
              <div className="edit-post-icon">
                <AiFillEdit
                  onClick={() => navigate(`/edit-post/${postDetail._id}`)}
                />
              </div>
              <div className="delete-post-icon">
                <AiFillDelete
                  onClick={() => deletePostHandler(postDetail._id)}
                />
              </div>
            </div>
          )}
        </div>
        <AddComment postId={postDetail.id} userId={user.user.id} />
    </section>
  );
};

export default SinglePostDetail;
