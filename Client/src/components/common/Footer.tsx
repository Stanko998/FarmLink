import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div className="logo">
        <h1>FarmLink</h1>
      </div>
      <div className="footer-links">
        <NavLink to="/"> Home</NavLink>
        <NavLink to="/Maps"> Map</NavLink>
        <NavLink to="/Profile">Profile</NavLink>
        <NavLink to="/About">About</NavLink>
      </div>
    </footer>
  );
}
