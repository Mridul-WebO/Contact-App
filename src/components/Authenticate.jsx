import { Navigate, Outlet, useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";

function Authenticate() {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const context = useOutletContext();

  if (Object.keys(currentUser).length !== 0) {
    return <Navigate to="/contact-list" />;
  }

  return <Outlet context={context} />;
}

export default Authenticate;
