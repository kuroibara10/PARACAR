import React from "react";
import "../styles/Footer.css";
import pay from "./assets/images/pay.png";
import logo from "./assets/images/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer className="footer">
        <div className="footer-section">
          <h4>Company</h4>
          <p>
            Find a location nearest you. See{" "}
            <a href="#" className="footer-link">
              Our Stores
            </a>
          </p>
          <p>+391 (0)35 2568 4593</p>
          <p>para.care@gmail.com</p>
        </div>

        <div className="footer-section">
          <h4>Useful Links</h4>
          <a href="#" className="footer-link">
            New Products
          </a>
          <a href="#" className="footer-link">
            Best Sellers
          </a>
          <a href="#" className="footer-link">
            Bundle & Save
          </a>
          <a href="#" className="footer-link">
            Online Gift Card
          </a>
        </div>

        <div className="footer-section">
          <h4>Information</h4>
          <a href="#" className="footer-link">
            Start a Return
          </a>
          <a href="#" className="footer-link">
            Contact Us
          </a>
          <a href="#" className="footer-link">
            Shipping FAQ
          </a>
          <a href="#" className="footer-link">
            Terms & Conditions
          </a>
          <a href="#" className="footer-link">
            Privacy Policy
          </a>
        </div>

        <div className="footer-email">
          <h4>Good emails.</h4>
          <p>
            Enter your email below to be the first to know about new collections
            and product launches.
          </p>
          <div className="footer-email-input">
            <input
              type="email"
              placeholder="Enter your email address"
              className="email-input"
            />
            <button className="subscribe-button">Subscribe</button>
          </div>
        </div>
      </footer>
      <div class="footer-bottom">
        <div class="wrapper">
          <p class="copyright">&copy; 2024 PARACARE</p>

          <ul class="social-list">
            <li>
              <a href="#" class="social-link">
                <ion-icon name="logo-twitter"></ion-icon>
              </a>
            </li>

            <li>
              <a href="#" class="social-link">
                <ion-icon name="logo-facebook"></ion-icon>
              </a>
            </li>

            <li>
              <a href="#" class="social-link">
                <ion-icon name="logo-instagram"></ion-icon>
              </a>
            </li>

            <li>
              <a href="#" class="social-link">
                <ion-icon name="logo-youtube"></ion-icon>
              </a>
            </li>
          </ul>
        </div>

        {/* <a href="#" class="logo">
          PARACARE
        </a> */}
        <div className="logo_web">
          <Link to={`/`}>
            <img src={logo} />
          </Link>
        </div>
        <img
          src={pay}
          width="313"
          height="28"
          alt="available all payment method"
          class="w-100"
        />
      </div>
    </div>
  );
};

export default Footer;
