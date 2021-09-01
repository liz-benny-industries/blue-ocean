/* eslint-disable react/prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';
import { Paper, Avatar, Typography } from '@material-ui/core';

const tempImg = 'https://www.clipartmax.com/png/middle/244-2441405_charmander-by-monstermmorpg-charmander-by-monstermmorpg-charmander-dream-pokemon-charmander.png';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      width: '55rem',
      height: '3rem',
      padding: '.5rem',
      margin: '.5rem',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
  },
  shell: {
    display: 'flex',
    flexDirection: 'row',
  },
  innerText: {
    width: '18rem',
    padding: '.5rem',
    display: 'flex',
    alignItems: 'center',
  },
  image: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    height: '3rem',
    width: '3rem',
  },
}));

export default function Listing({
  setOpenDonationCard,
  donation,
  setCurrentDonation,
}) {
  const classes = useStyles();

  const handleClick = () => {
    setOpenDonationCard(true);
    setCurrentDonation(donation);
  };

  return (
    <div className={classes.shell}>
      <div className={classes.root}>
        <Paper onClick={handleClick} variant="outlined">
          <Paper variant="outlined" className={classes.innerText}>
            <Typography>{donation.title}</Typography>
          </Paper>
          <Paper variant="outlined" className={classes.innerText}>
            <Typography>{donation.location}</Typography>
          </Paper>
          <Avatar
            src={tempImg}
            variant="square"
            className={classes.image}
          >
            N
          </Avatar>
        </Paper>
      </div>
    </div>
  );
}
