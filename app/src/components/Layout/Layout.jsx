import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import style from "./Layout.module.css";

export default function Layout() {
  const { user, logout } = useAuth();
  return (
    <div className={style.layout}>
      <header className={style.header}>
        {user ? (
          <nav className={style.nav}>
            <a href="/events" className={style.navLink}>
              Events
            </a>
            <a href="/cart" className={style.navLink}>
              Cart
            </a>

            <a onClick={logout} className={style.navLink}>
              Sign out
            </a>
          </nav>
        ) : (
          <nav className={style.nav}>
            <a href="/events" className={style.navLink}>
              Events
            </a>
            <a href="/register" className={style.navLink}>
              Register
            </a>
            <a href="/login" className={style.navLink}>
              Login
            </a>
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
