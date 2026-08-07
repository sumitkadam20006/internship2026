import { useAuth } from "../context/AuthContext";
import "./Dashboard.css";

function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard">

      <div className="dashboard-card">

        <h1>Dashboard</h1>

        <div className="profile">

          <img
            src={
              user?.avatar ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="Profile"
          />

          <h2>{user?.name}</h2>

          <p>{user?.email}</p>

        </div>

        <div className="info">

          <div className="info-box">
            <h3>Authentication</h3>
            <p>JWT Authentication</p>
          </div>

          <div className="info-box">
            <h3>Database</h3>
            <p>MongoDB Connected</p>
          </div>

          <div className="info-box">
            <h3>Login Method</h3>
            <p>{user?.googleId ? "Google OAuth" : "Email & Password"}</p>
          </div>

        </div>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>

      </div>

    </div>
  );
}

export default Dashboard;