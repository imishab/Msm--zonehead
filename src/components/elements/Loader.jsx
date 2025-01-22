import React from "react";

export default function Loader() {
  return (
    <div className="loader-container d-flex ">
      <div
        className="spinner-border spinner-border-sm text-dark me-2"
        role="status"
      ></div>
      <p className="mt-3">Please wait...</p>
    </div>
  );
}
