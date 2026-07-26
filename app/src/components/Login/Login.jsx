// TODO: build a login form with relevant fields
// TODO: call login(email, password) from useAuth() on submit
// TODO: show a clear error message if login fails
// TODO: redirect to the event list on success
import styles from "./Login.module.css";
import { useAuth } from "../../context/AuthContext";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [validationErrorMessage, setValidationErrorMessage] = useState("");

  function validate() {
    if (!email || !password) {
      setValidationErrorMessage("Email and Password are required");
      return false;
    }
    return true;
  }

  async function loginUser(e) {
    e.preventDefault();
    const isValidate = validate();
    if (!isValidate) return;
    try {
      await login(email, password);
      navigate("/events");
    } catch (err) {
      setError(err.message);
    }
  }
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Login</h1>
        {err && <p className={styles.error}>{err}</p>}
        {validationErrorMessage && <p>{validationErrorMessage}</p>}
        <form onSubmit={loginUser} className={styles.form}>
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
          <button className={styles.button}>Login</button>
        </form>
      </div>
    </main>
  );
}
