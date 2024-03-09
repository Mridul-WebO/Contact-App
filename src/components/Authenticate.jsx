import { Navigate, Outlet, useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import { isLoggedinSelector } from "../features/auth/authReducer";

function Authenticate() {
  const currentUser = useSelector(isLoggedinSelector);
  // const currentUser = useSelector((state) => state.auth.currentUser);
  const context = useOutletContext();

  if (currentUser) {
    return <Navigate to="/contact-list" />;
  }

  return <Outlet context={context} />;
}

export default Authenticate;
