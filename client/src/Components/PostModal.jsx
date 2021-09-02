/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useReducer, useContext } from 'react';
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
import { getUserIdToken } from '../firebase';

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

const initialInputs = {
  title: '',
  description: '',
  location: '',
  charitiesOnly: false,
};

function inputReducer(state, action) {
  switch (action.type) {
    case 'field': {
      return {
        ...state,
        [action.name]: action.value,
      };
    }
    case 'reset': {
      return initialInputs;
    }
    default:
      return state;
  }
}

export default function PostModal() {
  const classes = useStyles();
  const { modal, setModal, user } = useContext(AppContext);
  const [inputState, dispatch] = useReducer(inputReducer, initialInputs);

  const handleInputChange = (e) => {
    const { name } = e.target;
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    dispatch({ type: 'field', name, value });
  };

  const resetInputs = () => {
    dispatch({ type: 'reset' });
  };

  const handleClose = () => {
    setModal('');
    resetInputs();
  };

  const donate = () => {
    if (user) {
      getUserIdToken()
        .then((idToken) => {
          const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${idToken}`,
          };
          return axios.post(
            '/donations',
            { ...inputState, images: ['image.jpg'] },
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
                value={inputState.title}
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
                value={inputState.location}
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
                value={inputState.descripton}
                style={{ margin: '1rem' }}
              />
              <FormControlLabel
                control={(
                  <Checkbox
                    checked={inputState.charitiesOnly}
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
