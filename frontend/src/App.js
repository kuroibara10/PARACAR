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
import AdminDashboard from "./AdminDashboard";
import axios from "axios";

function App() {
  const { id } = useParams(); // الحصول على معرف المستخدم من URL

  const [gmaille, setGmaille] = useState("");
  const [idUser, setIdUser] = useState(id);

  const [cartVisible, setCartVisible] = useState(false);

  /*------------------------------------------------------------*/

  //DATA TO LIST

  const [products, setProducts] = useState([]);
  const [adminss, setAdminss] = useState([]);
  const [clients, setClients] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUser();
    fetchProducts();
    fetchClients();
    fetchAdmins();
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

  const fetchAdmins = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admins");
      setAdminss(response.data);
    } catch (error) {
      console.error("Error fetching admins:", error);
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
  const fetchClients = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/clients");
      setClients(response.data);
    } catch (error) {
      console.error("Error fetching clients:", error);
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

  /*------------------------------------------------------------*/

  /*------------------------Clients------------------------------------*/

  // حذف مستخدم
  const deleteClient = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/clients/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete client");
      }
      setMessage("client deleted successfully!");
      fetchClients(); // تحديث القائمة بعد الحذف
    } catch (err) {
      console.error(err);
      setMessage("Failed to delete client. Please try again.");
    }
  };

  // تحديث مستخدم
  const updateClient = async (id) => {
    const newName = prompt("Enter the new name:");
    if (!newName) return;

    try {
      const response = await fetch(`http://localhost:5000/api/clients/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nameClient: newName }),
      });
      if (!response.ok) {
        throw new Error("Failed to update client");
      }
      setMessage("client updated successfully!");
      fetchClients(); // تحديث القائمة بعد التحديث
    } catch (err) {
      console.error(err);
      setMessage("Failed to update client. Please try again.");
    }
  };

  /*------------------------------Orde------------------------------*/
  const [orderc, setOrderc] = useState([]);

  /*--------------------------------------------------------------------*/

  //   return (
  //     <div className="App">
  //       <Router>
  //         <Header
  //           users={users}
  //           loginn={loginn}
  //           setLogiin={setLogiin}
  //           clients={clients}
  //           gmaille={gmaille}
  //           adminss={adminss}
  //           setLogout={setLogout}
  //           idUser={idUser}
  //           cartVisible={cartVisible}
  //           setCartVisible={setCartVisible}
  //         />
  //         <Routes>
  //           <Route path="/" element={<Home products={products} />} />
  //           <Route
  //             path="/products"
  //             element={
  //               <Products
  //                 products={products}
  //                 loginn={loginn}
  //                 clientId={id}
  //                 orderc={orderc}
  //                 setOrderc={setOrderc}
  //                 cartVisible={cartVisible}
  //                 setCartVisible={setCartVisible}
  //               />
  //             }
  //           />
  //           <Route
  //             path="/join"
  //             element={
  //               <LogInSingIn
  //                 loginn={loginn}
  //                 setLogiin={setLogiin}
  //                 setGmaille={setGmaille}
  //                 clients={clients}
  //                 adminss={adminss}
  //                 setIdUser={setIdUser}
  //               />
  //             }
  //           />
  //           <Route
  //             path="/admin/:id"
  //             element={
  //               <AdminPage
  //                 products={products}
  //                 setProducts={setProducts}
  //                 loginn={loginn}
  //                 setLogiin={setLogiin}
  //                 clients={clients}
  //                 adminId={id}
  //                 deleteProduct={deleteProduct}
  //                 updateProduct={updateProduct}
  //                 fetchProducts={fetchProducts}
  //               />
  //             }
  //           />
  //           <Route path="/paracare" element={<ParaCare />} />
  //           <Route
  //             path="/client/:id"
  //             element={<UserDetails clientId={id} setClients={setClients} />}
  //           />
  //           <Route
  //             path="/payem"
  //             element={
  //               <Payement
  //                 clientId={id}
  //                 setClients={setClients}
  //                 orderc={orderc}
  //                 setOrderc={setOrderc}
  //               />
  //             }
  //           />
  //           <Route path="/admi" element={<AdminDashboard adminId={id} />} />
  //         </Routes>
  //         <Footer />
  //       </Router>
  //     </div>
  //   );
  // }

  // export default App;

  const location = useLocation();
  // تحديد إذا كانت الصفحة الحالية هي LogInSingIn
  const hideHeaderAndFooter = location.pathname === "/join";

  return (
    <div className="App">
      {/* لا يتم عرض Header و Footer في الصفحة المحددة */}
      {!hideHeaderAndFooter && (
        <Header
          users={users}
          loginn={loginn}
          setLogiin={setLogiin}
          clients={clients}
          gmaille={gmaille}
          adminss={adminss}
          setLogout={setLogout}
          idUser={idUser}
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
              clientId={id}
              orderc={orderc}
              setOrderc={setOrderc}
              cartVisible={cartVisible}
              setCartVisible={setCartVisible}
            />
          }
        />
        <Route
          path="/join"
          element={
            <LogInSingIn
              loginn={loginn}
              setLogiin={setLogiin}
              setGmaille={setGmaille}
              clients={clients}
              adminss={adminss}
              setIdUser={setIdUser}
            />
          }
        />
        <Route
          path="/admin/:id"
          element={
            <AdminPage
              products={products}
              setProducts={setProducts}
              loginn={loginn}
              setLogiin={setLogiin}
              clients={clients}
              adminId={id}
              deleteProduct={deleteProduct}
              updateProduct={updateProduct}
              fetchProducts={fetchProducts}
            />
          }
        />
        <Route path="/paracare" element={<ParaCare />} />
        <Route
          path="/client/:id"
          element={<UserDetails clientId={id} setClients={setClients} />}
        />
        <Route
          path="/payem"
          element={
            <Payement
              clientId={id}
              setClients={setClients}
              orderc={orderc}
              setOrderc={setOrderc}
            />
          }
        />
        <Route path="/admi" element={<AdminDashboard adminId={id} />} />
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
