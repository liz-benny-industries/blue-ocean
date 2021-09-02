/*eslint-disable*/

import React, { useContext } from'react';
import { getAuth, signOut } from 'firebase/auth';
import AppContext from '../Components/context';
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  IconButton,
  Box,
  InputBase,
  alpha,
  Button,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
} from '@material-ui/core';
import {
  Public,
  Search,
  AccountCircleOutlined,
  ArrowDropDown,
  ArrowDropUp,
} from '@material-ui/icons';

import { debounce } from '../utils';


const useStyles = makeStyles((theme) => ({
  flatList: {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
    backgroundColor: theme.palette.primary.light,
  },
  listItem: {
    color: theme.palette.primary.contrastText,
    textAlign: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
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
    flex: '0.5',
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

const Navigation = () => {
  const {
    user,
    setModal,
    setSortBy,
    setSearchFilter,
    setOrderByDesc,
    orderByDesc,
    setUser,
   } = useContext(AppContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();

  const filterDebounce = debounce(async (filter) => {
    if (filter.length > 2) {
      setSearchFilter(filter);
    } else {
      setSearchFilter('');
    }

    console.debug('filter:', filter);
  }, 500);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePostClick = () => {
    setModal('post');
  };

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <div style={{ display: 'flex' }}>
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
          </div>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <Search />
            </div>
            <InputBase
              onChange={(e) => filterDebounce(e.target.value)}
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
            {}
          </IconButton>
          <Button
            variant='contained'
            onClick={() => {
              const auth = getAuth();
              user
                ? signOut(auth)
                    .then(() => {
                      setUser(null);
                      setModal('');
                    })
                    .catch((error) => {
                      console.log(error);
                    })
                : setModal('auth');
            }}
          >
            {user ? 'Sign Out' : 'Sign In'}
          </Button>
        </Toolbar>
      </AppBar>
      <List className={classes.flatList}>
        <ListItem className={classes.listItem} button>
          <ListItemText
            onClick={() => {user ? handlePostClick() : setModal('auth') }}
            className={classes.listItem}
            primary='Post a Donation'
          />
        </ListItem>
        <ListItem button>
          <ListItemText
            className={classes.listItem}
            primary='Browse'
          />
        </ListItem>
        <ListItem button>
          <ListItemText
            className={classes.listItem}
            primary='My Donations'
          >
            My Donations
          </ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemText
            onClick={handleClick}
            className={classes.listItem}
            primary='Sorting'
          >
            Sorting
          </ListItemText>
        </ListItem>
        <Menu
          id='sort-menu'
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            value={'Proximity'}
            key={'Proximity'}
            onClick={(e) => {
              console.log('e.target:', e.target);
              setSortBy(e.target.value);
              setOrderByDesc(!orderByDesc);
              handleClose();
            }}
          >
            Proximity
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              setSortBy('Recency');
              setOrderByDesc(!orderByDesc);
              handleClose();
            }}
          >
            'Recency'
            {orderByDesc ? <ArrowDropDown /> : <ArrowDropUp />}
          </MenuItem>
        </Menu>
      </List>
    </div>
  );
};

export default Navigation;
