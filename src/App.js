import "./App.css";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import { useState } from "react";
import SnackBar from "./components/SnackBar";
// import { fetchCurrentUser } from "./storage/Storage";
import { useSelector } from "react-redux";

function App() {
  const isUserLoggedIn = useSelector((state) => state.auth.loggedIn);

  const [alertMessageData, setAlertMessageData] = useState({
    message: "",
    type: "",
    hideDuration: null,
    open: false,
  });

  // const userName = fetchCurrentUser()?.email.split("@")[0];

  return (
    <>
      {isUserLoggedIn && (
        <NavBar
          // setIsUserLoggedIn={setIsUserLoggedIn}
          setAlertMessageData={setAlertMessageData}
          alertMessageData={alertMessageData}
        />
      )}
      <Outlet
        context={{
          alertMessageData,
          setAlertMessageData,
          // isUserLoggedIn,
          // setIsUserLoggedIn,
          // userName,
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
