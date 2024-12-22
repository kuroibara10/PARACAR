import React from "react";
import "../styles/Header.css";
import logo from "./assets/images/logo.png";
import icon_user from "./assets/icons/user (1).png";
import icon_search from "./assets/icons/search22.png";
import icon_shop from "./assets/icons/shopping-cart.png";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      <div className="header1">
        Free Shipping On All morroco. Orders 500+ MAD
      </div>
      <div className="header2">
        <div className="header2_1">
          <div className="barSerch">
            <input
              type="searche"
              placeholder="Search ... "
              className="search_field"
            />
            <img src={icon_search} alt="Icon Search" />
          </div>
          <div className="logo_web">
            <Link to={`/`}>
              <img src={logo} />
            </Link>
          </div>
          <div className="userShop">
            <Link to={`/join`}>
              <img src={icon_user} alt="Icon User" />
            </Link>
            <img src={icon_shop} alt="Icon Shop" />
          </div>
        </div>
        <div className="header2_2">
          <ul className="list_pages">
            <Link to={`/`} className="list_links">
              Home
            </Link>
            <Link className="list_links">Collection</Link>
            <Link to={`/products`} className="list_links">
              Products
            </Link>
            <Link className="list_links">Shop</Link>
            <Link className="list_links">Offer</Link>
            {/* <Link className="list_links">Blog</Link> */}
            <Link to={`/admin`} className="list_links">
              AdminPage
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
