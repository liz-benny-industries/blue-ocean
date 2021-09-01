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
  const [modal, setModal] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [userIdToken, setUserIdToken] = useState('');
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [orderByDesc, setOrderByDesc] = useState(true);
  const [donations, setDonations] = useState([]);
  const [currentDonation, setCurrentDonation] = useState(null);
  const [openPostModal, setOpenPostModal] = React.useState(false);
  const [refetch, setRefetch] = React.useState(false);

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
        setModal={setModal}
        modal={modal}
        logOut={setCurrentUser}
        setFilter={setFilter}
        setSortBy={setSortBy}
        setOrderByDesc={setOrderByDesc}
        orderByDesc={orderByDesc}
      />
      <br />
      <Auth modal={modal} setModal={setModal} />
      <DonationCard
        donation={currentDonation}
        setModal={setModal}
        modal={modal}
        currentDonation={currentDonation}
        userIdToken={userIdToken}
      />
      <PostModal setModal={setModal} modal={modal} />
      <DonationList
        setCurrentDonation={setCurrentDonation}
        donations={donations}
        setModal={setModal}
        modal={modal}
      />
    </div>
  );
};

export default App;
