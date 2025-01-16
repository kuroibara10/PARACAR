// import React, { useState } from "react";
// import "../styles/Products.css";
// import imgClos from "../components/assets/icons/close.png";
// import { Link } from "react-router-dom";
// // import { listProducts } from "../dates/listProducts";
// function Products({ products, loginn }) {
//   const [detialss, setDetialss] = useState(false);
//   const [prod, setProd] = useState("Product1");
//   const [bgColor, setBgColor] = useState("lightblue");
//   const produit = products.find((item) => item.nameProduct === prod);

//   let colorBck = "#fff";
//   const descriptionpP = (x) => {
//     setDetialss(true);
//     setProd(x);
//     setBgColor(bgColor === "lightblue" ? "lightgreen" : "lightblue");
//   };
//   const descriptionpPP = () => {
//     setDetialss(false);
//   };
//   const [nameSearch, setNameSearch] = useState("");
//   const [priceSearch, setPriceSearch] = useState("");
//   const [reviewsSearch, setReviewsSearch] = useState("");
//   const [filteredProducts, setFilteredProducts] = useState(products);

//   const handleSearch = () => {
//     setFilteredProducts(
//       products.filter((product) => {
//         const nameMatch =
//           nameSearch === "" ||
//           product.nameProduct.toLowerCase() === nameSearch.toLowerCase();
//         const priceMatch =
//           priceSearch === "" || product.prix <= parseFloat(priceSearch);
//         const reviewsMatch =
//           reviewsSearch === "" || product.reviews <= parseFloat(reviewsSearch);
//         return nameMatch && priceMatch && reviewsMatch;
//       })
//     );
//   };

//   return (
//     <div className="backgroundPage">
//       <div className="ffff">
//         {detialss && (
//           <div className="desc">
//             <img className="imgClose" src={imgClos} onClick={descriptionpPP} />
//             <div className="containerD">
//               <div className="box_one">
//                 <div className="details">
//                   <div className="topic">Description</div>
//                   <p>{produit.description}</p>
//                   <div className="rating"></div>
//                   <div className="price-box">
//                     <div className="discount">400.00 MAD</div>
//                     <div className="price">{produit.prix} MAD</div>
//                   </div>
//                 </div>
//                 <div className="button1">
//                   <button>Add To Cart</button>
//                 </div>
//               </div>
//               <div className="box_two">
//                 <div className="image-box">
//                   <div className="image">
//                     <img
//                       src={`http://localhost:5000/${produit.photoProduct}`}
//                     />
//                   </div>
//                   <div className="info">
//                     <div className="brand">skin care</div>
//                     <div className="name">Facial cleanser</div>
//                     {loginn ? (
//                       <div className="button2">
//                         <Link to={`/payem/:id`}>
//                           <button>buying</button>
//                         </Link>
//                       </div>
//                     ) : (
//                       <div className="button2">
//                         <Link to={`/join`}>
//                           <button>Login For More</button>
//                         </Link>
//                       </div>
//                     )}
//                     {/* <div className="button2">
//                       <button>Login For More</button>
//                     </div> */}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//       <div className="products">
//         <h1>All Products</h1>
//         <div className="search-bar">
//           <input
//             type="text"
//             placeholder="Search by name..."
//             value={nameSearch}
//             onChange={(e) => setNameSearch(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="Search by price..."
//             value={priceSearch}
//             onChange={(e) => setPriceSearch(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="Search by reviews..."
//             value={reviewsSearch}
//             onChange={(e) => setReviewsSearch(e.target.value)}
//           />
//           <button onClick={handleSearch}>Search</button>
//         </div>
//         <div className="cProducts">
//           {filteredProducts.map((product) => (
//             <div
//               className="product"
//               onClick={() => descriptionpP(product.nameProduct)}
//             >
//               <img src={`http://localhost:5000/${product.photoProduct}`} />
//               <h3>{product.nameProduct}</h3>
//               <p>{product.prix} MAD</p>
//               <p>{product.reviews} reviews</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Products;

import React, { useState } from "react";
import "../styles/Products.css";
import imgClos from "../components/assets/icons/close.png";
import cartIcon from "../components/assets/icons/shopping-cart.png"; // Icon for the cart
import { Link } from "react-router-dom";

function Products({ products, loginn }) {
  const [details, setDetails] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);
  const [prod, setProd] = useState("Product1");
  const [bgColor, setBgColor] = useState("lightblue");
  const [cart, setCart] = useState([]);
  const produit = products.find((item) => item.nameProduct === prod);

  const toggleDetails = (productName) => {
    setDetails(!details);
    setProd(productName);
    setBgColor(bgColor === "lightblue" ? "lightgreen" : "lightblue");
  };

  const toggleCart = () => {
    setCartVisible(!cartVisible);
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productName) => {
    setCart(cart.filter((item) => item.nameProduct !== productName));
  };

  const handleCheckout = () => {
    // Navigate to payment page with cart items
    // Example: Pass the cart items as part of state or query params
  };

  const cartTotal = cart.reduce((total, item) => total + item.prix, 0);

  return (
    <div className="backgroundPage">
      <div className="products">
        <h1>All Products</h1>
        <div className="search-bar">
          <input type="text" placeholder="Search by name..." />
          <input type="text" placeholder="Search by price..." />
          <button>Search</button>
          <img
            src={cartIcon}
            alt="Cart Icon"
            className="cart-icon"
            onClick={toggleCart}
          />
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
        <div className="cProducts">
          {products.map((product) => (
            <div className="product" key={product.nameProduct}>
              <img
                src={`http://localhost:5000/${product.photoProduct}`}
                alt={product.nameProduct}
              />
              <h3>{product.nameProduct}</h3>
              <p>{product.prix} MAD</p>
              <button onClick={() => toggleDetails(product.nameProduct)}>
                View Details
              </button>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
      {details && (
        <div className="desc">
          <img
            className="imgClose"
            src={imgClos}
            alt="Close"
            onClick={() => setDetails(false)}
          />
          <div className="containerD">
            <div className="box_one">
              <div className="details">
                <div className="topic">Description</div>
                <p>{produit.description}</p>
                <div className="price-box">
                  <div className="discount">400.00 MAD</div>
                  <div className="price">{produit.prix} MAD</div>
                </div>
              </div>
              <button onClick={() => addToCart(produit)}>Add to Cart</button>
            </div>
            <div className="box_two">
              <div className="image-box">
                <img
                  src={`http://localhost:5000/${produit.photoProduct}`}
                  alt={produit.nameProduct}
                />
                <div className="info">
                  <div className="brand">Skin Care</div>
                  <div className="name">{produit.nameProduct}</div>
                  {loginn ? (
                    <Link to={`/payem/:id`}>
                      <button>Buy Now</button>
                    </Link>
                  ) : (
                    <Link to={`/join`}>
                      <button>Login For More</button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
