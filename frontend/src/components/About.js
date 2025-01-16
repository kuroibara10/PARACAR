import React from "react";
import "../styles/About.css";

import feature1 from "./assets/images/feature-1.jpg";
import feature2 from "./assets/images/feature-2.jpg";
import feature3 from "./assets/images/feature-3.jpg";

function About() {
  return (
    <section className="section feature" aria-label="feature" data-section>
      <div className="containerAbo">
        <h2 className="littelAbout">Why Shop with ParaCare?</h2>

        <ul className="flex-list">
          <li className="flex-item">
            <div className="feature-card">
              <img
                src={feature1}
                width="204"
                height="236"
                loading="lazy"
                alt="Guaranteed PURE"
                className="card-icon"
              />

              <h3 className="cardtitle">Guaranteed PURE</h3>

              <p className="card-text">
                All Grace formulations adhere to strict purity standards and
                will never contain harsh or toxic ingredients
              </p>
            </div>
          </li>

          <li className="flex-item">
            <div className="feature-card">
              <img
                src={feature2}
                width="204"
                height="236"
                loading="lazy"
                alt="Completely Cruelty-Free"
                className="card-icon"
              />

              <h3 className="cardtitle">Completely Cruelty-Free</h3>

              <p className="card-text">
                All Grace formulations adhere to strict purity standards and
                will never contain harsh or toxic ingredients
              </p>
            </div>
          </li>

          <li className="flex-item">
            <div className="feature-card">
              <img
                src={feature3}
                width="204"
                height="236"
                loading="lazy"
                alt="Ingredient Sourcing"
                className="card-icon"
              />

              <h3 className="cardtitle">Ingredient Sourcing</h3>

              <p className="card-text">
                All Grace formulations adhere to strict purity standards and
                will never contain harsh or toxic ingredients
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default About;
