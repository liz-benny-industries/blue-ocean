import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';
import Auth from './Components/Forms/Auth';
import NavBar from './Components/NavBar';
import DonationList from './Components/DonationList';
import DonationCard from './Components/DonationCard';
import PostModal from './Components/PostModal';
import AppContext from './Components/context';
import { getUserIdToken } from './firebase';

const App = () => {
  const [modal, setModal] = useState(null);
  const [user, setUser] = useState(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [userFilter, setUserFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [orderByDesc, setOrderByDesc] = useState(true);
  const [donations, setDonations] = useState([]);
  const [currentDonation, setCurrentDonation] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (newUser) => {
      if (newUser) {
        setUser(newUser);
      }
    });
  }, []);

  useEffect(async () => {
    const headers = {
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${idToken}`,
    };
    if (userFilter) {
      await getUserIdToken().then((idToken) => {
        headers.Authorization = `Bearer ${idToken}`;
      });
    }
    axios
      .get('/donations', {
        params: {
          user: userFilter,
          filter: searchFilter,
          sortBy,
          orderBy: orderByDesc ? 'DESC' : 'ASC',
        },
        headers,
      })
      .then((response) => {
        setDonations(response.data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [searchFilter, userFilter, sortBy, orderByDesc, modal]);

  const contextVal = {
    modal,
    setModal,
    user,
    setUser,
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
