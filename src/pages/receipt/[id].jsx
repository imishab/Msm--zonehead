import { useRouter } from "next/router";
import { useGetReceiptByIdQuery } from "../../redux/api/ZoneApi"; // Adjust import based on your API
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ViewReceipt() {
  const router = useRouter();
  const { id } = router.query;

  // Fetch receipt details
  const {
    data: receipt,
    error,
    isLoading,
  } = useGetReceiptByIdQuery(id, {
    skip: !id, // Prevent API call if ID is missing
  });

  if (isLoading)
    return <p className="text-center mt-5">Loading receipt details...</p>;
  if (error)
    return <p className="text-center text-red-500">Error loading receipt.</p>;
  if (!receipt) return <p className="text-center">Receipt not found.</p>;

  return (
    <div className="pt-10 flex flex-col items-center justify-center  p-6">
      {/* Back Button */}
      {/* <div className="mb-4  w-full max-w-2xl flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/reports">
            <ArrowLeft
              color="black"
              size={24}
              className="cursor-pointer mr-2"
            />
          </Link>
          <h2 className="text-lg mt-2 font-semibold">Receipt Details</h2>
        </div>
        
      </div> */}

      {/* Receipt Card */}
      <div className="bg-white shadow-lg rounded-xl w-full max-w-2xl  border">
        {/* Header Section */}
        <div className=" bg-[#ffe29a5a] p-6 rounded-t-xl items-center  pb-3">
          <div>
            <h1 className="text-lg text-center mb-0 font-bold text-green-900">
              Mujahid Students Movement (MSM)
            </h1>
            <p className="text-green-900 mt-0 mb-0 text-center">
              Kozhikode North District Committee
            </p>
            <p className="text-black mt-0  text-center">
              Salafi Complex Near Cvil Station Koyilandy-673305
            </p>
            {/* <p className="mt-4 mb-0">Receipt Id : #MS</p> */}
          </div>
        </div>

        {/* Receipt Details */}
        <div className=" bg-[#ffffff88] rounded-b-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 p-6 text-sm mb-0">
            <div className="form-group mb-3">
              <label className="form-label" htmlFor="Username">
                Name
              </label>
              <input
                className="form-control"
                id="Username"
                type="text"
                readOnly
                defaultValue={receipt.name}
                placeholder="Username"
              />
            </div>
            <div className="form-group mb-3">
              <label className="form-label" htmlFor="fullname">
                Phone Number
              </label>
              <input
                className="form-control"
                id="fullname"
                defaultValue={receipt.phone}
                type="text"
                placeholder="Full Name"
                readOnly
              />
            </div>

            <div className="form-group mb-3">
              <label className="form-label" htmlFor="Username">
                Amount Paid
              </label>
              <input
                className="form-control"
                id="Username"
                type="text"
                readOnly
                defaultValue={`₹${receipt.amount}/-`}
                placeholder="Username"
              />
            </div>
            <div className="form-group mb-3">
              <label className="form-label" htmlFor="fullname">
                Payment Type
              </label>
              <input
                className="form-control"
                id="fullname"
                defaultValue={receipt.payment}
                type="text"
                placeholder="Full Name"
                readOnly
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 justify-between items-center px-6 mt-0">
            <p>
              <strong>Payment Platform:</strong> {receipt.paymenttype}
            </p>
            <p>
              <strong>Receipt Created Date:</strong>{" "}
              {new Date(receipt.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
      <a
        href="#"
        onClick={() => window.print()}
        className="btn mt-4 bg-black text-white rounded "
      >
        Download Receipt
      </a>
    </div>
  );
}
