/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-u
/* eslint-disable max-len */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Carousel from 'react-material-ui-carousel';
import {
  Typography,
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  Modal,
  Paper,
  Backdrop,
  Button,
  Fade,
} from '@material-ui/core';

const idToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjJjZGFiZDIwNzVjODQxNDI0NDY3MTNlM2U0NGU5ZDcxOGU3YzJkYjQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2FuZGJveC0zYTJlMyIsImF1ZCI6InNhbmRib3gtM2EyZTMiLCJhdXRoX3RpbWUiOjE2MzA0Njg4MjAsInVzZXJfaWQiOiJERFZOMjdrQjlSVFduVUxRRUpIQ294RElnVjcyIiwic3ViIjoiRERWTjI3a0I5UlRXblVMUUVKSENveERJZ1Y3MiIsImlhdCI6MTYzMDQ2ODgyMCwiZXhwIjoxNjMwNDcyNDIwLCJlbWFpbCI6ImExQGExLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJhMUBhMS5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.YfLKJKF802-CDtdfud9zPmUSXKzLZZTHltjicq6mLgnk0hxgNSkkU0DV2LbfdHX9ZFpQP-V-zyqDfotwE0q_NEO1qaCI_uuyShBLxL7ayE9BD1P9CJ68-Nqy5yPqqyEtNWgmRLycReuTWwDBGRjF60JQZ_c3o6H3sHkdSIovxl2zzLcZlrWpGLQq0BNUsFC97t20pC8LGaA5Gb_W7teIqLXVabYjZja5e8Akg-nuTcXxo9P3rE5HvatrjGF0eppCtz72VhWF-pmElkzzvZN26HmlaGfj_rdzxRJ1Vx3iwuOswvZGwLA3Z05-HA20Ir4vGYB4ewctfZftQ0ym0c5JGQ';

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

export default function DonationCard({
  setOpenDonationCard,
  donation,
}) {
  const classes = useStyles();

  const handleClose = () => {
    setOpenDonationCard(false);
  };

  const handleContact = () => {
    // open email client
  };

  const handleCancel = () => {
    // relist the item (unclaim)
    axios
      .put(`/donations/cancel/${donation.id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
      })
      .then((response) => console.log('response:', response))
      .catch((e) => console.error(e));
  };

  const handleDelete = () => {
    // delete the listing
  };

  return (
    <div>
      <Modal
        closeAfterTransition
        aria-labelledby="transition-donate-modal-title"
        aria-describedby="transition-donate-modal-description"
        open={!!donation}
        onClose={handleClose}
        className={classes.modal}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={!!donation}>
          <div className={classes.paper}>
            <form
              noValidate
              require="true"
              className={classes.root}
              autoComplete="off"
            >
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    title={donation.title}
                    image={donation.images[0].url}
                  />
                  {/* <CardContent>
                    <Carousel>
                      {items.map((item, i) => (
                        <Item
                          className={classes.item}
                          key={i}
                          item={item}
                        />
                      ))}
                    </Carousel>
                  </CardContent> */}
                </CardActionArea>
                <CardActions className={classes.actions}>
                  <Typography>{donation.donor.username}</Typography>
                  <Typography>{donation.location}</Typography>
                  <Button size="small" color="primary">
                    Share
                  </Button>
                </CardActions>
              </Card>
              <Button
                onClick={handleContact}
                className={classes.button}
                variant="contained"
                color="primary"
              >
                Contact Listing Owner
              </Button>
              <div className={classes.userControls}>
                <Button onClick={handleCancel}>Cancel Claim</Button>
                <Button onClick={handleDelete}>Delete Post</Button>
              </div>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
