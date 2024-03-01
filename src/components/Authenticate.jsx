import { Navigate, Outlet, useOutletContext } from "react-router-dom";
import { fetchCurrentUser } from "../storage/Storage";

function Authenticate() {
  const context = useOutletContext();

  if (!!fetchCurrentUser()) {
    return <Navigate to="/contact-list" />;
  }

  return <Outlet context={context} />;
}

export default Authenticate;
