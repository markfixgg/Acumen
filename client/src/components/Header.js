import {AppBar, Menu, Toolbar} from "@material-ui/core";
import Avatar from "antd/es/avatar/avatar";
import {getInitials} from "../helpers/Utils";
import React, {useContext, useEffect} from "react";
import {UserContext} from "./UserProvider";
import {makeStyles} from "@material-ui/core/styles";
import {deepOrange, deepPurple} from "@material-ui/core/colors";
import firebase from "../firebase/firebase";
import MenuItem from '@material-ui/core/MenuItem';
import {Link} from "react-router-dom";
import arrowdown from '../assets/arrowdown.png';
import {useSelector} from 'react-redux'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        alignText: 'center',
        backgroundColor: deepOrange[500],
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
            margin: '0 0px',
            padding: '0'
        },
        cursor: 'pointer'
    },
    arrowdown: {
        filter: "invert(100%)",
        cursor: 'pointer',
        marginLeft: '8px'
    }
}));


export default (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [profile, setProfile] = React.useState();

    const {displayName, uid} = useContext(UserContext);
    const store = useSelector(state => state)

    const classes = useStyles();

    useEffect(() => {
        const fetchData = async () => {
            setProfile(store.profile)
        }

        fetchData();
    }, [store])

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
                        <Avatar
                            src={profile?.image ? `data:${profile.image.type};base64,${Buffer.from(profile.image.data).toString('base64')}` : undefined}
                            className={classes.orange}>{profile?.displayName ? getInitials(profile.displayName) : ''}</Avatar>
                        <img className={classes.arrowdown} src={arrowdown}
                             style={{
                                 width: '16px',
                                 height: '10px',
                                 transition: 'all 0.3s',
                                 transform: anchorEl ? 'rotate(180deg)' : 'rotate(0deg)'
                             }}/>
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
                <MenuItem><Link className={classes.menu_item} to={`/user/${uid}`}>Profile</Link></MenuItem>
                <MenuItem className={classes.menu_item} onClick={handleClose}><Link className={classes.menu_item}
                                                                                    to='/settings'>Settings</Link></MenuItem>
                <MenuItem className={classes.menu_item} onClick={logout}>Logout</MenuItem>
            </Menu>
        </div>
    )
}
