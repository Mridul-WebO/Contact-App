import { Provider } from 'react-redux';
import { createBrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App';
import store, { persistor } from './app/store';
import Authenticate from './components/Authenticate';
import ProtectedRoute from './components/ProtectedRoute';
import ContactList from './pages/contactList/ContactList';
import ErrorPage from './pages/errorPage/ErrorPage';
import SignIn from './pages/signIn/SignIn';
import SignUp from './pages/signUp/SignUp';

const AppRouting = createBrowserRouter([
  {
    path: '/',
    element: (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    ),
    children: [
      {
        element: <Authenticate />,
        children: [
          {
            path: '',
            element: <SignIn />,
          },
          {
            path: 'sign-up',
            element: <SignUp />,
          },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: 'contact-list',
            element: <ContactList />,
          },
        ],
      },
    ],
  },

  {
    path: '*',
    element: <ErrorPage />,
  },
]);

export default AppRouting;
