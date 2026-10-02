import { useState, useEffect } from "react";
import "./Navbar.css";

const stepLabels = [
  "Personal Info",
  "Address",
  "Education",
  "Preferences",
  "Review"
];

function Navbar({ currentStep }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function toggleDark() {
    const next = !darkMode;
    setDarkMode(next);
    document.body.classList.toggle("dark-mode", next);
  }

  function today() {
    return new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  }

  const percentage = Math.round((currentStep / 5) * 100);

  return (
    <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
      <div className="navbar-inner">
        <div className="navbar-left">
          <span className="navbar-logo">📝</span>
          <span className="navbar-brand">Registration Portal</span>
        </div>

        <ul className={`navbar-links${menuOpen ? " open" : ""}`}>
          <li><a href="#" className="nav-link active">Home</a></li>
          <li><a href="#form" className="nav-link">Registration</a></li>
          <li><a href="#" className="nav-link">About</a></li>
          <li><a href="#" className="nav-link">Contact</a></li>
        </ul>

        <div className="navbar-right">
          <div className="navbar-step-info">
            <span className="step-badge">{currentStep === 0 ? "Start" : `Step ${currentStep} of 5`}</span>
            <span className="step-pct">{percentage}%</span>
          </div>
          <button
            className="theme-toggle"
            onClick={toggleDark}
            title="Toggle Dark Mode"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
          <span className="navbar-date">{today()}</span>
          <div className="navbar-avatar">👤</div>
          <button
            className={`hamburger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
