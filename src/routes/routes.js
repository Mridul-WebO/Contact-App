import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import SignIn from "../pages/signIn/SignIn.jsx";
import SignUp from "./../pages/signUp/SignUp";
import ProtectedRoute from "./../components/ProtectedRoute";
import ContactList from "./../pages/contactList/ContactList";
import Authenticate from "./../components/Authenticate";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <Authenticate />,
        children: [
          {
            path: "",
            element: <SignIn />,
          },
          {
            path: "signUp",
            element: <SignUp />,
          },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "contactList",
            element: <ContactList />,
          },
        ],
      },
    ],
  },
]);

export default router;
