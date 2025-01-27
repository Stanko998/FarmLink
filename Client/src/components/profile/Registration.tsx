import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../../assets/Style/components/profile/Registration.scss";

export default function Registration(): any {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [place, setPlace] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");

  const [error, setError] = useState<null | string>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!email.includes("@")) {
      setError("Invalid email address");
      return;
    }

    try {
      const res = await fetch("http://localhost:5050/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          name,
          lastName,
          password,
          email,
          municipality,
          place,
          address,
          role,
        }),
      });
      if (res.status === 200) {
        setUsername("");
        setName("");
        setLastName("");
        setPassword("");
        setConfirmPassword("");
        setEmail("");
        setMunicipality("");
        setPlace("");
        setAddress("");
        setRole("");
      }
      const records = await res.json();
      if (!records.success) {
        setError(records.error);
        throw new Error(records.error);
      }
      setError(null);
    } catch (error) {
      console.error("doslo je do greske " + error);
    }
  };

  return (
    <div className="registration-container">
      <h2>Register</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="input-container">
            <input
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field"
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input-field"
            />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="input-field"
            >
              <option value="" disabled>
                Choose your role
              </option>
              <option value="farmer">Farmer</option>
              <option value="customer">Customer</option>
            </select>
          </div>
          <div className="input-container">
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
            />
            <input
              type="text"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input-field"
            />
            <input
              type="text"
              placeholder="Enter your municipality"
              value={municipality}
              onChange={(e) => setMunicipality(e.target.value)}
              className="input-field"
            />
            <input
              type="text"
              placeholder="Enter your place"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              className="input-field"
            />
            <input
              type="text"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="input-field"
            />
          </div>
        </div>
        <button type="submit" className="btn-submit">
          Register
        </button>
        <p>
          Already have an account?{" "}
          <NavLink to="/Profile/login" className="login-link">
            Log in here
          </NavLink>
        </p>
      </form>
    </div>
  );
}
