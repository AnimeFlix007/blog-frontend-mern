import { Button, Input } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import Img from "../../images/updateCategory.jfif";
import addCaregorySchema from "../../utils/schema/addCategorySchema";
import "../../css/addCategory.css";
import { useDispatch, useSelector } from "react-redux";
import { createCategory } from "../../context/slice/category/CategorySlice";

const UpdateCategory = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.category);
  const { handleSubmit, handleBlur, handleChange, errors, values, touched } =
    useFormik({
      initialValues: {
        title: "",
      },
      validationSchema: addCaregorySchema,
      onSubmit: (values, action) => {
        console.log("submitted");
        dispatch(createCategory(values));
        action.resetForm();
      },
    });
  return (
    <section>
      <div>
        <img src={Img} alt={"addImg"} width={150} />
        <h1>Update Category</h1>
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
        {!loading ? (
          <Button type="submit" variant="contained">
            Update Category
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

export default UpdateCategory;
