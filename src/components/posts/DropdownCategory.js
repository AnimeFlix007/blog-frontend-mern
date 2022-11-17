import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactSelect from "react-select";
import { getAllCategories } from "../../context/slice/category/CategorySlice";

const DropdownCategory = (props) => {
  console.log(props);
  const { categories } = useSelector((store) => store.category);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);
  const options = categories?.map((category) => {
    return {
      label: category.title,
      value: category._id,
    };
  });
  const handleChange = (value) => {
    props.onChange("category", value);
  };
  const handleBlur = () => {
    props.onBlur("category", true);
  };
  return (
    <React.Fragment>
      <ReactSelect
        id="category"
        name="category"
        value={props?.value?.label}
        options={options}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {props.error && props.touched ? (
        <p className="form-error">{props.error}</p>
      ) : null}
    </React.Fragment>
  );
};

export default DropdownCategory;
