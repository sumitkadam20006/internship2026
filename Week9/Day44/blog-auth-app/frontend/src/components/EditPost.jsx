import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState({
    title: "",
    content: "",
  });

  // Fetch all posts and find the selected one
  const fetchPost = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/posts/mine",
        {
          withCredentials: true,
        }
      );

      const selectedPost = res.data.posts.find(
        (p) => p._id === id
      );

      if (selectedPost) {
        setPost({
          title: selectedPost.title,
          content: selectedPost.content,
        });
      }

    } catch (error) {
      alert(error.response?.data?.message || "Error loading post");
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const handleChange = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `http://localhost:5000/api/posts/${id}`,
        post,
        {
          withCredentials: true,
        }
      );

      alert(res.data.message);

      navigate("/my-posts");

    } catch (error) {
      alert(error.response?.data?.message || "Update Failed");
    }
  };

  return (
    <div className="container">
      <div className="form-box">

        <h2>Edit Post</h2>

        <form onSubmit={handleUpdate}>

          <input
            type="text"
            name="title"
            placeholder="Title"
            value={post.title}
            onChange={handleChange}
            required
          />

          <textarea
            rows="6"
            name="content"
            placeholder="Content"
            value={post.content}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">
            Update Post
          </button>

        </form>

      </div>
    </div>
  );
}

export default EditPost;