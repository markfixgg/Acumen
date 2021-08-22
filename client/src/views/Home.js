import React, {useContext, useEffect} from "react";
import {AppBar, Container, Toolbar, Icon} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import firebase from "../firebase/firebase";
import {UserContext} from "../components/UserProvider";
import Header from "../components/Header";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    wrapper: {
        display: 'flex',
        justifyContent: 'center'
    },
    block: {
        marginTop: '15px',
        width: '100%',
        backgroundColor: 'whitesmoke',
        borderRadius: '15px',
        marginRight: '50px',
        marginLeft: '50px'
    },
    inlineBlock: {
        display: 'flex'
    }
}));

const Home = () => {
    const classes = useStyles();
    const user = useContext(UserContext);

    return (
        <div>
            <Header/>

            <div className={classes.inlineBlock}>

                <div className={classes.block}>
                    <div className={classes.wrapper}><h2>Left Sidebar</h2></div>
                </div>

                <div className={classes.block}>
                    <div className={classes.wrapper}><h2>Center Content</h2></div>
                </div>

                <div className={classes.block}>
                    <div className={classes.wrapper}><h2>Right sidebar</h2></div>
                </div>

            </div>
        </div>
    )
}

export default Home