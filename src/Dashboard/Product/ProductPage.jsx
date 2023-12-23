import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import AddProductModal from "./AddProductModal";

import useSingleUser from "../../Hooks/useSingleUser";

const ProductPage = () => {
  const [user, refetch, isLoading] = useSingleUser();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {user?.role !== "Admin" ? (
        <p className="text-danger mt-5 fw-bold">Sorry! You are Not Admin</p>
      ) : (
        <div>
          <h3 className="mt-4">Products</h3>
          <div className="row">
            <div className="col-lg-8 col-md-12 col-sm-12">
              <input
                style={{ width: "100%", height: "40px" }}
                className="ps-2"
                type="text"
                placeholder="Search by Product Name"
              />
            </div>

            <div className="col-lg-4 col-md-12 col-sm-12">
              <div className="">
                <Button
                  className="product-manage-page text-white  rounded px-5 py-2"
                  style={{ backgroundColor: "#12856b" }}
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
        </div>
      )}
    </>
  );
};

export default ProductPage;
