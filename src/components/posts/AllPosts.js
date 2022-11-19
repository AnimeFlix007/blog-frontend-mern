import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../context/slice/category/CategorySlice";
import { FetchAllPosts } from "../../context/slice/post/postSlice";
import Loader from "../shared/Loader";
import SinglePost from "./SinglePost";

const AllPosts = () => {
  const [category, setcategory] = useState("");
  const { posts, loading } = useSelector((store) => store.posts);
  const { categories, loading: categoriesLoading } = useSelector(
    (store) => store.category
  );
  const dispatch = useDispatch();
  const categoryHandler = (category) => {
    setcategory(category);
  };
  useEffect(() => {
    dispatch(FetchAllPosts(category));
    dispatch(getAllCategories("get"));
  }, [category, dispatch]);
  return (
    <section className="post__section">
      <div className="categories_container">
        {!categoriesLoading && categories && (
          <div className="categories">
            {categories.map((category) => {
              return (
                <h3 onClick={() => categoryHandler(category.title)}>
                  {category.title}
                </h3>
              );
            })}
          </div>
        )}
      </div>
      <div className="postHeader">Latest Posts</div>
      {loading && <Loader />}
      {!loading && posts && (
        <div className="posts">
          {posts.map((post) => {
            return <SinglePost post={post} />;
          })}
        </div>
      )}
    </section>
  );
};

export default AllPosts;
