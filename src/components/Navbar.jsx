import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <nav className="navbar-container" aria-label="Main navigation">
        <NavLink to="/" className="logo">
          🍔 <span>Food</span> Explorer
        </NavLink>

        <div className="nav-links">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/foods"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Explore Foods
          </NavLink>

          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            ❤️ Favorites
          </NavLink>

          <NavLink
            to="/feedback"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Feedback
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;