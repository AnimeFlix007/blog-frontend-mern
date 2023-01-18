import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormik } from "formik";
import addCommentSchema from "../../utils/schema/AddComment";
import { EditComment } from "../../context/slice/comment/CommentSlice";
import { useDispatch } from "react-redux";
import { DialogContentText } from "@mui/material";

export default function EditModal({ open, setOpen, id, commenttitle }) {
  const dispatch = useDispatch()
  const { handleSubmit, handleBlur, handleChange, errors, values, touched } =
    useFormik({
      initialValues: {
        title: commenttitle,
      },
      validationSchema: addCommentSchema,
      onSubmit: async (values, action) => {
        console.log("submitted", values);
        const data = {
          id,
          title: values.title,
        };
        await dispatch(EditComment(data));
        setOpen(false)
      },
    });

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Your Comment</DialogTitle>
        <DialogContent>
        <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            id="outlined-basic"
            label="Edit Comment"
            fullWidth
            variant="outlined"
            name="title"
            error={errors.title && touched.title}
          />
          {errors.title && touched.title ? (
            <p className="form-error">{errors.title}</p>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button color='success' variant='contained' onClick={handleSubmit}>Update</Button>
          <Button variant='outlined' onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
