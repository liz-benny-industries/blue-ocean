import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import {
  TextField,
  Modal,
  Backdrop,
  Button,
  Fade,
  Typography,
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
          timeout: 300,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Typography variant="h4" id="transition-modal-title">Decribe the Item</Typography>
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
                style={{ margin: '1rem' }}
              />
              <TextField
                required
                id="modal-item-location"
                label="Item Location"
                type="item-title"
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
                style={{ margin: '1rem' }}
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
