import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllComment } from "../../context/slice/comment/CommentSlice";

const AllComments = () => {
  const { comments, comment } = useSelector((store) => store.comments);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllComment());
  }, [dispatch, comment]);

  return (
    <section>
      <p>TOTAL COMMENTS : {comments.length}</p>
      {comments.map((comment) => {
        return <div className="singleComment">{comment.title}</div>;
      })}
    </section>
  );
};

export default AllComments;
