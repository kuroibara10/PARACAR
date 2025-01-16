import React from "react";
import location from "./assets/icons/location.png";
import logo from "./assets/images/logo.png";
import "../styles/Discover.css";
import { Link } from "react-router-dom";

function Discover() {
  return (
    <section className="section blog" id="blog" aria-label="blog" data-section>
      <div className="container">
        <h2 className="section-titleD">More to Discover</h2>

        <ul className="flex-list">
          <li className="flex-item">
            <div className="blog-card">
              <figure className="card-banner img-holder has-before hover:shine">
                <a
                  href="https://maps.app.goo.gl/TtgvkgXJDsNQ3vAH8"
                  target="_blank"
                  className="img-cover"
                >
                  <img src={location} loading="lazy" alt="Find a Store" />
                </a>
              </figure>

              <h3 className="h3">
                <a
                  href="https://maps.app.goo.gl/TtgvkgXJDsNQ3vAH8"
                  target="_blank"
                  className="card-title"
                >
                  Find a Store
                </a>
              </h3>
            </div>
          </li>

          <li className="flex-item">
            <div className="blog-card">
              <figure className="card-banner img-holder has-before hover:shine">
                <Link to={`/paracare`}>
                  <img
                    src={logo}
                    width="700"
                    height="450"
                    loading="lazy"
                    alt="From Our Blog"
                    className="img-cover"
                  />
                </Link>
              </figure>

              <h3 className="h3">
                <Link to={`/paracare`} className="card-title">
                  About
                </Link>
              </h3>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Discover;
