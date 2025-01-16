// import React, { useState, useContext } from "react";
// import "../styles/LogInSingIn.css";
// import imgg from "../components/assets/images/banner-2.jpg";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import { UserContext } from "../UserContext";
// import logo from "../components/assets/images/logo.png";

// function LogInSingIn({
//   loginn,
//   setLogiin,
//   clients,
//   setGmaille,
//   adminss,
//   setIdUser,
// }) {
//   // const [isLogin, setIsLogin] = useState(true); // للتحكم في النموذج المعروض
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [username, setUsername] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const { loginCustomer } = useContext(UserContext);

//   // وظيفة تسجيل الدخول
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:5000/api/login", {
//         email,
//         password,
//       });
//       const { role, id } = response.data;

//       if (role === "admin") {
//         setIdUser(id);
//         setLogiin(true);
//         navigate(`/admin/${id}`);
//         const customerData = { id: id, username: username, email: email };
//         loginCustomer(customerData); // تحديث بيانات المستخدم
//       } else if (role === "client") {
//         setIdUser(id);
//         setLogiin(true);
//         navigate(`/client/${id}`);
//         const customerData = { id: id, username: username, email: email };
//         loginCustomer(customerData); // تحديث بيانات المستخدم
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Server error");
//     }
//   };

//   const handleSignUp = async (e) => {
//     e.preventDefault();

//     const passwordRequirements =
//       /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

//     const conditions = [
//       {
//         text: "Password must be at least 8 characters long",
//         isValid: password.length >= 8,
//       },
//       {
//         text: "Contain at least one uppercase letter",
//         isValid: /[A-Z]/.test(password),
//       },
//       {
//         text: "Contain at least one number",
//         isValid: /\d/.test(password),
//       },
//       {
//         text: "Contain at least one special character",
//         isValid: /[@$!%*?&]/.test(password),
//       },
//     ];

//     const listItems = conditions.map((condition, index) => (
//       <li
//         key={index}
//         style={{
//           color: condition.isValid ? "green" : "red", // تغيير اللون بناءً على التحقق
//         }}
//       >
//         {condition.text}
//       </li>
//     ));

//     setError(<ul>{listItems}</ul>);

//     // العودة إذا كانت الشروط غير متوافقة
//     if (!passwordRequirements.test(password)) {
//       return;
//     }

//     try {
//       await axios.post("http://localhost:5000/api/signup", {
//         email,
//         password,
//         username,
//       });
//       alert("Account created successfully! Please login.");
//     } catch (err) {
//       setError(err.response?.data?.message || "Server error");
//     }
//   };

//   return (
//     <div className="containerLogin">
//       <input type="checkbox" id="flip" />
//       <div className="cover">
//         <div className="front">
//           <img src={imgg} alt="" />
//           <div className="text">
//             <span className="text-1">
//               Every new friend is a <br /> new adventure
//             </span>
//             <span className="text-2">Let's get connected</span>
//           </div>
//         </div>
//         <div className="back">
//           <img className="backImg" src={imgg} alt="" />
//           <div className="text">
//             <span className="text-1">
//               Complete miles of journey <br /> with one step
//             </span>
//             <span className="text-2">Let's get started</span>
//           </div>
//         </div>
//       </div>
//       <div className="forms">
//         <div className="form-content">
//           <div className="login-form">
//             <div className="headerLog">
//               <div className="title">Login</div>
//               <Link to={`/`}>
//                 <img className="logoImg" src={logo} alt="" />
//               </Link>
//             </div>
//             {error && <p style={{ color: "red" }}>{error}</p>}
//             <form onSubmit={handleLogin}>
//               <div className="input-boxes">
//                 <div className="input-box">
//                   <i className="fas fa-envelope"></i>
//                   <input
//                     type="gmail"
//                     placeholder="Enter your email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="input-box">
//                   <i className="fas fa-lock"></i>
//                   <input
//                     type="password"
//                     placeholder="Enter your password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="text">
//                   <a href="#">
//                     <span>Forgot password?</span>
//                   </a>
//                 </div>
//                 <div className="button input-box">
//                   <input type="submit" value="Sumbit" />
//                 </div>
//                 <div className="text sign-up-text">
//                   Don't have an account? <label for="flip">Sigup now</label>
//                 </div>
//               </div>
//             </form>
//           </div>
//           <div className="signup-form">
//             <div className="headerLog">
//               <div className="title">Signup</div>
//               <Link to={`/`}>
//                 <img className="logoImg" src={logo} alt="" />
//               </Link>
//             </div>
//             {error && <p style={{ color: "red" }}>{error}</p>}
//             <form onSubmit={handleSignUp}>
//               <div className="input-boxes">
//                 <div className="input-box">
//                   <i className="fas fa-user"></i>
//                   <input
//                     type="text"
//                     placeholder="Enter your name"
//                     value={username}
//                     onChange={(e) => {
//                       setUsername(e.target.value);
//                     }}
//                     required
//                   />
//                 </div>
//                 <div className="input-box">
//                   <i className="fas fa-envelope"></i>
//                   <input
//                     type="text"
//                     placeholder="Enter your email"
//                     value={email}
//                     onChange={(e) => {
//                       setEmail(e.target.value);
//                     }}
//                     required
//                   />
//                 </div>
//                 <div className="input-box">
//                   <i className="fas fa-lock"></i>
//                   <input
//                     type="password"
//                     placeholder="Enter your password"
//                     value={password}
//                     onChange={(e) => {
//                       setPassword(e.target.value);
//                     }}
//                     required
//                   />
//                 </div>
//                 <div className="button input-box">
//                   <input type="submit" value="Sumbit" />
//                 </div>
//                 <div className="text sign-up-text">
//                   Already have an account? <label for="flip">Login now</label>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LogInSingIn;

