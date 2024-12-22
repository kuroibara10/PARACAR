import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import LogInSingIn from "./pages/LogInSingIn";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Products from "./pages/Products";
import AdminPage from "./pages/Admin";
import { listProducts } from "./dates/listProducts";

function App() {
  const [products, setProducts] = useState(listProducts);
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home products={products} />} />
          <Route path="/products" element={<Products products={products} />} />
          <Route path="/join" element={<LogInSingIn />} />
          <Route
            path="/admin"
            element={
              <AdminPage products={products} setProducts={setProducts} />
            }
          />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
