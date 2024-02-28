import { Navigate, Outlet, useOutletContext } from "react-router-dom";

function Authenticate() {
  const context = useOutletContext();

  if (!!sessionStorage.getItem("currentUser")) {
    return <Navigate to="/contact-list" />;
  }

  return <Outlet context={context} />;
}

export default Authenticate;
