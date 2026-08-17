import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">

        <NavLink to="/" className="logo">
          🍴 Food<span>Explorer</span>
        </NavLink>

        <div className="nav-links">

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            🏠 Home
          </NavLink>

          <NavLink
            to="/foods"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            🍕 Food Explorer
          </NavLink>

          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            ❤️ Favorite Foods
          </NavLink>

          <NavLink
            to="/feedback"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            💬 Feedback
          </NavLink>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;