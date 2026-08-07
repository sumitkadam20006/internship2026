import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <h2>Blog App</h2>
      </div>

      <ul className="nav-links">
        <li>
          <Link to="/">Login</Link>
        </li>

        <li>
          <Link to="/register">Register</Link>
        </li>

        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>

        <li>
          <Link to="/add-post">Add Post</Link>
        </li>

        <li>
          <Link to="/my-posts">My Posts</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;