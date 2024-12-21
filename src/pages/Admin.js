import React, { useState } from "react";
import "../styles/AdminPage.css";
import { listProducts } from "../dates/listProducts";

const AdminPage = () => {
  const [products, setProducts] = useState(listProducts);

  const [form, setForm] = useState({
    id: null,
    nameProduct: "",
    photoProduct: null,
    descriptions: "",
    prix: "",
  });

  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photoProduct") {
      setForm({ ...form, photoProduct: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleAdd = () => {
    if (!form.nameProduct || !form.prix) {
      alert("Please fill in all required fields!");
      return;
    }
    const newProduct = {
      ...form,
      id: Date.now(),
      photoProduct: form.photoProduct
        ? URL.createObjectURL(form.photoProduct)
        : null,
    };
    setProducts([...products, newProduct]);
    setForm({
      id: null,
      nameProduct: "",
      photoProduct: null,
      description: "",
      prix: "",
    });
  };

  const handleEdit = (product) => {
    setForm({ ...product, photoProduct: null });
    setEditMode(true);
  };

  const handleUpdate = () => {
    const updatedProducts = products.map((p) =>
      p.id === form.id
        ? {
            ...form,
            photoProduct: form.photoProduct
              ? URL.createObjectURL(form.photoProduct)
              : p.photoProduct,
          }
        : p
    );
    setProducts(updatedProducts);
    setForm({
      id: null,
      nameProduct: "",
      photoProduct: null,
      description: "",
      prix: "",
    });
    setEditMode(false);
  };

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="admin-page">
      <h1>Admin Page</h1>

      <div className="form-container">
        <input
          type="text"
          name="nameProduct"
          placeholder="Product Name"
          value={form.nameProduct}
          onChange={handleChange}
        />
        <input
          type="file"
          name="photoProduct"
          accept="image/*"
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <input
          type="number"
          name="prix"
          placeholder="Price"
          value={form.prix}
          onChange={handleChange}
        />
        <button onClick={editMode ? handleUpdate : handleAdd} className="btn">
          {editMode ? "Update Product" : "Add Product"}
        </button>
      </div>

      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Photo</th>
            <th>Description</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.nameProduct}</td>
              <td>
                {product.photoProduct ? (
                  <img
                    src={product.photoProduct}
                    alt={product.nameProduct}
                    className="product-image"
                  />
                ) : (
                  "No Image"
                )}
              </td>
              <td>{product.description}</td>
              <td>{product.prix} MAD</td>
              <td>
                <button
                  onClick={() => handleEdit(product)}
                  className="btn edit-btn"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="btn delete-btn"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
