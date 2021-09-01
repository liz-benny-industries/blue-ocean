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

const App = () => {
  const [isAuthOpen, setAuthOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [orderByDesc, setOrderByDesc] = useState(true);

  const [donations, setDonations] = useState([]);
  const [currentDonation, setCurrentDonation] = useState(null);
  // console.log('currentDonation:', currentDonation);
  const [openDonationCard, setOpenDonationCard] = React.useState(false);
  const [openPostModal, setOpenPostModal] = React.useState(false);

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const { uid } = user;
      setCurrentUser(uid);
      user.getIdToken().then((idToken) => {});
    }
  });

  useEffect(() => {
    axios
      .get('/donations', {
        params: {
          filter,
          sortBy,
          orderBy: orderByDesc ? 'DESC' : 'ASC',
        },
      })
      .then((response) => {
        // console.log(response.data);
        setDonations(response.data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [filter, sortBy, orderByDesc]);

  return (
    <div>
      <NavBar
        setOpenPostModal={setOpenPostModal}
        currentUser={currentUser}
        setAuthOpen={setAuthOpen}
        logOut={setCurrentUser}
        setFilter={setFilter}
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
