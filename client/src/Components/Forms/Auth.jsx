/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import Modal from '../Helpers/Modal';
// import { apiKey } from '../../../../config/config';

const firebaseConfig = {
  // apiKey,
  authDomain: 'sandbox-3a2e3.firebaseapp.com',
  projectId: 'sandbox-3a2e3',
  storageBucket: 'sandbox-3a2e3.appspot.com',
  messagingSenderId: '1045233270084',
  appId: '1:1045233270084:web:6233b7f5ed56fc47406b11'
};

const app = initializeApp(firebaseConfig);

// console.log(app);

const Auth = ({ isAuthOpen, setAuthOpen }) => {
  const [authInfo, setAuthInfo] = useState({
    email: '',
    password: '',
  });
  const [isSignIn, setSignIn] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAuthInfo({ ...authInfo, [name]: value });
  };

  const signUpUser = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, authInfo.email, authInfo.password)
      .then((userCredential) => {
        const { user } = userCredential;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  };

  const signInUser = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, authInfo.email, authInfo.password)
      .then((userCredential) => {
        const { user } = userCredential;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  };

  const handleSubmit = () => {
    isSignIn ? signInUser() : signUpUser();
    setAuthOpen(false);
  };

  return (
    <div className="UserForm">
      <Modal isOpen={isAuthOpen} close={() => { setAuthOpen; }}>
        <h2 style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
        }}
        >
          {' '}
          SIGN IN
        </h2>
        <div style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
        }}
        >
          <label>Email</label>
          <input
            onChange={handleInputChange}
            name="email"
            value={authInfo.email}
            style={{ width: '20vw' }}
            autoComplete="off"
          />
        </div>
        <br />
        <br />
        <div
          style={{
            display: 'flex', flexDirection: 'column', justifyContent: 'center', cursor: 'pointer', alignItems: 'center'
          }}
        >
          <label>Password</label>
          <input
            onChange={handleInputChange}
            name="password"
            type="password"
            value={authInfo.password}
            style={{ width: '20vw' }}
            autoComplete="off"
          />
          <br />
          <span
            onClick={() => { setSignIn(false); }}
          >
            Sign Up
          </span>
          <br />
          <Button
            style={{ width: '200px', backgroundColor: '#A4BFEB' }}
            variant="contained"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Auth;
