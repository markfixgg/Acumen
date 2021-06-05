import {makeStyles} from "@material-ui/core/styles";
import {useEffect} from "react";
import {CircularProgress} from "@material-ui/core";

const useStyles = makeStyles(theme => ({ // TODO: align load screen in center
    container: {
        width: '100px',
        height: '50px',
        position:'fixed',
        top: 'calc(50% - 25px)', // half of width
        left: 'calc(50% - 50px)' // half of height
    }
}))

const LoadScreen = () => {
    const classes = useStyles();

    useEffect(() => {
        document.getElementById('loader').style.opacity = '100%'
    }, [])

    return (
        <div className={classes.container}>
            <div id='loader' style={{transition: 'all 1.2s', opacity:'0%'}}>
                <h1 style={{'color': '#1976d2'}}>Acumen</h1>
                <CircularProgress color={"primary"} style={{marginLeft: '33px'}}/>
            </div>
        </div>
    )
}

export default  LoadScreen