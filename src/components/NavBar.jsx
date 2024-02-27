import React from "react";
import { useNavigate } from "react-router";
import { removeCurrentUser } from "../storage/Storage";

// storage

const NavBar = ({ setIsUserLoggedIn, currentUser }) => {
  const navigate = useNavigate();
  function handleLogOut(event) {
    event.preventDefault();
    removeCurrentUser();
    setIsUserLoggedIn(false);
    navigate("/");
  }

  //   const data = getSingleData(currentUser.userId);
  //   console.log(currentUser);

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Contact App
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Welcome!!{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {/* 
                    {currentUser?.email ||
                      (sessionStorage.getItem("currentUser")
                        ? JSON.parse(sessionStorage.getItem("currentUser"))
                            ?.email
                        : "")} */}
                  </span>
                </a>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <button
                className="btn btn-outline-success"
                onClick={handleLogOut}
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
