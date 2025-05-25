import React from "react";

function ServerError({ error }) {
  return (
    <div className="container mt-5">
      <div className="alert alert-danger text-center">
        <h1>500 - Server Error</h1>
        <p>Something went wrong on our end.</p>
        {error && (
          <pre className="text-start mx-auto" style={{ maxWidth: 600, whiteSpace: "pre-wrap" }}>
            {error.stack}
          </pre>
        )}
        <a className="btn btn-primary mt-3" href="/posts">
          Go to Homepage
        </a>
      </div>
    </div>
  );
}


export default ServerError;