import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "react-feather";

export default function ViewReceipt() {
  const location = useLocation();
  const navigate = useNavigate();
  const receipt = location.state?.receipt;

  if (!receipt) {
    return <p className="text-center mt-5">No receipt found.</p>;
  }

  return (
    <div className="container">
      <div className="d-flex align-items-center my-3">
        <ArrowLeft
          color="black"
          size={19}
          className="me-3"
          onClick={() => navigate(-1)}
          style={{ cursor: "pointer" }}
        />
        <h5>Receipt Details</h5>
      </div>

      <div className="card p-4 shadow-sm">
        <h3 className="text-center">MSM NORTH KOZHIKODE</h3>
        <hr />
        <p>
          <strong>Date:</strong>{" "}
          {new Date(receipt.createdAt).toLocaleDateString()}
        </p>
        <p>
          <strong>Name:</strong> {receipt.name}
        </p>
        <p>
          <strong>Phone:</strong> {receipt.phone}
        </p>
        <p>
          <strong>Amount:</strong> ₹{receipt.amount}
        </p>
        <p>
          <strong>Payment:</strong> {receipt.payment}
        </p>
        <p>
          <strong>Payment Type:</strong> {receipt.paymenttype}
        </p>

        <div className="d-flex justify-content-between mt-3">
          <button className="btn btn-primary" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
