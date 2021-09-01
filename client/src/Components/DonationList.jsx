/* eslint-disable react/prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Paper } from '@material-ui/core';
import Listing from './Listing';

export default function DonationList({
  setOpenDonationCard,
  donations,
  setCurrentDonation,
}) {
  const useStyles = makeStyles(() => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '72rem',
      height: '100%',
      padding: '.5rem',
      margin: '.5rem',
      overflowY: 'auto',
      maxHeight: '40rem',
    },
    shell: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.shell}>
      <Paper className={classes.root}>
        <Typography variant="h4">Donations</Typography>
        {donations.map((donation) => (
          <Listing
            key={donation.id}
            donation={donation}
            onClick={setCurrentDonation}
            setOpenDonationCard={setOpenDonationCard}
            setCurrentDonation={setCurrentDonation}
          />
        ))}
      </Paper>
    </div>
  );
}
