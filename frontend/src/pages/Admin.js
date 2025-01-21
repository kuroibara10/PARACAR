import "../styles/AdminPage.css";

import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-confirm-alert/src/react-confirm-alert.css"; // استيراد الأنماط
import imgClos from "../components/assets/icons/close.png";

const AdminPage = ({ products, fetchProducts }) => {
  const [error, setError] = useState("");

  const [nameProduct, setNameProduct] = useState("");
  const [description, setDescription] = useState("");
  const [prix, setPrix] = useState();
  const [reviews, setReviews] = useState();
  const [photoProduct, setPhotoProduct] = useState();

  const addProducts = async (e) => {
    e.preventDefault();

    // تحقق من أن الصورة موجودة
    if (!photoProduct) {
      alert("Please add a picture of the product!");
      return;
    }

    const formData = new FormData();
    formData.append("nameProduct", nameProduct);
    formData.append("description", description);
    formData.append("prix", prix);
    formData.append("reviews", reviews);
    formData.append("photoProduct", photoProduct); // إرسال الصورة في FormData

    try {
      // إرسال البيانات عبر axios
      await axios.post("http://localhost:5000/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // تحديد نوع المحتوى على أنه FormData
        },
      });
      alert("The product was created successfully!");
      // بعد الإضافة الناجحة، يمكنك إعادة تعيين الحقول أو تحديث البيانات
      setNameProduct("");
      setDescription("");
      setPrix("");
      setReviews("");
      setPhotoProduct(null);
      fetchProducts(); // تحديث قائمة المنتجات
    } catch (err) {
      setError(err.response?.data?.message || "خطأ في الخادم");
    }
  };

  // دالة لحذف منتج معين مع تأكيد

  const deleteProduct = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!confirmDelete) return;

      await axios.delete(`http://localhost:5000/api/products/${id}`);
      alert("Product deleted successfully!");

      // تحديث قائمة المنتجات بعد الحذف
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to delete product.");
    }
  };

  // Show statu Product
  const [prod, setProd] = useState("Product1");
  // const descriptionpP = (x) => {
  //   setDetialss(true);
  //   setProd(x);
  //   setBgColor(bgColor === "lightblue" ? "lightgreen" : "lightblue");
  // };
  const produit = products.find((item) => item.nameProduct === prod);
  const [detialss, setDetialss] = useState(false);
  const [bgColor, setBgColor] = useState("lightblue");
  const descriptionpP = (x) => {
    setDetialss(true);
    setProd(x);
    setBgColor(bgColor === "lightblue" ? "lightgreen" : "lightblue");
  };

  const descriptionpPP = () => {
    setDetialss(false);
  };
  const showStatueProduct = async (id) => {
    try {
      await axios.get(`http://localhost:5000/api/products/${id}`);
      alert("Product !");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to delete product.");
    }
  };

  /////////////////////////////////////////////////////////////////////////
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({
    nameProduct: nameProduct,
    description: description,
    prix: prix,
    reviews: reviews,
    photoProduct: photoProduct, // لإضافة الصورة الجديدة
  });

  // فتح نموذج التعديل ببيانات المنتج الحالي
  const handleEdit = (product) => {
    setCurrentProduct(product);
    setUpdatedProduct(product); // تعبئة النموذج بالبيانات الحالية
    setIsEditing(true);
  };

  // تحديث المنتج
  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("nameProduct", updatedProduct.nameProduct);
      formData.append("description", updatedProduct.description);
      formData.append("prix", updatedProduct.prix);
      formData.append("reviews", updatedProduct.reviews);

      if (updatedProduct.photoProduct) {
        formData.append("photoProduct", updatedProduct.photoProduct); // رفع الصورة الجديدة
      }

      const { _id } = currentProduct;
      await axios.put(`http://localhost:5000/api/products/${_id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Product updated successfully!");
      setIsEditing(false);
      fetchProducts(); // تحديث قائمة المنتجات
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update product.");
    }
  };
  /////////////////////////////////////////////////////////////////////////
  const [ordress, setOrdress] = useState([]);
  useEffect(() => {
    fetchsetOrdress();
  }, []);
  const fetchsetOrdress = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/orders");
      setOrdress(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const [activeForms, setActiveForms] = useState("");

  const showDS = (formId) => {
    setActiveForms(formId);
  };
  const [nameSearch, setNameSearch] = useState("");
  const handleSearch = () => {
    setOrdress(
      ordress.filter((product) => {
        const nameMatch =
          nameSearch === "" ||
          product.customerEmail.toLowerCase() === nameSearch.toLowerCase();
        return nameMatch;
      })
    );
  };

  ////////////////////////////////////////////////////////////////////////
  return (
    <div className="admin-page">
      <div className="ffff">
        {detialss && (
          <div className="desc">
            <img
              className="imgClose"
              src={imgClos}
              alt="close"
              onClick={descriptionpPP}
            />
            <div className="containerD">
              <div className="box_one">
                <div className="details">
                  <div className="topic">Description</div>
                  <p>{produit.description}</p>
                  <div className="rating"></div>
                  <div className="price-box">
                    <div className="discount">400.00 MAD</div>
                    <div className="price">{produit.prix} MAD</div>
                  </div>
                  <div className="price-box">
                    <div className="discount">Nomber Available:</div>
                    <div className="price">{produit.discount}</div>
                  </div>
                </div>
                <div className="button1"></div>
              </div>
              <div className="box_two">
                <div className="image-box">
                  <div className="image">
                    <img
                      src={`http://localhost:5000/${produit.photoProduct}`}
                      alt={`${produit.nameProduct}`}
                    />
                  </div>
                  <div className="info">
                    <div className="brand">skin care</div>
                    <div className="name">Facial cleanser</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <h1>Admin Page</h1>
      <div className="ProductOrders">
        <button
          className="button-17"
          role="button"
          onClick={() => showDS("gestionProducts")}
        >
          Gestion Products
        </button>
        <button
          className="button-17"
          role="button"
          onClick={() => showDS("gestionOrders")}
        >
          Gestion Orders
        </button>
      </div>
      <div
        id="gestionProducts"
        className={`service-form ${
          activeForms === "gestionProducts" ? "show" : "hide"
        }`}
      >
        <div>
          <h1>Add Product</h1>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form onSubmit={addProducts} className="form-container">
            <input
              type="text"
              name="nameProduct"
              placeholder="Product Name"
              value={nameProduct}
              onChange={(e) => setNameProduct(e.target.value)}
              required
            />
            <input
              type="file"
              name="photoProduct"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0]; // الحصول على أول ملف تم رفعه
                if (file) {
                  setPhotoProduct(file); // حفظ الملف في الـ state
                }
              }}
              required
            />
            <textarea
              name="description"
              placeholder="Product Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <input
              type="number"
              name="prix"
              placeholder="Price"
              value={prix}
              onChange={(e) => setPrix(e.target.value)}
              required
            />
            <input
              type="number"
              name="reviews"
              placeholder="Reviews"
              value={reviews}
              onChange={(e) => setReviews(e.target.value)}
              required
            />
            <input type="submit" value="Add Product" />
          </form>
        </div>
        {isEditing && (
          <div className="edit-form">
            <h3>Edit Product</h3>
            <form onSubmit={updateProduct}>
              <input
                type="text"
                placeholder="Product Name"
                value={updatedProduct.nameProduct}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    nameProduct: e.target.value,
                  })
                }
                required
              />
              <textarea
                placeholder="Description"
                value={updatedProduct.description}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    description: e.target.value,
                  })
                }
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={updatedProduct.prix}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, prix: e.target.value })
                }
                required
              />
              <input
                type="number"
                placeholder="Reviews"
                value={updatedProduct.reviews}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    reviews: e.target.value,
                  })
                }
                required
              />
              <input
                type="file"
                name="photoProduct"
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    photoProduct: e.target.files[0],
                  })
                }
              />
              <button type="submit" className="btn save-btn">
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="btn cancel-btn"
              >
                Cancel
              </button>
            </form>
          </div>
        )}

        <table className="product-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Photo</th>
              <th>Description</th>
              <th>Price</th>
              <th>Reviews</th>
              <th>Actions</th>
              <th>discountStatus</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.nameProduct}</td>
                <td>
                  {product.photoProduct ? (
                    <img
                      src={`http://localhost:5000/${product.photoProduct}`}
                      alt={product.nameProduct}
                      className="product-image"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td>{product.description}</td>
                <td>{product.prix} MAD</td>
                <td>{product.reviews}</td>
                <td>
                  <button
                    onClick={() => handleEdit(product)}
                    className="btn edit-btn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="btn delete-btn"
                  >
                    Delete
                  </button>
                </td>
                {/* <td>{product.discountStatus}</td> */}
                <td>
                  <button
                    onClick={() => descriptionpP(product.nameProduct)}
                    // onClick={() => showStatueProduct(product._id)}
                    className="btn btn-info"
                  >
                    Show
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        id="gestionOrders"
        className={`service-form ${
          activeForms === "gestionOrders" ? "show" : "hide"
        }`}
      >
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by name..."
            value={nameSearch}
            onChange={(e) => setNameSearch(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        <table className="product-table">
          <thead>
            <tr>
              <th>customerEmail</th>
              <th>products</th>
              <th>Price</th>
              <th>Localisation</th>
            </tr>
          </thead>
          <tbody>
            {ordress.map((order) => (
              <tr key={order._id}>
                <td>{order.customerEmail}</td>
                <td>
                  <h4>List Product Order</h4>
                  {order.products.map((po) => (
                    <div>
                      <p>Product : {po.nameProduct}</p>
                      <p>Prix : {po.prix}</p>
                    </div>
                  ))}
                </td>
                <td>{order.totalPrix} MAD</td>
                <td>{order.localisation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
