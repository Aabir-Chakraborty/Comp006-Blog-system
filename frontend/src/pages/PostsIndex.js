import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function PostsIndex({ user }) {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch posts from API
  const fetchPosts = async (searchTerm = "") => {
    try {
      const res = await fetch(`/posts${searchTerm ? `?search=${encodeURIComponent(searchTerm)}` : ""}`);
      const data = await res.json();
      if (data.success) {
        setPosts(data.posts);
      } else {
        setError(data.message || "Failed to load posts.");
      }
    } catch {
      setError("Server error. Please try again.");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => setSearch(e.target.value);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchPosts(search);
  };

  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      const res = await fetch(`/posts/${postId}`, {
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

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>All Posts</h1>
        {user && (
          <Link className="btn btn-success" to="/posts/create">
            Create Post
          </Link>
        )}
      </div>

      <div className="mb-4">
        <form onSubmit={handleSearchSubmit}>
          <div className="input-group">
            <input
              className="form-control"
              type="text"
              name="search"
              placeholder="Search by title or tags..."
              value={search}
              onChange={handleSearchChange}
            />
            <button className="btn btn-outline-secondary" type="submit">
              Search
            </button>
          </div>
        </form>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {posts.length > 0 ? (
        <div className="row">
          {posts.map((post) => (
            <div className="col-md-6 mb-4" key={post._id}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">
                    {post.content.substring(0, 100)}...
                  </p>
                  <div className="mb-2">
                    {post.tags.map((tag, idx) => (
                      <span className="badge bg-secondary me-1" key={idx}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="card-text">
                    <small className="text-muted">
                      Posted by {post.createdBy?.username || "Unknown"} on{" "}
                      {new Date(post.createdAt).toLocaleDateString()}
                    </small>
                  </p>
                </div>
                <div className="card-footer bg-transparent">
                  <Link
                    className="btn btn-primary btn-sm"
                    to={`/posts/${post._id}`}
                  >
                    Read More
                  </Link>
                  {user && user._id === post.createdBy?._id && (
                    <>
                      <Link
                        className="btn btn-warning btn-sm ms-2"
                        to={`/posts/${post._id}/edit`}
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-danger btn-sm ms-2"
                        type="button"
                        onClick={() => handleDelete(post._id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-info">No posts found.</div>
      )}
    </div>
  );
}

export default PostsIndex;