import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppWrapper from "./App";
import { UserProvider } from "./UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserProvider>
    <AppWrapper />
  </UserProvider>
);
