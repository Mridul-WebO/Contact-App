import { useNavigate } from "react-router";
import { fetchCurrentUser, removeCurrentUser } from "../storage/Storage";

const NavBar = ({
  setIsUserLoggedIn,
  setAlertMessageData,
  alertMessageData,
}) => {
  const navigate = useNavigate();
  function handleLogOut(event) {
    event.preventDefault();

    // setAlertMessageData({
    //   message: "Logged Out SuccessFully",
    //   type: "Success",
    //   ref: null,
    // });
    // console.log(alertMessageData.ref.current);

    // alertMessageData.ref.current?.click();

    removeCurrentUser();
    setIsUserLoggedIn(false);
    navigate("/");
  }

  const userName = fetchCurrentUser()?.email.split("@")[0];

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
                    {userName || "User"}
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
