import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button } from "@mui/material";
import { useState } from "react";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";

const AllComments = ({ postId }) => {
  const [openEditCommentModal, setopenEditCommentModal] = useState(false);
  const [opendeleteCommentModal, setopendeleteCommentModal] = useState(false);
  const { postDetail } = useSelector((store) => store.posts);
  const dispatch = useDispatch();
  const [commentid, setCommentId] = useState("");
  const [commenttitle, setCommenttitle] = useState("");

  useEffect(() => {}, []);

  return (
    <section>
      <p>TOTAL COMMENTS : {postDetail?.comments?.length}</p>
      {postDetail?.comments?.map((comment) => {
        return (
          <div key={comment?._id} className="singleComment">
            <Avatar alt={comment?.user?.firstName} src={comment?.user?.profilePhoto} />
            <p>{comment.title}</p>
            <Button
              onClick={() => {
                setopenEditCommentModal((prev) => !prev);
                setCommentId(comment?._id);
                setCommenttitle(comment.title)
              }}
              variant="contained"
              color="success"
            >
              Edit
            </Button>
            <Button
              onClick={() => {
                setopendeleteCommentModal((prev) => !prev);
                setCommentId(comment?._id);
              }}
              variant="contained"
              color="error"
            >
              Delete
            </Button>
          </div>
        );
      })}
      {opendeleteCommentModal && (
        <DeleteModal
          setOpen={setopendeleteCommentModal}
          open={opendeleteCommentModal}
          id={commentid}
        />
      )}
      {openEditCommentModal && (
        <EditModal
          setOpen={setopenEditCommentModal}
          open={openEditCommentModal}
          id={commentid}
          commenttitle={commenttitle}
        />
      )}
    </section>
  );
};

export default AllComments;
