import axios from "axios";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import useCategories from "../../Hooks/useCategories";
import addProduct from "./ProductPage.module.css";

const AddProductModal = ({ refetch, show, handleClose }) => {
  const [discount, setDiscount] = useState("0");
  const [image, setImage] = useState([]);

  const [categories] = useCategories();

  const [tags, setTags] = useState([]);

  const handleKeyDown = (e) => {
    if (e.key !== "Enter") return;
    const value = e.target.value;
    //  console.log(value)
    if (!value.trim()) return;
    setTags([...tags, value]);
    e.target.value = "";
  };

  const removeTag = (index) => {
    setTags(tags.filter((el, i) => i !== index));
  };

  const handleNewProduct = async (e) => {
    e.preventDefault();
    if (tags.length > 5) {
      return toast("5 Tags more than not allowed");
    }
    //  console.log(productPdf)

    if (e.target.status.value === "Select A Status") {
      return toast.error("Please Select Product Status");
    }

    if (e.target.categoryName.value === "Select A Category") {
      return toast.error("Please Select A Category Name");
    }

    if (e.target.writerName.value === "Select A Writer") {
      return toast.error("Please Select Product Writer");
    }
    if (e.target.publicationName.value === "Select A Publication") {
      return toast.error("Please Select Product Publication");
    }

    const selectedCategory = categories.data.find(
      (categoryName) => categoryName.name === e.target.categoryName.value
    );

    const isValidFileUploaded = (file) => {
      const validExtensions = [
        "png",
        "jpeg",
        "jpg",
        "PNG",
        "JPG",
        "jpeg",
        "JPEG",
        "webp",
      ];
      const fileExtension = file.type.split("/")[1];
      return validExtensions.includes(fileExtension);
    };
    // const isValidPdfFile = (file) => {
    //   const validExtensions = ["pdf", "PDF"];
    //   const fileExtension = file?.type?.split("/")[1];
    //   return validExtensions.includes(fileExtension);
    // };

    if (image?.length > 1) {
      return toast.error("please provide one book picture");
    }
    const file = image[0];

    // if (productPdf.length > 1) {
    //   return toast.error("please provide one pdf file");
    // }

    // const pdf = productPdf[0];

    // if (pdf.size > 5000000) {
    //   return toast.error("pdf file size 5MB more than not allowed");
    // } else {
    //   if (isValidPdfFile(pdf)) {
    //     Array.from(productPdf)?.forEach((item) => {
    //       formData.append("pdf", item);
    //     });
    //   } else {
    //     return toast.error("pdf file is not valid");
    //   }
    // }
    const imgbbapi = "76188552c6fc6bf4a3912664a291870a";
    const formData = new FormData();
    if (file.size > 5000000) {
      return toast.error("Product Picture size 5MB more than not allowed");
    } else {
      if (isValidFileUploaded(file)) {
        Array.from(image).forEach((item) => {
          formData.append("image", item);
        });
      } else {
        return toast.error("Product Picture is not valid");
      }
    }
    const url = `https://api.imgbb.com/1/upload?key=${imgbbapi}`;
    await fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(async (imgData) => {
        if (imgData.success) {
          const productAdd = {
            nameB: e.target.productNameBangla.value,
            nameE: e.target.productNameEnglish.value,
            bookTranslator: e.target?.bookTranslator?.value,
            price: e.target.price.value,
            quantity: e.target.quantity.value,
            discount: discount,
            status: e.target.status.value,
            category: JSON.stringify({
              categoryName: selectedCategory.name,
              category_id: selectedCategory._id,
            }),

            bookFair: e.target.bookFair.value,
            productTags: tags,
            descriptionB: e.target.productDetailsBangla.value,
            descriptionE: e.target.productDetailsEnglish.value,
            BookSalesInfo: "",
            image: imgData.data.url,
          };

          if (productAdd.bookFair === "If the Book of Fair") {
            productAdd.bookFair = null;
          }
          // save Product information to the database
          try {
            const data = await axios.post(
              "https://book-collection-server.vercel.app/api/v1/product",
              productAdd
            );
            refetch();
            toast.success(data.data.message);
          } catch (error) {
            console.log(error);
            return toast.warn(error.response.data.message);
          }
        }
      });

    e.target.reset();
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
            onSubmit={handleNewProduct}
            className="mt-2 product-form px-4 mx-2 py-3 rounded row"
          >
            <div className="col-lg-6">
              <label>
                Book Name in Bangla :{" "}
                <span className="text-danger fw-bold fs-5">*</span>
              </label>
              <input
                type="text"
                className=""
                name="productNameBangla"
                required
                placeholder="Product Name in Bangla"
                id=""
              />
            </div>
            <div className="col-lg-6">
              <label>
                Book Name in English:{" "}
                <span className="text-danger fw-bold fs-5">*</span>
              </label>
              <input
                type="text"
                className=""
                name="productNameEnglish"
                placeholder="Product Name in English"
                id=""
              />
            </div>
            <div className="col-lg-4">
              <label>
                Book Translator:{" "}
                <span className="text-danger fw-bold fs-5">*</span>
              </label>
              <input
                type="text"
                className=""
                name="bookTranslator"
                placeholder="Book Translator"
                id=""
              />
            </div>

            <div className="col-lg-4">
              <label>
                Price : <span className="text-danger fw-bold fs-5">*</span>
              </label>
              <input
                type="number"
                className=""
                required
                name="price"
                placeholder="Price"
                id=""
              />
            </div>
            <div className="col-lg-4">
              <label>
                Quantity : <span className="text-danger fw-bold fs-5">*</span>
              </label>
              <input
                type="number"
                className=""
                required
                name="quantity"
                placeholder="Quantity"
                id=""
              />
            </div>
            <div className="col-lg-6">
              <label>Discount : </label>
              <input
                onChange={(e) => setDiscount(e.target.value)}
                type="number"
                className=""
                name="discount"
                placeholder="discount"
                id=""
              />
            </div>
            <div className="col-lg-6">
              <label for="status">
                Status : <span className="text-danger fw-bold fs-5">*</span>
              </label>
              <select
                style={{ width: "100%", height: "45px" }}
                required
                name="status"
                id="status"
              >
                <option selected disabled>
                  Select A Status
                </option>
                <option>in-stock</option>
                <option>out-of-stock</option>
                <option>Discontinued</option>
              </select>
            </div>
            <div className="col-lg-4">
              <label for="category">
                Category : <span className="text-danger fw-bold fs-5">*</span>
              </label>
              <select
                style={{ width: "100%", height: "45px" }}
                required
                name="categoryName"
                id="category"
              >
                <option selected disabled>
                  Select A Category
                </option>
                {categories?.data?.map((category) => (
                  <option>{category.name}</option>
                ))}
              </select>
            </div>

            <div className="col-lg-4 mt-1">
              <label for="book-fair" className="text-danger">
                If the Book of Fair :{" "}
              </label>
              <select
                style={{ width: "100%", height: "45px" }}
                required
                name="bookFair"
                id="book-fair"
              >
                <option className="book-fair"> If the Book of Fair</option>
                <option>2023</option>
              </select>
            </div>

            <div className="col-lg-12">
              <label for="product-details-Bangla">
                Book Details in Bangla:{" "}
                <span className="text-danger fw-bold fs-5">*</span>
              </label>
              <textarea
                className="rounded"
                id="product-details-Bangla"
                name="productDetailsBangla"
                rows="5"
              />
            </div>
            <div className="col-lg-12">
              <label for="product-details-English">
                Book Details in English :{" "}
                <span className="text-danger fw-bold fs-5">*</span>
              </label>
              <textarea
                className="rounded"
                id="product-details-English"
                name="productDetailsEnglish"
                rows="5"
              />
            </div>

            <div className="col-lg-12">
              <label>
                Upload a Book Picture :{" "}
                <span className="text-danger fw-bold fs-5">*</span>
              </label>
              <input
                multiple
                onChange={(e) => {
                  setImage(e.target.files);
                }}
                type="file"
                className="product-picture"
                required
                name="image"
                placeholder="productPicture"
                id=""
              />
            </div>

            {/* <div className="col-lg-6 mt-2">
              <label> Upload a Pdf : </label>
              <input
                multiple
                onChange={(e) => {
                  setProductPdf(e.target.files);
                }}
                required
                type="file"
                className="product-picture"
                name="pdf"
                placeholder="productPicture"
                id=""
              />
            </div> */}

            <div className="col-lg-12 mt-2">
              <label>Book Tags : </label>

              {tags.map((tag, index) => (
                <div className="tag-item" key={index}>
                  <span className="text">{tag}</span>
                  <span className="close" onClick={() => removeTag(index)}>
                    &times;
                  </span>
                </div>
              ))}
              <textarea
                onKeyDown={handleKeyDown}
                type="text"
                name="productTag"
                className="tags-input ps-2"
                placeholder="Product Tag(Write then press entire to add new tag)"
              />
            </div>
            <div className="d-flex justify-content-end mt-4">
              <div>
                <button className="btn btn-dark fs-5" onClick={handleClose}>
                  Cancel
                </button>
              </div>
              <div>
                <input
                  className="btn btn-danger fs-5"
                  type="submit"
                  value="Add product"
                />
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddProductModal;
