import "./App.css";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import { useState } from "react";
import SnackBar from "./components/SnackBar";
// import { fetchCurrentUser } from "./storage/Storage";
import { useSelector } from "react-redux";
import { isLoggedinSelector } from "./features/auth/authReducer";
import AlertDialog from "./components/ConfirmAlert";

function App() {
  const isUserLoggedIn = useSelector(isLoggedinSelector);
  const [confirmationAlert, setConfirmationAlert] = useState({ open: false, confirm: false, message: "" })
  const [alertMessageData, setAlertMessageData] = useState({
    message: "",
    type: "",
    hideDuration: null,
    open: false,
  });

  const alertMessage(){

  }

  return (
    <>
      {isUserLoggedIn && (
        <NavBar
          setAlertMessageData={setAlertMessageData}
          alertMessageData={alertMessageData}
          setConfirmationAlert={setConfirmationAlert}
          confirmationAlert={confirmationAlert}
        />
      )}
      <Outlet
        context={{
          alertMessageData,
          setAlertMessageData,
          confirmationAlert,
          setConfirmationAlert
        }}
      />
      {alertMessageData.open && (
        <SnackBar
          alertMessageData={alertMessageData}
          setAlertMessageData={setAlertMessageData}
        />
      )}
      {confirmationAlert.open && (
        <AlertDialog />
      )

      }
    </>
  );
}

export default App;
