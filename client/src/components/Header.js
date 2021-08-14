import {AppBar, Menu, Paper, Toolbar} from "@material-ui/core";
import Avatar from "antd/es/avatar/avatar";
import {getInitials} from "../helpers/Utils";
import React, {useContext, useState} from "react";
import {UserContext} from "./UserProvider";
import {makeStyles} from "@material-ui/core/styles";
import {deepOrange, deepPurple} from "@material-ui/core/colors";
import firebase from "../firebase/firebase";
import MenuItem from '@material-ui/core/MenuItem';
import {Link} from "react-router-dom";
import arrowdown from '../assets/arrowdown.png';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
        margin: theme.spacing(0, 3, 0, 0)
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
    toolbar_wrapper: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    wrapper: {
        display: 'flex',
        justifyContent: 'center'
    },
    menu_wrapper: {
        margin: theme.spacing(5, 0, 0, 0)
    },
    menu_item: {
        color: 'black'
    },
    link: {
        color: 'white',
        transition: 'all 0.2s',
        '&:hover': {
            color: 'gray'
        }
    },
    span: {
        "& span": {
            margin: '0 8px',
            padding: '0'
        }
    },
    arrowdown: {
        filter: "invert(100%)",
        cursor: 'pointer'
    }
}));


export default (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const user = useContext(UserContext);
    const {displayName, photoURL} = user;
    const classes = useStyles()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = async (e) => {
        e.preventDefault()
        window.location.replace('/')
        await firebase.auth().signOut();
    }

    return (
        <div className="header">
            <AppBar position="static">
                <Toolbar className={classes.toolbar_wrapper}>
                    <Link to={'/home'}>
                        <h1 className={classes.link} style={{marginTop: '10px'}}><b>Acumen</b></h1>
                    </Link>
                    <div className={classes.span} onClick={handleClick}>
                        <Avatar src={photoURL ? photoURL : undefined} className={classes.orange}>{photoURL ? "" : getInitials(displayName)}</Avatar>
                        <img className={classes.arrowdown} src={arrowdown} style={{width: '15px', height: '10px'}}/>
                    </div>
                </Toolbar>
            </AppBar>

            <Menu
                id="simple-menu"
                className={classes.menu_wrapper}
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem><Link className={classes.menu_item} to={`/user/${user.uid}`}>Profile</Link></MenuItem>
                <MenuItem className={classes.menu_item} onClick={handleClose}><Link className={classes.menu_item} to='/settings'>Settings</Link></MenuItem>
                <MenuItem className={classes.menu_item} onClick={logout}>Logout</MenuItem>
            </Menu>
        </div>
    )
}