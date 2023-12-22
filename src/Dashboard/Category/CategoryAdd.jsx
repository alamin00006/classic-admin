import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "./CategoryAdd.css";

import { useQuery } from "react-query";

const CategoryAdd = () => {
  const [categoryEdit, setCategoryEdit] = useState(null);
  const handleShowEditCategory = () => setShow(true);
  const [show, setShow] = useState(false);

  // Get Categories

  const [categories, setCategories] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);

  const { refetch, isLoading } = useQuery(
    [page, categories, pageCount, categoryEdit],
    () =>
      fetch(
        `https://book-collection-server.vercel.app/api/v1/category?page=${page}&size=${10}`,
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setCategories(data?.data?.categories);

          const totalPageCount = Math.ceil(data?.data?.CategoryTotalCount / 10);
          setPageCount(totalPageCount);
        })
  );

  const handleCategoryAdd = async (e) => {
    e.preventDefault();
    const categoryAdd = {
      name: e.target.categoryName.value,
    };

    try {
      const data = await axios.post(
        "http://localhost:5000/api/category",
        categoryAdd
      );
      toast.success(data.data.message);
      refetch();
    } catch (error) {
      return toast.warn(error.response.data.message);
    }

    e.target.reset();
  };

  return (
    <>
      <div className="product-info ">
        <h2 className="text-center p-5 text-white">Category Manage</h2>
        <form onSubmit={handleCategoryAdd} className="category-form">
          <div className="">
            <div>
              <input
                style={{
                  width: "100%",
                  height: "60px",
                  border: "1px solid gray",
                }}
                type="text"
                name="categoryName"
                className="rounded fs-5"
                placeholder="Enter Category Name in Bangla"
              />
              <input
                style={{ width: "100%", height: "60px" }}
                className="product-info-add rounded text-white fw-bolder fs-5 mt-1"
                type="submit"
                value="Category Add"
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CategoryAdd;
