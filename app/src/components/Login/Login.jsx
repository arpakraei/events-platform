// TODO: build a login form with relevant fields
// TODO: call login(email, password) from useAuth() on submit
// TODO: show a clear error message if login fails
// TODO: redirect to the event list on success

import { useAuth } from "../../context/AuthContext";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  async function loginUser(e) {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/events");
    } catch (err) {
      setError(err.message);
    }
  }
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Login</h1>
      {err && <p>{err}</p>}
      <form onSubmit={loginUser}>
        <label htmlFor="id">Email</label>
        <input
          type="email"
          id="email"
          placeholder="email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button>Login</button>
      </form>
    </div>
  );
}
