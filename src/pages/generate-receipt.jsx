import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGenerateReceiptMutation } from "../redux/api/ZoneApi";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function GenerateReceipt() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [payment, setPayment] = useState(""); // State for payment status
  const [paymenttype, setPaymenttype] = useState(""); // State for payment type

  const [generateReceipt, { isLoading, isSuccess, isError }] =
    useGenerateReceiptMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Receipt generated successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
      });
      router.push("/reports");
    }
  }, [isSuccess, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await generateReceipt({
        name,
        phone,
        amount,
        payment,
        paymenttype,
      }).unwrap();
      // Reset form fields
      setName("");
      setPhone("");
      setAmount("");
      setPayment("");
      setPaymenttype("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate receipt.");
    }
  };

  return (
    <div className="container pt-4 pb-4">
      <div className="d-flex ">
        <Link href="/">
          <ArrowLeft color="black" size={19} className="me-4 mt-1" />
        </Link>
        <h5 className="mb-3">Receipt Generator</h5>
      </div>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="name">
                Name
              </label>
              <input
                className="form-control"
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter the name"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="phone">
                Mobile Number
              </label>
              <input
                className="form-control"
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="amount">
                Amount (₹)
              </label>
              <input
                className="form-control"
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="₹"
                required
              />
            </div>
            <div>
              <label className="form-label">Payment Status</label>
              <div className="row g-2 mb-3">
                <div className="col-6">
                  <div className="single-plan-check shadow-sm active-effect">
                    <div className="form-check mb-0">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="payment"
                        value="Paid"
                        id="paid"
                        checked={payment === "Paid"}
                        onChange={(e) => setPayment(e.target.value)}
                      />
                      <label className="form-check-label" htmlFor="paid">
                        Paid
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="single-plan-check shadow-sm active-effect">
                    <div className="form-check mb-0">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="payment"
                        value="Not Paid"
                        id="npaid"
                        checked={payment === "Not Paid"}
                        onChange={(e) => setPayment(e.target.value)}
                      />
                      <label className="form-check-label" htmlFor="npaid">
                        Not Paid
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <label className="form-label">Payment Type</label>
              <div className="row g-2 mb-4">
                <div className="col-6">
                  <div className="single-plan-check shadow-sm active-effect">
                    <div className="form-check mb-0">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="paymenttype"
                        value="Google Pay"
                        id="GooglePay"
                        checked={paymenttype === "Google Pay"}
                        onChange={(e) => setPaymenttype(e.target.value)}
                      />
                      <label className="form-check-label" htmlFor="GooglePay">
                        Google Pay
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="single-plan-check shadow-sm active-effect">
                    <div className="form-check mb-0">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="paymenttype"
                        value="Cash"
                        id="Cash"
                        checked={paymenttype === "Cash"}
                        onChange={(e) => setPaymenttype(e.target.value)}
                      />
                      <label className="form-check-label" htmlFor="Cash">
                        Cash
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              className="btn btn-primary w-100 d-flex align-items-center justify-content-center"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Generating..." : "Generate Receipt"}
            </button>
            {isError && (
              <p className="text-danger mt-3">
                {isError?.data?.message || "An error occurred"}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
