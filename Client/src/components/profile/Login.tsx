import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../../assets/Style/components/profile/Login.scss";

export default function Login(): any {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<null | string>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5050/users/login", {
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

    // TODO: Implementovati logiku za uspesno logovanje
    // alert(`Welcome, ${username}!`);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your username"
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
        <button type="submit" className="btn-submit">
          Login
        </button>
      </form>
      <p>
        Don't have an account?{" "}
        <NavLink to="/registration">Register here</NavLink>
      </p>
    </div>
  );
}
