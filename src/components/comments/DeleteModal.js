import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteComment } from '../../context/slice/comment/CommentSlice';

export default function DeleteCommentModal({open, setOpen, id}) {
  const dispatch = useDispatch()
  const { commentAdded } = useSelector((store) => store.comments);
  const handleClose = () => {
    setOpen(false);
  };

  const deleteCommentHandler = () => {
    dispatch(DeleteComment({id}))
  } 

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Are you sure you want to delete your comment !!</DialogTitle>
        <DialogActions>
          <Button color='error' variant='contained' onClick={deleteCommentHandler}>Delete</Button>
          <Button variant='outlined' onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}