import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((state) => state.admin);
  const router = useRouter();
  console.log("token", token);

  useEffect(() => {
    if (token) {
      router.push("/");
    } else {
      router.push("/auth/signin");
    }
  }, [router, token]);

  if (!token) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
