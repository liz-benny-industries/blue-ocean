import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';
import BackspaceRoundedIcon from '@material-ui/icons/BackspaceRounded';
import {
  Paper,
  Avatar,
  Typography,
} from '@material-ui/core';

const tempImg = 'https://www.clipartmax.com/png/middle/244-2441405_charmander-by-monstermmorpg-charmander-by-monstermmorpg-charmander-dream-pokemon-charmander.png';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      width: theme.spacing(66),
      height: theme.spacing(6),
      padding: '.5rem',
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
    width: theme.spacing(22),
    padding: '.5rem',
    display: 'flex',
    alignItems: 'center',
  },
  square: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    height: theme.spacing(6),
    width: theme.spacing(6),
  },
  icon: {
    display: 'flex',
    alignSelf: 'center',
  },
}));

export default function Variants() {
  const classes = useStyles();

  return (
    <div className={classes.shell}>
      <div className={classes.root}>
        <Paper variant="outlined">
          <Paper variant="outlined" className={classes.innerText}>
            <Typography>Listing Title</Typography>
          </Paper>
          <Paper variant="outlined" className={classes.innerText}>
            <Typography>Listing Location</Typography>
          </Paper>
          <Avatar
            src={tempImg}
            variant="square"
            className={classes.square}
          >
            N
          </Avatar>
        </Paper>
      </div>
      <div className={classes.icon}>
        <BackspaceRoundedIcon />
      </div>
    </div>
  );
}
