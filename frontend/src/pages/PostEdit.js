import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function PostEdit() {
  const { id } = useParams();
  const [form, setForm] = useState({
    title: "",
    content: "",
    tags: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the existing post data
    fetch(`/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setForm({
            title: data.post.title,
            content: data.post.content,
            tags: data.post.tags.join(", "),
          });
        } else {
          setError(data.message || "Failed to load post.");
        }
      })
      .catch(() => setError("Server error. Please try again."));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await fetch(`/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess("Post updated successfully!");
        setTimeout(() => navigate(`/posts/${id}`), 1200);
      } else {
        setError(data.message || "Failed to update post.");
      }
    } catch {
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-header">
            <h4>Edit Post</h4>
          </div>
          <div className="card-body">
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="title">
                  Title
                </label>
                <input
                  className="form-control"
                  id="title"
                  type="text"
                  name="title"
                  required
                  value={form.title}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="content">
                  Content
                </label>
                <textarea
                  className="form-control"
                  id="content"
                  name="content"
                  rows="5"
                  required
                  value={form.content}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="tags">
                  Tags (comma separated)
                </label>
                <input
                  className="form-control"
                  id="tags"
                  type="text"
                  name="tags"
                  value={form.tags}
                  onChange={handleChange}
                />
              </div>
              <button className="btn btn-primary" type="submit">
                Update Post
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostEdit;