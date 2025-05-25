import React from "react";

function NotFound() {
  return (
    <div className="container mt-5">
      <div className="alert alert-danger text-center">
        <h1>404 - Page Not Found</h1>
        <p>The page you requested doesn't exist.</p>
        <a className="btn btn-primary mt-3" href="/posts">
          Go to Homepage
        </a>
      </div>
    </div>
  );
}

export default NotFound;