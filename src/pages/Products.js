import React, { useState } from "react";
import "../styles/Products.css";
import imgClos from "../components/assets/icons/close.png";
// import { listProducts } from "../dates/listProducts";
function Products({ products }) {
  const [detialss, setDetialss] = useState(false);
  const [prod, setProd] = useState("Product1");
  const [bgColor, setBgColor] = useState("lightblue");
  const produit = products.find((item) => item.nameProduct === prod);

  let colorBck = "#fff";
  const descriptionpP = (x) => {
    setDetialss(true);
    setProd(x);
    setBgColor(bgColor === "lightblue" ? "lightgreen" : "lightblue");
  };
  const descriptionpPP = () => {
    setDetialss(false);
  };
  const [nameSearch, setNameSearch] = useState("");
  const [priceSearch, setPriceSearch] = useState("");
  const [reviewsSearch, setReviewsSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleSearch = () => {
    setFilteredProducts(
      products.filter((product) => {
        const nameMatch =
          nameSearch === "" ||
          product.nameProduct.toLowerCase() === nameSearch.toLowerCase();
        const priceMatch =
          priceSearch === "" || product.prix <= parseFloat(priceSearch);
        const reviewsMatch =
          reviewsSearch === "" || product.reviews <= parseFloat(reviewsSearch);
        return nameMatch && priceMatch && reviewsMatch;
      })
    );
  };

  return (
    <div className="backgroundPage">
      <div className="ffff">
        {detialss && (
          <div className="desc">
            <img className="imgClose" src={imgClos} onClick={descriptionpPP} />
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
                </div>
                <div className="button1">
                  <button>Add To Cart</button>
                </div>
              </div>
              <div className="box_two">
                <div className="image-box">
                  <div className="image">
                    <img src={produit.photoProduct} />
                  </div>
                  <div className="info">
                    <div className="brand">skin care</div>
                    <div className="name">Facial cleanser</div>
                    <div className="button2">
                      <button>Login For More</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="products">
        <h1>All Products</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by name..."
            value={nameSearch}
            onChange={(e) => setNameSearch(e.target.value)}
          />
          <input
            type="text"
            placeholder="Search by price..."
            value={priceSearch}
            onChange={(e) => setPriceSearch(e.target.value)}
          />
          <input
            type="text"
            placeholder="Search by reviews..."
            value={reviewsSearch}
            onChange={(e) => setReviewsSearch(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="cProducts">
          {filteredProducts.map((product) => (
            <div
              className="product"
              onClick={() => descriptionpP(product.nameProduct)}
            >
              <img src={product.photoProduct} />
              <h3>{product.nameProduct}</h3>
              <p>{product.prix} MAD</p>
              <p>{product.reviews} reviews</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
