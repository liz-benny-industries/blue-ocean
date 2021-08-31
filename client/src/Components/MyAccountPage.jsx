import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    '& > *': {
      width: '100%',
      height: '100%',
      padding: '.5rem',
      display: 'flex',
      justifyContent: 'flex-end',
    },
  },
  userSettings: {
    padding: '.5rem',
  },
}));

const MyAccountPage = () => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.root}>
        <Typography variant="h2">My Account</Typography>
      </div>
      <Paper className={classes.userSettings}>
        <Typography variant="h4">User Settings</Typography>
      </Paper>
    </div>
  );
};

export default MyAccountPage;
