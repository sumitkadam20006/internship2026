import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function MyPosts() {
  const [posts, setPosts] = useState([]);

  // Fetch My Posts
  const getMyPosts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/posts/mine",
        {
          withCredentials: true,
        }
      );

      setPosts(res.data.posts);
    } catch (error) {
      alert(error.response?.data?.message || "Unable to fetch posts");
    }
  };

  useEffect(() => {
    getMyPosts();
  }, []);

  // Delete Post
  const deletePost = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmDelete) return;

    try {
      const res = await axios.delete(
        `http://localhost:5000/api/posts/${id}`,
        {
          withCredentials: true,
        }
      );

      alert(res.data.message);

      getMyPosts();
    } catch (error) {
      alert(error.response?.data?.message || "Delete Failed");
    }
  };

  return (
    <div className="posts-container">
      <h1>My Posts</h1>

      {posts.length === 0 ? (
        <h3>No Posts Found</h3>
      ) : (
        posts.map((post) => (
          <div className="post-card" key={post._id}>
            <h2>{post.title}</h2>

            <p>{post.content}</p>

            <div className="post-buttons">
              <Link to={`/edit/${post._id}`}>
                <button>Edit</button>
              </Link>

              <button
                className="delete-btn"
                onClick={() => deletePost(post._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default MyPosts;