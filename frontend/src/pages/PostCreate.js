import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function PostCreate() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    tags: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await axios.post(
        "/posts/create",
        form,
        { withCredentials: true }
      );

      if (res.data.success) {
        setSuccess("Post created successfully!");
        setTimeout(() => navigate("/posts"), 1200);
      } else {
        setError(res.data.message || "Failed to create post.");
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
            <h4>Create New Post</h4>
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
                  placeholder="e.g. nodejs, express, mongodb"
                  value={form.tags}
                  onChange={handleChange}
                />
              </div>
              <button className="btn btn-primary" type="submit">
                Create Post
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCreate;