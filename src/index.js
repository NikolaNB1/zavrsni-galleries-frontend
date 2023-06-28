import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import UserProvider from "./storage/UserProvider";
import GalleryProvider from "./storage/GalleryProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <GalleryProvider>
        <BrowserRouter>
          <Header />
          <App />
        </BrowserRouter>
      </GalleryProvider>
    </UserProvider>
  </React.StrictMode>
);
