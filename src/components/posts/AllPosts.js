/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../context/slice/category/CategorySlice";
import { FetchAllPosts } from "../../context/slice/post/postSlice";
import Loader from "../shared/Loader";
import SinglePost from "./SinglePost";
import Post from "./Post";

const AllPosts = () => {
  const [category, setcategory] = useState("");
  const { posts, post } = useSelector((store) => store.posts);
  const { categories, loading: categoriesLoading } = useSelector(
    (store) => store.category
  );
  const dispatch = useDispatch();
  const categoryHandler = (category) => {
    setcategory(category);
  };

  useEffect(() => {
    dispatch(FetchAllPosts(category));
    // dispatch(getAllCategories("get"));
  }, [category, dispatch, post]);

  useEffect(() => {
    dispatch(getAllCategories("get"));
  }, []);

  return (
    <section className="post__section">
      <div className="categories_container">
        <button type="button" onClick={() => setcategory("")}>
          Reset
        </button>
        {categoriesLoading && <Loader />}
        {!categoriesLoading && categories && (
          <div className="categories">
            {categories.map((category) => {
              return (
                <h3
                  key={category._id}
                  onClick={() => categoryHandler(category.title)}
                >
                  {category.title}
                </h3>
              );
            })}
          </div>
        )}
      </div>
      <div className="postHeader">Latest Posts</div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(30%, 1fr))",
          width: "100%",
          margin: "0 auto",
          gridGap: ".85rem"
        }}
      >
        {posts.map((post) => {
          return <Post key={post._id} post={post} />;
        })}
      </div>
    </section>
  );
};

export default AllPosts;
