/*eslint-disable*/

import React, { useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  IconButton,
  Box,
  InputBase,
  alpha,
} from '@material-ui/core';
import {
  Public,
  Search,
  AccountCircleOutlined,
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  root: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: '2em',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
}));

const Navigation = ({ currentUser, setAuthOpen, logOut }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='open drawer'
          >
            <Public fontSize='large' />
          </IconButton>
          <Box>
            <Typography variant='h5' className={classes.title}>
              Lendl Global
            </Typography>
            <Typography variant='caption'>
              We're in everything!
            </Typography>
          </Box>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <Search />
            </div>
            <InputBase
              placeholder='Search...'
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='open drawer'
          >
            <AccountCircleOutlined fontSize='large' />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navigation;

// const Nav = ({ currentUser, setAuthOpen, logOut }) => {
//   const signOutUser = () => {
//     const auth = getAuth();
//     !currentUser
//       ? setAuthOpen(true)
//       : signOut(auth)
//           .then(() => {
//             logOut('');
//           })
//           .catch((error) => {
//             console.log(error);
//           });
//   };

//   return (
//     <header className='navbar'>
//       <div className='navbar__title navbar__item'>
//         Logo
//         <input className='search' />
//       </div>
//       <div
//         className='navbar__item'
//         style={{ cursor: 'pointer' }}
//         onClick={signOutUser}
//       >
//         {currentUser ? 'Logout' : 'Sign In'}
//       </div>
//     </header>
//   );
// };

// export default Nav;
