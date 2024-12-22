import React from "react";
import "../styles/Shop.css";

function Shop({ products }) {
  const topProducts = products
    .sort((a, b) => b.reviews - a.reviews) // ترتيب تنازلي بناءً على عدد الشراء
    .slice(0, 6); // أخذ أول 6 عناصر

  return (
    <section className="section shop" id="shop">
      <div className="container">
        <h2>Our Bestsellers</h2>
        <div className="shop-list">
          {topProducts.map((prod) => (
            <div className="shop-card">
              <img src={prod.photoProduct} alt="Facial cleanser" />
              <h3>{prod.nameProduct}</h3>
              <p>{prod.prix}.00</p>
              <p>{prod.reviews} reviews</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Shop;
