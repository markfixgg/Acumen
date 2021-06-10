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
        borderRadius: '15px'
    }
}));

const Home = () => {
    const classes = useStyles();
    const user = useContext(UserContext);

    return (
        <div>
            <Header/>

            <Container fixed>
                <div className={classes.wrapper}>
                    <div className={classes.block}>
                        <h1 className={classes.wrapper}>
                            Home page
                        </h1>
                        <p>Content</p>
                        <p>Content</p>
                        <p>Content</p>
                        <p>Content</p>
                    </div>
                </div>
            </Container>

        </div>
    )
}

export default Home