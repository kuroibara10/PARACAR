import "../styles/Payement.css";
import credit_card from "./assets/Payment_Method/credit_card.png";
import paypal from "./assets/Payment_Method/paypal.png";
import payoneer from "./assets/Payment_Method/payoneer.png";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function Payement() {
  const location = useLocation();
  const { ordercu } = location.state || {};

  //   const navigate = useNavigate();
  const [activeForm, setActiveForm] = useState("");

  const showForm = (formId) => {
    setActiveForm(formId);
  };

  const [email, setEmail] = useState("");
  const [typeMethod, setTypeMethod] = useState("");
  const [localisation, setLocalisation] = useState("");

  // الطريقة الثانية: إنشاء نسخة جديدة

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Payment method:", typeMethod);
    console.log("Demandeur:", email);
    console.log("Localisation:", localisation);
    const OrderDatas = {
      ...ordercu,
      localisation: localisation,
    };

    fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(OrderDatas),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Order created successfully:", data);
        alert("Payment successfully");
      })
      .catch((error) => {
        console.error("Error creating order:", error);
        alert("Payment no");
      });
  };

  return (
    <div className="container_payem">
      {ordercu && (
        <div>
          <h1>Order details</h1>
          <p>Email Client: {ordercu.customerEmail}</p>
          <p>Total Prix: {ordercu.totalPrix}</p>
          <h2>Products:</h2>
          <ul>
            {ordercu.products.map((product, index) => (
              <li key={index}>
                <p>Name Product: {product.nameProduct}</p>
                <p>Prix: {product.prix}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <h2>Choose Payment Method</h2>

      <div className="payment-options">
        <div
          className="payment-option"
          onClick={() => showForm("credit-card-form")}
        >
          <img src={credit_card} alt="Credit Card" />
          <p>Credit Card</p>
        </div>
        <div className="payment-option" onClick={() => showForm("paypal-form")}>
          <img src={paypal} alt="PayPal" />
          <p>PayPal</p>
        </div>
        <div
          className="payment-option"
          onClick={() => showForm("payoneer-form")}
        >
          <img src={payoneer} alt="Payoneer" />
          <p>Payoneer</p>
        </div>
      </div>

      <div
        id="credit-card-form"
        className={`payment-form ${
          activeForm === "credit-card-form" ? "show" : "hide"
        }`}
      >
        <h3>Credit Card Payment</h3>
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="payment_method" value="credit_card" />
          <label htmlFor="card-number">Card Number:</label>
          <input
            type="text"
            id="card-number"
            name="card_number"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setTypeMethod("Credit Cart");
            }}
            required
          />
          <label htmlFor="expiry-date">Expiry Date:</label>
          <input type="text" id="expiry-date" name="expiry_date" required />
          <label htmlFor="cvv">CVV:</label>
          <input type="text" id="cvv" name="cvv" required />
          <label htmlFor="localisation">Localisation:</label>
          <input
            type="text"
            value={localisation}
            id="localisation"
            name="localisation"
            onChange={(e) => {
              setLocalisation(e.target.value);
            }}
            required
          />
          <button type="submit">Pay Now</button>
        </form>
      </div>

      <div
        id="paypal-form"
        className={`payment-form ${
          activeForm === "paypal-form" ? "show" : "hide"
        }`}
      >
        <h3>PayPal Payment</h3>
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="payment_method" value="paypal" />
          <label htmlFor="paypal-email">PayPal Email:</label>
          <input
            type="email"
            id="paypal-email"
            name="paypal_email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setTypeMethod("Paypal");
            }}
            required
          />
          <label htmlFor="localisation">Localisation:</label>
          <input
            type="text"
            value={localisation}
            id="localisation"
            name="localisation"
            onChange={(e) => {
              setLocalisation(e.target.value);
            }}
            required
          />
          <button type="submit">Pay Now</button>
        </form>
      </div>

      <div
        id="payoneer-form"
        className={`payment-form ${
          activeForm === "payoneer-form" ? "show" : "hide"
        }`}
      >
        <h3>Payoneer Payment</h3>
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="payment_method" value="payoneer" />
          <label htmlFor="payoneer-email">Payoneer Email:</label>
          <input
            type="email"
            id="payoneer-email"
            name="payoneer_email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setTypeMethod("Payonner");
            }}
            required
          />
          <label htmlFor="localisation">Localisation:</label>
          <input
            type="text"
            value={localisation}
            id="localisation"
            name="localisation"
            onChange={(e) => {
              setLocalisation(e.target.value);
            }}
            required
          />
          <button type="submit">Pay Now</button>
        </form>
      </div>
    </div>
  );
}

export default Payement;
