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
  const [validationErrorMessage, setValidationErrorMessage] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();
  function validate() {
    if (!email || !password) {
      setValidationErrorMessage("Email and Password are required");
      return false;
    }
    if (password.length < 8) {
      setValidationErrorMessage("Password must be minimum 8 characters");
      return false;
    }
    if (!/\d/.test(password)) {
      setValidationErrorMessage("Password must contain at least one number");
      return false;
    }
    if (!/[a-zA-Z]/.test(password)) {
      setValidationErrorMessage("Password must contain at least one letter");
      return false;
    }
    if (!/[!@#$%^&*]/.test(password)) {
      setValidationErrorMessage(
        "Password must contain at least one special character",
      );
      return false;
    }

    return true;
  }

  async function registerUser(e) {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    try {
      await register(email, password);
      navigate("/events");
    } catch (err) {
      setError(err.message);
    }
  }
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Register</h1>
        {validationErrorMessage && <p>{validationErrorMessage}</p>}
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
    </main>
  );
}
