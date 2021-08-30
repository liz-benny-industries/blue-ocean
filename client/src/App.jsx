/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Auth from './Components/Forms/Auth';
import NavBar from './Components/NavBar';
import Logo from './Components/Logo';

const App = () => {
  const [isAuthOpen, setAuthOpen] = useState(false);
  const [userSession, setUserSession] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState('');

  useEffect(() => {
    userSession ? setIsLoggedIn(true)
      : setIsLoggedIn(false);
  }, [userSession]);

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const { uid } = user;
      setUserSession(uid);
    }
  });

  return (
    <div>
      <NavBar
        userSession={userSession}
        setAuthOpen={setAuthOpen}
        setUserSession={setUserSession}
      />
      <br />
      <h2>{userSession || 'No User is signed in'}</h2>
      <Auth
        setAuthOpen={setAuthOpen}
        isAuthOpen={isAuthOpen}
      />
    </div>
  );
};

export default App;
