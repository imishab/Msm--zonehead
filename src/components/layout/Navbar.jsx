import React from "react";
import { Menu, CircleUserRound } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <>
      {/* Header */}
      <div className="header-area" id="headerArea">
        <div className="container-md px-3">
          {/* Header Content */}
          <div className="header-content header-style-five position-relative d-flex align-items-center justify-content-between">
            {/* Logo Wrapper */}
            <div className="logo-wrapper">
              <a href="/">
                {/* <img src="img/core-img/logo.png" alt="" /> */}
                <h6 className="mt-2">
                  {" "}
                  Zone Head{" "}
                  <span style={{ fontSize: 10, fontWeight: 300 }}>
                    by Msm north
                  </span>
                </h6>
              </a>
            </div>
            {/* Navbar Toggler */}
            <div className="d-flex gap-3 justify-content-between align-items-center">
              <Link href="/profile/myprofile">
                <CircleUserRound size={20} color="black" />
              </Link>
              <div
                className="navbar--toggler"
                id="affanNavbarToggler"
                data-bs-toggle="offcanvas"
                data-bs-target="#affanOffcanvas"
                aria-controls="affanOffcanvas"
              >
                <Menu color="black" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
