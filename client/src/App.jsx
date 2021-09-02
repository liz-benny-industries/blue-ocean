import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';
import Auth from './Components/Forms/Auth';
import NavBar from './Components/NavBar';
import DonationList from './Components/DonationList';
import DonationCard from './Components/DonationCard';
import PostModal from './Components/PostModal';
import AppContext from './Components/context';

const App = () => {
  const [modal, setModal] = useState(null);
  const [userId, setUserId] = useState(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [userFilter, setUserFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [orderByDesc, setOrderByDesc] = useState(true);
  const [donations, setDonations] = useState([]);
  const [currentDonation, setCurrentDonation] = useState(null);

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserId(user.uid);
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
  }, [searchFilter, sortBy, orderByDesc, modal]);

  const contextVal = {
    modal,
    setModal,
    userId,
    setUserId,
    searchFilter,
    setSearchFilter,
    userFilter,
    setUserFilter,
    sortBy,
    setSortBy,
    orderByDesc,
    setOrderByDesc,
    donations,
    setDonations,
    currentDonation,
    setCurrentDonation,

  };

  return (
    <AppContext.Provider value={contextVal}>
      <div>
        <NavBar />
        <Auth />
        <DonationCard />
        <PostModal />
        <DonationList />
      </div>
    </AppContext.Provider>
  );
};

export default App;
