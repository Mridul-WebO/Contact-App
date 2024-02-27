import "./App.css";

import { Outlet } from "react-router-dom";

import NavBar from "./components/NavBar";
import { useState } from "react";
import AlertMessage from "./components/AlertMessage";

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [alertMessageData, setAlertMessageData] = useState({
    message: "",
    type: "",
    ref: null,
  });

  return (
    <>
      {(isUserLoggedIn || sessionStorage.getItem("currentUser")) && (
        <NavBar
          setIsUserLoggedIn={setIsUserLoggedIn}
          currentUser={currentUser}
        />
      )}
      <Outlet
        context={{
          alertMessageData,
          setAlertMessageData,
          isUserLoggedIn,
          setIsUserLoggedIn,
          setCurrentUser,
        }}
      />
      <AlertMessage alertMessageData={alertMessageData} />
    </>
  );
}

export default App;
