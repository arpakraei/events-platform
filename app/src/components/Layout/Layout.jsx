import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import style from "./Layout.module.css";

export default function Layout() {
  const { user, logout } = useAuth();
  return (
    <div className={style.layout}>
      <header className={style.header}>
        {user ? (
          <nav className={style.nav}>
            <Link to="/events" className={style.navLink}>
              Events
            </Link>

            <Link to="/cart" className={style.navLink}>
              Cart
            </Link>

            <a onClick={logout} className={style.navLink}>
              Sign out
            </a>
          </nav>
        ) : (
          <nav className={style.nav}>
            <Link to="/events" className={style.navLink}>
              Events
            </Link>
            <Link to="/cart" className={style.navLink}>
              Cart
            </Link>
            <Link to="/register" className={style.navLink}>
              Register
            </Link>

            <Link to="/login" className={style.navLink}>
              Login
            </Link>
          </nav>
        )}
      </header>

      <main className={style.main}>
        <Outlet />
      </main>

      <footer className={style.footer}>
        <p className={style.copyright}>
          © 2026 HackYourFuture. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
