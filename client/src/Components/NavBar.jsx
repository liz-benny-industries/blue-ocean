/* eslint-disable react/prop-types */
/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import './NavBar.css';

const Nav = ({ userSession, setAuthOpen, setUserSession }) => {
  const signOutUser = () => {
    const auth = getAuth();
    !userSession ? setAuthOpen(true)
      : signOut(auth).then(() => {
        setUserSession('');
      }).catch((error) => {
        console.log(error);
      });
  };

  return (
    <header className="navbar">
      <div className="navbar__title navbar__item">
        Logo
        <input className="search" />
      </div>
      <div
        className="navbar__item"
        style={{ cursor: 'pointer' }}
        onClick={signOutUser}
      >
        {userSession ? 'Logout' : 'Sign In'}
      </div>
    </header>
  );
};

export default Nav;
