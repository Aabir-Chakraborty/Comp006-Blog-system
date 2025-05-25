import React from "react";
import { Link } from "react-router-dom";

function UsersIndex({ users = [] }) {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>All Users</h1>
        <Link className="btn btn-primary" to="/posts">
          Back to Posts
        </Link>
      </div>

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
            {users.map((user, index) => (
              <tr key={user._id || index}>
                <td>{index + 1}</td>
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

export default UsersIndex;