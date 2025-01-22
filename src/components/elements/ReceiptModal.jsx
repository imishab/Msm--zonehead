import React, { useState } from "react";

const ReceiptModal = ({ show, onClose, receiptData }) => {
  const handleWhatsAppShare = () => {
    if (!receiptData?.phone) {
      alert("Phone number is required");
      return;
    }

    // Format receipt text
    const receiptText =
      `MSM KOZHIKODE NORTH\n\n` +
      `Date: ${new Date().toLocaleDateString()}\n` +
      `Name: ${receiptData.name || "N/A"}\n` +
      `Mobile Number: ${receiptData.phone}\n` +
      `Amount: ₹${receiptData.amount}\n` +
      `Payment: ${receiptData.payment}\n` +
      `Payment Type: ${receiptData.paymenttype}`;

    // Create WhatsApp URL with pre-filled message
    const waNumber = receiptData.phone.replace(/\D/g, ""); // Remove non-digits
    const encodedText = encodeURIComponent(receiptText);
    const whatsappUrl = `https://wa.me/${waNumber}?text=${encodedText}`;

    // Open WhatsApp in new window
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div
      className={`modal fade ${show ? "show" : ""}`}
      style={{ display: show ? "block" : "none" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Share Receipt</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body">
            <div className="card">
              <div className="card-body">
                <div className="text-center fw-bold fs-4 mb-4">
                  MSM KOZHIKODE NORTH
                </div>

                <div className="mb-3">
                  <div className="row mb-2">
                    <div className="col-4">Date:</div>
                    <div className="col-8 text-end">
                      {new Date().toLocaleDateString()}
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div className="col-4">Name:</div>
                    <div className="col-8 text-end">
                      {receiptData?.name || "N/A"}
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div className="col-4">Mobile Number:</div>
                    <div className="col-8 text-end">
                      {receiptData?.phone || "N/A"}
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div className="col-4">Amount:</div>
                    <div className="col-8 text-end">
                      ₹{receiptData?.amount || "0"}
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div className="col-4">Payment:</div>
                    <div className="col-8 text-end">
                      {receiptData?.payment || "N/A"}
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div className="col-4">Payment Type:</div>
                    <div className="col-8 text-end">
                      {receiptData?.paymenttype || "N/A"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-success"
              onClick={handleWhatsAppShare}
            >
              Share via WhatsApp
            </button>
          </div>
        </div>
      </div>
      {show && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

export default ReceiptModal;
