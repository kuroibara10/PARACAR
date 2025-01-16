import React, { useEffect, useState } from "react";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [message, setMessage] = useState("");

  const [nameProduct, setNameProduct] = useState("");
  const [photoProduct, setPhotoProduct] = useState(null);
  const [description, setDescription] = useState("");
  const [prix, setPrix] = useState(0);
  const [reviews, setReviews] = useState("");

  const [filter, setFilter] = useState({ name: "", prix: "", reviews: "" });

  const collectDataP = async (e) => {
    e.preventDefault();
    if (!photoProduct || !nameProduct || !description || !prix || !reviews) {
      setMessage("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("nameProduct", nameProduct);
    formData.append("photoProduct", photoProduct);
    formData.append("description", description);
    formData.append("prix", prix);
    formData.append("reviews", reviews);

    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      setMessage("Product added successfully!");
      fetchProducts();
      resetForm();
    } catch (err) {
      console.error(err);
      setMessage("Failed to add product. Please try again.");
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products");
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setMessage("Failed to fetch products. Please try again.");
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
      setMessage("Product deleted successfully!");
      fetchProducts();
    } catch (err) {
      console.error(err);
      setMessage("Failed to delete product. Please try again.");
    }
  };

  const updateProduct = async (id) => {
    const newPrix = prompt("Enter the new price:");
    if (!newPrix) return;

    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prix: newPrix }),
      });
      if (!response.ok) {
        throw new Error("Failed to update product");
      }
      setMessage("Product updated successfully!");
      fetchProducts();
    } catch (err) {
      console.error(err);
      setMessage("Failed to update product. Please try again.");
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));

    const filtered = products.filter((product) => {
      return (
        (!filter.name ||
          product.nameProduct.toLowerCase().includes(value.toLowerCase())) &&
        (!filter.prix || product.prix.toString().includes(value)) &&
        (!filter.reviews ||
          product.reviews.toLowerCase().includes(value.toLowerCase()))
      );
    });

    setFilteredProducts(filtered);
  };

  const resetForm = () => {
    setNameProduct("");
    setPhotoProduct(null);
    setDescription("");
    setPrix(0);
    setReviews("");
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container">
      <h1 className="text-center pt-3">Admin Dashboard</h1>

      <form onSubmit={collectDataP}>
        <h3>Add Product</h3>
        {message && <p style={{ color: "red" }}>{message}</p>}
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={nameProduct}
            onChange={(e) => setNameProduct(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <input
            type="text"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Prix</label>
          <input
            type="number"
            className="form-control"
            value={prix}
            onChange={(e) => setPrix(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Reviews</label>
          <input
            type="text"
            className="form-control"
            value={reviews}
            onChange={(e) => setReviews(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Photo</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setPhotoProduct(e.target.files[0])}
          />
        </div>
        <button type="submit" className="btn btn-success">
          Add Product
        </button>
      </form>

      <h3 className="mt-4">Filter Products</h3>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          name="name"
          placeholder="Filter by name"
          onChange={handleFilterChange}
        />
        <input
          type="text"
          className="form-control mt-2"
          name="prix"
          placeholder="Filter by price"
          onChange={handleFilterChange}
        />
        <input
          type="text"
          className="form-control mt-2"
          name="reviews"
          placeholder="Filter by reviews"
          onChange={handleFilterChange}
        />
      </div>

      <h3>All Products</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Reviews</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.nameProduct}</td>
              <td>{product.description}</td>
              <td>{product.prix}</td>
              <td>{product.reviews}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => updateProduct(product._id)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteProduct(product._id)}
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
}

export default AdminDashboard;
