import React, { useState } from "react";
import "../styles/LogInSingIn.css";
import imgg from "../components/assets/images/banner-2.jpg";
import { Link, useNavigate, useParams } from "react-router-dom";

function LogInSingIn({ loginn, setLogiin, clients, setGmaille, adminss }) {
  const [gmaile, setGmaile] = useState("");
  const [password, setPassword] = useState("");
  const [verification, setVerification] = useState(false);
  const navigate = useNavigate();
  const handlValid = (e) => {
    e.preventDefault();
    const setClients = clients.find((clien) => clien.gmailC === gmaile);
    const setAdmine = adminss.find((admi) => admi.gmailA === gmaile);

    if (setClients) {
      console.log("Vrai");
      if (setClients.passwordC == password) {
        console.log("m vrai");
        setVerification(true);
        setLogiin(true);
        setGmaille(gmaile);
        navigate("/");
      } else {
        console.log("m faux");
      }
    } else if (setAdmine) {
      console.log("Vrai");
      if (setAdmine.passwordA == password) {
        console.log("m vrai");
        setVerification(true);
        setLogiin(true);
        setGmaille(gmaile);
        navigate("/");
      } else {
        console.log("m faux");
        setVerification(true);
      }
    } else {
      console.log("Faux");
      setVerification(true);
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
          <div className="login-form">
            <div className="title">Login</div>
            <form onSubmit={handlValid}>
              <div className="input-boxes">
                {verification ? (
                  <div className="text sign-up-text">
                    Password error gmail error
                  </div>
                ) : (
                  <div className="text sign-up-text"></div>
                )}
                <div className="input-box">
                  <i className="fas fa-envelope"></i>
                  <input
                    type="gmail"
                    placeholder="Enter your email"
                    onChange={(e) => {
                      setGmaile(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="input-box">
                  <i className="fas fa-lock"></i>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="text">
                  <a href="#">
                    <span>Forgot password?</span>
                  </a>
                </div>
                <div className="button input-box">
                  <input type="submit" value="Sumbit" />
                </div>
                <div className="text sign-up-text">
                  Don't have an account? <label for="flip">Sigup now</label>
                </div>
              </div>
            </form>
          </div>
          <div className="signup-form">
            <div className="title">Signup</div>
            <form onSubmit={handlValid}>
              <div className="input-boxes">
                <div className="input-box">
                  <i className="fas fa-user"></i>
                  <input type="text" placeholder="Enter your name" required />
                </div>
                <div className="input-box">
                  <i className="fas fa-envelope"></i>
                  <input type="text" placeholder="Enter your email" required />
                </div>
                <div className="input-box">
                  <i className="fas fa-lock"></i>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <div className="button input-box">
                  <input type="submit" value="Sumbit" />
                </div>
                <div className="text sign-up-text">
                  Already have an account? <label for="flip">Login now</label>
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
