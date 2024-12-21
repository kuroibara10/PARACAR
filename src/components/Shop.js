import React from "react";
import "../styles/Shop.css";

import product1 from "./assets/images/product-01.jpg";
import product2 from "./assets/images/product-02.jpg";
import product3 from "./assets/images/product-03.jpg";
import product4 from "./assets/images/product-04.jpg";
import product5 from "./assets/images/product-05.jpg";
import product6 from "./assets/images/product-06.jpg";
function Shop() {
  return (
    <section className="section shop" id="shop">
      <div className="container">
        <h2>Our Bestsellers</h2>
        <div className="shop-list">
          <div className="shop-card">
            <img src={product1} alt="Facial cleanser" />
            <h3>Facial Cleanser</h3>
            <p>290.00 MAD</p>
          </div>
          <div className="shop-card">
            <img src={product2} alt="Facial cleanser" />
            <h3>Facial Cleanser</h3>
            <p>290.00 MAD</p>
          </div>
          <div className="shop-card">
            <img src={product3} alt="Facial cleanser" />
            <h3>Facial Cleanser</h3>
            <p>290.00 MAD</p>
          </div>
          <div className="shop-card">
            <img src={product4} alt="Facial cleanser" />
            <h3>Facial Cleanser</h3>
            <p>290.00 MAD</p>
          </div>
          <div className="shop-card">
            <img src={product5} alt="Facial cleanser" />
            <h3>Facial Cleanser</h3>
            <p>290.00 MAD</p>
          </div>
          <div className="shop-card">
            <img src={product6} alt="Facial cleanser" />
            <h3>Facial Cleanser</h3>
            <p>290.00 MAD</p>
          </div>
          {/* Add more products */}
        </div>
      </div>
    </section>
  );
}

export default Shop;
