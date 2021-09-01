/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-u
/* eslint-disable max-len */
import React from 'react';
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
  Paper,
  Backdrop,
  Button,
  Fade,
} from '@material-ui/core';

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
        open={setOpenDonationCard}
        onClose={handleClose}
        className={classes.modal}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={setOpenDonationCard}>
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
                  <Typography>{donation.donorId}</Typography>
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
