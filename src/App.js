import "./App.css";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import { useState } from "react";
import SnackBar from "./components/SnackBar";
import { fetchCurrentUser } from "./storage/Storage";

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    !!sessionStorage.getItem("currentUser")
  );
  const [alertMessageData, setAlertMessageData] = useState({
    message: "",
    type: "",
    hideDuration: null,
    open: false,
  });

  const userName = fetchCurrentUser()?.email.split("@")[0];

  return (
    <>
      {isUserLoggedIn && (
        <NavBar
          setIsUserLoggedIn={setIsUserLoggedIn}
          setAlertMessageData={setAlertMessageData}
          alertMessageData={alertMessageData}
        />
      )}
      <Outlet
        context={{
          alertMessageData,
          setAlertMessageData,
          isUserLoggedIn,
          setIsUserLoggedIn,
          userName,
        }}
      />
      {alertMessageData.open && (
        <SnackBar
          alertMessageData={alertMessageData}
          setAlertMessageData={setAlertMessageData}
        />
      )}
    </>
  );
}

export default App;
