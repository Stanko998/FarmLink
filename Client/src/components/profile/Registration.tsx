import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../../assets/Style/components/profile/Registration.scss";

export default function Registration(): any {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<null | string>(null);
  // const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5050/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const records = await res.json();
      if (!records.success) {
        setError(records.error);
        throw new Error(records.error);
      }
      setError(null);
    } catch (error) {
      console.error("doslo je do greske " + error);
    }
    // TODO: Implementovati logiku za uspesno registovanje
  };

  return (
    <div className="registration-container">
      <h2>Register</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
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
        {/* <input
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="input-field"
        /> */}
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
