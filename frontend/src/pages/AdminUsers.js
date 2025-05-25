import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/admin/users", { credentials: "include" });
        const data = await res.json();
        if (data.success) {
          setUsers(data.users);
        } else {
          setError(data.message || "Failed to load users.");
        }
      } catch {
        setError("Server error. Please try again.");
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>All Users</h1>
        <Link className="btn btn-primary" to="/posts">Back to Posts</Link>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      {users.length ? (
        <table className="table table-hover table-striped">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Email</th>
              <th>Admin Status</th>
              <th>Registered On</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user._id}>
                <td>{idx + 1}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  {user.isAdmin ? (
                    <span className="badge bg-success">Admin</span>
                  ) : (
                    <span className="badge bg-secondary">User</span>
                  )}
                </td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="alert alert-info">No users found.</div>
      )}
    </div>
  );
}

export default AdminUsers;