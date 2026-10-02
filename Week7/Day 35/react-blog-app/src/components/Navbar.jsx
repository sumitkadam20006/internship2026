import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiSearch, FiMoon, FiSun } from "react-icons/fi";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSearchClick = () => {
    const el = document.getElementById("search-input");
    if (el) {
      el.focus();
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
      <div className="nav-container">
        <div className="nav-brand">
          <Link to="/" className="nav-logo">
            <span className="nav-logo-dot" />
            <span>ReactBlog</span>
          </Link>
        </div>

        <div className="nav-links">
          <Link to="/" className={`nav-link${location.pathname === "/" ? " active" : ""}`}>
            Home
          </Link>
          <a href="https://jsonplaceholder.typicode.com/posts" target="_blank" rel="noopener noreferrer" className="nav-link">
            API
          </a>
          <Link to="/" className="nav-link">
            Blog
          </Link>
        </div>

        <div className="nav-actions">
          <button className="nav-icon-btn" onClick={handleSearchClick} aria-label="Search">
            <FiSearch />
          </button>

          <button
            className="nav-icon-btn"
            onClick={() => setDarkMode((prev) => !prev)}
            aria-label={darkMode ? "Light mode" : "Dark mode"}
          >
            {darkMode ? <FiSun /> : <FiMoon />}
          </button>

          <div className="nav-avatar-wrapper">
            <img
              className="nav-avatar"
              src="https://ui-avatars.com/api/?name=Atharv+Pote&background=2563eb&color=fff&size=40"
              alt="Atharv Pote"
              width="32"
              height="32"
            />
          </div>

          <button className="nav-icon-btn nav-mobile-toggle" aria-label="Menu">
            <span className="menu-dot-row">
              <span className="menu-dot" />
              <span className="menu-dot" />
              <span className="menu-dot" />
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;