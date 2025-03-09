import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { ArrowLeft, Download, Trash2, Eye, Share2 } from "lucide-react";
import {
  useGetAllReceiptsQuery,
  useDeleteReceiptMutation,
} from "../redux/api/ZoneApi";
import { Modal, Button } from "react-bootstrap";
import { formatDate } from "../utils/formateDate";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function Reports() {
  const {
    data: receipts,
    isLoading,
    isSuccess,
    refetch,
  } = useGetAllReceiptsQuery("");

  const [deleteReceipt, { isLoading: isDeleting }] = useDeleteReceiptMutation();
  const router = useRouter();

  // Handle receipt deletion
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this receipt!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
      customClass: {
        confirmButton: "btn btn-danger",
        cancelButton: "btn btn-secondary",
      },
    });

    if (result.isConfirmed) {
      try {
        await deleteReceipt(id).unwrap();
        toast.success("Receipt deleted successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
        });
        refetch();
      } catch {
        toast.error("Failed to delete receipt. Please try again.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
        });
      }
    }
  };

  const handleOpenReceipt = (id) => {
    router.push(`/receipt/${id}`);
  };

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

  const handleDownloadPDF = async (receipt) => {
    const doc = new jsPDF("p", "mm", "a4"); // Use A4 page size (standard size for PDF)
    const receiptElement = document.createElement("div");

    receiptElement.innerHTML = `
    <div style="padding: 20px; max-width: 1000px; margin: auto; border: 1px solid #000; border-radius: 10px; background-color: #fff;">
      <h2 style="text-align: center; color: #333;"> MSM NORTH KOZHIKODE</h2>
      <hr />
      <p style="margin-bottom:0px;"><strong>Date:</strong> ${new Date(
        receipt.createdAt
      ).toLocaleDateString()}</p>
      <p style="margin-bottom:0px;"><strong>To:</strong> ${receipt.name}</p>
      <p><strong>Number:</strong> ${receipt.phone}</p>
      
      <div style="text-align: center;">
        <i class="fab fa-mdb" style="font-size: 50px; color: #5d9fc5;"></i>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <thead style="background-color: #84B0CA; color: white;">
          <tr>
            <th style="padding: 5px; text-align: left;">Amount</th>
            <th style="padding: 5px; text-align: left;">Payment</th>
            <th style="padding: 5px; text-align: left;">Payment Type</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 5px;">₹${receipt.amount}</td>
            <td style="padding: 5px;">${receipt.payment}</td>
            <td style="padding: 5px;">${receipt.paymenttype}</td>
          </tr>
        </tbody>
      </table>
    </div>
    `;

    document.body.appendChild(receiptElement);

    const canvas = await html2canvas(receiptElement);
    const imgData = canvas.toDataURL("image/png");

    doc.addImage(imgData, "PNG", 10, 10, 180, 80);
    doc.save(`${receipt.name}_receipt.pdf`);

    document.body.removeChild(receiptElement);

    // Refetch receipts after PDF download
    refetch(); // This will trigger a refetch of the data
  };

  // Share function to generate WhatsApp link and send message to the phone number
  const handleShareToWhatsApp = (receipt) => {
    const message = `Hi ${receipt.name}, \n Here is your recipt link : \n https://zonehead.vercel.app/receipt/${receipt._id}`;

    // Ensure the phone number is in the correct format (no spaces, dashes, or other symbols)
    const phoneNumber = receipt.phone.replace(/\D/g, ""); // Remove non-numeric characters

    // Create the WhatsApp link with the phone number and encoded message
    const encodedMessage = encodeURIComponent(message); // Encode the message for URL
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Open WhatsApp link to send the message
    window.open(whatsappLink, "_blank");
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess, refetch]);
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
                        <th>Date</th>
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
                              {new Date(receipt.createdAt).toLocaleDateString()}
                            </td>
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
                                <Download
                                  size={16}
                                  color="blue"
                                  onClick={() => handleDownloadPDF(receipt)}
                                  style={{ cursor: "pointer" }}
                                  className="me-3"
                                />
                                <Share2
                                  size={16}
                                  color="blue"
                                  onClick={() => handleShareToWhatsApp(receipt)}
                                  style={{ cursor: "pointer" }}
                                  className="me-3"
                                />
                                <Eye
                                  size={16}
                                  onClick={() => handleOpenReceipt(receipt._id)}
                                  style={{ cursor: "pointer" }}
                                  className="me-3"
                                />

                                <Trash2
                                  size={16}
                                  color="red"
                                  onClick={() => handleDelete(receipt._id)}
                                  disabled={isDeleting}
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
