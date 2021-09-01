/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Auth from './Components/Forms/Auth';
import NavBar from './Components/NavBar';
import PostModal from './Components/PostModal';

const App = () => {
  const [isAuthOpen, setAuthOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState();

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const { uid } = user;
      setCurrentUser(uid);
      user.getIdToken().then((idToken) => {});
    }
  });

  return (
    <div>
      <NavBar
        currentUser={currentUser}
        setAuthOpen={setAuthOpen}
        logOut={setCurrentUser}
      />
      <PostModal />
      <br />
      <h2>{currentUser || 'No User is signed in'}</h2>
      <Auth setAuthOpen={setAuthOpen} isAuthOpen={isAuthOpen} />
    </div>
  );
};

export default App;
