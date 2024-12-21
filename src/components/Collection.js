import React from "react";
import "../styles/Collection.css";

import background1 from "./assets/images/collection-1.jpg";
import background2 from "./assets/images/collection-2.jpg";
import background3 from "./assets/images/collection-3.jpg";
function Collection() {
  return (
    <section className="collection">
      <div
        className="item"
        style={{
          backgroundImage: `url(${background1})`,
          backgroundSize: "400px 420px",
        }}
      >
        <h2>Summer Collection</h2>
        <p>Starting at 165.99 MAD</p>
        <a href="#" className="btn_link">
          Shop Now
        </a>
      </div>
      <div
        className="item"
        style={{
          backgroundImage: `url(${background2})`,
          backgroundSize: "400px 420px",
        }}
      >
        <h2>What’s New?</h2>
        <p>Get the glow</p>
        <a href="#" className="btn_link">
          Discover Now
        </a>
      </div>
      <div
        className="item"
        style={{
          backgroundImage: `url(${background3})`,
          backgroundSize: "400px 420px",
        }}
      >
        <h2>Buy 1 Get 1</h2>
        <p>Starting at 55.99 MAD</p>
        <a href="#" className="btn_link">
          Discover Now
        </a>
      </div>
    </section>
  );
}

export default Collection;
