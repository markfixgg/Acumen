import React from "react";
import {AppBar, Container, Toolbar} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Avatar from "antd/es/avatar/avatar";
import {deepOrange, deepPurple} from "@material-ui/core/colors";

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
    block: {
        marginTop: '15px',
        width: '100%',
        backgroundColor: 'whitesmoke',
        borderRadius: '15px'
    }
}));

const Home = () => {
    const classes = useStyles();

    return (
        <div>
            <div className="header">
                <AppBar position="static">
                    <Toolbar className={classes.toolbar_wrapper}>
                        <h1 style={{marginTop: '10px', color: 'white'}}><b>Acumen</b></h1>
                        <Avatar className={classes.orange}>YL</Avatar>
                    </Toolbar>
                </AppBar>
            </div>

            <Container fixed>
                <div className={classes.wrapper}>
                    <div className={classes.block}>
                        <h1 className={classes.wrapper}>
                            Main home page
                        </h1>
                    </div>
                </div>
            </Container>

        </div>
    )
}

export default Home