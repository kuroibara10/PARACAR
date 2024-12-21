import React from "react";
import "../styles/Hero.css";

import background1 from "./assets/images/hero-banner-1.jpg";
import background2 from "./assets/images/hero-banner-2.jpg";
import background3 from "./assets/images/hero-banner-3.jpg";

function Hero() {
  return (
    <div className="hero">
      <div className="cards">
        <div
          className="hero_card"
          style={{
            backgroundImage: `url(${background1})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h1>
            Reveal The <br />
            Beauty of Skin
          </h1>
          <p className="p22">
            Made using clean, non-toxic ingredients, <br />
            Bour products are designed for everyone.
          </p>
          <p>Starting at 100.99 MAD</p>
          <a href="#" className="btn btn-primary">
            Shop Now
          </a>
        </div>
        <div
          className="hero_card"
          style={{
            backgroundImage: `url(${background2})`,
            backgroundSize: "cover",
          }}
        >
          <h1>
            Reveal The <br />
            Beauty of Skin
          </h1>
          <p>
            Made using clean, non-toxic ingredients, <br />
            Bour products are designed for everyone.
          </p>
          <p>Starting at 100.99 MAD</p>
          <a href="#" className="btn btn-primary">
            Shop Now
          </a>
        </div>
        <div
          className="hero_card"
          style={{
            backgroundImage: `url(${background3})`,
            backgroundSize: "cover",
          }}
        >
          <h1>
            Reveal The <br />
            Beauty of Skin
          </h1>
          <p>
            Made using clean, non-toxic ingredients, <br />
            Bour products are designed for everyone.
          </p>
          <p>Starting at 100.99 MAD</p>
          <a href="#" className="btn btn-primary">
            Shop Now
          </a>
        </div>
      </div>
    </div>
  );
}

export default Hero;
