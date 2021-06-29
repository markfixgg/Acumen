import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {Avatar, Button, CssBaseline, TextField, Grid, Box, Typography, Container, AppBar, Toolbar, Fade} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import social_icons from '../../assets/social'
import firebase from "../../firebase/firebase";
import axios from 'axios'
import {instance} from "../../helpers/Utils";
import {useDispatch} from "react-redux";
import {update_uid} from "../../redux/actions/authActions";

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
  const [error, setError] = useState('')
  const classes = useStyles();
  const dispatch = useDispatch();

  const alert = (message) => {
    setError(message)

    setTimeout(()=>{
      setError('')
    }, 3000)
  }

  firebase.auth()
      .getRedirectResult()
      .then(async (result) => {
        if (result.credential) {
          /** @type {firebase.auth.OAuthCredential} */
          var credential = result.credential;

          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = credential.accessToken;

          const {email, displayName, uid, photoURL} = result.user;
          const [firstName, lastName] = displayName.split(' ');

          const save_to_mongo = await instance.post('/users', {
            firstName,
            lastName,
            uid,
            photoURL
          })

          window.location.replace('/home')
        }
      }).catch((error) => {
        alert('Something error happened, maybe your account doesn\'t linked')
  });

  const social_login = async (e, service) => {
    e.preventDefault();
    if(service == 'google') {
      const google_provider = new firebase.auth.GoogleAuthProvider();
      await firebase.auth().signInWithRedirect(google_provider)
    }
  }

  const onSignUp = async (e) => {
    e.preventDefault()
    if (!email) return alert('Email field empty!')
    if (!password) return alert('Password field empty!')
    if (!firstName) return alert('First name field empty!')
    if (!lastName) return alert('Last name field empty!')

    await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(async userCredentials => {
          const {uid} = userCredentials.user;

          const user = await firebase.auth().currentUser.updateProfile({
            displayName: firstName + ' ' + lastName
          })

          const save_to_mongo = await instance.post('/users', {
            firstName,
            lastName,
            uid
          })

          window.location.replace('/home')
        })
        .catch(err => {
            alert(err.message)
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

          <Fade in={error ? true : false}>
            <Alert style={{marginTop: '10px', display: error ? '' : 'none'}} severity="error">{error}</Alert>
          </Fade>

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
                  // autoFocus
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
                <div onClick={e => social_login(e, 'google')}>
                  <Avatar className={classes.social_icon}>
                    <img alt='google' className={classes.icon_hover} src={social_icons.google}/>
                  </Avatar>
                </div>
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