import { Outlet } from "react-router-dom";
import style from "./Layout.module.css";

export default function Layout() {
  return (
    <div className={style.layout}>
      <header className={style.header}>
        <nav className={style.nav}>
          <a href="#events" className={style.navLink}>
            Events
          </a>
          <a href="#cart" className={style.navLink}>
            Cart
          </a>
          <a href="#login" className={style.navLink}>
            Login
          </a>
        </nav>
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
