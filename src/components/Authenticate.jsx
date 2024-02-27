import { useEffect } from "react";
import { Outlet, useNavigate, useOutletContext } from "react-router-dom";

function Authenticate() {
  const navigate = useNavigate();

  const context = useOutletContext();

  // useEffect(() => {
  if (context.isUserLoggedIn || sessionStorage.getItem("currentUser")) {
    navigate("/contactList");
  }

  // }, [])


  return <Outlet context={context} />;
}

export default Authenticate;
