import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Payement from "./components/Payement";
import Home from "./pages/Home";
import LogInSingIn from "./pages/LogInSingIn";
import UserDetails from "./pages/UserDetails";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { useParams } from "react-router-dom";

import Products from "./pages/Products";
import AdminPage from "./pages/Admin";
import ParaCare from "./components/ParaCara";
import axios from "axios";

function App() {
  const { id } = useParams(); // الحصول على معرف المستخدم من URL
  const [idUser, setIdUser] = useState(id);
  const [cartVisible, setCartVisible] = useState(false);

  /*------------------------------------------------------------*/

  //DATA TO LIST

  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUser();
    fetchProducts();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/users/${idUser}`
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  /*------------------------------------------------------------*/

  const [loginn, setLogiin] = useState(false);
  const [logout, setLogout] = useState(false);
  const [message, setMessage] = useState("");

  /*-------------------------Products-----------------------------------*/

  // حذف مستخدم
  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete products");
      }
      setMessage("product deleted successfully!");
      fetchProducts(); // تحديث القائمة بعد الحذف
    } catch (err) {
      console.error(err);
      setMessage("Failed to delete products. Please try again.");
    }
  };

  // تحديث مستخدم
  const updateProduct = async (id) => {
    const newprix = prompt("Enter the new name:");
    if (!newprix) return;

    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prix: newprix }),
      });
      if (!response.ok) {
        throw new Error("Failed to update product");
      }
      setMessage("User updated successfully!");
      fetchProducts(); // تحديث القائمة بعد التحديث
    } catch (err) {
      console.error(err);
      setMessage("Failed to update product. Please try again.");
    }
  };

  /*--------------------------------------------------------------------*/

  const location = useLocation();
  // تحديد إذا كانت الصفحة الحالية هي LogInSingIn
  const hideHeaderAndFooter = location.pathname === "/join";

  return (
    <div className="App">
      {/* لا يتم عرض Header و Footer في الصفحة المحددة */}
      {!hideHeaderAndFooter && (
        <Header
          loginn={loginn}
          setLogiin={setLogiin}
          setLogout={setLogout}
          idUser={idUser}
          users={users}
          cartVisible={cartVisible}
          setCartVisible={setCartVisible}
        />
      )}
      <Routes>
        <Route path="/" element={<Home products={products} />} />
        <Route
          path="/products"
          element={
            <Products
              products={products}
              loginn={loginn}
              cartVisible={cartVisible}
              setCartVisible={setCartVisible}
            />
          }
        />
        <Route
          path="/join"
          element={<LogInSingIn setLogiin={setLogiin} setIdUser={setIdUser} />}
        />
        <Route
          path="/admin/:id"
          element={
            <AdminPage products={products} fetchProducts={fetchProducts} />
          }
        />
        <Route path="/paracare" element={<ParaCare />} />
        <Route path="/client/:id" element={<UserDetails />} />
        <Route path="/payem" element={<Payement />} />
      </Routes>
      {/* لا يتم عرض Footer في الصفحة المحددة */}
      {!hideHeaderAndFooter && <Footer />}
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
