import React, { useState, useEffect } from "react";
import { useSignupMutation } from "../../redux/api/ZoneApi"; // RTK Query API Slice
import { useRouter } from "next/router";
import { setUserDetails } from "../../redux/slices/pageSlice";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { toast } from "react-toastify";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const dispatch = useDispatch();

  const [signup, { isLoading, isSuccess }] = useSignupMutation();

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await signup({ name, email, password }).unwrap();
      dispatch(setUserDetails({ zoneInfo: response, token: response.token }));
      if (response.token) {
        router.push("/");
      }
    } catch (err) {
      setErrors(err?.data?.message || "An unexpected error occurred.");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Hey 👋 Welcome to Tastify!", {
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
          <div className="text-center px-4">
            <img
              className="login-intro-img"
              src="/assets/images/signin.png"
              alt="Signin"
            />
          </div>
          <div className="register-form mt-4">
            <h6 className="mb-3 text-center">Create New Account For Tastify</h6>
            <form onSubmit={handleSubmit}>
              {errors.api && (
                <div className="alert alert-danger">{errors.api}</div>
              )}
              <div className="form-group">
                <input
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  type="text"
                  id="username"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>
              <div className="form-group">
                <input
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  type="email"
                  id="username"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
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
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>
              <button
                className="btn btn-dark w-100"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Signing Up..." : "Sign Up"}
              </button>
            </form>
          </div>
          <div className="login-meta-data text-center">
            <p className="mb-0 mt-3">
              Already have an account?{" "}
              <Link className="stretched-link" href="/auth/signin">
                Signin Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
