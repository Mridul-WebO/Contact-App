import { useState } from 'react';

import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import NavBar from './components/NavBar';
import SnackBar from './components/SnackBar';

import './App.css';

function App() {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const isUserLoggedIn = Object.keys(currentUser).length !== 0;

  const [alertMessageData, setAlertMessageData] = useState({
    message: '',
    type: '',
    hideDuration: null,
    open: false,
  });

  return (
    <>
      {isUserLoggedIn && (
        <NavBar
          setAlertMessageData={setAlertMessageData}
          alertMessageData={alertMessageData}
        />
      )}
      <Outlet
        context={{
          alertMessageData,
          setAlertMessageData,
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
