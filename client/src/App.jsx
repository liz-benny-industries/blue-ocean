/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Auth from './Components/Forms/Auth';
import NavBar from './Components/NavBar';
import DonationList from './Components/DonationList';
import DonationCard from './Components/DonationCard';
import PostModal from './Components/PostModal';

const App = () => {
  const [isAuthOpen, setAuthOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [openDonationCard, setOpenDonationCard] = React.useState(false);
  const [openPostModal, setOpenPostModal] = React.useState(false);

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const { uid } = user;
      setCurrentUser(uid);
      user.getIdToken().then((idToken) => {
      });
    }
  });

  return (
    <div>
      <NavBar
        setOpenPostModal={setOpenPostModal}
        currentUser={currentUser}
        setAuthOpen={setAuthOpen}
        logOut={setCurrentUser}
      />
      <br />
      <h2>{currentUser || 'No User is signed in'}</h2>
      <Auth
        setAuthOpen={setAuthOpen}
        isAuthOpen={isAuthOpen}
      />
      {openDonationCard ? <DonationCard setOpenDonationCard={setOpenDonationCard} /> : null}
      {openPostModal ? <PostModal setOpenPostModal={setOpenPostModal} /> : null}
      <DonationList setOpenDonationCard={setOpenDonationCard} />
    </div>
  );
};

export default App;
