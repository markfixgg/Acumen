import {
    AppBar,
    Avatar,
    Box,
    Button,
    Container,
    CssBaseline,
    Grid,
    TextField,
    Toolbar,
    Typography
} from "@material-ui/core";
import {Link} from "react-router-dom";
import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import firebase from "../../firebase/firebase";
import Alert from "@material-ui/lab/Alert";
import {Fade} from "@material-ui/core";

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
        marginTop: theme.spacing(0),
    },
    submit: {
        margin: theme.spacing(2, 0, 2),
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
    },
    toolbar_wrapper: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}));

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

const ResetPassword = () => {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [response, setResponse] = useState({
        success: false,
        message: ''
    });

    const onRestore = async (e) => {
        e.preventDefault()
        await firebase.auth().sendPasswordResetEmail(email)
            .then(data => {
                setResponse({
                    success: true,
                    message: 'Message with password-restore link successfully sent to your email!'
                })
                setTimeout(()=> {
                    setResponse({
                        success: false,
                        message: ''
                    })
                }, 5000)
            })
            .catch(err => {
                setResponse({
                    success: false,
                    message: err.message
                })
                setTimeout(()=> {
                    setResponse({
                        success: false,
                        message: ''
                    })
                }, 5000)
            })
    }


    return (
        <div>
            <div className="header">
                <AppBar position="static">
                    <Toolbar className={classes.toolbar_wrapper}>
                        <Link to='/'>
                            <h1 className={classes.link} style={{marginTop: '10px'}}><b>Acumen</b></h1>
                        </Link>
                        <div style={{paddingTop: '5px'}}>
                            <h3>
                                <Link className={classes.link} to='/login'>Login</Link> | <Link className={classes.link} to='/register'>Register</Link>
                            </h3>
                        </div>
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
                        Recover Password
                    </Typography>

                    <Fade in={response.message ? true : false} style={{display: response.message ? '' : 'none'}}>
                        <Alert severity={response.success ? 'success' : 'error'}>
                            {response.message}
                        </Alert>
                    </Fade>

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

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={e => onRestore(e)}
                        >
                            Submit
                        </Button>

                    </form>
                </div>
                <Box mt={2}>
                    <Copyright/>
                </Box>
            </Container>
        </div>
    )
}

export default ResetPassword