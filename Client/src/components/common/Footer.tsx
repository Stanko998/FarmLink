// import React, { useContext } from "react";
// import { CartContext } from "../Stranice/cart/CartProvider";
import { NavLink } from "react-router-dom";
// import logoImage from '../../assets/logo.png';
import "../../assets/Style/components/common/Footer.scss";

export default function Footer() {
  // const { cartItems, toggleCart } = useContext(CartContext);

  return (
    <footer className="footer">
      <div className="logo">
        {/* <img src={logoImage} alt="Logo" className="footer-logo" /> */}
        <h1>FarmLink</h1>
      </div>
      <div className="footer-links">
        <NavLink to="/" className="footer-link">
          Home
        </NavLink>
        <NavLink to="/Maps" className="footer-link">
          Map
        </NavLink>
        <NavLink to="/Profile" className="footer-link">
          Profile
        </NavLink>
        <NavLink to="/About" className="footer-link">
          About
        </NavLink>
        {/* <button className="basket" onClick={toggleCart}>
          Cart ({cartItems.length})
        </button> */}
      </div>
    </footer>
  );
}
