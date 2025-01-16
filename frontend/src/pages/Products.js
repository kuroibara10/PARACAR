import React, { useState, useContext } from "react";
import "../styles/Products.css";
import imgClos from "../components/assets/icons/close.png";
import cartIcon from "../components/assets/icons/shopping-cart.png";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

function Products({ products, loginn, cartVisible, setCartVisible }) {
  const { customer } = useContext(UserContext);
  const [detialss, setDetialss] = useState(false);
  const [prod, setProd] = useState("Product1");
  const [bgColor, setBgColor] = useState("lightblue");
  const produit = products.find((item) => item.nameProduct === prod);
  const descriptionpP = (x) => {
    setDetialss(true);
    setProd(x);
    setBgColor(bgColor === "lightblue" ? "lightgreen" : "lightblue");
  };
  const descriptionpPP = () => {
    setDetialss(false);
  };
  const [nameSearch, setNameSearch] = useState("");
  const [priceSearch, setPriceSearch] = useState("");
  const [reviewsSearch, setReviewsSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const handleSearch = () => {
    setFilteredProducts(
      products.filter((product) => {
        const nameMatch =
          nameSearch === "" ||
          product.nameProduct.toLowerCase() === nameSearch.toLowerCase();
        const priceMatch =
          priceSearch === "" || product.prix <= parseFloat(priceSearch);
        const reviewsMatch =
          reviewsSearch === "" || product.reviews <= parseFloat(reviewsSearch);
        return nameMatch && priceMatch && reviewsMatch;
      })
    );
  };

  const [cart, setCart] = useState([]);
  // const [cartVisible, setCartVisible] = useState(false);
  const toggleCart = () => {
    setCartVisible(!cartVisible);
  };

  const addToCart = (product, nameProduct) => {
    setCart([...cart, product]);
    alert(`Product ${nameProduct} Add to cart`);
  };

  const removeFromCart = (productName) => {
    setCart(cart.filter((item) => item.nameProduct !== productName));
    alert(`Product ${productName} Remove to cart`);
  };

  let navigate = useNavigate();

  const cartTotal = cart.reduce((total, item) => total + item.prix, 0);

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleCheckout = async () => {
    const customerEmail = customer.email;
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    if (!customerEmail) {
      alert("Please enter your email to proceed!");
      return;
    }

    const orderData = {
      customerEmail,
      products: cart.map((item) => ({
        nameProduct: item.nameProduct,
        prix: item.prix, // الكمية الافتراضية
      })),
      totalPrix: cart.reduce((total, item) => total + item.prix, 0),
    };
    navigate("/payem", { state: { ordercu: orderData } });
  };

  const handleBuyNow = async (product) => {
    const customerEmail = customer.email;
    if (!customerEmail) {
      alert("Please enter your email to proceed!");
      return;
    }

    const orderData = {
      customerEmail,
      products: [
        {
          nameProduct: product.nameProduct,
          prix: product.prix, // الكمية الافتراضية
        },
      ],
      totalPrix: product.prix,
    };
    navigate("/payem", { state: { ordercu: orderData } });

    // navigate("/payem");
  };

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="backgroundPage">
      <div className="ffff">
        {detialss && (
          <div className="desc">
            <img
              className="imgClose"
              src={imgClos}
              alt="close"
              onClick={descriptionpPP}
            />
            <div className="containerD">
              <div className="box_one">
                <div className="details">
                  <div className="topic">Description</div>
                  <p>{produit.description}</p>
                  <div className="rating"></div>
                  <div className="price-box">
                    <div className="discount">400.00 MAD</div>
                    <div className="price">{produit.prix} MAD</div>
                  </div>
                </div>
                <div className="button1">
                  {loginn && (
                    <button
                      onClick={() => addToCart(produit, produit.nameProduct)}
                    >
                      Add To Cart
                    </button>
                  )}
                </div>
              </div>
              <div className="box_two">
                <div className="image-box">
                  <div className="image">
                    <img
                      src={`http://localhost:5000/${produit.photoProduct}`}
                      alt={`${produit.nameProduct}`}
                    />
                  </div>
                  <div className="info">
                    <div className="brand">skin care</div>
                    <div className="name">Facial cleanser</div>
                    {loginn ? (
                      <div className="button2">
                        <button onClick={() => handleBuyNow(produit)}>
                          Buying
                        </button>
                      </div>
                    ) : (
                      <div className="button2">
                        <Link to={`/join`}>
                          <button>Login For More</button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {cartVisible && (
        <div className="cart-container active">
          <div className="cart">
            <img
              src={imgClos}
              alt="Close Cart"
              className="close-cart"
              onClick={toggleCart}
            />
            <h2>Your Cart</h2>
            <ul>
              {cart.map((item, index) => (
                <li key={index}>
                  {item.nameProduct} - {item.prix} MAD
                  <button onClick={() => removeFromCart(item.nameProduct)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <div className="total">Total: {cartTotal} MAD</div>
            <button onClick={handleCheckout}>Proceed to Checkout</button>
          </div>
        </div>
      )}
      <div className="products">
        <h1>All Products</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by name..."
            value={nameSearch}
            onChange={(e) => setNameSearch(e.target.value)}
          />
          <input
            type="text"
            placeholder="Search by price..."
            value={priceSearch}
            onChange={(e) => setPriceSearch(e.target.value)}
          />
          <input
            type="text"
            placeholder="Search by reviews..."
            value={reviewsSearch}
            onChange={(e) => setReviewsSearch(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
          <img
            src={cartIcon}
            alt="Cart Icon"
            className="cart-icon"
            onClick={toggleCart}
          />
        </div>
        <div className="cProducts">
          {filteredProducts.map((product) => (
            <div
              className="product"
              onClick={() => descriptionpP(product.nameProduct)}
            >
              <img
                src={`http://localhost:5000/${product.photoProduct}`}
                alt={`${product.nameProduct}`}
              />
              <h3>{product.nameProduct}</h3>
              <p>{product.prix} MAD</p>
              <p>{product.reviews} reviews</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
