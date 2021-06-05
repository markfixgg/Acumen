import React, {useState} from 'react';
import {Link} from "react-router-dom";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import {Avatar, Button, CssBaseline, TextField, Grid, Box, Typography, Container, AppBar, Toolbar} from '@material-ui/core'
import social_icons from '../../assets/social'
import firebase from '../../firebase/firebase'
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
  social_icon: {
    backgroundColor: 'white',
    height: '2rem',
    width: '2rem',
    margin: theme.spacing(1, 1)
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

export default function Login() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = async (e) => {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(userCredentials => {
          console.log(userCredentials)
        })
        .catch(err => console.log(err.message))
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
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={e => setEmail(e.target.value)}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e => setPassword(e.target.value)}
            />

            <Typography style={{display: 'flex', justifyContent: 'center', marginTop: '5px'}} component="h3" variant="h10">
              Sign in with social:
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
              onClick={e => onLogin(e)}
              >
              Sign In
            </Button>

            <Grid  container>
              <Grid item xs>
                <Link to="/reset-password" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
    </Container>
    </div>
  );
}