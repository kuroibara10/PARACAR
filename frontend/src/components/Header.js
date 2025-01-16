import React, { useState, useEffect, useContext } from "react";
import "../styles/Header.css";
import logo from "./assets/images/logo.png";
import icon_user from "./assets/icons/user (1).png";
import icon_search from "./assets/icons/search22.png";
import icon_shop from "./assets/icons/shopping-cart.png";
import { Link } from "react-router-dom";
import logout from "./assets/icons/logout.png";
import axios from "axios";
import { UserContext } from "../UserContext";

function Header({
  loginn,
  setLogiin,
  setLogout,
  idUser,
  cartVisible,
  setCartVisible,
}) {
  const [userInfo, setUserInfo] = useState(null);

  const { logoutCustomer } = useContext(UserContext);
  const handleLogout = () => {
    setLogout(true);
    setLogiin(false);
    logoutCustomer();
  };

  const toggleCart = () => {
    setCartVisible(!cartVisible);
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/${idUser}`
        );
        setUserInfo(response.data);
      } catch (err) {
        console.error("Error fetching user info:", err);
      }
    };

    if (idUser) {
      fetchUserInfo();
    }
  }, [idUser]);

  return (
    <div>
      <div className="header1">
        Free Shipping On All Morocco. Orders 500+ MAD
      </div>
      <div className="header2">
        <div className="header2_1">
          {/* <div className="barSerch">
            <input
              type="search"
              placeholder="Search ..."
              className="search_field"
            />
            <img src={icon_search} alt="Icon Search" />
          </div> */}
          <div className="logo_web">
            <Link to={`/`}>
              <img src={logo} alt="logo" />
            </Link>
          </div>
          {loginn ? (
            <div className="userShop">
              {userInfo ? (
                userInfo.role === "admin" ? (
                  <div className="userShop">
                    <Link to={`/admin`}>
                      <img
                        src={`http://localhost:5000/${userInfo.photo}`}
                        alt="Admin User"
                      />
                    </Link>
                    <Link to="/">
                      <img src={logout} alt="Logout" onClick={handleLogout} />
                    </Link>
                  </div>
                ) : (
                  <div className="userShop">
                    <Link to={`/client/${userInfo._id}`}>
                      {/* <img src={userInfo.photo} alt="Client User" /> */}
                      <img
                        src={`http://localhost:5000/${userInfo.photo}`}
                        alt="Client User"
                      />
                    </Link>
                    <img
                      src={icon_shop}
                      alt="Shopping Cart"
                      onClick={toggleCart}
                    />
                    <Link to="/">
                      <img src={logout} alt="Logout" onClick={handleLogout} />
                    </Link>
                  </div>
                )
              ) : (
                <div>Loading...</div>
              )}
            </div>
          ) : (
            <div className="userShop">
              <Link to={`/join`}>
                <img src={icon_user} alt="Login" />
              </Link>
            </div>
          )}
        </div>
        <div className="header2_2">
          {loginn && userInfo ? (
            userInfo.role === "admin" ? (
              <ul className="list_pages">
                <Link to={`/`} className="list_links">
                  Home
                </Link>
                <Link to={`/products`} className="list_links">
                  Products
                </Link>
                <Link to={`/admin/${userInfo.id}`} className="list_links">
                  AdminPage
                </Link>
              </ul>
            ) : (
              <ul className="list_pages">
                <Link to={`/`} className="list_links">
                  Home
                </Link>
                <Link to={`/products`} className="list_links">
                  Products
                </Link>
                {/* <Link to={`/collection`} className="list_links">
                  Collection
                </Link>
                <Link to={`/shop`} className="list_links">
                  Shop
                </Link>
                <Link to={`/offer`} className="list_links">
                  Offer
                </Link> */}
              </ul>
            )
          ) : (
            <ul className="list_pages">
              <Link to={`/`} className="list_links">
                Home
              </Link>
              <Link to={`/products`} className="list_links">
                Products
              </Link>
              {/* <Link to={`/collection`} className="list_links">
                Collection
              </Link>
              <Link to={`/shop`} className="list_links">
                Shop
              </Link>
              <Link to={`/offer`} className="list_links">
                Offer
              </Link> */}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
