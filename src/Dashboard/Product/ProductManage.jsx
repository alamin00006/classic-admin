import React, { useState } from "react";
import { Table } from "react-bootstrap";
import useProduct3 from "../../../Hooks/UseProduct3";
import { ToastContainer } from "react-toastify";
import EditProductModal from "./EditProductModal";
import ProductTable from "./ProductTable";
import { useQuery } from "react-query";
import ProductPage from "../ProductPage";
import DetailsProductModal from "./DetailsProductModal";

const ProductManage = () => {
  const [show, setShow] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const [productDetails, setProductDetails] = useState(null);

  const [productEdit, setEditProduct] = useState(null);
  const [productDelete, setDeleteProduct] = useState(null);

  const handleClose = () => setShow(false);
  const handleShowEdit = () => setShow(true);
  const handleCloseDetails = () => setShowDetails(false);
  const handleShowDetails = () => setShowDetails(true);

  const [myProducts3, setProducts3] = useState([]);

  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);

  const { isLoading, refetch } = useQuery(
    ["myProducts3", page, myProducts3, pageCount],
    () =>
      fetch(
        `https://book-collection-server.vercel.app/api/v1/product?page=${page}&size=${10}`,
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setProducts3(data?.data?.products);

          const totalPageCount = Math.ceil(data?.data?.productTotalCount / 10);
          setPageCount(totalPageCount);
        })
  );

  return (
    <div>
      <ProductPage refetch={refetch} />
      <Table striped bordered responsive className="mt-5">
        <thead>
          <tr className="text-center">
            <th>#</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Details</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* {myProducts3?.map((product, index) => (
            <ProductTable
              product={product}
              index={index}
              setEditProduct={setEditProduct}
              handleShowEdit={handleShowEdit}
              handleShowDetails={handleShowDetails}
              setDeleteProduct={setDeleteProduct}
              productDelete={productDelete}
              refetch={refetch}
              setProductDetails={setProductDetails}
            ></ProductTable>
          ))} */}
          <ToastContainer className="toast-position" position="top-center" />
        </tbody>
      </Table>
      <div className="pagination d-flex justify-content-end">
        {[...Array(pageCount).keys()].map((number, index) => (
          <div key={index}>
            <button
              onClick={() => setPage(number)}
              className={page === number ? "page-selected" : ""}
            >
              {number + 1}
            </button>
          </div>
        ))}
      </div>
      {/* <EditProductModal
        productEdit={productEdit}
        show={show}
        setShow={setShow}
        handleClose={handleClose}
        refetch={refetch}
      /> */}

      {/* <DetailsProductModal
        productDetails={productDetails}
        showDetails={showDetails}
        setShowDetails={setShowDetails}
        handleCloseDetails={handleCloseDetails}
      /> */}
    </div>
  );
};

export default ProductManage;
