import React from "react";

export default function Search() {
  return (
    <>
      <br />
      <div className="container">
        <h5>Search Products</h5>

        <div className="card-body p-0 mb-2 pt-2">
          <div className="form-group mb-0">
            <input
              className="form-control"
              id="elementsSearchInput"
              type="text"
              onkeyup="elementsSearch()"
              placeholder="Search Products..."
            />
          </div>
        </div>
      </div>
    </>
  );
}
