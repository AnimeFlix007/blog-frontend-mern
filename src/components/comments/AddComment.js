import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { postComment } from "../../context/slice/comment/CommentSlice";
import addCommentSchema from "../../utils/schema/AddComment";

const AddComment = ({ postId }) => {
  const dispatch = useDispatch();
  const {} = useSelector((store) => store);
  const { handleSubmit, handleBlur, handleChange, errors, values, touched } =
    useFormik({
      initialValues: {
        title: "",
      },
      validationSchema: addCommentSchema,
      onSubmit: async (values, action) => {
        console.log("submitted", values);
        const data = {
          postId: postId,
          // user: userId,
          title: values.title,
        };
        dispatch(postComment(data));
        action.resetForm();
      },
    });
  return (
    <div>
      <div className="comment__form">
        <TextField
          id="outlined-basic"
          label="Enter Comment"
          fullWidth
          variant="outlined"
          name="title"
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.title && touched.title ? (
          <p className="form-error">{errors.title}</p>
        ) : null}
      </div>
      <Button onClick={handleSubmit} type="submit" variant="contained">
        Add Comment
      </Button>
    </div>
  );
};

export default AddComment;
