/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';
import Auth from './Components/Forms/Auth';
import NavBar from './Components/NavBar';
import DonationList from './Components/DonationList';
import DonationCard from './Components/DonationCard';
import PostModal from './Components/PostModal';
import { getCurrentUserToken } from './firebase';

const App = () => {
  const [isAuthOpen, setAuthOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userIdToken, setUserIdToken] = useState('');
  const [searchFilter, setSearchFilter] = useState('');
  const [userFilter, setUserFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [orderByDesc, setOrderByDesc] = useState(true);

  const [donations, setDonations] = useState([]);
  const [currentDonation, setCurrentDonation] = useState(null);
  const [openDonationCard, setOpenDonationCard] = React.useState(false);
  const [openPostModal, setOpenPostModal] = React.useState(false);

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrentUser(user);
      const { uid } = user;
      user.getIdToken().then((idToken) => {
        setUserIdToken(idToken);
      });
    }
  });

  useEffect(() => {
    axios
      .get('/donations', {
        params: {
          user: userFilter,
          filter: searchFilter,
          sortBy,
          orderBy: orderByDesc ? 'DESC' : 'ASC',
        },
      })
      .then((response) => {
        setDonations(response.data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [searchFilter, sortBy, orderByDesc]);

  return (
    <div>
      <NavBar
        setOpenPostModal={setOpenPostModal}
        currentUser={currentUser}
        setAuthOpen={setAuthOpen}
        logOut={setCurrentUser}
        setSearchFilter={setSearchFilter}
        setSortBy={setSortBy}
        setOrderByDesc={setOrderByDesc}
        orderByDesc={orderByDesc}
      />
      <br />
      <Auth setAuthOpen={setAuthOpen} isAuthOpen={isAuthOpen} />
      {openDonationCard ? (
        <DonationCard
          donation={currentDonation}
          setOpenDonationCard={setOpenDonationCard}
          currentDonation={currentDonation}
          userIdToken={userIdToken}
        />
      ) : null}
      {openPostModal ? (
        <PostModal setOpenPostModal={setOpenPostModal} />
      ) : null}
      <DonationList
        setCurrentDonation={setCurrentDonation}
        donations={donations}
        setOpenDonationCard={setOpenDonationCard}
      />
    </div>
  );
};

export default App;
