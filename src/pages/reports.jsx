import Link from "next/link";
import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { ArrowLeft, ArrowDownToLine, Share, Trash2, Eye } from "lucide-react";
import { useGetAllReceiptsQuery } from "../redux/api/ZoneApi";
import { Modal, Button } from "react-bootstrap";
import { formatDate } from "../utils/formateDate"; // Adjust the path as needed

export default function index() {
  const { data: receipts, isLoading } = useGetAllReceiptsQuery("");
  const [showModal, setShowModal] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  const handleOpenModal = (receipt) => {
    setSelectedReceipt(receipt);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedReceipt(null);
  };

  return (
    <>
      <div className="pt-3" />
      <div className="container">
        <div className="d-flex ">
          <Link href="/">
            <ArrowLeft color="black" size={19} className="me-4 mt-1" />
          </Link>
          <h5 className="mb-3">All Receipts</h5>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
              <div className="dataTable-top">
                <div className="dataTable-search">
                  <input
                    className="dataTable-input"
                    placeholder="Search"
                    type="text"
                  />
                </div>
              </div>
              <div className="table-responsive">
                <div className="dataTable-container">
                  <table className="w-100 dataTable-table" id="dataTable">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>User Details</th>
                        <th>Amount</th>
                        <th>Payment</th>
                        <th>Payment Type</th>
                        <th>Manage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {isLoading ? (
                        <tr>
                          <td colSpan={8} className="text-center">
                            <div className="loader-container d-flex">
                              <div
                                className="spinner-border spinner-border-sm text-dark me-2"
                                role="status"
                              ></div>
                              <p className="mt-3">Please wait...</p>
                            </div>
                          </td>
                        </tr>
                      ) : receipts?.length > 0 ? (
                        receipts.map((receipt, index) => (
                          <tr key={receipt._id}>
                            <td>{index + 1}</td>
                            <td>
                              <p>
                                <strong>Name :</strong> {receipt.name || "N/A"}{" "}
                                <br />
                                <strong>Phone :</strong>{" "}
                                {receipt.phone || "N/A"}
                              </p>
                            </td>
                            <td>₹{receipt.amount}</td>
                            <td
                              style={{
                                color:
                                  receipt.payment === "Paid" ? "green" : "red",
                              }}
                            >
                              {receipt.payment}
                            </td>

                            <td>{receipt.paymenttype}</td>
                            <td>
                              <div className="d-flex">
                                <Eye
                                  size={16}
                                  onClick={() => handleOpenModal(receipt)}
                                  style={{ cursor: "pointer" }}
                                  className="me-3"
                                />
                                <Trash2
                                  size={16}
                                  color="red"
                                  onClick={() => handleOpenModal(receipt)}
                                  style={{ cursor: "pointer" }}
                                  className="me-3"
                                />
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={8} className="text-center">
                            No receipts found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="dataTable-bottom">
                <div className="dataTable-info">1 to 10 entries</div>
                <div className="dataTable-pagination">{/* Pagination */}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Receipt Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: 15 }}>Receipt Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedReceipt && (
            // <div className="card p-3 receipt-card">
            //   <h5 className="text-center">MSM KOZHIKODE NORTH</h5>
            //   <p className="mt-4">
            //     <strong>Name:</strong> {selectedReceipt.name}
            //   </p>
            //   <p className="mt-4">
            //     <strong>Date:</strong> {formatDate(selectedReceipt.createdAt)}
            //   </p>
            //   <p>
            //     <strong>Phone:</strong> {selectedReceipt.phone}
            //   </p>
            //   <button className="text-right btn btn-dark ">
            //     <strong>Amount:</strong> ₹{selectedReceipt.amount}
            //   </button>
            // </div>
            <section className="">
              <div className="h-full">
                {/* Card */}
                <div className="max-w-[460px] mx-auto">
                  <div className="bg-white shadow-lg rounded-lg mt-9">
                    {/* Card header */}
                    <header className="text-center px-5 pb-5">
                      {/* Avatar */}
                      <svg
                        className="inline-flex -mt-9 w-[72px] h-[72px] fill-current rounded-full border-4 border-white box-content shadow mb-3"
                        viewBox="0 0 72 72"
                      >
                        M
                      </svg>
                      {/* Card name */}
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        MSM KOZHIKODE NORTH.
                      </h3>
                      <div className="text-sm font-medium text-gray-500">
                        {formatDate(selectedReceipt.createdAt)}
                      </div>
                    </header>
                    {/* Card body */}
                    <div className="bg-gray-100  px-5 py-6">
                      {/* <div className="text-sm mb-6 text-center">
                        <strong className="font-semibold">$2.700</strong> due
                        Jan 27, 2022
                      </div> */}
                      <form className="space-y-3">
                        <div className="flex rounded">
                          <div className="flex-grow">
                            <label htmlFor="" className="mb-1 reciept-label">
                              Name
                            </label>
                            <input
                              name="card-nr"
                              className="text-sm text-gray-800 bg-white rounded-l leading-5 py-2 px-3 placeholder-gray-400 w-full border border-transparent focus:border-indigo-300 focus:ring-0"
                              type="text"
                              placeholder="Card Number"
                              aria-label="Card Number"
                              disabled
                              value={selectedReceipt.name}
                            />
                            <label htmlFor="" className="mb-1 reciept-label">
                              Phone Number
                            </label>
                            <input
                              name="card-nr"
                              className="text-sm text-gray-800 bg-white rounded-l leading-5 py-2 px-3 placeholder-gray-400 w-full border border-transparent focus:border-indigo-300 focus:ring-0"
                              type="text"
                              placeholder="Card Number"
                              aria-label="Card Number"
                              value={selectedReceipt.phone}
                            />
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <button
                            type="submit"
                            className="font-semibold text-sm w-50 inline-flex items-center justify-center px-3 py-2 border border-transparent rounded leading-5 transition duration-150 ease-in-out bg-indigo-500 hover:bg-indigo-600 text-white focus:outline-none focus-visible:ring-2"
                          >
                            ₹{selectedReceipt.amount}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              // Handle sharing logic here
              alert("Sharing receipt!");
              handleCloseModal();
            }}
          >
            Share
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
