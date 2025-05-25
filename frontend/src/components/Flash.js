import React, { useState } from "react";

function Flash({ messages }) {
  const [showError, setShowError] = useState(true);
  const [showSuccess, setShowSuccess] = useState(true);

  return (
    <>
      {messages?.error?.length && showError && (
        <div className="alert alert-danger alert-dismissible fade show">
          {messages.error.map((msg, idx) => (
            <div key={idx}>{msg}</div>
          ))}
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowError(false)}
          ></button>
        </div>
      )}
      {messages?.success?.length && showSuccess && (
        <div className="alert alert-success alert-dismissible fade show">
          {messages.success.map((msg, idx) => (
            <div key={idx}>{msg}</div>
          ))}
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowSuccess(false)}
          ></button>
        </div>
      )}
    </>
  );
}

export default Flash;