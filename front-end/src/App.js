import React, { useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import './App.css';
import './dice.css';

var Roll = require('roll');
const roll = new Roll();

var oneDie = roll.roll('d6');
console.log(oneDie.result); //random number between 1 and 10 (inclusive)

var twoTwenties = roll.roll('2d20');
console.log(twoTwenties.result); //random number between 2 and 40 (inclusive)

var bunchOfDice = roll.roll('2d20+1d12');
console.log(bunchOfDice.result); //random number between 3 and 52 (inclusive)

var chance = roll.roll('d%'); //same as '1d100', 'd100', or '1d%'
console.log(chance.result); //random number between 1 and 100 (inclusive)

var attack = roll.roll('2d6+2'); // add dynamic modifier
console.log(attack.result); //random number between 3 and 8 (inclusive)

var yahtzee = roll.roll('5d6');
console.log(yahtzee.rolled); //yahtzee.rolled will return something like [5, 2, 4, 6, 1] rather than the sum

var blessedSneaker = roll.roll('2d20b1+1d4+5');
console.log(blessedSneaker.rolled); // blessedSneaker.rolled will return an array containing an array for each component that is a roll of the dice, in the order in which they occurred, e.g. [[19,3],[1]]

var pickBestTwo = roll.roll('6d20b2'); //roll 6 dice and give me the 2 highest
console.log(pickBestTwo.calculations[1]); //pickBestTwo.calculations[0] is the same as .result, .calculations[1] is prior to the sum operation

var attack = roll.roll({
  quantity: 2,
  sides: 6,
  transformations: [ //can list n-number of pipeline operations to perform on the result
    'sum', //take the array of rolled dice and sum them together
    ['add', 2] //add 2 to the sum
  ]
});
console.log(attack.result); //random number between 3 and 8 (inclusive)

//Using custom transformations:
// var dropOnes = function(results){
//   return results.filter(function (result) {
//     return result !== 1;
//   });
// };
// var noOnes = roll.roll({
//   quantity: 5,
//   sides: 4,
//   transformations: [
//     dropOnes, // remove any 1s because we have teh lucky bootz
//     'sum'
//   ]
// });

//Using a custom seed:
// var srand = require('srand'); //https://github.com/isaacs/node-srand (npm install srand)
// srand.seed(1000);

// roll = new Roll(function () {
//   return srand.random();
// });

console.log(roll.roll('2d6+5').result);

// Validating user input
var userInput = 'this isn\'t a valid roll',
  valid = roll.validate(userInput);

if (!valid) {
  console.error('"%s" is not a valid input string for your roll!', userInput);
}


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
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
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const PrimarySearchAppBar = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

   
    const handleProfileMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
      setAnchorEl(null);
      handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
      setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem>
          <IconButton aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem>
          <IconButton aria-label="show 11 new notifications" color="inherit">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Account</p>
        </MenuItem>
      </Menu>
    );

    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                      edge="start"
                      className={classes.menuButton}
                      color="inherit"
                      aria-label="open drawer"
                    >
                      <MenuIcon />
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
                      IXDICE
                    </Typography>
                    <div className={classes.search}>
                      <div className={classes.searchIcon}>
                        <SearchIcon />
                      </div>
                      <InputBase
                        placeholder="Search…"
                        classes={{
                          root: classes.inputRoot,
                          input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                      />
                    </div>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                      <IconButton aria-label="show new mails" color="inherit">
                          <Badge badgeContent={0} color="secondary">
                              <MailIcon />
                          </Badge>
                      </IconButton>
                      <IconButton aria-label="show new notifications" color="inherit">
                          <Badge badgeContent={0} color="secondary">
                              <NotificationsIcon />
                          </Badge>
                      </IconButton>
                      <IconButton
                          edge="end"
                          aria-label="account of current user"
                          aria-controls={menuId}
                          aria-haspopup="true"
                          onClick={handleProfileMenuOpen}
                          color="inherit"
                      >
                        <AccountCircle />
                      </IconButton>
                    </div>
                    <div className={classes.sectionMobile}>
                      <IconButton
                        aria-label="show more"
                        aria-controls={mobileMenuId}
                        aria-haspopup="true"
                        onClick={handleMobileMenuOpen}
                        color="inherit"
                      >
                        <MoreIcon />
                      </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
          {renderMobileMenu}
          {renderMenu}
        </div>
    );
}



function App() {
  const [oddChecked, setOddChecked] = useState(false);
  const [evenChecked, setEvenChecked] = useState(false);
  let theRoll = roll.roll('1d6');

  const handleEvenCheckedChange = (event) => {
    setEvenChecked(true);
    setOddChecked(false);
  }

  const handleOddCheckedChange = (event) => {
    setOddChecked(true);
    setEvenChecked(false);
  }

  const rollDice = () => {
    const dice = [...document.querySelectorAll(".die-list")];
    dice.forEach(die => {
        toggleClasses(die);
        die.dataset.roll = getRandomNumber(1, 6);
      });

      setOddChecked(false);
      setEvenChecked(false);
  }

  const toggleClasses = (die) => {
    die.classList.toggle("odd-roll");
    die.classList.toggle("even-roll");
  }

  const getRandomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    let result = roll.roll('1d6');
    console.info(result.rolled)
    return result.result;
    //return Math.floor(Math.random() * (max - min + 1) + min);
  }


  return (
    <div className="App">
      <PrimarySearchAppBar />
      <div>
         <h3>ODD -OR- EVEN</h3>
      </div>
      <div>
          <div className="dice">
          <ol className="die-list even-roll" data-roll="1" id="die-1">
            <li className="die-item" data-side="1">
              <span className="dot"></span>
            </li>
            <li className="die-item" data-side="2">
              <span className="dot"></span>
              <span className="dot"></span>
            </li>
            <li className="die-item" data-side="3">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </li>
            <li className="die-item" data-side="4">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </li>
            <li className="die-item" data-side="5">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </li>
            <li className="die-item" data-side="6">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </li>
          </ol>
          <ol className="die-list odd-roll" data-roll="1" id="die-2">
            <li className="die-item" data-side="1">
              <span className="dot"></span>
            </li>
            <li className="die-item" data-side="2">
              <span className="dot"></span>
              <span className="dot"></span>
            </li>
            <li className="die-item" data-side="3">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </li>
            <li className="die-item" data-side="4">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </li>
            <li className="die-item" data-side="5">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </li>
            <li className="die-item" data-side="6">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </li>
          </ol>
        </div>
        <div>
        <FormControlLabel
            control={
              <Checkbox
                color='primary'
                checked={evenChecked}
                onChange={handleEvenCheckedChange}
                name="even" 
              />}
            label="Even"
        />
        <FormControlLabel
            control={
              <Checkbox
                color='secondary'
                checked={oddChecked}
                onChange={handleOddCheckedChange}
                name="odd" 
              />}
            label="Odd"
        />       
        </div><br /><br />
        <Button 
          variant='outlined'
          color='secondary'
          id="roll-button"
          onClick={rollDice}
        >
          Roll Dice
        </Button>        
        </div>
    </div>
  );
}

export default App;
