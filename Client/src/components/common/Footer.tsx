import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
// import "../assets/Style/components/common/Footer.scss";

export default function Footer() {
  const { user } = useAuth();

  let profileLink;
  if (!user) {
    profileLink = <NavLink to="/Profile">Profile</NavLink>;
  } else if (user.role === "farmer") {
    profileLink = <NavLink to="/Sell">Sell</NavLink>;
    profileLink = <NavLink to="/UserProfile">User Profile</NavLink>;
  } else {
    profileLink = <NavLink to="/UserProfile">User Profile</NavLink>;
  } // Check if the farmer is loged in, if he is give him the option to access his profile and sell
  // if its the user just give him the option to access and change his profile, the logic is simple

  return (
    <footer>
      <div className="logo">
        <h1>FarmLink</h1>
      </div>
      <div className="footer-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/Maps">Map</NavLink>
        {profileLink}
        <NavLink to="/About">About</NavLink>
      </div>
    </footer>
  );
}
