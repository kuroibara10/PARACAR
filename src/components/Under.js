import React from "react";
import "../styles/Under.css";
// import { listProducts } from "../dates/listProducts";
import { Link } from "react-router-dom";

function Under({ products }) {
  const produit = products.filter((item) => item.prix <= 250);

  return (
    <section className="section shop" id="shop" aria-label="shop" data-section>
      <div className="container">
        <div className="title-wrapper">
          <h2 className="h2 section-title">Under 250 MAD</h2>

          <Link to={`/products`} className="btn-link">
            <span className="span">Shop All Products </span>
          </Link>
        </div>
        {produit ? (
          <ul className="has-scrollbar">
            {produit.map((product) => (
              <li className="scrollbar-item">
                <div className="shop-card">
                  <div className="card-banner">
                    <img
                      src={product.photoProduct}
                      width="540"
                      height="720"
                      loading="lazy"
                      alt="Facial cleanser"
                      className="img-cover"
                    />
                  </div>
                  <span className="badge" aria-label="20% off">
                    -20%
                  </span>
                  <div className="card-content">
                    <div className="price">
                      <del className="del">330.00 MAD</del>

                      <span className="span">{product.prix} MAD</span>
                    </div>

                    <p>
                      <a href="product-7-page.html" className="cardtitle">
                        {product.nameProduct}
                      </a>
                    </p>

                    <div className="card-rating">
                      <p className="rating-text">{product.reviews} reviews</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="has-scrollbar">
            <li>
              <h1>No Produits Under 250 MAD</h1>
            </li>
          </ul>
        )}
      </div>
    </section>
  );
}

export default Under;
