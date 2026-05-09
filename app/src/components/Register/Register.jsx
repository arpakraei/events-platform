// TODO: build a register form with relevant fields
// TODO: call register(email, password) from useAuth() on submit
// TODO: show a clear error message if registration fails
// TODO: redirect to the event list on success
import styles from "./Register.module.css";
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
    <div className={styles.container}>
      <h1 className={styles.title}>Register</h1>
      {err && <p className={styles.error}>{err}</p>}
      <form onSubmit={registerUser} className={styles.form}>
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />
        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
        <button className={styles.button}>Register</button>
      </form>
    </div>
  );
}
