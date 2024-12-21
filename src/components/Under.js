import React from "react";
import "../styles/Under.css";

import product1 from "./assets/images/product-01.jpg";
import product7 from "./assets/images/product-07.jpg";
import product8 from "./assets/images/product-08.jpg";
import product9 from "./assets/images/product-09.jpg";
import product10 from "./assets/images/product-10.jpg";
import product11 from "./assets/images/product-11.jpg";

function Under() {
  return (
    <section className="section shop" id="shop" aria-label="shop" data-section>
      <div className="container">
        <div className="title-wrapper">
          <h2 className="h2 section-title">Under 250 MAD</h2>

          <a href="#" className="btn-link">
            <span className="span">Shop All Products</span>
          </a>
        </div>

        <ul className="has-scrollbar">
          <li className="scrollbar-item">
            <div className="shop-card">
              <div className="card-banner">
                <img
                  src={product7}
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

                  <span className="span">230.00 MAD</span>
                </div>

                <p>
                  <a href="product-7-page.html" className="cardtitle">
                    Facial cleanser
                  </a>
                </p>

                <div className="card-rating">
                  <p className="rating-text">5170 reviews</p>
                </div>
              </div>
            </div>
          </li>

          <li className="scrollbar-item">
            <div className="shop-card">
              <div className="card-banner">
                <img
                  src={product8}
                  width="540"
                  height="720"
                  loading="lazy"
                  alt="Bio-shroom Rejuvenating Serum"
                  className="img-cover"
                />
              </div>

              <div className="card-content">
                <div className="price">
                  <span className="span">210.00 MAD</span>
                </div>

                <p>
                  <a href="product-8-page.html" className="cardtitle">
                    Bio-shroom Rejuvenating Serum
                  </a>
                </p>

                <div className="card-rating">
                  <p className="rating-text">5170 reviews</p>
                </div>
              </div>
            </div>
          </li>

          <li className="scrollbar-item">
            <div className="shop-card">
              <div className="card-banner img-holder">
                <img
                  src={product9}
                  width="540"
                  height="720"
                  loading="lazy"
                  alt="Coffee Bean Caffeine Eye Cream"
                  className="img-cover"
                />
              </div>

              <div className="card-content">
                <div className="price">
                  <span className="span">220.00 MAD</span>
                </div>

                <p>
                  <a href="product-9-page.html" className="cardtitle">
                    Coffee Bean Caffeine Eye Cream
                  </a>
                </p>

                <div className="card-rating">
                  <p className="rating-text">5170 reviews</p>
                </div>
              </div>
            </div>
          </li>

          <li className="scrollbar-item">
            <div className="shop-card">
              <div className="card-banner img-holder">
                <img
                  src={product10}
                  width="540"
                  height="720"
                  loading="lazy"
                  alt="Facial cleanser"
                  className="img-cover"
                />
              </div>

              <div className="card-content">
                <div className="price">
                  <span className="span">200.00 MAD</span>
                </div>

                <p>
                  <a href="product-10-page.html" className="cardtitle">
                    Facial cleanser
                  </a>
                </p>

                <div className="card-rating">
                  <p className="rating-text">5170 reviews</p>
                </div>
              </div>
            </div>
          </li>

          <li className="scrollbar-item">
            <div className="shop-card">
              <div className="card-banner img-holder">
                <img
                  src={product11}
                  width="540"
                  height="720"
                  loading="lazy"
                  alt="Coffee Bean Caffeine Eye Cream"
                  className="img-cover"
                />
              </div>
              <span className="badge" aria-label="20% off">
                -20%
              </span>

              <div className="card-content">
                <div className="price">
                  <del className="del">310.00 MAD</del>

                  <span className="span">210.00 MAD</span>
                </div>

                <p>
                  <a href="product-11-page.html" className="cardtitle">
                    Coffee Bean Caffeine Eye Cream
                  </a>
                </p>

                <div className="card-rating">
                  <p className="rating-text">5170 reviews</p>
                </div>
              </div>
            </div>
          </li>

          <li className="scrollbar-item">
            <div className="shop-card">
              <div className="card-banner img-holder">
                <img
                  src={product1}
                  width="540"
                  height="720"
                  loading="lazy"
                  alt="Facial cleanser"
                  className="img-cover"
                />
              </div>

              <div className="card-content">
                <div className="price">
                  <span className="span">240.00 MAD</span>
                </div>

                <p>
                  <a href="#" className="cardtitle">
                    Facial cleanser
                  </a>
                </p>

                <div className="card-rating">
                  <p className="rating-text">5170 reviews</p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Under;
