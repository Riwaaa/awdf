import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar({ darkMode, setDarkMode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const loggedIn = Boolean(localStorage.getItem("token"));

  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  const isActive = (path) => location.pathname === path;

  return (
    <nav>
      <Link to="/" className="nav-brand">
        Riwa Ramani
      </Link>

      <div className="nav-links">
        <Link className={isActive("/") ? "active" : ""} to="/">
          Home
        </Link>

        <Link
          className={isActive("/task-manager") ? "active" : ""}
          to="/task-manager"
        >
          Task Manager
        </Link>

        <Link className={isActive("/contact") ? "active" : ""} to="/contact">
          Contact
        </Link>

        {!loggedIn ? (
          <Link
            className={`nav-login ${isActive("/login") ? "active" : ""}`}
            to="/login"
          >
            Login
          </Link>
        ) : (
          <button className="nav-logout" onClick={logout} type="button">
            Logout
          </button>
        )}

        <button
          className="theme-button"
          type="button"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
