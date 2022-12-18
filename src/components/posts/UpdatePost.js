/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Input } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import Img from "../../images/updateCategory.jfif";
import "../../css/addCategory.css";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";
import updatePostSchema from "../../utils/schema/UpdatePost";
import {
  fetchSinglePostDetail,
  Update_Post,
} from "../../context/slice/post/postSlice";
import DropdownCategory from "./DropdownCategory";

const UpdatePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { postDetail, loading, updated } = useSelector((store) => store.posts);
  const { user } = useSelector((store) => store.users);
  const {
    handleSubmit,
    handleBlur,
    handleChange,
    errors,
    values,
    touched,
    setFieldTouched,
    setFieldValue,
  } = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: postDetail.title,
      description: postDetail.description,
      category: postDetail.category?.label,
    },
    validationSchema: updatePostSchema,
    onSubmit: (values, action) => {
      dispatch(
        Update_Post({
          postId: postDetail._id,
          title: values.title,
          description: values.description,
          category: values.category.label,
        })
      );
      navigate("/posts");
      action.resetForm();
    },
  });

  useEffect(() => {
    if(user.user.id.toString() === postDetail?.user?.id?.toString()) {
      dispatch(fetchSinglePostDetail(id));
    } else {
      navigate("/posts")
    }
  }, [dispatch, id]);

  return (
    <section>
      <div>
        <img src={Img} alt={"addImg"} width={150} />
        <h1>Update Post</h1>
        <p>Any New Genre that you want to add.</p>
      </div>
      <form onSubmit={handleSubmit}>
        <Input
          autoComplete="off"
          name="title"
          id="title"
          type="text"
          placeholder="Enter a Genre..."
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.title && touched.title ? (
          <p className="form-error">{errors.title}</p>
        ) : null}
        <Input
          autoComplete="off"
          name="description"
          id="description"
          type="text"
          placeholder="Update description..."
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.description && touched.description ? (
          <p className="form-error">{errors.description}</p>
        ) : null}
        <DropdownCategory
          onBlur={setFieldTouched}
          onChange={setFieldValue}
          value={values.category?.label}
          error={errors.category}
          touched={touched.category}
        />
        {!loading ? (
          <Button type="submit" variant="contained">
            Update Post
          </Button>
        ) : (
          <Button type="button" disabled={true} variant="contained">
            Loading
          </Button>
        )}
      </form>
    </section>
  );
};

export default UpdatePost;
