/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import axios from 'axios';
import AppContext from '../context';
import firebase from '../../firebase';
import Modal from '../Helpers/Modal';

const Auth = () => {
  const { modal, setModal, setUser } = useContext(AppContext);
  const [authInfo, setAuthInfo] = useState({
    username: '',
    email: '',
    password: '',
    isIndividual: true,
    defaultLocation: '',
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
      .then((userCredential) => userCredential.user.getIdToken())
      .then((idToken) => {
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        };
        // console.log('newly generated idToken: ', idToken);
        return axios.post('/users', authInfo, { headers });
      })
      .then(() => {
        setModal('');
      })
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
      .then(() => {
        setModal('');
      })
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
        isOpen={modal === 'auth'}
        close={() => {
          setModal('');
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
                  name="defaultLocation"
                  value={authInfo.defaultLocation}
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
                    id="isIndividual"
                    name="isIndividual"
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
