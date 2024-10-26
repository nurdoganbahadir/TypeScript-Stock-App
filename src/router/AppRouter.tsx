import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import PrivateRouter from "./PrivateRouter";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Firms from "../pages/Firms";
import Brands from "../pages/Brands";
import Purchases from "../pages/Purchases";
import Products from "../pages/Products";

const AppRouter: React.FC = () => {
  const location = useLocation();
  const hideNavbarAndFooter =
    location.pathname === "/" || location.pathname === "/register";

  return (
    <>
      {!hideNavbarAndFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRouter />}>
          <Route path="/home" element={<Home />} />
          <Route path="/firms" element={<Firms />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/purchases" element={<Purchases />} />
          <Route path="/products" element={<Products />} />
        </Route>
      </Routes>
      {!hideNavbarAndFooter && <Footer />}
    </>
  );
};

export default AppRouter;
