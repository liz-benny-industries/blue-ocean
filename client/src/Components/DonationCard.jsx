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

function Item(props) {
  return (
    <Paper>
      <h2>{props.item.name}</h2>
      <p>{props.item.description}</p>
    </Paper>
  );
}

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
    padding: theme.spacing(2, 4, 3),
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
}));

export default function TransitionsModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Donation Card
      </button>
      <Modal
        aria-labelledby="transition-donate-modal-title"
        aria-describedby="transition-donate-modal-description"
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
                    image={tempImg}
                    title="Image Title(optional)"
                  />
                  <CardContent>
                    <Carousel>
                      {
                        items.map((item, i) => <Item className={classes.item} key={i} item={item} />)
                      }
                    </Carousel>
                  </CardContent>
                </CardActionArea>
                <CardActions className={classes.actions}>
                  <Typography>Donor's Username</Typography>
                  <Typography>Location</Typography>
                  <Button
                    size="small"
                    color="primary"
                  >
                    Share
                  </Button>
                </CardActions>
              </Card>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
              >
                Contact Listing Owner
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
