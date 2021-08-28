import React, { useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Auth from './Components/Forms/Auth';

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    console.log(uid)
    // ...
  } else {
    // User is signed out
    // ...
  }
});

const App = ({ uid }) => {
  const [isAuthOpen, setAuthOpen] = useState(true);
  return (
    <div>
      Hello World!
      {uid}
      <div
        style={{ cursor: 'pointer' }}
        onClick={signOut}
      >SignOut</div>
      <Auth
        setAuthOpen={setAuthOpen}
        isAuthOpen={isAuthOpen}
      />
    </div>
  );
};

export default App;
