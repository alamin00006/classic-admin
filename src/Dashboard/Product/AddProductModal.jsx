import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Modal } from "react-bootstrap";
import addProduct from "./ProductPage.module.css";
import { FiPlus } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
const AddProductModal = ({ refetch, show, handleClose }) => {
  const [sizeWise, setSizeWise] = useState([]);
  // Size Wise Product Details
  useEffect(() => {
    setSizeWise([
      {
        size: "S",
        color: "Black",
        price: "",
        quantity: "",
        photos: [],
      },
    ]);
  }, []);

  console.log("sizeWise", sizeWise);
  const formRef = useRef(null);

  const handleAddSizeWise = () => {
    setSizeWise([
      ...sizeWise,
      {
        size: "S",
        color: "Black",
        price: "",
        quantity: "",
        photos: [],
      },
    ]);
  };
  const handleSizeWisePhotosChange = (e, index) => {
    const updatedOptions = [...sizeWise];
    updatedOptions[index].photos = e.target.files;
    setSizeWise(updatedOptions);
  };

  const handleRemoveSizeWise = (index) => {
    if (sizeWise.length === 1) {
      toast.warn("Sorry ! Minimum 1 Size Variation Required");
      return;
    }
    const updatedOptions = sizeWise.filter((_, idx) => idx !== index);
    setSizeWise(updatedOptions);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log(sizeWise);

    const selectedSizeOptions = sizeWise?.filter(
      (option) =>
        option.size &&
        option.color &&
        option.price &&
        option.quantity &&
        option.photos
    );

    const allData = {
      productTitle: formData.get("productTitle"),
      categoryName: formData.get("categoryName"),
      description: formData.get("description"),

      sizeVariation: selectedSizeOptions,
    };

    try {
      const sizeWisePhotoList = await Promise.all(
        sizeWise.map(async (option) => {
          const photos = option.photos;
          const photoUrls = await Promise.all(
            Object.values(photos).map(async (file) => {
              const data = new FormData();
              data.append("file", file);
              data.append("upload_preset", "upload");
              const uploadRes = await axios.post(
                "https://api.cloudinary.com/v1_1/dtpvtjiry/image/upload",
                data
              );

              const { url } = uploadRes.data;
              return url;
            })
          );
          return photoUrls;
        })
      );

      const product = {
        ...allData,

        sizeVariation: sizeWise?.map((option, index) => ({
          ...option,
          photos: sizeWisePhotoList[index],
        })),
      };
      console.log(product);

      if (product?.productTitle === null) {
        return toast.warn("Please Select Category");
      }
      await axios.post(
        "https://classic-server-jk7f.onrender.com/api/product",
        product
      );
      toast.success("Product Added");
      formRef.current.reset();
    } catch (error) {
      // console.log(error);
      return toast.warn(error.response.data.message);
    }
  };
  return (
    <div className="container bg-warning">
      <Modal
        className={addProduct.modal}
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="">Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body className="rounded">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="mt-2 mx-2 rounded row"
          >
            <div className="col-lg-6">
              <label>
                Product Title
                <span className="text-danger fw-bold fs-5">*</span>
              </label>
              <input
                type="text"
                style={{ width: "100%", height: "45px" }}
                name="productTitle"
                required
                className="ps-2"
                placeholder="Must Be Uniqe Title"
                id=""
              />
            </div>

            <div className="col-lg-6">
              <label for="category">
                Category : <span className="text-danger fw-bold fs-5">*</span>
              </label>
              <select
                style={{ width: "100%", height: "45px" }}
                required
                name="categoryName"
                id="category"
                className="ps-2"
              >
                <option selected disabled>
                  Select A Category
                </option>

                <option>Tshirt</option>
              </select>
            </div>

            <div className="col-lg-12">
              <label for="product-details-Bangla">
                Product Description
                <span className="text-danger fw-bold fs-5">*</span>
              </label>
              <textarea
                className="rounded"
                id="product-details-Bangla"
                name="description"
                rows="3"
              />
            </div>

            <>
              <h4 className="">Size wise Variation</h4>
              <div className="row p-4">
                {sizeWise?.map((option, index) => (
                  <>
                    <div className="col-md-6 " key={index}>
                      <label className="">Size</label>

                      <select
                        name="size"
                        className="ps-2"
                        style={{ width: "100%", height: "45px" }}
                        required
                        value={option.size}
                        onChange={(e) => {
                          const updatedOptions = [...sizeWise];
                          updatedOptions[index].size = e.target.value;
                          setSizeWise(updatedOptions);
                        }}
                      >
                        <option selected disabled>
                          Select Size
                        </option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                      </select>
                    </div>

                    <div className="col-md-3 ">
                      <label className="">Color</label>

                      <select
                        name="color"
                        className="ps-2"
                        style={{ width: "100%", height: "45px" }}
                        required
                        value={option.color}
                        onChange={(e) => {
                          const updatedOptions = [...sizeWise];
                          updatedOptions[index].color = e.target.value;
                          setSizeWise(updatedOptions);
                        }}
                      >
                        <option selected disabled>
                          Select Color
                        </option>
                        <option value="Black">Black</option>
                        <option value="Blue">Blue</option>
                        <option value="Brown">Brown</option>
                        <option value="Cyan">Cyan</option>
                        <option value="Green">Green</option>
                        <option value="Grey">Grey</option>
                        <option value="Maroon">Maroon</option>
                        <option value="Olive">Olive</option>
                        <option value="Yellow">Yellow</option>
                        <option value="Red">Red</option>
                        <option value="White">White</option>
                        <option value="Orange">Orange</option>
                      </select>
                    </div>

                    <div className="col-md-3 ">
                      <label className="">Price</label>
                      <input
                        type="text"
                        className="ps-2"
                        style={{ width: "100%", height: "45px" }}
                        name="price"
                        value={option.price}
                        onChange={(e) => {
                          const updatedOptions = [...sizeWise];
                          updatedOptions[index].price = e.target.value;
                          setSizeWise(updatedOptions);
                        }}
                        placeholder="Price"
                        required
                      />
                    </div>
                    <div className="col-md-3 ">
                      <label className="">Quantity</label>
                      <input
                        type="text"
                        className="ps-2"
                        style={{ width: "100%", height: "45px" }}
                        value={option.quantity}
                        onChange={(e) => {
                          const updatedOptions = [...sizeWise];
                          updatedOptions[index].quantity = e.target.value;
                          setSizeWise(updatedOptions);
                        }}
                        placeholder="Quantity"
                        required
                      />
                    </div>

                    <div className="col-md-4 " key={index}>
                      <label htmlFor={`sizeWisePhotos-${index}`} className=" ">
                        Product Photos
                      </label>
                      <input
                        type="file"
                        id={`sizeWisePhotos-${index}`}
                        className="ps-2 pt-2 pb-1 border"
                        style={{ width: "100%", height: "45px" }}
                        name={`sizeWisePhotos-${index}`}
                        onChange={(e) => handleSizeWisePhotosChange(e, index)}
                        multiple
                        required
                      />
                    </div>

                    <div className="col-md-2 d-flex" style={{ marginTop: 40 }}>
                      <FiPlus
                        onClick={handleAddSizeWise}
                        style={{
                          width: "24px",
                          height: "24px",
                          cursor: "pointer",
                        }}
                      />

                      <AiOutlineDelete
                        style={{
                          width: "24px",
                          height: "24px",
                          marginLeft: "10px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleRemoveSizeWise(index)}
                      />
                    </div>
                  </>
                ))}
              </div>
            </>

            <div className="d-flex justify-content-center my-5">
              <button
                type="submit"
                className="bg-danger text-white border-0 py-2 rounded"
                style={{ width: 175 }}
                onSubmit={handleSubmit}
              >
                Add Product
              </button>
            </div>
          </form>
          <ToastContainer className="toast-position" position="top-center" />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddProductModal;
