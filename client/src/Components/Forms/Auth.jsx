/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import axios from 'axios';
import Modal from '../Helpers/Modal';

const firebaseConfig = {
  apiKey: 'AIzaSyBlgQeLZhCz0J5AUUmSqdwhvW9JsLS47Mg',
  authDomain: 'sandbox-3a2e3.firebaseapp.com',
  projectId: 'sandbox-3a2e3',
  storageBucket: 'sandbox-3a2e3.appspot.com',
  messagingSenderId: '1045233270084',
  appId: '1:1045233270084:web:6233b7f5ed56fc47406b11',
};

const app = initializeApp(firebaseConfig);

const Auth = ({ isAuthOpen, setAuthOpen }) => {
  const [authInfo, setAuthInfo] = useState({
    username: '',
    email: '',
    password: '',
    is_individual: true,
    default_location: '',
    google_id: '',
  });
  const [isSignIn, setSignIn] = useState(true);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAuthInfo({ ...authInfo, [name]: value });
  };

  const isChecked = (e) => {
    if (authInfo[e.target.name] === false) {
      setAuthInfo({ ...authInfo, [e.target.name]: true });
    } else {
      setAuthInfo({ ...authInfo, [e.target.name]: false });
    }
  };

  const signUpUser = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(
      auth,
      authInfo.email,
      authInfo.password
    )
      .then((userCredential) => {
        const { user } = userCredential;
        setAuthInfo({ ...authInfo, google_id: user.uid });
      })
      .then(() => { setAuthOpen(false); })
      // .then(axios.post('/someEndPoint', authInfo))
      .catch((err) => {
        setError(err.code);
      });
  };

  const signInUser = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(
      auth,
      authInfo.email,
      authInfo.password
    )
      .then((userCredential) => {
        const { user } = userCredential;
      })
      .then(() => { setAuthOpen(false); })
      .catch((err) => {
        setError(err.code);
      });
  };

  const handleSubmit = () => {
    isSignIn ? signInUser() : signUpUser();
  };

  return (
    <div className="UserForm">
      <Modal
        isOpen={isAuthOpen}
        close={() => {
          setAuthOpen(false);
        }}
      >
        <h2
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {isSignIn ? 'Sign In' : 'Create Account'}
        </h2>
        {!isSignIn && (
          <>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <label>Username</label>
              <input
                onChange={handleInputChange}
                name="username"
                value={authInfo.username}
                style={{ width: '20vw' }}
                autoComplete="off"
              />
            </div>
            <br />
            <br />
          </>
        )}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
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
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            cursor: 'pointer',
            alignItems: 'center',
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
          {!isSignIn && (
            <>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <label>Location</label>
                <input
                  onChange={handleInputChange}
                  name="default_location"
                  value={authInfo.default_location}
                  style={{ width: '20vw' }}
                  autoComplete="off"
                />
              </div>
              <br />
              <br />
            </>
          )}
          {!isSignIn && (
            <>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  alignItems: 'center',
                }}
              >
                <label>Register as a Charity</label>
                <div
                  style={{ display: 'flex', flexDirection: 'row' }}
                >
                  <input
                    type="checkbox"
                    id="is_individual"
                    name="is_individual"
                    value="false"
                    onChange={isChecked}
                  />
                  Yes
                </div>
                <br />
              </div>
            </>
          )}
          <span
            onClick={() => {
              setSignIn(!isSignIn);
            }}
          >
            {isSignIn ? 'Sign Up' : 'Sign In'}
          </span>
          <br />
          <Button
            style={{ width: '200px', backgroundColor: '#A4BFEB' }}
            variant="contained"
            onClick={handleSubmit}
          >
            Submit
          </Button>
          {error ? <Alert severity="error">{error}</Alert> : null}
        </div>
      </Modal>
    </div>
  );
};

export default Auth;
