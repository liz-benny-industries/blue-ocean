/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-u
/* eslint-disable max-len */
import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Carousel from 'react-material-ui-carousel';

import {
  Typography,
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  Modal,
  // Paper,
  Backdrop,
  Button,
  Fade,
} from '@material-ui/core';
import axios from 'axios';
import AppContext from './context';
import { getUserIdToken } from '../firebase';

const tempImg = 'https://www.clipartmax.com/png/middle/244-2441405_charmander-by-monstermmorpg-charmander-by-monstermmorpg-charmander-dream-pokemon-charmander.png';
const items = [
  {
    name: 'Random Name #1',
    description: 'Probably the most random thing you have ever seen!',
  },
  {
    name: 'Random Name #2',
    description: 'Hello World!',
  },
];

// function Item(props) {
//   return (
//     <Paper>
//       <h2>{props.item.name}</h2>
//       <p>{props.item.description}</p>
//     </Paper>
//   );
// }

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    margin: '.5rem',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: '.5rem',
    width: '30rem',
  },
  media: {
    height: '20rem',
    backgroundSize: 'contain',
  },
  button: {
    display: 'flex',
    alignSelf: 'center',
    width: '24rem',
  },
  actions: {
    display: 'flex',
    alignSelf: 'center',
    justifyContent: 'space-between',
    width: '24rem',
  },
  userControls: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '.5rem',
  },
}));

export default function DonationCard() {
  const {
    setModal,
    modal,
    currentDonation,
    user
  } = useContext(AppContext);
  const classes = useStyles();

  let fireBaseIdToken = '';
  const donationModalOpen = currentDonation && modal === 'donation';

  (function () {
    if (user) {
      getUserIdToken()
        .then((idToken) => {
          fireBaseIdToken = idToken;
        });
    }
  }());

  const handleClose = () => {
    setModal('');
  };

  const handleClaim = () => {
    const donationId = currentDonation.id;
    axios({
      method: 'put',
      url: `/donations/${donationId}/claim/?email=${currentDonation.donor.email}&title=${currentDonation.title}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${fireBaseIdToken}`,
      },
    });
    handleClose();
  };

  const handleDelete = () => {
    const donationId = currentDonation.id;
    axios({
      method: 'put',
      url: `/donations/cancel/${donationId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${fireBaseIdToken}`,
      },
    }).then(() => {
      handleClose();
    })
      .catch((e) => console.error(e));
  };

  return (
    <div>
      <Modal
        closeAfterTransition
        aria-labelledby="transition-donate-modal-title"
        aria-describedby="transition-donate-modal-description"
        open={donationModalOpen}
        onClose={handleClose}
        className={classes.modal}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={donationModalOpen}>
          <div className={classes.paper}>
            <form
              noValidate
              require="true"
              className={classes.root}
              autoComplete="off"
            >
              <Card className={classes.root} style={{ display: 'flex', flexDirection: 'column' }}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    title={currentDonation && currentDonation.title}
                    image={currentDonation && currentDonation.images[0].url}
                  />
                </CardActionArea>
                {/* <Carousel>
                      {items.map((item, i) => (
                        <Item
                          className={classes.item}
                          key={i}
                          item={item}
                        />
                      ))}
                    </Carousel> */}
                <CardActions className={classes.actions}>
                  <Typography>{currentDonation && currentDonation.donor.username}</Typography>
                  <Typography>{currentDonation && currentDonation.location}</Typography>
                  <Button size="small" color="primary">
                    Share
                  </Button>
                </CardActions>
              </Card>
              <CardContent>
                <Typography>{currentDonation && currentDonation.description}</Typography>
              </CardContent>
              <Button
                onClick={() => { user ? handleClaim() : setModal('auth'); }}
                className={classes.button}
                variant="contained"
                color="primary"
              >
                Claim
              </Button>
              {currentDonation && user && user.uid === currentDonation.donor.id && (
              <div className={classes.userControls}>
                <Button onClick={() => {}}>Cancel Claim</Button>
                <Button onClick={handleDelete}>Delete Post</Button>
              </div>
              )}
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
