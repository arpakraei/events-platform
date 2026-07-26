import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";

function HomePage() {
  return (
    <main className={styles.home}>
      <section className={styles.hero}>
        <h1 className={styles.title}>Discover Events Near You</h1>

        <p className={styles.subtitle}>
          Find exciting events, book your tickets, and enjoy great experiences.
        </p>

        <div className={styles.actions}>
          <Link className={styles.primaryButton} to="/events">
            Browse Events
          </Link>

          <Link className={styles.secondaryButton} to="/register">
            Register
          </Link>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
