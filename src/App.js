import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/signUp/SignUp";
import SignIn from "./pages/signIn/SignIn";
import ContactList from "./pages/contactList/ContactList";
import NavBar from "./components/NavBar";
function App() {
  return (
    <BrowserRouter>
      {localStorage.getItem("userData") && <NavBar />}
      <Routes>
        <Route exact path="/" element={<SignIn />} />
        <Route exact path="/signIn" element={<SignIn />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route
          path="/contactList"
          element={localStorage.getItem("userData") && <ContactList />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
