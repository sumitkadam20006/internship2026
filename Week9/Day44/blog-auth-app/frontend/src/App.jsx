import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import AddPost from "./components/AddPost";
import MyPosts from "./components/MyPosts";
import EditPost from "./components/EditPost";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-post" element={<AddPost />} />
        <Route path="/my-posts" element={<MyPosts />} />
        <Route path="/edit/:id" element={<EditPost />} />
      </Routes>
    </>
  );
}

export default App;