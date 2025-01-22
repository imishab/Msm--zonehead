import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { clearZoneDetails } from "../../redux/slices/pageSlice"; // Import the clearZoneDetails action

export default function MyProfile() {
  const user = useSelector((state) => state.zone.zoneInfo);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(clearZoneDetails()); // Clear user details from Redux and localStorage
    router.push("/auth/signin"); // Redirect to the sign-in page
  };
  return (
    <div className="container pt-3 pb-4">
      {/* User Information*/}
      <div className="card user-info-card mb-3">
        <div className="card-body d-flex align-items-center">
          <div className="user-profile me-3">
            <img src="/assets/images/icons/user.png" alt="" />
            {/* <i className="bi bi-pencil" />
            <form action="#">
              <input className="form-control" type="file" />
            </form> */}
          </div>
          <div className="user-info">
            <div className="d-flex align-items-center">
              <h5 className="mb-1">{user?.zoneId}</h5>
            </div>
            <p className="mb-0">{user?.zonename} Zone</p>
          </div>
        </div>
      </div>
      {/* User Meta Data*/}
      <div className="card user-data-card">
        <div className="card-body">
          <form action="#">
            <div className="form-group mb-3">
              <label className="form-label" htmlFor="Username">
                Your Zone ID
              </label>
              <input
                className="form-control"
                id="Username"
                type="text"
                readOnly
                defaultValue={user?.zoneId}
                placeholder="Username"
              />
            </div>
            <div className="form-group mb-3">
              <label className="form-label" htmlFor="fullname">
                Zone Name
              </label>
              <input
                className="form-control"
                id="fullname"
                defaultValue={user?.zonename}
                type="text"
                placeholder="Full Name"
                readOnly=""
              />
            </div>
            <div className="row g-2">
              <div className="col-6">
                <div className="form-group mb-3">
                  <label className="form-label" htmlFor="Username">
                    Zone Head Name
                  </label>
                  <input
                    className="form-control"
                    id="Username"
                    type="text"
                    readOnly
                    defaultValue={user?.name}
                    placeholder="Username"
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group mb-3">
                  <label className="form-label" htmlFor="Username">
                    Status
                  </label>
                  <input
                    className="form-control"
                    id="Username"
                    type="text"
                    readOnly
                    defaultValue={user?.type}
                    placeholder="Username"
                  />
                </div>
              </div>
            </div>

            <div className="row g-2">
              <div className="col-6">
                <div className="form-group mb-3">
                  <label className="form-label" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    className="form-control"
                    id="email"
                    type="text"
                    defaultValue={user?.email}
                    placeholder="Email Address"
                    readOnly=""
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group mb-4">
                  <label className="form-label" htmlFor="job">
                    Phone Number
                  </label>
                  <input
                    className="form-control"
                    id="job"
                    type="number"
                    defaultValue={user?.phone}
                    placeholder="+91"
                  />
                </div>
              </div>
            </div>

            <button onClick={handleLogout} className="btn btn-danger mt-2">
              Logout
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
