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
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [orderByDesc, setOrderByDesc] = useState(true);

  const [donations, setDonations] = useState([]);
  const [currentDonation, setCurrentDonation] = useState(null);
  const [openDonationCard, setOpenDonationCard] = React.useState(false);
  const [openPostModal, setOpenPostModal] = React.useState(false);
  const [refetch, setRefetch] = React.useState(false);

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const { uid } = user;
      user.getIdToken().then((idToken) => {
        setCurrentUser(idToken);
      });
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
        setDonations(response.data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [filter, sortBy, orderByDesc, refetch]);

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
          currentDonation={currentDonation}
          currentUser={currentUser}
          refetch={refetch}
          setRefetch={setRefetch}
        />
      ) : null}
      {openPostModal ? (
        <PostModal
          setOpenPostModal={setOpenPostModal}
          refetch={refetch}
          setRefetch={setRefetch}
        />
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
