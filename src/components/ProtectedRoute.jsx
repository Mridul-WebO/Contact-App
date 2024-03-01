import { Navigate, Outlet, useOutletContext } from "react-router-dom";
import { fetchCurrentUser } from "../storage/Storage";

function ProtectedRoute() {
  const context = useOutletContext();

  if (!fetchCurrentUser()) {
    return <Navigate to="/" />;
  }

  return <Outlet context={context} />;
}

export default ProtectedRoute;
