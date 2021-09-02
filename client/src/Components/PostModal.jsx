/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import axios from 'axios';
import {
  TextField,
  Modal,
  Backdrop,
  Button,
  Fade,
  Typography,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import AppContext from './context';
import { getuserIdToken } from '../firebase';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '30rem',
  },
  button: {
    width: '12rem',
  },
  buttonBox: {
    display: 'flex',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '26rem',
  },
}));

export default function PostModal() {
  const classes = useStyles();
  const { modal, setModal, user } = useContext(AppContext);
  const blankDonationInfo = {
    title: '',
    description: '',
    location: '',
    charitiesOnly: false,
  };
  const [donationInfo, setDonationInfo] = useState(blankDonationInfo);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'charitiesOnly') {
      setDonationInfo({ ...donationInfo, [name]: e.target.checked });
    } else {
      setDonationInfo({ ...donationInfo, [name]: value });
    }
  };

  const resetInputs = () => {
    setDonationInfo(blankDonationInfo);
  };

  const handleClose = () => {
    setModal('');
    resetInputs();
  };

  const donate = () => {
    if (user) {
      getuserIdToken()
        .then((idToken) => {
          const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${idToken}`,
          };
          return axios.post(
            '/donations',
            { ...donationInfo, images: ['image.jpg'] },
            { headers }
          );
        })
        .then((res) => {
          console.log('DONATION POST Successful');
          handleClose();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={modal === 'post'}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 300,
        }}
      >
        <Fade in={modal === 'post'}>
          <div className={classes.paper}>
            <Typography variant="h4" id="transition-modal-title">
              Describe the Item
            </Typography>
            <form
              require
              noValidate
              className={classes.root}
              autoComplete="off"
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <TextField
                required
                id="modal-item-title"
                label="Item Title"
                type="item-title"
                name="title"
                value={donationInfo.title}
                onChange={handleInputChange}
                style={{ margin: '1rem' }}
              />
              <TextField
                required
                id="modal-item-location"
                label="Item Location"
                type="item-title"
                name="location"
                onChange={handleInputChange}
                value={donationInfo.location}
                style={{ margin: '1rem' }}
              />
              <TextField
                required
                id="modal-description-input"
                label="Share info about your item"
                multiline
                rows={4}
                placeholder="Please enter a description"
                variant="outlined"
                name="description"
                onChange={handleInputChange}
                value={donationInfo.descripton}
                style={{ margin: '1rem' }}
              />
              <FormControlLabel
                control={(
                  <Checkbox
                    checked={donationInfo.charitiesOnly}
                    onChange={handleInputChange}
                    name="charitiesOnly"
                    color="primary"
                  />
                )}
                label="This donation is for charities only"
              />
              <div className={classes.buttonBox}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  Add Image
                </Button>
                <Button
                  onClick={donate}
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  endIcon={<SendRoundedIcon />}
                >
                  Donate
                </Button>
              </div>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
