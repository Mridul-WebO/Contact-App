
import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ContactList from './pages/ContactList';
import NavBar from './components/NavBar';
function App() {
  return (
    <BrowserRouter>
      {localStorage.getItem('userData') && <NavBar />}
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/signup' element={<SignIn />} />
        <Route path='/signin' element={<SignUp />} />
        <Route path='/contactList' element={localStorage.getItem('userData') && <ContactList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
