/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Paper } from '@material-ui/core';
import Listing from './Listing';
import AppContext from './context';

export default function DonationList() {
  const { setModal, donations, setCurrentDonation } = useContext(AppContext);
  const useStyles = makeStyles(() => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      maxWidth: '72rem',
      padding: '.5rem',
      margin: '.5rem',
      overflowY: 'auto',
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
            setModal={setModal}
            setCurrentDonation={setCurrentDonation}
          />
        ))}
      </Paper>
    </div>
  );
}
