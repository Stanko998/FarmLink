import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../userAuth/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        {user ? (
          <>
            <span style={{ marginRight: "1rem" }}>Hello, {user.username}!</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <></>
        )}
      </div>
    </header>
  );
}
