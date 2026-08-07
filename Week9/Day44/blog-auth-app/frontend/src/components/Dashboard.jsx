import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );

      localStorage.removeItem("user");

      alert("Logout Successful");

      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Logout Failed");
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1>Dashboard</h1>

        <h2>Welcome, {user?.name}</h2>

        <p>
          <strong>Email:</strong> {user?.email}
        </p>

        <div className="dashboard-buttons">
          <Link to="/add-post">
            <button>Create New Post</button>
          </Link>

          <Link to="/my-posts">
            <button>My Posts</button>
          </Link>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;