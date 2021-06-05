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
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import social_icons from "../../assets/social";

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
    },
    toolbar_wrapper: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}));

const ResetPassword = () => {
    const classes = useStyles();

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
                            // onChange={e => setEmail(e.target.value)}
                            autoFocus
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            // onClick={e => onLogin(e)}
                        >
                            Submit
                        </Button>

                    </form>
                </div>
            </Container>
        </div>
    )
}

export default ResetPassword