// import React, { useState, useContext } from "react";
// import "../styles/LogInSingIn.css";
// import imgg from "../components/assets/images/banner-2.jpg";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { UserContext } from "../UserContext";
// import logo from "../components/assets/images/logo.png";

// function LogInSingIn({
//   loginn,
//   setLogiin,
//   clients,
//   setGmaille,
//   adminss,
//   setIdUser,
// }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [username, setUsername] = useState("");
//   const [error, setError] = useState("");
//   const [passwordVisible, setPasswordVisible] = useState(false); // لإظهار/إخفاء كلمة المرور
//   const navigate = useNavigate();
//   const { loginCustomer } = useContext(UserContext);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:5000/api/login", {
//         email,
//         password,
//       });
//       const { role, id } = response.data;

//       if (role === "admin") {
//         setIdUser(id);
//         setLogiin(true);
//         navigate(`/admin/${id}`);
//         const customerData = { id: id, username: username, email: email };
//         loginCustomer(customerData); // تحديث بيانات المستخدم
//       } else if (role === "client") {
//         setIdUser(id);
//         setLogiin(true);
//         navigate(`/client/${id}`);
//         const customerData = { id: id, username: username, email: email };
//         loginCustomer(customerData); // تحديث بيانات المستخدم
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Server error");
//     }
//   };

//   const handleSignUp = async (e) => {
//     e.preventDefault();

//     const passwordRequirements =
//       /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

//     if (!passwordRequirements.test(password)) {
//       setError("Password must meet complexity requirements.");
//       return;
//     }

//     try {
//       await axios.post("http://localhost:5000/api/signup", {
//         email,
//         password,
//         username,
//       });
//       alert("Account created successfully! Please login.");
//     } catch (err) {
//       setError(err.response?.data?.message || "Server error");
//     }
//   };

//   return (
//     <div className="containerLogin">
//       <input type="checkbox" id="flip" />
//       <div className="cover">
//         <div className="front">
//           <img src={imgg} alt="" />
//           <div className="text">
//             <span className="text-1">
//               Every new friend is a <br /> new adventure
//             </span>
//             <span className="text-2">Let's get connected</span>
//           </div>
//         </div>
//         <div className="back">
//           <img className="backImg" src={imgg} alt="" />
//           <div className="text">
//             <span className="text-1">
//               Complete miles of journey <br /> with one step
//             </span>
//             <span className="text-2">Let's get started</span>
//           </div>
//         </div>
//       </div>
//       <div className="forms">
//         <div className="form-content">
//           {/* نموذج تسجيل الدخول */}
//           <div className="login-form">
//             <div className="headerLog">
//               <div className="title">Login</div>
//               <Link to={`/`}>
//                 <img className="logoImg" src={logo} alt="" />
//               </Link>
//             </div>
//             {error && <p style={{ color: "red" }}>{error}</p>}
//             <form onSubmit={handleLogin}>
//               <div className="input-boxes">
//                 <div className="input-box">
//                   <i className="fas fa-envelope"></i>
//                   <input
//                     type="text"
//                     placeholder="Enter your email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="input-box">
//                   <i className="fas fa-lock"></i>
//                   <input
//                     type={passwordVisible ? "text" : "password"}
//                     placeholder="Enter your password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setPasswordVisible(!passwordVisible)}
//                   >
//                     {passwordVisible ? "Hide" : "Show"}
//                   </button>
//                 </div>
//                 <div className="text">
//                   <a href="#">
//                     <span>Forgot password?</span>
//                   </a>
//                 </div>
//                 <div className="button input-box">
//                   <input type="submit" value="Submit" />
//                 </div>
//                 <div className="text sign-up-text">
//                   Don't have an account?{" "}
//                   <label htmlFor="flip">Signup now</label>
//                 </div>
//               </div>
//             </form>
//           </div>
//           {/* نموذج تسجيل الحساب */}
//           <div className="signup-form">
//             <div className="headerLog">
//               <div className="title">Signup</div>
//               <Link to={`/`}>
//                 <img className="logoImg" src={logo} alt="" />
//               </Link>
//             </div>
//             {error && <p style={{ color: "red" }}>{error}</p>}
//             <form onSubmit={handleSignUp}>
//               <div className="input-boxes">
//                 <div className="input-box">
//                   <i className="fas fa-user"></i>
//                   <input
//                     type="text"
//                     placeholder="Enter your name"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="input-box">
//                   <i className="fas fa-envelope"></i>
//                   <input
//                     type="text"
//                     placeholder="Enter your email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="input-box">
//                   <i className="fas fa-lock"></i>
//                   <input
//                     type={passwordVisible ? "text" : "password"}
//                     placeholder="Enter your password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setPasswordVisible(!passwordVisible)}
//                   >
//                     {passwordVisible ? "Hide" : "Show"}
//                   </button>
//                 </div>
//                 <div className="button input-box">
//                   <input type="submit" value="Submit" />
//                 </div>
//                 <div className="text sign-up-text">
//                   Already have an account?{" "}
//                   <label htmlFor="flip">Login now</label>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LogInSingIn;

