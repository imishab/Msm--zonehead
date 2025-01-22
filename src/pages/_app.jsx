import { useRouter } from "next/router";
import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Footerbar from "@/components/layout/Footerbar";
import Navbar from "@/components/layout/Navbar";
import { useDispatch } from "react-redux";
import { loadZoneDetails } from "../redux/slices/pageSlice"; // Adjust path as needed
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
import withAuth from "../middleware/middleware";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  const isAuthPage =
    router.pathname === "/auth/signin" ||
    router.pathname === "/auth/zone-signin" ||
    router.pathname === "/auth/signup";

  useEffect(() => {
    setIsMounted(true); // Ensures this logic runs only on the client
  }, []);

  if (!isMounted) {
    return null;
  }

  const WrappedComponent = isAuthPage ? Component : withAuth(Component);

  return (
    <Provider store={store}>
      <ToastContainer />
      {!isAuthPage && <Navbar />}
      {!isAuthPage ? (
        <div className="page-content-wrapper">
          <WrappedComponent {...pageProps} />
        </div>
      ) : (
        <WrappedComponent {...pageProps} />
      )}
      {!isAuthPage && <Footerbar />}
    </Provider>
  );
}
