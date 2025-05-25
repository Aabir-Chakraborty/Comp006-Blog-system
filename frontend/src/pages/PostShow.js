import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

function PostShow({ user }) {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch post data from API
    fetch(`/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setPost(data.post);
        else setError(data.message || "Post not found");
      })
      .catch(() => setError("Failed to load post."));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      const res = await fetch(`/posts/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        navigate("/posts");
      } else {
        setError(data.message || "Delete failed");
      }
    } catch {
      setError("Server error. Could not delete post.");
    }
  };

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!post) return <div>Loading...</div>;

  const isOwner = user && post.createdBy && user._id === post.createdBy._id;

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h1 className="card-title">{post.title}</h1>
        <div className="mb-3">
          {post.tags.map((tag, idx) => (
            <span className="badge bg-secondary me-1" key={idx}>
              {tag}
            </span>
          ))}
        </div>
        <p className="card-text">{post.content}</p>
        <p className="card-text">
          <small className="text-muted">
            Posted by {post.createdBy?.username || "Unknown"} on{" "}
            {new Date(post.createdAt).toLocaleDateString()}
          </small>
        </p>
      </div>
      <div className="card-footer bg-transparent">
        <Link className="btn btn-primary" to="/posts">
          Back to Posts
        </Link>
        {isOwner && (
          <>
            <Link
              className="btn btn-warning ms-2"
              to={`/posts/${post._id}/edit`}
            >
              Edit
            </Link>
            <button
              className="btn btn-danger ms-2"
              onClick={handleDelete}
              type="button"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default PostShow;