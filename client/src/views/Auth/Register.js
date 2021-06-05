import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {Avatar, Button, CssBaseline, TextField, Grid, Box, Typography, Container, AppBar, Toolbar} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import social_icons from '../../assets/social'
import firebase from "../../firebase/firebase";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" to="/">
        <b>Acumen</b>
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    paddingTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  social_icon: {
    backgroundColor: 'white',
    height: '2rem',
    width: '2rem',
    margin: theme.spacing(1, 1, 0, 1)
  },
  icon_hover: {
    '&:hover': {
      '-webkit-filter': 'invert(50%)', /* safari 6.0 - 9.0 */
      'filter': 'invert(50%)',
    }
  },
  social_wrapper: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(1, 0),
  },
  link: {
    color: 'white',
    transition: 'all 0.2s',
    '&:hover': {
      color: 'gray'
    }
  }
}));

export default function SignUp() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const classes = useStyles();

  const onSignUp = async (e) => {
    e.preventDefault()
    // if (email.length <= 5 || password.length <= 5) return alert("Check credentials!")
    await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(userCredentials => {
          console.log(userCredentials)
        })
        .catch(err => {
          console.log(err)
        })
  }

  return (
    <div>
      <div className="header">
        <AppBar position="static">
          <Toolbar>
            <Link to='/'>
              <h1 className={classes.link} style={{marginTop: '10px'}}><b>Acumen</b></h1>
            </Link>
          </Toolbar>
        </AppBar>
      </div>

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  onChange={e => setFirstName(e.target.value)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  onChange={e => setLastName(e.target.value)}
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  onChange={e => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </Grid>
            </Grid>
            
            <Typography style={{display: 'flex', justifyContent: 'center', marginTop: '5px'}} component="h3" variant="h10">
              Sign up with social:
            </Typography>

            <Grid className={classes.social_wrapper} container>
              <Grid item>
                <Link to="/sign_google">
                  <Avatar className={classes.social_icon}>
                    <img alt='google' className={classes.icon_hover} src={social_icons.google}/>
                  </Avatar>
                </Link>
              </Grid>

              <Grid item>  
                <Link to='/sign_facebook'>
                  <Avatar className={classes.social_icon}>
                    <img alt='facebook' className={classes.icon_hover} src={social_icons.facebook}/>
                  </Avatar>
                </Link>
              </Grid>

              <Grid item>
                <Link to="/sign_twitter">
                  <Avatar className={classes.social_icon}>
                    <img alt='twitter' className={classes.icon_hover} src={social_icons.twitter}/>
                  </Avatar>
                </Link>
              </Grid>

              <Grid item>
                <Link to='/sign_apple'>
                  <Avatar className={classes.social_icon}>
                    <img alt='apple' className={classes.icon_hover} src={social_icons.apple}/>
                  </Avatar>
                </Link>
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={e => onSignUp(e)}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={3} pb={1}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}