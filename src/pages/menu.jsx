import React from "react";

export default function Menu() {
  return (
    <>
      <br />
      <div className="container">
        <div className="card-body p-0 mb-4 pt-0">
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

      <div className="container mb-4">
        <h6>All Categories</h6>
      </div>

      <CategorySlider />
      <div className="pt-2" />
      <div className="container mb-0">
        <h6>All Products</h6>
      </div>
      <ProductCardSection pagination={true} />
      <div className="pb-3" />
    </>
  );
}
