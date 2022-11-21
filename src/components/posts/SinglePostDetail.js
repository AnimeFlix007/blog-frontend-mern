import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSinglePostDetail } from "../../context/slice/post/postSlice";

const SinglePostDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { postDetail } = useSelector((store) => store.posts);
  useEffect(() => {
    dispatch(fetchSinglePostDetail(id));
  }, [id]);
  console.log(postDetail);
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
        <div className="post-description">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis
          cumque consequatur voluptatibus at aut vero iste odit deserunt libero
          laboriosam doloribus quod voluptate eos eveniet dolorem eligendi
          assumenda, voluptatem, quia dolores illum obcaecati earum? Vel,
          aperiam. Facere, itaque explicabo.
        </div>
        <div className="features">
          <div className="likes">like</div>
          <div className="dislikes">dislikes</div>
          <div className="views">views</div>
        </div>
      </div>
    </section>
  );
};

export default SinglePostDetail;
