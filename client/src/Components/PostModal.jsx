/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import {
  TextField,
  Modal,
  Backdrop,
  Button,
  Fade,
  Icon,
} from '@material-ui/core';

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
}));

export default function TransitionsModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [donationInfo, setDonationInfo] = useState({
    title: '',
    descripton: '',
    location: '',
    charitiesOnly: 'false',
    status: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDonationInfo({ ...donationInfo, [name]: value });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const donate = () => {
    console.log(donationInfo);
    axios.post('/someEndPoint', donationInfo)
      .then((res) => {
        console.log('DONATION POST Successful');
      // do something cool
      });
  };

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Post a Donation
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Decribe the Item</h2>
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
                name="descripton"
                onChange={handleInputChange}
                value={donationInfo.descripton}
                style={{ margin: '1rem' }}
              />
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={donate}
                endIcon={<Icon>send</Icon>}
              >
                Donate
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
