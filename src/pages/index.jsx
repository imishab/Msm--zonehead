import Link from "next/link";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

export default function index() {
  const user = useSelector((state) => state.zone.zoneInfo);

  return (
    <>
      {/* Tiny Slider One Wrapper */}
      <div className="container direction-rtl">
        <div className="pt-4" />

        <h5 className="mb-3">Hey {user?.zonename}, Welcome</h5>

        <div className="card mb-3">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-4">
                <Link href="/generate-receipt">
                  <div className="feature-card mx-auto text-center">
                    <div className="card mx-auto bg-gray">
                      <img src="/assets/images/icons/bill.png" alt="" />
                    </div>
                    <p className="mb-0">Receipt Generator</p>
                  </div>
                </Link>
              </div>
              <div className="col-4">
                <Link href="/reports">
                  <div className="feature-card mx-auto text-center">
                    <div className="card mx-auto bg-gray">
                      <img src="/assets/images/icons/report.png" alt="" />
                    </div>
                    <p className="mb-0">Receipt Report</p>
                  </div>
                </Link>
              </div>
              {/* <div className="col-4">
                <div className="feature-card mx-auto text-center">
                  <div className="card mx-auto bg-gray">
                    <img src="/assets/img/demo-img/js.png" alt="" />
                  </div>
                  <p className="mb-0">Vanilla JS</p>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <div className="pt-3" />
    </>
  );
}
