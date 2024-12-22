import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import LogInSingIn from "./pages/LogInSingIn";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Products from "./pages/Products";
import AdminPage from "./pages/Admin";
import { listProducts } from "./dates/listProducts";
import { listClient } from "./dates/listClient";
import { Adminne } from "./dates/Adminne";

function App() {
  const [products, setProducts] = useState(listProducts);
  const [clients, setclients] = useState(listClient);
  const [gmaille, setGmaille] = useState("");
  const [adminss, setAdminss] = useState(Adminne);

  const [loginn, setLogiin] = useState(false);
  const [logout, setLogout] = useState(false);

  return (
    <div className="App">
      <Router>
        <Header
          loginn={loginn}
          setLogiin={setLogiin}
          clients={clients}
          gmaille={gmaille}
          adminss={adminss}
          setLogout={setLogout}
        />
        <Routes>
          <Route path="/" element={<Home products={products} />} />
          <Route path="/products" element={<Products products={products} />} />
          <Route
            path="/join"
            element={
              <LogInSingIn
                loginn={loginn}
                setLogiin={setLogiin}
                setGmaille={setGmaille}
                clients={clients}
                adminss={adminss}
              />
            }
          />
          <Route
            path="/admin"
            element={
              <AdminPage
                products={products}
                setProducts={setProducts}
                loginn={loginn}
                setLogiin={setLogiin}
                clients={clients}
              />
            }
          />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
