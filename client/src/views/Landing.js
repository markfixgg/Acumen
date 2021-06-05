import {AppBar, Container, Toolbar} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {deepOrange, deepPurple} from "@material-ui/core/colors";
import {Link} from "react-router-dom";

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
    },
    link: {
        color: 'white',
        transition: 'all 0.2s',
        '&:hover': {
            color: 'gray'
        }
    }
}));


const Landing = () => {
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
            <Container>
                <div className={classes.block}>
                    <h1 className={classes.wrapper}>Welcome at Acumen!</h1>
                </div>
                <div className={classes.block}>
                    <h2 className={classes.wrapper} style={{paddingTop: '15px'}}>About our project</h2>
                    <h3 style={{padding: '5px 20px 15px 20px'}}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi aspernatur atque consectetur
                        cumque dicta explicabo in iure similique unde voluptatum? Ab beatae commodi dolor in iure maxime
                        omnis porro voluptas!
                    </h3>
                </div>
            </Container>
        </div>
    )
}

export default Landing
