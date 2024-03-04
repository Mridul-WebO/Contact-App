import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import SignIn from "./pages/signIn/SignIn";
import SignUp from "./pages/signUp/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";
import ContactList from "./pages/contactList/ContactList";
import Authenticate from "./components/Authenticate";
import ErrorPage from "./pages/errorPage/ErrorPage";

const AppRouting = createBrowserRouter([
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
            path: "sign-up",
            element: <SignUp />,
          },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "contact-list",
            element: <ContactList />,
          },
        ],
      },
    ],
  },

  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default AppRouting;
