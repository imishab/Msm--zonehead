import { useRouter } from "next/router";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Footerbar from "../components/layout/Footerbar";
import Navbar from "../components/layout/Navbar";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
import withAuth from "../middleware/middleware";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  // Define pages that should NOT require authentication
  const isAuthPage =
    router.pathname === "/auth/signin" ||
    router.pathname === "/auth/zone-signin" ||
    router.pathname === "/auth/signup";

  // Check if the current page is a receipt page (including dynamic IDs)
  const isReceiptPage =
    router.pathname.startsWith("/receipt/") ||
    router.asPath.startsWith("/receipt/");

  useEffect(() => {
    setIsMounted(true); // Ensures this logic runs only on the client
  }, []);

  if (!isMounted) {
    return null;
  }

  // Apply authentication check only if it's NOT an auth page and NOT a receipt page
  const WrappedComponent =
    isAuthPage || isReceiptPage ? Component : withAuth(Component);

  return (
    <Provider store={store}>
      <ToastContainer />
      {!isAuthPage && !isReceiptPage && <Navbar />}{" "}
      {/* Hide Navbar on /receipt/[id] */}
      <div className="page-content-wrapper">
        <WrappedComponent {...pageProps} />
      </div>
      {!isAuthPage && !isReceiptPage && <Footerbar />}{" "}
      {/* Hide Footerbar on /receipt/[id] */}
    </Provider>
  );
}
