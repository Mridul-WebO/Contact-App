import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/signUp/SignUp";
import SignIn from "./pages/signIn/SignIn";
import ContactList from "./pages/contactList/ContactList";
import NavBar from "./components/NavBar";
import { useState } from "react";
function App() {

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);


  return (
    <BrowserRouter>
      {(isUserLoggedIn || localStorage.getItem('currentUser')) && <NavBar setIsUserLoggedIn={setIsUserLoggedIn} />}
      <Routes>
        <Route exact path="/" element={<SignIn />} />
        <Route exact path="/signIn" element={<SignIn setIsUserLoggedIn={setIsUserLoggedIn} />} />
        <Route exact path="/signup" element={<SignUp setIsUserLoggedIn={setIsUserLoggedIn} />} />
        <Route
          path="/contactList"
          element={localStorage.getItem("userData") && <ContactList />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
