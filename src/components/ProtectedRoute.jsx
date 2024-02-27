import { Outlet, useNavigate, useOutletContext } from "react-router-dom";

function ProtectedRoute() {
  const navigate = useNavigate();
  const context = useOutletContext();

  if (!context.isUserLoggedIn || !sessionStorage.getItem("currentUser")) {
    navigate("/");
  }

  return <Outlet context={context} />;
}

export default ProtectedRoute;
