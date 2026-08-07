import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">

      <div className="hero">

        <h1>Welcome to MERN Authentication</h1>

        <p>
          Secure Login, Registration, JWT Authentication,
          MongoDB Database and Google Authentication using
          MERN Stack.
        </p>

        <div className="hero-buttons">

          <Link to="/login">
            <button className="login-btn">
              Login
            </button>
          </Link>

          <Link to="/register">
            <button className="register-btn">
              Register
            </button>
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Home;