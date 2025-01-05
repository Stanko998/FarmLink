import { NavLink } from "react-router-dom";
import "./Header.scss";

export default function Header() {
  return (
    <div id="navbar">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/About">About</NavLink>
      <NavLink to="/Card">Card</NavLink>
      <NavLink to="/Maps">Maps</NavLink>
      <NavLink to="/Profile">Profile</NavLink>
    </div>
  );
}
