import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
// import "../assets/Style/pages/UserProfile.scss";

export default function UserProfile() {
  const { user } = useAuth();

  // Redirect to login if no user is logged in
  if (!user) return <Navigate to="/Profile/login" />;

  return (
    <div className="user-profile-container">
      <h2>User Profile</h2>
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Username:</strong> {user.username}
      </p>
      <p>
        <strong>Role:</strong> {user.role}
      </p>

      {/* Here you can add UI elements for editing profile details */}
      <button>Edit Profile</button>

      {/* You can also include sections for the user's products */}
      <h3>Your Products</h3>
      <p>(This section will list products the user is selling, if any.)</p>
    </div>
  );
}
