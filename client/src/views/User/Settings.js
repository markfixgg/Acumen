import Header from '../../components/Header'
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    text: {
        color: 'red'
    }
}))

const Settings = () => {
    const classes = useStyles()
    return (
        <div>
            <Header/>
            <h1 className={classes.text}>Settings page</h1>
        </div>
    )
}

export default Settings