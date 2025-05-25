import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AdminPosts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/admin/posts", { credentials: "include" });
      const data = await res.json();
      if (data.success) {
        setPosts(data.posts);
      } else {
        setError(data.message || "Failed to load posts.");
      }
    } catch {
      setError("Server error. Please try again.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      const res = await fetch(`/admin/posts/${postId}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setPosts(posts.filter((p) => p._id !== postId));
      } else {
        setError(data.message || "Failed to delete post.");
      }
    } catch {
      setError("Server error. Please try again.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="mb-4 text-center">All Blog Posts (Admin View)</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {posts.length ? (
        <table className="table table-hover table-striped">
          <thead className="table-dark">
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post._id}>
                <td>{post.title}</td>
                <td>{post.createdBy ? post.createdBy.username : "Unknown"}</td>
                <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(post._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="alert alert-info text-center">No posts found.</div>
      )}
    </div>
  );
}

export default AdminPosts;