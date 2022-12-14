import React from "react";
import createPostSchema from "../../utils/schema/createPost";
import { useFormik } from "formik";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { UploadPost } from "../../context/slice/post/postSlice";
import { useNavigate } from "react-router-dom";
import DropdownCategory from "./DropdownCategory";
import PreviewImage from "../../utils/preview/ImagePreview";

const initialValues = {
  title: "",
  description: "",
  category: "",
  image: "",
};

const CreatePost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((store) => store.posts);
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    handleChange,
    setFieldValue,
    setFieldTouched,
  } = useFormik({
    initialValues,
    validationSchema: createPostSchema,
    onSubmit: async (values, action) => {
      console.log("submitted", values);
      const data = { ...values, category: values.category.label };
      await dispatch(UploadPost(data));
      navigate("/");
      action.resetForm();
    },
  });
  console.log(values.image, "sfafvAsfsfgzs");
  return (
    <section>
      <div className="image"></div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.title && touched.title ? (
            <p className="form-error">{errors.title}</p>
          ) : null}
        </div>
        <DropdownCategory
          onBlur={setFieldTouched}
          onChange={setFieldValue}
          value={values.category?.label}
          error={errors.category}
          touched={touched.category}
        />
        <div className="form-field">
          <label htmlFor="title">Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            rows={10}
            cols={30}
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.description && touched.description ? (
            <p className="form-error">{errors.description}</p>
          ) : null}
        </div>
        <div className="form-field">
          {values.image && <PreviewImage file={values.image} />}
          <label htmlFor="title">Upload Image</label>
          <input
            type="file"
            name="image"
            onChange={(e) => setFieldValue("image", e.target.files[0])}
          />
          {errors.image ? <p className="form-error">{errors.image}</p> : null}
        </div>

        <div className="btn">
          {!loading ? (
            <Button type="submit" variant="contained">
              Submit
            </Button>
          ) : (
            <Button disabled variant="contained">
              Loading
            </Button>
          )}
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
