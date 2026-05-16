import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main>
      <h1>Page not found</h1>
      <p>The page you requested is not available.</p>
      <Link to="/events">Back to events</Link>
    </main>
  );
}

export default NotFound;
