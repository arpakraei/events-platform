// TODO: build a register form with relevant fields
// TODO: call register(email, password) from useAuth() on submit
// TODO: show a clear error message if registration fails
// TODO: redirect to the event list on success
import { useAuth } from "../../context/AuthContext";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  async function registerUser(e) {
    e.preventDefault();
    try {
      await register(email, password);
      navigate("/events");
    } catch (err) {
      setError(err.message);
    }
  }
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Register</h1>
      {err && <p>{err}</p>}
      <form onSubmit={registerUser}>
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
        <button>Register</button>
      </form>
    </div>
  );
}
