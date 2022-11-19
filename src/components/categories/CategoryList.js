import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  getAllCategories,
} from "../../context/slice/category/CategorySlice";
import DateFormater from "../../utils/DateFormater";
import Loader from "../shared/Loader";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/system";

const CategoryList = () => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((store) => store.category);
  useEffect(() => {
    dispatch(getAllCategories("hello"));
  }, [dispatch]);
  const boxSX = {
    "&:hover": {
      color: "gray",
      backgroundColor: "#1111",
    },
  };

  const deleteCategoryHandler = async (id) => {
    await dispatch(deleteCategory(id));
    await dispatch(getAllCategories());
  };

  const navigate = useNavigate();

  const navigateHandler = (id) => {
    navigate(`/edit-category/${id}`);
  };

  return (
    <div>
      {loading && <Loader />}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Author</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Created At</TableCell>
              <TableCell align="right">Edit</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading &&
              categories &&
              categories.map((category) => (
                <TableRow
                  key={category.createdAt}
                  sx={boxSX}
                  style={{ cursor: "pointer" }}
                >
                  <TableCell component="th" scope="row">
                    <Container style={{display: "flex", alignItems: "center", gap: "1rem"}}>
                      <Avatar style={{width: "40px"}} src={category?.user?.profilePhoto} />
                      <Typography>{category.user.firstName}</Typography>
                    </Container>
                  </TableCell>
                  <TableCell align="right">{category.title}</TableCell>
                  <TableCell align="right">
                    <DateFormater>{category.createdAt}</DateFormater>
                  </TableCell>
                  <TableCell
                    onClick={() => navigateHandler(category._id)}
                    align="right"
                  >
                    <AiFillEdit />
                  </TableCell>
                  <TableCell
                    onClick={() => deleteCategoryHandler(category._id)}
                    align="right"
                  >
                    <AiFillDelete />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CategoryList;
