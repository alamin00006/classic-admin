import React, { useState } from "react";
import { Button } from "react-bootstrap";
import AddProductModal from "./AddProductModal";

const ProductPage = ({ refetch }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <h3 className="mt-4">Products</h3>
      <div className="row">
        <div className="col-lg-4 col-md-12 col-sm-12">
          <input
            style={{ width: "100%", height: "40px" }}
            type="text"
            placeholder="Search by Product Name"
          />
        </div>
        <div className="col-lg-2 col-md-12 col-sm-12">
          <select className="" style={{ width: "100%", height: "40px" }}>
            <option>Category</option>
            <option>Category</option>
            <option>Category</option>
            <option>Category</option>
          </select>
        </div>
        <div className="col-lg-2 col-md-12 col-sm-12">
          <select style={{ width: "100%", height: "40px" }}>
            <option>Price</option>
            <option>Category</option>
            <option>Category</option>
            <option>Category</option>
          </select>
        </div>
        <div className="col-lg-4 col-md-12 col-sm-12">
          <div className="">
            <Button
              className="product-manage-page text-white  rounded px-5 py-2"
              onClick={handleShow}
            >
              + Add Product
            </Button>
          </div>

          <AddProductModal
            refetch={refetch}
            show={show}
            setShow={setShow}
            handleClose={handleClose}
          />
        </div>
      </div>
      {/* <ProductManage/> */}
    </div>
  );
};

export default ProductPage;