import React, { useState, useContext } from "react";
import "../styles/LogInSingIn.css";
import imgg from "../components/assets/images/banner-2.jpg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";
import logo from "../components/assets/images/logo.png";
import "@fortawesome/fontawesome-free/css/all.min.css";

function LogInSingIn({
  loginn,
  setLogiin,
  clients,
  setGmaille,
  adminss,
  setIdUser,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); // للتحكم في إظهار/إخفاء كلمة المرور
  const navigate = useNavigate();
  const { loginCustomer } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });
      const { role, id } = response.data;

      if (role === "admin") {
        setIdUser(id);
        setLogiin(true);
        navigate(`/admin/${id}`);
        const customerData = { id: id, username: username, email: email };
        loginCustomer(customerData); // تحديث بيانات المستخدم
      } else if (role === "client") {
        setIdUser(id);
        setLogiin(true);
        navigate(`/client/${id}`);
        const customerData = { id: id, username: username, email: email };
        loginCustomer(customerData); // تحديث بيانات المستخدم
      }
    } catch (err) {
      setError(err.response?.data?.message || "Server error");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const passwordRequirements =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRequirements.test(password)) {
      setError("Password must meet complexity requirements.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/signup", {
        email,
        password,
        username,
      });
      alert("Account created successfully! Please login.");
    } catch (err) {
      setError(err.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="containerLogin">
      <input type="checkbox" id="flip" />
      <div className="cover">
        <div className="front">
          <img src={imgg} alt="" />
          <div className="text">
            <span className="text-1">
              Every new friend is a <br /> new adventure
            </span>
            <span className="text-2">Let's get connected</span>
          </div>
        </div>
        <div className="back">
          <img className="backImg" src={imgg} alt="" />
          <div className="text">
            <span className="text-1">
              Complete miles of journey <br /> with one step
            </span>
            <span className="text-2">Let's get started</span>
          </div>
        </div>
      </div>
      <div className="forms">
        <div className="form-content">
          {/* نموذج تسجيل الدخول */}
          <div className="login-form">
            <div className="headerLog">
              <div className="title">Login</div>
              <Link to={`/`}>
                <img className="logoImg" src={logo} alt="" />
              </Link>
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleLogin}>
              <div className="input-boxes">
                <div className="input-box">
                  <i className="fas fa-envelope"></i>
                  <input
                    type="text"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="input-box">
                  <i className="fas fa-lock"></i>
                  <input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <i
                    className={`fas ${
                      passwordVisible ? "fa-eye-slash" : "fa-eye"
                    } password-toggle`}
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    style={{
                      cursor: "pointer",
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  ></i>
                </div>
                <div className="text">
                  <a href="#">
                    <span>Forgot password?</span>
                  </a>
                </div>
                <div className="button input-box">
                  <input type="submit" value="Submit" />
                </div>
                <div className="text sign-up-text">
                  Don't have an account?{" "}
                  <label htmlFor="flip">Signup now</label>
                </div>
              </div>
            </form>
          </div>
          {/* نموذج تسجيل الحساب */}
          <div className="signup-form">
            <div className="headerLog">
              <div className="title">Signup</div>
              <Link to={`/`}>
                <img className="logoImg" src={logo} alt="" />
              </Link>
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSignUp}>
              <div className="input-boxes">
                <div className="input-box">
                  <i className="fas fa-user"></i>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="input-box">
                  <i className="fas fa-envelope"></i>
                  <input
                    type="text"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="input-box">
                  <i className="fas fa-lock"></i>
                  <input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <i
                    className={`fas ${
                      passwordVisible ? "fa-eye-slash" : "fa-eye"
                    } password-toggle`}
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    style={{
                      cursor: "pointer",
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  ></i>
                </div>
                <div className="button input-box">
                  <input type="submit" value="Submit" />
                </div>
                <div className="text sign-up-text">
                  Already have an account?{" "}
                  <label htmlFor="flip">Login now</label>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogInSingIn;
