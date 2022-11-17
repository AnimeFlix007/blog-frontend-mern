import React from "react";
import createPostSchema from "../../utils/schema/createPost";
import { useFormik } from "formik";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { UploadPost } from "../../context/slice/post/postSlice";
import { useNavigate } from "react-router-dom";
import DropdownCategory from "./DropdownCategory";

const initialValues = {
  title: "",
  description: "",
  category: "",
};

const CreatePost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { post, loading } = useSelector((store) => store.posts);
  const { values, errors, touched, handleBlur, handleSubmit, handleChange, setFieldValue, setFieldTouched } =
    useFormik({
      initialValues,
      validationSchema: createPostSchema,
      onSubmit: async (values, action) => {
        console.log("submitted", values);
        const data = { ...values, category: values.category.label }
        await dispatch(UploadPost(data));
        navigate("/");
        // action.resetForm();
      },
    });
    console.log(values, "sfafvAsfsfgzs");
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
        <div className="btn">
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
