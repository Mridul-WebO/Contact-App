import { Navigate, Outlet, useOutletContext } from "react-router-dom";

function ProtectedRoute() {
  const context = useOutletContext();

  if (!sessionStorage.getItem("currentUser")) {
    return <Navigate to="/" />;
  }

  return <Outlet context={context} />;
}

export default ProtectedRoute;
