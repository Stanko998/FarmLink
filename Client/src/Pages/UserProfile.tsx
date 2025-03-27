import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import "../assets/Style/pages/UserProfile.scss";

/** Full user object from server */
interface FullUserData {
  username: string;
  name: string;
  lastName: string;
  email: string;
  municipality: string;
  place: string;
  address: string;
  role: string;
  // If your server returns hashed password or something, you can omit that
}

/** Additional password fields for updating password */
interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export default function UserProfile() {
  const { user } = useAuth();
  // If not logged in, redirect
  if (!user) return <Navigate to="/Profile/login" />;

  // Local states for user fields
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [place, setPlace] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("customer");

  // For password changes
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  // For success/error messages
  const [message, setMessage] = useState<string | null>(null);

  // isEditing toggles between read-only and edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Fetch user data on mount
  useEffect(() => {
    async function fetchUserData() {
      try {
        // Example: GET /users/:username
        const res = await fetch(`http://localhost:5050/users/${user.username}`);
        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data: FullUserData = await res.json();
        // Populate states
        setUsername(data.username);
        setName(data.name);
        setLastName(data.lastName);
        setEmail(data.email);
        setMunicipality(data.municipality);
        setPlace(data.place);
        setAddress(data.address);
        setRole(data.role);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setMessage("Error fetching user data. Please refresh or try again.");
      }
    }

    fetchUserData();
  }, [user.username]);

  // Save updated fields (including password if changed)
  const handleSaveChanges = async () => {
    // Basic check: if user typed new password, confirm it matches
    if (newPassword && newPassword !== confirmNewPassword) {
      setMessage("New password and confirm password do not match.");
      return;
    }

    // Construct the updated data object
    // (the server can decide if it wants to update the password if newPassword is present)
    const updatedData = {
      username,
      name,
      lastName,
      email,
      municipality,
      place,
      address,
      role,
      currentPassword, // needed for server to verify user identity
      newPassword, // the new password to set
    };

    try {
      // Example: PUT /users/:username
      const res = await fetch(`http://localhost:5050/users/${user.username}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to update user");
      }

      setMessage("Profile updated successfully!");
      setIsEditing(false); // exit edit mode after successful save

      // Clear password fields
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("Error updating profile. Please try again.");
    }
  };

  // If we are NOT editing, show read-only fields
  // If we are editing, show input fields
  const renderField = (
    label: string,
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    type: string = "text"
  ) => {
    return (
      <div className="field">
        <label>{label}</label>
        {isEditing ? (
          type === "select" ? (
            <select value={value} onChange={(e) => setValue(e.target.value)}>
              <option value="farmer">Farmer</option>
              <option value="customer">Customer</option>
            </select>
          ) : (
            <input
              type={type}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          )
        ) : (
          <p className="read-only">{value}</p>
        )}
      </div>
    );
  };

  // Additional fields for password
  const renderPasswordField = (
    label: string,
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (!isEditing) return null; // only show password fields in edit mode

    return (
      <div className="field">
        <label>{label}</label>
        <input
          type="password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    );
  };

  return (
    <div className="user-profile-container">
      <div className="profile-header">
        <h2>User Profile</h2>
        {!isEditing ? (
          // Show "Edit" button if not editing
          <button className="edit-btn" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        ) : (
          // Show "Exit" button if editing
          <button className="exit-btn" onClick={() => setIsEditing(false)}>
            Exit
          </button>
        )}
      </div>

      {message && <p className="update-message">{message}</p>}

      <div className="profile-grid">
        {renderField("Username", username, setUsername)}
        {renderField("Name", name, setName)}
        {renderField("Last Name", lastName, setLastName)}

        {renderField("Email", email, setEmail, "email")}
        {renderField("Municipality", municipality, setMunicipality)}
        {renderField("Place", place, setPlace)}

        {renderField("Address", address, setAddress)}
        {renderField("Role", role, setRole, "select")}
      </div>

      {/* Password fields (only show if editing) */}
      <div className="password-section">
        {renderPasswordField(
          "Current Password",
          currentPassword,
          setCurrentPassword
        )}
        {renderPasswordField("New Password", newPassword, setNewPassword)}
        {renderPasswordField(
          "Confirm New Password",
          confirmNewPassword,
          setConfirmNewPassword
        )}
      </div>

      {isEditing && (
        <button className="save-btn" onClick={handleSaveChanges}>
          Save Changes
        </button>
      )}
    </div>
  );
}
