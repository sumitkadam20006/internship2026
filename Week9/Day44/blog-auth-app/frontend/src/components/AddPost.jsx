import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddPost() {
  const navigate = useNavigate();

  const [post, setPost] = useState({
    title: "",
    content: "",
  });

  const handleChange = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/posts",
        post,
        {
          withCredentials: true,
        }
      );

      alert(res.data.message);

      setPost({
        title: "",
        content: "",
      });

      navigate("/my-posts");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create post");
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>Create New Post</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Enter Post Title"
            value={post.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="content"
            rows="6"
            placeholder="Write your post..."
            value={post.content}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">Create Post</button>
        </form>
      </div>
    </div>
  );
}

export default AddPost;