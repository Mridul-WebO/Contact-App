import "./App.css";

import { Outlet } from "react-router-dom";

import NavBar from "./components/NavBar";
import { useState } from "react";
import AlertMessage from "./components/AlertMessage";
import { fetchCurrentUser } from "./storage/Storage";

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    !!sessionStorage.getItem("currentUser")
  );

  const [currentUser, setCurrentUser] = useState({});
  const [alertMessageData, setAlertMessageData] = useState({
    message: "",
    type: "",
    hideDuration: null,
    ref: null,
  });

  const userName = fetchCurrentUser()?.email.split("@")[0];

  return (
    <>
      {isUserLoggedIn && (
        <NavBar
          setIsUserLoggedIn={setIsUserLoggedIn}
          currentUser={currentUser}
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
          setCurrentUser,
          userName,
        }}
      />
      <AlertMessage
        alertMessageData={alertMessageData}
        setAlertMessageData={setAlertMessageData}
      />
    </>
  );
}

export default App;
