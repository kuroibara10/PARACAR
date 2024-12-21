import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Collection from "./components/Collection";
import Shop from "./components/Shop";
import Footer from "./components/Footer";
import Under from "./components/Under";
import About from "./components/About";
import Discover from "./components/Discover";
import Home from "./pages/Home";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Products from "./pages/Products";
import AdminPage from "./pages/Admin";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          {/* <Route path="/join" element={<JoinPage />} /> */}
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
