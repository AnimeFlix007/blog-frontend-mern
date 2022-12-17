import { Snackbar } from "@mui/material";
import React from "react";
import MuiAlert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { CategoryActions } from "../../context/slice/category/CategorySlice";

const CategoryAlert = () => {
  const dispatch = useDispatch()
  const { open, message, type } = useSelector((store) => store.category.error);
  console.log(open, message, type);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(CategoryActions.removeAlert())
  };
  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} >
      <MuiAlert
        onClose={handleClose}
        elevation={10}
        variant="filled"
        severity={type}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default CategoryAlert;
