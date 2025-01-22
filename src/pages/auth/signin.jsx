import React, { useState, useEffect } from "react";
import { useSigninMutation } from "../../redux/api/ZoneApi"; // RTK Query API Slice
import { useRouter } from "next/router";
import { setZoneDetails } from "../../redux/slices/pageSlice";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { toast } from "react-toastify";

export default function Signin() {
  const [zoneId, setZoneId] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const dispatch = useDispatch();

  const [zoneSignin, { isLoading, isSuccess }] = useSigninMutation();

  const validateForm = () => {
    const newErrors = {};
    if (!zoneId) newErrors.zoneId = "Zone id is required";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await zoneSignin({ zoneId, password }).unwrap();
      dispatch(setZoneDetails({ zoneInfo: response, token: response.token }));
      if (response.token) {
        router.push("/");
      }
    } catch (err) {
      setErrors(err?.data?.message || "An unexpected error occurred.");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Hey 👋 Welcome to Msm North!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
      });
    }
  }, [isSuccess]);

  return (
    <>
      <div className="login-back-button">
        <Link href="/">
          <i className="bi bi-arrow-left-short" />
        </Link>
      </div>
      <div className="login-wrapper d-flex align-items-center justify-content-center">
        <div className="custom-container">
          <div className="text-center px-4 mt-5">
            <img
              className="login-intro-img"
              src="/assets/images/signin.png"
              alt="Signin"
            />
          </div>
          <div className="register-form mt-4">
            <h6 className="mb-3 text-center">
              Log in to continue to Msm North
            </h6>
            <form onSubmit={handleSubmit}>
              {errors.api && (
                <div className="alert alert-danger">{errors.api}</div>
              )}
              <div className="form-group">
                <input
                  className={`form-control ${
                    errors.zoneId ? "is-invalid" : ""
                  }`}
                  type="text"
                  id="username"
                  placeholder="Your Zone Id"
                  value={zoneId}
                  onChange={(e) => setZoneId(e.target.value)}
                />
                {errors.zoneId && (
                  <div className="invalid-feedback">{errors.zoneId}</div>
                )}
              </div>
              <div className="form-group position-relative">
                <input
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  id="psw-input"
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <a
                  className="float-end forgot-password d-block mt-3 mb-1"
                  href="/"
                >
                  <p>
                    <u>Forgot Password?</u>
                  </p>
                </a>
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>
              <button
                className="btn btn-dark w-100"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>
            </form>
            <Link
              className="btn btn-primary justify-center  w-100 mt-2 mb-5"
              href="/auth/signin"
            >
              Login as normal user
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
