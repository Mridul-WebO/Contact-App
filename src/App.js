import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/signUp/SignUp";
import SignIn from "./pages/signIn/SignIn";
import ContactList from "./pages/contactList/ContactList";
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
    <BrowserRouter>
      {(isUserLoggedIn || sessionStorage.getItem("currentUser")) && (
        <NavBar
          setIsUserLoggedIn={setIsUserLoggedIn}
          currentUser={currentUser}
        />
      )}
      <Routes>
        <Route
          exact
          path="/"
          element={
            <SignIn
              setIsUserLoggedIn={setIsUserLoggedIn}
              setCurrentUser={setCurrentUser}
              setAlertMessageData={setAlertMessageData}
              alertMessageData={alertMessageData}
            />
          }
        />
        <Route
          exact
          path="/signIn"
          element={
            <SignIn
              setIsUserLoggedIn={setIsUserLoggedIn}
              setCurrentUser={setCurrentUser}
              setAlertMessageData={setAlertMessageData}
              alertMessageData={alertMessageData}
            />
          }
        />
        <Route
          exact
          path="/signup"
          element={
            <SignUp
              setIsUserLoggedIn={setIsUserLoggedIn}
              setCurrentUser={setCurrentUser}
              alertMessageData={alertMessageData}
            />
          }
        />
        <Route
          path="/contactList"
          element={
            isUserLoggedIn || sessionStorage.getItem("currentUser") ? (
              <ContactList />
            ) : (
              <SignIn
                setIsUserLoggedIn={setIsUserLoggedIn}
                setCurrentUser={setCurrentUser}
                setAlertMessageData={setAlertMessageData}
                alertMessageData={alertMessageData}
              />
            )
          }
        />
      </Routes>
      <AlertMessage alertMessageData={alertMessageData} />
    </BrowserRouter>
  );
}

export default App;
